import { put, call, takeLatest, all } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash'
import { Base64 } from 'js-base64'

import Users from './../../schemas/UsersSchema'
import SessionActions, { typesSession } from './../reducers/session'

function* signIn(action) {
  const users = Users.getUsers()
  const { email, password } = action.payload

  const user = _.filter(users, u => {
    const pw = Base64.decode(u.password)
    return u.email === email && pw === password
  })

  if (user.length > 0) {
    try {
      const storage = JSON.stringify({ email: email, id: user[0].id })
      yield call(AsyncStorage.setItem, '@mytasks', storage)
      yield put(SessionActions.signInSuccess({ user: user[0] }))
    } catch (error) {
      yield put(SessionActions.signInFailed())
    }
  } else {
    yield put(SessionActions.signInFailed())
  }
}

function* signInValidate() {
  try {
    const value = yield call(AsyncStorage.getItem, '@mytasks')
    const user = JSON.parse(value)
    if (user) {
      yield put(SessionActions.signInSuccess({ user }))
    } else {
      yield put(SessionActions.sessionLoading(false))
    }
  } catch (error) {
    yield put(SessionActions.sessionLoading(false))
  }
}

export default all([
  takeLatest(typesSession.SIGN_IN, signIn),
  takeLatest(typesSession.SIGN_IN_VALIDATE, signInValidate)
])
