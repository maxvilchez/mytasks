import { put, takeEvery, call, all } from 'redux-saga/effects'

// import realm from './../../services/realm'
import api from './../../services/api'
import TasksActions, { tasksTypes } from './../reducers/tasks'
import Tasks from './../../schemas/TasksSchema'

function* syncTasks() {
  try {
    // const tasks = yield call(Tasks.getTasks)
    const { data } = yield call(api.get, '/todo/pull')

    data.todo.map((todo, index) => {
      // console.tron.log(todo)
      Tasks.save({ server_id: todo.id, ...todo.data })
    })
    yield put(TasksActions.syncTaskCommit(data))
  } catch (error) {
    yield put(TasksActions.syncTaskRollback(error))
  }
}

function* insertTask(action) {
  try {
    const { data } = yield call(api.post, '/todo/push', { data: action.payload })
    yield Tasks.update(data.todo.data.id, data.todo.id)
    yield put(TasksActions.saveTaskCommit(data))
  } catch (error) {
    yield put(TasksActions.saveTaskRollback(error))
  }
}

export default all([
  takeEvery(tasksTypes.SAVE_TASK_REQUEST, insertTask),
  takeEvery(tasksTypes.SYNC_TASK_REQUEST, syncTasks)
])
