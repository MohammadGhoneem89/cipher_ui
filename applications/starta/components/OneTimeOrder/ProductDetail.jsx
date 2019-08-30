import React from "react";
import Row from "../../common/Row.jsx";
import Portlet from "../../common/Portlet.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";
import Input from "../../common/Input.jsx";
import * as constants from "../../../../core/constants/Communication";

const ProductDetail = props => {
  const {onClick, details, state} = props;
  return <Portlet title="Product Details">
    <div className="row productdetails">
    <div className="col-md-4 text-center">
      <div className="prodetailsimg productImg"><img src={constants.ipfsGet + details.image.hash} width="100%"/></div>
    </div>
    <div className="col-md-8 text-left">
      <div className="Prodetails">
        <h2 className="DProName">Air Springs</h2>
        <h4
          className="Dprice"><b>AED  500</b>
        </h4>
        <p className="dprpDesc">Air suspension is a type of vehicle suspension powered by an electric or engine-driven
          air pump or compressor. This compressor pumps the air into a flexible bellows, usually made from
          textile-reinforced rubber</p>
      </div>
      <div className="form-group margin">
        <div className="row">
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Name</label>
          </div>
          <div className="col-md-3 "><span>{details.name}</span></div>
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Model Material</label>
          </div>
          <div className="col-md-3 "><span>{details.material}</span></div>
        </div>
      </div>
      <div className="form-group margin">
        <div className="row">
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Part number</label>
          </div>
          <div className="col-md-3 "><span>{details.partNumber}</span></div>
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Model Volume:</label>
          </div>
          <div className="col-md-3 "><span>{details.modelVolume}</span></div>
        </div>
      </div>
      <div className="form-group margin">
        <div className="row">
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Price:</label>
          </div>
          <div className="col-md-3 "><span>{details.price}</span></div>
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Support Volume</label>
          </div>
          <div className="col-md-3 "><span>{details.supportVolume}</span></div>
        </div>
      </div>
      <div className="form-group margin">
        <div className="row">
          <div className="col-md-3 ">
            <label className="bold" style={{overflowWrap: "inherit"}}>Print Time:</label>
          </div>
          <div className="col-md-3 "><span>{details.printTime}</span></div>
        </div>
      </div>
      <div className="form-group margin">
        <div className="row">
          <div className="col-md-12">
            <div className="filebtn">
              <a href="#" className="btn stratabtnstyle">CAD File</a>
              <a href="#" className="btn stratabtnstyle manufacture">Manufacturing File</a></div>
          </div>
        </div>
      </div>
      <br/>
    </div>
    <div className="col-md-12 text-right">
      <a className="btn stratabtnstyle" onClick={props.closeModalBox}>Close</a>
    </div>
    </div></Portlet>;
};


export default ProductDetail;