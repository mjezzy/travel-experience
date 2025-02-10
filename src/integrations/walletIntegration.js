import walletProviderData from '../mock-data/walletProviderData.json';
//import { Session } from "@inrupt/solid-client-authn-node";
//import { config } from "dotenv";
  
export const authenticateWallet = async () => {
}

export const getUserData = async () => {
  // call backend service to get user data
  const url = "http://localhost:3001/api/get-user-data";
  //const url = "https://localhost:9229/api/get-user-data";

  const userData = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',},
    body: JSON.stringify({
      resourceOwner: 'https://id.inrupt.com/uhrlass'
    }),
  });

  // // store bearer token? 
  // // access prompt endpoint - give URL 
  // var URL = "https://datawallet.inrupt.com/accessprompt"
  // var body = 
  // {
  //   "resource": "https://storage.inrupt.com/70ba5def-6b7a-48d9-ac7f-4649f0cd9460/wallet/user-preferences.json",
  //   "client": "cbefb903-d921-423f-9f44-4119cdd749d3" //#identifier of app making request
  // }
  // JSON.stringify(body);
  
  // fetch(URL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + token
  //   },
  //   body: body
  // })

  // dummy data: return walletProviderData.credentials;
  return userData;
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