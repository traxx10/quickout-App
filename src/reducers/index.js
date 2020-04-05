import {combineReducers} from 'redux';
import userReducer from './userReducer';
import symtompsReducer from './symtompsReducer';
import userTrackerReducer from './userTrackerReducer';

const rootReducer = combineReducers({
  userReducer,
  symtompsReducer,
  userTrackerReducer,
});

export default rootReducer;
