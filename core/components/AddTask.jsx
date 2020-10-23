/*standard imports*/
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../actions/generalAction";
import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import * as gen from '../common/generalActionHandler'
import * as utils from '../common/utils.js';
import Portlet from '../common/Portlet.jsx';
import _ from 'lodash';
import Input from '../common/Input.jsx';
import DateControl from '../common/DateControl.jsx';
import ModalBox from '../common/ModalBox.jsx';
import Combobox from '../../core/common/Select.jsx';
import Checkbox from '../../core/common/CheckBox.jsx';
import DateTimeField from "react-bootstrap-datetimepicker";
import { browserHistory } from 'react-router';

class Task extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: false,
      schedule_time: "",//moment(moment().subtract(1, 'days').format('DD/MM/YYYY'), 'DD/MM/YYYY').startOf('day').unix(),
      responseModal: false,
      responseIndex: "",
      EventDispatcherTypeList: undefined,
      getOneTask:'',
      fields:[],
      EventDispatcherDetails: {
        "groupName": "",
        "templateId": ""
      },
      mapping: {},
      isLoading:false,
      epochTime:0,
      newTime:''
    },
    this.generalHandler = gen.generalHandler.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.props.params.id) {
      let body={
        id:this.props.params.id
      }
    this.props.actions.generalProcess(constants.getTask,body);
    }
    let arr = [
      {
        label: 'EMAIL', 
        value: 'EMAIL'
      },
      {
        label: 'API', 
        value: 'API'
      }
    ]
    this.setState({
      fields:arr
    })
    this.props.actions.generalProcess(constants.getDispatcherMeta);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.EventDispatcherTypeList.data) {
      console.log("nextProps.EventDispatcherTypeList.data",nextProps.EventDispatcherTypeList.data);
      this.setState({
          EventDispatcherTypeList: nextProps.EventDispatcherTypeList.data
      });
    }
      if (nextProps.getOneTask) {
        let mapping= {}
        mapping.task_name = nextProps.getOneTask.data.task_name;
        mapping.api_url = nextProps.getOneTask.data.api_url;
        mapping.json_payload = nextProps.getOneTask.data.json_payload;
        mapping.task_type = nextProps.getOneTask.data.task_type;
        mapping.recurring = nextProps.getOneTask.data.recurring;
        mapping.group_ = nextProps.getOneTask.data.group_;
        mapping.email_template_id = nextProps.getOneTask.data.email_template_id;
        mapping.schedule_time = nextProps.getOneTask.data.schedule_time;
        this.setState({
          mapping,
          getOneTask: nextProps.getOneTask.data,
          epochTime:nextProps.getOneTask.data.schedule_time
        });
    }
  }

  onChangeCheckbox(check) {
    let mapping = _.cloneDeep(this.state.mapping)
    mapping.recurring=check
    if (check==true) {
      this.setState({
        checked: false,
        mapping
      })
    }else{
      this.setState({
        checked: true,
        mapping
      })
    }
  }

  onStartDateChange = value => {
    console.log("value",value);
    let epochTime=value
    let mapping = _.cloneDeep(this.state.mapping)
    mapping.schedule_time=value
    value == 'Invalid date' ? this.setState({schedule_time: undefined}) : this.setState({mapping,epochTime});
  };

  addTask = () =>{
    if (this.props.params.id) {
      if (this.state.mapping) {
        console.log("this.state.mapping1",this.state.mapping);

        console.log("add Task"  )
        console.log("this.state.EventDispatcherDetails",this.state.EventDispatcherDetails);
        let body = this.state.mapping
        body.schedule_time = this.state.epochTime
        // body.recurring = this.state.checked
        // body.group_ = this.state.EventDispatcherDetails.group_
        // body.email_template_id = this.state.EventDispatcherDetails.email_template_id
        body.id=this.props.params.id
        this.setState({
          isLoading:true
        })
        console.log("body1",body);
        if (this.state.mapping.task_type=='API') {
          body.email_template_id=''
          body.group_=''
        }
        console.log("body1",body);
        this.props.actions.generalAjxProcess(constants.editTask, body).then(x=>{
          this.setState({
            isLoading:false,
          })
          browserHistory.push(`/task`)
        })
      }
    }else{
      if (this.state.mapping) {
        console.log("this.state.mapping2",this.state.mapping);
        console.log("this.state.EventDispatcherDetails",this.state.EventDispatcherDetails);
        let body = this.state.mapping
        body.schedule_time = this.state.epochTime
        // body.recurring = this.state.checked
        // body.group_ = this.state.EventDispatcherDetails.group_
        // body.email_template_id = this.state.EventDispatcherDetails.email_template_id
        this.setState({
          isLoading:true
        })
        console.log("body2",body);
        
        if (this.state.mapping.task_type=='API') {
          body.email_template_id=''
          body.group_=''
        }
        
        console.log("body2",body);
        this.props.actions.generalAjxProcess(constants.addTask, body).then(x=>{
          this.setState({
            isLoading:false,
          })
        })
      }
    }
  }

  onInputChange = (e) => {
    console.log("e.targete.targete.target",e.target.value);
    console.log("e.targete.targete.target",e.target.name);
    let value;
    if (e.target.name.indexOf('is') === 0) {
        value = $("#" + e.target.name).is(":checked");
    } else {
        value = e.target.value;
    }
  //  this.state.EventDispatcherDetails[e.target.name] = value;
    let mapping = _.cloneDeep(this.state.mapping)
    mapping[e.target.name] = value
    console.log(mapping)
      this.setState({
        mapping
      })
  
};

  render() {
    {console.log("state ========= ", this.state)}
    if (this.state.isLoading) {
      return(
        <div>
          {this.state.isLoading && <div className="col-md-12"><div className="loader">{utils.getLabelByID("Loading")}</div></div>}
        </div>
      )
    }

    return (
      <Portlet title={"add task"}>
        <div className="row">
          <ModalBox isOpen={this.state.responseModal}>
          </ModalBox>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group col-md-4">
                <label className="control-label">Task Name</label>
              </div>
              <div className="form-group col-md-8">
                <Input
                  fieldname='task_name'
                  formname='mapping'
                  placeholder=''
                  state={this.state}
                  actionHandler={this.generalHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group col-md-4">
                <label className="control-label">API URL</label>
              </div>
              <div className="form-group col-md-8">
                <Input
                  fieldname='api_url'
                  formname='mapping'
                  placeholder=''
                  state={this.state}
                  actionHandler={this.generalHandler}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group col-md-4">
                <label className="control-label">Schedule Date</label>
              </div>
              <div className="form-group col-md-8">
                {/* <DateControl
                  id='onStartDateChange'
                  value={this.state.mapping.schedule_time?moment.unix(this.state.mapping.schedule_time/1000).format('DD/MM/YYYY'):moment().format('DD/MM/YYYY')}
                  // // defaultValue={utils.UNIXConvertToDateWithout1000(this.state.schedule_time)}
                  dateChange={this.onStartDateChange}
                /> */}

                <DateTimeField
                    inputFormat={'DD/MM/YYYY HH:mm:ss'}
                    id="onStartDateChange"
                    onChange={this.onStartDateChange}
                    // changed={this.state.newTime}
                />


              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group col-md-4">
                <label className="control-label">Payload</label>
              </div>
              <div className="form-group col-md-8">
                <Input
                  fieldname='json_payload'
                  formname='mapping'
                  placeholder=''
                  state={this.state}
                  actionHandler={this.generalHandler}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group col-md-4">
                <label className="control-label">Task Type</label>
              </div>
              <div className="form-group col-md-8">
              <Combobox isDDL={true} fieldname='task_type' formname='mapping'  style={{}}
              selected={this.state.mapping.task_type} 
              state={this.state} typeName="options" 
              value={this.state.mapping.task_type}
              dataSource={(() => {
                let options = [];
                this.state.fields.map(item => {
                  options.push({ label: item.label, value: item.value });
                });
                return { options };
              })()} multiple={false} actionHandler={this.generalHandler} />
              </div>
            </div>
          </div>

        {this.state.mapping&&this.state.mapping.task_type=='EMAIL'?
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("DC_groupName")}</label>
                  <div className="form-group col-md-8">
                      <select name="group_" value={this.state.mapping.group_} onChange={this.onInputChange} className="form-control">
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
                    <select name="email_template_id" value={this.state.mapping.email_template_id} onChange={this.onInputChange} className="form-control">
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
          :""}

          <div className="row">
            <div className="col-md-6">
              <div className="form-group col-md-4">
                <label className="control-label">Isrecurring</label>
              </div>
              <div className="form-group col-md-8">
              <Checkbox
                fieldname={this.state.checked}
                formname={this.state.checked}
                value={this.state.mapping.recurring}
                checked={this.state.mapping.recurring}
                style={{}}
                actionHandler={this.onChangeCheckbox}
                disabled={false}
            />
              </div>
            </div>
          </div>
          <div className="form-actions right">
            <div className="form-group col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" className="btn green"
                onClick={this.addTask.bind(this)}>{utils.getLabelByID(this.props.params.id?"Update Task":'Add Task')} </button>
              </div>
            </div>
          </div>
        </div>
      </Portlet>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
        EventDispatcherTypeList: state.app.EventDispatcherTypeList,
        getOneTask: state.app.getTask
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

Task.displayName = "Task";
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);

