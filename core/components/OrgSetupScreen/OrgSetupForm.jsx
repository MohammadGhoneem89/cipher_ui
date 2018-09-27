import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import EntityServicesForm from './OrgServicesForm.jsx';
import EntityContactsForm from './OrgContactsForm.jsx';
import * as utils from '../../common/utils.js';
import ActionButton from '../../common/ActionButtonNew.jsx';

import {CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput} from '../../common/FormControls.jsx';

//https://github.com/erikras/redux-form/issues/369
const FormSection1 = ({error, initialValues, updateState, state, containerProps, containerState}) => {
  return (
    <div>
      <Portlet title={"Details"}>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="entityName"
              label={utils.getLabelByID("entityName")}
              type="text"
              disabled={state.readOnly}
            />
            <TextInput
              name="arabicName"
              label={utils.getLabelByID("arabicName")}
              type="text"
              style={{textAlign: "right"}}
              disabled={state.readOnly}
            />
            <DropdownInput name="orgType" options={containerState.typeData.ORG_TYPES}
                           label={utils.getLabelByID("ESEARCH_orgType")}
                           disabled={state.readOnly}
            />
          </div>
          <div className="col-md-6 col-sm-6 offset4">

            <div className="row" style={{display: "inline"}}>
              <div className="col-md-6 col-sm-6" style={{textAlign: "center"}}/>
              <div className="col-md-5 col-sm-5" style={{textAlign: "center"}}>
                <img id="EntityLogo"
                     src={initialValues.entityLogo ? constants.baseUrl + initialValues.entityLogo.sizeMedium : "https://www.thsp.co.uk/wp-content/uploads/2016/11/Icon-Placeholder.png"}
                     className="img-responsive img-thumbnail" alt="Entity Logo" width="150px"
                     height="150px"/>
                {!state.readOnly &&
                <div className="col-md-12 col-sm-12" style={{textAlign: "center"}}>
                                <span id="ImgUploadBtn" className="label label-primary" style={{cursor: "pointer"}}>
                                    {utils.getLabelByID("ChangeImage")}
                                </span>
                  <TextInput name="entityLogo" id='ImgUploader' type='file'
                             style={{display: "none"}}/>
                </div>}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <DropdownInput name="parentEntity" options={containerProps.entityNames}
                               label={utils.getLabelByID("parentEntity")}
                               disabled={state.readOnly}
                />
              </div>
              <div className="col-md-4 col-sm-4">
                <TextInput
                  name="spCode"
                  label={utils.getLabelByID("ES_spCode")}
                  type="text"
                  disabled={state.readOnly}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-sm-2">
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
        </div>
      </Portlet>
    </div>


  )
};

const FormSection5 = ({initialValues, updateState, state}) => {
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

  function contactActionHandlers({actionName, index}) {
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
          updateState({contacts: a});
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

const FormSection6 = ({initialValues, updateState, state}) => {
  function getUploadResponse(data) {
    let documents = [...state.documents];
    for(let i=0 ; i<data.contextData.length ; i++){
      documents.push({
        "fileDetail" : data.contextData[i].fileDetail,
        "documentName" : data.contextData[i].name,
        "fileType" : data.contextData[i].ext,
        "retreivalPath" : data.contextData[i].path,
        "documentHash" : data.contextData[i].hash,
        "actions" : data.contextData[i].actions
      });
    }
    //documents.push(...data.contextData);
    updateState({documents})
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
                      showAttachementGrid={true}/>
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
      documents: []
    };

    this.updateState = this.updateState.bind(this);
    this.updateServices = this.updateServices.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
    this.submit = this.submit.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  updateState(data) {
    this.setState(data);
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

  componentWillReceiveProps(nextProps) {
    if (this.state.commissionTemplateID !== nextProps.initialValues.commissionTemplate) {
      this.setState({
        //commissionTemplateID: nextProps.initialValues.commissionTemplate,
        services: nextProps.initialValues.services,
        contacts: nextProps.initialValues.contacts,
        documents: nextProps.initialValues.documents,
        readOnly: nextProps.containerState.readOnly
      });
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    let _this = this;
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
            _this.setState({entityLogo: result.entityLogo})
          });
        };
        reader.readAsDataURL(files[0]);
      }
    };

    function openDialog() {
      document.getElementById('ImgUploader').click();
    }
  }

  performAction(actionObj) {
    if (actionObj.label === "Reset") {
      this.props.reset();
    }
  }

  submit(data) {
    data.services = this.state.services;
    data.contacts = this.state.contacts;
    data.entityLogo = this.state.entityLogo ? this.state.entityLogo : data.entityLogo;
    data.documents = this.state.documents;

    return this.props.onSubmit(data);
  }

  render() {
    const {error, handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps} = this.props;

    return (
      <div>
        <ModalBox isOpen={this.state.contactsModalIsOpen}>
          <EntityContactsForm onSubmit={this.updateContacts} initialValues={this.state}
                              index={this.state.index} updateState={this.updateState}
          />
        </ModalBox>
        <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)} ref={this._form = this}>
          <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state}
                        containerProps={containerProps} containerState={containerState}/>
          <FormSection5 initialValues={initialValues} updateState={this.updateState} state={this.state}/>
          <Portlet title={utils.getLabelByID("Documents")}>
            <FormSection6 initialValues={initialValues} updateState={this.updateState} state={this.state}/>
          </Portlet>


          {!this.state.readOnly &&
          <div className="clearfix">
            <ActionButton actionList={containerState.entityDetail.actions}
                          performAction={this.performAction}
                          submitting={submitting} pristine={pristine}/>
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