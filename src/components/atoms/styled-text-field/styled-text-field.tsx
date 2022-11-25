import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { TextInput } from 'react-native-paper';
import tw from 'twrnc';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@rneui/themed';

import { StyledTextFieldProps } from './type';
import { Colors } from '../../../theme/variables';

export const StyledTextField: React.FC<StyledTextFieldProps> = ({
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
  style,
  defaultValue,
  multiline,
  inputStyle,
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
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handlePasswordVisibility = () => setPasswordHidden(!isPasswordHidden);

  return (
    <View style={[style ?? tw`border-2 rounded-xl mb-8 border-gray-200`]}>
       <Text style={tw`text-green-600 absolute z-10 -top-2 left-4 bg-white px-1`}>{requiredLabel}</Text> 
      <Input
        defaultValue={defaultValue}
        value={value ?? values[name]}
        onChangeText={manageChange}
        onBlur={handleBlur(name)}
        label={requiredLabel}
        placeholder={placeholder}
        errorMessage={errorText ?? (errors[name] as string)}
        keyboardType={keyboardType}
        secureTextEntry={isSecure ? isPasswordHidden : isSecure}
        style={[inputStyle ?? tw`rounded-lg bg-white m-1`, {height}]}
        inputContainerStyle={styles.inputContainerStyle}
        labelStyle={styles.labelStyle}
        errorStyle={styles.errorStyle}
        selectionColor={Colors.grey} 
        placeholderTextColor={Colors.grey}
        multiline={multiline ?? false}
        rightIcon={isSecure ? <TextInput.Icon
          name={isPasswordHidden ? "eye-off" : "eye"}
          color={Colors.grey}
          onPress={handlePasswordVisibility}
        /> : undefined}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        />
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth:0,
    height: 4,
    paddingTop: 8,
    paddingLeft: 8,
  },
  rightIconContainerStyle: {
    marginRight: 20,
    marginBottom: 12
  },
  labelStyle: {
    color: Colors.transparent
  },
  errorStyle: {
    color: Colors.grey,
    marginLeft: 'auto'
  }
})
