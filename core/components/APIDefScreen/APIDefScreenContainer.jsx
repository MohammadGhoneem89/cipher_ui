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
const initialState = {
  APIDefinitionAddUpdate: {
    "useCase": "",
    "route": "",
    "documentPath": "",
    "isActive": false,
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
    "description": "",
    "authorization": "",
    "simulatorResponse": "",
    "ResponseMapping": "",
    "RequestMapping": "",
    "isValBypass": false,
    "isResValBypass":false,
    "isResponseMapDisable": false,
  },
  simucases: [],
  MappingConfigList: {},
  typeData: {},
  // dropDownItems:[],
  isLoading: true,
  isCustom: true
};
class APIDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = cloneDeep(initialState)

  }

  componentWillMount() {

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
      actions: [{ label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }],
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



    this.props.actions.generalProcess(constants.getMappingList);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['API_Authtypes', 'API_ComMode', 'ORG_TYPES']));
    if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE") {
      let req = {
        useCase: this.props.useCase,
        route: this.props.route
      }
      console.log(req)
      this.props.actions.generalProcess(constants.getAPIDefinitionID, req);
    }
  }
  clearFields() {
    $('#simuDefination').find('input:text').val('');
    $('#simuDefination').find('textarea').val('');

  }
  componentWillReceiveProps(nextProps) {

    if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE") {
      if (nextProps.APIDefinitionAddUpdate.data) {
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
        this.setState({
          APIDefinitionAddUpdate: cloneDeep(nextProps.APIDefinitionAddUpdate.data)
        });
      }
    } else {
      this.setState({
        APIDefinitionAddUpdate: cloneDeep(initialState.APIDefinitionAddUpdate)
      });
    }
    if (nextProps.MappingConfigData && nextProps.MappingConfigData.REQUEST && nextProps.MappingConfigData.RESPONSE) {
      console.log(JSON.stringify(nextProps.MappingConfigData));

      this.setState({
        MappingConfigList: nextProps.MappingConfigData,

      });
    }

    if (nextProps.typeData.data && nextProps.typeData.data.API_Authtypes) {
      this.setState({
        typeData: nextProps.typeData.data,
        isLoading: false
      });
    }
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


    if (data.isSimulated === true) {
      if (this.state.simucases.length == 0) {
        alert("Simulator Rules must be defined!");
        return false;
      }
    }

    data.RequestMapping = (data.RequestMapping === "" ? this.state.MappingConfigList.REQUEST[0].value : data.RequestMapping);
    data.ResponseMapping = (data.ResponseMapping === "" ? this.state.MappingConfigList.RESPONSE[0].value : data.ResponseMapping);
    data.simucases = this.state.simucases;
    console.log(JSON.stringify(data));
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
    })
  }
  submit = () => {
    this.setState({ formSubmitted: true });
  }
  render() {


    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (
      <APIDefScreenForm onSubmit={this.formSubmit} dropdownItems={this.state.MappingConfigList} initialValues={this.state.APIDefinitionAddUpdate} typeData={this.state.typeData} onInputChange={this.onInputChange} addRow={this.addRow} simucases={this.state.simucases} ActionHandlers={this.ActionHandlers} />)
  }
  ActionHandlers({ actionName, index }) {
    switch (actionName) {
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
};

function mapStateToProps(state, ownProps) {
  return {
    APIDefinitionAddUpdate: state.app.APIDefinitionAddUpdate,
    typeData: state.app.typeData,
    MappingConfigData: state.app.MappingConfigData.data,
    useCase: ownProps.params.useCase,
    route: ownProps.params.route,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
APIDefinitionScreen.displayName = "APIDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(APIDefinitionScreen);

