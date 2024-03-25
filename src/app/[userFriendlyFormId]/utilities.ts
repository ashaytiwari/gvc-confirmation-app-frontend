import messages from "@/constants/messages";

import { IUserConfirmationModel } from "@/interfaces/models/user";

export function getFormIdFromUserFriendlyFormId(userFriendlyFormId: string) {

  const formIdArray = userFriendlyFormId.split('-');
  return formIdArray[0];

}

export function validateUserConfirmationForm(values: IUserConfirmationModel) {

  const errors = {} as IUserConfirmationModel;

  if (!values.fullName) {
    errors.fullName = messages.required;
  }

  if (values.personCount === '') {
    errors.personCount = messages.required;
  } else if (Number.isInteger(values.personCount) === false) {
    errors.personCount = messages.personCountShouldBeInteger;
  } else if (+values.personCount < 0) {
    errors.personCount = messages.personCountValid;
  }

  return errors;
}