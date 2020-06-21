import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import _ from 'lodash';
import * as toaster from "../../common/toaster.js";
import UserSetupForm from './UserSetupForm.jsx'
import Portlet from '../../common/Portlet.jsx';

import * as gen from '../../common/generalActionHandler';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

class UserSetupContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      typeData: {},
      userDetail: {},
      errors: {},
      groupIndex: 0,
      editPassword: false,
      isLocked: false
    };
    this.IsValid = true;
    this.generalHandler = gen.generalHandler.bind(this);
  }

  addDefaultSrc = e => e.target.src = constants.baseUrl + "/images/image-user.png";

  imgDiv() {
    return (
      <div className="col-md-12" style={{textAlign: "center"}}>
        <img
          id="UserProfilePic"
          src={this.state.userDetail.profilePic ? constants.baseUrl + this.state.userDetail.profilePic : constants.baseUrl + "/images/image-user.png"}
          onError={this.addDefaultSrc}
          className="img-responsive img-thumbnail" alt="Profile Image" width='190px'
          height='190px'
          ref={input => this.profilePic = input}
        />
        <br/>
        {/* <span
                    className="label label-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        console.log('Upload Image Clicked.')
                        this.profilePicUploader.click();
                    }}
                >
                    {"Upload Image"}
                </span> */}

        <button
          className="btn green"
          style={{cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0'}}
          onClick={() => {
            this.profilePicUploader.click();
          }}
        >
          {"Upload Image"}
        </button>

        <input
          name="profilePicUploader"
          id='profilePicUploader'
          type='file'
          style={{display: 'none'}}
          ref={input => this.profilePicUploader = input}
          onChange={(e) => {
            console.log('Profile pic on change')
            let reader = new FileReader();
            let files = e.target.files;
            let _this = this;

            if (files && files[0]) {

              reader.onload = function (fileReader) {
                _this.profilePic.setAttribute('src', fileReader.target.result);

                _this.props.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
                  byteData: fileReader.target.result,
                  context: {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type
                  }
                })).then(result => {
                  _this.setState({
                    userDetail: {
                      ..._this.state.userDetail,
                      profilePic: result.entityLogo.sizeSmall
                    }
                  })
                });
              };
              reader.readAsDataURL(files[0]);
            }
          }}/>
      </div>
    )
  }

  componentDidMount() {

    this.props.actions.generalProcess(constants.getBlkUserList); // Hyperledger/quorum etc blckchain users (peer admins)
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES', 'CALLER_TYPES', 'First_Screens'])); // Org types (entities)
    this.props.actions.generalProcess(constants.passwordPolicyDetail, {"action": "typeDataDetail"});
    this.props.actions.generalProcess(constants.getUserDetail, {    // user detail + groups list
      "action": "userDetails",
      "id": this.props.params.userID
    });

    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
      "currentPageNo": 1,
      "pageSize": 1
    }));

    window.scrollTo(0, 0);
  }

  checkLockedAccount = (allowIncorrectLoginAttempts, passwordRetries) => {
    if (passwordRetries > allowIncorrectLoginAttempts) {
      return true;
    }
  }

  componentWillReceiveProps(nextProps) {
    let perTypeData = this.getPermissionTypeData(nextProps.permission);
    if (nextProps.userDetail && nextProps.userDetail.groups && nextProps.passwordPolicyDetail && nextProps.entityNames && (nextProps.orgTypes || nextProps.callerTypes || nextProps.firstScreens) && nextProps.hyperledgerData && nextProps.quorrumData) {

      //allowIncorrectLoginAttempts from passwordPolicy
      const passwordPolicy = nextProps.passwordPolicyDetail;
      const allowIncorrectLoginAttempts = passwordPolicy.passwordPolicy[0].allowIncorrectLoginAttempts;
      const passwordRetries = nextProps.userDetail.passwordRetries;


      let userType = sessionStorage.orgType;
      let authenticationType = [];
      if (userType !== 'Entity' && userType !== 'Acquirer') {
        authenticationType = [
          {value: "System", label: "System"},
          {value: "Local", label: "Local"}
        ];
      } else {
        authenticationType = [
          {value: "System", label: "System"},
        ];
      }
      let firstScreen = ''
      if (nextProps.firstScreens) {
        nextProps.firstScreens.forEach(obj => {
          if (obj.url === nextProps.userDetail.firstScreen) {
            firstScreen = obj.value
          }
        });
      }


      let groups = [...nextProps.userDetail.groups]

      let groupUI = []
      let groupAPI = []

      groups.forEach(elem => {
        elem.type == 'UI' ? groupUI.push(elem) : groupAPI.push(elem);
      })
      console.log(JSON.stringify(groups))
      console.log(this.props.params.userID, ' : User ID')

      let hypUser = nextProps.userDetail.hypUser
      if (nextProps.userDetail.network) {
        hypUser = nextProps.userDetail.network + '-' + hypUser
      }

      if (this.props.params.userID && nextProps.userDetail.userID) {
        const checkLocked = this.checkLockedAccount(allowIncorrectLoginAttempts, passwordRetries);
        let isActive = true;
        if (checkLocked) {
          isActive = false;
        }
        console.log(isActive);
        this.setState({
          id: this.props.params.userID,
          isLoading: false,
          userDetail: {
            ...nextProps.userDetail,
            firstScreen,
            groups,
            hypUser,
            isActive
          },
          typeData: {
            ...this.state.typeData,
            orgTypes: nextProps.orgTypes,
            callerTypes: nextProps.callerTypes || [],
            firstScreens: nextProps.firstScreens || [],
            entityNames: nextProps.entityNames,
            hyperledgerData: nextProps.hyperledgerData,
            quorrumData: nextProps.quorrumData,
            authenticationType
          },
          groupUI,
          groupAPI,
          permissionTypeData: perTypeData,
          actions: [...nextProps.userDetailActions]

        })
        // if(nextProps.userDetail.passwordRetries){

        // }
      } else {
        this.setState({
          id: undefined,
          isLoading: false,
          userDetail: {
            firstScreen,
            groups,
            hypUser
          },
          typeData: {
            ...this.state.typeData,
            orgTypes: nextProps.orgTypes,
            callerTypes: nextProps.callerTypes || [],
            firstScreens: nextProps.firstScreens || [],
            entityNames: nextProps.entityNames,
            hyperledgerData: nextProps.hyperledgerData,
            quorrumData: nextProps.quorrumData,
            authenticationType
          },
          permissionTypeData: perTypeData,
          groupUI,
          groupAPI,
          actions: [...nextProps.userDetailActions]

        })
      }
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateIPaddress = (ipaddress) => {
    if (String(ipaddress).trim() == '*.*.*.*') {
      return true
    } else {
      var re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      return re.test(ipaddress)
    }

  }
  onSubmit = (e) => {
    e.preventDefault()

    console.log('Form Submits')

    // Validation Input
    let errors = {}
    if (!this.IsValid) {
      toaster.showToast('Invalid value', 'ERROR');
      return;
    }
    if (!this.state.userDetail.userType) {
      errors.userType = 'Field is Required'
    }
    if (this.state.userDetail.userType === 'Human' && !this.state.userDetail.authType) {
      errors.authType = 'Field is Required'
    }
    if (!this.state.userDetail.orgType) {
      errors.orgType = 'Field is Required'
    }
    if (!this.state.userDetail.orgCode) {
      errors.orgCode = 'Field is Required'
    }
    if (!this.state.userDetail.userID) {
      errors.userID = 'Field is Required'
    }
    if (!this.state.userDetail.password && !this.props.params.userID) {
      errors.password = 'Field is Required'
    }
    if (this.state.userDetail.userType === 'Human' && !this.state.userDetail.firstName) {
      errors.firstName = 'Field is Required'
    }
    if (!this.state.userDetail.email) {
      errors.email = 'Field is Required'
    }
    if (!this.validateEmail(this.state.userDetail.email)) {
      errors.email = 'Email address not valid'
    }
    if (!this.state.userDetail.allowedIPRange) {
      errors.allowedIPRange = 'Field is Required'
    }
    if (!this.validateIPaddress(this.state.userDetail.allowedIPRange)) {
      errors.allowedIPRange = 'Invalid IP Address'
    }
    if (this.state.userDetail.userType === 'Human' && !this.state.userDetail.firstScreen) {
      errors.firstScreen = 'Field is Required'
    }
    if (this.state.userDetail.isActive) {
      this.state.userDetail.passwordRetries = 0
    }
    let checkedGroups = [];
    if (this.state.userDetail.userType === 'Human') {
      this.state.groupUI.forEach((elem) => {
        if (elem.isAssigned)
          checkedGroups.push(elem)
      })
    } else if (this.state.userDetail.userType === 'API') {
      this.state.groupAPI.forEach((elem) => {
        if (elem.isAssigned)
          checkedGroups.push(elem)
      })
    }
    console.log(this.state.userDetail, "updated user details");
    if (Object.keys(errors).length > 0) {
      console.log(errors, ' errors found')
      window.scrollTo(0, 0);
      this.setState({
        errors
      })
      return
    }


    let firstScreen = ''
    this.state.userDetail.firstScreen
    this.state.typeData.firstScreens.forEach(obj => {
      if (obj.value === this.state.userDetail.firstScreen) {
        firstScreen = obj.url
      }
    })

    let hypUserArray = this.state.userDetail.hypUser && ~this.state.userDetail.hypUser.indexOf('-') ? this.state.userDetail.hypUser.split('-') : ['', this.state.userDetail.hypUser];
    let hypUser = hypUserArray.pop();
    console.log('hypUserArray', hypUserArray.join('-'));
    let network = hypUserArray && hypUserArray.length ? hypUserArray.join('-') : hypUserArray[0];

    if (this.props.params.userID) {
      // this.setState({
      //     isLoading: true
      // })
      window.scrollTo(0, 0);


      this.props.actions.generalAjxProcess(constants.userUpdate,
        requestCreator.createUserInsertRequest({
          ...this.state.userDetail,
          id: this.props.params.userID,
          groups: checkedGroups,
          passwordHashType: "sha512",
          firstScreen,
          network,
          hypUser,
          allowedIPRange: [String(this.state.userDetail.allowedIPRange)]
        }))
        .catch(err => {
          this.setState({
            errors: {
              ...err
            },
            isLoading: false
          })
          console.log(err, ' :err PARAMS USERID')
          window.scrollTo(0, 0);
        })

    } else {
      // this.setState({
      //     isLoading: true
      // })
      window.scrollTo(0, 0);

      this.props.actions.generalAjxProcess(constants.userInsert,
        requestCreator.createUserInsertRequest({
          ...this.state.userDetail,
          id: this.props.params.userID,
          groups: checkedGroups,
          passwordHashType: "sha512",
          firstScreen,
          network,
          hypUser,
          allowedIPRange: this.state.userDetail.allowedIPRange
        }))
        .catch(err => {
          this.setState({
            errors: {
              ...err
            },
            isLoading: false
          })
          console.log(err, ' :err NEW USER')
          window.scrollTo(0, 0);
        })

    }
  }
  resetPassword = () => {


    if (this.state.userDetail.userType === 'Human' && this.props.params.userID) {
      let request = {"userID": this.state.userDetail.userID, email: this.state.userDetail.email};
      this.props.actions.generalProcess(constants.passwordReset, request);
    } else {
      this.setState({editPassword: true});
    }
  }
  unlockAccount = () => {
    if (this.props.params.userID) {
      let request = {
        body: {
          "id": this.state.userDetail.userID
        }
      };
      this.props.actions.generalProcess(constants.activateUser, request);
    }
  }
  performAction = (actionObj) => {
    console.log("actionObject", actionObj);
    if (actionObj.value === "4055") {
      return this.resetPassword();
    }
    if (actionObj.value === "4056") {
      return this.unlockAccount()
    }
  }


  // Helper
  getPermissionTypeData = (permission) => {
    let arr = [];
    for (let obj of permission) {
      if (obj.label == "Dashboard") {
        for (let a of obj.children) {
          let json = {};
          json.label = a.label;
          json.value = a.pageURI;
          arr.push(json);
        }
      }
    }
    return arr;
  };

  customHandler(formname, fieldname, type, typedata, e) {
    console.log("customHandler")
    let value = e.target.value;
    let formdata = _.get(this.state, formname, {});
    _.set(formdata, e.target.name, value);
    _.set(formdata, 'orgCode', '');
    this.setState({

        typeData: {
          ...this.state.typeData,
          entityNamesFiltered: this.state.typeData.entityNames
            .filter(item => {
              if (item.orgType === value) {
                return true
              } else {
                return false
              }
            })
        },
        [formname]: formdata
      }
    );

    let typeList = typedata ? typedata : [{label: "", value: ""}];
    const typeValue = typeList.map(data => data.value);
    if (value) {
      if (!typeValue.includes(value)) {
        // toaster.showToast(`Invalid value`, "ERROR");
        this.IsValid = false;
        return;
      }
    }
    this.IsValid = true;
  };

  userTypeHandler(formname, fieldname, type, typedata, e) {
    console.log("formname, fieldname, type, typedata, e", formname, fieldname, type, typedata, e)
    let value = e.target.value;
    let formdata = _.get(this.state, formname, {});
    _.set(formdata, e.target.name, value);

    this.setState({
      [formname]: formdata,
      groupIndex: 0
    });
    let typeList = typedata ? typedata : [{label: "", value: ""}];
    const typeValue = typeList.map(data => data.value);
    if (value) {
      if (!typeValue.includes(value)) {
        // toaster.showToast(`Invalid value`, "ERROR");
        this.IsValid = false;
        return;
      }
    }
    this.IsValid = true;
  };


  comboBoxHandler = (formname, fieldname, type, typedata, e) => {
    console.log("formname, fieldname, type, typedata, e", formname, fieldname, type, typedata, e)
    let value = e.target.value;
    let formdata = _.get(this.state, formname, {});
    _.set(formdata, e.target.name, value);
    this.setState({
      [formname]: formdata
    });

    let typeList = typedata ? typedata : [{label: "", value: ""}];
    const typeValue = typeList.map(data => data.value);
    if (value) {
      if (!typeValue.includes(value)) {
        // toaster.showToast(`Invalid value`, "ERROR");
        this.IsValid = false;
        return;
      }
    }
    this.IsValid = true;
  }

  inputHandler = (formname, fieldname, type, e) => {
    console.log("formname, fieldname, type, e", formname, fieldname, type, e)
    let value = e.target.value;
    let formdata = _.get(this.state, formname, {});
    _.set(formdata, e.target.name, value);
    this.setState({
      [formname]: formdata
    });
  }

  onChange(e) {

    let groupUI = this.state.groupUI;
    let groupAPI = this.state.groupAPI;

    if (this.state.userDetail.userType == 'Human') {
      groupUI.forEach((elem, index) => {
        if (parseInt(e.target.name) == index) {
          elem.isAssigned = true;
        } else {
          elem.isAssigned = false;
        }
      })
    } else if (this.state.userDetail.userType == 'API') {
      groupAPI.forEach((elem, index) => {
        if (parseInt(e.target.name) == index) {
          elem.isAssigned = true;
        } else {
          elem.isAssigned = false;
        }
      })
    }

    this.setState({
      groupUI,
      groupAPI
    })
  }

  // changePassword(e){
  //     e.preventDefault()
  //     console.log('changePassword')
  //     browserHistory.push('/changePassword')
  //     window.scrollTo(0, 0);
  // }

  render() {
    if (!this.state.isLoading) {
      let allowedGroup = []
      let groupList = []

      console.log()

    }


    return (
      this.state.isLoading ? <div className="loader">Loading...</div> : (

        <Portlet title={"User"} style={{minHeight: '845px'}}>
          < UserSetupForm
            // changePassword={this.props.params.userID ? this.changePassword.bind(this) : undefined}
            onError={this.addDefaultSrc}
            typeData={this.state.typeData}
            containerState={this.state}
            customHandler={this.customHandler.bind(this)}
            comboBoxHandler={this.comboBoxHandler.bind(this)}
            inputHandler={this.inputHandler.bind(this)}
            userTypeHandler={this.userTypeHandler.bind(this)}
            generalHandler={this.generalHandler}
            onChangeHandler={this.onChange.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            imgDiv={this.imgDiv.bind(this)}
            performAction={this.performAction}
            unblock={this.unlockAccount.bind(this)}
          />
        </Portlet>

      )
    )
  }
}

function mapStateToProps(state, ownProps) {

  return {
    // User Data
    userDetail: _.get(state.app, 'userDetails.data.searchResult', undefined),
    userDetailActions: _.get(state.app, 'userDetails.data.actions', undefined),
    passwordPolicyDetail: state.app.fetchPasswordPolicy.data,
    // Type Data
    entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
    orgTypes: _.get(state.app, 'typeData.data.ORG_TYPES', undefined),
    callerTypes: _.get(state.app, 'typeData.data.CALLER_TYPES', undefined),
    firstScreens: _.get(state.app, 'typeData.data.First_Screens', undefined),
    permission: _.get(state.app, 'permissionData.data.menuPermissions', undefined),
    hyperledgerData: _.get(state.app, 'NetworkUserTypeData.data.hyperledger', undefined),
    quorrumData: _.get(state.app, 'NetworkUserTypeData.data.quorrum', undefined)

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

UserSetupContainer.displayName = "USetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(UserSetupContainer)