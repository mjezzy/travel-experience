import { createTheme } from '@mui/material/styles';
import { NAVY_COLORS } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: NAVY_COLORS.medium,
      dark: NAVY_COLORS.dark,
      light: NAVY_COLORS.light
    },
    background: {
      default: '#e8eaf6',  // Softer background
      paper: NAVY_COLORS.medium
    },
    text: {
      primary: '#1a237e',  // Navy text for light background
      secondary: 'rgba(26, 35, 126, 0.7)'  // Softer navy for secondary text
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: NAVY_COLORS.medium,
          color: NAVY_COLORS.text
        }
      }
    }
  }
});