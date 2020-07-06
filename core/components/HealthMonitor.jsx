import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/generalAction';
import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import Portlet from '../common/Portlet.jsx';
import Table from '../common/Datatable.jsx';
import * as utils from '../common/utils.js';

import Row from '../common/Row.jsx';
import Input from '../common/Input.jsx';
import Label from '../common/Lable.jsx';

const toaster = require('../common/toaster.js');
const flatten = require('flat')
import Combobox from '../common/Select.jsx';
import Col from '../common/Col.jsx';
import * as gen from '../common/generalActionHandler'
import _ from "lodash";

class HealthMonitorContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      serviceList: undefined,
      pageSize: 10,
      activePage: 1,
      isLoading: true,
      rulesList: [],
      fields: [],
      rules: [],
      routing: {}
    };
    this.generalHandler = gen.generalHandler.bind(this);
    this.addRouting = this.addRouting.bind(this);
    this.ActionHandlers = this.ActionHandlers.bind(this);
  }

  formSubmit() {

    this.props.actions.generalProcess(constants.updateHealthRuleList, {ruleList: this.state.rulesList});
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.serviceList.cipherSvc && nextProps.group && nextProps.emailTemplate) {

      console.log(flatten(nextProps.serviceList));
      let flat = flatten(nextProps.serviceList);
      let arrayKeys = [];
      for (let key in flat) {
        arrayKeys.push({label: `health.data.${key}`, value: `health.data.${key}`});
      }
      this.setState({
        arrayKeys: arrayKeys,
        group: nextProps.group,
        emailTemplate: nextProps.emailTemplate,
        serviceList: nextProps.serviceList,
        prometheusURL: nextProps.serviceList.prometheusURL,
        gui_monitoring: nextProps.serviceList.gui_monitoring,
        isLoading: nextProps.isLoading
      });
    }
    if (nextProps.getHealthRuleList) {
      nextProps.getHealthRuleList.forEach((elem) => {
        elem.actions = [
          {
            label: utils.getLabelByID("Edit"),
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
          },
          {
            label: utils.getLabelByID("Delete"),
            iconName: "fa fa-trash",
            actionType: "COMPONENT_FUNCTION"
          }
        ];
      })
      this.setState({
        rulesList: nextProps.getHealthRuleList
      });
    }
    if (nextProps.status) {
      toaster.showToast('Updated successfully!', 'OK')
      nextProps.updateHealthRuleList.forEach((elem) => {
        elem.actions = [
          {
            label: utils.getLabelByID("Edit"),
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
          },
          {
            label: utils.getLabelByID("Delete"),
            iconName: "fa fa-trash",
            actionType: "COMPONENT_FUNCTION"
          }
        ];
      })
      this.setState({
        rulesList: nextProps.updateHealthRuleList
      });
    }
  }

  addRouting() {
    if (!this.state.routing.ruleName || !this.state.routing.field || !this.state.routing.group || !this.state.routing.emailTemplate || !this.state.routing.value || !this.state.routing.option) {
      alert("All Fields Are Required!!");
      return;
    }

    let interm = this.state.rulesList || [];
    if (!this.state.routing || !this.state.routing.mappList) {
      this.state.routing.mappList = [];
    }
    this.state.routing.actions = [
      {
        label: utils.getLabelByID("Edit"),
        iconName: "fa fa-edit",
        actionType: "COMPONENT_FUNCTION"
      },
      {
        label: utils.getLabelByID("Delete"),
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }
    ];
    interm.push(this.state.routing)
    this.setState({rulesList: interm, routing: {}})
    console.log({
      name: 'general',
      bounce: interm
    });
  }

  componentDidMount() {
    let _this = this;
    _this.props.actions.generalProcess(constants.getDispatcherMeta, {});
    this.timeoutHandler = setInterval(() => {
      _this.props.actions.generalProcess(constants.getHealthData, {});

    }, 30000);
    this.props.actions.generalProcess(constants.getHealthData, {});
    this.props.actions.generalProcess(constants.getHealthRuleList, {});
    this.setState({isLoading: true});
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandler);
  }

  ActionHandlers({actionName, index}) {
    switch (actionName) {
      case "Edit":
        if (index > -1) {
          let b = this.state.rulesList[index];
          let tempState = this.state.rulesList;
          tempState.splice(index, 1);
          this.setState({routing: b, rulesList: tempState});
        }
        break;
      case "Delete":
        if (index > -1) {
          let tempState = this.state.rulesList;
          tempState.splice(index, 1);
          this.setState({rulesList: tempState});
        }
        break;
      default:
        break;
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <Portlet title={utils.getLabelByID("Network Statistics")} isPermissioned={true}>

          <div className="tabbable-line boxless" >
            <ul className="nav nav-tabs">

              <li className={"active"}>
                <a href="#tab_1_1" data-toggle="tab"
                   style={{fontWeight: "Bold", fontSize: "17px"}}>Cipher Basic Health</a>
              </li>
              <li>
                <a href="#tab_1_3" data-toggle="tab"
                   style={{fontWeight: "Bold", fontSize: "17px"}}>Hyperledger Health</a>
              </li>
              <li>
                <a href="#tab_1_4" data-toggle="tab"
                   style={{fontWeight: "Bold", fontSize: "17px"}}>Technical Network Stats</a>
              </li>
              <li>
                <a href="#tab_1_5" data-toggle="tab"
                   style={{fontWeight: "Bold", fontSize: "17px"}}>Notification Rules</a>
              </li>
            </ul>
          </div>
          <div className="tabbable-line" >
            <div className="tab-content " >
              <div className="tab-pane active" id="tab_1_1">
                <div>

                  <h4>{utils.getLabelByID("Cipher Services")} </h4>
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("cipherSvc")}
                    gridData={this.state.serviceList.cipherSvc}
                  />
                  <h4>{utils.getLabelByID("Postgress Client List")} </h4>
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("pgClientList")}
                    gridData={this.state.serviceList.clientList}
                  />

                  <h4>{utils.getLabelByID("Rabbit MQ Stats")} </h4>

                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("rmqStatus")}
                    gridData={this.state.serviceList.rabbitMQ}
                  />
                  <h4>{utils.getLabelByID("HyperLedger Orderer")} </h4>
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("ordererList")}
                    gridData={this.state.serviceList.ordererList}
                  />
                  <h4>{utils.getLabelByID("HyperLedger Peer")} </h4>
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("peerListHealth")}
                    gridData={this.state.serviceList.peerList}
                  />
                  <h4>{utils.getLabelByID("Endpoint List")} </h4>
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("endpointListHealth")}
                    gridData={this.state.serviceList.endpointList}
                  />
                </div>
              </div>

              <div className="tab-pane" id="tab_1_3">
                <iframe src={this.state.gui_monitoring} frameBorder="0"
                        style={{height: "100%", width: "100%"}}></iframe>
              </div>
              <div className="tab-pane" id="tab_1_4">
                <iframe src={this.state.prometheusURL} frameBorder="0" style={{height: "100%", width: "100%"}}></iframe>
              </div>
              <div className="tab-pane" id="tab_1_5">
                <Row>


                  <div className="row">

                    <div className="col-md-12">
                      <div className="col-md-12">
                        <div className="col-md-12" style={{marginBottom: "15px"}}>
                          <h4 className={'bold'}>Notification Rules</h4>
                        </div>
                        <br/>
                        <br/>
                        <Row>
                          <Col col="4">
                            <Label text="Rule Name" columns="3"></Label>
                            <Input fieldname='ruleName' formname='routing' state={this.state}
                                   columns='9' style={{}} actionHandler={this.generalHandler}/>
                          </Col>
                        </Row>
                        <Row>


                          <Col col="4">
                            <Label text="field" columns="3"></Label>
                            {/*<Input fieldname='field' formname='routing' state={this.state}*/}
                            {/*       columns='9' style={{}} actionHandler={this.generalHandler}/>*/}
                            <Combobox fieldname='field' formname='routing' columns='9' style={{}}
                                      state={this.state} typeName="arrayKeys"
                                      dataSource={this.state} multiple={false} actionHandler={this.generalHandler}/>

                          </Col>
                          <Col col="4">
                            <Label text="op." columns="3"></Label>
                            <Combobox fieldname='option' formname='routing' columns='9' style={{}}
                                      state={this.state} typeName="options" isDDL={true}
                                      dataSource={(() => {
                                        let options = [];
                                        options.push({label: '==', value: '=='});
                                        options.push({label: '!=', value: '!='});
                                        return {options};
                                      })()} multiple={false} actionHandler={this.generalHandler}/>
                          </Col>
                          <Col col="4">
                            <Label text="value" columns="3"></Label>
                            <Input fieldname='value' formname='routing' state={this.state}
                                   columns='9' style={{}} actionHandler={this.generalHandler}/>
                          </Col>
                          <Col col="4">
                            <Label text="Group" columns="3"></Label>
                            <Combobox fieldname='group' formname='routing' columns='9' style={{}} isDDL={true}
                                      state={this.state} typeName="group" dataSource={this.state} multiple={false}
                                      actionHandler={this.generalHandler}/>
                          </Col>
                          <Col col="4">
                            <Label text="Template" columns="3"></Label>
                            <Combobox fieldname='emailTemplate' formname='routing' columns='9' style={{}} isDDL={true}
                                      state={this.state} typeName="emailTemplate" dataSource={this.state}
                                      multiple={false}
                                      actionHandler={this.generalHandler}/>
                          </Col>

                        </Row>
                        <Row>
                          <Col>
                            <div className="col-md-12">
                              <div className="btn-toolbar pull-right">
                                <a className="btn btn-default" href="javascript:;"
                                   onClick={this.addRouting.bind(this)}>{utils.getLabelByID("Add Notification Rule")} </a>
                              </div>
                            </div>
                            <Col col="12">
                              <Table
                                pagination={false}
                                export={false}
                                search={false}
                                gridColumns={utils.getGridColumnByName("FTEMP_FilterRulesHealth")}
                                componentFunction={this.ActionHandlers}
                                gridData={this.state.rulesList}
                                totalRecords={this.state.rules.length}
                              />
                            </Col>
                          </Col>
                          <div className="col-md-12">
                            <div className="form-actions right">
                              <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                  <button type="submit" className="btn green"
                                          onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Save Notification Rules")} </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </div>

                  </div>
                </Row>
              </div>
            </div>
          </div>
        </Portlet>
      );
    } else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    serviceList: state.app.health.data || [],
    group: _.get(state.app, 'EventDispatcherTypeList.data.group', undefined),
    emailTemplate: _.get(state.app, 'EventDispatcherTypeList.data.emailTemplate', undefined),
    getHealthRuleList: _.get(state.app, 'getHealthRuleList.data.searchResult', undefined),
    updateHealthRuleList: _.get(state.app, 'updateHealthRuleList.data.bounce', undefined),
    status: _.get(state.app, 'updateHealthRuleList.data.status', false),
    isLoading: false
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

HealthMonitorContainer.displayName = "HML_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(HealthMonitorContainer)