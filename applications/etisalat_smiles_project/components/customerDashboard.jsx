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
import * as requestCreator from '../../../core/common/request.js';
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        const pageSize = 10;
        const currentPageNo = 1;
        const customerID = ""
        this.supplierData = [];
        this.state = {

            value: '',
            isLoading: true,
            gridDataSupplierList: undefined,
            graphLabels: {
                xaxis: "STATUS",
                yaxis: "CUSTOMER"
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
                customerID: customerID
            },
            dashboardCompletedGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                customerID: customerID
            },
            dashboardSettlementGridData: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                customerID: customerID
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
            dashboardCustomerSettlement: {
                pageData: {
                    currentPageNo: currentPageNo,
                    pageSize: pageSize
                },
                customerID: customerID
            }
        };
    }


    componentWillMount() {
        this.getDashboardData("");


        window.scrollTo(0, 0);
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.dashboardPendingGridData) {
            console.log(nextProps.data.graphData, "&&&&&&&&&&&&&&&&&")
            this.setState({
                getSuppliersList: nextProps.suppliers,
                getPendingOrders: nextProps.data.dashboardPendingGridData.pendingOrderRows,
                getCompletedOrders: nextProps.data.dashboardCompletedGridData.completedOrderRows,
              //  settlement: nextProps.data.dashboardSettlementGridData.settlementsRows,
                customerWiseSettlement: nextProps.data.dashboardCustomerSettlement.customerWiseSettlement,
                setPagingForSupplier: nextProps.supplierPageDate,
                graphData: nextProps.data.graphData,
                isLoading: false,
            });
        }
    }



    getDashboardData = (supplier) => {
        this.props.actions.generalProcess(url.customerDashboard, {
            // user: this.state.user,
            dashboardPendingGridData: this.state.dashboardPendingGridData,
            dashboardCompletedGridData: this.state.dashboardCompletedGridData,
            dashboardSettlementGridData: this.state.dashboardSettlementGridData,
            dashboardItemsGridData: this.state.dashboardItemsGridData,
            suppliers: this.state.suppliers,
            dashboardCustomerSettlement: this.state.dashboardCustomerSettlement


        });

    };

    pageChange = (currentPage, pageName) => {
        let currentGrid = this.state[pageName];
        currentGrid.pageData.currentPageNo = currentPage;
        this.setState({ pageName: currentGrid });
        console.log(pageName, "__________________GRID!!!!")
        // this.props.actions.generalProcess(url.cusDashboardData, {pageName:this.state[pageName]})
        this.getDashboardData("ETIHAD");
    };

    render() {

        if (this.state.isLoading)
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>);
        else if (this.props.data.graphData) {
            return (
                <div className="coreDiv">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="daterange_con">
                                <div className="row">
                                    {/* <div className="center-block dashdate"> */}
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <div className="col-md-12">
                                                {/* <div className="form-group col-md-3"></div>
                                                <div className="form-group col-md-3">
                                                </div>


                                                <div className="form-group col-md-6">

                                                </div> */}
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="row">
                                <TileUnit data={this.props.data.dashboardTiles} />
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                </div>
                            </div>

                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption "><span className="caption-subject " /></div>
                                    <div className="center-block" style={{ width: "500px" }}>

                                    </div>
                                </div>
                                <div className="row">
                                    {this.state.graphData.labels && this.state.graphData.legends &&

                                        <CommonBarChart toDate={this.state.toDate}
                                            fromDate={this.state.fromDate}
                                            graphLabels={this.state.graphLabels}
                                            labels={this.state.graphData.labels}
                                            chartData={this.state.graphData.chartData}
                                            legends={this.state.graphData.legends}
                                            firstBarData={this.state.graphData.chartData.firstBar}
                                            secondBarData={this.state.graphData.chartData.secondBar}

                                        />
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">

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
                                        title={utils.getLabelByID("Settlement")}
                                        gridColumns={utils.getGridColumnByName("customerSettlement")}
                                        gridData={this.state.customerWiseSettlement}
                                        totalRecords={this.props.data.dashboardCustomerSettlement.pageData.totalRecords}
                                        activePage={this.state.dashboardCustomerSettlement.pageData.currentPageNo}
                                        pageSize={this.state.dashboardCustomerSettlement.pageData.pageSize}
                                        pageChanged={(currentPage) => { this.pageChange(currentPage, 'dashboardCustomerSettlement') }}

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
    if (state.app.customerDashboardData !== undefined) {
        return {
            data: state.app.customerDashboardData.data,

        };
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(generalAction, dispatch) };
}

Dashboard.displayName = "Dashboard";
// Dashboard.display = false;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


