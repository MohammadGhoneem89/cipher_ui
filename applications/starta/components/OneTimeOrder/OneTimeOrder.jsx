/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

import * as gen from "../../common/generalActionHandler";
import Combobox from "../../common/Select.jsx";

class OneTimeOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            getItemCatalogue: undefined,
            modelBox: false,
            modelItem: {},
            cartItems: [],
            itemAddedToCart: false,
            createOrder: false,
            grandTotal: 0,
            //typeData: undefined

            typeData: {
                "search": [{ label: "Name", value: "name" },
                { label: "Description", value: "description" },
                { label: "Material", value: "material" }]
            }
        };
       // this.nameTypeData = [];
        this.total = 0;
        this.generalHandler = gen.generalHandler.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.openModalBox = this.openModalBox.bind(this);
        this.closeModalBox = this.closeModalBox.bind(this);
    }
    getRequest = () => {
        let name = document.getElementById('name') == null ? "" : document.getElementById('name').value;
        let material = document.getElementById('material') == null ? "" : document.getElementById('material').value;
        let description = document.getElementById('description') == null ? "" : document.getElementById('description').value;
        console.log(material, "material", description, "description")
        let searchCriteria = {}
        if (name != "")
            searchCriteria.name = name
        if (description != "")
            searchCriteria.description = description
        if (material != "")
            searchCriteria.material = material

        this.setState({ searchCriteria: searchCriteria })
        let request = {
            "body": {
                searchCriteria
            }
        };
        return request
    }

    insertJson = () => {
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
        alert("insertjson")
    }
    componentWillMount() {
        // let createOrd = document.getElementById('createOrder');
        // createOrd.style.visibility = false;
    }
    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
        // this.props.actions.generalProcess(coreConstants.getTypeData,
        //     requestCreator.createTypeDataRequest([
        //         'description', 'material'
        //     ]));
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.getItemCatalogue", nextProps.getItemCatalogue)
        this.setState({
            getItemCatalogue: nextProps.getItemCatalogue,
           // typeData: nextProps.typeData,
            isLoading: false
        })
       // this.getItemName(nextProps.getItemCatalogue);
    }

    // getItemName = (item) => {
    //     item.forEach(element => {
    //         this.nameTypeData.push(element.name);
    //     });

    //     console.log("nameTypeData", this.nameTypeData)
    //     return this.nameTypeData;
    // }

    openModalBox(modelItem) {
        alert(modelItem)
        console.log('item', modelItem);
        this.setState({
            modelBox: true,
            modelItem
        });


    }

    addToCart(cartItem) {
        let grandTotal = 0;
        let cart = [...this.state.cartItems]

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
    checkout = () => {
        if (this.state.itemAddedToCart) {
            alert("Checkout successful!")
            this.setState({
                createOrder: true
            })
            // let createOrd = document.getElementById('createOrder');
            // createOrd.style.visibility = true;
        }
        else {
            alert("Please add some item to cart!")
        }
    }

    closeModalBox() {
        this.setState({ modelBox: false });

    }

    render() {
        // console.log("item cat", this.state.getItemCatalogue)
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
                            placeholder="Search"
                        />
                        <Div className="input-group-addon option">
                            <Select
                                fieldname="name"
                                id="name"
                                formname="ruleDefination"
                                columns="4"
                                style={{}}
                                state={this.state}
                                typeName="search"//KEY
                                dataSource={this.state.typeData}
                                multiple={false}
                                actionHandler={this.generalHandler}
                                className="postform resizeselect dropmenu"
                            />
                        </Div>

                        <Div className="input-group-btn">
                            <button type="submit" className="btn btn-secondary" onClick={this.insertJson} >
                                <i className="fa fa-search btn-img" aria-hidden="true"></i>
                            </button>
                        </Div>
                        <Div className="carticon cart-set">
                            <a href="#">
                                <img src="/assets/blkimgs/cart.png"
                                    style={{ width: "30px" }}
                                    onClick={() => { this.checkout() }} />
                            </a>

                            {/* <button type="submit" className="btn btn-secondary"><i className="fa fa-shopping-cart btn-img" aria-hidden="true"></i></button> */}
                        </Div>
                        <Div></Div>
                        {/* dlsjflaj */}
                    </Div>

                    <Row>
                        {!this.state.createOrder && <Portlet title="Product Catalogue">
                            <Row>
                                {/* {console.log(this.state.getItemCatalogue, "this.state.getItemCatalogue")} */}
                                {this.state.getItemCatalogue.map((item, index) => {

                                    // console.log(item, "ITEM")
                                    return (
                                        <Col col="3" key={index}>
                                            <Div className="procard hov procards">
                                                <Div className="counterbadge span-product">
                                                    {/* <span>40</span> */}
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
                                                            formname={`getItemCatalogue[${index}]`}
                                                            fieldname="qty"
                                                            actionHandler={this.generalHandler}
                                                            value={item.qty}
                                                        />
                                                    </Col>
                                                    <Col col="3">
                                                        <label className="qty qty-label">Color</label>
                                                    </Col>
                                                    <Col col="5">
                                                        {/* {item.color+" item.color"} */}
                                                        <Select
                                                            fieldname="color"
                                                            formname={`getItemCatalogue[${index}]`}
                                                            typeName="color"
                                                            state={this.state}
                                                            dataSource={item}
                                                            multiple={true}
                                                            actionHandler={this.generalHandler}
                                                            className="postform resizeselect dropmenu"
                                                        />


                                                    </Col>
                                                </Row>
                                            </Div>
                                            <div className="seprator" />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Portlet>}
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
                                                {this.state.modelItem.description}</p>
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

                                            <span>AED  {item.price}</span>
                                        </Col>

                                        <Col
                                            col="1"
                                            style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
                                            <span>{item.qty}</span>
                                        </Col>

                                        <Col
                                            col="2"
                                            style={{ border: "1px solid grey", height: "50px", paddingTop: "12px" }}>
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
                                    style={{ border: "2px solid grey", height: "50px", paddingTop: "12px" }}
                                >

                                    <span style={{ color: "#c20c35" }}>AED {this.state.grandTotal}</span>
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
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        // pageData: _.get(state.app, 'getItemCatalogue.pageData', {})
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
