import {
  ON_LOGIN_SUCC,
  ON_GENERATE_EMAIL,
  ON_LOGOUT_SUCC,
} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
  userDetails: {},
  loginId: null,
  token: '',
  generatedEmail: null,
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
      return {...state, generatedEmail: action.payload};

    case ON_LOGOUT_SUCC:
      return INITIAL_STATE;

    default:
      return state;
  }
};
