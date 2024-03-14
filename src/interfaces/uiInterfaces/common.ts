export interface ISecureInputFieldProps {
  name: string,
  value: string,
  placeholder?: string,
  error?: boolean,
  onChange: (value: any) => void,
  onBlur?: (value: any) => void
}

export interface ISpinnerProps {
  fullScreen?: boolean
}

export interface IComponentChildrenProps {
  children: React.ReactNode
}

export interface IAdminDashboardLinkControl {
  href: string,
  label: string
}

export interface IConfirmationFormEditorProps {
  open: boolean,
  onClose: () => void
}