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
import CreateConsortiumForm from './CreateConsortiumForm.jsx'
const initialState = {
  ConsortiumData: {
    "type": "",
    "ConsortiumName": ""
  }, ParticapantData: {
    "organizationName": "",
    "particapantType": "",
  },
  documents: [],
  typeData: {},
  isPeerLoaded: false,
  networkTypeList: [],
  orgTypeList: [],
  selectedOrgList: [],
  participants: [],
  channelTypeList: [],
  networkPeerList: [],
  selectedChannels: [],
  selectedUseCaseList: [],
  dropDownItems: [],
  readOnly: false,
  isLoading: true,
};

class CreateConsortium extends React.Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputParticapant = this.onInputParticapant.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.onInputChangeCbl = this.onInputChangeCbl.bind(this);
    this.onInputChangeUseCase = this.onInputChangeUseCase.bind(this);

    this.ActionHandlers = this.ActionHandlers.bind(this);


    this.state = cloneDeep(initialState)
  }
  componentWillMount() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ChannelTypeData.data) {
      //let selectedChannelList = []
      //this.state.channelTypeList.forEach(element => {
      //if (_.get(element, 'isChecked', false) === true)
      //  selectedChannelList.push(element.value)
      //});
      let newData = _.cloneDeep(nextProps.ChannelTypeData.data.channels)
      let newSelectedChannels = []
      newData.forEach(element => {
        if (this.state.selectedChannels.indexOf(element.value) > -1) {
          element = _.set(element, 'isChecked', true);
          newSelectedChannels.push(element.value)
        }
      });
      this.setState({
        channelTypeList: newData,
        selectedChannels: newSelectedChannels
      });
    }



    if (nextProps.NetworkTypeData.data) {
      let orgList = _.get(this.state.ConsortiumData, 'orgList', []);
      let orgTypeList = _.cloneDeep(nextProps.NetworkTypeData.data.orgList);
      orgTypeList.forEach(element => {
        if (orgList.indexOf(element.value) > -1) {
          element = _.set(element, 'isChecked', true)
        }
      });
      this.setState({
        networkTypeList: nextProps.NetworkTypeData.data.networks,
        orgTypeList: orgTypeList,
        type:this.state.ConsortiumData.type
      });
    }



    if (nextProps.typeData.data && nextProps.typeData.data.BLCHN_TYPE && nextProps.typeData.data.UseCase) {
      let typedata = _.cloneDeep(nextProps.typeData.data)
      let usecaseList = this.state.selectedUseCaseList;
      typedata.UseCase.forEach(element => {
        if (usecaseList.indexOf(element.value) > -1) {
          element = _.set(element, 'isChecked', true)
        }
      });
      this.setState({
        typeData: typedata,
        isLoading: false
      });
    }
    if (this.props.id == "NEW" && this.state.isPeerLoaded === false) {
      this.setState({
        networkPeerList: [],
        documents: [],
        selectedUseCaseList:[],
        selectedChannels:[],
        selectedOrgList:[],
        participants:[],
        ParticapantData:_.cloneDeep(initialState.ParticapantData),
        ConsortiumData: _.cloneDeep(initialState.ConsortiumData),
        isPeerLoaded: true
      });
    }
    if (nextProps.AddUpdateConsortium.data && nextProps.AddUpdateConsortium.data.ConsortiumConfig.ConsortiumName && this.props.id !== "NEW") {

      this.state.ConsortiumData._id = nextProps.AddUpdateConsortium.data.ConsortiumConfig._id
      this.state.ConsortiumData.type = nextProps.AddUpdateConsortium.data.ConsortiumConfig.type
      this.state.ConsortiumData.ConsortiumName = nextProps.AddUpdateConsortium.data.ConsortiumConfig.ConsortiumName
      let participants = nextProps.AddUpdateConsortium.data.ConsortiumConfig.participants;
      if (this.state.isPeerLoaded === false) {
        let orgList = [];
        participants.forEach(element => {
          element.actions = [
            { label: "Edit", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
            { label: "Remove", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
          ]
          orgList.push(element.organizationName);
        });
        this.props.actions.generalProcess(constants.getChannelTypeList, { "codeList": orgList });
      }
      this.setState({
        participants: participants,
        selectedChannels: nextProps.AddUpdateConsortium.data.ConsortiumConfig.selectedChannelList,
        selectedUseCaseList: nextProps.AddUpdateConsortium.data.ConsortiumConfig.selectedUseCaseList,
        ConsortiumData: this.state.ConsortiumData,
        isPeerLoaded: true
      });
    }
    if (nextProps.HyperledgerConnect.data) {
      this.state.ConsortiumData.status = JSON.stringify(nextProps.HyperledgerConnect.data, null, 4);
      this.setState({
        ConsortiumData: this.state.ConsortiumData
      });
    }
    if (nextProps.NetworkPeerList.data && nextProps.NetworkPeerList.data.peers && this.state.ConsortiumData.network != "") {
      this.setState({
        networkPeerList: nextProps.NetworkPeerList.data.peers
      });
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['BLCHN_TYPE', 'PATRICIPANT_TYPE', 'UseCase']));
    this.props.actions.generalProcess(constants.getNetworkTypeList);
    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getConsortiumConfigByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
  }

  addParticipant(e) {

    if (this.state.ParticapantData.organizationName.trim() == '') {
      alert("Particapant Org is required");
      return;
    }

    if (this.state.ParticapantData.particapantType == '') {
      alert("Particapant Type is required");
      return;
    }

    let data = _.cloneDeep(this.state.ParticapantData);
    data.actions = [
      { label: "Edit", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
      { label: "Remove", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
    ]
    this.state.participants.push(data)
    let orgList = []
    this.state.participants.forEach(element => {
      orgList.push(element.organizationName);
    });


    this.setState({ participants: this.state.participants, ParticapantData: _.cloneDeep(initialState.ParticapantData), selectedOrgList: orgList }, () => {
      this.props.actions.generalProcess(constants.getChannelTypeList, { "codeList": orgList });
    });
  }
  formSubmit(e) {
    if (this.state.ConsortiumData.type.trim() == '') {
      alert("Blockchain Type is required");
      return;
    }
    if (this.state.ConsortiumData.ConsortiumName.trim() == '') {
      alert("ConsortiumName is required");
      return;
    }

    if (this.state.participants.length == 0) {
      alert("at least one participant must be defined is required");
      return;
    }

    if (this.state.selectedChannels.length == 0) {
      alert("at least one channel should be selected");
      return;
    }

    if (this.state.selectedUseCaseList.length == 0) {
      alert("at least one buisness application should be selected");
      return;
    }


    let data = _.cloneDeep(this.state.ConsortiumData);
    let participants = _.cloneDeep(this.state.participants);
    participants.forEach(element => {
      delete element.actions;
    });
    data.participants = participants;
    data.selectedUseCaseList = this.state.selectedUseCaseList;
    data.selectedChannelList = this.state.selectedChannels;
    console.log(JSON.stringify(data))
    this.props.actions.generalProcess(constants.updateConsortiumConfig, data)

  }

  onInputChangeCbl = (e) => {
    let value = $("#" + e.target.name).is(":checked");
    let index = e.target.name.split("-")[1];
    let data = _.cloneDeep(this.state.channelTypeList);
    data[index].isChecked = value;
    let selectedChannelList = []
    data.forEach(element => {
      if (_.get(element, 'isChecked', false) === true)
        selectedChannelList.push(element.value)
    });

    this.setState({
      channelTypeList: data,
      selectedChannels: selectedChannelList
    })
  }
  onInputChangeUseCase = (e) => {
    let value = $("#" + e.target.name).is(":checked");
    let index = e.target.name.split("-")[1];
    this.state.typeData.UseCase[index].isChecked = value;
    let selectedUseCaseList = []
    this.state.typeData.UseCase.forEach(element => {
      if (_.get(element, 'isChecked', false) === true)
        selectedUseCaseList.push(element.value)
    });
    this.setState({
      selectedUseCaseList: selectedUseCaseList,
      typeData: this.state.typeData
    })
  }

  ActionHandlers({ actionName, index }) {

    switch (actionName) {
      case "Edit":
        if (index > -1) {
          let data = this.state.participants;
          let details = _.cloneDeep(data[index])
          data.splice(index, 1);
          this.setState({ ParticapantData: details, participants: data });
        }
        break;
      case "Remove":
        if (index > -1) {
          let data = this.state.participants;
          data.splice(index, 1);

          let orgList = []
          data.forEach(element => {
            orgList.push(element.organizationName);
          });
          this.setState({ participants: data, selectedOrgList: orgList }, () => {
            this.props.actions.generalProcess(constants.getChannelTypeList, { "codeList": orgList });
          });
        }
        break;
    }
  }
  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.ConsortiumData[e.target.name] = value;
    this.setState({
      [e.target.name]: value
    })
  }
  onInputParticapant = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let text = $("#" + e.target.name + " option:selected").text()
    this.state.ParticapantData[e.target.name] = value;
    this.setState({
      ParticapantData: this.state.ParticapantData
    })
  }
  updateState = (data) => {
    this.setState(data);
  }
  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (

      <CreateConsortiumForm initState={this.state} onInputChangeUseCase={this.onInputChangeUseCase} onInputChangeCbl={this.onInputChangeCbl} ActionHandlers={this.ActionHandlers} onInputChange={this.onInputChange} updateState={this.updateState} onInputParticapant={this.onInputParticapant} formSubmit={this.formSubmit} addParticipant={this.addParticipant} />
    );
  }
  // else
  //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}

CreateConsortium.propTypes = {
  ChannelTypeData: PropTypes.object,
  NetworkTypeData: PropTypes.object,
  NetworkPeerList: PropTypes.object,
  HyperledgerConnect: PropTypes.object,
  AddUpdateConsortium: PropTypes.object,
  typeData: PropTypes.object,
  children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
  return {
    ChannelTypeData: state.app.ChannelTypeData,
    NetworkTypeData: state.app.NetworkTypeData,
    NetworkPeerList: state.app.NetworkPeerList,
    AddUpdateConsortium: state.app.AddUpdateConsortium,
    HyperledgerConnect: state.app.HyperledgerConnect,
    typeData: state.app.typeData,
    id: ownProps.params.id,
  };
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}
CreateConsortium.displayName = "CreateConsortium";
export default connect(mapStateToProps, mapDispatchToProps)(CreateConsortium);
