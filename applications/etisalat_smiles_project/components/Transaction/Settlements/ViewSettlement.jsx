
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../../core/common/utils.js';
import Table from '../../../../../core/common/Datatable.jsx';
import * as actions from '../../../../../core/actions/generalAction';
import * as constants from '../../../../../core/constants/Communication.js';
import Portlet from '../../../../../core/common/Portlet.jsx';
import Steps from '../../../../../core/common/Steps.jsx';
import Col from '../../../../../core/common/Col.jsx';
import Row from '../../../../../core/common/Row.jsx';
import TileUnit from '../../../../../core/common/tileUnit.jsx';
import _ from 'lodash';
import DateControl from '../../../../../core/common/DateControl.jsx';
import * as requestCreator from '../../../../../core/common/request.js';
import Label from '../../../../../core/common/Lable.jsx';
import moment from 'moment';

class ViewSettlement extends React.Component {
    constructor(props) {
        console.log("View Settlements")
        super(props);
        this.state = {
            viewCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridDataTPool: [],
            gridData: [],
            actions: [],
            dashboardTiles: [{
                title: "Amount",
                value: "445",
                percentageTag: false
            }]
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
    }

    formSubmit = () => {
        // this.props.actions.generalProcess(constants.getViewTransactions, this.getRequest());
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
        return {
            "body": {
                "fromPartenerCode": this.props.from,
                "withPartenerCode": this.props.with,
                "Id": this.props.id
            }
        };
    }
    onStartDateChange = value => {
        value == 'Invalid date' ? this.setState({ startDate: undefined }) : this.setState({ startDate: value });
    };

    onEndDateChange = value => {
        value == 'Invalid date' ? this.setState({ endDate: undefined }) : this.setState({ endDate: value });
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.settlementData && nextProps.getPartnerDataByID) {
            let settlementData = nextProps.settlementData;
            let data = nextProps.getPartnerDataByID;
            this.setState(
                {
                    settlementData,
                    gridDataTPool: _.get(settlementData, 'transactionPool', []),
                    gridData: _.get(settlementData, 'transactionList', []),
                    isLoading: false,
                    englishPartnerName: _.get(data, 'entityName', ''),
                    arabicPartnerName: _.get(data, 'spCode', ''),
                    partnerLogo: _.get(data, 'entityLogo.sizeSmall', '')
                }
            )
        }
    }
    getRequestPartner = () => {

        let partnerCode = (this.props.id).split("_")
        console.log('-------PARTNERCODE ', partnerCode[0])
        return { "action": "entityDetail", "spCode": this.props.with }

    };

    componentDidMount() {
        this.props.actions.generalProcess(constants.orgDetail, this.getRequestPartner());
        this.props.actions.generalProcess(constants.getSettlementBatch, this.getRequest());

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
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        else
            return (
                <Row>
                    <Row>
                        <Steps statusList={[{ status: true, label: 'INITIATED' }, { status: false, label: 'SUBMITTED' }, { status: false, label: 'PAID' }, { status: false, label: 'RECEIVED' }]} />
                    </Row>
                    <Row>
                        <Col>
                            <div className="form">
                                <div className="row" >
                                    <div className="col-md-offset-3 col-md-12" style={{ marginBottom: '4%' }}>
                                        <div className="col-md-2">
                                            <img src={constants.baseUrl + this.state.partnerLogo} style={{ width: "130px" }} />
                                        </div>

                                        <div className="col-md-4 text-center" >
                                            <div style={{ fontSize: "30px", marginTop: "30px" }}><b>{this.state.englishPartnerName}</b></div>
                                            <div className="row" style={{ fontSize: "15px" }}><h4><b>({this.state.arabicPartnerName} Dated: {moment(parseInt(_.get(this.state.settlementData, 'startDate', 0)) * 1000).format('DD/MM/YYYY')} - {moment(parseInt(_.get(this.state.settlementData, 'endDate', 0)) * 1000).format('DD/MM/YYYY')})</b></h4></div>
                                        </div>
                                    </div>

                                </div>



                                <div className="row">
                                    <div className="col-md-offset-2">
                                        <div className="col-3">
                                            <TileUnit data={[{
                                                title: "AMOUNT",
                                                value: _.get(this.state.settlementData, 'amount', 0),
                                                percentageTag: true
                                            }]} />
                                        </div>
                                        <div className="col-3">
                                            <TileUnit data={[{
                                                title: "Commission",
                                                value: _.get(this.state.settlementData, 'commissionAmount', 0),
                                                percentageTag: true
                                            }]} />
                                        </div>
                                        <div className="col-3">
                                            <TileUnit data={[{
                                                title: "POINTS",
                                                value: _.get(this.state.settlementData, 'Points', 0),
                                                percentageTag: true
                                            }]} />
                                        </div>


                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Invoice Reference:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={_.get(this.state.settlementData, 'batchInvoice', 0)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Invoice Date:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={_.get(this.state.settlementData, 'invoiceDate', '02/12/2020') || '02/12/2020'} />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Payment Reference:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={_.get(this.state.settlementData, 'paymentref', 'N/A')} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Payment Date:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={_.get(this.state.settlementData, 'paymentDate', 'N/A')} />
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                </div>
                                <br />

                                <Portlet title={utils.getLabelByID("TRANSACTIONS")}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Start Date")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <DateControl
                                                    id='endDate'
                                                    dateChange={this.onStartDateChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("End Date")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <DateControl
                                                    id='endDate'
                                                    dateChange={this.onEndDateChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right">
                                                    <button type="submit" className="btn green" onClick={this.formSubmit}>
                                                        {utils.getLabelByID('Search')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col>
                                            <Col>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("viewTranxListSettlemnt")}
                                                    gridData={this.state.gridData}
                                                    fontclass=""
                                                    pageSize={10}
                                                    pageChanged={this.pageChanged}
                                                    pagination={true}
                                                    activePage={this.state.page.currentPageNo}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Col>
                                                <h3>Tracking Events</h3>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("viewTranxListEvents")}
                                                    gridData={this.state.gridDataTPool}
                                                    fontclass=""
                                                    totalRecords={this.state.totalRecords}
                                                    pageSize={10}
                                                    pagination={false}
                                                    search={true}
                                                    activePage={this.state.page.currentPageNo}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Portlet>
                            </div >
                        </Col>
                    </Row>
                </Row>
            );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        id: ownProps.params.id,
        from: ownProps.params.from,
        with: ownProps.params.with,
        settlementData: _.get(state.app, "result", {}),
        getPartnerDataByID: _.get(state.app, 'entityDetail.data'),

    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
ViewSettlement.displayName = "View Settlement";
export default connect(mapStateToProps, mapDispatchToProps)(ViewSettlement);













