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


class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: "", gridData: [], currentPageNo: 1, auditLogID: undefined, pageData: {
                "pageSize": 50,
                "currentPageNo": 1,
                "totalRecords": 0
            }
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.transformResponse = this.transformResponse.bind(this);
        this.determineStatus = this.determineStatus.bind(this);



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
            body: {
                "action": "auditLogList",
                searchCriteria,
                "page": {
                    "currentPageNo": 1,//this.state.pageNo ? this.state.pageNo : 1,
                    "pageSize": 50
                }
            }
        }
        this.setState({ currentPageNo: 1 })
        console.log(JSON.stringify(request))


        return request;
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.getOrderList.pageData && nextProps.getOrderList.searchResult) {
            console.log(nextProps.getOrderList.pageData, " ---------- PAGE DATA ")
            let dap = nextProps.getOrderList.searchResult || [];
            dap.forEach((elem) => {
                let actions = [{
                    "value": "1003",
                    "type": "componentAction",
                    "label": "View",
                    "params": "",
                    "iconName": "icon-docs",
                    "URI": [
                        "/viewOrder/"
                    ]
                }];
                elem.actions = actions;
            })
            // alert(JSON.stringify(dap))

            this.setState({
                gridData: this.transformResponse(dap) || [],

                pageData: nextProps.getOrderList.pageData
            });

        }
    }

    componentWillMount() {

        clearInterval(this.timerID);
        this.props.actions.generalProcess(constants.getOrderList, this.getRequest());

    }


    searchCallBack(keyWord) {

    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.timerID = setInterval(() => this.formSubmit(), 5000);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Audit_Events', 'Collections']));
    }
    formSubmit() {
        this.props.actions.generalProcess(constants.getOrderList, this.getRequest());
    }


    transformResponse = (gridData) => {

        let transformOrderList = [];
        if (gridData) {
            console.log("gridData   ", gridData)
            gridData.map((order) => {
                console.log("order   ", order)
                transformOrderList.push({
                    "dateCreated": order.dateCreated,
                    "orderID": order.orderID,
                    "contractID": order.contractID,
                    "customerID": order.customerID,
                    "requisitionID": order.requistionID,
                    "orderAmount": order.orderAmount,
                    "stage": this.transformOrderStatus(order),
                    "status": this.determineStatus(order),
                    "actions": order.actions,
                });
            })

            transformOrderList.sort(this.sort_by('dateCreated', true, parseInt))
           
        }

        console.log("transform   ", transformOrderList)
        return transformOrderList;
    }

    sort_by(field, reverse, primer) {

        var key = primer ?
            function (x) { return primer(x[field]) } :
            function (x) { return x[field] };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
   

    determineStatus = (order) => {

        let totalSLATime = 0
        for (let i = 0; i < order.sla.length; i++) {
            console.log("order.sla" + order.sla[i])
            totalSLATime += order.sla[i].duration / 1000
        }
        console.log("total sla " + totalSLATime)

        let actualTime = Math.round((new Date()).getTime() / 1000) - order.dateCreated
        //let actualTime = 1555308812 - order.dateCreated
        console.log("actualTime: " + actualTime)

        let SLAToCurrent = 0

        if (order.status == "Purchase Order") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "Acknowledged By Supplier") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "Place Suborder") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "Suborder Acknowledged") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "Production") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER" || order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "Quality Check") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "SHIPPED" || order.status == 'Shipped') {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC" || order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "Received By Supplier") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC" || order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED" || order.sla[i].fromStage == "SHIPPED" && order.sla[i].toStage == "RECEIVED1") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "Invoiced" || order.status == "Received By Emirates" || order.status == "Paid") {
            SLAToCurrent = totalSLATime
            actualTime = order.invoiceTime - order.dateCreated
            console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (actualTime >= totalSLATime) {
            console.log(actualTime)
            console.log(SLAToCurrent)

            let seconds = actualTime - SLAToCurrent

            let d = Math.floor(seconds / (3600 * 24));
            let h = Math.floor(seconds % (3600 * 24) / 3600);
            let m = Math.floor(seconds % 3600 / 60);
            let s = Math.floor(seconds % 60);

            let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
            let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            let mDisplay = ""
            let sDisplay = ""
            if (d <= 0) {
                mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                if (h <= 0) {
                    sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                }
            }


            return {
                value: "Delayed By " + dDisplay + hDisplay + mDisplay + sDisplay,
                type: "ERROR"
            }
        }
        else if (actualTime < totalSLATime) {
            if (actualTime - SLAToCurrent <= 0) {
                return {
                    value: "On Time",
                    type: "SUCCESS"
                }
            }
            else {
                let seconds = actualTime - SLAToCurrent
                let d = Math.floor(seconds / (3600 * 24));
                let h = Math.floor(seconds % (3600 * 24) / 3600);
                let m = Math.floor(seconds % 3600 / 60);
                let s = Math.floor(seconds % 60);

                let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
                let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
                let mDisplay = ""
                let sDisplay = ""
                if (d <= 0) {
                    mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                    if (h <= 0) {
                        sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                    }
                }


                return {
                    value: "Expected Delay By " + dDisplay + hDisplay + mDisplay + sDisplay,
                    type: "WARNING"
                }
            }
        }
    }
    transformOrderStatus = (item) => {
        switch (item.status) {

            case "PO": { item.status = "Purchase Order"; break; };
            case "QC": { item.status = "Quality Check"; break; };
            case "ACK": { item.status = "Acknowledged By Supplier"; break; };
            case "PROD": { item.status = "Production"; break; };
            case "SUBORDER": { item.status = "Place Suborder"; break; };
            case "ACKSUBORDER": { item.status = "Suborder Acknowledged"; break; };
            case "RECIEVED": { item.status = "Received By Supplier"; break; };
            case "RECIEVED1": { 
                console.log("RECIEVED1","------->>>>>")
                item.status = "Received By Supplier"; break; };
            case "RECEIVED2": { item.status = "Received By Emirates"; break; };
            case "PAID": { item.status = "Paid"; break; };
            case "INVOICED": { item.status = "Invoiced"; break; };
            default: return item.status
        }
        return item.status;
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
                            "pageSize": 50
                        }
                    }
                }
            } else {
                var searchCriteria = this.state.searchFilters
                request = {
                    body: {
                        "action": "auditLogList",

                        "page": {
                            "currentPageNo": pageNo,
                            "pageSize": 50
                        }
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getOrderList, request);

        }
    }
    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {
        if (this.props.getOrderList) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="fa fa-settings"></i> {utils.getLabelByID("Order List Filter(s)")} </div>
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
                                                    {"  "}{console.log(this.state.gridData)}
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

                            <Table title={utils.getLabelByID("Orders")} fontclass="" TableClass="portlet light bordered sdg_portlet" gridColumns={utils.getGridColumnByName("orderList")} gridData={this.state.gridData}
                                totalRecords={this.state.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={50}
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

OrderList.propTypes = {
    children: PropTypes.object,
    typeData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {


    return {
        getOrderList: state.app.getOrderList,
        typeData: state.app.typeData.data
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
OrderList.displayName = "Order List";
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
