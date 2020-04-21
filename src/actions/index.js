/** Action types */

export const SIGN_IN = 'SIGN_IN';
export const SESSION_LOADING = 'SESSION_LOADING';

/** Actions creators */

export const actionSignIn = payload => {
  return {
    type: SIGN_IN,
    payload,
  };
};

export const actionSessionLoading = payload => {
  return {
    type: SESSION_LOADING,
    payload,
  };
};
