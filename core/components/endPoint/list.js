import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import { browserHistory } from 'react-router';
import Portlet from '../../common/Portlet.jsx';

class EndPointList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {

  }

  addItem = () => {
    browserHistory.push('/endpoint/create');
  };

  search = () => {

  };
  pageChanged = (pageNo) => {

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
                    <input type="text" className="form-control" name="address" id="address"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-4">
                    <label className="control-label">{utils.getLabelByID("Protocol")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" name="protocol" id="protocol"/>
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
        <Portlet title={utils.getLabelByID("List")}>
          <Table fontclass=""
                 gridColumns={utils.getGridColumnByName("EndPointList")}
                 gridData={[]}
                 totalRecords={10}
                 pageSize={10}
                 pagination={true}
                 pageChanged={this.pageChanged}
                 export={false}
                 activePage={1}/>
        </Portlet>
      </div>);
  }
}

EndPointList.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

EndPointList.displayName = "Endpoint Defination List";

export default connect(mapStateToProps, mapDispatchToProps)(EndPointList);