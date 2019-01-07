/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import APIDefScreenForm from './APIDefScreenForm.jsx';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

const initialState = {
  APIDefinitionAddUpdate: {
    "useCase": "",
    "route": "",
    "isBilled": false,
    "billingDate": (new Date().getTime()),
    "documentPath": "",
    "isActive": false,
    "isBlockchainProcess": false,
    "isBlockchain": false,
    "isSimulated": false,
    "isRouteOveride": false,
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
    "isValBypass": false,
    "isResValBypass": false,
    "isResponseMapDisable": false,
    isBlockchainGet: false,
    isOffchainGet: false,
    responseParameters: [],
    requestParameters: []
  },
  selectedRuleList: [],
  MappingOrgFieldData: [],
  simucases: [],
  MappingConfigList: {},
  typeData: {},
  consortium: [],
  channel: [],
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
  responseParams: []
};
class APIDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addRowRule = this.addRowRule.bind(this);
    this.onInputRuleEngine = this.onInputRuleEngine.bind(this);
    this.onInputChangeRequest = this.onInputChangeRequest.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.state = cloneDeep(initialState)

  }

  componentWillMount() {

  }
  addRowRule() {
    let BlockRuleName = document.getElementById('BlockRuleName') == null ? "" : document.getElementById('BlockRuleName').value;
    let channel = document.getElementById('channel') == null ? "" : document.getElementById('channel').value;
    let consortium = document.getElementById('consortium') == null ? "" : document.getElementById('consortium').value;
    let smartcontract = document.getElementById('smartcontract') == null ? "" : document.getElementById('smartcontract').value;
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
  addRow() {
    let SimulatorResponse = document.getElementById('SimulatorResponse') == null ? "" : document.getElementById('SimulatorResponse').value;
    let SimuValue = document.getElementById('SimuValue') == null ? "" : document.getElementById('SimuValue').value;
    let SimuField = document.getElementById('SimuField') == null ? "" : document.getElementById('SimuField').value;
    let RuleName = document.getElementById('RuleName') == null ? "" : document.getElementById('RuleName').value;

    let data = this.state.simucases;
    let newtupple = {
      SimulatorResponse: SimulatorResponse,
      SimuValue: SimuValue,
      SimuField: SimuField,
      RuleName: RuleName,
      actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }, { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
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
    this.clearFields();
    data.push(newtupple);
    this.setState({ simucases: data });
  }
  componentDidMount() {


    this.props.actions.generalProcess(constants.getConsortiumTypeList);
    this.props.actions.generalProcess(constants.getMappingList);
    this.props.actions.generalProcess(constants.getAdaptorsList);
    this.props.actions.generalProcess(constants.getAvailableObjectsList, {
      database: this.state.databaseType || 'mongo',
      adaptor: this.state.adaptor || 'adaptor1'
    });

    this.props.actions.generalProcess(constants.getDBFields, {
      database: this.state.databaseType || 'postgres',
      adaptor: this.state.adaptor || 'adaptor4',
      table: this.state.availableObjects || 'adaptor4',
    });

    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['database_available_objects', 'database_object_types', 'database_adaptors', 'database_types', 'API_Authtypes', 'API_ComMode', 'ORG_TYPES','bchain_rule_Type']));
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
  componentWillReceiveProps(nextProps) {
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
        this.setState({
          simucases: simucases
        });
      }
      if (this.state.isStale === false) {
        this.setState({
          APIDefinitionAddUpdate: cloneDeep(nextProps.APIDefinitionAddUpdate.data),
          rules: nextProps.APIDefinitionAddUpdate.data.rules || []
        });
        this.setState({
          MappingOrgFieldData: [],
          isStale: true
        }, () => {
          let req = { _id: nextProps.APIDefinitionAddUpdate.data.RequestMapping }
          this.props.actions.generalProcess(constants.getMappingConfigOrgFieldData, req);
        });
      }
    } else {
      this.setState({
        APIDefinitionAddUpdate: cloneDeep(initialState.APIDefinitionAddUpdate)
      });
    }
    if (nextProps.MappingConfigData && nextProps.MappingConfigData.REQUEST && nextProps.MappingConfigData.RESPONSE) {

      this.setState({
        MappingConfigList: nextProps.MappingConfigData,

      });
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
  }

  formSubmit(e) {
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
      if (data.communicationMode === "QUEUE" && (data.requestServiceQueue.trim() == "" || data.responseQueue.trim() == "")) {
        alert("Request and Response Queue must be defined!");
        return false;
      }
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
    data.adaptor = this.state.adaptor;
    data.database = this.state.databaseType;
    data.objectType = this.state.objectType;
    data.object = this.state.availableObjects;
    data.conditions = this.state.requestParams;
    data.fields = this.state.responseParams;
    data.enablePaging = this.state.isEnablePagination;
    data.enableActions = this.state.isEnablComponentAction;
    data.rules = this.state.rules;
    data.RequestMapping = (data.RequestMapping === "" ? this.state.MappingConfigList.REQUEST[0].value : data.RequestMapping);
    data.ResponseMapping = (data.ResponseMapping === "" ? this.state.MappingConfigList.RESPONSE[0].value : data.ResponseMapping);
    data.simucases = this.state.simucases;
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

    if(e.target.name === 'databaseType' || e.target.name === 'adaptor' || e.target.name === 'availableObjects'){
      let param = {
        database: this.state.databaseType || 'mongo',
        adaptor: this.state.adaptor || 'adaptor1',
        table: this.state.availableObjects || '',
      };
      if(e.target.name === 'databaseType'){
        param.database = value
      }
      if(e.target.name === 'adaptor'){
        param.adaptor = value
      }
      if(e.target.name === 'availableObjects'){
        param.table = value
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

  addParams = (type) =>{
    switch (type) {
      case 'request':
        let params = this.state.requestParams;
        params.push({
          name: this.state.requestDBField,
          value: this.state.requestMappingField
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

  render() {


    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (
      <APIDefScreenForm addParams={this.addParams} onRequestTypeChange={this.onRequestTypeChange} addRowRule={this.addRowRule} onDateChange={this.onDateChange} onInputRuleEngine={this.onInputRuleEngine} onSubmit={this.formSubmit} dropdownItems={this.state.MappingConfigList} initialValues={this.state.APIDefinitionAddUpdate} typeData={this.state.typeData} onInputChange={this.onInputChange} onInputChangeRequest={this.onInputChangeRequest} addRow={this.addRow} simucases={this.state.simucases} ActionHandlers={this.ActionHandlers} parentState={this.state} />)
  }
  ActionHandlers({ actionName, index }) {

    //alert(actionName)
    switch (actionName) {

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
        let result = confirm("Are you you want to delete?");
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
  APIDefinitionAddUpdate: PropTypes.object,
  MappingConfigData: PropTypes.object,
  MappingOrgFieldData: PropTypes.object,
  getAdaptorsList: PropTypes.object,
  getAvailableObjectsList: PropTypes.object,
  getDBFields: PropTypes.object,
  ConsortiumTypeData: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    MappingOrgFieldData: state.app.MappingOrgFieldData,
    APIDefinitionAddUpdate: state.app.APIDefinitionAddUpdate,
    typeData: state.app.typeData,
    MappingConfigData: state.app.MappingConfigData.data,
    useCase: ownProps.params.useCase,
    route: ownProps.params.route,
    ConsortiumTypeData: state.app.ConsortiumTypeData,
    getAdaptorsList: get(state.app, 'getAdaptorsList.data', []),
    getDBFields: get(state.app, 'getDBFields.data', []),
    getAvailableObjectsList: get(state.app, 'getAvailableObjectsList.data', [])
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
APIDefinitionScreen.displayName = "APIDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(APIDefinitionScreen);

