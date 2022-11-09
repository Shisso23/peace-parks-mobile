import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { HelperText, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import { StyleSheet, View } from 'react-native';

import { InputBoxProps } from './type';
import { Colors } from '../../../theme/variables';
import { Input, Text } from '@rneui/themed';

export const InputBox: React.FC<InputBoxProps> = ({
  name,
  label,
  placeholder,
  required,
  errorText,
  value,
  onChange,
  keyboardType,
  isSecure,
  height,
  style,
  errorStyle,
}) => {
  const { setFieldValue, handleBlur, values, errors } = useFormikContext<any>();

  const manageChange = (e: string) => {
    if (onChange) {
      onChange(e);
    } else {
      setFieldValue(name, e);
    }
  };

  const requiredLabel = required ? `${label}` : label;

  return (
    <Input
    value={value ?? values[name]}
    onChangeText={manageChange}
    onBlur={handleBlur(name)}
    label={requiredLabel}
    placeholder={placeholder}
    errorMessage={errorText ?? (errors[name] as string)}
    keyboardType={keyboardType}
    secureTextEntry={isSecure}
    style={[tw`rounded-lg bg-transparent m-1`, {height}, style]}
    inputContainerStyle={styles.inputContainerStyle}
    labelStyle={styles.labelStyle}
    errorStyle={[styles.errorStyle, errorStyle]}
    selectionColor={Colors.grey}
    placeholderTextColor={Colors.grey}
    />
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth:0,
    height: 4,
    paddingTop: 8,
    paddingLeft: 8,
  },
  labelStyle: {
    color: Colors.transparent
  },
  errorStyle: {
    color: Colors.grey,
    marginLeft: 'auto'
  }
})