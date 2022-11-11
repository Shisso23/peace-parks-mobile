import React, { useState } from 'react';
import { Button, Text } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import { Image, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TermsAndConditions, Form, ErrorObject, InputBox, StyledTextField } from '../../atoms';
import { userAuthService } from '../../../services';
import { registerSchema } from './schemas';
import { RegisterValueProps } from './types';
import { CheckItem } from '../../atoms/check-item/check-item';
import images from '../../../theme/images';

export const RegisterForm = () => {
  const { mutateAsync } = useMutation(userAuthService.register, {
    onError: (error) => {
      const { message } = error as ErrorObject<RegisterValueProps>;
      Toast.show({ type: 'error', text1: message });
    },
  });

  const submitForm = (formData: RegisterValueProps) => mutateAsync(formData);
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);

  const handleModal = () => {
    setModalVisibility(!isModalVisible);
  };

  const FormComponents = ({
    values,
    setFieldValue,
    isSubmitting,
    handleSubmit,
  }: FormikProps<RegisterValueProps>) => {
    const onTerms = () => setFieldValue('termsAndConditions', !values.termsAndConditions);
    const onSubscribe = () => setFieldValue('mailSubscription', !values.mailSubscription);
    const onChildFriendly = () => setFieldValue('childFriendly', true);

    const handleChildFriendlySetup = () => {
      onChildFriendly();
      handleSubmit();
      handleModal();
    }

    const handleRegister = () => {
      handleSubmit();
      handleModal();
    }

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
        <Button title="Continue" onPress={handleModal} loading={isSubmitting} style={tw`mt-15`}/>
        <Modal visible={isModalVisible} contentContainerStyle={tw`bg-white self-center border rounded-t-2xl px-3 py-4 mt-auto mb-8`}>
          <View style={tw`flex flex-row mb-4`}>
            <Text style={tw`flex-1 font-bold text-lg`}>Child Protection Act</Text>
            <TouchableOpacity style={tw`mt-1 h-5 w-5`} onPress={handleRegister}>
              <Image source={images.close} style={tw`w-5 h-5`}/>
            </TouchableOpacity>
          </View>
          <Text style={tw`mt-2 text-gray-400`}>Please note that some content on this application may contain sensitive videos. Viewer discretion is advised. If you wish to block certain content for your child please click on the button below.</Text>
          <Button title="Setup" style={tw`mt-8 mb-6`} onPress={handleChildFriendlySetup} loading={isSubmitting}/>
        </Modal>
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
        childFriendly: false,
      }}
      submitForm={submitForm}
      validationSchema={registerSchema}
      render={FormComponents}
    />
  );
};