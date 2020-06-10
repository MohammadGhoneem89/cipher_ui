import React from "react";
import * as constants from "../../../../core/constants/Communication";
import * as utils from '../../../../core/common/utils.js';
const Product = props => {
  const { onClick, details } = props;

  const addDefaultSrc = (e) => {
    e.target.src = "/assets/Resources/images/default.png"
  };
  let price = details.price ? details.price : details.unitPrice;
  let colors = details.color;
  let colorObj = [];

  for (let i = 0; i < colors.length; i++) {
    let label = colors[i];
    let value = colors[i];
    if (colors[i] == 'Natural') {
      value = 'Black'
    }
    else if (colors[i] == 'Ivory') {
      value = 'Black'
    }
    else value = 'white'
    let obj = {
      label, value
    }
    colorObj.push(obj)
  }
  console.log("colorObj ::  ", colorObj);
  return <div className="procard">
    {(details.receivedQuantity == 0 || details.receivedQuantity > 0) && <div className="counterbadge">
      <span>{details.receivedQuantity}
      </span>
    </div>}
    <div>

      <div className="text-center proimg" onClick={onClick.bind(this, details)}>
        <img src={constants.ipfsGet + details.image.hash} style={{ height: "inherit" }} onError={addDefaultSrc} />
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
        <img src="/assets/Resources/cart.png" />
      </button>
    </div>
    <hr />
    <div className="row">
      <div className="col-md-6">
        <label className="qty">Color
        <span style={{ color: 'red', verticalAlign: 'top' }}> *</span>
        </label>
        <select name="color" className="form-control" >
          <option value="">Select</option>

          {colorObj.map((obj) => {
            return <option style={{ backgroundColor: obj.label, color: obj.value }} >{obj.label}
            </option>
          })}
        </select>
      </div>
      <div className="col-md-6">
        <label className="qty">Qty
        <span style={{ color: 'red', verticalAlign: 'top' }}> *</span>
        </label>

        <input type="number" min="0" name="quantity" defaultValue={0} className="form-control" />
        <input type="string" name="itemCode" value={details.itemCode} className="form-control" style={{ display: "none" }} />
        <input type="string" name="price" value={price} className="form-control" style={{ display: "none" }} />
        <input type="string" name="name" value={details.name} className="form-control" style={{ display: "none" }} />
        <input type="string" name="image" value={constants.ipfsGet + details.image.hash} className="form-control" style={{ display: "none" }} />
      </div>
    </div>

  </div>;
};


export default Product;