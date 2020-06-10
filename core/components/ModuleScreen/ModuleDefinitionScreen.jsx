/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import ModuleDefinationForm from './ModuleDefinationForm.jsx';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  AddUpdateModule: {
    "_id": "",
    "useCase": "",
    "value": "",
    "type": "",
    "label": "",
    "iconName": "",
    "displayMenu": false,
    "order": 1,
    "children": []
  },
  elementList: [],
  apiList: [],
  elementMap: {},
  MappingConfigList: {},
  typeData: {},
  apiItems: [],
  isEdit: false,
  isLoading: true,
  isCustom: true
};
class ModuleDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addRowApi = this.addRowApi.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = cloneDeep(initialState)

  }

  componentWillMount() {

  }
  addRow() {
    let pageType = document.getElementById('pageType') == null ? "" : document.getElementById('pageType').value;
    let pageURI = document.getElementById('pageURI') == null ? "" : document.getElementById('pageURI').value;
    let pageIconName = document.getElementById('pageIconName') == null ? "" : document.getElementById('pageIconName').value;
    let pageLabel = document.getElementById('pageLabel') == null ? "" : document.getElementById('pageLabel').value;
    let labelName = document.getElementById('labelName') == null ? "" : document.getElementById('labelName').value;

    let pageValue = document.getElementById('pageValue') == null ? "" : document.getElementById('pageValue').value;
    let pageActionType = document.getElementById('pageActionType') == null ? "" : document.getElementById('pageActionType').value;
    let parentValue = document.getElementById('parentVal') == null ? "" : document.getElementById('parentVal').value;
    let pageDisplayMenu = $("#pageDisplayMenu").is(":checked");
    let URI = []
    if (parentValue == pageValue) {
      alert("circular reference not allowed!")
      return false;
    }
    this.state.apiList.forEach((elem) => {
      URI.push(elem.API)
    })
    if (
      pageType.trim() == "" ||
      pageLabel.trim() == "" ||
      pageValue.trim() == ""
    ) {
      alert("Label and Value Field should be defined!")
      return false;
    }
    if (pageType.trim() == "page" && pageURI.trim() == "") {
      alert("UI URI Field should be defined!")
      return false;
    }
    if (pageType.trim() == "page") {
      parentValue = this.state.AddUpdateModule.value
    } else {
      let item = this.state.elementMap[parentValue]
      if (!item) {
        alert("invalid parent id!")
        return false;
      } else if (item.type == "componentAction") {
        alert("componentAction cannot be a parent!")
        return false;
      } else if ((item.type == pageType) || (parentValue == pageValue)) {
        alert("circular reference not allowed!")
        return false;
      } else if (item.type == "component" && pageType != "componentAction") {
        alert("parent reference invalid!")
        return false;
      } else if (item.type == "page" && (pageType != "pageAction" && pageType != "component")) {
        alert("parent reference invalid!")
        return false;
      }

    }
    let newState = this.state.elementMap
    let data = _.get(this.state.elementMap, pageValue, null);
    let dataNew = {};
    if (this.state.isEdit == false && data) {
      alert("Permission ID already exists!")
      return false;
    } else if (data) {
      _.set(data, 'iconName', pageIconName);
      _.set(data, 'pageURI', pageURI);
      _.set(data, 'label', pageLabel);
      _.set(data, 'labelName', labelName);

      _.set(data, 'actionType', pageActionType);
      _.set(data, 'displayMenu', pageDisplayMenu);
      _.set(data, 'URI', URI);
      _.set(newState, pageValue, data);
      this.clearFields();
      this.setState({ elementMap: newState, apiList: [] });
      alert("Updated!")
    } else {
      _.set(dataNew, 'value', pageValue);
      _.set(dataNew, 'type', pageType);
      _.set(dataNew, 'iconName', pageIconName);
      _.set(dataNew, 'pageURI', pageURI);
      _.set(dataNew, 'label', pageLabel);

      _.set(dataNew, 'labelName', labelName);
      _.set(dataNew, 'actionType', pageActionType);
      _.set(dataNew, 'displayMenu', pageDisplayMenu);
      _.set(dataNew, 'parent', parentValue);
      _.set(dataNew, 'URI', URI);
      _.set(newState, pageValue, dataNew);
      this.clearFields();
      this.setState({ elementMap: newState, apiList: [] });
      alert("inserted!")
    }
    console.log(JSON.stringify(newState));
    document.getElementById('pageValue').disabled = false;
    document.getElementById('pageType').disabled = false;
    document.getElementById('parentVal').disabled = false;
    let elementList = []
    for (let key in newState) {
      let parent = _.get(newState, newState[key].parent, null);
      elementList.push({
        value: newState[key].value || "",
        type: newState[key].type || "",
        label: newState[key].label || "",
        parent: parent ? parent.label : "",
        parentVal: newState[key].parent || "",
        displayMenu: newState[key].displayMenu || false,
        actions: [
          { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
          { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
        ]
      })
    }
    const OrderedArray = _.sortBy(elementList, o => o.type)
    this.setState({ isEdit: false, elementList: OrderedArray });
  }
  addRowApi() {
    let api = "";
    let customApiUri = document.getElementById('customApiUri') == null ? "" : document.getElementById('customApiUri').value;
    let listedApi = document.getElementById('listedApi') == null ? "" : document.getElementById('listedApi').value;
    if (listedApi === "C") {
      api = customApiUri
    } else {
      api = listedApi
    }

    if (api.trim() === "") {
      alert("Api must be defined");
      return false;
    }
    let data = this.state.apiList;

    let newtupple = {
      API: api,
      actions: [{ label: "DeleteAPI", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }],
    }
    if (!this.containsObject(newtupple, data)) {

      data.push(newtupple);
      this.setState({ apiList: data });
      this.clearFieldsAPI();
    } else {
      alert("Api already exist!!");
    }
  }
  containsObject(refObj, list) {

    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      if (
        obj.API == refObj.API
      ) {
        return true;
      }
    }

    return false;
  }
  componentDidMount() {
    this.props.actions.generalProcess(constants.getAPIList);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['MDAU_TYPE', 'MDAU_ICON', 'ORG_TYPES', 'MDAU_ACTION']));
    //if (this.props.useCase !== "NEWCASE" && this.props.route !== "NEWROUTE") {
    // let req = {
    //  useCase: this.props.useCase,
    //  route: this.props.route
    //}
    //console.log(req)
    this.props.actions.generalProcess(constants.getModuleConfigByID, {
      "_id": this.props.id
    });
    //}
  }

  clearFieldsAPI() {
    $('#apiDefination').find('input:text').val('');
    $('#apiDefination').find('textarea').val('');
    $('#apiDefination').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }
  clearFields() {
    $('#moduleDefination').find('input:text').val('');
    $('#moduleDefination').find('textarea').val('');
    $('#moduleDefination').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ApiListCombo.data) {
      this.setState({
        apiItems: cloneDeep(nextProps.ApiListCombo.data.ApiList)
      });
    }
    if (nextProps.AddUpdateModule.data) {
      let data = cloneDeep(nextProps.AddUpdateModule.data.ModuleConfig);
      let elementList = [];
      let elementMap = {}
      data.children && data.children.forEach(page => {
        _.set(elementMap, page.value, _.omit(page, 'children'))
        _.set(elementMap, page.value + '.parent', data.value);
        page.children && page.children.forEach(component => {
          _.set(elementMap, component.value, _.omit(component, 'children'))
          _.set(elementMap, component.value + '.parent', page.value);
          component.children && component.children.forEach(cactions => {
            _.set(elementMap, cactions.value, _.omit(cactions, 'children'));
            _.set(elementMap, cactions.value + '.parent', component.value);
          });
        });
      });

      for (let key in elementMap) {
        let parent = _.get(elementMap, elementMap[key].parent, null);
        elementList.push({
          value: elementMap[key].value || "",
          type: elementMap[key].type || "",
          label: elementMap[key].label || "",
          labelName: elementMap[key].labelName || "",
          parent: parent ? parent.label : "",
          parentVal: elementMap[key].parent || "",
          displayMenu: elementMap[key].displayMenu || false,
          actions: [
            { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
            { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
          ]
        })
      }
      const OrderedArray = _.sortBy(elementList, o => o.type)
      console.log(JSON.stringify(elementList, null, 4));
      this.setState({
        elementList: OrderedArray,
        elementMap: elementMap,
        AddUpdateModule: cloneDeep(nextProps.AddUpdateModule.data.ModuleConfig)
      });
    } else {
      this.setState({
        AddUpdateModule: cloneDeep(initialState.AddUpdateModule)
      });
    }

    if (nextProps.typeData.data && nextProps.typeData.data.MDAU_TYPE) {
      this.setState({
        typeData: nextProps.typeData.data,
        isLoading: false
      });
    }
  }


  formSubmit(e) {
    let data = cloneDeep(this.state.AddUpdateModule);
    if (data.label.trim() == "") {
      alert("label must be defined");
      return false;
    }
    if (data.useCase.trim() == "") {
      alert("useCase must be defined");
      return false;
    }
    if (data.value.trim() == "") {
      alert("value must be defined");
      return false;
    }

    let obj = {
      pageID: [],
      childernID: [],
      grandChilderenID: []
    }
    this.state.elementList.forEach(element => {
      if (element.type === "page") {
        obj.pageID.push({ value: element.value, parent: element.parentVal })
      } else if (element.type === "component" || element.type === "pageAction") {
        obj.childernID.push({ value: element.value, parent: element.parentVal })
      } else {
        obj.grandChilderenID.push({ value: element.value, parent: element.parentVal })
      }
    });

    let elemList = cloneDeep(this.state.elementMap);

    obj.grandChilderenID.forEach(element => {
      let tempParentChildern = _.get(elemList, `${element.parent}.children`, []);
      let tempChild = _.get(elemList, element.value, null);
      tempParentChildern.push(tempChild)
      tempChild && _.set(elemList, `${element.parent}.children`, tempParentChildern);
    });
    obj.childernID.forEach(element => {
      let tempParentChildern = _.get(elemList, `${element.parent}.children`, []);
      let tempChild = _.get(elemList, element.value, null);
      tempParentChildern.push(tempChild)
      tempChild && _.set(elemList, `${element.parent}.children`, tempParentChildern);
    });

    let children = []
    obj.pageID.forEach(element => {
      let tempChild = _.get(elemList, element.value, null);
      children.push(tempChild);
    });
    children && _.set(data, `children`, children);
    console.log(JSON.stringify(data));
    this.props.actions.generalProcess(constants.updateModuleConfig, data);
  }

  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.AddUpdateModule[e.target.name] = value;
    this.setState({
      [e.target.name]: value
    })
  }
  submit = () => {
    this.setState({ formSubmitted: true });
  }
  render() {


    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (
      <ModuleDefinationForm onSubmit={this.formSubmit} addRowApi={this.addRowApi} initialValues={this.state.AddUpdateModule} typeData={this.state.typeData} onInputChange={this.onInputChange} addRow={this.addRow} state={this.state} ActionHandlers={this.ActionHandlers} />)
  }
  ActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        if (index > -1) {
          let a = this.state.elementList[index];
          let b = _.get(this.state.elementMap, a.value, null);
          //alert(JSON.stringify(b))
          document.getElementById('pageType').value = _.get(b, 'type', '');
          document.getElementById('pageURI').value = _.get(b, 'pageURI', '');
          document.getElementById('pageIconName').value = _.get(b, 'iconName', '');
          document.getElementById('pageLabel').value = _.get(b, 'label', '');
          document.getElementById('pageValue').value = _.get(b, 'value', '');
          document.getElementById('labelName').value = _.get(b, 'labelName', '');
          document.getElementById('pageActionType').value = _.get(b, 'actionType', '');
          document.getElementById('pageDisplayMenu').checked = _.get(b, 'displayMenu', false);
          document.getElementById('parentVal').value = _.get(b, 'parent', false);
          document.getElementById('pageValue').disabled = true;
          document.getElementById('pageType').disabled = true;
          document.getElementById('parentVal').disabled = true;
          
          //$("#pageDisplayMenu").checked( _.get(b, 'displayMenu', false))
          let URI = _.get(b, 'URI', false);
          let apiList = [];
          URI && URI.forEach((elem) => {
            apiList.push({
              API: elem,
              actions: [{ label: "DeleteAPI", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }],
            })
          })
          let tempState = this.state.elementList;
          tempState.splice(index, 1);
          this.setState({ isEdit: true, apiList: apiList, elementList: tempState });
        }
        break;
      case "Delete":
        let resultdel = confirm("Are you you want to delete?");
        if (resultdel) {
          if (index > -1) {
            let a = this.state.elementList;
            let item = this.state.elementList[index];
            let litmus = true;
            a.forEach((elem, ind) => {
              if (elem.parentVal == item.value) {
                alert("Could not delete this object has dependets!!!");
                litmus = false;
              }
            })
            if (litmus === true) {
              let elemMap = this.state.elementMap;
              elemMap = _.omit(elemMap, item.value)
              a.splice(index, 1);
              this.setState({ elementMap: elemMap, elementList: a });
            }
          }
        }
        break;
      case "DeleteAPI":
        let result = confirm("Are you you want to delete?");
        if (result) {
          if (index > -1) {
            let a = this.state.apiList;
            a.splice(index, 1);
            this.setState({ apiList: a });
          }
        }
        break;
      default:
        break;
    }
  }
}


ModuleDefinitionScreen.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  AddUpdateModule: PropTypes.object,
  MappingConfigData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    ApiListCombo: state.app.ApiListCombo,
    AddUpdateModule: state.app.AddUpdateModule,
    typeData: state.app.typeData,
    id: ownProps.params.id,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
ModuleDefinitionScreen.displayName = "ModuleDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(ModuleDefinitionScreen);

