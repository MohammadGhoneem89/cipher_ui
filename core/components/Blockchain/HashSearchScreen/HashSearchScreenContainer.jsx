import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
      filterCriteria: {hash: props.hash},
      getTransactionByHash: {...initialState.getTransactionByHash},
      searchResult: undefined,
      pageSize: 10,
      activePage: 1,
      isLoading: false
    };
    this.pageChanged = this.pageChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getTransactionByHash.data) {
      this.setState({
        filterCriteria: {hash: nextProps.hash},
        getTransactionByHash: nextProps.getTransactionByHash,
        searchResult: nextProps.getTransactionByHash.data.searchResult,
        isLoading: false
      });
    }

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.state.filterCriteria.hash) {
      this.props.actions.generalProcess(constants.getTxByHash, {
        action: "getTxByHash",
        hash: this.state.filterCriteria.hash,
        currentPageNo: 1,
        pageSize: this.state.pageSize
      });
    }
  }

  //
  // loadURL(url) {
  //     browserHistory.push(url);
  // }

  submit(data) {

    this.props.actions.generalProcess(constants.getTxByHash, {
      action: "getTxByHash",
      hash: data.hash,
      currentPageNo: 1,
      pageSize: this.state.pageSize
    });
    this.setState({filterCriteria: data, activePage: 1});
  }

  pageChanged(pageNo) {
    this.props.actions.generalProcess(constants.getTxByHash, {
      action: "getTxByHash",
      hash: this.state.filterCriteria.hash,
      currentPageNo: pageNo,
      pageSize: this.state.pageSize
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
        {this.state.searchResult && <Portlet title={"Transaction Detail"}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-md-5" style={{
                  textAlign: "left",
                  fontWeight: "bold"
                }}>{utils.getLabelByID("BWB_Number")}:</label>
                <div className="col-md-7">
                  <span>{this.state.searchResult.transaction.blockNumber}</span>
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
                  <span>{this.state.searchResult.transaction.blockHash}</span>
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
                  <span>{this.state.searchResult.transaction.nonce}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-md-5" style={{
                  textAlign: "left",
                  fontWeight: "bold"
                }}>{utils.getLabelByID("BTL_hash")}:</label>
                <div className="col-md-7">
                  <span>{this.state.searchResult.transaction.hash}</span>
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
                }}>{utils.getLabelByID("BTL_transactionIndex")}:</label>
                <div className="col-md-7">
                  <span>{this.state.searchResult.transaction.transactionIndex}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-md-5" style={{
                  textAlign: "left",
                  fontWeight: "bold"
                }}>{utils.getLabelByID("BTL_from")}:</label>
                <div className="col-md-7">
                  <span>{this.state.searchResult.transaction.from}</span>
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
                }}>{utils.getLabelByID("BTL_value")}:</label>
                <div className="col-md-7">
                  <span>{this.state.searchResult.transaction.value}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label col-md-5" style={{
                  textAlign: "left",
                  fontWeight: "bold"
                }}>{utils.getLabelByID("BTL_to")}:</label>
                <div className="col-md-7">
                  <span>{this.state.searchResult.transaction.to}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label col-md-5" style={{
                    textAlign: "left",
                    fontWeight: "bold"
                  }}>{utils.getLabelByID("BTL_Hex")}:</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12" style={{height: "auto"}}>
                                    <textarea style={{minHeight: "100px", width: "100%"}}
                                              disabled>{this.state.searchResult.transaction.input? this.state.searchResult.transaction.input: "No Hex Input Data"}</textarea>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label col-md-5" style={{
                    textAlign: "left",
                    fontWeight: "bold"
                  }}>{utils.getLabelByID("BTL_InputUTF8")}:</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12" style={{height: "auto"}}>
                                    <textarea style={{minHeight: "100px", width: "100%"}}
                                              disabled>{this.state.searchResult.transaction.inputUTF8 ? this.state.searchResult.transaction.inputUTF8 : "No Input UTF8 Data"}</textarea>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-4">
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
                <div className="col-md-12" style={{height: "auto"}}>
                                    <textarea style={{minHeight: "100px", width: "100%"}}
                                              disabled>{this.state.searchResult.receipt.logs ? JSON.stringify(this.state.searchResult.receipt.logs) : "No Logs Data"}</textarea>
                </div>
              </div>
            </div>
          </div>
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