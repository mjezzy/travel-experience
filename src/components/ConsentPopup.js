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
import { getAccessGrantFromRedirectUrl } from "@inrupt/solid-client-access-grants";
import { sendUserDataToVendor } from '../integrations/vendorIntegration';
import { NAVY_COLORS } from '../theme/colors';

const ConsentPopup = ({ offer, onClose, onAccept }) => {
  const [consentType, setConsentType] = useState('once');
  const [isLoading, setIsLoading] = useState(false);

  const handleConsent = async () => {
    try {
      setIsLoading(true);
      console.log('Sending consent request...');
      
      // First request to get access request ID
      const response = await fetch('http://localhost:3001/api/access-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resourceOwner: 'https://id.inrupt.com/uhrlass',
          resources: ['https://storage.inrupt.com/70ba5def-6b7a-48d9-ac7f-4649f0cd9460/wallet/user-preferences.json'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to connect to the server');
      }

      const { id } = await response.json();
      console.log('Received access request ID:', id);

      // Construct URL with ID and get access grant
      const myURL = new URL('http://localhost:3001/api/access-grant');
      myURL.searchParams.append('id', id);
	  console.log('access grant id:', id);
    //   const myAccessGrantVC = await getAccessGrantFromRedirectUrl(
    //     myURL,
    //     { fetch: window.fetch }  // Use authenticated fetch when available
    //   );

    //   console.log('Access grant received:', myAccessGrantVC);
      
    //   const vendorResponse = await sendUserDataToVendor(myAccessGrantVC, offer);
    //   console.log('Vendor response:', vendorResponse);
      
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