/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import * as actions from '../../../actions/generalAction';
/*container specific imports*/
import Table from '../../../common/Datatable.jsx';
import * as utils from '../../../common/utils.js';
import * as constants from '../../../constants/Communication.js';
import cloneDeep from 'lodash/cloneDeep';
import * as requestCreator from '../../../common/request.js';
import CreateSmartContractForm from './CreateSmartContractForm.jsx'
import CreateSmartContractFormQuorum from './CreateSmartContractFormQuorum.jsx'


const initialState = {
  smartContractData: {
    "type": "",
    "smartContract": "",
    "smartContractVersion": "",
    "smartContractMethod": "",
    "smartContractArgs": [],
    "endorsementPolicy": [],
    "channelName": "",
    "channelID": "",
    "status": ""
  },
  documents: [],
  channelData: {},
  typeData: {},
  isPeerLoaded: false,
  channelTypeList: [],
  networkPeerList: [],
  dropDownItems: [],
  readOnly: false,
  isLoading: true,
};

class CreateSmartContract extends React.Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChannel = this.onInputChannel.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.back = this.back.bind(this);
    this.state = cloneDeep(initialState)
  }
  componentWillMount() { }
  back = () => {
    browserHistory.push('/SmartContractList');
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.ChannelTypeData.data) {
      this.setState({
        channelTypeList: nextProps.ChannelTypeData.data.channels
      });
    }
    if (nextProps.typeData.data && nextProps.typeData.data.BLCHN_TYPE) {
      this.setState({
        typeData: nextProps.typeData.data,
        isLoading: false
      });
    }

    if (nextProps.AddUpdateChannel.data && nextProps.AddUpdateChannel.data.ChannelConfig.channelName && this.state.smartContractData.channelID != "") {
      let peerList = nextProps.AddUpdateChannel.data.ChannelConfig.network.peerList
      peerList.forEach(element => {
        //element.status=""
        if (this.state.smartContractData.type == "Quorum") {
          element.actions = [
            {
              "label": "Deploy",
              "iconName": "fa fa-arrow-up",
              "actionType": "COMPONENT_FUNCTION"
            }
          ]
        } else {
          element.actions = [
            {
              "label": "Install",
              "iconName": "fa fa-save",
              "actionType": "COMPONENT_FUNCTION"
            },
            {
              "label": "Instanciate",
              "iconName": "fa fa-chain",
              "actionType": "COMPONENT_FUNCTION"
            },
            {
              "label": "Upgrade",
              "iconName": "fa fa-arrow-up",
              "actionType": "COMPONENT_FUNCTION"
            }
          ]

        }
      });
      this.setState({
        channelData: nextProps.AddUpdateChannel.data.ChannelConfig,
        networkPeerList: peerList || [],
        isPeerLoaded: true
      });
    }
    if (this.props.id == "NEW" && this.state.isPeerLoaded === false) {
      this.setState({
        networkPeerList: [],
        documents: [],
        smartContractData: _.cloneDeep(initialState.smartContractData),
        isPeerLoaded: true
      });
    }
    if (nextProps.AddUpdateSmartContract.data && nextProps.AddUpdateSmartContract.data.SmartContractConfig.channelName && this.props.id !== "NEW") {
      let data = _.cloneDeep(nextProps.AddUpdateSmartContract.data.SmartContractConfig)

      if (this.state.isPeerLoaded === false) {
        let request = {
          "_id": data.channelID
        }
        this.props.actions.generalProcess(constants.getChannelTypeList, { type: nextProps.AddUpdateSmartContract.data.SmartContractConfig.type });
        this.props.actions.generalProcess(constants.getChannelConfigByID, request);
      }


      Object.assign(data, {
        smartContractArgs: JSON.stringify(data.smartContractArgs, null, 2) || [],
        endorsementPolicy: JSON.stringify(data.endorsementPolicy, null, 2) || [],
      });

      this.setState({
        documents: data.documents || [],
        smartContractData: data,
        isPeerLoaded: true
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
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['BLCHN_TYPE']));

    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getSmartContractConfigByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
  }
  ActionHandlers({ actionName, index }) {
    switch (actionName) {

      case "Install":
        if (index > -1) {
          if (this.state.smartContractData.channelName.trim() == '') {
            alert("channelName is required");
            return;
          }
          if (this.state.smartContractData.smartContract == '') {
            alert("smartContractName is required");
            return;
          }

          if (this.state.smartContractData.smartContractVersion == '') {
            alert("smartContractVersion is required");
            return;
          }
          if (!this.state.documents) {
            alert("SmartContract  is required");
            return;
          }
          if (this.state.documents.length && this.state.documents.length != 0) {
            this.state.smartContractData.status = "========================INSTALL REQUEST SENT=============================="
            this.setState({ status: this.state.smartContractData });
            let data = {
              "function": "0007",
              "network": this.state.channelData.network.networkName,
              "channelName": this.state.channelData.channelName.trim(),
              "peerList": [this.state.networkPeerList[index].requests.replace("grpcs://", '')],
              "smartContractName": this.state.smartContractData.smartContract,
              "smartContractVersion": this.state.smartContractData.smartContractVersion,
              "smartContractPackPath": this.state.documents[0].retreivalPath
            }
            this.props.actions.generalProcess(constants.hyperledgerConnect, data);
          } else {
            alert("SmartContract is required");
            return;
          }
        }
        break;

      case "Instanciate":
        if (index > -1) {
          if (this.state.smartContractData.channelName.trim() == '') {
            alert("channelName is required");
            return;
          }
          if (this.state.smartContractData.smartContract == '') {
            alert("smartContractName is required");
            return;
          }

          if (this.state.smartContractData.smartContractVersion == '') {
            alert("smartContractVersion is required");
            return;
          }

          if (this.state.smartContractData.smartContractMethod == '') {
            alert("smartContractMethod is required");
            return;
          }
          let arg;
          if (this.state.smartContractData.smartContractArgs == '') {
            alert("smartContractArgs is required");
            return;
          } else {
            try {

              arg = JSON.parse(this.state.smartContractData.smartContractArgs);

            } catch (error) {

              alert("smartContractArgs must be a valid array");
              return false;
            }
          }

          if (this.state.smartContractData.endorsementPolicy == '') {
            var result = confirm("Are you sure you want to instanciate without endorsement policy?");
            if (!result) {
              return
            }
          }

          this.state.smartContractData.status = "========================Instanciate REQUEST SENT=============================="
          this.setState({ status: this.state.smartContractData });
          let data = {
            "function": "0008",
            "network": this.state.channelData.network.networkName,
            "channelName": this.state.channelData.channelName.trim(),
            "peerList": [this.state.networkPeerList[index].requests.replace("grpcs://", '')],
            "smartContractName": this.state.smartContractData.smartContract,
            "smartContractMethod": this.state.smartContractData.smartContractMethod,
            "smartContractArgs": arg,
            "smartContractVersion": this.state.smartContractData.smartContractVersion,
            "endorsementPolicy": this.state.smartContractData.endorsementPolicy
          }
          this.props.actions.generalProcess(constants.hyperledgerConnect, data);
        }

        break;
      case "Upgrade":
        if (index > -1) {
          if (this.state.smartContractData.channelName.trim() == '') {
            alert("channelName is required");
            return;
          }
          if (this.state.smartContractData.smartContract == '') {
            alert("smartContractName is required");
            return;
          }

          if (this.state.smartContractData.smartContractVersion == '') {
            alert("smartContractVersion is required");
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

          if (this.state.smartContractData.endorsementPolicy == '') {
            let result = confirm("Are you sure you want to instanciate without endorsement policy?");
            if (!result) {
              return;
            }
          }

          this.state.smartContractData.status = "========================Upgrade REQUEST SENT=============================="
          this.setState({ status: this.state.smartContractData });
          let data = {
            "function": "0008",
            "network": this.state.channelData.network.networkName,
            "channelName": this.state.channelData.channelName.trim(),
            "peerList": [this.state.networkPeerList[index].requests.replace("grpcs://", '')],
            "smartContractName": this.state.smartContractData.smartContract,
            "smartContractMethod": this.state.smartContractData.smartContractMethod,
            "smartContractArgs": args,
            "smartContractVersion": this.state.smartContractData.smartContractVersion,
            "endorsementPolicy": this.state.smartContractData.endorsementPolicy,
            "actionType": "UPGRADE"
          }
          this.props.actions.generalProcess(constants.hyperledgerConnect, data);
        }
      case "Deploy":
        if (index > -1) {
          if (this.state.smartContractData.channelName.trim() == '') {
            alert("channelName is required");
            return;
          }
          if (this.state.smartContractData.smartContract == '') {
            alert("smartContractName is required");
            return;
          }

          if (this.state.smartContractData.smartContractVersion == '') {
            alert("smartContractVersion is required");
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

          if (this.state.smartContractData.endorsementPolicy == '') {
            let result = confirm("Are you sure you want to deploy without privateFor?");
            if (!result) {
              return;
            }
          }

          this.setState({ status: this.state.smartContractData });
          if (this.state.documents.length && this.state.documents.length != 0) {
            this.state.smartContractData.status = "========================Deploy REQUEST SENT=============================="
            this.setState({ status: this.state.smartContractData });
            let dataToSave = _.cloneDeep(this.state.smartContractData);
            dataToSave.documents = this.state.documents;
            dataToSave.endorsementPolicy = JSON.parse(this.state.smartContractData.endorsementPolicy);;
            dataToSave.smartContractArgs = args;
            let data = {
              "function": "1007",
              "network": this.state.channelData.network.networkName,
              "channelName": this.state.channelData.channelName.trim(),
              "peerList": [this.state.networkPeerList[index].requests.replace("grpcs://", '')],
              "smartContractName": this.state.smartContractData.smartContract,
              "smartContractVersion": this.state.smartContractData.smartContractVersion,
              "smartContractArgs": args,
              "privateFor": this.state.smartContractData.endorsementPolicy,
              "actionType": "Deploy",
              "smartContractPackPath": this.state.documents[0].retreivalPath,
              "savePayload": dataToSave
            }


            this.props.actions.generalProcess(constants.quorumConnect, data);
          } else {
            alert("SmartContract is required");
            return;
          }
        }
        break;
      default:
        break;
    }
  }
  formSubmit(e) {
    if (this.state.smartContractData.type.trim() == '') {
      alert("Blockchain Type is required");
      return;
    }
    if (this.state.smartContractData.smartContract.trim() == '') {
      alert("Smart Contract Name is required");
      return;
    }

    if (this.state.smartContractData.channelID == '') {
      alert("channel is required");
      return;
    }

    if (this.state.smartContractData.smartContractVersion == '') {
      alert("Smart Contract Version is required");
      return;
    }

    if (!this.state.documents) {
      alert("SmartContract is required");
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
    let endorsement;
    if (this.state.smartContractData.endorsementPolicy != '') {
      try {
        endorsement = JSON.parse(this.state.smartContractData.endorsementPolicy);
      } catch (error) {
        alert("endorsementPolicy must be a valid array");
        return false;
      }
    }

    if (this.state.documents.length && this.state.documents.length != 0) {
      let data = _.cloneDeep(this.state.smartContractData);
      data.documents = this.state.documents;
      data.endorsementPolicy = endorsement;
      data.smartContractArgs = args;

      this.props.actions.generalProcess(constants.updateSmartContractConfig, data)
    } else {
      alert("SmartContract is required");
      return;
    }
  }

  onInputChange = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    if (e.target.name == 'type') {
      this.props.actions.generalProcess(constants.getChannelTypeList, { type: value });
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



    let text = $("#" + e.target.name + " option:selected").text()
    this.state.smartContractData[e.target.name] = value;
    this.state.smartContractData['channelName'] = text;
    let data = {
      "_id": value
    }
   
    this.props.actions.generalProcess(constants.getChannelConfigByID, data);
    this.setState({
      [e.target.name]: value
    })
  }
  updateState = (data) => {
    this.setState(data);
  }
  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    if (this.state.smartContractData.type == "Quorum")
      return (<CreateSmartContractFormQuorum back={this.back} initState={this.state} flag={this.props.id != "NEW"} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} updateState={this.updateState} onInputChannel={this.onInputChannel} formSubmit={this.formSubmit} createChannel={this.createChannel} />);
    else
      return (<CreateSmartContractForm initState={this.state} flag={this.props.id != "NEW"} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} updateState={this.updateState} onInputChannel={this.onInputChannel} formSubmit={this.formSubmit} createChannel={this.createChannel} />);

  }
  // else
  //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}

CreateSmartContract.propTypes = {
  ChannelTypeData: PropTypes.object,
  HyperledgerConnect: PropTypes.object,
  AddUpdateSmartContract: PropTypes.object,
  typeData: PropTypes.object,
  children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
  return {
    ChannelTypeData: state.app.ChannelTypeData,
    AddUpdateSmartContract: state.app.AddUpdateSmartContract,
    AddUpdateChannel: state.app.AddUpdateChannel,
    HyperledgerConnect: state.app.HyperledgerConnect,
    typeData: state.app.typeData,
    id: ownProps.params.id,
  };
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}
CreateSmartContract.displayName = "CreateSmartContract_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(CreateSmartContract);
