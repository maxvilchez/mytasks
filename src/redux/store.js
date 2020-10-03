/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux'
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from 'redux-offline-queue'
import createSagaMiddleware from 'redux-saga'
import Reactotron from 'reactotron-react-native'

import rootReducer from './reducers'
import rootSaga from './sagas'

const middlewares = []

const sagaMiddleware = createSagaMiddleware()

middlewares.push(offlineMiddleware())
middlewares.push(suspendSaga(sagaMiddleware))
middlewares.push(consumeActionMiddleware())

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
)

sagaMiddleware.run(rootSaga)

export default store
