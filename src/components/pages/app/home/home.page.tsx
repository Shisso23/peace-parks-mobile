import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { exitAppOnHardwarePressListener } from '../../../../helpers';
import { useAppDispatch, signOutAction } from '../../../../reducers';

const { CancelToken } = axios;

export const HomePage: React.FC = () => {
  const requestSource = CancelToken.source();
  const dispatch = useAppDispatch();

  const _signOut = () => {
    dispatch(signOutAction());
  };

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  });

  useFocusEffect(exitAppOnHardwarePressListener);

  return (
    <View>
      <Button title="Sign Out" onPress={_signOut} />
    </View>
  );
};
