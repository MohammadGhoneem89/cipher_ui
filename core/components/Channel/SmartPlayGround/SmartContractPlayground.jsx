/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/generalAction';
/*container specific imports*/
import Table from '../../../common/Datatable.jsx';
import * as utils from '../../../common/utils.js';
import * as constants from '../../../constants/Communication.js';
import cloneDeep from 'lodash/cloneDeep';
import PlaygroundForm from './PlaygroundForm.jsx'
const initialState = {
  smartContractData: {
    "smartContractMethod": "",
    "smartContractArgs": [],
    "endorsementPolicy": [],
    "smartContractName": "",
    "channelName": "",
    "contractID": ""
  },
  channelName: "",
  networkName: "",
  documents: [],
  channelData: {},
  typeData: {},
  isPeerLoaded: false,
  contractTypeList: [],
  networkPeerList: [],
  dropDownItems: [],
  readOnly: false,
  isLoading: true,
  isReady: false
};

class SmartContractPlayground extends React.Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChannel = this.onInputChannel.bind(this);
    this.formSubmitQuery = this.formSubmitQuery.bind(this);
    this.state = cloneDeep(initialState)
  }
  componentWillMount() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.SmartContractTypeData.data) {
      this.setState({
        isLoading: false,
        contractTypeList: nextProps.SmartContractTypeData.data.smartcontracts
      });
    }
    if (nextProps.AddUpdateSmartContract.data) {

      this.setState({
        channelName: nextProps.AddUpdateSmartContract.data.SmartContractConfig.channelID.channelName,
        networkName: nextProps.AddUpdateSmartContract.data.SmartContractConfig.channelID.networkName,
        smartContract: nextProps.AddUpdateSmartContract.data.SmartContractConfig.smartContract,
        isReady: true
      });
    }

    if (nextProps.HyperledgerConnect.data) {
      this.state.smartContractData.status = JSON.stringify(nextProps.HyperledgerConnect.data, null, 4);
      this.setState({
        smartContractData: this.state.smartContractData
      });
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getSmartContractTypeList);
    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getSmartContractConfigByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
  }

  formSubmit(e) {

    if (this.state.smartContractData.contractID.trim() == '') {
      alert("Smart Contract Name is required");
      return;
    }
    if (this.state.smartContractData.smartContractMethod == '') {
      alert("smartContractMethod is required");
      return;
    }
    let args;
    if (this.state.smartContractData.smartContractArgs == '') {
      alert("smartContractArgs is required");
      return;
    } else {
      try {
        args = JSON.parse(this.state.smartContractData.smartContractArgs);
      } catch (error) {
        alert("smartContractArgs must be a valid array");
        return false;
      }
    }

    let data = {
      "function": "0002",
      "network": this.state.networkName,
      "channelName": this.state.channelName,
      "smartContractName": this.state.smartContract,
      "smartContractMethod": this.state.smartContractData.smartContractMethod,
      "smartContractArgs": args,
    }

    this.state.smartContractData.status = "========================INVOKE REQUEST SENT=============================="
    this.setState({ status: this.state.smartContractData });



    this.props.actions.generalProcess(constants.hyperledgerConnect, data);

  }
  formSubmitQuery(e) {

    if (this.state.smartContract.trim() == '') {
      alert("Smart Contract Name is required");
      return;
    }
    if (this.state.smartContractData.smartContractMethod == '') {
      alert("smartContractMethod is required");
      return;
    }
    let args;
    if (this.state.smartContractData.smartContractArgs == '') {
      alert("smartContractArgs is required");
      return;
    } else {
      try {

        args = JSON.parse(this.state.smartContractData.smartContractArgs);

      } catch (error) {

        alert("smartContractArgs must be a valid array");
        return false;
      }
    }

    let data = {
      "function": "0001",
      "network": this.state.networkName,
      "channelName": this.state.channelName,
      "smartContractName": this.state.smartContract,
      "smartContractMethod": this.state.smartContractData.smartContractMethod,
      "smartContractArgs": args,
    }
    this.state.smartContractData.status = "========================QUERY REQUEST SENT=============================="
    this.setState({ status: this.state.smartContractData });
    this.props.actions.generalProcess(constants.hyperledgerConnect, data);

  }
  onInputChange = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.smartContractData[e.target.name] = value;
    //alert(value)
    this.setState({
      smartContractData: this.state.smartContractData
    })
  }
  onInputChannel = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.smartContractData[e.target.name] = value;
    let data = {
      "_id": value
    }
    this.props.actions.generalProcess(constants.getSmartContractConfigDetailedByID, data);
    this.setState({
      isReady: false,
      [e.target.name]: value
    })
  }
  updateState = (data) => {
    this.setState(data);
  }
  render() {
    // if (this.state.isLoading) {
    //   return (<div className="loader">isLoading...</div>)
    // }
    return (

      <PlaygroundForm initState={this.state} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} updateState={this.updateState} onInputChannel={this.onInputChannel} formSubmit={this.formSubmit} formSubmitQuery={this.formSubmitQuery} />
    );
  }
  // else
  //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}

SmartContractPlayground.propTypes = {
  SmartContractTypeData: PropTypes.object,
  children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
  return {
    AddUpdateSmartContract: state.app.AddUpdateSmartContract,
    SmartContractTypeData: state.app.SmartContractTypeData,
    HyperledgerConnect: state.app.HyperledgerConnect,
    id: ownProps.params.id,
  };
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}
SmartContractPlayground.displayName = "CreateSmartContract_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(SmartContractPlayground);
