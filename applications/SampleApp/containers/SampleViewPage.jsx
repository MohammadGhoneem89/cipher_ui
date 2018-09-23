/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions/generalAction';
import * as constants from '../../core/constants/Communication.js';
import { baseUrl } from '../../core/constants/Communication.js';
import QRCodeJquery from '../../core/components/QRCodeJquery.jsx';
import ActionButton from '../../core/components/ActionButtonNew.jsx';
import * as requestCreator from '../../core/common/request.js';
import * as utils from '../../core/common/utils.js';
import Table from '../../core/standard/Datatable.jsx';
import Steps from '../../core/components/Steps.jsx';
import { isThisSecond } from 'date-fns';


class SampleViewPage extends React.Component {

  constructor(props) {
    super(props);
    this.performAction = this.performAction.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      sampleViewPageData: undefined,
      isLoading: true
    };

  }
  componentWillMount() {
  }

  componentDidMount() {
    let request = {
      "recordID": this.props.recordID
    };
    this.props.actions.generalProcess(constants.getSampleViewPageData, request);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sampleViewPageData) {

      this.setState({
        sampleViewPageData: nextProps.sampleViewPageData,
        isLoading: false
      });
    }
  }

  generateQRCode(BlockChainAddress) {
    let qrString = constants.blockChainViewer + BlockChainAddress;
    return (<div><QRCodeJquery size="160" errorCorrectionLevel="H" qrString={qrString} />
      <span>  </span><span style={{ paddingLeft: "12px", fontSize: "5" }} /></div>)
  }
  performAction(actionObj) {
    let saveRequest = {
      "recordID": this.props.recordID,
      "textboxValue": document.getElementById('textbox').value,
      "drodownValue": document.getElementById('dropdown').value,
    };

    return saveRequest;
  }
  updateState(data) {
    this.setState(data);
  }
  render() {
    let dropdownItems = [
      {
        "label": "Item 1",
        "value": "Value 1"
      },
      {
        "label": "Item 2",
        "value": "Value 2"
      }
    ];
    if (!this.state.isLoading) {
      return (
        <div>
          <div className="portlet light bordered">
            <div className="portlet-body">
              <div className="row">
                <Steps statusList={this.state.sampleViewPageData.statusList} />
                <hr />
                <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
                  <form className="form-horizontal" role="form">
                    <div className="form-body" style={{ paddingLeft: "18px" }}>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="control-label" style={{
                            textAlign: "left",
                            fontSize: "30px",
                            fontWeight: "bold"
                          }}>{this.state.sampleViewPageData.detailData.name}{this.state.sampleViewPageData.detailData.code !== '' ? " (" + this.state.sampleViewPageData.detailData.code + ")" : ''}  </label>
                          <br /><span style={{
                            fontSize: "25px",
                            color: "#5dc45a",
                            fontWeight: "bold"
                          }}>{this.props.recordID}</span>
                        </div>
                        <div className="col-md-4" style={{ paddingLeft: "80px" }}>
                          <img className="item-pic"
                            src={this.state.sampleViewPageData.detailData.image === "" ? "../assets/Resources/No_Image_Found.png" : baseUrl + this.state.sampleViewPageData.detailData.image}
                            style={{ width: "130px" }} />
                        </div>
                        <div className="col-md-2 pull-right">
                          {this.generateQRCode(this.state.recordID)}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("sample_Label1")}</label>
                            <div className="col-md-7">
                              <p className="form-control-static"> {this.state.sampleViewPageData.detailData.value1} </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("sample_Label2")}</label>
                            <div className="col-md-7">
                              <p className="form-control-static"> {this.state.sampleViewPageData.detailData.value2} </p>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-4">

                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("sample_Label3")}</label>
                            <div className="col-md-7">
                              <p
                                className="form-control-static"> {this.state.sampleViewPageData.detailData.value3} </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="control-label col-md-5" style={{
                              textAlign: "left",
                              fontWeight: "bold"
                            }}>{utils.getLabelByID("sample_Label4")}</label>
                            <div className="col-md-7">
                              <p
                                className="form-control-static"> {this.state.sampleViewPageData.detailData.value4} </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </form>
                </div>

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {!this.state.isLoading && <Table
                title={utils.getLabelByID("sample_gridHeading")} fontclass=""
                TableClass="portlet light bordered sdg_portlet"
                gridColumns={utils.getGridColumnByName("sampleViewPageGridColumns")}
                gridData={this.props.sampleViewPageData.listData.rows}
                totalRecords={this.props.sampleViewPageData.listData.pageData.totalRecords}
                searchCallBack={this.searchCallBack} pageChanged={this.pageChanged} search={true}
                pagination={false} pageSize={10} activePage={this.state.currentPageNo} />}
              {this.state.isLoading && <div className="loader">{utils.getLabelByID("Loading")}</div>}
            </div>
          </div>

          {this.state.sampleViewPageData.currentStatus == 'Status5' &&
            <div className="row">
              <div className="col-md-12 ">
                <div className="portlet light bordered sdg_portlet">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject">{utils.getLabelByID("sampleInputHeading")}</span></div>
                    <div className="tools">
                      <a href="javascript:;" className="collapse" data-original-title title> </a>

                    </div>
                  </div>
                  <div className="portlet-body" id="sampleListView">
                    <div className="form-body ">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("sample_TextBox")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="textbox" id="textbox" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("sample_Dropdown")}</label>
                          </div>
                          <div className="form-group col-md-8">
                            <select id="dropdown" name="dropdown" className="form-control">
                              <option value={""}>{utils.getLabelByID("SELECT")}</option>
                              {dropdownItems.map((option, index) => {
                                return (
                                  <option key={index} value={option.value}>{option.label}</option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="form-actions right">
                        <div className="form-group col-md-12">
                          <ActionButton actionList={this.state.sampleViewPageData.actions}
                            performAction={this.performAction} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          }
        </div >

      );
    }
    else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

SampleViewPage.propTypes = {

  sampleViewPageData: PropTypes.object,
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    sampleViewPageData: state.app.sampleViewPageData.data,
    recordID: ownProps.params.recordID
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

SampleViewPage.displayName = "sample_viewPageHeading";
export default connect(mapStateToProps, mapDispatchToProps)(SampleViewPage);