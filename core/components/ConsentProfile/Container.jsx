/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import Form from './Form.jsx';
import * as gen from './../../../core/common/generalActionHandler';
import * as toaster from '../../common/toaster.js';

import cloneDeep from 'lodash/cloneDeep';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

const initialState = {
  Container: {},
  List: [],
  typeData: undefined,
  groupList: [],
  columnList: [],
  resultSet: [],
  isEdit: false,
  isLoading: true,
  isCustom: true,
  loadedOnce: false,
  gridLoading: true,
  getEndpointListView: [],
  profileIdEditable: false,
  text: "Please wait while your request is being processed."
};

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onConsentModeChange = this.onConsentModeChange.bind(this);
    this.onProofRequirementChange = this.onProofRequirementChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = cloneDeep(initialState);
    this.generalHandler = gen.generalHandler.bind(this)
  }

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }


  componentDidMount() {
    this.setState({
      isLoading:true})
    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
      "currentPageNo": 1,
      "pageSize": 1
    }));
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES'])); // Org types (entities)
    this.props.actions.generalProcess(constants.getDocumentTypeList);
    if (this.props.id !== "NEW") {
      this.setState({
        isLoading:true,
        profileIdEditable: true
      });
      this.props.actions.generalAsyncProcess(constants.getConsentProfileByKey, {
        "body": {
          "profileID": this.props.id //"5bf9c9df4cb0c690e4461b89"
        }
      }).then(res=>{
        console.log("id = ", this.props.id)
        console.log("ConsentProfile By Key RES", res);
        if(res.result.key){
          this.setState({
            isLoading:false,
            gridLoading: false,
            Container:{
              consentProfileId: res.result.policyID,
              description: res.result.description,
              documentType: res.result.documentType,        
              consentMode: res.result.consentType,
              isSupportExpiry: res.result.supportsExpiry, 
              isDynamicExpiry: res.result.dynamicExpiry,
              expiryDuration: res.result.expiryDuration,
              proofRequirement: res.result.proofRequirement,
              isOriginalRequired: res.result.originalsRequired
            },
            List : res.result.consentProvidedBy.map(item=>{
                return {
                  ...item,
                  "actions": [
                    {label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION"},
                    {label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION"},
                    {"label": "edit", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION"},
                    {"label": "delete", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION"}
                  ]
                }
            })
          })
        }
        else{
          this.setState({
            isLoading:false
          })
          alert("ConsentProfile Not Found");
        }
      });
    }
    this.setState({
      loadedOnce: false,
      gridLoading: false
    })
  }

  componentWillMount() {
    this.props.actions.updateStore({
      Container: {}
    });
    $(".chb").change(function () {
      $(".chb").prop('checked', false);
      $(this).prop('checked', true);
    });
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.typeData && nextProps.orgTypes && nextProps.entityNames && nextProps.documentList) {
      let entityMap = {}
      console.log("next props ------------ ", nextProps);
      console.log("entity names --------------- ", nextProps.entityNames);
      nextProps.entityNames.forEach((elem) => {
        let elemEnt = _.get(entityMap, elem.orgType, []);

        elemEnt.push({
          "label": elem.value,
          "value": elem.value
        })
        _.set(entityMap, elem.orgType, elemEnt);
      })
      let documentList = []
//      console.log("jkjaklsdjklajslkdj ");
      nextProps.documentList.forEach((elem) => {
        let parsedData = JSON.parse(elem.tranxData);  
        console.log("parsing---------",parsedData);
         let elemEnt = _.get(documentList, parsedData.key, {});

         elemEnt = {
          "label": `${parsedData.name} - ${parsedData.key}`,
          "value": parsedData.key
        }
        documentList.push(elemEnt);
      })

      console.log("documentList--------------------",documentList);

      this.setState({
        orgTypes: nextProps.orgTypes,
        entityMap: entityMap,
        typeData: nextProps.typeData,
        documentList:documentList,
//        Container: nextProps.Container,
        isLoading: false
      });
    }
    // if (nextProps.Container) {
    //   this.setState({
        
    //   });
    // }
  }

  onInputChange = (e) => {
    let value;
    console.log(e.target.id);
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let Container = _.cloneDeep(this.state.Container);
    if (e.target.id == 'group') {
      let values = $('#group').val();
      _.set(Container, e.target.id, values)
    } else {
      _.set(Container, e.target.id, value)
    }
    // this.state.networkConfig[e.target.name] = e.target.name;
    console.log('sdasdasdasdasd -----', JSON.stringify(Container))
    this.setState({
      Container: Container
    })
  }

  onConsentModeChange = (e) => {
    console.log("in consent mode");
    let Container = _.cloneDeep(this.state.Container);
    let value;
      if('consentMode' in Container){
        if(Container.consentMode === 'BOTH'){
          if(e.target.value === 'GLOBAL'){
            value = 'TRANSACTIONAL';
          }
          else{
            value = 'GLOBAL';
          }
        }
        else
        if(Container.consentMode === e.target.value){
          value = '';
        }
        else
        if(Container.consentMode === '')
        {
          value = e.target.value;
        }
        else{
          value = 'BOTH';
        }
      }
      else{
        value = e.target.value;
      }
    _.set(Container, e.target.id, value)
    console.log(JSON.stringify(Container))
    this.setState({
      Container: Container
    })
  }

  onProofRequirementChange = (e) => {
    console.log("proofRequirement");
    let Container = _.cloneDeep(this.state.Container);
    let value;
      if('proofRequirement' in Container){
        if(Container.proofRequirement === 'BOTH'){
          if(e.target.value === 'DATA'){
            value = 'DOCUMENT';
          }
          else{
            value = 'DATA';
          }
        }
        else
        if(Container.proofRequirement === e.target.value){
          value = '';
        }
        else
        if(Container.proofRequirement === '')
        {
          value = e.target.value;
        }
        else{
          value = 'BOTH';
        }
      }
      else{
        value = e.target.value;
      }
    _.set(Container, e.target.id, value)
    console.log(JSON.stringify(Container))
    this.setState({
      Container: Container
    })
  }

  submit = (e) => {
    
    this.setState({isLoading:true});
    let errors = {}
    let Container = _.cloneDeep(this.state.Container);
    console.log("Container ------------------ ",Container);
    console.log("testing print ------------", _.get(Container, 'consentProfileId', undefined));
    if(!('isSupportExpiry' in Container) || Container.isSupportExpiry === false){
        Container.isSupportExpiry = false
    }
    else{
      Container.isSupportExpiry = true
    
    }
    if(!('isOriginalRequired' in Container) || Container.isOriginalRequired === false){
      Container.isOriginalRequired = false
    }
    else{
      Container.isOriginalRequired = true
    }
    if(!('isDynamicExpiry' in Container) || Container.isDynamicExpiry === false){
      Container.isDynamicExpiry = false
    }
    else{
      Container.isDynamicExpiry = true
    }
    if(!('isActive' in Container) || Container.isActive === false){
      Container.isActive = false
    }
    else{
      Container.isActive = true
    }
    

    console.log("submit",Container);
    console.log(Container.consentProfileId);
    console.log(Container.description);
    console.log(Container.documentType);
    console.log(Container.consentMode);
    console.log(Container.expiryDuration);
    console.log(Container.proofRequirement);

    if (!Container.consentProfileId) {
      _.set(errors, 'consentProfileId', 'Field is required')
    }
    if (!Container.description) {
      _.set(errors, 'description', 'Field is required')
    }
    console.log(Container.expiryDuration);
    console.log(isNaN(Container.expiryDuration));
    console.log(Container.expiryDuration);
    console.log(parseInt(Container.expiryDuration) > -1);
    if (!Container.expiryDuration || (parseInt(Container.expiryDuration) < 1  )) {
        if(parseInt(Container.expiryDuration) !== -1)
          _.set(errors, 'expiryDuration', 'Invalid or Empty')
        
    }
    
    if(Container.documentType){
      console.log("if condition hit Document list----------------", this.state.documentList);
      console.log("output of document -----------",_.find(this.state.documentList, {'value': Container.documentType}));
      let _out = _.find(this.state.documentList, {'value': Container.documentType});
      if(!_out){
        _.set(errors, 'documentType', 'Invalid Selection')
      }
    }else{
      _.set(errors, 'documentType', 'Document Selection Required')
    }
    
    console.log("errors------------",errors);

    if((!('consentMode' in Container) || Container.consentMode === '') ||
      (!('proofRequirement' in Container) || Container.proofRequirement === '')){
        alert("All fields are required"); 
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
          errors,
          isLoading:false
      })
      return
    }
    let body = {
      "body":{
        "policyID": Container.consentProfileId,
        "description": Container.description,
        "documentType": Container.documentType,        
        "consentType": Container.consentMode,
        "supportsExpiry": Container.isSupportExpiry, 
        "dynamicExpiry": Container.isDynamicExpiry,
        "expiryDuration": parseInt(Container.expiryDuration),
        "proofRequirement": Container.proofRequirement,
        "originalsRequired": Container.isOriginalRequired,
        "isActive" : Container.isActive,
        "consentProvidedBy": this.state.List
      }
    }
    console.log("body = ",body);
    let url;
    if(this.props.id !== "NEW"){
      url=constants.updateConsentPolicy;
    }
    else{
      url=constants.addConsentPolicy
    }

      this.props.actions.generalAsyncProcess(url, body).then(res=>{
        if(res.messageStatus=="OK"){
            this.setState({
              isLoading: false
            });
            toaster.showToast("Successfully Updated!", "SUCCESS");
            this.props.history.push("/ConsentProfileList")
        }
      }).catch(err=>{
        this.setState({
          isLoading: false
        });
        toaster.showToast("Error Occured While Adding", "Error");
        alert("Something happened. Please try again.");
        return false;
      });
  }


  add = (e) => {

    let isRevokable = $("#isRevokable").is(":checked") || false;
    let orgCode = document.getElementById('orgCode') == null ? "" : document.getElementById('orgCode').value;
    let orgType = document.getElementById('orgType') == null ? "" : document.getElementById('orgType').value;


    if (
      _.isEmpty(orgCode) ||
      _.isEmpty(orgType)
    ) {
      alert("All fields are required");
      return false;
    }

    let tupple = {
      orgCode,
      orgType,
      isRevokable,
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
        obj.orgCode == refObj.orgCode &&
        obj.orgType == refObj.orgType
      ) {
        return true;
      }
    }

    return false;
  }

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('input:checkbox').prop('checked', false);
    $('#form').find('textarea').val('');
  }


  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    else{
    return (<Form flag={this.state.update} ActionHandlers={this.ActionHandlers} addPeer={this.add}
                  typeData={this.state.typeData} isOwner={true} onInputChange={this.onInputChange}
                  onConsentModeChange={this.onConsentModeChange}
                  onProofRequirementChange = {this.onProofRequirementChange}
                  onSubmit={this.submit} testQuery={this.test}
                  generalHandler = {this.generalHandler}
                  state={this.state}/>)
    }

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
        console.log(this.state.List, 'sdasdsad asd asd asdas')
        if (index > -1) {
          let b = this.state.List[index];
          console.log("edit hit = ", b);
          $("#isRevokable").prop('checked', _.get(b, 'isRevokable', false));
          document.getElementById('orgCode').value = _.get(b, 'orgCode', '');
          document.getElementById('orgType').value = _.get(b, 'orgType', '');

          let tempState = this.state.List;
          tempState.splice(index, 1);
          let Container = _.cloneDeep(this.state.Container);
          Container.orgType = _.get(b, 'orgType', '')
          Container.orgCode = _.get(b, 'orgCode', '')
          this.setState({List: tempState, Container});
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


Container.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    Container: _.get(state.app, 'documentContainer.data', []),
    typeData: _.get(state.app, 'typeData.data', []),
    entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
    orgTypes: _.get(state.app, 'typeData.data.ORG_TYPES', []),
    id: ownProps.params.id,
    documentList : _.get(state.app, 'documentTypeList', [])
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

Container.displayName = "Consent Profile";
export default connect(mapStateToProps, mapDispatchToProps)(Container);

