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
    searchFilters: "",
    currentPageNo: 1,
    APIPayloadID: undefined,
    selectedDatasource: [],
    EventDispatcherTypeList: undefined,
    EventDispatcherDetails: {
        "dispatcherName": "",
        "dispatchFunction": "",
        "filePath": "",
        "groupName": "",
        "requestBody": "",
        "requestHeader": "",
        "requestURL": "",
        "templateId": "",
        "type": ""
    },
    selectedDispatcher: [],
    selectedDatasourceObj: [],
    selectedDispatcherObj: [],
    eventNames: [],
    fields: [],
    rules: [],
    selectedDSObject: {},
    selectedField: -1,
    selectedEventNameID: -1,
    isActive: false,
    eventName: "",
    blockSubmit: true,
    isLoading: true
}

class AddUpdateEventList extends React.Component {

    constructor(props) {
        super(props);

        this.state = cloneDeep(stateParent)
        this.ActionHandlers = this.ActionHandlers.bind(this);

        this.addRow = this.addRow.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.onChangeIsActive = this.onChangeIsActive.bind(this)
        this.onEventNameChange = this.onEventNameChange.bind(this)


    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }

    getRequest() {

        var request = {
            "eventName": this.props.eventName
        }
        console.log(JSON.stringify(request))
        return request;
    }
    componentWillReceiveProps(nextProps) {

        if (this.props.eventName !== "NEWEVENT") {

            if (nextProps.selectedDatasource) {

                this.setState({
                    selectedDatasource: nextProps.selectedDatasource,
                    isActive: nextProps.AddUpdateEventListData.eventData ? nextProps.AddUpdateEventListData.eventData.isActive || false : false
                }, () => {
                    if (nextProps.selectedDatasource.length > 0) {
                        this.getEventNameList(nextProps.selectedDatasource[0]);
                    } else {
                        this.getEventNameList(0);
                    }

                });

            }

            if (nextProps.selectedDispatcher) {
                let dispatchData = nextProps.AddUpdateEventListData.eventData ? nextProps.AddUpdateEventListData.eventData.dipatcher : [];
                dispatchData.forEach((elem) => {
                    elem.actions = [
                        { label: "Edit", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
                        { label: "Remove", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
                    ]
                });
                this.setState({
                    selectedDispatcher: nextProps.selectedDispatcher,
                    selectedDispatcherObj: dispatchData
                });
            }


            if (nextProps.AddUpdateEventListData.eventData) {
                if (nextProps.AddUpdateEventListData.eventData.rule && nextProps.AddUpdateEventListData.eventData.rule.length && nextProps.AddUpdateEventListData.eventData.rule.length > 0) {
                    let rulelist = nextProps.AddUpdateEventListData.eventData.rule
                    rulelist.forEach((item) => {
                        item.actions = [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    })
                    this.setState({
                        rules: rulelist
                    });
                }
                this.setState({
                    eventName: nextProps.AddUpdateEventListData.eventData.eventName
                });

            }
        } else {
            //alert("test")
            this.setState(cloneDeep(stateParent))
        }


        if (nextProps.EventDispatcherTypeList.data) {
            this.setState({
                EventDispatcherTypeList: nextProps.EventDispatcherTypeList.data
            }, () => {
                if (this.state.typeData) {
                    this.setState({ isLoading: false })
                }
            });
        }
        if (nextProps.typeData.data) {
            this.setState({
                typeData: nextProps.typeData.data
            }, () => {
                if (this.state.EventDispatcherTypeList) {
                    this.setState({ isLoading: false })
                }
            });
        }

        this.setState({ blockSubmit: false })

    }

    componentWillMount() {
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
            case "Edit":
                if (index > -1) {
                    let data = this.state.selectedDispatcherObj;
                    let details = _.cloneDeep(data[index])
                    data.splice(index, 1);
                    this.setState({ EventDispatcherDetails: details, selectedDispatcherObj: data });
                }
                break;
            case "Remove":
                if (index > -1) {
                    let data = this.state.selectedDispatcherObj;
                    data.splice(index, 1);
                    this.setState({ selectedDispatcherObj: data });
                }
                break;
        }
    }
    onChangeDatasource = e => {
        var options = e.target.options;
        var value = [];
        let selectedVal = 0
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                let ds = this.props.AddUpdateEventListData.datasourceListAll[options[i].value]
                value.push(options[i].value);
                selectedVal = options[i].value;

            }
        }
        console.log(value)
        this.setState({ selectedDatasource: value }, () => {
            this.getEventNameList(selectedVal);
        });
    };
    onChangeIsActive = e => {
        let activeStatus = $("#isActive").is(":checked");
        this.setState({ isActive: activeStatus });
    };
    onEventNameChange = e => {
        this.setState({ eventName: e.target.value });
    }
    onChangeDispatcher = e => {
        var options = e.target.options;
        var value = [];
        var selectedDispatchers = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
                let disp = this.props.AddUpdateEventListData.dispatcherListAll[options[i].value]
                selectedDispatchers.push(disp);
            }
        }

        this.setState({ selectedDispatcher: value, selectedDispatcherObj: selectedDispatchers });
    };
    onChangeFieldName = e => {
        this.setState({ selectedField: e.target.value });
    };
    onChangeEventName = e => {
        this.getFields(e.target.value)
    };
    getEventNameList(index) {
        let ds = this.props.AddUpdateEventListData.datasourceListAll[index]
        if (ds && ds.sourceDataDefination.length > 0) {
            let eventNameList = [];
            for (let j = 0; j < ds.sourceDataDefination.length; j++) {
                eventNameList.push({ "value": j, "text": ds.sourceDataDefination[j].eventName });
            }
            this.setState({
                selectedDSObject: ds,
                selectedDatasourceObj: [ds]
            }, () => {
                this.getFields(0);
            });
            this.setState({
                eventNames: eventNameList
            });

        }
    }
    getFieldMarkup() {
        if (this.state.selectedField >= 0) {
            let ds = this.state.selectedDSObject.sourceDataDefination[this.state.selectedEventNameID];
            if (ds && ds.dataJsonStructure.length > 0) {
                let selectedField = ds.dataJsonStructure[this.state.selectedField];
                switch (selectedField.type) {
                    case "integer":
                        return (
                            <div>
                                <input type="number" min={selectedField.minValue} max={selectedField.maxValue} className="form-control" name="dVal" id="dVal" />
                            </div>
                        );
                        break;
                    case "string":
                        return (
                            <div>
                                <input type="text" className="form-control" name="dVal" id="dVal" />
                            </div>
                        );
                        break;
                    /*  case "typeData":
                          this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest([selectedField.typeData]));
                          
                          return (
                              <div> 
                                  {
                                      this.props.typeData && this.props.typeData[selectedField.typeData]&&
                                      <select id="dVal" name="dVal" className="form-control">
                                          {this.props.typeData[selectedField.typeData].map((option, index) => {
                                              return (
                                                  <option key={index} value={option.value}>{option.label}</option>
                                              );
                                      })}
                                  </select>
                                  }
                              </div>
                          );
                          break;*/
                    case "boolean":
                        return (



                            <div className="icheck-list">
                                <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "10px" }}>
                                    <label></label>
                                    <input type="checkbox" className="form-control" name="dVal" id="dVal" />
                                    <span></span>
                                </label>
                            </div>
                        );
                        break;
                }


                console.log(selectedField);
            }
        }
    }
    getFields(index) {
        let fieldsList = []
        if (this.state.selectedDSObject) {
            let ds = this.state.selectedDSObject.sourceDataDefination[index];

            if (ds && ds.dataJsonStructure.length > 0) {
                for (let i = 0; i < ds.dataJsonStructure.length; i++) {
                    fieldsList.push({ "value": i, "text": ds.dataJsonStructure[i].fieldName, "type": ds.dataJsonStructure[i].type });
                }

            }

            this.setState({ fields: fieldsList, selectedField: 0, selectedEventNameID: index });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getDispatcherMeta);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['EAU_OPERATOR', 'dispatchType']));
        this.props.actions.generalProcess(constants.getEventRegistryByID, this.getRequest());

    }
    formSubmit() {
        if (this.state.rules.length == 0) {
            alert("Rule data must be defined!");
            return false;
        }
        let activeStatus = $("#isActive").is(":checked");
        let ruleList = this.state.rules.map(function (item) {
            delete item.actions;
            return item;
        });
        let requestBody = {
            "eventName": this.state.eventName,
            "dataSource": this.state.selectedDatasourceObj,
            "dipatcher": this.state.selectedDispatcherObj,
            "rule": ruleList,
            "isActive": activeStatus
        }
        console.log(JSON.stringify(requestBody));
        this.setState({ blockSubmit: true });
        this.props.actions.generalProcess(constants.upsertEventsList, requestBody);
    }

    addRow() {
        let selectedField = this.state.fields[this.state.selectedField];
        let value = '';
        if (selectedField.type == "boolean") {
            let ischkd = $("#dVal").is(":checked");
            value = (ischkd === true ? "true" : "false");
        } else {
            value = document.getElementById('dVal') == null ? "" : document.getElementById('dVal').value;
        }
        let op = document.getElementById('op') == null ? "" : document.getElementById('op').value;
        let fieldName = document.getElementById('fieldName') == null ? "" : document.getElementById('fieldName').value;
        let eventName = document.getElementById('eventName') == null ? "" : document.getElementById('eventName').value;

        if (!value) {
            alert("value must be Defined");
        } else {
            let ds = this.state.selectedDSObject.sourceDataDefination[this.state.selectedEventNameID];
            let selectedField = ds.dataJsonStructure[this.state.selectedField];

            let rows = this.state.rules


            let tupple = {
                "value": value,
                "operator": op,
                "field": selectedField.fieldName,
                "sourceEvent": ds.eventName,
                "type": selectedField.type,
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
                obj.operator == refObj.operator &&
                obj.field == refObj.field &&
                obj.eventName == refObj.eventName
            ) {
                return true;
            }
        }

        return false;
    }

    addDispatcher() {
        let data = cloneDeep(this.state.EventDispatcherDetails);
        if (data.dispatcherName.trim() == "") {
            alert("Dispatcher Name must be defined");
            return false;
        }

        if (data.type == "API" && data.requestURL.trim() == "") {
            alert("Request URL must be defined");
            return false;
        }

        if (data.type == "CUSTOM" && (data.filePath.trim() == "" || data.dispatchFunction.trim() == "")) {
            alert("filePath & dispatchFunction must be defined");
            return false;
        }

        if (data.type == "EMAIL" && (data.templateId.trim() == "" || data.groupName.trim() == "")) {
            alert("template & groupName must be defined");
            return false;
        }

        if (data.requestBody != "") {
            try {
                JSON.parse(data.requestBody)
            } catch (ex) {
                alert("Request Body must be a valid JSON!");
                return false;
            }
        }
        if (data.requestHeader != "") {
            try {
                JSON.parse(data.requestHeader)
            } catch (ex) {
                alert("Request Header must be a valid JSON!");
                return false;
            }
        }
        data.actions=[
            { label: "Edit", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
            { label: "Remove", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
        ]
        let newlist=this.state.selectedDispatcherObj;
        newlist.push(data);
        this.setState({selectedDispatcherObj:newlist,EventDispatcherDetails:_.cloneDeep(stateParent.EventDispatcherDetails)})
        
    }

    onInputChange = (e) => {

        let value;
        if (e.target.name.indexOf('is') === 0) {
            value = $("#" + e.target.name).is(":checked");
        } else {
            value = e.target.value;
        }
        this.state.EventDispatcherDetails[e.target.name] = value;
        this.setState({
            [e.target.name]: value
        })
    };


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
                                    <span className="caption-subject">{utils.getLabelByID("AddUpdateEventListFilters")}</span></div>
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
                                                        <label className="control-label">{utils.getLabelByID("EAU_EventName")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" className="form-control" onChange={this.onEventNameChange} disabled={this.props.AddUpdateEventListData.eventData ? true : false} value={this.state.eventName} id="eName" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_Datasource")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">

                                                        <select id="datasource" name="datasource" value={this.state.selectedDatasource} disabled={this.props.AddUpdateEventListData.eventData ? true : false} onChange={this.onChangeDatasource} className="form-control">
                                                            <option value="">--select--</option>
                                                            {this.props.AddUpdateEventListData.datasourceListAll.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={index}>{option.dataSourceName}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_isActive")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <div className="icheck-list">
                                                            <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "10px" }}>
                                                                <label></label>
                                                                <input type="checkbox" onChange={this.onChangeIsActive} className="form-control" checked={this.state.isActive} name="isActive" id="isActive" />
                                                                <span></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row" >
                                                <label className="form-group control-label col-md-7 bold" style={{
                                                    textAlign: "left",
                                                    marginLeft: "6px"
                                                }}>{utils.getLabelByID("dispatcherDefination")}</label>

                                            </div>

                                            <div className="row"  >
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DC_type")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select name="type" defaultValue={this.state.EventDispatcherDetails.type} onChange={this.onInputChange} className="form-control">
                                                        <option value="">--select--</option>
                                                            {
                                                                this.state.typeData.dispatchType.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_dispatcherName")}</label>
                                                        <div className="form-group col-md-8">
                                                            {/* {console.log(initialValues)} */}
                                                            <input type="text" className="form-control" name="dispatcherName" onChange={this.onInputChange} disabled={this.state.isEdit} value={this.state.EventDispatcherDetails.dispatcherName} />
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="row" style={{ display: this.state.EventDispatcherDetails.type !== "CUSTOM" ? 'none' : 'block' }}>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_filePath")}</label>
                                                        <div className="form-group col-md-8">
                                                            {/* {console.log(initialValues)} */}
                                                            <input type="text" className="form-control" name="filePath" onChange={this.onInputChange} value={this.state.EventDispatcherDetails.filePath} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_dispatchFunction")}</label>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="dispatchFunction" onChange={this.onInputChange} value={this.state.EventDispatcherDetails.dispatchFunction} />

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="row" style={{ display: this.state.EventDispatcherDetails.type !== "EMAIL" ? 'none' : 'block' }}>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_groupName")}</label>
                                                        <div className="form-group col-md-8">
                                                            <select name="groupName" value={this.state.EventDispatcherDetails.groupName} onChange={this.onInputChange} className="form-control">
                                                                <option value="">--Select--</option>
                                                                {this.state.EventDispatcherTypeList.group &&
                                                                    this.state.EventDispatcherTypeList.group.map((option, index) => {
                                                                        return (
                                                                            <option key={index} value={option.value}>{option.label}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_emailTemplate")}</label>
                                                        <div className="form-group col-md-8">
                                                            <select name="templateId" value={this.state.EventDispatcherDetails.templateId} onChange={this.onInputChange} className="form-control">
                                                                <option value="">--Select--</option>
                                                                {this.state.EventDispatcherTypeList.emailTemplate &&
                                                                    this.state.EventDispatcherTypeList.emailTemplate.map((option, index) => {
                                                                        return (
                                                                            <option key={index} value={option.value}>{option.label}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div style={{ display: this.state.EventDispatcherDetails.type !== "API" ? 'none' : 'block' }}>
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_requestURL")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="text" className="form-control" name="requestURL" onChange={this.onInputChange} value={this.state.EventDispatcherDetails.requestURL} />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_requestHeader")}</label>
                                                            <div className="form-group col-md-8">
                                                                <textarea onChange={this.onInputChange} name="requestHeader" value={this.state.EventDispatcherDetails.requestHeader} className="form-control" rows="4" style={{ resize: "none", width: "100%" }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_requestBody")}</label>
                                                            <div className="form-group col-md-8">
                                                                <textarea onChange={this.onInputChange} name="requestBody" value={this.state.EventDispatcherDetails.requestBody} className="form-control" rows="4" style={{ resize: "none", width: "100%" }} />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn btn-default" onClick={this.addDispatcher.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Dispatcher")} </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="col-md-12">
                                                        <Table
                                                            gridColumns={utils.getGridColumnByName("dispatchListData")}
                                                            gridData={this.state.selectedDispatcherObj}
                                                            export={false}
                                                            componentFunction={this.ActionHandlers}
                                                            pagination={false} />
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
                                    <span className="caption-subject">{utils.getLabelByID("AddUpdateDataEventsRules")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="form-body" id="AddUpdateEventList">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_EventTemplate")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="eventName" name="eventName" onChange={this.onChangeEventName} className="form-control" >

                                                            {this.state.eventNames.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value}>{option.text}</option>
                                                                );
                                                            })}

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-md-4">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_TemplateFields")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="fieldname" name="fieldname" onChange={this.onChangeFieldName} className="form-control">
                                                            {
                                                                this.state.fields.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.text}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_Operator")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="op" name="op" className="form-control">
                                                            {this.props.typeDataPage.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value}>{option.label}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_Value")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        {this.getFieldMarkup()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            </div>
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn btn-default" onClick={this.addRow.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Rule")} </button>
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
                                                            gridColumns={utils.getGridColumnByName("EventRules")}
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

AddUpdateEventList.propTypes = {
    AddUpdateEventListData: PropTypes.object,
    selectedDatasource: PropTypes.array,
    selectedDispatcher: PropTypes.array,
    typeData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        AddUpdateEventListData: state.app.AddUpdateEventList.data,
        selectedDatasource: state.app.AddUpdateEventList.data.selectedDatasource,
        selectedDispatcher: state.app.AddUpdateEventList.data.selectedDispatcher,
        typeData: state.app.typeData,
        eventName: ownProps.params.eventName,
        typeDataPage: state.app.typeData.data ? (state.app.typeData.data.EAU_OPERATOR ? state.app.typeData.data.EAU_OPERATOR : []) : [],
        EventDispatcherTypeList: state.app.EventDispatcherTypeList,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
AddUpdateEventList.displayName = "AddUpdateEventList";
export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateEventList);
