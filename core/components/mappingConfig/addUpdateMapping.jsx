/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';


/*container specific imports*/
import TileUnit from '../../common/tileUnit.jsx';
import Table from '../../common/Datatable.jsx';
import BarChartExceptions from '../../common/barChart.jsx'
import * as utils from '../../common/utils.js';
import cloneDeep from 'lodash/cloneDeep';

import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../common/DateControl.jsx'

const stateParent = {
    mappingName: "",
    mappingType: undefined,
    description: "",
    blockSubmit: true,
    mappingConfig: [],
    functionData: undefined,
    typeData: undefined
}

class AddUpdateMapping extends React.Component {

    constructor(props) {
        super(props);
        this.state = cloneDeep(stateParent)
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.onMappingNameChange = this.onMappingNameChange.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onMappingTypeChange = this.onMappingTypeChange.bind(this);
        this.addRow = this.addRow.bind(this);
    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }
    onMappingNameChange = e => {
        this.setState({ mappingName: e.target.value });
    }
    onMappingTypeChange = e => {
        this.setState({ mappingType: e.target.value });
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

        if (nextProps.FunctionData) {
            this.setState({
                functionData: nextProps.FunctionData
            });
        }


        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData
            });
        }
        if (this.props.mappingName !== "NEWMAPPING") {
            if (nextProps.AddUpdateMappingData && nextProps.AddUpdateMappingData.MappingConfig) {

                let mappingList = cloneDeep(nextProps.AddUpdateMappingData.MappingConfig.fields);
                console.log(mappingList)
                mappingList.map(function (item) {
                    item.actions = [
                        { label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION" },
                        { label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
                        { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
                    ];
                    return item;
                });
                this.setState({
                    mappingConfig: mappingList,
                    mappingName: nextProps.AddUpdateMappingData.MappingConfig.mappingName,
                    description: nextProps.AddUpdateMappingData.MappingConfig.description,
                    mappingType: nextProps.AddUpdateMappingData.MappingConfig.mappingType

                })
            }
        } else {

            this.setState({
                mappingName: "",
                mappingType: undefined,
                description: "",
                mappingConfig: []
            })
        }

        this.setState({ blockSubmit: false })

    }

    componentWillMount() {
        this.setState(cloneDeep(stateParent))
    }
    searchCallBack(keyWord) {

    }
    ActionHandlers({ actionName, index }) {

        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let a = this.state.mappingConfig[index];
                    document.getElementById('IN_FIELD').value = a.IN_FIELD;
                    document.getElementById('IN_FIELDVALUE').value = a.IN_FIELDVALUE;
                    document.getElementById('IN_FIELDTYPE').value = a.IN_FIELDTYPE;
                    document.getElementById('IN_FIELDDT').value = a.IN_FIELDDT;
                    document.getElementById('IN_FIELDFUNCTION').value = a.IN_FIELDFUNCTION;
                    document.getElementById('IN_FIELDVALIDATION').value = a.IN_FIELDVALIDATION;
                    document.getElementById('IN_FIELDDESCRIPTION').value = a.IN_FIELDDESCRIPTION;
                    document.getElementById('MAP_FIELD').value = a.MAP_FIELD;
                    document.getElementById('MAP_FIELDDT').value = a.MAP_FIELDDT;
                    document.getElementById('Sequence').value = a.Sequence;
                    document.getElementById('IN_ISREQUIRED').checked = a.IN_ISREQUIRED == "Y" ? true : false;
                    let tempState = this.state.mappingConfig;
                    tempState.splice(index, 1);
                    this.setState({ mappingConfig: tempState });
                }
                break;
            case "Delete":
                let result = confirm("Are you you want to delete?");
                if (result) {
                    if (index > -1) {
                        let a = this.state.mappingConfig;
                        a.splice(index, 1);
                        this.setState({ mappingConfig: a });
                    }
                }

                break;
            case "Move UP":
                if (index > 0) {
                    let newConfig = this.state.mappingConfig;
                    let prev = newConfig[index - 1];
                    newConfig[index - 1] = newConfig[index]
                    newConfig[index - 1].Sequence = index
                    prev.Sequence = index + 1
                    newConfig[index] = prev
                    this.setState({ mappingConfig: newConfig });
                }
                break;
            case "Move Down":
                if (index + 1 <= this.state.mappingConfig.length) {
                    let newConfig = this.state.mappingConfig;
                    let next = newConfig[index + 1];
                    newConfig[index + 1] = newConfig[index]
                    newConfig[index + 1].Sequence = index + 2

                    next.Sequence = index + 1
                    newConfig[index] = next
                    this.setState({ mappingConfig: newConfig });
                }
                break;
            default:
                break;
        }
    }




    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState(cloneDeep(stateParent))
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['DFM_FROMATTYPE', 'DFM_DATATYPE', 'DFM_REQFIELDTYPE', 'DFM_RESFIELDTYPE']));
        this.props.actions.generalProcess(constants.getFunctionData, {});
        this.props.actions.generalProcess(constants.getMappingConfigByID, this.getRequest());

    }
    formSubmit() {
        if (this.state.mappingConfig.length == 0) {
            alert("There must be at least 1 Mapping Configuration Defination");
            return false;
        }
        let mappingList = cloneDeep(this.state.mappingConfig);
        mappingList.map(function (item) {
            delete item.actions;
            return item;
        });

        let mappingName = document.getElementById('mappingName') == null ? "" : document.getElementById('mappingName').value;
        let requestType = document.getElementById('requestType') == null ? "" : document.getElementById('requestType').value;
        let description = document.getElementById('description') == null ? "" : document.getElementById('description').value;
        if (mappingName.trim() == "") {
            alert("Mapping Name must be defined!");
            return false;
        }

        let requestBody = {
            "mappingName": mappingName,
            "mappingType": requestType,
            "description": description,
            "operation": this.props.mappingName == "NEWMAPPING" ? "insert" : "update",
            "fields": mappingList
        }
        console.log(JSON.stringify(requestBody));
        this.setState({ blockSubmit: true });
        this.props.actions.generalProcess(constants.upsertMappingConfig, requestBody);
    }

    addRow() {
        let IN_FIELD = document.getElementById('IN_FIELD') == null ? "" : document.getElementById('IN_FIELD').value;
        let IN_FIELDVALUE = document.getElementById('IN_FIELDVALUE') == null ? "" : document.getElementById('IN_FIELDVALUE').value;
        let IN_FIELDTYPE = document.getElementById('IN_FIELDTYPE') == null ? "" : document.getElementById('IN_FIELDTYPE').value;
        let IN_FIELDDT = document.getElementById('IN_FIELDDT') == null ? "" : document.getElementById('IN_FIELDDT').value;
        let IN_FIELDFUNCTION = document.getElementById('IN_FIELDFUNCTION') == null ? "" : document.getElementById('IN_FIELDFUNCTION').value;
        let IN_FIELDVALIDATION = document.getElementById('IN_FIELDVALIDATION') == null ? "" : document.getElementById('IN_FIELDVALIDATION').value;
        let IN_FIELDDESCRIPTION = document.getElementById('IN_FIELDDESCRIPTION') == null ? "" : document.getElementById('IN_FIELDDESCRIPTION').value;
        let MAP_FIELD = document.getElementById('MAP_FIELD') == null ? "" : document.getElementById('MAP_FIELD').value;
        let MAP_FIELDDT = document.getElementById('MAP_FIELDDT') == null ? "" : document.getElementById('MAP_FIELDDT').value;
        let Sequence = document.getElementById('Sequence') == null ? 9999 : parseInt(document.getElementById('Sequence').value) || this.state.mappingConfig.length + 1; ;

        
        if (MAP_FIELD.trim() == "") {
            alert("Mapped Field must be defined!");
            return false;
        }

        let IN_ISREQUIRED = $("#IN_ISREQUIRED").is(":checked");
        let rows = this.state.mappingConfig;
        let tupple = {
            "Sequence": Sequence,
            "IN_FIELD": IN_FIELD,
            "IN_FIELD": IN_FIELD,
            "IN_FIELDVALUE": IN_FIELDVALUE,
            "IN_FIELDTYPE": IN_FIELDTYPE,
            "IN_FIELDDT": IN_FIELDDT,
            "IN_FIELDFUNCTION": IN_FIELDFUNCTION,
            "IN_FIELDVALIDATION": IN_FIELDVALIDATION,
            "IN_FIELDDESCRIPTION": IN_FIELDDESCRIPTION,
            "IN_ISREQUIRED": IN_ISREQUIRED ? "Y" : "N",
            "MAP_FIELD": MAP_FIELD,
            "MAP_FIELDDT": MAP_FIELDDT,
            "actions": [
                { label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION" },
                { label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION" },
                { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
                { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
            ]
        }

        let litmus = this.containsObject(tupple, rows)

        if (litmus == false) {
            rows.push(tupple);
            this.setState({ mappingConfig: rows });
            this.clearFields();
        } else {
            alert("Mapping for this field already exist!!")
        }


    }


    containsObject(refObj, list) {

        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            if (
                obj.MAP_FIELD == refObj.MAP_FIELD
            ) {
                return true;
            }
        }

        return false;
    }



    clearFields() {
        $('#customMappingDefination').find('input:text').val('');
        $('#customMappingDefination').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
        document.getElementById('Sequence').value = this.state.mappingConfig.length + 1;
    }


    render() {

        //alert(JSON.stringify(this.state.mappingConfig))
        return (
            <div>
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
                                                        <label className="control-label">{utils.getLabelByID("MAU_RequestName")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" className="form-control" onChange={this.onMappingNameChange} value={this.state.mappingName} id="mappingName" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("MAU_RequestType")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="requestType" name="requestType" onChange={this.onMappingTypeChange} value={this.state.mappingType} className="form-control">
                                                            {this.state.typeData && this.state.typeData.DFM_FROMATTYPE && this.state.typeData.DFM_FROMATTYPE.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value}>{option.label}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
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
                                    <span className="caption-subject">{utils.getLabelByID("customMappingDefination")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="form-body" id="customMappingDefination">

                                    <div className="row">

                                        <div className="col-md-6"
                                            style={{
                                                borderRight: "1px solid #80808026"
                                            }}
                                        >
                                            <div className="row">
                                                <h4 className="text-center"
                                                    style={{ textDecoration: "underline" }}
                                                >{utils.getLabelByID("IncommingField")}</h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Field")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" id="IN_FIELD" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Value")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" id="IN_FIELDVALUE" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Type")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select id="IN_FIELDTYPE" name="IN_FIELDTYPE" onChange={this.onChangeEventName} className="form-control" >
                                                                {this.state.typeData && this.state.typeData.DFM_REQFIELDTYPE && this.state.typeData.DFM_REQFIELDTYPE.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Datatype")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select id="IN_FIELDDT" name="IN_FIELDDT" onChange={this.onChangeEventName} className="form-control" >
                                                                {this.state.typeData && this.state.typeData.DFM_DATATYPE && this.state.typeData.DFM_DATATYPE.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Function")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select id="IN_FIELDFUNCTION" name="IN_FIELDFUNCTION" onChange={this.onChangeEventName} className="form-control" >
                                                                {this.state.functionData && this.state.functionData.custom && this.state.functionData.custom.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Validation")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select id="IN_FIELDVALIDATION" name="IN_FIELDVALIDATION" onChange={this.onChangeEventName} className="form-control" >
                                                                {this.state.functionData && this.state.functionData.validation && this.state.functionData.validation.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Required")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <div className="icheck-list">
                                                                <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                                                    <label></label>
                                                                    <input type="checkbox" className="form-control" name="IN_ISREQUIRED" id="IN_ISREQUIRED" />
                                                                    <input type="number" className="form-control" name="Sequence" id="Sequence" 
                                                                    style={{
                                                                            display: "none"
                                                                        }}
                                                                    />
                                                                    
<span></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Description")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <textarea id="IN_FIELDDESCRIPTION" className="form-control" style={{
                                                                width: "100%",
                                                                height: "10%"
                                                            }}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-md-6">
                                            <div className="row">
                                                <h4 className="text-center"
                                                    style={{ textDecoration: "underline" }}
                                                >{utils.getLabelByID("MappedField")}</h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Field")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" id="MAP_FIELD" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_Datatype")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select id="MAP_FIELDDT" name="MAP_FIELDDT" onChange={this.onChangeEventName} className="form-control" >
                                                                {this.state.typeData && this.state.typeData.DFM_DATATYPE && this.state.typeData.DFM_DATATYPE.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn btn-default" onClick={this.addRow.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Mapping")} </button>
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
                                                            gridColumns={utils.getGridColumnByName("mappingConfig")}
                                                            gridData={this.state.mappingConfig}
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
                                                        <button type="submit" className="btn green" disabled={this.state.blockSubmit} onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Save / Update")} </button>
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

AddUpdateMapping.propTypes = {
    AddUpdateMappingData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        AddUpdateMappingData: state.app.AddUpdateMapping.data,
        typeData: state.app.typeData.data,
        FunctionData: state.app.FunctionData.data,
        mappingName: ownProps.params.mappingName,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
AddUpdateMapping.displayName = "AddUpdateMapping";
export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateMapping);
