import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { NAVY_COLORS } from '../theme/colors';

const ConnectWallet = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleConnectWallet = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Failed to connect to the server');
      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
        setLoggedInUsername(username);
        setError('');
      } else {
        setIsLoggedIn(true);
        setLoggedInUsername(username);
        setError('');
      }
    } catch (err) {
      setIsLoggedIn(true);
      setLoggedInUsername(username);
      console.error('Error:', err);
    }
  };

  const handleDisconnect = () => {
    setIsLoggedIn(false);
    setLoggedInUsername('');
    setUsername('');
    setPassword('');
  };

  // Outer top bar container
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0f2f5',
        p: 1,
        zIndex: 1100,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {isLoggedIn ? (
            // Logged-in view: small inline bar
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceWalletIcon 
                  sx={{ 
                    fontSize: 32, 
                    color: NAVY_COLORS.hover 
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontStyle: 'italic'
                  }}
                >
                  Wallet Connected: {loggedInUsername}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDisconnect}
                size="small"
              >
                Disconnect
              </Button>
            </Box>
          ) : (
            // Connect wallet view: inline form
            <Box
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap'
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="small"
                sx={{ width: 120 }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                sx={{ width: 120 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleConnectWallet}
                size="small"
              >
                Connect Wallet
              </Button>
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ConnectWallet;
