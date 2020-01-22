/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import Label from '../../../../core/common/Lable.jsx';
import Input from '../../../../core/common/Input.jsx'
import _ from 'lodash';
import * as requestCreator from '../../../../core/common/request.js';
import DateControl from '../../../../core/common/DateControl.jsx';
import Combobox from '../../../../core/common/Select.jsx';
import * as gen from '../../../../core/common/generalActionHandler';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import Row from '../../../../core/common/Row.jsx';
import moment from 'moment';
import DateRangePicker from '../../../../core/common/DateRangePicker.jsx';
// import { BarChart } from 'react-easy-chart';

class dashboard extends React.Component {
    constructor(props) {
        console.log("dashboard")
        super(props);
        this.state = {
            viewCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            Transaction: {},
            actions: [],
            fromDate: moment().startOf('day'),
            toDate: moment().endOf('day')

        };

        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
        this.generalHandler = gen.generalHandler.bind(this)
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this);
    }

    formSubmit = () => {
        // this.props.actions.generalProcess(constants.getViewTransactions, this.getRequest());
        this.props.actions.generalProcess(constants.getViewTransactions, this.getRequest());
    }
    reset = () => {
        document.getElementById('contractId').value = "";
        // document.getElementById('customer').value = "";
        document.getElementById('status').value = "";
        let request = {
            "body": {
                page: {
                    currentPageNo: 1,
                    pageSize: 10
                },
                searchCriteria: {}
            }
        }
        this.setState({ searchCriteria: {} });
        // this.props.actions.generalProcess(constants.getMasterAgreement, request);
    };

    redirectToAddPage = () => {
        //this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }

    dateChangeWorkboard(toDate, fromDate) {
        this.setState({
            searchCriteria: {
                ...this.state.searchCriteria,
                fromDate: fromDate,
                toDate: toDate
            },
            isDateSelected: true
        });
    }

    getRequest = () => {
        //let contractID = document.getElementById('contractId') == null ? "" : document.getElementById('contractId').value;
        // let customerID = document.getElementById('customer') == null ? "" : document.getElementById('customer').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        let searchCriteria = {}
        let startDate = this.state.startDate;


        if (contractID != "")
            searchCriteria.contractID = contractID
        // if (customerID != "")
        //     searchCriteria.customerID = customerID
        if (status != "")
            searchCriteria.status = status

        this.setState({ searchCriteria: searchCriteria })
        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize,
                },
                searchCriteria
            }

        };
        return request;
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.getViewTransactions && nextProps.typeData && nextProps.gridActions[0] && nextProps.gridActions[0].pageActions) {
        // console.log(nextProps.gridActions[0].pageActions, "nextProps.gridActions[0].pageActions");
        // let pageActions = nextProps.gridActions[0].pageActions;
        this.setState(
            {
                isLoading: false
            }
        )
        // }
    }



    componentDidMount() {
        // this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['orderStatus']));
        // this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());

        window.scrollTo(0, 0);
    }
    getStatusLabel = status => {
        if (this.state.typeData && this.state.typeData.orderStatus) {
            let orderStatus = this.state.typeData.orderStatus;
            for (let i in orderStatus) {
                if (orderStatus[i].value == status) {
                    return orderStatus[i].label;
                }
            }
        }
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div className="form">

                <div className="row">
                    <div className="dashboard-stat2 " style={{ "height": "24%", "margin-left": "1.3%", "margin-right": "1.3%", "padding-left": "0px" }}>
                        <div className="col-md-6" style={{ "padding": "0px" }} >
                            <TileUnit data={[{
                                title: "RECIEVABLES",
                                value: "10",
                                percentageTag: false
                            }]} />
                        </div>
                        <div className="col-md-4" style={{ "display": "table-cell", "vertical-align": "middle", "text-align": "center", "height": "128px" }}>
                            <img style={{ "height": "129px" }} src="/assets/Resources/CBD_l.png" />
                        </div>
                        <div className="col-md-2">
                            <label align='center' style={{ 'fontSize': '10px' }}> COMMERCIAL BANK OF DUBAI</label>
                        </div>
                    </div>

                </div>
                < br />
                <Portlet title={utils.getLabelByID("SETTLEMENTS")}>
                    <div className="row">
                        <div className="row">''
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="Start Date" />
                                </div>
                                <div className="form-group col-md-8">
                                    <DateControl
                                        id='startDate'
                                        dateChange={this.dateChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="End Date" />
                                </div>
                                <div className="form-group col-md-8">
                                    <DateControl
                                        id='endDate'
                                        dateChange={this.dateChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="Status" />
                                </div>
                                <div className="form-group col-md-8">
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}
                                    <Combobox
                                        fieldname='Status'
                                        formname='Transaction'
                                        placeholder='Select'
                                        state={this.state}
                                        typeData="rule"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="Type:" />
                                </div>
                                <div className="form-group col-md-8">
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}

                                    <Combobox
                                        fieldname='Direction'
                                        formname='Transaction'
                                        placeholder='Select'
                                        style={{}}
                                        state={this.state}
                                        typeData="rule"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="Invoice No#:" />
                                </div>
                                <div className="form-group col-md-8">
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}

                                    <Input
                                        fieldname='invoiceNo'
                                        formname='searchCriteria'
                                        placeholder='Inovice Number Expected'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />

                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <div className="btn-toolbar pull-right">
                                        <button type="submit" className="btn green" onClick={this.formSubmit}>
                                            {utils.getLabelByID('Search')}
                                        </button>
                                        {/* <button type="clear" className="btn green" onClick={this.reset}
                                        >
                                            {utils.getLabelByID("Clear")}
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* </Portlet>
                 <Portlet  actions={this.state.actions} isPermissioned={true}> */}
                    {/* UTS */}
                    <Table
                        gridColumns={utils.getGridColumnByName("viewTranxList")}
                        gridData={[{ "no": "1", "tranx": "12212222", "acc": "555222", "ttype": "ACCURAL", "amount": "100045", "points": "12220211", "date": "01/12/2020", "status": "APPROVED", "partner": "ETIHAD" }]}
                        fontclass=""
                        totalRecords={this.props.getPage.totalRecords}
                        pageSize={10}
                        pageChanged={this.pageChanged}
                        pagination={true}
                        activePage={this.state.page.currentPageNo}
                    />


                </Portlet>

                <Portlet title={utils.getLabelByID("TRANSACTIONS")}>

                    <div className="form">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="Transaction Type:" />
                                </div>
                                <div className="form-group col-md-8">
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}
                                    <Combobox
                                        fieldname='Type'
                                        formname='Transaction'
                                        placeholder='Select Below'
                                        style={{}}
                                        state={this.state}
                                        typeData="rule"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <Label text="Invoice No#:" />
                                </div>
                                <div className="form-group col-md-8">
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}

                                    <DateRangePicker onChangeRange={this.dateChangeWorkboard} startDate={this.state.fromDate} endDate={this.state.toDate} />

                                </div>
                            </div>

                            <Table
                                gridColumns={utils.getGridColumnByName("viewTranxList")}
                                gridData={[{ "no": "1", "tranx": "12212222", "acc": "555222", "ttype": "ACCURAL", "amount": "100045", "points": "12220211", "date": "01/12/2020", "status": "APPROVED", "partner": "ETIHAD", "actions": [{ "value": "1003", "type": "componentAction", "label": "View", "params": "", "iconName": "icon-docs", "URI": [{ "0": "/APIDefScreen/" }] }] }]}
                                fontclass=""                                                                                                                                                                                                                                           //
                                totalRecords={this.props.getPage.totalRecords}
                                pageSize={10}
                                pageChanged={this.pageChanged}
                                pagination={true}
                                activePage={this.state.page.currentPageNo}
                            />

                        </div>
                    </div>




                </Portlet>
            </div >
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        gridActions: _.get(state.app, 'getMasterAgreement.actions', []),
        getMasterAgreement: _.get(state.app, "getMasterAgreement.searchResult", []),
        getPage: _.get(state.app, "getMasterAgreement.pageData", [])

    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
dashboard.displayName = "DASHBOARD";
export default connect(mapStateToProps, mapDispatchToProps)(dashboard);













