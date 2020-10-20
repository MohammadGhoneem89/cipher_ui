import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Portlet from '../../common/Portlet.jsx';
import { SubmissionError } from 'redux-form'
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import _, { forEach } from 'lodash';
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
      enumList: {},
      pickupListID: undefined,
      consortiumNames: undefined,
      index: undefined,
      pickupList: undefined,
      isLoading: false,
      typeName: undefined,
      type: undefined,
      addForm: {},
      editmode: false,
      typeForm: {},
      isNew: false
    };

    this.submit = this.submit.bind(this);
    this.generalActionHandler = gen.generalHandler.bind(this);

  }

  componentWillMount() {

  }



  addDefaultSrc = e => e.target.src = "/assets/imgs/user.jpg";

  imgDiv() {
    return (
      <div className="col-md-12" style={{ textAlign: "center" }}>
        <img
          id="UserProfilePic"
          src={this.state.addForm.profilePic ? constants.baseUrl + this.state.addForm.profilePic : constants.baseUrl + "/images/blank.png"}
          onError={this.addDefaultSrc}
          className="img-responsive img-thumbnail" alt="Profile Image" width='105px'
          height='190px'
          ref={input => this.profilePic = input}
        />
        <br />
        <span
          className="label label-primary"
          style={{ cursor: "pointer" }}
          disabled={this.state.view}
          onClick={() => {
            console.log('Upload Image Clicked.')
            this.profilePicUploader.click();
          }}
        >
          {"Upload Image"}
        </span>

        <button
          className="btn green"
          style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0', display: "none" }}
          onClick={() => {
            this.profilePicUploader.click();
          }}
        >
          {"Upload Image"}
        </button>

        <input
          name="profilePicUploader"
          id='profilePicUploader'
          type='file'
          disabled={this.state.view}
          style={{ display: 'none' }}
          ref={input => this.profilePicUploader = input}
          onChange={(e) => {
            console.log('Profile pic on change')
            let reader = new FileReader();
            let files = e.target.files;
            let _this = this;

            if (files && files[0]) {

              reader.onload = function (fileReader) {
                _this.profilePic.setAttribute('src', fileReader.target.result);

                _this.props.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
                  byteData: fileReader.target.result,
                  context: {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type
                  }
                })).then(result => {
                  console.log(">>>>>>>>>>>||",JSON.stringify(result))
                  _this.setState({
                    addForm:{
                      ..._this.state.addForm,
                      profilePic: result.responseMessage.data.entityLogo.sizeSmall,
                      path: result.responseMessage.data.entityLogo.sizeSmall
                    }
                  
                  })
                });
              };
              reader.readAsDataURL(files[0]);
            }
          }} />
      </div>
    )
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

    this.props.actions.generalProcess(constants.getTypeDataList, {})
    this.props.actions.generalProcess(constants.getPickupListByType, requestCreator.createPickupListRequestForType({
      "currentPageNo": 1,
      "pageSize": 10
    }, { type: "allTypes" }));
  }

  componentWillUnmount() { }

  componentWillReceiveProps(nextProps, props) {
    if (this.props.pickupListID && nextProps.enumList && (nextProps.pickupListDetail !== this.state.pickupListDetail)) {


      let eList = []
      for (let key in nextProps.enumList) {
        eList.push({
          "label": key,
          "value": key
        });
      }
      let pickupListDetail = _.get(nextProps.pickupListDetail, `data.data[0][${nextProps.typeName}]`, []);

      let pickupListDetailIP = _.get(nextProps.pickupListDetail, `data`, {});
      console.log(">>>>>>>>>>", JSON.stringify(pickupListDetailIP))
      let isForign = _.get(pickupListDetailIP, 'isForign', false)

      if (pickupListDetail && pickupListDetail.length) {
        for (let pdl of pickupListDetail) {
          if (isForign) {
            let isInActive = _.get(pdl, 'isInActive', false)
            if (isInActive) {
              pdl["actions"] = [
                { label: 'Activate', iconName: "fa fa-check", actionType: "COMPONENT_FUNCTION" },
                { label: 'Edit', iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }

              ]
            } else {
              pdl["actions"] = [
                { label: 'Deactivate', iconName: "fa fa-check", actionType: "COMPONENT_FUNCTION" },
                { label: 'Edit', iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
              ]
            }
          } else {
            pdl["actions"] = [
              { label: "Delete", iconName: "fa fa-ban", actionType: "COMPONENT_FUNCTION" },
              { label: 'Edit', iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
            ]
          }
        }
      }
      this.setState({
        enumList: nextProps.enumList,
        eList: eList,
        isForign: isForign,
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
      case "Activate":
        let resultA = confirm("Are you you want to Activate?");
        if (resultA) {
          if (index > -1) {
            let a = [...this.state.pickupListDetail];
            let interm = a[index];
            interm.isInActive = false;
            a.splice(index, 1);
            interm["actions"] = [
              { label: 'Deactivate', iconName: "fa fa-check", actionType: "COMPONENT_FUNCTION" },
              { label: 'Edit', iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
            ]

            a.push(interm);
            this.setState({ pickupListDetail: a });
          }
        }
        break;
      case "Edit":
        if (index > -1) {
          let a = [...this.state.pickupListDetail];
          let interm = a[index];
          a.splice(index, 1);
          interm['profilePic']=interm.path;

          let lst = _.get(this.state.enumList, interm.dependent, [])
          let fLst = []
          lst.forEach((key) => {
            fLst.push({
              "label": key,
              "value": key
            });
          })
          


          this.setState({ pickupListDetail: a,fLst: fLst, addForm: interm, editmode: true });
        }
        break;
      case "Deactivate":
        let resultD = confirm("Are you you want to Deactivate?");
        if (resultD) {
          if (index > -1) {
            let a = [...this.state.pickupListDetail];
            let interm = a[index];
            interm.isInActive = true;
            a.splice(index, 1);
            interm["actions"] = [
              { label: 'Activate', iconName: "fa fa-check", actionType: "COMPONENT_FUNCTION" },
              { label: 'Edit', iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
            ]
            a.push(interm);
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

    if (!this.state.addForm.label || !this.state.addForm.value) {
      return alert('label and value is required');
    }
    if (this.state.addForm && this.state.addForm.label && this.state.addForm.value) {

      let temp = {
        label: this.state.addForm.label,
        labelAr: this.state.addForm.labelAr,
        dependent: this.state.addForm.dependent,
        value: this.state.addForm.value,
        parentValue: this.state.addForm.parentValue,
        path: this.state.addForm.path,
        actions: [
          { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" },
          { label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }
        ]
      }

      this.setState({
        pickupListDetail: [
          ...this.state.pickupListDetail,
          temp
        ],
        editmode: false,
        addForm: {
          profilePic: '/images/blank.png',
          path: '/images/blank.png'
        }
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
      isForign: this.state.isForign,
      typeNameDetails: typeNameDetails || []
    });
  }

  render() {
    let obj = { list: [] }
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
                <Input fieldname='label' formname='addForm' columns='2' style={{}}
                  state={this.state} actionHandler={this.generalActionHandler} />
                <Lable columns='1' text={utils.getLabelByID("LabelAr")} />
                <Input fieldname='labelAr' formname='addForm' columns='2' style={{ textAlign: "right" }}
                  state={this.state} actionHandler={this.generalActionHandler} />
                <Lable columns='1' text={utils.getLabelByID("Value")} />
                <Input fieldname='value' disabled={this.state.editmode} formname='addForm' columns='2' style={{}}
                  state={this.state} actionHandler={this.generalActionHandler} />
                <Lable columns='1' text={utils.getLabelByID("Parent")} />
                <Select fieldname='dependent' formname='addForm' columns='2' style={{}}
                  state={this.state} typeName="eList" dataSource={this.state} isDDL={true}
                  multiple={false} actionHandler={(formname, fieldname, type, evt) => {

                    let lst = _.get(this.state.enumList, evt.target.value, [])
                    console.log(JSON.stringify(lst), evt.target.value)
                    let fLst = []
                    lst.forEach((key) => {
                      fLst.push({
                        "label": key,
                        "value": key
                      });
                    })
                    let state = this.state[formname];
                    _.set(state, fieldname, evt.target.value);
                    this.setState({ fLst: fLst, [formname]: state })
                    // this.generalActionHandler.call(formname, fieldname, type, evt);
                  }} />
                <Lable columns='1' text={utils.getLabelByID("Parant Value")} />
                <Select fieldname='parentValue' formname='addForm' columns='2' style={{}}
                  state={this.state} typeName="fLst" dataSource={this.state} isDDL={true}
                  multiple={false} actionHandler={this.generalActionHandler} />
                {/* <Lable columns='1' text={utils.getLabelByID("Logo")} /> */}
                {/* <Input fieldname='path' formname='addForm' columns='2' style={{}}
                  state={this.state} actionHandler={this.generalActionHandler} /> */}

                {this.imgDiv()}
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
  if (_.get(state.app.getTypeDataDetailByID, 'data', undefined)) {
    getTypeDataDetailByID = _.get(state.app.getTypeDataDetailByID, 'data', {});
    typeName = _.get(getTypeDataDetailByID, 'typeName', []);
    type = _.get(getTypeDataDetailByID, 'type', []);
    pickupListDetail = _.get(state.app, 'getTypeDataDetailByID', undefined)
  }

  return {
    pickupListDetail,
    typeName,
    type,
    pickupListID: ownProps.params.pickupListID,
    typeData: state.app.typeData.data,
    readOnly: ownProps.params.mode === "view",
    typeDataList: _.get(state.app, 'typeDataListByType.data.searchResult[0].data.allTypes', undefined),
    enumList: _.get(state.app, 'enumList.data', []),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

PickupListSetupContainer.displayName = "PickupListSetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(PickupListSetupContainer);