
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';

import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication.js';
import * as requestCreator from '../../../../core/common/request.js';
import ReportFilters from '../../../../core/components/ReportFilters.jsx';


class SupplierPerformance extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reportID: undefined }
    }
    componentWillMount() {
    }

    componentDidMount() {
        console.log("ID : -------", this.props.reportID)
        window.scrollTo(0, 0);

        var request = {
            "action": "reportFilters",
            "id": this.props.reportID

        }
        this.props.actions.generalProcess(constants.getReportFilters, request);

        if (!this.props.entityNames.length > 0) {
            this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
                "currentPageNo": 1,
                "pageSize": 1
            }));
        }

        if (!this.props.acquirerNames.length > 0) {
            this.props.actions.generalProcess(constants.getAcquirerList, requestCreator.createAcquirerListRequest({
                "currentPageNo": 1,
                "pageSize": 1
            }));
        }

    }
    render() {

        if (this.props.reportFilters.data) {
            console.log("reports data ---- !!!!!", this.props.reportFilters.data)
            return (

                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("Report Filters")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="filterForm" key="filterForm">
                                        {this.props.reportID && <ReportFilters
                                            reportFilters={this.props.reportFilters}
                                            acquirerNames={this.props.acquirerNames}
                                             entityNames={this.props.entityNames}
                                            reportID={this.props.reportID}
                                         entityService={this.props.entityService}
                                        />}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            );
        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    if (state.app) {
        // console.log("REPORT FILTERSS", state.app.reportFilters)
        // console.log("REPORT ID-----", ownProps.params.reportID)
        return {
            reportFilters: state.app.reportFilters,
            reportID: ownProps.params.id,
            typeData: state.app.typeData.data,
            entityNames: state.app.entityList.data.typeData.entityNames,
            entityService: state.app.entityList.data.searchResult,
            acquirerNames: state.app.acquirerList.data.typeData.acquirerNames,
        };
    }
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
SupplierPerformance.displayName = "Supplier Performance";
export default connect(mapStateToProps, mapDispatchToProps)(SupplierPerformance);