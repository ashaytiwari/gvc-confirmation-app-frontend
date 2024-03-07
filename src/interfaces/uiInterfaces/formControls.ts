export interface IFormInputTextControl {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  value: any;
  error?: string;
  secure?: boolean;
  onChange: (value: any) => void;
  onBlur?: (value: any) => void;
}