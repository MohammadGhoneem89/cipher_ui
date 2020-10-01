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
import Combobox from '../../common/Select.jsx';
import * as gen from '../../common/generalActionHandler';
import moment from 'moment';
import * as constants from '../../constants/Communication.js';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined,
      listData: [],
      pageData: {},
      Container: {},
      documentTypeList: undefined,
      providedConsentList: undefined,
      revisionsList : undefined,
      errors: undefined
    }
    this.pageChanged = this.pageChanged.bind(this);
    this.generalHandler = gen.generalHandler.bind(this)
    this.documentTypeHandler = this.documentTypeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("consentHistoryNew nextprops -----------", nextProps);
    
    let documentTypeList = [];
    if (nextProps.documentTypeList){     
      nextProps.documentTypeList.forEach((elem) => {
        let parsedData = JSON.parse(elem.tranxData);  
        console.log("parsing---------",parsedData);
          let elemEnt = _.get(documentTypeList, parsedData.key, {});

          elemEnt = {
          "label": parsedData.key,
          "value": parsedData.key
        }
        documentTypeList.push(elemEnt);
      })
      this.setState({
        documentTypeList
      })
    }
    let providedConsentList = [];
    if (nextProps.providedConsentList){  
         
      nextProps.providedConsentList.forEach((elem) => {
        let parsedData = JSON.parse(elem.tranxData);  
        console.log("parsing providedConsentList---------",parsedData);
          let elemEnt = _.get(providedConsentList, parsedData.key, {});

          elemEnt = {
          "label": parsedData.key,
          "value": parsedData.key
        }
        providedConsentList.push(elemEnt);
      })
      this.setState({
        providedConsentList
      })
    }

    if (nextProps.orgTypes) {
      console.log("testing print");
      let Container = _.cloneDeep(this.state.Container)
      Container.orgTypes = nextProps.orgTypes
      this.setState({
        Container
      })
    }

    let revisionsList = [];
    if(nextProps.revisionsList){
      revisionsList = Object.entries(nextProps.revisionsList).map(item => {
        let test = item[1].consentProvidedTo[0].consentTillDate.split(' ');
        console.log(moment(test[0] + " " + test[1]));
        
        let date_now = moment();
        let valid_date = moment(test[0] + " " + test[1])
        let days = valid_date.diff(date_now, 'days')
        let hrs = valid_date.diff(date_now, 'hours')
        console.log("dfiff------------", valid_date.diff(date_now));
        console.log("date_now=======",date_now );
        console.log("valid_date=======",valid_date );
        
        item[1]['status'] = item[1].consentProvidedTo[0].statusOfConsent;
        item[1]['providedTo'] = item[1].consentProvidedTo[0].toOrgCode;
        item[1].txtimestamp = new Date(item[1].txtimestamp).toLocaleDateString()
        item[1]['validity'] = days +  ' d ' + (hrs - (days * 24))
        console.log(item[1]) 
        return item[1];

      })
      console.log("revisionsList---------------", revisionsList);
        //let parsedData = JSON.parse(elem.tranxData);  
        
       //  console.log("revisionList parsing---------",elem);
        //   let elemEnt = _.get(revisionsList, parsedData.key, {});

        //   elemEnt = {
        //   "label": parsedData.key,
        //   "value": parsedData.key
        // }
        // documentTypeList.push(elemEnt);
      this.setState({
        revisionsList
      })
    }
  }

  componentWillMount() {

  }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES', 'CONSENT_TYPES'])); // Org types (entities)
    this.props.actions.generalProcess(constants.getDocumentTypeList);

    
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
    let request = 
    {
      "channelname":"prwchannel",
      "smartcontract":"consent_profile_management",
      "endpoint":"CouchDB-1",
      "pvtcollection":"prwchannel_consent_profile_management%24%24pprovidedconsent",
      "key":this.state.Container.providedConsentID
    }
    console.log("submit Request ----------------- ", request)
    this.props.actions.generalProcess(constants.getDocumentRevesions, request);
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

  documentTypeHandler(formname, fieldname, type, e){
    console.log("documentTypeHandler-------------------");
    console.log("formname = ", formname);
    console.log("fieldname = ", fieldname);
    console.log("type = ", type);
    console.log("e = ", e.target.name,e.target.value);

    let value = e.target.value;
    let formdata = _.get(this.state, formname, {});
    let errors = _.get(this.state, 'errors', {});
    _.set(formdata, e.target.name, value);
    _.set(errors, e.target.name, undefined);
    console.log("container------------------", formdata);
    let documentTypeList = [..._.get(this.state, 'documentTypeList', [])]
    console.log("documentTypeList-------------",documentTypeList);
    let _out = _.find(documentTypeList, {'label': value});
    if(!_out){
      _.set(errors, 'documentType', 'Invalid Selection')
      this.setState({
        [formname]: formdata,
        errors
      })
      return
    }
    if(value == ""){
      _.set(errors, 'documentType', '')
      this.setState({
        [formname]: formdata,
        errors
      })
      return
    }    
    formdata.providedConsentID = ''
    this.setState({
      [formname]: formdata,
      providedConsentList: [],
      errors
    })
    let request = {
      "documentType": value
    }
    this.props.actions.generalProcess(constants.getProvidedConsentList, request);
    console.log("documentType state------------------------",this.state);
  }

  render() {

    if (this.state.documentTypeList) {
      {console.log("render state ======= ", this.state)}
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                  <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("Consent History Type Filters")}</span></div>
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
                                <div className="col-md-8">
                                  <Combobox
                                      status={(this.state.errors && this.state.errors.idType) ? "ERROR" : undefined}
                                      fieldname='idType'
                                      formname='Container'
                                      allowValue={false}
                                      placeholder={utils.getLabelByID('')}
                                      style={{}}
                                      state={this.state}
                                      typeName="orgTypes"
                                      dataSource={_.get(this.state, 'Container', {})}
                                      actionHandler={this.generalHandler}
                                      className="form-control"
                                    />
                                </div>                                
                             </div>
                            </div>
                        </div>
                        <div className="row">  
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("ID")}</label>
                            </div>
                            <div className="col-md-8">
                              <Combobox
                                  status={(this.state.errors && this.state.errors.providedConsentID) ? "ERROR" : undefined}
                                  fieldname='providedConsentID'
                                  formname='Container'
                                  allowValue={false}
                                  placeholder={utils.getLabelByID('ID')}
                                  style={{}}
                                  state={this.state}
                                  typeName="providedConsentList"
                                  dataSource={this.state}
                                  actionHandler={this.generalHandler}
                                  className="form-control"
                                />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Document Type")}</label>
                                <div className="col-md-8">
                                  <Combobox
                                      status={(this.state.errors && this.state.errors.documentType) ? "ERROR" : undefined}
                                      fieldname='documentType'
                                      formname='Container'
                                      allowValue={false}
                                      placeholder={utils.getLabelByID('Document Type')}
                                      style={{}}
                                      state={this.state}
                                      typeName="documentTypeList"
                                      dataSource={this.state}
                                      actionHandler={this.documentTypeHandler}
                                      className="form-control"
                                    />
                                </div> 
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <div className="col-md-4">
                                <label className="control-label">{utils.getLabelByID("Document No")}</label>
                              </div>
                              <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="documentNo" id="documentNo"/>
                              </div>
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

          <Portlet title={utils.getLabelByID("Consents History List")} isPermissioned={true}
                   actions={this.state.actions}>
            <Table fontclass=""
                   gridColumns={utils.getGridColumnByName("ConsentStatusList")}
                   gridData={this.state.revisionsList}
                   totalRecords={this.state.revisionsList.length}
                //   searchCallBack={this.searchCallBack}
               //    pageSize={10}
              //     pagination={true} pageChanged={this.pageChanged}
              //     export={false}
              //     search={true}
              //     activePage={this.state.currentPageNo}
                   />
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
    consentTypes: _.get(state.app, 'typeData.data.CONSENT_TYPES', undefined),
    documentTypeList : _.get(state.app, 'documentTypeList', []),
    providedConsentList : _.get(state.app, 'providedConsentList', []),
    revisionsList : _.get(state.app, 'result', [])    
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Consents History List";
export default connect(mapStateToProps, mapDispatchToProps)(List);