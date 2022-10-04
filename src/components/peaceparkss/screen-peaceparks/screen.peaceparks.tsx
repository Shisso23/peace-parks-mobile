import React from 'react';
import { ScrollView } from 'react-native';

import { ChildrenProps } from '../../../types';

export const ScreenPeaceParks: React.FC<ChildrenProps> = ({ children }) => {
  return <ScrollView>{children}</ScrollView>;
};
