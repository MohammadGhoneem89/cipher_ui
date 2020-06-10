import React, { PropTypes } from 'react';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from "../../../../core/common/utils";
import Table from '../../../../core/common/Datatable.jsx';

import * as constants from '../../../../core/constants/Communication.js';



const Discount = ({ parent }) => {
    let actions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: (() => {
                parent.setState({ isModalOpen: false })
            })
        }
    ];

    const addDefaultSrc = e => e.target.src = "/assets/Resources/images/default.png";


    return <Portlet title={utils.getLabelByID("")}
        noCollapse={true} actions={actions}>


        {/* style={{ height: "10px", weight: "20px" }} */}
        <div className="row" style={{ display: "block", margin: "auto", position: "relative", textAlign: "-webkit-center" }}>
            <div className="col-md-16" style={{ padding: "0px" }}>
                <img onError={addDefaultSrc} className="img-circle" style={{ border: "1px solid grey", height: "150px", weight: "150px", position: "relative", display: "block", margin: "auto" }} src={constants.ipfsGet + parent.state.agreementDetail.items[parent.state.selectedIndex].image.hash} />
            </div>
            <div className="col-md-12" style={{ padding: "15px", float: "left", fontSize: "x-large", position: "relative", display: "block", margin: "auto", textAlign: "-webkit-center" }}>
                <label className="control-label" style={{ fontWeight: "bold", textAlign: "center" }}> {parent.state.agreementDetail.items[parent.state.selectedIndex].itemImage.name}</label>
            </div>
        </div>

        <Portlet title={"Order Level Rebate"}>
            <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementDISCOUNT")}
                gridData={parent.state.agreementDetail.items[parent.state.selectedIndex].itemWiseDiscount}
                fontclass="" />
        </Portlet>

    </Portlet>;


};
export default Discount;