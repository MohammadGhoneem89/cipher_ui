import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils.js';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import { browserHistory } from 'react-router';
import * as constants from '../../constants/Communication.js';
import {get, isEmpty} from 'lodash';

class EndPointDefination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      loading: true,
      readOnly: false,
      address: '',
      status: false,
      protocol: {
        nonSecure: false,
        secure: false,
        custom: false
      },
      attachCert: false,
      certPhrase: '',
      authType: '',
      requestType: '',
      auth: {
        endpoint: '',
        field: '',
        password: '',
        username: ''
      }
    };
    this.requestTypes = [{label: 'SOAP', value: 'soap'},{label: 'REST', value: 'rest'}];
    this.authTypes = [{label: 'DDL: Bearer Token', value: 'bearer'}, {label: 'No Auth', value: 'noAuth'}, {label: 'Basic Auth', value: 'basicAuth'}];
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.routeParams.id === 'create') {
      this.setState({loading: false});
    }
    else {
      this.props.actions.generalProcess(constants.findEndpointDefinationById, this.props.routeParams);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.detail)){
      this.setState(Object.assign(nextProps.detail, {loading: false, editMode: true}));
    }
  }

  onChange = (e) => {
    let value = e.target.value;

    if(value === 'on'){
      value = !this.state[e.target.name];
    }

    if(e.target.name === 'authType')
      this.setState({auth: {}});

    this.setState({
      [e.target.name]: value
    });

  };

  onProtocolChange = (e) => {
    let protocol = {
      nonSecure: false,
      secure: false,
      custom: false
    };
    protocol = Object.assign(protocol, {[e.target.name]: !this.state.protocol[e.target.name]});
    this.setState({
      protocol: protocol
    });

  };

  onAuthChange = (e) => {
    let auth = this.state.auth;
    auth = Object.assign(auth, {[e.target.name]: e.target.value});
    this.setState({auth: auth});
  };

  back = () => {
    browserHistory.push('/endpoint');
  };

  getImgResponse = (data) => {
    console.log('-------');
    console.log(data);
    this.file = data.contextData[0];
  };

  getRemoveResponse = () => {};

  submit = () => {
    let payload = {
      address: this.state.address,
      status: this.state.status,
      protocol: this.state.protocol,
      attachCert: this.state.attachCert,
      certPhrase: this.state.certPhrase,
      authType: this.state.authType,
      requestType: this.state.requestType,
      auth: this.state.auth
    };
    if(this.state.editMode){
      payload._id = this.props.routeParams.id
    }
    this.props.actions.generalProcess(constants.upsertEndpointDefination, payload);
    browserHistory.push('/endpoint');
  };

  render() {
    if (this.state.loading) {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
    return (
      <div>
        <Portlet title={""}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Endpoint Address")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" name="address" onChange={this.onChange} value={this.state.address}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Type")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <select name="requestType" className="form-control" onChange={this.onChange} value={this.state.requestType}>
                      <option disabled selected value="">{utils.getLabelByID("Select ...")}</option>
                      {this.requestTypes.map((option, index) => ( <option key={index} value={option.value}>{option.label}</option> ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Protocol")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <label> {utils.getLabelByID("non secure")} </label>
                        <input type="checkbox" className="form-control" name="nonSecure" onChange={this.onProtocolChange} checked={this.state.protocol.nonSecure}/>
                        <span/>
                      </label>
                    </div>
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <label> {utils.getLabelByID("secure")} </label>
                        <input type="checkbox" className="form-control" name="secure" onChange={this.onProtocolChange} checked={this.state.protocol.secure}/>
                        <span/>
                      </label>
                    </div>
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <label> {utils.getLabelByID("custom")} </label>
                        <input type="checkbox" className="form-control" name="custom" onChange={this.onProtocolChange} checked={this.state.protocol.custom}/>
                        <span/>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Active Status")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <input type="checkbox" className="form-control" name="status" onChange={this.onChange} checked={this.state.status}/>
                        <span/>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Attach Certificate")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <input type="checkbox" className="form-control" name="attachCert" onChange={this.onChange} checked={this.state.attachCert} />
                        <span/>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {!this.state.editMode && (<div>
                <div className="row">
                  <div className="form-group">
                    <div className="portlet-title" style={{paddingBottom : "20px"}}>
                      <div>
                        <h4 style={{fontWeight: "bold"}}>{utils.getLabelByID("Certificate Passphrase")}</h4>
                      </div>
                    </div>
                    <textarea type="text" className="form-control" rows="4" name="certPhrase" onChange={this.onChange} value={this.state.certPhrase}> </textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <div className="portlet-title" style={{paddingBottom : "20px"}}>
                      <div>
                        <h4 style={{fontWeight: "bold"}}>{utils.getLabelByID("Certificate")}</h4>
                      </div>
                    </div>
                    <FileUploader type="Document"
                                  source=""
                                  title = {"Upload Certificate"}
                                  maxFiles="10"
                                  showDropzone={!this.state.readOnly}
                                  initialValues = {[]}
                                  getUploadResponse={this.getImgResponse}
                                  getRemoveResponse={this.getRemoveResponse}
                                  showAttachementGrid={false}/>
                  </div>
                </div>
              </div>)}
              <div className="row">
                <div className="form-group">
                  <div className="portlet-title" style={{paddingBottom : "20px"}}>
                    <div>
                      <h4 style={{fontWeight: "bold"}}>{utils.getLabelByID("Authorization")}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Type")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <select name="authType" className="form-control" onChange={this.onChange} value={this.state.authType}>
                      <option disabled selected value="">{utils.getLabelByID("Select ...")}</option>
                      {this.authTypes.map((option, index) => ( <option key={index} value={option.value}>{option.label}</option> ))}
                    </select>
                  </div>
                </div>
              </div>
              {this.state.authType === this.authTypes[0].value && (<div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Token Endpoint")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="endpoint" onChange={this.onAuthChange} value={this.state.auth.endpoint}/>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Token Field")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="field" onChange={this.onAuthChange} value={this.state.auth.field}/>
                    </div>
                  </div>
                </div>
              </div>)}
              {this.state.authType === this.authTypes[2].value && (<div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("username")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="username" onChange={this.onAuthChange} value={this.state.auth.username}/>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("password")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="username" onChange={this.onAuthChange} value={this.state.auth.username}/>
                    </div>
                  </div>
                </div>
              </div>)}
            </div>
            <div className="form-group col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" className="btn green" onClick={this.submit}>{utils.getLabelByID("Submit")} </button>{"  "}
                <button type="button" className="btn default" onClick={this.back}>{utils.getLabelByID("Back")} </button>
              </div>
            </div>
          </div>
        </Portlet>
      </div>);

  }
}

EndPointDefination.propTypes = {
  detail: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    detail: get(state.app, 'findEndpointDefinationById.data', {})
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

EndPointDefination.displayName = "Endpoint Defination";

export default connect(mapStateToProps, mapDispatchToProps)(EndPointDefination);