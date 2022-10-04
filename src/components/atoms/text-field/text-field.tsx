import React from 'react';
import { Input } from '@rneui/themed';
import { useFormikContext } from 'formik';

import { TextFieldProps } from './type';

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  required,
  errorText,
  value,
  onChange,
  keyboardType,
  isSecure,
}) => {
  const { setFieldValue, handleBlur, values, errors } = useFormikContext<any>();

  const manageChange = (e: string) => {
    if (onChange) {
      onChange(e);
    } else {
      setFieldValue(name, e);
    }
  };

  const requiredLabel = required ? `${label}*` : label;

  return (
    <Input
      value={value ? value : values[name]}
      onChangeText={manageChange}
      onBlur={handleBlur(name)}
      label={requiredLabel}
      placeholder={placeholder}
      errorMessage={errorText ? errorText : (errors[name] as string)}
      keyboardType={keyboardType}
      secureTextEntry={isSecure}
    />
  );
};
