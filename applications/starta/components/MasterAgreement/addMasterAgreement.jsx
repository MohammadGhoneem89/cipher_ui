/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../../../core/actions/generalAction';
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isDirty from 'deep-diff';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from '../../../../core/common/utils.js';
import DateControl from '../../../../core/common/DateControl.jsx'
import Table from '../../../../core/common/Datatable.jsx';
import * as constants from '../../../../core/constants/Communication.js';

const STATUSES = [
    { code: "PO", desc: "Purchase Order" },
    { code: "ACK", desc: "Acknowledged By Supplier" },
    { code: "SUBORDER", desc: "Place Suborder" },
    { code: "ACK-SUBORDER", desc: "Suborder Acknowledged" },
    { code: "PROD", desc: "Production" },
    { code: "QC", desc: "Quality Check" },
    { code: "SHIPPED", desc: "Shipped" },
    { code: "RECIEVED1", desc: "Received By Supplier" },
    { code: "RECEIVED2", desc: "Received By Emirates" },
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
            isLoading: false,
            startDate: "",
            endDate: ""
        }
        this.addOrderRebate = this.addOrderRebate.bind(this);
        this.addItemRebate = this.addItemRebate.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemCatalogue, { "body": {} })
        //this.props.actions.generalProcess(constants.getSupplierMasterList, this.getRequest())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getItemCatalogue) {
            console.log("nextProps.getItemCatalogue", nextProps.getItemCatalogue)
            this.setState({
                itemList: nextProps.getItemCatalogue,
                //supplierList: nextProps.getSupplierMasterList,
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
            rebate: rebate,
            action: [{
                label: "Delete", iconName:
                    "fa fa-trash", actionType: "COMPONENT_FUNCTION"
            },
            {
                label: "Edit", iconName: "fa fa-edit",
                actionType: "COMPONENT_FUNCTION"
            }],
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
        console.log(data, "data");
        console.log()
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
            rebate: rebate,
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
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
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
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
        let fromStage = document.getElementById('fromStagePenalty') == null ? "" : document.getElementById('fromStagePenalty').value;
        let tillStage = document.getElementById('tillStage') == null ? "" : document.getElementById('tillStage').value;
        let greaterThan = document.getElementById('greaterThan') == null ? "" : document.getElementById('greaterThan').value;
        let penaltyValue = document.getElementById('penaltyValue') == null ? "" : document.getElementById('penaltyValue').value;


        let data = this.state.penalties;

        let newtupple = {
            fromStage: fromStage,
            tillStage: tillStage,
            greaterThan: greaterThan,
            penaltyValue: penaltyValue,
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
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


        let data = this.state.items;

        var result = this.state.itemList.filter(obj => {
            return obj.itemID === item
        })


        let newtupple = {
            itemCode: item,
            description: "",
            //description: result[0].description,
            rebate: this.state.orderRebate,
            // itemwiseDiscount: this.state.itemRebate,
            // size: result[0].size,
            // image: result[0].image,
            price: unitPrice,
            qty: expectedQuantity,
            action: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
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
        let paymentType = document.getElementById('paymentType') == null ? "" : document.getElementById('paymentType').value;
        let shipmentType = document.getElementById('shipmentType') == null ? "" : document.getElementById('shipmentType').value;
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

                rFieldsOrderRebate() {
                $('#tab_1_1_1').find('input').val(0);
    }
            
                rFieldsItemRebate() {
                $('#tab_1_1_2').find('input').val(0);
            }

            clearFieldsItem() {
                $('#tab_1_1_1').find('input').val(0);
        $('#tab_1_1_2').find('input').val(0);
                $('#tab_1_1').find('input').val(0);
        $('#tab_1_1').find('input:text').val('');
                this.setState({ orderRebate: [], itemRebate: [] });
                

                    ldsSLA() {
                    tab_1_2').find('input').val(0);
                        
                            
                            ty() {
                        1_3').find('input').val(0);
                        
                    
    clearFields() {
                $('').find('input').val(0);
                $('').find('input:text').val('');
            }

            getRequest = () => {
                console.log("123")
                
                let searchCriteria = {}
                
                    .setState({ searchCriteria: searchCriteria })
                        est = {
                            
                                : true,
                                    
                                        
                                        No": 1,
                                            
                                        
                                    ia
                                
                                
                                    
                                        
                                        
                                            
                                            
                                                 {
                                                oader"> {utils.getLabelByID("loading")}</div>);
                                                    
                                                        

                                                            Basic Details")}>
                                                        
                                                    md-6">
                                                me="form-group">
                                            el className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Contract ID")}</label>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" id="contractID" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Customer")}</label>
                                        <div className="form-group col-md-8" >
                                            {/* {console.log(initialValues)} */}
                                            <select id="supplier" className="form-control">
                                            <option key="-1" value="">Select</option>
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
                                v>
                                    ssName="row">
                                        ssName="col-md-6">
                                         className="form-group">
                                            el className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Start Date")}</label>
                                                 className="form-group col-md-8">
                                                eControl id="startDate" dateChange={this.onStartDateChange} />
                                                
                                            
                                        
                                     className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("End Date")}</label>
                                        <div className="form-group col-md-8">
                                            <DateControl id="endDate" dateChange={this.onEndDateChange} />
                                        </div>
                                             
                                        
                                    
                                
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Payment Type")}</label>
                                        <div className="form-group col-md-8">
                                            <select id="paymentType" className="form-control">
                                            <option key="-1" value="">Select</option>
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
                                            <input  className="form-control" id="days" />
                                        </div>
                                    </div>
                                    v>
                                        
                                            row">
                                            me="col-md-6">
                                            ssName="form-group">
                                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Shipment Type")}</label>
                                             className="form-group col-md-8">
                                                ect id="shipmentType" className="form-control">
                                                    key="-1" value="">Select</option>
                                                        key="account" value="account">Customer's Account</option>
                                                            
                                                    
                                                    
                                                        
                                                            
                                                    
                                                    
                                                        
                                                            Top: "25px" }}>
                                                    2">
                                                col-md-12">
                                            ssName="col-md-12">
                                             className="row" style={{
                                                er: "2px #80808045 dashed",
                                                     "5px",
                                                    "1px"
                                                        
                                                            tabbable-line boxless">
                                                                av nav-tabs">
                                                                    ctive">
                                                                    b_1_1" data-toggle="tab"
                                                                        tWeight: "Bold", fontSize: "17px" }}>Add Items</a>
                                                                        
                                                                            
                                                                            ata-toggle="tab"
                                                                                 "Bold", fontSize: "17px" }}>Add SLA</a>
                                                                                    
                                                                                        
                                                                                    le="tab"
                                                                                 "Bold", fontSize: "17px" }}>Add Penalties</a>
                                                                            
                                                                        
                                                                    
                                                                able-line">
                                                            me="tab-content">
                                            {/* Item Box */}
                                                         className="tab-pane active" id="tab_1_1">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label className="form-group control-label col-md-1" style={{ textAlign: "left" }}>{utils.getLabelByID("Item")}</label>
                                                                    <div className="form-group col-md-7" >
                                                                        {/* {console.log(initialValues)} */}
                                                                        <select id="item" className="form-control">
                                                                        <option key="-1" value="">Select</option>
                                                                            {
                                                                                this.state.itemList.map((option) => {
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
                                                             className="row">
                                                                 className="col-md-4">
                                                                     className="form-group">
                                                                        el className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Expected Quantity")}</label>
                                                                            ssName="form-group col-md-8">
                                                                            ut type="number" className="form-control" id="expectedQuantity" />
                                                                            
                                                                        
                                                                            
                                                                                md-4">
-group">
                                                                                    ="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Unit Price")}</label>
                                                                                        -group col-md-8">
                                                                                             className="form-control" id="unitPrice" />
                                                                                    
                                                                                
                                                                            
                                                                            
                                                                                
                                                                                    
                                                                                    { marginTop: "25px" }}>
                                                                                        
                                                                                            
                                                                                                
                                                                                                    {
                                                                                                    ashed",
                                                                                                         
                                                                                                    
                                                                                                
                                                                                            tabbable-line boxless">
                                                                                            e="nav nav-tabs">
                                                                                                
                                                                                                    
                                                                                                    b_1_1_2" data-toggle="tab"
                                                                                                        tWeigh  "Bold", fontSize: "17px" }}>Order Level Rebate</a>
                                                                                                    
                                                                                                
                                                                                            
                                                                                            tabbable-line">
                                                                                                tab-content">
                                                                                                     Box */}
                                                                                                    tab-pane active" id="tab_1_1_1">
                                                                                                        row">  
                                                                                                    ssName="col-md-4">
                                                                                                <div className="form-group">
                                                                                                    <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("From")}</label>
                                                                                                    <div className="form-group col-md-9">
                                                                                                        <input  type="number" className="form-control" id="orderGreaterThan" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                    
                                                                                                        me="col-md-4">
                                                                                                            me="form-group">
                                                                                                        el className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("To")}</label>
                                                                                                    <div className="form-group col-md-9">
                                                                                                        <input  type="number" className="form-control" id="orderLessThan" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div className="form-group">
                                                                                                    <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("Rebate")}</label>
                                                                                                    <div className="form-group col-md-9">
                                                                                                <input  type="number" className="form-control" id="orderRebate" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row">
                                                                                            <div className="col-md-12">
                                                                                                <div className="form-actions right">
                                                                                                    <div className="form-group col-md-12">
                                                                                                        <div className="btn-toolbar pull-right">
                                                                                                            <b ton type="submit" className="btn btn-default" onClick={this.addOrderRebate.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Rebate")} </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                                                                                <Table
                                                                                                    mns={utils.getGridColumnByName("rebate")}
                                                                                                    ={this.state.orderRebate}
                                                                                                        e}
                                                                                                    tFunction={this.ActionHandlers}
                                                                                                nation={false} />
                                                                                            
                                                                                            
                                                                                                r Rebate Box */}
                                                                                                    Box */}
                                                                                                    tab-pane" id="tab_1_1_2">
                                                                                                        row">
                                                                                                    ssName="col-md-4">
                                                                                                <div className="form-group">
                                                                                                    <label className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("From")}</label>
                                                                                                    <div className="form-group col-md-9">
                                                                                                        <input  type="number" className="form-control" id="itemGreaterThan" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                    
                                                                                                        me="col-md-4">
                                                                                                            me="form-group">
                                                                                                        el className="form-group control-label col-md-3" style={{ textAlign: "left" }}>{utils.getLabelByID("To")}</label>
                                                                                                    <div className="form-group col-md-9">
                                                                                                        <input type="number" className="form-control" id="itemLessThan" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <div cla ssName="for m-g roup">        
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
                                                                                            gridColumns={utils.getGridColumnByName("itemCatalogue")}
                                                                                            gridData={[{"itemCode":"","description":"","price":0}]}
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
                                                                        v>
                                                                            
                                                                                
                                                                                    
                                                                                        
                                                                                    
                                                                                etGridColumnByName("itemMaster")}
                                                                            tate.items}
                                                                        e}
                                                                    tFunction={this.ActionHandlers}
                                                                nation={false} />
                                                            
                                                            
                                                                 Box */}
                                                                    
                                                                    tab-pane" id="tab_1_2">
                                                                        row">
                                                                            col-md-6">
                                                                                form-group">
                                                                                    ="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("From Stage")}</label>
                                                                                        -group col-md-8">
                                                                                    fromStage" className="form-control">
                                                                                
                                                                                STATUSES.map((option, index) => {
                                                                                    return (
                                                                                        <option key={index} value={option.code}>{option.desc}</option>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                    
                                                                    ssName="col-md-6">
                                                                        ssName form-group">
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
                                                                        <input  className="form-control" id="duration" />
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
                                                                            
                                                                                
                                                                                    
                                                                                        
                                                                                    
                                                                                etGridColumnByName("SLA")}
                                                                            tate.sla}
                                                                        e}
                                                                    tFunction={this.ActionHandlers}
                                                                nation={false} />
                                                            
                                                            
                                                                Box */}
                                                                    */}
                                                                    tab-pane" id="tab_1_3">
                                                                        row">
                                                                            col-md-6">
                                                                                form-group">
                                                                                    ="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("From Stage")}</label>
                                                                                        -group col-md-8">
                                                                                    fromStagePenalty" className="form-control">
                                                                                
                                                                                STATUSES.map((option, index) => {
                                                                                    return (
                                                                                        <option key={index} value={option.code}>{option.desc}</option>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                    
                                                                    ssName="col-md-6">
                                                                        ssName="form-group">
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
                                                                
                                                                    me="row">
                                                                        me="col-md-6">
                                                                            me="form-group">
                                                                        el className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Greater Than (seconds)")}</label>
                                                                    <div className="form-group col-md-8">
                                                                        <input type="number" className="form-control" id="greaterThan" />
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
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
    //getSupplierMasterList: state.app.supplierMasterList.searchResult,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
AddMasterAgreement.displayName = "Add Master Agreement";
export default connect(mapStateToProps, mapDispatchToProps)(AddMasterAgreement);