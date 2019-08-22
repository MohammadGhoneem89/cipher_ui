import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as generalAction from '../../../../core/actions/generalAction';
import * as utils from '../../../../core/common/utils.js';
import DateRangePicker from '../../../../core/common/DateRangePicker.jsx';
import CommonBarChart from '../../../../core/common/CommonBarChart.jsx';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import * as url from '../../../../core/constants/Communication.js';
import Table from '../../../../core/common//Datatable.jsx';
import { browserHistory } from "react-router";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        const pageSize = 10;
        const currentPageNo = 1;
        const supplierID = ""
        this.supplierData = [];
        this.state = {

            value: '',
            isLoading: true,
            gridDataSupplierList: undefined,
            graphLabels: {
                xaxis: "STATUS",
                yaxis: "SUPPLIER"
            },
            setPagingForSupplier: {
                currentPageNo: undefined,
                pageSize: undefined
            },

            fromDate: new moment().subtract(9, 'days').format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            dashboardPendingGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                supplierID: supplierID
            },
            dashboardCompletedGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                supplierID: supplierID
            },
            dashboardSettlementGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                supplierID: supplierID
            },
            dashboardItemsGridData: {

                "bypassSimu": true,
                "body": {
                    pageData: {
                        currentPageNo: currentPageNo,
                        pageSize: pageSize
                    },
                    "searchCriteria": {
                    }
                }

            },
            suppliers: {
                "bypassSimu": true,
                "body": {
                    "pageData": {
                        "currentPageNo": currentPageNo,
                        "pageSize": pageSize
                    },
                    "searchCriteria": {
                    }
                }
            },
            suppliersMasterList: {
                "bypassSimu": true,
                "body": {
                    "page": {
                        "currentPageNo": 1,
                        "pageSize": 100
                    }
                }
            },
            dashboardSupplierSettlement: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                supplierID: supplierID
            }
        };
        this.transformStatus = this.transformStatus.bind(this);
        this.determineStatus = this.determineStatus.bind(this);
    }
    transformResponse = (getSupplierMasterList) => {
        // console.log(getSupplierMasterList, "LISTSSSSSSSS")
        let transformSupplierMasterList = [];

        if (getSupplierMasterList) {
            // console.log(getSupplierMasterList, "LISTSSSSSSSS")
            getSupplierMasterList.map((item) => {
                transformSupplierMasterList.push({
                    "supplierName": {
                        "name": item.supplierName,
                        "imageURL": item.logo
                    },
                    "supplierCountry": item.supplierCountry,
                    "supplierEndDate": item.supplierEndDate,
                    "supplierID": item.supplierID,
                    "supplierSiteName": item.supplierSiteName

                });

            });

        }

        // console.log("--------------------------------",
        //     transformSupplierMasterList, "UPDATES!!!!!!1111")
        // return transformSupplierMasterList.sort();
        return _.sortBy(transformSupplierMasterList, 'supplierName.name' );
    }


    transformOrderStatus = (item) => {
        if (item) {
            // console.log("data-----" + JSON.stringify(item))
            switch (item.status) {
                case "PO": { item.stage = "Purchase Order"; break; };
                case "QC": { item.stage = "Quality Check"; break; };
                case "ACK": { item.stage = "Acknowledged By Supplier"; break; };
                case "PROD": { item.stage = "Production"; break; };
                case "SUBORDER": { item.stage = "Place Suborder"; break; };
                case "ACK-SUBORDER": { item.stage = "Suborder Acknowledged"; break; };
                case "RECIEVED": { item.stage = "Received By Emirates"; break; };
                case "RECEIVED2": { item.stage = "Received By Supplier"; break; };
                default: { item.stage= item.stage}
            }
        }
        //  console.log("-->>>>>>>>>>>>>>>>>>----",
        //  data, "<-----------transformOrderStatus!!!!!!1111")
        return item.stage;
    }

    componentWillMount() {
        this.getDashboardData();
        this.getSuppliersList();

        window.scrollTo(0, 0);
    }

    componentDidMount() {

        this.timerID = setInterval(() => this.getDashboardData(), 5000);

    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.dashboardPendingGridData && nextProps.suppliers) {
           // console.log(nextProps.data.dashboardPendingGridData, "&&&&&&&&&&&&&&&&&")
            this.setState({
                getSuppliersList: this.transformResponse(nextProps.suppliers),
                getPendingOrders: this.transformStatus(nextProps.data.dashboardPendingGridData.pendingOrderRows),
                getCompletedOrders: this.transformStatus(nextProps.data.dashboardCompletedGridData.completedOrderRows),
                setPagingForSupplier: nextProps.supplierPageDate,
                isLoading: false,
            });
            this.supplierData = this.transformResponse(nextProps.suppliers)
        }
        console.log(this.supplierData, "-------------------SUPPLIER DATA ")
    }



    getDashboardData = (supplier) => {
        this.props.actions.generalProcess(url.cusDashboardData, {
            supplier: supplier || this.state.supplierAddress,
            // user: this.state.user,
            dashboardPendingGridData: this.state.dashboardPendingGridData,
            dashboardCompletedGridData: this.state.dashboardCompletedGridData,
            dashboardSettlementGridData: this.state.dashboardSettlementGridData,
            dashboardItemsGridData: this.state.dashboardItemsGridData,
            suppliers: this.state.suppliers,
            dashboardSupplierSettlement: this.state.dashboardSupplierSettlement
        });
    };

    pageChange = (currentPage, pageName) => {
        let currentGrid = this.state[pageName];
        currentGrid.pageData.currentPageNo = currentPage;
        this.setState({ pageName: currentGrid });
        console.log(pageName, "__________________GRID!!!!")
        // this.props.actions.generalProcess(url.cusDashboardData, {pageName:this.state[pageName]})
        this.getDashboardData();
    };
    supplierChange = (e) => {
        let suppData = this.supplierData.sort();
        
        for (let i in suppData) {
            if (e.target.value == suppData[i].supplierName.name) {
              //  console.log(e.target.value+ "  " +suppData[i].supplierID, " ||||||||||||||||||  traget value ")
                this.onSupplierChange(suppData[i].supplierID)
            }
            else if (e.target.value == 'ALL') {
               // console.log(e.target.value, " ||||||||||||||||||  ALL traget value ")
                this.onSupplierChange(e.target.value);
            }

        }
        this.setState({ value: e.target.value });
        // this.onSupplierChange('8314891')
    };
    onSupplierChange = (currentSupplier) => {
        // alert("onsupplierchange")
        this.setState({ isLoading: true });
        this.state.dashboardPendingGridData.supplierID = currentSupplier;
        this.state.dashboardCompletedGridData.supplierID = currentSupplier;
        this.state.dashboardSettlementGridData.supplierID = currentSupplier;
        this.state.dashboardSupplierSettlement.supplierID = currentSupplier;
        this.getDashboardData();
        console.log(">>>>>>>>", this.state.dashboardPendingGridData.supplierID, "UPDATE ID")
    };
    getLoad = () => {
        this.setState({ isLoading: true });
        this.getDashboardData();
    }
    getSuppliersList = () => {
        this.props.actions.generalProcess(url.getSupplierMasterList,
            this.state.suppliersMasterList);
    };

    transformStatus = (gridData) => {

        let transformOrderList = [];
        if (gridData) {
          //  console.log("gridData   ", gridData)
            gridData.map((order) => {
               // console.log("order   ", order)
                transformOrderList.push({
                    "orderID": order.orderID,
                    "supplierName": order.supplierName,
                    "amount": order.amount,
                    "dateCreated": order.dateCreated,
                    "expectedDate": order.expectedDate,
                    "stage": this.transformOrderStatus(order),
                    "status": this.determineStatus(order),
                    "actions": order.actions,

                });
            });
        }

        //console.log("transform   ", transformOrderList)
        return transformOrderList;
    }

    determineStatus = (order) => {
        //alert(JSON.stringify(order))
        let totalSLATime = 0
        for (let i = 0; i < order.sla.length; i++) {
         //   console.log("order.sla" + order.sla[i])
            totalSLATime += order.sla[i].duration / 1000
        }
       // console.log("total sla " + totalSLATime)

        let actualTime = Math.round((new Date()).getTime() / 1000) - order.dateCreated
        //let actualTime = 1555308812 - order.dateCreated
        //console.log("actualTime: " + actualTime)

        let SLAToCurrent = 0

        if (order.status == "PO") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
           // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "ACK") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
           // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "SUBORDER") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            //console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "ACK-SUBORDER") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
           // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "PROD") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER" || order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
           // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "QC") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
          //  console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "SHIPPED") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC" || order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
          //  console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "RECEIVED1") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC" || order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED" || order.sla[i].fromStage == "SHIPPED" && order.sla[i].toStage == "RECEIVED1") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
           // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "INVOICED" || order.status == "RECEIVED2") {
            SLAToCurrent = totalSLATime
            actualTime = order.invoiceTime - order.dateCreated
           // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (actualTime >= totalSLATime) {
           // console.log(actualTime)
            //console.log(SLAToCurrent)

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

    render() {
        // this.supplierChange("APPAREL FZCO11");
        // this.state.getSupplierMasterList ?
        //     console.log(this.props.suppliers, "000000000000000") : ""
        if (this.state.isLoading)
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>);
        else if (this.props.data.graphData) {
            return (
                <div className="coreDiv">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="daterange_con">
                                <div className="row">
                                    <div className="center-block dashdate">
                                        <div className="col-md-4 padding-top-15">
                                            <DateRangePicker />
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <div className="col-md-12">
                                                <div className="form-group col-md-3"></div>
                                                <div className="form-group col-md-3">
                                                </div>


                                                <div className="form-group col-md-6">
                                                    <select name="supplier" className="form-control" value={this.state.value}
                                                        onChange={this.supplierChange}>
                                                        <option key="-1" onChange={this.supplierChange} >ALL</option>
                                                        {/* <option value="APPAREL FZCO">APPAREL FZCO</option> */}
                                                        {this.state.getSuppliersList.map((option, index) =>
                                                            (<option value={option.supplierName.name}
                                                                key={index}>
                                                                {utils.getLabelByID(option.supplierName.name)}
                                                            </option>))}
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <TileUnit data={this.props.data.dashboardTiles} />
                            </div>
                            {this.state.getSuppliersList && this.props.supplierPageDate &&
                                // console.log()
                                <div className="row">
                                    <div className="col-md-12">

                                        {
                                            this.state.getSuppliersList.map((obj) => {

                                                obj.action = [
                                                    {
                                                        "label": "View",
                                                        "URI": ["/viewSupplier"],
                                                        "params": "_id",
                                                        "iconName": "icon-docs"
                                                    }
                                                ]
                                            })

                                        }
                                        {/* <Table TableClass="portlet light bordered sdg_portlet"
                                            title={utils.getLabelByID("SUPPLIERS")}
                                            gridColumns={utils.getGridColumnByName("supplierMasterList")}
                                            gridData={this.state.getSuppliersList}
                                            totalRecords={this.props.supplierPageDate.totalRecords}
                                            activePage={this.state.suppliers.body.pageData.currentPageNo}
                                            pageSize={this.state.suppliers.body.pageData.pageSize}
                                            pageChanged={(currentPage) => { this.pageChange(currentPage, 'suppliers') }}
                                            export={false}
                                            pagination={true} /> */}
                                    </div>
                                </div>}
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption "><span className="caption-subject " /></div>
                                    <div className="center-block" style={{ width: "500px" }}>
                                        <div className="input-group" id="defaultrange" style={{ display: "inline", marginRight: "10px" }}>
                                            <DateRangePicker onChangeRange={this.dateChangeGraph} />
                                        </div>
                                        <button type="submit" className="btn dash green input-xsmall"
                                            onClick={this.getLoad} >{utils.getLabelByID("Search")}</button>

                                    </div>
                                </div>
                                <div className="row">
                                    {this.props.data.graphData.labels && this.props.data.graphData.legends &&

                                        <CommonBarChart toDate={this.state.toDate}
                                            fromDate={this.state.fromDate}
                                            graphLabels={this.state.graphLabels}
                                            labels={this.props.data.graphData.labels}
                                            chartData={this.props.data.graphData.chartData}
                                            legends={this.props.data.graphData.legends}
                                            firstBarData={this.props.data.graphData.chartData.firstBar}
                                            secondBarData={this.props.data.graphData.chartData.secondBar}

                                        />
                                    }
                                </div>
                            </div>
                            {/* <div className="portlet light bordered sdg_portlet"> */}

                            <div className="row">
                                <div className="col-md-12">
                                    {/* <div className="portlet-title">
                                            <div className="col-md-12">
                                                <div className="form-group col-md-12">
                                                    {/* <div className="btn-toolbar pull-right">
                                                        <button style={{ float: "right", marginBottom: "10px" }} onClick={() => browserHistory.push('/quote/create')} className="btn green">{utils.getLabelByID("Place Quote")}</button>
                                                        <button style={{ float: "right", marginBottom: "10px" }} onClick={() => browserHistory.push('/maQuote/create')} className="btn green">{utils.getLabelByID("MA Order")}</button>
                                                    </div> */}
                                    {/* </div>
                                            </div>
                                        </div> */}
                                    
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Pending Orders")}
                                        gridColumns={utils.getGridColumnByName("pendingQuotes")}
                                        gridData={this.state.getPendingOrders}
                                        totalRecords={this.props.data.dashboardPendingGridData.pageData.totalRecords}
                                        activePage={this.state.dashboardPendingGridData.pageData.currentPageNo}
                                        pageSize={this.state.dashboardPendingGridData.pageData.pageSize}
                                        pageChanged={(currentPage) => {
                                            this.pageChange(currentPage,
                                                'dashboardPendingGridData')
                                        }}
                                        export={false}
                                        pagination={true} />

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Completed Orders")}
                                        gridColumns={utils.getGridColumnByName("completeQuotes")}
                                        gridData={this.state.getCompletedOrders}
                                        totalRecords={this.props.data.dashboardCompletedGridData.pageData.totalRecords}
                                        activePage={this.state.dashboardCompletedGridData.pageData.currentPageNo}
                                        pageSize={this.state.dashboardCompletedGridData.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardCompletedGridData') }}
                                        export={false}
                                        pagination={true} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Settlements")}
                                        gridColumns={utils.getGridColumnByName("settlements")}
                                        gridData={this.props.data.dashboardSettlementGridData.settlementsRows ?
                                            this.props.data.dashboardSettlementGridData.settlementsRows : []}
                                        totalRecords={this.props.data.dashboardSettlementGridData.pageData.totalRecords}
                                        activePage={this.state.dashboardSettlementGridData.pageData.currentPageNo}
                                        pageSize={this.state.dashboardSettlementGridData.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardSettlementGridData') }}
                                        export={false}
                                        pagination={true} />

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Supplier wise Settlement")}
                                        gridColumns={utils.getGridColumnByName("dashboardCustomerSettlement")}
                                        gridData={this.props.data.dashboardSupplierSettlement.supplierWiseSettlementRows ?
                                            this.props.data.dashboardSupplierSettlement.supplierWiseSettlementRows : 0}
                                        totalRecords={this.props.data.dashboardSupplierSettlement.pageData.totalRecords}
                                        activePage={this.state.dashboardSupplierSettlement.pageData.currentPageNo}
                                        pageSize={this.state.dashboardSupplierSettlement.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardSupplierSettlement') }}
                                        export={false}
                                        pagination={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {

    if (state.app.customerDashboardData !== undefined)
        // console.log(state.app.customerDashboardData, "**********DATA");
        return {
            data: state.app.customerDashboardData.data,
            suppliers: state.app.supplierMasterList.searchResult,
            supplierPageDate: state.app.supplierMasterList.pageData,

        };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(generalAction, dispatch) };
}

Dashboard.displayName = "Dashboard";
// Dashboard.display = false;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


