import React from 'react';
import { Box, Button, Typography, Snackbar, Grid, Paper } from '@mui/material';
import { useFetchData } from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { loadData, labelCounts, trainModel } = useFetchData();
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    loadData();
    labelCounts();
    trainModel();
    setSuccess(true);
    setTimeout(() => navigate('/diagnosa'), 1000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
        padding: '0px !important',
        margin: '0px !important',
        // boxSizing: 'border-box',
      }}
    >
      {/* Gambar Header */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '650px',
          marginBottom: 4,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src="https://png.pngtree.com/png-clipart/20231005/original/pngtree-examination-of-heart-and-blood-pressure-by-petite-cardiologist-and-nurse-png-image_12961416.png"
          alt="Header Image"
          style={{
            width: '100%',
            height: 'auto',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </Box>

      {/* Judul Halaman */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#1e88e5',
          marginBottom: 3,
          textAlign: 'center',
          fontSize: { xs: '2rem', sm: '2.5rem' },
        }}
      >
        Ayo Cek Diagnosa Stroke!
      </Typography>

      {/* Deskripsi */}
      <Typography
        variant="body1"
        sx={{
          color: '#555',
          marginBottom: 4,
          textAlign: 'center',
          maxWidth: '500px',
          fontSize: '1.1rem',
        }}
      >
        Dengan mengisi data medis yang kami sediakan, Anda dapat mengetahui apakah Anda berisiko mengalami stroke.
      </Typography>

      {/* Tombol Aksi */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          padding: '12px 30px',
          fontSize: '1.25rem',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          },
        }}
        onClick={handleClick}
      >
        Mulai Diagnosa
      </Button>

      {/* Section Informasi */}
      <Box
        sx={{
          marginTop: 6,
          padding: 3,
          backgroundColor: '#f1f1f1',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '650px',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1e88e5',
            marginBottom: 2,
          }}
        >
          Kenapa Diagnosa Stroke Penting?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: '1rem',
            marginBottom: 2,
          }}
        >
          Stroke merupakan kondisi medis yang membutuhkan perhatian segera. Dengan aplikasi ini, Anda dapat mengecek apakah Anda berisiko mengalami stroke dengan mengisi data medis yang kami sediakan.
        </Typography>
      </Box>

      {/* Kontak atau Bantuan */}
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 4, justifyContent: 'center', textAlign: 'center' }}
      >
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: '#fff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
              Butuh Bantuan?
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Anda dapat menghubungi kami melalui email di <strong>HanifJykt12@gmail.com</strong> untuk bantuan lebih lanjut.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          marginTop: 6,
          padding: '2px 2px 0 2px',
          backgroundColor: '#1e88e5',
          height: '50px',
          color: '#fff',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2">
          © 2025 Diagnosa Stroke - Kelompok Gerak Cepat By Hanif.
        </Typography>
      </Box>

      {/* Snackbar untuk Feedback */}
      <Snackbar
        open={success}
        message="Request Berhasil!"
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#388e3c',
          },
        }}
      />
    </Box>
  );
}

export default HomePage;
