/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as connts from '../../constants/Communication.js';
import StatusBar from '../../common/StatusBar.jsx';
import QRCodeJquery from '../../common/QRCodeJquery.jsx';
import ActionButton from '../../common/ActionButtonNew.jsx';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import * as utils from '../../common/utils.js';
import {baseUrl} from '../../constants/Communication.js';
import JSONPretty from 'react-json-pretty';
import * as toaster from '../../common/toaster.js';
import Table from '../../common/Datatable.jsx';
import _ from "lodash";

class APIPayloadDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      APIPayloadID: undefined,
      isVisible: false,
      heading: "",
      body: ""
    }
    this.performAction = this.performAction.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
  }

  componentWillMount() {
    if (document.getElementById('auditTrailSection') != null) {
      document.getElementById('auditTrailSection').innerHTML = "";
    }

  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.APIPayloadID != this.state.APIPayloadID) {
      var request = {
        "id": nextProps.APIPayloadID,
      }

      this.setState({APIPayloadID: nextProps.APIPayloadID})
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
    } catch (ex) {

    }
  }

  ActionHandlers({actionName, index}) {
    // alert(index)
    switch (actionName) {
      case "View Request":

        this.setState({
          isVisible: true,
          heading: "Request",
          body: this.props.APIPayloadDetailData.tracking[index].request
        })
        break;
      case "View Response":
        this.setState({
          isVisible: true,
          heading: "Response",
          body: this.props.APIPayloadDetailData.tracking[index].response
        })
        break;
      case "View Error":
        this.setState({isVisible: true, heading: "Error", body: this.props.APIPayloadDetailData.tracking[index].error})
        break;
      default:
        break;
    }
  }

  performAction(actionID) {
    $('#modelWindows').modal('hide');
    toaster.showToast("Request submitted successfully", "SUCCESS");
    if (this.props.APIPayloadDetailData.payload.header) {
      delete this.props.APIPayloadDetailData.payload.header.password;
    }
    return this.props.APIPayloadDetailData.payload;

  }

  render() {
    if (this.props.APIPayloadDetailData.tracking) {
      this.props.APIPayloadDetailData.tracking.forEach((elem) => {
        _.set(elem, 'actions', [
          {"label": "View Request", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION"},
          {"label": "View Response", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION"},
          {"label": "View Error", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION"}
        ])

      })
    }
    if (this.props.APIPayloadDetailData.payload) {
      if (this.props.APIPayloadDetailData.payload.header) {
        delete this.props.APIPayloadDetailData.payload.header.password;
      }

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
      let eCode = _.get(this.props.APIPayloadDetailData.response, 'errorCode', 'N/A')
      return (


        <div>
          <div className="form-body" id="auditTrailSection">
            <div className="row">
              <div className={"col-md-12"}>

                <div className="tabbable-line boxless">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#tab_1_1" data-toggle="tab"
                         style={{fontWeight: "Bold", fontSize: "17px"}}>Transaction</a>
                    </li>
                    <li>
                      <a href="#tab_1_2" data-toggle="tab"
                         style={{fontWeight: "Bold", fontSize: "17px"}}>Tracking</a>
                    </li>
                  </ul>
                </div>
                <div className="tabbable-line">
                  <div className="tab-content">
                    {/* Simulator Box */}
                    <div className="tab-pane active" id="tab_1_1">
                      <h4 className="form-section" style={{fontWeight: "bold"}}>{"Transaction details"}</h4>
                      <div className="row">
                        <div className="row">
                          <div className={"col-md-12"}>
                            <div className={"col-md-12"}>
                              <div className=" col-md-3">
                                <label className="control-label bold">{utils.getLabelByID("Message ID")}</label>
                              </div>
                              <div className=" col-md-9">
                                <label className="control-label ">{this.props.APIPayloadDetailData.uuid}</label>
                              </div>

                              <div className=" col-md-3">
                                <label className="control-label bold">{utils.getLabelByID("Status")}</label>
                              </div>
                              <div className=" col-md-9">
                                <label
                                  className="control-label "
                                  style={{color: eCode == 200 ? 'green' : 'red'}}>{eCode}</label>
                              </div>
                              <div className="] col-md-3">
                                <label className="control-label bold">{utils.getLabelByID("Called At")}</label>
                              </div>
                              <div className=" col-md-9">
                                <label className="control-label ">{this.props.APIPayloadDetailData.createdat}</label>
                              </div>

                              <div className=" col-md-3">
                                <label className="control-label bold">{utils.getLabelByID("Called By User")}</label>
                              </div>
                              <div className=" col-md-9">
                                <label
                                  className="control-label ">{_.get(this.props.APIPayloadDetailData.payload, 'header.username', 'N/A')}</label>
                              </div>

                              <div className=" col-md-3">
                                <label className="control-label bold">{utils.getLabelByID("Duration")}</label>
                              </div>
                              <div className=" col-md-9">
                                <label className="control-label " style={{color: this.props.APIPayloadDetailData.duration <= this.props.APIPayloadDetailData.avgrtt ? 'green' : 'red'}}>{this.props.APIPayloadDetailData.duration} ms</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-6"}>
                        <h4 className="form-section" style={{fontWeight: "bold"}}>{"Request"}</h4>
                        <JSONPretty id="json-pretty" style={{height: "400", width: "100%"}}
                                    json={this.props.APIPayloadDetailData.payload}></JSONPretty>
                      </div>
                      <div className={"col-md-6"}>
                        <h4 className="form-section" style={{fontWeight: "bold"}}>{"Response"}</h4>
                        <JSONPretty id="json-pretty" style={{height: "400", width: "100%"}}
                                    json={this.props.APIPayloadDetailData.response}></JSONPretty>
                        <div>

                        </div>
                      </div>
                      <div className={"col-md-12"}>
                        <h4 className="form-section" style={{fontWeight: "bold"}}>{"Error"}</h4>
                        <JSONPretty id="json-pretty" style={{height: "auto", width: "100%"}}
                                    json={this.props.APIPayloadDetailData.error || "Processed OK!"}></JSONPretty>
                        <div>
                          <ActionButton actionList={action} performAction={this.performAction}
                                        repostActionURL={repostActionURL}/>
                        </div>
                      </div>
                      <div className={"col-md-12"}>
                      </div>
                    </div>
                    <div className="tab-pane active" id="tab_1_2">
                      <h4 style={{fontWeight: "bold"}}>{"Tracking"}</h4>
                      <Table title="" fontclass="" T
                             gridColumns={utils.getGridColumnByName("APIPayloadListTracking")}
                             gridData={this.props.APIPayloadDetailData.tracking}
                             componentFunction={this.ActionHandlers}
                        // renderPopupBody={this.renderPopupBody}
                      />
                      {
                        this.state.isVisible &&
                        <div className={"col-md-12"}>
                          <h4 style={{fontWeight: "bold"}}>{this.state.heading}</h4>
                          <JSONPretty id="json-pretty" style={{height: "auto", width: "100%"}}
                                      json={this.state.body || "N/A"}></JSONPretty>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    } else
      return (
        <div></div>
      )


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
  return {actions: bindActionCreators(actions, dispatch)}
}

APIPayloadDetail.displayName = "Audit Log Detail";
export default connect(mapStateToProps, mapDispatchToProps)(APIPayloadDetail);