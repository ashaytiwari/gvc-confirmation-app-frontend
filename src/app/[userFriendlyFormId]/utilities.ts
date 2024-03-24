export function getFormIdFromUserFriendlyFormId(userFriendlyFormId: string) {

  const formIdArray = userFriendlyFormId.split('-');
  return formIdArray[0];

}