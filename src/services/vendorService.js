import vendorData from '../data/vendorData.json';

export const getVendorOffers = async (trip) => {
  // Simulate fetching offers from vendors
  return vendorData.offers;
};

export const sendUserDataToVendor = async (credentials, offer) => {
  // Simulate sending user data to vendor and receiving offer details
  return vendorData.offerDetails;
};

export const newFunction = async () => {
  // Simulate a new function
  return vendorData.newData;
};