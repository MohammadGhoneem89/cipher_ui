import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';

import _ from 'lodash';

import Input from '../../common/Input.jsx'
import Label from '../../common/Lable.jsx';
import Combobox from '../../common/Select.jsx';
import DateControl from '../../common/DateControl.jsx'
import Portlet from '../../common/Portlet.jsx';

import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';


import * as gen from '../../common/generalActionHandler';
import * as requestCreator from '../../common/request.js';
import * as constants from '../../constants/Communication.js';


class WorkingCalendarSearch extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      page: {
        pageSize: 10,
        currentPageNo: 1,
        totalRecords: 0
      },
      gridData: []
    };
    this.generalHandler = gen.generalHandler.bind(this)
  }

  componentDidMount() {
    let request = {
      "page": {
        "currentPageNo": 1,
        "pageSize": _.get(this.state, 'page.pageSize', 10)
      },
      "searchCriteria": {}
    }
    this.props.actions.generalProcess(constants.workingCalendarList, request);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps)
    if (nextProps.workingCalendarList) {
      console.log('wotking calender')
      let page = { ...nextProps.workingCalendarList.pageData }

      // Grid Data Preperation
      let gridData = [..._.get(nextProps.workingCalendarList, 'data.searchResult', [])]
      gridData.map(item => {
        item.actions = [
          {
            "label": "View",
            "URI": ["/workingCalendarDetail"],
            "params": "_id",
            "iconName": "icon-docs"
          }
        ]
        return item
      })


      console.log(gridData, ' Grid Data')
      this.setState({
        isLoading: false,
        gridData,
        page
      })
    }
  }



  getRequest = (pageNo = 1) => {
    console.log('page changed 2 : ', pageNo)
    let searchCriteria = {
      ..._.get(this.state, 'searchCriteria', {})
    }
    console.log(searchCriteria, ' search criteria')

    let request = {
      "page": {
        "currentPageNo": pageNo,
        "pageSize": this.state.page.pageSize

      },
      searchCriteria
    };
    return request
  }

  pageChanged = pageNo => {
    console.log('page changed : ', pageNo)
    this.updateCurrentPage(pageNo);
    this.props.actions.generalProcess(constants.workingCalendarList, this.getRequest(pageNo));
  };

  updateCurrentPage = pageNo => {
    let page = { ...this.state.page };
    page.currentPageNo = pageNo;
    this.setState({ page });
  };

  formSubmit = (e) => {
    e.preventDefault()
    //this.setState({isLoading:true})
    this.props.actions.generalProcess(constants.workingCalendarList, this.getRequest());
    console.log('form submitted')
  }

  render() {

    // let calendarActions = [
    //     {
    //         type: "link",
    //         className: "btn btn-default",
    //         label: "ADD",
    //         icon: "plus",
    //         actionHandler: updateState.bind(this, {
    //             exceptionListModalIsOpen: true,
    //             index: state.exceptionList.length
    //         })
    //     }
    // ];

    let calendarActions = [
      {
        "URI": "/workingCalendarDetail",
        actionType: "PORTLET_LINK",
        iconName: "fa fa-plus",
        value: "4043",
        type: "pageAction",
        label: "ADD",
        labelName: "COM_AB_Add",
        children: []
      }
    ]


    if (this.state.isLoading)
      return (<div className="loader">{"Loading"}</div>)
    else
      return (
        <div id="workingCalenderList">
          <Portlet title={"Calendar Search Filter"}>
            <div className="form" style={{ marginBottom: '3%' }}>
              <div className="row">
                <div className="col-md-6">
                  <Label text="Calendar Name" columns='4' />
                  <Input
                    fieldname='calendarName'
                    formname='searchCriteria'
                    columns='7'
                    placeholder=''
                    state={this.state}
                    actionHandler={this.generalHandler}
                    className="form-control"
                  />
                  <div className="col-md-1"></div>
                </div>
                <div className="col-md-6">
                  <div className="col-md-1"></div>
                  <Label text="Calendar Year" columns='4' />

                  <Input
                    fieldname='calendarYear'
                    formname='searchCriteria'
                    columns='7'
                    placeholder=''
                    state={this.state}
                    actionHandler={this.generalHandler}
                    className="form-control"
                  />
                </div>
              </div>


              <div className="row clearfix pull-right">
                <button type="submit" className="btn green" style={{ marginRight: '30px' }} onClick={this.formSubmit}>
                  Search
                </button>
              </div>
            </div>

            <br></br>
            <Portlet title={"Calendar List"} isPermissioned={true} actions={calendarActions}>
              <Table
                gridColumns={utils.getGridColumnByName('workingCalendarSearchList')}
                gridData={this.state.gridData || []}
                totalRecords={this.state.page.totalRecords}
                pageChanged={this.pageChanged}
                pageSize={this.state.page.pageSize}
                pagination={true}
                activePage={this.state.page.currentPageNo}
              />
            </Portlet>
          </Portlet>
        </div>



      )
  }
}

WorkingCalendarSearch.propTypes = {
};

function mapStateToProps(state, ownProps) {
  console.log(state.app, ' state')
  return {
    workingCalendarList: _.get(state.app, 'workingCalendarList', undefined)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

WorkingCalendarSearch.displayName = "Working Calender Search";
export default connect(mapStateToProps, mapDispatchToProps)(WorkingCalendarSearch)