import { isUndefined } from 'lodash';
import { KeyboardTypeOptions } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

export type InputBoxProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string;
  value?: any;
  onChange?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isSecure?: boolean;
  height?: number;
  style?: Style;
  errorStyle?: Style;
};
