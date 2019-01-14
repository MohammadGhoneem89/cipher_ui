import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import { browserHistory } from 'react-router';
import Portlet from '../../common/Portlet.jsx';
import {get, isEmpty} from 'lodash';

class EndPointList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      address: '',
      page: {
        pageSize: 10,
        currentPageNo: 1
      }
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.findEndpointDefination, {page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.list)){
      this.setState({loading: false});
    }
  }

  addItem = () => {
    browserHistory.push('/endpoint/create');
  };

  search = () => {
    this.setState({loading: true});
    let payload = {
      page: this.state.page,
      searchCriteria: {
        address: this.state.address
      }
    };
    this.props.actions.generalProcess(constants.findEndpointDefination, payload);
  };

  pageChanged = (pageNo) => {
    let page = this.state.page;
    page.currentPageNo = pageNo;
    this.setState({page: page});
    let payload = {
      page: page,
      searchCriteria: {
        address: this.state.address
      }
    };
    this.props.actions.generalProcess(constants.findEndpointDefination, payload);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.state.loading) {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
    return (
      <div>
        <Portlet title={utils.getLabelByID("Endpoint Defination List Filters")}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Endpoint Address")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" name="address" onChange={this.onChange} value={this.state.address}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" className="btn green" onClick={this.search}>{utils.getLabelByID("Search")} </button>{"  "}
                <button type="button" className="btn default" onClick={this.addItem}>{utils.getLabelByID("Add")} <i className="fa fa-plus"/></button>
              </div>
            </div>
          </div>
        </Portlet>
        <Portlet title={utils.getLabelByID("")}>
          <Table fontclass=""
                 gridColumns={utils.getGridColumnByName("EndPointList")}
                 gridData={get(this.props, 'list.data', [])}
                 totalRecords={get(this.props, 'list.pageData.totalRecords', 0)}
                 pageSize={this.state.page.pageSize}
                 pagination={true}
                 pageChanged={this.pageChanged}
                 export={false}
                 recordID="_id"
                 activePage={this.state.page.currentPageNo}/>
        </Portlet>
      </div>);
  }
}

EndPointList.propTypes = {
  list: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let list = get(state.app, 'findEndpointDefination', {});
  for(let data of get(list, 'data', [])){
    data.actions = [
      {
        URI: ["/endpoint/"],
        iconName: "icon-docs",
        label: "View",
        params: "",
        type: "componentAction"
      },
      {
        URI: ["/endpoint/"],
        iconName: "fa fa-edit",
        label: "Edit",
        params: "",
        type: "componentAction"
      }]
  }
  return {
    list: list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

EndPointList.displayName = "Endpoint Defination List";

export default connect(mapStateToProps, mapDispatchToProps)(EndPointList);