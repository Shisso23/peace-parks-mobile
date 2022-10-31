import React from 'react';
import { Button } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { ErrorObject, Form, TextField } from '../../atoms';
import { userAuthService } from '../../../services';
import { useAppDispatch, isAuthenticatedFlowAction } from '../../../reducers';
import { loginSchema } from './schemas';
import { LoginValueProps } from './types';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useMutation(userAuthService.login, {
    onError: (error) => {
      const { message } = error as ErrorObject<LoginValueProps>;
      Toast.show({ type: 'error', text1: message });
    },
  });

  const submitForm = (formData: LoginValueProps) => mutateAsync(formData);

  const onSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };

  const FormComponents = ({ isSubmitting, handleSubmit }: FormikProps<LoginValueProps>) => (
    <>
      <TextField name="email" label="Email Address" keyboardType="email-address" />
      <TextField name="password" label="Password" isSecure />
      <Button title="Continue" onPress={handleSubmit} loading={isSubmitting} />
    </>
  );

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      submitForm={submitForm}
      onSuccess={onSuccess}
      validationSchema={loginSchema}
      render={FormComponents}
    />
  );
};
