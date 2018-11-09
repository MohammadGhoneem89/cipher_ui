/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/actions/generalAction';
import * as constants from '../../../core/constants/Communication.js';
import { baseUrl } from '../../../core/constants/Communication.js';
import QRCodeJquery from '../../../core/common/QRCodeJquery.jsx';
import ActionButton from '../../../core/common/ActionButtonNew.jsx';
import * as requestCreator from '../../../core/common/request.js';
import * as utils from '../../../core/common/utils.js';
import InnerGrid from '../../../core/common/Datatable.jsx';
import Steps from '../../../core/common/Steps.jsx';
import ModalBox from '../../../core/common/ModalBox.jsx';
import DateControl from '../../../core/common/DateControl.jsx'
import FileUploader from '../../../core/common/FileUploader.jsx';
import _ from 'lodash';
import Table from '../../../core/common/Datatable.jsx';
import Portlet from '../../../core/common/Portlet.jsx';
import * as dateFunctions from '../../../core/common/dates.js';
import config from '../../../config';

let isEditMode = ""

class APIDefinitionScreen extends React.Component {

  constructor(props) {
    super(props);
    this.performAction = this.performAction.bind(this);
    this.updateState = this.updateState.bind(this);
    this.formSubmit = this.formSubmit.bind(this);

    this.getUploadResponse = this.getUploadResponse.bind(this);

    this.state = {

      route: '',
      fieldName: '',
      MappingFunctionName: '',
      CustomFileName: '',
      RequestServiceQueue: '',
      ResponseQueue: '',
      ServiceIP: '',
      ServicePort: '',
      formSubmitted: false,
      isLoading: false,

    };

    this.dropDownItems = [
      {
        "label": "Label1",
        "value": "Value1"
      },
      {
        "label": "Label2",
        "value": "Value2"
      },
      {
        "label": "Label3",
        "value": "Value3"
      }
    ];

  }

  componentWillMount() {
      this.props.actions.generalProcess(constants.getAPIDefinitionAddUpdate);
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.APIDefinitionAddUpdate) {
      this.setState({
        isLoading: false
      });
    }
  }
  getUploadResponse(data) {

    let attachements = this.state.documents;
    attachements.push(data);
    this.setState({ documents: attachements })
  }

  performAction(actionObj) {

    //Input Form Values


  }

  updateState(data) {
    this.setState(data);
  }

  // formSubmit() { 
  //   let route = this.state.route;
  //   let fieldName = this.state.fieldName;
  //   let MappingFunctionName = this.state.MappingFunctionName;
  //   let CustomFileName = this.state.CustomFileName;
  //   let  RequestServiceQueue = this.state.RequestServiceQueue;
  //   let  ResponseQueue = this.state.ResponseQueue;
  //   let  ServiceIP = this.state.ServiceIP;
  //   let ServicePort = this.state.ServicePort;
  // }

  formSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    console.log(data);
    let request = {
      action: "APIDefinations",
      data
    };
    //this.props.actions.reduxFormProcess(constants.updateBlockchainAccountList, request)
  }

  onInputChange = (e) => {
    console.log('----------', e.target);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit = () => {
    this.setState({ formSubmitted: true });
  }

  isEditMode = true;


  render() {

    let dropDownItems = [
      {
        "label": "Label1",
        "value": "Value1"
      },
      {
        "label": "Label2",
        "value": "Value2"
      },
      {
        "label": "Label3",
        "value": "Value3"
      }
    ]

    let code = [
      {
        "label": "Label1",
        "value": "Value1"
      },
      {
        "label": "Label2",
        "value": "Value2"
      },
      {
        "label": "Label3",
        "value": "Value3"
      }
    ]



    console.log('--------------------- test');
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (
      <Portlet title={utils.getLabelByID("APIDefinitionScreen_Heading")}>
        <div className="row">
          <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
            <form className="form-horizontal" role="form" onSubmit={this.formSubmit}>
              <div className="form-body" style={{ paddingLeft: "18px" }}>
                <div className="row">

                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_route")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {/* {console.log( this.props.APIDefinitionAddUpdate.route) } */}
                        </p> :
                          <input type="text" className="form-control" name="route" onChange={this.onInputChange} value={this.state.route} />
                        }
                        {!this.state.route && this.state.formSubmitted && (<p>error message</p>)}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_Dropdown")}</label>
                      <div className="col-md-7">
                      {console.log(this.props.APIDefinitionAddUpdate)}
                        {isEditMode ? <p className="form-control-static">
                         
                        </p> :
                          <select name="dropdown" id="dropdown" className="form-control">
                            <option value={""}> {this.props.APIDefinitionAddUpdate.Authorization}</option>
                            {dropDownItems.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })}
                          </select>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_isActive")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                        {this.props.APIDefinitionAddUpdate.isActive}
                        </p> :
                          <input type="checkbox" className="form-control" name="cb" id="cb" >
                         </input>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">

                  {/* <div className="col-md-1">
                        </div> */}
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label className="control-label col-md-7" style={{
                          textAlign: "left",
                          fontWeight: "bold"
                        }}>{utils.getLabelByID("APIDefScreen_Label1")}</label>

                      </div>
                    </div>

                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_RouteOveride")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.isRouteOveride}
                        </p> :
                          <input type="checkbox" className="form-control" name="cb" id="cb" />
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                  </div>
                  <div className="row">

                    <div className="col-md-7">
                      <div className="form-group">
                        <label className="control-label col-md-5" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("APIDefScreen_fieldName")}</label>
                        <div className="col-md-7">
                          {isEditMode ? <p className="form-control-static">
                            {this.props.APIDefinitionAddUpdate.fieldName}
                          </p> :
                            <input type="text" className="form-control" name="fieldName" onChange={this.onInputChange} value={this.state.fieldName} />
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-7" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{utils.getLabelByID("APIDefScreen_Label2")}</label>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7">
                      <div className="form-group">
                        <label className="control-label col-md-5" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("APIDefScreen_CustomMapping")}</label>
                        <div className="col-md-7">
                          {isEditMode ? <p className="form-control-static"
                          >
                            {this.props.APIDefinitionAddUpdate.customMapping}
                          </p> :
                            <input type="checkbox" className="form-control" />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_MFunctionName")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.MappingfunctionName}
                        </p> :
                          <input type="text" className="form-control" name="MappingFunctionName" onChange={this.onInputChange} value={this.state.MappingFunctionName} />
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_CFileName")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.CustomMappingFile}
                        </p> :
                          <input type="text" className="form-control" name="CustomFileName" onChange={this.onInputChange} value={this.state.CustomFileName} />
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="control-label col-md-7" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{utils.getLabelByID("APIDefScreen_Label3")}</label>

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label className="control-label col-md-5" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("APIDefScreen_async")}</label>
                        <div className="col-md-7">
                          {isEditMode ? <p className="form-control-static">
                            {this.props.APIDefinitionAddUpdate.isAsync}
                          </p> :
                            <input type="checkbox" className="form-control" />
                          }
                        </div>
                      </div>
                    </div>


                    <div className="col-md-5">
                      <div className="form-group">

                        <div className="col-md-5">
                          {isEditMode ? <p className="form-control-static">
                            {this.props.APIDefinitionAddUpdate.simulatorResponse}
                          </p> :
                            <select name="dropdown" id="dropdown" className="form-control">
                              <option value={""}>REST/Queue</option>
                              {dropDownItems.map((option, index) => {
                                return (
                                  <option key={index} value={option.value}>{option.label}</option>
                                );
                              })}
                            </select>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_RSQueue")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.requestServiceQueue}
                        </p> :
                          <input type="text" className="form-control" name="RequestServiceQueue" onChange={this.onInputChange} value={this.state.RequestServiceQueue} />
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_ServiceIP")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.ServiceIP}
                        </p> :
                          <input type="text" className="form-control" name="ResponseQueue" onChange={this.onInputChange} value={this.state.ResponseQueue} />
                        }
                      </div>
                    </div>
                  </div>

                </div>


                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_ResponseQueue")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.responseQueue}
                        </p> :
                          <input type="text" className="form-control" name="ServiceIP" onChange={this.onInputChange} value={this.state.ServiceIP} />
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_ServicePort")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.ServicePort}
                        </p> :
                          <input type="text" className="form-control" name="ServicePort" onChange={this.onInputChange} value={this.state.ServicePort} />
                        }
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-9">
                    <div className="form-group">
                      <label className="control-label col-md-7" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{utils.getLabelByID("APIDefScreen_Label4")}</label>

                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-group">
                      <input type="text" className="control-label col-md-7" style={{
                        textAlign: "left",
                        fontWeight: "normal",
                        width: "100%"
                      }} />

                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="form-group">
                      <label className="control-label col-md-7" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{utils.getLabelByID("APIDefScreen_Label5")}</label>

                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-group">
                      <input type="text" className="control-label col-md-7" style={{
                        textAlign: "left",
                        width: "100%",
                        fontWeight: "normal"
                      }}></input>

                    </div>
                  </div>
                </div>
                <div className="row" >
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_RequestMapping")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                         
                        </p> :
                          <select name="dropdown" id="dropdown" className="form-control">
                            <option value={""}> {this.props.APIDefinitionAddUpdate.RequestMapping}</option>
                            {dropDownItems.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })}
                          </select>
                        }
                      </div>
                    </div>
                  </div>



                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_ResponseMapping")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.ResponseMapping}
                        </p> :
                          <select name="dropdown" id="dropdown" className="form-control">
                            <option value={""}>SELECT</option>
                            {dropDownItems.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })}
                          </select>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_isSimulated")}</label>
                      <div className="col-md-7">
                        {isEditMode ? <p className="form-control-static">
                          {this.props.APIDefinitionAddUpdate.isSimulated}
                        </p> :
                          <input type="checkbox" className="form-control" name="textbox" id="textbox" />
                        }
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="btn-toolbar pull-right">
                        <button type="submit" className="btn green"><i
                          className="fa fa-paper-plane" />{' '}{utils.getLabelByID("Submit")}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </Portlet>
    );
  }
}

APIDefinitionScreen.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  APIDefinitionAddUpdate: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {

    typeData: state.app.typeData.data,
    //recordID: ownProps.params.recordID,
    APIDefinitionAddUpdate: state.app.APIDefinitionAddUpdate,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}


APIDefinitionScreen.displayName = "APIDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(APIDefinitionScreen);