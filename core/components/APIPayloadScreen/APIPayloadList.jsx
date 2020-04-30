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
import APIPayloadDetail from './APIPayloadDetail.jsx';
import * as constants from '../../constants/Communication.js';
import DateControl from '../../common/DateControl.jsx'


class APIPayloadList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, APIPayloadID: undefined }
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);



    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }

    getRequest() {
        let toDate = $("#toDate").find("input").val()
        let fromDate = $("#fromDate").find("input").val()
        let uuid = (document.getElementById('uuid') == null || document.getElementById('uuid') == undefined) ? "" : document.getElementById('uuid').value;
        let channel = document.getElementById('channel') == null ? "" : document.getElementById('channel').value;
        let action = document.getElementById('action') == null ? "" : document.getElementById('action').value;
        let payloadField = document.getElementById('payloadField') == null ? "" : document.getElementById('payloadField').value;
        let payloadFieldValue = document.getElementById('payloadFieldValue') == null ? "" : document.getElementById('payloadFieldValue').value;

        var searchCriteria = {
        }

        if (uuid != "")
            searchCriteria.uuid = uuid

        if (channel != "")
            searchCriteria.channel = channel

        if (action != "")
            searchCriteria.action = action

        if (fromDate != "")
            searchCriteria.fromDate = fromDate;

        if (payloadField != "" || this.props.payLoadField)
            searchCriteria.payloadField = (payloadField == undefined || payloadField == '') ? this.props.payLoadField : payloadField;

        if (payloadFieldValue != "" || this.props.payLoadFieldValue)
            searchCriteria.payloadFieldValue = (payloadFieldValue == undefined || payloadFieldValue == '') ? this.props.payLoadFieldValue : payloadFieldValue;


        this.setState({ searchFilters: searchCriteria })

        var request = {
            "action": "APIPayLoadList",
            searchCriteria,
            "page": {
                "currentPageNo": 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })
        console.log(JSON.stringify(request))


        return request;
    }

    componentWillMount() {

        this.props.actions.generalProcess(constants.getAPIPayLoadListData, this.getRequest());
        try {
            if (this.props.payLoadField)
                document.getElementById('payloadField').value = this.props.payLoadField
            if (this.props.payLoadFieldValue)
                document.getElementById('payloadFieldValue').value = this.props.payLoadFieldValue
        }
        catch (ex) {

        }

    }
    searchCallBack(keyWord) {

    }
    componentDidMount() {
        window.scrollTo(0, 0);

    }
    formSubmit() {
        this.props.actions.generalProcess(constants.getAPIPayLoadListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "APIPayloadList",
                    "searchCriteria": {
                    },
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            } else {
                var searchCriteria = this.state.searchFilters
                request = {
                    "action": "APIPayloadList",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getAPIPayLoadListData, request);

        }
    }
    clearFields() {
        $('#APIPayloadList').find('input:text').val('');
        $('#APIPayloadList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {
        if (this.props.APIPayloadListData.data) {
            return (
              <div>
                  <div className="row">
                      <div className="col-md-12 ">
                          <div className="portlet light bordered sdg_portlet">
                              <div className="portlet-title">
                                  <div className="caption">
                                      <i className="fa fa-settings"></i>{"API Payload List Filters"}</div>
                                  <div className="tools">
                                      <a href="javascript:;" className="collapse" data-original-title title> </a>
                                  </div>
                              </div>
                              <div className="portlet-body">
                                  <div className="form-body" id="APIPayloadList">
                                      <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_FromDate")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <DateControl id="fromDate" />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_ToDate")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <DateControl id="toDate" />
                                              </div>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_UUID")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <input type="text" className="form-control" name="uuid" id="uuid" />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_Channel")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <input type="text" className="form-control" name="channel" id="channel" />
                                              </div>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_PayloadField")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <input type="text" className="form-control" name="payloadField" id="payloadField" />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_PayloadFieldValue")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <input type="text" className="form-control" name="payloadFieldValue" id="payloadFieldValue" />
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row">
                                          <div className="col-md-6">
                                              <div className="form-group col-md-4">
                                                  <label className="control-label">{utils.getLabelByID("APL_Action")}</label>
                                              </div>
                                              <div className="form-group col-md-8">
                                                  <input type="text" className="form-control" name="action" id="action" />
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row">
                                          <div className="col-md-12">
                                              <div className="pull-right">
                                                  <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                  {"  "}
                                                  <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <Table title="API Payload List" fontclass="" TableClass="portlet light bordered sdg_portlet" gridColumns={utils.getGridColumnByName("APIPayloadListData")} gridData={this.props.APIPayloadListData.data.searchResult}
                                 totalRecords={this.props.APIPayloadListData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
                                 pagination={true} pageChanged={this.pageChanged} export={false} search={true}
                                 renderPopupBody={this.renderPopupBody} activePage={this.state.currentPageNo} />
                      </div>
                  </div>
                  <div className="modal fade in modal-overflow" id="modelWindows" tabindex="-1" role="basic" aria-hidden="true" style={{ display: "none",  paddingTop: "10" }}>
                      <div className="modal-dialog" style={{ width: "1050" }}>
                          <div className="modal-content" style={{ padding: "10px" }}>
                              <div className="modal-header">
                                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">{utils.getLabelByID("TLP_Close")}</span></button>
                                  <h3 className="modal-title">{"API Payload Detail"}</h3>
                              </div>

                              {<div className="modal-body" id="popup">
                                  <APIPayloadDetail APIPayloadID={this.state.APIPayloadID} />

                              </div>
                              }

                          </div>
                      </div>
                  </div>

              </div>
            );

        }
        else
            return (<div className="loader">Loading...</div>)
    }
}

APIPayloadList.propTypes = {
    APIPayloadListData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {


    return {
        APIPayloadListData: state.app.APIPayLoadList,
        payLoadField: ownProps.params.payLoadField,
        payLoadFieldValue: ownProps.params.payLoadFieldValue,

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
APIPayloadList.displayName = "API Payload List";
export default connect(mapStateToProps, mapDispatchToProps)(APIPayloadList);