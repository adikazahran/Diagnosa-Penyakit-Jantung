import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useFetchData } from '../hooks/useFetchData';

const Navbar = () => {
  const { loadData, labelCounts, trainModel } = useFetchData();  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  // Toggle Drawer
  const toggleDrawer = (state) => {
    setOpen(state);
  };

  // Handle Click Function
  const handleClick = async () => {
    await loadData();
    await labelCounts();
    await trainModel();
    setSuccess(true);
    setTimeout(() => navigate('/diagnosa'), 1000); 
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(135deg, #1e88e5 30%, #1565c0 90%)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'background 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 30px', height: '70px' }}>
          {/* Left Section: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="assets/lodig.png" // Replace with the correct path to your logo
              alt="Logo"
              style={{
                height: '40px', // Adjust the size as needed
                width: 'auto',
              }}
            />
          </Box>

          {/* Right Section: Navigation Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Button
              color="inherit"
              onClick={() => navigate('/')}
              sx={{
                '&:hover': { backgroundColor: '#63a4ff' },
                marginLeft: 3,
                fontSize: '16px',
                fontWeight: '500',
                padding: '8px 16px',
                textTransform: 'capitalize',
                transition: 'background 0.3s ease',
                borderRadius: '25px',
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={handleClick}
              sx={{
                '&:hover': { backgroundColor: '#63a4ff' },
                marginLeft: 3,
                fontSize: '16px',
                fontWeight: '500',
                padding: '8px 16px',
                textTransform: 'capitalize',
                transition: 'background 0.3s ease',
                borderRadius: '25px',
              }}
            >
              Diagnosa
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/tips')}
              sx={{
                '&:hover': { backgroundColor: '#63a4ff' },
                marginLeft: 3,
                fontSize: '16px',
                fontWeight: '500',
                padding: '8px 16px',
                textTransform: 'capitalize',
                transition: 'background 0.3s ease',
                borderRadius: '25px',
              }}
            >
              Tips Pencegahan
            </Button>
          </Box>

          {/* Mobile Menu Icon (Hamburger Icon) */}
          <IconButton
            sx={{ display: { xs: 'block', sm: 'none' }, color: '#fff' }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleClick()}>
              <ListItemText primary="Diagnosa" />
            </ListItem>
            <ListItem button onClick={() => navigate('/tips')}>
              <ListItemText primary="Tips Pencegahan" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
