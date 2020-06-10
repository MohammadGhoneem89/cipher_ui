/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";



//import Table from "../common/Datatable.jsx"
import Table from '../../../core/common/Datatable.jsx';
import * as utils from '../../../core/common/utils.js';
//import * as utils from '../common/utils.js';
//import { DropdownInput } from '../common/FormControls.jsx';

import * as constants from '../../../core/constants/Communication.js';
import Combobox from '../common/Select.jsx';
//import Combobox from '../../../core/common/Select.jsx';
import * as gen from '../common/generalActionHandler'

import Portlet from '../common/Portlet.jsx';

import _ from 'lodash';
import DateControl from "../../../core/common/DateControl.jsx"
//import TileUnit from '../../../core/common/tileUnit.jsx';
import TileUnit from '../common/tileUnit.jsx';
import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import Input from '../../../core/common/Input.jsx';
import BarChart from '../../../core/common/barChart.jsx';
import { Row, Col } from '../common/index.jsx';
import DateRangePicker from '../../../core/common/DateRangePicker.jsx';
import moment from 'moment';


class DashboardEtisalat extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords: 10,
            pageSize: 5,
            currentPageNo: 1,
            entityDetail: {},
            searchCriteria: {
                fromDate: moment().subtract(29, 'days').format('DD/MM/YYYY'),
                toDate: moment().format('DD/MM/YYYY'),
            },
            dashData: {
                "listdates": [],
                "listConfirmed": [],
                "listPending": [],
                "listRejected": [],
                "recievables": 0,
                "payables": 0
            },
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            valid: true,
            gridData: [],
            tiles: []
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.partnerChanged = this.partnerChanged.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentWillMount() {
    }
    getRequest = () => {
        let searchCriteria = {
            ..._.get(this.state, 'searchCriteria', {}),
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        console.log(searchCriteria, ' search criteria')
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
    getRequestPartner = () => {
        // alert(JSON.stringify(sessionStorage))
        return { "action": "entityDetail", "spCode": "SELF" }

    };

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
            ]));
        // entityTypedata
        this.props.actions.generalProcess(constants.entityTypedata, {})
        this.props.actions.generalProcess(constants.getSettlementList, this.getRequest())
        this.props.actions.generalProcess(constants.getDashboardDataList, this.getRequest())
        this.props.actions.generalProcess(constants.orgDetail, this.getRequestPartner());

    }
    onDateChange(toDate, fromDate) {
        this.setState({
            searchCriteria: {
                ...this.state.searchCriteria,
                fromDate: fromDate,
                toDate: toDate
            },
            isDateSelected: true
        });

        let request = {
            searchCriteria: {
                ...this.state.searchCriteria,
                fromDate: fromDate,
                toDate: toDate
            }
        };
        this.props.actions.generalProcess(constants.getDashboardDataList, request);
    }
    partnerChanged() { }
    componentWillReceiveProps(nextProps) {

        if (nextProps.entityDetail && nextProps.dashData && nextProps.entityTypedata && nextProps.records) {
            this.setState({
                entityDetail: nextProps.entityDetail,
                isLoading: false,
                typeData: nextProps.typeData,
                dashData: nextProps.dashData,
                ddlListEntities: nextProps.entityTypedata,
                gridData: nextProps.transData,
                totalRecords: nextProps.records
            })
        }

    }

    render() {

        //console.log("MMM",this.state.searchCriteria.merchant)
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        else
            if (this.state.typeData) {
                return (
                    <Row>
                        <Col>
                            <Col>
                                <div className="daterange_con" >
                                    <div className="center-block dashdate" style={{ padding: "12px 20px" }}>
                                        <div className="row">
                                            <div className="col-md-12 ">
                                                <div className="col-md-6">
                                                    {/* <div className="col-md-5"> */}
                                                    <DateRangePicker onChangeRange={this.onDateChange} style={{ borderColor: "white", color: "white" }} />
                                                    {/* </div> */}
                                                    {/* <div className="col-md-6">
                                                    <h4 style={{ color: 'white' }}><b>Accrual Workboard</b></h4>
                                                </div> */}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group input-large">

                                                        <div className="input-group input-large" >

                                                            <Combobox
                                                                fieldname='to'
                                                                formname='searchCriteria'
                                                                state={this.state}
                                                                placeholder="Parteners"
                                                                typeName="ddlListEntities"
                                                                dataSource={this.state}
                                                                multiple={false}
                                                                actionHandler={this.generalHandler} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Col>
                                    <div className="row">

                                        <div className="row">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <TileUnit customClass="col-md-6" data={[
                                                        { id: 1, title: "Payables", value: this.state.dashData.recievables, actionURI: "", overDue: "", fontClass: "green-steel" },
                                                        { id: 1, title: "Recivables", value: this.state.dashData.payables, actionURI: "", overDue: "", fontClass: "green-steel" },
                                                    ]} />
                                                </div>
                                                <div className="col-md-offset-6">
                                                    <div className="col-md-2">
                                                        <img src={constants.baseUrl + this.state.entityDetail.entityLogo.sizeSmall} style={{ height: "150px" }} />
                                                    </div>

                                                    <div className="col-md-6 text-center" >
                                                        <div style={{ fontSize: "20px", marginTop: "30px", fontWeight: 800 }}>{this.state.entityDetail.entityName}</div>
                                                        <div className="row" style={{ marginTop: "30px" }}> {this.state.entityDetail.orgType} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Portlet title={"SETTLEMENTS"}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Start Date</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">End Date</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Type</label>
                                                    </div>
                                                    <div className="form-group col-md-8">

                                                        <Input
                                                            isValid={this.state.valid}
                                                            required={true}
                                                            fieldname="merchant" formname="searchCriteria" state={this.state}
                                                            actionHandler={this.generalHandler} className="form-control" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="col-md-4">
                                                        <label className="control-label">Status</label>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Combobox
                                                            fieldname='status'
                                                            formname='searchCriteria'
                                                            state={this.state}
                                                            typeName="listOfferStatus"
                                                            dataSource={this.state.typeData}
                                                            multiple={false}
                                                            actionHandler={this.generalHandler}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="btn-toolbar pull-right">
                                                    <div className="col-md-12">
                                                        <div className="col-md-12">
                                                            <button type="submit" className="btn green">Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Col>
                                                    <Col>
                                                        <Table
                                                            gridColumns={utils.getGridColumnByName("viewSettlementList")}
                                                            gridData={this.state.gridData}
                                                            pageSize={10}
                                                            //pageChanged={this.pageChanged}
                                                            pagination={true}
                                                            activePage={this.state.currentPageNo}
                                                        />
                                                    </Col>
                                                </Col>
                                            </div>
                                        </Portlet>


                                        <Portlet title={"Transactions"}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Type</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input
                                                            isValid={this.state.valid}
                                                            required={true}
                                                            fieldname="merchant" formname="searchCriteria" state={this.state}
                                                            actionHandler={this.generalHandler} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Date</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <Col>
                                                    <BarChart data={this.state.dashData} />
                                                </Col>
                                            </div>
                                        </Portlet>
                                    </div>
                                </Col>
                            </Col>
                        </Col>
                    </Row >
                );
            }
            else
                return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    //console.log(state.app)
    return {
        typeData: _.get(state.app, 'typeData.data', null),
        transData: _.get(state.app, 'getSettlementList.data.searchResult.rows', []),
        records: _.get(state.app, 'getSettlementList.data.searchResult.count', ''),
        entityTypedata: _.get(state.app, 'entityTypedata.data', []),
        entityDetail: _.get(state.app, 'entityDetail.data'),
        dashData: _.get(state.app, 'getDashboardData.data', [])
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

DashboardEtisalat.displayName = "__HIDE";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardEtisalat);