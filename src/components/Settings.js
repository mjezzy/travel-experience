import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Box, ListItemSecondaryAction, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { NAVY_COLORS } from '../theme/colors';
import walletData from '../data/walletProviderData.json';

const Settings = ({ onClose }) => {
  const [userInfo, setUserInfo] = useState({});
  const [preferences, setPreferences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showReshareDialog, setShowReshareDialog] = useState(false);
  const [updatedPreference, setUpdatedPreference] = useState(null);

  useEffect(() => {
    if (walletData?.credentials) {
      setUserInfo({
        name: walletData.credentials.name,
        email: walletData.credentials.email
      });
      setPreferences(walletData.credentials.preferences.map(pref => ({
        ...pref,
        active: true
      })));
    }
  }, []);

  const handleEdit = (preference) => {
    setEditingId(preference.id);
    setEditValue(preference.value);
  };

  const handleSaveEdit = (preference) => {
    setPreferences(current =>
      current.map(p => p.id === preference.id ? { ...p, value: editValue } : p)
    );
    setEditingId(null);
    setUpdatedPreference(preference);
    setShowReshareDialog(true);
  };

  const handleRevokeAccess = (preferenceId) => {
    setPreferences(current =>
      current.map(p => p.id === preferenceId ? { ...p, active: false } : p)
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Settings & Preferences</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>User Information</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={userInfo.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={userInfo.email} />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Personal Preferences</Typography>
        <List>
          {preferences
            .filter(pref => pref.type === 'preference')
            .map((preference) => (
              <ListItem 
                key={preference.id}
                sx={{
                  backgroundColor: NAVY_COLORS.cardBackground,
                  mb: 2,
                  borderRadius: 1,
                  p: 2
                }}
              >
                <PreferenceListItem 
                  preference={preference}
                  isEditing={editingId === preference.id}
                  editValue={editValue}
                  onEdit={handleEdit}
                  onSave={handleSaveEdit}
                  setEditValue={setEditValue}
                  setEditingId={setEditingId}
                />
              </ListItem>
            ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Manage Consents</Typography>
        <List>
          {preferences
            .filter(pref => pref.type === 'consent')
            .map((preference) => (
              <ListItem 
                key={preference.id}
                sx={{
                  backgroundColor: NAVY_COLORS.cardBackground,
                  mb: 2,
                  borderRadius: 1,
                  p: 2
                }}
              >
                <ListItemText 
                  primary={preference.name}
                  secondary={preference.value}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleRevokeAccess(preference.id)}
                    disabled={!preference.active}
                  >
                    {preference.active ? 'Revoke Access' : 'Access Revoked'}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Box>

      <Dialog open={showReshareDialog} onClose={() => setShowReshareDialog(false)}>
        <DialogTitle>Re-share Updated Preference?</DialogTitle>
        <DialogContent>
          <Typography>
            Would you like to re-share your updated {updatedPreference?.name} with previously authorized services?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReshareDialog(false)}>No</Button>
          <Button 
            variant="contained" 
            onClick={() => setShowReshareDialog(false)}
          >
            Yes, Re-share
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const PreferenceListItem = ({ 
  preference, 
  isEditing, 
  editValue, 
  onEdit, 
  onSave, 
  setEditValue, 
  setEditingId 
}) => {
  if (isEditing) {
    return (
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <TextField
          fullWidth
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          size="small"
        />
        <IconButton onClick={() => onSave(preference)}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => setEditingId(null)}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <>
      <ListItemText 
        primary={preference.name}
        secondary={preference.value}
      />
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => onEdit(preference)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
      </ListItemSecondaryAction>
    </>
  );
};

export default Settings;