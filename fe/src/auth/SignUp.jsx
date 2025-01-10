import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Divider, IconButton, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { keyframes } from '@emotion/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import zxcvbn from 'zxcvbn'; // Import zxcvbn for password strength
import { useFetchData } from '../hooks/useFetchData';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [passwordStrength, setPasswordStrength] = useState(0); // State for password strength
  const navigate = useNavigate();

  const { register } = useFetchData();

  const handleRegister = () => {
    // Validasi username: minimal 3 karakter, hanya alfanumerik
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError('Username harus terdiri dari 3-16 karakter alfanumerik atau underscore.');
      return;
    } else {
      setUsernameError('');
    }

    // Validasi password dengan regex yang lebih ketat
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password harus terdiri dari angka, huruf kecil, huruf besar, dan karakter khusus, tanpa spasi, dan panjangnya antara 8 hingga 16 karakter.');
      return;
    } else {
      setPasswordError('');
    }

    try {
       register({username, password})
        navigate('/login')
    } catch (e) {
        console.log(e)
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError(''); // Clear username error when user starts typing
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    const strength = zxcvbn(password).score; // Get password strength
    setPasswordStrength(strength);

    // Clear password error when the password is valid
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (passwordRegex.test(password)) {
      setPasswordError('');
    }
  };

  // Animation Keyframes
  const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);      
    }
    50% {
      transform: translateY(-15px);
    }
  `;

  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #1e88e5, #1565c0)',
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          boxShadow: '0 6px 30px rgba(0, 0, 0, 0.2)',
          padding: 4,
          textAlign: 'center',
          position: 'relative',
          animation: `${fadeIn} 1s ease-in`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-35px',
            left: '43%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #1e88e5, #1565c0)',
            borderRadius: '50%',
            width: 70,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            animation: `${bounce} 2s infinite`,
          }}
        >
          <LockOutlinedIcon sx={{ color: '#fff', fontSize: 36 }} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            marginTop: 6,
            marginBottom: 1,
            fontWeight: 600,
            color: '#1565c0',
          }}
        >
          Daftar Akun Baru
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 3,
            color: '#757575',
          }}
        >
          Buat akun baru untuk melanjutkan.
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 1 }}
          value={username}
          onChange={handleUsernameChange}
          error={!!usernameError}
          helperText={usernameError}
        />
        <Typography
          variant="caption"
          sx={{ color: '#757575', textAlign: 'left', display: 'block', marginBottom: 2 }}
        >
          Username harus terdiri dari 3-16 karakter alfanumerik atau underscore.
        </Typography>

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 1 }}
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: '#757575' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: '#757575', textAlign: 'left', display: 'block', marginBottom: 3 }}
        >
          Minimal 8 karakter dengan kombinasi huruf dan angka.
        </Typography>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <LinearProgress
            variant="determinate"
            value={passwordStrength * 25}
            sx={{
              height: 8,
              borderRadius: 2,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
                backgroundColor:
                  passwordStrength === 0
                    ? '#e57373'
                    : passwordStrength === 1
                    ? '#ffb74d'
                    : passwordStrength === 2
                    ? '#ffeb3b'
                    : passwordStrength === 3
                    ? '#4caf50'
                    : '#388e3c',
              },
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            color:
              passwordStrength === 0
                ? '#e57373'
                : passwordStrength === 1
                ? '#ffb74d'
                : passwordStrength === 2
                ? '#ffeb3b'
                : passwordStrength === 3
                ? '#4caf50'
                : '#388e3c',
            textAlign: 'left',
          }}
        >
          {passwordStrength === 0
            ? 'Password terlalu lemah'
            : passwordStrength === 1
            ? 'Password lemah'
            : passwordStrength === 2
            ? 'Password sedang'
            : passwordStrength === 3
            ? 'Password kuat'
            : 'Password sangat kuat'}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '12px 0',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            borderRadius: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          onClick={handleRegister}
        >
          Daftar
        </Button>

        <Divider
          sx={{
            marginY: 3,
            color: '#bdbdbd',
            fontSize: '14px',
          }}
        >
          atau
        </Divider>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{
            padding: '12px 0',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            borderRadius: 2,
            color: '#1565c0',
            borderColor: '#1565c0',
            '&:hover': {
              backgroundColor: 'rgba(21, 101, 192, 0.1)',
              borderColor: '#1565c0',
            },
          }}
          onClick={() => navigate('/login')}
        >
          Masuk ke Akun Anda
        </Button>

        <Snackbar
          open={success}
          message="Registrasi Berhasil!"
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        />
      </Box>
    </Box>
  );
};

export default SignUp;
