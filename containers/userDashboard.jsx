/*standard imports*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TileUnit from '../components/customTileUnit.jsx';
import * as actions from '../actions/generalAction';
import Portlet from '../common/Portlet.jsx';
import ModalBox from '../common/ModalBox.jsx';
import * as constants from '../constants/Communication.js';
import * as utils from '../common/utils.js';
import Table from '../standard/Datatable.jsx';

/*container specific imports*/


class UserDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageSize: 10,
      totalRecords: undefined,
      currentPageNo: 1,
      userPoints: undefined,
      userOrderList: undefined,
      catalogue: undefined,
      selectedItem: undefined,
      purchaseModalIsOpen: false
    };
    this.pageChanged = this.pageChanged.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.userPoints, {});
    this.props.actions.generalProcess(constants.getMerchantCatalogue, {});
    this.props.actions.generalProcess(constants.userOrderList, {
      page: {
        currentPageNo: this.state.currentPageNo,
        pageSize: this.state.pageSize
      }
    });
    this.refreshScreen();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userPoints && nextProps.userOrderList) {
      this.setState({
        userPoints: nextProps.userPoints,
        userOrderList: nextProps.userOrderList,
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
      _this.props.actions.generalProcess(constants.userPoints, {});
      _this.props.actions.generalProcess(constants.getMerchantCatalogue, {});
      _this.props.actions.generalProcess(constants.userOrderList, {
        page: {
          currentPageNo: _this.state.currentPageNo,
          pageSize: _this.state.pageSize
        }
      });
    }, 10000);
  }

  pageChanged(pageNo) {
    if (pageNo !== undefined) {
      this.setState({currentPageNo: pageNo});
      this.props.actions.generalProcess(constants.userPoints, {});
      this.props.actions.generalProcess(constants.userOrderList, {
        page: {
          currentPageNo: pageNo,
          pageSize: this.state.pageSize
        }
      });
    }
  }

  purchaseOrder(e) {
    e.preventDefault();
    let val = $(e.target).serialize();

    val = val.split('&');
    let data = {id: this.state.selectedItem.id};
    val.forEach(value => {
      const temp = value.split('=');
      data[temp[0]] = temp[1];
    });
    this.props.actions.generalProcess(constants.userPlaceOrder, data)
      .then(() => {
        this.updateState({purchaseModalIsOpen: false});
      });
  }

  updateState(data) {
    this.setState(data);
  }

  purchaseForm() {
    let _this = this;
    let purchaseActions = [
      {
        type: "icon",
        className: "btn btn-default",
        label: "ADD",
        icon: "close",
        actionHandler: this.updateState.bind(this, {purchaseModalIsOpen: false})
      }
    ];
    return (
      <Portlet title={"Purchase"} noCollapse={true} actions={purchaseActions}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>Item</label>
              <div className="col-md-8">
                <select className="form-control" onChange={(e) => {
                  _this.setState({selectedItem: this.state.catalogue[e.target.value]});
                }}>
                  <option>Please Select</option>
                  {this.state.catalogue.map((item, index) => {
                    return <option value={index} key={index}>{item.label}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        {_this.state.selectedItem &&
        <form onSubmit={this.purchaseOrder.bind(this)}>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label"><span
                    style={{textAlign: "left", fontWeight: "bold"}}>Category: </span>
                    {_this.state.selectedItem.category}
                  </label>
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label"><span style={{textAlign: "left", fontWeight: "bold"}}>Price: </span>
                    {_this.state.selectedItem.unitPrice}
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label className="control-label" style={{textAlign: "left", fontWeight: "bold"}}>Quantity</label>
                </div>
                <div className="form-group col-md-8">
                  <input name="quantity" type="text" className="form-control"/>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label className="control-label" style={{textAlign: "left", fontWeight: "bold"}}>Location</label>
                </div>
                <div className="form-group col-md-8">
                  <input name="location" type="text" className="form-control"/>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="row">
                <div className="form-group col-md-4">
                  <img src={_this.state.selectedItem.imageURL}  height="200px"/>
                </div>
                <div className="form-group col-md-8">
                  {_this.state.selectedItem.description}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="btn-toolbar pull-right">
              <button type="submit" className="pull-right btn green">
                Submit
              </button>
            </div>
          </div>
        </form>}
      </Portlet>
    );
  }

  render() {
    if (!this.state.isLoading) {
      let actions = [
        {
          type: "link",
          className: "btn btn-default",
          label: "Add",
          icon: "plus",
          actionHandler: this.updateState.bind(this, {
            purchaseModalIsOpen: true
          })
        }
      ];

      return (
        <div>
          <ModalBox isOpen={this.state.purchaseModalIsOpen}>
            {this.purchaseForm()}
          </ModalBox>
          <div className="row">
            <div className="col-md-12">
              <TileUnit data={this.state.userPoints}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Portlet title={"Orders"} actions={actions}>
                <Table
                  pagination={true}
                  export={false}
                  search={false}
                  gridColumns={utils.getGridColumnByName("buyerOrders")}
                  componentFunction={""}
                  gridData={this.state.userOrderList}
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
    userPoints: state.app.userPoints.data,
    userOrderList: state.app.order.data,
    totalRecords: state.app.order.count,
    catalogue: state.app.catlogue.data
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

UserDashboard.displayName = "RAD_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);