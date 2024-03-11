import { decryptCipherValueIntoPlainValue, encryptValueIntoCipherValue } from "./index";

const APPLICATION_STORAGE_KEY = 'GVC_RSVP_AD';

export function setApplicationStorage(data: any) {

  const dataString = JSON.stringify(data);
  const encryptedRecord = encryptValueIntoCipherValue(dataString);

  localStorage.setItem(APPLICATION_STORAGE_KEY, encryptedRecord);

}

export function getApplicationStorage() {

  const data = localStorage.getItem(APPLICATION_STORAGE_KEY);

  if (data === 'undefined') {
    return null;
  }

  if (data === null) {
    return null;
  }

  const decryptedData = decryptCipherValueIntoPlainValue(data);
  return decryptedData;

}

export function clearApplicationStorage() {
  localStorage.removeItem(APPLICATION_STORAGE_KEY);
}