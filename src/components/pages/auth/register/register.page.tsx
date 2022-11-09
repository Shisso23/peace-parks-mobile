import { useNavigation } from '@react-navigation/native';
import { Text, Icon } from '@rneui/themed';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { AuthStackProps } from '../../../../navigation';

import { RegisterForm } from '../../../molecules';
import { FormScreenPeaceParks } from '../../../peaceparkss';
import Images from '../../../../theme/images';
import { LogInLink } from '../../../atoms/login-link/login-link';

export const RegisterPage: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();

  const _handleLogin = () => navigation.navigate('SignIn');

  return (
    <FormScreenPeaceParks contentContainerStyle={tw`px-5 pt-15`}>
      <View>
          <TouchableOpacity style={tw`flex flex-row mb-4`} delayPressIn={0} onPress={_handleLogin}>
            <Image source={Images.backArrow} style={styles.backArrow} />
            <Image source={Images.backPlaceholder} style={[tw`ml-2`, styles.backPlaceholder]}/>
          </TouchableOpacity>
        </View>
      <Text style={tw`text-green-500 text-3xl`}>Register</Text>
      <Text style={tw`mt-4 mb-4`}>We are happy you are back. Please fill in your login details to reach the Peace Parks App.</Text>
      <RegisterForm />
      <LogInLink containerStyle={tw`flex flex-row self-center mt-6 mb-12`}/>
    </FormScreenPeaceParks>
  )
};

const styles = StyleSheet.create({
  backArrow: {
    resizeMode: 'contain',
    width: 12,
    marginTop: 3
  },
  backPlaceholder: {
    resizeMode: 'contain',
    width: 35
  }
})