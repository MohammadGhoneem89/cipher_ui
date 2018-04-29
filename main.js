/*standard imports*/
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
var React = require('react');
import { Router,browserHistory} from 'react-router'

/*Routing imports*/
import routes from './routes';

/*action imports*/
import {generalActionLoad} from './actions/generalAction';

/*store configurations imports*/
import configureStore from './store/configureStore';



const store = configureStore();
store.dispatch(generalActionLoad());


ReactDOM.render(

	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>
    , document.getElementById('app')
);