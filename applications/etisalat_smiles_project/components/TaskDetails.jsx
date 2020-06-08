/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
//import * as constants from "../../../core/constants/Communication.js";

//import * as constants from "../constants/appCommunication.js";
import * as constants from '../../../core/constants/Communication.js';

import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import * as gen from '../common/generalActionHandler'

//import * as constants from '../../../core/constants/Communication.js';

//import * as utils from '../common/utils.js';
import * as utils from '../../../core/common/utils.js';

import Portlet from '../../../core/common/Portlet.jsx';
//import Portlet from '../common/Portlet.jsx';
//import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import Input from '../../../core/common/Input.jsx';
//import Checkbox from '../../../core/common/CheckBox.jsx';
import Table from '../../../core/common/Datatable.jsx';
import moment from 'moment';
import DateControl from '../../../core/common/DateControl.jsx';
import ModalBox from '../../../core/common/ModalBox.jsx';
import Label from '../../../core/common/Lable.jsx';
import TextArea from '../../../core/common/Textarea.jsx';
import { thresholdScott } from "d3";
// import DateControl from "../../../core/common/DateControl.jsx";
// import Combobox from '../../../core/common/Select.jsx';

class TaskDetails extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            checked: false,
            valid: true,
            addShop:{},
            searchCriteria: {},
            gridData:[],
            gridData2:[],
            schedule_time:"",
            responseModal:false,
            responseIndex:"",
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }
   

    
    componentWillMount() {
    }

    componentDidMount() {
        //let id = this.props.match.params.id;
        //console.log("---------------props----",this.props.id)
        console.log("------------------------ID", this.props.params.id)
      //  console.log("---------------props",this.props.match.params.id)
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
            ]));
            this.props.actions.generalProcess(constants.getTask, {});
            let request={
                "body":{
                    task_id: this.props.params.id //this.props.id
                }
            }
            this.props.actions.generalProcess(constants.searchTaskDetails,request);
            //this.props.action.generalProcess(constants.searchTaskDetails,request);
          //  this.props.actions.generalProcess(constants.getAllOrgMap, {});
    }
    
    showHideDetails = (actionName,index)=>{
        this.setState({responseModal:!this.state.responseModal,responseIndex:actionName.index})
       console.log("-----------------------index---",index)
       console.log("-----------------------actionName---",actionName)
       console.log("-----------------------actionName.index---",actionName.index)
       
    }
    slabActionHandler = () => {
       // this.setState({responseModal:!this.state.responseIndex})
       // console.log("----------------------View",this.props.key)
        let actionName="View"
        let dataArray=[]
        let count=0
           // if(this.state.errorIndex!=undefined || this.state.errorIndex!=""){
               for(let i=0;i<this.state.gridData.length;i++){
                        if(i===this.state.responseIndex){
                            dataArray.push(this.state.gridData[i])
                        }
               }
               let log_response1
               let log_request1
               let log_response
               let log_request
                for(let i=0;i<dataArray.length;i++){
                    // console.log("------------------------dataArray1",this.state.gridData[this.state.responseIndex].response)
                    // console.log("--------------------dataArray2",dataArray)
                    log_response1 =JSON.parse(this.state.gridData[this.state.responseIndex].log_response)
                    log_response =JSON.stringify(log_response1,undefined,2)

                    log_request1 =JSON.parse(this.state.gridData[this.state.responseIndex].log_request)
                    log_request=JSON.stringify(log_request1,undefined,2)

                    // response =JSON.stringify(this.state.gridData[this.state.responseIndex].response)
                    // json_payload=JSON.stringify(this.state.gridData[this.state.responseIndex].json_payload)

                }
                 console.log("------------------log_response",log_response)
                 console.log("------------------log_request",log_request)
            
       // }
        switch (actionName) {
            case "View":
            return(
                <Portlet style={{ height: '450px' }} title="View" isPermissioned={true}>
                <form >
                        <div>
                                <div className="row">
                                   <div className="col-md-2">
                                        <Label text="Log Request" />
                                   </div>
                                    <div className="col-md-10">
                                        <TextArea style={{ height:"200px" }} fieldname='log_request' formname='searchCriteria'
                                                                state={this.state} typeName="utcStatus" className="form-control"
                                                                dataSource={[]} multiple={false} actionHandler={this.generalHandler} value={log_request} disabled={true}/>
                                    </div>               
                                </div>
                                <div className="row" style={{marginTop:"30px"}}>
                                    <div className="col-md-2">
                                        <Label text="Log Response" />
                                    </div>
                                    <div className="col-md-10">
                                        <TextArea style={{height:"100px"  }} fieldname='log_response' formname='searchCriteria'
                                                                state={this.state} typeName="utcStatus" className="form-control"
                                                                dataSource={[]} multiple={false} actionHandler={this.generalHandler} value={log_response} disabled={true}/>
                                    </div>               
                                </div>
                               
                                <button  className="btn green pull-right" onClick={this.showHideDetails} style={{marginTop:"50px"}}>Close</button>
                            </div>
                    </form>
                    </Portlet>
            )
        }
        dataArray=[]
    }




    componentWillReceiveProps(nextProps) {
    //   moment(parseInt(_.get(this.state.settlementData, 'paymentDate', 0)) ).format('DD/MM/YYYY') "dddd, MMMM Do YYYY, h:mm:ss a"
    //moment(epochDate).format("DD-MM-YYYY");   
    console.log("-------------------searchTaskDetailsData",nextProps.searchTaskDetailsData) 
   

    nextProps.searchTaskDetailsData.forEach(element => {
            // element.actions=[{
            //     "URI": ["/userSetup/"],
            //     "value": "4042",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "icon-docs"
            //   }]  
              element.actions= [{
                label: "View", iconName: "icon-docs", actionType: "COMPONENT_FUNCTION","params": ""//value.key
            }]; 
        });
        this.setState({
            typeData: nextProps.typeData,
            gridData:nextProps.searchTaskDetailsData,
        })
           
    }
    onChangeCheckbox() {
        this.setState({
          checked: !this.state.checked
        })
      }
    updateState = (data) => {
        this.setState(data);
    }
    onStartDateChange = value => {
        value == 'Invalid date' ? this.setState({ schedule_time: undefined }) : this.setState({ schedule_time: value });
    };
    search = () =>{
        //this.setState({grid})
        let searchCriteria={...this.state.searchCriteria, schedule_time: this.state.schedule_time}
        let request={
            'body':{
                searchCriteria:searchCriteria
            }
        }
        let dataArray=[]
        this.state.gridData.forEach(value=>{
            //if((value.task_type==this.state.searchCriteria.task_type) || (value.api_url==this.state.searchCriteria.api_url) || (value.schedule_time==this.state.schedule_time) || (value.status==this.state.searchCriteria.status)){
                if(value.task_type==this.state.searchCriteria.task_type || value.api_url==this.state.searchCriteria.api_url || value.schedule_time==this.state.schedule_time ){

                console.log("-----------------matched")
                dataArray.push(value)
            } 
            else{
                console.log("-----------------notmatched")
            }
        })
        this.setState({gridData:dataArray})
        // let data=this.state.gridData.filter(function(value){
        //     console.log("----------------filter ",value)
        //     // if(this.state.searchCriteria.task_type!=""){
        //     //  return value.task_type===this.state.searchCriteria.task_type
        //     // }
        //     return val;
        // })
        //this.props.actions.generalProcess(constants.search,request)
        // console.log("---------------data",data)
    }

    render() {       
        // let id = this.props.match.params.id;
        // console.log("---------------this.props.id",id)
        // console.log("---------------searchCriteria",this.state.searchCriteria)
         console.log("---------------searchCriteria",this.state.gridData)
        
       // let data;
       
        //  console.log('------------------data',data)

        return (
            <div className="row">
                    <ModalBox isOpen={this.state.responseModal}>
                        {this.slabActionHandler()}
                    </ModalBox>
                    
                                  <Table
                                    gridColumns={utils.getGridColumnByName("ViewTaskDetails")}
                                   gridData={this.state.gridData}
                                    //gridData={data}
                                    //totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                    //pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.currentPageNo}
                                    componentFunction={this.showHideDetails}
                                    />
             
                <Portlet >
                
                  
                </Portlet>
                   
            </div>
           
        );
    }
}

function mapStateToProps(state, ownProps) {
    //console.log(state.app)
    return {
        typeData: _.get(state.app, 'typeData.data', null),
        getTask:_.get(state.app,'data',null),
        searchTaskDetailsData:_.get(state.app,"searchTaskDetailsData",null)
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

TaskDetails.displayName = "Task Details";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetails);

