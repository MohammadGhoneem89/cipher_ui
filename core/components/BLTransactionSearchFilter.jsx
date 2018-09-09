import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from '../common/utils.js';
import { Field } from 'redux-form';
import DateControl from './DateControl.jsx'

class BLTransactionSearchFilter extends React.Component {

    constructor(props, context) {
        super(props, context);
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
        let toDate = $("#toDate").find("input").val()
        let fromDate = $("#fromDate").find("input").val()
        let blockNumber = document.getElementById('blockNumber') == null ? "" : document.getElementById('blockNumber').value;


        var data = {
            "fromDate": fromDate,
            "toDate": toDate,
            "blockNumber": blockNumber
        }
        this.props.formSubmit(data);
    }
    render() {

        let Authorized_Status = [
            {
                "label": "Authorized",
                "value": 'Authorized'
            },
            {
                "label": "Not Authorized",
                "value": 'NotAuthorized'
            }
        ]
        let Refunded_Status = [
            {
                "label": "Refunded",
                "value": true
            },
            {
                "label": "Not Refunded",
                "value": false
            }
        ]

        let Settled_Status = [
            {
                "label": "Settled",
                "value": true
            },
            {
                "label": "Not Settled",
                "value": false
            }
        ]
        let Payment_Status = [
            {
                "label": "Success",
                "value": "SUCCESS"
            },
            {
                "label": "Pending",
                "value": "PENDING"
            },
            {
                "label": "Failed",
                "value": "FAILED"
            }
        ]



        return (
            <div>
                <div className="form-body" name="tranSearchFilters" id="tranSearchFilters">
                     <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("TLPF_FromDate")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div>
                                    <DateControl id="fromDate" defaultValue={this.props.fromDate || ""} dateChange={this.dateChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("TLPF_ToDate")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <DateControl id="toDate" defaultValue={this.props.toDate || ""} dateChange={this.dateChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Block Number</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div>
                                    <input type="text" className="form-control"  value={this.props.blockHeight || ""} name="blockNumber" id="blockNumber" />
                                </div>
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
export default BLTransactionSearchFilter;