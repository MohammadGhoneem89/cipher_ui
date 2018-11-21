'use strict';
/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import cloneDeep from 'lodash/cloneDeep';

/*container specific imports*/
import TileUnit from '../../common/tileUnit.jsx';
import Table from '../../common/Datatable.jsx';
import BarChartExceptions from '../../common/barChart.jsx'
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../common/DateControl.jsx'

const parentState = {
    searchFilters: "",
    currentPageNo: 1,
    APIPayloadID: undefined,
    dataSourceType: "",
    selectedDatasource: [],
    selectedDispatcher: [],
    selectedDatasourceObj: [],
    selectedDispatcherObj: [],
    eventNames: [],
    typeData: undefined,
    fields: [],
    rules: [],
    selectedDSObject: {},
    selectedField: -1,
    selectedEventNameID: -1,
    isActive: false,
    eventName: "",
    dataSourceName: "",
    sourceFunction: "",
    filePath: "",
    isLoading: true,
    isQueue: false,
    queueName: ""
}
class AddUpdateDatasource extends React.Component {

    constructor(props) {
        super(props);
        this.state = cloneDeep(parentState)
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.addRow = this.addRow.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);


        this.onChangeDatasource = this.onChangeDatasource.bind(this);
        this.onChangeFilepath = this.onChangeFilepath.bind(this);
        this.onChangeFunction = this.onChangeFunction.bind(this);
    }

    getRequest() {

        var request = {
            "dataSourceName": this.props.datasource
        }

        console.log(JSON.stringify(this.state))
        return request;
    }

    componentWillReceiveProps(nextProps) {


        if (this.props.datasource !== "NEWDATASOURCE" && nextProps.AddUpdateDatasourceData.dataSourceName) {
            if (nextProps.AddUpdateDatasourceData.sourceDataDefination.length && nextProps.AddUpdateDatasourceData.sourceDataDefination.length > 0) {
                let ruleList = [];
                nextProps.AddUpdateDatasourceData.sourceDataDefination.forEach(elem => {
                    elem.dataJsonStructure.forEach(e => {
                        ruleList.push(e);
                    })
                })

                this.setState({
                    rules: ruleList,
                    dataSourceName: nextProps.AddUpdateDatasourceData.dataSourceName,
                    dataSourceType: nextProps.AddUpdateDatasourceData.type,
                    sourceFunction: nextProps.AddUpdateDatasourceData.sourceFunction,
                    filePath: nextProps.AddUpdateDatasourceData.filePath,
                    queueName: nextProps.AddUpdateDatasourceData.queueName,
                    isQueue: nextProps.AddUpdateDatasourceData.type === "queue" ? true : false
                });
            }
        } else {
            this.setState({
                rules: parentState.rules,
                dataSourceName: parentState.dataSourceName,
                dataSourceType: parentState.dataSourceType,
                sourceFunction: parentState.sourceFunction,
                filePath: parentState.filePath,
                queueName: parentState.queueName,
                isQueue: parentState.dataSourceType === "queue" ? true : false
            });

        }
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false
            });
        }

    }

    searchCallBack(keyWord) {

    }
    ActionHandlers({ actionName, index }) {

        switch (actionName) {
            case "Delete":
                if (index > -1) {
                    let a = this.state.rules;
                    a.splice(index, 1);
                    this.setState({ rules: a });
                }
                break;
        }
    }



    componentDidMount() {

        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['DSR_TYPE', 'dataSourceType']));
        if (this.props.datasource !== "NEWDATASOURCE")
            this.props.actions.generalProcess(constants.getDataSourceByID, this.getRequest());

    }
    formSubmit() {

        if (this.state.rules.length == 0) {
            alert("source data must be defined!");
            return false;
        }
        if (this.state.dataSourceName.trim() === "") {
            alert("Data Source Name must be defined!");
            return false;
        }

        if (this.state.isQueue === true && this.state.queueName.trim() === "") {
            alert("queue Name must be defined!");
            return false;
        }
        if (this.state.isQueue === false && (this.state.sourceFunction.trim() === "" || this.state.filePath.trim() === "")) {
            alert("filePath and sourceFunction must be defined!");
            return false;
        }
        let ruleList = this.state.rules.map(function (item) {
            delete item.actions;
            return item;
        });
        let requestBody = {
            "dataSourceName": this.state.dataSourceName,
            "type": this.state.dataSourceType,
            "sourceFunction": this.state.sourceFunction,
            "filePath": this.state.filePath,
            "queueName": this.state.queueName,
            "sourceDataDefination": [{
                "eventName": this.state.dataSourceName,
                "dataJsonStructure": this.state.rules
            }]
        }
        console.log(JSON.stringify(requestBody));
        this.props.actions.generalProcess(constants.upsertDataSource, requestBody);
    }
    onChangeDatasource = e => {
        this.setState({ dataSourceName: e.target.value });
    };
    onChangeType = e => {
        this.setState({ dataSourceType: e.target.value, isQueue: e.target.value === "queue" ? true : false });
    };

    onChangeFunction = e => {
        this.setState({ sourceFunction: e.target.value });
    };

    onChangeFilepath = e => {
        this.setState({ filePath: e.target.value });
    };
    onChangeQueueName = e => {
        this.setState({ queueName: e.target.value });
    };

    addRow() {
        let selectedField = this.state.fields[this.state.selectedField];
        let value = '';

        let fieldName = document.getElementById('field') == null ? "" : document.getElementById('field').value;
        let fieldtype = document.getElementById('fieldtype') == null ? "" : document.getElementById('fieldtype').value;
        document.getElementById('field').value = "";
        if (!fieldName) {
            alert("field Name must be Defined");
        } else {

            let rows = this.state.rules


            let tupple = {
                "fieldName": fieldName,
                "type": fieldtype,
                "actions": [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
            }
            let litmus = this.containsObject(tupple, rows)

            if (litmus == false) {
                rows.push(tupple)
            }


            this.setState({ rules: rows });
            console.log(JSON.stringify(tupple))

        }
        //this.props.actions.generalProcess(constants.getEventRegistryByID, this.getRequest());

    }
    containsObject(refObj, list) {

        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            if (
                obj.fieldName == refObj.fieldName &&
                obj.type == refObj.type
            ) {
                return true;
            }
        }

        return false;
    }

    clearFields() {
        $('#clear').find('input:text').val('');
        $('#clear').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }
    render() {

        //alert(this.state.isActive)
        if (this.state.isLoading) {
            return (<div className="loader">isLoading...</div>)
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("AddUpdateDatasourceFilters")}</span></div>
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
                                                        <label className="control-label">{utils.getLabelByID("DL_DataSource")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" onChange={this.onChangeDatasource} disabled={this.props.AddUpdateDatasourceData.dataSourceName ? true : false} className="form-control" value={this.state.dataSourceName} id="dName" />
                                                    </div>
                                                </div>



                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DL_SourceType")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="sourcetype" name="sourcetype" value={this.state.dataSourceType} onChange={this.onChangeType} className="form-control">
                                                            {
                                                                this.state.typeData.dataSourceType && this.state.typeData.dataSourceType.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row" style={{ display: this.state.isQueue ? 'none' : 'block' }}>

                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DL_FilePath")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" onChange={this.onChangeFilepath} className="form-control" value={this.state.filePath} id="fPath" />

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DL_Function")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" onChange={this.onChangeFunction} className="form-control" value={this.state.sourceFunction} id="sfunc" />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" style={{ display: this.state.isQueue ? 'block' : 'none' }}>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DL_QueueName")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" onChange={this.onChangeQueueName} className="form-control" value={this.state.queueName} id="queueName" />
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

                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("AddUpdateDatasourceRules")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="form-body" id="AddUpdateDatasource">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_TemplateFields")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" className="form-control" id="field" />

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DSR_Type")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="fieldtype" name="fieldtype" className="form-control">
                                                            {
                                                                this.state.typeData.DSR_TYPE && this.state.typeData.DSR_TYPE.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                            </div>
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn btn-default" onClick={this.addRow.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Field")} </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="col-md-12">
                                                        <Table
                                                            gridColumns={utils.getGridColumnByName("DataSourceRules")}
                                                            gridData={this.state.rules}
                                                            export={false}
                                                            componentFunction={this.ActionHandlers}
                                                            pagination={false} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="col-md-12">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Save / Update")} </button>
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

AddUpdateDatasource.propTypes = {
    AddUpdateDatasourceData: PropTypes.object,
    typeData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        AddUpdateDatasourceData: state.app.AddUpdateDatasource.data.datasource,
        typeData: state.app.typeData.data,
        datasource: ownProps.params.datasource,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
AddUpdateDatasource.displayName = "AddUpdateDatasource";
export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateDatasource);
