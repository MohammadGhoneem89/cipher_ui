/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import APIDefScreenForm from './APIDefScreenForm.jsx';

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isDirty from 'deep-diff';

const initialState = {
  APIDefinitionAddUpdate: {
    "useCase": "",
    "route": "",
    "estimatedRtt": 10000,
    "isBilled": false,
    "billingDate": (new Date().getTime()),
    "documentPath": "",
    "isActive": false,
    "isBlockchainProcess": false,
    "isBlockchain": false,
    "isRelay": false,
    "isSimulated": false,
    "isRouteOveride": false,
    "isCached":false,
    "fieldName": "",
    "isCustomMapping": false,
    "MappingfunctionName": "",
    "CustomMappingFile": "",
    "isAsync": false,
    "communicationMode": "QUEUE",
    "requestServiceQueue": "",
    "responseQueue": "",
    "ServiceURL": "",
    "ServiceHeader": "",
    "rules": [],
    "description": "",
    "authorization": "",
    "simulatorResponse": "",
    "ResponseMapping": "",
    "RequestMapping": "",
    "isHMAC": false,
    "isValBypass": false,
    "isResValBypass": false,
    "isResponseMapDisable": false,
    isBlockchainGet: false,
    isOffchainGet: false,
    responseParameters: [],
    requestParameters: [],
    RelayNet: "",
    RemoteAPI: ""
  },
  resultSet: [],
  columnList: [],
  RelayNetworks: [],
  BillingPolicy: [],
  selectedRuleList: [],
  MappingOrgFieldData: [],
  simucases: [],
  MappingConfigList: {},
  typeData: {},
  consortium: [],
  channel: [],
  maxVal: 1,
  selectedConsortium: undefined,
  selectedChannel: undefined,
  smartcontract: [],
  rules: [],
  // dropDownItems:[],
  isEdit: false,
  isLoading: true,
  isCustom: true,
  isStale: false,
  requestParams: [],
  responseParams: [],
  getEndpointListView: [],
  generateMappingFile: {},
  reportContainer: {},
  actionList: [],
  List: []
};

class APIDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addRowRule = this.addRowRule.bind(this);
    this.addPolicyRule = this.addPolicyRule.bind(this);
    this.onInputRuleEngine = this.onInputRuleEngine.bind(this);
    this.onInputChangeRequest = this.onInputChangeRequest.bind(this);
    this.navigateReq = this.navigateReq.bind(this);
    this.navigateRes = this.navigateRes.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.state = cloneDeep(initialState)
  }

  componentWillMount() {

  }

  navigateReq() {
    let data = cloneDeep(this.state.APIDefinitionAddUpdate);
    let RequestMapping = (data.RequestMapping === "" ? this.state.MappingConfigList.REQUEST[0].value : data.RequestMapping);
    let uri = ""
    this.state.MappingConfigList.REQUEST.forEach((elem) => {
      if (elem.value == RequestMapping) {
        uri = elem
      }
    })
    if (uri.label)
      browserHistory.push(`/editMapping/${uri.label}`)
  }

  navigateRes() {
    let data = cloneDeep(this.state.APIDefinitionAddUpdate);
    let ResponseMapping = (data.ResponseMapping === "" ? this.state.MappingConfigList.RESPONSE[0].value : data.ResponseMapping);
    let uri = ""
    this.state.MappingConfigList.RESPONSE.forEach((elem) => {
      if (elem.value == ResponseMapping) {
        uri = elem
      }
    })
    if (uri.label)
      browserHistory.push(`/editMapping/${uri.label}`)
  }

  addPolicyRule() {
    let from = document.getElementById('fromUnit') == null ? "" : document.getElementById('fromUnit').value;
    let to = document.getElementById('toUnit') == null ? "" : document.getElementById('toUnit').value;
    let billVal = document.getElementById('billVal') == null ? "" : document.getElementById('billVal').value;

    if (!billVal || !from || !to) {
      alert(`All fields is required!!`)
      return;
    }
    let tupple = {
      from, to, billVal,
      actions: [
        { label: "Delete Policy", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
      ]
    }
    let list = this.state.BillingPolicy;
    list.push(tupple);
    this.setState({ BillingPolicy: list });
    document.getElementById('fromUnit').value = '';
    document.getElementById('toUnit').value = '';
    document.getElementById('billVal').value = '';
    this.state.BillingPolicy.forEach((elem) => {
      if (elem.to > this.state.maxVal) {
        this.setState({
          maxVal: parseInt(elem.to) + 1
        });
      }
    })
  }

  addRowRule() {
    let BlockRuleName = document.getElementById('BlockRuleName') == null ? "" : document.getElementById('BlockRuleName').value;
    let channel = document.getElementById('channel') == null ? "" : document.getElementById('channel').value;
    let consortium = document.getElementById('consortium') == null ? "" : document.getElementById('consortium').value;
    let smartcontractid = document.getElementById('smartcontract') == null ? "" : document.getElementById('smartcontract').value;
    let smartcontract = $("#smartcontract").find("option[value='" + $("#smartcontract").val() + "']").text();
    let smartcontractFunc = document.getElementById('smartcontractFunc') == null ? "" : document.getElementById('smartcontractFunc').value;
    let type = document.getElementById('type') == null ? "" : document.getElementById('type').value;
    let channelText = $("#channel option:selected").text();
    let consortiumText = $("#consortium option:selected").text();

    let dispText = [];
    let ruleList = [];
    if (smartcontractFunc.trim() == '') {
      alert(`Smart Contract Function is required!!`)
      return;
    }
    if (BlockRuleName.trim() == '') {
      alert(`RuleName is required!!`)
      return;
    }

    if (channel.trim() == '') {
      alert(`channel is required!!`)
      return;
    }

    if (smartcontract.trim() == '') {
      alert(`smartcontract is required!!`)
      return;
    }
    let isError = false;
    if (this.state.MappingOrgFieldData.length > 0) {
      this.state.MappingOrgFieldData.forEach((element, index) => {
        let field = document.getElementById(`fieldName-${index}`) == null ? "" : document.getElementById(`fieldName-${index}`).value
        let value = document.getElementById(`fieldValue-${index}`) == null ? "" : document.getElementById(`fieldValue-${index}`).value

        if (field.trim() == '' || value == '') {
          isError = true;
          alert(`${field} value is required!!`)
          return;
        }
        let tupple = {
          'field': field,
          'value': value
        }
        ruleList.push(tupple);
        dispText.push(`${field}==${value}`);
      });
    } else {
      dispText.push(`*==*`);
    }
    let data = {
      BlockRuleName,
      channel,
      consortium,
      smartcontract,
      smartcontractid,
      ruleList,
      channelText,
      consortiumText,
      smartcontractFunc,
      type,
      displayText: dispText.join(" && "),
      actions: [
        { label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION" },
        { label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION" },
        { label: "Modify", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Remove", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
      ]
    }
    if (isError === false) {
      if (this.containsObject(data, this.state.rules) === false) {
        this.state.MappingOrgFieldData.forEach((element, index) => {
          element.value = "";
        });
        let rules = _.cloneDeep(this.state.rules);
        $(`#BlockRuleName`).val('');
        $(`#smartcontractFunc`).val('');

        $(`[id^=fieldValue-]`).val('');
        rules.push(data);
        this.setState({ rules: rules });
      } else {
        alert(`rule name or rule already exists, please update existing rule!!`);
      }
    }
  }

  onDateChange = (value) => {
    //alert(value)
    this.state.APIDefinitionAddUpdate.billingDate = value;
  }
  onInputRuleEngine = (e) => {
    //  BlockRuleName consortiumName channelName smartcontract
    //getConsortiumTypeList
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let pLoad = {};

    if (e.target.name == 'channel') {
      pLoad.selectedConsortium = this.state.selectedConsortium;
      pLoad.channelID = value
      this.setState({
        selectedChannel: value
      })
    }

    if (e.target.name == 'consortium') {
      pLoad.selectedConsortium = value
      this.setState({
        selectedConsortium: value
      })
    }

    if (e.target.name == 'smartcontract') {
      this.setState({
        selectedSmartcontract: value
      })
    }
    if (e.target.name == 'smartcontract' || e.target.name == 'consortium' || e.target.name == 'channel') {
      this.props.actions.generalProcess(constants.getConsortiumTypeList, pLoad);
    }
    //general
    let ruleList = [];
    let dispText = [];
    this.state.MappingOrgFieldData.forEach((element, index) => {
      let value = document.getElementById(`fieldValue-${index}`) == null ? "" : document.getElementById(`fieldValue-${index}`).value
      element.value = value;
    });

    this.setState({
      MappingOrgFieldData: this.state.MappingOrgFieldData
    })


  }

  containsObject(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.displayText == refObj.displayText ||
        obj.BlockRuleName == refObj.BlockRuleName
      ) {
        return true;
      }
    }
    return false;
  }
  containsObjectADHOC(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.fieldName == refObj.fieldName
      ) {
        return true;
      }
    }
    return false;
  }
  addvalue = (e) => {
    let label = document.getElementById('label') == null ? "" : document.getElementById('label').value;
    let action = document.getElementById('action') == null ? "" : document.getElementById('action').value;

    if (label.trim() == '' || action.trim() == '') {
      alert(`All values are is required!!`)
      return;
    }
    let rules = this.state.actionList;

    let data = {
      label,
      URI: action,
      actions: [
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
      ]
    }

    $(`#label`).val('');
    $(`#action`).val('');

    rules.push(data);
    this.setState({ actionList: rules });


  }
  test = (e) => {

    let queryStrCnt = document.getElementById('queryStrCnt') == null ? "" : document.getElementById('queryStrCnt').value;
    let queryStr = document.getElementById('queryStr') == null ? "" : document.getElementById('queryStr').value;

    let sc = {}
    this.state.List.forEach((elem) => {
      _.set(sc, elem.fieldName, undefined);
    })

    this.props.actions.generalProcess(constants.testPagination, {
      "actionType": "triggerLocal",
      "searchCriteria": sc,
      "filters": [],
      "actionList": this.state.actionList,
      "connectionString": this.state.APIDefinitionAddUpdate.connectionStringRep,
      "queryStrCnt": this.state.APIDefinitionAddUpdate.queryStrCnt,
      "queryStr": this.state.APIDefinitionAddUpdate.queryStr,
      "page": {
        "currentPageNo": 1,
        "pageSize": 10
      }
    });
  }
  addRow() {
    let SimulatorRequest = document.getElementById('SimulatorRequest') == null ? "" : document.getElementById('SimulatorRequest').value;
    let SimulatorResponse = document.getElementById('SimulatorResponse') == null ? "" : document.getElementById('SimulatorResponse').value;
    let SimuValue = document.getElementById('SimuValue') == null ? "" : document.getElementById('SimuValue').value;
    let SimuField = document.getElementById('SimuField') == null ? "" : document.getElementById('SimuField').value;
    let RuleName = document.getElementById('RuleName') == null ? "" : document.getElementById('RuleName').value;
    let data = this.state.simucases;
    let newtupple = {
      SimulatorRequest: SimulatorRequest,
      SimulatorResponse: SimulatorResponse,
      SimuValue: SimuValue,
      SimuField: SimuField,
      RuleName: RuleName,
      actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, {
        label: "Edit",
        iconName: "fa fa-edit",
        actionType: "COMPONENT_FUNCTION"
      }],
    }

    if (SimulatorResponse.trim() == "") {
      alert("Simulator Response should be defined!")
      return false;
    }
    if (SimuValue.trim() == "") {
      alert("Simu Value should be defined!")
      return false;
    }
    if (SimuField.trim() == "") {
      alert("Simu Field should be defined!")
      return false;
    }

    try {
      let json = JSON.parse(SimulatorResponse.trim())
    } catch (ex) {
      alert("Simulator Response must be a Parsable JSON format!");
      return false;
    }

    try {
      let jsonReq = JSON.parse(SimulatorRequest.trim())
    } catch (ex) {
      alert("Simulator Request must be a Parsable JSON format!");
      return false;
    }


    this.clearFields();
    data.push(newtupple);
    this.setState({ simucases: data });
  }

  getRequestResponseMapping = (val, type, MappingConfigList) => {

    MappingConfigList = MappingConfigList || this.state.MappingConfigList;
    let let1 = find(get(MappingConfigList, type, []), { value: val });
    let1 = let1 || {};
    this.props.actions.generalProcess(constants.getMappingConfigByID, { mappingName: let1.label });
  };

  componentDidMount() {
    this.props.actions.updateStore({ triggerLocal: {} });
    this.props.actions.generalProcess(constants.getConsortiumTypeList);
    this.props.actions.generalProcess(constants.getMappingList);
    // this.props.actions.generalProcess(constants.getAdaptorsList);
    this.props.actions.generalProcess(constants.getEndpointListView);
    this.props.actions.generalProcess(constants.getRelayNetworkConfigListTd);


    this.props.actions.generalProcess(constants.getAvailableObjectsList, {
      database: this.state.databaseType || 'mongo',
      adaptor: this.state.adaptor || 'adaptor1'
    });

    this.props.actions.generalProcess(constants.getDBFields, {
      database: this.state.databaseType || 'postgres',
      adaptor: this.state.adaptor || 'adaptor4',
      object: this.state.availableObjects || '',
      objectType: this.state.objectType || '',
    });

  
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['currency', 'cycle', 'request_operator', 'database_available_objects', 'database_object_types', 'database_adaptors', 'database_types', 'API_Authtypes', 'API_ComMode', 'ORG_TYPES', 'bchain_rule_Type', 'USE_CASE', 'adhoc_datatype']));
    if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE") {
      let req = {
        useCase: this.props.useCase,
        route: this.props.route
      }

      this.setState({ isEdit: true, isStale: false }, () => {
        this.props.actions.generalProcess(constants.getAPIDefinitionID, req);
      })
    }
  }

  clearFieldsBCR() {
    $('#blockchainRoutingDefination').find('input:text ').is('[disabled!=disabled]').val('');
    $('#blockchainRoutingDefination').find('textarea').val('');

  }

  clearFields() {
    $('#simuDefination').find('input:text').val('');
    $('#simuDefination').find('textarea').val('');

  }

  add = (e) => {

    let fieldName = document.getElementById('fieldName') == null ? "" : document.getElementById('fieldName').value;
    let dataType = document.getElementById('dataType') == null ? "" : document.getElementById('dataType').value;
    let testVal = document.getElementById('testVal') == null ? "" : document.getElementById('testVal').value;

    if (
      _.isEmpty(fieldName) ||
      _.isEmpty(dataType)
    ) {
      alert("All fields are required");
      return false;
    }

    let tupple = {
      fieldName,
      dataType,
      testVal,
      // span,
      "actions": [
        { label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION" },
        { label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION" },
        { "label": "edit", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" },
        { "label": "delete", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    if (this.containsObjectADHOC(tupple, this.state.List) === false) {
      this.clearFieldsPeer()
      let List = _.cloneDeep(this.state.List);
      List.push(tupple)
      this.setState({ List: List })
    } else {
      alert("Code Already Exists!!")
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps.triggerLocal))
    if (!_.isEmpty(nextProps.triggerLocal)) {
      let columnList = [];
      let columnLen = {};

      nextProps.triggerLocal.data.searchResult.forEach((elem, index) => {
        let keys = Object.keys(elem)
        keys.forEach((key) => {
          console.log(key);
          let x = _.get(elem, key, '')

          if (index == 0) {
            columnList.push({ alias: key, key: key, type: "string" })
          }

          let y = _.get(columnLen, key, 0)
          if (y < String(x).length) {
            _.set(columnLen, key, String(x).length)
          }
        })
      });

      columnList.forEach((elem) => {
        let y = _.get(columnLen, elem.key, 0)
        if (y > 30) {
          elem.type = 'clpVal';
        }
      })
      columnList.forEach((elem) => {
        if (elem.key == 'actions')
          elem.type = 'action';
        if (elem.key == 'id')
          elem.type = 'hiddenID';
      })

      console.log(JSON.stringify(columnList))
      this.setState({
        resultSet: nextProps.triggerLocal.data.searchResult,
        columnList: columnList,
        gridLoading: false
      });
      return;
    }

    if (nextProps.parameters) {

      let params = this.state.parameters || {};

      this.setState({
        parameters: Object.assign(params, nextProps.parameters)
      })
    }
    let BillingPolicy = _.get(nextProps, 'APIDefinitionAddUpdate.data.BillingPolicy', []);

    if (nextProps.RelayNetworks) {
      // alert("nextProps.RelayNetworks")
      this.setState({
        RelayNetworks: nextProps.RelayNetworks
      })
    }

    if (nextProps.getEndpointListView.data) {
      this.setState({
        getEndpointListView: nextProps.getEndpointListView.data
      });
    }

    if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE" && this.props.useCase === get(nextProps, 'APIDefinitionAddUpdate.data.useCase') && this.props.route === get(nextProps, 'APIDefinitionAddUpdate.data.route')) {
      if (nextProps.APIDefinitionAddUpdate.data.simucases) {
        let simucases = nextProps.APIDefinitionAddUpdate.data.simucases;
        simucases.map(function (item) {
          item.actions = [
            { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
            { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
          ];
          return item;
        });
        BillingPolicy.forEach((elem) => {
          if (elem.to > this.state.maxVal) {
            this.setState({
              maxVal: parseInt(elem.to) + 1
            });
          }
        })
        this.setState({
          simucases: simucases,
          BillingPolicy: BillingPolicy
        });

      }
      // diff()
      // if (changes) {
      //   // do something with the changes.
      // }
      let isChanged = false;
      let changes = isDirty(this.props.APIDefinitionAddUpdate.data, nextProps.APIDefinitionAddUpdate.data)
      let changeLocal = this.state.APIDefinitionAddUpdate.route === "" ? true : false;
      if (this.props.APIDefinitionAddUpdate.data && changes) {
        isChanged = true
      }
      if (!this.props.APIDefinitionAddUpdate.data) {
        isChanged = true
      }
      if (changeLocal === true) {
        isChanged = true
      }

      if (isChanged) {
        if(document.getElementById('sampleArgs') && document.getElementById('sampleResponse') &&  document.getElementById('sampleEvents')){
          document.getElementById('sampleArgs').value=_.get(nextProps,'APIDefinitionAddUpdate.data.sampleArgs',"")
          document.getElementById('sampleResponse').value=_.get(nextProps,'APIDefinitionAddUpdate.data.sampleResponse',"")
          document.getElementById('sampleEvents').value=_.get(nextProps,'APIDefinitionAddUpdate.data.sampleEvents',"")
        }

        this.setState({
          APIDefinitionAddUpdate: cloneDeep(nextProps.APIDefinitionAddUpdate.data),
          rules: nextProps.APIDefinitionAddUpdate.data.rules || [],
          isStale: isChanged
        });
        this.setState({
          MappingOrgFieldData: []
        }, () => {
          let req = { _id: nextProps.APIDefinitionAddUpdate.data.RequestMapping }
          this.props.actions.generalProcess(constants.getMappingConfigOrgFieldData, req);
        });
      }
    } else {
      //  alert("not updating!!")
      if (isEmpty(this.state.APIDefinitionAddUpdate)) {
        this.setState({
          APIDefinitionAddUpdate: cloneDeep(initialState.APIDefinitionAddUpdate)
        });
      }
    }
    if (nextProps.MappingConfigData && nextProps.MappingConfigData.REQUEST && nextProps.MappingConfigData.RESPONSE) {
      this.setState({
        MappingConfigList: nextProps.MappingConfigData,
      });
      if (get(nextProps, 'APIDefinitionAddUpdate.data.RequestMapping', false) && !this.state.requestDone) {
        this.getRequestResponseMapping(nextProps.APIDefinitionAddUpdate.data.RequestMapping, 'REQUEST', nextProps.MappingConfigData);
        this.setState({
          requestDone: true
        })
      }
      if (get(nextProps, 'APIDefinitionAddUpdate.data.actionList', undefined)) {
        this.setState({
          actionList: nextProps.APIDefinitionAddUpdate.data.actionList
        })
      }
      if (get(nextProps, 'APIDefinitionAddUpdate.data.attributeList', undefined)) {
        this.setState({
          List: nextProps.APIDefinitionAddUpdate.data.attributeList
        })
      }
      if (get(nextProps, 'APIDefinitionAddUpdate.data.ResponseMapping', false) && !this.state.responseDone) {
        this.getRequestResponseMapping(nextProps.APIDefinitionAddUpdate.data.ResponseMapping, 'RESPONSE', nextProps.MappingConfigData);
        this.setState({
          responseDone: true
        })
      }
    }

    if (nextProps.ConsortiumTypeData.data && nextProps.ConsortiumTypeData.data.consortium) {
      this.setState({
        consortium: nextProps.ConsortiumTypeData.data.consortium,
        channel: nextProps.ConsortiumTypeData.data.channel,
        smartcontract: nextProps.ConsortiumTypeData.data.smartcontract
      });
    }
    if (nextProps.MappingOrgFieldData.data && nextProps.MappingOrgFieldData.data.OrgFieldData) {

      this.setState({
        MappingOrgFieldData: nextProps.MappingOrgFieldData.data.OrgFieldData
      });
    }
    if (nextProps.typeData.data && nextProps.typeData.data.API_Authtypes) {
      this.setState({
        typeData: nextProps.typeData.data,
        isLoading: false
      });
    }


    this.setState({
      getAdaptorsList: nextProps.getAdaptorsList,
      getDBFields: nextProps.getDBFields,
      getAvailableObjectsList: nextProps.getAvailableObjectsList
    });
    if (nextProps.generateMappingFile.data) {
      this.setState({
        generateMappingFile: nextProps.generateMappingFile.data
      })
    }

  }

  formSubmit(e, generate) {
    let data = cloneDeep(this.state.APIDefinitionAddUpdate);
    if (data.route.trim() == "") {
      alert("route must be defined");
      return false;
    }
    if (data.useCase.trim() == "") {
      alert("useCase must be defined");
      return false;
    }
    if (data.isRouteOveride === true) {
      if (data.fieldName.trim() == "") {
        alert("Overide field Name must be defined!");
        return false;
      }
    }
    if (data.isCustomMapping === false) {
      if (data.communicationMode === "REST" && (data.ServiceURL.trim() == "")) {
        alert("ServiceURL must be defined!");
        return false;
      }
      // if (data.communicationMode === "QUEUE" && (data.requestServiceQueue.trim() == "" || data.responseQueue.trim() == "")) {
      //   alert("Request and Response Queue must be defined!");
      //   return false;
      // }
    }
    if (data.isBlockchain === true && this.state.rules.length === 0) {
      alert("at least 1 blockchain routing rule must be defined must be defined!");
      return false;
    }

    if (data.isSimulated === true) {
      if (this.state.simucases.length == 0) {
        alert("Simulator Rules must be defined!");
        return false;
      }
    }
    let billingDate = $("#billingDate").find("input").val()
    if (data.isBilled === true) {
      if (billingDate == "") {
        alert("Billing Date must be defined!");
        return false;
      }
    }
    //alert(data.billingDate);

    let sampleArgs = document.getElementById('sampleArgs') == null ? "" : document.getElementById('sampleArgs').value;
    let sampleResponse = document.getElementById('sampleResponse') == null ? "" : document.getElementById('sampleResponse').value;
    let sampleEvents = document.getElementById('sampleEvents') == null ? "" : document.getElementById('sampleEvents').value;


    data.sampleArgs = sampleArgs
    data.sampleResponse = sampleResponse
    data.sampleEvents = sampleEvents

    data.adaptor = this.state.adaptor;
    data.database = this.state.databaseType;
    data.objectType = this.state.objectType;
    data.object = this.state.availableObjects;
    data.conditions = this.state.requestParams;
    data.fields = this.state.responseParams;
    if (!data.endpointName) {
      _.set(data, 'endpointName', undefined);
    }
    data.enablePaging = this.state.isEnablePagination;
    data.enableActions = this.state.isEnablComponentAction;
    data.rules = this.state.rules;
    data.RequestMapping = (data.RequestMapping === "" ? this.state.MappingConfigList.REQUEST[0].value : data.RequestMapping);
    data.ResponseMapping = (data.ResponseMapping === "" ? this.state.MappingConfigList.RESPONSE[0].value : data.ResponseMapping);
    data.simucases = this.state.simucases;
    data.CustomMappingFile = data.CustomMappingFile || this.state.generateMappingFile.path;
    data.MappingfunctionName = data.MappingfunctionName || this.state.generateMappingFile.functionName;
    data.BillingPolicy = this.state.BillingPolicy;


    data.attributeList = this.state.List
    data.actionList = this.state.actionList



    this.props.actions.generalProcess(constants.upsertAPIDefinition, data);
  }

  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.APIDefinitionAddUpdate[e.target.name] = value;
    this.setState({
      [e.target.name]: value
    });

    if (e.target.name === 'ResponseMapping') {
      this.getRequestResponseMapping(value, 'RESPONSE');
    }
    if (e.target.name === 'databaseType' || e.target.name === 'adaptor' || e.target.name === 'availableObjects' || e.target.name === 'objectType') {
      let param = {
        database: this.state.databaseType || 'mongo',
        adaptor: this.state.adaptor || 'adaptor1',
        table: this.state.availableObjects || '',
        object: this.state.availableObjects || '',
        objectType: this.state.objectType || '',
      };
      if (e.target.name === 'databaseType') {
        param.database = value
      }
      if (e.target.name === 'adaptor') {
        param.adaptor = value
      }
      if (e.target.name === 'availableObjects') {
        param.table = value
      }
      if (e.target.name === 'availableObjects') {
        param.object = value
      }
      if (e.target.name === 'objectType') {
        param.objectType = value
      }
      this.props.actions.generalProcess(constants.getAvailableObjectsList, param);
      this.props.actions.generalProcess(constants.getDBFields, param);
    }
  };

  onRequestTypeChange = (e) => {
    this.setState({
      isBlockchainGet: false,
      isBlockchainProcess: false,
      isOffchainGet: false
    });

    if (e.target.name === 'isOffchainGet') {
      this.state.APIDefinitionAddUpdate['isCustomMapping'] = true;
      this.getRequestResponseMapping(this.state.APIDefinitionAddUpdate.ResponseMapping, 'RESPONSE');
      this.getRequestResponseMapping(this.state.APIDefinitionAddUpdate.RequestMapping, 'REQUEST');

      this.setState({
        isCustomMapping: true,
        ResponseMapping: this.state.APIDefinitionAddUpdate.ResponseMapping,
        RequestMapping: this.state.APIDefinitionAddUpdate.RequestMapping
      });
    }

    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });

  };

  onInputChangeRequest = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }

    if (e.target.name === 'RequestMapping') {
      this.getRequestResponseMapping(value, 'REQUEST');
    }

    let req = { _id: value }
    this.props.actions.generalProcess(constants.getMappingConfigOrgFieldData, req);
    this.state.APIDefinitionAddUpdate[e.target.name] = value;
    this.setState({
      rules: [],
      [e.target.name]: value
    })
  };

  submit = () => {
    this.setState({ formSubmitted: true });
  };

  addParams = (type) => {
    switch (type) {
      case 'request':
        let params = this.state.requestParams;
        let requestP = {};
        try {
          requestP = JSON.parse(this.state.requestDBField);
        } catch (err) {
          console.log(err);
        }
        params.push({
          name: requestP.name,
          type: requestP.type,
          value: this.state.requestMappingField,
          operator: this.state.requestOperator
        });
        this.setState({
          requestParams: params
        });
        break;
      case 'response':
        let params1 = this.state.responseParams;
        params1.push({
          name: this.state.responseBDField,
          as: this.state.responseMappingField
        });
        this.setState({
          responseParams: params1
        });
        break;
    }
  };
  generateCustomFile = (e) => {
    let data = {};
    data.useCase = this.state.useCase;
    data.route = this.state.route;
    data.adaptor = this.state.adaptor;
    data.database = this.state.databaseType;
    data.objectType = this.state.objectType;
    data.object = this.state.availableObjects;
    data.conditions = this.state.requestParams;
    data.fields = this.state.responseParams;
    data.enablePaging = this.state.isEnablePagination;
    data.enableActions = this.state.isEnablComponentAction;

    this.props.actions.generalProcess(constants.generateMappingFile, data);
  };

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }

  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (
      <APIDefScreenForm navigateRes={this.navigateRes} navigateReq={this.navigateReq} parameters={this.state.parameters}
        generateCustomFile={this.generateCustomFile} addParams={this.addParams}
        onRequestTypeChange={this.onRequestTypeChange} addRowRule={this.addRowRule}
        addPolicyRule={this.addPolicyRule}
        onDateChange={this.onDateChange} onInputRuleEngine={this.onInputRuleEngine}
        onSubmit={this.formSubmit} dropdownItems={this.state.MappingConfigList}
        initialValues={this.state.APIDefinitionAddUpdate} typeData={this.state.typeData}
        onInputChange={this.onInputChange} onInputChangeRequest={this.onInputChangeRequest}
        addRow={this.addRow} simucases={this.state.simucases} ActionHandlers={this.ActionHandlers}
        parentState={this.state} add={this.add} test={this.test} addvalue={this.addvalue} />)
  }

  ActionHandlers({ actionName, index }) {

    //alert(actionName)
    switch (actionName) {
      case "Delete Policy":
        if (index > -1) {
          let result = confirm("Are you you want to Delete Policy?");
          if (result) {
            if (index > -1) {
              let tempStateRule = this.state.BillingPolicy;
              tempStateRule.splice(index, 1);
              this.setState({ BillingPolicy: tempStateRule });
            }
          }
        }
        break;


      case "Delete":
        if (index > -1) {
          let result = confirm("Are you you want to delete this action?");
          if (result) {
            if (index > -1) {
              let tempStateRule = this.state.actionList;
              tempStateRule.splice(index, 1);
              this.setState({ actionList: tempStateRule });
            }
          }
        }
        break;
      case "Remove":
        if (index > -1) {
          let result = confirm("Are you you want to delete rule?");
          if (result) {
            if (index > -1) {
              let tempStateRule = this.state.rules;
              tempStateRule.splice(index, 1);
              this.setState({ rules: tempStateRule });
            }
          }
        }
        break;
      case "Modify":
        if (index > -1) {
          let rule = this.state.rules[index];
          document.getElementById('BlockRuleName').value = rule.BlockRuleName;
          document.getElementById('channel').value = rule.channel;
          document.getElementById('type').value = rule.type;

          document.getElementById('smartcontractFunc').value = rule.smartcontractFunc || "";
          let tempStateRules = _.cloneDeep(this.state.rules);
          tempStateRules.splice(index, 1);
          this.setState({ rules: tempStateRules }, () => {
            document.getElementById('consortium').value = rule.consortium;
            document.getElementById('smartcontract').value = rule.smartcontract;
            let pLoad = {};
            pLoad.selectedConsortium = rule.consortium;
            pLoad.channelID = rule.channel


            this.state.MappingOrgFieldData.forEach((element, index) => {
              let value = rule.ruleList[index].value
              element.value = value;
            });
            this.setState({
              selectedChannel: rule.channel,
              selectedConsortium: rule.consortium,
              selectedSmartcontract: rule.smartcontract,
              MappingOrgFieldData: this.state.MappingOrgFieldData
            }, () => {
              this.props.actions.generalProcess(constants.getConsortiumTypeList, pLoad);
            })
          });
        }
        break;
      case "Edit":
        if (index > -1) {
          let a = this.state.simucases[index];
          document.getElementById('SimulatorRequest').value = a.SimulatorRequest;
          document.getElementById('SimulatorResponse').value = a.SimulatorResponse;
          document.getElementById('SimuValue').value = a.SimuValue;
          document.getElementById('SimuField').value = a.SimuField;
          document.getElementById('RuleName').value = a.RuleName;
          let tempState = this.state.simucases;
          tempState.splice(index, 1);
          this.setState({ simucases: tempState });
        }
        break;
      case "Delete":
        let result = confirm("Are you sure you want to delete?");
        if (result) {
          if (index > -1) {
            let a = this.state.simucases;
            a.splice(index, 1);
            this.setState({ simucases: a });
          }
        }
        break;

      case "Move UP":
        if (index > 0) {
          let newConfig = this.state.rules;
          let prev = newConfig[index - 1];
          newConfig[index - 1] = newConfig[index]
          newConfig[index] = prev
          this.setState({ rules: newConfig });
        }
        break;
      case "Move Down":
        if (index + 1 <= this.state.mappingConfig.length) {
          let newConfig = this.state.rules;
          let next = newConfig[index + 1];
          newConfig[index + 1] = newConfig[index]
          newConfig[index] = next
          this.setState({ rules: newConfig });
        }
        break;
      default:
        break;
    }
  }
}


APIDefinitionScreen.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,

  parameters: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let parameters = {};
  let params = get(state.app, 'AddUpdateMapping.data.MappingConfig', {});
  params = params || {};
  if (params._id) {
    parameters[params._id] = params.fields;
  }
  return {
    MappingOrgFieldData: state.app.MappingOrgFieldData,
    APIDefinitionAddUpdate: state.app.APIDefinitionAddUpdate,
    typeData: state.app.typeData,
    MappingConfigData: state.app.MappingConfigData.data,
    useCase: ownProps.params.useCase,
    route: ownProps.params.route,
    ConsortiumTypeData: state.app.ConsortiumTypeData,
    getAdaptorsList: get(state.app, 'getAdaptorsList.data', []),
    getDBFields: get(state.app, 'getDBFields', { data: [] }),
    getAvailableObjectsList: get(state.app, 'getAvailableObjectsList.data', []),
    generateMappingFile: get(state.app, 'generateMappingFile', {}),
    RelayNetworks: get(state.app, 'RelayNetworkTypeData.data.RelayNetworks', undefined),
    triggerLocal: get(state.app, 'triggerLocal', {}),

    parameters: parameters,
    getEndpointListView: state.app.getEndpointListView
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

APIDefinitionScreen.displayName = "APIDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(APIDefinitionScreen);

