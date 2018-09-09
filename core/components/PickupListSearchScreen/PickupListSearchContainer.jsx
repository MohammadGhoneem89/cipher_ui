import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../standard/Datatable.jsx';
import PickupListFilterForm from './PickupListFilterForm.jsx';
import * as utils from '../../common/utils.js';

class PickupListSearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.submit = this.submit.bind(this);
    this.pageChanged = this.pageChanged.bind(this);

    this.state = {
      searchCriteria: {typeName:""},
      activePage: 1,
      pageSize: 10,
      pickupList: undefined,
      isLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      pickupList: nextProps.pickupList,
      isLoading: false
    });
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getPickupList, requestCreator.createPickupListRequest({
      "currentPageNo": 1,
      "pageSize": 10
    }, {typeName: ""}));
    this.setState({isLoading: true});
  }

  performAction(actionObj) {
    if (actionObj.label === "Reset") {
      this.props.reset();
    }
  }

  pageChanged(pageNo) {
    this.props.actions.generalProcess(constants.getPickupList, requestCreator.createPickupListRequest({
        "currentPageNo": pageNo,
        "pageSize": this.state.pageSize
      },
      this.state.searchCriteria));
    this.setState({activePage: pageNo});
  }

  submit(searchCriteria) {
    this.props.actions.generalProcess(constants.getPickupList, requestCreator.createPickupListRequest({
        "currentPageNo": 1,
        "pageSize": 10
      },
      searchCriteria));
    this.setState({searchCriteria, activePage: 1});
  }

  render() {
    // let actions =[
    //     { className:"btn btn-default", type:"link", label: "ADD", icon: "plus", actionHandler: this.loadURL.bind(this, '/pickupListSetup')}
    // ];
    if (!this.state.isLoading && this.state.pickupList)
      return (
        <Portlet title={utils.getLabelByID("PickupListSearch")}>
          <PickupListFilterForm onSubmit={this.submit} initialValues={this.state.searchCriteria} state={this.state}/>
          <Portlet title={utils.getLabelByID("TemplateList")} isPermissioned={true}
                   actions={this.state.pickupList.data.actions}>
            <Table
              pagination={true}
              export={false}
              search={false}
              pageChanged={this.pageChanged}
              gridColumns={utils.getGridColumnByName("pickupList")}
              gridData={this.state.pickupList.data.searchResult}
              totalRecords={this.state.pickupList.pageData.totalRecords}
              activePage={this.state.activePage}
              pageSize={this.state.pageSize}
            />
          </Portlet>
        </Portlet>
      );
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pickupList: state.app.typeDataList
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

PickupListSearchContainer.displayName = "PickupList_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(PickupListSearchContainer)