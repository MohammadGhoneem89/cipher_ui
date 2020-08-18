/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import ErrorCode from './errorCodeForm.jsx';

import cloneDeep from 'lodash/cloneDeep';

const initialState = {

  errorCodeList: [],
  typeData: undefined,
  isEdit: false,
  isLoading: true,
  isCustom: true
};

class ErrorCodeList extends React.Component {

  constructor(props) {
    super(props)


    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.state = cloneDeep(initialState)


  }

  addPeer = (e) => {

    let code = document.getElementById('code') == null ? "" : document.getElementById('code').value;
    let description = document.getElementById('description') == null ? "" : document.getElementById('description').value;
    let descriptionAr = document.getElementById('descriptionAr') == null ? "" : document.getElementById('descriptionAr').value;

    if (
      _.isEmpty(code) ||
      _.isEmpty(description)
    ) {
      alert("All fields are required");
      return false;
    }

    let tupple = {
      code: code,
      description: description,
      descriptionAr: descriptionAr,
      bounce: this.state.errorCodeList,
      "actions": [
        { "label": "edit", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    if (this.containsObject(tupple, this.state.errorCodeList) === false) {
      this.clearFieldsPeer()
      this.props.actions.generalProcess(constants.updateErrorCodeList, tupple);
      this.setState({ update: false })
    } else {
      alert("Code Already Exists!!")
    }
  }


  containsObject(refObj, list) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.code == refObj.code
      ) {
        return true;
      }
    }

    return false;
  }

  clearFieldsPeer() {

    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');

  }


  componentDidMount() {
    this.props.actions.generalProcess(constants.getErrorCodeList);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errorCodeList) {
      nextProps.errorCodeList.forEach((elem) => {
        if (nextProps.isOwner == true) {
          elem.actions = [
            { "label": "edit", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
          ]
        }
      })
      this.setState({
        errorCodeList: nextProps.errorCodeList,
        isLoading: false
      });
    }
    if (nextProps.updateErrorCodeList && nextProps.updateErrorCodeList.status) {
      // let newList = this.state.errorCodeList || [];
      // newList.push({
      //   code: nextProps.updateErrorCodeList.bounce.code,
      //   description: nextProps.updateErrorCodeList.bounce.description,
      //   actions: [
      //     {"label": "edit", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION"}
      //   ]
      // });
      this.setState({
        errorCodeList: nextProps.updateErrorCodeList.bounce
      });
    }
  }


  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }

    return (<ErrorCode flag={this.state.update} ActionHandlers={this.ActionHandlers}
      onInputChange={this.onInputChange} addPeer={this.addPeer}
      typeData={this.state.typeData} isOwner={this.props.isOwner}
      state={this.state} />)

  }

  ActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "edit":
        if (this.props.isOwner) {
          if (index > -1) {
            let b = this.state.errorCodeList[index];
            document.getElementById('code').value = _.get(b, 'code', '');
            document.getElementById('description').value = _.get(b, 'description', '');
            document.getElementById('descriptionAr').value = _.get(b, 'descriptionAr', '');
            let tempState = this.state.errorCodeList;
            tempState.splice(index, 1);
            this.setState({ errorCodeList: tempState, update: true });
          }
        } else {
          alert('Cannot Edit');
        }
        break;
      default:
        break;
    }
  }
}


ErrorCodeList.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  AddUpdateNetwork: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    updateErrorCodeList: _.get(state.app, 'updateErrorCodeList.data', undefined),
    errorCodeList: _.get(state.app, 'ErrorCodeList.data.searchResult', []),
    isOwner: _.get(state.app, 'ErrorCodeList.data.isOwner', false)
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

ErrorCodeList.displayName = "Error Code List";
export default connect(mapStateToProps, mapDispatchToProps)(ErrorCodeList);

