import React from 'react';
import { Button, Text } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import { View } from 'react-native';

import { TermsAndConditions, Form, ErrorObject, InputBox, StyledTextField } from '../../atoms';
import { userAuthService } from '../../../services';
import { registerSchema } from './schemas';
import { RegisterValueProps } from './types';
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
        <StyledTextField name="name" label="Full Name" placeholder="Name Surname" required keyboardType="default" mode="outlined" height={45}/>
        <StyledTextField name="email" label="Email" placeholder="email@mail.com" required keyboardType="email-address" mode="outlined" height={45}/>
        <View style={tw`border-2 rounded-xl mb-8 border-gray-200 flex flex-row`}>
          <Text style={tw`text-green-600 absolute z-10 -top-2 left-4 bg-white px-1`}>Phone No.</Text>
            <InputBox name="regionCode" label="Region" placeholder="(+27)" required keyboardType="phone-pad" height={45} style={tw`max-w-[20]`} />
            <Text style={tw`text-gray-300 bg-white text-2xl absolute left-16 top-2.5`}>|</Text>
            <InputBox name="phoneNumber" label="phoneNumber" placeholder="81 123 456" required keyboardType="phone-pad" height={45} style={tw`absolute -left-68 -top-4.5 z-10`} errorStyle={tw`absolute -left-67 top-13`} />
        </View>
        <StyledTextField name="password" placeholder="Enter Password" label="Password" required isSecure mode="outlined" height={45}/>
        <StyledTextField name="confirmPassword" placeholder="Enter Password" label="Re-Password" required isSecure mode="outlined" height={45}/>
        <TermsAndConditions checked={values.termsAndConditions} onPress={onTerms}/>
        <CheckItem checked={values.mailSubscription} onPress={onSubscribe} textInfo="Subscribe to our mailing list"/>
        <Button title="Continue" onPress={handleSubmit} loading={isSubmitting} style={tw`mt-15`}/>
      </>
    );
  };

  return (
    <Form
      initialValues={{
        name:'',
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
