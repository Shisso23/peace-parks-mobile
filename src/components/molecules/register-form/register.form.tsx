import React from 'react';
import { Button } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';

import { TextField, TermsAndConditions, Form, ErrorObject } from '../../atoms';
import { userAuthService } from '../../../services';
import { registerSchema } from './schemas';
import { RegisterValueProps } from './types';
import { StyleSheet, View } from 'react-native';
import { CheckItem } from '../../atoms/check-item/check-item';

export const RegisterForm = () => {
  const { mutateAsync } = useMutation(userAuthService.register, {
    onError: (error) => {
      const { message } = error as ErrorObject<RegisterValueProps>;
      Toast.show({ type: 'error', text1: message });
    },
  });

  const submitForm = (formData: RegisterValueProps) => mutateAsync(formData);

  const FormComponents = ({
    values,
    setFieldValue,
    isSubmitting,
    handleSubmit,
  }: FormikProps<RegisterValueProps>) => {
    const onTerms = () => setFieldValue('termsAndConditions', !values.termsAndConditions);
    const onSubscribe = () => setFieldValue('mailSubscription', !values.mailSubscription);

    return (
      <>        
        <TextField name="name" label="Name" required keyboardType="default" mode="outlined" height={45}/>
        <TextField name="surname" label="Surname" required keyboardType="default" mode="outlined" height={45}/>
        <TextField name="email" label="Email" required keyboardType="email-address" mode="outlined" height={45}/>
        <View style={tw`flex flex-row`}>
          <TextField name="regionCode" label="Code" placeholder="+27" required keyboardType="phone-pad" mode="outlined" height={45} style={tw`flex-1 mr-1`}/>
          <TextField name="phoneNumber" label="Phone No." required keyboardType="phone-pad" mode="outlined" height={45} style={tw`flex-3`}/>
        </View>
        <TextField name="password" label="Password" required isSecure mode="outlined" height={45}/>
        <TextField name="confirmPassword" label="Confirm Password" required isSecure mode="outlined" height={45}/>
        <TermsAndConditions checked={values.termsAndConditions} onPress={onTerms}/>
        <CheckItem checked={values.mailSubscription} onPress={onSubscribe} textInfo="Subscribe to our mailing list"/>
        <Button title="Continue" onPress={handleSubmit} loading={isSubmitting} style={tw`mt-10`}/>
      </>
    );
  };

  return (
    <Form
      initialValues={{
        name:'',
        surname: '',
        email: '',
        regionCode:'',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false,
        mailSubscription: false,
      }}
      submitForm={submitForm}
      validationSchema={registerSchema}
      render={FormComponents}
    />
  );
};
