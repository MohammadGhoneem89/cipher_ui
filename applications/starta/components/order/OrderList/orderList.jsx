/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as utils from '../../../../../core/common/utils.js';
import Table from '../../../../../core/common/Datatable.jsx';
import * as actions from '../../../../../core/actions/generalAction';
import * as constants from '../../../../../core/constants/Communication.js';
import * as requestCreator from '../../../../../core/common/request.js';
import Portlet from '../../../../../core/common/Portlet.jsx';
import DateControl from '../../../../../core/common/DateControl.jsx';
import Row from '../../../common/Row.jsx';
import Col from '../../../common/Col.jsx';
import Input from '../../../common/Input.jsx';
import Combobox from '../../../common/Select.jsx';
import Label from '../../../common/Lable.jsx';
import * as gen from '../../../common/generalActionHandler';
import * as toaster from '../../../../../core/common/toaster.js';
import _ from 'lodash';
const orderStatus = [
  {
    "label": "Order Received",
    "value": "001"
  },
  {
    "label": "Purchase Order",
    "value": "002"
  },
  {
    "label": "Component Manufacturing",
    "value": "003"
  },
  {
    "label": "Part Identification",
    "value": "004"
  },
  {
    "label": "Part Inspection",
    "value": "005"
  },
  {
    "label": "Final Inspection And Identification",
    "value": "006"
  },
  {
    "label": "Part Testing",
    "value": "007"
  },
  {
    "label": "Assembly",
    "value": "008"
  },
  {
    "label": "Paint Or Finish",
    "value": "009"
  },
  {
    "label": "Dispatched",
    "value": "010"
  },
  {
    "label": "Received",
    "value": "011"
  },
  {
    "label": "Inspected",
    "value": "012"
  },
  {
    "label": "Accepted",
    "value": "013"
  },
  {
    "label": "Rejected",
    "value": "014"
  },
  {
    "label": "Reviewed",
    "value": "015"
  },
  {
    "label": "Concession",
    "value": "016"
  },
  {
    "label": "Scrapped",
    "value": "017"
  },
  {
    "label": "Payment Order",
    "value": "018"
  },
  {
    "label": "Paid",
    "value": "019"
  }
]
class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [],
      page: {
        pageSize: 10,
        currentPageNo: 1,
        totalRecords: 0
      },
      isLoading: true,
      gridData: [],
      orderSearch: {},
      fromDate: undefined,
      toDate: undefined,
      orderStatus: '',
      orderIDhistory: true,

    };
    this.isDateVal = true;
    this.generalHandler = gen.generalHandler.bind(this);
  }

  getRequest = (isFormSubmit, orderIDarg) => {

    if (!(typeof (orderIDarg) === "string")) {
      orderIDarg = ''
    }

    let fromDate = this.state.fromDate,
      toDate = this.state.toDate,
      contractID = this.state.orderSearch.contractID || '',
      orderID = this.state.orderSearch.orderID || orderIDarg || '',
      orderStatus = this.state.orderStatus || '';

    let searchCriteria = {};

    if (fromDate) { searchCriteria.fromDate = fromDate };

    if (toDate) searchCriteria.toDate = toDate;

    if (fromDate > toDate) {
      toaster.showToast("To date cannot be less than from date", "ERROR");
      return false;
    }

    if (contractID != '') searchCriteria.contractID = contractID;

    if (orderID != '') searchCriteria.orderID = orderID;

    if (orderStatus != '') searchCriteria.orderStatus = orderStatus;

    console.log('searchCriteria: ', searchCriteria);

    let request = {
      body: {
        page: {
          currentPageNo: isFormSubmit ? 1 : this.state.page.currentPageNo,
          pageSize: this.state.page.pageSize
        },
        searchCriteria
      }
    };

    if (isFormSubmit) {
      this.updateCurrentPage(1);
    }
    return request;
  };

  formSubmit = (orderID = undefined) => {
    this.props.actions.generalProcess(constants.getOrderList, this.getRequest(true, orderID));


  };



  componentWillReceiveProps(nextProps) {

    if (nextProps.getOrderList) {

      console.log(nextProps.getOrderList, "nextProps.getOrderList")
      this.setState({
        // typeData: nextProps.typeData,
        gridData: this.formatData(nextProps.getOrderList),
        page: nextProps.getPage,
        isLoading: false,

      });

      if (this.props.location.state) {
        if (!(this.props.location.state.orderID === _.get(this.state, 'orderSearch.orderID', ''))) {
          this.setState({
            orderIDhistory: false
          })
        }
      }

    }
  }

  formatData = (gridData) => {
    for (let i = 0; i < gridData.length; i++) {
      for (let j = 0; j < orderStatus.length; j++) {
        if (gridData[i].status && gridData[i].status == orderStatus[j].value) {
          gridData[i].status = orderStatus[j].label;
          break;
        }
      }
    }
    return gridData;
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['orderStatus']));


    console.log(this.props.location.state, 'PROPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
    if (this.props.location.state && this.state.orderIDhistory) {
      this.setState({
        orderSearch: {
          ...this.state.orderSearch,
          orderID: this.props.location.state.orderID,
          orderIDhistory: false
        }
      })
      console.log('submitting Form');
      this.formSubmit(this.props.location.state.orderID);
    } else {
      this.props.actions.generalProcess(constants.getOrderList, this.getRequest());
    }
  }

  componentWillUnmount() {
  }

  onFromDateChange = (value) => {

    value == 'Invalid date' ? this.state.fromDate = undefined : this.state.fromDate = value;
  };

  onToDateChange = (value) => {

    value == 'Invalid date' ? this.state.toDate = undefined : this.state.toDate = value;
  };

  searchCallBack = keyWord => {
  };
  pageChanged = pageNo => {
    this.updateCurrentPage(pageNo);
    this.props.actions.generalProcess(constants.getOrderList, this.getRequest());
  };

  updateCurrentPage = pageNo => {
    let page = this.state.page;
    page.currentPageNo = pageNo;
    this.setState({ page });
  };

  clearFields = () => {
    this.setState({
      orderSearch: {},
      fromDate: '',
      toDate: ''
    });
  };
  reset = () => {
    this.setState({
      searchCriteria: {},
      fromDate: undefined,
      toDate: undefined,
      orderStatus: '',
      orderSearch: {
        contractID: '',
        orderID: ''
      }

    });
    this.isDateVal=false;
    let request = {
      body: {
        page: {
          currentPageNo: 1,
          pageSize: 10
        },
        searchCriteria: {}
      }
    };

    this.props.actions.generalProcess(constants.getOrderList, request);
    console.log("RESET", this.state.fromDate, this.state.toDate)
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log("STATE.FROMDATE", this.state.fromDate ? this.state.fromDate : "")
    if (this.state.isLoading) {
      return <div className="loader"> {utils.getLabelByID('loading')}</div>;
    }
    return (
      <div>
        <Portlet title={utils.getLabelByID('Order List Filter(s)')}>
          <Row >
            <Col col="6">
              <Label text={utils.getLabelByID('From Date')} columns="4" />
              <div className="form-group col-md-8" id="OrderSearch">
                <DateControl id="fromDate" dateChange={this.onFromDateChange} defaultValue={this.state.fromDate ? utils.UNIXConvertToDate(this.state.fromDate) : ''} />
              </div>
            </Col>
            <Col col="6">
              <Label text={utils.getLabelByID('To Date')} columns="4" />
              <div className="form-group col-md-8" id="OrderSearch">
                <DateControl id="toDate" dateChange={this.onToDateChange} defaultValue={this.state.toDate ? utils.UNIXConvertToDate(this.state.toDate) : ''} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <Label text={utils.getLabelByID('Contract ID')} columns="4" />
              <Input id="contractID" fieldname="contractID" formname="orderSearch" columns="8"
                state={this.state}
                actionHandler={this.generalHandler} className="form-control" />
            </Col>
            <Col col="6">
              <Label text={utils.getLabelByID('Order ID')} columns="4" />
              <Input id="orderID" fieldname="orderID" formname="orderSearch" columns="8" state={this.state}
                actionHandler={this.generalHandler} className="form-control" />
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <Label text={utils.getLabelByID('Order Status')} columns="4" />
              <div className="col-md-8">
                <select id="orderStatus" name="orderStatus" className="form-control" value={this.state.orderStatus} onChange={this.onChange} >
                  <option key="-1" value="">Select</option>
                  {
                    orderStatus.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>{option.label}</option>
                      );
                    })
                  }
                </select>
              </div>

              {/* 
              <Combobox fieldname="orderStatus" formname="orderSearch" columns="8" state={this.state} typeName="Status"
                dataSource={this.state.typeData} actionHandler={this.generalHandler} className="form-control" /> 
              */}


            </Col>
          </Row>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group col-md-12">
                <div className="btn-toolbar pull-right">
                  <button type="submit" className="btn green" onClick={this.formSubmit}>
                    {utils.getLabelByID('Search')}
                  </button>
                  <button type="clear" className="btn green" onClick={this.reset}
                  >
                    {utils.getLabelByID("Clear")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {
            (this.props.location.state && this.state.orderIDhistory) &&
            <div>

              <div className="alert alert-dark" style={{ textAlign: "center", backgroundColor: "green", color: "white" }}>
                Order Created Successfully with order id : <strong>{this.props.location.state.orderID}</strong>
              </div>


            </div>

          }



        </Portlet>
        <Portlet title={'Orders'} actions={this.state.actions} isPermissioned={true}>
          {this.state.gridData.map(obj => {
            obj.action = [
              {
                label: 'View',
                URI: ['/strata/viewOrder'],
                params: '_id',
                iconName: "fa fa-eye"
              }
            ];
          })}
          <Table
            gridColumns={utils.getGridColumnByName('orderList')}
            gridData={this.state.gridData}
            totalRecords={this.props.getPage.totalRecords}
            pageChanged={this.pageChanged}
            pageSize={10}
            pagination={true}
            searchCallBack={this.searchCallBack}
            export={false}
            search={true}
            activePage={this.state.page.currentPageNo}
          />
        </Portlet>
      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return {
    getOrderList: _.get(state.app, 'getOrders.searchResult', []),
    getPage: _.get(state.app, 'getOrders.pageData', {}),
    typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

OrderList.displayName = 'Order List';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
