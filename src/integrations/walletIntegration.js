import walletProviderData from '../data/walletProviderData.json';
//import { Session } from "@inrupt/solid-client-authn-node";
//import { config } from "dotenv";
  
export const authenticateWallet = async () => {
}

export const getWalletCredentials = async () => {
  // access prompt endpoint - give URL 
  var URL = "https://datawallet.inrupt.com/accessprompt"
  var body = 
  {
    "resource": "https://storage.inrupt.com/70ba5def-6b7a-48d9-ac7f-4649f0cd9460/wallet/user-preferences.json",
    "client": "cbefb903-d921-423f-9f44-4119cdd749d3" //#identifier of app making request
  }
  JSON.stringify(body);
  
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: body
  })

  return walletProviderData.credentials;
};

export const getWalletConsents = async () => {

}

export const updateWalletCredentials = async (updatedData) => {
  // Simulate updating wallet credentials
  walletProviderData.credentials.preferences = updatedData.preferences;
};

export const updateWalletConsents = async (updatedData) => {
  // Simulate updating (i.e., revoking) wallet consents
  walletProviderData.credentials.preferences = updatedData.preferences;
};