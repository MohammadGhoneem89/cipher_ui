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
import Row from '../../../../core/common/Row.jsx';
import Col from '../../../../core/common/Col.jsx';

class TransactionList extends React.Component {
    constructor(props) {

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
            actions: [],
            totalRecords: 2
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this)
        this.searchResult = this.searchResult.bind(this)
        this.generalHandler = gen.generalHandler.bind(this)
    }


    onStartDateChange = value => {
        value == 'Invalid date' ? this.setState({ startDate: undefined }) : this.setState({ startDate: value });
    };

    onEndDateChange = value => {
        value == 'Invalid date' ? this.setState({ endDate: undefined }) : this.setState({ endDate: value });
    };

    searchResult = () => {
        this.props.actions.generalProcess(constants.getViewTransaction, this.getRequest());
    }
    reset = () => {
        this.setState({
            startDate: undefined,
            endDate: undefined,
            searchCriteria: undefined
        })
    }


    redirectToAddPage = () => {

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.transData)
            this.setState({ gridData: nextProps.transData })
        if (nextProps.records)
            this.setState({ totalRecords: nextProps.records })
        this.setState(
            {
                isLoading: false
            }
        )
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false
            })
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getTransactionList, this.getRequest())
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['transactionDirection']));
        window.scrollTo(0, 0);
    }



    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        // this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
        this.props.actions.generalProcess(constants.getTransactionList, this.getRequest())
    }



    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <Row>
                <Col>
                    <Portlet title={utils.getLabelByID("TRANSACTIONS")}>
                        <div className="row">
                            <Row>
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Start Date" />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <DateControl
                                            id='startDate'
                                            dateChange={this.onStartDateChange}
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
                                            dateChange={this.onEndDateChange}
                                        />
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Status" />
                                    </div>
                                    <Combobox
                                        fieldname='Status'
                                        formname='searchCriteria'
                                        placeholder='Select'
                                        style={{}}
                                        columns={8}
                                        state={this.state}
                                        typeData="status"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Direction" />
                                    </div>
                                    {console.log(_.get(this.state, 'typeData', {}))}
                                    <Combobox
                                        fieldname='direction'
                                        formname='searchCriteria'
                                        placeholder='Select'
                                        style={{}}
                                        columns={8}
                                        state={this.state}
                                        typeName="transactionDirection"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </Row>

                            <Row>
                                <div className="col-md-6">
                                    <div className="col-md-4">
                                        <Label text="Partner" />
                                    </div>
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}
                                    <Combobox
                                        fieldname='partner'
                                        formname='searchCriteria'
                                        placeholder='Select'
                                        style={{}}
                                        columns={8}
                                        state={this.state}
                                        typeData="rule"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <div className="col-md-4">
                                        <Label text="Transaction ID" />
                                    </div>
                                    <Input
                                        fieldname='key'
                                        formname='searchCriteria'
                                        columns={8}
                                        placeholder='#'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </Row>

                            <Row>
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="submit" className="btn green" onClick={this.searchResult}>
                                                {utils.getLabelByID('Search')}
                                            </button>
                                            <button type="clear" className="btn green" onClick={this.reset}>
                                                {utils.getLabelByID("Clear")}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </Row>
                        </div>

                        <Row>
                            <Col>

                                <Table
                                    gridColumns={utils.getGridColumnByName("viewTranxList")}
                                    gridData={this.state.gridData}
                                    fontclass=""
                                    totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                    pageChanged={this.pageChanged}
                                    pagination={true}
                                    search={true}
                                    activePage={this.state.page.currentPageNo}
                                />

                            </Col>
                        </Row>
                    </Portlet>
                </Col>
            </Row>
        );
    }
}



function mapStateToProps(state, ownProps) {
    return {
        transData: _.get(state.app, 'getPointConversionTransactionList.data.searchResult.rows', []),
        records: _.get(state.app, 'getPointConversionTransactionList.data.searchResult.count', ''),
        typeData: state.app.typeData.data,
        //transctionDirection: _.get(state.app, 'entityList.data.typeData.transactionDirection', undefined),
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

TransactionList.displayName = "Transaction List";
export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);

