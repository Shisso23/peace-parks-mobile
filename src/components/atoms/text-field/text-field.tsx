import React from 'react';
import { Input } from '@rneui/themed';
import { useFormikContext } from 'formik';
import { HelperText, TextInput } from 'react-native-paper';
import tw from 'twrnc';

import { TextFieldProps } from './type';
import { Colors } from '../../../theme/variables';
import { View } from 'react-native';

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
  mode,
  height,
  style
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
    <View style={style}>
      <TextInput
        value={value ?? values[name]}
        onChangeText={manageChange}
        onBlur={handleBlur(name)}
        label={requiredLabel}
        placeholder={placeholder}
        errorMessage={errorText ?? (errors[name] as string)}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        style={[tw`rounded-lg bg-white`, {height: height}, style]}
        mode={mode}
        activeUnderlineColor={Colors.green}
        activeOutlineColor={Colors.green}
        outlineColor={Colors.grey}
        />
      <HelperText type="error" visible={true} style={style}>{errorText ? errorText : (errors[name] as string)}</HelperText>
    </View>
  );
};
