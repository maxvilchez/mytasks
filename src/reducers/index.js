import { combineReducers } from 'redux'
import { SIGN_IN, SESSION_LOADING } from '../actions'

const initialState = {
  isSignedIn: false,
  isLoading: true,
  user: null
}

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        isSignedIn: action.payload.signIn,
        isLoading: false,
        user: action.payload.user
      })
    case SESSION_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload
      })
    default:
      return state
  }
}

export default combineReducers({
  signIn
})
