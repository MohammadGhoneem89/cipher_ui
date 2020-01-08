/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../../core/actions/generalAction";
import { browserHistory } from 'react-router';
import * as utils from "../../../../../core/common/utils.js";
import * as constants from "../../../../../core/constants/Communication";
import * as requestCreator from '../../../../../core/common/request.js';
import * as coreConstants from '../../../../../core/constants/Communication.js'
import * as toaster from '../../../../../core/common/toaster.js';
//Custom Components
import Select from "../../../common/Select.jsx";
import Div from "../../../common/Div.jsx";
import Row from "../../../common/Row.jsx";
import Col from "../../../common/Col.jsx";
import Label from "../../../common/Lable.jsx";
import Portlet from "../../../common/Portlet.jsx";
import ModalBox from '../../../../../core/common/ModalBox.jsx';
import Product from '../Product.jsx';
import ProductDetail from "../ProductDetail.jsx";
import CreateOrder from "../CreateOrder.jsx";
import Pagination from "react-js-pagination";

import * as gen from "../../../common/generalActionHandler";
import Combobox from "../../../common/Select.jsx";


class OneTimeOrder extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      isLoading2: false,
      currentPageNo: 1,
      getItemCatalogue: undefined,
      searchCriteria: {},
      modelBox: false,
      modelItem: {},
      cartItems: [],
      itemAddedToCart: false,
      createOrder: false,
      grandTotal: 0,
      totalBatchSize: 0,
      getCustomerShipmentAndPaymentType: {},

      typeData: {
        "search": [{ label: "Name", value: "name" },
        { label: "Description", value: "description" },
        { label: "Material", value: "material" }]
      }
    };
    // this.nameTypeData = [];
    this.total = 0;
    this.grandTotal = 0;
    this.customerData = {};
    this.generalHandler = gen.generalHandler.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  getLeadTime = () => {
    let totalLeadTime = 0;
    let firstTerm = 1.0;

    let items = [...this.state.cartItems];

    for (let i = 0; i < items.length; i++) {
      firstTerm = 1.0;
      if (items[i].quantity > 1) {
        firstTerm = 0.73 * items[i].quantity * items[i].printTime;
      }
      totalLeadTime += Math.ceil(Math.pow((firstTerm + items[i].leadTime), i + 1)); //Math.pow(2,2)
    }
    return totalLeadTime;
  };
  getRequest = (currentPageNo, searchCriteria) => {
    // this.setState({searchCriteria: searchCriteria});
    let request = {
      "body": {
        "page": {
          "currentPageNo": currentPageNo || this.state.currentPageNo || 1,
          "pageSize": 8
        },
        "searchCriteria": searchCriteria || this.state.searchCriteria
      }
    };
    this.props.actions.generalProcess(constants.getItemCatalogue, request);
    this.setState({ currentPageNo, searchCriteria: request.body.searchCriteria, isLoading2: true })
  };
  getTotalUnits = () => {
    let items = [...this.state.cartItems];
    let totalUnit = 0;
    for (let i = 0; i < items.length; i++) {
      totalUnit += items[i].batchSize * items[i].quantity
    }
    console.log("totalunit >> ", totalUnit)
    return totalUnit;
  }
  placeOrder() {
    let items = [...this.state.cartItems];
    items.map(item => {
      item.color = [item.color];
    });
    if (this.state.getCustomerShipmentAndPaymentType)
      console.log(this.state.getCustomerShipmentAndPaymentType, "this.state.getCustomerShipmentAndPaymentType");
    let request = {
      "body": {
        "orderType": "ONETIME",
        "raisedBy": sessionStorage.userID,
        "quoteValidity": "",
        "incoTerms": "EXW",
        "items": items,
        "shipmentType": this.state.getCustomerShipmentAndPaymentType ? this.state.getCustomerShipmentAndPaymentType.shipmentType : "",
        "paymentType": this.state.getCustomerShipmentAndPaymentType ? this.state.getCustomerShipmentAndPaymentType.paymentType : "",
        "purchaseOrderType": this.state.getCustomerShipmentAndPaymentType ? this.state.getCustomerShipmentAndPaymentType.purchaseOrderType : "",
        "totalLeadTime": this.getLeadTime(),
        "grandTotal": this.grandTotal
      }
    };
    console.log(request, "request");
    let confirmPlaceOrder = confirm("Do you want to continue to place an order ?");
    if (confirmPlaceOrder == true) {
      console.log("okay was pressed.")
      if (this.state.cartItems && this.state.cartItems.length > 0) {
        this.setState({
          isLoading: true
        })
        this.props.actions.generalAjxProcess(constants.createOrder,
          request).then(result => {
            console.log(result, "result")
            result.message.status == 'ERROR' ? this.failureAction(result) : this.successAction(result.orderID)
          });
      }
      else {
        toaster.showToast("Please add at least one item to place the order!", "ERROR");
        return false;
      }
    } else {
      console.log("Cancel was pressed.")
      return false;
    }
  }
  failureAction = (result) => {
    toaster.showToast(result.message.errorDescription, "ERROR");
    this.setState({
      cartItems: [],
      grandTotal: 0,
      totalBatchSize: 0,
      itemAddedToCart: false
    })
    return false;
  }
  successAction = (orderID) => {
    browserHistory.push({
      pathname: '/strata/orderList',
      state: { orderID }
    })
    toaster.showToast("Order Created successfully!");
  }
  componentWillMount() {
    // let createOrd = document.getElementById('createOrder');
    // createOrd.style.visibility = false;
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['classification']));
    this.props.actions.generalProcess(constants.getCustomerShipmentAndPaymentType, { data: { userId: '' } });
    // this.props.actions.generalProcess(
    //   constants.getUserList,
    //   requestCreator.createUserListRequest(
    //     {
    //       currentPageNo: 1,
    //       pageSize: 100
    //     },
    //     {}
    //   )
    // );
    this.getRequest();
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getItemCatalogue, nextProps.typeData && nextProps.getCustomerShipmentAndPaymentType) {
      console.log(nextProps.getCustomerShipmentAndPaymentType, "nextProps.getCustomerShipmentAndPaymentType")
      this.setState({
        getItemCatalogue: nextProps.getItemCatalogue,
        typeData: nextProps.typeData,
        //userList: nextProps.userList,
        getCustomerShipmentAndPaymentType: nextProps.getCustomerShipmentAndPaymentType,
        isLoading2: false,
        isLoading: false
      })

      this.customerData = nextProps.getCustomerShipmentAndPaymentType
    }
  }

  openModalBox(modelItem) {
    console.log('item', modelItem);
    this.setState({
      modelBox: true,
      modelItem
    });
  }

  addToCart(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let cartItem = {};
    formData.forEach(function (value, key) {
      cartItem[key] = value;
    });

    console.log(cartItem, 'cart item')
    let material = ''
    for (let i = 0; i < _.get(this.state, 'getItemCatalogue.searchResult', []).length; i++) {
      if (this.state.getItemCatalogue.searchResult[i].itemCode === cartItem.itemCode) {
        console.log(this.state.getItemCatalogue.searchResult[i].batchSize, 'found')
        cartItem.leadTime = this.state.getItemCatalogue.searchResult[i].leadTime
        cartItem.printTime = this.state.getItemCatalogue.searchResult[i].printTime
        cartItem.material = this.state.getItemCatalogue.searchResult[i].material
        cartItem.price = this.state.getItemCatalogue.searchResult[i].price
        cartItem.batchSize = this.state.getItemCatalogue.searchResult[i].batchSize ? this.state.getItemCatalogue.searchResult[i].batchSize : 1
        break
      }
    }
    let grandTotal = 0;
    let totalBatchSize = 0;
    let cart = [...this.state.cartItems];

    if (cartItem.quantity == 0) {
      toaster.showToast("Quantity cannot be zero!", "ERROR");
      cartItem.quantity = 0;
      e.target.reset();
      return false;
    }
    let isNewItem = true;
    cart.map(element => {
      if (element.itemCode === cartItem.itemCode && element.color === cartItem.color) {
        isNewItem = false;
        element.quantity = parseFloat(parseInt(element.quantity)) + parseFloat(parseInt(cartItem.quantity));
        // this.grandTotal -= element.total;
      }
    });
    if (isNewItem) {
      cart.push(cartItem);
    }
    cart.forEach(element => {
      element.quantity = parseFloat(parseInt(element.quantity));
      element.price = parseFloat(element.price);
      grandTotal += (element.quantity * element.price);
      console.log(element.batchSize, element.quantity, element.batchSize * element.quantity, "element.batchSize", "element.quantity")
      totalBatchSize += element.batchSize * element.quantity;
    });
    this.grandTotal = grandTotal;

    console.log("this.grandTotal ", this.grandTotal)
    this.setState({
      cartItems: cart,
      grandTotal: grandTotal,
      itemAddedToCart: true,
      totalBatchSize: totalBatchSize,
      modelBox: false
    });
    toaster.showToast(`Item '${cart[cart.length - 1].name}' added to cart successfully`);
    e.target.reset();
    console.log('cart', cart);
    window.scrollTo(0, 0);

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
      toaster.showToast("Please add some item to cart!", "ERROR")
    }
  };

  closeModalBox() {
    this.setState({ modelBox: false });
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
    this.getRequest(1, data);
  }
  cancelOrder = () => {
    console.log("testttttttttt cancel order ##################");
    let cancelOrderConfirm = confirm("Are you sure you want to cancel this order ?");
    if (cancelOrderConfirm == true) {
      console.log("OK was pressed.");
      this.setState({
        createOrder: false,
        isLoading2: false,
        isLoading: false,
        cartItems: [],
        contractState: false,
        grandTotal: 0,
        _contractID: '',
        totalBatchSize: 0,
        itemAddedToCart: false
      });
      window.scrollTo(0, 0);
    } else {
      console.log("Cancel was pressed.");
      return;
    }

  }
  render() {

    console.log(" this.state.getItemCatalogue.searchResult", this.state.getItemCatalogue ? sessionStorage.userID : [])
    let categories = this.state.typeData.classification;

    if (!this.state.isLoading)
      return (
        <div>

          {!this.state.createOrder && <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="masthead">
                <form className="navbar-search" method="get" autoComplete="off" onSubmit={this.searchItem}>
                  <label className="sr-only screen-reader-text" htmlFor="search">Search for:</label>
                  <div className="input-group">
                    {/* <div className="input-search-field">
                      <input type="text" id="search" className="form-control search-field product-search-field"
                        dir="ltr" name="find" placeholder="Search for Products" autoComplete="off" />
      </div>*/}
                    <div className="input-group-addon search-categories">
                      <select name="searchType" id="productCategory" className="postform resizeselect"
                        style={{ webkitAppearance: "menulist" }}>
                        <option value="name">Name</option>
                        <option className="level-0" value="description">Description</option>
                        <option className="level-0" value="material">Material</option>
                      </select>
                    </div>
                    <div className="input-group-addon search-categories catname">
                      <select name="classification" id="product_cat" className="postform resizeselect"
                        style={{ webkitAppearance: "menulist" }}>
                        <option value="">All Categories</option>
                        {categories.map((item, index) => {
                          return <option key={index} className="level-0" value={item.value}>{item.label}</option>;
                        })}
                      </select>
                    </div>
                    <div className="input-group-btn">
                      <button type="submit" className="btn btn-secondary">
                        <i className="fa fa-search"
                          aria-hidden="true" /></button>
                    </div>
                  </div>
                </form>
                <div className="cartitemcount"><span>{this.state.cartItems.length}</span></div>
                <div className="carticon" onClick={this.checkout}>
                  <a href="#"><img src="/assets/Resources/cart.png" /></a>
                </div>
              </div>
            </div>
          </div>}
          {/* {(!this.state.createOrder && this.state.cartItems.length > 0 && this.state.itemAddedToCart)
            && <div>
              <div className="alert alert-dark" style={{ textAlign: "center", backgroundColor: "green", color: "white" }}>
                Item added to cart successfully
                  : <strong>{this.state.cartItems[this.state.cartItems.length - 1].name}</strong>
              </div>
            </div>
          } */}

          {this.state.isLoading2 && <div className="loader">{utils.getLabelByID("Loading")}</div>}
          {!this.state.createOrder && !this.state.isLoading2 && <Portlet title="Product Catalogue">
            <Row>
              {this.state.getItemCatalogue.searchResult && this.state.getItemCatalogue.searchResult.map((item, index) => {
                return (
                  <Col col="3" key={index}>
                    <form onSubmit={this.addToCart}>
                      <Product onClick={this.openModalBox} details={item} />
                    </form>
                    <div className="seprator" />
                  </Col>
                );
              })}
            </Row>
            {this.state.getItemCatalogue.pageData && <div className="text-center"><Pagination
              activePage={this.state.getItemCatalogue.pageData.currentPageNo}
              itemsCountPerPage={this.state.getItemCatalogue.pageData.pageSize}
              totalItemsCount={this.state.getItemCatalogue.pageData.totalRecords}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            /></div>}
          </Portlet>}

          <ModalBox isOpen={this.state.modelBox ? true : false}>
            <form onSubmit={this.addToCart}>
              <ProductDetail details={this.state.modelItem} state={this.state} closeModalBox={this.closeModalBox} />
            </form>
          </ModalBox>

          {this.state.createOrder && <CreateOrder
            cartItems={this.state.cartItems}
            state={this.state}
            setState={(data) => {
              this.setState(data)
            }}
            getTotalUnits={this.getTotalUnits}
            getLeadTime={this.getLeadTime}
            placeOrder={this.placeOrder}
            cancelOrder={this.cancelOrder}
          />}
        </div>
      );
    else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.app.getCustomerShipmentAndPaymentType ? state.app.getCustomerShipmentAndPaymentType : "STATE APP getCustomerShipmentAndPaymentType")
  return {
    typeData: state.app.typeData.data,
    getItemCatalogue: _.get(state.app, 'getItemCatalogue', {}),
    //userList: _.get(state.app, 'userList.data.searchResult', []),
    getCustomerShipmentAndPaymentType: _.get(state.app, 'getCustomerShipmentAndPaymentType', {})
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

OneTimeOrder.displayName = "__HIDE";
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneTimeOrder);
