import {ON_STATUS_BAR_CHANGE} from '../actions/types';

const INITIAL_STATE = {
  statusBarColor: '#FF7A00',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_STATUS_BAR_CHANGE:
      return {...state, statusBarColor: action.payload};

    default:
      return state;
  }
};
