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
      isLoading: true,
      isLoading2: false,
      currentPageNo: 1,
      itemCatalogue: undefined,
      getItemCatalogue: undefined,
      customerAssociation: undefined,
      searchCriteria: {},
      modelBox: false,
      modelItem: {},
      cartItems: [],
      itemAddedToCart: false,
      createOrder: false,
      grandTotal: 0,
      contractState: false,
      orgCode: window.sessionStorage.getItem("orgCode"),
      typeData: {
        "search": [{ label: "Name", value: "name" },
        { label: "Description", value: "description" },
        { label: "Material", value: "material" }]
      }
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
    this.getCustomerAssociationType = this.getCustomerAssociationType.bind(this);
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

  getRequest = (currentPageNo, searchCriteria) => {
    // alert(JSON.stringify(searchCriteria), "searchcriteria")
    let request = {
      "body": {
        "page": {
          "currentPageNo": currentPageNo || this.state.currentPageNo || 1,
          "pageSize": 28
        },
        "searchCriteria": searchCriteria || this.state.searchCriteria
      }
    };

    this.props.actions.generalProcess(constants.getMasterAgreement, request);
    this.setState({ currentPageNo, searchCriteria: request.body.searchCriteria, isLoading2: true })
  };

  getContractDetails() {
    let contractID = [];
    let contractInfo = [];
    contractInfo = this.state.contracts ? this.state.contracts : [];
    //for array like object 
    Array.prototype.forEach.call(contractInfo, obj => {
      contractID.push(obj.contractID);

    });
    console.log(contractID,"???? CONTRACTID")
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
        "quoteValidity": "xyz",
        "incoTerms": "EXW",
        "items": items,
        "contractID": this.contractData.contractID,
        "customerID": this.contractData.customerID,
        "shipmentType": this.state.customerAssociation.shipmentType,
        "paymentType": this.state.customerAssociation.paymentType
      }
    };
    console.log("request", request)
    if (this.state.cartItems && this.state.cartItems.length > 0) {
      this.props.actions.generalAjxProcess(constants.createOrder,
        request).then(result => {
          console.log(result, "result")
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
    this.props.actions.generalProcess(
      constants.getUserList,
      requestCreator.createUserListRequest(
        {
          currentPageNo: 1,
          pageSize: 100
        },
        {}
      )
    );
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

    if (nextProps.customerAssociation) {
      console.log(nextProps.customerAssociation, "nextProps.customerAssociation")
      let customerAssociation = _.pick(nextProps.customerAssociation, ['userId', '_id', 'customerType', 'paymentType', 'shipmentType']);
      this.setState({ customerAssociation });
    }

    if (nextProps.userList.length) {
      console.log(nextProps.userList, "nextProps.userList")
      this.setState({ userList: nextProps.userList });
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
    // alert("addtocart")
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
    let itemCat = this.state.getItemCatalogue.searchResult;
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
      element.material=result[0].material;
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
    //alert(e.target.value,"value")
    if (e.target.value == "") {
      this.setState({
        contractState: false
      })
    }
  }
  getCustomerAssociationType(userID) {
    console.log(userID, "userID")
    this.props.actions.generalProcess(constants.getCustomerAssociation,
      { data: { userId: userID } });

  }
  searchItem(e) {
    e.preventDefault();
    let itemData = this.state.itemCatalogue.length > 0 ? this.state.itemCatalogue : alert("not found itemcat")
    let result = this.state.contracts.filter(obj => {
      return obj.contractID == document.getElementById('contractID').value
    })


    this.contractData.contractID = result[0].contractID;
    this.contractData.startDate = result[0].startDate;
    this.contractData.endDate = result[0].endDate;
    this.contractData.customerID = result[0].customerID;
    this.contractData.contractID ? this.setState({ contractState: true }) : this.setState({ contractState: false })

    console.log("this.state.userList", this.state.userList)
    let getUserID = this.state.userList.filter(obj => {
      return obj.orgCode == this.contractData.customerID
    })
    let userID = getUserID[0]._id;
    this.getCustomerAssociationType(userID)

    // let shipmentType = this.state.customerAssociation ? this.state.customerAssociation.shipmentType : ""
    // let paymentType = this.state.customerAssociation ? this.state.customerAssociation.paymentType : ""
    // console.log(shipmentType, "shipment")

    // this.contractData.shipmentType = shipmentType;
    // this.contractData.paymentType = paymentType;


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
    let items =
    {
      searchResult: result[0].items,
      pageData: {
        currentPageNo: this.state.currentPageNo ? this.state.currentPageNo : 1,
        pageSize: 8,
        totalRecords: result[0].items.length
      }
    }

    this.setState({
      getItemCatalogue: items
    })
  }

  render() {
    console.log(this.state.contracts ? this.state.contracts : "<<<<< contracts")
    //console.log(this.state.getItemCatalogue ? this.state.getItemCatalogue : [], "RENEDER DATA")
    let masterContract = this.state.contracts ? this.getContractDetails() : []
    if (!this.state.isLoading)
      return (
        <div>

          {!this.state.createOrder && <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="masthead">
                <form className="navbar-search" method="get" autoComplete="off" onSubmit={this.searchItem}>
                  <label className="sr-only screen-reader-text" htmlFor="search">Select Master Contract:</label>
                  <div className="input-group">
                    <div className="input-search-field">
                      <input type="text" id="search" className="form-control search-field product-search-field"
                        dir="ltr" name="" id="" placeholder="Select Master Contract" autoComplete="off" />
                    </div>

                    <div className="input-group-addon search-categories">
                      <select name="contractID" id="contractID"
                        onChange={(e) => this.handleOnChange(e)}
                        className="postform resizeselect"
                        style={{ width: "143px" }}>
                        <option value="">All Contracts</option>
                        {masterContract.map((contract, index) => {
                          return <option key={index} className="level-0"
                            value={contract}>{contract}</option>;
                        })}
                      </select>
                    </div>
                    <div className="input-group-btn">
                      <button type="submit" className="btn btn-secondary"><i className="fa fa-search"
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

                <div className="col-md-4" style={{ paddingLeft: "75px" }}>
                  <img className="img-thumbnail img-rounded"
                    style={{ height: "150px", width: "200px" }}
                    src="/assets/Resources/etihad.png"
                  //src={this.contractData.image}
                  />
                </div>
              </div>
            </div>}
          <br />

          {
            !this.state.createOrder && !this.state.isLoading2 &&
            <Portlet title="Product Catalogue">
              <Row>
                {this.state.contractState && this.state.getItemCatalogue && this.state.getItemCatalogue.searchResult &&
                  this.state.getItemCatalogue.searchResult.map((item, index) => {
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
                {this.state.getItemCatalogue &&
                  this.state.getItemCatalogue.pageData && <Pagination
                    activePage={this.state.getItemCatalogue.pageData.currentPageNo}
                    itemsCountPerPage={this.state.getItemCatalogue.pageData.pageSize}
                    totalItemsCount={this.state.getItemCatalogue.pageData.totalRecords}
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
    // typeData: state.app.typeData.data,
    userList: _.get(state.app, 'userList.data.searchResult', []),
    itemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
    customerAssociation: _.get(state.app, 'getCustomerAssociationDetail.data', {}),
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
