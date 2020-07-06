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

    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
      "currentPageNo": 1,
      "pageSize": 1
    }));
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
    $(".chb").change(function () {
      $(".chb").prop('checked', false);
      $(this).prop('checked', true);
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.typeData && nextProps.orgTypes && nextProps.entityNames) {
      let entityMap = {}
      nextProps.entityNames.forEach((elem) => {
        let elemEnt = _.get(entityMap, elem.orgType, []);

        elemEnt.push({
          "label": elem.value,
          "value": elem.value
        })
        _.set(entityMap, elem.orgType, elemEnt);
      })


      this.setState({
        orgTypes: nextProps.orgTypes,
        entityMap: entityMap,
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
    let Container = _.cloneDeep(this.state.Container);
    if (e.target.id == 'group') {
      let values = $('#group').val();
      _.set(Container, e.target.id, values)
    } else {
      _.set(Container, e.target.id, value)
    }
    // this.state.networkConfig[e.target.name] = e.target.name;
    console.log(JSON.stringify(Container))
    this.setState({
      Container: Container
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


  add = (e) => {

    let isRevokable = $("#isRevokable").is(":checked") || false;
    let orgCode = document.getElementById('orgCode') == null ? "" : document.getElementById('orgCode').value;
    let orgType = document.getElementById('orgType') == null ? "" : document.getElementById('orgType').value;


    if (
      _.isEmpty(orgCode) ||
      _.isEmpty(orgType)
    ) {
      alert("All fields are required");
      return false;
    }

    let tupple = {
      orgCode,
      orgType,
      isRevokable,
      "actions": [
        {label: "Move UP", iconName: "fa fa-arrow-up", actionType: "COMPONENT_FUNCTION"},
        {label: "Move Down", iconName: "fa fa-arrow-down", actionType: "COMPONENT_FUNCTION"},
        {"label": "edit", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION"},
        {"label": "delete", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION"}
      ]
    }

    if (this.containsObject(tupple, this.state.List) === false) {
      this.clearFieldsPeer()
      let List = _.cloneDeep(this.state.List);
      List.push(tupple)
      this.setState({List: List})
    } else {
      alert("Code Already Exists!!")
    }
  }

  containsObject(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.orgCode == refObj.orgCode &&
        obj.orgType == refObj.orgType
      ) {
        return true;
      }
    }

    return false;
  }

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('input:checkbox').prop('checked', false);
    $('#form').find('textarea').val('');
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
      case "Move UP":
        if (index > 0) {
          let newConfig = this.state.List;
          let prev = newConfig[index - 1];
          newConfig[index - 1] = newConfig[index]
          newConfig[index] = prev
          this.setState({List: newConfig});
        }
        break;
      case "Move Down":
        if (index + 1 <= this.state.List.length) {
          let newConfig = this.state.List;
          let next = newConfig[index + 1];
          newConfig[index + 1] = newConfig[index]
          newConfig[index] = next
          this.setState({List: newConfig});
        }
        break;
      case "edit":
        if (index > -1) {
          let b = this.state.List[index];
          $("#isRevokable").prop('checked', _.get(b, 'isRevokable', false));
          document.getElementById('orgCode').value = _.get(b, 'orgCode', '');
          document.getElementById('orgType').value = _.get(b, 'orgType', '');

          let tempState = this.state.List;
          tempState.splice(index, 1);
          this.setState({List: tempState});
        }
        break;
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
    entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
    orgTypes: _.get(state.app, 'typeData.data.ORG_TYPES', undefined),
    id: ownProps.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

Container.displayName = "Consent Profile";
export default connect(mapStateToProps, mapDispatchToProps)(Container);

