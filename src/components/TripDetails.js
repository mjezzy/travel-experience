import React, { useState } from 'react';
import { 
  Container, Typography, Button, List, ListItem, ListItemText, Box, Paper,
  Collapse, IconButton 
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import ConsentPopup from './ConsentPopup';
import { getVendorOffers } from '../integrations/vendorIntegration';
import { getUserData } from '../integrations/walletIntegration';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import LuggageIcon from '@mui/icons-material/Luggage';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CloseIcon from '@mui/icons-material/Close';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const OFFER_ICONS = {
  'Enhanced Trip Insurance': SecurityIcon,
  'Priority Luggage Service': LuggageIcon,
  'Premium Dining Package': RestaurantIcon,
  'Spa Access': SpaIcon,
  'Seat Upgrade': AirlineSeatReclineExtraIcon,
  'Room Service Package': RoomServiceIcon,
  'Luxury Hotel Upgrade': HotelIcon,
  'Concierge Rideshare Experience': LocalTaxiIcon
};

const NAVY_COLORS = {
  dark: '#1a237e',    // Dark navy
  medium: '#283593',  // Medium navy
  light: '#3949ab',   // Light navy
  hover: '#3f51b5',   // Hover state
  text: '#ffffff'     // Text color
};

const TripDetails = ({ trip }) => {
  const [availableOffers, setAvailableOffers] = useState([]);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [showConsentPopup, setShowConsentPopup] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [offersLoaded, setOffersLoaded] = useState(false);

  const handleShowOffers = () => {
    if (!hasConsent) {
      setShowConsentPopup(true);
    } else {
      setShowOffers(!showOffers);
    }
  };

  const handleConsentGranted = async () => {
	setShowConsentPopup(false);
	setHasConsent(true);
	try {
	  const anonUserData = await getUserData();
    const fetchedOffers = await getVendorOffers(trip, anonUserData);
	  // Ensure each offer has a unique id:
	  const offersWithIds = fetchedOffers.map((offer, index) => ({
		...offer,
		id: offer.id ?? index, // use existing id or fallback to index
	  }));
	  console.log('Fetched offers:', offersWithIds);
	  setAvailableOffers(offersWithIds);
	  setOffersLoaded(true);
	  setShowOffers(true);
	} catch (error) {
	  console.error('Failed to fetch offers:', error);
	}
  }; 
//   const handleConsentGranted = async () => {
//     setShowConsentPopup(false);
//     setHasConsent(true);
//     try {
//       const fetchedOffers = await getVendorOffers(trip);
//       console.log('Fetched offers:', fetchedOffers);
//       setAvailableOffers(fetchedOffers);
//       setOffersLoaded(true);
//       setShowOffers(true);
//     } catch (error) {
//       console.error('Failed to fetch offers:', error);
//     }
//   };

  const handleOfferSelect = (selectedOffer) => {
    console.log('Selected offer:', selectedOffer);
    console.log('Current available offers:', availableOffers);
    
    // Remove only the selected offer from available
    setAvailableOffers(current => current.filter(offer => offer.id !== selectedOffer.id));
    
    // Add only the selected offer to applied
    setAppliedOffers(current => [...current, selectedOffer]);
    
    console.log('Updated available offers:', 
      availableOffers.filter(offer => offer.id !== selectedOffer.id)
    );
  };

  const handleOfferRemove = (removedOffer) => {
    // Remove only the specific offer from applied
    setAppliedOffers(current => 
      current.filter(offer => offer.id !== removedOffer.id)
    );
    // Add only the removed offer back to available
    setAvailableOffers(current => [...current, removedOffer]);
  };

  return (
    <Container>
      <Box mt={2} sx={{ backgroundColor: NAVY_COLORS.dark, color: NAVY_COLORS.text, p: 3, borderRadius: 2 }}>
        <Typography variant="h5">Trip to {trip.destination}</Typography>
        <Typography variant="body1">Date: {trip.date}</Typography>
        {/* <Typography variant="body2">Favorite Cocktail: Old Fashioned</Typography>
        <Typography variant="body2">Favorite Hotel: The Ritz-Carlton</Typography> */}

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: NAVY_COLORS.light,
              '&:hover': { backgroundColor: NAVY_COLORS.hover }
            }}
            onClick={handleShowOffers}
            endIcon={offersLoaded ? (showOffers ? <ExpandLessIcon /> : <ExpandMoreIcon />) : null}
          >
            Show Upgrade Offers
          </Button>
        </Box>

        <Collapse in={showOffers && offersLoaded}>
          <Paper elevation={1} sx={{ 
            mb: 2, 
            p: 2, 
            backgroundColor: NAVY_COLORS.medium,
            color: NAVY_COLORS.text
          }}>
            <Typography variant="h6" gutterBottom>Available Offers</Typography>
            <List>
              {availableOffers.map((offer) => (
                <ListItem 
                  button 
                  key={offer.id} 
                  onClick={() => handleOfferSelect(offer)}
                  sx={{
                    backgroundColor: NAVY_COLORS.light,
                    color: NAVY_COLORS.text,
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: NAVY_COLORS.hover
                    }
                  }}
                >
                  <ListItemText 
                    primary={`${offer.description} - $${offer.price}`}
                    secondary={offer.details}
                    secondaryTypographyProps={{
                      sx: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>

        <Paper elevation={3} sx={{ 
          mt: 2, 
          p: 2, 
          backgroundColor: NAVY_COLORS.medium,
          color: NAVY_COLORS.text
        }}>
          <Typography variant="h6">Trip Timeline</Typography>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: NAVY_COLORS.light }}>
                  <FlightTakeoffIcon />
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: NAVY_COLORS.light }} />
              </TimelineSeparator>
              <TimelineContent>Flight to {trip.destination}</TimelineContent>
            </TimelineItem>

            {appliedOffers.map((offer) => {
              const OfferIcon = OFFER_ICONS[offer.description] || LocalOfferIcon;
              return (
                <TimelineItem key={offer.id}>
                  <TimelineSeparator>
                    <TimelineDot sx={{ 
                      bgcolor: NAVY_COLORS.light,
                      border: `1px solid ${NAVY_COLORS.hover}`
                    }}>
                      <OfferIcon fontSize="small" sx={{ color: NAVY_COLORS.text }} />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: NAVY_COLORS.light }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <Typography variant="body2" sx={{ color: NAVY_COLORS.text }}>
                      {offer.description}
                    </Typography>
                    <IconButton 
                      onClick={() => handleOfferRemove(offer)}
                      size="small"
                      sx={{ 
                        color: NAVY_COLORS.text,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </TimelineContent>
                </TimelineItem>
              );
            })}

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: NAVY_COLORS.light }}>
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
          onClose={() => setShowConsentPopup(false)}
          onAccept={handleConsentGranted}
          offer={null}
        />
      )}
    </Container>
  );
};

export default TripDetails;