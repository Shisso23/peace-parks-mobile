import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  TermsAndConditionsPage,
} from '../../components';
import { useTheme } from '../../hooks';
import { AuthStackList } from './types';

const AuthStack = createStackNavigator<AuthStackList>();

export const AuthNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <AuthStack.Navigator screenOptions={Navigator.globalNavigatorScreenOptions}>
      <AuthStack.Screen
        name="SignIn"
        component={LoginPage}
        options={{
          title: 'Sign In',
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPage}
        options={{ title: 'Forgot Password' }}
      />
      <AuthStack.Screen name="Register" component={RegisterPage} options={{ title: 'Register' }} />
      <AuthStack.Screen name="TermsAndConditions" component={TermsAndConditionsPage} />
    </AuthStack.Navigator>
  );
};
