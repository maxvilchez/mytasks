import './src/config/reactotron'
import { AppRegistry } from 'react-native'
// import BackgroundFetch from 'react-native-background-fetch'

import TestTask from './src/config/task'
import App from './App'
import { name as appName } from './app.json'

// let MyHeadlessTask = async (event) => {
//   // Get task id from event {}:
//   let taskId = event.taskId
//   console.log('[BackgroundFetch HeadlessTask] start: ', taskId)

//   // Perform an example HTTP request.
//   // Important:  await asychronous tasks when using HeadlessJS.
//   let response = await fetch('https://facebook.github.io/react-native/movies.json')
//   let responseJson = await response.json()
//   console.log('[BackgroundFetch HeadlessTask] response: ', responseJson)

//   // Required:  Signal to native code that your task is complete.
//   // If you don't do this, your app could be terminated and/or assigned
//   // battery-blame for consuming too much time in background.
//   BackgroundFetch.finish(taskId)
// }

// BackgroundFetch.registerHeadlessTask(MyHeadlessTask)
const TASK_ID = 'TASK_SYNC_ADAPTER'

try {
  AppRegistry.cancelHeadlessTask(TASK_ID, TASK_ID)
} catch (e) { }

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerHeadlessTask(TASK_ID, () => TestTask)
