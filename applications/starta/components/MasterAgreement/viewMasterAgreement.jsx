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

class ViewMasterAgreement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            getPage: undefined,
            isModalOpen: false,
            selectedIndex: 0,
            isLoading: false,
            index: 0,
            gridData: [],
            typeData: undefined,
            gridDataItem: []

        };
        this.pageChanged = this.pageChanged.bind(this);
    }

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

        // console.log("--------------------------------",
        // transformItemList, "UPDATES!!!!!!1111")
        return transformItemList;
    }

    componentWillMount() {
    }

    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        //this.props.actions.generalProcess(constants.getMasterAgreementView, this.getRequest());
    }


    getRequest = () => {
        this.setState({ isLoading: true });

        let contractID = this.props.params.id;

        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize
                },
                "searchCriteria": {
                    "contractId": contractID
                }
            }

        };
        //this.props.actions.generalProcess(constants.getMasterAgreementView, request);
    }
    // formSubmit=()=>{

    // }
    detailsActionHandlers = ({ actionName, index }) => {
        switch (actionName) {
            case "View":
                this.setState({
                    isModalOpen: true,
                    selectedIndex: index
                });

        }
    }


    SLAresponse = (data) => {

        data.forEach(function (item) {
            console.log("duration --------!!!", item.duration)
            let s = (((item.duration) % 60000) / 1000).toFixed(0);
            let d = Math.floor((s) / (3600 * 24));
            let h = Math.floor((s) % (3600 * 24) / 3600);
            let m = Math.floor((s) % 3600 / 60);


            // var seconds = ((millis % 60000) / 1000)
            let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
            let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            let mDisplay = ""
            let sDisplay = ""
            if (d <= 0) {
                mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                if (h <= 0) {
                    sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : (item.duration + " milliseconds");
                }
            }


            item.duration = dDisplay + hDisplay + mDisplay + sDisplay;

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


    componentDidMount() {
        //this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['paymentTerms']));
        //this.props.actions.generalProcess(constants.getMasterAgreementView, this.getRequest());
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getMasterAgreementView) {


            // console.log(nextProps.getMasterAgreementView[0].additionalInfo[0].discounts, "%%%%%%%%%%%%")
            this.setState({
                gridDataDISCOUNT: nextProps.getMasterAgreementView[0].additionalInfo[0].discounts,
                gridDataItem: this.transformResponse(nextProps.getMasterAgreementView[0].additionalInfo),
                gridDataSLA: this.SLAresponse(nextProps.getMasterAgreementView[0].SLA),
                gridDataPenalties: this.penalties(nextProps.getMasterAgreementView[0].penalties),
                typeData: nextProps.typeData,
                isLoading: false,
                getPage: nextProps.getPage
            });

            console.log("--------", this.state.gridDataItem);
        }
    }
    render() {

        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        // if (this.props.getMasterAgreementView) {
        console.log("DATA STATE ---->>>>>>>>>>>>>>>>>>>>>>", this.state.gridDataItem)
        return (
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
                                                    {/* {utils.getLabelByID("CONTRACT # " + this.props.getMasterAgreementView[0].contractId)} */}
                                                </label>

                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Supplier : ")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    {/* <label className="control-label" >{this.props.getMasterAgreementView[0].supplierName}</label> */}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Country : ")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    {/* <label className="control-label" >{this.props.getMasterAgreementView[0].supplierCountry}</label> */}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-8" style={{ paddingLeft: 0 }}>
                                                        <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Start Date:")}</label>
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        {/* <label className="control-label" style={{ paddingLeft: "3px" }}>{this.props.getMasterAgreementView[0].startDate}</label> */}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-6">
                                                        <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("End Date:")}</label>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        {/* <label className="control-label" >{this.props.getMasterAgreementView[0].endDate}</label> */}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Zycus Contract Title : ")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    {/* <label className="control-label" >{this.props.getMasterAgreementView[0].zycusContractTitle}</label> */}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Zycus Contract ID : ")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    {/* <label className="control-label" >{this.props.getMasterAgreementView[0].zycusContractId}</label> */}
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label" style={{ fontWeight: "bold" }}>{utils.getLabelByID("Zycus Buyer Contact : ")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    {/* <label className="control-label" >{this.props.getMasterAgreementView[0].zycusBuyerContact}</label> */}
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-md-4" style={{ paddingLeft: "90px" }}>
                                            <img className="img-thumbnail img-rounded" style={{ height: "200px", width: "200px" }}
                                            // src={this.props.getMasterAgreementView[0].logo}
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
                        this.state.gridDataItem.map((obj) => {

                            obj.action = [

                                {
                                    label: utils.getLabelByID("View"),
                                    "iconName": "icon-docs",
                                    "params": "_id",
                                    actionType: "COMPONENT_FUNCTION"
                                }

                            ]
                        })

                    }

                    <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementItem")}
                        gridData={this.state.gridDataItem}
                        fontclass=""
                        // totalRecords={this.props.getPage.totalRecords}
                        pageSize={10}
                        pageChanged={this.pageChanged}
                        // componentFunction={this.detailsActionHandlers}
                        pagination={false}
                        activePage={this.state.page.currentPageNo} />
                </Portlet>

                <Portlet title={"SLA"}>


                    <Table gridColumns={utils.getGridColumnByName("viewMasterAgreementSLA")}
                        gridData={this.state.gridDataSLA}
                        fontclass=""
                        // totalRecords={this.props.getPage.totalRecords}
                        pageSize={10}
                        pageChanged={this.pageChanged}
                        pagination={false}
                        activePage={this.state.page.currentPageNo} />
                </Portlet>

                <Portlet title={"PENALTIES"}>

                    <Table
                        gridColumns={utils.getGridColumnByName("viewMasterAgreementPenalties")}
                        gridData={this.state.gridDataPenalties}
                        fontclass=""
                        //totalRecords={this.props.getPage.totalRecords}
                        pageSize={10}
                        pageChanged={this.pageChanged}
                        pagination={false}
                        activePage={this.state.page.currentPageNo} />
                </Portlet>

                {/* <div className="order-content">
                        <div className="order-delay-card">
                            */}
                < div className="row" style={{ padding: "20px" }}>
                    <div className="col-md-12 " >
                        <div className="col-md-4 " >
                            <div className="table100 ver1 m-b-110" >
                                <div className="table100-head orderdetails-table">
                                    <div className="order-title">Amount Realized</div>
                                </div>
                                <div className="" style={{ marginTop: "24px" }}>
                                    <div className="col-md-12 orderdetail-txt">

                                        <div className="col-md-12 text-center">
                                            {/* <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>{(Math.round(this.props.getMasterAgreementView[0].amountRealized)).toLocaleString()}</h4> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 " >
                            <div className="table100 ver1 m-b-110" >
                                <div className="table100-head orderdetails-table">
                                    <div className="order-title">Total Rebate</div>
                                </div>
                                <div className="" style={{ marginTop: "24px" }}>
                                    <div className="col-md-12 orderdetail-txt">

                                        <div className="col-md-12 text-center">
                                            <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>
                                                {/* {(Math.round(this.props.getMasterAgreementView[0].totalRebate)).toLocaleString()} */}
                                            </h4>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 " >
                            <div className="table100 ver1 m-b-110" >
                                <div className="table100-head orderdetails-table">
                                    <div className="order-title">Total Penalty </div>
                                </div>
                                <div className="" style={{ marginTop: "24px" }}>
                                    <div className="col-md-12 orderdetail-txt">

                                        <div className="col-md-12 text-center">
                                            {/* <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>{(Math.round(this.props.getMasterAgreementView[0].totalPenalty)).toLocaleString()} */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </div>
                    </div> */}
                <div className="row">
                    <div className="col-md-6" style={{ marginTop: "20px" }}>
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("Payment Terms :")}</label>
                        </div>
                        <div className="form-group col-md-8">
                            <select name="paymentTerms" id="paymentTerms" className="form-control" disabled>
                                {/* <option key="-1" value=""></option> */}
                                {this.state.typeData && this.state.typeData.paymentTerms && this.state.typeData.paymentTerms.map((option, index) => {
                                    return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    );
                                })}
                            </select>

                        </div>
                    </div>
                    <div className="col-md-6" style={{ marginTop: "20px" }}>
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("Duration :")}</label>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="" value="1" disabled />
                        </div>
                    </div>
                </div>
                {/* <div>
                    <button type="submit" className="btn green" onClick={this.showModal}>DISCOUNT</button>
                </div> */}
                <ModalBox isOpen={this.state.isModalOpen}>
                    {/* <Discount parent={this} /> */}
                </ModalBox>
            </div >

        );
    }
}



function mapStateToProps(state, ownProps) {


    return {
        // getMasterAgreementView: state.app.getMasterAgreementView.searchResult,
        // getPage: state.app.getMasterAgreementView.pageData,
        // typeData: state.app.typeData.data
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

ViewMasterAgreement.displayName = "VIEW MASTER AGREEMENT";
export default connect(mapStateToProps, mapDispatchToProps)(ViewMasterAgreement);