/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';


/*container specific imports*/
import Table from '../../../../core/common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';



import * as constants from '../../../../core/constants/Communication.js';
import * as requestCreator from '../../../../core/common/request.js';
import DateControl from '../../../../core/common/DateControl.jsx'


class subOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: "", 
            gridData: [], currentPageNo: 1, 
            auditLogID: undefined, pageData: {
                "pageSize": 10,
                "currentPageNo": 1,
                "totalRecords": 0
            }
        };
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
        
                "bypassSimu":true,
                "body": {
    	
                    "page": {
                        "currentPageNo": 1,
                        "pageSize": 10
                    },
                    "searchCriteria": {
                        
                    }
                }
            
        }
        this.setState({ currentPageNo: 1 })
        console.log(JSON.stringify(request))


        return request;
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.getSubOrderList.pageData && nextProps.getSubOrderList.searchResult) {
        console.log(nextProps.getSubOrderList.searchResult,"     SUBORDERLIST ---+++++")
            let dap = nextProps.getSubOrderList.searchResult || [];
            dap.forEach((elem) => {
                let actions = [{
                    "value": "1003",
                    "type": "componentAction",
                    "label": "View",
                    "params": "",
                    "iconName": "icon-docs",
                    "URI": [
                        `/viewOrder/${elem.orderID}`
                    ]
                }];
                elem.actions = actions;


                switch (elem.status) {

                    case "PO": { elem.status = "Purchase Order"; break; };
                    case "QC": { elem.status = "Quality Check"; break; };
                    case "ACK": { elem.status = "Acknowledged By Supplier"; break; };
                    case "PROD": { elem.status = "Production"; break; };
                    case "SUBORDER": { elem.status = "Place Suborder"; break; };
                    case "ACK-SUBORDER": { elem.status = "Suborder Acknowledged"; break; };
                    case "SHIPPED": { elem.status = "Shipped"; break; };
                    case "RECIEVED": { elem.status = "Received By Supplier"; break; };
                    case "RECEIVED": { elem.status = "Received By Supplier"; break; };
                    case "RECIEVED1": { elem.status = "Received By Supplier"; break; };
                    case "RECEIVED2": { elem.status = "Received By Emirates"; break; };
                    case "PAID": { elem.status = "Paid"; break; };
                    case "PLACED": { elem.status = "Placed"; break; };
                    case "INVOICED": { elem.status = "Invoiced"; break; };
                    default: return elem.status
                }
                 return elem.status;
            })
            // alert(JSON.stringify(dap))
            this.setState({
                gridData: dap || [],
                pageData: nextProps.getSubOrderList.pageData
            });
        }
    }

    componentWillMount() {

        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());

    }
    searchCallBack(keyWord) {

    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Audit_Events', 'Collections']));
    }
    formSubmit() {
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    body: {
                        "action": "auditLogList",
                        
                        "page": {
                            "currentPageNo": pageNo,
                            "pageSize": 10
                        }
                    }
                }
            } else {
                var searchCriteria = this.state.searchFilters
                request ={
                    body: {
                        "action": "auditLogList",
                        
                        "page": {
                            "currentPageNo": pageNo,
                            "pageSize": 10
                        }
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getSubOrderList, request);

        }
    }
    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {
        if (this.props.getSubOrderList) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="fa fa-settings"></i> {utils.getLabelByID("Sub Order List Filter(s)")} </div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="auditLogList">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("APL_ToDate")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <DateControl id="toDate" />
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
                                                    <label className="control-label">{utils.getLabelByID("Requistion ID")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <input type="text" className="form-control" name="ipAddress" id="ipAddress" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Status")}</label>
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
                            <Table title={utils.getLabelByID("Sub Orders")} fontclass="" TableClass="portlet light bordered sdg_portlet" gridColumns={utils.getGridColumnByName("subOrderList")} gridData={this.state.gridData}
                                totalRecords={this.state.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
                                pagination={true} pageChanged={this.pageChanged} search={true}
                                activePage={this.state.currentPageNo}
                                searchCriteria={this.state.searchFilters} />
                        </div>
                    </div>

                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

subOrderList.propTypes = {
    children: PropTypes.object,
    typeData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {


    return {
        getSubOrderList: state.app.getSubOrderList,
        typeData: state.app.typeData.data
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
subOrderList.displayName = "Sub Order List";
export default connect(mapStateToProps, mapDispatchToProps)(subOrderList);
