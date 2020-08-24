import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './validate';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import EntityServicesForm from './OrgServicesForm.jsx';
import TileUnit from '../../common/tileUnit.jsx';
import EntityContactsForm from './OrgContactsForm.jsx';
import OrgAdditionalPropsForm from './OrgAdditionalPropsForm.jsx';
import OrgMappedCodesForm from './OrgMappedCodesForm.jsx';
import * as utils from '../../common/utils.js';
import ActionButton from '../../common/ActionButtonNew.jsx';
import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';

//https://github.com/erikras/redux-form/issues/369
const FormSection1 = ({ error, initialValues, updateState, state, containerProps, containerState, onInputChange, welcome, handleSubmit }) => {
  console.log(JSON.stringify(containerState))
  return (


    <div>


      <Portlet title={"Basic Information"}>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="entityName"
              label={utils.getLabelByID("entityName")}
              type="text"
              disabled={state.readOnly}
            />
            <br />
            <TextInput
              name="arabicName"
              label={utils.getLabelByID("arabicName")}
              type="text"
              style={{ textAlign: "right" }}
              disabled={state.readOnly}
            />
            <br />
            <TextInput
              name="clientKey"
              label={utils.getLabelByID("Client Key")}
              type="text"
              disabled={state.readOnly}
            />
            <br />
            <DropdownInput name="orgType" options={containerState.typeData.ORG_TYPES}
              label={utils.getLabelByID("ESEARCH_orgType")}
              disabled={state.readOnly}
            />
          </div>
          <br />
          <div className="col-md-6 col-sm-6 offset4">

            <div className="row" style={{ display: "inline" }}>
              <div className="col-md-6 col-sm-6" style={{ textAlign: "center" }} />
              <div className="col-md-5 col-sm-5" style={{ textAlign: "center" }}>
                <img id="EntityLogo"
                  src={initialValues.entityLogo ? constants.baseUrl + initialValues.entityLogo.sizeMedium : "https://www.thsp.co.uk/wp-content/uploads/2016/11/Icon-Placeholder.png"}
                  className="img-responsive img-thumbnail" alt="Entity Logo" width="150px"
                  height="150px" />
                {!state.readOnly &&
                  <div className="col-md-12 col-sm-12" style={{ textAlign: "center" }}>
                    <span id="ImgUploadBtn" className="label label-primary" style={{ cursor: "pointer" }}>
                      {utils.getLabelByID("ChangeImage")}
                    </span>
                    <TextInput name="entityLogo" id='ImgUploader' type='file'
                      style={{ display: "none" }} />
                  </div>}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">


          <div className="col-md-3">
            <DropdownInput name="parentEntity" options={containerProps.entityNames}
              label={utils.getLabelByID("parentEntity")}
              disabled={state.readOnly}
            />
          </div>
          <div className="col-md-3">
            <TextInput
              name="spCode"
              label={utils.getLabelByID("ES_spCode")}
              type="text"
              disabled={state.readOnly}
            />
          </div>
        </div>
        <br />
        <div className="row">


          <div className="col-md-3">
            <DropdownInput name="cycle" options={containerState.typeData.cycle}
              label={utils.getLabelByID("billing cycle")}
              disabled={state.readOnly}
            />
          </div>
          <div className="col-md-3">
            <DropdownInput name="currency" options={containerState.typeData.currency}
              label={utils.getLabelByID("billing currency")}
              disabled={state.readOnly}
            />
          </div>

          <div className="col-md-3">
            <div style={{ padding: "17px" }}>
              <CheckboxList>
                <CheckboxInput
                  name="isActive"
                  label={utils.getLabelByID("isActive")}
                  type="checkbox"
                  disabled={state.readOnly}
                />
              </CheckboxList>
            </div>
          </div>
        </div>

      </Portlet>

      <div className="tabbable-line boxless">
        <ul className="nav nav-tabs">

          <li className={"active"}>
            <a href="#tab_1_1" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Contacts</a>
          </li>
          <li>
            <a href="#tab_1_3" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Tax Codes</a>
          </li>
          <li>
            <a href="#tab_1_4" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Additional Properties</a>
          </li>
          <li>
            <a href="#tab_1_5" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Documents</a>
          </li>
          <li>
            <a href="#tab_1_6" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Public Key</a>
          </li>
          <li>
            <a href="#tab_1_7" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Mapped Codes</a>
          </li>
          {!state.readOnly &&
            <li>
              <a href="#tab_1_8" data-toggle="tab"
                style={{ fontWeight: "Bold", fontSize: "17px" }}>Welcome Kit</a>
            </li>
          }
          <li>
            <a href="#tab_1_9" data-toggle="tab"
              style={{ fontWeight: "Bold", fontSize: "17px" }}>Billing</a>
          </li>
        </ul>
      </div>
      <div className="tabbable-line">
        <div className="tab-content">


          <div className="tab-pane active" id="tab_1_1">
            <FormSection5 initialValues={initialValues} updateState={updateState} state={state} />
          </div>

          <div className="tab-pane" id="tab_1_3">
            <Portlet title={"Tax Codes"}>
              <div className="row">
                <div className="col-md-6">


                  <TextInput
                    name="taxNO1"
                    id="taxNO1"
                    label={utils.getLabelByID("Tax NO 1")}
                    type="text"
                    disabled={state.readOnly}
                  />

                </div>

                <div className="col-md-6">
                  <TextInput
                    name="taxNO2"
                    id="taxNO2"
                    label={utils.getLabelByID("Tax NO 2")}
                    type="text"
                    disabled={state.readOnly}
                  />
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <TextInput
                    name="address"
                    id="address"
                    label={utils.getLabelByID("Address")}
                    type="text"
                    disabled={state.readOnly}
                  />
                </div>
              </div>
            </Portlet>
          </div>

          <div className="tab-pane" id="tab_1_4">
            <FormSection3 initialValues={initialValues} updateState={updateState} state={state} />
          </div>

          <div className="tab-pane" id="tab_1_5">
            <Portlet title={utils.getLabelByID("Documents")}>
              <FormSection6 initialValues={initialValues} updateState={updateState} state={state} />
            </Portlet>
          </div>

          <div className="tab-pane" id="tab_1_6">
            <Portlet title={"Public Key"}>
              <div className="row">

                <div className="col-md-12">
                  <div className="col-md-12">
                    <textarea type="text" className="form-control" disabled={state.readOnly} value={state.publicKey}
                      name="publicKey" id="publicKey" onChange={onInputChange} rows="12"
                      style={{ resize: "none", width: "100%" }} />
                  </div>
                </div>
              </div>
            </Portlet>
          </div>

          <div className="tab-pane" id="tab_1_7">
            <FormSection2 initialValues={initialValues} updateState={updateState} state={state} />
          </div>

          <div className="tab-pane" id="tab_1_8">
            <Portlet title={"Welcome Kit"}>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <label className="bold">Email Address</label>
                    <input type="text" className="form-control" disabled={state.readOnly}
                      name="welcomeEmail" id="welcomeEmail" />
                  </div>
                  <div className="col-md-3">
                    <DropdownInput id="apiGroup" name="apiGroup" options={containerState.groupTypeListAPI}
                      label={utils.getLabelByID("Group for API user")}
                      disabled={state.readOnly}
                    />
                  </div>
                  <div className="col-md-3">
                    <DropdownInput name="userGroup" id="userGroup" options={containerState.groupTypeListUI}
                      label={utils.getLabelByID("Group for UI user")}
                      disabled={state.readOnly}
                    />
                  </div>
                  <div className="col-md-3">
                    <DropdownInput id="firstScreen" name="firstScreen" options={containerState.typeData.First_Screens}
                      label={utils.getLabelByID("First Screen")}
                      disabled={state.readOnly}
                    />
                  </div>

                </div>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <a type="submit" className="btn btn-default dark pull-right" onClick={handleSubmit}
                      href={"javascript:;"}
                      style={{ marginTop: "10px" }}> Generate
                    </a>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <Table
                      pagination={false}
                      export={false}
                      search={false}
                      gridColumns={utils.getGridColumnByName("welcomeKit")}
                      gridData={welcome || []}
                    />

                  </div>
                </div>
              </div>
            </Portlet>
          </div>
          <div className="tab-pane" id="tab_1_9">
            <Portlet title={"Billing"}>
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "20px" }}>
                  <div className="col-md-3 pull-right" >
                    <select id="billingMonth" name="billingMonth" className="form-control"
                      disabled={state.readOnly}
                    >
                      {[{ label: "AUGUST/2020", value: "AUG" }].map((elem, index) => {
                        return (<option key={index} value={elem.value}>{elem.label}</option>)
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={"dsh_blued1"}
                    style={{ cursor: "context-menu" }}>
                    <div className="col-md-4">
                      <div className="dashboard-stat2 ">
                        <div className="display">
                          <div className="number">
                            <h3 className={"font-blued 1-sharp"} style={{ fontSize: "30px" }}><span
                              data-counter="counterup"
                              data-value="10">{containerState.totalBill}</span></h3>
                            <small>TOTAL</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"dsh_blued1"}>
                    <div className="col-md-4">
                      <div className="dashboard-stat2 ">
                        <div className="display">
                          <div className="number">
                            <h3 className={"font-blued 1-sharp"} style={{ fontSize: "30px" }}><span
                              data-counter="counterup"
                              data-value="10">{containerState.hits}</span></h3>
                            <small>HIT / API Calls</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"dsh_blued1"}>
                    <div className="col-md-4">
                      <div className="dashboard-stat2 ">
                        <div className="display">
                          <div className="number">
                            <h3 className={"font-blued 1-sharp"} style={{ fontSize: "30px" }}><span
                              data-counter="counterup"
                              data-value="10">{containerState.entityDetail.cycle || "monthly"}</span></h3>
                            <small>CYCLE</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="row">


                <div className="col-md-12">

                  <div className="col-md-12">

                    <div className="pull-left">
                      <span className="bold">Start Date:</span> <span className="italic">{containerState.from}</span>
                    </div>
                    <div className="pull-right">
                      <span className="bold">End Date:</span> <span className="italic">{containerState.to}</span>
                    </div>

                  </div>
                  <div className="col-md-12">
                    <Table
                      pagination={false}
                      export={false}
                      search={false}
                      gridColumns={utils.getGridColumnByName("billingGrid")}
                      gridData={containerState.billing || []}
                    />
                  </div>
                </div>
              </div>
            </Portlet>
          </div>

        </div>
      </div>
    </div >
  )
};

const FormSection5 = ({ initialValues, updateState, state, onInputChange }) => {
  let contactsActions = [
    {
      type: "link",
      className: "btn btn-default",
      label: utils.getLabelByID("Add"),
      icon: "plus",
      actionHandler: updateState.bind(this, {
        contactsModalIsOpen: true,
        index: state.contacts.length
      })

    }
  ];


  function contactActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        updateState({
          contactsModalIsOpen: true,
          index
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = state.contacts;
          a.splice(index, 1);
          updateState({ contacts: a });
        }
        break;
    }
  }


  return (
    <Portlet title={"Contacts"} actions={state.readOnly ? false : contactsActions}>
      <Table
        pagination={false}
        export={false}
        search={false}
        gridColumns={utils.getGridColumnByName("entityContacts")}
        componentFunction={contactActionHandlers}
        gridData={state.contacts ? state.contacts : []}
        totalRecords={state.contacts ? state.contacts.length : 0}
      />
    </Portlet>

  )
};

const FormSection2 = ({ initialValues, updateState, state, onInputChange }) => {
  let mappedCodesActions = [
    {
      type: "link",
      className: "btn btn-default",
      label: utils.getLabelByID("Add"),
      icon: "plus",
      actionHandler: updateState.bind(this, {
        mappedCodesModalIsOpen: true,
        index: state.mappedCodes.length
      })

    }
  ];


  function mappedCodesActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        updateState({
          mappedCodesModalIsOpen: true,
          index
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = state.mappedCodes;
          a.splice(index, 1);
          updateState({ mappedCodes: a });
        }
        break;
    }
  }


  return (
    <Portlet title={"Mapped Codes"} actions={state.readOnly ? false : mappedCodesActions}>
      <Table
        pagination={false}
        export={false}
        search={false}
        gridColumns={utils.getGridColumnByName("mappedCodes")}
        componentFunction={mappedCodesActionHandlers}
        gridData={state.mappedCodes ? state.mappedCodes : []}
        totalRecords={state.mappedCodes ? state.mappedCodes.length : 0}
      />
      {/* <Table
        pagination={false}
        export={false}
        search={false}
        gridColumns={utils.getGridColumnByName("entityContacts")}
        componentFunction={contactActionHandlers}
        gridData={state.contacts ? state.contacts : []}
        totalRecords={state.contacts ? state.contacts.length : 0}
      /> */}
    </Portlet>

  )
};

const FormSection3 = ({ initialValues, updateState, state, onInputChange }) => {
  let additionalPropertiesActions = [
    {
      type: "link",
      className: "btn btn-default",
      label: utils.getLabelByID("Add"),
      icon: "plus",
      actionHandler: updateState.bind(this, {
        additionalPropsModalIsOpen: true,
        index: state.additionalProps.length
      })

    }
  ];


  function contactActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        updateState({
          additionalPropsModalIsOpen: true,
          index
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = state.additionalProps;
          a.splice(index, 1);
          updateState({ additionalProps: a });
        }
        break;
    }
  }


  return (
    <Portlet title={"Additional Properties"} actions={state.readOnly ? false : additionalPropertiesActions}>
      <Table
        pagination={false}
        export={false}
        search={false}
        gridColumns={utils.getGridColumnByName("additionalProperties")}
        componentFunction={additionalPropsActionHandlers}
        gridData={state.additionalProps ? state.additionalProps : []}
        totalRecords={state.additionalProps ? state.additionalProps.length : 0}
      />
    </Portlet>

  )
};


function mappedCodesActionHandlers({ actionName, index }) {
  switch (actionName) {
    case "Edit":
      updateState({
        contactsModalIsOpen: true,
        index
      });
      break;
    case "Delete":
      if (index > -1) {
        let a = state.contacts;
        a.splice(index, 1);
        updateState({ contacts: a });
      }
      break;
  }
}

function additionalPropsActionHandlers({ actionName, index }) {
  switch (actionName) {
    case "Edit":
      updateState({
        additionalPropsModalIsOpen: true,
        index
      });
      break;
    case "Delete":
      if (index > -1) {
        let a = state.additionalProps;
        a.splice(index, 1);
        updateState({ additionalProps: a });
      }
      break;
  }
}

const FormSection6 = ({ initialValues, updateState, state }) => {
  function getUploadResponse(data) {
    let documents = [...state.documents];
    for (let i = 0; i < data.contextData.length; i++) {
      documents.push({
        "fileDetail": data.contextData[i].fileDetail,
        "documentName": data.contextData[i].name,
        "fileType": data.contextData[i].ext,
        "retreivalPath": data.contextData[i].path,
        "documentHash": data.contextData[i].hash,
        "actions": data.contextData[i].actions
      });
    }
    //documents.push(...data.contextData);
    updateState({ documents })
  }

  function getRemoveResponse(documents) {
    console.log(documents.length, "LENGTH");
    updateState(documents);
  }

  return (<div className="row">
    <div className="col-centered col-md-12">
      <div className="form-group">
        <FileUploader type="Document" source="AcquirerSetup"
          initialValues={state.documents}
          acceptedFiles="image/jpeg,image/png,image/gif,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          getUploadResponse={getUploadResponse}
          getRemoveResponse={getRemoveResponse}
          maxFiles="5"
          showDropzone={!state.readOnly}
          showAttachementGrid={true} />
      </div>
    </div>
  </div>);
};

class OrgSetupForm extends React.Component {

  constructor(props, context) {
    super(props, context);


    this.state = {
      index: undefined,
      readOnly: false,
      isModalOpen: false,
      entityLogo: undefined,
      commissionTemplateID: "NOT_SET",
      services: [],
      contacts: [],
      mappedCodes: [],
      additionalProps: [],
      documents: [],

    };

    this.updateState = this.updateState.bind(this);
    this.updateServices = this.updateServices.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
    this.updateMappedCodes = this.updateMappedCodes.bind(this);
    this.updateAdditionalProps = this.updateAdditionalProps.bind(this);
    this.submit = this.submit.bind(this);
    this.generate = this.generate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeOrderer = this.onInputChangeOrderer.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  updateState(data) {
    this.setState(data);
  }

  onInputChangeOrderer = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let netConf = _.cloneDeep(this.state.networkConfig);
    netConf.orderer[e.target.name] = value;
    this.setState({
      networkConfig: netConf
    })
  }


  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.networkConfig[e.target.name] = value;
    this.setState({
      [e.target.name]: value
    })
  }


  updateServices(data) {
    data.services[this.state.index].actions = [
      {
        label: "Edit",
        iconName: "fa fa-edit",
        actionType: "COMPONENT_FUNCTION"
      },
      {
        label: "Delete",
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }
    ];
    this.setState({
      servicesModalIsOpen: false,
      services: data.services
    });
  }

  updateContacts(data) {
    data.contacts[this.state.index].actions = [{
      label: "Edit",
      iconName: "fa fa-edit",
      actionType: "COMPONENT_FUNCTION"
    }];
    this.setState({
      contactsModalIsOpen: false,
      contacts: data.contacts
    });
  }

  updateMappedCodes(data) {
    data.mappedCodes[this.state.index].actions = [{
      label: "Edit",
      iconName: "fa fa-edit",
      actionType: "COMPONENT_FUNCTION"
    }];
    this.setState({
      mappedCodesModalIsOpen: false,
      mappedCodes: data.mappedCodes
    });
  }

  updateAdditionalProps(data) {
    data.additionalProps[this.state.index].actions = [{
      label: "Edit",
      iconName: "fa fa-edit",
      actionType: "COMPONENT_FUNCTION"
    }];
    this.setState({
      additionalPropsModalIsOpen: false,
      additionalProps: data.additionalProps
    });
  }


  componentWillReceiveProps(nextProps) {
    let details = {
      "taxNO1": "",
      "taxNO2": "",
      "address": "",
      "publicKey": "",
      "entityName": "",
      "arabicName": "",
      "spCode": "",
      "shortCode": "",
      "orgType": "",
      "isActive": false,
      "entityLogo": {
        "sizeSmall": "",
        "sizeMedium": ""
      },
      "parentEntity": "",
      "commissionTemplate": "",
      "contacts": [],
      "mappedCodes": [],
      "additionalProps": [],
      "documents": [],
      "clientKey": "",
      "lastReconDate": "",
      "contactType": "",
      "services": [],
      "welcomeEmail": "",

    }

    console.log("------------------->>>>>>>>>>. Props", nextProps)

    if (this.state.commissionTemplateID !== nextProps.initialValues.commissionTemplate && nextProps.welcome) {
      this.setState({
        //commissionTemplateID: nextProps.initialValues.commissionTemplate,
        services: nextProps.initialValues.services,
        contacts: nextProps.initialValues.contacts,
        documents: nextProps.initialValues.documents,
        readOnly: nextProps.containerState.readOnly,
        ...details,
        ...nextProps.initialValues
      });
    } else {
      this.setState({
        ...details
      })
    }

    if (nextProps.welcome) {
      this.setState({
        welcome: nextProps.welcome
      })
    }

    if (nextProps.welcomeResp) {
      this.setState({ welcome: nextProps.welcomeResp });
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log("------------------->>>>>>>>>>. Props DID ", this.props)
    let _this = this;
    this.disableFileds();
    document.getElementById('ImgUploadBtn').addEventListener('click', openDialog);
    document.getElementById('ImgUploader').onchange = function (e) {
      let reader = new FileReader();
      let files = e.target.files;

      if (files && files[0]) {
        reader.onload = function (fileReader) {
          $('#EntityLogo').attr('src', fileReader.target.result);

          _this.props.containerProps.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
            byteData: fileReader.target.result,
            context: {
              name: files[0].name,
              size: files[0].size,
              type: files[0].type
            }
          })).then(result => {
            _this.setState({ entityLogo: result.entityLogo })
          });
        };

        reader.readAsDataURL(files[0]);
      }
    };

    function openDialog() {
      document.getElementById('ImgUploader').click();
    }
  }

  disableFileds() {
    $('#netconfig').find('input:text').attr("disabled", this.state.readOnly);
    $('#netconfig').find('textarea').attr("disabled", this.state.readOnly);
  }

  performAction(actionObj) {
    if (actionObj.label === "Reset") {
      this.props.reset();
    }
  }

  submit(data) {

    let taxNO1 = document.getElementById('taxNO1') == null ? "" : document.getElementById('taxNO1').value;
    let taxNO2 = document.getElementById('taxNO2') == null ? "" : document.getElementById('taxNO2').value;
    let address = document.getElementById('address') == null ? "" : document.getElementById('address').value;
    let publicKey = document.getElementById('publicKey') == null ? "" : document.getElementById('publicKey').value;

    data.services = this.state.services;
    data.contacts = this.state.contacts;
    data.mappedCodes = this.state.mappedCodes;
    data.additionalProps = this.state.additionalProps;
    data.entityLogo = this.state.entityLogo ? this.state.entityLogo : data.entityLogo;
    data.documents = this.state.documents;


    data.taxNO1 = taxNO1;
    data.taxNO2 = taxNO2;
    data.address = address;
    data.publicKey = publicKey;
    console.log("-------------------------->>>>>>>>>>>>>>>>>>>>", data)
    return this.props.onSubmit(data);
  }

  generate(data) {

    // welcomeEmail apiGroup userGroup firstScreen
    let welcomeEmail = document.getElementById('welcomeEmail') == null ? "" : document.getElementById('welcomeEmail').value;
    let apiGroup = document.getElementById('apiGroup') == null ? "" : document.getElementById('apiGroup').value;
    let userGroup = document.getElementById('userGroup') == null ? "" : document.getElementById('userGroup').value;
    let firstScreen = document.getElementById('firstScreen') == null ? "" : document.getElementById('firstScreen').value;

    console.log("-------------------------->>>>>>>>>>>>>>>>>>>>", JSON.stringify(this.state))
    let wc = this.state.welcome;
    console.log("||||||||>>", welcomeEmail, apiGroup, userGroup, firstScreen);
    wc.forEach((elem) => {
      elem.status = 'PENDING';
    })
    this.setState({ welcome: wc })

    this.props.containerProps.actions.generalAjxProcess(constants.createOnDemandWelCome, {
      "orgType": this.state.orgType,
      "spCode": this.state.spCode,
      "apiGroup": apiGroup,
      "userGroup": userGroup,
      "firstScreen": firstScreen,
      "email": welcomeEmail,
      "welcome": wc
    });
    // return this.props.onSubmit(data);
  }


  render() {
    console.log("----------st----------ar--", this.state)
    const { error, handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps, welcome } = this.props;
    return (
      <div>
        <ModalBox isOpen={this.state.contactsModalIsOpen}>
          <EntityContactsForm onSubmit={this.updateContacts} initialValues={this.state}
            index={this.state.index} updateState={this.updateState}
          />
        </ModalBox>
        <ModalBox isOpen={this.state.mappedCodesModalIsOpen}>
          <OrgMappedCodesForm onSubmit={this.updateMappedCodes} initialValues={this.state}
            index={this.state.index} updateState={this.updateState}
          />
        </ModalBox>

        <ModalBox isOpen={this.state.additionalPropsModalIsOpen}>
          <OrgAdditionalPropsForm onSubmit={this.updateAdditionalProps} initialValues={this.state}
            index={this.state.index} updateState={this.updateState}
          />
        </ModalBox>

        <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)} ref={this._form = this}>
          <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state}
            containerProps={containerProps} containerState={containerState} welcome={this.state.welcome}
            onInputChange={this.onInputChange} handleSubmit={this.generate} />
          {/* <FormSection5 initialValues={initialValues} updateState={this.updateState} state={this.state}/> */}
          {/* <Portlet title={utils.getLabelByID("Documents")}>
            <FormSection6 initialValues={initialValues} updateState={this.updateState} state={this.state}/>
          </Portlet> */}


          {!this.state.readOnly &&
            <div className="clearfix">
              <ActionButton actionList={containerState.entityDetail.actions}
                performAction={this.performAction}
                submitting={submitting} pristine={pristine} />
            </div>
          }
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'OrgSetupForm', // a unique identifier for this form
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(OrgSetupForm);