import React from 'react';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import FileTemplateForm from './FileTemplateForm.jsx';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';


import * as utils from '../../common/utils.js';

class FileTemplateContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        this.onDBSelect = this.onDBSelect.bind(this);
        this.onEndpointSelect = this.onEndpointSelect.bind(this);
        this.onTableSelect = this.onTableSelect.bind(this);

        this.state = {
            isLoading: false,
            fileTemplateID: undefined,
            fileTemplateDetail: { ...initialState.fileTemplateDetail.data },
            internalFields: [],
            fileTypes: [],
            special: [],
            ApiList: [],
            columnNos: [],
            fieldList: [],
            fields: [],
            apiList: ["TerminateContract", "SaveEjariHashData"],
            isDBSelected: false,
            isEndpointSelected: false,
            isTableSelected: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fileTemplateDetail._id === nextProps.fileTemplateID && nextProps.typeData.internalFields && nextProps.ApiList && nextProps.fileTemplateDetail.actions && this.state.isLoading == true) {
            //Add permissions
            let fileTemplateDetail = this.props.fileTemplateID ? nextProps.fileTemplateDetail : {
                ...this.state.fileTemplateDetail,
                actions: nextProps.fileTemplateDetail.actions
            };
            alert(JSON.stringify(fileTemplateDetail.rulesList))
            this.setState({
                isLoading: false,
                fileTemplateID: nextProps.fileTemplateID,
                fileTemplateDetail: fileTemplateDetail,
                internalFields: nextProps.typeData.internalFields,
                fileTypes: nextProps.typeData.fileTypes,
                special: nextProps.typeData.special,
                typeData: nextProps.typeData,
                reconDataTypes: nextProps.typeData.reconDataTypes,
                columnNos: nextProps.typeData.columnNos,
                ApiList: nextProps.ApiList,
                rulesList: fileTemplateDetail.rulesList || [],
                fields: fileTemplateDetail.fields
            });
        }
        if (nextProps.getEndpointListView) {
            let endpointList = nextProps.getEndpointListView.map(endpoint => {
                return endpoint;
            });
            this.setState({ endpointList: endpointList })
        }
    }

    onDBSelect(flag) {
        if (!flag) {
            this.setState({
                endpointList: undefined,
                endpointId: undefined,
                tableList: undefined,
                fields: [],
                isDBSelected: false,
                isEndpointSelected: false,
                isTableSelected: false
            })
            return;
        }
        this.setState({isDBSelected: true});
        this.props.actions.generalProcess(constants.getDBEndpointListView, {});
    }

    onEndpointSelect(event) {
        if (!event.target.value) {
            this.setState({ endpointId: undefined, tableList: undefined, fields: [], isEndpointSelected: false });
            return;
        }
        let id = event.target.value;
        this.setState({ endpointId: id, isEndpointSelected: true })
        // this.props.actions.generalProcess(constants.getTableNames, { 'id': id });
    }

    onTableSelect(event) {
        if (!event.target.value) {
            this.setState({ fields: [], isTableSelected: false });
            return;
        }
        let id = this.state.endpointId;
        let table = event.target.value;
        this.setState({isTableSelected: true});
        // this.props.actions.generalProcess(constants.getFieldsList, { 'id': id, 'table': table });
    }

    getAPIList(payload) {
        this.props.actions.generalProcess(constants.getAPIRequestMapping, payload);
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getFileTemplateDetail, requestCreator.createFileTemplateDetailRequest(this.props.fileTemplateID));
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['internalFields', 'fileTypes', 'special', 'columnNos', 'reconDataTypes', 'transformationFunctions']));
        this.props.actions.generalProcess(constants.getMappingListData, this.getRequest());
        this.props.actions.generalProcess(constants.getAPIList, {});


        this.setState({ isLoading: true });
    }

    getRequest() {
        let mappingName = document.getElementById('mappingName') == null ? "" : document.getElementById('mappingName').value;
        let mappingType = document.getElementById('requestType') == null ? "" : document.getElementById('requestType').value;

        var searchCriteria = {}

        if (mappingName != "")
            searchCriteria.mappingName = mappingName;

        if (mappingType != "")
            searchCriteria.mappingType = mappingType;


        // this.setState({searchFilters: searchCriteria});

        var request = {
            "action": "mappingData",
            searchCriteria,
            "page": {
                "currentPageNo": 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })
        return request;
    }

    submit(data) {
        if (this.state.fileTemplateID)
            return this.props.actions.reduxFormProcess(constants.fileTemplateUpdate, requestCreator.createFileTemplateUpdateRequest(data)).then((result) => {
            }).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
        else {
            return this.props.actions.reduxFormProcess(constants.fileTemplateInsert, requestCreator.createFileTemplateInsertRequest(data)).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
        }
    }

    render() {
        if (!this.state.isLoading)
            return (
              <FileTemplateForm onSubmit={this.submit} initialValues={this.state.fileTemplateDetail}
                                containerState={_.clone(this.state)}
                                rulesList={this.state.rulesList}
                                fieldList={this.props.fieldList}
                                callinterface={this.getAPIList.bind(this)}
                                containerProps={this.props} generalHandler={this.generalHandler}
                                onDBSelect={this.onDBSelect}
                                onEndpointSelect={this.onEndpointSelect}
                                onTableSelect={this.onTableSelect}
              />
            );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    let fileTemplateID = ownProps.params.fileTemplateID;
    return {
        fileTemplateID: fileTemplateID,
        fileTemplateDetail: state.app.fileTemplateDetail.data,
        typeData: state.app.typeData.data,
        ApiList: _.get(state, 'app.ApiListCombo.data.ApiList', undefined),
        fieldList: _.get(state, 'app.APIRequestMappingList.data.fieldList', undefined),
        getEndpointListView: state.app.getEndpointListView.data,
        // getTableNames: state.app.getTableNames.data,
        // getFieldsList: state.app.getFieldsList.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

FileTemplateContainer.displayName = "FTSetup_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(FileTemplateContainer)