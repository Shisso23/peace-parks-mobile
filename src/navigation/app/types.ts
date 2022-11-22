import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppStackList = {
  'App Home': undefined;
  TermsAndConditions: undefined;
  ResetPassword: undefined;
  Content: {id: string};
};
export type AppStackProps = StackNavigationProp<AppStackList>;

export type DrawerList = {
  Home: undefined;
  Profile: undefined;
  Content: undefined;
};
export type DrawerStackProps = StackNavigationProp<DrawerList>;
export type AppStackPropsWithParams<RouteName extends keyof AppStackList> = RouteProp<
  AppStackList,
  RouteName
>;
