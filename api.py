from flask import Flask, request, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report, roc_curve, auc
import os

app = Flask(__name__)

# Folder untuk menyimpan grafik
GRAPH_FOLDER = "static/graphs"
os.makedirs(GRAPH_FOLDER, exist_ok=True)

# Folder untuk menyimpan file dataset
DATA_FOLDER = "data"
os.makedirs(DATA_FOLDER, exist_ok=True)

# Variabel global untuk menyimpan data uji dan prediksi
y_test_global = None
y_pred_global = None
data_global = None  # Variabel untuk menyimpan data global yang diupload
clf = None

# Fungsi untuk menghitung jumlah label
def jumlah_label(data, target_column):
    if target_column not in data.columns:
        return {"error": f"Kolom '{target_column}' tidak ditemukan!"}
    total = int(len(data[target_column]))
    data_1 = int(data[target_column].sum())  # Asumsi kolom berisi 0 dan 1
    data_0 = total - data_1
    return {"total_data": total, "label_1": data_1, "label_0": data_0}


# Fungsi untuk membuat grafik countplot
def chart(data, target_column):
    if target_column not in data.columns:
        return {"error": f"Kolom '{target_column}' tidak ditemukan!"}
    sns.countplot(x=data[target_column])
    plt.title(f"Distribusi Label untuk '{target_column}'")
    plot_path = os.path.join(GRAPH_FOLDER, "label_distribution.png")
    plt.savefig(plot_path)
    plt.close()
    return {"plot_url": f"/{plot_path}"}

# Fungsi untuk split data dan melatih model
def spliting_data(data, target_column, test_size=0.3, seed=0):
    if target_column not in data.columns:
        return None, None, None, None, None

    try:
        X = data.drop(columns=[target_column])
        y = data[target_column]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=seed)

        clf = GaussianNB()
        clf.fit(X_train, y_train)

        return clf, X_train, X_test, y_train, y_test

    except Exception as e:
        return {"error": f"Kesalahan saat split data: {e}"}

# Fungsi untuk melakukan prediksi dan evaluasi model
def prediksi(model, X_test, y_test):
    try:
        pred = model.predict(X_test)
        accuracy = float(accuracy_score(y_test, pred))
        pred_proba = model.predict_proba(X_test)[:, 1]

        fpr, tpr, thresholds = roc_curve(y_test, pred_proba)
        roc_auc = float(auc(fpr, tpr))

        return {
            "accuracy": accuracy,
            "roc_auc": roc_auc,
            "classification_report": classification_report(y_test, pred, output_dict=True)
        }

    except Exception as e:
        return {"error": f"Kesalahan saat prediksi: {e}"}

# Fungsi untuk membuat bar chart
def bar_chart(y_test, y_pred):
    try:
        report = classification_report(y_test, y_pred, output_dict=True)
        df_report = pd.DataFrame(report).transpose()
        df_report.drop(columns="support", inplace=True)
        plot_path = os.path.join(GRAPH_FOLDER, "classification_report_bar_chart.png")
        df_report.iloc[:3].plot(kind="bar")
        plt.title('Classification Report')
        plt.savefig(plot_path)
        plt.close()
        return {"chart_url": f"/{plot_path}"}
    except Exception as e:
        return {"error": f"Kesalahan saat membuat bar chart: {e}"}

# Fungsi untuk memuat data dari file
def load_data(file_name):
    try:
        file_path = os.path.join(DATA_FOLDER, file_name)
        # Pastikan file memiliki ekstensi yang benar
        if file_name.endswith('.csv'):
            data = pd.read_csv(file_path)
        elif file_name.endswith(('.xlsx', '.xls')):
            data = pd.read_excel(file_path)
        else:
            return {"error": "File harus berformat CSV atau Excel."}
        
        return data
    except Exception as e:
        return {"error": f"Kesalahan saat memuat file: {e}"}

@app.route("/get-data", methods=["GET"])
def get_data_paginated():
    """
    Endpoint untuk mengambil data yang sudah dimuat dengan paginasi.
    """
    global data_global

    if data_global is None:
        return jsonify({"error": "Data belum dimuat. Silakan unggah data terlebih dahulu menggunakan /load-data"}), 400

    try:
        # Ambil parameter paginasi dari query string
        page = int(request.args.get("page", 1))  # Default halaman pertama
        per_page = int(request.args.get("per_page", 10))  # Default 10 baris per halaman

        # Validasi parameter paginasi
        if page < 1 or per_page < 1:
            return jsonify({"error": "Parameter 'page' dan 'per_page' harus bernilai positif."}), 400

        # Hitung batas paginasi
        start = (page - 1) * per_page
        end = start + per_page

        # Subset data
        total_rows = len(data_global)
        paginated_data = data_global.iloc[start:end].to_dict(orient="records")

        # Siapkan respons
        response = {
            "message": "Data berhasil diambil",
            "columns": data_global.columns.tolist(),
            "total_rows": total_rows,
            "page": page,
            "per_page": per_page,
            "data": paginated_data
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint untuk menghitung jumlah label
@app.route("/label-counts", methods=["GET"])
def label_counts():
    if data_global is None:
        return jsonify({"error": "Data belum dimuat"}), 400

    try:
        target_column = request.args.get("target_column")
        if not target_column:
            return jsonify({"error": "Parameter 'target_column' diperlukan"}), 400

        result = jumlah_label(data_global, target_column)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint untuk visualisasi countplot
@app.route("/visualize-labels", methods=["GET"])
def visualize_labels():
    if data_global is None:
        return jsonify({"error": "Data belum dimuat"}), 400

    try:
        target_column = request.args.get("target_column")
        if not target_column:
            return jsonify({"error": "Parameter 'target_column' diperlukan"}), 400
        
        result = chart(data_global, target_column)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/train-model", methods=["POST"])
def train_model_form_data():
    """
    Endpoint untuk melatih model menggunakan kolom target yang dikirimkan dalam form-data.
    """
    global data_global, clf, y_test_global, y_pred_global
    clf = GaussianNB()

    if data_global is None:
        return jsonify({"error": "Data belum dimuat"}), 400

    try:
        # Ambil kolom target dari form-data
        target_column = request.form.get("target_column")
        if not target_column:
            return jsonify({"error": "Parameter 'target_column' diperlukan"}), 400

        # Periksa apakah kolom target ada di dataset
        if target_column not in data_global.columns:
            return jsonify({"error": f"Kolom '{target_column}' tidak ditemukan dalam dataset."}), 400

        # Latih model
        clf, X_train, X_test, y_train, y_test = spliting_data(data_global, target_column)
        if clf is None:
            return jsonify({"error": "Kesalahan saat melatih model"}), 500

        # Simpan data untuk evaluasi
        y_test_global = y_test
        y_pred_global = clf.predict(X_test)

        # Evaluasi model
        result = prediksi(clf, X_test, y_test)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"Terjadi kesalahan: {str(e)}"}), 500

# Endpoint untuk menampilkan bar chart dari laporan klasifikasi
@app.route("/classification-report-bar-chart", methods=["GET"])
def classification_report_bar_chart():
    if y_test_global is None or y_pred_global is None:
        return jsonify({"error": "Model belum dilatih atau prediksi belum dilakukan"}), 400

    try:
        result = bar_chart(y_test_global, y_pred_global)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/diagnosa", methods=["POST"])
def diagnosa_form():
    try:
        # Ambil data dari form-data
        data = request.form
        required_fields = [
            "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
            "thalach", "exang", "oldpeak", "slope", "ca", "thal"
        ]

        # Validasi keberadaan dan tipe data
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Parameter '{field}' diperlukan."}), 400
            if field == "oldpeak":
                float(data[field])  # Validasi float untuk oldpeak
            else:
                int(data[field])  # Validasi integer untuk lainnya

        # Buat DataFrame dari input
        patient_data = pd.DataFrame([{
            "age": int(data["age"]),
            "sex": int(data["sex"]),
            "cp": int(data["cp"]),
            "trestbps": int(data["trestbps"]),
            "chol": int(data["chol"]),
            "fbs": int(data["fbs"]),
            "restecg": int(data["restecg"]),
            "thalach": int(data["thalach"]),
            "exang": int(data["exang"]),
            "oldpeak": float(data["oldpeak"]),
            "slope": int(data["slope"]),
            "ca": int(data["ca"]),
            "thal": int(data["thal"]),
        }])

               # Prediksi menggunakan model
        if clf is None:
            return jsonify({"error": "Model belum dilatih. Silakan latih model terlebih dahulu."}), 400

        prediction = clf.predict(patient_data)
        result = "Positif" if prediction[0] == 1 else "Negatif"

        return jsonify({"prediction": result}), 200

    except ValueError:
        return jsonify({"error": "Data input tidak valid. Pastikan semua parameter diisi dengan tipe data yang benar."}), 400

    except Exception as e:
        return jsonify({"error": f"Terjadi kesalahan: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)