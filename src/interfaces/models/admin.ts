export interface IConfirmationFormModel {
  _id: number | string,
  title: string,
  date: Date | string
}

export interface IConfirmationFormsStateModel {
  confirmationForms: Array<IConfirmationFormModel>,
  currentPage: number,
  totalPages: number
}

export interface IChangePasswordModel {
  oldPassword: string,
  newPassword: string
}