/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
/*container specific imports*/
import Table from '../../standard/Datatable.jsx';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../components/DateControl.jsx'

class SampleListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentPageNo: 1, isLoading: false };
    this.pageChanged = this.pageChanged.bind(this);
    this.fetchListData = this.fetchListData.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentWillMount() {
    this.fetchListData(1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sampleListData !== nextProps.sampleListData) {
      this.setState({
        isLoading: false
      });
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  pageChanged(pageNo) {
    this.setState({ currentPageNo: pageNo });
    this.fetchListData(pageNo);
  }
  formSubmit(e) {
    e.preventDefault();
    this.fetchListData();
  }
  fetchListData(currentPageNo) {
    let toDate = $("#toDate").find("input").val();
    let fromDate = $("#fromDate").find("input").val();
    let textbox = document.getElementById('textbox') == null ? "" : document.getElementById('textbox').value;

    let filtersData = {
      "fromDate": fromDate,
      "toDate": toDate,
      "textbox": textbox,
    };
    let searchRequest = {
      "currentPageNo": currentPageNo || this.state.currentPageNo,
      "pageSize": 5,
      "data": filtersData || {}
    };
    this.setState({ currentPageNo: 1, isLoading: true });
    this.props.actions.generalProcess(constants.getSampleListData, searchRequest);

  }

  clearFields() {
    $('#sampleListView').find('input:text').val('');
    $('#sampleListView').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }


  render() {
    if (this.props.sampleListData.gridData) {
      return (
        <form onSubmit={this.formSubmit.bind(this)}>
          <div>
            <div className="row">
              <div className="col-md-12 ">
                <div className="portlet light bordered sdg_portlet">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject">{utils.getLabelByID("sample_searchHeading")}</span></div>
                    <div className="tools">
                      <a href="javascript:;" className="collapse" data-original-title title> </a>

                    </div>
                  </div>
                  <div className="portlet-body" id="sampleListView">
                    <div className="form-body ">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("common_FromDate")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <DateControl id="fromDate" defaultValue='' />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("common_ToDate")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <DateControl id="toDate"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("sample_TextBox")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="textbox" id="textbox" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                              <button type="submit" className="btn green">{utils.getLabelByID("Search")} </button>
                              <button type="button" onClick={this.clearFields}
                                className="btn default">{utils.getLabelByID("Clear")}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {!this.state.isLoading && <Table
                  title={utils.getLabelByID("sample_gridHeading")} fontclass=""
                  TableClass="portlet light bordered sdg_portlet"
                  gridColumns={utils.getGridColumnByName("sampleGridColumns")}
                  gridData={this.props.sampleListData.gridData.rows}
                  totalRecords={this.props.sampleListData.gridData.pageData.totalRecords}
                  searchCallBack={this.searchCallBack} pageChanged={this.pageChanged} search={true}
                  pagination={true} pageSize={10} activePage={this.state.currentPageNo} />}
                {this.state.isLoading && <div className="loader">{utils.getLabelByID("Loading")}</div>}
              </div>
            </div>
          </div>
        </form>

      );
    }
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

SampleListPage.propTypes = {
  sampleListData: PropTypes.object,
  children: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    sampleListData: state.app.sampleListData,

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}
SampleListPage.displayName = "sample_PageHeading";
export default connect(mapStateToProps, mapDispatchToProps)(SampleListPage);
