/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DateRangePicker from '../../../core/components/DateRangePicker.jsx';
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/actions/generalAction';
/*container specific imports*/
import TileUnit from '../../../core/components/tileUnit.jsx';
import Table from '../../../core/standard/Datatable.jsx';
import CommonBarChart from '../../../core/components/CommonBarChart.jsx'
import * as utils from '../../../core/common/utils.js';
import * as constants from '../../../core/constants/Communication.js';
import { baseUrl } from '../../../core/constants/Communication.js';
import moment from 'moment';
import config from '../../../config'


class SampleDashboardType2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      fromDateWrkBrd: new moment().subtract(9, 'days').format('DD/MM/YYYY'),
      toDateWrkBrd: moment().format('DD/MM/YYYY'),
      fromDate: new moment().subtract(9, 'days').format('DD/MM/YYYY'),
      toDate: moment().format('DD/MM/YYYY'),
      firstGridPageNumber: 1,
      secondGridPageNumber: 1,
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
        labels: ["Label1", "Label2", "Label2"]
      }

    };

    this.firstGridPageChanged = this.firstGridPageChanged.bind(this);
    this.secondGridPageChanged = this.secondGridPageChanged.bind(this);
    this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this);
    this.dateChangeGraph = this.dateChangeGraph.bind(this);
    this.changeDropdownVal = this.changeDropdownVal.bind(this);
    this.fetchDashboard = this.fetchDashboard.bind(this);


  }

  componentWillMount() {
    this.fetchDashboard(this.state.dropdownSelectedVal);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sampleDashboardDataType2.graphData !== nextProps.sampleDashboardDataType2.graphData)
      this.setState({
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
      this.setState({ firstGridPageNumber: 1, secondGridPageNumber: 1 })
      this.fetchDashboard(form.target.value, 1, 1);
    } else {
      this.fetchDashboard(form.target.value);
    }

  }

  dateChangeWorkboard(toDate, fromDate) {
    this.setState({ fromDateWrkBrd: fromDate });
    this.setState({ toDateWrkBrd: toDate });
    this.fetchDashboard(this.state.dropdownSelectedVal);
  }

  dateChangeGraph(toDate, fromDate) {
    this.setState({ fromDate: fromDate, toDate: toDate, isLoading: true });
    this.fetchDashboard(this.state.dropdownSelectedVal);
  }

  fetchDashboard(dropdownValue, firstGridPageNo, secondGridPageNo) {

    let data = {
      "firstGrid": {
        "currentPageNo": firstGridPageNo || this.state.firstGridPageNumber,
        "pageSize": 5,

      },
      "secondGrid": {
        "currentPageNo": secondGridPageNo || this.state.secondGridPageNumber,
        "pageSize": 5,
      },
      "fromDateWrkBrd": this.state.fromDateWrkBrd,
      "toDateWrkBrd": this.state.toDateWrkBrd,
      "fromDate": this.state.fromDate,
      "toDate": this.state.toDate,
      "filter": dropdownValue == "" ? "" : (dropdownValue || this.state.dropdownSelectedVal)
    };
    this.props.actions.generalProcess(constants.getSampleDashboardDataType2, data);
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

  firstGridPageChanged(pageNo) {

    this.setState({ firstGridPageNumber: pageNo })
    this.fetchDashboard(this.state.dropdownSelectedVal, pageNo)
  }
  secondGridPageChanged(pageNo) {

    this.setState({ secondGridPageNumber: pageNo })
    this.fetchDashboard(this.state.dropdownSelectedVal,null, pageNo)
  }

  render() {

    if (this.props.sampleDashboardDataType2.dashboardGridData1.rows) {

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

                <TileUnit data={this.props.sampleDashboardDataType2.dashboardTiles} />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Table gridColumns={utils.getGridColumnByName("sampleDashboardGrid")}
                    gridData={this.props.sampleDashboardDataType2.dashboardGridData1.rows}
                    title={utils.getLabelByID("SampleDashboard_Heading")} fontclass=""
                    TableClass="portlet light bordered sdg_portlet"
                    totalRecords={this.props.sampleDashboardDataType2.dashboardGridData1.pageData.totalRecords}
                    searchCallBack={this.searchCallBack} pageSize={5}
                    pageChanged={this.firstGridPageChanged}
                    pagination={true} activePage={this.state.firstGridPageNumber}
                  />

                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Table gridColumns={utils.getGridColumnByName("sampleDashboardGrid")}
                    gridData={this.props.sampleDashboardDataType2.dashboardGridData2.rows}
                    title={utils.getLabelByID("SampleDashboard_Heading")} fontclass=""
                    TableClass="portlet light bordered sdg_portlet"
                    totalRecords={this.props.sampleDashboardDataType2.dashboardGridData2.pageData.totalRecords}
                    searchCallBack={this.searchCallBack} pageSize={5}
                    pageChanged={this.secondGridPageChanged}
                    pagination={true} activePage={this.state.secondGridPageNumber}
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
                  firstBarData={this.props.sampleDashboardDataType2.graphData.chartData.firstBarData}
                  secondBarData={this.props.sampleDashboardDataType2.graphData.chartData.seconBarData}
                  thirdBarData={this.props.sampleDashboardDataType2.graphData.chartData.thirdBarData}
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


SampleDashboardType2.propTypes = {
  sampleDashboardDataType2: PropTypes.object,
  children: PropTypes.object,
  dropDonwListData: PropTypes.array,
};

function mapStateToProps(state, ownProps) {


  return {
    sampleDashboardDataType2: state.app.sampleDashboardDataType2.data,
    dropDonwListData: state.app.sampleDropDownListData.listData,
  };


}

function mapDispatchToProps(dispatch) {

  return { actions: bindActionCreators(actions, dispatch) }

}

SampleDashboardType2.displayName = "SampleDashboardType2_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(SampleDashboardType2);
