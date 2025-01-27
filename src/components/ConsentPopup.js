import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { getWalletCredentials } from '../services/walletProviderService';
import { sendUserDataToVendor } from '../services/vendorService';

const ConsentPopup = ({ offer, onClose, onAccept }) => {
  const [consentType, setConsentType] = useState('once');

  const handleConsent = async () => {
	const credentials = await getWalletCredentials();
	const response = await sendUserDataToVendor(credentials, offer);
	alert(`Offer Details: ${response.details}`);
	onAccept(offer);
  };

  return (
	<Dialog open onClose={onClose}>
	  <DialogTitle>Consent Required</DialogTitle>
	  <DialogContent>
		<Typography>We need to share your credentials with the vendor to get more details about this offer.</Typography>
		<RadioGroup value={consentType} onChange={(e) => setConsentType(e.target.value)}>
		  <FormControlLabel value="once" control={<Radio />} label="Share just this once" />
		  <FormControlLabel value="indefinitely" control={<Radio />} label="Share for all future offers" />
		</RadioGroup>
	  </DialogContent>
	  <DialogActions>
		<Button onClick={handleConsent} color="primary">I Consent</Button>
		<Button onClick={onClose} color="secondary">Cancel</Button>
	  </DialogActions>
	</Dialog>
  );
};

export default ConsentPopup;