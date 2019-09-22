import * as utils from "../../../../../core/common/utils";
import Portlet from '../../../../../core/common/Portlet.jsx';

import Table from '../../../../../core/common/Datatable.jsx';

import React, { Component } from 'react'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../../core/actions/generalAction";

import * as constants from "../../../../../core/constants/Communication";

class Receipt extends Component {
    constructor(props, context) {

        super(props, context);

        this.state = {
            itemCode: "",
            itemColor: "",
            receiptNum: "",
            itemCodes: [],
            itemColors: [],
            displayItems: [],
            quantity: 0
        }
    }


    updateItemCodes = () => {
        let itemCodes = []
        let itemNames = []
        for (let i = 0; i < this.state.items.length; i++) {
            if ((this.state.items[i].quantity - this.state.items[i].receivedQuantity) > 0) {
                itemCodes.push(this.state.items[i].itemCode)
                itemNames.push(this.state.items[i].name)
            }
        }
        itemCodes = [...new Set(itemCodes)]
        
        let itemCodesObjs = []
        for (let i = 0; i < itemCodes.length; i++) {
            itemCodesObjs.push({
                label: itemNames[i] +' - '+ itemCodes[i],
                value: itemCodes[i]
            })
        }

        this.setState({
            itemCodes : itemCodesObjs
        })
    }
    // event handler
    updateItemColors = (e) => {
        let colors = []
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].itemCode === e.target.value) {
                for (let j = 0; j < this.state.items[i].color.length; j++) {
                    if (!(this.state.items[i].quantity===this.state.items[i].receivedQuantity)){
                        colors.push({
                            label: this.state.items[i].color[j],
                            value: this.state.items[i].color[j]
                        })
                    }
                    
                }
            }
        }

        this.setState({
            itemColors: colors,
            itemCode: e.target.value
        })
    }
    componentDidMount() {

        if (this.props.items) {

            let itemCodes = []
            let itemNames = []
            for (let i = 0; i < this.props.items.length; i++) {
                if ((this.props.items[i].quantity - this.props.items[i].receivedQuantity) > 0) {
                    itemCodes.push( this.props.items[i].itemCode)
                    itemNames.push( this.props.items[i].name)
                }
            }

            itemCodes = [...new Set(itemCodes)]
        
            let itemCodesObjs = []
            for (let i = 0; i < itemCodes.length; i++) {
                itemCodesObjs.push({
                    label: itemNames[i] +' - '+ itemCodes[i],
                    value: itemCodes[i]
                })
            }

            this.setState({
                customerID: this.props.customerID,
                orderID: this.props.orderID,
                items: this.props.items,
                closePortlet: this.props.closePortlet,
                itemCodes : itemCodesObjs
            })
        }
    }

    onChange = (e) => { 
        this.setState({ 
            [e.target.name]: e.target.value 
        }); 
    }
    

    onClick = (e) => {
        
        // field validation
        if (this.state.displayItems.length === 0){
            alert('Add items to recieve.')
            return
        }

        console.log('Form submit')
        this.props.actions.generalProcess(constants.updateOrderStatusCustomer, {
            "body": {
              "orderID": this.state.orderID,
              "customerID": this.state.customerID,
              "status": "011",// Recieved Status
              itemReceipts: this.state.displayItems
            }
          });

        // Remove this line if want to recieve and stay on this pop up  
        this.state.closePortlet();
    }

    addItem = (e) => {
        // Form Submit Action disable
        e.preventDefault();

        // field validation
        if (this.state.receiptNum === "") {
            alert('Please enter Receipt Number for the item.')
            return
        }

        if  (this.state.itemCode === ""){
            alert('Please select any Item.')
            return
        } 
        
        if (this.state.itemColor === ""){
            alert('Please select any Color for the selected item.')
            return
        }

        if (this.state.quantity===0 || this.state.quantity < 0 ){
            alert('Please enter a valid Quantity.')
            return
        }

        

        // update item codes
        // item code -> "" here
        // colorcodes -> empty here

        // select values from state and add in display items


        for (let i=0; i<this.state.items.length; i++){
            if (this.state.items[i].itemCode === this.state.itemCode && this.state.items[i].color[0]===this.state.itemColor){
                let remainingQuantity = this.state.items[i].quantity - this.state.items[i].receivedQuantity
                if (this.state.quantity > remainingQuantity ){
                    let err = this.state.items[i].itemCode + ' of '+this.state.items[i].color[0]+' color must not exceed '+remainingQuantity+' in quantity.'
                    alert(err)
                    return
                }
            }
        }

        // states passes validation
        // lets add in "displayItems" from items
        // lets pop the same from "items" as a result

        let displayItems = [...this.state.displayItems]
        let items = [...this.state.items]
        let found = false
        for (let i=0; i<displayItems.length; i++) {
            if (displayItems[i].itemCode === this.state.itemCode && displayItems[i].color === this.state.itemColor){
                // update quantity of already present display item
                displayItems[i].quantity = parseInt(displayItems[i].quantity) + parseInt(this.state.quantity)
                found = true
                break
            }
        }
        if (!found){
            //  add in display items as new display item
            displayItems.push({ 
                itemCode: this.state.itemCode, 
                color: this.state.itemColor, 
                quantity: parseInt(this.state.quantity),
                receiptNo: this.state.receiptNum
            })
        }
        // add quantity in recieved
        for (let i=0;i<items.length;i++){
            if (items[i].itemCode === this.state.itemCode && items[i].color[0] === this.state.itemColor){
                items[i].receivedQuantity = parseInt(items[i].receivedQuantity) + parseInt(this.state.quantity)
            }
        }
        
        // update item codes
        let itemCodes = []
        let itemNames = []
        for (let i = 0; i < this.state.items.length; i++) {
            if ((this.state.items[i].quantity - this.state.items[i].receivedQuantity) > 0) {
                itemCodes.push(this.state.items[i].itemCode)
                itemNames.push(this.state.items[i].name)
            }
        }
        itemCodes = [...new Set(itemCodes)]
        
        let itemCodesObjs = []
        for (let i = 0; i < itemCodes.length; i++) {
            itemCodesObjs.push({
                label: itemNames[i] +' - '+ itemCodes[i],
                value: itemCodes[i]
            })
        }

        this.setState({
            displayItems: [...displayItems],
            items: [...items],
            itemCodes : [...itemCodesObjs],
            itemColors: [],
            itemCode: "",
            itemColor: "",
            quantity:0
        })
    }

    render() {
        let portletActions = [
            {
                type: "icon",
                className: "btn btn-default",
                label: "Close",
                icon: "close",
                actionHandler: this.state.closePortlet
            }
        ];

        return (
            <Portlet noCollapse={true} actions={portletActions} title="Items Receipt">

                <Portlet noCollapse={true} title="Add Items">
                    <form autoComplete="off" role="form" onSubmit={this.addItem}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-4">
                                    <label className="control-label" style={{ fontWeight: "bold" }}>
                                        {"Receipt No."}
                                    </label>
                                    <input
                                        name="receiptNum"
                                        type="number" 
                                        className="form-control" 
                                        id="receiptNum"
                                        onChange={this.onChange}
                                        value={this.state.receiptNum}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label" style={{ fontWeight: "bold" }}>{"Items "}</label>
                                    <select id="itemCode" name="itemCode" className="form-control" value={this.state.itemCode} onChange={this.updateItemColors} >
                                        <option key="-1">Select</option>
                                        {
                                            this.state.itemCodes.map((option, index) => {
                                                return (
                                                    <option key={index} value={option.value}>{option.label}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-4">
                                    <label className="control-label" style={{ fontWeight: "bold" }}>{"Colors "}</label>
                                    <select id="itemColor" name="itemColor" className="form-control" value={this.state.itemColor} onChange={this.onChange} >
                                            <option key="-1">Select</option>
                                            {
                                                this.state.itemColors.map((option, index) => {
                                                    return (
                                                        <option key={index} value={option.value}>{option.label}</option>
                                                    );
                                                })
                                            }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label" style={{ fontWeight: "bold" }}>{"Quantity "}</label>
                                    <input
                                        name="quantity"
                                        type="number" 
                                        className="form-control" 
                                        id="quantity"
                                        onChange={this.onChange}
                                        value={this.state.quantity}
                                    />
                                </div>
                            </div>
                        </div>
                        <br></br>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="pull-right btn green">
                                        {utils.getLabelByID("Add")}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </Portlet>

                <div className="portlet-body">
                    <Table
                        gridColumns={utils.getGridColumnByName('ReceiptLineItems')}
                        gridData={this.state.displayItems}
                        pagination={false}
                        export={false}
                        search={false}
                    />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button 
                                type="submit" 
                                onClick={this.onClick} 
                                className="pull-right btn green">
                                    {utils.getLabelByID("Recieved")}
                                </button>
                            </div>
                        </div>

                    </div>

                </div>





            </Portlet>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        
    };
  }
  
function mapDispatchToProps(dispatch) {
return { actions: bindActionCreators(actions, dispatch) };
}
  
Receipt.displayName = "__HIDE";
export default connect(
mapStateToProps,
mapDispatchToProps
)(Receipt);
  