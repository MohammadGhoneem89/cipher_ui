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
      searchFilters: "", 
      currentPageNo: 1, 
      APIPayloadID: undefined, 
      actions: [], 
      typeData: undefined,
      listData: undefined,
      pageData: {}
    }
    this.pageChanged = this.pageChanged.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.listData && nextProps.pageData) {
    //   this.setState({
    //     listData: nextProps.listData,
    //     pageData: nextProps.pageData
    //   })
    // }
    console.log("cosent profile list ------", nextProps);
    console.log("cosent profile State ------", this.state);
    if (nextProps.listData) {
      console.log("list Data", nextProps.listData);
      let parsedData = nextProps.listData.map(item=>{
        return {
          ...JSON.parse(item.tranxData),
          createdAt:item.createdAt,
          actions: [{
            URI: ["/ConsentProfile"],
            iconName: "icon-docs",
            label: "View",
            params: "",
            type: "componentAction",
            value: "1003",
        }]}
      })

      console.log("parsed Data", parsedData);
      this.setState({
        pageData: parsedData,
        listData: parsedData
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
    console.log("currentPageNo----------", this.state);
    let request = {
      'body':{
        "page": {
          "currentPageNo": this.state.currentPageNo,
          "pageSize": 10
        }
      }
    }

    this.props.actions.generalProcess(constants.getConsentProfileList, request);
    this.setState({
      actions: [{
        "value": "1002",
        "type": "pageAction",
        "label": "ADD",
        "labelName": "COM_AB_Add",
        "actionType": "PORTLET_LINK",
        "iconName": "fa fa-plus",
        "URI": "/ConsentProfile/NEW",
        "children": []
      }] 
    })
  }

  getRequest() {
    let consentType = document.getElementById('consentType') == null ? "" : document.getElementById('consentType').value;
//    let ownerOrgType = document.getElementById('ownerOrgType') == null ? "" : document.getElementById('ownerOrgType').value;
    let documentType = document.getElementById('documentType') == null ? "" : document.getElementById('documentType').value;

    var searchCriteria = {}

    if (consentType != "")
      searchCriteria.consentType = consentType
    // if (ownerOrgType != "")
    //   searchCriteria.ownerOrgType = ownerOrgType
    if (documentType != "")
      searchCriteria.documentType = documentType

    this.setState({searchFilters: searchCriteria})
    console.log("searchCriteria : ", searchCriteria  );
    var request = {
      'body': {
        "action": "mappingData",
        searchCriteria,
        "page": {
          "currentPageNo": 1,
          "pageSize": 10
        }
      }
    }
    console.log("Request ---------------", request);
    this.setState({currentPageNo: 1})

    return request;
  }

  formSubmit() {
    console.log("Form submit---------------", this.getRequest());
    this.props.actions.generalProcess(constants.getConsentProfileList, this.getRequest());
  }

  pageChanged(pageNo) {
    console.log("PageNo -------------------", pageNo);
    if (pageNo != undefined) {

      var request = "";

      if (this.state.searchFilters == undefined) {

        request = {
          'body':{
            "action": "ApiListData",
            "page": {
              "currentPageNo": pageNo,
              "pageSize": 10
            }
          }
        }
      } else {
        var searchCriteria = this.state.searchFilters
        request = {
          'body':{
            "action": "ApiListData",
            searchCriteria,
            "page": {
              "currentPageNo": pageNo,
              "pageSize": 10
            }
          }
        }
      }

      this.setState({currentPageNo: pageNo})

      this.props.actions.generalProcess(constants.getConsentProfileList, request);
    }
  }

  clearFields() {
    $('#ApiListData').find('input:text').val('');
    $('#ApiListData').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });

    this.setState({
      'page':{
        'currentPageNo':1
      }
    })
    let request = {
      'body':{
        "action": "ApiListData",
        "page": {
          "currentPageNo": 1,
          "pageSize": 10
        }
      }
    }
    this.props.actions.generalProcess(constants.getConsentProfileList, request);
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
                    <span className="caption-subject">{utils.getLabelByID("Consent Profile Filters")}</span></div>
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
                              <label className="control-label">{utils.getLabelByID("Document Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="name" id="documentType"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Owner Org Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" disabled className="form-control" name="route" id="ownerOrgType"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Consent Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="route" id="consentType"/>
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
          {      console.log("cosent profile State ------", this.state)}
          <Portlet title={utils.getLabelByID("Consent Profile List")} isPermissioned={true}
                   actions={this.state.actions}>
            <Table fontclass=""
                   gridColumns={utils.getGridColumnByName("ADHReportList")}
                   gridData={this.state.listData}
                   totalRecords={this.state.pageData.length}
              //     searchCallBack={this.searchCallBack}
                   pageSize={10}  
                   pagination={true} 
                   pageChanged={this.pageChanged}
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
    listData: _.get(state.app, 'consentProfileList', []),
  //  pageData: _.get(state.app, 'ADHReportList.ADHReportList.data.pageData', undefined),
    typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Consent Profile List";
export default connect(mapStateToProps, mapDispatchToProps)(List);