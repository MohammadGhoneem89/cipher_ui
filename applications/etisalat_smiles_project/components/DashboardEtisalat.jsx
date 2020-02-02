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


class DashboardEtisalat extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords: 10,
            pageSize: 5,
            currentPageNo: 1,
            searchCriteria: {},
            valid: true,
            gridData: [
                {
                    "serial_no": "1", "batch": "CBD-7685787", "invoice": "555222", "to": "ETIHAD", "ammount": "33000", "comission": "True", "settlementperiod": "6000", "status": "Success",
                    "actions": [{ "value": "1003", "type": "componentAction", "label": "View", "params": "", "iconName": "icon-docs", "URI": ["/smiles/View/Settlements/"] }]
                },
            ],
            tiles: [
                { id: 1, title: "Recivables", value: 2, actionURI: "", overDue: "", fontClass: "green-steel" },
                { id: 1, title: "Payables", value: 2, actionURI: "", overDue: "", fontClass: "green-steel" },
            ]
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.partnerChanged = this.partnerChanged.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
            ]));


    }
    partnerChanged() { }
    componentWillReceiveProps(nextProps) {
        this.setState({
            typeData: nextProps.typeData
        })

        console.log("DDDDDDDDDDD", nextProps.typeData)

    }

    render() {

        //console.log("MMM",this.state.searchCriteria.merchant)
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
                                                <h4 style={{ color: 'white' }}><b>Accrual Workboard</b></h4>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group input-large">
                                                    <div className="input-group input-large" >
                                                        <select id="network" name="Network" className="form-control" onChange={this.partnerChanged} style={{ width: "350px", marginTop: "2px" }}>
                                                            <option value="1">CBD</option>
                                                        </select>
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
                                                <TileUnit customClass="col-md-6" data={this.state.tiles} />
                                            </div>
                                            <div className="col-md-offset-6">
                                                <div className="col-md-2">
                                                    <img src="/assets/imgs/gift.jpg" style={{ height: "150px" }} />
                                                </div>

                                                <div className="col-md-6 text-center" >
                                                    <div style={{ fontSize: "20px", marginTop: "30px", fontWeight: 800 }}>Commercial Bank of Dubai</div>
                                                    <div className="row" style={{ marginTop: "30px" }}>ACCURAL PARTNER  |<b> REDEMPTION PARTNER </b> | CONVERSION PARTNER</div>
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
                                                        gridColumns={utils.getGridColumnByName("DashboadrEtisalat")}
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
                                                <BarChart data={[]} />
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