import React from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
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
    navigate('/diagnosa');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 2 }}>
        Ayo Cek Diagnosa Stroke!
      </Typography>
      
      <Typography variant="body1" sx={{ color: '#666', marginBottom: 3, textAlign: 'center', maxWidth: '400px' }}>
        Dengan mengisi data medis yang kami sediakan, Anda dapat mengetahui apakah Anda berisiko mengalami stroke.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        }}
        onClick={handleClick}
      >
        Mulai Diagnosa
      </Button>

      <Snackbar
        open={success}
        message="Request Berhasil!"
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      />
    </Box>
  );
}

export default HomePage;
