import React from 'react';
import { Button } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { TextField, TermsAndConditions, Form, ErrorObject } from '../../atoms';
import { userAuthService } from '../../../services';
import { registerSchema } from './schemas';
import { RegisterValueProps } from './types';

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

    return (
      <>
        <TextField name="email" label="Email" required keyboardType="email-address" />
        <TextField name="password" label="Password" required isSecure />
        <TextField name="confirmPassword" label="Confirm Password" required isSecure />
        <Button title="Register" onPress={handleSubmit} loading={isSubmitting} />
        <TermsAndConditions checked={values.termsAndConditions} onPress={onTerms} />
      </>
    );
  };

  return (
    <Form
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false,
      }}
      submitForm={submitForm}
      validationSchema={registerSchema}
      render={FormComponents}
    />
  );
};
