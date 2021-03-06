/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Wrapper from '../../common/Wrapper.jsx';

import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx';
// import Checklist from '../../common/CheckList.jsx';
import HorizontalBarChartNew from '../../common/charts/horizontalBarChartNew.jsx';
// import HorizontalStackedBarChart from '../../common/charts/horizontalStackedBarChart.jsx';
import PieChart from '../../common/charts/PieChart.jsx';
import VerticalBarChart from '../../common/charts/VerticalBarChart.jsx';
import moment from 'moment';
import * as d3 from "d3";

import { indexOf } from 'lodash';
import Input from '../../../../core/common/Input.jsx';
import TextArea from '../../../../core/common/Textarea.jsx';
import Combobox from '../../../../core/common/Select.jsx';
import ComboBoxNew from '../../../../core/common/SelectNew.jsx';
import Board from "react-trello";

let interval;
class EcommerceOrderTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ecommerce: '001',
      boardData: undefined,
      tracking: {
        courier: "",
        ecommerce: ""
      },
      showDescription: true,
      orders: [
        {
          key: 'Order',
          value: 'order'
        }
      ]
    };
    this.generalHandler = gen.generalHandler.bind(this);
    this.customActionHandler = customActionHandler.bind(this);
    this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
    // this.sendCall = this.sendCall.bind(this);
    this.generalActionHandler = gen.generalHandler.bind(this);
    // this.applyFilter = this.applyFilter.bind(this);
    // this.clearFilter = this.clearFilter.bind(this);
  }



  componentDidMount() {
    this.props.actions.generalProcess(constants.orgList, { action: "entityList", page: { currentPageNo: 1, pageSize: 100 } });

    let actualData = {
      "objectType": "order",
      "tiles": [
        {
          "tileName": "Order Number",
          "canMove": "N",
          "tilePurpose": "Order Number desc",
          "mappedField": "order.orderID"
        },
        {
          "tileName": "Order Date",
          "canMove": "N",
          "tilePurpose": "Order Date desc ",
          "mappedField": "order.orderDate"
        },
        {
          "tileName": "E-Commerce Business Code",
          "canMove": "N",
          "tilePurpose": "business Code desc",
          "mappedField": "order.eCommOrgCode"
        },
        {
          "tileName": "Consignee Code",
          "canMove": "Y",
          "tilePurpose": "Consignee Code desc",
          "mappedField": "order.consigneeBusinessCode"
        },
        {
          "tileName": "Consignee Name",
          "canMove": "Y",
          "tilePurpose": "Consignee Name desc",
          "mappedField": "order.consignee.name"
        },
        {
          "tileName": "Consignee Address",
          "canMove": "Y",
          "tilePurpose": "Consignee Address desc",
          "mappedField": "order.consignee.address"
        },
        {
          "tileName": "Bill To",
          "canMove": "Y",
          "tilePurpose": "Bill To desc",
          "mappedField": "order.billTo.name"
        },
        {
          "tileName": "Bill To Address",
          "canMove": "Y",
          "tilePurpose": "Bill To Address desc",
          "mappedField": "order.billTo.address"
        },
        {
          "tileName": "shipTo",
          "canMove": "Y",
          "tilePurpose": "Shipment Done to name",
          "mappedField": "order.shipTo.name"
        },
        {
          "tileName": "ShipToAddress",
          "canMove": "Y",
          "tilePurpose": "Shipment Done to address",
          "mappedField": "order.shipTo.address"
        },
        {
          "tileName": "Invoice Number",
          "canMove": "Y",
          "tilePurpose": "Invoice Number desc",
          "mappedField": "order.invoices[0].invoiceNumber"
        },
        {
          "tileName": "Invoice Date",
          "canMove": "Y",
          "tilePurpose": "Invoice Date desc",
          "mappedField": "order.invoices[0].invoiceDate"
        },
        {
          "tileName": "Total No Of Pages",
          "canMove": "Y",
          "tilePurpose": "Total No of Pages desc",
          "mappedField": "order.invoices[0].totalNoOfPages"
        },
        {
          "tileName": "Invoice Type",
          "canMove": "Y",
          "tilePurpose": "Type of invoice having values X and Y",
          "mappedField": "order.invoices[0].invoiceType"
        },
        {
          "tileName": "Payment Instrument Type",
          "canMove": "Y",
          "tilePurpose": "Type of payment instrument desc",
          "mappedField": "order.invoices[0].paymentType"
        },
        {
          "tileName": "Invoice Value",
          "canMove": "Y",
          "tilePurpose": "Invoice Amount and Currency",
          "mappedField": "order.invoices[0].currency, order.invoices[0].amount "
        },
        {
          "tileName": "INCO Terms",
          "canMove": "Y",
          "tilePurpose": "INCO Terms desc",
          "mappedField": "order.invoices[0].incoTerms"
        },
        {
          "tileName": "Freight",
          "canMove": "Y",
          "tilePurpose": "Freight Amount and Currency",
          "mappedField": "order.invoices[0].freight"
        },
        {
          "tileName": "Insurance",
          "canMove": "Y",
          "tilePurpose": "Insurance Amount and Currency",
          "mappedField": "order.invoices[0].insurance"
        },
        {
          "tileName": "Consignor Exporter Code",
          "canMove": "Y",
          "tilePurpose": "Exporter Code desc",
          "mappedField": "order.invoices[0].exporterBusinessCode"
        },
        {
          "tileName": "Broker Code",
          "canMove": "Y",
          "tilePurpose": "Broker Code Desc",
          "mappedField": "order.invoices[0].brokerCode"
        },
        {
          "tileName": "Logistics Storage Provider Code",
          "canMove": "Y",
          "tilePurpose": "Logistics Storage Provider Code Desc",
          "mappedField": "order.invoices[0].logisticsProviderCode"
        },
        {
          "tileName": "Cargo Ownership",
          "canMove": "Y",
          "tilePurpose": "Cargo Ownership desc",
          "mappedField": "order.invoices[0].cargoOwnership"
        },
        {
          "tileName": "Associated E-Commerce Company",
          "canMove": "Y",
          "tilePurpose": "Associated E-Commerce Company Desc",
          "mappedField": "order.invoices[0].associatedEComm"
        },
        {
          "tileName": "Invoice Item Line Number",
          "canMove": "Y",
          "tilePurpose": "Invoice Item Line Number",
          "mappedField": "order.invoices[0].lineItems[0].lineNo"
        },
        {
          "tileName": "goodsCondition",
          "canMove": "Y",
          "tilePurpose": "goodsCondition new or old",
          "mappedField": "order.invoices[0].lineItems[0].goodsCondition"
        },
        {
          "tileName": "Goods Description ",
          "canMove": "Y",
          "tilePurpose": "Goods Description desc",
          "mappedField": "order.invoices[0].lineItems[0].goodsDescription"
        },
        {
          "tileName": "Quantity",
          "canMove": "Y",
          "tilePurpose": "Quantity and Measurement Unit",
          "mappedField": "order.invoices[0].lineItems[0].description"
        },
        {
          "tileName": "Weight",
          "canMove": "Y",
          "tilePurpose": "Weight and Measurement Unit",
          "mappedField": "order.invoices[0].lineItems[0].weight"
        },
        {
          "tileName": "Return Days",
          "canMove": "Y",
          "tilePurpose": "Return Days desc",
          "mappedField": "order.invoices[0].lineItems[0].returnDays"
        },
        {
          "tileName": "Supplementary Quantity",
          "canMove": "Y",
          "tilePurpose": "Supplementary Quantity and desc",
          "mappedField": "order.invoices[0].lineItems[0].supplementaryQty"
        },
        {
          "tileName": "Value of Goods",
          "canMove": "Y",
          "tilePurpose": "Value in local /foreign Currency",
          "mappedField": "order.invoices[0].lineItems[0].valueOfGoods"
        },
        {
          "tileName": "Country Of Origin",
          "canMove": "Y",
          "tilePurpose": "Country of origin",
          "mappedField": "order.invoices[0].lineItems[0].CountryOfOrigin"
        },
        {
          "tileName": "Previous Declaration Number",
          "canMove": "Y",
          "tilePurpose": "Previous Declaration Number desc",
          "mappedField": "order.invoices[0].lineItems[0].previousDeclarationNumber"
        },
        {
          "tileName": "Exemptions",
          "canMove": "Y",
          "tilePurpose": "Previous Declaration Number",
          "mappedField": "order.invoices[0].lineItems[0].exemptions"
        },
        {
          "tileName": "SKU Information",
          "canMove": "Y",
          "tilePurpose": "SKU Product Code, Quantity and Quantity UOM",
          "mappedField": "order.invoices[0].lineItems[0].sku"
        },
        {
          "tileName": "Discount",
          "canMove": "Y",
          "tilePurpose": "Discount Value / Percentage Original Value or Free of Cost",
          "mappedField": "order.invoices[0].lineItems[0].discount"
        },
        {
          "tileName": "permits",
          "canMove": "Y",
          "tilePurpose": "permits types and numbers",
          "mappedField": "order.invoices[0].lineItems[0].permits"
        },
        {
          "tileName": "vehicles",
          "canMove": "Y",
          "tilePurpose": "vehicle Details between items",
          "mappedField": "order.invoices[0].lineItems[0].vehicles"
        }
      ]
    }

    let modifiedData = [];
    actualData.tiles.map(data => {
      let obj = {
        "id": data.mappedField,
        "title": data.tileName,
        "label": "",
        "description": data.tilePurpose,
        "canMove": data.canMove,
        "draggable": data.canMove == 'Y' ? true : false
        // "tileName": "Order Number",
        //   "canMove": "N",
        //   "tilePurpose": "Order Number ",
        //   "mappedField": "order.orderID",
        //   "order": 1
      }
      modifiedData.push(obj);
    })
    let obj = {
      "lanes": [
        {
          "id": "ECOMMERCE",
          "title": "E-Commerce",
          "label": "",
          "style": {
            "width": '32%'
          },
          "cards": modifiedData
        },
        {
          "id": "WIP",
          "title": "Logistics Processor",
          "label": "",
          "style": {
            "width": '32%'
          },
          "cards": []
        },
        {
          "id": "BLOCKED",
          "title": "Declaration Processor",
          "label": "",
          "style": {
            "width": '32%'
          },
          "cards": []
        },
      ]
      // "lanes": [
      //   {
      //     "id": "ECOMMERCE",
      //     "title": "E-Commerce",
      //     "label": "",
      //     "style": {
      //       "width": 280
      //     },
      //     "cards": modifiedData
      //   }
      // ]
    }
    // })
    this.setState({
      boardData: obj
    })
  }

  ActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Delete":
        let result = confirm("Are you you want to delete?");
        if (result) {
          if (index > -1) {
            let a = this.state.relationshipData;
            a.splice(index, 1);
            this.setState({ relationshipData: a });
          }
        }
        break;
      default:
        break;
    }
  }


  dateChangeWorkboard(toDate, fromDate) {
    this.setState({
      fromDateWrkBrd: fromDate,
      toDateWrkBrd: toDate
    });

    // console.log('to check the case', fromDate, toDate)
    this.props.actions.generalProcess(constants.getDashboardData, {
      action: 'getDashboardData',
      searchCriteria: {
        startDate: fromDate,
        endDate: toDate,
        trackCourier: this.state.tracking.courier,
        trackEcommerce: this.state.tracking.ecommerce
      }
    })
  }

  componentWillUnmount() {
    // console.log('interval', interval);
    clearInterval(interval)
    // console.log('interval', interval);

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    this.setState({
      // graphTypes: nextProps.typeData.graph_types
    })
  }


  
  newData = (handle) => {
    console.log(handle);
    // eventBus = handle
  }

  render() {
    let actualData = {
      "tiles": [
        {
          "tileName": "Order Number",
          "canMove": "N",
          "tilePurpose": "Order Number ",
          "mappedField": "order.orderID",
          "order": 1
        },
        {
          "tileName": "Order Date",
          "canMove": "N",
          "tilePurpose": "Order Date ",
          "mappedField": "order.orderID"
        },
        {
          "tileName": "shipTo",
          "canMove": "N",
          "tilePurpose": "Shipment Done to name",
          "mappedField": "order.shipTo"
        },
        {
          "tileName": "ShipToAddress",
          "canMove": "N",
          "tilePurpose": "Shipment Done to address",
          "mappedField": "order.shipToAddress"
        },
        {
          "tileName": "Invoice Number",
          "canMove": "Y",
          "tilePurpose": "Invoice Number",
          "mappedField": "order.invoices[0].invoiceNumber"
        },
        {
          "tileName": "Invoice Date",
          "canMove": "Y",
          "tilePurpose": "Invoice Date",
          "mappedField": "order.invoices[0].invoiceDate"
        },
        {
          "tileName": "Invoice Type",
          "canMove": "Y",
          "tilePurpose": "Type of invoice having values X and Y",
          "mappedField": "order.invoices[0].invoiceType"
        },
        {
          "tileName": "Payment Instrument Type",
          "canMove": "Y",
          "tilePurpose": "Type of payment instrument",
          "mappedField": "order.invoices[0].paymentType"
        },
        {
          "tileName": "Invoice Item Line Number",
          "canMove": "Y",
          "tilePurpose": "Invoice Item Line Number",
          "mappedField": "order.invoices[0].lineItems[0].lineNo"
        },
        {
          "tileName": "Hs code ",
          "canMove": "Y",
          "tilePurpose": "hs code or commodity Code",
          "mappedField": "order.invoices[0].lineItems[0].hscode"
        },
        {
          "tileName": "goodsCondition",
          "canMove": "Y",
          "tilePurpose": "goodsCondition new or old",
          "mappedField": "order.invoices[0].lineItems[0].goodsCondition"
        },
        {
          "tileName": "permits",
          "canMove": "Y",
          "tilePurpose": "permits types and numbers",
          "mappedField": "order.invoices[0].lineItems[0].permits"
        },
        {
          "tileName": "vehicles",
          "canMove": "Y",
          "tilePurpose": "vehicle Details between items",
          "mappedField": "order.invoices[0].lineItems[0].vehicles"
        }
      ]
    }
    let data = {
      "lanes": [
        {
          "id": "PLANNED",
          "title": "Planned Tasks",
          "label": "20/70",
          "style": {
            "width": 280
          },
          "cards": [
            {
              "id": "Milk",
              "title": "Buy milk",
              "label": "15 mins",
              "description": "2 Gallons of milk at the Deli store"
            },
            {
              "id": "Plan2",
              "title": "Dispose Garbage",
              "label": "10 mins",
              "description": "Sort out recyclable and waste as needed"
            },
            {
              "id": "Plan3",
              "title": "Write Blog",
              "label": "30 mins",
              "description": "Can AI make memes?"
            },
            {
              "id": "Plan4",
              "title": "Pay Rent",
              "label": "5 mins",
              "description": "Transfer to bank account"
            }
          ]
        },
        {
          "id": "WIP",
          "title": "Work In Progress",
          "label": "10/20",
          "style": {
            "width": 280
          },
          "cards": [
            {
              "id": "Wip1",
              "title": "Clean House",
              "label": "30 mins",
              "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
            }
          ]
        },
        {
          "id": "BLOCKED",
          "title": "Blocked",
          "label": "0/0",
          "style": {
            "width": 280
          },
          "cards": []
        },
      ]
    }

    const CustomCard = props => {
      return (
        <div style={{
          backgroundColor: props.canMove == 'Y' ? 'white' : '#7b7474b5',
          opacity: props.canMove == 'Y' ? 1 : 0.5,
          padding: '5px'
        }}>
          <div style={{ width: '100%', background: 'red' }}></div>
          <header
            style={{
              borderBottom: this.state.showDescription ? '1px solid #eee' : '0px',
              paddingBottom: 6,
              marginBottom: this.state.showDescription ? '10px' : '0px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: this.state.showDescription ? 'space-between' : 'right',
              color: props.cardColor
            }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: props.canMove == 'N' ? 'white' : '#544e4e'}}>{props.title}</div>
            {/* <div style={{fontSize: 11}}>{props.dueOn}</div> */}
          </header>
          <div style={{ fontSize: 12 }}>
            {this.state.showDescription &&
              <div style={{ color: props.canMove == 'N' ? 'white' : '#312e2ef2' }}>{props.description}</div>
            }
            {/* <div style={{padding: '5px 0px'}}>
              <i>{props.title}</i>
            </div> */}
            {/* <div style={{marginTop: 10, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold'}}>
              {props.title}
            </div> */}
          </div>
        </div>
      )
    }

    console.log("state-->", this.state)
    console.log("props-->", this.props)
    if (!this.state.isLoading)
      return (
        <Wrapper title="E-Commerce Order Template">
          {/* <Portlet title={'Widget Creator'}> */}
          <div style={{
            display: 'flex', alignItems: 'center',
           
          }} className="row">
            <div className="col-md-2"> <label htmlFor="">Business Object type</label> </div>
            <div className="col-md-4">
              <ComboBoxNew
                status={(this.state.errors && this.state.errors.process) ? "ERROR" : undefined}
                style={{ marginTop: "14px" }}
                fieldname='processor'
                className="form-control"
                formname='Container'
                columns={12}
                allowValue={false}
                isDDL={true}
                // selected={_.get(_.get(this.state, 'orders', []).filter(item =>
                //   item.key == _.get(this.state.Container, 'processor', '')
                // ), `[${0}].value`, undefined)}
                placeholder={'Orders'}
                state={this.state}
                typeName="orders"
                dataSource={_.get(this.state, "orders", {})}
                actionHandler={this.generalHandler}
              />
              {/* <select className="col-md-12 form-group form-control" name="" id="">
                <option value=""></option>
              </select> */}
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center',
            
            marginBottom: '30px'
          }} className="row">
            <div className="col-md-2"> <label htmlFor="">Template Name</label></div>
            <div className="col-md-4">
              <Input
                divStyle={{ padding: '0' }}
                status={(this.state.errors && this.state.errors.passportNo) ? "ERROR" : undefined}
                fieldname='passportNo'
                // placeholder={utils.getLabelByID('Passport Number*')}
                formname='body'
                columns='12'
                state={this.state}
                actionHandler={this.generalHandler}
                className="form-control"
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row-reverse'
          }} className="row">
            <div className="col-md-2">
              <input type="checkbox" checked={this.state.showDescription} onChange={() => this.setState({ showDescription: !this.state.showDescription })} />
            </div>
            <div className="col-md-4">
              <label htmlFor="">Show Description</label>
            </div>
          </div>
          <div>
            <div className="header-titles">
              <div className="title-declaration"> <div className=""> <img className="column-headings" src="\assets\Resources\images\amazon.png" alt="" /> </div> </div>
              <div className="title-declaration"> <div className=""> <img className="column-headings" src="\assets\Resources\images\dhl.png" alt="" /> </div> </div>
              <div className="title-declaration"> <div className=""> <img className="column-headings" src="\assets\Resources\images\dhl.png" alt="" /> </div> </div>
            </div>
          </div>
          {this.state.boardData &&
            <Board onDataChange={this.newData.bind(this)} data={this.state.boardData} laneDraggable={false} customCardLayout draggable >
              <CustomCard />
            </Board>
          }

          {/* </Portlet> */}
          <div className="row">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn green">Save</button>
            </div>
          </div>
        </Wrapper>
      );
    else
      return (<div className="loader" > {utils.getLabelByID("Loading")}</div>)
  }
}

let dataArray = [];

function mapStateToProps(state, ownProps) {
  return {
    //  dataArray.push(state.app.data && Object.keys(state.app.data).length > 0 ? state.app.data.widgetData : []),
    typeData: _.get(state.app.typeData, 'data', undefined),
    getDashboardData: _.get(state.app, 'getDashboardData', undefined),
    entityList: state.app.entityList
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}
function customActionHandler(formname, fieldname, type, e) {
  let value = e.target.value;
  this.sendCall(value)
}
EcommerceOrderTemplate.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(EcommerceOrderTemplate);