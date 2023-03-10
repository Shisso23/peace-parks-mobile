import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { AuthStackProps } from '../../../navigation/auth/types';
import { RegisterLinkProps } from './types';

export const RegisterLink: React.FC<RegisterLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();

  const _handleRegister = () => navigation.navigate('Register');

  return (
    <View style={containerStyle}>
      <Text style={tw`text-white`}>Don't have an account? </Text>
      <TouchableOpacity style={tw`self-center`} delayPressIn={0} onPress={_handleRegister}>
        <Text style={tw`text-green-400`}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
