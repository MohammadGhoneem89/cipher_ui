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



class AddUpdateDatasource extends React.Component {

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
            eventName: "",

            dataSourceName: "",
            sourceFunction: "",
            filePath: ""

        }
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
        console.log(JSON.stringify(request))
        return request;
    }
    componentWillMount() {
        this.setState({
            fields: [],
            dataSourceName: "",
            sourceFunction: "",
            filePath: ""

        });
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.AddUpdateDatasourceData.dataSourceName) {
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
                    sourceFunction: nextProps.AddUpdateDatasourceData.sourceFunction,
                    filePath: nextProps.AddUpdateDatasourceData.filePath
                });
            }
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
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['DSR_TYPE']));
        this.props.actions.generalProcess(constants.getDataSourceByID, this.getRequest());

    }
    formSubmit() {

        if (this.state.rules.length == 0) {
            alert("source data must be defined!");
            return false;
        }
        let ruleList = this.state.rules.map(function (item) {
            delete item.actions;
            return item;
        });
        let requestBody = {
            "dataSourceName": this.state.dataSourceName,
            "sourceFunction": this.state.sourceFunction,
            "filePath": this.state.filePath,
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
 
    onChangeFunction = e => {
        this.setState({ sourceFunction: e.target.value });
    };

    onChangeFilepath = e => {
        this.setState({ filePath: e.target.value });
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
                                                        <label className="control-label">{utils.getLabelByID("DL_Function")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text" onChange={this.onChangeFunction} className="form-control" value={this.state.sourceFunction} id="sfunc" />

                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">{utils.getLabelByID("DL_FilePath")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <input type="text"  onChange={this.onChangeFilepath} className="form-control" value={this.state.filePath} id="fPath" />

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
                                                                this.props.typeDataPage.map((option, index) => {
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

    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        AddUpdateDatasourceData: state.app.AddUpdateDatasource.data.datasource,
        typeDataPage: state.app.typeData.data ? state.app.typeData.data.DSR_TYPE : [],
        typeData: state.app.typeData.data ? state.app.typeData.data : {},
        datasource: ownProps.params.datasource,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
AddUpdateDatasource.displayName = "AddUpdateDatasource";
export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateDatasource);
