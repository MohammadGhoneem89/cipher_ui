import initialState from './initialState';
import {browserHistory} from 'react-router';


import * as toaster from '../common/toaster.js';

export default function generalReducer(state = initialState, action) {
    if (action.resultData) {


        let rData = action.resultData[Object.keys(action.resultData)[0]];

        if (rData && rData.data && rData.data.message) {

            if (rData.data.message.displayToUser === true)
                toaster.showToast(rData.data.message.errorDescription, rData.data.message.status);

            if (rData.data.message.newPageURL && (rData.data.message.status === "OK" || rData.data.message.status === "UNAUTHORIZED") && rData.data.actionProcessor !== "reduxFormProcess")
                browserHistory.push(rData.data.message.newPageURL);

        }


        return Object.assign({}, state, action.resultData);

    } else {


        //console.log(state);
        return state;
    }

}