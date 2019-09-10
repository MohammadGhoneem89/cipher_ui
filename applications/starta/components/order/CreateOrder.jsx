import React from "react";
import Row from "../../common/Row.jsx";
import Portlet from "../../common/Portlet.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";
import Input from "../../common/Input.jsx";
import * as utils from '../../../../core/common/utils.js';
//import * as constants from "../../../../../../core/constants/Communication";

const CreateOrder = props => {
  const { onClick, cartItems, state, setState, placeOrder } = props;

  console.log(JSON.stringify(cartItems))
  return <Portlet title="Create Order" noCollapse={true}>
    <a
      href="#"
      className="btn stratabtnstyle"
      onClick={() => {
        setState({ createOrder: false });
      }}>
      Add More Items </a>
    <hr />
    <table id="fieldTable" className="table table-bordered table-striped table-responsive ordertable">
      <thead>
        <tr>
          <th className="text-center">Remove</th>
          <th className="col-md-3">Item</th>
          <th className="col-md-2">Material </th>
          <th className="col-md-2">Price(AED)</th>
          <th className="col-md-2">Color</th>
          <th className="col-md-1">Qty</th>
          <th className="col-md-2">Total</th>
        </tr>
      </thead>

      <tbody className="ui-sortable">
        {cartItems.map((item, index) => {
          return <tr>
            <td className="moveCenter"><i className="fa fa-remove" onClick={() => {
              let cart = [...cartItems];
              cart.splice(index, 1);
              let grandTotal = 0;
              cart.forEach(element => {
                element.total = element.quantity * parseInt(element.price)
              });
              cart.forEach(element => {
                grandTotal += element.total
              });
              setState({ cartItems: cart, grandTotal });
            }} /></td>
            <td><img src={item.image} width="40px" /> <span
              className="proname">{item.name}</span></td>
            <td>{item.material}</td>
            <td className="moveRight" style={{
              textAlign: "right",
              fontWeight: 'bold'
            }}>{utils.formatAmountField(item.price)}</td>
            <td><span style={{ float: "left", textTransform: "uppercase" }}>{item.color}</span>
              <div className="colorBox" style={{ backgroundColor: item.color }} /> </td>
            <td className="moveRight" style={{
              textAlign: "right",
              fontWeight: 'bold'
            }}>{utils.formatAmountField(item.quantity)}  </td>
            <td className="moveRight" style={{
              textAlign: "right",
              fontWeight: 'bold'
            }}>{utils.formatAmountField(item.price * item.quantity)}</td>
          </tr>;
        })}
        <tr>
          <td className="text-right" colSpan="5">Grand Total</td>
          <td colSpan="3" className="moveRight">
            <spans style={{ color: "#c20c35", fontWeight: 600, textAlign: "right", }}>{"AED "   + utils.formatAmountField(state.grandTotal)}
            </spans>
          </td>
        </tr>
      </tbody>
    </table>
    <a
      href="#"
      className="btn stratabtnstyle pull-right"
      onClick={() => {
        placeOrder();
      }}>
      Create Order </a>
  </Portlet>;
};


export default CreateOrder;