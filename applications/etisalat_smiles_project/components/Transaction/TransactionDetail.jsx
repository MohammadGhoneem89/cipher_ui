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

                    <Row>
                        <div className="col-md-2">
                            <Label text="Partner Transaction ID:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                        <div className="col-md-2">
                            <Label text="Submitted By Partner:" />
                        </div>
                        <div style={{"padding":"0px"}} className="col-md-2">
                            <Label text="1111111111" />
                        </div>

                    </Row>

                    <Row>
                        <div className="col-md-2">
                            <Label text="Membership Number:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>

                    <Row>
                        <div className="col-md-2">
                            <Label text="Mobile Number:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>

                    <Row>
                        <div className="col-md-2">
                            <Label text="Transaction Type:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>

                    <Row>
                        <div className="col-md-2">
                            <Label text="Sub Type:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>

                    <Row>
                        <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                            <Label text="Amount" />
                            <Label style={{ "font-size":"30px","color":"#1d9b1d"}} text="500 AED" />
                        </div>
                        <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                            <Label text="Points Awarded" />
                            <Label style={{ "font-size":"30px","color":"#1d9b1d"}} text="500 " />
                        </div>
                    </Row>
                   
                    <Row>
                        <div className="col-md-2">
                            <Label text="Settlement Batch No:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-2">
                            <Label text="File Name:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-2">
                            <Label text="Error:" />
                        </div>
                        <div className="col-md-3">
                            <Label text="1111111111" />
                        </div>
                    </Row>
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













