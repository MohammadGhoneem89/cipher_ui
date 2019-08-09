/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../core/actions/generalAction";

import * as utils from "../../../../core/common/utils.js";
import * as constants from "../../../../core/constants/Communication";
import * as requestCreator from "../../../../core/common/request.js";

//Custom Components
import Select from "../../common/Select.jsx";
import Div from "../../common/Div.jsx";
import Row from "../../common/Row.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";
import Input from "../../common/Input.jsx";
import Portlet from "../../common/Portlet.jsx";
import ModalBox from '../../../../core/common/ModalBox.jsx';

import * as gen from "../../common/generalActionHandler";

class OneTimeOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            itemsCatalogue: [],
            modelBox: false,
            modelItem: {},
            cartItems: [],
            typeData: { "et-flow": [{ lable: "kamran", value: "haider" }] }
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.openModalBox = this.openModalBox.bind(this);
        this.closeModalBox = this.closeModalBox.bind(this);
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemCatalogue, {
            "body": {
                // "page": {
                //     "currentPageNo": 1,
                //     "pageSize": 10
                // },
                // "searchCriteria": {
                //     "itemCode": "item10022"
                // "description":"Dust Fan",
                // "material":"steel"
                // }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.itemsCatalogue) {
            console.log(nextProps.itemsCatalogue, "ITEMCAT")
            this.setState({
                isLoading: false,
                itemsCatalogue: nextProps.itemsCatalogue
            });
        }
    }

    openModalBox(modelItem) {
        console.log('item', modelItem);
        this.setState({
            modelBox: true,
            modelItem
        });


    }

    addToCart(cartItem) {
        console.log('item', cartItem);
        let cart = [...this.state.cartItems];
        cart.push(cartItem);
        this.setState({
            cartItems: cart
        });
        console.log('item', cart);

    }

    closeModalBox() {
        this.setState({ modelBox: false });

    }

    render() {
        if (!this.state.isLoading)
            return (
                <Row>
                    <Div className="masthead">
                        <Input
                            fieldname="search"
                            formname="ruleDefination"
                            columns="3"
                            state={this.state}
                            style={{ width: "250%", paddingLeft: "5px" }}
                            actionHandler={this.generalHandler}
                            className="search-field productSearch"
                            placeholder="Search For Products"
                        />
                        <Div className="input-group-addon search-categories">
                            <Select
                                fieldname="product_cat"
                                formname="ruleDefination"
                                columns="4"
                                style={{}}
                                state={this.state}
                                typeName="et-flow"//KEY
                                dataSource={this.state.typeData}
                                multiple={false}
                                actionHandler={this.generalHandler}
                                className="postform resizeselect dropmenu"
                            />
                        </Div>
                        <Div className="input-group-addon option">
                            <Select
                                fieldname="product_cat"
                                formname="ruleDefination"
                                columns="4"
                                style={{}}
                                state={this.state}
                                typeName="et-flow"
                                dataSource={this.state.typeData}
                                multiple={false}
                                actionHandler={this.generalHandler}
                                className="postform resizeselect dropmenu"
                            />
                        </Div>
                        <Div className="input-group-btn">
                            <button type="submit" className="btn btn-secondary">
                                <i className="fa fa-search btn-img" aria-hidden="true"></i>
                            </button>
                        </Div>
                        <Div className="carticon cart-set">
                            <a href="#">
                                <img src="/assets/blkimgs/cart.png" style={{ width: "30px" }} />
                            </a>
                            {/* <button type="submit" className="btn btn-secondary"><i className="fa fa-shopping-cart btn-img" aria-hidden="true"></i></button> */}
                        </Div>
                        <Div></Div>
                        {/* dlsjflaj */}
                    </Div>

                    <Row>
                        <Portlet title="Product Catelogue">
                            <Row>
                                {this.state.itemsCatalogue.map((item, index) => {

                                    console.log(item, "ITEM")
                                    return (
                                        <Col col="3" key={index}>
                                            <Div className="procard hov procards">
                                                <Div className="counterbadge span-product">
                                                    <span>40</span>
                                                </Div>
                                                <Div className="clear"></Div>
                                                <Div className="text-center proimg">
                                                    <img src="/assets/blkimgs/product1.png" />
                                                </Div>
                                                <a href="#">
                                                    <h3 className="pull-left" onClick={() => { this.openModalBox(item) }}>{item.name}</h3>
                                                </a>
                                                <Label text={"AED " + item.price} />
                                                <hr />
                                                <Row>
                                                    <Col col="5">
                                                        <a href="#" onClick={() => { this.addToCart(item) }}>
                                                            <img
                                                                src="/assets/blkimgs/cart.png"
                                                                className="addcart cart"
                                                            />
                                                        </a>
                                                    </Col>
                                                    <Col col="3">
                                                        <label className="qty qty-label">Qty</label>
                                                    </Col>
                                                    <Col col="4">
                                                        <Input
                                                            type="number"
                                                            className="form-control new-form"
                                                            formname={`itemsCatalogue[${index}]`}
                                                            fieldname="qty"
                                                            actionHandler={this.generalHandler}
                                                            value={item.qty}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Div>
                                            <div className="seprator" />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Portlet>
                    </Row>
                    <ModalBox isOpen={this.state.modelBox ? true : false}>
                        <Row>
                            <Portlet title="Product Details">
                                <Row>
                                    <Div className="col-md-4 text-center">
                                        <Div className="prodetailsimg productImg">
                                            <img src="/assets/blkimgs/product1.png" width="100%" />
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
                                                Below is breakdown of an example of the meta data that
                                                describes the producation information of the part. A
                                                seperate STL file of the CAD describes the part geometry
                                                and is the expected data format from the customer.
                                                Another CMB file is created from the STL file which
                                                describes the manufacturing parameters and paths for
                                                manufacturing the part</p>
                                        </Div>
                                        <Div className="form-group margin">
                                            <Row>
                                                <Col col="3">
                                                    <Label className="bold" text="Name" />
                                                </Col>

                                                <Col col="3">
                                                    <span>{this.state.modelItem.name}</span>
                                                </Col>
                                                <Col col="3">
                                                    <Label className="bold" text="Model Material" />
                                                </Col>
                                                <Col col="3">
                                                    <span>{this.state.modelItem.material}</span>
                                                </Col>
                                            </Row>
                                        </Div>

                                        <Div className="form-group margin">
                                            <Row>
                                                <Col col="3">
                                                    <Label className="bold" text="Part number" />
                                                </Col>
                                                <Col col="3">
                                                    <span>{this.state.modelItem.partNumber}</span>
                                                </Col>
                                                <Col col="3">
                                                    <Label className="bold" text="Model valume:" />
                                                </Col>
                                                <Col col="3">
                                                    <span>{this.state.modelItem.modelVolume}</span>
                                                </Col>
                                            </Row>
                                        </Div>
                                        <Div className="form-group margin">
                                            <Row>
                                                <Col col="3">
                                                    <Label className="bold" text="Price:" />
                                                </Col>
                                                <Col col="3">
                                                    <span>{this.state.modelItem.price}</span>
                                                </Col>
                                                <Col col="3">
                                                    <Label className="bold" text="Support Volume" />
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
                                                        text="Print Time:" />
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

                                        <br />

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
                    <Portlet title="Create Order">
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
                                        style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }} >
                                        <Row>
                                            <Div className="text-center proimg">
                                                <img
                                                    className="pull-left"
                                                    src="/assets/blkimgs/product1.png"
                                                    style={{ width: "20px" }}
                                                />
                                                <span className="pull-left">{item.name}</span>
                                            </Div>
                                        </Row>
                                    </Col>

                                    <Col
                                        col="2"
                                        style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
                                        <Label text={item.material} />
                                    </Col>

                                    <Col
                                        col="2"
                                        style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
                                        <Label text={item.selectedColor} />
                                    </Col>

                                    <Col
                                        col="2"
                                        style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
                                        <span>AED {item.price}</span>
                                    </Col>

                                    <Col
                                        col="1"
                                        style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
                                        <span>{item.qty}</span>
                                    </Col>

                                    <Col
                                        col="2"
                                        style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
                                        <span>AED 5000</span>
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
                                style={{ border: "2px solid grey", height: "50px", paddingTop: "12px" }}
                            >
                                <span style={{ color: "#c20c35" }}>AED 5000</span>
                            </Col>
                        </Row>
                    </Portlet>

                </Row>
            );
        else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
    }
}

function mapStateToProps(state, ownProps) {
    //console.log("statestate", state.app);
    return {
        //itemsCatalogue: _.get(state.APP, "getItemCatalogue.searchResult", {"body": {}})
        itemsCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        pageData: _.get(state.app, 'getItemCatalogue.pageData', {})
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
