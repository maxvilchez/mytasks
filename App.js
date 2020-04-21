import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import InitialScreen from './src/screens/InitialScreen';

import store from './src/config/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <InitialScreen />
        </NavigationContainer>
      </Provider>
    </>
  );
}
