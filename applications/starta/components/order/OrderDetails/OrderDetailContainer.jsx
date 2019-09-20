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
import OptionalStatus from "./OptionalStatus.jsx"
import Receipt from "./Receipt.jsx"
import Timeline from "./Timeline.jsx"
import Steps from '../../../../../core/common/Steps.jsx';
import Table from '../../../../../core/common/Datatable.jsx';
import * as gen from "../../../common/generalActionHandler";
import Combobox from "../../../common/Select.jsx";

import { baseUrl } from '../../../../../core/constants/Communication.js';


class OrderDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      receiptModalBoxGrid: false,
      optionalStatusValue: "",
      receiptModalBox: false,
      optionalStatusModalBox: false,
      timelineViewModalBox: false,
      isLoading: true,
      orderDetail: {
        receivedDate: undefined
      },
    };
    this.openTimelineViewModalBox = this.openTimelineViewModalBox.bind(this);
    this.closeTimelineViewModalBox = this.closeTimelineViewModalBox.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getOrderDetail, {
      "body": {
        "orderID": this.props.orderID,
        "customerID": this.props.customerID
      }
    });
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderDetail) {

      this.setState({
        orderDetail: nextProps.orderDetail,
        isLoading: false
      });
      // this.getReceiveDate(nextProps.orderDetail.activities);
    }


  }

  openTimelineViewModalBox(modelItem) {
    this.setState({
      timelineViewModalBox: true,
      modelItem
    });


  }
  openReceiptModal = () => {
    this.setState({
      receiptModalBoxGrid: true,
    });
  }
  closeReceiptModal =()=>{
    this.setState({
      receiptModalBoxGrid: false,
    });
    
  }

  closeTimelineViewModalBox() {
    this.setState({ timelineViewModalBox: false });
  }

  errorHandler(event) {
    event.target.src = "http://localhost:9086/images/1f31e930-e0d5-11e7-88e2-f718f78167e9.png"
  }

  statusButtonHandler(element) {

    switch (element.type) {
      case 1:
        //send status update request
        if (element.processor === 'SUPPLIER') {
          this.props.actions.generalProcess(constants.updateOrderStatus, {
            "body": {
              "orderID": this.props.orderID,
              "customerID": this.props.customerID,
              "status": element.status
            }
          });
        } else {
          this.props.actions.generalProcess(constants.updateOrderStatusCustomer, {
            "body": {
              "orderID": this.props.orderID,
              "status": element.status
            }
          });
        }
        break;
      case 2:
        //component manufacture substatus
        this.optionalStatusModalBoxChangeState();
        break;
      case 3:
        //receipt popup
        this.receiptModalBoxChangeState();
        break;
      default:
        break;
    }
  }



  timeLineViewModalBoxItem = () => {
    return (
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
    )
>>>>>>> Stashed changes
  }

  receiptModalBoxChangeState = () => {
    this.setState({
      receiptModalBox: !(this.state.receiptModalBox)
    })
  }

  optionalStatusModalBoxChangeState = () => {
    this.setState({
      optionalStatusModalBox: !(this.state.optionalStatusModalBox)
    })
  }

  optionalStatusUpdateValue = (val) => {
    this.setState({
      optionalStatusValue: val
    })
  }

  getItems = () => {
    let items = []
    for (let i = 0; i < this.state.orderDetail.items.length; i++) {
      if ((this.state.orderDetail.items[i].quantity - this.state.orderDetail.items[i].receivedQuantity) > 0) {
        items.push(this.state.orderDetail.items[i])
      }
    }
    console.log(items, "getItems()")
    return items
  }

  getOptionalOptions = () => {
    const constants = [
      { label: "Part Tested", value: "007" },
      { label: "Assembly", value: "008" },
      { label: "Paint Or Finish", value: "009" }
    ]

    const activities = _.get(this.state.orderDetail, "activities", [])
    for (let j = 0; j < activities.length; j++) {
      const element = activities[j]
      for (let i = 0; i < constants.length; i++) {
        if (constants[i].value === element.toStage) {
          constants.splice(i, 1)
        }
      }
      if ((constants.length === 0)) {
        break;
      }
    }

    return constants
  }

  optionalStatusHandleSubmit = (e) => {
    e.preventDefault();

    this.props.actions.generalProcess(constants.updateOrderStatus, {
      "body": {
        "orderID": this.props.orderID, // Why Props
        "customerID": this.props.customerID, // Why Props
        "status": this.state.optionalStatusValue
      }
    });
    // Close the pop up
    this.optionalStatusModalBoxChangeState();
  }

  timeLineViewModalBoxItem = ()=> {
    return (
      <Timeline 
        closePortlet = { this.timeLineViewModalBoxChangeState }
      />
    )
  }
  // getReceiveDate = (activities) => {
  //   console.log(activities,"activities")
  //   let receivedDate = undefined;
  //   for (let i in activities) {

  //     if (activities[i].toStage === "002") {
  //       receivedDate = activities[i].date
  //       console.log(activities[i].date,"activities[i].date")
  //     }
  //   }

  //   console.log(this.state.orderDetail,"this.state.orderDetail")
  //   this.state.orderDetail.receivedDate = receivedDate

  // }
  receiptModalBoxItem = () => {
    return (
      <Receipt
        closePortlet={this.receiptModalBoxChangeState}
        items={this.getItems()}
        orderID={this.props.orderID}
        customerID={this.props.customerID}
      />
    )
  }

  optionalStatusModalBoxItem = () => {
    return (
      <div>
        <OptionalStatus
          value={this.state.optionalStatusValue}
          handleSubmit={this.optionalStatusHandleSubmit}
          onUpdate={this.optionalStatusUpdateValue}
          closePortlet={this.optionalStatusModalBoxChangeState}
          options={this.getOptionalOptions()}
        />
      </div>
    )
  }
  render() {
    
    console.log('orderDetail :  ', this.state.orderDetail.items)

    if (!this.state.isLoading)
      return (
        <div>
          <div id="Modal Boxes">
            <ModalBox isOpen={this.state.timelineViewModalBox}>
              {this.timeLineViewModalBoxItem()}
            </ModalBox>

            <ModalBox isOpen={this.state.optionalStatusModalBox}>
              {this.optionalStatusModalBoxItem()}
            </ModalBox>

            <ModalBox isOpen={this.state.receiptModalBox}>
              {this.receiptModalBoxItem()}
            </ModalBox>
            <ModalBox isOpen={this.state.receiptModalBoxGrid}>
                        <Portlet title={utils.getLabelByID("Order Reciepts")} isPermissioned={true}>
                            <div className="row" >
                                <div className="col-md-12">

                                    <div className="row">
                                        <div className="col-md-12">
                                            <Table gridColumns={utils.getGridColumnByName("LineItems")}
                                             gridData={this.state.orderDetail.items || []}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closeReceiptModal} >{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBox>
          </div>

          <div className="col-md-12">
            <div className="portlet light" style={{ minHeight: "854px" }}>


              <div className="row">
                <div className="col-md-12">

                  <div className="form-wizard stratawizard">
                    {<Steps hideNumber={true} statusList={this.state.orderDetail.statusList} />}
                  </div>

                  <br />

                  <div className="shadowBox Courierbox">
                    <div className="form-group">
                      <Row>
                        <Col col="6">
                          <Label columns="12" style={{ fontSize: 22 }} text={this.state.orderDetail.entityName}></Label>
                        </Col>
                        <Col col="6">
                          <img src={this.state.orderDetail.entityLogo} style={{ width: 50 }} onError={this.errorHandler} />
                        </Col>
                      </Row>
                    </div>

                    <div className="form-group">
                      <Row>
                        <Col col="12">
                          <Label columns="12" className="hashno" text={this.state.orderDetail.orderID}></Label>
                        </Col>
                      </Row>
                    </div>

                    <div className="form-group">
                      <Row>
                        <Col col="6">
                          <Label columns="6" text="Order Raised By:"></Label>
                          <Col col="6" className="orderperson">
                            <img src={this.state.orderDetail.raisedByPic} width="25" style={{ marginRight: 5 }} onError={this.errorHandler} />
                            <span>{this.state.orderDetail.raisedByName}</span>
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
                          <Label columns="6" text="Received Date:"></Label>
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
                            <span>{_.get(this.state.orderDetail, "invoice.invoiceDate")}</span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="6" text="Invoice Amount:"></Label>
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
                            <span>{_.get(this.state.orderDetail, "creditNotes.creditNoteDate")}</span>
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
                  <div className="caption"><span className="caption-subject">Line Items</span></div>
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

              {/* Sub-Order Details */}
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
                        {
                          this.state.orderDetail.subOrder.map((obj) => {

                            obj.action = [
                              {
                                "label": "View",
                                "URI": ["/strata/subOrder"],
                                "params": "_id",
                                "iconName": "icon-docs"
                              }
                            ]
                          })
                        }
                        <Table
                          gridColumns={utils.getGridColumnByName('suborder')}
                          gridData={this.state.orderDetail.subOrder || []}
                          pagination={false}
                          export={false}
                          search={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>}

              {/* Buttons */}
              <div className="timelineview">
                {this.state.orderDetail.actionButtons.map(element => {
                  return <a onClick={() => { this.statusButtonHandler(element) }} className="btn stratabtnstyle" style={{ marginLeft: 10 }}>{element.label}</a>
                })}

                <a onClick={this.timeLineViewModalBoxChangeState} className="btn stratabtnstyle" style={{marginLeft: 10}}>Timeline View</a>

                <a onClick={this.openTimelineViewModalBox} className="btn stratabtnstyle" style={{ marginLeft: 10 }}>Timeline View</a>
                <a onClick={this.openReceiptModal} className="btn stratabtnstyle" style={{ marginLeft: 10 }}>View Receipts</a>

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
    orderID: ownProps.params.id,
    customerID: ownProps.params.customerId
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
