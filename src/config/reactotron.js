/* eslint-disable no-undef */
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { reactotronRedux } from 'reactotron-redux'
// import sagaPlugin from 'reactotron-redux-saga'

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'MyTasks'
  })
  .useReactNative()
  .use(reactotronRedux())
// .use(sagaPlugin())

if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

console.tron = Reactotron
