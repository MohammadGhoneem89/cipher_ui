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
        <Portlet title={utils.getLabelByID("Network Statistics")} isPermissioned={true}>

          <div className="tabbable-line boxless">
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
            </ul>
          </div>
          <div className="tabbable-line">
            <div className="tab-content">
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
                <iframe src={this.state.gui_monitoring} frameBorder="0" style={{height: "100%", width: "100%"}}></iframe>
              </div>
              <div className="tab-pane" id="tab_1_4">
                <iframe src={this.state.prometheusURL} frameBorder="0" style={{height: "100%", width: "100%"}}></iframe>
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