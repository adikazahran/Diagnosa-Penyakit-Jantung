import { useState } from 'react';
import { Container, TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Typography, FormHelperText } from '@mui/material';
import axiosInstance from '../api/axios';

const DiagnosaPage = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
    target: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    const newValue = value === '' 
      ? value
      : (name === 'oldpeak' ? parseFloat(value) : parseInt(value, 10));
  
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        const response = axiosInstance.post('/diagnosa', formData);
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Formulir Diagnosa Pasien
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Usia */}
          <Grid item xs={12}>
            <TextField
              label="Usia (Age)"
              type="number"
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Jenis Kelamin */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Jenis Kelamin (Sex)</InputLabel>
              <Select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                type='number'
              >
                <MenuItem value={1}>Laki-laki</MenuItem>
                <MenuItem value={0}>Perempuan</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Chest Pain Type (cp) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Chest Pain Type (CP)</InputLabel>
              <Select
                name="cp"
                value={formData.cp}
                onChange={handleInputChange}
              >
                <MenuItem value={1}>Angina Tipikal</MenuItem>
                <MenuItem value={2}>Angina Atipikal</MenuItem>
                <MenuItem value={3}>Nyeri Non Angina</MenuItem>
                <MenuItem value={4}>Asimtomatik</MenuItem>
              </Select>
              <FormHelperText>
                Menilai jenis nyeri dada yang dialami pasien:
                <ul>
                  <li><strong>1</strong>: Angina Tipikal - Nyeri dada yang khas akibat iskemia jantung.</li>
                  <li><strong>2</strong>: Angina Atipikal - Nyeri dada yang tidak khas dan mungkin lebih ringan.</li>
                  <li><strong>3</strong>: Nyeri Non-Angina - Nyeri dada yang bukan disebabkan oleh masalah jantung.</li>
                  <li><strong>4</strong>: Asimtomatik - Tidak ada gejala nyeri dada.</li>
                </ul>
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Tekanan Darah (trestbps) */}
          <Grid item xs={12}>
            <TextField
              label="Tekanan Darah (trestbps)"
              type="number"
              fullWidth
              name="trestbps"
              value={formData.trestbps}
              onChange={handleInputChange}
              helperText="Tekanan darah sistolik (dalam mm Hg). Berikut adalah kategori tekanan darah:
                - Normal: <120/80 mm Hg
                - Prehipertensi: 120-129/<80 mm Hg
                - Hipertensi Tahap 1: 130-139/80-89 mm Hg
                - Hipertensi Tahap 2: ≥140/90 mm Hg
                - Krisis Hipertensi: >180/>120 mm Hg"
            />
          </Grid>

          {/* Kolesterol (chol) */}
          <Grid item xs={12}>
            <TextField
              label="Kolesterol (chol)"
              type="number"
              fullWidth
              name="chol"
              value={formData.chol}
              onChange={handleInputChange}
              helperText="Kolesterol total dalam darah (mg/dl). Berikut adalah kategori kolesterol:
                - Normal: <200 mg/dl
                - Borderline Tinggi: 200–239 mg/dl
                - Tinggi: ≥240 mg/dl
                Kolesterol tinggi meningkatkan risiko penyakit jantung dan stroke."
            />
          </Grid>

          {/* Gula Darah (FBS) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Gula Darah (FBS)</InputLabel>
              <Select
                name="fbs"
                value={formData.fbs}
                onChange={handleInputChange}
              >
                <MenuItem value={1}>Lebih dari 120 mg/dl</MenuItem>
                <MenuItem value={0}>Kurang dari 120 mg/dl</MenuItem>
              </Select> 
              <FormHelperText>
                Gula darah puasa, dengan nilai lebih dari 120 mg/dl menunjukkan risiko diabetes.
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Elektrokardiogram Resting (restecg) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Elektrokardiogram Resting (restecg)</InputLabel>
              <Select
                name="restecg"
                value={formData.restecg}
                onChange={handleInputChange}
              >
                <MenuItem value={0}>Normal</MenuItem>
                <MenuItem value={1}>ST-T Abnormal</MenuItem>
                <MenuItem value={2}>Hipertrofi Ventrikel Kiri</MenuItem>
              </Select>
              <FormHelperText>
                Nilai EKG saat istirahat: normal (0), kelainan gelombang ST-T (1), atau hipertrofi ventrikel kiri (2).
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Detak Jantung Maksimal (thalach) */}
          <Grid item xs={12}>
            <TextField
                label="Detak Jantung Maksimal (thalach)"
                type="number"
                fullWidth
                name="thalach"
                value={formData.thalach}
                onChange={handleInputChange}
                helperText="Detak jantung maksimal yang tercapai selama aktivitas fisik. Normalnya, detak jantung maksimal dapat dihitung dengan rumus: 220 - usia (dalam tahun). Jika nilai detak jantung lebih tinggi atau lebih rendah dari nilai normal, bisa menunjukkan adanya masalah jantung atau kondisi medis lainnya."
            />
          </Grid>


          {/* Latihan Menginduksi Angina (exang) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Angina (exang)</InputLabel>
                <Select
                name="exang"
                value={formData.exang}
                onChange={handleInputChange}
                >
                <MenuItem value={1}>Ya (Latihan Menginduksi Angina)</MenuItem>
                <MenuItem value={0}>Tidak (Latihan Tidak Menginduksi Angina)</MenuItem>
                </Select>
                <FormHelperText>
                Apakah latihan fisik dapat menginduksi angina (nyeri dada)? 
                - **1 = Ya** (Pasien merasakan angina saat berlatih fisik, mungkin menunjukkan masalah dengan aliran darah jantung).
                - **0 = Tidak** (Pasien tidak merasakan angina saat berlatih fisik).
                </FormHelperText>
            </FormControl>
          </Grid>


          {/* Old Peak */}
          <Grid item xs={12}>
            <TextField
                label="Old Peak"
                type="number"
                step="0.1"
                fullWidth
                name="oldpeak"
                value={formData.oldpeak}
                onChange={handleInputChange}
                helperText="Depresi ST yang diinduksi oleh olahraga relatif terhadap istirahat. 
                - Nilai 0: Tidak ada depresi ST (tidak ada indikasi gangguan pasokan darah ke jantung saat berolahraga).
                - Nilai positif (>0): Depresi ST terjadi, yang menunjukkan kemungkinan iskemia jantung saat berolahraga.
                - Nilai negatif (<0): Jarang terjadi, dapat menunjukkan fenomena lain yang memengaruhi EKG."
            />
          </Grid>


          {/* Kemiringan Segmen ST (slope) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Kemiringan Segmen ST Latihan Puncak (Slope)</InputLabel>
                <Select
                name="slope"
                value={formData.slope}
                onChange={handleInputChange}
                >
                <MenuItem value={1}>Miring ke Atas</MenuItem>
                <MenuItem value={2}>Datar</MenuItem>
                <MenuItem value={3}>Miring ke Bawah</MenuItem>
                </Select>
                <FormHelperText>
                Kemiringan segmen ST saat latihan. Berikut adalah penjelasan nilai-nilainya:
                - **Nilai 1**: Miring ke atas (Segmen ST menunjukkan pemulihan normal, tidak ada indikasi iskemia).
                - **Nilai 2**: Datar (Segmen ST tidak menunjukkan perubahan besar, bisa menandakan keseimbangan oksigen yang normal).
                - **Nilai 3**: Miring ke bawah (Menunjukkan depresi ST yang mengindikasikan iskemia miokardial, yang bisa berarti kurangnya pasokan darah ke jantung).
                </FormHelperText>
            </FormControl>
          </Grid>


          {/* Jumlah Pembuluh Darah (ca) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Jumlah Pembuluh Darah Utama yang Terblokir (CA)</InputLabel>
                <Select
                name="ca"
                value={formData.ca}
                onChange={handleInputChange}
                >
                <MenuItem value={0}>Tidak ada pembuluh darah yang terblokir</MenuItem>
                <MenuItem value={1}>Satu pembuluh darah utama terblokir</MenuItem>
                <MenuItem value={2}>Dua pembuluh darah utama terblokir</MenuItem>
                <MenuItem value={3}>Tiga pembuluh darah utama terblokir</MenuItem>
                </Select>
                <FormHelperText>
                Ini menunjukkan jumlah pembuluh darah utama yang terblokir atau terpengaruh oleh penyakit jantung koroner:
                - **0**: Tidak ada pembuluh darah yang terblokir (kondisi jantung sangat baik).
                - **1**: Satu pembuluh darah utama terblokir (gejala ringan, pengobatan mungkin diperlukan).
                - **2**: Dua pembuluh darah utama terblokir (penyakit jantung lebih parah, tindakan medis diperlukan).
                - **3**: Tiga pembuluh darah utama terblokir (kondisi sangat serius, membutuhkan intervensi medis segera).
                </FormHelperText>
            </FormControl>
           </Grid>


          {/* Thalassemia (thal) */}
          <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Thalassemia (Thal)</InputLabel>
                <Select
                name="thal"
                value={formData.thal}
                onChange={handleInputChange}
                >
                <MenuItem value={0}>Normal</MenuItem>
                <MenuItem value={1}>Cacat Tetap</MenuItem>
                <MenuItem value={2}>Cacat Reversibel</MenuItem>
                </Select>
                <FormHelperText>
                Menunjukkan status kelainan darah yang disebut thalassemia:
                - **0**: Normal (tidak ada thalassemia, kondisi darah sehat).
                - **1**: Cacat Tetap (thalassemia parah, memerlukan pengobatan berkelanjutan).
                - **2**: Cacat Reversibel (thalassemia ringan, bisa dikelola dengan pengobatan).
                </FormHelperText>
            </FormControl>
          </Grid>


          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Kirim Diagnosa
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default DiagnosaPage;
