import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
        padding: 4,
      }}
    >
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      {activeTab === 0 ? <SignIn /> : <SignUp />}
    </Box>
  );
};

export default AuthPage;
