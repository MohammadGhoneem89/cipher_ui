/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/generalAction';
/*container specific imports*/
import Table from '../../../common/Datatable.jsx';
import * as requestCreator from '../../../common/request.js';
import * as utils from '../../../common/utils.js';
import * as constants from '../../../constants/Communication.js';
import cloneDeep from 'lodash/cloneDeep';
import CreateChannelForm from './CreateChannelForm.jsx'
import CreateChannelFormQuorum from './CreateChannelFormQuorum.jsx'

const initialState = {
  channelData: {
    "type": "",
    "channelName": "",
    "network": "",
    "networkName": "",
    "orgList": [],
    "status": ""
  },
  documents: [],
  typeData: {},
  isPeerLoaded: false,
  networkTypeList: [],
  orgTypeList: [],
  networkPeerList: [],
  dropDownItems: [],
  readOnly: false,
  isLoading: true,
};

class CreateChannel extends React.Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNetwork = this.onInputNetwork.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.onInputChangeCbl = this.onInputChangeCbl.bind(this);
    this.state = cloneDeep(initialState)
  }
  componentWillMount() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.NetworkTypeData.data) {
      let orgList = _.get(this.state.channelData, 'orgList', []);
      let orgTypeList = _.cloneDeep(nextProps.NetworkTypeData.data.orgList);
      orgTypeList.forEach(element => {
        if (orgList.indexOf(element.value) > -1) {
          element = _.set(element, 'isChecked', true)
        }
      });
      this.setState({
        networkTypeList: nextProps.NetworkTypeData.data.networks,
        orgTypeList: orgTypeList
      });
    }
    if (nextProps.typeData.data && nextProps.typeData.data.BLCHN_TYPE) {
      this.setState({
        typeData: nextProps.typeData.data,
        isLoading: false
      });
    }
    if (this.props.id == "NEW" && this.state.isPeerLoaded === false) {
      this.setState({
        networkPeerList: [],
        documents: [],
        channelData: _.cloneDeep(initialState.channelData),
        isPeerLoaded: true
      });
    }
    if (nextProps.AddUpdateChannel.data && nextProps.AddUpdateChannel.data.ChannelConfig.channelName && this.props.id !== "NEW") {

      this.state.channelData._id = nextProps.AddUpdateChannel.data.ChannelConfig._id
      this.state.channelData.type = nextProps.AddUpdateChannel.data.ChannelConfig.type
      this.state.channelData.channelName = nextProps.AddUpdateChannel.data.ChannelConfig.channelName
      this.state.channelData.networkName = nextProps.AddUpdateChannel.data.ChannelConfig.networkName
      this.state.channelData.orgList = nextProps.AddUpdateChannel.data.ChannelConfig.orgList
      this.state.channelData.network = nextProps.AddUpdateChannel.data.ChannelConfig.network._id
      
      if (this.state.isPeerLoaded === false) {
        this.props.actions.generalProcess(constants.getNetworkTypeList, { type: nextProps.AddUpdateChannel.data.ChannelConfig.type });
        let data = {
          "_id": this.state.channelData.network
        }
        this.props.actions.generalProcess(constants.getPeerList, data);
      }
      this.setState({
        documents: nextProps.AddUpdateChannel.data.ChannelConfig.documents || [],
        channelData: this.state.channelData,
        isPeerLoaded: true
      });
    }
    if (nextProps.HyperledgerConnect.data) {
      this.state.channelData.status = JSON.stringify(nextProps.HyperledgerConnect.data, null, 4);
      this.setState({
        channelData: this.state.channelData
      });
    }
    if (nextProps.NetworkPeerList.data && nextProps.NetworkPeerList.data.peers && this.state.channelData.network != "") {
      this.setState({
        networkPeerList: nextProps.NetworkPeerList.data.peers
      });
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['BLCHN_TYPE']));

    if (this.props.id !== "NEW") {

      this.props.actions.generalProcess(constants.getChannelConfigByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
  }
  ActionHandlers({ actionName, index }) {
    switch (actionName) {

      case "Join Channel":
        if (index > -1) {
          if (this.state.channelData.channelName.trim() == '') {
            alert("channelName is required");
            return;
          }

          if (this.state.channelData.networkName == '') {
            alert("network is required");
            return;
          }
          this.state.channelData.status = "========================JOIN REQUEST SENT=============================="
          this.setState({ status: this.state.channelData });
          let data = {
            "function": "0006",
            "network": this.state.channelData.networkName,
            "channelName": this.state.channelData.channelName.trim(),
            "peerList": [this.state.networkPeerList[index].requests.replace("grpcs://", '')],
          }
          this.props.actions.generalProcess(constants.hyperledgerConnect, data);
        }
        break;
      default:
        break;
    }
  }
  createChannel(e) {

    if (this.state.channelData.channelName.trim() == '') {
      alert("channelName is required");
      return;
    }

    if (this.state.channelData.networkName == '') {
      alert("network is required");
      return;
    }
    if (!this.state.documents) {
      alert("network config tx is required");
      return;
    }
    if (this.state.documents.length && this.state.documents.length != 0) {
      this.state.channelData.status = "========================CREATE REQUEST SENT=============================="
      this.setState({ status: this.state.channelData });
      let data = {
        "function": "0003",
        "network": this.state.channelData.networkName,
        "channelName": this.state.channelData.channelName.trim(),
        "channelConfigPath": this.state.documents[0].retreivalPath
      }
      this.props.actions.generalProcess(constants.hyperledgerConnect, data);
    } else {
      alert("network config tx is required");
      return;
    }
  }
  formSubmit(e) {
    if (this.state.channelData.type.trim() == '') {
      alert("Blockchain Type is required");
      return;
    }
    if (this.state.channelData.channelName.trim() == '') {
      alert("channelName is required");
      return;
    }

    if (this.state.channelData.networkName == '') {
      alert("network is required");
      return;
    }

    let orgList = []
    this.state.orgTypeList.forEach(element => {
      if (_.get(element, 'isChecked', false) === true)
        orgList.push(element.value)
    });
    if (orgList.length === 0) {
      alert("atleast one orginization is required");
      return;
    }
    let data = _.cloneDeep(this.state.channelData);
    data.documents = this.state.documents
    data.orgList = orgList
    this.props.actions.generalProcess(constants.updateChannelConfig, data)

  }
  onInputChangeCbl = (e) => {
    let value = $("#" + e.target.name).is(":checked");
    let index = e.target.name.split("-")[1];
    this.state.orgTypeList[index].isChecked = value;
    this.setState({
      networkTypeList: this.state.networkTypeList
    })
  }


  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    if (e.target.name == 'type') {
      this.props.actions.generalProcess(constants.getNetworkTypeList, { type: value });
    }
    this.state.channelData[e.target.name] = value;

    this.setState({
      channelData: this.state.channelData
    })
  }
  onInputNetwork = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let text = $("#" + e.target.name + " option:selected").text()
    this.state.channelData[e.target.name] = value;
    this.state.channelData['networkName'] = text;
    let data = {
      "_id": value
    }
    if (this.state.channelData.type != "Quorum") {
      this.props.actions.generalProcess(constants.getPeerList, data);
    }
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
    if (this.state.channelData.type == "Quorum")
      return (
        <CreateChannelFormQuorum initState={this.state} flag={this.props.id != "NEW"} onInputChangeCbl={this.onInputChangeCbl} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} updateState={this.updateState} onInputNetwork={this.onInputNetwork} formSubmit={this.formSubmit} createChannel={this.createChannel} />
      );
    else
      return (
        <CreateChannelForm initState={this.state} flag={this.props.id != "NEW"} onInputChangeCbl={this.onInputChangeCbl} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} updateState={this.updateState} onInputNetwork={this.onInputNetwork} formSubmit={this.formSubmit} createChannel={this.createChannel} />
      );
  }
  // else
  //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}

CreateChannel.propTypes = {
  NetworkTypeData: PropTypes.object,
  NetworkPeerList: PropTypes.object,
  HyperledgerConnect: PropTypes.object,
  AddUpdateChannel: PropTypes.object,
  typeData: PropTypes.object,
  children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
  return {
    NetworkTypeData: state.app.NetworkTypeData,
    NetworkPeerList: state.app.NetworkPeerList,
    AddUpdateChannel: state.app.AddUpdateChannel,
    HyperledgerConnect: state.app.HyperledgerConnect,
    typeData: state.app.typeData,
    id: ownProps.params.id,
  };
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
