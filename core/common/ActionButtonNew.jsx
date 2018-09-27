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


class ActionButtonNew extends React.Component {

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

        if (actionURI.constructor === Array && actionURI.length > 1)
            actionURI = actionURI[0];

        let request = this.props.performAction(actionID);

        if (request == "" || request == '') {
            return '';
        }
        if (confirmStatus && confirmStatus === true)
            request.isConfirmed = true;

        let performActionURI = ((this.props.blockchainAction && this.props.blockchainAction === true) ? constants.performActionToBlockChain : constants.performAction);
        performActionURI = this.props.repostActionURL || performActionURI;

        this.props.actions.generalProcess(performActionURI + actionURI, request);
    }

    performAction({actionID, actionURI, actionType, confirm, confirmText, confirmTitle, actionObj}) {
        switch (actionType) {
            case "UI_ACTION":
            case "PORTLET_LINK":
                browserHistory.push(actionURI);
                break;
            case "COMPONENT_FUNCTION":
                this.props.performAction(actionObj);
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
                        if (sd != null) {
                            let params;
                            switch (sd.actionType) {
                                case "PORTLET_LINK":
                                    params = {
                                        actionID: sd.value || sd.actionID,
                                        actionURI: sd.URI || sd.actionURI,
                                        actionType: sd.actionType,
                                        confirm: sd.confirm,
                                        confirmText: sd.confirm,
                                        confirmTitle: sd.confirmTitle,
                                        actionObj: sd
                                    };
                                    return (<a key={index} href="javascript:"
                                               onClick={this.performAction.bind(this, params)}
                                               className={utils.getButtonClassByID(sd.labelName ? sd.labelName : sd.name)}>
                                        <i className={sd.iconName || ""}/>
                                        {utils.getButtonLabelByID(sd.labelName ? sd.labelName : sd.name)}
                                    </a>);

                                case "REDUX_FORM_SUBMIT":
                                    return (<button key={index} type="submit"
                                                    className={utils.getButtonClassByID(sd.labelName ? sd.labelName : sd.name)}
                                                    disabled={this.props.submitting}>
                                        {utils.getButtonLabelByID(sd.labelName ? sd.labelName : sd.name)}
                                    </button>);

                                case "COMPONENT_FUNCTION":
                                    params = {
                                        actionObj: sd,
                                        actionType: sd.actionType
                                    };

                                    return (<button key={index} href="javascript:"
                                                    onClick={this.performAction.bind(this, params)}
                                                    className={utils.getButtonClassByID(sd.labelName ? sd.labelName : sd.name)}>
                                        <i className={sd.iconName || ""}/>
                                        {utils.getButtonLabelByID(sd.labelName ? sd.labelName : sd.name)}
                                    </button>);
                                default:
                                    params = {
                                        actionID: sd.value || sd.actionID,
                                        actionURI: sd.URI || sd.actionURI,
                                        actionType: sd.actionType,
                                        confirm: sd.confirm,
                                        confirmText: sd.confirm,
                                        confirmTitle: sd.confirmTitle,
                                        actionObj: sd
                                    };
                                    return (<button key={index + 1} type="submit"
                                                    onClick={this.performAction.bind(this, params)}
                                                    className={utils.getButtonClassByID(sd.labelName ? sd.labelName : sd.name)}>{utils.getButtonLabelByID(sd.labelName ? sd.labelName : sd.name)} </button>)
                            }
                        }
                    })
                    }
                </div>
            );
        }
        else
            return (<div/>)

    }
}

ActionButtonNew.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonNew);