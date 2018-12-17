import {combineReducers} from 'redux';
import generalReducer from './generalReducer';
import {reducer as formReducer} from 'redux-form'
import reducerIndex from '../../applications/constants/ReducerIndex'


const rootReducer = combineReducers({
  app: generalReducer,
  form: formReducer,
  ...reducerIndex
});

export default rootReducer;