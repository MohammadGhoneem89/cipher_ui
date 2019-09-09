/*standard imports*/
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../../../core/actions/generalAction";
import { browserHistory } from 'react-router';
import * as toaster from '../../../../../core/common/toaster.js';
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
      //typeData: undefined

      typeData: {
        "search": [{label: "Name", value: "name"},
          {label: "Description", value: "description"},
          {label: "Material", value: "material"}]
      }
    };
    // this.nameTypeData = [];
    this.total = 0;
    this.generalHandler = gen.generalHandler.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

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
    this.setState({currentPageNo, searchCriteria: request.body.searchCriteria, isLoading2: true})
  };

  placeOrder() {
    let items = [...this.state.cartItems];
    items.map(item => {
      item.color = [item.color];
    });
    let request = {
      "body": {
        "orderType": "ONETIME",
        "raisedBy": sessionStorage.userID,
        "quoteValidity": "888",
        "orgCode": "0",
        "incoTerms": "",
        "items": items
      }
    };

    this.props.actions.generalAjxProcess(constants.createOrder, 
      request).then(result => {
        console.log(result,"result")
      result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
    });
  }
  redirectToList = () => {
    browserHistory.push('/strata/orderList')
    toaster.showToast("Record updated successfully!");
  }
  componentWillMount() {
    // let createOrd = document.getElementById('createOrder');
    // createOrd.style.visibility = false;
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['classification']));
    this.getRequest();
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getItemCatalogue, nextProps.typeData) {
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

  addToCart(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let cartItem = {};
    formData.forEach(function (value, key) {
      cartItem[key] = value;
    });

    let grandTotal = 0;
    let cart = this.state.cartItems;

    let isNewItem = true;
    cart.map(element => {
      if (element.itemCode === cartItem.itemCode && element.color === cartItem.color) {
        isNewItem = false;
        console.log(cartItem.quantity, cartItem.quantity, "QUANTITY");
        element.quantity = parseInt(element.quantity)+ parseInt(cartItem.quantity);
        console.log(cartItem.quantity, cartItem.quantity, "QUANTITY");
      }
    });
    if (isNewItem) {
      cart.push(cartItem);
    }
    cart.forEach(element => {
      element.quantity = parseInt(element.quantity);
      element.price = parseInt(element.price);
      element.total = element.quantity * element.price;
    });
    cart.forEach(element => {
      grandTotal += element.total
    });

    this.setState({
      cartItems: cart,
      grandTotal: grandTotal,
      itemAddedToCart: true
    });
    e.target.reset();
    console.log('cart', cart);
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
    // console.log("item cat", this.state.getItemCatalogue)
    // let categories = ["Computer Components", "Accessories", "Cameras & Photography", "Computer Components", "Gadgets", "Home Entertainment", "Laptops & Computers", "Printers & Ink", "Smart Phones & Tablets", "Video Games & Consoles"];
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
                    <div className="input-search-field">
                      <input type="text" id="search" className="form-control search-field product-search-field"
                             dir="ltr" name="find" placeholder="Search for Products" autoComplete="off"/>
                    </div>
                    <div className="input-group-addon search-categories">
                      <select name="searchType" id="productCategory" className="postform resizeselect"
                              style={{width: "143px"}}>
                        <option value="name">Name</option>
                        <option className="level-0" value="description">Description</option>
                        <option className="level-0" value="material">Material</option>
                      </select>
                    </div>
                    <div className="input-group-addon search-categories">
                      <select name="classification" id="product_cat" className="postform resizeselect"
                              style={{width: "143px"}}>
                        <option value="">All Categories</option>
                        {categories.map((item, index) => {
                          return <option key={index} className="level-0" value={item.value}>{item.label}</option>;
                        })}
                      </select>
                    </div>
                    <div className="input-group-btn">
                      <button type="submit" className="btn btn-secondary"><i className="fa fa-search"
                                                                             aria-hidden="true"/></button>
                    </div>
                  </div>
                </form>
                <div className="cartitemcount"><span>{this.state.cartItems.length}</span></div>
                <div className="carticon" onClick={this.checkout}>
                  <a href="#"><img src="/assets/Resources/cart.png"/></a>
                </div>
              </div>
            </div>
          </div>}


          {this.state.isLoading2 && <div className="loader">{utils.getLabelByID("Loading")}</div>}
          {!this.state.createOrder && !this.state.isLoading2 && <Portlet title="Product Catalogue">
            <Row>
              {this.state.getItemCatalogue.searchResult && this.state.getItemCatalogue.searchResult.map((item, index) => {
                return (
                  <Col col="3" key={index}>
                    <form onSubmit={this.addToCart}>
                      <Product onClick={this.openModalBox} details={item}/>
                    </form>
                    <div className="seprator"/>
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
            <ProductDetail details={this.state.modelItem} state={this.state} closeModalBox={this.closeModalBox}/>
          </ModalBox>

          {this.state.createOrder && <CreateOrder
            cartItems={this.state.cartItems}
            state={this.state}
            setState={(data) => {
              this.setState(data)
            }}
            placeOrder={this.placeOrder}
          />}
        </div>
      );
    else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    typeData: state.app.typeData.data,
    getItemCatalogue: _.get(state.app, 'getItemCatalogue', {}),
    // pageData: _.get(state.app, 'getItemCatalogue.pageData', {})
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

OneTimeOrder.displayName = "__HIDE";
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneTimeOrder);
