import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgotPasswordPage, HomePage, ProfilePage, TermsAndConditionsPage } from '../../components';
import { useTheme } from '../../hooks';
import { AppStackList, DrawerList } from './types';
import { ContentPage } from '../../components/pages/app/content/content.page';

const AppStack = createStackNavigator<AppStackList>();
const Drawer = createDrawerNavigator<DrawerList>();

export const AppNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <AppStack.Navigator screenOptions={Navigator.globalNavigatorScreenOptions}>
      <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="ResetPassword"
        component={ForgotPasswordPage}
        options={{ title: 'Forgot Password' }}
      />
      <AppStack.Screen name="TermsAndConditions" component={TermsAndConditionsPage} />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <Drawer.Navigator screenOptions={Navigator.globalNavigatorScreenOptions}>
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: true, title: 'Home' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: true, title: 'Settings' }}
      />
      <Drawer.Screen
        name="Content"
        component={ContentPage}
        options={{ headerShown: true, title: 'Content' }}
      />
    </Drawer.Navigator>
  );
};
