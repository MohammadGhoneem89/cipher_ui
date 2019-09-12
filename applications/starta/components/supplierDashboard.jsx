import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as generalAction from '../../../core/actions/generalAction';
import * as utils from '../../../core/common/utils.js';
import DateRangePicker from '../../../core/common/DateRangePicker.jsx';
import CommonBarChart from '../../../core/common/CommonBarChart.jsx';
import TileUnit from '../../../core/common/tileUnit.jsx';
import * as url from '../../../core/constants/Communication.js';
import Table from '../../../core/common/Datatable.jsx';
import { browserHistory } from "react-router";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        const pageSize = 10;
        const currentPageNo = 1;
        this.state = {

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
                }
            },
            dashboardCompletedGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                }
            },
            dashboardSettlementGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                }
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
                        "currentPageNo": currentPageNo,
                        "pageSize": pageSize
                    },
                    "searchCriteria": {
                        "supplierType": "MAIN"
                    }
                }
            },
            dashboardSupplierSettlement: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                }
            }
        };
    }
    transformResponse = (getSupplierMasterList) => {
        // console.log(getSupplierMasterList, "LISTSSSSSSSS")
        let transformSupplierMasterList = [];

        if (getSupplierMasterList) {
            console.log(getSupplierMasterList, "LISTSSSSSSSS")
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
        return transformSupplierMasterList;
    }

    transformOrderStatus = (data) => {
        if (data) {
            data.forEach(function (item) {
                switch (item.status) {
                    case "PO": { item.status = "Purchase Order"; break; };
                    case "QC": { item.status = "Quality Check"; break; };
                    case "ACK": { item.status = "Acknowledged By Supplier"; break; };
                    case "PROD": { item.status = "Production"; break; };
                    case "SUBORDER": { item.status = "Place Suborder"; break; };
                    case "ACK-SUBORDER": { item.status = "Suborder Acknowledged"; break; };
                    case "RECIEVED": { item.status = "Received By Emirates"; break; };
                    case "RECEIVED2": { item.status = "Received By Supplier"; break; };
                    default:  {item.status}
                }
                
            });
        }
         console.log("-->>>>>>>>>>>>>>>>>>----",
         data, "<-----------transformOrderStatus!!!!!!1111")
        return data;
    }

    componentWillMount() {
        this.getDashboardData();
        this.getSuppliersList();
        window.scrollTo(0, 0);
    }
   componentDidMount() {
    this.timerID = setInterval(() => this.getDashboardData(),5000);
    }
    componentWillUnmount() {
         clearInterval(this.timerID);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.suppliers) {
            console.log(nextProps.data, "&&&&&&&&&&&&&&&&&")
            this.setState({
                getSuppliersList: this.transformResponse(nextProps.suppliers),
                getPendingOrders:this.transformOrderStatus(nextProps.data.dashboardPendingGridData.pendingOrderRows),
                setPagingForSupplier: nextProps.supplierPageDate,
                isLoading: false
            });
        }
    }

    getDashboardData = (supplier) => {
        this.props.actions.generalProcess(url.supDashboardData, {
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
        this.getDashboardData();
    };
    getLoad = () => {
        this.setState({ isLoading: true });
        this.getDashboardData();
    }
    getSuppliersList = () => {
        this.props.actions.generalProcess(url.getSupplierMasterList, this.state.suppliersMasterList);
    };

    onSupplierChange = (e) => {
        this.setState({ isLoading: true });
        this.getDashboardData(e.target.value);
    };

    render() {

        // this.state.getSupplierMasterList ?
        //     console.log(this.state.getSupplierMasterList, "000000000000000") : ""
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
                                        gridData={this.props.data.dashboardPendingGridData.pendingOrderRows ?
                                            this.props.data.dashboardPendingGridData.pendingOrderRows : []}
                                        totalRecords={this.props.data.dashboardPendingGridData.pageData.totalRecords}
                                        activePage={this.state.dashboardPendingGridData.pageData.currentPageNo}
                                        pageSize={this.state.dashboardPendingGridData.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardPendingGridData') }}
                                        export={false}
                                        pagination={true} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Completed Orders")}
                                        gridColumns={utils.getGridColumnByName("completeQuotes")}
                                        gridData={this.props.data.dashboardCompletedGridData.completedOrderRows ?
                                            this.props.data.dashboardCompletedGridData.completedOrderRows : []}
                                        totalRecords={this.props.data.dashboardCompletedGridData.pageData.totalRecords}
                                        activePage={this.state.dashboardCompletedGridData.pageData.currentPageNo}
                                        pageSize={this.state.dashboardCompletedGridData.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardCompletedGridData') }}
                                        export={false}
                                        pagination={true} />
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-12">
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Settlements")}
                                        gridColumns={utils.getGridColumnByName("settlements")}
                                        gridData={this.props.data.dashboardSettlementGridData.settlementsRows}
                                        totalRecords={this.props.data.dashboardSettlementGridData.pageData.totalRecords}
                                        activePage={this.state.dashboardSettlementGridData.pageData.currentPageNo}
                                        pageSize={this.state.dashboardSettlementGridData.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardSettlementGridData') }}
                                        export={false}
                                        pagination={true} />
                                </div>
                            </div> */}

                            <div className="row">
                                <div className="col-md-12">
                                    <Table TableClass="portlet light bordered sdg_portlet"
                                        title={utils.getLabelByID("Supplier wise Settlement")}
                                        gridColumns={utils.getGridColumnByName("dashboardSupplierSettlement")}
                                        gridData={this.props.data.dashboardSupplierSettlement.supplierWiseSettlementRows ?
                                            this.props.data.dashboardSupplierSettlement.supplierWiseSettlementRows :[]}
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

    if (state.app.supDashboardData !== undefined)
        console.log(state.app.supDashboardData, "**********DATA");
    return {
        data: state.app.supDashboardData.data,
        suppliers: state.app.supplierMasterList.searchResult,
        supplierPageDate: state.app.supplierMasterList.pageData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(generalAction, dispatch) };
}

Dashboard.displayName = "Dashboard";
// Dashboard.display = false;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


