import { createReducer, createActions } from 'reduxsauce'

/* Types & Action Creators */

const { Types, Creators } = createActions({
  signIn: ['payload'],
  signInSuccess: ['payload'],
  signInFailed: ['payload'],
  sessionLoading: ['payload'],
  signInValidate: []
})

export const typesSession = Types
export default Creators

/* Initial State */

export const INITIAL_STATE = {
  isSignedIn: false,
  isLoading: true,
  isLoadingSession: false,
  user: null
}

/* Reducers */

export const signIn = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoadingSession: true
  }
}

export const signInSuccess = (state = INITIAL_STATE, action) => {
  return Object.assign({}, state, {
    isSignedIn: true,
    isLoading: false,
    isLoadingSession: false,
    user: action.payload.user
  })
}

export const signInFailed = (state = INITIAL_STATE, action) => {
  return Object.assign({}, state, {
    isLoadingSession: false
  })
}

export const sessionLoading = (state = INITIAL_STATE, action) => {
  return Object.assign({}, state, {
    isLoading: action.payload
  })
}

export const signInValidate = (state = INITIAL_STATE, action) => {
  return {
    ...state
  }
}

export const HANDLERS = {
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILED]: signInFailed,
  [Types.SESSION_LOADING]: sessionLoading,
  [Types.SIGN_IN_VALIDATE]: signInValidate
}

export const sessionReducer = createReducer(INITIAL_STATE, HANDLERS)
