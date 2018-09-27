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
import AuditLogDetail from './AuditLogDetail.jsx';


import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../common/DateControl.jsx'


class AuditLogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, auditLogID: undefined }
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);



    }
    renderPopupBody(dataID) {
        this.setState({ auditLogID: dataID })
    }

    getRequest() {
        let toDate = $("#toDate").find("input").val()
        let fromDate = $("#fromDate").find("input").val()
        let event = (document.getElementById('event') == null || document.getElementById('event') == undefined) ? "" : document.getElementById('event').value;
        let collectionName = document.getElementById('collectionName') == null ? "" : document.getElementById('collectionName').value;
        let ipAddress = document.getElementById('ipAddress') == null ? "" : document.getElementById('ipAddress').value;
        let createdBy = document.getElementById('createdBy') == null ? "" : document.getElementById('createdBy').value;


        var searchCriteria = {
        }

        if (event != "")
            searchCriteria.event = event

        if (collectionName != "")
            searchCriteria.collectionName = collectionName

        if (ipAddress != "")
            searchCriteria.ipAddress = ipAddress

        if (fromDate != "")
            searchCriteria.fromDate = fromDate;

        if (toDate != "")
            searchCriteria.toDate = toDate;

        if (createdBy != "")
            searchCriteria.createdBy = createdBy


        this.setState({ searchFilters: searchCriteria })

        var request = {
            "action": "auditLogList",
            searchCriteria,
            "page": {
                "currentPageNo": 1,//this.state.pageNo ? this.state.pageNo : 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })
        console.log(JSON.stringify(request))


        return request;
    }

    componentWillMount() {

        this.props.actions.generalProcess(constants.getAuditLogListData, this.getRequest());

    }
    searchCallBack(keyWord) {

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Audit_Events', 'Collections']));
    }
    formSubmit() {
        this.props.actions.generalProcess(constants.getAuditLogListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "auditLogList",
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
                    "action": "auditLogList",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getAuditLogListData, request);

        }
    }
    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {
        if (this.props.AuditLogListData.data) {

            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="fa fa-settings"></i> {utils.getLabelByID("AuditLogListFilters")} </div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="auditLogList">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("RA_FromDate")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <DateControl id="fromDate" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("RA_ToDate")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <DateControl id="toDate" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Event")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select name="event" id="event" className="form-control">
                                                        <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                                        {this.props.typeData && this.props.typeData.Audit_Events.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option.value}>{option.label}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label"> {utils.getLabelByID("CollectionName")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select name="collection" id="collectionName" className="form-control">
                                                        <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                                        {this.props.typeData.Collections.map((option, index) => {
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
                                                    <label className="control-label">{utils.getLabelByID("IPAddress")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <input type="text" className="form-control" name="ipAddress" id="ipAddress" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("ActionBy")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <input type="text" className="form-control" name="createdBy" id="createdBy" />
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
                            <Table title={utils.getLabelByID("AuditLogList")}  fontclass="" TableClass="portlet light bordered sdg_portlet" gridColumns={utils.getGridColumnByName("auditLogListData")} gridData={this.props.AuditLogListData.data.searchResult}
                                totalRecords={this.props.AuditLogListData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
                                pagination={true} pageChanged={this.pageChanged} export={false} search={true}
                                renderPopupBody={this.renderPopupBody} activePage={this.state.currentPageNo}
                                searchCriteria={this.state.searchFilters} gridType={"auditLogList"} export={true} />
                        </div>
                    </div>
                    <div className="modal fade in modal-overflow" id="modelWindows" tabIndex="-1" role="basic" aria-hidden="true" style={{ display: "none",paddingTop: "10" }}>
                    <div className="modal-dialog" style={{ width: "1050" }}>
                        <div className="modal-content" style={{ padding: "10px" }}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">{utils.getLabelByID("TLP_Close")}</span></button>
                                <h3 className="modal-title">{utils.getLabelByID("AuditLogDetail")}</h3>
                            </div>

                            {<div className="modal-body" id="popup">
                                <AuditLogDetail auditLogID={this.state.auditLogID} />

                            </div>
                            }
                            
                        </div>
                        </div>
                    </div>
                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

AuditLogList.propTypes = {
    AuditLogListData: PropTypes.object,
    children: PropTypes.object,
    typeData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {


    return {
        AuditLogListData: state.app.auditLogList,
        typeData: state.app.typeData.data
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
AuditLogList.displayName = "Audit_Log";
export default connect(mapStateToProps, mapDispatchToProps)(AuditLogList);
