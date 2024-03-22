import { IConfirmationFormModel } from "../models/admin"

export interface IAdminDashboardRootStateModel {
  displayConfirmationFormEditor: boolean,
  title: string,
  page: number
}

export interface IConfirmationFormCardProps {
  data: IConfirmationFormModel
}