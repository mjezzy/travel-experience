import walletProviderData from '../data/walletProviderData.json';

export const getWalletCredentials = async () => {
  return walletProviderData.credentials;
};

export const updateWalletCredentials = async (updatedData) => {
  // Simulate updating wallet credentials
  walletProviderData.credentials.preferences = updatedData.preferences;
};