/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/actions/generalAction';
import * as constants from '../../../core/constants/Communication.js';
import { baseUrl } from '../../../core/constants/Communication.js';
import QRCodeJquery from '../../../core/common/QRCodeJquery.jsx';
import ActionButton from '../../../core/common/ActionButtonNew.jsx';
import * as requestCreator from '../../../core/common/request.js';
import * as utils from '../../../core/common/utils.js';
import InnerGrid from '../../../core/common/Datatable.jsx';
import Steps from '../../../core/common/Steps.jsx';
import ModalBox from '../../../core/common/ModalBox.jsx';
import DateControl from '../../../core/common/DateControl.jsx'
import FileUploader from '../../../core/common/FileUploader.jsx';

import Table from '../../../core/common/Datatable.jsx';
import * as dateFunctions from '../../../core/common/dates.js';
import config from '../../../config';



class SampleDetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.performAction = this.performAction.bind(this);
    this.updateState = this.updateState.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.serviceActionHandlers = this.serviceActionHandlers.bind(this);
    this.addContainers = this.addContainers.bind(this);
    this.containerActionHandlers = this.containerActionHandlers.bind(this);
    this.getUploadResponse = this.getUploadResponse.bind(this);

    this.state = {
      markReconModelIsOpen: false,
      markAuthorizeModelIsOpen: false,
      transactionDetailData: undefined,
      isLoading: true,
      items: [],
      container: [],
      address: '',
      documents: []
    };


  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.props.recordID) {
      let request = {
        "reconID": this.props.recordID
      };
      this.props.actions.generalProcess(constants.getSampleRecordByID, request);
    }


  }
  componentWillReceiveProps(nextProps) {

  }
  getUploadResponse(data) {

    let attachements = this.state.documents;
    attachements.push(data);
    this.setState({ documents: attachements })
  }

  performAction(actionObj) {

    //Input Form Values
    let UUID = utils.CreateGuid();
    let dropdown = document.getElementById('dropdown') == null ? "" : document.getElementById('dropdown').value;
    let textboxValue = document.getElementById('textbox') == null ? "" : document.getElementById('textbox').value;
    let date = $("#date").find("input").val()

    //Popup items
    let items = [];
    for (let itemRowCount = 0; itemRowCount < this.state.items.length; itemRowCount++) {
      let itemValue = {
        "code": this.state.items[itemRowCount].code,
        "description": this.state.items[itemRowCount].description,
        "qty": this.state.items[itemRowCount].qty,
        "value": this.state.items[itemRowCount].value
      }
      items.push(itemValue)

    }

    //Input grid items
    let containers = [];
    for (let containerRowCount = 0; containerRowCount < this.state.container.length; containerRowCount++) {
      containers.push(this.state.container[containerRowCount].container)

    }


    //Attachements
    let documents = this.state.documents || "";

    let Document = {
        "Name": [],
        "IDList": [],
        "Hash": []
    }

    if (documents && documents.length > 0) {
      console.log(JSON.stringify(documents))
        for (let i = 0; i < documents[0].contextData.length; i++) {
            Document.Name.push(documents[0].contextData[i].name)
            Document.IDList.push(documents[0].contextData[i].UUID)
            Document.Hash.push(documents[0].contextData[i].path)
        }
    }


    let reqDocuments = "";

    if (Document.Name.length > 0)
        reqDocuments = JSON.stringify(Document);
    else
        reqDocuments = "";


    let data = {
      "recordID": UUID,
      "dropdown": dropdown,
      "textboxValue": textboxValue,
      "date": date,
      "popupItems": items,
      "inputGridItems": containers,
      "documents": reqDocuments
    }

    console.log(JSON.stringify(data))

    return data;
  
  }

  updateState(data) {
    this.setState(data);
  }

  formSubmit() {

    let itemDescription = document.getElementById('itemDescription') == null ? "" : document.getElementById('itemDescription').value;
    let itemQuantity = document.getElementById('itemQuantity') == null ? "" : document.getElementById('itemQuantity').value;
    let itemValue = document.getElementById('itemValue') == null ? "" : document.getElementById('itemValue').value;
    let code = document.getElementById('code') == null ? "" : document.getElementById('code').value;

    let itemsArray = this.state.items;


    let item = {
      "code": code || "",
      "description": itemDescription || "",
      "qty": itemQuantity || "",
      "value": itemValue || ""
    }


    item.actions = [
      {
        label: "Delete",
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }

    ];

    itemsArray.push(item);

    this.setState({ items: itemsArray })

    $('#modelWindows').modal('hide');

    document.getElementById('itemDescription').value = "";
    document.getElementById('itemQuantity').value = "";
    document.getElementById('itemValue').value = "";
    document.getElementById('code').value = "";

  }
  addContainers() {

    let container = document.getElementById('container') == null ? "" : document.getElementById('container').value;
    let itemsArray = this.state.container;


    let item = {
      "container": container || "",
    }
    item.actions = [
      {
        label: "Delete",
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }

    ];
    itemsArray.push(item);

    this.setState({ container: itemsArray })
    document.getElementById('container').value = "";

  }


  serviceActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        updateState({
          servicesModalIsOpen: true,
          index
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = this.state.items;
          a.splice(index, 1);
          this.setState({ items: a })
        }
        break;
    }
  }
  containerActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        updateState({
          servicesModalIsOpen: true,
          index
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = this.state.container;
          a.splice(index, 1);
          this.setState({ container: a })
        }
        break;
    }
  }
  render() {

    let dropDownItems = [
      {
        "label": "Label1",
        "value": "Value1"
      },
      {
        "label": "Label2",
        "value": "Value2"
      },
      {
        "label": "Label3",
        "value": "Value3"
      }
    ]

    let code = [
      {
        "label": "Label1",
        "value": "Value1"
      },
      {
        "label": "Label2",
        "value": "Value2"
      },
      {
        "label": "Label3",
        "value": "Value3"
      }
    ]

    let actions = []

    let actionItems = {
      "value": "1010",
      "type": "pageAction",
      "label": "COM_AB_Save",
      "labelName": "Approve",
      "params": "",
      "iconName": "icon-docs",
      "URI": [
        "/SIMU/saveSampleData"
      ],
      "children": []
    }
    actions.push(actionItems)

    let isEditMode = this.props.recordID != undefined;
    if (isEditMode) {
      this.state.items = this.props.sampleDetail.popupGrid;
      const contList = this.props.sampleDetail.containers;
      let list = [];
      contList.forEach(value => {
        list.push({ container: value })
      })
      this.state.container = list;
    }
    if (this.props.recordID == undefined || this.props.sampleDetail.recordID != "") {
      return (
        <div>
          <div className="portlet light bordered sdg_portlet">
            <div className="portlet-body">
              <div className="row">
                <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
                  <form className="form-horizontal" role="form">
                    <div className="form-body" style={{ paddingLeft: "18px" }}>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("SampleCrudPage_Dropdown")}</label>
                            <div className="col-md-7">
                              {isEditMode ? <p className="form-control-static">{this.props.sampleDetail.dropdownValue}</p> :
                                <select name="dropdown" id="dropdown" className="form-control">
                                  <option value={""}>SELECT</option>
                                  {dropDownItems.map((option, index) => {
                                    return (
                                      <option key={index} value={option.value}>{option.label}</option>
                                    );
                                  })}
                                </select>
                              }
                            </div>
                          </div>
                        </div>

                        <div className="col-md-1">
                        </div>

                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("SampleCrudPage_Textbox")}</label>
                            <div className="col-md-7">
                              {isEditMode ? <p className="form-control-static">{this.props.sampleDetail.textboxValue}</p> :
                                <input type="text" className="form-control" name="textbox" id="textbox" />
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">


                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("SampleCrudPage_Date")}</label>
                            <div className="col-md-7">
                              {isEditMode ? <p className="form-control-static">{this.props.sampleDetail.dateValue}</p> :
                                <DateControl id="date" />
                              }
                            </div>
                          </div>
                        </div>


                        <div className="col-md-1">
                        </div>

                      </div>


                    </div>
                  </form>
                </div>
              </div>
            </div>


          </div>
          <div className="portlet light bordered sdg_portlet">
            <div className="portlet-title">
              <div className="caption ">
                <span className="caption-subject">{utils.getLabelByID("SampleCrud_Popup")}</span>
              </div>
              <div className="tools grey">
                <a href="javascript:;" className="collapse" data-original-title="" title=""> </a>
              </div>
            </div>
            <div className="portlet-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group col-md-12">
                    <div className="btn-toolbar pull-right">
                      {isEditMode ? '' : <a className="btn red btn-outline btn-circle" href="javascript:;" data-toggle="modal" data-target="#modelWindows"> <i className="fa fa-plus"></i>
                        <span className="hidden-xs">Add </span> </a>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <Table gridColumns={utils.getGridColumnByName("SampleCrud_PopupGridItems")} gridData={this.state.items} componentFunction={this.serviceActionHandlers} />
              </div>

              <div className="modal fade in modal-overflow" id="modelWindows" tabindex="-1" role="basic" aria-hidden="true" style={{ display: "none", paddingTop: "200" }}>
                <div className="modal-dialog" style={{ width: "1000" }}>
                  <div className="modal-content">

                    <div className="modal-body" style={{ padding: "0px" }}>
                      <br />
                      <br />
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{"Code:"}</label>
                            <div className="col-md-7">
                              <select name="code" id="code" className="form-control">
                                <option value={""}>SELECT</option>
                                {code.map((option, index) => {
                                  return (
                                    <option key={index} value={option.value}>{option.label}</option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-1">
                        </div>

                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{"Description:"}</label>
                            <div className="col-md-7">
                              <input type="text" className="form-control" name="itemDescription" id="itemDescription" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{"Quantity:"}</label>
                            <div className="col-md-7">
                              <input type="text" className="form-control" name="itemQuantity" id="itemQuantity" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-1">
                        </div>

                        <div className="col-md-5">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{"Value:"}</label>
                            <div className="col-md-7">
                              <input type="text" className="form-control" name="itemValue" id="itemValue" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <br />
                    <div className="modal-footer">
                      <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{"Save"} </button>
                      {"  "}

                      <button type="button" id="modelNo" className="btn default" data-dismiss="modal" autofocus="autofocus">
                        Close
                                 </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="portlet light bordered sdg_portlet">
            <div className="portlet-title">
              <div className="caption ">
                <span className="caption-subject">{utils.getLabelByID("SampleCrud_InputGrid")}</span>
              </div>
              <div className="tools grey">
                <a href="javascript:;" className="collapse" data-original-title="" title=""> </a>
              </div>
            </div>

            <div className="portlet-body">
              {isEditMode ? '' :
                <div className="row">
                  <div className="col-md-7">
                    <div className="form-group">
                      <label className="control-label col-md-3" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{"Container:"}</label>
                      <div className="col-md-6">
                        <input type="text" className="form-control" name="container" id="container" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="btn-toolbar pull-right">
                      <a className="btn red btn-outline btn-circle" href="javascript:;" onClick={this.addContainers.bind(this)}> <i className="fa fa-plus"></i>
                        <span className="hidden-xs">Add </span> </a>
                    </div>
                  </div>
                </div>
              }
              <div className="row">
                <Table gridColumns={utils.getGridColumnByName("SampleCrud_InputGrid")} gridData={this.state.container} componentFunction={this.containerActionHandlers} />
              </div>

            </div>
          </div>

          <div className="portlet light bordered sdg_portlet">
            <div className="portlet-title">
              <div className="caption ">
                <span className="caption-subject">{utils.getLabelByID("SampleCrud_AttachementSection")}</span>
              </div>
              <div className="tools grey">
                <a href="javascript:;" className="collapse" data-original-title="" title=""> </a>
              </div>
            </div>
            <div className="portlet-body">
              <div className="row">

                <div className="col-centered col-md-12" >
                  <div className="form-group">
                    <FileUploader type="Document" source="Sample" acceptedFiles={config.refundAllowedUploadFiles}
                      getUploadResponse={this.getUploadResponse}
                      maxFiles={config.disputeMaxFileUpload} showAttachementGrid={false} showDropzone={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <ActionButton actionList={actions}
                performAction={this.performAction} />
            </div>
          </div>
        </div>


      )
    }
    else
      return (<div className="loader">Loading...</div>)
  }
}

SampleDetailPage.propTypes = {


  children: PropTypes.object,
  typeData: PropTypes.object,
  sampleDetail: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {

    typeData: state.app.typeData.data,
    recordID: ownProps.params.recordID,
    sampleDetail: state.app.sampleDetail.data,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

SampleDetailPage.displayName = "SampleCrudPage_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(SampleDetailPage);