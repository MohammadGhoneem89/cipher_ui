import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Portlet from '../../common/Portlet.jsx';
import { SubmissionError } from 'redux-form'
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import PickupListSetupForm from './PickupListSetupForm.jsx';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import _ from 'lodash';
import Input from '../../common/Input.jsx';
import Select from '../../common/Select.jsx';
import Lable from '../../common/Lable.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import * as gen from '../../common/generalActionHandler';

class PickupListSetupContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pickupListDetail: [],
      pickupListID: undefined,
      consortiumNames: undefined,
      index: undefined,
      pickupList: undefined,
      isLoading: false,
      typeName: undefined,
      type: undefined,
      addForm: {},
      typeForm: {},
      isNew: false
    };

    this.submit = this.submit.bind(this);
    this.generalActionHandler = gen.generalHandler.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.pickupListID === 'newType') {
      this.setState({
        isNew: true
      });
    } else {
      this.setState({ isLoading: true });
      this.props.actions.generalProcess(constants.getPickupListDetail, requestCreator.createPickupListDetailRequest(this.props.pickupListID));
    }
    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequestForType({
      "currentPageNo": 1,
      "pageSize": 10
    }, { type: "allTypes" }));
  }

  componentWillUnmount() { }

  componentWillReceiveProps(nextProps, props) {
    if (this.props.pickupListID && (nextProps.pickupListDetail !== this.state.pickupListDetail)) {
      let pickupListDetail = _.get(nextProps.pickupListDetail, `data[0][${_.get(nextProps.pickupListDetail, 'typeName', '')}]`, []);
      if (pickupListDetail && pickupListDetail.length) {
        for (let pdl of pickupListDetail) {
          pdl["actions"] = [
            { label: "Can't Delete", iconName: "fa fa-ban", actionType: "COMPONENT_FUNCTION" }
          ]
        }
      }
      this.setState({
        typeDataList: nextProps.typeDataList,
        isLoading: false
      });
      if (this.props.pickupListID != 'newType') {
        this.setState({
          pickupListID: nextProps.pickupListID,
          typeName: nextProps.typeName,
          type: nextProps.type,
          typeForm: {
            typeName: nextProps.typeName,
            type: nextProps.type
          },
          pickupListDetail: pickupListDetail,
          pickupList: nextProps.pickupListDetail
        });
      }
    }
  }

  ActionHandlers = ({ actionName, index }) => {
    switch (actionName) {
      case "Delete":
        let result = confirm("Are you you want to delete?");
        if (result) {
          if (index > -1) {
            let a = [...this.state.pickupListDetail];
            a.splice(index, 1);
            this.setState({ pickupListDetail: a });
          }
        }
        break;
      default:
        break;
    }
  }

  addToList = () => {
    console.log('this.state.pickupListDetail', this.state.pickupListDetail)
    if (this.state.addForm && this.state.addForm.label && this.state.addForm.value) {
      let temp = {
        label: this.state.addForm.label,
        value: this.state.addForm.value,
        actions: [
          { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }
        ]
      }
      this.setState({
        pickupListDetail: [
          ...this.state.pickupListDetail,
          temp
        ],
        addForm: {}
      });
    }
  }

  submit = () => {
    let typeNameDetails = [...this.state.pickupListDetail];
    for (let elems of typeNameDetails) {
      delete elems.actions;
    }
    this.props.actions.generalProcess(constants.updateTypeData, {
      id: this.state.pickupListID || undefined,
      typeName: this.state.typeForm.typeName,
      type: this.state.typeForm.type,
      typeNameDetails: typeNameDetails || []
    });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div>
          <Portlet title={"Add Type"}>
            <Row>
              <Col>
                <Lable columns='1' text={utils.getLabelByID("Type Name")} />
                <Input fieldname='typeName' formname='typeForm' columns='5' style={{}}
                  state={this.state} actionHandler={this.generalActionHandler} />
                <Lable columns='1' text={utils.getLabelByID("category")} />
                <Select fieldname='type' formname='typeForm' columns='5' style={{}}
                  state={this.state} typeName="typeDataList" dataSource={this.state}
                  multiple={false} actionHandler={this.generalActionHandler} />
              </Col>
            </Row>
          </Portlet>
          <Portlet title={"Pickup List Detail"}>
            <Row>
              <Col>
                <Lable columns='1' text={utils.getLabelByID("Label")} />
                <Input fieldname='label' formname='addForm' columns='5' style={{}}
                  state={this.state} actionHandler={this.generalActionHandler} />
                <Lable columns='1' text={utils.getLabelByID("Value")} />
                <Input fieldname='value' formname='addForm' columns='5' style={{}}
                  state={this.state} actionHandler={this.generalActionHandler} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Col>
                  <div className="pull-right">
                    <button type="submit" className="btn btn-default" onClick={this.addToList}>
                      <i className="fa fa-plus" /> {utils.getLabelByID("Add")}
                    </button>
                  </div>
                </Col>
              </Col>
            </Row>
            <br />
            <Col>
              <Table
                pagination={false}
                export={false}
                search={true}
                // pageChanged={this.pageChanged}
                gridColumns={utils.getGridColumnByName("PickUPEdit")}
                gridData={this.state.pickupListDetail}
                // totalRecords={this.state.pickupList.pageData.totalRecords}
                componentFunction={this.ActionHandlers}
                activePage={1}
                pageSize={10}
              />
            </Col>
            <br />
            <br />
            <Row>
              <Col>
                <Col>
                  <div className="pull-right">
                    <button type="submit" className="btn green" onClick={this.submit}>
                      {utils.getLabelByID("Save")}
                    </button>
                  </div>
                </Col>
              </Col>
            </Row>
          </Portlet>

        </div >
      );
    }
    else {
      return (<div className="loader">Loading...</div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  let getTypeDataDetailByID;
  let typeName;
  let type;
  let pickupListDetail;
  if (_.get(state.app.getTypeDataDetailByID, 'data', {})) {
    getTypeDataDetailByID = _.get(state.app.getTypeDataDetailByID, 'data', {});
    typeName = _.get(getTypeDataDetailByID, 'typeName', []);
    type = _.get(getTypeDataDetailByID, 'type', []);
    pickupListDetail = getTypeDataDetailByID.data ? getTypeDataDetailByID : (getTypeDataDetailByID.data = getTypeDataDetailByID[typeName]);
  }

  if (!pickupListDetail) {
    pickupListDetail = [];
  }

  return {
    pickupListDetail,
    typeName,
    type,
    pickupListID: ownProps.params.pickupListID,
    typeData: state.app.typeData.data,
    readOnly: ownProps.params.mode === "view",
    typeDataList: _.get(state.app, 'typeDataListByType.data.searchResult[0].data.allTypes', undefined),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

PickupListSetupContainer.displayName = "PickupListSetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(PickupListSetupContainer);