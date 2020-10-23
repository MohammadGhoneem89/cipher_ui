/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
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
import CheckBox from '../../common/CheckBox.jsx';
import moment from 'moment'
import backOffices from '../../../backOffices';
import Lable from '../../common/Lable.jsx';
import lov from './typedata.js';
import AnchorComp from '../../common/AnchorComp.jsx';
import * as constantsApp from '../../constants/appCommunication.js';


let baseUrl = backOffices.baseUrl;
let interval;
class ItemDetails extends React.Component {

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
      ]
    };


    this.DeliveryProofHandler = this.DeliveryProofHandler.bind(this);
    this.ReturnProofHandler = this.ReturnProofHandler.bind(this);
  }
  componentWillUnmount() {
    clearInterval(interval)

  }
  fetchData() {
    let request = {
      "internalid": this.props.params.id
    }
    this.props.actions.generalProcess(constants.orderDetails, request);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  //this.fetchData();
    
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
  componentWillReceiveProps(nextProps) {

    console.log("nextProps ============= ", nextProps)
    let stateCopy = _.clone(this.state)

    let itemDetailsContainer = {};
    if (nextProps.orderInvoiceDetails) {
      let _orderKey = this.state.orderKey.split("-")
      let invoiceID_O = _orderKey[1];
      let lineItemID_O = _orderKey[2]
      let invoiceData = nextProps.orderInvoiceDetails.invoices.filter( item => { 
        return invoiceID_O === item.id 
      })[0];
      let lineItemsData = invoiceData.lineItems.filter( item => { 
        return lineItemID_O === item.id 
      })[0];
      console.log("filterlne items- ======",lineItemsData);

      itemDetailsContainer.orderID = nextProps.orderInvoiceDetails.orderID;
      itemDetailsContainer.invoiceNumber = invoiceData.invoiceNumber;
      itemDetailsContainer.txID = nextProps.orderInvoiceDetails.txID;

      let lineItemsDetails={
        "quantity": lineItemsData.quantity,
        "description": lineItemsData.description,
        "hscode": lineItemsData.hscode,
        "unitPrice": lineItemsData.originalValueOflineItemsData,
        "countryOfOrigin" : lineItemsData.countryOfOrigin,
        "statUOM": lineItemsData.statUOM,
        "discount": lineItemsData.discount.value,
        "total": lineItemsData.valueOfGoods,
        "statQuantity": lineItemsData.supplementaryQty,
        "statUOM": lineItemsData.supplementaryQtyUOM,
        "netWeight": lineItemsData.netWeight,
        "netWeightUOM": lineItemsData.netWeightUOM,
        "sku": lineItemsData.sku,
        "isFreeOfCost": lineItemsData.isFreeOfCost,
        "goodsCondition" : lineItemsData.goodsCondition,
        "returnDays": lineItemsData.returnDays
      }

      itemDetailsContainer.lineItemsDetails = lineItemsDetails
      itemDetailsContainer.imageURL = lineItemsData.documents.path;
      itemDetailsContainer.permits = !_.isEmpty(lineItemsData.permits) ? lineItemsData.permits : [];
      itemDetailsContainer.exemptions = !_.isEmpty(lineItemsData.exemptions) ? Array.of(lineItemsData.exemptions) : [];

      stateCopy.itemDetailsContainer = itemDetailsContainer;
      console.log("stateCopy props udpate ===== ", stateCopy);
      stateCopy.isLoading = false
      this.setState(stateCopy)
    }
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
  addDefaultImgSrc(ev) {
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
                    <div className="orderno">
                        <img src="/assets/Resources/ordericon.png" width="18px" /><label>Invoice
                            #: <span>{this.state.itemDetailsContainer.invoiceNumber}</span></label>
                    </div>
                    <div>
                        <label>Order #: <span>{this.state.itemDetailsContainer.orderID}</span></label>
                    </div>
                    <div className="hashno">
                        <label>{this.state.itemDetailsContainer.txID}</label>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div class="col-md-12">
                    <Table
                        componentFunction={this.DeliveryProofHandler}
                        pagination={false}
                        export={false}
                        search={false}
                        gridColumns={utils.getGridColumnByName("orderLine")}
                        gridData={Array.of(this.state.itemDetailsContainer.lineItemsDetails)}
                        totalRecords={1}
                        pageChanged={() => {
                        }}
                        activePage={1}
                        pageSize={10}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3">
                                <label>Quantity: </label>
                            </div>
                            <div className="col-md-3">
                              <span>{this.state.itemDetailsContainer.lineItemsDetails.quantity}</span>
                            </div>
                            <div className="col-md-3">
                                <label>SKU Quantity: </label>
                            </div>
                            <div className="col-md-3">
                              <span>{this.state.itemDetailsContainer.lineItemsDetails.sku.qty} {this.state.itemDetailsContainer.lineItemsDetails.sku.quantityUOM}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>Net Weight: </label>
                            </div>
                            <div className="col-md-3">
                                <span>{this.state.itemDetailsContainer.lineItemsDetails.netWeight} {this.state.itemDetailsContainer.lineItemsDetails.netWeightUOM}</span>
                            </div>
                            <div className="col-md-3">
                                <label>SKU Product Code: </label>
                            </div>
                            <div className="col-md-3">
                                <span>{this.state.itemDetailsContainer.lineItemsDetails.sku.productCode}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>Original Value of Item: </label>
                            </div>
                            <div className="col-md-3">
                                <span>200 AED</span>
                            </div>
                            <div className="col-md-3">
                                <label>Total Available Stock Qty: </label>
                            </div>
                            <div className="col-md-3">
                                <span>12</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>Is Free of Cost: </label>
                            </div>
                            <div className="col-md-3">
                                <label key={1} className="mt-checkbox mt-checkbox-outline"
                                    style={{ marginBottom: "0px", marginTop: "0px" }}>
                                    <input type="checkbox" className="form-control"
                                      disabled={true}
                                      name="isFreeOfCost"
                                      checked={this.state.itemDetailsContainer.lineItemsDetails.isFreeOfCost}/>
                                    <span></span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>Goods Condition: </label>
                            </div>
                            <div className="col-md-3">
                                <span>{this.state.itemDetailsContainer.lineItemsDetails.goodsCondition}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>Return Days: </label>
                            </div>
                            <div className="col-md-3">
                                <span>{this.state.itemDetailsContainer.lineItemsDetails.returnDays} days</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                            <img style={{ flexShrink: "0", minWidth: "100%", maxHeight: "200px" }} src={baseUrl + this.state.itemDetailsContainer.imageURL} onError={this.addDefaultImgSrc} />
                        </div>
                    </div>
                </div>
            </div>
        
                    
            <div class="col-md-8">
                <Lable text="Permits" style={{marginLeft:"-15px", marginBottom:"-10px"}}/>
                <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("Permits")}
                    gridData={this.state.itemDetailsContainer.permits}
                    totalRecords={this.state.itemDetailsContainer.permits.length}
                    pageChanged={() => {
                    }}
                    activePage={1}
                    pageSize={10}
                />
            </div>
            <div class="col-md-6">
                <Lable text="Exemptions" style={{marginLeft:"-15px", marginBottom:"-10px"}}/>
                <Table
                    style={{ paddingTop:"0px" }}
                    componentFunction={this.DeliveryProofHandler}
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("Exemptions")}
                    gridData={this.state.itemDetailsContainer.exemptions}
                    totalRecords={this.state.itemDetailsContainer.exemptions.length}
                    pageChanged={() => {
                    }}
                    activePage={1}
                    pageSize={10}
                />
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

ItemDetails.displayName = "Items Details";
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
