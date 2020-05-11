import {combineReducers} from 'redux';
import userReducer from './userReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  userReducer,
  appReducer,
});

export default rootReducer;
