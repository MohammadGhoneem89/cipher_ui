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


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined,
      listData: [],
      pageData: {}
    }
    this.pageChanged = this.pageChanged.bind(this);


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listData && nextProps.pageData) {
      this.setState({
        listData: nextProps.listData,
        pageData: nextProps.pageData
      })
    }
  }

  componentWillMount() {

  }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // this.props.actions.generalProcess(constants.getADHReportList, this.getRequest());
    this.setState({
      actions: [{
        "value": "1002",
        "type": "pageAction",
        "label": "ADD",
        "labelName": "COM_AB_Add",
        "actionType": "PORTLET_LINK",
        "iconName": "fa fa-plus",
        "URI": "/addDocType/NEW",
        "children": []
      }]
    })
  }

  getRequest() {
    let documentTypeName = document.getElementById('documentTypeName') == null ? "" : document.getElementById('documentTypeName').value;
    let ownerOrgType = document.getElementById('ownerOrgType') == null ? "" : document.getElementById('ownerOrgType').value;
    let documentName = document.getElementById('documentName') == null ? "" : document.getElementById('documentName').value;

    var searchCriteria = {}

    if (documentTypeName != "")
      searchCriteria.documentTypeName = documentTypeName

    if (ownerOrgType != "")
      searchCriteria.ownerOrgType = ownerOrgType
    if (documentName != "")
      searchCriteria.documentName = documentName


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
    this.props.actions.generalProcess(constants.getADHReportList, this.getRequest());
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

      this.props.actions.generalProcess(constants.getADHReportList, request);

    }
  }

  clearFields() {
    $('#ApiListData').find('input:text').val('');
    $('#ApiListData').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }


  render() {

    if (this.state.listData) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                  <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("Document Type Filters")}</span></div>
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
                              <label className="control-label">{utils.getLabelByID("Document Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="name" id="documentName"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Owner Org Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="route" id="ownerOrgType"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Document Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="route" id="documentTypeName"/>
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

          <Portlet title={utils.getLabelByID("Document List")} isPermissioned={true}
                   actions={this.state.actions}>
            <Table fontclass=""
                   gridColumns={utils.getGridColumnByName("ADHReportList")}
                   gridData={this.state.listData}
                   totalRecords={this.state.pageData.totalRecords}
                   searchCallBack={this.searchCallBack}
                   pageSize={10}
                   pagination={true} pageChanged={this.pageChanged}
                   export={false}
                   search={true}
                   activePage={this.state.currentPageNo}/>
          </Portlet>


        </div>
      );

    } else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

List.propTypes = {
  listData: PropTypes.object,
  children: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    listData: _.get(state.app, 'ADHReportList.ADHReportList.data.searchResult', undefined),
    pageData: _.get(state.app, 'ADHReportList.ADHReportList.data.pageData', undefined),
    typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Consents Status List";
export default connect(mapStateToProps, mapDispatchToProps)(List);