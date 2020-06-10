/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../constants/appCommunication.js';
import * as requestCreator from '../../../../core/common/request.js';
import * as comm from '../../../../core/constants/Communication.js';
import ReportFilters from './ReportFilters.jsx';
import _ from 'lodash';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reportID: undefined, useCase : [] }
    }
    componentWillMount() {
        this.props.actions.generalProcess(comm.getTypeData, requestCreator.createTypeDataRequest(['USE_CASE']));
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let request = {
            "action": "reportFilters",
            "id": this.props.reportID
        };
        this.props.actions.generalProcess(constants.getReportFilters, request);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.typeData.data.USE_CASE) && !_.isEmpty(this.props.reportFilters)) {
            this.setState({
               useCase : nextProps.typeData.data.USE_CASE,
               isLoading: false
            });
        }
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
                                        <ReportFilters
                                            reportFilters={this.props.reportFilters}
                                            reportID={this.props.reportID}
                                            useCase={this.state.useCase}
                                        />
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
        typeData: state.app.typeData,
        reportID: ownProps.params.reportID || "5c49a61e6146c28e464ba825"

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
Report.displayName = "API Definition Report";
export default connect(mapStateToProps, mapDispatchToProps)(Report);
