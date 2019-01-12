/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../constants/appCommunication.js';
import * as requestCreator from '../../../../core/common/request.js';
import ReportFilters from './ReportFilters.jsx';


class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reportID: undefined }
    }
    componentWillMount() {
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let request = {
            "action": "reportFilters",
            "id": "5c35a4ac6146c28e4621a88d"  //this.props.reportID
        };
        this.props.actions.generalProcess(constants.getReportFilters, request);
    }
    render() {

        if (this.props.reportFilters.data) {
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
                                        <ReportFilters reportFilters={this.props.reportFilters} reportID={this.props.reportID} />
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
    return {
        reportFilters: state.app.reportFilters,
        reportID: ownProps.params.reportID || "5c35a4ac6146c28e4621a88d"

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
Report.displayName = "Contract Detail Report";
export default connect(mapStateToProps, mapDispatchToProps)(Report);
