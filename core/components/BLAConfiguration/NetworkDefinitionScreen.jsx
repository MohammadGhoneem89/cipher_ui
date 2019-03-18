/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import BLAConfig from './BLAConfigDefinationForm.jsx';
import BLAConfigQuorum from './BLAConfigDefinationFormQuorum.jsx';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  networkConfig: {
    "networkName": "",
    "orginizationAlias": "",
    "ca": "",
    "type": "",
    "username": "",
    "secret": "",
    "name": "",
    "mspid": "",
    "channelName": "",
    "orderer": {
      "url": "",
      "serverHostname": "",
      "tlsCacerts": ""
    },
    "peerList": [],
    "peerUser": []
  },
  typeData: undefined,
  isEdit: false,
  isLoading: true,
  isCustom: true
};
class NetworkDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeOrderer = this.onInputChangeOrderer.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitQuorum = this.onSubmitQuorum.bind(this);
    this.state = cloneDeep(initialState)
    

  }

  onInputChangeOrderer = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let netConf = _.cloneDeep(this.state.networkConfig);
    netConf.orderer[e.target.name] = value;
    this.setState({
      networkConfig: netConf
    })
  }
  onSubmit = (e) => {
    let data = cloneDeep(this.state.networkConfig);
    if (
      _.isEmpty(data.networkName) ||
      _.isEmpty(data.orginizationAlias) ||
      _.isEmpty(data.ca) ||
      _.isEmpty(data.username) ||
      _.isEmpty(data.secret) ||
      _.isEmpty(data.mspid) ||
      _.isEmpty(data.type)
    ) {
      alert("All fields are required");
      return false;
    }

    if (data.peerList && data.peerList.length == 0) {
      alert("atlest 1 peer is required");
      return false;
    }
    if (data.peerUser && data.peerUser.length == 0) {
      alert("atlest 1 user is required");
      return false;
    }

    this.props.actions.generalProcess(constants.updateNetworkConfig, data);

  }
  onSubmitQuorum = (e) => {
    let data = cloneDeep(this.state.networkConfig);
    if (
      _.isEmpty(data.networkName) ||
      _.isEmpty(data.orginizationAlias) ||
      _.isEmpty(data.mspid) ||
      _.isEmpty(data.type)
    ) {
      alert("All fields are required");
      return false;
    }

    if (data.peerList && data.peerList.length == 0) {
      alert("atlest 1 peer is required");
      return false;
    }
    if (data.peerUser && data.peerUser.length == 0) {
      alert("atlest 1 user is required");
      return false;
    }
    this.props.actions.generalProcess(constants.updateNetworkConfig, data);
  }
  addPeerQuorum = (e) => {

    let peerName = document.getElementById('peerName') == null ? "" : document.getElementById('peerName').value;
    let ServerName = document.getElementById('ServerName') == null ? "" : document.getElementById('ServerName').value;
    let requestURL = document.getElementById('requestURL') == null ? "" : document.getElementById('requestURL').value;
    let eventURL = document.getElementById('eventURL') == null ? "" : document.getElementById('eventURL').value;
    let nlbType = document.getElementById('nlbType') == null ? "" : document.getElementById('nlbType').value;

    if (
      _.isEmpty(peerName) ||
      _.isEmpty(ServerName) ||
      _.isEmpty(requestURL) ||
      _.isEmpty(eventURL) 
     
    ) {
      alert("All fields are required");
      return false;
    }

    let netConf = _.cloneDeep(this.state.networkConfig);
    let tupple = {
      "peerName": peerName,
      "requests": requestURL,
      "events": eventURL,
      "server_hostname": ServerName,
      "loadBalancingLevel": nlbType,
      "actions": [
        { "label": "Delete Peer", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit Peer", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }
    if (this.containsObjectPeer(tupple, netConf.peerList) === false) {
      this.clearFieldsPeer()
      netConf.peerList.push(tupple);

      this.setState({
        networkConfig: netConf
      })
    } else {
      alert("Peer Already Exists!!")
    }
  }


  addUserQuorum = (e) => {
    let username = document.getElementById('username') == null ? "" : document.getElementById('username').value;
    let userkey = document.getElementById('userkey') == null ? "" : document.getElementById('userkey').value;

    let netConf = _.cloneDeep(this.state.networkConfig);
    if (
      _.isEmpty(username) ||
      _.isEmpty(userkey)
    ) {
      alert("All fields are required");
      return false;
    }
    let tupple = {
      "userName": username,
      "key": userkey,
      "actions": [
        { "label": "Delete User", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit User", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    if (this.containsObject(tupple, netConf.peerUser) === false) {
      this.clearFieldsUser()
      netConf.peerUser.push(tupple);

      this.setState({
        networkConfig: netConf
      })
    } else {
      alert("User Already Exists!!")
    }
  }

  addPeer = (e) => {

    let peerName = document.getElementById('peerName') == null ? "" : document.getElementById('peerName').value;
    let ServerName = document.getElementById('ServerName') == null ? "" : document.getElementById('ServerName').value;
    let requestURL = document.getElementById('requestURL') == null ? "" : document.getElementById('requestURL').value;
    let eventURL = document.getElementById('eventURL') == null ? "" : document.getElementById('eventURL').value;
    let peercertificate = document.getElementById('peercertificate') == null ? "" : document.getElementById('peercertificate').value;

    let nlbType = document.getElementById('nlbType') == null ? "" : document.getElementById('nlbType').value;

    if (
      _.isEmpty(peerName) ||
      _.isEmpty(ServerName) ||
      _.isEmpty(requestURL) ||
      _.isEmpty(eventURL) ||
      _.isEmpty(peercertificate)
    ) {
      alert("All fields are required");
      return false;
    }

    let netConf = _.cloneDeep(this.state.networkConfig);
    let tupple = {
      "peerName": peerName,
      "requests": requestURL,
      "events": eventURL,
      "server_hostname": ServerName,
      "tls_cacerts": peercertificate,
      "loadBalancingLevel": nlbType,
      "actions": [
        { "label": "Delete Peer", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit Peer", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }
    if (this.containsObjectPeer(tupple, netConf.peerList) === false) {
      this.clearFieldsPeer()
      netConf.peerList.push(tupple);

      this.setState({
        networkConfig: netConf
      })
    } else {
      alert("Peer Already Exists!!")
    }
  }


  addUser = (e) => {
    let username = document.getElementById('username') == null ? "" : document.getElementById('username').value;
    let usercertificate = document.getElementById('usercertificate') == null ? "" : document.getElementById('usercertificate').value;
    let userkey = document.getElementById('userkey') == null ? "" : document.getElementById('userkey').value;

    let netConf = _.cloneDeep(this.state.networkConfig);
    if (
      _.isEmpty(username) ||
      _.isEmpty(usercertificate) ||
      _.isEmpty(userkey)
    ) {
      alert("All fields are required");
      return false;
    }
    let tupple = {
      "userName": username,
      "key": userkey,
      "cert": usercertificate,
      "actions": [
        { "label": "Delete User", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit User", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    if (this.containsObject(tupple, netConf.peerUser) === false) {
      this.clearFieldsUser()
      netConf.peerUser.push(tupple);

      this.setState({
        networkConfig: netConf
      })
    } else {
      alert("User Already Exists!!")
    }
  }
  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.networkConfig[e.target.name] = value;
    this.setState({
      [e.target.name]: value
    })
  }

  containsObjectPeer(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.peerName == refObj.peerName ||
        obj.requests == refObj.requests ||
        obj.events == refObj.events
      ) {
        return true;
      }
    }

    return false;
  }
  containsObject(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.userName == refObj.userName
      ) {
        return true;
      }
    }

    return false;
  }

  clearFieldsUser() {
    $('#userDefination').find('input:text').val('');
    $('#userDefination').find('textarea').val('');
    $('#userDefination').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });

  }
  clearFieldsPeer() {

    $('#peerDefination').find('input:text').val('');
    $('#peerDefination').find('textarea').val('');
    $('#peerDefination').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });

  }
  disableFileds() {
    $('#netconfig').find('input:text').attr("disabled", this.state.readOnly);
    $('#netconfig').find('textarea').attr("disabled", this.state.readOnly);
  }
  componentDidMount() {
    //this.props.actions.generalProcess(constants.getAPIList);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['NLB_Type', 'BLCHN_TYPE']));
    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getNetworkConfigByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }

  }



  componentWillReceiveProps(nextProps) {

    if (this.props.id === "NEW") {
      this.setState({
        networkConfig: _.cloneDeep(initialState.networkConfig)
      });
    }
    if (this.props.id !== "NEW" && nextProps.AddUpdateNetwork.data) {
      console.log(JSON.stringify(nextProps.AddUpdateNetwork.data.NetworkConfig))
      this.setState({
        networkConfig: nextProps.AddUpdateNetwork.data.NetworkConfig
      });
    }
    if (nextProps.typeData.data && nextProps.typeData.data.NLB_Type) {
      this.setState({
        typeData: nextProps.typeData.data,
        isLoading: false
      });
    }
  }



  render() {


    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    if (this.state.networkConfig.type == "Quorum")
      return (<BLAConfigQuorum flag={this.props.id !== "NEW"} onSubmit={this.onSubmitQuorum} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} addPeer={this.addPeerQuorum} addUser={this.addUserQuorum} onInputChangeOrderer={this.onInputChangeOrderer} typeData={this.state.typeData} state={this.state.networkConfig} />)
    else
      return (<BLAConfig flag={this.props.id !== "NEW"} onSubmit={this.onSubmit} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} addPeer={this.addPeer} addUser={this.addUser} onInputChangeOrderer={this.onInputChangeOrderer} typeData={this.state.typeData} state={this.state.networkConfig} />)

  }
  ActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit Peer":
        if (index > -1) {
          let b = this.state.networkConfig.peerList[index];
          document.getElementById('peerName').value = _.get(b, 'peerName', '');
          document.getElementById('ServerName').value = _.get(b, 'server_hostname', '');
          document.getElementById('requestURL').value = _.get(b, 'requests', '');
          document.getElementById('eventURL').value = _.get(b, 'events', '');
          try{
            document.getElementById('peercertificate').value = _.get(b, 'tls_cacerts', '');
          } catch(ex){

          }
         
          document.getElementById('nlbType').value = _.get(b, 'loadBalancingLevel', '');
          let tempState = this.state.networkConfig;
          tempState.peerList.splice(index, 1);
          this.setState({ isEdit: true, networkConfig: tempState });
        }
        break;
      case "Delete Peer":
        let resultdel = confirm("Are you you want to delete peer?");
        if (resultdel) {
          if (index > -1) {
            let tempState = this.state.networkConfig;
            tempState.peerList.splice(index, 1);
            this.setState({ networkConfig: tempState });
          }
        }
        break;
      case "Edit User":
        if (index > -1) {
          let b = this.state.networkConfig.peerUser[index];
          document.getElementById('username').value = _.get(b, 'userName', '');
          try{
            document.getElementById('usercertificate').value = _.get(b, 'cert', '');
          } catch(ex){
            
          }
         
          document.getElementById('userkey').value = _.get(b, 'key', '');
          let tempState = this.state.networkConfig;
          tempState.peerUser.splice(index, 1);
          this.setState({ isEdit: true, networkConfig: tempState });
        }
        break;
      case "Delete User":
        let resultdelusr = confirm("Are you you want to delete user?");
        if (resultdelusr) {
          if (index > -1) {
            let tempState = this.state.networkConfig;
            tempState.peerUser.splice(index, 1);
            this.setState({ networkConfig: tempState });
          }
        }
        break;
      default:
        break;
    }
  }
}


NetworkDefinitionScreen.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  AddUpdateNetwork: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    AddUpdateNetwork: state.app.AddUpdateNetwork,
    typeData: state.app.typeData,
    id: ownProps.params.id,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
NetworkDefinitionScreen.displayName = "NetworkDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(NetworkDefinitionScreen);

