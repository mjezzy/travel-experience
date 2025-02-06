import React from 'react';
import HomeScreen from './components/HomeScreen';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
