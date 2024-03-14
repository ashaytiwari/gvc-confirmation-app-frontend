import messages from "@/constants/messages";

import { IConfirmationFormModel } from "@/interfaces/models/admin";

import { isPastDate } from "@/utilities/formValidations";

export function validateConfirmationForm(values: IConfirmationFormModel) {

  const errors = {} as IConfirmationFormModel;

  if (!values.title) {
    errors.title = messages.required;
  }

  if (!values.date) {
    errors.date = messages.required;
  } else if (isPastDate(values.date) === true) {
    errors.date = messages.confirmationFormCantBeCreatedForPastDates;
  }

  return errors;
}