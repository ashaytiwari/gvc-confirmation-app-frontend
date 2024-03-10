import messages from "@/constants/messages";

import { ILoginParamsModel } from "@/interfaces/models/authentication";

import { validatePassword } from "@/utilities/formValidations";

export function validateLoginForm(values: ILoginParamsModel) {

  const errors = {} as ILoginParamsModel;

  if (!values.username) {
    errors.username = messages.required;
  }

  if (!values.password) {
    errors.password = messages.required;
  } else if (validatePassword(values.password) === true) {
    errors.password = messages.passwordMustBe6CharLong;
  }

  return errors;
}