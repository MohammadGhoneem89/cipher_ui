import React from "react";
import * as constants from "../../../../core/constants/Communication";
import * as utils from '../../../../core/common/utils.js';
const Product = props => {
  const {onClick, details} = props;
  let price = details.price ? details.price : details.unitPrice;
  return <div className="procard">
    <div>
      <div className="text-center proimg" onClick={onClick.bind(this, details)}>
        <img src={constants.ipfsGet + details.image.hash}/>
      </div>
      <a><h3>{details.name}</h3></a>
      
      <label>
       Material : {details.material}
      </label>
      </div>
      <div>
      <label>
        AED {utils.formatAmountField(price)}
      </label>
      
      <button type="submit" className="Addcart">
        <img src="/assets/Resources/cart.png"/>
      </button>
    </div>
    <hr/>
    <div className="row">
      <div className="col-md-6">
        <label className="qty">Color</label>
        <select name="color" className="form-control" required>
          <option value="">Select</option>
          {details.color.map(item => {
            return <option style={{backgroundColor: item, color: "white"}}>{item}</option>
          })}
        </select>
      </div>
      <div className="col-md-6">
        <label className="qty">Qty</label>
        <input type="number" min="0" name="quantity" defaultValue={0} className="form-control" required/>
        <input type="string" name="itemCode" value={details.itemCode} className="form-control" style={{display: "none"}}/>
        <input type="string" name="price" value={price} className="form-control" style={{display: "none"}}/>
        <input type="string" name="name" value={details.name} className="form-control" style={{display: "none"}}/>
        <input type="string" name="image" value={constants.ipfsGet + details.image.hash} className="form-control" style={{display: "none"}}/>
      </div>
    </div>

  </div>;
};


export default Product;