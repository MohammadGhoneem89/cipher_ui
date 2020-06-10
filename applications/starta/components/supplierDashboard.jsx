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
import { setTimeout } from 'timers';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.currentPageNo = 1;
        // this.customerID = "";
        this.state = {

            customerID: "",
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

                    pageSize: this.pageSize,
                    currentPageNo: this.currentPageNo
                },
                customerID: ""
            },
            dashboardCompletedGridData: {
                pageData: {
                    pageSize: this.pageSize,
                    currentPageNo: this.currentPageNo
                },
                customerID: ""
            },
            dashboardSettlementGridData: {
                pageData: {
                    pageSize: this.pageSize,
                    currentPageNo: this.currentPageNo
                },
                customerID: ""
            },
            dashboardCustomerSettlement: {
                pageData: {
                    pageSize: this.pageSize,
                    currentPageNo: this.currentPageNo
                },
                customerID: ""
            }
        };
    }
    componentWillMount() {
    }

    componentDidMount() {
        this.getDashboardData();
        this.props.actions.generalProcess(url.getEntityList, requestCreator.createEntityListRequest({
            "currentPageNo": 1,
            "pageSize": 1
        }));

        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.entityNames) {
            let entityNames = [...nextProps.entityNames]
            entityNames = entityNames.filter((item) => {
                if (item.orgType === 'CUSTOMER') {
                    return true
                } else {
                    return false
                }
            })
            this.setState({
                entityNames: [...entityNames]
            })

        }

        // get dashboard data from first entityName for initial load
        // if (this.state.isLoading===true){
        //     this.getDashboardData();
        // }

        if (nextProps.data && nextProps.data.dashboardPendingGridData && nextProps.data.graphData) {

            console.log(nextProps.data.graphData, "DATA")
            this.setState({
                getPendingOrders: nextProps.data.dashboardPendingGridData.pendingOrderRows,
                graphData: nextProps.data.graphData,
                getCompletedOrders: nextProps.data.dashboardCompletedGridData.completedOrderRows,
                settlement: nextProps.data.dashboardSettlementGridData.settlementsRows,
                customerWiseSettlement: nextProps.data.dashboardCustomerSettlement.customerWiseSettlement,
                setPagingForSupplier: nextProps.supplierPageDate,
                isLoading: false
            });

        }
    }
    updateState = (e) => {
        // console.log(e.target.value, "updatestate customerID")
        let value = e.target.value;
        if (e.target.value == 'ALLCUSTOMERS') { value = "" }
        this.setState({ isLoading: true, customerID: value });
        this.state.dashboardPendingGridData.customerID = value;
        this.state.dashboardCompletedGridData.customerID = value;
        this.state.dashboardSettlementGridData.customerID = value;
        this.state.dashboardCustomerSettlement.customerID = value;
        this.getDashboardData();
        console.log(">>>>>>>>", this.state.dashboardPendingGridData.customerID, "UPDATE ID")

    }
    getDashboardData = () => {
        this.props.actions.generalProcess(url.supplierDashboardData, {
            dashboardPendingGridData: {
                ...this.state.dashboardPendingGridData,
                customerID: this.state.dashboardPendingGridData.customerID || _.get(this.state, 'entityNames[0].value', '')
            },
            dashboardCompletedGridData: {
                ...this.state.dashboardCompletedGridData,
                customerID: this.state.dashboardPendingGridData.customerID || _.get(this.state, 'entityNames[0].value', '')
            },
            dashboardSettlementGridData: {
                ...this.state.dashboardSettlementGridData,
                customerID: this.state.dashboardPendingGridData.customerID || _.get(this.state, 'entityNames[0].value', '')
            },
            dashboardCustomerSettlement: {
                ...this.state.dashboardCustomerSettlement,
                customerID: this.state.dashboardPendingGridData.customerID || _.get(this.state, 'entityNames[0].value', '')
            }
        });

    };

    pageChange = (currentPage, pageName) => {
        let currentGrid = this.state[pageName];
        currentGrid.pageData.currentPageNo = currentPage;
        this.setState({ pageName: currentGrid });
        console.log(pageName, "pageChanged !!!!")
        this.getDashboardData();
    };

    render() {
        console.log(this.state.graphData ? this.state.graphData : "graphData?this.state.graphData")
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
                                                    <select id="customerID" className="form-control" value={this.state.customerID} onChange={this.updateState}>
                                                        {
                                                            customerList.map((option, index) => {
                                                                return (
                                                                    <option key={index} value={option.value}>{option.label}</option>
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
                                    {this.state.graphData.labels && this.state.graphData.legends &&

                                        <CommonBarChart toDate={this.state.toDate}
                                            fromDate={this.state.fromDate}
                                            graphLabels={this.state.graphLabels}
                                            labels={_.get(this.state.graphData, "labels", undefined)}
                                            chartData={_.get(this.state.graphData, "chartData", undefined)}
                                            legends={_.get(this.state.graphData, "legends", undefined)}
                                            firstBarData={_.get(this.state.graphData, "chartData.firstBar", undefined)}
                                            secondBarData={_.get(this.state.graphData, "chartData.secondBar", undefined)}

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
                                        gridData={this.state.settlement}
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
    console.log("_.get(state.app,'supplierDashboardData.data',undefined)", _.get(state.app, 'supplierDashboardData.data', undefined))
    return {
        data: _.get(state.app, 'supplierDashboardData.data', undefined),
        entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined)
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(generalAction, dispatch) };
}

Dashboard.displayName = "Dashboard";
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


