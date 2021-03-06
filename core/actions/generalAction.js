import { browserHistory } from 'react-router';
import generalAPI from '../api/generalAPI';
import auth from '../auth/authenticator';
import config from '../../config';
import main from '../main';
import Cookies from 'js-cookie';
import {reset} from 'redux-form';
let ws;

export function generalActionLoad(resultData) {
    return { type: 'GENRAL_LOAD_SUCCESS', resultData };
}

export function generalProcess(fetchURL, actionData) {
    return function (dispatch) {


        let loginDate = new Date(sessionStorage.lastRequestTime);
        let currentDate = new Date();

        const minutes = parseInt(Math.abs(currentDate.getTime() - loginDate.getTime()) / (1000 * 60) % 60);
        const seconds = parseInt(Math.abs(currentDate.getTime() - loginDate.getTime()) / (1000) % 60);



        if (seconds > config.sessionTimeout) {

            auth.lockedUser();
        }
        else
            sessionStorage.lastRequestTime = new Date();



        return generalAPI.getData(fetchURL, actionData).then(resultSet => {
            dispatch(generalActionLoad(resultSet));
        }).catch(error => {
            console.log(error);
        });


    };

}
export function generalAsyncProcess(fetchURL, actionData) {
  return function (dispatch) {
    return generalAPI.getData(fetchURL, actionData).then(resultSet => {
      dispatch(generalActionLoad(resultSet));
      console.log('\n\n\n\n\n>>>>>>>>>>>>>>>>>>>>>>>')
      console.log(resultSet, ' result set')
      return Promise.resolve(resultSet);

    });
  };

}
export function reduxFormProcess(fetchURL, actionData) {
    return function (dispatch) {

        return generalAPI.getData(fetchURL, actionData).then(resultSet => {
            resultSet.responseMessage.data.actionProcessor = "reduxFormProcess";
            dispatch(generalActionLoad(resultSet));
            window.scrollTo(0, 0);
            if (resultSet.responseMessage && resultSet.responseMessage.data.error) {
                return Promise.reject(resultSet.responseMessage.data.error);

            }
            else {
                if (resultSet.responseMessage.data.message.status === "OK") {
                    browserHistory.push(resultSet.responseMessage.data.message.newPageURL);
                }
                return Promise.resolve(resultSet.responseMessage.data);

            }
        });
    };

}
export function reduxFormReset(formName) {
    return function (dispatch) {
        dispatch(reset(formName));  // requires form name
    }
}


export function updateStore(key) {
    return function (dispatch) {
        dispatch(generalActionLoad(key));
    };
}

export function generalAjxProcess(fetchURL, actionData) {
    return function (dispatch) {
        return generalAPI.getData(fetchURL, actionData).then(resultSet => {
            dispatch(generalActionLoad(resultSet));
            if (resultSet.responseMessage && resultSet.responseMessage.data.error) {
                return Promise.reject(resultSet.responseMessage.data.error);
            }
            else {
            return Promise.resolve(resultSet);
            }

        });
    };

}

function openSocketAgain(host, dispatch) {

    ws = new WebSocket(host);
    ws.onopen = function (event) {
        let msg = { "token": Cookies.get('token'), "pageName": sessionStorage.pageName };
        ws.send(JSON.stringify(msg));
    };
    ws.onclose = function (event) {
        console.log("web socket connection closed re-establising connection");
        setTimeout(function () {
            openSocketAgain(host, dispatch)
        }, 10000);
    };
    ws.onmessage = function (event) {
        console.log('MESSAGE RECV', event);
        
        dispatch(generalActionLoad(JSON.parse(event.data)))
       
        // dispatch(generalActionLoad(JSON.parse(event.data)));
    };

}


export function sendWSData(data) {
    try {
        let msg = { "token": sessionStorage.token, "pageName": sessionStorage.pageName, "data": data, "action": "subscribe" }

        ws.send(JSON.stringify(msg));
    } catch (exp) {
        console.log(exp);
    }
    return function (dispatch) {

    }
}

export function openSocket(host) {

    return function (dispatch) {
        openSocketAgain(host, dispatch)
    }

}
