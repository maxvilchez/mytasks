import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import InitialScreen from './src/screens/InitialScreen';

import store from './src/config/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <PaperProvider>
            <InitialScreen />
          </PaperProvider>
        </NavigationContainer>
      </Provider>
    </>
  );
}
