/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';
import * as connts from '../../constants/Communication.js';
import StatusBar from './StatusBar.jsx';
import QRCodeJquery from './QRCodeJquery.jsx';
import ActionButton from './ActionButton.jsx';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import * as utils from '../common/utils.js';
import { baseUrl } from '../../constants/Communication.js';



class AuditLogDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            auditLogID: undefined
        }

    }
    componentWillMount() {
        if (document.getElementById('auditTrailSection') != null) {
            document.getElementById('auditTrailSection').innerHTML = "";
        }

    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.auditLogID != this.state.auditLogID) {
            var request = {
                "id": nextProps.auditLogID,
            }

            this.setState({ auditLogID: nextProps.auditLogID })
            this.props.actions.generalProcess(constants.getAuditLogDetail, request);
        }
        if (document.getElementById('diffoutput') != null) {
            
            document.getElementById('diffoutput').innerHTML = "";
            this.diffUsingJS.bind(this, 0)
        }
    }
    diffUsingJS(viewType) {


        if (viewType != 1) {
            try {
                document.getElementById("diffoutput").innerHTML = ""                
            }
            catch (val) {

            }
            "use strict";
            var byId = function (id) { return document.getElementById(id); },
                base = difflib.stringAsLines(byId("baseText") == undefined ? "" : byId("baseText").value),
                newtxt = difflib.stringAsLines(byId("newText") == undefined ? "" : byId("newText").value),
                sm = new difflib.SequenceMatcher(base, newtxt),
                opcodes = sm.get_opcodes(),
                diffoutputdiv = byId("diffoutput"),
                contextSize = byId("contextSize") == undefined ? "" : byId("contextSize").value;

            diffoutputdiv.innerHTML = "";
            contextSize = contextSize || null;

            diffoutputdiv.appendChild(diffview.buildView({
                baseTextLines: base,
                newTextLines: newtxt,
                opcodes: opcodes,
                baseTextName: "Previous JSON",
                newTextName: "Current JSON",
                contextSize: contextSize,
                viewType: viewType
            }));
        }
    }

    convertJSONToString(value) {

        //var sortdArray = this.sortJSON(value)
        let key = '_id'
        for (key in value) {
            if (value.hasOwnProperty(key) && key =="_id") {
                
                delete value[key];
            }
        }
        
        //stringify(obj)
        if(value)
            //return JSON.stringify(value, Object.keys(value).sort(),2)
            return JSON.stringify(value, Object.keys(value).sort(),2)
        else 
            return '';
        //return stringify(value);
        //return JSON.stringify(sortdArray, null, 2);


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

    render() {

        let input1 = {
            "loginResponse": {
                "action": "login",
                "data": {
                    "message": {
                        "status": "OK",
                        "errorDescription": "Successfully Logged In",
                        "routeTo": "routeToUser",
                        "displayToUser": true
                    },
                    "success": true,
                    "token": "uaiskdjhjkshdnmasjdknm"
                }
            }

        }
        let input2 = {
            "loginResponse": {
                "action": "login",
                "data": {
                    "message": {
                        "status": "ERROR",
                        "errorDescription": "Successfully Logged In",
                        "routeTo": "routeToUser",
                        "displayToUser": true
                    },
                    "success": true,
                    "token": "uaiskdjhjkshdnmasjdknm"
                }
            }
        }
        if (this.props.auditLogDetailData.current) {
            return (


                <div>
                    <div className="form-body" id="auditTrailSection">
                        <div className="row">
                            <textarea id="newText" style={{ display: "none" }} value={this.convertJSONToString(this.props.auditLogDetailData.current)}/>
                            <textarea id="baseText" style={{ display: "none" }} value={this.convertJSONToString(this.props.auditLogDetailData.previous)}/>

                            <div class="viewType">
                                <button type="submit" className="btn green" onClick={this.diffUsingJS.bind(this, 0)}>{"View JSON comparison"} </button>
                                <div id="diffoutput" style={{width:3000}}>
                                </div>


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
AuditLogDetail.propTypes = {
    auditLogDetailData: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        auditLogDetailData: state.app.auditLogDetail.data
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
AuditLogDetail.displayName = "Audit Log Detail";
export default connect(mapStateToProps, mapDispatchToProps)(AuditLogDetail);