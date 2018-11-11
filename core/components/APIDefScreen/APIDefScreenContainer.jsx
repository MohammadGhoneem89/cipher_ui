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
    "ServiceIP": "",
    "ServicePort": "",
    "description": "",
    "authorization": "",
    "simulatorResponse": "",
    "ResponseMapping": "",
    "RequestMapping": "",
    "isValBypass": false
  },
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
    this.onInputChange = this.onInputChange.bind(this);
    this.state = cloneDeep(initialState)

  }

  componentWillMount() {

  }

  componentDidMount() {



    this.props.actions.generalProcess(constants.getMappingList);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['API_Authtypes', 'API_ComMode']));
    if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE") {
      let req = {
        useCase: this.props.useCase,
        route: this.props.route
      }
      console.log(req)
      this.props.actions.generalProcess(constants.getAPIDefinitionID, req);
    }
  }
  componentWillReceiveProps(nextProps) {

    if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE") {
      if (nextProps.APIDefinitionAddUpdate.data) {
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
        MappingConfigList: nextProps.MappingConfigData
      });
    }

    if (nextProps.typeData.data) {
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
      if (data.communicationMode === "REST" && (data.ServiceIP.trim() == "" || data.ServicePort.trim() == "")) {
        alert("ServiceIP and ServicePort must be defined!");
        return false;
      }
      if (data.communicationMode === "QUEUE" && (data.requestServiceQueue.trim() == "" || data.responseQueue.trim() == "")) {
        alert("Request and Response Queue must be defined!");
        return false;
      }
    }


    if (data.isSimulated === true) {
      if (data.simulatorResponse.trim() === "") {
        alert("Simulator Response must be defined!");
        return false;
      } else {
        try {
          let json = JSON.parse(data.simulatorResponse.trim())
        } catch (ex) {
          alert("Simulator Response must be a Parsable JSON format!");
        }
      }
    }
  
    data.RequestMapping = (data.RequestMapping === "" ? this.state.MappingConfigList.REQUEST[0].value : data.RequestMapping);
    data.ResponseMapping = (data.ResponseMapping === "" ? this.state.MappingConfigList.RESPONSE[0].value : data.ResponseMapping);

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
      <APIDefScreenForm onSubmit={this.formSubmit} dropdownItems={this.state.MappingConfigList} initialValues={this.state.APIDefinitionAddUpdate} typeData={this.state.typeData} onInputChange={this.onInputChange} />)
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

