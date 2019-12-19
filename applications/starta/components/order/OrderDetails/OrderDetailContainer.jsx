/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as actions from "../../../../../core/actions/generalAction";
import * as toaster from "../../../../../core/common/toaster.js";
import * as utils from "../../../../../core/common/utils.js";
import * as constants from "../../../../../core/constants/Communication";
import * as requestCreator from "../../../../../core/common/request.js";
import * as coreConstants from "../../../../../core/constants/Communication.js";

//Custom Components
import Select from "../../../common/Select.jsx";
import Div from "../../../common/Div.jsx";
import Row from "../../../common/Row.jsx";
import Col from "../../../common/Col.jsx";
import Label from "../../../common/Lable.jsx";
import Portlet from "../../../common/Portlet.jsx";
import ModalBox from "../../../../../core/common/ModalBox.jsx";
import Pagination from "react-js-pagination";
import OptionalStatus from "./OptionalStatus.jsx";
import Receipt from "./Receipt.jsx";
import Timeline from "./Timeline.jsx";
import Steps from "../../../../../core/common/Steps.jsx";
import Table from "../../../../../core/common/Datatable.jsx";
import * as gen from "../../../common/generalActionHandler";
import Combobox from "../../../common/Select.jsx";

import { baseUrl } from "../../../../../core/constants/Communication.js";
import QRCodeJquery from "./../../../common/QRCodeJquery.jsx";

class OrderDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      processor: "",
      receiptModalBoxGrid: false,
      optionalStatusValue: "",
      receiptModalBox: false,
      optionalStatusModalBox: false,
      timelineViewModalBox: false,
      isLoading: true,
      orderDetail: {
        receivedDate: undefined
      }
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getOrderDetail, {
      body: {
        orderID: this.props.orderID,
        customerID: this.props.customerID
      }
    });
    this.props.actions.generalProcess(
      constants.getTypeData,
      requestCreator.createTypeDataRequest(["SubOrder_Status"])
    );
    window.scrollTo(0, 0);
  }

  generateQRCode(BlockChainAddress) {
    let qrString = "/hyperledger/hashSearch/" + BlockChainAddress;
    return (
      <div>
        <QRCodeJquery size="155" errorCorrectionLevel="H" qrString={qrString} />
        <span>
          <a href={qrString} target="_app">
            View
          </a>
        </span>
        <span style={{ fontSize: 5, width: "116px" }} />
      </div>
    );
  }

  getStatusLabel = status => {
    let suborderStatus = this.props.typeData
      ? this.props.typeData.SubOrder_Status
      : [];
    for (let i in suborderStatus) {
      if (suborderStatus[i].value == status) {
        return suborderStatus[i].label;
      }
    }
  };
  formatData = gridData => {
    for (let i in gridData) {
      let status = gridData[i].status;
      if (status) {
        gridData[i].status = this.getStatusLabel(status);
      }
    }
    return gridData;
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.orderDetail && nextProps.orderDetail.subOrder && nextProps.typeData) {
      this.setState({
        subOrder: this.formatData(nextProps.orderDetail.subOrder)
      });
    }
    if (
      nextProps.orderDetail &&
      nextProps.typeData && nextProps.orderID && nextProps.customerID
    ) {
      let recList = [];

      let orderDetail = nextProps.orderDetail;
      // orderDetail.receivedDate = moment(orderDetail.receivedDate, "DD/MM/YYYY").toDate();

      orderDetail.items &&
        orderDetail.items.forEach(elem => {
          elem.itemReceipts &&
            elem.itemReceipts.forEach(recItm => {
              let newdate = new Date(recItm.receiptDate);

              let item = {
                itemCode: elem.itemCode,
                receiptNo: recItm.receiptNo,
                receiptDate:recItm.receiptDate,
                receiptQuantity: recItm.quantity,
                item: elem.name
              };
              console.log(item, "item");
              recList.push(item);
            });
        });
      console.log(recList, "recList");
      this.setState({
        orderDetail: {
          ...orderDetail,
          transactionID:
            "92217a5a5cfa4e704df5e6cf464ea7c4da3030d75b2a07e1def291f9b90c5fe9"
        },
        isLoading: false,
        receipt: recList,
        typeData: nextProps.typeData,
        orderID: nextProps.orderID,
        customerID: nextProps.customerID
      });
    }
  }

  timeLineViewModalBoxChangeState = () => {
    this.setState({
      timelineViewModalBox: !this.state.timelineViewModalBox
    });
  };

  openReceiptModal = () => {
    this.setState({
      receiptModalBoxGrid: true
    });
  };
  closeReceiptModal = () => {
    this.setState({
      receiptModalBoxGrid: false
    });
  };
  errorHandler(event) {
    event.target.src =
      "http://localhost:9086/images/1f31e930-e0d5-11e7-88e2-f718f78167e9.png";
  }
  redirectToList = () => {
    browserHistory.push(`/strata/viewOrder/${this.props.orderID}/${this.props.customerID}`);
    toaster.showToast("Status updated successfully!");
  };
  statusButtonHandler(element) {

    console.log("element.type ",element.type)
    switch (element.type) {
      case 1:
        //send status update request
        if (element.processor === "SUPPLIER") {
          this.props.actions.generalProcess(constants.updateOrderStatus, {
            body: {
              orderID: this.props.orderID,
              customerID: this.props.customerID,
              status: element.status
            }
          });
          //General process wait load state
          this.setState({
            isLoading: true
          });
          
        } else {
          this.props.actions.generalProcess(
            constants.updateOrderStatusCustomer,
            {
              body: {
                orderID: this.props.orderID,
                status: element.status
              }
            }
          );
          //General process wait load state
          this.setState({
            isLoading: true
          });
         
        }
        break;
      case 2: {
        //component manufacture substatus
        this.optionalStatusModalBoxChangeState();
        // this.redirectToList();
        break;
      }
      case 3: {
        console.log(element.processor, " Processor");
        //receipt popup
        this.setState({
          processor: element.processor
        });
        this.receiptModalBoxChangeState();
        // this.redirectToList();
        break;
      }
      default:
        break;
    }
  }

  receiptModalBoxChangeState = () => {
    this.setState({
      receiptModalBox: !this.state.receiptModalBox
    });
  };

  optionalStatusModalBoxChangeState = () => {
    this.setState({
      optionalStatusModalBox: !this.state.optionalStatusModalBox
    });
  };

  optionalStatusUpdateValue = val => {
    this.setState({
      optionalStatusValue: val
    });
  };

  getItems = () => {
    let items = [];
    if (
      this.state.orderDetail &&
      this.state.orderDetail.items &&
      this.state.orderDetail.items.length > 0
    ) {
      for (let i = 0; i < this.state.orderDetail.items.length; i++) {
        if (
          this.state.orderDetail.items[i].quantity -
          this.state.orderDetail.items[i].receivedQuantity >
          0
        ) {
          items.push({
            ...this.state.orderDetail.items[i]
          });
        }
      }
    }
    console.log(items, "getItems()");
    return items;
  };

  getOptionalOptions = () => {
    const constants = [
      { label: "Part Tested", value: "007" },
      { label: "Assembly", value: "008" },
      { label: "Paint Or Finish", value: "009" }
    ];

    const activities = _.get(this.state.orderDetail, "activities", []);
    for (let j = 0; j < activities.length; j++) {
      const element = activities[j];
      for (let i = 0; i < constants.length; i++) {
        if (constants[i].value === element.toStage) {
          constants.splice(i, 1);
        }
      }
      if (constants.length === 0) {
        break;
      }
    }

    return constants;
  };

  optionalStatusHandleSubmit = e => {
    e.preventDefault();
    console.log(
      this.state.optionalStatusValue,
      "valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    if (this.state.optionalStatusValue === "") {
      toaster.showToast("Status must be selected to update","ERROR");
      return;
    }
    this.props.actions.generalProcess(constants.updateOrderStatus, {
      body: {
        orderID: this.state.orderID, // Why Props
        customerID: this.state.customerID, // Why Props
        status: this.state.optionalStatusValue
      }
    });
    // Close the pop up
    this.optionalStatusModalBoxChangeState();
    //General process wait load state
    this.setState({
      isLoading: true
    });
    window.scrollTo(0, 0);
  };

  timeLineViewModalBoxItem = () => {
    let activities = [
      {
        stage: "001",
        date: "",
        actionBy: ""
      }
    ];
    this.state.orderDetail.activities.forEach(activity => {
      if (activity.toStage == "018") {
        activities.push({
          stage: "013",
          date: activity.date,
          actionBy: activity.actionBy
        });
      }
      activities.push({
        stage: activity.toStage,
        date: activity.date,
        actionBy: activity.actionBy
      });
    });
    return (
      <Timeline
        activities={activities}
        orderID={this.props.orderID}
        closePortlet={this.timeLineViewModalBoxChangeState}
      />
    );
  };

  receiptModalBoxItem = () => {
    console.log(this.state.processor, " :processor2");
    return (
      <Receipt
        processor={this.state.processor}
        parent={this}
        closePortlet={this.receiptModalBoxChangeState}
        items={this.getItems()}
        orderID={this.props.orderID}
        customerID={this.props.customerID}
      />
    );
  };

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
    );
  };
  render() {
    if (this.state.isLoading) {
      return <div className="loader">{utils.getLabelByID("Loading")}</div>;
    } else if (!this.state.isLoading && this.state.orderDetail && this.state.typeData)
      return (
        <div className="row">
          <div id="Modal Boxes">
            <div className={"timeline-popup-order"}>
              {this.state.timelineViewModalBox &&
                this.timeLineViewModalBoxItem()}
            </div>

            <ModalBox isOpen={this.state.optionalStatusModalBox}>
              {this.optionalStatusModalBoxItem()}
            </ModalBox>

            <ModalBox isOpen={this.state.receiptModalBox}>
              {this.receiptModalBoxItem()}
            </ModalBox>
            <ModalBox isOpen={this.state.receiptModalBoxGrid}>
              <Portlet
                title={utils.getLabelByID("Order Receipts")}
                isPermissioned={true}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <Table
                          gridColumns={utils.getGridColumnByName(
                            "orderReciepts"
                          )}
                          gridData={
                            this.state.receipt ? this.state.receipt : []
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-actions right">
                    <div className="form-group col-md-12">
                      <div className="btn-toolbar pull-right">
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={this.closeReceiptModal}
                        >
                          {utils.getLabelByID("Close")}
                        </button>
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
                    {
                      <Steps
                        hideNumber={false}
                        statusList={_.get(this.state.orderDetail,"statusList",[])}
                      />
                    }
                  </div>

                  <br />

                  <div className="shadowBox Courierbox">
                    <div className="form-group" style={{ marginBottom: "0px" }}>
                      <Row>
                        <Col col="4">
                          <Label
                            columns="4"
                            style={{ fontSize: 22, marginTop: "10px" }}
                            text={this.state.orderDetail.entityName}
                          ></Label>

                          <Label
                            columns="8" style={{ marginTop: "18px" }}
                            text={this.state.orderDetail.orderID}
                          ></Label>
                        </Col>


                        <Col
                          col="8"
                          className="pull-right"
                          style={{ marginRight: "-28%" }}
                        >
                          <Col col="4">
                            <img
                              className="img-thumbnail img-rounded"
                              src={baseUrl + this.state.orderDetail.entityLogo}
                              style={{ width: "120px" }}
                              onError={this.errorHandler}
                            />
                          </Col>
                          <Col col="4">
                            {this.state.orderDetail.transactionID &&
                              this.generateQRCode(
                                this.state.orderDetail.transactionID
                              )}
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="12">
                          {this.state.orderDetail.transactionID ? (
                            <Label
                              columns="12"
                              className="hashno"
                              text={this.state.orderDetail.transactionID}
                              style={{ marginTop: "-8%" }}
                            ></Label>
                          ) : (
                              <Label
                                columns="12"
                                className="hashno"
                                text={this.state.orderDetail.orderID}
                                style={{ marginTop: "-8%" }}
                              ></Label>
                            )}
                        </Col>
                      </Row>
                    </div>

                    <div className="form-group" style={{ marginTop: "0px" }}>
                      <Row>
                        <Col col="6">
                          <Label columns="3" text="Order Raised By:"></Label>
                          <Col col="9" className="orderperson">
                            <img
                              src={baseUrl + this.state.orderDetail.raisedByPic}
                              width="25"
                              style={{
                                marginRight: 5,
                                borderRadius: "50% !important"
                              }}
                              onError={this.errorHandler}
                            />
                            <span>{this.state.orderDetail.raisedByName}</span>
                          </Col>
                        </Col>

                        <Col col="6">
                          <Label columns="3" text="Amount:"></Label>
                          <Col col="9">
                            <span>
                              AED{" "}
                              {utils.formatAmountField(
                                this.state.orderDetail.orderAmount || 0
                              )}
                            </span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="3" text="Quotation Date:"></Label>
                          <Col col="9">
                            <span>
                              {this.state.orderDetail.orderDate &&
                                utils.UNIXConvertToDate(moment(this.state.orderDetail.orderDate * 1000, "DD/MM/YYYY").toDate())}
                            </span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="3" text="Received Date:"></Label>
                          <Col col="9">
                            <span>
                              {this.state.orderDetail.receivedDate &&
                                this.state.orderDetail.receivedDate.split(
                                  " "
                                )[0]}
                            </span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="3" text="Invoice Ref No:"></Label>
                          <Col col="9">
                            <span>
                              {_.get(
                                this.state.orderDetail,
                                "invoice.invoiceRefNo",
                                ""
                              )}
                            </span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="3" text="Invoice Date:"></Label>
                          <Col col="9">
                            <span>
                              {_.get(
                                this.state.orderDetail,
                                "invoice.invoiceDate"
                              ) &&
                                _.get(
                                  this.state.orderDetail,
                                  "invoice.invoiceDate"
                                ).split(" ")[0]}
                            </span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="3" text="Invoice Amount:"></Label>
                          <Col col="9">
                            <span>
                              AED{" "}
                              {utils.formatAmountField(
                                _.get(
                                  this.state.orderDetail,
                                  "invoice.amount",
                                  0
                                )
                              )}
                            </span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="3" text="Credit Note Ref No:"></Label>
                          <Col col="9">
                            <span>
                              {_.get(
                                this.state.orderDetail,
                                "creditNotes.creditNoteRefNo",
                                ""
                              )}
                            </span>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col col="6">
                          <Label columns="3" text="Credit Note Date:"></Label>
                          <Col col="9">
                            <span>

                            {_.get(
                                this.state.orderDetail,
                                "creditNotes.creditNoteRefNo".split(" ")[0],
                                ""
                              )}
                            </span>
                          </Col>
                        </Col>
                        <Col col="6">
                          <Label columns="4" text="Credit Note Amount:"></Label>
                          <Col col="5">
                            <span style={{ marginLeft: "-53px" }}>
                              AED{" "}
                              {utils.formatAmountField(
                                _.get(
                                  this.state.orderDetail,
                                  "creditNotes.creditNoteAmount",
                                  0
                                )
                              )}
                            </span>
                          </Col>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>

              <div className="portlet light bordered sdg_portlet ">
                <div className="portlet-title">
                  <div className="tools">
                    <a
                      href="javascript:;"
                      className="collapse"
                      data-original-title="true"
                      title=""
                    />
                  </div>
                  <div className="caption">
                    <span className="caption-subject">Line Items</span>
                  </div>
                  <div className="actions" />
                </div>
                <div className="portlet-body">
                  <div className="row">
                    <div className="col-md-12">
                      <Table
                        gridColumns={utils.getGridColumnByName("LineItems")}
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
              {this.state.subOrder && (
                <div className="portlet light bordered sdg_portlet ">
                  <div className="portlet-title">
                    <div className="tools">
                      <a
                        href="javascript:;"
                        className="collapse"
                        data-original-title="true"
                        title=""
                      />
                    </div>
                    <div className="caption">
                      <span className="caption-subject">Sub Order</span>
                    </div>
                    <div className="actions" />
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-md-12">
                        {this.state.subOrder.map(obj => {
                          obj.action = [
                            {
                              label: "View",
                              URI: ["/strata/subOrder"],
                              params: "_id",
                              iconName: "icon-docs"
                            }
                          ];
                        })}
                        <Table
                          gridColumns={utils.getGridColumnByName("suborder")}
                          gridData={this.state.subOrder || []}
                          pagination={false}
                          export={false}
                          search={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="timelineview">
                {this.state.orderDetail &&
                  this.state.orderDetail.actionButtons &&
                  this.state.orderDetail.actionButtons.map(element => {
                    return (
                      <a
                        onClick={() => {
                          this.statusButtonHandler(element);
                        }}
                        className="btn stratabtnstyle"
                        style={{ marginLeft: 10 }}
                      >
                        {element.label}
                      </a>
                    );
                  })}

                <a
                  onClick={this.timeLineViewModalBoxChangeState}
                  className="btn stratabtnstyle"
                  style={{ marginLeft: 10 }}
                >
                  Timeline View
                </a>
                {parseInt(_.get(this.state.orderDetail, "status", "0")) >=
                  10 && (
                    <a
                      onClick={this.openReceiptModal}
                      className="btn stratabtnstyle"
                      style={{ marginLeft: 10 }}
                    >
                      View Receipts
                  </a>
                  )}
              </div>
            </div>
          </div>

        </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(_.get(state.app, 'orderDetail', undefined), "orderDetail: _.get(state.app, 'orderDetail.order', undefined),")
  return {
    typeData: state.app.typeData.data,
    orderDetail: _.get(state.app, "orderDetail.order", undefined),
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
