import { combineReducers } from 'redux'
import { reducer as offline } from 'redux-offline-queue'

import { sessionReducer } from './session'
import { tasksReducer } from './tasks'

export default combineReducers({
  offline,
  sessionReducer,
  tasksReducer
})
