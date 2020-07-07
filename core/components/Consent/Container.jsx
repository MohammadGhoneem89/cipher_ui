/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import Form from './Form.jsx';

import cloneDeep from 'lodash/cloneDeep';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

const initialState = {
  Container: {},
  List: [],
  typeData: undefined,
  groupList: [],
  columnList: [],
  resultSet: [],
  isEdit: false,
  isLoading: true,
  isCustom: true,
  loadedOnce: false,
  gridLoading: false,
  getEndpointListView: [],
  text: "Please wait while your request is being processed."
};

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = cloneDeep(initialState);
  }

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }


  componentDidMount() {



    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES'])); // Org types (entities)
    if (this.props.id !== "NEW") {
      this.props.actions.generalProcess(constants.getADHReportByID, {
        "_id": this.props.id //"5bf9c9df4cb0c690e4461b89"
      });
    }
    this.setState({
      loadedOnce: false,
      gridLoading: false
    })
  }

  componentWillMount() {
    this.props.actions.updateStore({
      Container: {}
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.typeData) {
      this.setState({
        typeData: nextProps.typeData,
        isLoading: false
      });
    }
    if (nextProps.Container) {
      this.setState({
        Container: nextProps.Container
      });
    }
  }

  onInputChange = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let reportContainer = _.cloneDeep(this.state.reportContainer);
    if (e.target.id == 'group') {
      let values = $('#group').val();
      _.set(reportContainer, e.target.id, values)
    } else {
      _.set(reportContainer, e.target.id, value)
    }
    // this.state.networkConfig[e.target.name] = e.target.name;
    console.log(JSON.stringify(reportContainer))
    this.setState({
      reportContainer: reportContainer
    })
  }

  submit = (e) => {

    let Container = _.cloneDeep(this.state.Container);
    if (
      _.isEmpty(Container.ownerOrgType) ||
      _.isEmpty(Container.documentType) ||
      _.isEmpty(Container.ownerOrgType) ||
      _.isEmpty(Container.description) ||
      _.isEmpty(Container.name)
    ) {
      alert("All fields are required");
      return false;
    }

    // this.props.actions.generalProcess(constants.updateADHReport, reportContainer);
  }


  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }

    return (<Form flag={this.state.update} ActionHandlers={this.ActionHandlers} addPeer={this.add}
                  typeData={this.state.typeData} isOwner={true} onInputChange={this.onInputChange}
                  onSubmit={this.submit} testQuery={this.test}
                  state={this.state}/>)

  }

  ActionHandlers({actionName, index}) {
    switch (actionName) {
      case "delete":
        if (index > -1) {
          let tempState = this.state.List;
          tempState.splice(index, 1);
          this.setState({List: tempState});
        }
        break;
      default:
        break;
    }
  }
}


Container.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    Container: _.get(state.app, 'documentContainer.data', undefined),
    typeData: _.get(state.app, 'typeData.data', []),
    id: ownProps.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

Container.displayName = "Add Document Type";
export default connect(mapStateToProps, mapDispatchToProps)(Container);

