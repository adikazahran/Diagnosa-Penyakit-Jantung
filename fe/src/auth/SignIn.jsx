import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Divider, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useFetchData } from '../hooks/useFetchData';

const SignIn = () => {
    const {login} = useFetchData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Handle email change
  const handleEmailChange = (e) => {
    setUsername(e.target.value);
    if (emailError) {
      setEmailError(''); // Clear email error when user starts typing
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // Clear password error when the password is valid
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (passwordRegex.test(e.target.value)) {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!passwordRegex.test(password)) {
        setPasswordError('Password harus terdiri dari angka, huruf kecil, huruf besar, dan karakter khusus, tanpa spasi, dan panjangnya antara 8 hingga 16 karakter.');
        return;
    } else {
        setPasswordError('');
    }

    try {
        const response = await login({ username, password });
        if (response?.error) {
            setLoginError(response.error || 'Username atau password salah, atau akun belum terdaftar.');
        } else {
            localStorage.setItem('username', username);
            setSuccess(true);
            navigate('/');
        }
    } catch (e) {
        setLoginError('Terjadi kesalahan saat mencoba login. Silakan coba lagi.');
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
        {/* Decorative Icon */}
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

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            marginTop: 6,
            marginBottom: 1,
            fontWeight: 600,
            color: '#1565c0',
          }}
        >
          Masuk ke Akun Anda
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 3,
            color: '#757575',
          }}
        >
          Gunakan akun terdaftar Anda untuk melanjutkan.
        </Typography>

        {/* Input Fields */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 1 }}
          value={username}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />
        <Typography
          variant="caption"
          sx={{ color: '#757575', textAlign: 'left', display: 'block', marginBottom: 2 }}
        >
          Gunakan email yang valid, misalnya: user@example.com
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
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: '#757575', textAlign: 'left', display: 'block', marginBottom: 3 }}
        >
          Minimal 8 karakter dengan kombinasi huruf dan angka.
        </Typography>

        {/* Login Button */}
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
          onClick={handleLogin}
        >
          Masuk
        </Button>

        {/* Divider */}
        <Divider
          sx={{
            marginY: 3,
            color: '#bdbdbd',
            fontSize: '14px',
          }}
        >
          atau
        </Divider>

        {/* Register Button */}
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
          onClick={() => navigate('/register')}
        >
          Daftar Akun Baru
        </Button>

        {/* Snackbar */}
        <Snackbar
          open={success}
          message="Login Berhasil!"
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        />
        <Snackbar
            open={!!loginError}
            message={loginError}
            autoHideDuration={4000}
            onClose={() => setLoginError('')}
            />

      </Box>
    </Box>
  );
};

export default SignIn;
