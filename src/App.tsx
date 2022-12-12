import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';

import NavigationContainer from './navigation/root.navigator';
import { useAppDispatch, initAppAction } from './reducers';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppAction());
  });

  // useEffect(() => {
  //   LogBox.ignoreAllLogs();
  // }, [])

  return <NavigationContainer />;
};

export default App;
