/*standard imports*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TileUnit from '../components/customTileUnit.jsx';
import * as actions from '../actions/generalAction';
import Portlet from '../common/Portlet.jsx';
import * as constants from '../constants/Communication.js';
import * as utils from '../common/utils.js';
import Table from '../standard/Datatable.jsx';

/*container specific imports*/


class MerchantDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageSize: 10,
      totalRecords: undefined,
      currentPageNo: 1,
      merchantPoints: undefined,
      orderList: undefined,
      catalogue: undefined,
      rewardList: undefined,
      selectedItem: 0,
      purchaseModalIsOpen: false
    };
    this.pageChangedOrder = this.pageChangedOrder.bind(this);
    this.pageChangedCatalogue = this.pageChangedCatalogue.bind(this);
    this.merchantActionHandler = this.merchantActionHandler.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.merchantPoints, {});
    this.props.actions.generalProcess(constants.getMerchantCatalogue, {
      page: {
        currentPageNo: this.state.currentPageNo,
        pageSize: this.state.pageSize
      }
    });
    this.props.actions.generalProcess(constants.getOrderList, {
      page: {
        currentPageNo: this.state.currentPageNo,
        pageSize: this.state.pageSize
      }
    });
    this.props.actions.generalProcess(constants.getRewardCoinList, {
      page: {
        currentPageNo: this.state.currentPageNo,
        pageSize: this.state.pageSize
      }
    });
    this.refreshScreen();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.merchantPoints && nextProps.orderList && nextProps.catalogue && nextProps.rewardList) {
      this.setState({
        merchantPoints: nextProps.merchantPoints,
        orderList: nextProps.orderList,
        rewardList: nextProps.rewardList,
        totalRecords: nextProps.totalRecords,
        catalogue: nextProps.catalogue,
        isLoading: false
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandler);
  }

  refreshScreen() {
    let _this = this;
    this.timeoutHandler = setInterval(() => {
      _this.props.actions.generalProcess(constants.merchantPoints, {});
      _this.props.actions.generalProcess(constants.getOrderList, {
        page: {
          currentPageNo: _this.state.currentPageNo,
          pageSize: _this.state.pageSize
        }
      });
      _this.props.actions.generalProcess(constants.getMerchantCatalogue, {
        page: {
          currentPageNo: 1,
          pageSize: _this.state.pageSize
        }
      });
      _this.props.actions.generalProcess(constants.getRewardCoinList, {
        page: {
          currentPageNo: _this.state.currentPageNo,
          pageSize: _this.state.pageSize
        }
      });


    }, 10000);
  }

  pageChangedOrder(pageNo) {
    if (pageNo !== undefined) {
      this.setState({currentPageNo: pageNo});
      this.props.actions.generalProcess(constants.getOrderList, {
        page: {
          currentPageNo: pageNo,
          pageSize: this.state.pageSize
        }
      });
    }
  }

  pageChangedCatalogue(pageNo) {
    if (pageNo !== undefined) {
      this.setState({currentPageNo: pageNo});
      this.props.actions.generalProcess(constants.getMerchantCatalogue, {
        page: {
          currentPageNo: pageNo,
          pageSize: this.state.pageSize
        }
      });
    }
  }

  // purchaseOrder(e) {
  //   e.preventDefault();
  //   let val = $( e.target ).serialize();
  //
  //   val = val.split('&');
  //   let data = {id: this.state.selectedItem.id};
  //   val.forEach(value=>{
  //     const temp = value.split('=');
  //     data[temp[0]]=temp[1];
  //   });
  //   this.props.actions.generalProcess(constants.userPlaceOrder, data)
  //     .then(()=>{
  //       this.updateState({purchaseModalIsOpen: false})
  //     });
  // }

  updateState(data) {
    this.setState(data);
  }

  merchantActionHandler({actionName, index}) {
    console.log({actionName, index});
    switch (actionName) {
      case "Mark Complete":
        let id = this.state.orderList[index].id;
        this.props.actions.generalProcess(constants.merchantMarkComplete, {id});
        break;
      case "Request Settlement":
        this.props.actions.generalProcess(constants.getRequestSettlement, {});
        break;
    }
  }

  render() {
    if (!this.state.isLoading) {
      // let actions = [
      //   {
      //     type: "link",
      //     className: "btn btn-default",
      //     label: "Add",
      //     icon: "plus",
      //     actionHandler: this.updateState.bind(this, {
      //       purchaseModalIsOpen: true
      //     })
      //   }
      // ];

      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <TileUnit data={this.state.merchantPoints.dashboardTiles}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Portlet title={"Orders"}>
                <Table
                  pagination={true}
                  export={false}
                  search={false}
                  gridColumns={utils.getGridColumnByName("merchantOrders")}
                  componentFunction={this.merchantActionHandler}
                  gridData={this.state.orderList}
                  pageChanged={this.pageChangedOrder}
                  activePage={this.state.currentPageNo}
                  pageSize={this.state.pageSize}
                  totalRecords={this.state.totalRecords}
                />
              </Portlet>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Portlet title={"Catalogue"}>
                <Table
                  pagination={false}
                  export={false}
                  search={false}
                  gridColumns={utils.getGridColumnByName("catalogue")}
                  componentFunction={""}
                  gridData={this.state.catalogue}
                  pageChanged={this.pageChangedCatalogue}
                  activePage={this.state.currentPageNo}
                  pageSize={this.state.pageSize}
                  totalRecords={this.state.totalRecords}
                />
              </Portlet>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Portlet title={"Reward Coins"}>
                <Table
                  pagination={false}
                  export={false}
                  search={false}
                  gridColumns={utils.getGridColumnByName("rewardList")}
                  componentFunction={this.merchantActionHandler}
                  gridData={this.state.rewardList}
                  pageChanged={this.pageChanged}
                  activePage={this.state.currentPageNo}
                  pageSize={this.state.pageSize}
                  totalRecords={this.state.totalRecords}
                />
              </Portlet>
            </div>
          </div>
        </div>
      );
    }
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    merchantPoints: state.app.merchantPoints.data,
    orderList: state.app.order.data,
    totalRecords: state.app.order.count,
    catalogue: state.app.catlogue.data,
    rewardList: state.app.rewardList.data
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

MerchantDashboard.displayName = "Merchant_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(MerchantDashboard);