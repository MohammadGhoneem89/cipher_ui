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
import Input from '../../common/Input.jsx';

import * as gen from './../../../core/common/generalActionHandler';
import * as toaster from '../../common/toaster.js';

import * as constants from '../../constants/Communication.js';
import { sha256 } from 'js-sha256';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined,
      listData: [],
      pageData: {},
      Container: {},
      isLoading: true,
      revisionsList : [],
      orgList : undefined,
      isGridLoading : false
    }
    this.pageChanged = this.pageChanged.bind(this);
    this.generalHandler = gen.generalHandler.bind(this)
    this.documentTypeHandler = this.documentTypeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      console.log("consentStatusNew nextprops -----------", nextProps);
 
      if (nextProps.orgTypes && nextProps.documentList && nextProps.consentType && nextProps.orgList) {
        
          let documentList = []
    //      console.log("jkjaklsdjklajslkdj ");
          nextProps.documentList.forEach((elem) => {
            let parsedData = JSON.parse(elem.tranxData);  
            console.log("parsing---------",parsedData);
            let elemEnt = _.get(documentList, parsedData.key, {});
  
            elemEnt = {
              "label": parsedData.description,
              "value": parsedData.key
            }
            documentList.push(elemEnt);
          })
          
          let orgList = []
    //      console.log("jkjaklsdjklajslkdj ");
          nextProps.orgList.forEach((elem) => {
          //  let parsedData = JSON.parse(elem.tranxData);  
          //  console.log("parsing---------",parsedData);
            let elemEnt = _.get(orgList, elem.value, {});
  
            elemEnt = {
              "label": elem.value,
              "value": elem.value
            }
            orgList.push(elemEnt)
          })
  
        console.log("testing print");
        let typeData = _.get(this.state, 'typeData', {});
        typeData.consentType = nextProps.consentType
        typeData.orgList = orgList;
        let Container = _.cloneDeep(this.state.Container);
        Container.orgTypes= nextProps.orgTypes;
        Container.documentList=documentList;
        this.setState({
          Container,
          typeData : typeData,
          isLoading: false,
          orgList : nextProps.orgList
        })
      }
    
  }

  componentWillMount() {

  }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    let Container = _.cloneDeep(this.state.Container);
    Container.idType = "Unified ID"
    this.setState({
      Container
    })
    this.props.actions.generalProcess(constants.geOrgList, {});
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
    let errors = {}
    let userID = _.get(this.state.Container, 'userID', undefined)
    let consentType = _.get(this.state.Container, 'consentType', undefined)
    let documentType = _.get(this.state.Container, 'documentType', undefined)
    let consentProvidedBy = _.get(this.state.Container, 'consentProvidedBy', undefined)
    let consentProvidedTo = _.get(this.state.Container, 'consentProvidedTo', undefined)
    let documentNo;

    console.log("Container=============", this.state.Container)

    if(!userID){
      _.set(errors, 'userID', 'Field Required')
    }
    
    // else{
    //   _.set(errors, 'consentType', 'Field Required')
    // }
    if(!documentType){
      _.set(errors, 'documentType', 'Field Required')
    }

    if(documentType){
      console.log("if condition hit Document list----------------", this.state.Container.documentList);
      console.log("output of document -----------",_.find(this.state.Container.documentList, {'value': documentType}));
      let _out = _.find(this.state.Container.documentList, {'value': documentType});
      if(!_out){
        _.set(errors, 'documentType', 'Invalid Selection')
      }
    }else{
      _.set(errors, 'documentType', 'Document Selection Required')
    }

    if(consentType){
      console.log("if condition hit Document list----------------", this.state.typeData.consentType);
      console.log("output of document -----------",_.find(this.state.typeData.consentType, {'label': consentType}));
      let _out = _.find(this.state.typeData.consentType, {'label': consentType});
      if(!_out){
        _.set(errors, 'consentType', 'Invalid Selection')
      }
      else{
        if(consentType === "TRANSACTIONAL"){
          documentNo = _.get(this.state.Container, 'documentNo', undefined)
          if(!documentNo){
            _.set(errors, 'documentNo', `Field Required when ConsentType 'TRANSACTIONAL'`)
          }
        }
      }
    }else{
      _.set(errors, 'consentType', 'consentType Selection Required')
    }

    if(consentProvidedBy){
      console.log("if condition hit consentProvidedBy----------------", this.state.typeData.orgList);
      console.log("output of document -----------",_.find(this.state.typeData.orgList, {'value': consentProvidedBy}));
      let _out = _.find(this.state.typeData.orgList, {'value': consentProvidedBy});
      if(!_out){
        _.set(errors, 'consentProvidedBy', 'Invalid Selection')
      }
    }

    if(consentProvidedTo){
      console.log("if condition hit consentProvidedTo---------------", this.state.typeData.orgList);
      console.log("output of document -----------",_.find(this.state.typeData.orgList, {'value': consentProvidedTo}));
      let _out = _.find(this.state.typeData.orgList, {'value': consentProvidedTo});
      if(!_out){
        _.set(errors, 'consentProvidedTo', 'Invalid Selection')
      }
    }
    else{
      _.set(errors, 'consentProvidedTo', 'consentType Selection Required')
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
          errors,
          isLoading:false
      })
      return
    }
    this.setState({
      errors: {},
      isGridLoading :true
    })
      let key, request;
      console.log("form submit -------------", this.state);
      if(consentType !== "GLOBAL"){
        console.log("sha256==================>>",sha256(documentNo))
        let hash = sha256.hex(documentNo);
        key = userID + "_" + documentType + "_" + hash + "_" + consentProvidedTo;
       
        request = 
        {
          "channelname":"prwchannel",
          "smartcontract":"consent_profile_management",
          "endpoint":"CouchDB-1",
          "pvtcollection":"prwchannel_consent_profile_management%24%24pprovidedconsent",
          "key": key
        }
      }
      else{
        key = userID + "_" + documentType + "_" + consentType + "_" + consentProvidedTo;
        request = 
        {
          "channelname":"prwchannel",
          "smartcontract":"consent_profile_management",
          "endpoint":"CouchDB-1",
          "pvtcollection":"prwchannel_consent_profile_management%24%24pprovidedconsent",
          "key": key
        }
      }

      console.log("submit Request ----------------- ", request)
      this.props.actions.generalAsyncProcess(constants.getDocumentRevesions, request)
                .then(res => {
                  console.log("Response ================ ", res);
                  if(res.errorCode !== 200){
                    this.setState({
                      revisionsList: [],
                      isGridLoading: false
                    })
                    toaster.showToast("Unable To Find Document", "Error");
                    return;
                  }
                  let revisionsList = [];
                  if(res.result){
            
                    revisionsList = Object.entries(res.result).map(item => {
                      console.log("item==========", item[1]);
                      console.log("utc date status=======",moment(item[1].consentDetails.consentDate).format("MM/DD/YYYY"));
                      let cur_date = moment().format("MM/DD/YYYY HH:mm:ss");
                      let grant_date = moment.unix(item[1].consentDetails.consentTillDate).format("MM/DD/YYYY HH:mm:ss");
                      console.log("cur_date=====", cur_date);
                      console.log("grant_date=====", grant_date);
                      let days = moment(grant_date).diff(moment(cur_date), "days");
                      let hours = moment(grant_date).diff(moment(cur_date), "hours");
                      let secs = moment(grant_date).diff(moment(cur_date));
              
              
                      console.log("days =======", days);
                      console.log("hours =======", hours);
                      let mins;
                      let valid;
                      if(item[1].consentDetails.statusOfConsent === "GRANT")
                      {
                        if(secs <= 0){
                          valid = "Expired"
                        }
                        else{
                          if(hours <= 0){
                            mins = moment(grant_date).diff(moment(cur_date), "minutes");
                            valid = hours +  ' hrs ' + (mins - (hours * 60)) + " mins"
                            console.log("minutes ==== ", mins);
                            console.log("valid ==== ", valid);
                            
                          }
                          else{
                            valid = days +  ' d ' + (hours - (days * 24)) + " hrs"
                            console.log("valid ==== ", valid);
                          }
                        }
                      }
                      else{
                        valid = "-"
                      }
                      console.log(item[1].consentDetails.toOrgCode)
                      let _imgURL = _.find(this.state.orgList, {"value" : item[1].consentDetails.toOrgCode})
                      console.log("testing imgeURL FETCH =============>>>> ",_imgURL);
                      let obj = {
                        "key": item[1].key,
                        "timestamp": moment.unix(item[1].consentDetails.consentTillDate).format("MM/DD/YYYY HH:mm:ss"),
                        "status": item[1].consentDetails.statusOfConsent,
                        "documentType": item[1].documentType,
                        "documentNo": item[1].consentDetails.relatedDocumentNo,
                        "consentType": item[1].consentDetails.consentType,
                        "validity": valid,
                        "providedTo": { imageURL: _imgURL ? _imgURL.img : '', name: item[1].consentDetails.toOrgCode}
                      }
                      return obj;
              
                    })
                    console.log("revisionsList---------------", revisionsList);
              
                    this.setState({
                      revisionsList,
                      isGridLoading : false
                    })
                  }
                })
                .catch(err=> {
                    this.setState({
                      revisionsList : [],
                      isGridLoading: false
                    })
                    toaster.showToast(err, "Error");
                })
        

      // console.log("Request === ", request);
      // this.props.actions.generalProcess(constants.getConsentStatus, request);

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

    if (!this.state.isLoading) {
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
                                <div className="col-md-8">
                                  <Input
                                    divStyle={{ padding: '0px', top: '10px',
                                    position: 'absolute' }}
                                    errorIconStyle={{
                                      display:'none'
                                    }}
                                    status={(this.state.errors && this.state.errors.idType) ? "ERROR" : undefined}
                                    fieldname='idType'
                                    formname='Container'
                                    disabled={true}
                                    placeholder={utils.getLabelByID('')}
                                    state={this.state}
                                    actionHandler={this.generalHandler}
                                    className="form-control"
                                  />
                                </div>                                
                             </div>
                            </div>
                          <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Consent Type")}</label>
                                <div className="col-md-8">
                                  <Combobox
                                      status={(this.state.errors && this.state.errors.consentType) ? "ERROR" : undefined}
                                      fieldname='consentType'
                                      formname='Container'
                                      allowValue={false}
                                      selected={_.get(_.get(this.state, 'typeData.consentType', []).filter(item =>
                                          item.value == _.get(this.state, 'Container.consentType', '')
                                      ), `[${0}].label`, undefined)}
                                      placeholder={utils.getLabelByID('Consent Type')}
                                      style={{}}
                                      state={this.state}
                                      typeName="consentType"
                                      dataSource={_.get(this.state, 'typeData', {})}
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
                              <label className="control-label">{utils.getLabelByID("User ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <Input
                                divStyle={{ padding: '0px', top: '10px',
                                position: 'absolute' }}
                                errorIconStyle={{
                                  display:'none'
                                }}
                                status={(this.state.errors && this.state.errors.userID) ? "ERROR" : undefined}
                                fieldname='userID'
                                formname='Container'
                                disabled={false}
                                placeholder={utils.getLabelByID('')}
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            
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
                                      selected={_.get(_.get(this.state, 'Container.documentList', []).filter(item =>
                                          item.key == _.get(this.state, 'Container.documentType', '')
                                      ), `[${0}].label`, undefined)}
                                      placeholder={utils.getLabelByID('Document')}
                                      style={{}}
                                      state={this.state}
                                      typeName="documentList"
                                      dataSource={_.get(this.state, 'Container', {})}
                                      actionHandler={this.generalHandler}
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
                                <Input
                                  divStyle={{ padding: '0px', top: '10px',
                                  position: 'absolute' }}
                                  errorIconStyle={{
                                    display:'none'
                                  }}
                                  status={(this.state.errors && this.state.errors.documentNo) ? "ERROR" : undefined}
                                  fieldname='documentNo'
                                  formname='Container'
                                  disabled={false}
                                  placeholder={utils.getLabelByID('')}
                                  state={this.state}
                                  actionHandler={this.generalHandler}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </div>  
                        <div className="row">
                          <div className="col-md-6">
                            
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Consent Provided To")}</label>
                                <div className="col-md-8">
                                  <Combobox
                                      status={(this.state.errors && this.state.errors.consentProvidedTo) ? "ERROR" : undefined}
                                      fieldname='consentProvidedTo'
                                      formname='Container'
                                      allowValue={false}
                                      selected={_.get(_.get(this.state, 'typeData.orgList', []).filter(item =>
                                          item.value == _.get(this.state, 'Container.consentProvidedTo', '')
                                      ), `[${0}].label`, undefined)}
                                      placeholder={utils.getLabelByID('Consent Provided To')}
                                      style={{}}
                                      state={this.state}
                                      typeName="orgList"
                                      dataSource={_.get(this.state, 'typeData', {})}
                                      actionHandler={this.generalHandler}
                                      className="form-control"
                                    />
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

          <Portlet title={utils.getLabelByID("Consents Status List")} isPermissioned={true}
                   actions={this.state.actions}>
            {!this.state.isGridLoading ? 
              <Table fontclass=""
                gridColumns={utils.getGridColumnByName("ConsentStatusList")}
                gridData={this.state.revisionsList}
            //   totalRecords={this.state.pageData.totalRecords}
                searchCallBack={this.searchCallBack}
                pageSize={10}
                pagination={false} pageChanged={this.pageChanged}
                export={false}
                search={true}
              // activePage={this.state.currentPageNo}
              />
              :
              <div className="loader">{utils.getLabelByID("Loading")}</div>
            }
            
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
    orgTypes: _.get(state.app, 'typeData.data.ORG_TYPES', undefined),
    documentList : _.get(state.app, 'documentTypeList', undefined),
    consentType: _.get(state.app, 'typeData.data.CONSENT_TYPES', []),
    orgList : _.get(state.app, "entityList.data.typeData.entityNames", []),
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Consents History List";
export default connect(mapStateToProps, mapDispatchToProps)(List);