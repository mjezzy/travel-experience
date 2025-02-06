import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Paper } from '@mui/material';
import TripDetails from './TripDetails';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './Settings';
import ConnectWallet from './ConnectWallet';

const HomeScreen = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
	setTrips([
	  { id: 1, destination: 'Paris', date: '08/01 - 08-29' },
	  { id: 2, destination: 'New York', date: '12/19 - 01/02' }
	]);
  }, []);

  return (
	<Container>
	  <Box sx={{ position: 'relative', zIndex: 2 }}>
    	<ConnectWallet />
      </Box>
      
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        mt: 12  // Increased from 8 to 12 (96px instead of 64px)
      }}>
        <Typography variant="h4" gutterBottom>
          Your Trips
        </Typography>
        <Paper elevation={3}>
          <List>
            {trips.map(trip => (
              <ListItem button key={trip.id} onClick={() => setSelectedTrip(trip)}>
                <ListItemText primary={`${trip.destination} - ${trip.date}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      
	  <Box mt={2}>
		<Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={() => alert('Create a new trip')}>
		  Create New Trip
		</Button>
		<Button variant="contained" color="secondary" startIcon={<SettingsIcon />} onClick={() => setShowSettings(true)} sx={{ ml: 2 }}>
		  Settings & Preferences
		</Button>
	  </Box>
	  {selectedTrip && <TripDetails trip={selectedTrip} />}
	  {showSettings && <Settings onClose={() => setShowSettings(false)} />}
	</Container>
	
  );
};

export default HomeScreen;