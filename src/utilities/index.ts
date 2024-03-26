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

export function extractAvatarCharacters(value: string) {

  const avatarArray = value.split(' ').splice(0, 2); // getting two words from the value only

  let avatar = '';

  for (let word of avatarArray) {
    avatar += word[0].toUpperCase();
  }

  return avatar;
}

export function getFormIdFromUserFriendlyFormId(userFriendlyFormId: string) {

  const formIdArray = userFriendlyFormId.split('-');
  return formIdArray[0];

}

export function extractTitleString(title: string) {

  const titleArray = title.split(' ');
  return titleArray.join('-');

}