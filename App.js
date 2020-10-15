import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
// import BackgroundFetch from 'react-native-background-fetch'
import SyncAdapter from 'react-native-sync-adapter'

import InitialScreen from './src/screens/InitialScreen'

import store from './src/redux/store'

const syncInterval = 60 // 1 minute
const syncFlexTime = 15 // 15 seconds

export default function App() {
  useEffect(() => {
    SyncAdapter.init({
      syncInterval,
      syncFlexTime
    })
  }, [])

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
  )
}
