/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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


class OrderViaContract extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      _contractID: "",
      isLoading: true,
      isLoading2: false,
      currentPageNo: 1,
      contracts: [],
      itemCatalogue: undefined,
      getItemCatalogue: undefined,
      searchCriteria: {},
      modelBox: false,
      modelItem: {},
      cartItems: [],
      disabledPagging: true,
      itemAddedToCart: false,
      createOrder: false,
      grandTotal: 0,
      contractState: false,
      orgCode: window.sessionStorage.getItem("orgCode"),

    };
    // this.contractState = false;
    this.contractData = {
      customerID: "",
      contractID: "",
      startDate: "",
      endDate: "",
      image: ""
    };

    this.total = 0;
    this.items = [];
    this.handleOnChange = this.handleOnChange.bind(this);
    this.generalHandler = gen.generalHandler.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.openModalBox = this.openModalBox.bind(this);
    this.closeModalBox = this.closeModalBox.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.getContractDetails = this.getContractDetails.bind(this);
    // this.getProducts = this.getProducts.bind(this);
  }



  getContractDetails() {
    let contractID = [];
    let contractInfo = [];
    contractInfo = this.state.contracts ? this.state.contracts : [];
    //for array like object 
    Array.prototype.forEach.call(contractInfo, obj => {
      contractID.push(obj.contractID);

    });
    return contractID;
  }
  placeOrder() {
    let items = [...this.state.cartItems];
    items.map(item => {
      item.color = [item.color];
    });
    let request = {
      "body": {
        "orderType": "MASTER",
        "raisedBy": sessionStorage.userID,
        "quoteValidity": "456",
        "incoTerms": "EXW",
        "items": items,
        "contractID": this.contractData.contractID,
        "shipmentType": this.contractData.shipmentType,
        "paymentType": this.contractData.paymentType
      }
    };
    if (this.state.cartItems && this.state.cartItems.length > 0) {
      this.props.actions.generalAjxProcess(constants.createOrder,
        request).then(result => {
          result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
        });
    } else {
      alert("Please add atleast one item to place the order!");
      browserHistory.push('/strata/OrderViaContract');
      toaster.showToast("Failed to place the order!");
      return false;
    }
  }
  redirectToList = () => {
    browserHistory.push('/strata/orderList');
    toaster.showToast("Record updated successfully!");
  }
  componentWillMount() {
    // let createOrd = document.getElementById('createOrder');
    // createOrd.style.visibility = false;
  }

  componentDidMount() {

    this.props.actions.generalProcess(constants.getItemCatalogue, { "body": {} });
    
    if (this.state.disabledPagging) { this.props.actions.generalProcess(constants.getMasterAgreement, { "body": {} }) }
    else {
      this.props.actions.generalProcess(constants.getMasterAgreement,
        {
          "body": {
            "page": {
              "pageSize": 10,
              "currentPageNo": 1
            }
          }
        })
    }

    this.getRequest();
    window.scrollTo(0, 0);

    this.setState(
      {
        actions: [
          {
            "value": "1002",
            "type": "pageAction",
            "label": "ADD",
            "labelName": "COM_AB_Add",
            "actionType": "PORTLET_LINK",
            "iconName": "fa fa-plus",
            "URI": "/strata/ProductCatalogue",
            "children": []
          }]
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getMasterAgreement && nextProps.itemCatalogue) {

      this.setState({
        itemCatalogue: nextProps.itemCatalogue,
        contracts: nextProps.getMasterAgreement,
        // typeData: nextProps.typeData,
        isLoading: false,
        isLoading2: false
      })
    }
  }


  openModalBox(modelItem) {
    // console.log('item', modelItem);
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
    console.log("cartItem", cartItem)
    let grandTotal = 0;
    let cart = this.state.cartItems;

    if (cartItem.quantity == 0) {
      alert("Quantity cannot be zero!")
      cartItem.quantity = 0;
      e.target.reset();
      return false;
    }
    let itemCat;
    let contractData;
    if (this.state.contracts) {
      contractData = this.state.contracts.filter(obj => {
        return obj.contractID == document.getElementById('contractID').value
      })
    }
    if (contractData[0].items) {
      itemCat = contractData[0].items
    }
    let result = itemCat.filter(obj => {
      return obj.itemCode == cartItem.itemCode
    })


    console.log("this.state.cartItems", this.state.cartItems)
    let isNewItem = true;
    cart.map(element => {
      if (element.itemCode === cartItem.itemCode && element.color === cartItem.color) {
        isNewItem = false;
        element.quantity = parseInt(element.quantity) + parseInt(cartItem.quantity);
        if (element.quantity > result[0].expectedQuantity) {
          alert("The quantity you ordered for this item is more than expected quantity in master contract!")
          cartItem.quantity = 0;
          e.target.reset();
          return false;
        }
      }
    });
    if (isNewItem) {
      if (cartItem.quantity > result[0].expectedQuantity) {
        alert("The quantity you ordered for this item is more than expected quantity in master contract!")
        cartItem.quantity = 0;
        e.target.reset();
        return false;
      }
      cart.push(cartItem);
    }
    cart.forEach(element => {
      element.quantity = parseInt(element.quantity);
      element.price = parseInt(element.price);
      element.total = element.quantity * element.price;
      element.material = result[0].material;
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
    // console.log('cart', cart);
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
    this.setState({ modelBox: false });
  }
  handleOnChange(e) {
    if (e.target.value == "") {
      this.setState({
        contractState: false,
        _contractID
      })
    }
    this.setState({
      _contractID: document.getElementById('contractID').value,
      cartItems: [],
      grandTotal: 0
    })
  }

  searchItem(e) {
    e.preventDefault();
    console.log(document.getElementById('contractID').value, "handelonchange")
    console.log(this.state._contractID, "this.state._contractID")
    let itemData = this.state.itemCatalogue.length > 0 ? this.state.itemCatalogue : alert("not found itemcat")
    let result = this.state.contracts.filter(obj => {
      return obj.contractID == document.getElementById('contractID').value
    })
    console.log(result, "result-----")

    this.contractData.contractID = result[0].contractID;
    this.contractData.startDate = result[0].startDate;
    this.contractData.endDate = result[0].endDate;
    this.contractData.paymentType = result[0].paymentTerms.paymentType;

    this.contractData.shipmentType = result[0].shipmentType;
    this.state._contractID ? this.setState({ contractState: true }) : this.setState({ contractState: false })


    for (let i = 0; i < result[0].items.length; i++) {
      for (let j = 0; j < itemData.length; j++) {
        if (result[0].items[i].itemCode == itemData[j].itemCode) {
          result[0].items[i].image = itemData[j].image;
          result[0].items[i].description = itemData[j].description;
          result[0].items[i].modelVolume = itemData[j].modelVolume;
          result[0].items[i].supportVolume = itemData[j].supportVolume;
          result[0].items[i].partNumber = itemData[j].partNumber;
        }
      }
    }
    console.log("result after image", result[0].items)
    this.items = result[0].items;
    this.getRequest();
  }


  getItems = (currentPageNo, pageSize) => {
    let _items;
    !currentPageNo ? currentPageNo = 1 : currentPageNo;
    let firstIndex = (pageSize * (currentPageNo - 1));
    let secondIndex = 0;
    if (this.state.itemCatalogueUpdated && this.state.itemCatalogueUpdated.searchResult && this.state.itemCatalogueUpdated.searchResult.length > 0) {
      console.log(this.state.itemCatalogueUpdated.searchResult, "this.state.itemCatalogueUpdated.searchResult")
      secondIndex = this.state.itemCatalogueUpdated.searchResult.length - 1;
    }

    if (this.items.length < (firstIndex + pageSize)) {
      secondIndex = firstIndex + secondIndex
    }
    else { secondIndex = firstIndex + pageSize };

    secondIndex == 0 ? _items = this.items.slice(firstIndex) : _items = this.items.slice(firstIndex, secondIndex)

    console.log("firstIndex", firstIndex);
    console.log("secondIndex", secondIndex)
    return _items;

  }
  getRequest = (currentPageNo) => {
    let items = {
      searchResult: this.getItems(currentPageNo, 8),
      pageData: {
        "currentPageNo": currentPageNo || this.state.currentPageNo || 1,
        pageSize: 8,
        totalRecords: this.items.length
      }
    }
    this.setState({
      itemCatalogueUpdated: items,
      currentPageNo
    });
  };

  render() {
    //console.log(this.state.itemCatalogueUpdated, "itemCatalogueUpdated render")
    //console.log(this.items, "this.items")
    let masterContract = this.state.contracts ? this.getContractDetails() : []
    if (!this.state.isLoading)
      return (
        <div>

          {!this.state.createOrder && <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="masthead via-contract">
                <form className="navbar-search" method="get" autoComplete="off" onSubmit={this.searchItem}>
                  <label className="sr-only screen-reader-text" htmlFor="search">Select Master Contract:</label>
                  <div className="input-group">
                    <div className="form-control search-field product-search-field search-categories">
                      <select name="contractID" id="contractID" value={this.state._contractID}
                        onChange={(e) => this.handleOnChange(e)}
                        className="col-md-12">
                        <option value="">Select Contract</option>
                        {masterContract.map((contractID, index) => {
                          return <option key={index} className="level-0"
                            value={contractID}>
                            {contractID}</option>;
                        })}
                      </select>
                    </div>
                    <div className="input-group-btn">
                      <button type="submit" className="btn btn-secondary"><i className="fa fa-search"
                        aria-hidden="true" /></button>
                    </div>
                  </div>
                </form>
                <div className="cartitemcount"><span>{this.state.cartItems.length}
                </span>
                </div>
                <div className="carticon" onClick={this.checkout}>
                  <a href="#"><img src="/assets/Resources/cart.png" /></a>
                </div>
              </div>
            </div>
          </div>}
          <br />
          {this.state.isLoading2 && <div className="loader">{utils.getLabelByID("Loading")}</div>}
          {this.state.contractState && !this.state.createOrder && !this.state.isLoading2
            && <div>
              <div className="row" style={{ paddingLeft: "35px" }}>
                <div className="col-md-4">
                  <div className="form-group col-md-4">
                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("ContractID : ")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <label className="control-label" >
                      {this.contractData.contractID}
                    </label>
                  </div>
                </div>
              </div>

              <div className="row" style={{ paddingLeft: "35px" }}>
                <div className="col-md-4">
                  <div className="form-group col-md-4">
                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Start Date : ")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <label className="control-label" >
                      {this.contractData.startDate}
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group col-md-4">
                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("End Date : ")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <label className="control-label" >
                      {this.contractData.endDate}
                    </label>
                  </div>
                </div>

              </div>
            </div>}
          <br />

          {
            !this.state.createOrder && !this.state.isLoading2 &&
            <Portlet title="Product Catalogue">
              <Row>
                {this.state.contractState && this.state.itemCatalogueUpdated &&
                  this.state.itemCatalogueUpdated.searchResult &&
                  this.state.itemCatalogueUpdated.searchResult.map((item, index) => {
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
              {<div className="text-center">
                {this.state.itemCatalogueUpdated &&
                  this.state.itemCatalogueUpdated.pageData && <Pagination
                    activePage={this.state.itemCatalogueUpdated.pageData.currentPageNo}
                    itemsCountPerPage={this.state.itemCatalogueUpdated.pageData.pageSize}
                    totalItemsCount={this.state.itemCatalogueUpdated.pageData.totalRecords}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />}
              </div>}
            </Portlet>
          }

          <ModalBox isOpen={this.state.modelBox ? true : false}>
            <ProductDetail details={this.state.modelItem} state={this.state} closeModalBox={this.closeModalBox} />
          </ModalBox>

          {
            this.state.createOrder && <CreateOrder
              cartItems={this.state.cartItems}
              state={this.state}
              setState={(data) => {
                this.setState(data)
              }}
              placeOrder={this.placeOrder}
            />
          }
        </div >
      );
    else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  // console.log("state.app", state.app.typeData.data)
  return {
    itemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
    getMasterAgreement: _.get(state.app, 'getMasterAgreement.searchResult', {})
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

OrderViaContract.displayName = "__HIDE";
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderViaContract);
