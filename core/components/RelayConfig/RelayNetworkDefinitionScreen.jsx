/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import RelayConfig from './RelayConfigDefinationForm.jsx';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  networkConfig: {
    "networkName": "",
    "orginizationAlias": "",

    "orgList": []
  },
  typeData: undefined,
  isEdit: false,
  isLoading: true,
  isCustom: true,
  entityList:[]
};
class RelayNetworkDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeOrderer = this.onInputChangeOrderer.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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
      _.isEmpty(data.orginizationAlias)
    ) {
      alert("All fields are required");
      return false;
    }

    if (data.orgList && data.orgList.length == 0) {
      alert("atlest 1 Org is required");
      return false;
    }

    this.props.actions.generalProcess(constants.updateRelayNetworkConfig, data);



  }

  addPeer = (e) => {

    let orgCode = document.getElementById('orgCode') == null ? "" : document.getElementById('orgCode').value;
    let ServerName = document.getElementById('ServerName') == null ? "" : document.getElementById('ServerName').value;
    let requestURL = document.getElementById('requestURL') == null ? "" : document.getElementById('requestURL').value;
    let cacertificate = document.getElementById('cacertificate') == null ? "" : document.getElementById('cacertificate').value;
    let chaincertificate = document.getElementById('chaincertificate') == null ? "" : document.getElementById('chaincertificate').value;
    let privatekey = document.getElementById('privatekey') == null ? "" : document.getElementById('privatekey').value;
    let nlbType = document.getElementById('nlbType') == null ? "" : document.getElementById('nlbType').value;
    let isServer = document.getElementById('isServer') == null ? "" : document.getElementById('isServer').value;


    if (
      _.isEmpty(orgCode) ||
      _.isEmpty(ServerName) ||
      _.isEmpty(requestURL) ||
      _.isEmpty(cacertificate)||
      _.isEmpty(chaincertificate)||
      _.isEmpty(privatekey)
    ) {
      alert("All fields are required");
      return false;
    }

    let netConf = _.cloneDeep(this.state.networkConfig);
    let tupple = {
      "orgCode": orgCode,
      "requests": requestURL,
      "server_hostname": ServerName,
      "cacertificate": cacertificate,
      "chaincertificate": chaincertificate,
      "privatekey": privatekey,
      "nlbType":nlbType||'PRIMARY',
      "isServer":isServer,
      "actions": [
        { "label": "Delete Endpoint", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit Endpoint", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    if (this.containsObjectPeer(tupple, netConf.orgList) === false) {
      this.clearFieldsPeer()

      netConf.orgList.push(tupple);
      this.setState({
        networkConfig: netConf
      })
    } else {
      alert("Endpont Already Exists!!")
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
        obj.orgCode == refObj.orgCode ||
        obj.requests == refObj.requests
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
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['NLB_Type', 'BLCHN_TYPE', 'ORG_TYPES']));
    this.props.actions.generalProcess(constants.getEntityList, {"action":"entityList","searchCriteria":{},"page":{"currentPageNo":1,"pageSize":1000}});
    if (this.props.id !== "NEW") {

      this.props.actions.generalProcess(constants.getRelayNetworkConfigByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }

  }



  componentWillReceiveProps(nextProps) {


    if(nextProps.entityList){
      let elist=[];
      nextProps.entityList.forEach((elem)=>{
        elist.push({
          label:elem.spCode,
          value:elem.spCode
        })
      })
      this.setState({
        entityList: elist
      });
    }
    if (this.props.id === "NEW") {
      this.setState({
        networkConfig: _.cloneDeep(initialState.networkConfig)
      });
    }
    if (this.props.id !== "NEW" && nextProps.AddUpdateRelayNetwork.data) {
      console.log(JSON.stringify(nextProps.AddUpdateRelayNetwork.data))
      this.setState({
        networkConfig: nextProps.AddUpdateRelayNetwork.data.RelayNetworkConfig
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

      return (<RelayConfig flag={this.props.id !== "NEW"} onSubmit={this.onSubmit} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} addPeer={this.addPeer} addUser={this.addUser} onInputChangeOrderer={this.onInputChangeOrderer} typeData={this.state.typeData} entityList={this.state.entityList} state={this.state.networkConfig} />)

  }
  ActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit Endpoint":
        if (index > -1) {
          let b = this.state.networkConfig.orgList[index];
          document.getElementById('orgCode').value = _.get(b, 'orgCode', '');
          document.getElementById('ServerName').value = _.get(b, 'server_hostname', '');
          document.getElementById('requestURL').value = _.get(b, 'requests', '');
          document.getElementById('nlbType').value = _.get(b, 'nlbType', '');
          document.getElementById('cacertificate').value = _.get(b, 'cacertificate', '');
          document.getElementById('chaincertificate').value = _.get(b, 'chaincertificate', '');
          document.getElementById('privatekey').value = _.get(b, 'privatekey', '');
          document.getElementById('isServer').value = _.get(b, 'isServer', '');

          let tempState = this.state.networkConfig;
          tempState.orgList.splice(index, 1);
          this.setState({ isEdit: true, networkConfig: tempState });
        }
        break;
      case "Delete Endpoint":
        let resultdel = confirm("Are you you want to delete endpoint?");
        if (resultdel) {
          if (index > -1) {
            let tempState = this.state.networkConfig;
            tempState.orgList.splice(index, 1);
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


RelayNetworkDefinitionScreen.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  AddUpdateRelayNetwork: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    AddUpdateRelayNetwork: _.get(state.app, 'AddUpdateRelayNetwork',undefined),
    entityList: _.get(state.app, 'entityList.data.searchResult',undefined),
    typeData: state.app.typeData,
    id: ownProps.params.id,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
RelayNetworkDefinitionScreen.displayName = "RelayNetworkDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(RelayNetworkDefinitionScreen);

