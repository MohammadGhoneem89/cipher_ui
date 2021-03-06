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
import moment from 'moment'
import backOffices from '../../../backOffices';
import Lable from '../../common/Lable.jsx';
import lov from './typedata.js';

let baseUrl = backOffices.baseUrl;
let interval;
class OrderDetailsContainer extends React.Component {

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
    this.fetchData();

    // interval = setInterval(() => {
    //   this.fetchData();
    // }, 5000);
  }
  renderPayload(xml) {

    this.setState({ modalIsOpenXML: true, xml: xml })
  }
  componentWillReceiveProps(nextProps) {
    let stateCopy = _.clone(this.state)

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

      stateCopy.isLoading = false;
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
          <Portlet title={utils.getLabelByID("Proof")} noCollapse={true} actions={modalActions}>
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
          </Portlet>
        </ModalBox>
        <div className="portlet light" style={{ "min-height": "854px" }}>

          <div className="row">
            <div className="col-md-12">
              <ul id="progressbar">
                {this.state.statusList[this.state.orderDetails.tranxData.deliveryStatus].map((item, key) => {
                  let width = (100 / this.state.statusList[this.state.orderDetails.tranxData.deliveryStatus].length).toString() + "%"
                  if (item.legend.toUpperCase() == this.state.orderDetails.tranxData.orderStatus) {
                    statusBarClass = "notPassed"
                  }
                  return <li key={key} style={{ width: width }} className={item.legend.toUpperCase() == this.state.orderDetails.tranxData.orderStatus ? this.getActiveClass(item.label) : statusBarClass}>{item.label}</li>
                })}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="orderno">
                <img src="/assets/Resources/ordericon.png" width="18px" /><label className="bold">Order
                #: <span>{this.state.orderDetails.tranxData.orderID}</span></label>
              </div>
              <div className="hashno">
                <label className="bold">{this.state.orderDetails.txnid}</label>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-12">
              <div className="shadowBox Courierbox">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div>
                      <h4 className="bold">E-commerce</h4>
                    </div>
                    {console.log(this.state.orgDetailByCode)}
                    <div><img src={baseUrl + (_.get(this.state.orgDetailByCode.data, `${this.state.orderDetails.tranxData.eCommerceOrgCode}.logo.sizeMedium`, ""))} onError={this.addDefaultCourierSrc} width="100px" height="100px" /></div>
                    <span className="bold">{_.get(this.state.orgDetailByCode.data, `${this.state.orderDetails.tranxData.eCommerceOrgCode}.name`, "")}</span>
                  </div>
                  <div className="col-md-6 text-center">
                    <div><h4 className="bold">Courier Company</h4></div>
                    <div><img src={baseUrl + (_.get(this.state.orgDetailByCode.data, `${this.state.orderDetails.tranxData.courierOrgCode}.logo.sizeMedium`, ""))} onError={this.addDefaultECommerceSrc} width="100px" height="100px" /></div>
                    <span className="bold">{_.get(this.state.orgDetailByCode.data, `${this.state.orderDetails.tranxData.courierOrgCode}.name`, "")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-md-4">
                <ShadowBox title="Sold To" icon="/assets/Resources/soldTo.png">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Name:</label>
                    </div>
                    <div className="col-md-5">
                      <label>{this.state.orderDetails.tranxData.soldTo}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Address:</label>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.soldToAddress.addressLine1}</label>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.soldToAddress.addressLine2}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.soldToAddress.POBox}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.soldToAddress.city}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.soldToAddress.country}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </ShadowBox>
              </div>

              <div className="col-md-4">
                <ShadowBox title="Bill To" icon="/assets/Resources/Billto.png">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Name:</label>
                    </div>
                    <div className="col-md-5">
                      <label>{this.state.orderDetails.tranxData.billTo}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Address:</label>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.billToAddress.addressLine1}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.billToAddress.addressLine2}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.billToAddress.POBox}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.billToAddress.city}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.billToAddress.country}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </ShadowBox>
              </div>

              <div className="col-md-4">
                <ShadowBox title="Ship To" icon="/assets/Resources/shipto.png">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Name:</label>
                    </div>
                    <div className="col-md-5">
                      <label>{this.state.orderDetails.tranxData.shipTo}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Address:</label>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.shipToAddress.addressLine1}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.shipToAddress.addressLine2}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.shipToAddress.POBox}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.shipToAddress.city}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>{this.state.orderDetails.tranxData.soldToAddress.country}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </ShadowBox>
              </div>
            </div>
          </div>

          <div className="row">

            <div className="col-md-4">
              <div className="rowdata">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="bold">Total Value:</label>
                    </div>
                    <div className="col-md-4">
                      <label>{this.state.orderDetails.tranxData.totalValue}</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="bold">City:</label>
                    </div>
                    <div className="col-md-4">
                      <label>N/A</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-md-4">
              <div className="rowdata">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="bold">No of Items:</label>
                    </div>
                    <div className="col-md-4">
                      <label>{this.state.orderDetails.tranxData.noOfItems}</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="bold">Return Policy:</label>
                    </div>
                    <div className="col-md-4">
                      <label>{this.state.orderDetails.tranxData.returnPolicy}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-md-4">
              <div className="rowdata">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="bold">Currency:</label>
                    </div>
                    <div className="col-md-4">
                      <label>{this.state.orderDetails.tranxData.currency}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="tab-pane in active">
                <div className="ui-regulartabs">
                  <ul id="adHocTabs" className="nav nav-tabs">
                    <li id="fieldsTabLink" className="active"><a href="#OrderLine" data-toggle="tab">
                      <span> Order Line</span></a>
                    </li>
                    <li id="filtersTabLink"><a href="#HAWB" data-toggle="tab"> <span> HAWB</span></a></li>
                    <li id="groupsTabLink"><a href="#Shipping" data-toggle="tab"> <span> Shipping</span></a></li>
                    <li id="fieldsTabLink"><a href="#ExportDeclaration" data-toggle="tab">
                      <span> Export Declaration</span></a>
                    </li>
                    <li id="fieldsTabLink"><a href="#ImportDeclaration" data-toggle="tab">
                      <span> Import Declaration</span></a>
                    </li>
                    <li id="filtersTabLink"><a href="#Delivered" data-toggle="tab"> <span> Delivered</span></a>
                    </li>
                    <li id="groupsTabLink"><a href="#ReturnDetails" data-toggle="tab">
                      <span> Return Details</span></a></li>
                  </ul>
                </div>
                <div className="tab-content ui-innertab ui-tabcontentbody">
                  <div id="OrderLine" className="tab-pane in active ui-fieldtable">
                    <Table
                      componentFunction={this.DeliveryProofHandler}
                      pagination={false}
                      export={false}
                      search={false}
                      gridColumns={utils.getGridColumnByName("orderLine")}
                      gridData={this.state.orderDetails.tranxData.lineItems || []}
                      totalRecords={5}
                      pageChanged={() => {
                      }}
                      activePage={1}
                      pageSize={10}
                    />
                  </div>
                  <div id="HAWB" className="tab-pane">
                    {this.state.orderDetails.tranxData.ExportHAWB.HAWBNumber == "" && <div className="row">
                      <text className="col-md-12" style={{ textAlign: "center", color: "#3064f0c4", fontWeight: "bold", fontSize: "18px" }}>HAWB Not Found</text>
                    </div>}
                    <div className="row">
                      <div className="col-md-6">
                        <label className="bold">AWB #:</label>
                        <label><span className="awbNO">{this.state.orderDetails.tranxData.ExportHAWB.HAWBNumber}</span></label>
                      </div>
                      <div className="col-md-6 text-right">
                        <label className="bold">No Of Box:</label>
                        <label><span className="noofbox">{this.state.orderDetails.tranxData.ExportHAWB.noOfBoxes}</span></label>
                      </div>
                      <div className="col-md-12 text-center">
                        <div className="shadowBox recipt">
                          <img src={baseUrl + '/API/core/download?type=IMAGE&path=' + this.state.orderDetails.tranxData.ExportHAWB.HAWBHash} onError={this.addDefaultHAWBSrc} height="30%" />
                        </div>
                      </div>
                    </div>


                  </div>
                  <div id="Shipping" className="tab-pane">
                    <div>
                      <div className="form-group">
                        {this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.MAWBNumber == "" && <div className="row">
                          <text className="col-md-12" style={{ textAlign: "center", color: "#3064f0c4", fontWeight: "bold", fontSize: "18px" }}>Shipping Details Not Found</text>
                        </div>}
                      </div>
                      {this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.MAWBNumber != "" && <div>
                      <div className="row">
                        <div className="col-md-2">
                          <label className="bold">MAWB #</label>
                        </div>
                        <div className="col-md-2">
                          <label>{this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.MAWBNumber}</label>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Flight No</label>
                          </div>
                          <div className="col-md-2">
                            <label>{this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.flightNo}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Flight Date</label>
                          </div>
                          <div className="col-md-2">
                            <label>{this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.flightDate}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Port of Load</label>
                          </div>
                          <div className="col-md-2">
                            <label>{this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.portOfLoad}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Port of Exit</label>
                          </div>
                          <div className="col-md-2">
                            <label>{this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.exitPort}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Cargo Handler</label>
                          </div>
                          <div className="col-md-2">
                            <label>{`${this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.cargoHandlerName}[${this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.cargoHandlerCode}]`}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Broker</label>
                          </div>
                          <div className="col-md-2">
                            <label>{`${this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.brokerName}[${this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.brokerCode}]`}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Agent </label>
                          </div>
                          <div className="col-md-2">
                            <label>{`${this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.agentName}[${this.state.orderDetails.tranxData.ExportHAWB.shippingDetails.agentCode}]`}</label>
                          </div>
                        </div>
                      </div>
                      </div>}

                    </div>
                    {this.state.orderDetails.tranxData.ImportHAWBList > 0 && <hr />}
                  </div>
                  <div id="ExportDeclaration" className="tab-pane">
                    {this.state.orderDetails.tranxData.exportDeclaration == null && <div className="row">
                      <text className="col-md-12" style={{ textAlign: "center", color: "#3064f0c4", fontWeight: "bold", fontSize: "18px" }}>Export Declaration Not Found</text>
                    </div>}
                    {this.state.orderDetails.tranxData.exportDeclaration && this.state.orderDetails.tranxData.exportDeclaration.map(item => {
                      return <div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Declaration No</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.declarationNo}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Request ID</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.Id}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Version</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.version}</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Flight No</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.flightNo}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Batch Id</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.ackNo}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Status</label>
                            </div>

                            <div className="col-md-2">
                              <label>{(item.status == "-1" || item.status == "1") ? "HAWB CREATED" : this.getStatus(item.status)}</label>
                            </div>
                          </div>
                        </div>
                        {item.exception && item.exception.length > 0 && item.exception[0].exceptionCode !== "000" && <div className="alertbox">
                          <label className="errorcolr">Error</label>
                          <div className="errorbox">
                            {item.exception.map((elem, index) => {
                              if (elem.exceptionCode == "000") {
                                return
                              }

                              return (<p key={index}>{elem.exceptionDetails}<br /></p>)
                            })}
                          </div>
                        </div>}
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Region Type</label>
                            </div>
                            <div className="col-md-2">
                              <label>{lov('regimeType', item.regimeType)}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Declaration Type</label>
                            </div>
                            <div className="col-md-2">
                              <label>{lov('declarationType', item.declType)}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Export Code Mirsal 2</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.exporterMirsal2Code}</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Transport Mode</label>
                            </div>
                            <div className="col-md-2">
                              <label>{lov('transportMode', item.transportMode)}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">No of pages</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.noOfPages}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Payload</label>
                            </div>
                            <div className="col-md-2">
                              <a href="javascript:;" onClick={this.renderPayload.bind(this, item.SOAPPayload)}>view</a>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Table title="Invoice List"
                            className="bold"
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("invoices")}
                            gridData={_.get(this.state, 'orderDetails.tranxData.exportDeclaration[0].invoiceList', [])}
                            totalRecords={5}
                            pageChanged={() => {
                            }}
                            activePage={1}
                            pageSize={10}
                          />
                        </div>

                        {this.state.orderDetails.tranxData.exportDeclaration.length > 0 && <hr />}
                      </div>;
                    })}
                    <div className="linetext"><label className="bold">See line items in the order of declaration line
                      items</label></div>
                  </div>
                  <div id="ImportDeclaration" className="tab-pane">
                    {this.state.orderDetails.tranxData.importDecleration == null && <div className="row">
                      <text className="col-md-12" style={{ textAlign: "center", color: "#3064f0c4", fontWeight: "bold", fontSize: "18px" }}>Import Declaration Not Found</text>
                    </div>}
                    {this.state.orderDetails.tranxData.importDecleration && this.state.orderDetails.tranxData.importDecleration.map(item => {
                      return <div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Declaration No</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.declarationNo}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Request ID</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.Id}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Version</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.version}</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Flight No</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.flightNo}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Batch Id</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.ackNo}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Status</label>
                            </div>
                            <div className="col-md-2">
                              <label>{(item.status == "-1" || item.status == "1") ? "HAWB CREATED" : this.getStatus(item.status)}</label>
                            </div>

                          </div>
                        </div>
                        {item.exception && item.exception.length > 0 && item.exception[0].exceptionCode !== "000" && <div className="alertbox">
                          <label className="errorcolr">Error</label>
                          <div className="errorbox">
                            {item.exception.map((elem, index) => {
                              if (elem.exceptionCode == "000") {
                                return
                              }

                              return (<p key={index}>{elem.exceptionDetails}<br /></p>)
                            })}
                          </div>
                        </div>}
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Regime Type</label>
                            </div>
                            <div className="col-md-2">
                              <label>{lov('regimeType', item.regimeType)}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Declaration Type</label>
                            </div>
                            <div className="col-md-2">
                              <label>{lov('declarationType', item.declType)}</label>
                            </div>

                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bold">Transport Mode</label>
                            </div>
                            <div className="col-md-2">
                              <label>{lov('transportMode', item.transportMode)}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">No of pages</label>
                            </div>
                            <div className="col-md-2">
                              <label>{item.noOfPages}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="bold">Payload</label>
                            </div>
                            <div className="col-md-2">
                              <a href="javascript:;" onClick={this.renderPayload.bind(this, item.SOAPPayload)}>view</a>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Table title="Invoice List"
                            className="bold"
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("invoices")}
                            gridData={_.get(this.state, 'orderDetails.tranxData.importDecleration[0].invoiceList', [])}
                            totalRecords={5}
                            pageChanged={() => {
                            }}
                            activePage={1}
                            pageSize={10}
                          />
                        </div>

                        {this.state.orderDetails.tranxData.exportDeclaration.length > 0 && <hr />}
                      </div>;
                    })}
                    <div className="linetext"><label className="bold">See returned items tab for item level details</label></div>
                  </div>

                  <div id="Delivered" className="tab-pane">
                    <div className="row">
                      <div className="col-md-12">
                        <Table
                          pagination={false}
                          export={false}
                          search={false}
                          gridColumns={utils.getGridColumnByName("delivery")}
                          gridData={this.state.orderDetails.tranxData.lineItems.filter((item => {
                            return item.isDelivered;
                          })) || []}
                          totalRecords={5}
                          pageChanged={() => {
                          }}
                          activePage={1}
                          pageSize={10}
                        />
                      </div>
                    </div>
                  </div>
                  <div id="ReturnDetails" className="tab-pane">
                    <div className="row">
                      <div className="col-md-12">
                        <Table
                          componentFunction={this.ReturnProofHandler}
                          pagination={false}
                          export={false}
                          search={false}
                          gridColumns={utils.getGridColumnByName("returnDelivery")}
                          gridData={this.state.orderDetails.tranxData.returnItems || []}
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
    orderDetails: state.app.getOrderDetails.data.searchResult
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}

OrderDetailsContainer.displayName = "Order Details";
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsContainer);
