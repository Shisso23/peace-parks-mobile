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
      <TouchableOpacity style={tw`self-center`} delayPressIn={0} onPress={_handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
