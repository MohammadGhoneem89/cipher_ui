import React from 'react';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import initialState from '../../../reducers/initialState.js';
import * as actions from '../../../actions/generalAction';
import * as constants from '../../../constants/Communication.js';
import Portlet from '../../../common/Portlet.jsx';
import Table from '../../../common/Datatable.jsx';
import BlockSearchForm from './BlockSearchForm.jsx';
import * as utils from '../../../common/utils.js';

class BlockSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: props.blockNumber? {blockNumber: props.blockNumber} :{blockNumber: "4"},
            blockDetail: {...initialState.blockDetail},
            searchResult: undefined,
            pageSize: 10,
            activePage: 1,
            isLoading: false
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.getPreviousBlock = this.getPreviousBlock.bind(this);
        this.getNextBlock = this.getNextBlock.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.blockDetail.data) {
            this.setState({
                blockDetail: nextProps.blockDetail,
                searchResult: nextProps.blockDetail.data.searchResult,
                isLoading: false
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getblockchainWorkboardDataHF, {
            action: "getTxByBlock",
            blockNumber: this.state.filterCriteria.blockNumber,
            currentPageNo: 1,
            "channelName": sessionStorage.selectedChannel,
            "network": sessionStorage.selectedNetwork,
            pageSize: this.state.pageSize,
            "function":"BLKNO",
            "arguments":[String(this.state.filterCriteria.blockNumber)]
        });
    }

    submit(data) {

        this.props.actions.generalProcess(constants.getblockchainWorkboardData, {
            action: "getTxByBlock",
            blockNumber: data.blockNumber,
            currentPageNo: 1,
            pageSize: this.state.pageSize,
            "network": sessionStorage.selectedNetwork,
            "function":"BLKNO",
            "arguments":[String(data.blockNumber)]
        });
        this.setState({filterCriteria: data, activePage: 1});
    }
    getPreviousBlock(){
        this.submit({blockNumber: this.state.searchResult.number-1});
    }
    getNextBlock(){
        this.submit({blockNumber: this.state.searchResult.number+1});
    }

    pageChanged(pageNo) {
        this.props.actions.generalProcess(constants.getblockchainWorkboardData, {
            action: "getTxByBlock",
            blockNumber: this.state.filterCriteria.blockNumber,
            currentPageNo: pageNo,
            pageSize: this.state.pageSize,
            "function":"BLKNO",
            "network": sessionStorage.selectedNetwork,
            "arguments":[String(this.state.filterCriteria.blockNumber)]
        });
        this.setState({activePage: pageNo});
    }

    render() {
        return (
            <div>
                <Portlet title={"Criteria"}>
                    <BlockSearchForm onSubmit={this.submit} initialValues={this.state.filterCriteria}
                                     state={this.state}/>
                </Portlet>
                {this.state.searchResult && <Portlet title={"Block Details"}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BWB_Number")}:</label>
                                <div className="col-md-7">
                                    <a href="javascript:"><i className="fa fa-arrow-circle-left fa-fw" onClick={this.getPreviousBlock}/></a><span>{this.state.searchResult.number}</span><a href="javascript:"><i className="fa fa-arrow-circle-right fa-fw" onClick={this.getNextBlock}/></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BWB_Hash")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.hash}</span>
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
                                }}>{utils.getLabelByID("BWB_Nonce")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.nonce}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("BWB_Size")}:</label>
                                <div className="col-md-7">
                                    <span>{this.state.searchResult.size}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portlet>}
                {this.state.searchResult &&<Portlet title={"Transactions"}>
                    <Table
                        pagination={false}
                        export={false}
                        search={false}
                        gridType={"blockTransactions"}
                        gridColumns={utils.getGridColumnByName("blockTransactionsHyperledger")}
                        gridData={this.state.searchResult.tx}
                        totalRecords={this.state.blockDetail.pageData.totalRecords || 0}
                        pageChanged={this.pageChanged}
                        activePage={this.state.activePage}
                        pageSize={this.state.pageSize}
                        searchCriteria={this.state.filterCriteria}
                    />
                </Portlet>}
                {this.state.isLoading && <div className="loader">Loading...</div>}
            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        blockNumber: ownProps.params.blockNumber,
        blockDetail: state.app.getTxByBlock
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

BlockSearchContainer.displayName = "BlockSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(BlockSearchContainer)