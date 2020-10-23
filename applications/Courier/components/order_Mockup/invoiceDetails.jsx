/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _, { constant } from 'lodash';
import { browserHistory } from 'react-router';
import unescapejs from 'unescape-js';
import ShadowBox from '../../common/ShadowBox.jsx'
// import Steps from '../../../../core/common/Steps.jsx';
import Table from '../../common/Datatable.jsx';
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
import Countries from '../../constants/countries.json';

let baseUrl = backOffices.baseUrl;
let interval;
class InvoiceDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalIsOpen: false,
      modalIsOpenSOAP: false,
      dummyXmlPayload : `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.customs.pcfc.com/Schema/Common/2.0" xmlns:ns1="http://www.customs.pcfc.com/Schema/Declaration/CourierBulkProcessingParameters" xmlns:ns2="http://www.customs.pcfc.com/Schema/Declaration/SAD" xmlns:ns3="http://www.customs.pcfc.com/Schema/Declaration/BatchDeclaration"> <soapenv:Header /> <soapenv:Body> <ns1:CourierBulkProcessingProcessRequest> <ns1:UNB> <ns:MessageCode>DEC</ns:MessageCode> <ns:MessageVersionNumber>1</ns:MessageVersionNumber> <ns:SenderIdentification>AE-1049133</ns:SenderIdentification> <ns:InterchangeControlReference>1</ns:InterchangeControlReference> <ns:RecipientIdentification>AE-1049133</ns:RecipientIdentification> <ns:DateTime>2020-01-16T13:58:00.000Z</ns:DateTime> </ns1:UNB> <ns1:UTH> <ns:ReplytoTransportMode>WEBSERVICE</ns:ReplytoTransportMode> <ns:ReplytoAddress>http://abc.com</ns:ReplytoAddress> <ns:ReplytoMessageFormat>XML</ns:ReplytoMessageFormat> </ns1:UTH> <ns1:UNH> <ns:MessageReferenceNumber>MRNEX1CA14JAN001</ns:MessageReferenceNumber> <ns:MessageType>NEW</ns:MessageType> </ns1:UNH> <ns1:Declaration> <ns3:BatchHeader> <ns3:BrokerBusinessCode>AE-1049133</ns3:BrokerBusinessCode> <ns3:BrokerCustomerCode>118887787</ns3:BrokerCustomerCode> <ns3:CTOCargoHandlerPremisesCode>PR-01559</ns3:CTOCargoHandlerPremisesCode> <ns3:ShippingAirlineAgentBusinessCode>AE-1000029</ns3:ShippingAirlineAgentBusinessCode> <ns3:PortOfLoading>D03</ns3:PortOfLoading> <ns3:PortOfDischarge>BLR</ns3:PortOfDischarge> <ns3:TotalNoOfConsignment>1</ns3:TotalNoOfConsignment> <ns3:OutboundMasterDocumentNo>0000001</ns3:OutboundMasterDocumentNo> <ns3:OutboundCarrierDetails> <ns2:TransportMode>8</ns2:TransportMode> <ns2:CarrierRegistrationNo>FX1000</ns2:CarrierRegistrationNo> <ns2:CarrierNumber>FX1000</ns2:CarrierNumber> <ns2:DateOfDeparture>2019-05-30</ns2:DateOfDeparture> </ns3:OutboundCarrierDetails> </ns3:BatchHeader> <ns3:Consignments> <ns2:PartiesDetails> <ns2:ConsignorExporterTransferorCode>AE-1049133</ns2:ConsignorExporterTransferorCode> </ns2:PartiesDetails> <ns2:DeclarationDetails> <ns2:BrokerCustomerCode xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" /> <ns2:DeclarantReferenceNo>DRNVIKRAM014</ns2:DeclarantReferenceNo> <ns2:RegimeType>2</ns2:RegimeType> <ns2:DeclarationType>214</ns2:DeclarationType> <ns2:TotalNumberHAWBsConsolidated>2</ns2:TotalNumberHAWBsConsolidated> <ns2:PaymentDetails> <ns2:PaymentMode>1</ns2:PaymentMode> <ns2:PaymentReference>1112737</ns2:PaymentReference> </ns2:PaymentDetails> <ns2:PaymentDetails> <ns2:PaymentMode>2</ns2:PaymentMode> <ns2:PaymentReference>2112685</ns2:PaymentReference> </ns2:PaymentDetails> <ns2:TransportDocumentDetails> <ns2:OutboundTransportDocumentNo>MT200037</ns2:OutboundTransportDocumentNo> <ns2:CargoTypePackageCode>1</ns2:CargoTypePackageCode> <ns2:GrossWeightUnit>kg</ns2:GrossWeightUnit> <ns2:TotalGrossWeight>0.4</ns2:TotalGrossWeight> <ns2:NetWeightUnit>kg</ns2:NetWeightUnit> <ns2:TotalNetWeight>0.4</ns2:TotalNetWeight> <ns2:PackageDetails> <ns2:PackageType>PAL</ns2:PackageType> <ns2:TotalNumberOfPackages>2</ns2:TotalNumberOfPackages> </ns2:PackageDetails> </ns2:TransportDocumentDetails> </ns2:DeclarationDetails> <ns2:ShippingDetails> <ns2:DestinationCountry>SA</ns2:DestinationCountry> <ns2:ExitPort>DXA</ns2:ExitPort> <ns2:Invoices> <ns2:InvoiceCurrency>AED</ns2:InvoiceCurrency> <ns2:InvoiceValue>410.7</ns2:InvoiceValue> <ns2:INCOTermsCode>DDP</ns2:INCOTermsCode> <ns2:InvoiceItemsDetail> <ns2:InvoiceItemLineNumber>1</ns2:InvoiceItemLineNumber> <ns2:CommodityCode>83091000</ns2:CommodityCode> <ns2:GoodsDescription>Tom Ford Black Faye Oval Sunglasses</ns2:GoodsDescription> <ns2:GoodsCondition>U</ns2:GoodsCondition> <ns2:StatisticalQuantityMeasurementUnit>kg</ns2:StatisticalQuantityMeasurementUnit> <ns2:StatisticalQuantity>0.2</ns2:StatisticalQuantity> <ns2:NetWeightUnit>kg</ns2:NetWeightUnit> <ns2:NetWeight>0.2</ns2:NetWeight> <ns2:ValueOfGoods>186.76</ns2:ValueOfGoods> <ns2:CountryOfOrigin>IT</ns2:CountryOfOrigin> <ns2:isRestricted xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" /> </ns2:InvoiceItemsDetail> <ns2:InvoiceItemsDetail> <ns2:InvoiceItemLineNumber>2</ns2:InvoiceItemLineNumber> <ns2:CommodityCode>83091000</ns2:CommodityCode> <ns2:GoodsDescription>Tom Ford Tortoise Frame Celina Sunglasses</ns2:GoodsDescription> <ns2:GoodsCondition>U</ns2:GoodsCondition> <ns2:StatisticalQuantityMeasurementUnit>kg</ns2:StatisticalQuantityMeasurementUnit> <ns2:StatisticalQuantity>0.2</ns2:StatisticalQuantity> <ns2:NetWeightUnit>kg</ns2:NetWeightUnit> <ns2:NetWeight>0.2</ns2:NetWeight> <ns2:ValueOfGoods>223.94</ns2:ValueOfGoods> <ns2:CountryOfOrigin>IT</ns2:CountryOfOrigin> <ns2:isRestricted xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true" /> </ns2:InvoiceItemsDetail> </ns2:Invoices> </ns2:ShippingDetails> </ns3:Consignments> </ns1:Declaration> </ns1:CourierBulkProcessingProcessRequest> </soapenv:Body></soapenv:Envelope>`,
      gridData: [],
      typeData: [],
      showData: {},
      orderDetails: undefined,
      lineItems: undefined,
      orgDetailByCode: undefined,
      orderKey: -1,
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
      "internalid": this.props.params.id.split("-")[0]
    }
    this.props.actions.generalProcess(constants.orderDetails, request);
  }

  invoiceDetailsPopUpHandler = ({ actionName, index }) => {
    switch (actionName) {
        case "View SOAP Payload":
            console.log("View soap Payload hit");            
            this.setState({
                showData : this.state.dummyXmlPayload,
                modalIsOpenSOAP: true
            })
            break;
        default:
          break;
    }
  }
  updateState(data) {
    this.setState(data);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    console.log("params : ", this.props.params.id.split("-")[0])
    let request = {
      "body" : {
          "orderId": this.props.params.id.split("-")[0]
      }
  }
  this.setState({ orderKey :  this.props.params.id})

  this.props.actions.generalProcess(constantsApp.getEndToEndTrackingInformation, request);
    
    // interval = setInterval(() => {
    //   this.fetchData();
    // }, 5000);
  }
  renderPayload(xml) {

    this.setState({ modalIsOpenXML: true, xml: xml })
  }

  getDeclarationStatus(label){
    switch (label.toUpperCase()) {
      case 'SUBMITTED':
        return "panel panel-success"
      case "CLEARED":
        return "panel panel-success"
      case "CLEARANCE SUBJECT TO INSPECTION":
        return "panel panel-warning";
      case "RELEASE FOR INSPECTION":
        return "panel panel-warning";
      case "CREATED":
        return "panel panel-warning";
      case 'FAILED':
        return "panel panel-danger";
      case "DETAINED":
        return "panel panel-danger";
      case "SUSPEND":
        return "panel panel-danger";
      case "CANCELLED":
        return "panel panel-danger";
      case "DECLINED":
        return "panel panel-danger";
      case "REJECTED":
        return "panel panel-danger";
      case "FAIL DISPATCH":
        return "panel panel-danger";
      default:
        return "grey";
    }
  }

  getTransportModeIcon(label){
    
    switch (_.upperFirst(_.toLower(label))) {
      case 'Air':
        return "fa fa-plane"
      case "Sea":
        return "fa fa-ship"
      case "Land":
        return "fa fa-truck"
      case "Courier":
        return "fa fa-box"
      case "Postal":
        return "fa fa-plane"
      case 'Coastal':
        return "fa fa-plane"
      case "Courier Land":
        return "fa fa-plane"
      case "Courier Air":
        return "fa fa-plane"
      case "Passenger":
        return "fa fa-plane"
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps ============= ", nextProps)
    let stateCopy = _.clone(this.state)

    let invoiceDetailsContainer = {};
    if (nextProps.orderInvoiceDetails) {
      let invoiceID_O = this.state.orderKey.split("-")[1];
      let invoiceData = nextProps.orderInvoiceDetails.invoices.filter( item => { return invoiceID_O === item.id })[0];
      invoiceDetailsContainer.associatedEcommerceDetails = invoiceData.associatedEcommerceDetails
      invoiceDetailsContainer.brokerDetails = invoiceData.brokerDetails 
      invoiceDetailsContainer.logisticsStorageProviderDetails = invoiceData.logisticsStorageProviderDetails

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
        if(_.get(item.discount,"value", false) || _.get(item.discount,"percentage", false) ){
          obj.discount = item.discount.value ? item.discount.value :   item.valueOfGoods  * (item.discount.percentage / 100)
        }
        else{
          obj.discount = '-'
        }
        lineItemsTemp.push(obj)
      })

      invoiceDetailsContainer.lineItems = lineItemsTemp;

      // content For Tab2 (Transport)
      let transport = [];
      let transportTemp = [];
      if(invoiceData.transport){
        invoiceData.transport.typeOfTransport = "OUTBOUND"
        transportTemp.push(invoiceData.transport)
      }
      invoiceData.returnRequest.forEach(item =>{
        item.transport.oldHouseTransportNo = item.transport.previousTransportDocumentNo 
        item.transport.returnReason = item.request.reason
        item.transport.typeOfTransport = "RETURN"
        transportTemp.push(item.transport)
      })
 //   let transport = [];
      transportTemp.forEach( item => {
        let obj = {
          "typeOfTransport": _.get(item, 'typeOfTransport', ""), //typeoftranport
          "modeOfTransport": _.get(item.shippingDetails, 'modeOfTransport', ""), //modeoftranport
          "txID" : _.get(item, 'txID', ""),
          "txTimeStamp": _.get(item, "txTimeStamp", ""),
          "masterTransportNo": _.get(item.transportDetails, 'masterTransportDocumentNo', ""),
          "houseTransportNo":  _.get(item.transportDetails, 'houseTransportDocumentNo', ""),
          "oldHouseTransportNo" : _.get(item, "oldHouseTransportNo", "-"),
          "returnReason" : _.get(item, "returnReason", "-"),
          "cargoType":         _.get(item.transportDetails, 'cargoType', ""),
          "packageType":       _.get(item.transportDetails.packageDetails[0], 'packageType', ""),
          "noOfPackages":      _.get(item.transportDetails.packageDetails[0], 'numberOfPackages', ""),
          "grossWeight":       _.get(item.transportDetails, 'grossWeight', ""),
          "netWeight":         _.get(item.transportDetails, 'netWeight', ""),
          "volumetricWeight":  _.get(item.transportDetails, 'volumetricWeight', ""),
          "grossWeightUOM":       _.get(item.transportDetails, 'grossWeightUOM', ""),
          "netWeightUOM":         _.get(item.transportDetails, 'netWeightUOM', ""),
          "volumetricUOM":  _.get(item.transportDetails, 'volumetricUOM', ""),
          "transportImage":    _.get(item.transportDetails.document, 'path', ""),

          "shippingCode":      _.get(item, 'shippingCode', ""),
          "shippingBCode":     _.get(item.shippingDetails, 'shippingAirLineAgentDetails.businessCode', ""),
          "shippingName":      _.get(item.shippingDetails, 'shippingAirLineAgentDetails.companyName', ""),

          "CargoCode":         _.get(item.shippingDetails, 'cargoHandlerCode', ""),
          "CargoBCode":        _.get(item.shippingDetails, 'cargoHandlerCode.businessCode', ""),
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
          "submissionChannel": _.get( nextProps.orderInvoiceDetails, "submissionChannel", "")
        }
        let countryCode = _.get(item.shippingDetails, 'destinationCountry', "")
        let countryData = _.find(Countries.data.countries_and_flags, {'alpha2Code':countryCode})
        obj.destinationCountry = countryData ? countryData.name + " (" + countryData.alpha2Code + ") "  : "-",
        obj.destinationCountryFlagImage = countryData ? countryData.flag : "",

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
      invoiceDetailsContainer.NRClaim = invoiceData.NRClaim.length > 0 ? invoiceData.NRClaim[0] : undefined;
      if(invoiceDetailsContainer.NRClaim && invoiceDetailsContainer.NRClaim.charges.length > 0){
        
          item.totalCharges = _.sumBy(invoiceDetailsContainer.NRClaim.charges, function (item) {
            return item.chargeAmount
          })
      }
      
      let declarationTemp = [];
      let exportDeclaration = [];
      console.log("declaration object", invoiceData.declaration.latest ? true : false)
      !_.isEmpty(invoiceData.declaration.latest) ? 
      declarationTemp.push(invoiceData.declaration.latest)
      : {}

      !_.isEmpty(invoiceData.declaration.historical) ? 
      declarationTemp = declarationTemp.concat(invoiceData.declaration.historical)
      : {}

      declarationTemp.forEach(item => {
        let obj = {
                    "txID":  _.get(item, 'txID', ""),
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
                    "regimeType":         _.get(item, 'regimeType', ""), //
                    "declarationType":         _.get(item, 'declarationType', ""), // 
                    "exportCodeMirsal2":         _.get(item, 'declarationType', ""), //should be removed
                    "declarationPurpose":         _.get(item, 'declarationPurpose', ""), //
                    "relatedDocumentList": _.get(item, 'relatedDocuments', []), //
                    "paymentDetailsList": _.get(item, 'paymentDetails', []), //
                    "declarationItemList": _.get(item, 'declarationItem', [])
                  }
                  if(obj.chargesList.length > 0)
                  {  obj.totalCharges = _.sumBy(obj.chargesList, function (item) {
                      return item.chargeAmount;
                    }) 
                  }
                  else{
                    obj.totalCharges = 0;
                  }
            exportDeclaration.push(obj)
      })  

//      transport.forEach( item => {
      invoiceDetailsContainer.exportDeclaration = exportDeclaration;

      let importDeclarationTemp = [];
      let importDeclaration = [];

      invoiceData.returnRequest.forEach(item => {
        !_.isEmpty(item.declaration.latest) ? 
        importDeclarationTemp.push(item.declaration.latest)
        : {}
  
        !_.isEmpty(invoiceData.declaration.historical) ? 
        importDeclarationTemp = importDeclarationTemp.concat(item.declaration.historical)
        : {}
      })

     

      importDeclarationTemp.forEach(item => {
        let obj = {
                    "txID":  _.get(item, 'txID', ""),
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
                    "regimeType":         _.get(item, 'regimeType', ""), //
                    "declarationType":         _.get(item, 'declarationType', ""), // 
                    "exportCodeMirsal2":         _.get(item, 'declarationType', ""), //should be removed
                    "declarationPurpose":         _.get(item, 'declarationPurpose', ""), //
                    "relatedDocumentList": _.get(item, 'relatedDocuments', []), //
                    "paymentDetailsList": _.get(item, 'paymentDetails', []), //
                    "declarationItemList": _.get(item, 'declarationItem', [])
                  }
                  if(obj.chargesList.length > 0)
                  {  obj.totalCharges = _.sumBy(obj.chargesList, function (item) {
                      return item.chargeAmount;
                    }) 
                  }
                  else{
                    obj.totalCharges = 0;
                  }
        importDeclaration.push(obj)
      })  

//      transport.forEach( item => {
      invoiceDetailsContainer.importDeclaration = importDeclaration;


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
            "total": item.valueOfGoods,
            "statQuantity": item.supplementaryQty,
            "statUOM": item.supplementaryQtyUOM,
            "netWeight": item.netWeight
          }
          if(_.get(item.discount,"value", false) || _.get(item.discount,"percentage", false) ){
            obj.discount = item.discount.value ? item.discount.value :   item.valueOfGoods  * (item.discount.percentage / 100)
          }
          else{
            obj.discount = '-'
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

      returnRequest.forEach(item=> {
        let lineItemsDelivered = [];
        item.returnItems.forEach(item=>{
        let obj={
          "quantity": item.quantity,
          "description": item.description,
          "hscode": item.hscode,
          "unitPrice": item.originalValueOfItem,
          "countryOfOrigin" : item.countryOfOrigin,
          "statUOM": item.statUOM,
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
        if(_.get(item.discount,"value", false) || _.get(item.discount,"percentage", false) ){
          obj.discount = item.discount.value ? item.discount.value :   item.valueOfGoods  * (item.discount.percentage / 100)
        }
        else{
          obj.discount = '-'
        }
        lineItemsDelivered.push(obj)
        })
      item.returnItems = lineItemsDelivered
      })

      invoiceDetailsContainer.returnRequest = returnRequest;

      invoiceDetailsContainer.exportDeclarationTrackingLogs = invoiceData.exportDeclarationTrackingLogs.map( item =>{
            item.payloadAction = [{
              iconName: "icon-docs",
              label: "View SOAP Payload",
              actionType: "COMPONENT_FUNCTION"
          }]
         item.dateTime = moment.unix(item.txTimeStamp/1000).format("DD/MM/YYYY HH:mm:ss")
         return item
        })
      invoiceDetailsContainer.importDeclarationTrackingLogs = invoiceData.importDeclarationTrackingLogs.map( item => {
        item.payloadAction = [{
                iconName: "icon-docs",
                label: "View SOAP Payload",
                actionType: "COMPONENT_FUNCTION"
            }]
        item.dateTime = moment.unix(item.txTimeStamp/1000).format("DD/MM/YYYY HH:mm:ss")
        return item
      })
      // content For Tab8 (InvoiceTrackingLogs)
      invoiceDetailsContainer.invoiceTrackingLogs = invoiceData.InvoiceTrackingLogs.map( item => {
        item.dateTime = moment.unix(item.txTimeStamp/1000).format("DD/MM/YYYY HH:mm:ss")
        return item
      });
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
    if (label === "CANCELLED" || label == "UNDELIVERED" || label === "RETURN_BY_CUSTOMER") {
      return "warning";// warning is basically danger
    }
    else
    if(label === "TRANSPORTED" || label === "EXIT" || label === "DECLARED" || label === "PARTIAL RETURN" || label === "FULL RETURN" || label === "RET_DECLARED" || label === "RET_TRANSPORTED")
    {
      return "danger"; // and danger is warning
    }
    return "active";
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
        actionHandler: this.updateState.bind(this, {modalIsOpenSOAP: false})
      }
    ];
    if (this.state.isLoading)
      return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

    return (
      <div>
        <ModalBox isOpen={this.state.modalIsOpenSOAP}>
          <Portlet title={utils.getLabelByID("XML_Payload")} noCollapse={true} actions={modalActions}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  {this.formatXml(this.state.showData)}
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
                  return <li key={key} style={{ width: width }} className={item.label.toUpperCase() === this.state.invoiceDetailsContainer.invoiceStatus.toUpperCase() ? this.getActiveClass(item.label) : statusBarClass}>{item.label}</li>
                })}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="shadowBox Courierbox">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <div>
                      <h4 className="bold">{utils.getLabelByID("E_commerce")}</h4>
                    </div>
                    {console.log(this.state.orgDetailByCode)}
                    <div><img src={`${baseUrl}${this.state.invoiceDetailsContainer.associatedEcommerceDetails.companyLogo}`} onError={this.addDefaultCourierSrc} width="100px" height="100px" /></div>
                    { <span className="bold">{_.get(this.state.invoiceDetailsContainer.associatedEcommerceDetails, `companyName`, "")}</span> }
                  </div>
                  <div className="col-md-4 text-center">
                    <div><h4 className="bold">{utils.getLabelByID("Logistics_Processor")}</h4></div>
                    <div><img src={`${baseUrl}${this.state.invoiceDetailsContainer.brokerDetails.companyLogo}`} onError={this.addDefaultECommerceSrc} width="100px" height="100px" /></div>
                    { <span className="bold">{_.get(this.state.invoiceDetailsContainer.brokerDetails, `companyName`, "")}</span> }
                  </div>

                  <div className="col-md-4 text-center">
                    <div><h4 className="bold">{utils.getLabelByID("Declaration_Processor")}</h4></div>
                    <div><img src={`${baseUrl}${this.state.invoiceDetailsContainer.logisticsStorageProviderDetails.companyLogo}`} onError={this.addDefaultECommerceSrc} width="100px" height="100px" /></div>
                    { <span className="bold">{_.get(this.state.invoiceDetailsContainer.logisticsStorageProviderDetails, `companyName`, "")}</span> }
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="row">
            <div className="col-md-12">
              <div className="orderno">
                <img src="/assets/Resources/ordericon.png" width="18px" />
                <label>{utils.getLabelByID("Invoice_No")}
                  <span>{this.state.invoiceDetailsContainer.invoiceNumber}</span></label>
              </div>
              <div>
                <label>{utils.getLabelByID("Order_No")}
                  <span>{this.state.invoiceDetailsContainer.orderID}</span></label>
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
                        <label>{utils.getLabelByID("InvoiceDate")}</label>
                        </div>
                        <div className="col-md-6">
                            <span>{ this.state.invoiceDetailsContainer.invoiceDate}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                        <label>{utils.getLabelByID("TotalNoofPages")}</label>
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
                            <label className="bold">{utils.getLabelByID('Invoice_Type_')}</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.invoiceType}</span>
                        </div>
                </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">{utils.getLabelByID('Payment_Type_')}</label>
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
                          <label className="bold">{utils.getLabelByID("Total_Value_")}</label>
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
                            <label className="bold">{utils.getLabelByID('INCO_Terms_')}</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.incoTerms}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">{utils.getLabelByID('Insurance_Amount_')}</label>
                        </div>
                        <div className="col-md-6">
                          <span>{this.state.invoiceDetailsContainer.insuranceAmount} {this.state.invoiceDetailsContainer.insuranceCurrency}</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">{utils.getLabelByID("Freight_Amount_")}</label>
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
                            <label className="bold">{utils.getLabelByID('Exporter_')}</label>
                        </div>
                        <div className="col-md-6">
                            <span>{this.state.invoiceDetailsContainer.exporterCode } {this.state.invoiceDetailsContainer.exporterName }</span>
                        </div>
                </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">{utils.getLabelByID('Free_Zone_')}</label>
                        </div>
                        <div className="col-md-6">
                            <span>{ this.state.invoiceDetailsContainer.fzCode }</span>
                        </div>
                    </div>
            </div>
            <div className="col-md-4">
                    <div className="form-group">
                        <div className="col-md-6">
                            <label className="bold">{utils.getLabelByID('Warehouse_')}</label>
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
                    <li id="filtersTabLink" className="active"><a href="#orderLine" style={{color:"white"}} data-toggle="tab"><span>{utils.getLabelByID('Order_Line')}</span></a></li>
                    <li id="filtersTabLink"><a href="#transport" style={{color:"white"}} data-toggle="tab"><span> </span>{utils.getLabelByID('Transport')}</a></li>
                    <li id="filtersTabLink"><a href="#exportDeclaration" style={{color:"white"}} data-toggle="tab"><span>{utils.getLabelByID('Outbound_Declaration')}</span></a></li>
                    <li id="filtersTabLink"><a href="#exitConfirmation" style={{color:"white"}} data-toggle="tab"> <span>{utils.getLabelByID('Exit_Confirmation')}</span></a></li>
                    <li id="filtersTabLink"><a href="#delivered" style={{color:"white"}} data-toggle="tab"> <span>{utils.getLabelByID('Delivered')}</span></a></li>
                    <li id="filtersTabLink"><a href="#importDeclaration" style={{color:"white"}} data-toggle="tab"><span>{utils.getLabelByID('Inbound_Declaration')}</span></a></li>
                    <li id="filtersTabLink"><a href="#returnDetails" style={{color:"white"}} data-toggle="tab"><span>{utils.getLabelByID('Return_Details')}</span></a></li>
                    <li id="filtersTabLink"><a href="#invoiceTrackingLogs" style={{color:"white"}} data-toggle="tab"><span>{utils.getLabelByID('Logs')}</span></a></li>                  </ul>
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
                          <div className="col-md-3">
                            <div className="timeline timelinescreen">
                              <div className="line text-muted" />
                              <article className="panel panel-success">
                                <div className="panel-heading icon" />
                                <div className="panel-heading">
                                  {/* <label>{utils.getLabelByID('House_Transport_Doc_')}</label> */}
                                  <h2 className="panel-title">{item.houseTransportNo}</h2>
                                </div>
                              </article>
                              <article className="panel" style={{ backgroundcolor: "transparent" }}>
                                <div className="row text-left" style={ item.typeOfTransport === "RETURN" ? {display:"", paddingBottom: 10} : {display:"none"} } >
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Old_House_Transport_Doc_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>{item.oldHouseTransportNo}</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Master_Transport_Doc_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>{item.masterTransportNo}</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Mode_Of_transport_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>
                                        {item.modeOfTransport}{" "}
                                        {/* <img
                                          src="img/aeroplane.svg"
                                          width={30}
                                          alt
                                          style={{ paddingLeft: 10 }}
                                        /> */}
                                        <i style={{fontSize: "20px", paddingLeft: "10px" }}className={ this.getTransportModeIcon(item.modeOfTransport)} aria-hidden="true"></i>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>Port of Load :</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>XYZ</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Carrier_Registration_Number_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>{item.carrierRegistrationNumber}</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Date_of_Departure_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>{item.dateOfDeparture}</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Carrier_Number_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>{item.carrierNumber}</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Port_of_Discharge_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight: "normal" }}>{item.portOfDischarge}</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row text-left" style={{ paddingBottom: 10 }}>
                                  <div className="col-md-12">
                                    <div className="col-md-12">
                                      <label>{utils.getLabelByID('Destination_Country_')}</label>
                                    </div>
                                    <div className="col-md-12">
                                      <label style={{ fontWeight:"normal"}}> {item.destinationCountry} </label>
                                      <img style={{ width: "28px", marginLeft: "10px" }} src={item.destinationCountryFlagImage} />                                  
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                          </div>
                          <div className="col-md-9">
                            <div className="row" style={{ marginBottom: 50, marginTop: 20 }}>
                              <div className="col-md-2"></div>
                              <div className="col-md-10">
                                <div className="text-right">
                                  {" "}
                                  <span
                                    style={{
                                      backgroundColor: "#00ae4f",
                                      fontWeight: 600,
                                      fontSize: 16,
                                      color: "white",
                                      padding: "1rem 2rem",
                                      display:"block",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      marginRight: "15px"
                                    }}
                                  >
                                    { item.txID }
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="row" style={{ paddingBottom: 20 }}>
                                  <div className="col-md-6">
                                    <div style={ item.typeOfTransport === "RETURN" ? {display:"",paddingBottom: 30} : {display:"none"}}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Return_Reason_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.returnReason}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('No_of_Packages_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.noOfPackages}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Net_Weight_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.netWeight} {item.netWeightUOM}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Cargo_Type_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.cargoType}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Package_Type_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.packageType}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Gross_Weight_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.grossWeight} {item.grossWeightUOM}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Volumetric_Weight_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.volumetricWeight} {item.volumetricUOM}</label>
                                      </div>
                                    </div>
                                    <br />
                                    <br />
                                    
                                    <div className="col-md-12" style={{ }}>
                                      <label
                                        className="control-label pull-left bold"
                                        style={{
                                          marginBottom: 3,
                                          overflowWrap: "inherit",
                                          background: "#666",
                                          color: "white",
                                          padding: "10px 15px"
                                        }}
                                      >
                                        {utils.getLabelByID('Shipping_Airline_Agent')}
                                      </label>
                                    </div>
                                    <div className="col-md-12">
                                      <div style={{ paddingBottom: 30 }}>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            backgroundColor: "#e5e5e5",
                                            border: "1px solid grey",
                                            paddingTop: 10
                                          }}
                                        >
                                           {/* <label>{utils.getLabelByID('Business_Code_')}</label> */}
                                          <label>{item.shippingBCode}</label>
                                        </div>
                                        <div
                                          className="col-md-6"
                                          style={{
                                            backgroundColor: "#e5e5e5",
                                            border: "1px solid grey",
                                            paddingTop: 10
                                          }}
                                        >
                                          {/* <label>{utils.getLabelByID('Name_')}</label> */}
                                          <label style={{ fontWeight: "normal" }}>{item.shippingName}</label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12" style={{ marginTop: 20}}>
                                      <label
                                        className="control-label pull-left bold"
                                        style={{
                                          marginBottom: 3,
                                          overflowWrap: "inherit",
                                          background: "#666",
                                          color: "white",
                                          padding: "10px 15px"
                                        }}
                                      >
                                        {utils.getLabelByID('Cargo_Handler')}
                                      </label>
                                    </div>
                                    <div className="col-md-12">
                                      <div style={{ paddingBottom: 30 }}>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            backgroundColor: "#e5e5e5",
                                            border: "1px solid grey",
                                            paddingTop: 10
                                          }}
                                        >
                                          {/* <label>{utils.getLabelByID('Business_Code_')}</label> */}
                                          <label>{item.CargoBCode}</label>
                                        </div>
                                        <div
                                          className="col-md-6"
                                          style={{
                                            backgroundColor: "#e5e5e5",
                                            border: "1px solid grey",
                                            paddingTop: 10
                                          }}
                                        >
                                          {/* <label>{utils.getLabelByID('Name_')}</label> */}
                                          <label style={{ fontWeight: "normal" }}>{item.CargoName}</label>
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30, paddingTop: 100, marginTop: 120 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Original_Load_Port_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.originalLoadPort}</label>
                                      </div>
                                    </div>
                                    <div style={{ paddingBottom: 30 }}>
                                      <div className="col-md-6">
                                        <label>{utils.getLabelByID('Submission_Channel_')}</label>
                                      </div>
                                      <div className="col-md-6">
                                        <label style={{ fontWeight: "normal" }}>{item.submissionChannel}</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="col-md-12 text-right">
                                      <div className="text-center">
                                        <img src={baseUrl + item.transportImage} onError={this.addDefaultHAWBSrc} width="100%" alt />
                                      </div>
                                      {/* <img src="img/dewa.jpg" width="150" alt=""> */}
                                    </div>
                                  </div>
                                  <div className="col-md-6" style={{ margin: "0px 0px" }}></div>
                                </div>
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
                    {this.state.invoiceDetailsContainer.exitConfirmation.length > 0 ? this.state.invoiceDetailsContainer.exitConfirmation.map(item=>{
                      return (
                      <div className="row">
                        <div className="form-actions right">
                          <div className="form-group col-md-12">
                              <div className="btn-toolbar pull-right">
                                <button type="submit" className="btn green"
                                      onClick={ ()=> {this.invoiceDetailsPopUpHandler({actionName:"View SOAP Payload", index: -1}) } }>{utils.getLabelByID('View_SOAP_Payload')}</button>
                              </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="col-md-5">
                                <label>{utils.getLabelByID('Actual_Departure_Date_')}</label>
                            </div>
                            <div className="col-md-7">
                              {/* <label style={{ fontWeight:"normal"}}> {moment.unix(item.actualDepartureDate).format("DD/MM/YYYY HH:mm:ss")}</span> */}
                              <label style={{ fontWeight:"normal"}}> {item.actualDepartureDate}</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="col-md-5">
                                <label>{utils.getLabelByID('Debit_Credit_Account_')}</label>
                            </div>
                            <div className="col-md-7">
                              <label style={{ fontWeight:"normal"}}> {item.debitCreditAccountNumber}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    })
                    :
                    <div className="row">
                      <Lable text="No Exit Confirmation" style={{textAlign:"center"}} />
                    </div>
                    }
                    
                    { this.state.invoiceDetailsContainer.NRClaim ? 
                      <div className="row">
                        <Lable text="CLAIM" />
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>Claim Type: </label>
                            </div>
                            <div className="col-md-6">
                              <label style={{ fontWeight:"normal"}}> {this.state.invoiceDetailsContainer.NRClaim.claimType}</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>NR Claim No:</label>
                            </div>
                            <div className="col-md-6">
                              <label style={{ fontWeight:"normal"}}> {this.state.invoiceDetailsContainer.NRClaim.NRClaimNo}</label>
                            </div>
                          </div> 
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>Claim Submit Status: </label>
                            </div>
                            <div className="col-md-6">
                              <label style={{ fontWeight:"normal"}}> {this.state.invoiceDetailsContainer.NRClaim.claimRequestStatus}</label>
                            </div>
                          </div>                  
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>Claim Submission Date: </label>
                            </div>
                            <div className="col-md-6">
                              <label style={{ fontWeight:"normal"}}> {this.state.invoiceDetailsContainer.NRClaim.claimRequestDate}</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="col-md-6">
                                <label>CHARGES: </label>
                            </div>
                            <div className="col-md-6">
                              <label style={{ fontWeight:"normal"}}> Total = {this.state.invoiceDetailsContainer.exitConfirmation.totalCharges} {"AED"}</label>
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
                    :
                    <div className="row" style={ this.state.invoiceDetailsContainer.exitConfirmation.length > 0  ? {display:""} : {display:"none"}}>
                      <div className="col-md-12" style={{textAlign:"center"}}>
                        <label>No NRClaim Available</label>
                      </div>
                    </div>
                    } 
                  </div>
                  
                  <div id="exportDeclaration" className="tab-pane">
                    <div className="tab-pane in active">
                      <div className="ui-regulartabs">
                        <ul id="exportDeclarationTab" className="nav nav-tabs">
                          <li id="fieldsTabLink" className="active"><a href="#exportDeclarationLogs" style={{color:"white"}} data-toggle="tab">
                            <span>{utils.getLabelByID('Declaration_Submission_Logs')}</span></a>
                          </li>
                          <li id="filtersTabLink"><a href="#exportDeclarationView" style={{color:"white"}} data-toggle="tab"><span>{utils.getLabelByID('View_Declarations')}</span></a></li>
                        </ul>
                      </div>
                      <div className="tab-content ui-innertab ui-tabcontentbody">
                        <div id="exportDeclarationLogs" className="tab-pane in active ui-fieldtable">
                          <div className="row">
                            <div className="col-md-12">
                              <Table fontclass=""
                                  componentFunction={this.invoiceDetailsPopUpHandler}
                                  gridColumns={utils.getGridColumnByName("DeclarationSubmissionLogs")}
                                  gridData={this.state.invoiceDetailsContainer.exportDeclarationTrackingLogs}
                                  totalRecords={100}
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
                                <div className="col-md-3">
                                  <div className="timeline timelinescreen">       
                                    <div className="line text-muted"></div>
                                    <article className={this.getDeclarationStatus(item.status)}>                 
                                        <div className="panel-heading icon"></div>                                
                                        <div className="panel-heading"><h2 className="panel-title">{item.status}</h2></div>                      
                                    </article> 
                                    <article className="panel" style={{ backgroundColor: "transparent"}}>
                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                            <div className="col-md-12"><label>{utils.getLabelByID('Last_Action_')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.lastAction}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Action_Timestamp_')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {moment.unix(item.actionTimeStamp/1000).format("DD/MM/YYYY HH:mm:ss")}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Batch_Id')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.batchID}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>Regime Type: </label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.regimeType}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>


                                      {/* <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>Export Code Mirsal 2 :</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                  IM1

                                                  </label>
                                              </div>
                                          </div>
                                      </div> */}

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Status')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.status}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Request_ID')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.requestID}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Declaration_Type')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.declarationType}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                    </article>
                                  </div>
                                </div>  
                                <div className="col-md-9" style={{ marginTop: "20px" }}>
                                  <div className="row" style={{ marginBottom: "50px" }}>
                                    <div className="col-md-2"></div>
                                      <div className="col-md-10" style={{    display: "block", overflow: "hidden", padding: "10px 10px" }}>
                                          <div className="text-right">
                                            <span style={{ 
                                              backgroundColor:"#00ae4f", fontWeight: "600", fontSize: "16px", color:"white", padding: "1rem 2rem", display:"block", overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              marginRight: "15px"
                                              }}>{item.txID}</span></div>                    
                                      </div>
                                  </div>
                                  
                                  <div className="col-md-12">
                                      
                                  </div> 
                                  
                                  <div className="row">       
                                    <div className="col-md-12">
                                        <div className="row" style={{ paddingBottom: "20px" }}>
                                          <div className="col-md-6">
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="col-md-6">
                                                  <label>{utils.getLabelByID('Version')}</label>
                                                </div>
                                                <div className="col-md-6">
                                                  <label style={{ fontWeight: "normal" }}>{item.version}</label>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="col-md-6">
                                                  <label>{utils.getLabelByID('Declaration_Purpose')}</label>
                                                </div>
                                                <div className="col-md-6">
                                                  <label style={{ fontWeight: "normal" }}>{_.get(item, "declarationPurpose", "-")}</label>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="col-md-6">
                                                  <label>{utils.getLabelByID('Declaration_No')}</label>
                                                </div>
                                                <div className="col-md-6">
                                                  <label style={{ fontWeight: "normal" }}>{item.declarationNo}</label>
                                                </div>
                                              </div>
                                            </div>
                                            { item.chargesList.length > 0 ?
                                              <div className="col-md-12" style={{ margin: "10px 0px 0px 0px" }}>
                                                <div className="col-md-12">
                                                  <label className="control-label pull-left bold" style={{ padding: "0px", margin: "0px 0px -10px -15px", overflowWrap: "inherit" }}>
                                                    {"Charges Total = " + item.totalCharges  + " AED"}
                                                  </label>
                                                </div>
                                                <div className="row">
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
                                                </div>
                                              </div>
                                              :  
                                                <div></div>
                                              }
                                            { item.exceptionsList.length > 0 ?
                                              <div className="col-md-12" style="margin: 10px 0px 0px 0px;">
                                                <div className="col-md-12">
                                                  <label className="control-label pull-left bold" style={{ padding: "0px", margin: "0px 0px -10px -15px", overflowWrap: "inherit" }}>
                                                    {utils.getLabelByID('Exceptions')}
                                                  </label>
                                                </div>
                                                <div className="row">
                                                  <div className="col-md-12">
                                                      <Table fontclass=""
                                                        gridColumns={utils.getGridColumnByName("BusinessTransactionError")}
                                                        gridData={_.get(item,'exceptionsList', [])}
                                                        totalRecords={100}
                                                        searchCallBack={this.searchCallBack}
                                                        pageSize={10}
                                                        pagination={false} pageChanged={this.pageChanged}
                                                        export={false}
                                                        search={true}
                                                      />
                                                  </div>
                                                </div>
                                              </div>
                                              :  
                                                <div></div>
                                            }
                                          </div>
                                          <div className="col-md-6" style={{ margin: "0px 0px" }}>
                                            <div className="col-md-12">
                                              <div className="col-md-12 text-right">
                                                <div style={{ backgroundImage: "url('/assets/Resources/images/soapPayloadImage.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "160px", height: "180px", float:"right" }}  className="text-center">
                                                  <button className="btn" style={{ backgroundColor: "#333", marginTop: "70px", color: "white", border: "1px solid white" }}
                                                    onClick={()=> {this.invoiceDetailsPopUpHandler({actionName:"View SOAP Payload", index: -1}) }}>SOAP payload</button>
                                                </div>                                                  
                                              </div>
                                              {/* <AnchorComp
                                                  anchotDisplayName = {utils.getLabelByID('SOAP_Payload')}
                                                  // invokeAnchorButtonhandlar = {this.soapPayloadHandler}
                                                  invokeAnchorButtonhandlar = {()=> {this.invoiceDetailsPopUpHandler({actionName:"View SOAP Payload", index: -1}) }}
                                              /> */}
                                            </div>
                                          </div>                                  
                                        </div>                  
                                    </div>
                                  </div>                      
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="portlet light bordered sdg_portlet" style={{display:"flex"}}>
                                        <div className="col-md-6">
                                          <Lable text={utils.getLabelByID('Related_Documents')} style={{padding:"0px", margin:"0px 0px -10px -15px"}} />
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
                                          <Lable text={utils.getLabelByID('Payment_Details')} style={{padding:"0px", margin:"0px 0px -10px -15px"}} />
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
                                      </div>
                                    </div>
                                  </div>
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
                      <div className="row" style={{ paddingTop: "25px",  paddingBottom: "25px"}}>
                          
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-2">
                            <label>{utils.getLabelByID('Status')} </label>
                          </div>
                          <div className="col-md-8">
                              <label style={{ fontStyle: "italic"}}> {(item.deliveryStatus).toUpperCase()}</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label>{utils.getLabelByID('Delivery_Date_')}</label>
                          </div>
                          <div className="col-md-8">
                            <label style={{fontWeight:"normal"}}>{moment.unix(item.deliveryDate).format("DD/MM/YYYY HH:mm:ss")}</label>
                          </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                              <label>{utils.getLabelByID('Delivery_Type_')}</label>
                            </div>
                            <div className="col-md-8">
                              <label key={1} className="mt-checkbox mt-checkbox-outline"
                                  style={{ marginTop: "0px", marginRight: "10px" }}>
                                  <input type="checkbox"
                                      name="deliveryType"
                                      checked={item.deliveryType === "contact" ? true : false}
                                  />
                                  <span> </span>
                                  {utils.getLabelByID('Contact')}
                              </label>
                              <label key={2} className="mt-checkbox mt-checkbox-outline"
                                  style={{ marginTop: "0px" }}>
                                  <input type="radio" className="form-control"
                                      name="deliveryType"
                                      checked={item.deliveryType === "contactless" ? true : false}
                                  />
                                  <span> </span>
                                  {utils.getLabelByID('Contactless')}
                              </label>
                            </div>
                          </div>
                        <div className="row">
                            <div className="col-md-4">
                              <label>{utils.getLabelByID('Delivery_To_Person_')}</label>
                            </div>
                            <div className="col-md-8">
                              <label style={{fontWeight:"normal"}}>{item.deliveryToPerson}</label>
                            </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                        <div className="col-md-12">
                          <label style={ item.deliveryType === "contact" ? {display:""} : {display: "none"} }>Signature</label>
                        </div>
                        <div className="col-md-12">  
                          <img style={ item.deliveryType === "contact" ? {width: "50%", display:""} : {display: "none"}}  src={baseUrl + item.signature.path} onError={this.addDefaultHAWBSrc} />
                        </div>
                        <div className="col-md-12">
                          <div style={ item.deliveryType === "contact" ? {display:""} : {display: "none"}}>
                            <AnchorComp 
                                anchotDisplayName = {"Download"} style ={{paddingTop:"10px"}}
                                invokeAnchorButtonhandlar = {this.downloadHandler}
                            />
                          </div>
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
                      <div className="col-md-12" style={{display:"flex", justifyContent:"center"}}>
                        <hr style={{width:"80%", border:"1px solid #e7ecf1"}}></hr>
                      </div>
                    </div>
                    )
                    })}
                  </div>
                  
                  <div id="importDeclaration" className="tab-pane">
                    <div className="tab-pane in active">
                      <div className="ui-regulartabs">
                        <ul id="importDeclarationTab" className="nav nav-tabs">
                          <li id="fieldsTabLink" className="active"><a href="#importDeclarationLogs" style={{color:"white"}} data-toggle="tab">
                            <span> Declaration Submission Logs</span></a>
                          </li>
                          <li id="filtersTabLink"><a href="#importDeclarationView" style={{color:"white"}} data-toggle="tab"> <span> View Declarations</span></a></li>
                        </ul>
                      </div>
                      <div className="tab-content ui-innertab ui-tabcontentbody">
                        <div id="importDeclarationLogs" className="tab-pane in active ui-fieldtable">
                          <div className="row">
                            <div className="col-md-12">
                              <Table fontclass=""
                                  componentFunction={this.invoiceDetailsPopUpHandler}
                                  gridColumns={utils.getGridColumnByName("DeclarationSubmissionLogs")}
                                  gridData={this.state.invoiceDetailsContainer.importDeclarationTrackingLogs}
                                  totalRecords={100}
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
                          { this.state.invoiceDetailsContainer.importDeclaration.map(item => {
                            return(
                              <div className="row">
                                <div className="col-md-3">
                                  <div className="timeline timelinescreen">       
                                    <div className="line text-muted"></div>
                                    <article className={this.getDeclarationStatus(item.status)}>                 
                                        <div className="panel-heading icon"></div>                                
                                        <div className="panel-heading"><h2 className="panel-title">{item.status}</h2></div>                      
                                    </article> 
                                    <article className="panel" style={{ backgroundColor: "transparent"}}>
                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                            <div className="col-md-12"><label>{utils.getLabelByID('Last_Action_')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.lastAction}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Action_Timestamp_')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {moment.unix(item.actionTimeStamp/1000).format("DD/MM/YYYY HH:mm:ss")}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Batch_Id')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.batchID}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>Regime Type: </label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.regimeType}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>


                                      {/* <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>Export Code Mirsal 2 :</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                  IM1

                                                  </label>
                                              </div>
                                          </div>
                                      </div> */}

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Status')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.status}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Request_ID')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.requestID}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="row text-left" style={{ paddingBottom:"10px" }}>
                                          <div className="col-md-12">
                                              <div className="col-md-12"><label>{utils.getLabelByID('Declaration_Type')}</label></div>
                                              <div className="col-md-12">
                                                  <label style={{ fontWeight: "normal" }}>
                                                    {item.declarationType}
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                    </article>
                                  </div>
                                </div>  
                                <div className="col-md-9" style={{ marginTop: "20px" }}>
                                  <div className="row" style={{ marginBottom: "50px" }}>
                                    <div className="col-md-2"></div>
                                      <div className="col-md-10" style={{    display: "block", overflow: "hidden", padding: "10px 10px" }}>
                                          <div className="text-right">
                                            <span style={{ 
                                              backgroundColor:"#00ae4f", fontWeight: "600", fontSize: "16px", color:"white", padding: "1rem 2rem", display:"block", overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              marginRight: "15px"
                                              }}>{item.txID}</span></div>                    
                                      </div>
                                  </div>
                                  
                                  <div className="col-md-12">
                                      
                                  </div> 
                                  
                                  <div className="row">       
                                    <div className="col-md-12">
                                        <div className="row" style={{ paddingBottom: "20px" }}>
                                          <div className="col-md-6">
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="col-md-6">
                                                  <label>{utils.getLabelByID('Version')}</label>
                                                </div>
                                                <div className="col-md-6">
                                                  <label style={{ fontWeight: "normal" }}>{item.version}</label>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="col-md-6">
                                                  <label>{utils.getLabelByID('Declaration_Purpose')}</label>
                                                </div>
                                                <div className="col-md-6">
                                                  <label style={{ fontWeight: "normal" }}>{_.get(item, "declarationPurpose", "-")}</label>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="col-md-6">
                                                  <label>{utils.getLabelByID('Declaration_No')}</label>
                                                </div>
                                                <div className="col-md-6">
                                                  <label style={{ fontWeight: "normal" }}>{item.declarationNo}</label>
                                                </div>
                                              </div>
                                            </div>
                                            { item.chargesList.length > 0 ?
                                              <div className="col-md-12" style={{ margin: "10px 0px 0px 0px" }}>
                                                <div className="col-md-12">
                                                  <label className="control-label pull-left bold" style={{ padding: "0px", margin: "0px 0px -10px -15px", overflowWrap: "inherit" }}>
                                                    {"Charges Total = " + item.totalCharges  + " AED"}
                                                  </label>
                                                </div>
                                                <div className="row">
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
                                                </div>
                                              </div>
                                              :  
                                                <div></div>
                                              }
                                            { item.exceptionsList.length > 0 ?
                                              <div className="col-md-12" style="margin: 10px 0px 0px 0px;">
                                                <div className="col-md-12">
                                                  <label className="control-label pull-left bold" style={{ padding: "0px", margin: "0px 0px -10px -15px", overflowWrap: "inherit" }}>
                                                    {utils.getLabelByID('Exceptions')}
                                                  </label>
                                                </div>
                                                <div className="row">
                                                  <div className="col-md-12">
                                                      <Table fontclass=""
                                                        gridColumns={utils.getGridColumnByName("BusinessTransactionError")}
                                                        gridData={_.get(item,'exceptionsList', [])}
                                                        totalRecords={100}
                                                        searchCallBack={this.searchCallBack}
                                                        pageSize={10}
                                                        pagination={false} pageChanged={this.pageChanged}
                                                        export={false}
                                                        search={true}
                                                      />
                                                  </div>
                                                </div>
                                              </div>
                                              :  
                                                <div></div>
                                            }
                                          </div>
                                          <div className="col-md-6" style={{ margin: "0px 0px" }}>
                                            <div className="col-md-12">
                                              <div className="col-md-12 text-right">
                                                <div style={{ backgroundImage: "url('/assets/Resources/images/soapPayloadImage.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "160px", height: "180px", float:"right" }}  className="text-center">
                                                  <button className="btn" style={{ backgroundColor: "#333", marginTop: "70px", color: "white", border: "1px solid white" }}
                                                    onClick={()=> {this.invoiceDetailsPopUpHandler({actionName:"View SOAP Payload", index: -1}) }}>SOAP payload</button>
                                                </div>                                                  
                                              </div>
                                              {/* <AnchorComp
                                                  anchotDisplayName = {utils.getLabelByID('SOAP_Payload')}
                                                  // invokeAnchorButtonhandlar = {this.soapPayloadHandler}
                                                  invokeAnchorButtonhandlar = {()=> {this.invoiceDetailsPopUpHandler({actionName:"View SOAP Payload", index: -1}) }}
                                              /> */}
                                            </div>
                                          </div>                                  
                                        </div>                  
                                    </div>
                                  </div>                      
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="portlet light bordered sdg_portlet" style={{display:"flex"}}>
                                        <div className="col-md-6">
                                          <Lable text={utils.getLabelByID('Related_Documents')} style={{padding:"0px", margin:"0px 0px -10px -15px"}} />
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
                                          <Lable text={utils.getLabelByID('Payment_Details')} style={{padding:"0px", margin:"0px 0px -10px -15px"}} />
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              )
                            })}
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
                                <Lable text={utils.getLabelByID('Return_Request_Date_')} columns="6"></Lable>
                                <span>{moment.unix(item.requestDate).format("DD/MM/YYYY HH:mm:ss")}</span>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-6">
                                <Lable text={utils.getLabelByID('Return_Request_Reason_')} columns="6"></Lable>
                                <span>{item.reason}</span>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-12">
                                <Lable text={utils.getLabelByID('Return_Items')} columns="12" style={{marginBottom:"0px"}}></Lable>
                              </div>
                          </div>
                          <div className="col-md-12">
                            <Table
                              componentFunction={this.ReturnProofHandler}
                              pagination={false}
                              export={false}
                              search={false}
                              gridColumns={utils.getGridColumnByName("orderLine")}
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
