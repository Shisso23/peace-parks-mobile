import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { HelperText, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import { View } from 'react-native';

import { TextFieldProps } from './type';
import { Colors } from '../../../theme/variables';

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
  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const handlePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

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
        secureTextEntry={isSecure ? isPasswordVisible : isSecure}
        style={[tw`rounded-lg bg-white`, {height: height}, style]}
        mode={mode}
        activeUnderlineColor={Colors.green}
        activeOutlineColor={Colors.green}
        outlineColor={Colors.grey}
        right={isSecure ? <TextInput.Icon
          name={isPasswordVisible ? "eye-off" : "eye"}
          color={Colors.grey}
          onPress={handlePasswordVisibility}
        /> : null}
        />
      <HelperText type="error" visible={true} style={style}>{errorText ? errorText : (errors[name] as string)}</HelperText>
    </View>
  );
};
