import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Paper } from '@mui/material';
import TripDetails from './TripDetails';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './Settings';

const HomeScreen = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
	setTrips([
	  { id: 1, destination: 'Paris', date: '2023-12-01' },
	  { id: 2, destination: 'New York', date: '2024-01-15' }
	]);
  }, []);

  return (
	<Container>
	  <Typography variant="h4" gutterBottom>Your Trips</Typography>
	  <Paper elevation={3}>
		<List>
		  {trips.map(trip => (
			<ListItem button key={trip.id} onClick={() => setSelectedTrip(trip)}>
			  <ListItemText primary={`${trip.destination} - ${trip.date}`} />
			</ListItem>
		  ))}
		</List>
	  </Paper>
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