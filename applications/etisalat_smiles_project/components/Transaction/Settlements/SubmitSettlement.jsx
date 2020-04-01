
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../../core/common/utils.js';
import Table from '../../../../../core/common/Datatable.jsx';
import { browserHistory } from 'react-router';
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
import * as toaster from '../../../../../core/common/toaster.js';
import moment from 'moment';

class SubmitSettlement extends React.Component {
    constructor(props) {

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
            actions: []
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
    }

    getRequest = (pageNo = 1) => {

        let searchCriteria = {
            ..._.get(this.state, 'searchCriteria', {})
        }
        console.log(searchCriteria, ' search criteria')

        let request = {
            "body": {
                "page": {
                    "currentPageNo": pageNo,
                    "pageSize": this.state.page.pageSize

                },
                searchCriteria
            }
        };
        return request
    }

    onStartDateChange = value => {
        value == 'Invalid date' ? this.setState({ startDate: undefined }) : this.setState({ startDate: value });
    };

    onEndDateChange = value => {
        value == 'Invalid date' ? this.setState({ endDate: undefined }) : this.setState({ endDate: value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.getTransactionList && nextProps.user && nextProps.userEntity) {
            let page = { ...nextProps.getTransactionList.pageData }
            let commissionAmount = 0
            let amount = 0
            let pointsAwarded = 0
            let txList = []
            nextProps.getTransactionList.searchResult.forEach(element => {
                commissionAmount += _.get(element, 'tranxData.commissionAmount', 0)
                amount += _.get(element, 'tranxData.amount', 0)
                pointsAwarded += _.get(element, 'tranxData.pointsAwarded', 0)
                let key = _.get(element, 'key', undefined)
                key && txList.push(key)
            });

            console.log("Points Awarded "+pointsAwarded )
            if (txList.length == 0 && !this.state.txList) {
                toaster.showToast("No transactions found for submition", "ERROR");
                this.setState({
                    txList,
                    user: { ...nextProps.user },
                    userEntity: {
                        ...nextProps.userEntity
                    },
                    isLoading: false,
                    page,
                    settlementData: {
                        commissionAmount,
                        amount,
                        pointsAwarded
                    },
                    gridData: nextProps.getTransactionList.searchResult
                })
            }

         
            this.setState({
                txList,
                user: { ...nextProps.user },
                userEntity: {
                    ...nextProps.userEntity
                },
                isLoading: false,
                page,
                settlementData: {
                    commissionAmount,
                    amount,
                    pointsAwarded
                },
                gridData: nextProps.getTransactionList.searchResult,
                searchCriteria: {
                    actualFrom: this.props.params.actualFrom,
                    actualTo: this.props.params.actualTo,
                  //  partnerCode: this.props.params.fromPartnerCode,
                    //withPartnerCode: this.props.params.withPartnerCode,
                    internalStatus: "CONFIRMED",
                    startDate: this.props.params.Start,
                    endDate: this.props.params.End
                }
            })
        }
    }
    getRequestPartner = () => {
        
        let partnerCode = (this.props.id).split("_")
        console.log('-------PARTNERCODE ', partnerCode[0])
        return { "action": "entityDetail", "spCode": this.props.with }

    };

    componentDidMount() {
  
        let request = {
            "body": {
                "page": {
                    "currentPageNo": 1,
                    "pageSize": 10

                },
                "searchCriteria": {

                    actualFrom: this.props.params.actualFrom,
                    actualTo: this.props.params.actualTo,
                  //  partnerCode: this.props.params.fromPartnerCode,
                    //withPartnerCode: this.props.params.withPartnerCode,
                    internalStatus: "CONFIRMED",
                    startDate: this.props.params.Start,
                    endDate: this.props.params.End
                }
            }
        };
        this.props.actions.generalProcess(constants.getTransactionsForSettlement, request);
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
            "currentPageNo": 1,
            "pageSize": 1
        }));
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

    pageChanged = pageNo => {
        console.log('page changed : ', pageNo)
        this.updateCurrentPage(pageNo);
        this.props.actions.generalProcess(constants.getTransactionsForSettlement, this.getRequest(pageNo));
    };

    updateCurrentPage = pageNo => {
        let page = { ...this.state.page };
        page.currentPageNo = pageNo;
        this.setState({ page });
    };

    createSettlementBatch = (e) => {
        e.preventDefault()
        this.setState({ isLoading: true })
        window.scrollTo(0, 0);
        this.props.actions.generalAjxProcess(constants.createSettlementBatch, {
            body: {
                actualFrom: this.props.params.actualFrom,
                actualTo: this.props.params.actualTo,
                Start: this.props.params.Start,
                End: this.props.params.End,
                txList: _.get(this.state, 'txList', [])
            }
        })
            .then(result => {
                console.log(result)
                result.message.status == 'ERROR' ? toaster.showToast(result.message.errorDescription, "ERROR") : toaster.showToast("Settlement Batch Submitted");
                //this.setState({ isLoading: false })
                browserHistory.push('/smiles/settlementList')
            }).catch(result => {
                window.scrollTo(0, 0);
                this.setState({ isLoading: false })
                toaster.showToast(utils.getLabelByID("Settlment Batch not Submitted"), "ERROR");
            })
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
                                            <img src={_.get(this.state, 'userEntity.entityLogo.sizeSmall', '')} style={{ width: "130px" }} />
                                        </div>

                                        <div className="col-md-4 text-center" >
                                            <div style={{ fontSize: "30px", marginTop: "30px" }}><b>{this.state.englishPartnerName}</b></div>
                                            <div className="row" style={{ fontSize: "15px" }}><h4><b>({this.state.arabicPartnerName} Dated: {moment(parseInt(_.get(this.props.params, 'Start', 0))).format('DD/MM/YYYY')} - {moment(parseInt(_.get(this.props.params, 'End', 0)) ).format('DD/MM/YYYY')})</b></h4></div>
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
                                                value: _.get(this.state.settlementData, 'pointsAwarded', 0),
                                                percentageTag: true
                                            }]} />
                                        </div>



                                    </div>
                                </div>
                                <br />

                                <Portlet title={utils.getLabelByID("TRANSACTIONS")}>
                                    <Row>
                                        <Col>
                                            <Col>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("viewTranxListSettlemnt")}
                                                    gridData={this.state.gridData}
                                                    fontclass=""
                                                    pageSize={this.state.page.pageSize}
                                                    pageChanged={this.pageChanged}
                                                    pagination={true}
                                                    activePage={this.state.page.currentPageNo}
                                                    totalRecords={this.state.page.totalRecords}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Portlet>
                            </div >
                        </Col>


                        <div className="row">
                            <div className="row clearfix pull-right">
                                <button disabled={this.state.txList.length == 0 ? true : false} onClick={this.createSettlementBatch} type={"submit"} className="btn green" style={{ marginRight: '44px' }}>
                                    Submit
                                </button>
                            </div>
                        </div>

                    </Row>
                </Row>
            );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: _.get(state.app, 'user.data.searchResult', undefined),
        getTransactionList: _.get(state, 'app.getTransactionList', undefined),
        userEntity: _.get(state.app, 'entityList.data.searchResult[0]', undefined),
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
SubmitSettlement.displayName = "Submit Settlement";
export default connect(mapStateToProps, mapDispatchToProps)(SubmitSettlement);













