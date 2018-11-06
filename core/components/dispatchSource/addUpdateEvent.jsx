/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';


/*container specific imports*/
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';



class AddUpdateEventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: "",
            currentPageNo: 1,
            APIPayloadID: undefined,
            selectedDatasource: [],
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
            eventName:""

        }
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

        if (nextProps.selectedDatasource) {

            this.setState({
                selectedDatasource: nextProps.selectedDatasource,
                isActive: nextProps.AddUpdateEventListData.eventData? nextProps.AddUpdateEventListData.eventData.isActive || false :false
            }, () => {
                if (nextProps.selectedDatasource.length > 0) {
                    this.getEventNameList(nextProps.selectedDatasource[0]);
                } else {
                    this.getEventNameList(0);
                }

            });

        }

        if (nextProps.selectedDispatcher) {
            this.setState({
                selectedDispatcher: nextProps.selectedDispatcher,
                selectedDispatcherObj: nextProps.AddUpdateEventListData.eventData? nextProps.AddUpdateEventListData.eventData.dipatcher : null
            });
        }

        if (nextProps.AddUpdateEventListData.eventData) {
            if (!(this.state.rules.length > 0) && nextProps.AddUpdateEventListData.eventData.rule.length && nextProps.AddUpdateEventListData.eventData.rule.length > 0) {
                this.setState({
                    rules: nextProps.AddUpdateEventListData.eventData.rule
                });
            }
            this.setState({
                eventName: nextProps.AddUpdateEventListData.eventData.eventName
            });

        }

    }

    componentWillMount() {

        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['EAU_OPERATOR']));
        this.props.actions.generalProcess(constants.getEventRegistryByID, this.getRequest());

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
    onEventNameChange  = e => {
        this.setState({eventName: e.target.value});
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

    }
    formSubmit() {
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



    clearFields() {
        $('#clear').find('input:text').val('');
        $('#clear').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {

        //alert(this.state.isActive)
        if(this.props.typeData && this.props.typeDataPage)
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
                                                        <input type="text" className="form-control"  onChange={this.onEventNameChange} disabled={this.props.AddUpdateEventListData.eventData ? true : false} value={this.state.eventName} id="eName" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("EAU_Datasource")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="datasource" name="datasource" value={this.state.selectedDatasource} disabled={this.props.AddUpdateEventListData.eventData ? true : false} onChange={this.onChangeDatasource} className="form-control">
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
                                                        <label className="control-label">{utils.getLabelByID("EAU_Dispatcher")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <select id="dispatcher" name="dispatcher" value={this.state.selectedDispatcher} onChange={this.onChangeDispatcher} className="form-control" multiple>

                                                            {this.props.AddUpdateEventListData.dispatcherListAll.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={index}>{option.dispatcherName}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>

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

AddUpdateEventList.propTypes = {
    AddUpdateEventListData: PropTypes.object,
    selectedDatasource: PropTypes.array,
    selectedDispatcher: PropTypes.array,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        AddUpdateEventListData: state.app.AddUpdateEventList.data,
        selectedDatasource: state.app.AddUpdateEventList.data.selectedDatasource,
        selectedDispatcher: state.app.AddUpdateEventList.data.selectedDispatcher,
        typeDataPage: state.app.typeData.data ? state.app.typeData.data.EAU_OPERATOR : [],
        typeData: state.app.typeData.data ? state.app.typeData.data : {},
        eventName: ownProps.params.eventName,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
AddUpdateEventList.displayName = "AddUpdateEventList";
export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateEventList);
