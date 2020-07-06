/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import ReportForm from './reportForm.jsx';

import cloneDeep from 'lodash/cloneDeep';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

const initialState = {
  reportContainer: {},
  List: [],
  typeData: undefined,
  groupList: [],
  columnList: [],
  resultSet: [],
  isEdit: false,
  isLoading: true,
  isCustom: true,
  loadedOnce: false,
  gridLoading: false,
  getEndpointListView: [],
  text: "Please wait while your request is being processed."
};

class ReportContainer extends React.Component {

  constructor(props) {
    super(props)
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.test = this.test.bind(this);
    this.state = cloneDeep(initialState);
  }

  add = (e) => {

    let fieldName = document.getElementById('fieldName') == null ? "" : document.getElementById('fieldName').value;
    let dataType = document.getElementById('dataType') == null ? "" : document.getElementById('dataType').value;
    let testVal = document.getElementById('testVal') == null ? "" : document.getElementById('testVal').value;
    let span = document.getElementById('span') == null ? "" : document.getElementById('span').value;


    if (
      _.isEmpty(fieldName) ||
      _.isEmpty(dataType)
    ) {
      alert("All fields are required");
      return false;
    }

    let tupple = {
      fieldName,
      dataType,
      testVal,
      span,
      "actions": [
        {label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION"},
        {label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION"},
        {"label": "edit", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION"},
        {"label": "delete", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION"}
      ]
    }

    if (this.containsObject(tupple, this.state.List) === false) {
      this.clearFieldsPeer()
      let List = _.cloneDeep(this.state.List);
      List.push(tupple)
      this.setState({List: List})
    } else {
      alert("Code Already Exists!!")
    }
  }

  containsObject(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.fieldName == refObj.fieldName
      ) {
        return true;
      }
    }

    return false;
  }

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }


  componentDidMount() {
    this.props.actions.generalProcess(constants.getTypeDataList, {});
    this.props.actions.generalProcess(constants.getEndpointListView, {"requestType": "dbConnection"});

    this.props.actions.generalProcess(constants.getGroupList, {
      "action": "groupList",
      "searchCriteria": {},
      "page": {"currentPageNo": 1, "pageSize": 1000}
    });
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['adhoc_conntype', 'adhoc_datatype', 'adhoc_reptype'])); // Org types (entities)
    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getADHReportByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
    this.setState({
      loadedOnce: false,
      gridLoading: false
    })
  }

  startDateChange = (e, value) => {
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
    this.setState({reportContainer})
  };

  componentWillMount() {
    this.props.actions.updateStore({
      testADHReport: {},
      reportContainer: {},
      ResultData: {}
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.getEndpointListView.data) {
      this.setState({
        getEndpointListView: nextProps.getEndpointListView.data
      });
    }
    console.log(nextProps.typeData, nextProps.groupList)
    if (nextProps.typeData && nextProps.groupList && nextProps.enumList) {
      let gList = []
      let eList = []
      nextProps.groupList.forEach((elem) => {
        gList.push({
          "label": elem.name,
          "value": elem._id
        });
      });

      for (let key in nextProps.enumList) {
        eList.push({
          "label": key,
          "value": key
        });
      }
      this.setState({
        typeData: nextProps.typeData,
        groupList: gList,
        enumList: eList,
        isLoading: false
      });
    }

    if (nextProps.reportContainer && !this.state.loadedOnce) {
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
          // if (typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean') {
          if (index == 0) {
            columnList.push({alias: key, key: key, type: "string"})
          }
          let y = _.get(columnLen, key, 0)
          if (y < String(x).length) {
            _.set(columnLen, key, String(x).length)
          }
          // }
        })
      });

      columnList.forEach((elem) => {
        let y = _.get(columnLen, elem.key, 0)
        if (y > 30) {
          elem.type = 'clpVal';
        }
      })
      this.setState({
        resultSet: nextProps.testADHReport,
        columnList: columnList,
        gridLoading: false
      });
    }


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

  submit = (e) => {

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
    if (!_.isEmpty(reportContainer.connectionType) && reportContainer.connectionType != 'local' && _.isEmpty(reportContainer.connectionString)
    ) {
      alert("Connection String is required");
      return false;
    }
    _.set(reportContainer, 'filters', this.state.List)
    _.set(reportContainer, 'test', true)
    console.log(JSON.stringify(reportContainer))
    this.props.actions.generalProcess(constants.updateADHReport, reportContainer);
  }


  test = (e) => {


    this.props.actions.updateStore({
      testADHReport: {}
    });
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
    this.state.gridLoading = true;
    this.state.text = "Please wait while your request is being processed.";

    this.setState({
      gridLoading: true,
      columnList: [],
      resultSet: [],
      text: "Please wait while your request is being processed."
    }, () => {
      _.set(reportContainer, 'filters', this.state.List)
      _.set(reportContainer, 'test', true)
      console.log(JSON.stringify(reportContainer))
      this.props.actions.generalProcess(constants.testADHReport, reportContainer);
      console.log(JSON.stringify(reportContainer))
    });

  }

  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }

    return (<ReportForm flag={this.state.update} ActionHandlers={this.ActionHandlers} addPeer={this.add}
                        typeData={this.state.typeData} isOwner={true} onInputChange={this.onInputChange}
                        onSubmit={this.submit} testQuery={this.test} startDateChange={this.startDateChange}
                        state={this.state}/>)

  }

  ActionHandlers({actionName, index}) {
    switch (actionName) {
      case "Move UP":
        if (index > 0) {
          let newConfig = this.state.List;
          let prev = newConfig[index - 1];
          newConfig[index - 1] = newConfig[index]
          newConfig[index] = prev
          this.setState({List: newConfig});
        }
        break;
      case "Move Down":
        if (index + 1 <= this.state.List.length) {
          let newConfig = this.state.List;
          let next = newConfig[index + 1];
          newConfig[index + 1] = newConfig[index]
          newConfig[index] = next
          this.setState({List: newConfig});
        }
        break;
      case "edit":
        if (index > -1) {
          let b = this.state.List[index];
          document.getElementById('fieldName').value = _.get(b, 'fieldName', '');
          document.getElementById('dataType').value = _.get(b, 'dataType', '');
          document.getElementById('testVal').value = _.get(b, 'testVal', '');
          document.getElementById('span').value = _.get(b, 'span', '');
          let tempState = this.state.List;
          tempState.splice(index, 1);
          this.setState({List: tempState});
        }
        break;
      case "delete":
        if (index > -1) {
          let tempState = this.state.List;
          tempState.splice(index, 1);
          this.setState({List: tempState});
        }
        break;
      default:
        break;
    }
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
    isOwner: _.get(state.app, 'ReportContainer.data.isOwner', false),
    getEndpointListView: state.app.getEndpointListView
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

ReportContainer.displayName = "ADHoc Reports";
export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);

