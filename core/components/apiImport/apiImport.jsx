/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
/*container specific imports*/
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import cloneDeep from 'lodash/cloneDeep';
import ModalBox from '../../common/ModalBox.jsx';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import get from 'lodash/get';
import ReactJson from 'react-json-view';
const stateParent = {
    useCase: "",
    route: "",
    mappingName: "",
    mappingType: undefined,
    description: "",
    blockSubmit: true,
    mappingConfig: [],
    functionData: undefined,
    typeList: [],
    documents: [],
    selectedMapping: "",
    route: "",
    ResponseMapping: [],
    RequestMapping: [],
    typeData: undefined,
    mapping: [],
    sampleReqJSON: {},
    sampleResJSON: {},
    MappingConfigList: {},
    selectedMappingData: {},
    isOpen: false,
    importCalled: false
}
const Document = ({ updateState, initState }) => {
    function getUploadResponse(data) {
        let document = [];
        for (let i = 0; i < data.contextData.length; i++) {
            document = {
                "fileDetail": data.contextData[i].fileDetail,
                "documentName": data.contextData[i].name,
                "fileType": data.contextData[i].ext,
                "retreivalPath": data.contextData[i].path,
                "documentHash": data.contextData[i].hash,
                "actions": data.contextData[i].actions
            };
        }
        //documents.push(...data.contextData);
        updateState({ documents: [document] })
    }
    function getRemoveResponse(file) {
        if (file.accepted === true) {
            let doc = initState.documents.pop();
            updateState({ documents: file });
        }
    }

    return (<div className="row">
        <div className="col-centered col-md-12">
            <div className="col-centered col-md-12">
                <div className="form-group">
                    <FileUploader type="Document" source="Channel"
                        initialValues={initState.documents}
                        allowedFileType=".xlsx"
                        acceptedFiles="API configuration files to be uploaded with extention *.xlsx"
                        getUploadResponse={getUploadResponse}
                        getRemoveResponse={getRemoveResponse}
                        maxFiles="1"
                        showDropzone={!initState.readOnly}
                        showAttachementGrid={true} />
                </div>
            </div>
        </div>
    </div>);
};


class ApiImport extends React.Component {

    constructor(props) {
        super(props);
        this.state = cloneDeep(stateParent)
        this.onMappingNameChange = this.onMappingNameChange.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onRouteChange = this.onRouteChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onMappingTypeChange = this.onMappingTypeChange.bind(this);
        this.addMappingExising = this.addMappingExising.bind(this);
        this.addMappingFile = this.addMappingFile.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.closePopUP = this.closePopUP.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }
    addMappingExising() {
        if (!this.state.selectedMappingData.fields) {
            alert("Please Select Mapping!!");
            return;
        }
        if (this.state.mappingType == "REQUEST" && this.state.selectedMappingData.mappingType == "REQUEST") {
            this.setState({ RequestMapping: this.state.selectedMappingData.fields });
        }
        if (this.state.mappingType == "RESPONSE" && this.state.selectedMappingData.mappingType == "RESPONSE") {
            this.setState({ ResponseMapping: this.state.selectedMappingData.fields });
        }

    }
    renderPopupBody() {
        this.setState({ isOpen: true })
    }
    closePopUP() {
        this.setState({ isOpen: false })
    }
    addMappingFile() {

        if (!(this.state.mappingType == "RESPONSE" || this.state.mappingType == "REQUEST")) {
            alert("Please Select Mapping Type!!");
            return;
        }


        if (this.state.documents.length > 0) {
            // alert(this.state.documents.length)
            let doc = this.state.documents[0];
            let path = doc.retreivalPath;
            this.setState({ importCalled: true }, () => {
                this.props.actions.generalProcess(constants.getParseFile, { path });
            });

        } else {
            alert("Please upload API import file!!");
        }


    }

    onMappingNameChange = e => {
        this.setState({ mappingName: e.target.value });
    }
    onMappingTypeChange = e => {
        // alert("Change")
        if (e.target.value == "REQUEST") {
            this.setState({ mappingType: e.target.value, mapping: this.state.MappingConfigList.REQUEST });
        }
        if (e.target.value == "RESPONSE") {
            this.setState({ mappingType: e.target.value, mapping: this.state.MappingConfigList.RESPONSE });
        }
    }
    onRouteChange = e => {
        this.setState({ route: e.target.value });
    }
    onInputChange = (e) => {
        let value = e.target.value;
        this.getRequestResponseMapping(value, this.state.mappingType)
        this.setState({
            [e.target.name]: value
        });
    }

    onUseCaseChange = e => {
        this.setState({ useCase: e.target.value });
    }
    onUseCaseChange = e => {
        this.setState({ useCase: e.target.value });
    }
    onChangeDesc = e => {
        this.setState({ description: e.target.value });
    }
    getRequest() {
        var request = {
            "mappingName": this.props.mappingName
        }
        console.log(JSON.stringify(request))
        return request;
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.MappingConfigData && nextProps.MappingConfigData.REQUEST && nextProps.MappingConfigData.RESPONSE) {
            this.setState({
                MappingConfigList: nextProps.MappingConfigData,
            });
        }
        if (nextProps.MappingConfigData && nextProps.MappingConfigData.REQUEST && nextProps.MappingConfigData.RESPONSE) {
            this.setState({
                MappingConfigList: nextProps.MappingConfigData,
            });
        }
        if (nextProps.AddUpdateMappingData.MappingConfig) {
            this.setState({
                selectedMappingData: nextProps.AddUpdateMappingData.MappingConfig,
            });
        }
        if (nextProps.ApiImportData && this.state.importCalled === true) {
            // alert(JSON.stringify(nextProps.ApiImportData))

            if (this.state.mappingType == "REQUEST") {
                this.setState({ RequestMapping: nextProps.ApiImportData.mapping, sampleReqJSON: nextProps.ApiImportData.sampleJSON });
            }
            if (this.state.mappingType == "RESPONSE") {
                this.setState({ ResponseMapping: nextProps.ApiImportData.mapping, sampleResJSON: nextProps.ApiImportData.sampleJSON });
            }

            this.setState({
                importCalled: false,
                typeList: nextProps.ApiImportData.typedata

            });
        }



        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData
            });
        }
        this.setState({ blockSubmit: false })

    }

    componentWillMount() {
        this.setState(cloneDeep(stateParent))
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState(cloneDeep(stateParent))
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['DFM_FROMATTYPE', 'DFM_DATATYPE', 'DFM_REQFIELDTYPE', 'DFM_RESFIELDTYPE', 'USE_CASE', 'TRAN_RESFIELDTYPE']));
        this.props.actions.generalProcess(constants.getMappingList);
    }

    formSubmit() {
        if (this.state.useCase.trim() == "") {
            alert("useCase must be defined");
            return false;
        }
        if (this.state.route.trim() == "") {
            alert("route must be defined");
            return false;
        }

        if (this.state.ResponseMapping.length == 0) {
            alert("Response Mapping must be defined");
            return false;
        }

        if (this.state.RequestMapping.length == 0) {
            alert("Request Mapping must be defined");
            return false;
        }



        let requestBody = {
            "useCase": this.state.useCase,
            "route": this.state.route,
            "mappingNameRequest": this.state.route + "_REQ_AGEN",
            "mappingNameResponse": this.state.route + "_RES_AGEN",
            "requestMapping": this.state.RequestMapping,
            "responseMapping": this.state.ResponseMapping,
            "description": this.state.description,
            "typedata": this.state.typeList,
            "sampleReqJSON": this.state.sampleReqJSON,
            "sampleResJSON": this.state.sampleResJSON
        };
        console.log(JSON.stringify(requestBody));
        this.setState({ blockSubmit: true });
        this.props.actions.generalProcess(constants.upsertAPIImport, requestBody);
    }

    updateState = (data) => {
        this.setState(data);
    }

    getRequestResponseMapping = (val) => {

        this.props.actions.generalProcess(constants.getMappingConfigByID, { mappingName: val });
    };


    render() {
        //alert(JSON.stringify(this.state.mappingConfig))
        return (
            <div>
                <ModalBox isOpen={this.state.isOpen}>
                    <Portlet title={utils.getLabelByID("Event Details")} isPermissioned={true}>
                        <div className="row" >
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <label className="control-label">{utils.getLabelByID("Sample Request")}</label>
                                </div>
                                <div className="form-group col-md-12">
                                    <pre> <ReactJson src={this.state.sampleReqJSON} /></pre>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <label className="control-label">{utils.getLabelByID("Sample Response")}</label>
                                </div>
                                <div className="form-group col-md-12">
                                    <pre> <ReactJson src={this.state.sampleResJSON} /></pre>
                                </div>
                            </div>
                            <div className="form-actions right">
                                <div className="form-group col-md-12">
                                    <div className="btn-toolbar pull-right">
                                        <button type="button" className="btn btn-default" onClick={this.closePopUP} >{utils.getLabelByID("Close")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Portlet>
                </ModalBox>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("AddUpdateMapping")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="form-body" id="clear">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_useCase")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">

                                                        <select name="useCase" id="useCase" value={this.state.useCase} onChange={this.onUseCaseChange} className="form-control">
                                                            <option >{utils.getLabelByID("-- Select --")}</option>
                                                            {this.state.typeData && this.state.typeData.USE_CASE && this.state.typeData.USE_CASE.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value}>{option.label}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_route")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" className="form-control" onChange={this.onRouteChange} value={this.state.route} id="route" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_RequestName")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" className="form-control" onChange={this.onMappingNameChange} disabled value={this.state.route + "_AGEN"} id="mappingName" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_RequestDescription")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <textarea id="description"
                                                            onChange={this.onChangeDesc} className="form-control" value={this.state.description}
                                                            style={{
                                                                width: "100%",
                                                                height: "10%"
                                                            }}></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group col-md-12">
                                                        <label className="control-label bold uppercase">{utils.getLabelByID("Import Settings")}</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_RequestType")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="requestType" name="requestType" onChange={this.onMappingTypeChange} value={this.state.mappingType} className="form-control">
                                                            <option >{utils.getLabelByID("-- Select --")}</option>
                                                            {this.state.typeData && this.state.typeData.DFM_FROMATTYPE && this.state.typeData.DFM_FROMATTYPE.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value}>{option.label}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_ExistingMapping")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select name="selectedMapping" value={this.state.selectedMapping} onChange={this.onInputChange} className="form-control">
                                                            <option disabled >{utils.getLabelByID("-- Select --")}</option>
                                                            {this.state.mapping &&
                                                                this.state.mapping.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.label}>{option.label}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <Document initState={this.state} updateState={this.updateState} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-actions right">
                                                        <div className="form-group col-md-12">
                                                            <div className="btn-toolbar pull-right ">
                                                                <button type="submit" onClick={this.addMappingFile} className="btn btn-info green" > Import File </button>
                                                                <button type="submit" onClick={this.addMappingExising} className="btn btn-info green" > Import Existing </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ display: this.state.typeList.length > 0 ? "block" : "none" }}>
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("Type Data Details")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="form-body" id="customMappingDefination">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12">

                                                    {this.state.typeList.length > 0 &&
                                                        this.state.typeList.map((data, index) => {

                                                            return (
                                                                <div>
                                                                    <div className="form-group col-md-12">
                                                                        <label className="control-label bold uppercase">{data.typeName.replace('_', ' ')}</label>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <Table
                                                                            gridColumns={utils.getGridColumnByName("typedataConfig")}
                                                                            gridData={get(data, `data.${data.typeName}`)}
                                                                            export={false}
                                                                            componentFunction={this.ActionHandlers}
                                                                            pagination={false} />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("API Details")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="form-body" id="customMappingDefination">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group col-md-12">
                                                        <label className="control-label bold uppercase">{utils.getLabelByID("RequestMapping")}</label>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <Table
                                                            gridColumns={utils.getGridColumnByName("mappingConfig")}
                                                            gridData={this.state.RequestMapping}
                                                            export={false}
                                                            componentFunction={this.ActionHandlers}
                                                            pagination={false} />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group col-md-12">
                                                        <label className="control-label bold uppercase">{utils.getLabelByID("ResponseMapping")}</label>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <Table
                                                            gridColumns={utils.getGridColumnByName("mappingConfig")}
                                                            gridData={this.state.ResponseMapping}
                                                            export={false}
                                                            componentFunction={this.ActionHandlers}
                                                            pagination={false} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-actions right">
                                                        <div className="form-group col-md-12">
                                                            <div className="btn-toolbar pull-right ">

                                                                <button type="submit" onClick={this.renderPopupBody} className="btn btn-default" > view sample json </button>
                                                                <button type="submit" onClick={this.formSubmit} className="btn btn-info green" > Submit </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

ApiImport.propTypes = {
    AddUpdateMappingData: PropTypes.object,
    MappingConfigData: PropTypes.object,
    children: PropTypes.object,
    ApiImportData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {
        AddUpdateMappingData: state.app.AddUpdateMapping.data,
        typeData: state.app.typeData.data,
        FunctionData: state.app.FunctionData.data,
        mappingName: ownProps.params.mappingName,
        MappingConfigData: state.app.MappingConfigData.data,
        ApiImportData: state.app.ApiImport.data,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ApiImport.displayName = "ApiImport";
export default connect(mapStateToProps, mapDispatchToProps)(ApiImport);
