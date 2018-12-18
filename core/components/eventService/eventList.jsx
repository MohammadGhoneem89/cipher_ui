/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';

import Portlet from '../../common/Portlet.jsx';
/*container specific imports*/
import TileUnit from '../../common/tileUnit.jsx';
import Table from '../../common/Datatable.jsx';
import BarChartExceptions from '../../common/barChart.jsx'
import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../common/DateControl.jsx'


class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [] }
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);


    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }

    getRequest() {
        let toDate = $("#toDate").find("input").val()
        let fromDate = $("#fromDate").find("input").val()
        let uuid = (document.getElementById('uuid') == null || document.getElementById('uuid') == undefined) ? "" : document.getElementById('uuid').value;
        let channel = document.getElementById('channel') == null ? "" : document.getElementById('channel').value;
        let action = document.getElementById('action') == null ? "" : document.getElementById('action').value;
        let dispatcher = document.getElementById('dispatcher') == null ? "" : document.getElementById('dispatcher').value;
        let dataSource = document.getElementById('dataSource') == null ? "" : document.getElementById('dataSource').value;

        var searchCriteria = {
        }

        if (uuid != "")
            searchCriteria.uuid = uuid

        if (channel != "")
            searchCriteria.channel = channel

        if (action != "")
            searchCriteria.action = action

        if (fromDate != "")
            searchCriteria.fromDate = fromDate;

        if (dispatcher != "")
            searchCriteria.dispatcherName = dispatcher;

        if (dataSource != "")
            searchCriteria.dataSourceName = dataSource;


        this.setState({ searchFilters: searchCriteria })

        var request = {
            "action": "EventListData",
            searchCriteria,
            "page": {
                "currentPageNo": 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })
        console.log(JSON.stringify(request))


        return request;
    }

    componentWillMount() {



    }
    searchCallBack(keyWord) {

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getEventListData, this.getRequest());
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/editEventRegistry/NEWEVENT", "children": [] }] })
    }
    formSubmit() {

        this.props.actions.generalProcess(constants.getEventListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "EventList",
                    "searchCriteria": {
                    },
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            } else {
                var searchCriteria = this.state.searchFilters
                request = {
                    "action": "EventList",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getEventListData, request);

        }
    }
    clearFields() {
        $('#EventList').find('input:text').val('');
        $('#EventList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {

        if (this.props.EventListData.data) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("EventListFilters")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="EventList">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("APL_FromDate")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <DateControl id="fromDate" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("APL_ToDate")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <DateControl id="toDate" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("EL_DataSource")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="dataSource" id="dataSource" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("EL_Dispatcher")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="dispatcher" id="dispatcher" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-actions right">
                                                    <div className="form-group col-md-12">
                                                        <div className="btn-toolbar pull-right">

                                                            <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                            {"  "}
                                                            <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Portlet title={utils.getLabelByID("EventList")} isPermissioned={true}
                        actions={this.state.actions}>
                        <Table  fontclass="" gridColumns={utils.getGridColumnByName("EventListData")} gridData={this.props.EventListData.data.searchResult}
                            totalRecords={this.props.EventListData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
                            pagination={true} pageChanged={this.pageChanged} export={false} search={true}
                            activePage={this.state.currentPageNo} />
                    </Portlet>


                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

EventList.propTypes = {
    EventListData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {


    return {
        EventListData: state.app.EventList,
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
EventList.displayName = "EventList";
export default connect(mapStateToProps, mapDispatchToProps)(EventList);