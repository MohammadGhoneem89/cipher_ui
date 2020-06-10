import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';

import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import ReportFilters from '../../components/ReportFilters.jsx';


class RoleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reportID: undefined }
  }
  componentWillMount() {
  }

  componentDidMount() {
    console.log("PROPS : -------", this.props)
    window.scrollTo(0, 0);

    var request = {
      "action": "reportFilters",
      "id": this.props.reportID

    }
    this.props.actions.generalProcess(constants.getReportFilters, request);

    request = {
      "action": "groupList",
      searchCriteria: {},
      "page": {
        "currentPageNo": 1,
        "pageSize": 20
      }
    }
    this.props.actions.generalProcess(constants.getGroupList, request);

  }
  componentWillReceiveProps(nextProps) {
    console.log("GROUP LIST ########### ",nextProps.groupList)
    this.setState({
      groupList: nextProps.groupList
    });
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
                      groupList={this.props.groupList.data.searchResult}
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
    return {
      reportFilters: state.app.reportFilters,
      reportID: ownProps.params.id,
      typeData: state.app.typeData.data,
      entityNames: state.app.entityList.data.typeData.entityNames,
      entityService: state.app.entityList.data.searchResult,
      acquirerNames: state.app.acquirerList.data.typeData.acquirerNames,
      groupList: state.app.groupList,
    };
  }
}
function mapDispatchToProps(dispatch) {

  return { actions: bindActionCreators(actions, dispatch) }

}
RoleUser.displayName = "Role User";
export default connect(mapStateToProps, mapDispatchToProps)(RoleUser);