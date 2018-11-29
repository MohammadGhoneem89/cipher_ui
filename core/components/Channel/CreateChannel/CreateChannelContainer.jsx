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
import CreateChannelForm from './CreateChannelForm.jsx'
const initialState = {
  CreateChannel: {
    "Channel Name":"",
    "Channel Channel":"",
    "Channel Status":"",
    "Network":""
  },
 
  typeData: {},
   dropDownItems:[],
    isLoading: true,
};

class CreateChannel extends React.Component {

  constructor(props) {
    super(props);
    // this.formSubmit = this.formSubmit.bind(this);
    // this.addRow = this.addRow.bind(this);
    // this.ActionHandlers = this.ActionHandlers.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    // this.state = cloneDeep(initialState)
  }
  componentWillMount() {
    // this.fetchListData(1);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.sampleListData !== nextProps.sampleListData) {
    //   this.setState({
    //     isLoading: false
    //   });
    // }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  pageChanged(pageNo) {
    // this.setState({ currentPageNo: pageNo });
    // this.fetchListData(pageNo);
  }
  formSubmit(e) {
    // let data = cloneDeep(this.state.APIDefinitionAddUpdate);
    // if (data.route.trim() == "") {
    //   alert("route must be defined");
    //   return false;
    // }
    // if (data.useCase.trim() == "") {
    //   alert("useCase must be defined");
    //   return false;
    // }
    // if (data.isRouteOveride === true) {
    //   if (data.fieldName.trim() == "") {
    //     alert("Overide field Name must be defined!");
    //     return false;
    //   }
    // }
    // if (data.isCustomMapping === false) {
    //   if (data.communicationMode === "REST" && (data.ServiceURL.trim() == "")) {
    //     alert("ServiceURL must be defined!");
    //     return false;
    //   }
    //   if (data.communicationMode === "QUEUE" && (data.requestServiceQueue.trim() == "" || data.responseQueue.trim() == "")) {
    //     alert("Request and Response Queue must be defined!");
    //     return false;
    //   }
    // }


    // if (data.isSimulated === true) {
    //   if (this.state.simucases.length == 0) {
    //     alert("Simulator Rules must be defined!");
    //     return false;
    //   }
    // }

    // data.RequestMapping = (data.RequestMapping === "" ? this.state.MappingConfigList.REQUEST[0].value : data.RequestMapping);
    // data.ResponseMapping = (data.ResponseMapping === "" ? this.state.MappingConfigList.RESPONSE[0].value : data.ResponseMapping);
    // data.simucases = this.state.simucases;
    // console.log(JSON.stringify(data));
    // this.props.actions.generalProcess(constants.upsertAPIDefinition, data);


  }
  onInputChange = (e) => {

    // let value;
    // if (e.target.name.indexOf('is') === 0) {
    //   value = $("#" + e.target.name).is(":checked");
    // } else {
    //   value = e.target.value;
    // }
    // this.state.APIDefinitionAddUpdate[e.target.name] = value;
    // this.setState({
    //   [e.target.name]: value
    // })
  }
  submit = () => {
    // this.setState({ formSubmitted: true });
  }
  render() {
    // if (this.state.isLoading) {
    //   return (<div className="loader">isLoading...</div>)
    // }
    return (

     <CreateChannelForm/>
     );
  }
  // else
  //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}


function mapStateToProps(state, ownProps) {
  return {


  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
