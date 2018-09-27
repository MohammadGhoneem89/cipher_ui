import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../actions/generalAction';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../common/request.js';
import Table from '../../../common/Datatable.jsx';
import Portlet from '../../../common/Portlet.jsx';
import ModalBox from '../../../common/ModalBox.jsx';
import * as utils from '../../../common/utils.js';
import ExecutionForm from './ExecutionForm.jsx';
import LogsDetailViewer from './LogsDetailViewer.jsx';

const ScreenSection1 = ({state}) => { //Details
    let contractStructure = state.contractStructure;
    return <Portlet title={"Smart Contract Detail"}>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Template Name:</label>
                    <div className="col-md-6">
                        {contractStructure.detail.templateName}
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Transaction Hash:</label>
                    <div className="col-md-6">
                        {contractStructure.detail.transactionHash}
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Channel:</label>
                    <div className="col-md-6">
                        {contractStructure.detail.channel}
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Binding ID:</label>
                    <div className="col-md-6">
                        {contractStructure.detail.bindingId}
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Deployed By:</label>
                    <div className="col-md-6">
                        {contractStructure.detail.deployedBy}
                        <br/>
                        {contractStructure.detail.deployedOn}
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>From:</label>
                    <div className="col-md-6">
                        {contractStructure.detail.from}
                    </div>
                </div>
            </div>
        </div>
    </Portlet>;
};

const ScreenSection2 = ({state, updateState, onSubmit}) => { //Getters
    let contractStructure = state.contractStructure;

    function methodSelected(item) {
        updateState({selectedGetterMethod: contractStructure.structure.getters[item.target.selectedIndex - 1]});
    }

    return <Portlet title={"Getter Methods"}>
        <div className="input-group input-large">
            <select id="GetterMethod" name="getterMethod" className="form-control" onChange={methodSelected}>
                <option value="">Select</option>
                {contractStructure.structure.getters.map((item, key) => {
                    return <option key={key} value={item.value}>{item.label}</option>;
                })}
            </select>
        </div>
        {state.selectedGetterMethod && <ExecutionForm initialValues={state.selectedGetterMethod} onSubmit={onSubmit}/>}
        {state.contractGetter && <div style={{maxHeight: "200px", minHeight: "50px", overflowY: "auto"}}>
            <pre>{JSON.stringify(state.contractGetter, undefined, 2)}</pre>
        </div>}
    </Portlet>;

};

const ScreenSection3 = ({state, updateState, onSubmit}) => { //Setters
    let contractStructure = state.contractStructure;

    function methodSelected(item) {
        updateState({selectedSetterMethod: contractStructure.structure.setters[item.target.selectedIndex - 1]});
    }

    return <Portlet title={"Setter Methods"}>
        <div className="input-group input-large">
            <select id="GetterMethod" name="getterMethod" className="form-control" onChange={methodSelected}>
                <option value="">Select</option>
                {contractStructure.structure.setters.map((item, key) => {
                    return <option key={key} value={item.value}>{item.label}</option>;
                })}
            </select>
        </div>
        {state.selectedSetterMethod && <ExecutionForm initialValues={state.selectedSetterMethod} onSubmit={onSubmit}/>}
        {state.contractSetter && <div style={{maxHeight: "200px", minHeight: "50px", overflowY: "auto"}}>
            <pre>{JSON.stringify(state.contractSetter, undefined, 2)}</pre>
        </div>}
    </Portlet>;

};

class SmartContractContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.executeGetter = this.executeGetter.bind(this);
        this.executeSetter = this.executeSetter.bind(this);
        this.viewLogDetail = this.viewLogDetail.bind(this);

        this.state = {
            contractStructure: {},
            selectedGetterMethod: undefined,
            selectedSetterMethod: undefined,
            contractGetter: undefined,
            contractSetter: undefined,
            contractLogs: undefined,
            index: undefined,
            logDetailModalIsOpen: false,
            isLoading: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.contractStructure.data) {
            this.setState({
                contractStructure: nextProps.contractStructure.data,
                contractGetter: nextProps.contractGetter.data,
                contractSetter: nextProps.contractSetter.data,
                contractLogs: nextProps.contractLogs.data,
                isLoading: false
            });

            if(!this.state.contractLogs){
                this.getSmartContractLogs(nextProps.contractStructure.data.detail);
            }
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.actions.generalProcess(constants.getSmartContractDetails,
            requestCreator.createSmartContractDetailRequest({
                _id: this.props.consortiumID,
                bindingId: this.props.smartContactID
            }));
        this.setState({
            isLoading: true
        });
    }

    updateState(data) {
        this.setState(data);
    }

    executeGetter(data) {
        let request = {
            "abi": JSON.parse(this.state.contractStructure.detail.ABI),
            "args": data.args || [],
            "from": this.state.contractStructure.detail.from,
            "address": this.state.contractStructure.detail.bindingId,
            "functionName": data.value
        };
        this.props.actions.generalProcess(constants.executeSmartContractGetter, request);
    }

    executeSetter(data) {
        let _this = this;

        let request = {
            "abi": JSON.parse(this.state.contractStructure.detail.ABI),
            "args": data.args || [],
            "from": this.state.contractStructure.detail.from,
            "privateFor": this.state.contractStructure.channels,
            "address": this.state.contractStructure.detail.bindingId,
            "functionName": data.value
        };
        this.props.actions.generalProcess(constants.executeSmartContractSetter, request)
            .then(()=>{
                _this.getSmartContractLogs({});
            });

    }

    getSmartContractLogs({ABI, bindingId}){
        let request = {
            "ABI": ABI || this.state.contractStructure.detail.ABI,
            "address": bindingId || this.state.contractStructure.detail.bindingId
        };
        request.ABI = JSON.parse(request.ABI);
        this.props.actions.generalProcess(constants.getSmartContractLogs, request);
    }

    viewLogDetail({actionName, index}){
        this.setState({
            logDetailModalIsOpen: true,
            index
        });
    }

    submit(data) {

    }


    render() {

        return (
            <div>
                {!this.state.isLoading && <div>
                    <ModalBox isOpen={this.state.logDetailModalIsOpen}>
                        <LogsDetailViewer containerState={this.state} updateState={this.updateState}/>
                    </ModalBox>
                    <ScreenSection1 state={this.state}/>
                    <ScreenSection2 state={this.state} updateState={this.updateState} onSubmit={this.executeGetter}/>
                    <ScreenSection3 state={this.state} updateState={this.updateState} onSubmit={this.executeSetter}/>
                    <Portlet title={"Logs (10 records)"}>
                        {this.state.contractLogs && <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("smartContractLogs")}
                            componentFunction={this.viewLogDetail}
                            gridData={this.state.contractLogs.reverse()}
                            totalRecords={this.state.contractLogs.length}
                        />}
                    </Portlet>
                </div>}
                {this.state.isLoading && <div className="loader">Loading...</div>}
            </div>

        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        consortiumID: ownProps.params.consortiumID,
        smartContactID: ownProps.params.smartContactID,
        contractStructure: state.app.contractStruct,
        contractGetter: state.app.contractGetter,
        contractSetter: state.app.contractSetter,
        contractLogs: state.app.contractLogs
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

SmartContractContainer.displayName = "SmartContract_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(SmartContractContainer)