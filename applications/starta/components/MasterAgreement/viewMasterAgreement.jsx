/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import { baseUrl } from '../../../../core/constants/Communication.js';
import QRCodeJquery from '../../../../core/common/QRCodeJquery.jsx';
import ActionButton from '../../../../core/common/ActionButtonNew.jsx';
import * as requestCreator from '../../../../core/common/request.js';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import Portlet from '../../../../core/common/Portlet.jsx';
import ModalBox from '../../../../core/common/ModalBox.jsx';
import Discount from './Discount.jsx'

class ViewMasterAgreement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            agreementDetail: {
                items: [],
                sla: [],
                penalties: []
            },
            isModalOpen: false,
            selectedIndex: 0,
            orgImgName: ""
        };
    }

    /** unused 
    transformResponse = (getItemList) => {

        let transformItemList = [];
        if (getItemList) {
            // console.log(getItemList, "LISTSSSSSSSS")
            getItemList.map((item) => {
                transformItemList.push({
                    "itemCode": item.itemCode,
                    "supplierItemID": item.supplierItemID,
                    "itemDescription": {
                        "name": item.itemDescription,
                        "imageURL": item.image
                    },
                    "unitPrice": item.unitPrice,
                    "expectedQty": item.expectedQty,
                    "receivedQty": item.receivedQty,
                    "discounts": item.discounts,
                    "itemwiseDiscount": item.itemwiseDiscount,
                    "size": item.size
                });

            });
        }
        return transformItemList;
    }
    */

    addDefaultSrc = e => e.target.src = "/assets/Resources/images/default.png";
    detailsActionHandlers = ({ actionName, index }) => {
        switch (actionName) {
            case "View":
                this.setState({
                    isModalOpen: true,
                    selectedIndex: index
                });

        }
    }

    /** unused
    SLAresponse = (data) => {

        data.forEach( (item) => {
            // console.log("duration --------!!!", item.duration)
            // let s = (((item.duration) % 60000) / 1000).toFixed(0);
            // let d = Math.floor((s) / (3600 * 24));
            // let h = Math.floor((s) % (3600 * 24) / 3600);
            // let m = Math.floor((s) % 3600 / 60);


            // // var seconds = ((millis % 60000) / 1000)
            // let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
            // let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            // let mDisplay = ""
            // let sDisplay = ""
            // if (d <= 0) {
            //     mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
            //     if (h <= 0) {
            //         sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : (item.duration + " milliseconds");
            //     }
            // }


            // item.duration = dDisplay + hDisplay + mDisplay + sDisplay;

            if (item.fromStage == "PO") {
                item.fromStage = "Purchase Order";
            }
            if (item.fromStage == "QC") {
                item.fromStage = "Quality Check";
            }
            if (item.fromStage == "ACK") {
                item.fromStage = "Acknowledged By Supplier";
            }
            if (item.fromStage == "PROD") {
                item.fromStage = "Production";
            }
            if (item.fromStage == "SUBORDER") {
                item.fromStage = "Place Suborder";
            }
            if (item.fromStage == "ACK-SUBORDER") {
                item.fromStage = "Suborder Acknowledged";
            }
            if (item.fromStage == "SHIPPED") {
                item.fromStage = "Shipped";
            }
            if (item.fromStage == "RECIEVED" || item.fromStage == "RECEIVED1") {
                item.fromStage = "Received By Supplier";
            }
            if (item.fromStage == "RECEIVED2") {
                item.fromStage = "Received By Emirates";
            }
            if (item.toStage == "PO") {
                item.toStage = "Purchase Order";
            }
            if (item.toStage == "QC") {
                item.toStage = "Quality Check";
            }
            if (item.toStage == "ACK") {
                item.toStage = "Acknowledged By Supplier";
            }
            if (item.toStage == "PROD") {
                item.toStage = "Production";
            }
            if (item.toStage == "SUBORDER") {
                item.toStage = "Place Suborder";
            }
            if (item.toStage == "ACK-SUBORDER") {
                item.toStage = "Suborder Acknowledged";
            }
            if (item.toStage == "SHIPPED") {
                item.toStage = "Shipped";
            }
            if (item.toStage == "RECIEVED" || item.toStage == "RECEIVED1") {
                item.toStage = "Received By Supplier";
            }
            if (item.toStage == "RECEIVED2") {
                item.toStage = "Received By Emirates";
            }
        });
        // console.log(data, "+++++++++++++++++++++++++NEW DATA");
        return data;

    }
     */

    /** unused 
    penalties = (data) => {
        //   alert(data)
        data.forEach(function (item) {
            if (item.tillStage == "INVOICED") {
                item.tillStage = "Received By Emirates";
            }
            let d = Math.floor((item.greaterThan) / (3600 * 24));
            let h = Math.floor((item.greaterThan) % (3600 * 24) / 3600);
            let m = Math.floor((item.greaterThan) % 3600 / 60);
            let s = Math.floor((item.greaterThan) % 60);

            let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
            let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            let mDisplay = ""
            let sDisplay = ""
            if (d <= 0) {
                mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                if (h <= 0) {
                    sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                }
            }

            item.greaterThan = dDisplay + hDisplay + mDisplay + sDisplay;

        });
        console.log(data, "+++++++++++++++++++++++++NEW DATA");
        return data;

    }
    */

    /** unused 
    updateSLA = (list) => {
        if (list) {

            list.forEach(element => {
                element.SLA.forEach(item => {

                    let d = Math.floor((item.duration) / (3600 * 24));
                    let h = Math.floor((item.duration) % (3600 * 24) / 3600);
                    let m = Math.floor((item.duration) % 3600 / 60);
                    let s = Math.floor((item.duration) % 60);

                    let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
                    let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
                    let mDisplay = ""
                    let sDisplay = ""
                    if (d <= 0) {
                        mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                        if (h <= 0) {
                            sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                        }
                    }
                    return {
                        value: dDisplay + hDisplay + mDisplay + sDisplay,
                    }

                });
            });
        }
    }
    */
    mapSLAResp = (key) => {
        switch (key) {
            case "001":
                return "Order Received"
            case "002":
                return "Purchase Order"
            case "003":
                return "Component Manufacturing"
            case "004":
                return "Part Identification"
            case "005":
                return "Part Inspection"
            case "006":
                return "File Inspection and Identification"
            case "007":
                return "Part Testing"
            case "008":
                return "Assembly"
            case "009":
                return "Paint/Finish"
            case "010":
                return "Dispatched"
            case "011":
                return "Received"
            case "012":
                return "Inspected"
            case "013":
                return "Accepted"
            case "014":
                return "Rejected"
            case "015":
                return "Reviewed"
            case "016":
                return "Concession"
            case "017":
                return "Scrapped"
            case "018":
                return "Payment Order"
            case "019":
                return "Paid"
            case "020":
                return "Invoiced"

        }

    }
    componentDidMount() {
        console.log(this.props, "did mount Props");
        const req = {
            header: {
                username: "strata_api",
                password: "1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75"
            },
            body: {
                contractID: this.props.params.contractID,
                customerID: this.props.params.customerID
            }
        }
        this.props.actions.generalProcess(constants.getMasterAgreementData, req);

        this.props.actions.generalProcess(constants.getOrgImage, requestCreator.createEntityListRequest({
            "currentPageNo": 1,
            "pageSize": 10
        }, {
            "spCode": this.props.params.customerID
        }));

        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "will recieve Props")
        if (nextProps.agreementDetail) {

            let data = [...nextProps.agreementDetail.sla];
            data.map((obj) => {
                obj.fromStage = this.mapSLAResp(obj.fromStage)
                obj.toStage = this.mapSLAResp(obj.toStage)
                return obj
            });

            this.setState({
                agreementDetail: {
                    ...nextProps.agreementDetail,
                    sla: [...data]
                },
                isLoading: false
            });
        }
        if (nextProps.orgImgName) {
            this.setState({
                orgImgName: nextProps.orgImgName
            })
        }
    }

    render() {
        return (
            this.state.isLoading ? <div className="loader"> {utils.getLabelByID("loading")}</div> : (
                <div>
                    <div className="portlet light bordered">
                        <div className="portlet-body">
                            <div className="row">
                                <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
                                    <form className="form-horizontal" role="form">
                                        <div className="form-body" style={{ paddingLeft: "18px" }}>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <label className="control-label" style={{ fontWeight: "bold" }} >
                                                        {"CONTRACT # " + this.state.agreementDetail.contractID}
                                                    </label>

                                                </div>
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group col-md-6" style={{ paddingLeft: 0 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Customer: "}</label>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            {<label className="control-label" >{this.state.agreementDetail.customerID}</label>}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group col-md-6">
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Payment Terms: "}</label>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            {<label className="control-label" >{this.state.agreementDetail.paymentTerms.paymentType}</label>}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group col-md-6">
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Duration: "}</label>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            {<label className="control-label" >{this.state.agreementDetail.paymentTerms.days}</label>}
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group col-md-6" style={{ paddingLeft: 0 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Start Date:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            {<label className="control-label" style={{ paddingLeft: "3px" }}>{this.state.agreementDetail.startDate}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group col-md-6">
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"End Date:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            {<label className="control-label" >{this.state.agreementDetail.endDate}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group col-md-6">
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Shipment Type:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            {<label className="control-label" >{this.state.agreementDetail.shipmentType}</label>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4" style={{ paddingLeft: "90px" }}>
                                                <img className="img-thumbnail img-rounded" style={{ height: "200px", width: "200px" }}
                                                    src={constants.baseUrl + "/" + this.state.orgImgName}
                                                    onError={this.addDefaultSrc}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Portlet title={"ITEM DETAILS"}>
                        {
                            this.state.agreementDetail.items.map((item) => {
                                item.action = [
                                    {
                                        label: utils.getLabelByID("View"),
                                        "iconName": "icon-docs",
                                        "params": "_id",
                                        actionType: "COMPONENT_FUNCTION"
                                    }
                                ]
                                item.rebate = item.itemWiseDiscount.length > 0 ? item.itemWiseDiscount[0].discount : "none"
                                item.itemImage = {
                                    name: item.name,
                                    imageURL: _.get(item, "itemImage.imageURL", "")
                                }
                            })
                        }
                        <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementItem")}
                            gridData={this.state.agreementDetail.items}
                            fontclass=""
                            componentFunction={this.detailsActionHandlers}
                            pagination={false} />
                    </Portlet>


                    <Portlet title={"SLA"}>
                        {
                            console.log(this.state.agreementDetail.sla, "changedddddddddddddd")
                        }
                        <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementSLA")}
                            gridData={this.state.agreementDetail.sla}
                            fontclass=""
                            pagination={false} />
                    </Portlet>

                    <Portlet title={"PENALTIES"}>
                        {
                            this.state.agreementDetail.penalties.map((obj) => {
                                obj.fromStage = "Purchase Order"
                                obj.tillStage = "Shipped"
                            })
                        }
                        <Table
                            gridColumns={utils.getGridColumnByName("viewMasterAgreementPenalties")}
                            gridData={this.state.agreementDetail.penalties}
                            fontclass=""
                            pagination={false} />
                    </Portlet>

                    < div className="row" style={{ padding: "20px" }}>
                        <div className="col-md-12 " >
                            <div className="col-md-3 " >
                                <div className="table100 ver1 m-b-110" >
                                    <div className="table100-head orderdetails-table">
                                        <div className="order-title">Amount Realized</div>
                                    </div>
                                    <div className="" style={{ marginTop: "24px" }}>
                                        <div className="col-md-12 orderdetail-txt">
                                            <div className="col-md-12 text-center">
                                                <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>
                                                    {(Math.round(this.state.agreementDetail.amountRealized)).toLocaleString()}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 " >
                                <div className="table100 ver1 m-b-110" >
                                    <div className="table100-head orderdetails-table">
                                        <div className="order-title">Total Rebate</div>
                                    </div>
                                    <div className="" style={{ marginTop: "24px" }}>
                                        <div className="col-md-12 orderdetail-txt">
                                            <div className="col-md-12 text-center">
                                                <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>
                                                    {(Math.round(this.state.agreementDetail.totalRebate)).toLocaleString()}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 " >
                                <div className="table100 ver1 m-b-110" >
                                    <div className="table100-head orderdetails-table">
                                        <div className="order-title">Total Penalty </div>
                                    </div>
                                    <div className="" style={{ marginTop: "24px" }}>
                                        <div className="col-md-12 orderdetail-txt">
                                            <div className="col-md-12 text-center">
                                                <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>
                                                    {(Math.round(this.state.agreementDetail.totalPenalty)).toLocaleString()}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 " >
                                <div className="table100 ver1 m-b-110" >
                                    <div className="table100-head orderdetails-table">
                                        <div className="order-title">Total Credit Note</div>
                                    </div>
                                    <div className="" style={{ marginTop: "24px" }}>
                                        <div className="col-md-12 orderdetail-txt">
                                            <div className="col-md-12 text-center">
                                                <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>
                                                    {(Math.round(this.state.agreementDetail.creditNoteAmount)).toLocaleString()}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ModalBox isOpen={this.state.isModalOpen}>
                        <Discount parent={this} />
                    </ModalBox>


                </div>
            )
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        agreementDetail: state.app.agreementDetail,
        orgImgName: _.get(state.app, "entityList.data.searchResult[0].entityName.name")
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

ViewMasterAgreement.displayName = "VIEW MASTER AGREEMENT";
export default connect(mapStateToProps, mapDispatchToProps)(ViewMasterAgreement);