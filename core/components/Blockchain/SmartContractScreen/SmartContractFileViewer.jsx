import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../../actions/generalAction';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../common/request.js';
import Table from '../../../standard/Datatable.jsx';
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


class SmartContractFiles extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateState = this.updateState.bind(this);

        this.state = {
            smartContractFiles: undefined,
            selectedSetterFile: undefined,
            isLoading: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.smartContractFiles.data) {

            this.setState({
                smartContractFiles: nextProps.smartContractFiles.data,
                isLoading: false
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.actions.generalProcess(constants.getSmartContractFiles, {
            "action": "ConsortiumDetail",
            "_id": this.props.consortiumID,
            "index": this.props.smartContractIndex
        });
    }

    updateState(data) {
        this.setState(data);
    }

    codeHighlighter(fileContent){
        fileContent = fileContent.replace('\r\n', "<br>");
        fileContent = fileContent.replace(/\bcontract \b/g, '<span style="color:blue">contract</span> ');
        fileContent = fileContent.replace(/\bpublic \b/g, '<span style="color:red">public</span> ');
        return fileContent;
    }

    render() {
        let _this = this;
        function filesSelected(item) {
            _this.setState({selectedSetterFile: _this.state.smartContractFiles[item.target.selectedIndex - 1]});
        }

        return (
            <div>
                {!this.state.isLoading && <div>
                    {/*<ScreenSection1 state={this.state}/>*/}
                    <Portlet title={"Files"}>
                        <div className="input-group input-large">
                            <select id="GetterMethod" name="getterMethod" className="form-control" onChange={filesSelected}>
                                <option value="">Select</option>
                                {this.state.smartContractFiles.map((item, key) => {
                                    return <option key={key} value={item.value}>{item.label}</option>;
                                })}
                            </select>
                        </div>
                        {this.state.selectedSetterFile && <div id="YAHOO" style={{maxHeight: "300px", minHeight: "50px", overflowY: "auto"}}>
                            <pre dangerouslySetInnerHTML={{__html: this.codeHighlighter(this.state.selectedSetterFile.fileContent)}}/>
                        </div>}
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
        smartContractIndex: ownProps.params.smartContractIndex,
        smartContractFiles: state.app.smartContractFiles
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

SmartContractFiles.displayName = "SmartContract_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(SmartContractFiles)