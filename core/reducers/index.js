import {combineReducers} from 'redux';
import generalReducer from './generalReducer';
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
  app: generalReducer,
  form: formReducer
});

export default rootReducer;