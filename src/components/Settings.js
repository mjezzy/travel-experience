import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getWalletCredentials, updateWalletCredentials } from '../services/walletProviderService';

const Settings = ({ onClose }) => {
  const [preferences, setPreferences] = useState({});
  const [consents, setConsents] = useState([]);

  useEffect(() => {
	const fetchPreferences = async () => {
	  const credentials = await getWalletCredentials();
	  setPreferences(credentials.preferences);
	};
	fetchPreferences();
  }, []);

  const handleSave = async () => {
	await updateWalletCredentials({ preferences });
	onClose();
  };

  const handleDeleteConsent = (index) => {
	const newConsents = [...consents];
	newConsents.splice(index, 1);
	setConsents(newConsents);
  };

  return (
	<Dialog open onClose={onClose}>
	  <DialogTitle>Settings & Preferences</DialogTitle>
	  <DialogContent>
		<Typography variant="h6">Preferences</Typography>
		<TextField
		  label="Favorite Cocktail"
		  value={preferences.favoriteCocktail || ''}
		  onChange={(e) => setPreferences({ ...preferences, favoriteCocktail: e.target.value })}
		  fullWidth
		  margin="normal"
		/>
		<TextField
		  label="Favorite Hotel"
		  value={preferences.favoriteHotel || ''}
		  onChange={(e) => setPreferences({ ...preferences, favoriteHotel: e.target.value })}
		  fullWidth
		  margin="normal"
		/>
		<Typography variant="h6" sx={{ mt: 2 }}>Manage Consents</Typography>
		<List>
		  {consents.map((consent, index) => (
			<ListItem key={index}>
			  <ListItemText primary={consent.description} />
			  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteConsent(index)}>
				<DeleteIcon />
			  </IconButton>
			</ListItem>
		  ))}
		</List>
	  </DialogContent>
	  <DialogActions>
		<Button onClick={handleSave} color="primary">Save</Button>
		<Button onClick={onClose} color="secondary">Cancel</Button>
	  </DialogActions>
	</Dialog>
  );
};

export default Settings;