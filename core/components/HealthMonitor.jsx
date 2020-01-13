import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/generalAction';
import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import Portlet from '../common/Portlet.jsx';
import Table from '../common/Datatable.jsx';
import * as utils from '../common/utils.js';

class HealthMonitorContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            serviceList: undefined,
            pageSize: 10,
            activePage: 1,
            isLoading: true
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.serviceList.cipherSvc) {
            this.setState({
                serviceList: nextProps.serviceList,
                isLoading: nextProps.isLoading
            });
        }
    }

    componentDidMount() {
        let _this = this;
        this.timeoutHandler = setInterval(() => {
            _this.props.actions.generalProcess(constants.getHealthData, {});
        }, 30000);
        this.props.actions.generalProcess(constants.getHealthData, {});
        this.setState({ isLoading: true });
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutHandler);
    }

    render() {
        if (!this.state.isLoading) {
            return (
                // cipherSvc
                <div>
                    <Portlet title={utils.getLabelByID("Cipher Services")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("cipherSvc")}
                            gridData={this.state.serviceList.cipherSvc}
                        />
                    </Portlet>
                    {/* // clientList data base */}
                    <Portlet title={utils.getLabelByID("Postgress Client List")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("pgClientList")}
                            gridData={this.state.serviceList.clientList}
                        />
                    </Portlet>
                    {/* // Rabbit MQ data base */}
                    <Portlet title={utils.getLabelByID("Rabbit MQ Status")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("rmqStatus")}
                            gridData={this.state.serviceList.rabbitMQ}
                        />
                    </Portlet>
                    {/* // orderer  */}
                    <Portlet title={utils.getLabelByID("Orderer List")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("ordererList")}
                            gridData={this.state.serviceList.ordererList}
                        />
                    </Portlet>
                    {/* // peerList  */}
                    <Portlet title={utils.getLabelByID("Peer List")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("peerListHealth")}
                            gridData={this.state.serviceList.peerList}
                        />
                    </Portlet>
                    {/* // peerList  */}
                    <Portlet title={utils.getLabelByID("Endpoint List")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("endpointListHealth")}
                            gridData={this.state.serviceList.endpointList}
                        />
                    </Portlet>

                </div>

            );
        }
        else {
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