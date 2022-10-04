import React from 'react';
import { Button } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { ErrorObject, Form, TextField } from '../../atoms';
import { userAuthService } from '../../../services';
import { forgotPasswordSchema } from './schemas';
import { ForgotPasswordValueProps } from './types';

export const ForgotPasswordForm = () => {
  const { mutateAsync } = useMutation(userAuthService.forgotPassword, {
    onError: (error) => {
      const { message } = error as ErrorObject<ForgotPasswordValueProps>;
      Toast.show({ type: 'error', text1: message });
    },
  });

  const submitForm = (formData: ForgotPasswordValueProps) => mutateAsync(formData);

  const FormComponents = ({
    isSubmitting,
    handleSubmit,
  }: FormikProps<ForgotPasswordValueProps>) => (
    <>
      <TextField name="email" label="Email" required />
      <Button title="Submit" onPress={handleSubmit} loading={isSubmitting} />
    </>
  );

  return (
    <Form
      initialValues={{ email: '' }}
      submitForm={submitForm}
      validationSchema={forgotPasswordSchema}
      render={FormComponents}
    />
  );
};
