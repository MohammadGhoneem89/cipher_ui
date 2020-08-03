import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import FileTemplateFilterForm from './FileTemplateFilterForm.jsx';
import * as utils from '../../common/utils.js';

class FileTemplateSearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.submit = this.submit.bind(this);
    this.pageChanged = this.pageChanged.bind(this);

    this.state = {
      filterCriteria: undefined,
      fileTemplateList: undefined,
      pageSize: 10,
      activePage: 1,
      isLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fileTemplateList: nextProps.fileTemplateList,
      isLoading: nextProps.isLoading
    });
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getFileTemplateList, requestCreator.createFileTemplateListRequest({
      "currentPageNo": this.state.activePage,
      "pageSize": this.state.pageSize
    }));
    this.setState({ isLoading: true });
  }

  loadURL(url) {
    browserHistory.push(url);
  }

  submit(filterCriteria) {
    this.props.actions.generalProcess(constants.getFileTemplateList, requestCreator.createFileTemplateListRequest({
      "currentPageNo": 1,
      "pageSize": this.state.pageSize
    },
      filterCriteria));
    this.setState({ filterCriteria, activePage: 1 });
  }
  pageChanged(pageNo) {
    this.props.actions.generalProcess(constants.getFileTemplateList, requestCreator.createFileTemplateListRequest({
        "currentPageNo": pageNo,
        "pageSize": this.state.pageSize
      },
      this.state.filterCriteria));
    this.setState({ activePage: pageNo });
  }

  render() {
    // let actions =[
    //     { className:"btn btn-default", type:"link", label: "ADD", icon: "plus", actionHandler: this.loadURL.bind(this, '/fileTemplateSetup')}
    // ];
    if (!this.state.isLoading && this.state.fileTemplateList)
      return (
        <div>
          <Portlet title={utils.getLabelByID("FTSearch_Heading")}>
            <FileTemplateFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} />

          </Portlet>
          <Portlet title={utils.getLabelByID("FileTemplateList")} isPermissioned={true}
            actions={this.state.fileTemplateList.data.actions}>
            <Table
              pagination={true}
              pageChanged={this.pageChanged}
              export={false}
              search={false}
              activePage={this.state.activePage}
              pageSize={this.state.pageSize}
              gridColumns={utils.getGridColumnByName("fileTemplateSearch")}
              gridData={this.state.fileTemplateList.data.searchResult}
              totalRecords={this.state.fileTemplateList.pageData.totalRecords}
            />
          </Portlet>
        </div>
      );
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

function mapStateToProps(state, ownProps) {
  if (state.app.fileTemplateList) {
    return {
      fileTemplateList: state.app.fileTemplateList,
      isLoading: false
    }
  }
  else {
    return {
      fileTemplateList: [],
      isLoading: true
    }
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

FileTemplateSearchContainer.displayName = "FTSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(FileTemplateSearchContainer)