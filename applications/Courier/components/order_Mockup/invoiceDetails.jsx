/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _, { constant } from 'lodash';
import { browserHistory } from 'react-router';
import unescapejs from 'unescape-js';
import ShadowBox from '../../common/ShadowBox.jsx'
// import Steps from '../../../../core/common/Steps.jsx';
import Table from '../../../../core/common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as toaster from '../../../../core/common/toaster.js';
import * as requestCreator from '../../../../core/common/request.js';
import ModalBox from '../../../../core/common/ModalBox.jsx';
import moment from 'moment'
import backOffices from '../../../backOffices';
import Lable from '../../common/Lable.jsx';
import lov from './typedata.js';
import AnchorComp from '../../common/AnchorComp.jsx';
import * as constantsApp from '../../constants/appCommunication.js';

let baseUrl = backOffices.baseUrl;
let interval;
class InvoiceDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalIsOpen: false,
      gridData: [],
      typeData: [],
      showData: {},
      orderDetails: undefined,
      lineItems: undefined,
      orgDetailByCode: undefined,
      statusList: [
        [
          {
            "label": "Finalized",
            "status": false,
            "type": "SUCCESS",
            "legend": "Finalized"
          },
          {
            "label": "HAWB Created",
            "status": true,
            "type": "SUCCESS",
            "legend": "HAWBCreated"
          },
          {
            "label": "Cleared",
            "status": false,
            "type": "SUCCESS",
            "legend": "ExportCleared"
          },
          {
            "label": "Delivered",
            "status": true,
            "type": "SUCCESS",
            "legend": "Delivered"
          }
        ],
        [
          {
            "label": "Finalized",
            "status": false,
            "type": "SUCCESS",
            "legend": "Finalized"
          },
          {
            "label": "HAWB Created",
            "status": true,
            "type": "SUCCESS",
            "legend": "HAWBCreated"
          },
          {
            "label": "Cleared",
            "status": false,
            "type": "SUCCESS",
            "legend": "ExportCleared"
          },
          {
            "label": "Undelivered",
            "status": true,
            "type": "SUCCESS",
            "legend": "Undelivered"
          },
          {
            "label": "Cleared",
            "status": false,
            "type": "SUCCESS",
            "legend": "ImportCleared"
          },
          {
            "label": "Full Return",
            "status": true,
            "type": "SUCCESS",
            "legend": "FullReturn"
          }
        ],
        [
          {
            "label": "Finalized",
            "status": false,
            "type": "SUCCESS",
            "legend": "Finalized"
          },
          {
            "label": "HAWB Created",
            "status": true,
            "type": "SUCCESS",
            "legend": "HAWBCreated"
          },
          {
            "label": "Cleared",
            "status": false,
            "type": "SUCCESS",
            "legend": "ExportCleared"
          },
          {
            "label": "Return By Customer",
            "status": true,
            "type": "SUCCESS",
            "legend": "ReturnByCustomer"
          },
          {
            "label": "Import Cleared",
            "status": false,
            "type": "SUCCESS",
            "legend": "ImportCleared"
          },
          {
            "label": "Partial Return",
            "status": true,
            "type": "SUCCESS",
            "legend": "PartialReturn"
          }
        ],
        [
          {
            "label": "Finalized",
            "status": false,
            "type": "SUCCESS",
            "legend": "Finalized"
          },
          {
            "label": "Cancelled",
            "status": true,
            "type": "SUCCESS",
            "legend": "Canceled"
          }
        ]
      ],
      invoiceStatus : [
        [
          {"label": "FINALIZED" , "value":"FINALIZED"},
          {"label": "TRANSPORTED" , "value": "TRANSPORTED"},
          {"label": "DECLARED", "value": "DECLARED"},
          {"label": "DELIVERED", "value": "DELIVERED"}
        ], // stage1: FINALIZED, TRANSPORTED,DECLARED, EXIT,DELIVERED
        [
          {"label": "FINALIZED" , "value":"FINALIZED"},
          {"label": "CANCELLED" , "value":"CANCELLED"}
        ] , //stage2: CANCELLED
        [
          {"label": "FINALIZED" , "value":"FINALIZED"},
          {"label": "TRANSPORTED" , "value": "TRANSPORTED"},
          {"label": "DECLARED", "value": "DECLARED"},
          {"label": "UNDELIVERED", "value": "UNDELIVERED"},
          {"label": "RET_TRANSPORTED" , "value": "RET_TRANSPORTED"},
          {"label": "RET_DECLARED" , "value": "RET_DECLARED"},
          {"label": "FULL RETURN", "value": "FULL RETURN"}
        ] , //stage3: UNDELIVERED,
        [
          {"label": "FINALIZED" , "value":"FINALIZED"},
          {"label": "TRANSPORTED" , "value": "TRANSPORTED"},
          {"label": "DECLARED", "value": "DECLARED"},
          {"label": "UNDELIVERED", "value": "UNDELIVERED"},
          {"label": "RET_TRANSPORTED" , "value": "RET_TRANSPORTED"},
          {"label": "RET_DECLARED" , "value": "RET_DECLARED"},
          {"label": "FULL RETURN", "value": "FULL RETURN"}
        ] , //stage4: RETURN_BY_CUSTOMER and FULL RETURN"
        [
          {"label": "FINALIZED" , "value":"FINALIZED"},
          {"label": "TRANSPORTED" , "value": "TRANSPORTED"},
          {"label": "DECLARED", "value": "DECLARED"},
          {"label": "UNDELIVERED", "value": "UNDELIVERED"},
          {"label": "RET_TRANSPORTED" , "value": "RET_TRANSPORTED"},
          {"label": "RET_DECLARED" , "value": "RET_DECLARED"},
          {"label": "PARTIAL  RETURN", "value": "PARTIAL  RETURN"}
        ] //stage5: RETURN_BY_CUSTOMER and FULL RETURN"
      ]
    };
    
    this.DeliveryProofHandler = this.DeliveryProofHandler.bind(this);
    this.ReturnProofHandler = this.ReturnProofHandler.bind(this);
  }
  componentWillUnmount() {
    clearInterval(interval)
  }

  getActiveInvoiceStatusList(label){
    label = label.toUpperCase();
        
    if (label == "FINALIZED" || label == "TRANSPORTED" || label == "DECLARED" || label == "EXIT" || label == "DELIVERED") {
      return this.state.invoiceStatus[0]; 
    }
    else
    if (label == "CANCELLED") {
      return this.state.invoiceStatus[1]; 
    }
    else
    if (label == "UNDELIVERED") {
      return this.state.invoiceStatus[2]; 
    }else
    if (label == "RETURN_BY_CUSTOMER") {
      return this.state.invoiceStatus[3]; 
    }
    else{
      return this.state.invoiceStatus[0]; 
    }
  }

  fetchData() {
    let request = {
      "internalid": this.props.params.id
    }
    this.props.actions.generalProcess(constants.orderDetails, request);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    console.log("componentDIdMount ============= ", this);
    let request = {
        "body" : {
            "orderId":"OR123456"
        }
    }
    this.props.actions.generalProcess(constantsApp.getEndToEndTrackingInformation, request);
    
    // interval = setInterval(() => {
    //   this.fetchData();
    // }, 5000);
  }
  renderPayload(xml) {

    this.setState({ modalIsOpenXML: true, xml: xml })
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps ============= ", nextProps)
    let stateCopy = _.clone(this.state)

    let invoiceDetailsContainer = {};
    if (nextProps.orderInvoiceDetails) {
      let invoiceData = nextProps.orderInvoiceDetails.invoices[0];
      invoiceDetailsContainer.orderID = nextProps.orderInvoiceDetails.orderID;
      invoiceDetailsContainer.invoiceNumber = invoiceData.invoiceNumber;
      invoiceDetailsContainer.invoiceDate = moment.unix(invoiceData.invoiceDate/1000).format("DD/MM/YYYY HH:mm:ss")
      invoiceDetailsContainer.totalNumberOfInvoicePages = invoiceData.totalNumberOfInvoicePages;
      invoiceDetailsContainer.invoiceStatus = invoiceData.invoiceStatus;
      invoiceDetailsContainer.txID = invoiceData.txID;
      invoiceDetailsContainer.invoiceType = invoiceData.invoiceType;
      invoiceDetailsContainer.paymentType = invoiceData.paymentType;
      invoiceDetailsContainer.totalValue = invoiceData.totalValue;
      invoiceDetailsContainer.incoTerms = invoiceData.incoTerms;
      
      invoiceDetailsContainer.freightAmount = invoiceData.freightAmount;
      invoiceDetailsContainer.freightCurrency = invoiceData.freightCurrency;

      invoiceDetailsContainer.currency = invoiceData.currency;
      invoiceDetailsContainer.insuranceAmount = invoiceData.insuranceAmount;
      invoiceDetailsContainer.insuranceCurrency = invoiceData.insuranceCurrency

      invoiceDetailsContainer.exporterCode = invoiceData.exporterCode;
      invoiceDetailsContainer.exporterName= invoiceData.exporterName;


      invoiceDetailsContainer.fzCode = invoiceData.fzCode ? invoiceData.fzCode : "-";
      invoiceDetailsContainer.wareHouse = invoiceData.wareHouse ? invoiceData.wareHouse : "-";

      // content For Tab1 (OrderLine)
      let lineItems = invoiceData.lineItems ? invoiceData.lineItems : [];
      let lineItemsTemp = []
      lineItems.forEach( item => {;
        let obj={
          "quantity": item.quantity,
          "description": item.description,
          "hscode": item.hscode,
          "unitPrice": item.originalValueOfItem,
          "countryOfOrigin" : item.countryOfOrigin,
          "statUOM": item.statUOM,
          "discount": item.discount.value,
          "total": item.valueOfGoods,
          "statQuantity": item.supplementaryQty,
          "statUOM": item.supplementaryQtyUOM,
          "netWeight": item.netWeight,
          "actionsPage": [{
                  "label": "View",
                  "URI": ["/courier/itemDetails"],
                  "params": "",
                  "iconName": "icon-docs"
              }]
        }
        lineItemsTemp.push(obj)
      })

      invoiceDetailsContainer.lineItems = lineItemsTemp;

      // content For Tab2 (Transport)
      let transport = [];
      let transportTemp = [];
      invoiceData.transport ? transportTemp.push(invoiceData.transport) :  {};

      invoiceData.returnRequest.forEach(item => {
        transportTemp.push(item.transport)
      })
 //   let transport = [];
      transportTemp.forEach( item => {
        let obj = {
          "mode": _.get(item, 'modeOfTransport', ""), //modeoftranport
          "txID" : _.get(item, 'txID', ""),
          "txTimeStamp": _.get(item, "txTimeStamp", ""),
          "masterTransportNo": _.get(item, 'masterTransportNo', ""),
          "houseTransportNo":  _.get(item, 'houseTransportNo', ""),
          "cargoType":         _.get(item, 'cargoType', ""),
          "packageType":       _.get(item.packageDetails, 'packageType', ""),
          "noOfPackages":      _.get(item.packageDetails, 'numberOfPackages', ""),
          "grossWeight":       _.get(item.transportDetails, 'grossWeight', ""),
          "netWeight":         _.get(item.transportDetails, 'netWeight', ""),
          "volumetricWeight":  _.get(item.transportDetails, 'volumetricWeight', ""),
          "transportImage":    _.get(item.transportDetails.document, 'path', ""),

          "shippingCode":      _.get(item, 'shippingCode', ""),
          "shippingBCode":     _.get(item.shippingDetails, 'shippingAirLineAgentBusinessCode.BusinessCode', ""),
          "shippingName":      _.get(item, 'shippingAirLineAgentBusinessCode.companyName', ""),

          "CargoCode":         _.get(item.shippingDetails, 'cargoHandlerCode', ""),
          "CargoBCode":        _.get(item.shippingDetails, 'cargoHandlerCode.BusinessCode', ""),
          "CargoName":         _.get(item.shippingDetails, 'cargoHandlerCode.companyName', ""),
          
          "brokerCode":        _.get(item, 'brokerCode', ""),
          "brokerBCode":       _.get(item, 'brokerBCode', ""),
          "brokerName":        _.get(item, 'brokerName', ""),

          "modeOfTransport":   _.get(item.shippingDetails, 'modeOfTransport', ""),
          "carrierNumber":     _.get(item.shippingDetails, 'carrierNumber', ""),
          "carrierRegistrationNumber": _.get(item.shippingDetails, 'carrierRegistrationNumber', ""),

          "dateOfDeparture":   _.get(item.shippingDetails, 'dateOfDeparture', ""),

          "portLoad":          _.get(item.shippingDetails, 'portOfLoad', ""),
          "portOfDischarge":   _.get(item.shippingDetails, 'portOfDischarge', ""),
          "originalLoadPort":  _.get(item.shippingDetails, 'originalLoadPort', ""),

          "destinationCountry": _.get(item, 'destinationCountry', ""),
          "destinationCountryFlagImage": _.get(item, 'destinationCountryFlagImage', ""),
          "submissionChannel": _.get(item, "submissionChannel", "")
        }
        transport.push(obj);
      })
      invoiceDetailsContainer.transport = transport;

      let exitConfirmation = []
      invoiceData.exitConfirmation.forEach(item => {
        exitConfirmation = exitConfirmation.concat(item.exitData)
      })
    //  let NRClaim = invoiceData.NRClaim;

          // "payload": _.get(invoiceData.exitConfirmation, 'payload', ""),
          // "annualDepartureDate": _.get(invoiceData.exitConfirmation, 'annualDepartureDate', ""),
          // "cardNumber":  _.get(invoiceData.exitConfirmation, 'cardNumber', ""),
          // "claimType":         _.get(invoiceData.exitConfirmation, 'claimType', ""),
          // "NRClaimNo":       _.get(invoiceData.exitConfirmation, 'NRClaimNo', ""),
          // "claimSubmitStatus":      _.get(invoiceData.exitConfirmation, 'claimSubmitStatus', ""),
          // "claimSubmissionDate":       _.get(invoiceData.exitConfirmation, 'claimSubmissionDate', ""),
          // "totalCharges":         _.get(invoiceData.exitConfirmation, 'totalCharges', ""),
          // "currency" : _.get(invoiceData.exitConfirmation, 'currency', ""),
          // "chargesList" : _.get(invoiceData.exitConfirmation, 'charges', [])
      
//      transport.forEach( item => {
      invoiceDetailsContainer.exitConfirmation = exitConfirmation;
      invoiceDetailsContainer.NRClaim = invoiceData.NRClaim[0];

      let declarationTemp = [];
      let exportDeclaration = [];
      invoiceData.declaration.latest ? 
      declarationTemp.push(invoiceData.declaration.latest)
      : {}

      invoiceData.declaration.historical ? 
      declarationTemp = declarationTemp.concat(invoiceData.declaration.historical)
      : {}

      declarationTemp.forEach(item => {
        let obj = {
                    "lastAction": _.get(item, 'lastAction', ""), //
                    "actionTimeStamp": _.get(item, 'lastActionDateTime', ""), //
                    "declarationStatus":  _.get(item, 'declarationStatus', ""), //
                    "SOAPPayload":         _.get(item, 'SOAPPayload.hash', ""), //
                    "totalCharges":         _.get(item, 'totalCharges', ""),
                    "currency" : _.get(item, 'currency', ""),
                    "chargesList" : _.get(item, 'charges', []), //
                    "exceptionsList" : _.get(item, "exceptions", []), //
                    "version":       _.get(item, 'version', ""), //
                    "batchID":      _.get(item, 'batchID', ""), //
                    "status":       _.get(item, 'customsStatus', ""), //
                    "declarationNo":         _.get(item, 'declarationNo', ""), //
                    "requestID" : _.get(item, 'requestID', ""), //
                    "regionType":         _.get(item, 'regionType', ""), //
                    "declarationType":         _.get(item, 'declarationType', ""), // 
                    "exportCodeMirsal2":         _.get(item, 'declarationType', ""), //should be removed
                    "declarationPurpose":         _.get(item, 'declarationPurpose', ""), //
                    "relatedDocumentList": _.get(item, 'relatedDocuments', []), //
                    "paymentDetailsList": _.get(item, 'paymentDetails', []), //
                    "declarationItemList": _.get(item, 'declarationItem', [])
                  } 
            exportDeclaration.push(obj)
      })  

//      transport.forEach( item => {
      invoiceDetailsContainer.exportDeclaration = declarationTemp;

      let delivered = [];
      delivered = invoiceData.delivered.map(item => {
        return item;
      })

      invoiceData.returnRequest.forEach(item => {
        console.log("item delivered ===== ", item)
        delivered = delivered.concat(item.delivered.map(item => {
          return item;
        }))
      })

      delivered.forEach(item=> {
        let lineItemsDelivered = [];
        item.lineItems.forEach(item=>{
          let obj={
            "quantity": item.quantity,
            "description": item.description,
            "hscode": item.hscode,
            "unitPrice": item.originalValueOfItem,
            "countryOfOrigin" : item.countryOfOrigin,
            "statUOM": item.statUOM,
            "discount": item.discount.value ? item.valueOfGoods :  item.valueOfGoods  * item.discount.percentage,
            "total": item.valueOfGoods,
            "statQuantity": item.supplementaryQty,
            "statUOM": item.supplementaryQtyUOM,
            "netWeight": item.netWeight
          }
          lineItemsDelivered.push(obj)
        })
        item.lineItems = lineItemsDelivered
      })

      invoiceDetailsContainer.delivered = delivered;



      let returnRequest = [];
      returnRequest = invoiceData.returnRequest.map(item => {
        return item.request;
      })

      invoiceDetailsContainer.returnRequest = returnRequest;

      // content For Tab8 (InvoiceTrackingLogs)
      invoiceDetailsContainer.invoiceTrackingLogs = invoiceData.InvoiceTrackingLogs;
      stateCopy.invoiceDetailsContainer = invoiceDetailsContainer
      console.log("stateCopy props udpate ===== ", stateCopy);
      stateCopy.isLoading = false
      this.setState(stateCopy)
    }



    if (nextProps.orgDetailByCode) {
      stateCopy.orgDetailByCode = nextProps.orgDetailByCode
    }

    if (nextProps.orderDetails) {
      let lineItems = nextProps.orderDetails.tranxData.lineItems ? nextProps.orderDetails.tranxData.lineItems : [];
      let returnItems = nextProps.orderDetails.tranxData.returnItems ? nextProps.orderDetails.tranxData.returnItems : []
      let exportHAWB = nextProps.orderDetails.tranxData.ExportHAWB ? nextProps.orderDetails.tranxData.ExportHAWB : {};
      let importHAWB = nextProps.orderDetails.tranxData.ImportHAWB ? nextProps.orderDetails.tranxData.ImportHAWB : [];

      lineItems.map((item, index) => {

        if (exportHAWB.isDelivered && exportHAWB.HAWBNumber == item.HAWBNumber) {
          lineItems[index].actions = [{ "actionType": "COMPONENT_FUNCTION", iconName: "fa fa-eye", label: "View" }]
          console.log("--==>", exportHAWB)
          lineItems[index].deliveryProof = {
            proofOfDeliveryHash: exportHAWB.proofOfDeliveryHash,
            deliveryToPersonName: exportHAWB.deliveryToPersonName,
            deliveryDate: exportHAWB.deliveryDate
          }
          return;
        }
      })

      returnItems.map((item, index) => {

        importHAWB.forEach((hawb) => {
          if (hawb.isDelivered && hawb.HAWBNumber == item.newAWB) {
            returnItems[index].actions = [{ "actionType": "COMPONENT_FUNCTION", iconName: "fa fa-eye", label: "View" }]
            returnItems[index].returnProof = {
              proofOfDeliveryHash: hawb.proofOfDeliveryHash,
              deliveryToPersonName: hawb.deliveryToPersonName,
              deliveryDate: hawb.deliveryDate
            }
            return;
          }
        })
      })

    //  stateCopy.isLoading = false;
      stateCopy.orderDetails = nextProps.orderDetails;
      stateCopy.lineItems = lineItems;
      stateCopy.returnItems = returnItems;


      if (stateCopy.orderDetails.tranxData.orderStatus == 'HAWBCREATED' && _.get(stateCopy.orderDetails.tranxData, "exportDeclaration[0]", undefined) != undefined) {
        let label = _.get(stateCopy, 'orderDetails.tranxData.exportDeclaration[0].status', '')

        label = this.getStatus(label);
        if (label != "1" && label != "-1") {
          stateCopy.orderDetails.tranxData.orderStatus = 'EXPORTCLEARED'
          stateCopy.statusList[stateCopy.orderDetails.tranxData.deliveryStatus][2].label = label
        }
      }
      else if ((stateCopy.orderDetails.tranxData.orderStatus == 'UNDELIVERED' || stateCopy.orderDetails.tranxData.orderStatus == 'RETURNBYCUSTOMER') && _.get(stateCopy.orderDetails.tranxData, "importDecleration[0]", undefined) != undefined) {
        let label = _.get(stateCopy, 'orderDetails.tranxData.importDecleration[0].status', '')

        label = this.getStatus(label);

        if (label != "1" && label != "-1") {
          stateCopy.orderDetails.tranxData.orderStatus = 'IMPORTCLEARED'
          stateCopy.statusList[stateCopy.orderDetails.tranxData.deliveryStatus][4].label = label
        }
      }

      if (stateCopy.orgDetailByCode == undefined) {
        this.props.actions.generalProcess(constants.orgDetailByCode, { "orgCode": [stateCopy.orderDetails.tranxData.eCommerceOrgCode, stateCopy.orderDetails.tranxData.courierOrgCode] });
      }
    }

    this.setState(stateCopy)
  }

  getStatus(label) {
    switch (label) {
      case "-1":
        label = "-1"
        break;
      case "1":
        label = "1"
        break;
      case "2":
        label = "SUBMITTED"
        break;
      case "4":
        label = "FAIL DISPATCH"
        break;
      case "6":
        label = "CLEARED"
        break;
      case "7":
        label = "CLEARANCE SUBJECT TO INSPECTION"
        break;
      case "8":
        label = "RELEASE FOR INSPECTION"
        break;
      case "9":
        label = "DETAINED"
        break;
      case "10":
        label = "SUSPEND"
        break;
      case "14":
        label = "CANCELLED"
        break;
      case "15":
        label = "DECLINED"
        break;
      case "16":
        label = "REJECTED"
        break;
      default:
        label = "CREATED"
        break;
    }
    return label
  }

  ReturnProofHandler({ actionName, index }) {
    switch (actionName) {
      case "View":
        let data = this.state.returnItems[index].returnProof;
        let showData = { deliveryToPersonName: data.deliveryToPersonName, deliveryImagePath: data.proofOfDeliveryHash, date: data.deliveryDate };
        this.setState({ showData, modalIsOpen: true });
        break;
      default:
        break;
    }
  }

  DeliveryProofHandler({ actionName, index }) {
    switch (actionName) {
      case "View":
        let data = this.state.lineItems[index].deliveryProof;
        let showData = { deliveryToPersonName: data.deliveryToPersonName, deliveryImagePath: data.proofOfDeliveryHash, date: data.deliveryDate };
        this.setState({ showData, modalIsOpen: true });
        break;
      default:
        break;
    }
  }
  updateState(data) {
    this.setState(data);
  }
  htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  addDefaultCourierSrc(ev) {
    ev.target.src = '/assets/imgs/courier.jpg'
  }

  addDefaultECommerceSrc(ev) {
    ev.target.src = '/assets/imgs/ecommerce.png'
  }
  formatXml(xml) {


    return xml;
  }
  addDefaultHAWBSrc(ev) {
    ev.target.src = '/assets/imgs/hawb.png'
  }

  addDefaultSignSrc(ev) {
    ev.target.src = '/assets/imgs/sign.png'
  }

  getActiveClass(label) {
    label = label.toUpperCase();
    if (label == "UNDELIVERED" || label == "REJECTED" || label == "PARTIAL RETURN" || label == "FULL RETURN" || label == "CANCELLED") {
      return "warning"
    }
    return "active"
  }

  render() {
    console.log("state", this.state)
    let statusBarClass = "";

    let modalActions = [
      {
        type: "icon",
        className: "btn btn-default",
        label: "ADD",
        icon: "close",
        actionHandler: this.updateState.bind(this, { modalIsOpen: false, modalIsOpenXML: false })
      }
    ];
    if (this.state.isLoading)
      return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

    return (
      <div>
        <ModalBox isOpen={this.state.modalIsOpenXML}>
          <Portlet title={utils.getLabelByID("XML Payload")} noCollapse={true} actions={modalActions}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">



                  {this.formatXml(this.state.xml)}

                </div>

              </div>

            </div>
          </Portlet>
        </ModalBox>
        <ModalBox isOpen={this.state.modalIsOpen}>
          {/* <Portlet title={utils.getLabelByID("Proof")} noCollapse={true} actions={modalActions}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Person Name:</label>
                    </div>
                    <div className="col-md-3">
                      <label>{this.state.showData.deliveryToPersonName}</label>
                    </div>
                    <div className="col-md-3">
                      <label className="bold">Date Time Stamp:</label>
                    </div>
                    <div className="col-md-3">
                      <label>{moment.unix((this.state.orderDetails.tranxData.ExportHAWB.deliveryDate)).format('DD/MM/YYYY')}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <hr />
                <img style={{ border: "1px solid black", display: "block", marginLeft: "auto", marginRight: "auto" }} src={baseUrl + '/API/core/download?type=IMAGE&path=' + this.state.showData.deliveryImagePath} height="50%" />
              </div>
            </div>
          </Portlet> */}
        </ModalBox>
        
        <div className="portlet light" style={{ "min-height": "854px" }}>

          <div className="row">
            <div className="col-md-12">
              <ul id="progressbar">
                {this.getActiveInvoiceStatusList(this.state.invoiceDetailsContainer.invoiceStatus).map((item, key) => {
                  let width = (100 / this.getActiveInvoiceStatusList(this.state.invoiceDetailsContainer.invoiceStatus).length).toString() + "%"
                  if (item.label.toUpperCase() == this.state.invoiceDetailsContainer.invoiceStatus) {
                    statusBarClass = "notPassed"
                  }
                  return <li key={key} style={{ width: width }} className={item.label.toUpperCase() == this.state.invoiceDetailsContainer.invoiceStatus ? this.getActiveClass(item.label) : statusBarClass}>{item.label}</li>
                })}
              </ul>
            </div>
          </div>

        <div className="row">
            <div className="col-md-12">
              <div className="orderno">
                <img src="/assets/Resources/ordericon.png" width="18px" /><label>Invoice
                 #: <span>{this.state.invoiceDetailsContainer.invoiceNumber}</span></label>
              </div>
              <div>
                <label>Order #: <span>{this.state.invoiceDetailsContainer.orderID}</span></label>
              </div>
              <div className="hashno">
                <label>{this.state.invoiceDetailsContainer.txID}</label>
              </div>
            </div>
          </div>

        <div className="row form-group">
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Invoice Date :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{ this.state.invoiceDetailsContainer.invoiceDate}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Total No of Pages:</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.totalNumberOfInvoicePages}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                
            </div>
        </div>
        
        <div className="row form-group">
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Invoice Type :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.invoiceType}</span>
                        </div>
                </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Payment Type :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.paymentType}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                
            </div>
        </div>
        
        <div className="row form-group">
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Total Value :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.totalValue} {this.state.invoiceDetailsContainer.currency}</span>
                        </div>
                </div>
            </div>
            <div className="col-md-4">
                
            </div>
            <div className="col-md-4">
                
            </div>
        </div>

        <div className="row form-group">
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">INCO Terms :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.incoTerms}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Insurance Amount :</label>
                        </div>
                        <div className="col-md-6">
                          <span>{this.state.invoiceDetailsContainer.insuranceAmount} {this.state.invoiceDetailsContainer.insuranceCurrency}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Freight Amount :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.freightAmount} {this.state.invoiceDetailsContainer.freightCurrency}</span>
                        </div>
                    </div>
            </div>
        </div>

        <div className="row form-group">
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Exporter :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.exporterCode } {this.state.invoiceDetailsContainer.exporterName }</span>
                        </div>
                </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Free Zone :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{ this.state.invoiceDetailsContainer.fzCode }</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">Warehouse :</label>
                        </div>
                        <div className="col-md-6">
                            <span>{ this.state.invoiceDetailsContainer.wareHouse }</span>
                        </div>
                    </div>
            </div>
        </div>

          <div className="row form-group">
            <div className="col-md-12">
              <div className="tab-pane in active">
                <div className="ui-regulartabs">
                  <ul id="adHocTabs" className="nav nav-tabs">
                    <li id="fieldsTabLink" className="active"><a href="#orderLine" data-toggle="tab"><span> Order Line</span></a></li>
                    <li id="filtersTabLink"><a href="#transport" data-toggle="tab"><span> Transport</span></a></li>
                    <li id="fieldsTabLink"><a href="#exportDeclaration" data-toggle="tab"><span> Export Declaration</span></a></li>
                    <li id="groupsTabLink"><a href="#exitConfirmation" data-toggle="tab"> <span> Exit Confirmation</span></a></li>
                    <li id="filtersTabLink"><a href="#delivered" data-toggle="tab"> <span> Delivered</span></a></li>
                    <li id="fieldsTabLink"><a href="#importDeclaration" data-toggle="tab"><span> Import Declaration</span></a></li>
                    <li id="groupsTabLink"><a href="#returnDetails" data-toggle="tab"><span> Return Details</span></a></li>
                    <li id="groupsTabLink"><a href="#invoiceTrackingLogs" data-toggle="tab"><span> Logs</span></a></li>                  </ul>
                </div>
                <div className="tab-content ui-innertab ui-tabcontentbody">
                  
                  <div id="orderLine" className="tab-pane in active ui-fieldtable">
                    <Table
                      componentFunction={this.DeliveryProofHandler}
                      pagination={false}
                      export={false}
                      search={false}
                      gridColumns={utils.getGridColumnByName("orderLineTraversal")}
                      gridData={ this.state.invoiceDetailsContainer.lineItems }
                      totalRecords={ 1 }
                      pageChanged={() => {
                      }}
                      activePage={1}
                      pageSize={10}
                    />
                  </div>
                  
                  <div id="transport" className="tab-pane">
                    { this.state.invoiceDetailsContainer.transport.map( item => {
                      console.log("transport ==== ", item);
                      return (
                      <div className="shadowBox" style={{ padding:"5px", marginBottom: "15px"}}>
                        <div className="row">
                          <div className="col-md-12" style={{marginTop:"10px" }}>
                            <div className="col-md-2">
                              <label>{ item.mode }</label>
                            </div>
                            <div className="col-md-4">
                              {console.log("txTimeStamp ========== ", item.txTimeStamp)}
                              <span>{moment.unix(item.txTimeStamp/1000).format("MM/DD/YYYY HH:mm:ss")}</span>
                            </div>
                            <div className="col-md-6" style={{textAlign:"right", overflowWrap: "anywhere"}}>
                                <label>{ item.txID }</label>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-2">
                                <label>Master Transport Doc#</label>
                            </div>
                            <div className="col-md-2">
                                <span>{item.masterTransportNo}</span>
                            </div>
                            
                            <div className="col-md-2">
                                <label>House Transport Doc#</label>
                            </div>
                            <div className="col-md-2">
                                <span> {item.houseTransportNo}</span>
                            </div>
                          </div>
                          
                          <div className="col-md-12">
                            <div className="col-md-2">
                              <label>Cargo Type: </label>
                            </div>
                            <div className="col-md-2">
                              <span> {item.cargoType}</span>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-2">
                              <label>Package Type: </label>
                            </div>  
                            <div className="col-md-2">
                              <span> {item.packageType}</span>
                            </div>
                            <div className="col-md-2">
                              <label>No of Packages: </label>
                            </div>
                            <div className="col-md-2">  
                              <span> {item.noOfPackages}</span>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-2">
                              <label>Gross Weight: </label>
                            </div>
                            <div className="col-md-2">
                              <span> {item.grossWeight}</span>
                            </div>

                            <div className="col-md-2">
                              <label>Net Weight: </label>
                            </div>
                            <div className="col-md-2">   
                              <span> {item.netWeight}</span>
                            </div>

                            <div className="col-md-2">
                              <label>Volumetric Weight: </label>
                            </div>
                            <div className="col-md-2">  
                              <span> {item.volumetricWeight}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 text-center">
                            <div className="shadowBox recipt" style={{ margin:"5px 15px 5px 15px" }}>
                                <img src={baseUrl + item.transportImage} onError={this.addDefaultHAWBSrc} height="30%" />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group">
                              <div className="col-md-12">
                                  <Lable text={utils.getLabelByID("Shipping / Airline Agent")} columns="12" style={{marginBottom:"3px"}}></Lable>
                                  {/* <div className="col-md-2">
                                      <label>Code: </label>
                                  </div>    
                                  <div className="col-md-2">
                                    <span> {item.shippingBCode}</span>
                                  </div> */}
                                  <div className="col-md-2">
                                    <label>Business Code: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.shippingBCode}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Name: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.shippingName}</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group"></div>

                          <div className="form-group">
                              <div className="col-md-12">
                                  <Lable text={utils.getLabelByID("Cargo Handler")} columns="12" style={{marginBottom:"3px"}}></Lable>
                                  {/* <div className="col-md-2">
                                      <label>Code: </label>
                                  </div>    
                                  <div className="col-md-2">
                                    <span> {item.CargoCode}</span>
                                  </div> */}
                                  <div className="col-md-2">
                                    <label>Business Code: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.CargoBCode}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Name: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.CargoName}</span>
                                  </div>
                              </div>
                          </div>

                          <div className="form-group"></div>

                          {/* <div className="form-group">
                            <div className="col-md-12">
                                  <Lable text={utils.getLabelByID("Broker")} columns="12" style={{marginBottom:"3px"}}></Lable>
                                  <div className="col-md-2">
                                      <label>Code: </label>
                                  </div>    
                                  <div className="col-md-2">
                                    <span> {item.brokerCode}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Business Code: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.brokerBCode}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Name: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.brokerName}</span>
                                  </div>
                              </div>
                          </div> */}
                          
                          <div className="form-group">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                  <label>Mode Of transport: </label>
                                </div>
                                <div className="col-md-2">
                                  <span> {item.modeOfTransport}</span>
                                </div>
                            </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                <div className="col-md-2">
                                  <label>Carrier Number: </label>
                                </div>
                                <div className="col-md-2">
                                  <span> {item.carrierNumber}</span>
                                </div>
                                <div className="col-md-2">
                                  <label>Carrier Registration Number: </label>
                                </div>
                                <div className="col-md-2">
                                  <span> {item.carrierRegistrationNumber}</span>
                                </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>Date of Departure: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.dateOfDeparture}</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>Port of Load: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.portLoad}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Port of Discharge: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.portOfDischarge}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Original Load Port: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span> {item.originalLoadPort}</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>Destination Country: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span>{item.destinationCountry} </span>
                                    <img style={{ width: "20px", height: "20px" }} src={baseUrl + item.destinationCountryFlagImage} />
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>Submission Channel: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <span>{item.submissionChannel}</span>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                      )
                      })
                    }
                  </div>
                  
                  <div id="exitConfirmation" className="tab-pane">
                    {this.state.invoiceDetailsContainer.exitConfirmation.map(item=>{
                      return (
                      <div className="row">
                        <div className="form-actions right">
                          <div className="form-group col-md-12">
                              <div className="btn-toolbar pull-right">
                                <button type="submit" className="btn green"
                                      onClick={this.renderPayload.bind(this, item.soapPayload.hash)}>{utils.getLabelByID("View SOAP Payload")} </button>
                              </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="col-md-5">
                                <label>Annual Departure Date: </label>
                            </div>
                            <div className="col-md-7">
                              <span>{item.actualDepartureDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="col-md-5">
                                <label>Debit / Credit Account # : </label>
                            </div>
                            <div className="col-md-7">
                              <span>{item.debitCreditAccountNumber}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    })}
                      <div className="row">
                        <Lable text="CLAIM" />
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>Claim Type: </label>
                            </div>
                            <div className="col-md-6">
                              <span>{this.state.invoiceDetailsContainer.NRClaim.claimType}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>NR Claim No:</label>
                            </div>
                            <div className="col-md-6">
                              <span>{this.state.invoiceDetailsContainer.NRClaim.NRClaimNo}</span>
                            </div>
                          </div> 
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>Claim Submit Status: </label>
                            </div>
                            <div className="col-md-6">
                              <span>{this.state.invoiceDetailsContainer.NRClaim.claimRequestStatus}</span>
                            </div>
                          </div>                  
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>Claim Submission Date: </label>
                            </div>
                            <div className="col-md-6">
                              <span>{this.state.invoiceDetailsContainer.NRClaim.claimRequestDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>CHARGES: </label>
                            </div>
                            <div className="col-md-6">
                              <span>Total = {this.state.invoiceDetailsContainer.exitConfirmation.totalCharges} {this.state.invoiceDetailsContainer.exitConfirmation.currency}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("charges")}
                            gridData={this.state.invoiceDetailsContainer.NRClaim.charges ? this.state.invoiceDetailsContainer.NRClaim.charges : []}
                            totalRecords={5}
                            pageChanged={() => {
                            }}
                            activePage={1}
                            pageSize={10}
                        />
                      </div>
                      </div>
                      
                  </div>
                  
                  <div id="exportDeclaration" className="tab-pane">
                    <div className="tab-pane in active">
                      <div className="ui-regulartabs">
                        <ul id="exportDeclarationTab" className="nav nav-tabs">
                          <li id="fieldsTabLink" className="active"><a href="#exportDeclarationLogs" data-toggle="tab">
                            <span> Declaration Submission Logs</span></a>
                          </li>
                          <li id="filtersTabLink"><a href="#exportDeclarationView" data-toggle="tab"> <span> View Declarations</span></a></li>
                        </ul>
                      </div>
                      <div className="tab-content ui-innertab ui-tabcontentbody">
                        <div id="exportDeclarationLogs" className="tab-pane in active ui-fieldtable">
                          <div className="row">
                            <div className="col-md-12">
                              <Table fontclass=""
                                  gridColumns={utils.getGridColumnByName("DeclarationSubmissionLogs")}
                                  gridData={[]}
                                  totalRecords={this.state.length}
                                  searchCallBack={this.searchCallBack}
                                  pageSize={10}
                                  pagination={false} pageChanged={this.pageChanged}
                                  export={false}
                                  search={true}
                              />
                            </div>
                          </div>
                      </div>
                        <div id="exportDeclarationView" className="tab-pane in ui-fieldtable">
                            { this.state.invoiceDetailsContainer.exportDeclaration.map(item => {
                              return(
                              <div className="row">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <Lable text={utils.getLabelByID("Last Action : ")} columns="6"></Lable>
                                            <span>{item.lastAction}</span>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-12">
                                            <Lable text={utils.getLabelByID("Action Timestamp : ")} columns="6"></Lable>
                                            <span>{item.actionTimeStamp}</span>
                                          </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group col-md-12">
                                          <div className="pull-right">
                                            <span style={{ border: "1px solid", padding: "8px 15px 8px 15px", background: "#ed0707", color: "white", letterSpacing: "1px", fontWeight: "600" }}>{item.declarationStatus}</span>  
                                          </div>
                                      </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <AnchorComp
                                        anchotDisplayName = {"SOAP Payload"}
                                        invokeAnchorButtonhandlar = {this.soapPayloadHandler}
                                    />
                                </div>
    
                                <Lable text = {"Charges Total = " + this.state.invoiceDetailsContainer.exitConfirmation.totalCharges + this.state.invoiceDetailsContainer.exitConfirmation.currency} />
                                <div className="col-md-12">
                                    <Table fontclass=""
                                        gridColumns={utils.getGridColumnByName("charges")}
                                        gridData={_.get(item,'chargesList', [])}
                                        totalRecords={100}
                            //           totalRecords={item.chargesList.length}
                                        searchCallBack={this.searchCallBack}
                                        pageSize={10}
                                        pagination={false} pageChanged={this.pageChanged}
                                        export={false}
                                        search={true}
                                    />
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Version</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.version}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Batch Id</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.batchID}</span>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Status</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.status}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Declaration No</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.declarationNo}</span>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Request ID</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.requestID}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Region Type</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.regionType}</span>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Declaration Type</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.declarationType}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Export Code Mirsal 2</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.exportCodeMirsal2}</span>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="col-md-6">
                                        <label>Declaration Purpose</label>
                                    </div>
                                    <div className="col-md-6">
                                      <span>{item.declarationPurpose}</span>
                                    </div>
                                  </div>
                                </div>
    
                                <div className="col-md-6">
                                  <Lable text="Related Documents" style={{marginLeft:"-15px", marginBottom:"3px"}}/>
                                  <Table fontclass=""
                                    gridColumns={utils.getGridColumnByName("RelatedDocument")}
                                    gridData={_.get(item,'relatedDocumentList', [])}
                                    totalRecords={100}  
                                //  totalRecords={item.relatedDocumentList.length}        
                                    searchCallBack={this.searchCallBack}
                                    pageSize={10}
                                    pagination={false} pageChanged={this.pageChanged}
                                    export={false}
                                    search={true}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <Lable text="Payment Details" style={{marginLeft:"-15px", marginBottom:"3px"}}/>
                                  <Table fontclass=""
                                    gridColumns={utils.getGridColumnByName("PaymentDetails")}
                                    gridData={_.get(item, 'paymentDetailsList', [])}
                                    totalRecords={100}
                            //       totalRecords={item.paymentDetailsList.length}
                                    searchCallBack={this.searchCallBack}
                                    pageSize={10}
                                    pagination={false} pageChanged={this.pageChanged}
                                    export={false}
                                    search={true}
                                  />
                                </div>
                                <div className="col-md-12">
                                  <Lable text="Declaration Item" style={{marginLeft:"-15px", marginBottom:"3px"}}/>
                                  <Table fontclass=""
                                    gridColumns={utils.getGridColumnByName("delivery")}
                                    gridData={_.get(item,'declarationItemList',[])}
                                    totalRecords={100}
                              //     totalRecords={item.declarationItemList.length}
                                    searchCallBack={this.searchCallBack}
                                    pageSize={10}
                                    pagination={false} pageChanged={this.pageChanged}
                                    export={false}
                                    search={true}
                                  />
                                </div>
                              </div>
                              )
                            })}

                        </div>
                      </div>
                    </div>  

                  </div>
                  
                  
                  <div id="delivered" className="tab-pane">
                    {this.state.invoiceDetailsContainer.delivered.map( item => {
                      return (
                      <div className="row">
                          
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-2">
                                <label>Status : </label>
                              </div>
                              <div className="col-md-8">
                                  <span>{item.deliveryStatus}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <label>Delivery Date: </label>
                              </div>
                              <div className="col-md-8">
                                <label style={{fontWeight:"normal"}}>{item.deliveryDate}</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <label>Delivery Type: </label>
                              </div>
                              <div className="col-md-8">
                                <label key={1} className="mt-checkbox mt-checkbox-outline"
                                    style={{ marginTop: "0px", marginRight: "10px" }}>
                                    <input type="checkbox"
                                        name="deliveryType"
                                        checked={item.deliveryType === "Contact" ? true : false}
                                    />
                                    <span></span>
                                    Contact
                                </label>
                                <label key={2} className="mt-checkbox mt-checkbox-outline"
                                    style={{ marginTop: "0px" }}>
                                    <input type="radio" className="form-control"
                                        name="deliveryType"
                                        checked={item.deliveryType === "Contactless" ? true : false}
                                    />
                                    <span></span>
                                    Contactless
                                </label>
                              </div>
                            </div>
                          <div className="row">
                            <div className="col-md-4">
                              <label>Delivery To Person: </label>
                            </div>
                            <div className="col-md-8">
                              <label style={{fontWeight:"normal"}}>{item.deliveryToPerson}</label>
                            </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                        <div className="col-md-12">
                          <label style={ item.deliveryType == "contact" ? {display:""} : {display: ""} }>Signature</label>
                        </div>
                        <div className="col-md-12">  
                          <img style={{ width: "80%", height: "100px" }} src={baseUrl + item.signature.path} onError={this.addDefaultHAWBSrc} height="50%" />
                        </div>
                        <div className="col-md-12">
                          <AnchorComp style={{textAlign:"right"}}
                              anchotDisplayName = {"Download"}
                              invokeAnchorButtonhandlar = {this.downloadHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <Table
                          pagination={false}
                          export={false}
                          search={false}
                          gridColumns={utils.getGridColumnByName("delivery")}
                          gridData={item.lineItems}
                          totalRecords={5}
                          pageChanged={() => {
                          }}
                          activePage={1}
                          pageSize={10}
                        />
                      </div>
                    </div>
                    )
                    })}
                  </div>
                  <div id="importDeclaration" className="tab-pane">
                    <div className="tab-pane in active">
                      <div className="ui-regulartabs">
                        <ul id="importDeclarationTab" className="nav nav-tabs">
                          <li id="fieldsTabLink" className="active"><a href="#importDeclarationLogs" data-toggle="tab">
                            <span> Declaration Submission Logs</span></a>
                          </li>
                          <li id="filtersTabLink"><a href="#importDeclarationView" data-toggle="tab"> <span> View Declarations</span></a></li>
                        </ul>
                      </div>
                      <div className="tab-content ui-innertab ui-tabcontentbody">
                        <div id="importDeclarationLogs" className="tab-pane in active ui-fieldtable">
                          <div className="row">
                            <div className="col-md-12">
                              <Table fontclass=""
                                  gridColumns={utils.getGridColumnByName("DeclarationSubmissionLogs")}
                                  gridData={[]}
                                  totalRecords={this.state.length}
                                  searchCallBack={this.searchCallBack}
                                  pageSize={10}
                                  pagination={false} pageChanged={this.pageChanged}
                                  export={false}
                                  search={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="importDeclarationView" className="tab-pane in ui-fieldtable">
                          <div className="row">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Lable text={utils.getLabelByID("Last Action : ")} columns="6"></Lable>
                                        <span>10/10/2020 12:12:12</span>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Lable text={utils.getLabelByID("Action Timestamp : ")} columns="6"></Lable>
                                        <span>10/10/2020 12:12:12</span>
                                      </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                   <span>FAILD</span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <AnchorComp
                                    anchotDisplayName = {"SOAP Payload"}
                                    invokeAnchorButtonhandlar = {this.soapPayloadHandler}
                                />
                            </div>
                            <Lable text="Exceptions" />
                            <div className="col-md-12">
                                <Table fontclass=""
                                    gridColumns={utils.getGridColumnByName("BusinessTransactionError")}
                                    gridData={[]}
                                    totalRecords={[]}
                                    searchCallBack={this.searchCallBack}
                                    pageSize={10}
                                    pagination={false} pageChanged={this.pageChanged}
                                    export={false}
                                    search={true}
                                />
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Version</label>
                                </div>
                                <div className="col-md-6">
                                  <span>6</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Batch Id</label>
                                </div>
                                <div className="col-md-6">
                                  <span>876543567</span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Status</label>
                                </div>
                                <div className="col-md-6">
                                  <span>status</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Declaration No</label>
                                </div>
                                <div className="col-md-6">
                                  <span>876543567124123</span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Request ID</label>
                                </div>
                                <div className="col-md-6">
                                  <span>ECT70000046</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Region Type</label>
                                </div>
                                <div className="col-md-6">
                                  <span>IMPORT</span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Declaration Type</label>
                                </div>
                                <div className="col-md-6">
                                  <span>TS2 (FZ Transit In)</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Export Code Mirsal 2</label>
                                </div>
                                <div className="col-md-6">
                                  <span>LL0112312</span>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="col-md-6">
                                    <label>Declaration Purpose</label>
                                </div>
                                <div className="col-md-6">
                                  <span>{"Purpose"}</span>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <Lable text="Related Documents" style={{marginLeft:"-15px", marginBottom:"3px"}}/>
                              <Table fontclass=""
                                gridColumns={utils.getGridColumnByName("RelatedDocument")}
                                gridData={[]}
                                totalRecords={this.state.length}
                                searchCallBack={this.searchCallBack}
                                pageSize={10}
                                pagination={false} pageChanged={this.pageChanged}
                                export={false}
                                search={true}
                              />
                            </div>
                            <div className="col-md-6">
                              <Lable text="Payment Details" style={{marginLeft:"-15px", marginBottom:"3px"}}/>
                              <Table fontclass=""
                                gridColumns={utils.getGridColumnByName("PaymentDetails")}
                                gridData={[]}
                                totalRecords={this.state.length}
                                searchCallBack={this.searchCallBack}
                                pageSize={10}
                                pagination={false} pageChanged={this.pageChanged}
                                export={false}
                                search={true}
                              />
                            </div>
                            <div className="col-md-12">
                              <Lable text="Declaration Item" style={{marginLeft:"-15px", marginBottom:"3px"}}/>
                              <Table fontclass=""
                                gridColumns={utils.getGridColumnByName("delivery")}
                                gridData={[]}
                                totalRecords={this.state.length}
                                searchCallBack={this.searchCallBack}
                                pageSize={10}
                                pagination={false} pageChanged={this.pageChanged}
                                export={false}
                                search={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>

                  <div id="returnDetails" className="tab-pane">
                    { this.state.invoiceDetailsContainer.returnRequest.map( item => {
                      return (
                        <div className="row">
                          <div className="row">
                              <div className="col-md-6">
                                <Lable text={utils.getLabelByID("Return Request Date : ")} columns="6"></Lable>
                                <span>{item.requestDate}</span>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-6">
                                <Lable text={utils.getLabelByID("Return Request Reason : ")} columns="6"></Lable>
                                <span>{item.reason}</span>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-12">
                                <Lable text={utils.getLabelByID("Return Items")} columns="12" style={{marginBottom:"0px"}}></Lable>
                              </div>
                          </div>
                          <div className="col-md-12">
                            <Table
                              componentFunction={this.ReturnProofHandler}
                              pagination={false}
                              export={false}
                              search={false}
                              gridColumns={utils.getGridColumnByName("returnDelivery")}
                              gridData={item.returnItems ? item.returnItems : []}
                              pageChanged={() => {
                              }}
                              activePage={1}
                              pageSize={10}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div id="invoiceTrackingLogs" className="tab-pane">
                    <div className="row">
                      
                      <div className="col-md-12">
                        <Table
                          pagination={false}
                          export={false}
                          search={false}
                          gridColumns={utils.getGridColumnByName("InvoiceTrackingLogs")}
                          gridData={this.state.invoiceDetailsContainer.invoiceTrackingLogs}
                          totalRecords = {this.state.invoiceDetailsContainer.invoiceTrackingLogs.length}
                          pageChanged={() => {
                          }}
                          activePage={1}
                          pageSize={10}
                        />
                      </div>
                  </div>
                </div>
                        
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>);

  }
}

function mapStateToProps(state, ownProps) {

  return {
    orgDetailByCode: state.app.orgDetailByCode,
    orderDetails: state.app.getOrderDetails.data.searchResult,
    orderInvoiceDetails: _.get(state.app, 'orderInvoiceDetails', undefined)
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}

InvoiceDetails.displayName = "Invoice Details";
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetails);
