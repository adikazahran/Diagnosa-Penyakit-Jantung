import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import Navbar from './Navbar';

const ResultDiagnosaPage = () => {
  const location = useLocation();
  const { formData, prediction } = location.state || {};

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      {/* Navbar */}
      <nav className='navbar'>
      <Navbar />
      </nav>

      {/* Inline CSS for Print Media */}
      <style>
        {`
          @media print {
            /* Sembunyikan tombol Print saat dicetak */
            .print-button {
              display: none;
            }     
            /* Sembunyikan Navbar saat dicetak */
            .navbar {
              display: none;
            }       
          }
        `}
      </style>

      <Container maxWidth="md" sx={{ paddingTop: 5, paddingBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1e88e5', paddingBottom: 3 }}>
          Hasil Diagnosa Pasien
        </Typography>

        <Box sx={{ background: '#f9f9f9', borderRadius: 2, padding: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Prediksi Diagnosis:
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {prediction ? (
              <>
                Hasil pemeriksaan menunjukkan bahwa pasien tersebut{' '}
                <Typography component="span" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  {prediction}
                </Typography>{' '}
                untuk saat ini.
              </>
            ) : (
              'Data tidak ditemukan. Mohon coba kembali.'
            )}
          </Typography>

          {/* Display user input data */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>
            Data Input Pasien:
          </Typography>
          <Paper sx={{ padding: 2, marginTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Usia:</strong> {formData.age}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Jenis Kelamin:</strong> {formData.sex === 1 ? 'Laki-laki' : 'Perempuan'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Jenis Nyeri Dada:</strong> {formData.cp === 0 ? 'Angina Tipikal' : formData.cp === 1 ? 'Angina Atipikal' : formData.cp === 2 ? 'Nyeri Non-Angina' : 'Asimtomatik'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Tekanan Darah:</strong> {formData.trestbps} mm Hg</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Kolesterol:</strong> {formData.chol} mg/dl</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Gula Darah Puasa:</strong> {formData.fbs === 1 ? 'Lebih dari 120 mg/dl' : 'Kurang dari 120 mg/dl'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Elektrokardigram Resting:</strong> {formData.restecg === 0 ? 'Normal' : formData.restecg === 1 ? 'ST-T Abnormal' : 'Hipertofi Ventrikel Kiri'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Detak Jantung Maksimal:</strong> {formData.thalach} bpm</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Angina saat Latihan:</strong> {formData.exang === 1 ? 'Ya' : 'Tidak'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Old Peak:</strong> {formData.oldpeak}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Kemiringan ST:</strong> {formData.slope === 0 ? 'Miring ke Atas' : formData.slope === 1? 'Datar' : 'Miring ke Bawah'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Thalassemia:</strong> {formData.thal === 0 ? 'Normal' : formData.thal === 1 ? 'Cacat Tetap' : 'Cacat Reversibel'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Pembuluh Darah yang Terblokir:</strong> {formData.ca === 0 ? 'Tidak ada pembuluh darah yang terblokir' : formData.ca === 1 ? 'Satu pembuluh darah terblokir' : formData.ca === 2 ? 'Dua pembuluh darah terblokir' : 'Tiga pembuluh darah terblokir'}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Print Button */}
          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handlePrint} 
              className="print-button" 
            >
              Print Hasil Diagnosa
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResultDiagnosaPage;
