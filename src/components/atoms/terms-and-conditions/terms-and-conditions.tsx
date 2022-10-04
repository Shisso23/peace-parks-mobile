import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { useTheme } from '../../../hooks';
import { AuthStackProps } from '../../../navigation';
import { TermsAndConditionsProps } from './types';

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ checked, onPress }) => {
  const { navigate } = useNavigation<AuthStackProps>();
  const { Colors } = useTheme();

  const goToTerms = () => navigate('TermsAndConditions');

  return (
    <View style={tw`flex flex-row items-center`}>
      <CheckBox checked={checked} onPress={onPress} checkedColor={Colors.primary} />
      <Text>I agree to the</Text>
      <TouchableOpacity delayPressIn={0} onPress={goToTerms}>
        <Text style={tw`text-blue-500`}> Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
};
