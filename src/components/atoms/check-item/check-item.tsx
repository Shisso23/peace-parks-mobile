import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { useTheme } from '../../../hooks';
import { AuthStackProps } from '../../../navigation';
import { CheckItemProps } from './types';

export const CheckItem: React.FC<CheckItemProps> = ({ checked, onPress, textInfo }) => {
  const { Colors } = useTheme();

  return (
    <View style={tw`flex flex-row items-center`}>
      <CheckBox checked={checked} onPress={onPress} checkedColor={Colors.green} checkedIcon="square" containerStyle={tw`p-0 ml-0 mr-1`}/>
      <Text>{textInfo}</Text>
    </View>
  );
};
