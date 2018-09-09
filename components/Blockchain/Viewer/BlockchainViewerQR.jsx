import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../core/actions/generalAction';
import Portlet from '../../../core/common/Portlet.jsx';

import * as constants from '../../../constants/Communication.js';
// import JSONPretty from 'react-json-pretty';
import * as utils from '../../../core/common/utils.js';


class BlockChainViewer extends React.Component {

    constructor() {

        super();
        this.state = {
            resultData: undefined
        }

    }

    componentDidMount() {
        let request = {
            "body": {
                "tranxID": this.props.blockChainID//this.props.blockChainID
            }
        };
        
        this.props.actions.generalProcess(constants.getTranByHash, request);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resultData) {
            this.setState({
                resultData: nextProps.resultData,
                blockChainID: nextProps.blockChainID
            });
        }
    }

    render() {
        if (this.props.resultData)
            return (
                <Portlet title={"QR_transactionDetails"}>
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <label className="control-label col-md-5" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>Blockchain ID:</label>
                        </div>
                        <div className="col-md-8 col-sm-8" style={{wordBreak: "break-all", wordWrap: "break-word"}}>
                            <pre> {this.props.blockChainID} </pre>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <label className="control-label col-md-5" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>Proposal Hash:</label>
                        </div>
                        <div className="col-md-8 col-sm-8" style={{wordBreak: "break-all", wordWrap: "break-word"}}>
                            <pre> {this.props.resultData.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.proposal_hash} </pre>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <label className="control-label col-md-5" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>Payload:</label>
                        </div>
                        <div className="col-md-8 col-sm-8"
                             style={{borderStyle: "dotted", wordBreak: "break-all", wordWrap: "break-word"}}>
                            <div className="row">
                                <label className="control-label col-md-2 col-sm-2" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>Namespace:</label>
                                <div className="col-md-10 col-sm-10">
                                    <pre> {this.props.resultData.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].namespace}</pre>
                                </div>
                            </div>
                            <div className="row">
                                <label className="control-label col-md-2 col-sm-2" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>Key:</label>
                                <div className="col-md-10 col-sm-10">
                                    <pre> {this.props.resultData.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes[0].key} </pre>
                                </div>
                            </div>
                            <div className="row">
                                <label className="control-label col-md-2 col-sm-2" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>Value:</label>
                                <div className="col-md-10 col-sm-10">
                                    <pre> {JSON.stringify(JSON.parse(this.props.resultData.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes[0].value), undefined, 4)} </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portlet>
            );
        else
            return (<div className="loader"> {utils.getLabelByID("Loading")}</div>)
    }
}

BlockChainViewer.propTypes = {
    resultData: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    
    return {
        resultData: state.app.ResultData.value,
        blockChainID: ownProps.params.blockChainID
    };


}

function mapDispatchToProps(dispatch) {

    return {actions: bindActionCreators(actions, dispatch)}

}

export default connect(mapStateToProps, mapDispatchToProps)(BlockChainViewer);

//export default Login;