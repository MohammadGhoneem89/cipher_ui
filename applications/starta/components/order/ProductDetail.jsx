import React from "react";
import Row from "../../common/Row.jsx";
import Portlet from "../../common/Portlet.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";
import Input from "../../common/Input.jsx";
import * as constants from "../../../../core/constants/Communication";
import * as utils from '../../../../core/common/utils.js';
const ProductDetail = props => {
  const addDefaultSrc = (e) => {
    e.target.src = "/assets/Resources/images/default.png"
  }
  const { onClick, details, state } = props;
  let price = details.price ? details.price : details.unitPrice;

  return (
    <Portlet title="Product Details">
      <div className="row productdetails">
        <div className="col-md-4 text-center">
          <div className="prodetailsimg productImg">
            <img src={constants.ipfsGet + details.image.hash} onError={addDefaultSrc} width="100%" style={{ height: "inherit" }} />
          </div>
        </div>
        <div className="col-md-8 text-left">
          <div className="Prodetails">
            <h2 className="DProName">{details.name}</h2>
            <h4
              className="Dprice"><b>AED {utils.formatAmountField(price)}</b>
            </h4>
            <p className="dprpDesc">{details.description}</p>
          </div>
          <div className="form-group margin">
            <div className="row">
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Name :</label>
              </div>
              <div className="col-md-3 "><span>{details.name}</span></div>
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Material :</label>
              </div>
              <div className="col-md-3 "><span>{details.material}</span></div>
            </div>
          </div>
          <div className="form-group margin">
            <div className="row">
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Part number :</label>
              </div>
              <div className="col-md-3 "><span>{details.partNumber}</span></div>
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Model Volume :</label>
              </div>
              <div className="col-md-3 "><span>{details.modelVolume}</span></div>
            </div>
          </div>
          <div className="form-group margin">
            <div className="row">
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Price :</label>
              </div>
              <div className="col-md-3 "><span>{utils.formatAmountField(price)}</span></div>
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Support Volume :</label>
              </div>
              <div className="col-md-3 "><span>{details.supportVolume}</span></div>
            </div>
          </div>
          <div className="form-group margin">
            
            <div className="row">
              <div className="col-md-3 ">
                <label className="bold" style={{ overflowWrap: "inherit" }}>Print Time :</label>
              </div>
              <div className="col-md-3 "><span>{details.printTime}</span>
              </div>
              {!(details.receivedQuantity===undefined) && (
                <div className="">
                  <div className="col-md-3 ">
                    <label className="bold" >Received Qty :</label>
                  </div>
                  <div className="col-md-3 ">
                    <span>{details.receivedQuantity}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className="form-group margin">
        <div className="row">
          <div className="col-md-12">
            <div className="filebtn">
              <a href="#" className="btn stratabtnstyle">CAD File</a>
              <a href="#" className="btn stratabtnstyle manufacture">Manufacturing File</a></div>
          </div>
        </div>
      </div> */}
          <br />
        </div>
        

      </div>


      <div className="row">
        <div className="col-md-2">
          <label className="qty">Color</label>
          <select name="color" className="form-control" required>
            <option value="">Select</option>
            {details.color.map(item => {
              return <option style={{ backgroundColor: item, color: "white" }}>{item}</option>
            })}
          </select>
        </div>

        <div className="col-md-1">
            <label className="qty">Qty</label>
            <input type="number" min="0" name="quantity" defaultValue={0} className="form-control" required />
            <input type="string" name="itemCode" value={details.itemCode} className="form-control" style={{ display: "none" }} />
            <input type="string" name="price" value={price} className="form-control" style={{ display: "none" }} />
            <input type="string" name="name" value={details.name} className="form-control" style={{ display: "none" }} />
            <input type="string" name="image" value={constants.ipfsGet + details.image.hash} className="form-control" style={{ display: "none" }} />
        </div>


        <div className="col-md-1">
          <button type="submit" className="Addcart" style={{ position: "unset", bottom: "0px" }}>
              <img src="/assets/Resources/cart.png" style={{marginTop: "40px"}} />
            </button>
        
        </div>

        <div className="col-md-8 text-right">
          <a className="btn stratabtnstyle" onClick={props.closeModalBox}>Close</a>
        </div>
      </div>

    </Portlet>);
};


export default ProductDetail;