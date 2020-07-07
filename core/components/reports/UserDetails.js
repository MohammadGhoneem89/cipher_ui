import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';

import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import ReportFilters from '../../components/ReportFilters.jsx';


class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reportID: undefined}
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.props.actions.updateStore({reportFilters: {}})
  }

  componentDidMount() {
    console.log("PROPS : -------", this.props)
    window.scrollTo(0, 0);
    var request = {
      "action": "reportFilters",
      "id": this.props.params.id

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
    console.log("GROUP LIST ########### ", nextProps.groupList)
    if (nextProps.groupList.data && nextProps.reportFilters)
      console.log("\n nextProps.reportFilters ", nextProps.reportFilters)
    this.setState({
      groupList: nextProps.groupList.data,
      reportFilters: nextProps.reportFilters,
      reportID: nextProps.reportID
    });
  }

  render() {

    if (this.state.reportFilters) {
      console.log("reports data ---- !!!!!", this.state.reportFilters)
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
                      reportFilters={_.get(this.state, 'reportFilters', [])}
                      reportID={this.state.reportID}
                      groupList={_.get(this.state.groupList, 'searchResult', [])}
                      userList={_.get(this.state, 'userList', [])}
                    />}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      );
    } else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

function mapStateToProps(state, ownProps) {
  if (state.app) {
    return {
      reportFilters: state.app.reportFilters,
      reportID: ownProps.params.id,
      groupList: state.app.groupList,
    };
  }
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

UserDetails.displayName = "User Details";
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
