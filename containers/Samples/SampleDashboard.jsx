/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DateRangePicker from '../../components/DateRangePicker.jsx';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
/*container specific imports*/
import TileUnit from '../../components/tileUnit.jsx';
import Table from '../../standard/Datatable.jsx';
import CommonBarChart from '../../components/CommonBarChart.jsx'
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import { baseUrl } from '../../constants/Communication.js';
import moment from 'moment';
import config from '../../config'


class SampleDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      fromDateWrkBrd: new moment().subtract(9, 'days').format('DD/MM/YYYY'),
      toDateWrkBrd: moment().format('DD/MM/YYYY'),
      fromDate: new moment().subtract(9, 'days').format('DD/MM/YYYY'),
      toDate: moment().format('DD/MM/YYYY'),
      pageNumner: 1,
      dropdownSelectedVal: "",
      dropDonwListData: undefined,
      isLoading: false,
      graphLabels: {
        legends: {
          firstLegend: utils.getLabelByID("sampleGraphFirstLegend"),
          secondLegend: utils.getLabelByID("sampleGraphSecondLegend"),
          thirdLegend: utils.getLabelByID("sampleGraphThirdLegend"),
        },
        xaxis: utils.getLabelByID("sampleGraphxaxis"),
        yaxis: utils.getLabelByID("sampleGraphyaxis"),
        labels: ["Label1", "Label2", "Label3"]
      }

    };

    this.pageChanged = this.pageChanged.bind(this);
    this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this);
    this.dateChangeGraph = this.dateChangeGraph.bind(this);
    this.changeDropdownVal = this.changeDropdownVal.bind(this);
    this.fetchDashboard = this.fetchDashboard.bind(this);


  }

  componentWillMount() {
    this.fetchDashboard(this.state.dropdownSelectedVal, this.state.pageNumner);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sampleDashboardData)
      this.setState({
        sampleDashboardData: nextProps.sampleDashboardData,
        isLoading: false
      });
  }

  searchCallBack(keyWord) {


  }

  getDropDownSelectedValue() {
    var sampleDropdownList = $('#sampleDropdownList').find(":selected").text();
    return sampleDropdownList;
  }

  changeDropdownVal(form) {
    this.setState({ dropdownSelectedVal: form.target.value });
    if (form.target.value !== "") {
      this.setState({ pageNumner: 1 })
      this.fetchDashboard(form.target.value, 1);
    } else {
      this.fetchDashboard(form.target.value, this.state.pageNumner);
    }

  }

  dateChangeWorkboard(toDate, fromDate) {
    this.setState({ fromDateWrkBrd: fromDate });
    this.setState({ toDateWrkBrd: toDate });
    this.fetchDashboard(this.state.dropdownSelectedVal, this.state.pageNumner);
  }

  dateChangeGraph(toDate, fromDate) {
    this.setState({ fromDate: fromDate, toDate: toDate, isLoading: true });
    this.fetchDashboard(this.state.dropdownSelectedVal, this.state.pageNumner, 2);
  }

  fetchDashboard(dropdownValue, pageNo, qType) {

    let data = {
      "currentPageNo": pageNo || this.state.pageNumner,
      "pageSize": 5,
      "fromDateWrkBrd": this.state.fromDateWrkBrd,
      "toDateWrkBrd": this.state.toDateWrkBrd,
      "fromDate": this.state.fromDate,
      "toDate": this.state.toDate,
      "filter": dropdownValue == "" ? "" : (dropdownValue || this.state.dropdownSelectedVal)
    };
    this.props.actions.generalProcess(constants.getSampleDashboardData, data);
  }

  componentDidMount() {
    let dropDownRequest = {
      "action": "sampleDropdownList",
      "currentPageNo": 1,
      "pageSize": 1
    }
    if (!this.props.dropDonwListData.length > 0) {
      this.props.actions.generalProcess(constants.getSampleDropDownList, dropDownRequest);
    }
  }

  pageChanged(pageNo) {

    this.setState({ pageNumner: pageNo });
    this.fetchDashboard(this.state.dropdownSelectedVal, pageNo)


  }

  render() {

    if (this.state.sampleDashboardData && this.state.sampleDashboardData.dashboardGridData.rows) {

      return (
        <div className="coreDiv">

          <div className="row">
            <div className="col-md-12 ">
              <div className="daterange_con">
                <div className="row">

                  <div className="center-block dashdate">

                    <div className="col-md-4" style={{ paddingTop: "15" }}>
                      <DateRangePicker onChangeRange={this.dateChangeWorkboard} />
                    </div>

                    <div className="col-md-4">
                      <h2 style={{ color: "white" }}>{utils.getLabelByID("SampleDashboard_Heading")}</h2>
                    </div>

                    <div className="col-md-4" style={{ paddingTop: "15" }}>
                      <div className="input-group input-large">
                       
                          <div className="input-group input-large">
                            <input name="sampleDropdownList" list="sampleDropdownList" onChange={this.changeDropdownVal}
                              className="form-control" placeholder={utils.getLabelByID("sampleDropDownWatermark")} />
                            <datalist id="sampleDropdownList">
                              {this.props.dropDonwListData.map((option, index) => {
                                return (
                                  <option key={index}
                                    value={option.value}> &nbsp; {utils.getLabelForLang(option)}</option>
                                );
                              })}
                            </datalist>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">

                <TileUnit data={this.state.sampleDashboardData.dashboardTiles} />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Table gridColumns={utils.getGridColumnByName("sampleDashboardGrid")}
                    gridData={this.state.sampleDashboardData.dashboardGridData.rows}
                    title={utils.getLabelByID("SampleDashboard_Heading")} fontclass=""
                    TableClass="portlet light bordered sdg_portlet"
                    totalRecords={this.state.sampleDashboardData.dashboardGridData.pageData.totalRecords}
                    searchCallBack={this.searchCallBack} pageSize={5}
                    pageChanged={this.pageChanged}
                    pagination={true} activePage={this.state.pageNumner}
                  />


                </div>
              </div>

            </div>
          </div>

          <div className="portlet light bordered sdg_portlet">
            <div className="portlet-title">
              <div className="caption "><span className="caption-subject " /></div>
              <div className="center-block" style={{ width: "500px" }}>
                <div className="input-group" id="defaultrange" style={{ display: "inline", marginRight: "10px" }}>
                  <DateRangePicker onChangeRange={this.dateChangeGraph} />
                </div>
                <button type="submit" className="btn dash green input-xsmall">{utils.getLabelByID("search")}</button>
             
              </div>
            </div>
            <div className="row">
              {!this.state.isLoading && <div className="col-md-12">

                <CommonBarChart toDate={this.state.toDate}
                  fromDate={this.state.fromDate}
                  firstBarData={this.state.sampleDashboardData.graphData.chartData.firstBarData}
                  secondBarData={this.state.sampleDashboardData.graphData.chartData.seconBarData}
                  thirdBarData={this.state.sampleDashboardData.graphData.chartData.thirdBarData}
                  graphLabels={this.state.graphLabels}
                />
              </div>}
              {this.state.isLoading && <div className="col-md-12"><div className="loader">{utils.getLabelByID("Loading")}</div></div>}
            </div>
          </div>
        </div>


      );
    }
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)


  }
}


SampleDashboard.propTypes = {
  sampleDashboardData: PropTypes.object,
  children: PropTypes.object,
  dropDonwListData: PropTypes.array,
};

function mapStateToProps(state, ownProps) {


  return {
    sampleDashboardData: state.app.sampleDashboardData.data,
    dropDonwListData: state.app.sampleDropDownListData.listData,
  };


}

function mapDispatchToProps(dispatch) {

  return { actions: bindActionCreators(actions, dispatch) }

}

SampleDashboard.displayName = "SampleDashboard_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(SampleDashboard);
