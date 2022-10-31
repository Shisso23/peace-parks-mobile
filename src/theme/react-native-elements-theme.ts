import { createTheme } from '@rneui/themed';

import { Colors, FontFamily, FontSize } from './variables';

const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: FontFamily.tertiary,
        fontSize: FontSize.regular,
      },
      h1style: {
        fontFamily: FontFamily.secondary,
        fontSize: 30,
      },
      h2style: {
        fontFamily: FontFamily.secondary,
        fontSize: 26,
      },
      h3style: {
        fontFamily: FontFamily.secondary,
        fontSize: 22,
      },
      h4style: {
        fontFamily: FontFamily.secondary,
        fontSize: 18,
      },
    },
    Button: {
      raised: false,
      color: Colors.green,
      titleStyle: {
        fontFamily: FontFamily.tertiary,
      },
      buttonStyle: {
        height: 45,
        borderRadius: 5,
      },
    },
    Input: {
      containerStyle: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    SearchBar: {
      containerStyle: {
        backgroundColor: Colors.warning,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
      },
    },
  },
});

export default theme;
