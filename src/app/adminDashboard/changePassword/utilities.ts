import messages from "@/constants/messages";

import { IChangePasswordModel } from "@/interfaces/models/admin";

import { validatePassword } from "@/utilities/formValidations";

export function validateChangePasswordForm(values: IChangePasswordModel) {

  const errors = {} as IChangePasswordModel;

  if (!values.oldPassword) {
    errors.oldPassword = messages.required;
  }

  if (!values.newPassword) {
    errors.newPassword = messages.required;
  } else if (validatePassword(values.newPassword) === true) {
    errors.newPassword = messages.passwordMustBe6CharLong;
  }

  return errors;
}