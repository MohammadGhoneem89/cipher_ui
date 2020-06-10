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

class Task extends React.Component {

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
            schedule_time: "",//moment(moment().subtract(1, 'days').format('DD/MM/YYYY'), 'DD/MM/YYYY').startOf('day').unix(),
            responseModal:false,
            responseIndex:"",
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }
   

    
    componentWillMount() {
    }
    getRequest = () => {
        let searchCriteria={...this.state.searchCriteria, schedule_time: this.state.schedule_time}
        console.log("searchCriteria",searchCriteria)
        let request={
            'body':{
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize,
                },
                searchCriteria:searchCriteria
            }
        }
        return request;
    }
    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
            ]));
            this.props.actions.generalProcess(constants.getTask, {});
            this.props.actions.generalProcess(constants.search,this.getRequest())
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
               let response1
               let json_payload1
               let response
               let json_payload
               let userId
               let id
               let title
               let completed 
                for(let i=0;i<dataArray.length;i++){
                    // console.log("------------------------dataArray1",this.state.gridData[this.state.responseIndex].response)
                    // console.log("--------------------dataArray2",dataArray)
                    response1 =JSON.parse(this.state.gridData[this.state.responseIndex].response)
                    response =JSON.stringify(response1,undefined,2)

                    json_payload1 =JSON.parse(this.state.gridData[this.state.responseIndex].json_payload)
                    json_payload=JSON.stringify(json_payload1,undefined,2)

                    // response =JSON.stringify(this.state.gridData[this.state.responseIndex].response)
                    // json_payload=JSON.stringify(this.state.gridData[this.state.responseIndex].json_payload)

                }
                //var allMovieData = JSON.stringify(this.state.gridData[this.state.responseIndex].response);
                
               // let jsonObj=JSON.parse()
                // allMovieData = allMovieData.replace(/\n/g, '');

                 console.log("------------------jsonObj1",response)
                 console.log("------------------json_payload1",json_payload)


                /**
                 * <Table
                                gridColumns={utils.getGridColumnByName("response")}
                                gridData={this.state.gridData[this.state.responseIndex]}
                                />
                 */
            
       // }
        switch (actionName) {
            case "View":
            return(
                <Portlet style={{ height: '450px' }} title="View" isPermissioned={true}>
                <form >
                        <div>
                                <div className="row">
                                   <div className="col-md-2">
                                        <Label text="Request Payload" />
                                   </div>
                                    <div className="col-md-10">
                                        <TextArea style={{ height:"200px" }} fieldname='json_payload' formname='searchCriteria'
                                                                state={this.state} typeName="utcStatus" className="form-control"
                                                                dataSource={[]} multiple={false} actionHandler={this.generalHandler} value={json_payload} disabled={true}/>
                                    </div>               
                                </div>
                                <div className="row" style={{marginTop:"30px"}}>
                                    <div className="col-md-2">
                                        <Label text="Response Payload" />
                                    </div>
                                    <div className="col-md-10">
                                        <TextArea style={{height:"100px"  }} fieldname='response' formname='searchCriteria'
                                                                state={this.state} typeName="utcStatus" className="form-control"
                                                                dataSource={[]} multiple={false} actionHandler={this.generalHandler} value={response} disabled={true}/>
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
    console.log("----------------searchTask",nextProps.searchTask)
    console.log("----------------page",nextProps.page.totalRecords)

   

    //nextProps.getTask.forEach(element => {
        nextProps.searchTask.forEach(element => {
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
            },
            {
                "URI": ["/taskDetails/"],
                "value": "4042",
                "type": "componentAction",
                "label": "Task Details",
                "params": "",
                "iconName": "icon-docs"
              }
        ];

             
              let epochDateSchedule_time = Number(element.schedule_time)*1000;  
              element.schedule_time= moment(epochDateSchedule_time).format("DD-MM-YYYY")
             // element.schedule_time= moment(element.schedule_time).format("DD/MM/YYYY")
              console.log("----------------element.schedule_time",element.schedule_time)
             

              
              let epochDateExecution_time = Number(element.execution_time)*1000;  
              element.execution_time= moment(epochDateExecution_time).format("DD-MM-YYYY") 
              // element.execution_time= moment(element.execution_time).format("DD/MM/YYYY") 
               console.log("----------------element.execution_time",element.execution_time)

        });
        this.setState({
            typeData: nextProps.typeData,
            gridData:nextProps.searchTask,   //getTask,
            gridData2:nextProps.searchTask, //getTask
            totalRecords:nextProps.page.totalRecords
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
        value == 'Invalid date' ? this.setState({ schedule_time: undefined }) : this.setState({ schedule_time: value});
    };
   
    search = () =>{
      
        this.props.actions.generalProcess(constants.search,this.getRequest())
         //let searchCriteria={...this.state.searchCriteria, schedule_time: this.state.schedule_time}

        // let request={
        //     'body':{
        //         "page": {
        //             "currentPageNo": this.state.page.currentPageNo,
        //             "pageSize": this.state.page.pageSize,
        //         },
        //         searchCriteria:searchCriteria
        //     }
        // }
        // let dataArray=[]
        // this.state.gridData.forEach(value=>{
        //     //if((value.task_type==this.state.searchCriteria.task_type) || (value.api_url==this.state.searchCriteria.api_url) || (value.schedule_time==this.state.schedule_time) || (value.status==this.state.searchCriteria.status)){
        //         if(value.task_type==this.state.searchCriteria.task_type || value.api_url==this.state.searchCriteria.api_url || value.schedule_time==this.state.schedule_time ){

        //         console.log("-----------------matched")
        //         dataArray.push(value)
        //     } 
        //     else{
        //         console.log("-----------------notmatched")
        //     }
        // })
        // this.setState({gridData:dataArray})
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.search,this.getRequest())
    }

    render() {       
        console.log("---------------searchCriteria",this.state.searchCriteria)
        console.log("---------------searchCriteria",this.state.searchCriteria.task_type)
        console.log("---------------schedule_time",this.state.schedule_time)
       // let data;
       
        //  console.log('------------------data',data)

        return (
            <div className="row">
                    <ModalBox isOpen={this.state.responseModal}>
                        {this.slabActionHandler()}
                    </ModalBox>
                    <div className="row"> 
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Task Type</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input
                                    fieldname='task_type'
                                    formname='searchCriteria'
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
                                    formname='searchCriteria'
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
                                    <DateControl
                                    id='onStartDateChange'
                                   // defaultValue={utils.UNIXConvertToDateWithout1000(this.state.schedule_time)}
                                    dateChange={this.onStartDateChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group col-md-4">
                                   <label className="control-label">Status</label>
                                </div>
                            <div className="form-group col-md-8">
                                    <Input
                                    fieldname='status'
                                    formname='searchCriteria'
                                    placeholder=''
                                    state={this.state}
                                    actionHandler={this.generalHandler}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                                        <div className="form-actions right">
                                                    <div className="form-group col-md-12">
                                                        <div className="btn-toolbar pull-right">

                                                            <button type="submit" className="btn green" onClick={this.search.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                        </div>
                                                    </div>
                                                </div>


                               
                                

                                  <Table
                                    gridColumns={utils.getGridColumnByName("ViewTask")}
                                   gridData={this.state.gridData}
                                    //gridData={data}
                                    totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                    pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.page.currentPageNo}
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
        searchTask: _.get(state.app,'searchTask.searchResult',[]),
        page:_.get(state.app,'searchTask.pageData',{})
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

Task.displayName = "Task";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task);

