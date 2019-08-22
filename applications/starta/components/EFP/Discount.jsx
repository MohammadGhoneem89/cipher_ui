import React, { PropTypes } from 'react';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from "../../../../core/common/utils";
import Table from '../../../../core/common/Datatable.jsx';
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


    return <Portlet title={utils.getLabelByID("")}
        noCollapse={true} actions={actions}>

        
        {/* style={{ height: "10px", weight: "20px" }} */}
        <div className="row" style={{display: "block", margin: "auto", position: "relative", textAlign: "-webkit-center"}}>
            <div className="col-md-16" style={{ padding: "0px" }}>
                <img className="img-circle"  style={{ border: "1px solid grey", height: "150px", weight: "150px", position: "relative", display: "block", margin: "auto"}}  src= {parent.props.getMasterAgreementView[0].additionalInfo[parent.state.selectedIndex].image}/>
            </div>
            <div className="col-md-12" style={{ padding: "15px", float: "left", fontSize: "x-large", position: "relative", display: "block", margin: "auto", textAlign: "-webkit-center"}}>
                <label className="control-label" style={{ fontWeight: "bold", textAlign: "center" }}> {parent.props.getMasterAgreementView[0].additionalInfo[parent.state.selectedIndex].itemDescription}</label>
            </div>
        </div>
   {console.log(parent.state.gridDataItem[parent.state.selectedIndex].discounts,"$$$$$$$$$$$$$$$$$$")}
        
        <Portlet title={"Master Agreement Level Rebate"}>
            <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementDISCOUNT")}
                gridData={parent.state.gridDataItem[parent.state.selectedIndex].discounts}
                fontclass="" />
        </Portlet>
        
        <Portlet title={"Order Level Rebate"}>
            <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementDISCOUNT")}
                gridData={parent.state.gridDataItem[parent.state.selectedIndex].itemwiseDiscount}
                fontclass="" />
        </Portlet>
        
    </Portlet>;


};
export default Discount;