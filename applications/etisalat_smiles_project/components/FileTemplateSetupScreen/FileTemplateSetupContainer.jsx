import React from 'react';
import {bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import initialState from '../../../../core/reducers/initialState.js';
import * as actions from '../../../../core/actions/generalAction';
import FileTemplateForm from './FileTemplateForm.jsx';
import * as constants from '../../../../core/constants/Communication.js';
import * as appConstants from '../../constants/appCommunication.js';
import * as requestCreator from '../../../../core/common/request.js';
import * as utils from '../../../../core/common/utils.js';

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
            fileTemplateDetail: {...initialState.fileTemplateDetail.data},
            internalFields: [],
            fileTypes: [],
            special: [],
            columnNos: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fileTemplateDetail._id === nextProps.fileTemplateID && nextProps.typeData.internalFields) {
            //Add permissions
            let fileTemplateDetail = this.props.fileTemplateID ? nextProps.fileTemplateDetail : {
                ...this.state.fileTemplateDetail,
                actions: nextProps.fileTemplateDetail.actions
            };

            this.setState({
                isLoading: false,
                fileTemplateID: nextProps.fileTemplateID,
                fileTemplateDetail: fileTemplateDetail,
                internalFields: nextProps.typeData.internalFields,
                fileTypes: nextProps.typeData.fileTypes,
                special: nextProps.typeData.special,
                reconDataTypes: nextProps.typeData.reconDataTypes,
                columnNos: nextProps.typeData.columnNos
            });
        }
        if(nextProps.getEndpointListView) {
            let endpointList = nextProps.getEndpointListView.map(endpoint => {
                return endpoint;
            });
            this.setState({endpointList: endpointList})
        }
        if(nextProps.getTableNames) {
            this.setState({tableList: nextProps.getTableNames.tables})
        }
        if(nextProps.getFieldsList) {
            this.setState({fields: nextProps.getFieldsList.fields})
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getFileTemplateDetail, requestCreator.createFileTemplateDetailRequest(this.props.fileTemplateID));
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['internalFields', 'fileTypes', 'special', 'columnNos', 'reconDataTypes']));
        this.setState({isLoading: true});
    }

    onDBSelect() {
        this.props.actions.generalProcess(appConstants.getDBEndpointListView, {});
    }

    onEndpointSelect(event) {
        let id = event.target.value;
        this.setState({endpointId: id}, this.props.actions.generalProcess(appConstants.getTableNames, {'id': id}));
    }

    onTableSelect(event) {
        let id = this.state.endpointId;
        this.props.actions.generalProcess(appConstants.getFieldsList, {'id': id});
    }

    submit(data) {
        if (this.state.fileTemplateID)
            return this.props.actions.reduxFormProcess(constants.fileTemplateUpdate, requestCreator.createFileTemplateUpdateRequest(data)).then((result) => {
            }).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
        else
            return this.props.actions.reduxFormProcess(constants.fileTemplateInsert, requestCreator.createFileTemplateInsertRequest(data)).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
    }

    render() {
        console.log("state-->",this.state);
        if (!this.state.isLoading)
            return (
                <FileTemplateForm onSubmit={this.submit} initialValues={this.state.fileTemplateDetail}
                                  containerState={this.state}
                                  containerProps={this.props}
                                  onDBSelect={this.onDBSelect}
                                  onEndpointSelect={this.onEndpointSelect}
                                  onTableSelect={this.onTableSelect} />
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
        getEndpointListView: state.app.getEndpointListView.data,
        getTableNames: state.app.getTableNames.data,
        getFieldsList: state.app.getFieldsList.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

FileTemplateContainer.displayName = "FTSetup_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(FileTemplateContainer)