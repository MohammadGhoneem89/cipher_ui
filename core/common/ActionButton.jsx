/*standard imports*/
import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/generalAction';


import * as utils from './utils.js';
import * as constants from '../constants/Communication.js';

import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class ActionButton extends React.Component {

    constructor(props, context) {
        super(props, context);


    }

    componentDidMount() {

        if (this.props.processActionResponseData.success)
            browserHistory.push('/' + this.props.processActionResponseData.redirectTo);

    }

    submit = (actionID, actionURI, confirm, confirmText, confirmTitle) => {
        confirmAlert({
            title: confirmTitle || "",                        // Title dialog
            message: confirmText || "",               // Message dialog
            childrenElement: () => <div/>,       // Custom UI or Component
            confirmLabel: 'Yes',                           // Text button confirm
            cancelLabel: 'No',                             // Text button cancel
            onConfirm: () => this.processRequest(actionID, actionURI, true),    // Action after Confirm
            onCancel: () => this.processRequest(actionID, actionURI, false),      // Action after Cancel
        })
    };

    componentWillMount() {

    }

    processRequest(actionID, actionURI, confirmStatus) {
        let request = this.props.performAction(actionID);
        if (confirmStatus && confirmStatus === true)
            request.isConfirmed = true;

        let performActionURI = ((this.props.blockchainAction && this.props.blockchainAction === true) ? constants.performActionToBlockChain : constants.performAction);
        if(request){
            this.props.actions.generalProcess(performActionURI + actionURI, request);
        }
    }

    performAction(actionID, actionURI, type, confirm, confirmText, confirmTitle) {
        switch (type) {
            case "UI_ACTION":
                browserHistory.push(actionURI);
                break;
            default: {
                if (confirm && confirm === true) {
                    this.submit(actionID, actionURI, confirm, confirmText, confirmTitle, this.processRequest);
                }
                else {
                    this.processRequest(actionID, actionURI, false);
                }
            }
                break;
        }


    }

    render() {
        if (this.props.actionList) {
            return (
                
                <div className="btn-toolbar pull-right">
                    {this.props.actionList.map((sd, index) => {
                        return (<button key={index + 1} type="submit"
                                        onClick={this.performAction.bind(this, sd.actionID, sd.actionURI, sd.type, sd.confirm, sd.confirmText, sd.confirmTitle)}
                                        className={utils.getButtonClassByID(sd.name)}>{utils.getButtonLabelByID(sd.name)} </button>)
                    })
                    }
                </div>
            );
        }
        else
            return (<div/>)

    }
}

ActionButton.propTypes = {
    processActionResponseData: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {

    return {
        processActionResponseData: state.app.processActionResponseData.data
    };
}

function mapDispatchToProps(dispatch) {

    return {actions: bindActionCreators(actions, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);