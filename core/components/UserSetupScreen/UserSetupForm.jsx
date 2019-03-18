import React from 'react';
import { reduxForm } from 'redux-form';
import 'react-dropzone-component/styles/filepicker.css'
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import * as requestCreator from '../../common/request.js';
import * as constants from '../../constants/Communication.js';
import validate from './validate';
import ActionButton from '../../common/ActionButtonNew.jsx';

import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';

const FormSection1 = ({ error, initialValues, updateState, state, containerProps, containerState, firstScreen }) => {

  let userType = sessionStorage.orgType;
  let orgType = [];

  let authenticationType = [];

  if (userType !== 'Entity' && userType !== 'Acquirer') {
    authenticationType = [
      { value: "System", label: "System" },
      { value: "Local", label: "local" }
    ];

  }
  else {
    authenticationType = [
      { value: "System", label: "System" },
    ];

  }

  let callerType = [
    { value: "Human", label: "Human" },
    { value: "API", label: "API" }
  ];

  function updateActiveReconType(e) {
    updateState({ selectedReconType: e.target.value });

  }
  function updateQuorrumUser(e) {
    updateState({ quorrumUser: e.target.value });
  }
  function updateHypUser(e) {
    updateState({ hypUser: e.target.value });
  }
  function assignedGroup() {
    let arr = []
    for (let i = 0; i < initialValues.groups.length - 1; i++) {

      if (initialValues.groups[i].isAssigned === true) {
        arr.push(initialValues.groups[i])

      }
    }
    return arr;
  }

  { console.log(containerState.typeData.ORG_TYPES, "oooooorrrrrrrrggggggggggg") }
  return (
    <div>
      <div className="row">

        <div className="col-md-6 col-sm-6">
          <DropdownInput name="userType" options={callerType}
            label="User Type" onChange={updateActiveReconType}
            disabled={!!containerProps.userID} />
          <DropdownInput name="orgType" options={containerState.typeData.ORG_TYPES}
            label={utils.getLabelByID("ESEARCH_orgType")} onChange={(e) => {
              updateState({ selectedOrgType: e.target.value });
            }} disabled={!!containerProps.userID} />
          <DropdownInput name="orgCode" label="Organization Name" options={(() => {
            if (state.selectedOrgType) {
              return containerState.entityNames.filter((item) => {
                return item.orgType === state.selectedOrgType;
              });
            }
            else if (initialValues.orgType && state.selectedOrgType !== "") {
              return containerState.entityNames.filter((item) => {
                return item.orgType === initialValues.orgType;
              });
            }
            else {
              return [];
            }
          })()} disabled={!!containerProps.userID} />

        </div>

        <div className="col-md-6 col-sm-6 offset4">
          <div className="row" style={{ display: "inline" }}>
            <div className="col-md-6 col-sm-6" style={{ textAlign: "center" }} />
            <div className="col-md-5 col-sm-5" style={{ textAlign: "center" }}>
              <img id="UserProfilePic"
                src={initialValues.profilePic ? constants.baseUrl + initialValues.profilePic : "https://www.thsp.co.uk/wp-content/uploads/2016/11/Icon-Placeholder.png"}
                className="img-responsive img-thumbnail" alt="Entity Logo" width="150px"
                height="150px" />
              {!state.readOnly &&
                <div className="col-md-12 col-sm-12" style={{ textAlign: "center" }}>
                  <span id="ImgUploadBtn" className="label label-primary" style={{ cursor: "pointer" }}>
                    Change Image
                                                </span>
                  <TextInput name="profilePic" id='ImgUploader' type='file' style={{ display: "none" }} />
                </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-6">
          <TextInput
            name="userID"
            label="User ID"
            type="text"
            disabled={containerProps.userID ? true : false}
          />
        </div>

        {(containerProps.userID == undefined) &&

          <div className="col-md-6 col-sm-6">
            <TextInput
              name="password"
              label="Password"
              type="password"
            />
          </div>
        }
      </div>

      {(initialValues.userType == "Human" || ["Human"].indexOf(state.selectedReconType) >= 0) &&
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="firstName"
              label="First Name"
              type="text"
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="lastName"
              label="Last Name"
              type="text"
            />
          </div>

        </div>
      }
      {(initialValues.userType == "Human" || ["Human"].indexOf(state.selectedReconType) >= 0) &&

        <div className="row">
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="email"
              label="Email"
              type="text"
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <DropdownInput name="authType" options={authenticationType}
              label="Authentication Type" />

          </div>

        </div>
      }

      {(initialValues.userType == "Human" || ["Human"].indexOf(state.selectedReconType) >= 0) &&
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="allowedIPRange"
              label="Allowed IP"
              type="text"
            />
          </div>
          {false &&

            <div className="col-md-6 col-sm-6">
              <DropdownInput name="firstScreen" options={firstScreen}
                label="First Screen" />
            </div>
          }


        </div>
      }
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <DropdownInput name="hypUser" options={containerState.networkUserTypeData.hyperledger}
            label="User Association Hyperledger" onChange={updateHypUser}
             />
        </div>
        <div className="col-md-6 col-sm-6">
          <DropdownInput name="quorrumUser" options={containerState.networkUserTypeData.quorrum}
            label="User Association Quorrum" onChange={updateQuorrumUser}
             />
        </div>
      </div>

      <div className="row">


        <div className="col-md-6 col-sm-6">
          <CheckboxList>
            <CheckboxInput
              name="isActive"
              label="Is Active"
              type="checkbox"
            />
          </CheckboxList>

        </div>
      </div>
      <hr />
      <h4 className="caption" style={{ fontWeight: "bold" }}>User Groups</h4>
      <div className="row" style={{ padding: "15px" }}>
        <div className="col-md-12 col-sm-12">

          <div className="icheck-list">

            {assignedGroup().map((sd, index) => (
              <CheckboxList key={index}>
                <CheckboxInput
                  name={"groups[" + index + "].isAssigned"}
                  label={sd.name}
                  type="checkbox"
                />
              </CheckboxList>
            ))
            }
          </div>
        </div>
      </div>

    </div>
  )
};

class UserSetupForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      commissionTemplates: "",
      selectedReconType: undefined,
      orgType: undefined,
      profilePic: undefined,
      selectedOrgType: undefined,
      typeData: props.typeData
    };
    this.updateState = this.updateState.bind(this);
    this.submit = this.submit.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
    this.performAction = this.performAction.bind(this);


  }

  updateState(data) {

    this.setState(data);
  }

  componentWillReceiveProps(nextProps) {

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
          $('#UserProfilePic').attr('src', fileReader.target.result);
          _this.props.containerProps.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
            byteData: fileReader.target.result,
            context: {
              name: files[0].name,
              size: files[0].size,
              type: files[0].type
            }
          })).then(result => {
            _this.setState({ profilePic: result.entityLogo.sizeSmall })
          });
        };
        reader.readAsDataURL(files[0]);
      }
    };

    function openDialog() {
      document.getElementById('ImgUploader').click();
    }
  }

  submit(data) {
    data.profilePic = this.state.profilePic ? this.state.profilePic : data.profilePic;
    data.hypUser = this.state.hypUser ;
    data.quorrumUser = this.state.quorrumUser ;
    return this.props.onSubmit(data);
  }

  passwordReset() {
    return this.props.resetPassword();
  }

  performAction(actionObj) {
    if (actionObj.value === "4055") {

      return this.props.resetPassword();
    }
  }

  render() {


    const { error, handleSubmit, pristine, reset, submitting, initialValues, pageActions, containerState, containerProps } = this.props;
    return (
      <div>
        <form>
        </form>
        <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)}>
          <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state}
            containerProps={containerProps} containerState={containerState} firstScreen={this.state.typeData} />
          <div className="clearfix">
            <ActionButton actionList={pageActions}
              performAction={this.performAction}
              submitting={submitting}
              pristine={pristine} />


          </div>
        </form>

      </div>
    );
  }
}

export default reduxForm({
  form: 'UserSetupForm',
  validate,
  enableReinitialize: true
})(UserSetupForm);