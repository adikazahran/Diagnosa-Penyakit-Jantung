import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Tooltip, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useFetchData } from '../hooks/useFetchData';

const Navbar = () => {
  const { loadData, labelCounts, trainModel } = useFetchData();
  const navigate = useNavigate();

  // State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  // Function to toggle drawer
  const toggleDrawer = (state) => {
    setOpenDrawer(state);
  };

  // Handle the Diagnosa click action
  const handleClickDiagnosa = async () => {
    await loadData();
    await labelCounts();
    await trainModel();
    setTimeout(() => navigate('/diagnosa'), 1000);
  };

  // Effect to check login status and fetch username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
      navigate('/login');
    }
  }, []);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  // Handle Popover
  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const isPopoverOpen = Boolean(popoverAnchor);

  // Styles for Buttons
  const buttonStyles = {
    color: '#FFF',
    backgroundColor: 'transparent',
    marginLeft: 3,
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 16px',
    textTransform: 'capitalize',
    transition: 'background 0.3s ease',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: '#63a4ff',
      color: '#000',
    },
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(135deg, #1e88e5 30%, #1565c0 90%)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 30px' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="assets/lodig.png"
              alt="Logo"
              style={{ height: '40px', width: 'auto' }}
            />
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Button onClick={() => navigate('/')} sx={{ ...buttonStyles, marginRight: -3 }}>
              Home
            </Button>
            <Button onClick={handleClickDiagnosa} sx={{ ...buttonStyles, marginRight: -3 }}>
              Diagnosa
            </Button>
            <Button onClick={() => navigate('/tips')} sx={{ ...buttonStyles, marginRight: 3 }}>
              Tips Pencegahan
            </Button>

            {isLoggedIn ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                        sx={{
                            bgcolor: '#1565c0',
                            color: '#FFF',
                            width: 25,
                            height: 25,
                            background: 'linear-gradient(135deg, #D1C4E9, #BA68C8, #E040FB)',
                            padding: '6px',
                            border: '2px solid #FFF',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                            transform: 'scale(1.1)', 
                            borderColor: '#FFEB3B', 
                            },
                        }}
                        onClick={handlePopoverOpen}
                        >
                        {username?.charAt(0).toUpperCase()}
                    </Avatar>


                  <Popover
                    open={isPopoverOpen}
                    anchorEl={popoverAnchor}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Box sx={{ padding: '10px 20px', textAlign: 'center' }}>
                      <Typography variant="body1">
                        Hi, {username}!
                      </Typography>
                    </Box>
                  </Popover>

                  <Tooltip title="Logout">
                    <IconButton onClick={handleLogout} sx={{ color: '#FFF', '&:hover': { backgroundColor: '#63a4ff' } }}>
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} sx={buttonStyles}>
                  <LoginIcon /> Login
                </Button>
                <Button onClick={() => navigate('/register')} sx={buttonStyles}>
                  <PersonAddIcon /> Register
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { xs: 'block', sm: 'none' }, color: '#fff' }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Section */}
      <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#1565c0',
            color: '#FFF',
            height: '100%',
          }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Home" primaryTypographyProps={{ style: { color: '#FFF' } }} />
            </ListItem>
            <ListItem button onClick={handleClickDiagnosa}>
              <ListItemText primary="Diagnosa" primaryTypographyProps={{ style: { color: '#FFF' } }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/tips')}>
              <ListItemText primary="Tips Pencegahan" primaryTypographyProps={{ style: { color: '#FFF' } }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/login')}>
              <LoginIcon style={{ marginRight: '8px' }} />
              <ListItemText primary="Login" primaryTypographyProps={{ style: { color: '#FFF' } }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/register')}>
              <PersonAddIcon style={{ marginRight: '8px' }} />
              <ListItemText primary="Register" primaryTypographyProps={{ style: { color: '#FFF' } }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
