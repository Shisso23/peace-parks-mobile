import { GestureResponderEvent } from 'react-native';

export type CheckItemProps = {
  checked: boolean;
  onPress: (event: GestureResponderEvent) => void;
  textInfo: string;
};