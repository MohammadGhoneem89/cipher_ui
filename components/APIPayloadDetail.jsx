/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';
import * as connts from '../constants/Communication.js';
import StatusBar from '../components/StatusBar.jsx';
import QRCodeJquery from '../components/QRCodeJquery.jsx';
import ActionButton from '../components/ActionButtonNew.jsx';
import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import * as utils from '../common/utils.js';
import { baseUrl } from '../constants/Communication.js';
import JSONPretty from 'react-json-pretty';
import * as toaster from '../common/toaster.js';




class APIPayloadDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            APIPayloadID: undefined
        }
        this.performAction = this.performAction.bind(this);

    }
    componentWillMount() {
        if (document.getElementById('auditTrailSection') != null) {
            document.getElementById('auditTrailSection').innerHTML = "";
        }

    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

        //console.log(nextProps);
        if (nextProps.APIPayloadID != this.state.APIPayloadID) {
            var request = {
                "id": nextProps.APIPayloadID,
            }

            this.setState({ APIPayloadID: nextProps.APIPayloadID })
            this.props.actions.generalProcess(constants.getAPIPayloadDetail, request);
        }
        if (document.getElementById('diffoutput') != null) {

            document.getElementById('diffoutput').innerHTML = "";
            this.diffUsingJS.bind(this, 0)
        }
    }
    diffUsingJS(viewType) {

    }

    convertJSONToString(value) {

        return JSON.stringify(value, 2);

    }
    sortJSON(o) {
        try {
            const isObject = (v) => ('[object Object]' === Object.prototype.toString.call(v));

            if (Array.isArray(o)) {
                return o.sort().map(v => isObject(v) ? JSON.sortJSON(v) : v);
            } else if (isObject(o)) {
                return Object
                    .keys(o)
                    .sort()
                    .reduce((a, k) => {
                        if (isObject(o[k])) {
                            a[k] = JSON.sort(o[k]);
                        } else if (Array.isArray(o[k])) {
                            a[k] = o[k].map(v => isObject(v) ? JSON.sortJSON(v) : v);
                        } else {
                            a[k] = o[k];
                        }

                        return a;
                    }, {});
            }

            return o;
        }
        catch (ex) {

        }
    }
    performAction(actionID) {
        $('#modelWindows').modal('hide');
        toaster.showToast("Request submitted successfully", "SUCCESS");
        return this.props.APIPayloadDetailData.payload;

    }

    render() {

        if (this.props.APIPayloadDetailData.payload) {
            let action = [
                {
                    "type": "pageAction",
                    "label": "Save",
                    "labelName": "ReSubmit_Request",
                    "params": "",
                    "actionURI": "/" + this.props.APIPayloadDetailData.channel + "/" + this.props.APIPayloadDetailData.action
                }
            ]
            let repostActionURL = this.props.APIPayloadDetailData.channel == 'Cipher' ? constants.repostAction : constants.repostActionInternal;
            return (


                <div>
                    <div className="form-body" id="auditTrailSection">
                        <div className="row">
                            <h3 className="form-section" style={{ fontWeight: "bold" }}>{"JSON"}</h3>
                            <JSONPretty id="json-pretty" style={{ height: "400", width: "1000" }} json={this.props.APIPayloadDetailData.payload}></JSONPretty>
                            <div>
                                <ActionButton actionList={action} performAction={this.performAction} repostActionURL={repostActionURL} />
                            </div>

                        </div>
                    </div>
                </div >


            );
        }
        else
            return (<div></div>)


    }
}
APIPayloadDetail.propTypes = {
    APIPayloadDetailData: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        APIPayloadDetailData: state.app.APIPayLoadDetail.data
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
APIPayloadDetail.displayName = "Audit Log Detail";
export default connect(mapStateToProps, mapDispatchToProps)(APIPayloadDetail);