/*standard imports*/
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../../core/actions/generalAction";

import * as utils from "../../../../core/common/utils.js";
import * as constants from "../../../../core/constants/Communication";
import * as requestCreator from '../../../../core/common/request.js';
import * as coreConstants from '../../../../core/constants/Communication.js'

//Custom Components
import Select from "../../common/Select.jsx";
import Div from "../../common/Div.jsx";
import Row from "../../common/Row.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";
import Portlet from "../../common/Portlet.jsx";
import ModalBox from '../../../../core/common/ModalBox.jsx';
import Pagination from "react-js-pagination";
import Steps from '../../../../core/common/Steps.jsx';

import * as gen from "../../common/generalActionHandler";
import Combobox from "../../common/Select.jsx";


class OrderDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      orderDetail: {},
    };
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.actions.generalProcess(constants.getOrderDetail, {"body": {
        "orderID": this.props.orderID,
        "customerID": sessionStorage.orgCode
      }});
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getItemCatalogue) {
      this.setState({
        getItemCatalogue: nextProps.getItemCatalogue,
        typeData: nextProps.typeData,
        isLoading: false,
        isLoading2: false
      })
    }

    // this.getItemName(nextProps.getItemCatalogue);
  }

  openModalBox(modelItem) {
    console.log('item', modelItem);
    this.setState({
      modelBox: true,
      modelItem
    });


  }



  handlePageChange(pageNumber) {
    //alert(`active page is ${pageNumber}`);
    this.getRequest(pageNumber);
  }

  checkout = () => {
    if (this.state.itemAddedToCart) {
      this.setState({
        createOrder: true
      })
      // let createOrd = document.getElementById('createOrder');
      // createOrd.style.visibility = true;
    }
    else {
      alert("Please add some item to cart!")
    }
  };

  closeModalBox() {
    this.setState({modelBox: false});
  }

  searchItem(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    data[data.searchType] = data.find;
    delete data.searchType;
    delete data.find;
    this.getRequest(1, data)
  }

  render() {


    if (!this.state.isLoading)
      return (
        <div className="col-md-12">
          <div className="portlet light" style={{minHeight: "854px"}}>


            <div className="row">
              <div className="col-md-12">

                <div className="timelineview">
                  <a href="#" className="btn stratabtnstyle">Time Line View </a>
                </div>

                <div className="form-wizard stratawizard">
                  {/*<Steps />*/}
                  <ul className="nav nav-pills nav-justified steps">
                    <li><a href="#" data-toggle="tab" className="step" aria-expanded="false"><span
                      className="number">1</span><span className="desc"><i
                      className="fa fa-check"/>Order<br/>Recived</span></a><i
                      className="fa fa-long-arrow-right" aria-hidden="true"><span className="timer"/></i></li>
                    <li className="inactive"><a href="#" data-toggle="tab" className="step" aria-expanded="false"><span
                      className="number">2</span><span className="desc"><i className="fa fa-check"/> Purchase<br/>Order</span></a><i
                      className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li className="inactive"><a href="#tab1" data-toggle="tab" className="step"
                                                aria-expanded="false"><span className="number">3</span><span
                      className="desc"><i className="fa fa-check"/>Component <br/> Manufacture</span></a><i
                      className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li className="inactive"><a href="#tab1" data-toggle="tab" className="step"
                                                aria-expanded="false"><span className="number">4</span><span
                      className="desc"><i className="fa fa-check"/>Dispatched</span></a><i
                      className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li className="inactive"><a href="#tab1" data-toggle="tab" className="step"
                                                aria-expanded="false"><span className="number">5</span><span
                      className="desc"><i className="fa fa-check"/>Recieved</span></a>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li className="inactive"><a href="#tab1" data-toggle="tab" className="step"
                                                aria-expanded="false"><span className="number">6</span><span
                      className="desc"><i className="fa fa-check"/>Inspected</span></a>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li className="inactive"><a href="#tab1" data-toggle="tab" className="step"
                                                aria-expanded="false"><span className="number">7</span><span
                      className="desc"><i className="fa fa-check"/>Accepeted</span></a>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li className="inactive"><a href="#tab1" data-toggle="tab" className="step"
                                                aria-expanded="false"><span className="number">8</span><span
                      className="desc"><i className="fa fa-check"/>Invoiced</span></a>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"/></li>
                    <li>
                      <a href="#" data-toggle="tab" className="step" aria-expanded="false">
                        <span className="number">9</span>
                        <span className="desc">Paid</span>
                      </a>
                    </li>
                  </ul>
                </div>


                <div className="wizardcontent">
                  <div className="col-md-8">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-2">
                          <label className="bold">Etihad Airlines:</label>
                        </div>
                        <div className="col-md-4">
                          <span style={{color:"red", fontWeight: "700"}}>32156531354</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-12">
                          <label className="hashno">54sdf35s4ffsd545fb4534gss4v3s4sa4fd3ds</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="bold">Quotation Date:</label>
                        </div>
                        <div className="col-md-3">
                          <span>{this.state.orderDetail.orderDate}</span>
                        </div>
                        <div className="col-md-3">
                          <label className="bold">Amount:</label>
                        </div>
                        <div className="col-md-3">
                          <span>AED {this.state.orderDetail.orderAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="bold">Order Raised By:</label>
                        </div>
                        <div className="col-md-3">
                          <div className="orderperson">
                            {/*<img src="assets/imgs/person.jpg" width="25px">*/}
                            <span>{this.state.orderDetail.raisedBy}</span>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label className="bold">Recived Date:</label>
                        </div>
                        <div className="col-md-3">
                          <span>{this.state.orderDetail.receivedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    {/*<img src="assets/imgs/etihadlogo.png" width="65%"/>*/}
                  </div>
                  <div className="col-md-2 text-right">
                    {/*<img src="assets/imgs/etihadlogo.png" width="65%"/>*/}
                  </div>
                </div>
              </div>
            </div>

            <div className="portlet light bordered sdg_portlet ProCardssection">
              <div className="portlet-title">
                <div className="tools">
                  <a href="javascript:;" className="collapse" data-original-title="true" title=""/>
                </div>
                <div className="caption"><span className="caption-subject">Line Items </span></div>
                <div className="actions"/>
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
            </div>
            <div className="portlet light bordered sdg_portlet ProCardssection">
              <div className="portlet-title">
                <div className="tools">
                  <a href="javascript:;" className="collapse" data-original-title="true" title=""></a>
                </div>
                <div className="caption"><span className="caption-subject">Sub Order</span></div>
                <div className="actions"></div>
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
    orderDetail: _.get(state.app, 'orderDetail', {}),
    orderID: ownProps.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

OrderDetailContainer.displayName = "__HIDE";
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailContainer);
