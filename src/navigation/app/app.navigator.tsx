import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgotPasswordPage, HomePage, ProfilePage, TermsAndConditionsPage } from '../../components';
import { useTheme } from '../../hooks';
import { AppStackList, DrawerList } from './types';
import { ContentPage } from '../../components/pages/app/content/content.page';
import { CharactersPage } from '../../components/pages/app/characters/characters';
import { AccountPage } from '../../components/pages/app/account/account';
import { AboutUsPage } from '../../components/pages/app/about-us/about-us';
import { ContactUsPage } from '../../components/pages/app/contact-us/contact-us';
import { CustomDrawer } from '../../components/molecules/custom-drawer/custom-drawer';

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
      <AppStack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false, title: 'Profile' }}
      />
      <AppStack.Screen
        name="Content"
        component={ContentPage}
        options={{ headerShown: false ,title: 'Content' }}
      />
      <AppStack.Screen
        name="Account"
        component={AccountPage}
        options={{ headerShown: false, title: 'Account' }}
      />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <Drawer.Navigator screenOptions={Navigator.globalNavigatorScreenOptions} drawerContent={(props) => <CustomDrawer {...props}/>}>
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountPage}
        options={{ headerShown: false, title: 'Account' }}
      />
      <Drawer.Screen
        name="Characters"
        component={CharactersPage}
        options={{ headerShown: true, title: 'Characters' }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUsPage}
        options={{ headerShown: false, title: 'About Us' }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUsPage}
        options={{ headerShown: false, title: 'Contact Us' }}
      />
    </Drawer.Navigator>
  );
};
