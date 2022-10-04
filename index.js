import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { name as appName } from './app.json';
import theme from './src/theme/react-native-elements-theme';
import { store } from './src/reducers';
import App from './src/App';

const queryClient = new QueryClient();

const Root = () => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
          <Toast />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);
