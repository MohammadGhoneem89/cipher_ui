import React from "react";

const Product = props => {
  const {onClick, details} = props;
  return <div className="procard">
    {details.receivedQuantiy > 0 && <div className="counterbadge"><span>{details.receivedQuantiy}</span></div>}
    <div onClick={onClick}>
      <div className="text-center proimg"><img src={details.image || "/assets/blkimgs/cart.png"}/></div>
      <a href="#">
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
        <select type="number" name="qty" min="0" className="form-control">
          <option value="">Select</option>
          {details.color.map(item=>{
            return <option style={{backgroundColor: item}}>{item}</option>
          })}
          
        </select>
      </div>
      <div className="col-md-4">
        <label className="qty">Qty</label>
      </div>
      <div className="col-md-8">
        <input type="number" name="qty" min="0" className="form-control"/>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <a href="#" className="btn stratabtnstyle addcart full">
          Add To Cart<i className="icon-cart" />
        </a>
      </div>
    </div>
  </div>;
};


export default Product;