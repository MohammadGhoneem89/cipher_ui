/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';

import Portlet from '../../common/Portlet.jsx';
/*container specific imports*/
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';


class ReportRenderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined}
    this.pageChanged = this.pageChanged.bind(this);


  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {

  }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getADHReportListProtected, this.getRequest());
    this.setState({
      actions: []
    })
  }

  getRequest() {
    let reportType = document.getElementById('reportType') == null ? "" : document.getElementById('reportType').value;
    let name = document.getElementById('name') == null ? "" : document.getElementById('name').value;
    let connectionType = document.getElementById('connectionType') == null ? "" : document.getElementById('connectionType').value;

    var searchCriteria = {}

    if (reportType != "")
      searchCriteria.reportType = reportType

    if (name != "")
      searchCriteria.name = name
    if (name != "")
      searchCriteria.connectionType = connectionType


    this.setState({searchFilters: searchCriteria})

    var request = {
      "action": "mappingData",

      searchCriteria,
      "page": {
        "currentPageNo": 1,
        "pageSize": 10
      }
    }
    this.setState({currentPageNo: 1})

    return request;
  }

  formSubmit() {

    this.props.actions.generalProcess(constants.getADHReportListProtected, this.getRequest());
  }

  pageChanged(pageNo) {
    if (pageNo != undefined) {

      var request = "";

      if (this.state.searchFilters == undefined) {

        request = {
          "action": "ApiListData",
          "searchCriteria": {},
          "page": {
            "currentPageNo": pageNo,
            "pageSize": 10
          }
        }
      } else {
        var searchCriteria = this.state.searchFilters
        request = {
          "action": "ApiListData",
          searchCriteria,
          "page": {
            "currentPageNo": pageNo,
            "pageSize": 10
          }
        }
      }

      this.setState({currentPageNo: pageNo})

      this.props.actions.generalProcess(constants.getADHReportListProtected, request);

    }
  }

  clearFields() {
    $('#ApiListData').find('input:text').val('');
    $('#ApiListData').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }


  render() {

    if (this.props.ADHReportList && this.props.ADHReportList.data) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                  <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("Report List Filters")}</span></div>
                  <div className="tools">
                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                  </div>
                </div>
                <div className="portlet-body">
                  <div className="form-body" id="ApiListData">
                    <div className="row">
                      <div className="col-md-12">

                        <div className="row">

                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Report Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="name" id="name"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Report Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="route" id="reportType"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Connection Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="route" id="connectionType"/>
                            </div>
                          </div>
                        </div>

                        <div className="form-actions right">
                          <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">

                              <button type="submit" className="btn green"
                                      onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                              {"  "}
                              <button type="button" className="btn default"
                                      onClick={this.clearFields}>{utils.getLabelByID("Clear")}</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Portlet title={utils.getLabelByID("ADHOC Report List")} isPermissioned={true}
                   actions={this.state.actions}>
            <Table fontclass=""
                   gridColumns={utils.getGridColumnByName("ADHRenderReportList")}
                   gridData={this.props.ADHReportList.data.searchResult}
                   totalRecords={this.props.ADHReportList.pageData.totalRecords}
                   searchCallBack={this.searchCallBack}
                   pageSize={10}
                   pagination={true} pageChanged={this.pageChanged}
                   export={false}
                   search={true}
                   activePage={this.state.currentPageNo}/>
          </Portlet>
          {console.log(this.props.ADHReportList.data.searchResult)}


        </div>
      );

    } else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

ReportRenderList.propTypes = {
  ADHReportList: PropTypes.object,
  children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
  return {
    ADHReportList: _.get(state.app, 'ADHReportList', undefined),
    typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

ReportRenderList.displayName = "Report List";
export default connect(mapStateToProps, mapDispatchToProps)(ReportRenderList);