/*standard imports*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TileUnit from '../common/customTileUnit.jsx';
import * as actions from '../actions/generalAction';
import Portlet from '../common/Portlet.jsx';
import ModalBox from '../common/ModalBox.jsx';
import * as constants from '../constants/Communication.js';
import * as utils from '../common/utils.js';
import Table from '../common/Datatable.jsx';

/*container specific imports*/


class RewardsProviderDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageSize: 10,
      totalRecords: undefined,
      currentPageNo: 1,
      stats: undefined,
      pointSummary: undefined,
      settlementList: undefined
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.PGActionHandler = this.PGActionHandler.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.pgStats, {});
    this.props.actions.generalProcess(constants.pgPointSummary, {});
    this.props.actions.generalProcess(constants.pgSettlementList, {
      page: {
        currentPageNo: this.state.currentPageNo,
        pageSize: this.state.pageSize
      }
    });
    this.refreshScreen();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stats && nextProps.settlementList && nextProps.pointSummary) {
      this.setState({
        stats: nextProps.stats,
        settlementList: nextProps.settlementList,
        pointSummary: nextProps.pointSummary,
        totalRecords: nextProps.totalRecords,
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
      _this.props.actions.generalProcess(constants.pgStats, {});
      _this.props.actions.generalProcess(constants.pgPointSummary, {});
      _this.props.actions.generalProcess(constants.pgSettlementList, {
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
      this.props.actions.generalProcess(constants.pgSettlementList, {
        page: {
          currentPageNo: pageNo,
          pageSize: this.state.pageSize
        }
      });
    }
  }

  updateState(data) {
    this.setState(data);
  }

  PGActionHandler({actionName, index}){
    const item = this.state.settlementList[index];
    switch (actionName){
      case "Settle":
        this.props.actions.generalProcess(constants.pgSettlement, {index: item.index});
        break;
    }
  }

  render() {
    if (!this.state.isLoading) {

      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <TileUnit data={this.state.stats.dashboardTiles}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Portlet title={"Latest Settlements"}>
                <Table
                  pagination={true}
                  export={false}
                  search={false}
                  gridColumns={utils.getGridColumnByName("settlementsList")}
                  componentFunction={this.PGActionHandler}
                  gridData={this.state.settlementList}
                  pageChanged={this.pageChanged}
                  activePage={this.state.currentPageNo}
                  pageSize={this.state.pageSize}
                  totalRecords={this.state.totalRecords}
                />
              </Portlet>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Portlet title={"Points Summary"}>
                <Table
                  pagination={false}
                  export={false}
                  search={false}
                  gridColumns={utils.getGridColumnByName("pointSummary")}
                  componentFunction={this.PGActionHandler}
                  gridData={this.state.pointSummary}
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
    stats: state.app.adminStats.data,
    settlementList: state.app.Settlements.data,
    pointSummary: state.app.pointSummary.data,
    totalRecords: state.app.Settlements.count
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

RewardsProviderDashboard.displayName = "RewardsProvider_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(RewardsProviderDashboard);