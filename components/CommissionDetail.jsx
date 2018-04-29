/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';
import * as constants from '../constants/Communication.js';
import StatusBar from '../components/StatusBar.jsx';
import QRCodeJquery from '../components/QRCodeJquery.jsx';
import ActionButton from '../components/ActionButton.jsx';
import * as requestCreator from '../common/request.js';
import InnerGrid from '../standard/innerGrid.jsx';
import * as utils from '../common/utils.js';
import Table from '../standard/Datatable.jsx';

class CommissionDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            batchID: props.batchID
        }
    }
    componentWillMount() {

        this.props.actions.generalProcess(constants.getCommissionDetailData, requestCreator.createCommissionDetailRequest("123", this.props.batchID));
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="form-body">
                    <div className="row">
                        <StatusBar statusList={this.props.commissionDetailData.statusList} status={this.props.commissionDetailData.currentStatus}></StatusBar>
                        <div className="col-md-4">
                            <img className="item-pic" src={this.props.commissionDetailData.acquirer.logoURL} />
                        </div>
                        <div className="col-md-2 pull-right">
                            <QRCodeJquery size="100" errorCorrectionLevel="H" qrString={this.props.commissionDetailData.blockChainAddress}>
                             </QRCodeJquery>
                            <span style={{ fontSize: "11" }}> {this.props.commissionDetailData.blockChainAddress} </span>
                        </div>
                    </div>
                </div>

                <div className="form-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label">Name</label>
                                <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.acquirer.name} />

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label">Transaction Amount</label>
                                <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.tranAmount} />

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label">Total Transactions</label>
                                <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.totalTransactions} />

                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label">Reversed</label>
                                <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.totalReversedTransactions} />

                            </div>
                        </div>
                       

                    </div>
                </div>
                <div className="row">

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label">Commission</label>
                            <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.commissionAmount} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label">Reversed Amount</label>
                            <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.reversedAmount} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label">Total Commission</label>
                            <input type="text" id="firstName" className="form-control" value={this.props.commissionDetailData.totalCommmission} />
                        </div>
                    </div>
                </div>
                <InnerGrid TableClass="" fontclass="font-dark" totalRecords={this.props.commissionDetailData.commissionSummaryData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageChanged={this.pageChanged} gridColumns={utils.getGridColumnByName("commissionDetailData")} gridData={this.props.commissionDetailData.commissionSummaryData.rows} />                
            </div>
        );
    }
}
CommissionDetail.propTypes = {
    commissionDetailData: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        commissionDetailData: state.app.commissionDetailData.data
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
CommissionDetail.displayName = "";
export default connect(mapStateToProps, mapDispatchToProps)(CommissionDetail);