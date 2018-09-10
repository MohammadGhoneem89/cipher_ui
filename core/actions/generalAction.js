import * as types from './actionTypes';
import {browserHistory} from 'react-router';
import generalAPI from '../api/generalAPI';
import auth from '../auth/authenticator';
import config from '../../config';

let ws;

export function generalActionLoad(resultData) {
    return {type: 'GENRAL_LOAD_SUCCESS', resultData};
}

export function generalProcess(fetchURL, actionData) {
    return function (dispatch) {

        
        let loginDate = new Date(sessionStorage.lastRequestTime);
        let currentDate = new Date();

        const minutes = parseInt(Math.abs(currentDate.getTime() - loginDate.getTime())/(1000 * 60) % 60);
        const seconds = parseInt(Math.abs(currentDate.getTime() - loginDate.getTime()) / (1000) % 60);
        
        

        if(seconds > config.sessionTimeout)
        {
            
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

export function generalAjxProcess(fetchURL, actionData) {
    return function (dispatch) {
        return generalAPI.getData(fetchURL, actionData).then(resultSet => {
            dispatch(generalActionLoad(resultSet));
            if (resultSet.responseMessage && resultSet.responseMessage.data.error) {
                return Promise.reject(resultSet.responseMessage.data.error);
            }
            else {
                return Promise.resolve(resultSet.responseMessage.data);
            }

        });
    };

}


function openSocketAgain(host, dispatch) {
    host = host.replace('https://', 'wss://');
    host = host.replace('http://', 'ws://');
    ws = new WebSocket(host + '/Socket');
    ws.onopen = function (event) {
        let msg = {"token": sessionStorage.token, "pageName": sessionStorage.pageName};
        ws.send(JSON.stringify(msg));
    };
    ws.onclose = function (event) {
        console.log("web socket connection closed re-establising connection");
        setTimeout(function () {
            openSocketAgain(host, dispatch)
        }, 10000);
    };
    ws.onmessage = function (event) {
        //alert(event.data)
        dispatch(generalActionLoad(JSON.parse(event.data)));
    };

}


export function sendWSData(data) {
    try {
        let msg = {"token": sessionStorage.token, "pageName": sessionStorage.pageName,"data":data,"action":"subscribe"}
        
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
