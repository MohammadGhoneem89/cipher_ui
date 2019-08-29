import React from "react";
import * as constants from "../../../../core/constants/Communication";

const Product = props => {
  const {onClick, details} = props;
  return <div className="procard">
    {details.receivedQuantiy > 0 && <div className="counterbadge"><span>{details.receivedQuantiy}</span></div>}
    <div onClick={onClick.bind(this, details)}>
      <div className="text-center proimg"><img src={constants.ipfsGet+details.image.hash}/></div>
      <a>
        <h3>{details.name}</h3>
      </a>
      <label>AED {details.price}</label>
    </div>
    <hr/>
    <div className="row">
      <div className="col-md-4">
        <label className="qty">Color</label>
      </div>
      <div className="col-md-8">
        <select name="color" className="form-control" required="required">
          <option value="">Select</option>
          {details.color.map(item => {
            return <option style={{backgroundColor: item, color: "white"}}>{item}</option>
          })}

        </select>
      </div>
      <div className="col-md-4">
        <label className="qty">Qty</label>
      </div>
      <div className="col-md-8">
        <input type="number" name="quantity" min="0" className="form-control" required="required"/>


        <input type="string" name="itemCode" value={details.itemCode} className="form-control"
               style={{display: "none"}}/>
        <input type="string" name="price" value={details.price} className="form-control"
               style={{display: "none"}}/>
        <input type="string" name="name" value={details.name} className="form-control"
               style={{display: "none"}}/>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <button type="submit" className="btn stratabtnstyle addcart full">
          Add To Cart <i className="fa fa-shopping-cart"/>
        </button>
      </div>
    </div>
  </div>;
};


export default Product;