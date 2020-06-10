import React from "react";
import Row from "../../common/Row.jsx";
import Portlet from "../../common/Portlet.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";
import Input from "../../common/Input.jsx";
import Table from '../../../../core/common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
const Rebate = props => {

    const { closeModalBox, details } = props;
    console.log("details >>>", details)

    return (

        <Portlet title="Rebate">
            <div className="row">
            <Table gridColumns={utils.getGridColumnByName("rebateBox")}
                gridData={details}
                fontclass=""
                pagination={false} />

            <div className="col-md-12">
                <a className="btn stratabtnstyle"style={{float:'right'}} onClick={closeModalBox}>Close</a>
            </div>
            </div>
        </Portlet >

    );
};


export default Rebate;