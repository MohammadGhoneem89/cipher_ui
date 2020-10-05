import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Input from '../../common/Input.jsx';
import Select from '../../common/Select.jsx';
import Lable from '../../common/Lable.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import * as gen from '../../common/generalActionHandler';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';

const toaster = require('../../common/toaster.js');
import _ from 'lodash';

class PickupListSearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.generalActionHandler = gen.generalHandler.bind(this);
    this.sync = this.sync.bind(this);
    this.pageChanged = this.pageChanged.bind(this);

    this.state = {
      searchCriteria: { typeName: "core" },
      activePage: 1,
      pageSize: 10,
      typeDataList: [],
      pickupList: [],
      searchForm: {},
      pageData: {},
      isLoading: true,
      typeList: [],
      isOwner: false
    };
  }
  pageChanged = (pageNo) => {
    let page = this.state.page;
    page.currentPageNo = pageNo;
    page.pageSize = pageNo;
    this.setState({ page: page });
    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequest({
      "currentPageNo": pageNo,
      "pageSize": 10
    }, { type: this.state.searchCriteria.typeName }))
  }
  componentDidMount() {


    this.props.actions.generalProcess(constants.getTypeSyncOut, {})
    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequest({
      "currentPageNo": 1,
      "pageSize": 10
    }, { type: 'core' }));

  }
  sync = (e) => {


    this.props.actions.generalProcess(constants.pushTypeData, { body: { typeList: JSON.stringify(this.state.typeList) } })
    toaster.showToast("Sync Call Sent successfully", 'OK');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.typeDataList && nextProps.typeListForSync) {
      console.log(JSON.stringify(nextProps.typeDataList.pageData))
      this.setState({
        typeDataList: nextProps.typeDataList.searchResult,
        pageData: nextProps.typeDataList.pageData,
        isOwner: nextProps.typeDataList.isOwner,
        typeList: nextProps.typeListForSync,
        isLoading: false
      });
    }

    if (nextProps.pickupList && nextProps.pickupList.data && nextProps.pickupList.data.searchResult[0]) {
      let data = _.get(nextProps.pickupList, `data.searchResult`, []);
      let typeName = _.get(data, `typeName`, '');
      let obj = _.get(data, 'data', []);
      this.setState({
        pickupList: data
      })
    } else {
      this.setState({
        pickupList: []
      })
    }
  }


  searchTypes = () => {

    let typeName = document.getElementById('typeName') == null ? undefined : document.getElementById('typeName').value;
    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequest({
      "currentPageNo": 1,
      "pageSize": 10
    }, { type: "core", typeName: typeName }));
  }

  reset = () => {
    this.setState({
      searchForm: {}
    })
  }

  addNew = () => {
    this.props.history.push(`/pickupListSetup/edit/newType`)
  }

  render() {
    console.log('statatatataa', this.state.typeDataList)
    if (!this.state.isLoading && this.state.typeDataList)
      return (
        <Row>
          <Col>
            <Portlet title={utils.getLabelByID("Pickup List Search")}>
              <Row>
                <Col>
                  <div className="col-md-6">
                    <Lable columns='2' text={utils.getLabelByID("Type Name")} />
                    <Col>
                      <input id="typeName" className="form-control" name="typeName" />
                    </Col>
                  </div>
                </Col>
                {/* <Select fieldname='typeName' className="form-control" formname='searchForm' columns='4' style={{}}
                  state={this.state} typeName="pickupList" dataSource={this.state}
                  multiple={false} actionHandler={this.generalActionHandler} /> */}
              </Row>
              <br />
              <Row>
                <Col>
                  <div className="btn-toolbar pull-right">
                    {this.state.isOwner &&
                      <button type="submit" className="btn green" onClick={this.sync}>
                        {utils.getLabelByID("Sync LOVs")}
                      </button>
                    }
                    {' '}
                    <button type="submit" className="btn green" onClick={this.searchTypes}>
                      {utils.getLabelByID("Search")}
                    </button>
                    {' '}
                    <button type="button" className="btn btn-default" onClick={this.addNew}>
                      <i className="fa fa-plus"></i>
                      {utils.getLabelByID("Add")}
                    </button>
                  </div>
                </Col>
              </Row>
            </Portlet>
            <Portlet title={utils.getLabelByID("PICKUP LIST")} isPermissioned={true}>
              <Table
                pagination={true}
                export={false}
                search={false}
                pageChanged={this.pageChanged}
                gridColumns={utils.getGridColumnByName("pickupList")}
                gridData={this.state.typeDataList}
                totalRecords={this.state.pageData.totalRecords}
                activePage={this.state.pageData.currentPageNo}
                pageSize={this.state.pageData.pageSize}
              />
            </Portlet>
          </Col>
        </Row>
      );
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.app)
  return {
    typeDataList: _.get(state.app, 'typeDataListByType.data', undefined),
    typeListForSync: _.get(state.app, 'typeListForSync.data', undefined),
    pickupList: _.get(state.app, 'typeDataListForType', [])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

PickupListSearchContainer.displayName = "PickupList_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(PickupListSearchContainer)