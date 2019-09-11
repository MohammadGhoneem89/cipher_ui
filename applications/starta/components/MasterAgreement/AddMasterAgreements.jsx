/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toaster from '../../../../core/common/toaster.js';
import { browserHistory } from 'react-router';
import * as actions from '../../../../core/actions/generalAction';
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import * as requestCreator from '../../../../core/common/request.js';
import get from 'lodash/get';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isDirty from 'deep-diff';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from '../../../../core/common/utils.js';
import DateControl from '../../../../core/common/DateControl.jsx'
import Table from '../../../../core/common/Datatable.jsx';
import * as constants from '../../../../core/constants/Communication.js';

class AddMasterAgreement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderRebate: [],
            itemRebate: [],
            disabledPagging:true,
            sla: [],
            items: [],
            itemList: [],
            supplierList: [],
            penalties: [],
            isLoading: false,
            startDate: "",
            endDate: ""
        }
        this.fromStage = undefined;
        this.toStage = undefined;
        this.fromStagePenalty = undefined;
        this.tillStage = undefined;

        this.addOrderRebate = this.addOrderRebate.bind(this);
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.ActionHandlersItem = this.ActionHandlersItem.bind(this)
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
            "currentPageNo": 1,
            "pageSize": 1
        }));
        
        this.state.disabledPagging ? this.props.actions.generalProcess(constants.getItemCatalogue, { "body": {} }) : this.props.actions.generalProcess(constants.getItemCatalogue, {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize

                }
            }
        })
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['shipmentType', 'orderStatus', 'paymentType']));

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getItemCatalogue && nextProps.typeData && nextProps.entityNames) {
            this.setState({
                itemList: nextProps.getItemCatalogue,
                typeData: nextProps.typeData,
                entityNames: nextProps.entityNames,
                isLoading: false
            });
        }


    }

    onStartDateChange = (value) => {
        console.log(value, "start date")
        this.state.startDate = value;
    }

    onEndDateChange = (value) => {
        console.log(value, "end date")
        this.state.endDate = value;
    }

    getStatusLabel = status => {
        if (this.state.typeData.orderStatus) {
            let { label } = this.state.typeData.orderStatus.find(obj => obj.value == status);
            return label;
        }
    };

    addOrderRebate = () => {
        let orderGreaterThan = document.getElementById('orderGreaterThan') == null ? "" : document.getElementById('orderGreaterThan').value;
        let orderLessThan = document.getElementById('orderLessThan') == null ? "" : document.getElementById('orderLessThan').value;
        let rebateType = document.getElementById('rebateType') == null ? "" : document.getElementById('rebateType').value;
        let rebate = document.getElementById('orderRebate') == null ? "" : document.getElementById('orderRebate').value;

        let data = this.state.orderRebate;

        if (orderGreaterThan < 0) {
            alert("From should be zero or greater")
            return false;
        }
        if (orderLessThan < orderGreaterThan) {
            alert("To should be greater than From!")
            return false;
        }
        if (!rebateType) {
            alert("Rebate Type is required!")
            return false;
        }
        if (rebate <= 0) {
            alert("Rebate should be greater than zero!")
            return false;
        }
        let newtupple = {
            greaterThan: orderGreaterThan,
            lessThan: orderLessThan,
            rebate: rebate,
            discountType: rebateType,
            action: [{
                label: "Delete", iconName: "fa fa-trash",
                actionType: "COMPONENT_FUNCTION"
            },
            {
                label: "Edit", iconName: "fa fa-edit",
                actionType: "COMPONENT_FUNCTION"
            }],
        }

        this.clearFieldsOrderRebate();
        data.push(newtupple);
        this.setState({ orderRebate: data });
    }

    //this.fromStage = value
    //fromStage = label

    addSLA = () => {
        this.fromStage = document.getElementById('fromStage') == null ? "" : document.getElementById('fromStage').value;
        this.toStage = document.getElementById('toStage') == null ? "" : document.getElementById('toStage').value;
        let duration = document.getElementById('duration') == null ? "" : document.getElementById('duration').value;

        let data = this.state.sla;
        if (!this.fromStage) {
            alert("From Stage is required!")
            return false;
        }
        if (!this.toStage) {
            alert("To Stage is required!")
            return false;
        }
        if (duration <= 0) {
            alert("Duration should be greater than zero!")
            return false;
        }
        let fromStageLabel = this.getStatusLabel(this.fromStage);
        let toStageLabel = this.getStatusLabel(this.toStage);

        let newtupple = {
            fromStageLabel: fromStageLabel,
            toStageLabel: toStageLabel,
            fromStage: this.fromStage,
            toStage: this.toStage,
            duration: duration,
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        console.log("===" + JSON.stringify(newtupple))



        this.clearFieldsSLA();
        data.push(newtupple);
        this.setState({ sla: data });
    }

    addPenalty = () => {
        this.fromStagePenalty = document.getElementById('fromStagePenalty') == null ? "" : document.getElementById('fromStagePenalty').value;
        this.tillStage = document.getElementById('tillStage') == null ? "" : document.getElementById('tillStage').value;
        let greaterThan = document.getElementById('greaterThan') == null ? "" : document.getElementById('greaterThan').value;
        let penaltyType = document.getElementById('penaltyType') == null ? "" : document.getElementById('penaltyType').value;
        let penaltyValue = document.getElementById('penaltyValue') == null ? "" : document.getElementById('penaltyValue').value;

        let data = this.state.penalties;

        let fromStagePenaltyLabel = this.getStatusLabel(this.fromStagePenalty);
        let tillStageLabel = this.getStatusLabel(this.tillStage);


        if (greaterThan <= 0) {
            alert("Greater Than Time should be greater than zero!")
            return false;
        }
        if (!penaltyType) {
            alert("Penalty Type is required!")
            return false;
        }
        if (penaltyValue <= 0) {
            alert("Penalty Value should be greater than zero!")
            return false;
        }


        let newtupple = {
            fromStagePenaltyLabel: fromStagePenaltyLabel,
            tillStageLabel: tillStageLabel,
            fromStage: this.fromStagePenalty,
            tillStage: this.tillStage,
            greaterThan: greaterThan,
            penaltyType: penaltyType,
            penaltyValue: penaltyValue,
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        console.log("===" + JSON.stringify(newtupple))

        this.clearFieldsPenalty();
        data.push(newtupple);
        this.setState({ penalties: data });
    }

    addItem = () => {
        let item = document.getElementById('item') == null ? "" : document.getElementById('item').value;
        let unitPrice = document.getElementById('unitPrice') == null ? "" : document.getElementById('unitPrice').value;
        let expectedQuantity = document.getElementById('expectedQuantity') == null ? "" : document.getElementById('expectedQuantity').value;
        let data = this.state.items;


        if (!item.trim()) {
            alert("item id and name is reuired!")
            return false;
        }

        if (expectedQuantity <= 0) {
            alert("expectedQuantity should be greater than zero!")
            return false;
        }

        if (unitPrice <= 0) {
            alert("unitPrice should be greater than zero!")
            return false;
        }
        let result = this.state.itemList.filter(obj => {
            return obj.itemCode === item
        })
        let newtupple = {
            itemCode: item,
            name: result[0].name,
            color: result[0].color,
            leadTime: result[0].leadTime,
            material: result[0].material,
            printTime: result[0].printTime,
            partNumber: result[0].partNumber,
            rebate: this.state.orderRebate,
            //rebate: this.state.itemRebate,

            price: unitPrice,
            quantity: expectedQuantity,
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
        }

        console.log("===" + JSON.stringify(newtupple))

        if (expectedQuantity <= 0) {
            alert("Expected Quantity should be greater than zero!")
            return false;
        }
        if (unitPrice <= 0) {
            alert("Unit Price should be greater than zero!")
            return false;
        }

        this.clearFieldsItem();
        data.push(newtupple);
        this.setState({ items: data });
    }

    addContract = () => {
        let contractID = document.getElementById('contractID') == null ? "" : document.getElementById('contractID').value;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let paymentType = document.getElementById('paymentType') == null ? "" : document.getElementById('paymentType').value;
        let shipmentType = document.getElementById('shipmentType') == null ? "" : document.getElementById('shipmentType').value;
        let customerID = document.getElementById('customerID') == null ? "" : document.getElementById('customerID').value;
        let days = document.getElementById('days') == null ? "" : document.getElementById('days').value;

        if (!contractID.trim()) {
            alert("Contract ID is required!")
            return false;
        }
        if (!customerID) {
            alert("Customer ID is required!")
            return false;
        }
        if (!startDate) {
            alert("Start Date is required!")
            return false;
        }
        if (!endDate) {
            alert("End Date is required!")
            return false;
        }
        if (!paymentType) {
            alert("payment Type is required!")
            return false;
        }
        if (!shipmentType) {
            alert("shipment Type is required!")
            return false;
        }

        if (!days || days.trim() == "") {
            alert("Days are required!")
            return false;
        }

        let items = []
        console.log(this.state.items, "this.state.items")
        for (let i = 0; i < this.state.items.length; i++) {
            let product = {}
            product.serial = i,
                product.itemCode = this.state.items[i].itemCode,
                product.name = this.state.items[i].name,
                product.color = this.state.items[i].color,
                product.material = this.state.items[i].material,
                product.printTime = this.state.items[i].printTime,
                product.leadTime = this.state.items[i].leadTime,
                product.unitPrice = parseFloat(this.state.items[i].price, 10),
                product.expectedQuantity = parseInt(this.state.items[i].quantity, 10)
            product.itemWiseDiscount = []

            for (let j = 0; j < this.state.items[i].rebate.length; j++) {
                let rebate = {}
                rebate.greaterThan = parseInt(this.state.items[i].rebate[j].greaterThan, 10)
                rebate.lessThan = parseInt(this.state.items[i].rebate[j].lessThan, 10)
                rebate.discount = parseFloat(this.state.items[i].rebate[j].rebate, 10)
                rebate.discountType = this.state.items[i].rebate[j].discountType
                product.itemWiseDiscount.push(rebate)
            }

            items.push(product)
        }
        let sla = []
        for (let i = 0; i < this.state.sla.length; i++) {
            let slaObj = {}
            slaObj.fromStage = this.state.sla[i].fromStage
            slaObj.toStage = this.state.sla[i].toStage
            slaObj.duration = parseInt(this.state.sla[i].duration, 10) * 1000
            console.log(slaObj)
            sla.push(slaObj)
        }

        let penalties = []
        for (let i = 0; i < this.state.penalties.length; i++) {
            let penaltyObj = {}
            penaltyObj.fromStage = this.state.penalties[i].fromStage
            penaltyObj.tillStage = this.state.penalties[i].tillStage
            penaltyObj.greaterThan = parseInt(this.state.penalties[i].greaterThan, 10)
            penaltyObj.penaltyType = this.state.penalties[i].penaltyType
            penaltyObj.penaltyValue = parseFloat(this.state.penalties[i].penaltyValue, 10)

            penalties.push(penaltyObj)
        }


        let contract = {
            contractID,
            customerID,
            startDate,
            endDate,
            paymentTerms: {
                paymentType,
                days: parseInt(days, 10)
            },
            shipmentType,
            items,
            sla,
            penalties
        }
        this.props.actions.generalAjxProcess(constants.addMasterContract, { "body": _.cloneDeep(contract) })
            .then(result => {
                console.log(result, "result")
                result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
            });
        this.clearFields();
    }
    redirectToList = () => {
        browserHistory.push('/strata/MasterAgreementList')
        toaster.showToast("Record updated successfully!");
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
        $("#tab_1_1 select").val("");
        this.setState({ orderRebate: [], itemRebate: [] });
    }

    clearFieldsSLA() {
        $("#tab_1_2 select").val("");
        $('#tab_1_2').find('input').val(0);
    }

    clearFieldsPenalty() {
        $('#tab_1_3').find("select").prop("selectedIndex", "");
        $('#tab_1_3').find('input').val(0);

    }

    clearFields() {
        $('').find('input').val(0);
        $('').find('input:text').val('');
    }

    ActionHandlersItem({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let a = this.state.items[index];
                    console.log(a, "a")
                    document.getElementById('item').value = (a.itemCode);
                    document.getElementById('unitPrice').value = parseInt(a.price, 10);
                    document.getElementById('expectedQuantity').value = parseInt(a.quantity, 10);
                    let tempState = this.state.items;
                    tempState.splice(index, 1);
                    this.setState({ items: tempState });
                }
                break;
            case "Delete":
                let result = confirm("Are you sure you want to delete?");
                if (result) {
                    if (index > -1) {
                        let a = this.state.items;
                        a.splice(index, 1);
                        this.setState({ items: a });
                    }
                }
                break;

            default:
                break;
        }
    }
    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let a = this.state.orderRebate[index];
                    document.getElementById('orderGreaterThan').value = parseInt(a.greaterThan, 10);
                    document.getElementById('orderLessThan').value = parseInt(a.lessThan, 10);
                    document.getElementById('orderRebate').value = parseInt(a.rebate, 10);
                    let tempState = this.state.orderRebate;
                    tempState.splice(index, 1);
                    this.setState({ orderRebate: tempState });
                }
                break;
            case "Delete":
                let result = confirm("Are you sure you want to delete?");
                if (result) {
                    if (index > -1) {
                        let a = this.state.orderRebate;
                        a.splice(index, 1);
                        this.setState({ orderRebate: a });
                    }
                }
                break;

            default:
                break;
        }
    }

    render() {
        const itemList = this.state.itemList ? this.state.itemList : []
        const status = this.state.typeData ? this.state.typeData.orderStatus : []
        const shipmentType = this.state.typeData ? this.state.typeData.shipmentType : []
        const paymentTypess = this.state.typeData ? this.state.typeData.paymentType : []
        const customerList = this.state.typeData ? this.state.entityNames : []
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
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
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Customer")}</label>
                                <div className="form-group col-md-8" >
                                    <select id="customerID" className="form-control">
                                        <option key="-1" value="">Select</option>
                                        {
                                            customerList.map((option, index) => {
                                                return (
                                                    <option key={index} value={option.value}>{option.label}</option>
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
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Payment Type")}</label>
                                <div className="form-group col-md-8">
                                    <select id="paymentType" className="form-control">
                                        <option key="-1" value="">Select</option>
                                        {
                                            paymentTypess.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value}>{item.label}</option>
                                                );
                                            })
                                        }
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Shipment Type")}</label>
                                <div className="form-group col-md-8">

                                    <select id="shipmentType" className="form-control">
                                        <option key="-1" value="">Select</option>
                                        {
                                            shipmentType.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.value}>{item.label}</option>
                                                );
                                            })
                                        }
                                    </select>
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
                                                                    <option key="-1" value="">Select</option>
                                                                    {
                                                                        itemList.map((option) => {
                                                                            return (
                                                                                <option key={option.itemCode} value={option.itemCode}>{option.itemCode + " | " + option.name}</option>
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
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Expected Quantity")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="expectedQuantity" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Unit Price")}</label>
                                                            <div className="form-group col-md-8">
                                                                <input type="number" className="form-control" id="unitPrice" />
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
                                                                        <ul style={{ paddingTop: "5px", paddingLeft: "5px" }}>

                                                                            <li style={{ listStyleType: "none" }}>
                                                                                <a style={{ fontWeight: "Bold", fontSize: "17px" }}>Order level Rebate</a>

                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="tabbable-line">
                                                                        <div className="tab-content">
                                                                            {/* Order Rebate Box */}
                                                                            <div className="tab-pane active" id="tab_1_1_1">
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("From")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="orderGreaterThan" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("To")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <input type="number" className="form-control" id="orderLessThan" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("Rebate Type")}</label>
                                                                                            <div className="form-group col-md-9">
                                                                                                <select id="rebateType" className="form-control" >
                                                                                                    <option key="-1" value="">Select</option>
                                                                                                    <option key="0" value="flat">Flat</option>
                                                                                                    <option key="1" value="percentage">Percentage</option>

                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                        <div className="form-group">
                                                                                            <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("Rebate Value")}</label>
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
                                                                                    gridColumns={utils.getGridColumnByName("rebate")}
                                                                                    gridData={this.state.orderRebate}
                                                                                    export={false}
                                                                                    componentFunction={this.ActionHandlers}
                                                                                    pagination={false} />

                                                                            </div>
                                                                            {/* END Order Rebate Box */}

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
                                                    gridColumns={utils.getGridColumnByName("itemMaster")}
                                                    gridData={this.state.items}
                                                    export={false}
                                                    componentFunction={this.ActionHandlersItem}
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
                                                                    <option key="-1" value="">Select</option>
                                                                    {
                                                                        status.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value={option.value}>{option.label}</option>
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
                                                                    <option key="-1" value="">Select</option>
                                                                    {
                                                                        status.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value={option.value}>{option.label}</option>
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
                                                                <select id="fromStagePenalty" className="form-control" disabled>
                                                                    {/* <option key="-1" value="">Select</option> */}
                                                                    {
                                                                        status.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value="002">Purchase Order</option>
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
                                                                <select id="tillStage" className="form-control" disabled>
                                                                    {/* <option key="-1" value="">Select</option> */}
                                                                    {
                                                                        status.map((option, index) => {
                                                                            return (
                                                                                <option key={index} value="011">Received</option>
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

                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Penalty Type")}</label>
                                                            <div className="form-group col-md-8">
                                                                <select id="penaltyType" className="form-control" >
                                                                    <option key="-1" value="">Select</option>
                                                                    <option key="0" value="flat">Flat</option>
                                                                    <option key="1" value="percentage">Percentage</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Penalty Value")}</label>
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
                                                    gridColumns={utils.getGridColumnByName("Penalties")}
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
                                    <br />
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
    // console.log(state.app.entityList.data.typeData.entityNames,"state.app.entityList.data.typeData.entityNames")
    return {
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        typeData: state.app.typeData.data,
        entityNames: state.app.entityList.data.typeData.entityNames
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
AddMasterAgreement.displayName = "Add Master Agreement";
export default connect(mapStateToProps, mapDispatchToProps)(AddMasterAgreement);