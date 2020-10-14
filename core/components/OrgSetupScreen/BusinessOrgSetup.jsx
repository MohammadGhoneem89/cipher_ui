import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import * as utils from '../../common/utils.js';
import EntitySetupForm from './BusinessOrgSetupForm.jsx'

class BusinessOrgSetup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            entityDetail: { ...initialState.entityDetail.data },
            orgID: undefined,
            entityNames: undefined,
            typeData: undefined,
            isLoading: true,
            readOnly: false,
            status: "No Action",
            groupTypeListUI: [],
            groupTypeListAPI: [],
            billing: [],
            entityList: []
        };

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({}));
        this.setState({ isLoading: true });
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES','Export_entity_freezone_code']));
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.entityList){
            console.log(nextProps.entityList.data.searchResult);
            this.setState({entityList: nextProps.entityList.data.searchResult})
        }

        if (nextProps.typeData) {
            console.log('---props---' , nextProps.typeData);
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false,
            })
        }
    }

    disableFileds() {
        $('#netconfig').find('input:text').disabled = this.state.readOnly;
        $('#netconfig').find('textarea').disabled = this.state.readOnly;
    }

    submit(data) {
        // console.log('working');
        // if (this.state.orgID) {
        //     data._id = this.state.orgID; //Hack to avoid replication.

        //     return this.props.actions.reduxFormProcess(constants.entityUpdate, requestCreator.createEntityUpdateRequest(data))
        //         .catch((error) => {
        //             throw new SubmissionError(error);
        //         });
        // } else
        //     return this.props.actions.reduxFormProcess(constants.entityInsert, requestCreator.createEntityInsertRequest(data))
        //         .catch((error) => {
        //             throw new SubmissionError(error);
        //         });
    }

    render() {

        if (!this.state.isLoading) {
            let welcome = [

                {
                    id: "C-ONBD-01",
                    description: `Creating Cipher User Interface User .............. username: ${this.state.entityDetail.spCode}_admin `,
                    status: this.state.status
                },
                {
                    id: "C-ONBD-02",
                    description: `Creating API User .............................................. username: ${this.state.entityDetail.spCode}_api `,
                    status: this.state.status
                },
                {
                    id: "C-ONBD-03",
                    description: `Generating Postman Collection ....................... File: collection.json`,
                    status: this.state.status
                },
                { id: "C-ONBD-04", description: `Sending Welcome Email.`, status: this.state.status }
            ];

            return (
                <div>
                    <EntitySetupForm onSubmit={this.submit} initialValues={this.state.entityDetail}
                        containerState={this.state} containerProps={this.props} welcome={welcome}
                        welcomeResp={this.props.welcomeResp} entityList={this.state.entityList} typeData={this.state.typeData} />
                </div>
            );
        } else {
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        // entityDetail: state.app.entityDetail.data,
        // orgID: orgID,
        // entityNames: state.app.entityList.data.typeData.entityNames,
        // fileTemplateNames: state.app.fileTemplateList.data.typeData.fileTemplateNames,
        typeData: state.app.typeData.data,
        entityList: state.app.entityList,
        // groupTypeList: _.get(state.app, 'groupTypeList.data', undefined),
        // readOnly: ownProps.params.mode === "view",
        // welcomeResp: _.get(state.app, 'createOnDemandWelCome.data', undefined),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

BusinessOrgSetup.displayName = "ES_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(BusinessOrgSetup);