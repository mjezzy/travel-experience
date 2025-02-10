import vendorData from '../mock-data/vendorData.json';

export const getVendorOffers = async (trip, anonymizedUserData) => {
  // Simulate fetching offers from vendors

  // todo: Log which data shared to which vendors
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