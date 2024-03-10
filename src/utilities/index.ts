import CryptoJS from "crypto-js";

export const encryptValueIntoCipherValue = (value: any) => {

  const encryptionKey: string = process.env.NEXT_PUBLIC_AES_ENCRYPTION_KEY!;
  let cipherText = CryptoJS.AES.encrypt(value, encryptionKey).toString();

  return cipherText;

};

export const decryptCipherValueIntoPlainValue = (data: any) => {

  const decryptionKey: string = process.env.NEXT_PUBLIC_AES_ENCRYPTION_KEY!;
  let bytes = CryptoJS.AES.decrypt(data, decryptionKey);
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;

};