import { KeyboardTypeOptions } from 'react-native';

export type TextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string;
  value?: any;
  onChange?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isSecure?: boolean;
};
