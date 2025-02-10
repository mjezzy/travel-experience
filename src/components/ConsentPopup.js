import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  CircularProgress 
} from '@mui/material';
import { NAVY_COLORS } from '../theme/colors';
import { getUserData } from '../integrations/walletIntegration';

const ConsentPopup = ({ offer, onClose, onAccept }) => {
  const [consentType, setConsentType] = useState('once');
  const [isLoading, setIsLoading] = useState(false);

  const handleConsent = async () => {
    try {
      // get user data from backend service
	  setIsLoading(true);
      console.log('Requesting User Data from backend service...');
	  const userDataRs = getUserData();
	  //var parsedRs = parseResponse(userDataRs);

      // get offers from vendor(s) based on user data
      onAccept(offer);
      onClose();
    } catch (error) {
      console.error('Client error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog 
      open 
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#ffffff',
          color: NAVY_COLORS.softText,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          '& .MuiDialogTitle-root': {
            borderBottom: '1px solid rgba(63, 81, 181, 0.12)'
          }
        }
      }}
    >
      <DialogTitle sx={{ color: NAVY_COLORS.medium }}>
        Consent Required
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: NAVY_COLORS.medium, my: 2 }}>
          We need to share your credentials with the vendor to get more details about this offer.
        </Typography>
        <RadioGroup 
          value={consentType} 
          onChange={(e) => setConsentType(e.target.value)}
        >
          <FormControlLabel 
            value="once" 
            control={
              <Radio 
                sx={{ 
                  color: NAVY_COLORS.medium,
                  '&.Mui-checked': {
                    color: NAVY_COLORS.medium
                  }
                }}
              />
            } 
            label="Share just this once"
            sx={{ color: NAVY_COLORS.medium }}
          />
          <FormControlLabel 
            value="indefinitely" 
            control={
              <Radio 
                sx={{ 
                  color: NAVY_COLORS.medium,
                  '&.Mui-checked': {
                    color: NAVY_COLORS.medium
                  }
                }}
              />
            } 
            label="Share for all future offers"
            sx={{ color: NAVY_COLORS.medium }}
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid rgba(63, 81, 181, 0.12)' }}>
        <Button 
          onClick={handleConsent} 
          disabled={isLoading}
          sx={{ 
            backgroundColor: NAVY_COLORS.medium,
            color: '#ffffff',
            '&:hover': {
              backgroundColor: NAVY_COLORS.hover
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'I Consent'
          )}
        </Button>
        <Button 
          onClick={onClose}
          disabled={isLoading}
          sx={{ 
            color: NAVY_COLORS.medium,
            '&:hover': {
              backgroundColor: NAVY_COLORS.softBackground
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsentPopup;