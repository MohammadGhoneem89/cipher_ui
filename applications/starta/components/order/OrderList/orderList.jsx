/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import * as requestCreator from '../../../../core/common/request.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import DateControl from '../../../../core/common/DateControl.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Input from '../../common/Input.jsx';
import Combobox from '../../common/Select.jsx';
import Label from '../../common/Lable.jsx';
import * as gen from '../../common/generalActionHandler';

import _ from 'lodash';

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
      isLoading: false,
      gridData: [],
      orderSearch: {},
      fromDate: '',
      toDate: ''
    };
    this.generalHandler = gen.generalHandler.bind(this);
  }

  getRequest = isFormSubmit => {
    let fromDate = this.state.fromDate || '',
      toDate = this.state.toDate || '',
      contractID = this.state.orderSearch.contractID || '',
      orderID = this.state.orderSearch.orderID || '',
      orderStatus = this.state.orderSearch.orderStatus || '';

    let searchCriteria = {};

    if (fromDate != '') searchCriteria.fromDate = fromDate;

    if (toDate != '') searchCriteria.toDate = toDate;

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

  formSubmit = () => {
    this.props.actions.generalProcess(constants.getOrderList, this.getRequest(true));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.getOrderList && this.state.typeData) {
      nextProps.getOrderList.forEach(order => {
        order.orderStatus = this.getStatusLabel(order.status);
      });
    }
    this.setState({
      gridData: nextProps.getOrderList,
      page: nextProps.getPage,
      typeData: nextProps.typeData,
      isLoading: false
    });

  }

  getStatusLabel = status => {
    if (this.state.typeData.Status) {
      let {label} = this.state.typeData.Status.find(obj => obj.value == status);
      return label;
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Status']));
    this.props.actions.generalProcess(constants.getOrderList, this.getRequest());
  }

  componentWillUnmount() {
  }

  onFromDateChange = value => {
    this.state.fromDate = value;
  };

  onToDateChange = value => {
    this.state.toDate = value;
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
    this.setState({page});
  };

  clearFields = () => {
    this.setState({
      orderSearch: {},
      fromDate: '',
      toDate: ''
    });
  };

  render() {
    if (this.state.isLoading) {
      return <div className="loader"> {utils.getLabelByID('loading')}</div>;
    }
    return (
      <div>
        <Portlet title={utils.getLabelByID('Order List Filter(s)')}>
          <Row>
            <Col col="6">
              <Label text={utils.getLabelByID('From Date')} columns="4"/>
              <div className="form-group col-md-8" id="OrderSearch">
                <DateControl id="fromDate" dateChange={this.onFromDateChange}/>
              </div>
            </Col>
            <Col col="6">
              <Label text={utils.getLabelByID('To Date')} columns="4"/>
              <div className="form-group col-md-8">
                <DateControl id="toDate" dateChange={this.onToDateChange}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <Label text={utils.getLabelByID('Contract ID')} columns="4"/>
              <Input fieldname="contractID" formname="orderSearch" columns="8" state={this.state}
                     actionHandler={this.generalHandler} className="form-control"/>
            </Col>
            <Col col="6">
              <Label text={utils.getLabelByID('Order ID')} columns="4"/>
              <Input fieldname="orderID" formname="orderSearch" columns="8" state={this.state}
                     actionHandler={this.generalHandler} className="form-control"/>
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <Label text={utils.getLabelByID('Order Status')} columns="4"/>
              <Combobox fieldname="orderStatus" formname="orderSearch" columns="8" state={this.state} typeName="Status"
                        dataSource={this.state.typeData} actionHandler={this.generalHandler} className="form-control"/>
            </Col>
          </Row>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group col-md-12">
                <div className="btn-toolbar pull-right">
                  <button type="submit" className="btn green" onClick={this.formSubmit}>
                    {utils.getLabelByID('Search')}
                  </button>
                  {/* <button type="button" className="btn btn-grey" onClick={this.clearFields}>
                                        {utils.getLabelByID('Clear')}
                                    </button> */}
                </div>
              </div>
            </div>
          </div>
        </Portlet>
        <Portlet title={'Orders'} actions={this.state.actions} isPermissioned={true}>
          {this.state.gridData.map(obj => {
            obj.action = [
              {
                label: 'View',
                URI: ['/strata/viewOrder'],
                params: '_id',
                iconName: 'icon-docs'
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
  return {actions: bindActionCreators(actions, dispatch)};
}

OrderList.displayName = 'Order List';
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
