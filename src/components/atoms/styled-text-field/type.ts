import { isUndefined } from 'lodash';
import { KeyboardTypeOptions } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

export type StyledTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string;
  value?: any;
  onChange?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isSecure?: boolean;
  mode?: "flat" | "outlined" | undefined;
  height?: number;
  style?: Style;
  defaultValue?: any;
  multiline?: boolean;
  inputStyle?: Style;
};
