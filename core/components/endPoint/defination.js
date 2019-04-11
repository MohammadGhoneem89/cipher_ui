import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils.js';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import { browserHistory } from 'react-router';
import * as constants from '../../constants/Communication.js';
import { get, isEmpty } from 'lodash';
import Table from '../../common/Datatable.jsx';

class EndPointDefination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      loading: true,
      readOnly: false,
      address: '',
      name: '',
      status: false,
      protocol: {
        nonSecure: false,
        secure: false,
        custom: false
      },
      attachCert: false,
      certPhrase: '',
      authType: '',
      header: [],
      requestType: '',
      auth: {
        endpoint: '',
        field: '',
        password: '',
        username: ''
      }
    };

    this.requestTypes = [{ label: 'SOAP', value: 'soap' }, { label: 'REST', value: 'rest' }];
    this.authTypes = [{ label: 'Bearer Token', value: 'bearer' }, { label: 'No Auth', value: 'noAuth' }, { label: 'Basic Auth', value: 'basicAuth' }, { label: 'Pass Cred', value: 'passCredHeaderBody' }];
    this.headerTypes = [{ label: 'Fixed Value', value: 'FixedValue' }, { label: 'Datetime', value: 'Datetime' }, { label: 'Datetime Epoch', value: 'DatetimeEpoch' }, { label: 'UUID', value: 'UUID' }, { label: 'Dynamic Field (Events)', value: 'dynamicField' },{ label: 'Body Params', value: 'bodyParams' },{ label: 'Form Params', value: 'formParams' }, { label: 'Unique Reference', value: 'UUIDN' }];
    this.ActionHandlers = this.ActionHandlers.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.routeParams.id === 'create') {
      this.setState({ loading: false });
    }
    else {
      this.props.actions.generalProcess(constants.findEndpointDefinationById, this.props.routeParams);
    }
    let payload = { page: { pageSize: 100000, currentPageNo: 1 } };
    this.props.actions.generalProcess(constants.findEndpointDefination, payload);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.detail)) {
      this.setState(Object.assign(nextProps.detail, { loading: false, editMode: true }));
    }
  }

  onChange = (e) => {
    let value = e.target.value;

    if (value === 'on') {
      value = !this.state[e.target.name];
    }

    if (e.target.name === 'authType')
      this.setState({ auth: {} });

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
    protocol = Object.assign(protocol, { [e.target.name]: !this.state.protocol[e.target.name] });
    this.setState({
      protocol: protocol
    });

  };

  onAuthChange = (e) => {
    let auth = this.state.auth;
    auth = Object.assign(auth, { [e.target.name]: e.target.value });
    this.setState({ auth: auth });
  };

  back = () => {
    browserHistory.push('/endpoint');
  };

  getImgResponse = (data) => {
    this.file = data.contextData[0];
  };

  getRemoveResponse = () => { };

  submit = () => {
    let payload = {
      address: this.state.address,
      status: this.state.status,
      protocol: this.state.protocol,
      attachCert: this.state.attachCert,
      certPhrase: this.state.certPhrase,
      authType: this.state.authType,
      requestType: this.state.requestType,
      header: this.state.header,
      auth: this.state.auth,
      name: this.state.name
    };
    if (this.state.editMode) {
      payload._id = this.props.routeParams.id
    }
    this.setState({ loading: true });
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.upsertEndpointDefination, payload);
  };
  ActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        if (index > -1) {
          let a = this.state.header[index];
          document.getElementById('headerKey').value = a.headerKey;
          document.getElementById('headerType').value = a.headerType;
          document.getElementById('headerPrefix').value = a.headerPrefix;
          document.getElementById('description').value = a.description;
          let tempState = this.state.header;
          tempState.splice(index, 1);
          this.setState({ header: tempState });
        }
        break;
      case "Delete":
        let result = confirm("Are you you want to delete?");
        if (result) {
          if (index > -1) {
            let a = this.state.header;
            a.splice(index, 1);
            this.setState({ header: a });
          }
        }

        break;
      default:
        break;
    }
  }
  addRow() {
    let headerKey = document.getElementById('headerKey') == null ? "" : document.getElementById('headerKey').value;
    let headerType = document.getElementById('headerType') == null ? "" : document.getElementById('headerType').value;
    let headerPrefix = document.getElementById('headerPrefix') == null ? "" : document.getElementById('headerPrefix').value;
    let description = document.getElementById('description') == null ? "" : document.getElementById('description').value;
    if (!headerKey) {
      alert("Header Key must be defined!")
      return;
    }
    if (!headerType) {
      alert("Header Type must be selected!")
      return;
    }

    let data = {
      headerKey,
      headerType,
      headerPrefix,
      description,
      "actions": [
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
        { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
      ]
    }

    let list = this.state.header
    list.push(data)
    this.setState({ header: list })
    this.clearFields();
  }
  clearFields() {
    $('#headerSection').find('input:text').val('');
    $('#headerSection').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
    document.getElementById('Sequence').value = this.state.mappingConfig.length + 1;
  }
  render() {
    if (this.state.loading) {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
    return (
      <div>
        <Portlet title={"Endpoint Add / Edit"}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Endpoint Name")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" name="name" onChange={this.onChange} value={this.state.name} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Endpoint Address")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" name="address" onChange={this.onChange} value={this.state.address} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Type")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <select name="requestType" className="form-control" onChange={this.onChange} value={this.state.requestType}>
                      <option disabled selected value="">{utils.getLabelByID("Select ...")}</option>
                      {this.requestTypes.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
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
                        <input type="checkbox" className="form-control" name="nonSecure" onChange={this.onProtocolChange} checked={this.state.protocol.nonSecure} />
                        <span />
                      </label>
                    </div>
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <label> {utils.getLabelByID("secure")} </label>
                        <input type="checkbox" className="form-control" name="secure" onChange={this.onProtocolChange} checked={this.state.protocol.secure} />
                        <span />
                      </label>
                    </div>
                    <div className="icheck-list">
                      <label className="mt-checkbox mt-checkbox-outline margin-zero">
                        <label> {utils.getLabelByID("custom")} </label>
                        <input type="checkbox" className="form-control" name="custom" onChange={this.onProtocolChange} checked={this.state.protocol.custom} />
                        <span />
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
                        <input type="checkbox" className="form-control" name="status" onChange={this.onChange} checked={this.state.status} />
                        <span />
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
                        <span />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {!this.state.editMode && (<div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="portlet-title" style={{ paddingBottom: "20px" }}>
                      <div>
                        <h4 style={{ fontWeight: "bold" }}>{utils.getLabelByID("Certificate Passphrase")}</h4>
                      </div>
                    </div>
                    <textarea type="text" className="form-control" rows="4" name="certPhrase" onChange={this.onChange} value={this.state.certPhrase}> </textarea>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <div className="portlet-title" style={{ paddingBottom: "20px" }}>
                      <div>
                        <h4 style={{ fontWeight: "bold" }}>{utils.getLabelByID("Certificate")}</h4>
                      </div>
                    </div>
                    <FileUploader type="Document"
                      source=""
                      title={"Upload Certificate"}
                      maxFiles="10"
                      showDropzone={!this.state.readOnly}
                      initialValues={[]}
                      getUploadResponse={this.getImgResponse}
                      getRemoveResponse={this.getRemoveResponse}
                      showAttachementGrid={false} />
                  </div>
                </div>
              </div>)}
              <div className="row">
                <div className="form-group">
                  <div className="portlet-title" style={{ paddingBottom: "5px" }}>
                    <div>
                      <h4 style={{ fontWeight: "bold", marginLeft: "1%" }}>{utils.getLabelByID("Authorization")}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Type")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <select name="authType" className="form-control" onChange={this.onChange} value={this.state.authType}>
                        <option disabled selected value="">{utils.getLabelByID("Select ...")}</option>
                        {this.authTypes.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
                      </select>
                    </div>
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
                      <select className="form-control" name="endpoint" onChange={this.onAuthChange} value={this.state.auth.endpoint}>
                        <option disabled selected value="">{utils.getLabelByID("Select ...")}</option>
                        {this.props.list.map((option, index) => (<option key={index} value={option._id}>{option.name}</option>))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Token Field")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="field" onChange={this.onAuthChange} value={this.state.auth.field} />
                    </div>
                  </div>
                </div>
              </div>)}
              {(this.state.authType === this.authTypes[2].value || this.state.authType === this.authTypes[3].value) && (<div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("username")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="username" onChange={this.onAuthChange} value={this.state.auth.username} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("password")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" name="password" onChange={this.onAuthChange} value={this.state.auth.password} />
                    </div>
                  </div>
                </div>
              </div>)}

              <div className="row" id="headerSection">
                <div className="form-group">
                  <div className="portlet-title" style={{ paddingBottom: "5px" }}>
                    <div>
                      <h4 style={{ fontWeight: "bold", marginLeft: "1%" }}>{utils.getLabelByID("Header Customizations")}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Key")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" id="headerKey" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Type")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <select name="headerType" id="headerType" className="form-control" >
                        <option disabled selected value="">{utils.getLabelByID("Select ...")}</option>
                        {this.headerTypes.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Value / Prefix")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" id="headerPrefix" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Description")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" id="description" />
                    </div>
                  </div>
                  <div className=" col-md-12 form-actions right">
                    <div className="form-group col-md-12">
                      <div className="btn-toolbar pull-right">

                        <button type="submit" className="btn btn-default" onClick={this.addRow.bind(this)} > <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Header")} </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <Table
                        gridColumns={utils.getGridColumnByName("HeaderConfig")}
                        gridData={this.state.header}
                        export={false}
                        componentFunction={this.ActionHandlers}
                        pagination={false} />
                    </div>
                  </div>
                </div>
              </div>



            </div>


            <div className="col-md-12">
              <div className="col-md-12">
                <div className="form-group col-md-12">
                  <div className="btn-toolbar pull-right">
                    <button type="submit" className="btn green" onClick={this.submit}>{utils.getLabelByID("Submit")} </button>{"  "}
                    <button type="button" className="btn default" onClick={this.back}>{utils.getLabelByID("Back")} </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portlet>
      </div >);

  }
}

EndPointDefination.propTypes = {
  detail: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    detail: get(state.app, 'findEndpointDefinationById.data', {}),
    list: get(state.app, 'findEndpointDefination.data', {})
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

EndPointDefination.displayName = "Endpoint Defination";

export default connect(mapStateToProps, mapDispatchToProps)(EndPointDefination);