import { createReducer, createActions } from 'reduxsauce'
import { markActionsOffline } from 'redux-offline-queue'
import _ from 'lodash'

import { tasksMapping } from './../../config/utils'

/* Types & Action Creators */

const { Types, Creators } = createActions({
  saveTaskRequest: ['payload'],
  saveTaskRollback: ['error'],
  saveTaskCommit: ['payload'],
  syncTaskRequest: [],
  syncTaskCommit: ['payload'],
  syncTaskRollback: ['payload']
})

markActionsOffline(Creators, ['saveTaskRequest'])

export const tasksTypes = Types
export default Creators

/* Initial State */

export const INITIAL_STATE = {
  tasks: [],
  tasksSection: []
}

/* Reducers */

export const saveTaskRequest = (state = INITIAL_STATE, action) => {
  const temp = [...state.tasks]
  temp.push({ server_id: null, ...action.payload })
  const tasks = tasksMapping(temp)
  return {
    ...state,
    tasksSection: tasks,
    tasks: temp
  }
}

export const saveTaskRollback = (state = INITIAL_STATE, action) => {
  return {
    ...state
  }
}

export const saveTaskCommit = (state = INITIAL_STATE, action) => {
  const todo = action.payload.todo
  const temp = [...state.tasks]

  const index = _.findIndex(state.tasks, { id: todo.data.id })
  temp[index].server_id = todo.id

  const tasks = tasksMapping(temp)

  return {
    ...state,
    tasksSection: tasks,
    tasks: temp
  }
}

export const syncTaskRequest = (state = INITIAL_STATE, action) => {
  // console.tron.log(action)
  return {
    ...state
  }
}

export const syncTaskCommit = (state = INITIAL_STATE, action) => {
  const todos = action.payload.todo
  const temp = [...state.tasks]

  todos.map(item => {
    temp.push({ server_id: item.id, ...item.data })
  })

  const tasks = tasksMapping(temp)
  return {
    ...state,
    tasksSection: tasks,
    tasks: temp
  }
}

export const syncTaskRollback = (state = INITIAL_STATE, action) => {
  // console.tron.log(action)
  return {
    ...state
  }
}

export const HANDLERS = {
  [Types.SAVE_TASK_REQUEST]: saveTaskRequest,
  [Types.SAVE_TASK_COMMIT]: saveTaskCommit,
  [Types.SAVE_TASK_ROLLBACK]: saveTaskRollback,
  [Types.SYNC_TASK_REQUEST]: syncTaskRequest,
  [Types.SYNC_TASK_COMMIT]: syncTaskCommit,
  [Types.SYNC_TASK_ROLLBACK]: syncTaskRollback
}

export const tasksReducer = createReducer(INITIAL_STATE, HANDLERS)
