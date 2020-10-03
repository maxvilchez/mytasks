import { all, spawn } from 'redux-saga/effects'

import { startWatchingNetworkConnectivity } from './offline'
import tasks from './tasks'
import session from './session'

export default function* rootSaga() {
  yield all([spawn(startWatchingNetworkConnectivity), tasks, session])
}
