import React from 'react';
import { Button, Text } from '@rneui/themed';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-paper';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ErrorObject, Form, InputBox, StyledTextField } from '../../atoms';
import { userService } from '../../../services';
import { RootReducer } from '../../../reducers';
import { profileSchema } from './schemas';
import { ProfileValueProps } from './types';
import { Colors } from '../../../theme/variables';
import images from '../../../theme/images';
import { AppStackProps } from '../../../navigation';

export const ProfileForm = () => {
  const { user } = useSelector((reducers: RootReducer) => reducers.userReducer);
  const { mutateAsync } = useMutation(userService.updateUser, {
    onError: (error) => {
      const { message } = error as ErrorObject<ProfileValueProps>;
      Toast.show({ type: 'error', text1: message });
    },
  });

  const navigation = useNavigation<AppStackProps>();
  const _handleResetPassword = () => navigation.navigate('ResetPassword');
  const _goToPrivacyPolicy = () => navigation.navigate('TermsAndConditions');

  const submitForm = (formData: ProfileValueProps) => mutateAsync(formData);
  const userRef = useQuery(["user"], userService.getUser)

  const FormComponents = ({ values, setFieldValue, handleSubmit, isSubmitting }: FormikProps<ProfileValueProps>) => {
    const onChildFriendly = () => setFieldValue('childFriendly', !values.childFriendly);
    const onSubscribe = () => setFieldValue('subscribedToMail', !values.subscribedToMail);

    return (
    <>
      <StyledTextField name="firstName" label="Full Name" required keyboardType="email-address" placeholder="Full Name"/>
      <StyledTextField name="email" label="Email" required keyboardType="email-address" placeholder="Email"/>
      <View style={tw`border-2 rounded-xl mb-8 border-gray-200 flex flex-row`}>
          <Text style={tw`text-green-600 absolute z-10 -top-2 left-4 bg-white px-1`}>Phone No.</Text>
            <InputBox name="regionCode" label="Region" placeholder="(+27)" required keyboardType="phone-pad" height={45} style={tw`max-w-[20]`} />
            <Text style={tw`text-gray-300 bg-white text-2xl absolute left-16 top-2.5`}>|</Text>
            <InputBox name="phoneNumber" label="phoneNumber" placeholder="81 123 456" required keyboardType="phone-pad" height={45} style={tw`absolute -left-68 -top-4.5 z-10`} errorStyle={tw`absolute -left-67 top-13`} />
        </View>
      <View style={tw`flex flex-row border-b border-b-green-300 mb-4`}>
        <Text style={tw`mt-2`}>Child Friendly Feature</Text>
        <Switch value={values.childFriendly} trackColor={{ true: Colors.green, false: Colors.grey }} onChange={onChildFriendly} style={[tw`ml-auto mb-2`, {transform: [{scaleX: 0.8}, {scaleY: 0.8}]}]}/>
      </View>
      <View style={tw`flex flex-row border-b border-b-green-300 mb-4`}>
        <Text style={tw`mt-2`}>Newsletter</Text>
        <Switch value={values.subscribedToMail} onChange={onSubscribe} trackColor={{ true: Colors.green, false: Colors.grey}} style={[tw`ml-auto mb-2`, {transform: [{scaleX: 0.8}, {scaleY: 0.8}]}]}/>
      </View>
      <View style={tw`flex flex-row border-b border-b-green-300 mb-4`}>
          <Text style={tw`mb-2`}>Change Password</Text>
        <TouchableOpacity style={tw`ml-auto mr-2 mb-2`} onPress={_handleResetPassword}>
          <Image source={images.rightArrow} style={tw`w-6 h-6 object-contain`}/>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row border-b border-b-green-300 mb-4`}>
        <Text style={tw`mb-4`}>Privacy Policy</Text>
        <TouchableOpacity style={tw`ml-auto mr-2 mb-2`} onPress={_goToPrivacyPolicy}>
          <Image source={images.rightArrow} style={tw`w-6 h-6 object-contain`}/>
        </TouchableOpacity>
      </View>
      <Button title="Save" onPress={handleSubmit} loading={isSubmitting} style={tw`mb-10`}/>
    </>
  )};

  return (
    <Form
      initialValues={{
        firstName: userRef.data?.firstName ?? '',
        email: userRef.data?.email ?? '',
        regionCode: userRef.data?.regionCode ?? '',
        phoneNumber: userRef.data?.phoneNumber ?? '',
        childFriendly: userRef.data?.childFriendly ?? false,
        subscribedToMail: userRef.data?.subscribedToMail ?? false,
      }}
      submitForm={submitForm}
      validationSchema={profileSchema}
      render={FormComponents}
    />
  );
};


const styles = StyleSheet.create({
  arrowButtonIcon: {
    resizeMode: 'contain', 
    width: 20, 
    height: 30
  }
})
