import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SubmissionError} from 'redux-form'
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import * as utils from '../../common/utils.js';
import EntitySetupForm from './OrgSetupForm.jsx'

class OrgSetupContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entityDetail: {...initialState.entityDetail.data},
      orgID: undefined,
      entityNames: undefined,
      typeData: undefined,
      isLoading: true,
      readOnly: false,
      status: "No Action",
      groupTypeListUI: [],
      groupTypeListAPI: []
    };

    this.submit = this.submit.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getEntityDetail, requestCreator.createEntityDetailRequest(this.props.orgID));
    if (!this.props.entityNames.length > 0) {
      this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
        "currentPageNo": 1,
        "pageSize": 1
      }));
    }
    if (!this.props.fileTemplateNames.length > 0) {
      this.props.actions.generalProcess(constants.getFileTemplateList, requestCreator.createFileTemplateListRequest({
        "currentPageNo": 1,
        "pageSize": 1
      }));
    }

    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES', 'First_Screens']));
    this.props.actions.generalProcess(constants.groupTypeList);
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.entityDetail && nextProps.entityNames && nextProps.fileTemplateNames && nextProps.typeData && nextProps.groupTypeList) {
      //Add permissions
      let entityDetail = this.props.orgID ? nextProps.entityDetail : {
        ...this.state.entityDetail,
        actions: nextProps.entityDetail.actions
      };
      this.setState({
        orgID: this.props.orgID,
        entityDetail: entityDetail,
        readOnly: nextProps.readOnly,
        entityNames: nextProps.entityNames,
        typeData: nextProps.typeData,
        isLoading: false,
        groupTypeListUI: nextProps.groupTypeList.UI || [],
        groupTypeListAPI: nextProps.groupTypeList.API || []

      })
    }
  }

  disableFileds() {
    $('#netconfig').find('input:text').disabled = this.state.readOnly;
    $('#netconfig').find('textarea').disabled = this.state.readOnly;
  }

  submit(data) {
    if (this.state.orgID) {
      data._id = this.state.orgID; //Hack to avoid replication.

      return this.props.actions.reduxFormProcess(constants.entityUpdate, requestCreator.createEntityUpdateRequest(data))
        .catch((error) => {
          throw new SubmissionError(error);
        });
    } else
      return this.props.actions.reduxFormProcess(constants.entityInsert, requestCreator.createEntityInsertRequest(data))
        .catch((error) => {
          throw new SubmissionError(error);
        });
  }

  render() {

    if (!this.state.isLoading) {
      let welcome = [

        {
          id: "C-ONBD-01",
          description: `Creating Cipher User Interface User .............. username: ${this.state.entityDetail.spCode.toLowerCase()}_admin `,
          status: this.state.status
        },
        {
          id: "C-ONBD-02",
          description: `Creating API User .............................................. username: ${this.state.entityDetail.spCode.toLowerCase()}_api `,
          status: this.state.status
        },
        {
          id: "C-ONBD-03",
          description: `Generating Postman Collection ....................... File: collection.json`,
          status: this.state.status
        },
        {id: "C-ONBD-04", description: `Sending Welcome Email.`, status: this.state.status}
      ];

      return (
        <div>
          <EntitySetupForm onSubmit={this.submit} initialValues={this.state.entityDetail}
                           containerState={this.state} containerProps={this.props} welcome={welcome}/>
        </div>
      );
    } else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  let orgID = ownProps.params.orgID;

  return {
    entityDetail: state.app.entityDetail.data,
    orgID: orgID,
    entityNames: state.app.entityList.data.typeData.entityNames,
    fileTemplateNames: state.app.fileTemplateList.data.typeData.fileTemplateNames,
    typeData: state.app.typeData.data,
    groupTypeList: _.get(state.app, 'groupTypeList.data', undefined),
    readOnly: ownProps.params.mode === "view"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

OrgSetupContainer.displayName = "ES_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(OrgSetupContainer);