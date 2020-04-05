import {ON_LOGIN_SUCC} from '../actions/types';

const INITIAL_STATE = {
  userId: null,
  loggedIn: false,
  userDetails: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCC:
      return {
        ...state,
        userId: action.payload.userId,
        userDetails: action.payload.userDetails,
        loggedIn: true,
      };
    default:
      return state;
  }
};
