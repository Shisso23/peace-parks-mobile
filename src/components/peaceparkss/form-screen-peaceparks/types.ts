import { ViewStyle } from 'react-native';

import { ChildrenProps } from '../../../types';

export interface FormScreenContainerProps extends ChildrenProps {
  contentContainerStyle?: ViewStyle | Array<ViewStyle>;
}
