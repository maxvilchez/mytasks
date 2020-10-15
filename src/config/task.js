const testTask = async () => {
  console.log('[BackgroundFetch HeadlessTask] start:')

  // Perform an example HTTP request.
  // Important:  await asychronous tasks when using HeadlessJS.
  let response = await fetch('https://facebook.github.io/react-native/movies.json')
  let responseJson = await response.json()
  console.log('[BackgroundFetch HeadlessTask] response: ', responseJson)
}

export default testTask
