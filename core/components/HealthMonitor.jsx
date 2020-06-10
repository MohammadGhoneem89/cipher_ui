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

;
import Combobox from '../common/Select.jsx';
import Col from '../common/Col.jsx';
import * as gen from '../common/generalActionHandler'

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
      rules: []
    };
    this.generalHandler = gen.generalHandler.bind(this);
    this.addRouting = this.addRouting.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.serviceList.cipherSvc) {
      this.setState({
        serviceList: nextProps.serviceList,
        prometheusURL: nextProps.serviceList.prometheusURL,
        gui_monitoring: nextProps.serviceList.gui_monitoring,
        isLoading: nextProps.isLoading
      });
    }
  }

  addRouting() {
    if (!this.state.routing.ruleName || !this.state.routing.field || !this.state.routing.option || !this.state.routing.value || !this.state.routing.API) {
      alert("All Fields Are Required!!");
      return;
    }

    let interm = this.state.rulesList || [];
    if (!this.state.routing || !this.state.routing.mappList) {
      this.state.routing.mappList = [];
    }
    this.state.routing.actions = [
      {
        label: "Define Mapping",
        iconName: "fa fa-map",
        actionType: "COMPONENT_FUNCTION"
      },
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
  }

  componentDidMount() {
    let _this = this;
    this.timeoutHandler = setInterval(() => {
      _this.props.actions.generalProcess(constants.getHealthData, {});
    }, 30000);
    this.props.actions.generalProcess(constants.getHealthData, {});
    this.setState({isLoading: true});
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandler);
  }

  render() {
    if (!this.state.isLoading) {
      return (
        // cipherSvc
        <div>
          <Portlet title={utils.getLabelByID("Cipher Health Stats")} isPermissioned={true}>
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
            <h4>{utils.getLabelByID("HyperLedger Prometheus Link")} </h4>
            <a href={this.state.prometheusURL}>Enter Monitoring</a>
            <h4>{utils.getLabelByID("Network Monitor")} </h4>
            <a href={this.state.gui_monitoring}>Enter Monitoring</a>
          </Portlet>
          {/*<Portlet title={utils.getLabelByID("Notification Rules")} >*/}
          {/*    <Row>*/}
          {/*        <Col col="3">*/}
          {/*            <Label text="field" columns="3"></Label>*/}
          {/*            <Combobox fieldname='field' formname='routing' columns='9' style={{}}*/}
          {/*                state={this.state} typeName="options"*/}
          {/*                dataSource={(() => {*/}
          {/*                    let options = [];*/}
          {/*                    this.state.fields.map(item => {*/}
          {/*                        options.push({ label: item.fieldName, value: item.fieldName });*/}
          {/*                    });*/}
          {/*                    return { options };*/}
          {/*                })()} multiple={false} actionHandler={this.generalHandler} />*/}
          {/*        </Col>*/}
          {/*        <Col col="3">*/}
          {/*            <Label text="op." columns="3"></Label>*/}
          {/*            <Combobox fieldname='option' formname='routing' columns='9' style={{}}*/}
          {/*                state={this.state} typeName="options"*/}
          {/*                dataSource={(() => {*/}
          {/*                    let options = [];*/}
          {/*                    options.push({ label: '==', value: '==' });*/}
          {/*                    options.push({ label: 'Regexp', value: 'Regexp' });*/}
          {/*                    return { options };*/}
          {/*                })()} multiple={false} actionHandler={this.generalHandler} />*/}
          {/*        </Col>*/}
          {/*        <Col col="3">*/}
          {/*            <Label text="value" columns="3"></Label>*/}
          {/*            <Input fieldname='value' formname='routing' state={this.state}*/}
          {/*                columns='9' style={{}} actionHandler={this.generalHandler} />*/}
          {/*        </Col>*/}
          {/*        <Col col="3">*/}
          {/*            <Label text="Then" columns="3"></Label>*/}
          {/*            <Combobox fieldname='API' formname='routing' columns='9' style={{}}*/}
          {/*                state={this.state} typeName="ApiList"*/}
          {/*                dataSource={this.props.containerState} multiple={false} actionHandler={this.generalHandler} />*/}
          {/*        </Col>*/}
          {/*        <Col col="3">*/}
          {/*            <Label text="Name" columns="3"></Label>*/}
          {/*            <Input fieldname='ruleName' formname='routing' state={this.state}*/}
          {/*                columns='9' style={{}} actionHandler={this.generalHandler} />*/}
          {/*        </Col>*/}
          {/*        <Col col="3">*/}
          {/*            <Label text="Custom" columns="3"></Label>*/}
          {/*            <Input fieldname='transformFunction' formname='routing' state={this.state}*/}
          {/*                columns='9' style={{}} actionHandler={this.generalHandler} />*/}
          {/*        </Col>*/}
          {/*    </Row>*/}
          {/*    <Row>*/}
          {/*        <Col>*/}
          {/*            <div className="col-md-12">*/}
          {/*                <div className="btn-toolbar pull-right">*/}
          {/*                    <a className="btn btn-default" href="javascript:;" onClick={this.addRouting.bind(this)}>{utils.getLabelByID("Add Notification Rule")} </a>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*            <Col col="12">*/}
          {/*                <Table*/}
          {/*                    pagination={false}*/}
          {/*                    export={false}*/}
          {/*                    search={false}*/}
          {/*                    gridColumns={utils.getGridColumnByName("FTEMP_FilterRules")}*/}
          {/*                    componentFunction={this.ActionHandlersRules}*/}
          {/*                    gridData={this.state.rulesList}*/}
          {/*                    totalRecords={this.state.rules.length}*/}
          {/*                />*/}
          {/*            </Col>*/}
          {/*        </Col>*/}
          {/*    </Row>*/}
          {/*</Portlet>*/}


        </div>

      );
    } else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    serviceList: state.app.health.data || [],
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