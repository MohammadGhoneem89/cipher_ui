import * as utils from "../../../../../core/common/utils";
import Portlet from '../../../../../core/common/Portlet.jsx';
import { DropdownInput, TextInput } from '../../../../../core/common/FormControls.jsx';
import { reduxForm } from 'redux-form';
import Table from '../../../../../core/common/Datatable.jsx';

import React, { Component } from 'react'

class Receipt extends Component {
    constructor(props, context) {

        super(props, context);

        this.state = {
            itemCode: "",
            itemColor: "",
            itemCodes: [],
            itemColors: [],
            displayItems: [],
            quantity: 0
        }
    }


    updateItemCodes = () => {
        let itemCodes = []
        for (let i = 0; i < this.state.items.length; i++) {
            if ((this.state.items[i].quantity - this.state.items[i].receivedQuantity) > 0) {
                itemCodes.push({
                    label: this.state.items[i].itemCode,
                    value: this.state.items[i].itemCode
                })
            }
        }

        this.setState({
            itemCodes
        })
    }
    updateItemColors = (e) => {
        let colors = []
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].itemCode === e.target.value) {
                for (let j = 0; j < this.state.items[i].color.length; j++) {
                    colors.push({
                        label: this.state.items[i].color[j],
                        value: this.state.items[i].color[j]
                    })
                }
                break
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
            for (let i = 0; i < this.props.items.length; i++) {
                if ((this.props.items[i].quantity - this.props.items[i].receivedQuantity) > 0) {
                    itemCodes.push({
                        label: this.props.items[i].itemCode,
                        value: this.props.items[i].itemCode
                    })
                }
            }


            this.setState({
                items: this.props.items,
                closePortlet: this.props.closePortlet,
                itemCodes
            })



        }
    }


    onQuantityChange = (e) => { 
        // Check the this.state.quantity
        // Must be less than this.state.wo wala item . quantity - recv quantity 
        this.setState({ 
            [e.target.name]: e.target.value 
        }); 
    }

    onColorChange = (e) => {
        this.setState({
            itemColor: e.target.value
        })
    }

    addItem = (e) => {
        // Form Submit Action
        e.preventDefault();
        this.setState({
            displayItems: [
                { name: "sample", itemCode: "sample", quantity: 3, receivedQuantity: 4 }
            ]
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
                            <div className="col-md-8">
                                <div className="col-md-4">
                                    <DropdownInput
                                        value={this.state.itemCode}
                                        name={"receiptItemCodes"}
                                        options={this.state.itemCodes}
                                        label={utils.getLabelByID("Item")}
                                        onChange={this.updateItemColors}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <DropdownInput
                                        value={this.state.itemColor}
                                        name={"receiptItemColors"}
                                        options={this.state.itemColors}
                                        label={utils.getLabelByID("Color")}
                                        onChange={this.onColorChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="col-md-4">
                                    <TextInput
                                        name={"quantity"}
                                        label={"Quantity"}
                                        value={this.state.quantity}
                                        onChange={this.onQuantityChange}>
                                    </TextInput>
                                </div>
                            </div>

                        </div>


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
                                <button type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Update")}
                                </button>
                            </div>
                        </div>

                    </div>

                </div>





            </Portlet>
        )
    }
}


export default reduxForm({
    form: 'Receipt', // a unique identifier for this form
    enableReinitialize: false
})(Receipt);