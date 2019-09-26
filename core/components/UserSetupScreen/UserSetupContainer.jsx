import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import UserSetupForm from './UserSetupForm.jsx'
import { SubmissionError, initialize } from 'redux-form'
import config from '../../../config';

let arr = []
class UserSetupContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userDetail: initialState.userDetails.data,
      pageActions: initialState.userDetails.data.actions,
      userID: undefined,
      typeData: [],
      isLoading: true,
      entityNames: undefined,
      permissionTypeData: [],
      networkUserTypeData: {},
      quorrumUser: undefined,
      hypUser: undefined
    };

    this.submit = this.submit.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentWillMount() {
    let userID = this.props.userID;
    if (userID) {
      this.setState({
        userID: this.props.userID,
        isLoading: true
      });
    }
  }

  componentDidMount() {
    let request = {
      "action": "userDetails",
      "id": this.props.userID
    };

    this.props.actions.generalProcess(constants.getBlkUserList);
    this.props.actions.generalProcess(constants.getUserDetail, request);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES']));


    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
      "currentPageNo": 1,
      "pageSize": 1
    }));

  }

  componentWillUnmount() {

  }

  resetPassword() {

    if (this.state.userID) {
      let request = { "userID": this.state.userID };
      this.props.actions.generalProcess(constants.passwordReset, request);
    }

  }

  submit(data) {

    let updatedData = JSON.parse(JSON.stringify(data));

    if (sessionStorage.orgType === 'Entity' || sessionStorage.orgType === 'Acquirer') {
      updatedData.orgType = sessionStorage.orgType;
      updatedData.orgCode = sessionStorage.orgCode;
    }
    updatedData.id = updatedData._id;
    let allowedIP = updatedData.allowedIPRange;
    updatedData.allowedIPRange = [allowedIP];
    let groupsListUpdate = [];

    for (let count = 0; count < updatedData.groups.length; count++) {
      if (updatedData.groups[count]["isAssigned"]) {
        let assignedGroups = {
          "_id": updatedData.groups[count]["_id"]
        };
        groupsListUpdate.push(assignedGroups);
      }
    }
    if (this.state.userID)
      delete updatedData.password;

    if (!updatedData.isActive)
      updatedData.isActive = false;

    updatedData.passwordHashType = 'sha512';
    updatedData.groups = groupsListUpdate;
    updatedData.passwordHashType = "SHA512";

    updatedData.hypUser = updatedData.hypUser;
    updatedData.quorrumUser = updatedData.quorrumUser;
    let dataSubmit = {
      "action": "userInsert",
      "data": updatedData
    };

    if (this.state.userID)
      return this.props.actions.reduxFormProcess(constants.userUpdate, dataSubmit)
        .catch((error) => {
          throw new SubmissionError(error);
        });
    else
      return this.props.actions.reduxFormProcess(constants.userInsert, dataSubmit)
        .catch((error) => {
          throw new SubmissionError(error);
        });
  }


  componentWillReceiveProps(nextProps) {
    let perTypeData = this.getPermissionTypeData(nextProps.permission)
    if (nextProps.userDetail.groups && nextProps.entityNames && nextProps.typeData && nextProps.NetworkUserTypeData.data) {

      this.setState({
        userDetail: nextProps.userDetail,
        pageActions: nextProps.pageActions,
        typeData: nextProps.typeData,
        isLoading: false,
        entityNames: nextProps.entityNames,
        permissionTypeData: perTypeData,
        networkUserTypeData: nextProps.NetworkUserTypeData.data
      });
    }
    else if (!nextProps.userID && nextProps.entityNames && nextProps.typeData && nextProps.NetworkUserTypeData.data) {
      this.setState({
        userDetail: initialState.userDetails.data,
        pageActions: nextProps.pageActions,
        typeData: nextProps.typeData,
        entityNames: nextProps.entityNames,
        permissionTypeData: perTypeData,
        networkUserTypeData: nextProps.NetworkUserTypeData.data
      });
    }
  }

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

  render() {

    if (!this.state.isLoading) {

      let groupList = []
      for (let groupCount = 0; groupCount < this.state.userDetail.groups.length; groupCount++) {
          groupList.push(this.state.userDetail.groups[groupCount])
      }
      this.state.userDetail.groups = groupList;

      console.log(groupList)
      return (

        <Portlet title={"User"}>
          < UserSetupForm
            onSubmit={this.submit}
            initialValues={this.state.userDetail}
            pageActions={this.state.pageActions}
            containerState={this.state}
            containerProps={this.props}
            resetPassword={this.resetPassword} />
        </Portlet>
      );
    }
    else
      return (<div className="loader">Loading...</div>)

  }
}

function mapStateToProps(state, ownProps) {
  return {
    userDetail: state.app.userDetails.data.searchResult,
    pageActions: state.app.userDetails.data.actions,
    userID: ownProps.params.userID,
    entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
    typeData: _.get(state.app, 'typeData.data', undefined),
    permission: state.app.permissionData.data.menuPermissions,
    NetworkUserTypeData: state.app.NetworkUserTypeData,
  };

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

UserSetupContainer.displayName = "USetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(UserSetupContainer)