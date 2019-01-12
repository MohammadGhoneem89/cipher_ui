import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initialState from '../../../reducers/initialState.js';
import * as actions from '../../../actions/generalAction';
import * as constants from '../../../constants/Communication.js';
import Portlet from '../../../common/Portlet.jsx';
import BlockSearchForm from './HashSearchForm.jsx';
import * as utils from '../../../common/utils.js';

class HashSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: { hash: props.hash },
            getTransactionByHash: { ...initialState.getTransactionByHash },
            searchResult: undefined,
            pageSize: 10,
            activePage: 1,
            isLoading: false
        };
        this.pageChanged = this.pageChanged.bind(this);
    }
    renderTranLogs(data) {
        if (data.transaction.scactions) {
            let decoded = []
            let opous = JSON.parse(JSON.stringify(data.transaction.scactions), (k, v) => {
                let key = "";
                for (key in v) {
                    if (key == 'type') {
                        let buf = Buffer.from(v);
                        return buf.toString();
                    }
                }

                if (v instanceof Array) {
                    console.log(JSON.stringify(v));
                   
                    v.forEach((elem) => {
                        for (key in elem) {
                            if (key == 'nonce') {
                                let buf = Buffer.from(elem.payload);
                               
                                let payload=JSON.parse(buf.toString())
                                let value=_.get(payload,'input.chaincode_spec.input.args',null)
                                let decodedArgs=[]
                                if(value){
                                   
                                    value.forEach((elem)=>{
                                        let buf = Buffer.from(elem);
                                        
                                        decodedArgs.push(buf.toString())
                                        
                                    });
                                }
                              
                                _.set(payload,'input.chaincode_spec.input.args',decodedArgs)
                                decoded.push(payload);
                                //return payload
                                //elem.payload = JSON.parse(buf.toString());
                            }
                        }
                    })
                    return v;
                   
                } 
                    return v;
                
            })

            return (<div>
                {opous.map((td, index) => (
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label col-md-5" style={{
                                        textAlign: "left",
                                        fontWeight: "bold"
                                    }}>{utils.getLabelByID("BTL_Payload")}:</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12" style={{ height: "auto" }}>
                                    <textarea
                                        style={{ height: "30%", width: "100%" }}
                                        disabled>{JSON.stringify(decoded)}</textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label col-md-5" style={{
                                        textAlign: "left",
                                        fontWeight: "bold"
                                    }}>{utils.getLabelByID("BTL_logData")}:</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12" style={{ height: "auto" }}>
                                    <textarea
                                        style={{ height: "30%", width: "100%" }}
                                        disabled>{JSON.stringify(td.dataLogs)}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            )
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getTransactionByHash.data) {
            this.setState({
                filterCriteria: { hash: nextProps.hash },
                getTransactionByHash: nextProps.getTransactionByHash,
                searchResult: nextProps.getTransactionByHash.data.searchResult,
                isLoading: false
            });
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.state.filterCriteria.hash) {
            this.props.actions.generalProcess(constants.getblockchainWorkboardDataHF, {
                action: "getTxByHash",
                hash: this.state.filterCriteria.hash,
                currentPageNo: 1,
                pageSize: this.state.pageSize,
                "function": "TRNXHASH",
                "arguments": [this.state.filterCriteria.hash]
            });
        }
    }

    //
    // loadURL(url) {
    //     browserHistory.push(url);
    // }

    submit(data) {

        this.props.actions.generalProcess(constants.getblockchainWorkboardDataHF, {
            action: "getTxByHash",
            hash: data.hash,
            currentPageNo: 1,
            pageSize: this.state.pageSize,
            "function": "TRNXHASH",
            "arguments": [data.hash]
        });
        this.setState({ filterCriteria: data, activePage: 1 });
    }

    pageChanged(pageNo) {
        this.props.actions.generalProcess(constants.getblockchainWorkboardDataHF, {
            action: "getTxByHash",
            hash: this.state.filterCriteria.hash,
            currentPageNo: pageNo,
            pageSize: this.state.pageSize,
            "function": "TRNXHASH",
            "arguments": [this.state.filterCriteria.hash]
        });
        this.setState({ activePage: pageNo });
    }

    render() {
        return (
            <div>
                <Portlet title={"Criteria"}>
                    <BlockSearchForm onSubmit={this.submit} initialValues={this.state.filterCriteria}
                        state={this.state} />
                </Portlet>
                {this.state.searchResult && <Portlet title={"Transaction Detail"}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BWB_Type")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.transaction.header.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BWB_TimeStamp")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.transaction.header.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BWB_Nonce")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.transaction.header.nonce}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BTL_channelID")}:</label>
                                <div className="col-md-7">
                                    <p>{this.state.searchResult.transaction.header.channel_id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BTL_Version")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.transaction.header.version}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BTL_MSP")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.transaction.header.msp}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BTL_hash")}:</label>
                                <div className="col-md-7">
                                    <p>{this.state.searchResult.transaction.header.tx_id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BTL_TCERT")}:</label>
                                <div className="col-md-5">
                                    <p>{this.state.searchResult.transaction.header.tcert}</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    {this.renderTranLogs(this.state.searchResult)}

                </Portlet>}
                {this.state.isLoading && <div className="loader">Loading...</div>}
            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        hash: ownProps.params.hash,
        getTransactionByHash: state.app.getTxByHash
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

HashSearchContainer.displayName = "HashSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(HashSearchContainer)