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
            searchCriteria: {},
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
        this.transStartDateChange = this.transStartDateChange(this)
        this.transEndDateChange = this.transEndDateChange(this)
        this.pageChanged = this.pageChanged.bind(this)
        this.searchResult = this.searchResult.bind(this)
        this.generalHandler = gen.generalHandler.bind(this)
    }

    searchResult = () => {
        this.props.actions.generalProcess(constants.getViewTransaction, this.getRequest());
    }
    // reset = () => {
    //     document.getElementById('contractId').value = "";

    //     document.getElementById('status').value = "";
    //     let request = {
    //         "body": {
    //             page: {
    //                 currentPageNo: 1,
    //                 pageSize: 10
    //             },
    //             searchCriteria: {}
    //         }
    //     }
    //     this.setState({ searchCriteria: {} });
    //     // this.props.actions.generalProcess(constants.getMasterAgreement, request);
    // };

    redirectToAddPage = () => {
        //this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }

    getRequest = () => {
        let request = {
            "body": {
                searchCriteria: this.state.searchCriteria,
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize,
                },
            }
        };
        return request;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.transData)
            this.setState({ gridData: nextProps.transData })

        this.setState(
            {
                isLoading: false
            }
        )
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getViewTransaction, this.getRequest())
        window.scrollTo(0, 0);
    }

    transStartDateChange = (value) => {
        console.log(value)
        if (value == 'Invalid date') {
            this.setState({ transStartDateChange: undefined })
        } else {
            this.setState({ transStartDateChange: value })
        }
    }

    transEndDateChange = (value) => {
        console.log(value)
        if (value == 'Invalid date') {
            this.setState({ transEndDate: undefined })
        } else {
            this.setState({ transEndDate: value })
        }
    }

    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        // this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
        this.props.actions.generalProcess(constants.getViewTransaction, this.getRequest())
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
                                    id='transStartDate'
                                    dateChange={this.transStartDateChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <Label text="End Date" />
                            </div>
                            <div className="form-group col-md-8">
                                <DateControl
                                    id='transEndDate'
                                    dateChange={this.transEndDateChange}
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
                                    formname='searchCriteria'
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
                                    fieldname='direction'
                                    formname='searchCriteria'
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
                                    fieldname='partner'
                                    formname='searchCriteria'
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
                                        <button type="submit" className="btn green" onClick={this.searchResult}>
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
                        gridData={this.state.gridData}
                        fontclass=""
                        totalRecords={40}
                        pageSize={10}
                        pageChanged={this.pageChanged}
                        pagination={true}
                        search={true}
                        activePage={this.state.page.currentPageNo}
                    />
                </Portlet>
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     return {
//         typeData: state.app.typeData.data,
//         gridActions: _.get(state.app, 'getMasterAgreement.actions', []),
//         getMasterAgreement: _.get(state.app, "getMasterAgreement.searchResult", []),
//         getPage: _.get(state.app, "getMasterAgreement.pageData", [])

//     };
// }

function mapStateToProps(state, ownProps) {
    return {
        transData: _.get(state.app, 'getPointConversionTransactionList.data.searchResult', [])
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }   
}

ViewTransactions.displayName = "Transaction List";
export default connect(mapStateToProps, mapDispatchToProps)(ViewTransactions);













