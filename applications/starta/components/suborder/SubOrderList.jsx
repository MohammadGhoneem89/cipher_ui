/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import _ from 'lodash';
import * as requestCreator from '../../../../core/common/request.js';


const statusList = [
    {
        "label": "Sub Order",
        "status": true,
        "value": "001"
    },
    {
        "label": "Dispatched",
        "status": false,
        "value": "002",
    },
    {
        "label": "Received",
        "value": "003",
        "status": false
    },
    {
        "label": "Payment Order",
        "value": "004",
        "status": false
    },
    {
        "label": "Paid",
        "value": "005",
        "status": false
    }
]
class SubOrderList extends React.Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            actions: []

        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
    }

    formSubmit = () => {
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }
    getRequest = () => {

        let suborderID = document.getElementById('suborderID') == null ? "" : document.getElementById('suborderID').value;
        let orderID = document.getElementById('orderID') == null ? "" : document.getElementById('orderID').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        let searchCriteria = {}

        if (suborderID != "") { searchCriteria.subOrderID = suborderID }
        if (orderID != "") { searchCriteria.orderID = orderID }
        if (status != "") { searchCriteria.status = status };


        this.setState({ searchCriteria: searchCriteria })
        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize
                },
                searchCriteria
            }

        };
        return request
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getSubOrderList) {
            console.log(nextProps.getSubOrderList, "getSubOrderList")
            this.setState(
                {
                    gridData: this.formatData(nextProps.getSubOrderList),
                    isLoading: false,
                    page: nextProps.getPage
                }
            )
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());

        window.scrollTo(0, 0);
    }
    getStatusLabel = status => {
        for (let i in statusList) {
            if (statusList[i].value == status) {
                return statusList[i].label;
            }
        }
    }
    formatData = (gridData) => {
        for (let i in gridData) {
            let status = gridData[i].status;
            if (status) {
                gridData[i].status = this.getStatusLabel(status);
            }

        }
        return gridData;
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div>

                <Portlet title={utils.getLabelByID("Sub Order List")}>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Sub Order ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="suborderID" id="suborderID" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Main Order ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="orderID" id="orderID" />
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Status")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="status" id="status" className="form-control">
                                    <option value="">Select</option>
                                    {statusList.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.label}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">


                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.formSubmit}>
                                        {utils.getLabelByID("Search")}
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>

                    <Portlet title={"sub order"} actions={this.state.actions} isPermissioned={true}>
                        {
                            this.state.gridData.map((obj) => {

                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/strata/subOrder"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })

                        }

                        <Table
                            gridColumns={utils.getGridColumnByName("suborder")}
                            gridData={this.state.gridData}
                            fontclass=""
                            totalRecords={this.props.getPage.totalRecords}
                            pageSize={10}
                            pageChanged={this.pageChanged}
                            pagination={true}
                            activePage={this.state.page.currentPageNo}
                        />
                    </Portlet>
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app.getSubOrderList, "state.app.getSubOrderList")
    return {
        getSubOrderList: _.get(state.app, "getSubOrderList.searchResult", []),
        getPage: _.get(state.app, "getSubOrderList.pageData", [])
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
SubOrderList.displayName = "SUBORDER";
export default connect(mapStateToProps, mapDispatchToProps)(SubOrderList);