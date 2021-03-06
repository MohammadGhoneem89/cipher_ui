import React from 'react';
import * as utils from '../common/utils.js';
import * as constants from '../constants/Communication.js';
import DateControl from '../common/DateControl.jsx'
import * as dates from '../common/dates.js';
import config from '../../config';

class ReportFilters extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      entityNames: props.entityNames,
      acquirerNames: props.acquirerNames,
      error: undefined,
      downloading: false
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.generateFilters = this.generateFilters.bind(this);
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  formSubmit() {
    let _this = this;
    let fitlerCriteria = {};
    let fromDateVal = '';
    let toDateVal = '';
    for (let count = 0; count < this.props.reportFilters.data.length; count++) {
      let filter = this.props.reportFilters.data[count];
      if (filter["type"] === "array") {
        let selO = document.getElementById(filter['id']);
        if (selO) {

          let selValues = [];

          for (let i = 0; i < selO.length; i++) {

            if (selO.options[i].selected || selO.options[0].selected) {

              selValues.push(selO.options[i].value);
            }
          }
          fitlerCriteria[filter['id']] = selValues;
        }

        if (filter['id'] == 'user' && fitlerCriteria[filter['id']][0] == 'All') {

          let users = []
          this.props.userList && this.props.userList.map((element) => {
            users.push({
              userID: element.userID,
              _id: element._id,
              firstName: element.firstName
            })
          })
          fitlerCriteria[filter['id']] = JSON.stringify(users);
          // break;
        } else if (filter['id'] == 'user' && fitlerCriteria[filter['id']][0] != 'All') {
          fitlerCriteria[filter['id']] =
            this.props.userList && this.props.userList.filter((user) => {
              return user.userID == fitlerCriteria[filter['id']]
            })
        }
        if (filter['id'] == 'group' && fitlerCriteria[filter['id']][0] == 'All') {
          fitlerCriteria[filter['id']] = this.props.groupList;
          //  break;
        } else if (filter['id'] == 'group' && fitlerCriteria[filter['id']][0] != 'All') {
          fitlerCriteria[filter['id']] =
            this.props.groupList.filter((group) => {
              return group.name == fitlerCriteria[filter['id']]
            })
        }

      }

      let value = '';

      if (filter['controlType'] == "dateTime") {
        value = $('#' + filter['id']).find("input").val()

        if (value == '') {
          this.setState({error: 'Please select ' + filter['id']});
          return '';
        } else if (filter['id'] == 'fromDate') {
          fromDateVal = value;
          this.setState({error: undefined});
        } else if (filter['id'] == 'toDate') {
          toDateVal = value;
          this.setState({error: undefined});
        } else
          value = document.getElementById(filter['id']) == undefined ? "" : document.getElementById(filter['id']).value;

        if (value != undefined && value != "")
          fitlerCriteria[filter['id']] = value;
      }


    }
    let reportFormat = document.getElementById('reportFormat') == undefined ? "" : document.getElementById('reportFormat').value;
    let language = document.getElementById('language') == undefined ? "" : document.getElementById('language').value;


    if (fromDateVal != '' && toDateVal != '') {
      let daysDiff = dates.getDaysDiff(fromDateVal, toDateVal)

      if (daysDiff + 1 < 0) {
        this.setState({error: 'From date should be less then to date'});
        return '';
      }

      if (daysDiff + 1 > config.reportAlllowedDays) {
        this.setState({error: 'Report can be generated for ' + config.reportAlllowedDays + ' days only'});
        return ''
      }
    }

    let nationalization = {
      "dir": language === "ar" ? "rtl" : "ltr",
      "lang": language
    };

    console.log(constants.reportUrl, "constants.reportUrl");
    console.log(fitlerCriteria, "??????????? fitlerCriteria")
    fitlerCriteria = this.b64EncodeUnicode(JSON.stringify(fitlerCriteria));
    nationalization = this.b64EncodeUnicode(JSON.stringify(nationalization))


    let link = document.createElement('a');
    link.href = constants.reportUrl + "/reports/" + this.props.reportID + '?id=' + this.props.reportID + '&searchCriteria=' + fitlerCriteria + '&JWT=' + sessionStorage.token + "&language=" + nationalization + "&reportFormat=" + reportFormat;
    link.download = "download";
    link.click();

    this.setState({downloading: true});
    setTimeout(() => {
      _this.setState({downloading: false});
    }, 4000);
  }

  getTextBox(filter) {
    return (<div className="row">
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
          </div>
          <div className="form-group col-md-8">
            <input type="text" className="form-control " id={filter["id"]}/>
          </div>
        </div>
      </div>
    )

  }

  getDropDown(filter) {
    let list = [];
    if (filter["id"] === "user") {

      let users = [{"userID": "All", "_id": ""}]
      this.props.userList.map((element) => {
        users.push({
          userID: element.userID,
          _id: element._id
        })
      })
      list = users;
    } else if (filter["id"] === "group") {
      let group = [{"group": "All", "_id": ""}]
      this.props.groupList.map((element) => {
        group.push({
          group: element.name,
          _id: element._id
        })
      })
      list = group;
    } else if (filter["id"] == "Acquirer" || filter["id"] == "bank" || filter["id"] == "acquirer") {
      if (!(sessionStorage.orgType === "Acquirer"))
        list = this.props.acquirerNames;
      else
        return ("");
    } else if (filter["id"] == "entityService") {
      if (sessionStorage.orgType === "Entity")
        list = this.props.entityService[0].services
      else
        return ("");
    } else {
      let listTypeData = filter["typeDataDetails"].data;
      list = listTypeData[filter["typeData"]];

    }
    if (filter["id"] == "user") {
      return (
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
          </div>
          <div className="form-group col-md-8">
            <select name={filter["id"]} id={filter["id"]} className="form-control">
              {list.map((option, index) => {
                return (
                  <option key={index} value={option.userID}>{option.userID}</option>
                );
              })}
            </select>
          </div>
        </div>)
    }
    if (filter["id"] == "group") {
      return (
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
          </div>
          <div className="form-group col-md-8">
            <select name={filter["id"]} id={filter["id"]} className="form-control">
              {list.map((option, index) => {
                return (
                  <option key={index} value={option.group}>{option.group}</option>
                );
              })}
            </select>
          </div>
        </div>)
    }

    if (filter["id"] == "entityService") {
      return (
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
          </div>
          <div className="form-group col-md-8">
            <select name={filter["id"]} id={filter["id"]} className="form-control">
              {list.map((option, index) => {
                return (
                  <option key={index} value={option.serviceCode}>{option.serviceName}</option>
                );
              })}
            </select>
          </div>
        </div>)


    } else {

      return (
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
          </div>
          <div className="form-group col-md-8">
            <select name={filter["id"]} id={filter["id"]} className="form-control">
              {list.map((option, index) => {
                return (
                  <option key={index} value={option.value}>{
                    sessionStorage.lang == "EN" ? option.label : option.label_AR}</option>
                );
              })}
            </select>
          </div>
        </div>)
    }

  }

  getMultiSelectList(filter) {
    let list = [];
    if (filter["id"] === "Entity" || filter["id"] === "entity") {
      if (!(sessionStorage.orgType === "Entity"))
        list = this.props.entityNames;
      else
        return ("");
    } else if (filter["id"] === "Acquirer" || filter["id"] === "bank" || filter["id"] === "acquirer") {
      if (!(sessionStorage.orgType === "Acquirer"))
        list = this.props.acquirerNames;
      else
        return ("");
    } else if (filter["id"] === "entityService") {
      if (sessionStorage.orgType === "Entity")
        list = this.props.entityService[0].services;
      else
        return ("");
    } else {

      let listTypeData = filter["typeDataDetails"].data;
      list = listTypeData[filter["typeData"]];

    }

    if (filter["id"] === "entityService") {
      return (<div className="col-md-6">
        <div className="form-group col-md-4">
          <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
        </div>
        <div className="form-group col-md-8">
          <select name={filter["id"]} id={filter["id"]} multiple="multiple" className="multi-select"
                  style={{width: "370"}}>
            <option value="All" selected="true">All</option>
            {list.map((option, index) => {
              return (
                <option key={index} value={option.serviceCode}>{option.serviceName}</option>
              );
            })}
          </select>
        </div>
      </div>)
    } else {

      return (<div className="col-md-6">
        <div className="form-group col-md-4">
          <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
        </div>
        <div className="form-group col-md-8">
          <select name={filter["id"]} id={filter["id"]} multiple="multiple" className="multi-select"
                  style={{width: "370"}} onChange={(e) => {
            this.onChange(filter["id"], e.target)
          }}>
            <option value="All" selected="true">All</option>
            {list.map((option, index) => {
              return (
                <option key={index}
                        value={option.value}>{sessionStorage.lang === "EN" ? option.label : option.label_AR}</option>
              );
            })}
          </select>
        </div>
      </div>)
    }

  }

  getDateFilter(filter) {
    return (<div className="col-md-6">
      <div className="form-group col-md-4">
        <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
      </div>
      <div className="form-group col-md-8">
        <DateControl id={filter["id"]}/>
      </div>
    </div>)
  }

  generateFilters(filter) {
    if (filter === undefined)
      return "";

    if (filter["controlType"] === "textBox")
      return this.getTextBox(filter);

    if (filter["controlType"] === "multipleSelectionList")
      return this.getMultiSelectList(filter);

    if (filter["controlType"] === "dropDownList")
      return this.getDropDown(filter);

    if (filter["controlType"] === "dateTime") {
      return this.getDateFilter(filter)
    }

  }

  b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  clearFields() {
    $('#filterForm').find('input:text').val('');
    $('#filterForm').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }

  onChange(filterId, element) {
    if (filterId === "Entity") {
      let selectedValues = [];
      Object.keys(element.options).map((item) => {
        if (element.options[item].selected) {
          selectedValues.push(element.options[item].value);
        }
      });
      console.log(selectedValues);
    }
  }

  render() {

    console.log("\n\n this.props.reportFilters ??? ", this.props.reportFilters)
    let reprotFormat = [
      {value: "pdf", label: "PDF"},
      {value: "excel", label: "Excel"}
    ];
    let language = [
      {value: "en", label: "English"},
      {value: "ar", label: "Arabic"}
    ];
    return (
      <div className="form-body" id="filterForm" key="filterForm">

        {this.state.error && <div className="alert alert-danger" style={{textAlign: "center"}}>
          <strong>Error!</strong> {this.state.error} </div>}
        <div className="row">
          {this.generateFilters(this.props.reportFilters.data[1])}
          {this.generateFilters(this.props.reportFilters.data[2])}

        </div>
        <div className="row">
          {this.generateFilters(this.props.reportFilters.data[0])}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="pull-right">
              <button type="submit" className="btn green mt-ladda-btn ladda-button" onClick={this.formSubmit.bind(this)}
                      disabled={this.state.downloading}>{this.state.downloading && "Downloading"}{!this.state.downloading
              && "View Report"} </button>
              {"  "}
              <button type="button" className="btn default"
                      onClick={this.clearFields}>{utils.getLabelByID("Clear")}</button>
            </div>
          </div>
        </div>
      </div>

    );

  }
}

export default ReportFilters;