export interface IFormInputTextControl {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string,
  name: string;
  disabled?: boolean;
  value: any;
  error?: string;
  secure?: boolean;
  onChange: (value: any) => void;
  onBlur?: (value: any) => void;
}

export interface IFormDateInputControl {
  label?: string;
  name: string;
  disabled?: boolean;
  value: any;
  error?: string;
  maxDate?: string;
  minDate?: string;
  onChange: (value: any) => void;
  onBlur?: (value: any) => void;
}