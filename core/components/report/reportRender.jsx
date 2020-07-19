/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import ReportForm from './reportForm.jsx';
import DateControl from '../../common/DateControl.jsx';
import cloneDeep from 'lodash/cloneDeep';
import { forEach } from "react-bootstrap/cjs/ElementChildren";
import Portlet from "../../common/Portlet.jsx";
import * as utils from "../../common/utils";
import Table from '../../common/Datatable.jsx';
import { Line, Pie, Doughnut, Polar, HorizontalBar, Bar } from 'react-chartjs-2';

const initialState = {
  reportContainer: {},
  finalForm: {},
  List: [],
  typeData: undefined,
  groupList: [],
  columnList: [],
  resultSet: [],
  enumList: {},
  isEdit: false,
  isLoading: true,
  isCustom: true,
  loadedOnce: false,
  exportClicked: false,
  showClicked: false,
  dsBarGraph: undefined,
  dsPieGraph: undefined,
  listPie: [
    { label: "Pie", value: "Pie" },
    { label: "Doughnut", value: "Doughnut" },
    { label: "Polar", value: "Polar" }
  ],
  listBar: [
    { label: "Line", value: "Line" },
    { label: "HorizontalBar", value: "HorizontalBar" },
    { label: "Bar", value: "Bar" }
  ]
};


class ReportContainer extends React.Component {

  constructor(props) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeGrpah = this.onInputChangeGrpah.bind(this);
    this.test = this.test.bind(this);
    this.state = cloneDeep(initialState);
  }

  newDateChange = (e, value) => {
    console.log(e, value)
    let reportContainer = _.cloneDeep(this.state.reportContainer);
    _.set(reportContainer, 'scheduleTime', e);
    let convertedDate = moment(e * 1000).unix();
    let finalForm = this.state.finalForm;
    if (value == 'Invalid date') {
      _.set(reportContainer, 'scheduleTimeDisplay', e.target.value)
    } else {
      _.set(reportContainer, 'scheduleTimeDisplay', moment(convertedDate).format('DD/MM/YYYY hh:mm:ss'))
    }
    this.setState({ reportContainer })
  };

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }

  componentWillMount() {
    this.props.actions.updateStore({
      testADHReport: {},
      reportContainer: {},
      ResultData: {}
    });
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getTypeDataList, {});
    this.props.actions.generalProcess(constants.getGroupList, {
      "action": "groupList",
      "searchCriteria": {},
      "page": { "currentPageNo": 1, "pageSize": 1000 }
    });
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['adhoc_conntype', 'adhoc_datatype', 'adhoc_reptype'])); // Org types (entities)
    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getADHReportByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
    this.setState({ loadedOnce: false })
  }

  downloadDummyCSV(CSV) {
    let keys = []
    if (CSV.length > 0) {
      keys = Object.keys(CSV[0])
    } else {
      return
    }
    CSV = CSV.map((obj) => {
      let row = ``
      keys.forEach((key, index) => {
        if (index == keys.length - 1) {
          row += `${obj[key]}`
        } else {
          row += `${obj[key]},`
        }
      })
      return row
    })
    CSV.unshift(keys.join(","))
    CSV = CSV.join('\n');
    // const url = window.URL.createObjectURL(new Blob([CSV], { type: "application/vnd.ms-excel" }));
    const url = window.URL.createObjectURL(new Blob([CSV], { type: "text/plain" }));
    const link = document.createElement('a');
    link.setAttribute("download", "export.csv");
    link.href = url;
    document.body.appendChild(link);
    link.click();
  }

  componentWillReceiveProps(nextProps) {


    console.log(nextProps.typeData, nextProps.groupList)
    if (nextProps.typeData && nextProps.groupList && nextProps.enumList) {
      let gList = []
      nextProps.groupList.forEach((elem) => {
        gList.push({
          "label": elem.name,
          "value": elem._id
        });
      });
      this.setState({
        typeData: nextProps.typeData,
        enumList: nextProps.enumList,
        groupList: gList,

      });
    }

    if (nextProps.reportContainer && !this.state.loadedOnce) {
      this.constructReportView(nextProps.reportContainer.filters, nextProps.reportContainer);
      this.setState({
        reportContainer: nextProps.reportContainer,
        List: nextProps.reportContainer.filters,
        loadedOnce: true

      });
    }

    if (nextProps.testADHReport) {
      let columnList = [];
      let columnLen = {};
      nextProps.testADHReport.forEach((elem, index) => {
        let keys = Object.keys(elem)
        keys.forEach((key) => {
          console.log(key);
          let x = _.get(elem, key, '')
          if (typeof x === 'string') {
            if (index == 0) {
              columnList.push({ alias: key, key: key, type: "string" })
            }
            let y = _.get(columnLen, key, 0)
            if (y < x.length) {
              _.set(columnLen, key, x.length)
            }
          }
        })
      });

      columnList.forEach((elem) => {
        let y = _.get(columnLen, elem.key, 0)
        if (y > 30) {
          elem.type = 'clpVal';
        }
      })
      if (this.state.loadedOnce && this.state.exportClicked) {
        this.downloadDummyCSV(nextProps.testADHReport);
        this.setState({
          exportClicked: false
        });
      }
      if (nextProps.reportContainer.reportType == 'graphic-bar-multi') {
        let data = this.getDataSetBar(nextProps.testADHReport)

        console.log(">>>>>>>>>>}}}}->", data)
        this.setState({ dsBarGraph: data });
      }
      if (nextProps.reportContainer.reportType == 'graphic-pie') {
        let data = this.getDataSetPie(nextProps.testADHReport)

        console.log(">>>>>>>>>>}}}}->", data)
        this.setState({ dsPieGraph: data });
      }
      this.setState({
        resultSet: nextProps.testADHReport,
        columnList: columnList
      });
    }
  }

  inputChange(e, value) {
    let finalForm = this.state.finalForm;
    _.set(finalForm, value, e.target.value)
    this.setState({
      finalForm: finalForm
    })
  }
  onInputChangeGrpah = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.setState({
      graphtype: value
    })
  }
  onInputChange = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let reportContainer = _.cloneDeep(this.state.reportContainer);
    if (e.target.id == 'group') {
      let values = $('#group').val();
      _.set(reportContainer, e.target.id, values)
    } else {
      _.set(reportContainer, e.target.id, value)
    }
    // this.state.networkConfig[e.target.name] = e.target.name;
    console.log(JSON.stringify(reportContainer))
    this.setState({
      reportContainer: reportContainer
    })
  }



  getcolors(len) {
    let colors = [];
    while (colors.length < len) {
      do {
        var color = Math.floor((Math.random() * 1000000) + 1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    return colors;
  }
  test = (e) => {
    let reportContainer = _.cloneDeep(this.state.reportContainer);
    if (
      _.isEmpty(reportContainer.name) ||
      _.isEmpty(reportContainer.description) ||
      _.isEmpty(reportContainer.reportType) ||
      _.isEmpty(reportContainer.connectionType) ||
      _.isEmpty(reportContainer.group) ||
      _.isEmpty(reportContainer.queryStr)
    ) {
      alert("All fields are required");
      return false;
    }
    if (
      !_.isEmpty(reportContainer.connectionType) && reportContainer.connectionType != 'local' &&
      _.isEmpty(reportContainer.connectionString)
    ) {
      alert("Connection String is required");
      return false;
    }
    _.set(reportContainer, 'exptype', 'CSV')
    _.set(reportContainer, 'finalForm', this.state.finalForm)
    _.set(reportContainer, 'filters', this.state.List)
    _.set(reportContainer, 'test', true)
    if (this.state.reportContainer.reportType == 'graphic-bar-multi') {
      _.set(reportContainer, 'type', 'MULTI');
    } else if (this.state.reportContainer.reportType == 'graphic-pie') {
      _.set(reportContainer, 'type', 'PIE');
    } else {
      this.setState({ exportClicked: true })
    }
    console.log(JSON.stringify(reportContainer))

    this.props.actions.generalProcess(constants.testADHReport, reportContainer);
    console.log(JSON.stringify(reportContainer))
  }
  load = (e) => {
    let reportContainer = _.cloneDeep(this.state.reportContainer);
    if (
      _.isEmpty(reportContainer.name) ||
      _.isEmpty(reportContainer.description) ||
      _.isEmpty(reportContainer.reportType) ||
      _.isEmpty(reportContainer.connectionType) ||
      _.isEmpty(reportContainer.group) ||
      _.isEmpty(reportContainer.queryStr)
    ) {
      alert("All fields are required");
      return false;
    }
    if (
      !_.isEmpty(reportContainer.connectionType) && reportContainer.connectionType != 'local' &&
      _.isEmpty(reportContainer.connectionString)
    ) {
      alert("Connection String is required");
      return false;
    }
    _.set(reportContainer, 'exptype', 'CSV')
    _.set(reportContainer, 'finalForm', this.state.finalForm)
    _.set(reportContainer, 'filters', this.state.List)
    console.log(JSON.stringify(reportContainer))
    this.setState({ showClicked: true })
    _.set(reportContainer, 'test', true)
    this.props.actions.generalProcess(constants.testADHReport, reportContainer);
    console.log(JSON.stringify(reportContainer))
  }
  schedule = (e) => {
    let reportContainer = _.cloneDeep(this.state.reportContainer);
    if (
      _.isEmpty(reportContainer.email) ||
      _.isEmpty(reportContainer.scheduleTime)
    ) {
      alert("All fields are required");
      return false;
    }
    _.set(reportContainer, 'exptype', 'CSV')
    _.set(reportContainer, 'isScheduled', true)
    _.set(reportContainer, 'createSchedule', true)
    _.set(reportContainer, 'finalForm', this.state.finalForm)
    _.set(reportContainer, 'filters', this.state.List)
    console.log(JSON.stringify(reportContainer))
    _.set(reportContainer, 'test', false)
    this.setState({ showClicked: true })
    this.props.actions.generalProcess(constants.testADHReport, reportContainer);
    console.log(JSON.stringify(reportContainer))
  }
  startDateChange = (e, value) => {
    console.log(e, value)
    let convertedDate = moment(e * 1000).unix();
    let finalForm = this.state.finalForm;
    if (value == 'Invalid date') {
      _.set(finalForm, value, e.target.value)
    } else {
      _.set(finalForm, value, moment(convertedDate).format('YYYY-MM-DD'))
    }
  };

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }

  constructReportView(paramsArray, reportContainer) {
    console.log('FUNCTION CALLED');
    console.log(paramsArray);
    let view = [];
    paramsArray.forEach((field, index) => {
      if (field.dataType == 'date') {
        view.push(<div style={{ marginTop: '10px', marginBottom: '10px' }} className="col-md-6">
          <div className="col-md-4">
            <label htmlFor="">{field.fieldName}</label>
          </div>
          <div className="col-md-8">
            <DateControl id={field.fieldName} dateChange={e => this.startDateChange(e, field.fieldName)} />
          </div>
          {this.state.errors && this.state.errors[field.paramName] ?
            <span style={{ margin: '0 15px' }} className="redColor">Field is required</span> : ''}
        </div>)
      } else if ((field.dataType == 'string' || field.dataType == 'numeric') && field.typeData == null) {
        view.push(<div style={{ marginTop: '10px', marginBottom: '10px' }} className="col-md-6">
          <div className="col-md-4">
            <label htmlFor="">{field.fieldName}</label>
          </div>
          <div className="col-md-8">
            <input
              className={this.state.errors && this.state.errors[field.fieldName] ? 'form-control border-red' : 'form-control'}
              id={field.fieldName} onChange={e => this.inputChange(e, field.fieldName)} />
          </div>
          {this.state.errors && this.state.errors[field.fieldName] &&
            <span style={{ margin: '0 15px' }} className="redColor">Field is required</span>}
        </div>)
      } else if (field.span) {
        console.log('FIELD TYPE')
        view.push(<div style={{ marginTop: '10px', marginBottom: '10px' }} className="col-md-6">
          <div className="col-md-4">
            <label htmlFor="">{field.fieldName}</label>
          </div>
          <div className="col-md-8">
            <select onChange={e => this.inputChange(e, field.fieldName)}
              className={this.state.errors && this.state.errors[field.fieldName] ? 'form-control border-red' : 'form-control'}
              name="" id="">
              <option selected disabled value="">--- Select ----</option>
              {this.state.enumList[field.span].map((option, index) => {
                return (
                  <option key={index} value={option}>{option}</option>
                )
              })}
            </select>
          </div>
          {this.state.errors && this.state.errors[field.fieldName] &&
            <span style={{ margin: '0 15px' }} className="redColor">Field is required</span>}
        </div>
        )
      }
    })

    if (reportContainer.reportType == 'graphic-pie') {
      console.log('FIELD TYPE')
      view.push(<div style={{ marginTop: '10px', marginBottom: '10px' }} className="col-md-6">
        <div className="col-md-4">
          <label htmlFor="">Graph Type</label>
        </div>
        <div className="col-md-8">
          <select onChange={e => this.onInputChangeGrpah(e, 'graphtype')}
            className={'form-control'}
            name="" id="">
            <option selected disabled value="">--- Select ----</option>
            {this.state.listPie.map((option, index) => {
              return (
                <option key={index} value={option.value}>{option.label}</option>
              )
            })}
          </select>
        </div>
      </div>
      )
    }

    if (reportContainer.reportType == 'graphic-bar-multi') {
      console.log('FIELD TYPE')
      view.push(<div style={{ marginTop: '10px', marginBottom: '10px' }} className="col-md-6">
        <div className="col-md-4">
          <label htmlFor="">Graph Type</label>
        </div>
        <div className="col-md-8">
          <select onChange={e => this.onInputChangeGrpah(e, 'graphtype')}
            className={'form-control'}
            name="" id="">
            <option selected disabled value="">--- Select ----</option>
            {this.state.listBar.map((option, index) => {
              return (
                <option key={index} value={option.value}>{option.label}</option>
              )
            })}
          </select>
        </div>
      </div>
      )
    }

    console.log(JSON.stringify(this.state.reportContainer));
    if (reportContainer.reportType != 'graphic-bar-multi' && reportContainer.reportType != 'graphic-pie') {
      view.push(
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="btn-toolbar pull-right">

              <button type="submit" onClick={this.test}
                className="btn green">{' '}{utils.getLabelByID("Export CSV")}
              </button>
              <button type="submit" onClick={this.load}
                className="btn green">{' '}{utils.getLabelByID("Load Grid")}
              </button>
              <button type="submit" onClick={this.clearFieldsPeer}
                className="btn default">{' '}{utils.getLabelByID("Clear")}
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      view.push(
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="btn-toolbar pull-right">

              <button type="submit" onClick={this.test}
                className="btn green">{' '}{utils.getLabelByID("Load Graph")}
              </button>
              <button type="submit" onClick={this.clearFieldsPeer}
                className="btn default">{' '}{utils.getLabelByID("Clear")}
              </button>
            </div>
          </div>
        </div>
      )
    }
    this.setState({
      reportParamView: view,
      isLoading: false
    })

  }
  getDataSetBar(x) {
    let labelList = []
    let data = {}

    x.forEach((elem, index) => {
      elem.forEach((label) => {
        if (index == 0) {
          for (let key in label) {
            labelList.push(label[key])
          }
        } else {
          for (let key in label) {
            let temp = _.get(data, key, []);
            temp.push(label[key]);
            _.set(data, key, temp);
          }
        }
      })

    });

    let dsList = []
    for (let elem in data) {
      let col = this.getcolors(1)[0];
      dsList.push({
        label: elem,
        fill: false,
        lineTension: 0.1,
        backgroundColor: col,
        borderColor: col,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: col,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: col,
        pointHoverBorderColor: col,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data[elem]
      })
    }
    const dataRender = {
      labels: labelList,
      datasets: dsList
    };
    return dataRender
  }

  getDataSetPie(x) {
    let data = {}
    x.forEach((label) => {
      for (let key in label) {
        let temp = _.get(data, key, []);
        temp.push(label[key]);
        _.set(data, key, temp);
      }
    })
    let dsList = []
    dsList.push({
      data: data.values,
      backgroundColor: this.getcolors(data.values.length)
    })
    const dataRender = {
      labels: data.label,
      datasets: dsList
    };
    return dataRender
  }
  renderGraphBar(data) {
    switch (this.state.graphtype) {
      case "HorizontalBar":
        return (<HorizontalBar height={80} data={data} />)
      case "Bar":
        return (<Bar height={80} data={data} />)
      default:
        return (<Line height={80} data={data} />)
    }
  }
  renderGraphPie(data) {
    switch (this.state.graphtype) {
      case "Doughnut":
        return (<Doughnut height={80} data={data} />)
      case "Polar":
        return (<Polar height={80} data={data} />)
      default:
        return (<Pie height={80} data={data} />)
    }
  }
  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }

    return (<div id={'form'}>
      <Portlet title={this.state.reportContainer.name}>
        <div className={'row'}>
          {this.state.reportParamView}
        </div>
      </Portlet>
      {(this.state.reportContainer.reportType != 'graphic-bar-multi' &&
        this.state.reportContainer.reportType != 'graphic-pie') &&
        <Portlet title={"Schedule Report"}>
          <div className={'row'}>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Email")}</label>
                <div className="form-group col-md-8">
                  <input type="text" className="form-control" id="email"
                    onChange={this.onInputChange}
                    value={this.state.reportContainer.email} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Schedule Time")}</label>
                <div className="form-group col-md-8">
                  <DateControl id={'scheduleTime'} value={this.state.reportContainer.scheduleTimeDisplay} mode='datetime'
                    format={'DD/MM/YYYY hh:mm:ss'}
                    dateChange={e => this.newDateChange(e, 'scheduleTime')} />
                </div>
              </div>
            </div>
            {/*<div className="col-md-6">*/}
            {/*  <div className="form-group">*/}
            {/*    <label className="form-group control-label col-md-4" style={{*/}
            {/*      textAlign: "left",*/}
            {/*      fontWeight: "normal"*/}
            {/*    }}>{utils.getLabelByID("isScheduled")}</label>*/}
            {/*    <div className="form-group col-md-8">*/}
            {/*      <div className="icheck-list">*/}
            {/*        <label className="mt-checkbox mt-checkbox-outline"*/}
            {/*               style={{marginBottom: "0px", marginTop: "0px"}}>*/}
            {/*          <label/>*/}
            {/*          <input type="checkbox" className="form-control" onChange={this.onInputChange}*/}
            {/*                 checked={this.state.reportContainer.isScheduled} name="isScheduled" id="isScheduled"/>*/}
            {/*          <span/>*/}
            {/*        </label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="btn-toolbar pull-right">
                  <button type="submit" onClick={this.schedule}
                    className="btn btn-default"><i className="fa fa-calendar"
                      aria-hidden="true"></i>{' '}{utils.getLabelByID("Schedule")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portlet>
      }
      {this.state.columnList.length > 0 && this.state.showClicked === true &&
        <Portlet title={"Result Set"}>
          <div className={'row'}>
            <div className="col-md-12">
              <div className="col-md-12" style={{ overflow: "scroll" }}>
                <Table
                  gridColumns={this.state.columnList}
                  gridData={this.state.resultSet}
                  export={false}
                  pagination={false} />
              </div>
            </div>
          </div>
        </Portlet>
      }


      {this.state.dsBarGraph &&
        <div >
          <Portlet title="Graph" >
            {this.renderGraphBar(this.state.dsBarGraph)}
          </Portlet>
        </div>
      }
      {this.state.dsPieGraph &&
        <div >
          <Portlet title="Graph" >
            {this.renderGraphPie(this.state.dsPieGraph)}
          </Portlet>
        </div>
      }
      {/*<ReportForm flag={this.state.update}*/}
      {/*            typeData={this.state.typeData} isOwner={true} onInputChange={this.onInputChange}*/}
      {/*            testQuery={this.test}*/}
      {/*            state={this.state}/>*/}


    </div>)

  }

}


ReportContainer.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    testADHReport: _.get(state.app, 'testADHReport.data', undefined),
    reportContainer: _.get(state.app, 'reportContainer.data', undefined),
    ResultData: _.get(state.app, 'reportContainerTest.data', undefined),
    groupList: _.get(state.app, 'groupList.data.searchResult', []),
    typeData: _.get(state.app, 'typeData.data', []),
    enumList: _.get(state.app, 'enumList.data', []),
    id: ownProps.params.id,
    isOwner: _.get(state.app, 'ReportContainer.data.isOwner', false)
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

ReportContainer.displayName = "ADHoc Reports Render";
export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);

