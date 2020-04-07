import {ON_LOGIN_SUCC} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
  userDetails: {},
  loginId: null,
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCC:
      return {
        ...state,
        loginId: action.payload.loginId,
        token: action.payload.token,
        userDetails: action.payload.userDetails,
        loggedIn: true,
      };
    default:
      return state;
  }
};
