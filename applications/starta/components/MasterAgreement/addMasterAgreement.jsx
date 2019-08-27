/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../../../../core/actions/generalAction';
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isDirty from 'deep-diff';
import Portlet from '../../../../../core/common/Portlet.jsx';
import * as utils from '../../../../../core/common/utils.js';
import DateControl from '../../../../../core/common/DateControl.jsx'
import Table from '../../../../../core/common/Datatable.jsx';
import * as constants from '../../../../../core/constants/Communication.js';

const STATUSES = [
    {code : "PO", desc: "Purchase Order"},
    {code : "ACK", desc: "Acknowledged By Supplier"},
    {code : "SUBORDER", desc: "Place Suborder"},
    {code : "ACK-SUBORDER", desc: "Suborder Acknowledged"},
    {code : "PROD", desc: "Production"},
    {code : "QC", desc: "Quality Check"},
    {code : "SHIPPED", desc: "Shipped"},
    {code : "RECIEVED1", desc: "Received By Supplier"},
    {code : "RECEIVED2", desc: "Received By Emirates"},
];

class AddMasterAgreement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderRebate: [],
            itemRebate: [],
            sla: [],
            items: [],
            itemList: [],
            supplierList: [],
            penalties: [],
            isLoading: true,
            startDate: "",
            endDate: ""
        }
        this.addOrderRebate = this.addOrderRebate.bind(this);
        this.addItemRebate = this.addItemRebate.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemMasterList, this.getRequest())
        this.props.actions.generalProcess(constants.getSupplierMasterList, this.getRequest())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getItemMasterList && nextProps.getSupplierMasterList) {
            this.setState({
                itemList: nextProps.getItemMasterList,
                supplierList: nextProps.getSupplierMasterList,
                isLoading: false
            });
        }
    }

    onStartDateChange = (value) => {
        this.state.startDate = value;
    }

    onEndDateChange = (value) => {
        //alert(value)
        this.state.endDate = value;
    }

    addOrderRebate = () => {
        let orderGreaterThan = document.getElementById('orderGreaterThan') == null ? "" : document.getElementById('orderGreaterThan').value;
        let orderLessThan = document.getElementById('orderLessThan') == null ? "" : document.getElementById('orderLessThan').value;
        let rebate = document.getElementById('orderRebate') == null ? "" : document.getElementById('orderRebate').value;

        let data = this.state.orderRebate;
        let newtupple = {
            greaterThan: orderGreaterThan,
            lessThan: orderLessThan,
            discount: rebate,
            actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        // if (orderGreaterThan < 0) {
        //     alert("From should be zero or greater")
        //     return false;
        // }
        // if (orderLessThan <= orderGreaterThan) {
        //     alert("To should be greater than From!")
        //     return false;
        // }
        // if (rebate <= 0) {
        //     alert("Rebate should be greater than zero!")
        //     return false;
        // }

        this.clearFieldsOrderRebate();
        data.push(newtupple);
        this.setState({ orderRebate: data });
    }

    addItemRebate = () => {
        let itemGreaterThan = document.getElementById('itemGreaterThan') == null ? "" : document.getElementById('itemGreaterThan').value;
        let itemLessThan = document.getElementById('itemLessThan') == null ? "" : document.getElementById('itemLessThan').value;
        let rebate = document.getElementById('itemRebate') == null ? "" : document.getElementById('itemRebate').value;

        let data = this.state.itemRebate;
        let newtupple = {
            greaterThan: itemGreaterThan,
            lessThan: itemLessThan,
            discount: rebate,
            actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        // if (itemGreaterThan < 0) {
        //     alert("From should be zero or greater")
        //     return false;
        // }
        // if (itemLessThan <= itemGreaterThan) {
        //     alert("To should be greater than From!")
        //     return false;
        // }
        // if (rebate <= 0) {
        //     alert("Rebate should be greater than zero!")
        //     return false;
        // }

        this.clearFieldsItemRebate();
        data.push(newtupple);
        this.setState({ itemRebate: data });
    }

    addSLA = () => {
        let fromStage = document.getElementById('fromStage') == null ? "" : document.getElementById('fromStage').value;
        let toStage = document.getElementById('toStage') == null ? "" : document.getElementById('toStage').value;
        let duration = document.getElementById('duration') == null ? "" : document.getElementById('duration').value;

        let data = this.state.sla;

        let newtupple = {
            fromStage: fromStage,
            toStage: toStage,
            duration: duration,
            actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        console.log("===" + JSON.stringify(newtupple))

        // if (duration <= 0) {
        //     alert("Duration should be greater than zero!")
        //     return false;
        // }

        this.clearFieldsSLA();
        data.push(newtupple);
        this.setState({ sla: data });
    }

    addPenalty = () => {
        let fromStagePenalty = document.getElementById('fromStagePenalty') == null ? "" : document.getElementById('fromStagePenalty').value;
        let tillStage = document.getElementById('tillStage') == null ? "" : document.getElementById('tillStage').value;
        let greaterThan = document.getElementById('greaterThan') == null ? "" : document.getElementById('greaterThan').value;
        let penaltyValue = document.getElementById('penaltyValue') == null ? "" : document.getElementById('penaltyValue').value;


        let data = this.state.penalties;

        let newtupple = {
            fromStage: fromStagePenalty,
            tillStage: tillStage,
            greaterThan: greaterThan,
            penaltyValue: penaltyValue,
            actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        console.log("===" + JSON.stringify(newtupple))

        // if (greaterThan <= 0) {
        //     alert("Greater Than Time should be greater than zero!")
        //     return false;
        // }
        // if (penaltyValue <= 0) {
        //     alert("Penalty Value should be greater than zero!")
        //     return false;
        // }

        this.clearFieldsPenalty();
        data.push(newtupple);
        this.setState({ penalties: data });
    }

    addItem = () => {
        let item = document.getElementById('item') == null ? "" : document.getElementById('item').value;
        let unitPrice = document.getElementById('unitPrice') == null ? "" : document.getElementById('unitPrice').value;
        let expectedQuantity = document.getElementById('expectedQuantity') == null ? "" : document.getElementById('expectedQuantity').value;
        let currency = document.getElementById('currency') == null ? "" : document.getElementById('currency').value;


        let data = this.state.items;

        var result = this.state.itemList.filter(obj => {
            return obj.itemID === item
        })


        let newtupple = {
            itemCode: item,
            supplierItemCode: result[0].supplierItemID,
            itemDescription: result[0].description,
            discounts: this.state.orderRebate,
            itemwiseDiscount: this.state.itemRebate,
            size: result[0].size,
            image: result[0].image,
            unitPrice: unitPrice,
            currency: currency,
            expectedQty: expectedQuantity,
            actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        console.log("===" + JSON.stringify(newtupple))

        // if (expectedQuantity <= 0) {
        //     alert("Expected Quantity should be greater than zero!")
        //     return false;
        // }
        // if (unitPrice <= 0) {
        //     alert("Unit Price should be greater than zero!")
        //     return false;
        // }
        // if (currency.trim() == "") {
        //     alert("Currency should be defined!")
        //     return false;
        // }

        this.clearFieldsItem();
        data.push(newtupple);
        this.setState({ items: data });
    }

    addContract = () => {
        let contractID = document.getElementById('contractID') == null ? "" : document.getElementById('contractID').value;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let zycusContractID = document.getElementById('zycusContractID') == null ? "" : document.getElementById('zycusContractID').value;
        let zycusContractTitle = document.getElementById('zycusContractTitle') == null ? "" : document.getElementById('zycusContractTitle').value;
        let zycusBuyerContact = document.getElementById('zycusBuyerContact') == null ? "" : document.getElementById('zycusBuyerContact').value;
        let supplierID = document.getElementById('supplier') == null ? "" : document.getElementById('supplier').value;
        let paymentType = document.getElementById('paymentType') == null ? "" : document.getElementById('paymentType').value;
        let days = document.getElementById('days') == null ? "" : document.getElementById('days').value;

        

        // if (contractID.trim() == "") {
        //     alert("Contract ID should be defined!")
        //     return false;
        // }
        // if (zycusContractID.trim() == "") {
        //     alert("Zycus Contract ID should be defined!")
        //     return false;
        // }
        // if (zycusContractTitle.trim() == "") {
        //     alert("Zycus Contract Title should be defined!")
        //     return false;
        // }
        // if (zycusBuyerContact.trim() == "") {
        //     alert("Zycus Buyer Contact should be defined!")
        //     return false;
        // }
        // if (supplierID.trim() == "") {
        //     alert("Supplier ID should be defined!")
        //     return false;
        // }
        // if (supplierName.trim() == "") {
        //     alert("Supplier Name should be defined!")
        //     return false;
        // }
        // if (days.trim() == "") {
        //     alert("Days should be defined!")
        //     return false;
        // }

        

        let additionalInfo = []

        for (let i = 0; i < this.state.items.length; i++) {
            let product = {}
            product.itemCode = this.state.items[i].itemCode,
                product.supplierItemCode = this.state.items[i].supplierItemCode,
                product.size = parseInt(this.state.items[i].size, 10),
                product.description = this.state.items[i].itemDescription,
                product.image = this.state.items[i].image,
                product.unitPrice = parseInt(this.state.items[i].unitPrice, 10),
                product.currency = this.state.items[i].currency, 10
            product.expectedQty = parseInt(this.state.items[i].expectedQty, 10)
            product.discounts = []
            for (let j = 0; j < this.state.items[i].discounts.length; j++) {
                let rebate = {}
                rebate.greaterThan = parseInt(this.state.items[i].discounts[j].greaterThan, 10)
                rebate.lessThan = parseInt(this.state.items[i].discounts[j].lessThan, 10)
                rebate.discount = parseInt(this.state.items[i].discounts[j].discount, 10)
                product.discounts.push(rebate)
            }
            product.itemwiseDiscount = []
            for (let j = 0; j < this.state.items[i].itemwiseDiscount.length; j++) {
                let rebate = {}
                rebate.greaterThan = parseInt(this.state.items[i].itemwiseDiscount[j].greaterThan, 10)
                rebate.lessThan = parseInt(this.state.items[i].itemwiseDiscount[j].lessThan, 10)
                rebate.discount = parseInt(this.state.items[i].itemwiseDiscount[j].discount, 10)

                product.itemwiseDiscount.push(rebate)
            }

            additionalInfo.push(product)
        }
        let SLA = []
        console.log(this.state.sla)
        for (let i = 0; i < this.state.sla.length; i++) {
            console.log(this.state.sla[i])
            let slaObj = {}
            slaObj.fromStage = this.state.sla[i].fromStage
            slaObj.toStage = this.state.sla[i].toStage
            slaObj.duration = parseInt(this.state.sla[i].duration, 10) * 1000
            console.log(slaObj)
            SLA.push(slaObj)
        }

        let penalties = []
        console.log(this.state.penalties)
        for (let i = 0; i < this.state.penalties.length; i++) {
            let penaltyObj = {}
            penaltyObj.fromStage = this.state.penalties[i].fromStage
            penaltyObj.tillStage = this.state.penalties[i].tillStage
            penaltyObj.greaterThan = parseInt(this.state.penalties[i].greaterThan, 10)
            penaltyObj.penaltyType = "FLAT"
            penaltyObj.value = parseInt(this.state.penalties[i].penaltyValue, 10)

            penalties.push(penaltyObj)
        }

        console.log("----" + JSON.stringify(this.state.supplierList))
        console.log("supId" + supplierID)
        var result = this.state.supplierList.filter(obj => {
            return obj.supplierID === supplierID
        })

        console.log("===" + result)

        let contract = {
            contractID,
            startDate,
            endDate,
            supplierID,
            supplierName: result[0].supplierName,
            logo: result[0].logo,
            zycusContractID,
            zycusContractTitle,
            zycusBuyerContact,
            paymentTerms: {
                paymentType,
                days: parseInt(days, 10)
            },
            additionalInfo,
            SLA,
            penalties
        }

        console.log("===contract")
        console.log(JSON.stringify(contract))

        //this.props.actions.generalProcess(constants.addMasterAgreement, contract)

        this.clearFields();
    }

    clearFieldsOrderRebate() {
        $('#tab_1_1_1').find('input').val(0);
    }

    clearFieldsItemRebate() {
        $('#tab_1_1_2').find('input').val(0);
    }

    clearFieldsItem() {
        $('#tab_1_1_1').find('input').val(0);
        $('#tab_1_1_2').find('input').val(0);
        $('#tab_1_1').find('input').val(0);
        $('#tab_1_1').find('input:text').val('');
        this.setState({ orderRebate: [], itemRebate: [] });
    }

    clearFieldsSLA() {
        $('#tab_1_2').find('input').val(0);
    }

    clearFieldsPenalty() {
        $('#tab_1_3').find('input').val(0);
    }

    clearFields() {
        $('').find('input').val(0);
        $('').find('input:text').val('');
    }

    getRequest = () => {
        console.log("123")

        let searchCriteria = {}

        this.setState({ searchCriteria: searchCriteria })
        let request = {

            "bypassSimu": true,
            "body": {
                "page": {
                    "currentPageNo": 1,
                    "pageSize": 100
                },
                searchCriteria
            }

        };
        return request
    }

    render() {
        // if (this.state.isLoading) {
        //     return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        // }
        return (
            <div>
                <Portlet title={utils.getLabelByID("Basic Details")}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Contract ID")}</label>
                                <div className="form-group col-md-8">
                                    <input type="text" className="form-control" id="contractID" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Supplier")}</label>
                                <div className="form-group col-md-8" >
                                    {/* {console.log(initialValues)} */}
                                    <select id="supplier" className="form-control">
                                        {
                                            this.state.supplierList.map((option) => {
                                                return (
                                                    <option key={option.supplierID} value={option.supplierID}>{option.supplierID + " | " + option.supplierName}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Start Date")}</label>
                                <div className="form-group col-md-8">
                                    <DateControl id="startDate" dateChange={this.onStartDateChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("End Date")}</label>
                                <div className="form-group col-md-8">
                                    <DateControl id="endDate" dateChange={this.onEndDateChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Zycus Contract ID")}</label>
                                <div className="form-group col-md-8">
                                    <input type="text" className="form-control" id="zycusContractID" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Zycus Contract Title")}</label>
                                <div className="form-group col-md-8">
                                    <input type="text" className="form-control" id="zycusContractTitle" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Zycus Buyer Contact")}</label>
                                <div className="form-group col-md-8">
                                    <input type="text" className="form-control" id="zycusBuyerContact" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Supplier Name")}</label>
                                <div className="form-group col-md-8">
                                    <input type="text" className="form-control" id="supplierName" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Logo")}</label>
                                <div className="form-group col-md-8">
                                    <input type="text" className="form-control" id="logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Payment Type")}</label>
                                <div className="form-group col-md-8">
                                    <select id="paymentType" className="form-control">
                                        <option key="CHEQUE" value="CHEQUE">CHEQUE</option>
                                        <option key="CASH" value="CHEQUE">CASH</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Days")}</label>
                                <div className="form-group col-md-8">
                                    <input type="number" className="form-control" id="days" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Portlet>

                {/* tabeed start */}
                <div className="row" style={{ marginTop: "25px" }}>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <div className="row" style={{
                                    border: "2px #80808045 dashed",
                                    padding: "5px",
                                    margin: "1px"
                                }}>
                                    <div className="tabbable-line boxless">
                                        <ul className="nav nav-tabs">
                                            <li className="active">
                                                <a href="#tab_1_1" data-toggle="tab"
                                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Add Items</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_2" data-toggle="tab"
                                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Add SLA</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_3" data-toggle="tab"
                                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Add Penalties</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tabbable-line">
                                        <div className="tab-content">
                                            {/* Item Box */}
                                            <div className="tab-pane active" id="tab_1_1">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-1" style={{ textAlign: "left" }}>{utils.getLabelByID("Item")}</label>
                                                            <div className="form-group col-md-7" >
                                                                {/* {console.log(initialValues)} */}
                                                                <select id="item" className="form-control">
                                                                    {
                                                                        this.state.itemList.map((option) => {
                                                                            return (
                                                                                <option key={option.itemID} value={option.itemID}>{option.itemID + " | " + option.description}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Expected Quantity")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="expectedQuantity" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Unit Price")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="unitPrice" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Currency")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="text" className="form-control" id="currency" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* tabeed start */}
                                                <div className="row" style={{ marginTop: "25px" }}>
                                                    <div className="col-md-12">
                                                        <div className="col-md-12">
                                                            <div className="col-md-12">
                                                                <div className="row" style={{
                                                                    border: "2px #80808045 dashed",
                                                                    padding: "5px",
                                                                    margin: "1px"
                                                                }}>
                                                                    <div className="tabbable-line boxless">
                                                                        <ul className="nav nav-tabs">
                                                                            <li className="active">
                                                                                <a href="#tab_1_1_1" data-toggle="tab"
                                                                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Contract Level Rebate</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#tab_1_1_2" data-toggle="tab"
                                                                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Order Level Rebate</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="tabbable-line">
                                                                        <div className="tab-content">
                                                                            {/* Order Rebate Box */}
                                                                            <div className="tab-pane active" id="tab_1_1_1">
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("From")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="orderGreaterThan" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("To")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="orderLessThan" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("Rebate")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="orderRebate" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-actions right">
                                                                                            <div className="form-group col-md-12">
                                                                                                <div className="btn-toolbar pull-right">
                                                                                                    <button type="submit" className="btn btn-default" onClick={this.addOrderRebate.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Rebate")} </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>                                                  <Table
                                                                                    gridColumns={utils.getGridColumnByName("Rebate")}
                                                                                    gridData={this.state.orderRebate}
                                                                                    export={false}
                                                                                    componentFunction={this.ActionHandlers}
                                                                                    pagination={false} />

                                                                            </div>
                                                                            {/* END Order Rebate Box */}
                                                                            {/* Item Rebate Box */}
                                                                            <div className="tab-pane" id="tab_1_1_2">
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("From")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="itemGreaterThan" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("To")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="itemLessThan" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("Rebate")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="itemRebate" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-actions right">
                                                                                            <div className="form-group col-md-12">
                                                                                                <div className="btn-toolbar pull-right">
                                                                                                    <button type="submit" className="btn btn-default" onClick={this.addItemRebate.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Rebate")} </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <Table
                                                                                    gridColumns={utils.getGridColumnByName("Rebate")}
                                                                                    gridData={this.state.itemRebate}
                                                                                    export={false}
                                                                                    componentFunction={this.ActionHandlers}
                                                                                    pagination={false} />

                                                                            </div>
                                                                            {/* END Item Rebate Box */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="row">
                                                    <div className="form-actions right">
                                                        <div className="form-group col-md-12">
                                                            <div className="btn-toolbar pull-right">
                                                                <button type="submit" className="btn btn-default" onClick={this.addItem.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Item")} </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Table
                                                    gridColumns={utils.getGridColumnByName("Items")}
                                                    gridData={this.state.items}
                                                    export={false}
                                                    componentFunction={this.ActionHandlers}
                                                    pagination={false} />

                                            </div>
                                            {/* END item Box */}
                                            {/* SLA Box */}
                                            <div className="tab-pane" id="tab_1_2">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("From Stage")}</label>
                                                            <div className="form-group col-md-8">
                                                                <select id="fromStage" className="form-control">
                                                                    {
                                                                        STATUSES.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value={option.code}>{option.desc}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("To Stage")}</label>
                                                            <div className="form-group col-md-8">
                                                                <select id="toStage" className="form-control">
                                                                    {
                                                                        STATUSES.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value={option.code}>{option.desc}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Duration")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="duration" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-actions right">
                                                            <div className="form-group col-md-12">
                                                                <div className="btn-toolbar pull-right">
                                                                    <button type="submit" className="btn btn-default" onClick={this.addSLA.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add SLA")} </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("SLA")}
                                                    gridData={this.state.sla}
                                                    export={false}
                                                    componentFunction={this.ActionHandlers}
                                                    pagination={false} />

                                            </div>
                                            {/* END SLA Box */}
                                            {/* Penalty Box */}
                                            <div className="tab-pane" id="tab_1_3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("From Stage")}</label>
                                                            <div className="form-group col-md-8">
                                                                <select id="fromStagePenalty" className="form-control">
                                                                    {
                                                                        STATUSES.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value={option.code}>{option.desc}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Till Stage")}</label>
                                                            <div className="form-group col-md-8">
                                                                <select id="tillStage" className="form-control">
                                                                    {
                                                                        STATUSES.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value={option.code}>{option.desc}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Greater Than (seconds)")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="greaterThan" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("PenaltyValue")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="penaltyValue" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-actions right">
                                                            <div className="form-group col-md-12">
                                                                <div className="btn-toolbar pull-right">
                                                                    <button type="submit" className="btn btn-default" onClick={this.addPenalty.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Penalty")} </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Table
                                                    gridColumns={utils.getGridColumnByName("Penalty")}
                                                    gridData={this.state.penalties}
                                                    export={false}
                                                    componentFunction={this.ActionHandlers}
                                                    pagination={false} />

                                            </div>
                                            {/* END Penalty Box */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-actions right">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                   <br/>
                                <button type="submit" onClick={this.addContract.bind(this)} className="btn green">Create Contract</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        getItemMasterList: state.app.getItemMasterList.searchResult,
        getSupplierMasterList: state.app.supplierMasterList.searchResult,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
AddMasterAgreement.displayName = "Add Master Agreement";
export default connect(mapStateToProps, mapDispatchToProps)(AddMasterAgreement);