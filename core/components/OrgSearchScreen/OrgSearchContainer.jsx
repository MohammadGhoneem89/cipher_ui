import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import EntityFilterForm from './OrgFilterForm.jsx';
import * as utils from '../../common/utils.js';

class OrgSearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.submit = this.submit.bind(this);


    this.state = {
      filterCriteria: undefined,
      entityList: undefined,
      pageSize: 10,
      activePage: 1,
      sortData: undefined,
      isLoading: false,
      actions: [{
        "value": "1002",
        "type": "pageAction",
        "label": "ADD",
        "labelName": "COM_AB_Add",
        "actionType": "PORTLET_LINK",
        "iconName": "fa fa-plus",
        "URI": "/orgSetup",
        "children": []
      }]
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.sortList = this.sortList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entityList) {
      let list = nextProps.entityList.data.searchResult.map(e => {
        let view = {
          "value": "1003",
          "type": "pageAction",
          "label": "Onboard",
          "labelName": "Onboard",
          "actionType": "PORTLET_LINK",
          "iconName": "fa fa-eye",
          "URI": ["/BusinessOrgSetup"],
          "children": []
        }
        let element = e
        console.log(element);
        element.actions.push(view)
        console.log(element);
        return element
      })
      this.setState({
        entityList: nextProps.entityList,
        list: list,
        isLoading: nextProps.isLoading
      });
    }
    if (nextProps.entityList.pageData && nextProps.entityList.pageData.sortData) {
      this.setState({
        sortData: nextProps.entityList.pageData.sortData

      });
    }
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
      currentPageNo: 1,
      pageSize: this.state.pageSize

    }));
    this.setState({ isLoading: true });
  }

  //
  // loadURL(url) {
  //     browserHistory.push(url);
  // }

  submit(data) {
    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
      currentPageNo: 1,
      pageSize: this.state.pageSize
    },
      data));
    this.setState({ filterCriteria: data, activePage: 1 });
  }

  pageChanged(pageNo) {
    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
      currentPageNo: pageNo,
      pageSize: this.state.pageSize,
      sortData: this.state.sortData
    },
      this.state.filterCriteria));
    this.setState({ activePage: pageNo });
  }

  sortList(sortData) {
    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
      currentPageNo: this.state.activePage,
      pageSize: this.state.pageSize,
      sortData
    },
      this.state.filterCriteria));
  }

  render() {
    if (!this.state.isLoading && this.state.entityList) {
      return (
        <div>
          <Portlet title={utils.getLabelByID("Organization")}>
            <EntityFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria}
              state={this.state} />
          </Portlet>
          <Portlet title={utils.getLabelByID("List")} isPermissioned={true}
            // actions={this.state.actions}
            actions={this.state.entityList.data.actions}
          >
            <Table
              pagination={true}

              search={false}
              gridType={"entity"}
              gridColumns={utils.getGridColumnByName("entitySearch")}
              gridData={this.state.list}
              totalRecords={this.state.entityList.pageData.totalRecords}
              pageChanged={this.pageChanged}
              activePage={this.state.activePage}
              pageSize={this.state.pageSize}
              searchCriteria={this.state.filterCriteria}
              headerClick={this.sortList}
              sortData={this.state.sortData}
            />
          </Portlet>
        </div>
      );
    } else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
  }
}

function mapStateToProps(state, ownProps) {
  if (state.app.entityList) {
    return {
      entityList: state.app.entityList,
      isLoading: false
    }
  } else {
    return {
      entityList: [],
      isLoading: true
    }
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

OrgSearchContainer.displayName = "ESearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(OrgSearchContainer)