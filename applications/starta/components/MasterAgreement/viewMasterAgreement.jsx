/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as toaster from "../../../../core/common/toaster.js";
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
import Rebate from "./rebate.jsx";
class ViewMasterAgreement extends React.Component {

    constructor(props) {
        super(props);
        this.index = 0;
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
        this.detailsActionHandlers = this.detailsActionHandlers.bind(this);
        this.closeModalBox = this.closeModalBox.bind(this);
    }


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
    detailsActionHandlers({ index }) {
        console.log("INDEX ", index);
        this.index = index;
        this.setState({
            modelBox: true,
        });

    }

    // openModalBox(itemDetail) {
    //     this.setState({
    //         modelBox: true,
    //     });
    // }
    closeModalBox() {
        this.setState({ modelBox: false });
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
        if (nextProps.orgName) {
            this.setState({
                orgName: nextProps.orgName
            })
        }
    }

    approveContract = () => {
        let req = {
            "body": {
                "contractID": _.get(this.state.agreementDetail, "contractID", ""),
                "customerID": _.get(this.state.agreementDetail, "customerID", ""),
                "approvedBy": sessionStorage.orgCode,
                "approvedOn": new Date()
            }
        }
        this.props.actions
            .generalAjxProcess(constants.approvedMasterContract, req)
            .then(result => {
                result.message.status == "ERROR"
                    ? toaster.showToast(result.message.errorDescription, "ERROR")
                    : this.successAction();
            });

    }

    successAction = () => {
        browserHistory.push('/strata/MasterAgreementList')
        toaster.showToast("Contract status updated successfully!");
    }
    render() {

        console.log("sessionStorage.orgType", sessionStorage.orgType)
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
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-3" style={{ paddingLeft: 0 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Customer:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            {
                                                                this.state.orgName ? (
                                                                    <label className="control-label" style={{ textAlign: "initial", whiteSpace: "nowrap" }} >{this.state.orgName}</label>
                                                                ) : (
                                                                        <label className="control-label" style={{ textAlign: "initial", whiteSpace: "nowrap" }} >{this.state.agreementDetail.customerID}</label>
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4" style={{ paddingLeft: -15 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold", textAlign: 'initial' }}>{"Payment Terms: "}</label>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            {<label className="control-label" style={{ wordWrap: 'normal' }} >{this.state.agreementDetail.paymentTerms.paymentType}</label>}
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-3" style={{ paddingLeft: 0 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Start Date:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            {<label className="control-label" >{this.state.agreementDetail.startDate}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4" style={{ paddingLeft: -15 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold", textAlign: 'initial' }}>{"End Date:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            {<label className="control-label" style={{ wordWrap: 'normal' }} >{this.state.agreementDetail.endDate}</label>}
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-3" style={{ paddingLeft: 0 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold" }}>{"Duration: "}</label>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            {<label className="control-label" >{this.state.agreementDetail.paymentTerms.days}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4" style={{ paddingLeft: -15 }}>
                                                            <label className="control-label" style={{ fontWeight: "bold", textAlign: 'initial' }}>{"Shipment Type:"}</label>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                            {<label className="control-label" style={{ wordWrap: 'normal' }} >{this.state.agreementDetail.shipmentType}</label>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4" style={{ paddingLeft: "90px" }}>
                                                <img className="img-thumbnail img-rounded" style={{ height: "200px", width: "200px" }}
                                                    src={constants.baseUrl + this.state.orgImgName}
                                                    onError={this.addDefaultSrc}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Portlet title={"PRODUCT DETAILS"}>
                        {
                            this.state.agreementDetail.items.map((item) => {
                                item.action = [
                                    {
                                        label: utils.getLabelByID("View"),
                                        "iconName": "fa fa-eye",
                                        "params": "_id",
                                        actionType: "COMPONENT_FUNCTION"
                                    }
                                ]
                                item.rebate = item.itemWiseDiscount.length > 0 ?
                                    item.itemWiseDiscount[0].discount : "none"
                                item.itemImage = {
                                    name: item.name,
                                    imageURL: _.get(item, "image.hash", "")
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

                    <ModalBox isOpen={this.state.modelBox ? true : false} >
                        <Rebate
                            details={this.state.agreementDetail.items[this.index].itemWiseDiscount}
                            closeModalBox={this.closeModalBox}
                        />
                    </ModalBox>
                    {sessionStorage.orgType == "CUSTOMER" && _.get(this.state.agreementDetail, "status", "") != "APPROVED" && <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">

                                    <button type="submit" className="btn green" onClick={this.approveContract}
                                    >
                                        {utils.getLabelByID("APPROVE CONTRACT")}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>}

                </div>
            )
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        agreementDetail: state.app.agreementDetail,
        orgImgName: _.get(state.app, "entityList.data.searchResult[0].entityName.imageURL"),
        orgName: _.get(state.app, "entityList.data.searchResult[0].entityName.name")
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

ViewMasterAgreement.displayName = "VIEW MASTER AGREEMENT";
export default connect(mapStateToProps, mapDispatchToProps)(ViewMasterAgreement);