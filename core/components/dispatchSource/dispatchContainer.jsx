/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import cloneDeep from 'lodash/cloneDeep';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
const initialState = {
  EventDispatcherDetails: {
    "dispatcherName": "",
    "dispatchFunction": "",
    "filePath": "",
    "groupName": "",
    "requestBody": "",
    "requestHeader": "",
    "requestURL": "",
    "templateId": "",
    "type": ""
  },
  typeData: undefined,
  EventDispatcherTypeList: undefined,
  isEdit: false,
  isLoading: true,
  isCustom: true
};
class dispatchContainer extends React.Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = cloneDeep(initialState)

  }
  componentWillMount() { }
  componentDidMount() {
    this.setState({
      EventDispatcherDetails: cloneDeep(initialState.EventDispatcherDetails)
    }, () => {
      this.props.actions.generalProcess(constants.getDispatcherMeta);
      this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['dispatchType']));
      if (this.props.dispatcherName !== "NEWDISP") {
        let req = {
          dispatcherName: this.props.dispatcherName,
        }
        //  console.log(req)
        this.props.actions.generalProcess(constants.getEventDispatcherByID, req);
        this.setState({ isEdit: true })
      }
    });
  }




  clearFields() {
    $('#simuDefination').find('input:text').val('');
    $('#simuDefination').find('textarea').val('');
  }
  componentWillReceiveProps(nextProps) {

    if (this.props.dispatcherName !== "NEWDISP") {
      if (nextProps.EventDispatcherDetails.data) {
        this.setState({
          EventDispatcherDetails: {
            "dispatcherName": nextProps.EventDispatcherDetails.data.dispatcherName,
            "dispatchFunction": nextProps.EventDispatcherDetails.data.dispatchFunction,
            "filePath": nextProps.EventDispatcherDetails.data.filePath,
            "groupName": nextProps.EventDispatcherDetails.data.groupName,
            "requestBody": nextProps.EventDispatcherDetails.data.requestBody,
            "requestHeader": nextProps.EventDispatcherDetails.data.requestHeader,
            "requestURL": nextProps.EventDispatcherDetails.data.requestURL,
            "templateId": nextProps.EventDispatcherDetails.data.templateId,
            "type": nextProps.EventDispatcherDetails.data.type
          }
        });
      }
    } else {
      this.setState({
        EventDispatcherDetails: cloneDeep(initialState.EventDispatcherDetails)
      });
    }
    if (nextProps.EventDispatcherTypeList.data) {

      this.setState({
        EventDispatcherTypeList: nextProps.EventDispatcherTypeList.data
      }, () => {
        if (this.state.typeData) {
          this.setState({ isLoading: false })
        }
      });
    }

    if (nextProps.typeData.data) {
      this.setState({
        typeData: nextProps.typeData.data
      }, () => {
        if (this.state.EventDispatcherTypeList) {
          this.setState({ isLoading: false })
        }
      });
    }
  }


  formSubmit() {
    let data = cloneDeep(this.state.EventDispatcherDetails);
    if (data.dispatcherName.trim() == "") {
      alert("Dispatcher Name must be defined");
      return false;
    }

    if (data.type == "API" && data.requestURL.trim() == "") {
      alert("Request URL must be defined");
      return false;
    }

    if (data.type == "CUSTOM" && (data.filePath.trim() == "" || data.dispatchFunction.trim() == "")) {
      alert("filePath & dispatchFunction must be defined");
      return false;
    }

    if (data.type == "EMAIL" && (data.templateId.trim() == "" || data.groupName.trim() == "")) {
      alert("template & groupName must be defined");
      return false;
    }

    if (data.requestBody != "") {
      try {
        JSON.parse(data.requestBody)
      } catch (ex) {
        alert("Request Body must be a valid JSON!");
        return false;
      }
    }
    if (data.requestHeader != "") {
      try {
        JSON.parse(data.requestHeader)
      } catch (ex) {
        alert("Request Header must be a valid JSON!");
        return false;
      }
    }

    this.props.actions.generalProcess(constants.upsertEventDispatcher, data);
  }

  onInputChange = (e) => {

    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    this.state.EventDispatcherDetails[e.target.name] = value;
    this.setState({
      [e.target.name]: value
    })
  };

  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }

    return (
      <Portlet title={utils.getLabelByID("DC_DispatcherDefiniation")}>
        <div className="row">
          <div className="portlet-body">
            <div className="form-body" >
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_dispatcherName")}</label>
                      <div className="form-group col-md-8">
                        {/* {console.log(initialValues)} */}
                        <input type="text" className="form-control" name="dispatcherName" onChange={this.onInputChange} disabled={this.state.isEdit} value={this.state.EventDispatcherDetails.dispatcherName} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_type")}</label>
                      <div className="form-group col-md-8">
                        <select name="type" defaultValue={this.state.EventDispatcherDetails.type} onChange={this.onInputChange} className="form-control">
                        <option key="" value="">--select--</option>
                          {
                            this.state.typeData.dispatchType.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="row" style={{ display: this.state.EventDispatcherDetails.type !== "CUSTOM" ? 'none' : 'block' }}>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_filePath")}</label>
                      <div className="form-group col-md-8">
                        {/* {console.log(initialValues)} */}
                        <input type="text" className="form-control" name="filePath" onChange={this.onInputChange} value={this.state.EventDispatcherDetails.filePath} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_dispatchFunction")}</label>
                      <div className="form-group col-md-8">
                        <input type="text" className="form-control" name="dispatchFunction" onChange={this.onInputChange} value={this.state.EventDispatcherDetails.dispatchFunction} />

                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="row" style={{ display: this.state.EventDispatcherDetails.type !== "EMAIL" ? 'none' : 'block' }}>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_groupName")}</label>
                      <div className="form-group col-md-8">
                        <select name="groupName" value={this.state.EventDispatcherDetails.groupName} onChange={this.onInputChange} className="form-control">
                          <option value="">--Select--</option>
                          {this.state.EventDispatcherTypeList.group &&
                            this.state.EventDispatcherTypeList.group.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_emailTemplate")}</label>
                      <div className="form-group col-md-8">
                        <select name="templateId" value={this.state.EventDispatcherDetails.templateId} onChange={this.onInputChange} className="form-control">
                          <option value="">--Select--</option>
                          {this.state.EventDispatcherTypeList.emailTemplate &&
                            this.state.EventDispatcherTypeList.emailTemplate.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div style={{ display: this.state.EventDispatcherDetails.type !== "API" ? 'none' : 'block' }}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_requestURL")}</label>
                        <div className="form-group col-md-8">
                          <input type="text" className="form-control" name="requestURL" onChange={this.onInputChange} value={this.state.EventDispatcherDetails.requestURL} />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_requestHeader")}</label>
                        <div className="form-group col-md-8">
                          <textarea onChange={this.onInputChange} name="requestHeader" value={this.state.EventDispatcherDetails.requestHeader} className="form-control" rows="4" style={{ resize: "none", width: "100%" }} />

                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_requestBody")}</label>
                        <div className="form-group col-md-8">
                          <textarea onChange={this.onInputChange} name="requestBody" value={this.state.EventDispatcherDetails.requestBody} className="form-control" rows="4" style={{ resize: "none", width: "100%" }} />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="btn-toolbar pull-right">
                      <button type="submit" onClick={this.formSubmit} className="btn green">{utils.getLabelByID("Save / Update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </Portlet >
    )
  }

}


dispatchContainer.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  dispatchContainerObj: PropTypes.object,
  MappingConfigData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    EventDispatcherDetails: state.app.EventDispatcherDetails,
    typeData: state.app.typeData,
    EventDispatcherTypeList: state.app.EventDispatcherTypeList,
    dispatcherName: ownProps.params.dispatcherName
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
dispatchContainer.displayName = "dispatchContainer_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(dispatchContainer);

