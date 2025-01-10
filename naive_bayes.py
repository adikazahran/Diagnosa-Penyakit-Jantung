from matplotlib import pyplot as plt
import pandas as pd
import numpy as np
import seaborn as sns
from sklearn.metrics import auc, classification_report, roc_curve, accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB

def jumlah_label(data, target_column):
    """Menghitung jumlah data untuk setiap label."""
    if target_column not in data.columns:
        print(f"Kolom '{target_column}' tidak ditemukan!")
        return
    total = len(data[target_column])
    data_1 = data[target_column].sum()  # Asumsi kolom berisi 0 dan 1
    data_0 = total - data_1
    print(f"Total Data: {total}")
    print(f"Label 1: {data_1}, Label 0: {data_0}")

def chart(data, target_column):
    """Menampilkan countplot untuk kolom target."""
    if target_column not in data.columns:
        print(f"Kolom '{target_column}' tidak ditemukan!")
        return
    sns.countplot(x=data[target_column])
    plt.title(f"Distribusi Label untuk '{target_column}'")
    plt.show()

def spliting_data(data, target_column, test_size=0.3, seed=0):
    """Membagi data menjadi training dan testing, lalu melatih model."""
    if target_column not in data.columns:
        print(f"Kolom '{target_column}' tidak ditemukan!")
        return None, None, None, None, None

    try:
        X = data.drop(columns=[target_column])
        y = data[target_column]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=seed)

        clf = GaussianNB()
        clf.fit(X_train, y_train)

        print(f"Model dilatih dengan akurasi training: {clf.score(X_train, y_train):.2f}")
        return clf, X_train, X_test, y_train, y_test

    except Exception as e:
        print(f"Kesalahan saat split data: {e}")
        return None, None, None, None, None

def prediksi(model, X_test, y_test):
    """Melakukan prediksi dan menampilkan evaluasi model."""
    try:
        pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, pred)
        pred_proba = model.predict_proba(X_test)[:, 1]

        fpr, tpr, thresholds = roc_curve(y_test, pred_proba)
        roc_auc = auc(fpr, tpr)

        print("\nLaporan Klasifikasi:")
        print(classification_report(y_test, pred))
        print(f"Akurasi: {accuracy:.2f}, AUC: {roc_auc:.2f}")

        plt.figure()
        plt.plot(fpr, tpr, label=f'ROC Curve (AUC = {roc_auc:.2f})')
        plt.plot([0, 1], [0, 1], linestyle='--', color='gray')
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve')
        plt.legend()
        plt.show()

        return {"accuracy": accuracy, "roc_auc": roc_auc}
    except Exception as e:
        print(f"Kesalahan saat prediksi: {e}")
        return None

def bar_chart(y_test, y_pred):
    """Menampilkan bar chart dari laporan klasifikasi."""
    try:
        report = classification_report(y_test, y_pred, output_dict=True)
        df_report = pd.DataFrame(report).transpose()
        df_report.drop(columns='support', inplace=True)
        df_report.iloc[:3].plot(kind='bar')
        plt.title('Classification Report')
        plt.show()
    except Exception as e:
        print(f"Kesalahan saat membuat bar chart: {e}")

import pandas as pd

def diagnosa(model):
    print("\nMasukkan Data Pasien untuk Prediksi Penyakit Jantung:")  
    try:
        # Input data dengan validasi
        age = int(input("Usia (tahun): "))
        sex = int(input("Jenis Kelamin (0=Perempuan, 1=Laki-laki): "))
        cp = int(input("Jenis Nyeri Dada (0=Normal, 1=Angina, 2=Non-anginal, 3=Asimtomatik): "))
        trestbps = int(input("Tekanan Darah (mmHg): "))
        chol = int(input("Kolesterol (mg/dl): "))
        fbs = int(input("Gula Darah Puasa > 120 mg/dl (0=Tidak, 1=Ya): "))
        restecg = int(input("Hasil ECG (0=Normal, 1=ST-T abnormal, 2=Hipertrofi): "))
        thalach = int(input("Denyut Jantung Maksimum (bpm): "))
        exang = int(input("Angina Olahraga (0=Tidak, 1=Ya): "))
        oldpeak = float(input("Oldpeak (Depresi ST): "))
        slope = int(input("Kemiringan ST (0=Naik, 1=Stabil, 2=Turun): "))
        ca = int(input("Jumlah Pembuluh (0-3): "))
        thal = int(input("Thalassemia (1=Normal, 2=Defek Tetap, 3=Defek Reversibel): "))
    except ValueError:
        print("Input tidak valid. Mohon masukkan nilai numerik yang benar.")
        return

    # Susun input ke dalam DataFrame
    try:
        new_patient_df = pd.DataFrame([{
            'age': age,
            'sex': sex,
            'cp': cp,
            'trestbps': trestbps,
            'chol': chol,
            'fbs': fbs,
            'restecg': restecg,
            'thalach': thalach,
            'exang': exang,
            'oldpeak': oldpeak,
            'slope': slope,
            'ca': ca,
            'thal': thal
        }])
    except Exception as e:
        print(f"Terjadi kesalahan saat memproses data: {e}")
        return

    # Prediksi menggunakan model
    try:
        prediction = model.predict(new_patient_df)
        print(prediction[0])
        result = "Positif" if prediction[0] == 1 else "Negatif"
        result = "Negatif" if prediction[0] == 1 else "Positif"
        print(f"\nHasil Prediksi: Pasien {result} Penyakit Jantung")
    except Exception as e:
        print(f"Terjadi kesalahan saat melakukan prediksi: {e}")

# Main Program
while True:
    # Pilih file input
    print("Tekan [E]xit")
    file_name = input("Masukkan nama file dataset (CSV/Excel): ").strip()
    try:
        if file_name.endswith('.csv'):
            data = pd.read_csv(file_name)
        elif file_name.endswith(('.xlsx', '.xls')):
            data = pd.read_excel(file_name)
        elif file_name.upper() == "E":
            exit()
        else:
            print("Format file tidak dikenali. Harap gunakan CSV atau Excel.")
            continue

        print("Data berhasil dimuat!")
        print(data.head())

    except Exception as e:
        print(f"Kesalahan saat memuat file: {e}")
        continue

    # Pilih kolom target
    print("\nKolom yang tersedia:")
    print(data.columns.tolist())

    target_column = input("Masukkan kolom target (label): ").strip()
    if target_column not in data.columns:
        print(f"Kolom '{target_column}' tidak ditemukan!")
        continue

    while True:
        print("\nMenu:")
        print("[1] Jumlah Label")
        print("[2] Chart")
        print("[3] Split Data dan Latih Model")
        print("[4] Prediksi")
        print("[5] Bar Chart")
        print("[6] Diagnosa Pasien")
        print("[7] Exit")
        choice = input("Pilih opsi: ").strip()

        if choice == "1":
            jumlah_label(data, target_column)
        elif choice == "2":
            chart(data, target_column)
        elif choice == "3":
            test_size = float(input("Masukkan test_size (misal 0.3): "))
            clf, X_train, X_test, y_train, y_test = spliting_data(data, target_column, test_size)
        elif choice == "4":
            if 'clf' in locals():
                prediksi(clf, X_test, y_test)
            else:
                print("Model belum dilatih! Pilih opsi [3] untuk melatih model.")
        elif choice == "5":
            if 'clf' in locals():
                y_pred = clf.predict(X_test)
                bar_chart(y_test, y_pred)
            else:
                print("Model belum dilatih! Pilih opsi [3] untuk melatih model.")
        elif choice == "6":
            if 'clf' in locals():
                    diagnosa(model=clf)
            else:
                print("Model belum dilatih! Pilih opsi [3] untuk melatih model.")
        elif choice == "7":
            print("Keluar dari program.")
            break
        else:
            print("Pilihan tidak valid.")