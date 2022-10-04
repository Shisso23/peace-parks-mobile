import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import tw from 'twrnc';

import { AuthStackProps } from '../../../navigation/auth/types';
import { ForgotPasswordLinkProps } from './types';

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();

  const _handleForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={tw`self-center`} delayPressIn={0} onPress={_handleForgotPassword}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};
