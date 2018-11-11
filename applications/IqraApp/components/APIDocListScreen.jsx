/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/actions/generalAction';
/*container specific imports*/
import Table from '../../../core/common/Datatable.jsx';
import * as utils from '../../../core/common/utils.js';
import * as constants from '../../../core/constants/Communication.js';
import * as requestCreator from '../../../core/common/request.js';
import DateControl from '../../../core/common/DateControl.jsx'

class APIDocListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentPageNo: 1, isLoading: true , APIDocumentationList :{}};
    this.pageChanged = this.pageChanged.bind(this);
    this.fetchListData = this.fetchListData.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentWillMount() {
    this.fetchListData(1);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.APIDocumentationList.data.searchResult)
    if (nextProps.APIDocumentationList.data.searchResult) {
      this.setState({
        APIDocumentationList : nextProps.APIDocumentationList.data.searchResult,
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
     
    };
    let searchRequest = {
      "currentPageNo": currentPageNo || this.state.currentPageNo,
      "pageSize": 5,
      "data": filtersData || {}
    };
    this.setState({ currentPageNo: 1, isLoading: true });
    this.props.actions.generalProcess(constants.getListingScreen,searchRequest);

  }

  clearFields() {
    $('#sampleListView').find('input:text').val('');
    $('#sampleListView').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }


  render() {
    if (!this.state.isLoading) {
      return (
        <form onSubmit={this.formSubmit.bind(this)}>
          <div>
            <div className="row">
              <div className="col-md-12 ">
                <div className="portlet light bordered sdg_portlet">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject">{utils.getLabelByID("sample_Heading")}</span></div>
                    <div className="tools">
                      <a href="javascript:;" className="collapse" data-original-title title> </a>

                    </div>
                  </div>
                  <div className="portlet-body" id="sampleListView">
                    <div className="form-body ">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("app1_docList_useCase")}</label>
                          </div>
                          <div className="form-group col-md-8">
                          {/* {console.log(this.state.APIDocumentationList.useCase)} */}
                            <input type="text" className="form-control" name="useCase" id="textbox" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("app1_docList_route")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="route" id="textbox" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("app1_docList_createdBy")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="createdBy" id="textbox" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("app1_docList_isSimulated")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="isSimulated" id="textbox" />
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("app1_docList_isActive")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="isActive" id="textbox" />
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
                  gridData={this.props.APIDocumentationList.data.searchResult}
                  totalRecords={this.props.APIDocumentationList.pageData.totalRecords}
                  searchCallBack={this.searchCallBack}  search={true}
                  pageChanged={this.pageChanged}
                  pagination={true} pageSize={10} activePage={this.state.currentPageNo} 
                  />}
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

APIDocListScreen.propTypes = {
  APIDocumentationList: PropTypes.object,
  children: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    APIDocumentationList: state.app.APIDocumentationList,

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }

}
APIDocListScreen.displayName = "sample_PageHeading";
export default connect(mapStateToProps, mapDispatchToProps)(APIDocListScreen);
