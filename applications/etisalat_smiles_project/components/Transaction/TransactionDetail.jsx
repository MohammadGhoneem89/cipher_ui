/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import Tile from '../../../../core/common/tile.jsx';
import Header from '../../../../core/common/Header.jsx';
import Label from '../../../../core/common/Lable.jsx';

import Portlet from '../../../../core/common/Portlet.jsx';
import Col from '../../../../core/common/Col.jsx';
import Row from '../../../../core/common/Row.jsx';
import _ from 'lodash';
import * as requestCreator from '../../../../core/common/request.js';
import { Card } from 'antd';


class TransactionDetail extends React.Component {
    constructor(props) {
        console.log("View Transaction Details")
        super(props);
        this.state = {
            viewCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            actions: [],
            transactionData: [],

            dashboardTiles: [{
                title: "Amount",
                value: "12",

                percentageTag: false
            }],


        };
        this.data = [];
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
                "sourceTransactionId": this.props.id
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.getViewTransactions && nextProps.typeData && nextProps.gridActions[0] && nextProps.gridActions[0].pageActions) {
        // console.log(nextProps.gridActions[0].pageActions, "nextProps.gridActions[0].pageActions");
        // let pageActions = nextProps.gridActions[0].pageActions;
        if (nextProps.transactionData) {
          
            let transactionData = nextProps.transactionData;
            this.setState(
                {
                    transactionData,
                    gridData: _.get(transactionData, 'transactionPool', []),
                    isLoading: false
                }
            )
        }
        // }
    }



    componentDidMount() {
        this.props.actions.generalProcess(constants.getTransactionByID, this.getRequest());
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


    render() {
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        else
            return (
                <Row>
                    <Col>
                        <Col>
                            <div className="row">
                                <Portlet title='transaction details'>
                                    <div className="row">
                                        <div className="col-md-offset-4 col-md-12">
                                            <div className="col-md-2">
                                                <img src="/assets/imgs/gift.jpg" style={{ height: "150px" }} />
                                            </div>

                                            <div className="col-md-3 text-center" >
                                                <div style={{ fontSize: "30px", marginTop: "30px" }}><b>CBD-76545677</b></div>
                                                <div className="row" style={{ marginTop: "30px" }}>Commercial Bank of Dubai (10/10/2019-20/10/2019)</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <img src="/assets/Resources/Hyperledger_Fabric_Logo_White.png" className="tablogo" />
                    <h1 style={{ color: 'grey' }}>COMMERCIAL BANK OF DUBAI</h1> */}
                                    <div className="col-md-offset-1">
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Partner Tx. ID:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={this.state.transactionData.sourceTransactionId} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Submitted By Partner:" />
                                                </div>
                                                <div style={{ "padding": "0px" }} className="col-md-8">
                                                    <Label text={this.state.transactionData.partnerCode} />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Membership Number:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={this.state.transactionData.membershipNo} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Payment Reference:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={this.state.transactionData.paymentref} />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Transaction Type:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={this.state.transactionData.transactionType} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Sub Type:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={this.state.transactionData.transactionSubType} />
                                                </div>
                                            </div>
                                        </Row>

                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Settlement Batch No:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={_.get(this.state.transactionData, 'settlementBatchID', 'N/A')} />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">

                                                    <Label text="Mobile No:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text={_.get(this.state.transactionData, 'accrualParams.mobileNo', 'N/A')} />
                                                </div>
                                            </div>
                                        </Row>


                                        {/*
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Error:" />
                                                </div>
                                                <div className="col-md-8">
                                                    <Label text="1111111111" />
                                                </div>
                                            </div>
                                        </Row>
 */}

                                        <Row>
                                            <div className="col-md-offset-1">
                                                <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                                                    <Label text="Amount" />
                                                    <Label style={{ "font-size": "30px", "color": "#1d9b1d" }} text={`${_.get(this.state.transactionData, 'accrualParams.amountSpent', '0')} AED`} />
                                                </div>
                                                <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                                                    <Label text="Commission" />
                                                    <Label style={{ "font-size": "30px", "color": "#1d9b1d" }} text={`${_.get(this.state.transactionData, 'commissionAmount', '0')} AED`} />
                                                </div>
                                                <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                                                    <Label text="Points Awarded" />
                                                    <Label style={{ "font-size": "30px", "color": "#1d9b1d" }} text={`${_.get(this.state.transactionData, 'pointsAwarded', '0')} AED`} />
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col>
                                            <Col>
                                                <h1>Transaction Events</h1>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("viewTranxListEvents")}
                                                    gridData={this.state.gridData}
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
                            </div>
                        </Col>
                    </Col>
                </Row >
            );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        gridActions: _.get(state.app, 'getMasterAgreement.actions', []),
        transactionData: _.get(state.app, "responseMessage.data.getTransactionByID", {}),
        getPage: _.get(state.app, "getMasterAgreement.pageData", []),
        id: ownProps.params.id,

    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
TransactionDetail.displayName = "Transaction Detail ";
export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);













