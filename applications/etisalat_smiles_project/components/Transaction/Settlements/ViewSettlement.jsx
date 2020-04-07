
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../../core/common/utils.js';
import Combobox from '../../../../../core/common/Select.jsx';
import Table from '../../../../../core/common/Datatable.jsx';
import * as actions from '../../../../../core/actions/generalAction';
import * as constants from '../../../../../core/constants/Communication.js';
import Portlet from '../../../../../core/common/Portlet.jsx';
import Steps from '../../../../../core/common/Steps.jsx';
import { browserHistory } from 'react-router';
import Col from '../../../../../core/common/Col.jsx';
import Row from '../../../../../core/common/Row.jsx';
import TileUnit from '../../../../../core/common/tileUnit.jsx';
import * as gen from '../../../../../core/common/generalActionHandler';
import _ from 'lodash';
import DateControl from '../../../../../core/common/DateControl.jsx';
import * as requestCreator from '../../../../../core/common/request.js';
import Label from '../../../../../core/common/Lable.jsx';
import moment from 'moment';
import ModalBox from '../../../../../core/common/ModalBox.jsx';
import * as toaster from '../../../../../core/common/toaster.js';
import Input from '../../../../../core/common/Input.jsx'



class ViewSettlement extends React.Component {
    constructor(props) {
        console.log("View Settlements")
        super(props);
        this.state = {
            viewCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1,
                totalRecords: 0
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
        this.generalHandler = gen.generalHandler.bind(this)
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
        this.setState({ searchCriteria: {},  ModalBoxGrid: false });
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

            if(nextProps.settlementData.Status=="PENDING" && !this.state.intervalId ){
            let intervalId = setInterval(() => {

            this.props.actions.generalProcess(constants.getSettlementBatch, this.getRequest());
        }, 10000);

        this.setState({
            intervalId
        })
    }else if (nextProps.settlementData.Status!="PENDING"){
        clearInterval(this.state.intervalId)
    }

            let btnflowName="";
            let visibilityFlow="visible";
            if(nextProps.settlementData.Status=="INITIATED"){

                btnflowName="Approve"
            }else if (nextProps.settlementData.Status=="APPROVED") {
                btnflowName="Invoice"
            }else if (nextProps.settlementData.Status=="INVOICED") {
                btnflowName="Paid"
                
            }else if (nextProps.settlementData.Status=="PAID") {
                btnflowName="Receive"
            }else{
                visibilityFlow="hidden";
            }

            let result=[]
          
            // let  actions = [{
            //     "value": "4014",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "fa fa-eye",
            //     "URI": [`/smiles/transaction/view/${obj.partnerCode}/${obj.withPartnerCode}`]
            // }];
            let  actions = [{}]
           result =settlementData.transactionList.map(obj => {
                //obj.actions = actions;  
                obj.actions =  [{
                    "value": "4014",
                    "type": "componentAction",
                    "label": "View",
                    "params": "",
                    "iconName": "fa fa-eye",
                    //"URI": [`/smiles/transaction/view/${obj.partnerCode}/${obj.withPartnerCode}`]
                    "URI": ['/smiles/transaction/view']

                }]
                return obj;

            })     
           this.setState({ gridData: result })
    
               console.log("settlementData-------------",this.state.gridData)
               //console.log("Data-------------",data)


           

            this.setState(
                {
                    settlementData,
                    gridDataTPool: _.get(settlementData, 'transactionPool', []),
                    //gridData: _.get(settlementData, 'transactionList', []),
                    isLoading: false,
                    englishPartnerName: _.get(data, 'entityName', ''),
                    arabicPartnerName: _.get(data, 'spCode', ''),
                    partnerLogo: _.get(data, 'entityLogo.sizeSmall', ''),
                    btnflowName:btnflowName
                }
            )
        }
    }
    getRequestPartner = () => {

        let partnerCode = (this.props.id).split("_")
        console.log('-------PARTNERCODE ', partnerCode[0])
        return { "action": "entityDetail", "spCode": this.props.with }

    };


    showHideManualSettlement = () => {
        this.setState({
            ModalBoxGrid: !this.state.ModalBoxGrid
        });
    }

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
 componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
    }

    updateSettlement = () => {

       let settlementData= this.state.settlementData
       


        let status="";


        if(settlementData.Status=='INITIATED'){
            this.state.sendingStatus="APPROVED"
            this.state.actionSettlement='APPROVED'
            this.updateCall(status);
        }else if(settlementData.Status=='APPROVED'){
            this.state.sendingStatus="INVOICED"
            this.state.actionSettlement='Invoiced'
            this.state.valueType="Invoice Number : "
            this.showHideManualSettlement();

        }else if(settlementData.Status=='INVOICED'){
            this.state.sendingStatus="PAID"
            this.state.actionSettlement='Paid'
            this.state.valueType="Payment Reference Number :"
            this.showHideManualSettlement();

        }else if(settlementData.Status=='PAID'){
            this.state.sendingStatus="RECIEVED"
            this.updateCall()
        }

        
    }

    hideandCall = () =>{
        showHideManualSettlement();
        updateCall()
    }

    updateCall = () => {


        let settlementData= this.state.settlementData

        let body = {
            fromPartner:settlementData.partenerCode,
            withPartner:settlementData.withPartenerCode,
            poolID:settlementData.key,
            statusRecv:this.state.sendingStatus,
            payref:_.get(this.state,"body.settleValue",""),

     
           
                    }




                    this.props.actions.generalAjxProcess(constants.updateSettlement,{ body})
                        .then(result => {

                            console.log(result)
                            result.message.status == 'ERROR' ? toaster.showToast(result.message.errorDescription, "ERROR") : toaster.showToast("Settlement Batch Submitted");
                            this.showHideManualSettlement();
                            result.message.status == 'OK'? browserHistory.push('/smiles/settlementList'):""


                        });

    }










    renderBtn = () => {
        if(this.state.btnflowName!="")
        return (<button type="submit"  style={{float:"right",marginLeft:"33px"}} className="btn green" onClick={this.updateSettlement}>
        {this.state.btnflowName}
           </button>)

    }


    renderModalGrid = () => {

        return (<Portlet style={{ height: '325px' }} title="Reference Number" isPermissioned={true}>
            
            <form style={{ padding: "21 28px 14 14" }}>

    
                <div className="row">
              
                    <div className="col-md-6">
                        <Label text={this.state.valueType} columns='4' />

                        <Combobox
                                        fieldname='settleValue'
                                        formname='body'
                                        placeholder='Please enter reference number'
                                        style={{}}
                                        columns={8}
                                        state={this.state}
                                        typeData="status"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                        

                    </div>
                    {/* <div className="col-md-6">
                        <Label required={true} text="To Partner Code" columns='4' />
                        <Combobox
                            fieldname='withPartenerCode'
                            formname='body'
                            columns='8'
                            placeholder='Select'
                            style={{}}
                            state={this.state}
                            typeName="entityNames"
                            dataSource={_.get(this.state, 'typeData', {})}
                            actionHandler={this.generalHandler}
                            className="form-control"
                        /> 
                    </div> */}
                    <button type="button" className="btn green" onClick={this.updateCall}>
                    {this.state.btnflowName}
                                            </button>
                </div>

               
            </form>

        
        </Portlet>)
    }










    render() {
       
        console.log('------------------grid data',this.state.gridData)
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        else
            return (
                <Row>
                    <Row>
                        <Steps statusList={[{ status: this.state.settlementData.Status=="INITIATED", label: 'INITIATED' }, { status: this.state.settlementData.Status=="APPROVED", label: 'APPROVED' },{ status: this.state.settlementData.Status=="INVOICED", label: 'INVOICED' }, { status: this.state.settlementData.Status=="PAID", label: 'PAID' }, { status: this.state.settlementData.Status=="RECIEVED", label: 'RECEIVED' }]} />
                    </Row>
                    <Row>
                        <Col>

                        <ModalBox isOpen={this.state.ModalBoxGrid}>
                        {this.renderModalGrid()}
                    </ModalBox>                            <div className="form">
                                     

                                  

                                       {/**src={this.state.partnerLogo} */}
                                         <div className="row" style={{marginBottom:"30px"}}>
                                                <div className="col-md-2"></div>
                                                <div className="col-md-3 text-center">
                                                    <div className="voucherBoxSettlement">                                                  
                                                        <div className="areacard">
                                                            <img src="../../../../../images/etihad.png" style={{ width: "130px", height: "68px", marginTop:"40px" }} />
                                                            
                                                      </div>
                                                    </div>
                                                </div> 
                                                <div className="col-md-2 text-center">
                                                    <img src="../../../../../images/arrow.png" style={{ width: "50px", marginTop:"40px" }}/>
                                                </div>
                                                <div className="col-md-3 text-center">
                                                    <div className="voucherBoxSettlement">                                                  
                                                        <div className="areacard">
                                                        <img src="../../../../../images/smiles.jpg" style={{ width: "68px", height: "68px" }} />
                                                        <p><b>{this.state.englishPartnerName}</b></p>
                                                        <p style={{paddingRight:"50px",paddingLeft:"50px"}}><b>
                                                            ({this.state.arabicPartnerName} Dated: {moment(parseInt(_.get(this.state.settlementData, 'startDate', 0))).format('DD/MM/YYYY')} - {moment(parseInt(_.get(this.state.settlementData, 'endDate', 0)) ).format('DD/MM/YYYY')})
                                                            </b></p>
                                                            
                                                        </div>
                                                    </div>
                                                </div> 
                                        </div>            

                          



                                {/**    style={{paddingRight:"50px",paddingLeft:"50px"}}
                                 *  <div className="row" >
                            
                                    <div className="col-md-offset-3 col-md-12" style={{ marginBottom: '4%' }}>
                                        <div className="col-md-2">
                                            <img src={this.state.partnerLogo} style={{ width: "130px" }} />
                                        </div>

                                        <div className="col-md-4 text-center" >
                                            <div style={{ fontSize: "30px", marginTop: "30px" }}><b>{this.state.englishPartnerName}</b></div>
                                            <div className="row" style={{ fontSize: "15px" }}><h4><b>({this.state.arabicPartnerName} Dated: {moment(parseInt(_.get(this.state.settlementData, 'startDate', 0))).format('DD/MM/YYYY')} - {moment(parseInt(_.get(this.state.settlementData, 'endDate', 0)) ).format('DD/MM/YYYY')})</b></h4></div>
                                        </div>
                                    </div>

                                </div>
                                 */}


                               



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
                                                    {_.get(this.state.settlementData, 'batchInvoice', 0)} 
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Invoice Date:" />
                                                </div>
                                                <div className="col-md-8">
                                                    {moment(parseInt(_.get(this.state.settlementData, 'invoiceDate', 0)) ).format('DD/MM/YYYY')} 
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Payment Reference:" />
                                                </div>
                                                <div className="col-md-8">
                                                    {_.get(this.state.settlementData, 'paymentref', 'N/A')} 
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-4">
                                                    <Label text="Payment Date:" />
                                                </div>
                                                <div className="col-md-8">
                                                     {moment(parseInt(_.get(this.state.settlementData, 'paymentDate', 0)) ).format('DD/MM/YYYY')} 
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                </div>
                                <br />

                                <Portlet title={utils.getLabelByID("TRANSACTIONS")}>
                                    {/* <div className="row">
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
                                    </div>           viewTranxListSettlemntDetail     viewTranxListEventsSettlement*/}
                                    <Row>
                                        <Col>
                                            <Col>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("viewTranxListSettlemntDetail")}
                                                    gridData={this.state.gridData}
                                                    //pageSize={10}
                                                    pageChanged={this.pageChanged}
                                                    pagination={true}
                                                    activePage={this.state.page.currentPageNo}


                                                     totalRecords={this.state.page.totalRecords}
                                                    // pageChanged={this.pageChanged}
                                                     pageSize={this.state.page.pageSize}
                                                    // pagination={true}
                                                    // activePage={this.state.page.currentPageNo}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Col>
                                                <h3>Tracking Events</h3>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("viewTranxListEventsSettlement")}
                                                    gridData={this.state.gridDataTPool}
                                                    fontclass=""
                                                    //totalRecords={this.state.totalRecords}
                                                    totalRecords={this.state.page.totalRecords}
                                                    pageSize={this.state.page.pageSize}
                                                    //pageSize={10}
                                                    pagination={true}
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
                    <Row>
                    <div className="col-md-12">
                        
                    {this.renderBtn()}
                                
                                            </div>
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













