import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/generalAction';
import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import Portlet from '../common/Portlet.jsx';
import Table from '../standard/Datatable.jsx';
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
        if(nextProps.serviceList){
            this.setState({
                serviceList: nextProps.serviceList,
                isLoading: nextProps.isLoading
            });
        }
    }

    componentDidMount() {
        let _this = this;
        this.timeoutHandler = setInterval(()=>{
            _this.props.actions.generalProcess(constants.getHealthData, {});
        },3000);
        this.props.actions.generalProcess(constants.getHealthData, {});
        this.setState({isLoading: true});
    }
    componentWillUnmount(){
        clearTimeout(this.timeoutHandler);
    }

    render() {
        if (!this.state.isLoading){
            return (
                <div>
                    <Portlet title={utils.getLabelByID("HML_servicesName")} isPermissioned={true}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridType={"healthMonitor"}
                            gridColumns={utils.getGridColumnByName("healthMonitorList")}
                            gridData={this.state.serviceList}
                            // totalRecords={10}
                            // activePage={1}
                            // pageSize={10}
                        />
                    </Portlet>
                </div>
            );
        }
        else{
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
        }
    }
}

function mapStateToProps(state, ownProps) {
    // let serviceList = [
    //     {serviceName: "MQRECON", containerID: "1",  dockerIP: "192.168.1.111", status: {type: "OK", value: "HEALTHY"}, lastTime: 1520680937709},
    //     {serviceName: "MQBLA", containerID: "2",  dockerIP: "192.168.1.112", status: {type: "OK", value: "HEALTHY"}, lastTime: 1520680937709},
    //     {serviceName: "MQGRPC", containerID: "3",  dockerIP: "192.168.1.113", status: {type: "OK", value: "HEALTHY"}, lastTime: 1520680937709},
    //     {serviceName: "RI", containerID: "4",  dockerIP: "192.168.1.114", status: {type: "OK", value: "HEALTHY"}, lastTime: 1520680937709},
    //     {serviceName: "SFTP", containerID: "5",  dockerIP: "192.168.1.115", status: {type: "OK", value: "HEALTHY"}, lastTime: 1520680937709}
    //     ];
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