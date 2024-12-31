# Librarys
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
X_test_global = None
data_global = None  # Variabel untuk menyimpan data global yang diupload
clf = None
target_global = None # Variabel untuk menyimpan target label secara global
test_size_global = 0.3 # Variabel global untuk menyimpan test size

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
    global X_test_global  # Deklarasikan variabel global

    if target_column not in data.columns:
        return None, None, None, None, None

    try:
        X = data.drop(columns=[target_column])
        y = data[target_column]

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size_global, random_state=seed)

        # Pastikan X_test berbentuk array 2D
        if len(X_test.shape) != 2:
            X_test = X_test.values.reshape(-1, 1)

        # Simpan X_test ke dalam variabel global
        X_test_global = X_test

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
    
def plot_roc_curve(y_test, y_pred_proba):
    try:
        fpr, tpr, thresholds = roc_curve(y_test, y_pred_proba)
        roc_auc = auc(fpr, tpr)
        
        plt.figure()
        plt.plot(fpr, tpr, color="blue", lw=2, label=f"ROC curve (area = {roc_auc:.2f})")
        plt.plot([0, 1], [0, 1], color="gray", linestyle="--", lw=2)
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.title("Receiver Operating Characteristic (ROC) Curve")
        plt.legend(loc="lower right")
        
        # Simpan grafik ke folder
        plot_path = os.path.join(GRAPH_FOLDER, "roc_curve.png")
        plt.savefig(plot_path)
        plt.close()
        
        return {"roc_curve_url": f"/{plot_path}"}
    except Exception as e:
        return {"error": f"Kesalahan saat membuat ROC Curve: {e}"}


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
def load_data():
    try:
        # Cari file di folder DATA_FOLDER
        files = os.listdir(DATA_FOLDER)
        if not files:
            return {"error": "Folder data kosong. Pastikan ada file di folder 'data'."}
        
        # Ambil file pertama di folder
        file_name = files[0]
        file_path = os.path.join(DATA_FOLDER, file_name)
        
        # Deteksi format file berdasarkan ekstensi
        if file_name.endswith('.csv'):
            data = pd.read_csv(file_path)
        elif file_name.endswith(('.xlsx', '.xls')):
            data = pd.read_excel(file_path)
        else:
            return {"error": f"Format file '{file_name}' tidak didukung. Harus CSV atau Excel."}
        
        return data
    except Exception as e:
        return {"error": f"Kesalahan saat memuat file: {e}"}

@app.route("/load-data", methods=["GET"])
def load_and_paginate():
    global data_global

    # Load data otomatis
    data = load_data()
    if "error" in data:
        return jsonify(data), 400
    
    data_global = data  # Simpan data secara global
    
    # Ambil parameter paginasi dari query string
    page = int(request.args.get("page", 1))  # Default halaman pertama
    per_page = int(request.args.get("per_page", 10))  # Default 10 baris per halaman

    try:
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
            "message": "Data berhasil dimuat dan dipaginasikan",
            "columns": data_global.columns.tolist(),
            "total_rows": total_rows,
            "page": page,
            "per_page": per_page,
            "data": paginated_data,
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
        global target_global
        target_column = request.args.get("target_column")
        if not target_column:
            return jsonify({"error": "Parameter 'target_column' diperlukan"}), 400
        target_global = target_column
        result = jumlah_label(data_global, target_global)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint untuk visualisasi countplot
@app.route("/visualize-labels", methods=["GET"])
def visualize_labels():
    if data_global is None:
        return jsonify({"error": "Data belum dimuat"}), 400

    try:
        if not target_global:
            return jsonify({"error": "Parameter 'target_column' diperlukan"}), 400
        
        result = chart(data_global, target_global)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/train-model", methods=["POST"])
def train_model_form_data():
    """
    Endpoint untuk melatih model menggunakan kolom target yang dikirimkan dalam form-data.
    """
    global data_global, clf, y_test_global, y_pred_global, target_global, test_size_global
    clf = GaussianNB()

    if data_global is None:
        return jsonify({"error": "Data belum dimuat"}), 400

    try:
        # Periksa apakah target_column sudah diset
        if not target_global:
            return jsonify({"error": "Target column belum diset. Pastikan Anda telah mengatur target dengan /label-counts."}), 400

        # Ambil test_size dari input JSON
        data = request.get_json()
        if not data:
            return jsonify({"error": "Input harus berupa JSON dengan 'test_size' sebagai parameter opsional."}), 400

        test_size = data.get("test_size", test_size_global)  # Gunakan test_size_global jika tidak ada input
        if test_size is not None:
            try:
                test_size = float(test_size)
                if not (0.1 <= test_size <= 0.9):
                    return jsonify({"error": "Parameter 'test_size' harus bernilai di antara 0.1 dan 0.9."}), 400
                test_size_global = test_size
            except ValueError:
                return jsonify({"error": "Parameter 'test_size' harus berupa angka."}), 400


        # Latih model
        clf, X_train, X_test, y_train, y_test = spliting_data(data_global, target_global)
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

@app.route("/roc-curve", methods=["GET"])
def roc_curve_endpoint():
    if y_test_global is None or X_test_global is None:
        return jsonify({"error": "Model belum dilatih atau data uji tidak tersedia"}), 400

    try:
        # Pastikan X_test_global berbentuk array 2D
        if len(X_test_global.shape) != 2:
            return jsonify({"error": "X_test_global tidak berbentuk array 2D"}), 400

        # Hitung probabilitas prediksi menggunakan X_test_global
        y_pred_proba = clf.predict_proba(X_test_global)[:, 1]

        # Buat grafik ROC Curve
        result = plot_roc_curve(y_test_global, y_pred_proba)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/diagnosa", methods=["POST"])
def diagnosa_form():
    try:
        # Ambil data dari form-data
        data = request.json
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
    app.run(debug=True, port=5001)