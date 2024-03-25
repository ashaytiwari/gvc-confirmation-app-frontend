export interface IUserConfirmationModel {
  _id: string | number,
  fullName: string,
  personCount: number | string,
  remark: string,
  addedBy: string
}

export interface IUpdateUserConfirmationsParamsModel {
  confirmationFormId: string,
  _id: string | number,
  fullName: string,
  personCount: number | string,
  remark?: string
}