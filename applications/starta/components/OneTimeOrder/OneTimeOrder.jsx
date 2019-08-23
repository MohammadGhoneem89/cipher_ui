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
import Input from "../../common/Input.jsx";
import Portlet from "../../common/Portlet.jsx";
import ModalBox from '../../../../core/common/ModalBox.jsx';
import Product from './Product.jsx';
import Pagination from "react-js-pagination";

import * as gen from "../../common/generalActionHandler";
import Combobox from "../../common/Select.jsx";

class OneTimeOrder extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      currentPageNo: 1,
      getItemCatalogue: undefined,
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
  }

  getRequest = (currentPageNo) => {
    let searchCriteria = {};
    // this.setState({searchCriteria: searchCriteria});
    let request = {
      "body": {
        "page": {
          "currentPageNo": currentPageNo || this.state.currentPageNo || 1,
          "pageSize": 4
        },
        "searchCriteria": searchCriteria
      }
    };
    this.props.actions.generalProcess(constants.getItemCatalogue, request);
    this.setState({currentPageNo, isLoading: true})
  };

  componentWillMount() {
    // let createOrd = document.getElementById('createOrder');
    // createOrd.style.visibility = false;
  }

  componentDidMount() {
    this.getRequest();
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      getItemCatalogue: nextProps.getItemCatalogue,
      // typeData: nextProps.typeData,
      isLoading: false
    })
    // this.getItemName(nextProps.getItemCatalogue);
  }

  openModalBox(modelItem) {
    console.log('item', modelItem);
    this.setState({
      modelBox: true,
      modelItem
    });


  }

  addToCart(cartItem) {
    let grandTotal = 0;
    let cart = [...this.state.cartItems];

    cart.push(cartItem);
    cart.forEach(element => {
      element.total = element.qty * element.price
    });
    cart.forEach(element => {
      grandTotal += element.total
    });

    this.setState({
      cartItems: cart,
      grandTotal: grandTotal,
      itemAddedToCart: true
    });
    console.log('cart', cart);
  }
  handlePageChange(pageNumber) {
    //alert(`active page is ${pageNumber}`);
    this.getRequest(pageNumber);
  }

  checkout = () => {
    if (this.state.itemAddedToCart) {
      alert("Checkout successful!");
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

  render() {
    // console.log("item cat", this.state.getItemCatalogue)
    let categories = ["Computer Components", "Accessories", "Cameras & Photography", "Computer Components", "Gadgets", "Home Entertainment", "Laptops & Computers", "Printers & Ink", "Smart Phones & Tablets", "Video Games & Consoles"];

    if (!this.state.isLoading)
      return (
        <Row>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="masthead">
                <form className="navbar-search" method="get" autoComplete="off">
                  <label className="sr-only screen-reader-text" htmlFor="search">Search for:</label>
                  <div className="input-group">
                    <div className="input-search-field">
                      <input type="text" id="search" className="form-control search-field product-search-field"
                             dir="ltr" value="" name="s" placeholder="Search for Products" autoComplete="off"/>
                    </div>
                    <div className="input-group-addon search-categories">
                      <select name="searchType" id="product_cat" className="postform resizeselect"
                              style={{width: "143px"}}>
                        <option value="Name">Name</option>
                        <option className="level-0" value="Description">Description</option>
                        <option className="level-0" value="Material">Material</option>
                      </select>
                    </div>
                    <div className="input-group-addon search-categories">
                      <select name="product_cat" id="product_cat" className="postform resizeselect"
                              style={{width: "143px"}}>
                        <option value="All">All Categories</option>
                        {categories.map((item, index) => {
                          return <option key={index} className="level-0">{item}</option>;
                        })}
                      </select>
                    </div>
                    <div className="input-group-btn">
                      <input type="hidden" id="search-param" name="post_type" value="product"/>
                      <button type="submit" className="btn btn-secondary"><i className="fa fa-search"
                                                                             aria-hidden="true"/></button>
                    </div>
                  </div>
                </form>
                <div className="cartitemcount"><span>40</span></div>
                <div className="carticon">
                  <a href="#"><img src="/assets/Resources/cart.png"/></a>
                </div>
              </div>
            </div>
          </div>

          <Row>
            {!this.state.createOrder && <Portlet title="Product Catalogue">
              <Row>
                {/* {console.log(this.state.getItemCatalogue, "this.state.getItemCatalogue")} */}
                {this.state.getItemCatalogue.searchResult && this.state.getItemCatalogue.searchResult.map((item, index) => {

                  // console.log(item, "ITEM")
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
              {this.state.getItemCatalogue.pageData && <Pagination
                activePage={this.state.getItemCatalogue.pageData.currentPageNo}
                itemsCountPerPage={this.state.getItemCatalogue.pageData.pageSize}
                totalItemsCount={this.state.getItemCatalogue.pageData.totalRecords}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />}
            </Portlet>}
          </Row>
          <ModalBox isOpen={this.state.modelBox ? true : false}>
            <Row>
              <Portlet title="Product Details">
                <Row>
                  <Div className="col-md-4 text-center">
                    <Div className="prodetailsimg productImg">
                      <img src="/assets/blkimgs/product1.png" width="100%"/>
                    </Div>
                  </Div>

                  <Col col="8" className="text-left">
                    <Div className="Prodetails">
                      <h2 className="DProName">{this.state.modelItem.name}</h2>
                      <h4 className="Dprice">
                        {" "}
                        <b>AED {this.state.modelItem.price} </b>
                      </h4>
                      <p className="dprpDesc">
                        {this.state.modelItem.description}</p>
                    </Div>
                    <Div className="form-group margin">
                      <Row>
                        <Col col="3">
                          <Label className="bold" text="Name"/>
                        </Col>

                        <Col col="3">
                          <span>{this.state.modelItem.name}</span>
                        </Col>
                        <Col col="3">
                          <Label className="bold" text="Model Material"/>
                        </Col>
                        <Col col="3">
                          <span>{this.state.modelItem.material}</span>
                        </Col>
                      </Row>
                    </Div>

                    <Div className="form-group margin">
                      <Row>
                        <Col col="3">
                          <Label className="bold" text="Part number"/>
                        </Col>
                        <Col col="3">
                          <span>{this.state.modelItem.partNumber}</span>
                        </Col>
                        <Col col="3">
                          <Label className="bold" text="Model valume:"/>
                        </Col>
                        <Col col="3">
                          <span>{this.state.modelItem.modelVolume}</span>
                        </Col>
                      </Row>
                    </Div>
                    <Div className="form-group margin">
                      <Row>
                        <Col col="3">
                          <Label className="bold" text="Price:"/>
                        </Col>
                        <Col col="3">
                          <span>{this.state.modelItem.price}</span>
                        </Col>
                        <Col col="3">
                          <Label className="bold" text="Support Volume"/>
                        </Col>
                        <Col col="3">
                          <span>{this.state.modelItem.supportVolume}</span>
                        </Col>
                      </Row>
                    </Div>
                    <Div className="form-group margin">
                      <Row>
                        <Col col="3">
                          <Label
                            className="bold"
                            text="Print Time:"/>
                        </Col>
                        <Col col="3">
                          <span>{this.state.modelItem.printTime}</span>
                        </Col>
                      </Row>
                    </Div>

                    <Div className="form-group margin">
                      <Row>
                        {/* <div className="col-md-12"> */}
                        <Div className="filebtn">
                          <a href="#" className="btn stratabtnstyle">
                            CAD File{" "}
                          </a>
                          <a href="#"
                             className="btn stratabtnstyle manufacture">
                            Manufacturing File</a>
                        </Div>
                      </Row>
                    </Div>

                    <br/>

                    <Div className="form-group margin">
                      <Row>
                        <Col col="2">
                                                    <span className="qty">
                                                        {" "}
                                                      <b>Qty</b>
                                                    </span>
                          <Input
                            type="number"
                            className="form-control Qtycount"
                            fieldname="quantity"
                            formname="Quantity"
                            columns="1"
                            state={this.state}
                            actionHandler={this.generalHandler}
                          />
                        </Col>

                        <Col col="9" className="customcol2">
                          <a href="#" className="btn stratacart">
                            Add to Cart </a>
                        </Col>

                        <a
                          href="#"
                          className="btn stratabtnstyle"
                          onClick={this.closeModalBox}>
                          Close </a>
                      </Row>
                    </Div>
                  </Col>
                </Row>
              </Portlet>
            </Row>
          </ModalBox>

          {this.state.createOrder &&
          <Portlet title="Create Order"
            //noCollapse={this.state.createOrder ? false : true}
          >
            <Row>
              <h4 className="pull-left">
                <b>Total Lead Time: 21 hrs </b>
              </h4>
            </Row>
            <Row>
              <Col col="3">
                                    <span>
                                        <b>Item</b>
                                    </span>
              </Col>

              <Col col="2">
                                    <span>
                                        <b>Material</b>
                                    </span>
              </Col>

              <Col col="2">
                                    <span>
                                        <b>Color</b>
                                    </span>
              </Col>

              <Col col="2">
                                    <span>
                                        <b>Price</b>
                                    </span>
              </Col>

              <Col col="1">
                                    <span>
                                        <b>Qty</b>
                                    </span>
              </Col>

              <Col col="2">
                                    <span>
                                        <b>Total</b>
                                    </span>
              </Col>
            </Row>

            {this.state.cartItems.map((item, index) => {
              return (
                <Row key={index}>
                  <Col
                    col="3"
                    style={{border: "1px solid grey", height: "50px", paddingTop: "12px"}}>
                    <Row>
                      <Div className="text-center proimg">
                        <img
                          className="pull-left"
                          src="/assets/blkimgs/product1.png"
                          style={{width: "20px"}}
                        />
                        <span className="pull-left">{item.name}</span>
                      </Div>
                    </Row>
                  </Col>

                  <Col
                    col="2"
                    style={{border: "1px solid grey", height: "50px", paddingTop: "12px"}}>
                    <Label text={item.material}/>
                  </Col>

                  <Col
                    col="2"
                    style={{border: "1px solid grey", height: "50px", paddingTop: "12px"}}>
                    <Label text={item.selectedColor}/>
                  </Col>

                  <Col
                    col="2"
                    style={{border: "1px solid grey", height: "50px", paddingTop: "12px"}}>

                    <span>AED {item.price}</span>
                  </Col>

                  <Col
                    col="1"
                    style={{border: "1px solid grey", height: "50px", paddingTop: "12px"}}>
                    <span>{item.qty}</span>
                  </Col>

                  <Col
                    col="2"
                    style={{border: "1px solid grey", height: "50px", paddingTop: "12px"}}>
                    <span>AED {item.total}</span>
                  </Col>
                </Row>)
            })}
            <Row>
              <Col col="9"></Col>

              <Col col="1">
                                    <span>
                                        {" "}
                                      <b> Grand Total </b>{" "}
                                    </span>
              </Col>

              <Col
                col="2"
                style={{border: "2px solid grey", height: "50px", paddingTop: "12px"}}
              >

                <span style={{color: "#c20c35"}}>AED {this.state.grandTotal}</span>
              </Col>
            </Row>
          </Portlet>}
        </Row>
      );
    else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  console.log("getItemCatalogue", state.app ? state.app : "waiting for state.app");
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
