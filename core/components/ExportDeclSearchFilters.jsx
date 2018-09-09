import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from '../common/utils.js';
import { Field } from 'redux-form';
import DateControl from './DateControl.jsx'
import config from '../../config.js'
import * as dates from '../common/dates.js';


class ExportDeclSearchFilters extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: undefined,
            showAdvanceCriteria: false
        };
        this.showAdvance = this.showAdvance.bind(this);
        this.showBasic = this.showBasic.bind(this);
        this.getparticipantByType = this.getparticipantByType.bind(this);


    }
    componentDidMount() {

        /*  if(sessionStorage.tranSearchFilter !=undefined)
          {
              let searchFilter = sessionStorage.tranSearchFilter;
  
              alert(JSON.stringify(searchFilter))
              document.getElementById('degRefNo').value =  searchFilter.degRefNo || ''
  
  
          }*/
    }

    componentWillMount() {

    }
    clearFields() {
        $('#tranSearchFilters').find('input:text').val('');
        $('#tranSearchFilters').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }
    dateChange(value) {

    }
    formSubmit() {
        let declarationNumber = document.getElementById('declarationNumber') == null ? "" : document.getElementById('declarationNumber').value;
        let declarationType = document.getElementById('declarationType') == null ? "" : document.getElementById('declarationType').value;
        let exporter = document.getElementById('exporterName') == null ? "" : document.getElementById('exporterName').value;
        let exporterCountry = document.getElementById('exporterCountry') == null ? "" : document.getElementById('exporterCountry').value;
        let portOfDischarge = document.getElementById('portOfDischarge') == null ? "" : document.getElementById('portOfDischarge').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;

        var data = {
            "declarationNumber": declarationNumber,
            "declarationType": declarationType,
            "exporterName": exporter,
            "exporterCountry": exporterCountry,
            "portOfDischarge": portOfDischarge,
            "status": status,
        }
        this.props.formSubmit(data);
    }
    showAdvance() {
        this.setState({ showAdvanceCriteria: true })
    }
    showBasic() {
        this.setState({ showAdvanceCriteria: false })
    }
    getparticipantByType(type) {


        let list = []
        if (this.props.participantList.rows) {
            for (let rowCount = 0; rowCount < this.props.participantList.rows.length; rowCount++) {
                if (type == this.props.participantList.rows[rowCount].type) {
                    let listItem = {
                        "label": this.props.participantList.rows[rowCount].name,
                        "value": this.props.participantList.rows[rowCount].address,
                    }
                    list.push(listItem);
                }
            }
        }
        return list;
    }
    render() {

        return (
            <div>
                <div className="form-body" name="tranSearchFilters" id="tranSearchFilters">
                    {this.state.error && <div className="alert alert-danger" style={{ textAlign: "center" }}>
                        <strong>Error!</strong> {this.state.error} </div>}
                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{"Declaration No"}</label>
                            </div>

                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="declarationNumber" id="declarationNumber" />
                            </div>


                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{"Declaration Type"}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="declarationType" id="declarationType" className="form-control">
                                    <option value={""}>SELECT</option>
                                    {this.props.typeData.declarationType.map((option, index) => {
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
                                <label className="control-label">{"Exporter"}</label>
                            </div>

                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="exporterName" id="exporterName" />
                            </div>


                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{"Exporter Country"}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="exporterCountry" id="exporterCountry" className="form-control">
                                    <option value={""}>SELECT</option>
                                    {this.props.typeData.countryList.map((option, index) => {
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
                                <label className="control-label">{"Port of Discharge"}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="portOfDischarge" id="portOfDischarge" className="form-control">
                                    <option value={""}>SELECT</option>
                                    {this.getparticipantByType("Port").map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{"Status"}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="status" id="status" className="form-control">
                                    <option value={""}>SELECT</option>
                                    {this.props.typeData.exportDeclarationStatus.map((option, index) => {
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
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                    {"  "}
                                    <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                    </div>
                </div>
            </div >
        );

    }
}
export default ExportDeclSearchFilters;