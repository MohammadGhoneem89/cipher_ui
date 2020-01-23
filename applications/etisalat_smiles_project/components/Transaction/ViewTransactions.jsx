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

class ViewTransactions extends React.Component {
    constructor(props) {
        console.log("View Transaction")
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
            actions: []
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
        this.generalHandler = gen.generalHandler.bind(this)
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
            <div className="row">
                <Portlet title={utils.getLabelByID("TRANSACTIONS")}>
                    <div className="row">
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
                                    id='End Date'
                                    dateChange={this.dateChange}
                                />
                            </div>
                        </div>

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
                                <Label text="Direction" />
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

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <Label text="Partner" />
                            </div>
                            <div className="form-group col-md-8">
                                {/* <input type="text" className="form-control" name="status" id="status" /> */}

                                <Combobox
                                    fieldname='Partner'
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
            </div>
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
ViewTransactions.displayName = "Transaction List";
export default connect(mapStateToProps, mapDispatchToProps)(ViewTransactions);













