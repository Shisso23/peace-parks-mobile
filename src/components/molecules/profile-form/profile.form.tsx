import React from 'react';
import { Button } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { ErrorObject, Form, TextField } from '../../atoms';
import { userService } from '../../../services';
import { RootReducer } from '../../../reducers';
import { profileSchema } from './schemas';
import { ProfileValueProps } from './types';

export const ProfileForm = () => {
  const { user } = useSelector((reducers: RootReducer) => reducers.userReducer);
  const { mutateAsync } = useMutation(userService.updateUser, {
    onError: (error) => {
      const { message } = error as ErrorObject<ProfileValueProps>;
      Toast.show({ type: 'error', text1: message });
    },
  });

  const submitForm = (formData: ProfileValueProps) => mutateAsync(formData);

  const FormComponents = ({ handleSubmit, isSubmitting }: FormikProps<ProfileValueProps>) => (
    <>
      <TextField name="email" label="Email" required keyboardType="email-address" />
      <Button title="Update" onPress={handleSubmit} loading={isSubmitting} />
    </>
  );

  return (
    <Form
      initialValues={user}
      submitForm={submitForm}
      validationSchema={profileSchema}
      render={FormComponents}
    />
  );
};
