import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
import _ from 'lodash';

class PickupListSearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.generalActionHandler = gen.generalHandler.bind(this);
    // this.pageChanged = this.pageChanged.bind(this);

    this.state = {
      searchCriteria: {typeName: ""},
      activePage: 1,
      pageSize: 10,
      typeDataList: [],
      pickupList: [],
      searchForm: {},
      isLoading: true
    };
  }

  componentDidMount() {
    // this.props.actions.generalProcess(constants.getPickupListForType, requestCreator.createPickupListRequestForType({
    //   "currentPageNo": 1,
    //   "pageSize": 10
    // }, {type: "allTypes"}));

    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequest({
      "currentPageNo": 1,
      "pageSize": 10
    }, {type: 'core'}));

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

    if (nextProps.typeDataList) {
      this.setState({
        typeDataList: nextProps.typeDataList,
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
    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequest({
      "currentPageNo": 1,
      "pageSize": 10
    }, {type: this.state.searchForm.orgtype}));
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
                <Lable columns='2' text={utils.getLabelByID("Categories")}/>
                <Select fieldname='orgtype' className="form-control" formname='searchForm' columns='4' style={{}}
                        state={this.state} typeName="typeDataList" dataSource={this.state}
                        multiple={false} actionHandler={this.generalActionHandler}/>
              </Row>
              <br/>
              <Row>
                <Col>
                  <div className="pull-right">
                    <button type="submit" className="btn green" onClick={this.searchTypes}>
                      {utils.getLabelByID("Search")}
                    </button>
                    {' '}
                    <button type="button" className="btn green" onClick={this.addNew}>
                      {utils.getLabelByID("Add")}
                    </button>
                  </div>
                </Col>
              </Row>
            </Portlet>
            <Portlet title={utils.getLabelByID("PICKUP LIST")} isPermissioned={true}>
              <Table
                pagination={false}
                export={false}
                search={false}
                // pageChanged={this.pageChanged}
                gridColumns={utils.getGridColumnByName("pickupList")}
                gridData={this.state.pickupList}
                // totalRecords={this.statetypeDataList}
                // activePage={this.state.activePage}
                // pageSize={this.state.pageSize}
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
    typeDataList: _.get(state.app, 'typeDataListByType.data.searchResult', undefined),
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