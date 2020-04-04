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
            englishPartnerName: '',
            partnerLogo: '',
            arabicPartnerName: '',
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
                "sourceTransactionId": this.props.id,
                "from": this.props.from,
                "with": this.props.with
            }
        };
    }

    getRequestPartner = () => {

        let partnerCode = (this.props.id).split("_")
        console.log('-------PARTNERCODE ', partnerCode[0])
        return { "action": "entityDetail", "spCode": partnerCode[0] }

    };




    componentWillReceiveProps(nextProps) {
        if (nextProps.transactionData) {
            let transactionData = nextProps.transactionData;
let targetMembership="";
let membership="";
            if(nextProps.transactionData.transactionSubType=="SO"){
                membership=nextProps.transactionData.membershipNo
                targetMembership=nextProps.transactionData.conversionParams.targetMemberShipNo


            }else{

                targetMembership=nextProps.transactionData.membershipNo
                membership =nextProps.transactionData.conversionParams.targetMemberShipNo


            }
            this.setState(
                {
                    transactionData,
                    gridData: _.get(transactionData, 'transactionPool', []),
                    isLoading: false,
                    membership:membership,
                    targetMembership:targetMembership
                }
            )
        }

        if (nextProps.getPartnerDataByID) {
            let data = nextProps.getPartnerDataByID;
            this.setState({
                englishPartnerName: _.get(data, 'entityName', ''),
                arabicPartnerName: _.get(data, 'spCode', ''),
                partnerLogo: _.get(data, 'entityLogo.sizeSmall', '')
            })
        }


        if (nextProps.getAllOrgMap && nextProps.transactionData ) {
           
            this.setState(
                {
                    allOrgMap: [..._.get(nextProps, 'getAllOrgMap', [])],

                }
            )

            nextProps.getAllOrgMap.forEach(e=>{

                console.log(">>>>"+JSON.stringify(e)+">>>"+JSON.stringify(nextProps.transactionData))
                if(nextProps.transactionData.actualFrom==e.orgCode){
                    this.setState({
                        
                        from: e.img
                    })
                }


                    if(nextProps.transactionData.actualTo==e.orgCode){
                        this.setState({
                            
                            to: e.img
                        })

                }
            })
            
        }   
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getTransactionByID, this.getRequest());
        this.props.actions.generalProcess(constants.orgDetail, this.getRequestPartner());

        this.props.actions.generalProcess(constants.getAllOrgMap, {});
        let intervalId = setInterval(() => {
            this.props.actions.generalProcess(constants.getTransactionByID, this.getRequest());
           
        }, 10000);

        this.setState({
            intervalId
        })


        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
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
                                    <div className="row" style={{ "font-size": "15px", "color": "#1d9b1d" }}><Label text={this.state.transactionData.sourceTransactionId} /></div>
                                    <div className="row" style={{ "font-size": "15px",}}><b><Label text="CONFIRMED" /></b></div>
                                    <div className="row">&nbsp;&nbsp;<b>Transaction Date:&nbsp; 03/02/2020</b></div>
                                    <div className="row">&nbsp;&nbsp;<b>Confirmed On:&nbsp;&nbsp;&nbsp;&nbsp;    03/02/2020</b></div>
                                    <div className="row">
                                        <div className="col-md-offset-3 col-md-12" >
                                            <div className="row" style={{ marginTop:"30px" }}>
                                                <div className="col-md-4 boximage">
                                                    <img src={ this.state.partnerLogo} style={{ width: "100px", height:"100px" }} />
                                                     <div className="row" style={{ marginTop:"15px" }}><Label text="Membership Number:" /></div>
                                                     <div className="row"><Label text={this.state.transactionData.membershipNo} /></div>
                                                </div>
                                                
                                                   <div>
                                                      <img src="../../../../../images/arrow.png" className="col-md-4" style={{width: "150px", height:"50px", marginTop:"30px" }} />
                                                   </div>
                                              
                                                <div className="col-md-4 boximage2" >
                                                    <img src="../../../../../images/Etihad Airmiles.png" style={{ width: "130px", height:"120px", paddingRight:"10px" }} />
                                                     <div className="row" style={{ marginTop:"15px" }}><Label text="Membership Number:" /></div>
                                                     <div className="row"><Label text={this.state.transactionData.membershipNo} /></div>
                                                </div>
                                                
                                            </div>

                                           
                                        </div>

                                    </div>

                                    {/** &rarr;
                                     * src="../../../../assets/Resources/SMILES.png"
                                     *  <div className="col-md-4 text-center" >
                                                <div style={{ fontSize: "30px", marginTop: "30px" }}><b>{this.state.englishPartnerName}</b></div>
                                                <div className="row" style={{ fontSize: "15px" }}><h4><b>({this.state.transactionData.partnerCode } Dated:03/02/2020)</b></h4></div>
                                            </div>
                                     */}

                                    {/* <img src="/assets/Resources/Hyperledger_Fabric_Logo_White.png" className="tablogo" />
                    <h1 style={{ color: 'grey' }}>COMMERCIAL BANK OF DUBAI</h1> 
                     <div className="col-md-offset-1">
                    */}

                                    <div style={{marginLeft:"-10px", marginTop:"30px"}}>
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
                                                <div style={{ "padding": "0px" }} className="col-md-8">
                                                <Label text={this.state.transactionData.transactionSubType=="SO"?"Source to Others":"Other to Source"} />
                                                   
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Submited by partner" />
                                                </div>
                                                <div className="col-md-8">
                                                <Label text={this.state.transactionData.partnerCode} />
                                                </div>
                                            </div>
                                           
                                        </Row>
                                        
                                        <div style={{marginTop:"20px"}}>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <h4><b><Label text="SETTLEMENTS" /></b></h4>
                                                </div>
                                            </div>

                                        </Row>
                                       </div>

                                      
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">

                                                    <Label text="Settlement Batch No:" />
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
                                        //<div className="col-md-offset-1">
                                        */}

                                        <Row>
                                            <div>
                                                <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                                                    <Label text="Amount" />
                                                    <Label style={{ "font-size": "30px", "color": "#1d9b1d" }} text={`${_.get(this.state.transactionData, 'amount', '0')} AED`} />
                                                </div>
                                                <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                                                    <Label text="Commission" />
                                                    <Label style={{ "font-size": "30px", "color": "#1d9b1d" }} text={`${_.get(this.state.transactionData, 'commissionAmount', '0')} AED`} />
                                                </div>
                                                <div className="col-md-2 text-center" style={{ "border": "2px solid", "margin-bottom": "20px", "margin-top": "20px", "height": "90px", "margin-left": "50px", "padding": "2px" }}>
                                                    <Label text="Points Awarded" />
                                                    <Label style={{ "font-size": "30px", "color": "#1d9b1d" }} text={`${_.get(this.state.transactionData, 'pointsAwarded', '0')} `} />
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col>
                                            <Col>
                                                <h4><b>TRANSACTION TRACKING</b></h4>
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
        // gridActions: _.get(state.app, 'getMasterAgreement.actions', []),
        transactionData: _.get(state.app, "responseMessage.data.getTransactionByID", {}),
        // getPage: _.get(state.app, "getMasterAgreement.pageData", []),
        id: ownProps.params.id,
        from: ownProps.params.from,
        with: ownProps.params.with,
        // from/:with
        getPartnerDataByID: _.get(state.app, 'entityDetail.data'),
        getAllOrgMap: _.get(state.app, 'getAllOrgMap.data.searchResult', undefined),
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
TransactionDetail.displayName = "Transaction Detail ";
export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);













