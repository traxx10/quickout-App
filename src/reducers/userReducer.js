import {ON_LOGIN_SUCC, ON_GENERATE_EMAIL} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
  userDetails: {},
  loginId: null,
  token: '',
  email: null,
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

    case ON_GENERATE_EMAIL:
      return {...state, email: action.payload};

    default:
      return state;
  }
};
