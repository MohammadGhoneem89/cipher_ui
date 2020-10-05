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
import * as toaster from '../../common/toaster.js';

import * as gen from './../../../core/common/generalActionHandler';

import * as constants from '../../constants/Communication.js';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined,
      listData: [],
      pageData: {},
      Container: {},
      isLoading: true,
      statusList : [],
      orgList : undefined,
      isGridLoading : false,
      intervalID : undefined
    }
    this.pageChanged = this.pageChanged.bind(this);
    this.generalHandler = gen.generalHandler.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    console.log("consentStatusNew nextprops -----------", nextProps);

    if (nextProps.orgTypes && nextProps.documentList && nextProps.consentType && nextProps.actionType && nextProps.orgList) {
      
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
      typeData.actionType = nextProps.actionType
      
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
    
    
    // if (nextProps.documentList) {
    //   console.log("testing print");
    //   this.setState({
    //     Container:{
    //       ...,
    //     }
    //   })
    // }
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
    console.log("ConsentStatus Unmounting")
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
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES', 'CONSENT_TYPES', 'ACTION_TYPES'])); // Org types (entities)
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

  setIntervalForStatus = () => {
    const intervalID = setInterval(() => {
      let statusListClone = _.cloneDeep(this.state.statusList)
      console.log("Interval Clone List ========>>> ", statusListClone);
      let statusList;
      statusList = statusListClone ? statusListClone.map(item => {

        //    if(item.consentDetails.conset)
        //   console.log("testing time==============", moment(item[1].consentProvidedTo[0].consentTillDate).format("DD/MM/YYYY"));
            console.log("item==========", item);
    //        console.log("utc date status=======",moment(item..consentDate).format("MM/DD/YYYY"));
            let cur_date = moment().format("MM/DD/YYYY HH:mm:ss");
            let grant_date = moment.unix(item.consentTillDate).format("MM/DD/YYYY HH:mm:ss");
            console.log("cur_date=====", cur_date);
            console.log("grant_date=====", grant_date);
            let days = moment(grant_date).diff(moment(cur_date), "days");
            let hours = moment(grant_date).diff(moment(cur_date), "hours");
            let secs = moment(grant_date).diff(moment(cur_date), "seconds");


            console.log("days =======", days);
            console.log("hours =======", hours);
            console.log("seconds =======", secs);
            let mins;
            let valid;
            if(item.status === "GRANT")
            {
              if(secs <= 0){
                valid = "Expired"
              }
              else{
                if(hours <= 0){
                  if(secs <= 60 ){
                    valid = secs + " secs"
                  }else{
                    mins = moment(grant_date).diff(moment(cur_date), "minutes");
                    valid = hours +  ' hrs ' + (mins - (hours * 60)) + " mins"
                    console.log("minutes ==== ", mins);
                    console.log("valid ==== ", valid);
                  }
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
            // console.log(item.consentDetails.toOrgCode)
            // let _imgURL = _.find(this.state.orgList, {"value" : item.consentDetails.toOrgCode})
            //   console.log("testing imgeURL FETCH =============>>>> ",_imgURL);
            item.validity = valid;
            return item;

          }) : [];

          this.setState({
            statusList,
            isGridLoading: false
          })
      
    }, 1000);

    this.setState({intervalID});

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
   // e.preventDefaults();
    let errors = {}
    let userID = _.get(this.state.Container, 'userID', undefined)
    let consentType = _.get(this.state.Container, 'consentType', undefined)
    let documentType = _.get(this.state.Container, 'documentType', undefined)
    let consentProvidedBy = _.get(this.state.Container, 'consentProvidedBy', undefined)
    let consentProvidedTo = _.get(this.state.Container, 'consentProvidedTo', undefined)
    let actionType = _.get(this.state.Container, 'actionType', undefined)


    if(!userID){
      _.set(errors, 'userID', 'Field Required')
    }
    let documentNo
    
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

    if(actionType){
      console.log("if condition hit Document list----------------", this.state.typeData.actionType);
      console.log("output of actionType -----------",_.find(this.state.typeData.actionType, {'label': actionType}));
      let _out = _.find(this.state.typeData.actionType, {'label': actionType});
      if(!_out){
        _.set(errors, 'actionType', 'Invalid Selection')
      }
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

    if (Object.keys(errors).length > 0) {
      this.setState({
          errors,
          isLoading:false
      })
      return
    }
    this.setState({
      errors: {},
      isGridLoading :true,      
    })
    clearInterval(this.state.intervalID);


      console.log("form submit -------------", this.state);
      let request;
      if(consentType === "TRANSACTIONAL"){
        request = {
          "body":{
            "unifiedID": userID,
            "documentType": documentType,
            "consentType": consentType,
            "documentNo": documentNo
          }
        }
      }
      else{
        request = {
          "body":{
            "unifiedID": userID,
            "documentType": documentType,
            "consentType": consentType
          }
        }
      }
        

      console.log("Request === ", request);
      this.props.actions.generalAsyncProcess(constants.getConsentStatus, request)
                .then(res => {
                  console.log("Response ================ ", res);
                  if(res.errorCode !== 200){
                    this.setState({
                      statusList: [],
                      isGridLoading: false
                    })
                    toaster.showToast("Unable To Find Document", "Error");
                    return;
                  }
                  let statusList = [];
                  if(res.result){

                    let consentProvidedBy = _.get(this.state.Container, 'consentProvidedBy', '')
                    let consentProvidedTo = _.get(this.state.Container, 'consentProvidedTo', )
                    let actionType = _.get(this.state.Container, 'actionType', )
                    let filterStatusList = []
                    filterStatusList = res.result.filter((elem) => {
              //      filterStatusList = data.filter((elem) => {
                      let cond1 = false;
                      let cond2 = false;
                      let cond3 = false;
                      
                      if(consentProvidedBy){
                        if(elem.consentDetails.consentCollectedBy === consentProvidedBy)
                          cond1 = true;
                      }
                      else{
                        cond1 = true;
                      }
                      if(consentProvidedTo){
                        if(elem.consentDetails.toOrgCode === consentProvidedTo)
                          cond2 = true;
                      }
                      else{
                        cond2 = true;
                      }
                      if(actionType){
                        if(elem.consentDetails.statusOfConsent === actionType)
                          cond3 = true;
                      }
                      else{
                        cond3 = true;
                      }
                      if(cond1 && cond2 && cond3)
                        return true
                      return false;
                    })
                    console.log("filterStatusList===========", filterStatusList);


                    statusList = filterStatusList.map(item => {

                  //    if(item.consentDetails.conset)
                  //   console.log("testing time==============", moment(item[1].consentProvidedTo[0].consentTillDate).format("DD/MM/YYYY"));
                      console.log("item==========", item);
                      console.log("utc date status=======",moment(item.consentDetails.consentDate).format("MM/DD/YYYY"));
                      let cur_date = moment().format("MM/DD/YYYY HH:mm:ss");
                      let grant_date = moment.unix(item.consentDetails.consentTillDate).format("MM/DD/YYYY HH:mm:ss");
                      console.log("cur_date=====", cur_date);
                      console.log("grant_date=====", grant_date);
                      let days = moment(grant_date).diff(moment(cur_date), "days");
                      let hours = moment(grant_date).diff(moment(cur_date), "hours");
                      let secs = moment(grant_date).diff(moment(cur_date));


                      console.log("days =======", days);
                      console.log("hours =======", hours);
                      let mins;
                      let valid;
                      if(item.consentDetails.statusOfConsent === "GRANT")
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
                      console.log(item.consentDetails.toOrgCode)
                      let _imgURL = _.find(this.state.orgList, {"value" : item.consentDetails.toOrgCode})
                        console.log("testing imgeURL FETCH =============>>>> ",_imgURL);
                      let obj = {
                        "key": item.key,
                        "timestamp": moment.unix(item.consentDetails.consentDate).format("MM/DD/YYYY HH:mm:ss"),
                        "status": item.consentDetails.statusOfConsent,
                        "documentType": item.documentType,
                        "documentNo": item.consentDetails.relatedDocumentNo,
                        "consentType": item.consentDetails.consentType,
                        "consentTillDate": item.consentDetails.consentTillDate,
                        "validity": valid,
                        "providedTo": { imageURL: _imgURL ? _imgURL.img : '', name: item.consentDetails.toOrgCode}
                      }
                      return obj;

                    })
                    if(statusList.length > 0)
                      this.setIntervalForStatus();
                    this.setState({
                      statusList,
                      isGridLoading: false
                    })
                  }
                })
                .catch(err=> {
                  this.setState({
                    statusList : [],
                    isGridLoading: false
                  })
                  toaster.showToast(err, "Error");
                })

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
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Action")}</label>
                                <div className="col-md-8">
                                  <Combobox
                                    status={(this.state.errors && this.state.errors.actionType) ? "ERROR" : undefined}
                                    fieldname='actionType'
                                    formname='Container'
                                    allowValue={false}
                                    selected={_.get(_.get(this.state, 'typeData.actionType', []).filter(item =>
                                        item.value == _.get(this.state, 'Container.actionType', '')
                                    ), `[${0}].label`, undefined)}
                                    placeholder={utils.getLabelByID('Action Type')}
                                    style={{}}
                                    state={this.state}
                                    typeName="actionType"
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
                            <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Consent Provided By")}</label>
                                <div className="col-md-8">
                                  <Combobox
                                      status={(this.state.errors && this.state.errors.consentProvidedBy) ? "ERROR" : undefined}
                                      fieldname='consentProvidedBy'
                                      formname='Container'
                                      allowValue={false}
                                      selected={_.get(_.get(this.state, 'typeData.orgList', []).filter(item =>
                                          item.value == _.get(this.state, 'Container.consentProvidedBy', '')
                                      ), `[${0}].label`, undefined)}
                                      placeholder={utils.getLabelByID('Consent Provided By')}
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
              gridData={this.state.statusList}
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
    actionType: _.get(state.app, 'typeData.data.ACTION_TYPES', []),
    orgList : _.get(state.app, "entityList.data.typeData.entityNames", [])
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Consents Status List";
export default connect(mapStateToProps, mapDispatchToProps)(List);