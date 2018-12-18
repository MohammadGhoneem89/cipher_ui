/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import DateRangePicker from '../../common/DateRangePicker.jsx';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
/*container specific imports*/
import TileUnit from '../../common/tileUnit.jsx';
import Table from '../../common/Datatable.jsx';
import BarChartLine from '../../common/barChartLine.jsx'
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import moment from 'moment';
import {Link, browserHistory} from 'react-router';


class blockchainWorkboard extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      timerID: undefined,
      names: [],
      fromDateWrkBrd: moment().subtract(30, 'days').format('DD/MM/YYYY'),
      toDateWrkBrd: moment().format('DD/MM/YYYY'),
      fromDate: moment().subtract(30, 'days').format('DD/MM/YYYY'),
      toDate: moment().format('DD/MM/YYYY'),
      pageNumner: 1,
      settlementEntityID: '',
      entitySelectedVal: "",
      entityNames: undefined,
      settlementDate: '',
      selectedProject: undefined,
      xAxis: []
    };
    for (let i = 59; i >= 0; i--) {
      this.state.xAxis.push(i);
    }

    this.pageChanged = this.pageChanged.bind(this);
    this.renderPopupBody = this.renderPopupBody.bind(this);
    this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this);
    this.dateChangeExceptions = this.dateChangeExceptions.bind(this);
    this.changeEntityVal = this.changeEntityVal.bind(this);
    this.fetchDashboard = this.fetchDashboard.bind(this);
    this.projectChanged = this.projectChanged.bind(this);

  }

  componentWillMount() {
    let _this = this;
    _this.fetchDashboard(_this.state.entitySelectedVal, _this.state.pageNumner);
  }

  refreshScreen() {
        let _this = this;
        this.timeoutHandler = setTimeout(() => {
                console.log("SCREEN REFRESHED");
                _this.fetchDashboard(_this.state.entitySelectedVal, _this.state.pageNumner);
                _this.refreshScreen();
        }, 10000);
  }

 
  componentWillUnmount() {
    clearInterval(this.timeoutHandler);
  }
  
  changeEntityVal(form) {
    this.setState({entitySelectedVal: form.target.value});
    if (form.target.value !== "") {
      this.setState({pageNumner: 1})
      browserHistory.push('blockchain');
    } else {
      browserHistory.push('hyperledger/workboard');
     
    }

  }

  dateChangeWorkboard(toDate, fromDate) {
    this.setState({fromDateWrkBrd: fromDate});
    this.setState({toDateWrkBrd: toDate});
    this.fetchDashboard(this.state.entitySelectedVal, this.state.pageNumner);
  }

  dateChangeExceptions(toDate, fromDate) {
    this.setState({fromDate: fromDate});
    this.setState({toDate: toDate});
    this.fetchDashboard(this.state.entitySelectedVal, this.state.pageNumner, 2);
  }

  fetchDashboard(entityValue, pageNo, qType) {
    let data = {
      "currentPageNo": pageNo || this.state.pageNumner,
      "pageSize": 5,
      "fromDateWrkBrd": this.state.fromDateWrkBrd,
      "toDateWrkBrd": this.state.toDateWrkBrd,
      "fromDate": this.state.fromDate,
      "toDate": this.state.toDate,
      "filter": entityValue === "" ? "" : (entityValue || this.state.entitySelectedVal),
      "function":"STATS",
      "arguments":["STUB"]
    };
    
    this.props.actions.generalProcess(constants.getblockchainWorkboardDataHF, data);
  }


  componentDidMount() {
        window.scrollTo(0, 0);
        //this.refreshScreen();
  }
  pageChanged(pageNo) {
    this.setState({pageNumner: pageNo});
    this.fetchDashboard(this.state.entitySelectedVal, pageNo);
  }

  projectChanged(e){
    this.setState({selectedProject: e.target.value});
    if (e.target.value == 1) {
      this.setState({pageNumner: 1})
      browserHistory.push('/blockchain');
    } else {
      browserHistory.push('/hyperledger/workboard');
      
    }
  }


  renderPopupBody(dataID) {
    let ID = dataID.split('/');
    this.setState({settlementEntityID: ID[1], settlementDate: ID[2] + '/' + ID[3] + '/' + ID[4]})
  }

  render() {

    let enableControl = (sessionStorage.orgType == "Settlement" || sessionStorage.orgType == "SDG" || sessionStorage.orgType == "DSG") ? true : false;
    let entityUserType = sessionStorage.orgType == "Entity" ? true : false;
    let acquirerUserType = sessionStorage.orgType == "Acquirer" ? true : false;
    if (this.props.blockchainWorkboardData.workboardData.rows) {

      return (
        <div className="coreDiv">

          <div className="row">
            <div className="col-md-12 ">
              <div className="daterange_con" >
                <div className="center-block dashdate" style={{padding:"12px 20px"}}>
                  <DateRangePicker onChangeRange={this.dateChangeWorkboard}/>
                  <div className="input-group input-large">

                    <div className="input-group input-large" >
                      <select id="network" name="Network" className="form-control" onChange={this.projectChanged}>
                        <option value="0">Avanza - Hyperledger</option>
                        <option value="1">Avanza - Quorum</option>
                        {/*<option value={""}>Stellar</option>*/}
                        {/*<option value={""}>Ripple</option>*/}
                        {/*<option value={""}>Corda R3</option>*/}
                        {/*<option value={""}>Iroha</option>*/}
                        {/*<option value={""}>Sawtooth Lake</option>*/}
                      </select>
                    </div>

                  </div>

                </div>
              </div>
              <div className="row">

                <TileUnit data={this.props.blockchainWorkboardData.dashboardTiles}/>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="portlet light bordered sdg_portlet">


                    <div className="portlet-title">
                      <div className="caption "><span className="caption-subject ">Blockchain (10 Records) </span></div>
                      <div className="pull-right">
                        <div className="input-group" id="defaultrange" style={{display: "inline", marginRight: "10px"}}>

                          <div className="inputs srch">
                            <div className="portlet-input input-inline input-small ">
                              <div className="input-icon right"><i className="icon-magnifier"/>
                                <input type="text" id="searchINP"
                                       className="form-control form-control-solid input-circle"
                                       placeholder="Block Number"/>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <Table gridColumns={utils.getGridColumnByName("blockchainWorkBoardHyperledger")}
                             gridData={this.props.blockchainWorkboardData.workboardData.rows}

                             totalRecords={this.props.blockchainWorkboardData.workboardData.pageData.totalRecords}
                             searchCallBack={this.searchCallBack} pageSize={5}
                             pageChanged={this.pageChanged} export={false} search={true}
                             pagination={false} renderPopupBody={this.renderPopupBody}
                             activePage={this.state.pageNumner}/>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="portlet light bordered sdg_portlet">


            <div className="portlet-title">
              <div className="caption "><span className="caption-subject ">Transactions / Second</span></div>

            </div>
            <div className="row">
              <div className="col-md-12">

                <BarChartLine
                  tranCountData={this.props.blockchainWorkboardData.chartData.values}
                  durationData={this.state.xAxis}
                />
              </div>
            </div>
          </div>
        </div>


      );
    }
    else
      return (<div className="loader">Loading...</div>)


  }
}


blockchainWorkboard.propTypes = {
  blockchainWorkboardData: PropTypes.object,
  children: PropTypes.object,
  entityNames: PropTypes.array,
};

function mapStateToProps(state, ownProps) {

  return {
    blockchainWorkboardData: state.app.blockchainWorkboardData.data
  };

}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

blockchainWorkboard.displayName = "blockchainWorkboard_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(blockchainWorkboard);