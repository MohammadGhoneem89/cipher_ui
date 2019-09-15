import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as generalAction from '../../../core/actions/generalAction';
import * as utils from '../../../core/common/utils.js';
import CommonBarChart from '../../../core/common/CommonBarChart.jsx';
import TileUnit from '../../../core/common/tileUnit.jsx';
import * as url from '../../../core/constants/Communication.js';
import Table from '../../../core/common/Datatable.jsx';
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
        //clearInterval(this.timerID);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.dashboardPendingGridData && nextProps.entityNames) {
            this.setState({
                entityNames: nextProps.entityNames,
                getPendingOrders: nextProps.data.dashboardPendingGridData.pendingOrderRows,
                getCompletedOrders: nextProps.data.dashboardCompletedGridData.completedOrderRows,
                setPagingForSupplier: nextProps.supplierPageDate,
                isLoading: false,
            });
        }
    }

    getDashboardData = (supplier) => {
        this.props.actions.generalProcess(url.supplierDashboardData, {
            supplier: supplier || this.state.supplierAddress,
            dashboardPendingGridData: this.state.dashboardPendingGridData,
            dashboardCompletedGridData: this.state.dashboardCompletedGridData,
            dashboardSettlementGridData: this.state.dashboardSettlementGridData,
            dashboardCustomerSettlement: this.state.dashboardCustomerSettlement
        });
        this.props.actions.generalProcess(url.getEntityList, requestCreator.createEntityListRequest({
            "currentPageNo": 1,
            "pageSize": 1
        }));
    };

    pageChange = (currentPage, pageName) => {
        let currentGrid = this.state[pageName];
        currentGrid.pageData.currentPageNo = currentPage;
        this.setState({ pageName: currentGrid });
        console.log(pageName, "pageChanged !!!!")
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
        this.state.dashboardCustomerSettlement.supplierID = currentSupplier;
        this.getDashboardData("");
        console.log(">>>>>>>>", this.state.dashboardPendingGridData.supplierID, "UPDATE ID")
    };
    
    render() {
        const customerList = this.state.entityNames ? this.state.entityNames : [];
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
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <div className="col-md-12">
                                                <div className="form-group col-md-3"></div>
                                                <div className="form-group col-md-3">
                                                </div>


                                                <div className="form-group col-md-6">
                                                    <select id="customerID" className="form-control" value={this.state.value} onChange={this.supplierChange}>
                                                        {
                                                            customerList.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value} onChange={this.supplierChange}>{option.label}</option>
                                                                );
                                                            })
                                                        }
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
                                        title={utils.getLabelByID("Customer wise Settlement")}
                                        gridColumns={utils.getGridColumnByName("customerWiseSettlement")}
                                        gridData={this.props.data.dashboardCustomerSettlement.customerWiseSettlement ?
                                            this.props.data.dashboardCustomerSettlement.customerWiseSettlement : 0}
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
    console.log(state.app, "state.app");
    if (state.app.supplierDashboardData !== undefined) {

        return {
            data: state.app.supplierDashboardData.data,
            entityNames: state.app.entityList.data.typeData.entityNames

        };
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(generalAction, dispatch) };
}

Dashboard.displayName = "Dashboard";
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


