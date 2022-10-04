import { GestureResponderEvent } from 'react-native';

export type TermsAndConditionsProps = {
  checked: boolean;
  onPress: (event: GestureResponderEvent) => void;
};
