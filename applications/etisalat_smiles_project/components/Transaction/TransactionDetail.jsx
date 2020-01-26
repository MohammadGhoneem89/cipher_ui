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

            dashboardTiles: [{
                title: "Amount",
                value: "12",

                percentageTag: false
            }],


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

        let contractID = document.getElementById('contractId') == null ? "" : document.getElementById('contractId').value;
        // let customerID = document.getElementById('customer') == null ? "" : document.getElementById('customer').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        let searchCriteria = {}

        // if (contractID != "")
        //     searchCriteria.contractID = contractID
        // // if (customerID != "")
        // //     searchCriteria.customerID = customerID
        // if (status != "")
        //     searchCriteria.status = status


        // this.setState({ searchCriteria: searchCriteria })
        // let request = {
        //     "body": {
        //         "page": {
        //             "currentPageNo": this.state.page.currentPageNo,
        //             "pageSize": this.state.page.pageSize
        //         },
        //         searchCriteria
        //     }

        // };
        // return request;
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
                <Portlet title=''>
                    <Row>
                        <div className="col-md-12">
                            <div className="col-md-5">
                            </div>
                            <div >
                                <label>COMMERCIAL BANK OF DUBAI</label>
                            </div>
                        </div>
                    </Row>


                    {/* <img src="/assets/Resources/Hyperledger_Fabric_Logo_White.png" className="tablogo" />
                    <h1 style={{ color: 'grey' }}>COMMERCIAL BANK OF DUBAI</h1> */}
                    <div className="row">
                        <div className="col-md-3" style={{ 'border': '2px solid','padding': '5px','margin-left': '10px' }}  >
                            <div class="card" style={{ 'display': 'flex', 'justify-content': 'center', 'flex-direction': 'column', 'align-items': 'center'}}>
                                <div class="card-body">
                                    <p class="card-text">Amount Spent</p>
                                    <h4 class="card-title">500 AED</h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group col-md-6">
                                <label className="control-label">{utils.getLabelByID("Partner Transaction Id:")}</label>
                            </div>
                            <div className="form-group col-md-4" >
                                <label className="control-label">111111 </label>
                            </div>
                        </div>




                        <div className="col-md-5">
                            <div className="form-group col-md-6">
                                <label className="control-label">{utils.getLabelByID("Submitted by Partner")}</label>
                            </div>
                            <div className="form-group col-md-4" >
                                <label className="control-label">111111 </label>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="form-group col-md-6">
                                <label className="control-label">{utils.getLabelByID("membership#")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">111111 </label>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="form-group col-md-6">
                                <label className="control-label">{utils.getLabelByID("Processed By Etisalat:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">111111 </label>

                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group col-md-2">
                                <label className="control-label">{utils.getLabelByID("Mobile No:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">111111</label>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="form-group col-md-2">
                                <label className="control-label">{utils.getLabelByID("Transaction Type:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">Welcome Bonus</label>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group col-md-2">
                                <label className="control-label">{utils.getLabelByID("Sub Type:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">Visa</label>
                            </div>
                        </div>

                        <Row>
                            <Col>
                                <TileUnit data={this.state.dashboardTiles} />
                                <TileUnit data={this.state.dashboardTiles} />
                            </Col>
                        </Row>

                        <div className="col-md-12">
                            <div className="form-group col-md-2">
                                <label className="control-label">{utils.getLabelByID("Settlment Batch:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">1111111145</label>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group col-md-2">
                                <label className="control-label">{utils.getLabelByID("File Name:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">1554645</label>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <label className="control-label">{utils.getLabelByID("Error:")}</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="control-label">Files Not Found</label>
                            </div>
                        </div>

                    </div>
                    {/* </Portlet>
                 <Portlet  actions={this.state.actions} isPermissioned={true}> */}
                    {/* UTS */}



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
TransactionDetail.displayName = "Transaction Detail ";
export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);













