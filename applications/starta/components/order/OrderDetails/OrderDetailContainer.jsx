/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../../core/actions/generalAction";

import * as utils from "../../../../../core/common/utils.js";
import * as constants from "../../../../../core/constants/Communication";
import * as requestCreator from '../../../../../core/common/request.js';
import * as coreConstants from '../../../../../core/constants/Communication.js'

//Custom Components
import Select from "../../../common/Select.jsx";
import Div from "../../../common/Div.jsx";
import Row from "../../../common/Row.jsx";
import Col from "../../../common/Col.jsx";
import Label from "../../../common/Lable.jsx";
import Portlet from "../../../common/Portlet.jsx";
import ModalBox from '../../../../../core/common/ModalBox.jsx';
import Pagination from "react-js-pagination";

import Steps from '../../../../../core/common/Steps.jsx';
import Table from '../../../../../core/common/Datatable.jsx';
import * as gen from "../../../common/generalActionHandler";
import Combobox from "../../../common/Select.jsx";


class OrderDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      orderDetail: {},
    };
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.getStagePriorToPaymentOrder = this.getStagePriorToPaymentOrder.bind(this);
    this.nextStatus = this.nextStatus.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getOrderDetail, {
      "body": {
        "orderID": this.props.orderID,
        "customerID": "ETIHAD"
      }
    });
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderDetail) {
      this.setState({
        orderDetail: nextProps.orderDetail,
        isLoading: false
      })
    }

    // this.getItemName(nextProps.getItemCatalogue);
  }

  openModalBox(modelItem) {
    this.setState({
      modelBox: true,
      modelItem
    });


  }

  closeModalBox() {
    this.setState({ modelBox: false });
  }

  getOrderStatus() {
    let OrderReceived = "001", PurchaseOrder = "002", ComponentManufacturing = "003", PartIdentification = "004",
      PartInspection = "005", FinalInspectionAndIdentification = "006", PartTested = "007", Assembly = "008",
      PaintOrFinish = "009", Dispatched = "010", Received = "011", Inspected = "012", Accepted = "013",
      Rejected = "014", Reviewed = "015", Concession = "016", PaymentOrder = "018", Scrapped = "017", Paid = "019";
    let currentOrderStatus = this.state.orderDetail.status;
    // let currentOrderStatus = ComponentManufacturing;

    let orderStatus = [
      { label: "Order Received", status: false },
      { label: "Purchase Order", status: false },
      { label: "Component Manufacturing", status: false },
      { label: "Dispatch", status: false },
      { label: "Received", status: false },
      { label: "Inspected", status: false },
      { label: "Accepted/Rejected", status: false },
      { label: "Payment Order", status: false },
      { label: "Paid", status: false }
    ];

    if (currentOrderStatus === OrderReceived) {
      orderStatus[0].status = true;
    }
    else if (currentOrderStatus === PurchaseOrder) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
    }
    else if (currentOrderStatus === ComponentManufacturing) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].label = "Component Manufacturing";
      orderStatus[2].text = "20%";
    }
    else if (currentOrderStatus === PartIdentification) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].label = "Part Identification";
      orderStatus[2].text = "40%";
    }
    else if (currentOrderStatus === PartInspection) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].label = "Part Inspection";
      orderStatus[2].text = "60%";
    }
    else if (currentOrderStatus === FinalInspectionAndIdentification) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].label = "Final Inspection";
      orderStatus[2].text = "80%";
    }
    else if (currentOrderStatus === PartTested) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].label = "Part Tested";
      orderStatus[2].text = "85%";
    }
    else if (currentOrderStatus === Assembly) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].label = "Assembly";
      orderStatus[2].text = "95%";
    }
    else if (currentOrderStatus === PaintOrFinish) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
    }
    else if (currentOrderStatus === Dispatched) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
    }
    else if (currentOrderStatus === Received) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
    }
    else if (currentOrderStatus === Inspected) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
    }
    else if (currentOrderStatus === Accepted) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = "Accepted";
    }
    else if (currentOrderStatus === Rejected) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = "Rejected";
    }
    else if (currentOrderStatus === Reviewed) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = "Reviewed";
    }
    else if (currentOrderStatus === Concession) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = "Concession";
    }
    else if (currentOrderStatus === Scrapped) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = "Scrapped";
    }
    else if (currentOrderStatus === PaymentOrder) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = this.getStagePriorToPaymentOrder() == Accepted ? "Accepted" : "Concession";
      orderStatus[7].status = true;
      orderStatus[7].label = "Payment Order";
    }
    else if (currentOrderStatus === Paid) {
      orderStatus[0].status = true;
      orderStatus[1].status = true;
      orderStatus[2].status = true;
      orderStatus[3].status = true;
      orderStatus[4].status = true;
      orderStatus[5].status = true;
      orderStatus[6].status = true;
      orderStatus[6].label = this.getStagePriorToPaymentOrder() == Accepted ? "Accepted" : "Concession";
      orderStatus[7].status = true;
      orderStatus[8].status = true;
    }
    return orderStatus;
  }

  getStagePriorToPaymentOrder() {
    let activities = _.clone(this.state.orderDetail.activities);
    activities.forEach(element => {
      if (element.toStage === "018") {
        return element.fromStage;
      }
    });
  }

  errorHandler(event) {
    event.target.src = "http://localhost:9086/images/1f31e930-e0d5-11e7-88e2-f718f78167e9.png"
  }

  nextStatus() {
    let status = this.state.orderDetail.status;
    if (status === "001" && (sessionStorage.orgType === "CUSTOMER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Purchase Order",
          status: "002"
        }
      ]
    }
    else if (status === "002" && (sessionStorage.orgType === "SUPPLIER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 2,
          label: "Component Manufacture",
          status: "003"
        }
      ]
    }
    else if (status === "003" && (sessionStorage.orgType === "SUPPLIER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Part Identification",
          status: "004"
        }
      ]
    }
    else if (status === "004" && (sessionStorage.orgType === "SUPPLIER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Part Inspection",
          status: "005"
        }
      ]
    }
    else if (status === "005" && (sessionStorage.orgType === "SUPPLIER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Final Inspection and Indentification",
          status: "006"
        }
      ]
    }
    else if ((status === "006" || status === "007" || status === "008" || status === "009") && (sessionStorage.orgType === "SUPPLIER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 2,
          label: "Manufacturing Sub-Status",
          status: "007"
        },
        {
          type: 1,
          label: "Dispatch",
          status: "010"
        }
      ]
    }

    else if (status === "010") {
      return [
        {
          type: 3,
          label: "Received",
          status: "011"
        }
      ]
    }
    else if (status === "011" && (sessionStorage.orgType === "CUSTOMER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Inspected",
          status: "012"
        }
      ]
    }
    else if (status === "012" && (sessionStorage.orgType === "CUSTOMER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Accepted",
          status: "013"
        },
        {
          type: 1,
          label: "Rejected",
          status: "014"
        }
      ]
    }
    else if (status === "014" && (sessionStorage.orgType === "CUSTOMER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Reviewed",
          status: "015"
        }
      ]
    }
    else if (status === "015" && (sessionStorage.orgType === "CUSTOMER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Concession",
          status: "016"
        },
        {
          type: 1,
          label: "Scrapped",
          status: "017"
        }
      ]
    }
    else if (status === "018" && (sessionStorage.orgType === "SUPPLIER" || sessionStorage.orgType === "PM")) {
      return [
        {
          type: 1,
          label: "Paid",
          status: "019"
        }
      ]
    }
    else return []
  }

  statusButtonHandler(element) {
    switch(element.type) {
      case 1:
        //send status update request
      case 2:
        //component manufacture substatus
      case 3:
        //receipt popup
      default:
        break;
    }
  }

  render() {

    let nextStatus = this.nextStatus();

    if (!this.state.isLoading)
      return (
        <div>
          <ModalBox isOpen={this.state.modelBox}>
            <div class="modal fade in ordertrack" role="basic" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="imgicon"><img src="/assets/Resources/OptimizationBox.png" /></div>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 className="modal-title text-center">Order ID # ORD66667</h4>
                  </div>
                  <div className="modal-body">

                    <div className="timeline  white-bg ">
                      {/* <!-- TIMELINE ITEM --> */}
                      <div className="timeline-item">
                        <div className="timeline-badge green">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/purchase.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Purchase Order</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>


                          </div>
                        </div>
                      </div>
                      {/* <!-- END TIMELINE ITEM -->
                        <!-- TIMELINE ITEM --> */}

                      <div className="timeline-item">
                        <div className="timeline-badge blue ">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/manufacturing.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Component Manufacture</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>

                          </div>
                        </div>
                      </div>


                      <div className="timeline-item">
                        <div className="timeline-badge">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/analytics.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Part Identification</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>


                          </div>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-badge">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/description.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Part Description</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>


                          </div>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-badge">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/code.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Final Inspection & Identification</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>

                          </div>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-badge">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/order.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Part Test</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>


                          </div>
                        </div>
                      </div>


                      <div className="timeline-item">
                        <div className="timeline-badge">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/tracking.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Dispatched</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>

                          </div>
                        </div>
                      </div>

                      <div className="timeline-item">
                        <div className="timeline-badge">
                          <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                          <div className="timeline-body-arrow"><img src="/assets/Resources/delivery.png" /></div>
                          <div className="timeline-body-head">
                            <div className="timeline-body-head-caption">
                              <a href="javascript:;">Received</a>
                            </div>
                          </div>
                          <div className="timeline-body-content">
                            <span className="trckdate">22/04/2019</span>
                            <span className="trcktime">22/04/2019</span>

                            <div className="remark">
                              <span className="font-grey-cascade">Remarks <i className="fa fa-minus-circle"
                                aria-hidden="true"></i></span>
                            </div>

                          </div>
                        </div>
                      </div>
                      {/* <!-- END TIMELINE ITEM -->
                        <!-- TIMELINE ITEM WITH GOOGLE MAP --> */}


                    </div>


                  </div>
                  {/* <!-- <div className="modal-footer">
                        <button type="button" className="btn dark btn-outline" data-dismiss="modal">Close</button>
                        <button type="button" className="btn green">Save changes</button>
                    </div> --> */}
                </div>
                {/* <!-- /.modal-content --> */}
              </div>
            </div>
          </ModalBox>
          <div className="col-md-12">
            <div className="portlet light" style={{ minHeight: "854px" }}>


              <div className="row">
                <div className="col-md-12">

                  <div className="timelineview">
                    <a href="#" onClick={this.openModalBox} className="btn stratabtnstyle">Time Line View </a>
                  </div>

                  <div className="form-wizard stratawizard">
                    {<Steps statusList={this.getOrderStatus()} />}
                  </div>

                  <div className="shadowBox Courierbox">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-2">
                          <label className="bold">Etihad Airlines:</label>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-4 text-center">
                          <img src="/assets/Resources/etihadlogo.png" onError={this.errorHandler} width="100%" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-12">
                          <label className="hashno">{this.state.orderDetail.orderID}</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <Row>
                      <Col col="6">
                          <Label columns="6" text="Order Raised By:"></Label>
                          <Col col="6" className="orderperson">
                            <img src="/assets/Resources/person.jpg" width="25px" onError={this.errorHandler} />
                            <span>{this.state.orderDetail.raisedBy}</span>
                          </Col>
                        </Col>
                        
                        <Col col="6">
                          <Label columns="6" text="Amount:"></Label>
                          <Col col="6">
                            <span>AED {utils.formatAmountField(this.state.orderDetail.orderAmount || 0)}</span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                      <Col col="6">
                          <Label columns="6" text="Quotation Date:"></Label>
                          <Col col="6">
                            <span>{this.state.orderDetail.orderDate}</span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="6" text="Recived Date:"></Label>
                          <Col col="6">
                            <span>{this.state.orderDetail.receivedDate}</span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="6" text="Invoice Ref No:"></Label>
                          <Col col="6">
                            <span>{_.get(this.state.orderDetail, "invoice.invoiceRefNo", "")}</span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="6" text="Invoice Date:"></Label>
                          <Col col="6">
                            <span>{_.get(this.state.orderDetail, "invoice.invoiceDate", "")}</span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="6" text="Amount:"></Label>
                          <Col col="6">
                            <span>AED {utils.formatAmountField(_.get(this.state.orderDetail, "invoice.amount", 0))}</span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="6" text="Credit Note Ref No:"></Label>
                          <Col col="6">
                            <span>{_.get(this.state.orderDetail, "creditNotes.creditNoteRefNo", "")}</span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="6" text="Credit Note Date:"></Label>
                          <Col col="6">
                            <span>{_.get(this.state.orderDetail, "creditNotes.creditNoteDate", "")}</span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="6" text="Credit Note Amount:"></Label>
                          <Col col="6">
                            <span>AED {utils.formatAmountField(_.get(this.state.orderDetail, "creditNotes.creditNoteAmount", 0))}</span>
                          </Col>
                        </Col>
                      </Row>

                    </div>
                  </div>
                </div>
              </div>

              <div className="portlet light bordered sdg_portlet ProCardssection">
                <div className="portlet-title">
                  <div className="tools">
                    <a href="javascript:;" className="collapse" data-original-title="true" title="" />
                  </div>
                  <div className="caption"><span className="caption-subject">Line Items </span></div>
                  <div className="actions" />
                </div>
                <div className="portlet-body">
                  <div className="row">
                    <div className="col-md-12">
                      <Table
                        gridColumns={utils.getGridColumnByName('LineItems')}
                        gridData={this.state.orderDetail.items || []}
                        pagination={false}
                        export={false}
                        search={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {this.state.orderDetail.subOrder &&
                <div className="portlet light bordered sdg_portlet ProCardssection">
                  <div className="portlet-title">
                    <div className="tools">
                      <a href="javascript:;" className="collapse" data-original-title="true" title="" />
                    </div>
                    <div className="caption"><span className="caption-subject">Sub Order</span></div>
                    <div className="actions" />
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-12">
                        <table id="fieldTable" className="table table-bordered table-striped table-responsive ordertable">
                          <thead>
                            <tr>
                              <th>Item Description</th>
                              <th>Item code</th>
                              <th>Qty</th>
                              <th>Recived Qty</th>
                              <th>Amount</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody className="ui-sortable">
                            <tr>
                              <td>ApplicationDate.Date</td>
                              <td>Date</td>
                              <td>XYZ</td>
                              <td>Date</td>
                              <td>XYZ</td>
                              <td>None</td>
                            </tr>
                            <tr>
                              <td>ApplicationDate.Date</td>
                              <td>Date</td>
                              <td>XYZ</td>
                              <td>Date</td>
                              <td>XYZ</td>
                              <td>None</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* {nextStatus.length == 1 && nextStatus[0].status !== "011" && <div className="timelineview">
                <a href="#" onClick={this.sendStatusUpdateRequest} className="btn stratabtnstyle">{nextStatus[0].label}</a>
              </div>} */}
              <div className="timelineview">
                {nextStatus.map(element => {
                  return <a href="#" onClick={() => {this.statusButtonHandler(element)}} className="btn stratabtnstyle">{element.label}</a>
                })}
              </div>
            </div>
          </div>
        </div>
      );
    else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    typeData: state.app.typeData.data,
    orderDetail: _.get(state.app, 'orderDetail.order', undefined),
    orderID: ownProps.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

OrderDetailContainer.displayName = "__HIDE";
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailContainer);
