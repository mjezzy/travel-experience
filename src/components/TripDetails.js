import React, { useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import ConsentPopup from './ConsentPopup';
import { getVendorOffers } from '../services/vendorService';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

const TripDetails = ({ trip }) => {
  const [offers, setOffers] = useState([]);
  const [showConsentPopup, setShowConsentPopup] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);

  const handleShowOffers = async () => {
	const offers = await getVendorOffers(trip);
	setOffers(offers);
  };

  const handleOfferClick = (offer) => {
	setSelectedOffer(offer);
	setShowConsentPopup(true);
  };

  const handleOfferAccept = (offer) => {
	setAppliedOffers([...appliedOffers, offer]);
	setShowConsentPopup(false);
  };

  return (
	<Container>
	  <Box mt={2}>
		<Typography variant="h5">Trip to {trip.destination}</Typography>
		<Typography variant="body1">Date: {trip.date}</Typography>
		<Typography variant="body2">Favorite Cocktail: Old Fashioned</Typography>
		<Typography variant="body2">Favorite Hotel: The Ritz-Carlton</Typography>
		<Button variant="contained" color="secondary" onClick={handleShowOffers} sx={{ mt: 2 }}>
		  Show Upgrade Offers
		</Button>
		<List>
		  {offers.map((offer, index) => (
			<ListItem button key={index} onClick={() => handleOfferClick(offer)}>
			  <ListItemText primary={`${offer.description} - $${offer.price}`} secondary={offer.details} />
			</ListItem>
		  ))}
		</List>
		<Paper elevation={3} sx={{ mt: 2, p: 2 }}>
		  <Typography variant="h6">Trip Timeline</Typography>
		  <Timeline>
			<TimelineItem>
			  <TimelineSeparator>
				<TimelineDot color="primary">
				  <FlightTakeoffIcon />
				</TimelineDot>
				<TimelineConnector />
			  </TimelineSeparator>
			  <TimelineContent>Flight to {trip.destination}</TimelineContent>
			</TimelineItem>
			<TimelineItem>
			  <TimelineSeparator>
				<TimelineDot color="secondary">
				  <LocalHotelIcon />
				</TimelineDot>
				<TimelineConnector />
			  </TimelineSeparator>
			  <TimelineContent>Stay at The Ritz-Carlton</TimelineContent>
			</TimelineItem>
			{appliedOffers.map((offer, index) => (
			  <TimelineItem key={index}>
				<TimelineSeparator>
				  <TimelineDot color="primary">
					{offer.icon === 'hotel' ? <LocalHotelIcon /> : <LocalBarIcon />}
				  </TimelineDot>
				  <TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>{offer.description}</TimelineContent>
			  </TimelineItem>
			))}
			<TimelineItem>
			  <TimelineSeparator>
				<TimelineDot color="primary">
				  <FlightLandIcon />
				</TimelineDot>
			  </TimelineSeparator>
			  <TimelineContent>Return Flight</TimelineContent>
			</TimelineItem>
		  </Timeline>
		</Paper>
	  </Box>
	  {showConsentPopup && (
		<ConsentPopup
		  offer={selectedOffer}
		  onClose={() => setShowConsentPopup(false)}
		  onAccept={handleOfferAccept}
		/>
	  )}
	</Container>
  );
};

export default TripDetails;