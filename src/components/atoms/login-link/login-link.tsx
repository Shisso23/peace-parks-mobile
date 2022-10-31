import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { AuthStackProps } from '../../../navigation/auth/types';
import { LogInLinkProps } from './types';

export const LogInLink: React.FC<LogInLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();

  const _handleLogIn = () => navigation.navigate('SignIn');

  return (
    <View style={containerStyle}>
      <Text style={tw`text-black`}>Already have an account? </Text>
      <TouchableOpacity style={tw`self-center`} delayPressIn={0} onPress={_handleLogIn}>
        <Text style={tw`text-green-500`}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};
