import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SubmissionError} from 'redux-form'
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import * as utils from '../../common/utils.js';
import EntitySetupForm from '../../components/EntitySetupScreen/EntitySetupForm.jsx'
import EntityUpdateForm from '../../components/EntitySetupScreen/EntityUpdateForm.jsx'

class EntitySetupContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            entityDetail: {...initialState.entityDetail.data},
            entityID: undefined,
            entityNames: undefined,
            fileTemplateNames: undefined,
            commissionTemplateNames: undefined,
            typeData: undefined,
            isLoading: true,
            readOnly: false
        };

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getEntityDetail, requestCreator.createEntityDetailRequest(this.props.entityID));
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
        if (!this.props.commissionTemplateNames.length > 0) {
            this.props.actions.generalProcess(constants.getCommissionTemplateList, requestCreator.createCommissionTemplateListRequest({
                "currentPageNo": 1,
                "pageSize": 1
            }));
        }
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['settlementCriteria', 'settlementType']));
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entityDetail && nextProps.entityNames && nextProps.fileTemplateNames) {
            //Add permissions
            let entityDetail = this.props.entityID ? nextProps.entityDetail : {
                ...this.state.entityDetail,
                actions: nextProps.entityDetail.actions
            };
            this.setState({
                entityID: this.props.entityID,
                entityDetail: entityDetail,
                readOnly: nextProps.readOnly,
                entityNames: nextProps.entityNames,
                fileTemplateNames: nextProps.fileTemplateNames,
                commissionTemplateNames: nextProps.commissionTemplateNames,
                typeData: nextProps.typeData,
                isLoading: false
            })
        }
    }


    submit(data) {
        if (this.state.entityID) {
            data._id = this.state.entityID; //Hack to avoid replication.
            return this.props.actions.reduxFormProcess(constants.entityUpdate, requestCreator.createEntityUpdateRequest(data))
                .catch((error) => {
                    throw new SubmissionError(error);
                });
        }
        else
            return this.props.actions.reduxFormProcess(constants.entityInsert, requestCreator.createEntityInsertRequest(data))
                .catch((error) => {
                    throw new SubmissionError(error);
                });
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div>
                    {sessionStorage.orgType === "DSG" &&
                    <EntitySetupForm onSubmit={this.submit} initialValues={this.state.entityDetail}
                                     containerState={this.state} containerProps={this.props}/>}
                    {sessionStorage.orgType === "Entity" &&
                    <EntityUpdateForm onSubmit={this.submit} initialValues={this.state.entityDetail}
                                      containerState={this.state} containerProps={this.props}/>}
                </div>
            );
        }
        else{
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>);
        }
    }
}

function mapStateToProps(state, ownProps) {
    let entityID = ownProps.params.entityID;

    return {
        entityDetail: state.app.entityDetail.data,
        entityID: entityID,
        entityNames: state.app.entityList.data.typeData.entityNames,
        fileTemplateNames: state.app.fileTemplateList.data.typeData.fileTemplateNames,
        commissionTemplateNames: state.app.commissionTemplateList.data.typeData.commissionTemplateNames,
        typeData: state.app.typeData,
        readOnly: ownProps.params.mode === "view"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

EntitySetupContainer.displayName = "ES_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(EntitySetupContainer);