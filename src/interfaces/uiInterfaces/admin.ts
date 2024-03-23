import { IConfirmationFormModel } from "../models/admin"

export interface IAdminDashboardRootStateModel {
  title: string,
  page: number,
  displayConfirmationFormEditor: boolean
}

export interface IConfirmationFormCardProps {
  data: IConfirmationFormModel
}

export interface IShareFormModalProps {
  data: IConfirmationFormModel,
  open: boolean,
  onClose: () => void
}