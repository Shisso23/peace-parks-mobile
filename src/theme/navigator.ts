import { CardStyleInterpolators } from '@react-navigation/stack';

export default ({ Colors, FontFamily }) => ({
  globalNavigatorScreenOptions: {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: Colors.white,
      shadowRadius: 0,
      shadowColor: 'transparent',
      elevation: 0,
    },
    headerTitleStyle: {
      fontFamily: FontFamily.tertiary,
      color: Colors.green,
    },
    headerTintColor: Colors.white,
    cardStyle: {
      backgroundColor: Colors.transparent,
    },
    drawerStyle: {
      backgroundColor: Colors.transparent,
      width: '100%'
    },
    drawerType: 'front',
  },
});
