/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as requestCreator from '../../common/request.js';
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
      pageData: {},
      Container: {}
    }
    this.pageChanged = this.pageChanged.bind(this);


  }

  componentWillReceiveProps(nextProps) {
    console.log("consentStatusNew nextprops -----------", nextProps);
    // if (nextProps.listData && nextProps.pageData && nextProps.orgTypes) {
    //   console.log("testing print");
    //   this.setState({
    //     listData: nextProps.listData,
    //     pageData: nextProps.pageData,
    //     Container:{
    //       orgTypes:nextProps.orgTypes          
    //     }
    //   })
    // }
    if (nextProps.orgTypes) {
      console.log("testing print");
      this.setState({
        Container:{
          orgTypes:nextProps.orgTypes          
        }
      })
    }
  }

  componentWillMount() {

  }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES'])); // Org types (entities)
    
    
  //  window.scrollTo(0, 0);
    // this.props.actions.generalProcess(constants.getADHReportList, this.getRequest());
    // this.setState({
    //   actions: [{
    //     "value": "1002",
    //     "type": "pageAction",
    //     "label": "ADD",
    //     "labelName": "COM_AB_Add",
    //     "actionType": "PORTLET_LINK",
    //     "iconName": "fa fa-plus",
    //     "URI": "/addDocType/NEW",
    //     "children": []
    //   }]
    // })
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
      {console.log("render state ======= ", this.state)}
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                  <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("Consent Status Type Filters")}</span></div>
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
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Id Type")}</label>
                                <div className="form-group col-md-8">
                                  <select id="idType" name="idType"
                                     className="form-control">
                                    <option value="">--select--</option>
                                    {_.get(this.state.Container, 'orgTypes', []).map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Consent Type")}</label>
                                <div className="form-group col-md-8">
                                  <select id="consentType" name="consentType" 
                                     className="form-control">
                                    <option value="">--select--</option>
                                    {/* {state.Container.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })} */}
                                  </select>
                                </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="ID" id="ID"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Action")}</label>
                                <div className="form-group col-md-8">
                                  <select id="action" name="action"
                                     className="form-control">
                                    <option value="">--select--</option>
                                    {/* {state.Container.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })} */}
                                  </select>
                                </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("DocumentType")}</label>
                                <div className="form-group col-md-8">
                                  <select id="documentType" name="documentType"
                                     className="form-control">
                                    <option value="">--select--</option>
                                    {/* {state.Container.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })} */}
                                  </select>
                                </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Document No")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control" name="documentNo" id="documentNo"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Consent Provided By")}</label>
                                <div className="form-group col-md-8">
                                  <select id="consentProvidedBy" name="consentProvidedBy"
                                     className="form-control">
                                    <option value="">--select--</option>
                                    {/* {state.Container.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })} */}
                                  </select>
                                </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Consent Provided To")}</label>
                                <div className="form-group col-md-8">
                                  <select id="consentProvidedTo" name="consentProvidedTo"
                                     className="form-control">
                                    <option value="">--select--</option>
                                    {/* {state.Container.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })} */}
                                  </select>
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
          </div>

          <Portlet title={utils.getLabelByID("Consents Status List")} isPermissioned={true}
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
    typeData: state.app.typeData.data,
    orgTypes: _.get(state.app, 'typeData.data.ORG_TYPES', undefined),
    documentList : _.get(state.app, 'documentTypeList', undefined)
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Consents Status List";
export default connect(mapStateToProps, mapDispatchToProps)(List);