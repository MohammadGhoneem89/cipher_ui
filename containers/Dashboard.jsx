/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import DateRangePicker from '../core/components/DateRangePicker.jsx';
import { bindActionCreators } from 'redux';
import * as actions from '../core/actions/generalAction';

/*container specific imports*/
import TileUnit from '../core/components/tileUnit.jsx';
import Table from '../core/standard/Datatable.jsx';
import ExceptionTileUnit from '../core/components/exceptionsTile.jsx'
import BarChartExceptions from '../core/components/barChart.jsx'
import * as utils from '../core/common/utils.js';

import DateRangePickerInput from '../core/components/DateRangePickerInput.jsx';
import * as constants from '../constants/Communication.js';
import ManualSettlementPopup from '../components/ManualSettlementPopup.jsx';
import * as requestCreator from '../core/common/request.js';
import DateControl from '../core/components/DateControl.jsx'
import moment from 'moment';


class Dashboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            names: [],
            fromDateWrkBrd: moment().subtract(30, 'days').format('DD/MM/YYYY'),
            toDateWrkBrd: moment().format('DD/MM/YYYY'),
            fromDate: moment().subtract(30, 'days').format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            pageNumner: 1,
            settlementEntityID: '',
            entitySelectedVal: "",
            entityNames: undefined,
            settlementDate: ''
        };

        this.pageChanged = this.pageChanged.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this);
        this.dateChangeExceptions = this.dateChangeExceptions.bind(this);
        this.changeEntityVal = this.changeEntityVal.bind(this);
        this.fetchDashboard = this.fetchDashboard.bind(this);

    }

    componentWillMount() {
        /*
        var params = {
            "orgID": sessionStorage.orgCode,
            "orgType": sessionStorage.orgType,
            "currentPageNo": this.state.pageNumner,
            "pageSize": 5,
            "fromDateWrkBrd": this.state.fromDateWrkBrd,
            "toDateWrkBrd":this.state.toDateWrkBrd,
            "fromDate": this.state.fromDate,
            "toDate": this.state.toDate  ,
            "JWToken": sessionStorage.token,
            "filter": this.state.entitySelectedVal
        }



        this.props.actions.sendWSData(params);
        */
        this.fetchDashboard(this.state.entitySelectedVal, this.state.pageNumner);
    }
    searchCallBack(keyWord) {


    }

    getEntityName() {
        var entityList = $('#entityList').find(":selected").text();
        return entityList;
    }

    changeEntityVal(form) {
        this.setState({ entitySelectedVal: form.target.value });
        if (form.target.value !== "") {
            this.setState({ pageNumner: 1 })
            this.fetchDashboard(form.target.value, 1);
        } else {
            this.fetchDashboard(form.target.value, this.state.pageNumner);
        }

    }

    dateChangeWorkboard(toDate, fromDate) {
        this.setState({ fromDateWrkBrd: fromDate });
        this.setState({ toDateWrkBrd: toDate });
        this.fetchDashboard(this.state.entitySelectedVal, this.state.pageNumner);
    }
    dateChangeExceptions(toDate, fromDate) {
        this.setState({ fromDate: fromDate });
        this.setState({ toDate: toDate });
        this.fetchDashboard(this.state.entitySelectedVal, this.state.pageNumner, 2);
    }
    fetchDashboard(entityValue, pageNo, qType) {

        var data = {
            "currentPageNo": pageNo || this.state.pageNumner,
            "pageSize": 5,
            "fromDateWrkBrd": this.state.fromDateWrkBrd,
            "toDateWrkBrd": this.state.toDateWrkBrd,
            "fromDate": this.state.fromDate,
            "toDate": this.state.toDate,
            "filter": entityValue == "" ? "" : (entityValue || this.state.entitySelectedVal)
        }
        //alert(JSON.stringify(data));
        this.props.actions.generalProcess(constants.getEntityDashboardData, data);
    }

    componentDidMount() {
        if (!this.props.entityNames.length > 0) {
            this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
                "currentPageNo": 1,
                "pageSize": 1
            }));
        }
    }
    pageChanged(pageNo) {

        this.setState({ pageNumner: pageNo })
        this.fetchDashboard(this.state.entitySelectedVal, pageNo)
        //<!-- <DateControl id="dateToView" dateChange={this.dateChange} /> -->

    }
    exceptionSearch() {


    }
    renderPopupBody(dataID) {

        let ID = dataID.split('/')
        this.setState({ settlementEntityID: ID[1], settlementDate: ID[2] + '/' + ID[3] + '/' + ID[4] })
    }

    render() {

        let enableControl = (sessionStorage.orgType == "Settlement" || sessionStorage.orgType == "SDG" || sessionStorage.orgType == "DSG") ? true : false;
        let entityUserType = sessionStorage.orgType == "Entity" ? true : false;
        let acquirerUserType = sessionStorage.orgType == "Acquirer" ? true : false;

        if (this.props.entityDashboardData.workboardData.rows) {

            return (
                <div className="coreDiv">

                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="daterange_con">
                                <div className="center-block dashdate">
                                    <DateRangePicker onChangeRange={this.dateChangeWorkboard} />


                                    <div className="input-group input-large">
                                        {(enableControl) &&
                                            <div className="input-group input-large">
                                                <select id="entityList" name="entity" onChange={this.changeEntityVal} className="form-control">
                                                    <option value={""}>All Entities</option>
                                                    {this.props.entityNames.map((option, index) => {
                                                        return (
                                                            <option key={index} value={option.value}>{option.label}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <TileUnit data={this.props.entityDashboardData.dashboardTiles} />
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <Table gridColumns={utils.getGridColumnByName("entityWorkBoard")} gridData={this.props.entityDashboardData.workboardData.rows}
                                        title="Entity Workboard" fontclass="" TableClass="portlet light bordered sdg_portlet"
                                        totalRecords={this.props.entityDashboardData.workboardData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={5}
                                        pageChanged={this.pageChanged} export={false}
                                        pagination={true} renderPopupBody={this.renderPopupBody} activePage={this.state.pageNumner} />


                                </div>
                            </div>

                        </div>
                    </div>




                    <div className="modal fade in modal-overflow" id="modelWindows" tabindex="-1" role="basic" aria-hidden="true" style={{ display: "none", paddingTop: "100" }}>
                        <div className="modal-dialog" style={{ width: "1000" }}>
                            <div className="modal-content" style={{ padding: "10px" }}>
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">{utils.getLabelByID("TLP_Close")}</span></button>
                                    <h3 className="modal-title">{"Manual Settlement Batch"}</h3>
                                </div>

                                <div className="modal-body" id="popup">
                                    <ManualSettlementPopup settlementEntityID={this.state.settlementEntityID} settlementDate={this.state.settlementDate} />
                                </div>
                            </div>
                        </div>
        
                        

                    </div>

         

                    <div className="portlet light bordered sdg_portlet">


                        <div className="portlet-title">
                            <div className="caption "> <span className="caption-subject ">Exceptions</span> </div>
                            <div className="center-block" style={{ width: "400px" }}>
                                <div className="input-group" id="defaultrange" style={{ display: "inline", marginRight: "10px" }} >
                                    <DateRangePickerInput onChangeRange={this.dateChangeExceptions} />
                                </div>
                                <button type="submit" className="btn dash green input-xsmall">Search</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ExceptionTileUnit data={this.props.entityDashboardData.exceptionData.exceptionSummary} />
                                <BarChartExceptions entityName={this.getEntityName()} toDate={this.state.toDate} fromDate={this.state.fromDate} reconciledData={this.props.entityDashboardData.exceptionData.chartData.reconciledData} exceptionData={this.props.entityDashboardData.exceptionData.chartData.expData}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            );
        }
        else
            return (<div className="loader">Loading...</div>)


    }
}




Dashboard.propTypes = {
    entityDashboardData: PropTypes.object,
    children: PropTypes.object,
    entityNames: PropTypes.array,
};

function mapStateToProps(state, ownProps) {



    return {
        entityDashboardData: state.app.entityDashboardData.data,
        entityNames: state.app.entityList.data.typeData.entityNames,
    };




}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
Dashboard.displayName = "EntityWorkboard_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
