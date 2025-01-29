import { useState } from 'react';
import { Container, TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Typography, FormHelperText, Box } from '@mui/material';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const DiagnosaPage = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/diagnosa', formData);
      const { prediction } = response.data;
      navigate('/result-diagnosa', {
        state: { formData, prediction }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar /> {/* Add the Navbar component here */}
      <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
          Formulir Diagnosa Pasien
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ background: '#f9f9f9', borderRadius: 2, padding: 3, boxShadow: 3 }}>
            <Grid container spacing={3}>
              {/* Usia */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Usia (Age)"
                  type="number"
                  fullWidth
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Jenis Kelamin */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Jenis Kelamin (Sex)</InputLabel>
                  <Select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={1}>Laki-laki</MenuItem>
                    <MenuItem value={0}>Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Chest Pain Type (cp) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Chest Pain Type (CP)</InputLabel>
                  <Select
                    name="cp"
                    value={formData.cp}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={0}>Angina Tipikal</MenuItem>
                    <MenuItem value={1}>Angina Atipikal</MenuItem>
                    <MenuItem value={2}>Nyeri Non Angina</MenuItem>
                    <MenuItem value={3}>Asimtomatik</MenuItem>
                  </Select>
                  <FormHelperText>
                    Menilai jenis nyeri dada yang dialami pasien:
                    <ul>
                      <li>0: Angina Tipikal - Nyeri dada yang khas akibat iskemia jantung.</li>
                      <li>1: Angina Atipikal - Nyeri dada yang tidak khas dan mungkin lebih ringan.</li>
                      <li>2: Nyeri Non-Angina - Nyeri dada yang bukan disebabkan oleh masalah jantung.</li>
                      <li>3: Asimtomatik - Tidak ada gejala nyeri dada.</li>
                    </ul>
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Tekanan Darah (trestbps) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tekanan Darah (trestbps)"
                  type="number"
                  fullWidth
                  name="trestbps"
                  value={formData.trestbps}
                  onChange={handleInputChange}
                  helperText="Tekanan darah sistolik (mm Hg). Berikut adalah kategori tekanan darah: 
                    - Normal: <120/80 mm Hg
                    - Prehipertensi: 120-129/<80 mm Hg
                    - Hipertensi Tahap 1: 130-139/80-89 mm Hg
                    - Hipertensi Tahap 2: ≥140/90 mm Hg
                    - Krisis Hipertensi: >180/>120 mm Hg"
                  required
                />
              </Grid>

              {/* Kolesterol (chol) */}
              <Grid item xs={12} sm={6}>
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
                  required
                />
              </Grid>

              {/* Gula Darah (FBS) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gula Darah (FBS)</InputLabel>
                  <Select
                    name="fbs"
                    value={formData.fbs}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={1}>Lebih dari 120 mg/dl</MenuItem>
                    <MenuItem value={0}>Kurang dari 120 mg/dl</MenuItem>
                  </Select>
                  <FormHelperText>Gula darah puasa lebih dari 120 mg/dl menunjukkan risiko diabetes.</FormHelperText>
                </FormControl>
              </Grid>

              {/* Elektrokardiogram Resting (restecg) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
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
                  <FormHelperText>Nilai EKG saat istirahat: normal (0), kelainan gelombang ST-T (1), atau hipertrofi ventrikel kiri (2).</FormHelperText>
                </FormControl>
              </Grid>

              {/* Detak Jantung Maksimal (thalach) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Detak Jantung Maksimal (thalach)"
                  type="number"
                  fullWidth
                  name="thalach"
                  value={formData.thalach}
                  onChange={handleInputChange}
                  helperText="Detak jantung maksimal yang tercapai selama aktivitas fisik. Normalnya, detak jantung maksimal dapat dihitung dengan rumus: 220 - usia (dalam tahun)."
                  required
                />
              </Grid>

              {/* Latihan Menginduksi Angina (exang) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Angina (exang)</InputLabel>
                  <Select
                    name="exang"
                    value={formData.exang}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={1}>Ya</MenuItem>
                    <MenuItem value={0}>Tidak</MenuItem>
                  </Select>
                  <FormHelperText>Apakah latihan fisik dapat menginduksi angina (nyeri dada)?</FormHelperText>
                </FormControl>
              </Grid>

              {/* Old Peak */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Old Peak"
                  type="number"
                  step="0.1"
                  fullWidth
                  name="oldpeak"
                  value={formData.oldpeak}
                  onChange={handleInputChange}
                  helperText="Depresi ST yang diinduksi oleh olahraga relatif terhadap istirahat."
                  required
                />
              </Grid>

              {/* Kemiringan Segmen ST (slope) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Kemiringan Segmen ST Latihan Puncak (Slope)</InputLabel>
                  <Select
                    name="slope"
                    value={formData.slope}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={0}>Miring ke Atas</MenuItem>
                    <MenuItem value={1}>Datar</MenuItem>
                    <MenuItem value={2}>Miring ke Bawah</MenuItem>
                  </Select>
                  <FormHelperText>Nilai kemiringan segmen ST saat latihan.</FormHelperText>
                </FormControl>
              </Grid>

              {/* Jumlah Pembuluh Darah (ca) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
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
                  <FormHelperText>Jumlah pembuluh darah utama yang terblokir atau terpengaruh oleh penyakit jantung.</FormHelperText>
                </FormControl>
              </Grid>

              {/* Thalassemia (thal) */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
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
                  <FormHelperText>Menunjukkan status kelainan darah yang disebut thalassemia.</FormHelperText>
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ padding: '12px' }}>
                  Kirim Diagnosa
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default DiagnosaPage;
