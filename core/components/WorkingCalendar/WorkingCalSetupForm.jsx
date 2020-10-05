import React from 'react';
import { reduxForm, submit } from 'redux-form';
import 'react-dropzone-component/styles/filepicker.css'
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import ExceptionListForm from './ExceptionListForm.jsx';
import _ from 'lodash';
import * as utils from '../../common/utils.js';
import dates from "../../common/dates.js"
import * as toaster from './../../common/toaster.js'


import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';


const FormSection1 = ({ initialValues, updateState, state , onChildClick}) => {
    function onChildClick1(){
        return onChildClick(true)
    }

    let applyStyles = () => {
        let labels = document.getElementsByTagName('label');
        for (let i = 0; i < labels.length; i++) {
            labels[i].style.fontWeight = 'bold'
        }
        if (document.getElementsByClassName('mt-checkbox mt-checkbox-outline').length > 0) {
            document.getElementsByClassName('mt-checkbox mt-checkbox-outline')[0].style.marginTop = '35px'
        }
    }

    let exceptionActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: "ADD",
            icon: "plus",
            actionHandler: updateState.bind(this, {
                exceptionListModalIsOpen: true,
                index: state.exceptionList.length
            })
        }
    ];
    let weekStartDay = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];
    let weekEndDay = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];
    let dayTimes = [
        { value: "00:00:00", label: "12:00 AM" },
        { value: "00:30:00", label: "12:30 AM" },
        { value: "01:00:00", label: "01:00 AM" },
        { value: "01:30:00", label: "01:30 AM" },
        { value: "02:00:00", label: "02:00 AM" },
        { value: "02:30:00", label: "02:30 AM" },
        { value: "03:00:00", label: "03:00 AM" },
        { value: "03:30:00", label: "03:30 AM" },
        { value: "04:00:00", label: "04:00 AM" },
        { value: "04:30:00", label: "04:30 AM" },
        { value: "05:00:00", label: "05:00 AM" },
        { value: "05:30:00", label: "05:30 AM" },
        { value: "06:00:00", label: "06:00 AM" },
        { value: "06:30:00", label: "06:30 AM" },
        { value: "07:00:00", label: "07:00 AM" },
        { value: "07:30:00", label: "07:30 AM" },
        { value: "08:00:00", label: "08:00 AM" },
        { value: "08:30:00", label: "08:30 AM" },
        { value: "09:00:00", label: "09:00 AM" },
        { value: "09:30:00", label: "09:30 AM" },
        { value: "10:00:00", label: "10:00 AM" },
        { value: "10:30:00", label: "10:30 AM" },
        { value: "11:00:00", label: "11:00 AM" },
        { value: "11:30:00", label: "11:30 AM" },
        { value: "12:00:00", label: "12:00 PM" },
        { value: "12:30:00", label: "12:30 PM" },
        { value: "13:00:00", label: "01:00 PM" },
        { value: "13:30:00", label: "01:30 PM" },
        { value: "14:00:00", label: "02:00 PM" },
        { value: "14:30:00", label: "02:30 PM" },
        { value: "15:00:00", label: "03:00 PM" },
        { value: "15:30:00", label: "03:30 PM" },
        { value: "16:00:00", label: "04:00 PM" },
        { value: "16:30:00", label: "04:30 PM" },
        { value: "17:00:00", label: "05:00 PM" },
        { value: "17:30:00", label: "05:30 PM" },
        { value: "18:00:00", label: "06:00 PM" },
        { value: "18:30:00", label: "06:30 PM" },
        { value: "19:00:00", label: "07:00 PM" },
        { value: "19:30:00", label: "07:30 PM" },
        { value: "20:00:00", label: "08:00 PM" },
        { value: "20:30:00", label: "08:30 PM" },
        { value: "21:00:00", label: "09:00 PM" },
        { value: "21:30:00", label: "09:30 PM" },
        { value: "22:00:00", label: "10:00 PM" },
        { value: "22:30:00", label: "10:30 PM" },
        { value: "23:00:00", label: "11:00 PM" },
        { value: "23:30:00", label: "11:30 PM" },
        { value: "24:00:00", label: "12:00 PM" },
    ];
    let Months = [
        { value: "JAN", label: "January" },
        { value: "FEB", label: "Feburary" },
        { value: "MAR", label: "March" },
        { value: "APR", label: "April" },
        { value: "MAY", label: "May" },
        { value: "JUN", label: "June" },
        { value: "JUL", label: "July" },
        { value: "AUG", label: "August" },
        { value: "SEP", label: "September" },
        { value: "OCT", label: "October" },
        { value: "NOV", label: "November" },
        { value: "DEC", label: "December" },
    ]

    const detailsActionHandlers = ({ actionName, index }) => {

        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    updateState({
                        index,
                        exceptionListModalIsOpen: true,
                        start: dates.toEpoch(_.get(state, `exceptionList[${index}].start`, undefined)),
                        end: dates.toEpoch(_.get(state, `exceptionList[${index}].end`, undefined))
                    });
                }
                break;
            case "Delete":

                if (index > -1) {
                    let tempState = [..._.get(state, `exceptionList`, [])]
                    tempState.splice(index, 1);
                    updateState({
                        exceptionList: tempState
                    })
                    // let redemptionterms = this.state.redemptionTermsArr;
                    // redemptionterms.splice(index, 1);
                    // this.setState({ redemptionTermsArr: redemptionterms });
                }
                break;
            default:
                break;
        }
    }
    
    return (

        <div>
            {applyStyles()}
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="col-md-3 col-sm-3">
                        <TextInput name="calendarName" id="calendarName"
                            label="Calendar Name" placeholder="Name" />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <TextInput name="calendarYear"
                            label="Calendar Year" placeholder="YYYY" />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <CheckboxInput name="isActive" type="checkbox"
                            label="Active" />
                    </div>


                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput name="weekStartDay" options={weekStartDay}
                            label="Week Start Day" />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput name="weekEndDay" options={weekEndDay}
                            label="Week End Day" />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput name="dayStart" options={dayTimes}
                            label="Day Start" />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput name="dayEnd" options={dayTimes}
                            label="Day End" />
                    </div>
                </div>
            </div>
            <div className="row"style={{ padding: "15px 30px" }}>
            <button onClick={onChildClick1} type="submit" className="btn green" disabled={false}>
                Set Time For Each Day
            </button>
            </div>
            <div  className="row">
            {state.daysList.length>1?
            <div className="col-md-12 col-sm-12">
                {state.daysList.map((x)=>{
                return(
                <div className="col-md-10 col-sm-10" key={x.day}>
                    <div className="col-md-2 col-sm-2" style={{padding:'10px'}}>
                    <label>{x.day}</label>
                    </div>
                    <div className="col-md-4 col-sm-4" style={{paddingTop:'10px'}}>
                        <DropdownInput id='time1' name={x.day+'a'} checkVal={state.ApplyAllDropData.arr1?state.ApplyAllDropData.arr1:''} options={dayTimes}
                            label="" />
                    </div>
                    <div className="col-md-4 col-sm-4" style={{paddingTop:'10px'}}>
                        <DropdownInput id='time2' name={x.day+'b'} checkVal={state.ApplyAllDropData.arr2?state.ApplyAllDropData.arr2:''} options={dayTimes}
                            label="" />
                    </div>
                </div>
                    )
                })}
            <button onClick={onChildClick1} type="submit" className="btn green" disabled={false} style={{marginTop:'10px'}}>
                Apply To All
            </button>
            </div>
            :''}
        </div>
            <div className="row" style={{ padding: "15px" }}>
                <div className="col-md-12 col-sm-12">
                    <Portlet title={"Holidays Exception"} actions={exceptionActions}>
                        <Table
                            pagination={true}
                            activePage={1}
                            pageSize={10}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("workingCaledarExceptionList")}
                            gridData={state.exceptionList.map(item=>{
                                item.title= _.get(item, 'title', '').replace(/[^a-zA-Z-_.,:?! 0-9]+/g, '')
                                return item
                            }) || []}
                            totalRecords={state.exceptionList.length || 0}
                            componentFunction={detailsActionHandlers}
                        />
                    </Portlet>
                </div>
            </div>
        </div>
    )
};


class WorkingCalSetupForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            exceptionListModalIsOpen: false,
            index: undefined,
            exceptionList: [],
            daysList:[],
            dayTime2:[],
            workingTime:[],
            workingTimeState:false,
            updateCheck:true,
            abc:false,
            dayStartTime:'',
            dayEndTime:'',
            daysWithTime:[],
            arr1:[],
            arr2:[],
            ApplyAllDropData:{}
        };

        this.updateState = this.updateState.bind(this);
        this.updateExceptionList = this.updateExceptionList.bind(this);
        this.submit = this.submit.bind(this);
        this.timeUpdate = this.timeUpdate.bind(this);
        this.clickAlert = this.clickAlert.bind(this);
        this.onChildClick2 = this.onChildClick2.bind(this);
    }

    updateState(data) {
        this.setState(data);
    }
    updateExceptionList(data) {
        data.exceptionList[this.state.index].actions = [
            {
                label: "Edit",
                iconName: "fa fa-edit",
                params: "_id",
                actionType: "COMPONENT_FUNCTION"
            },
            {
                label: "Delete",
                iconName: "fa fa-trash",
                params: "_id",
                actionType: "COMPONENT_FUNCTION"
            }];

        if (!data.exceptionList[this.state.index]) {
            toaster.showToast("Title must be provided", "ERROR")
            return
        }
        if (data.exceptionList[this.state.index].title == "" || data.exceptionList[this.state.index].title == undefined) {
            toaster.showToast("Title must be provided", "ERROR")
            return
        }

        if (this.state.start == "" || this.state.start == undefined || this.state.end == "" || this.state.end == undefined) {
            toaster.showToast("Exception Range must be defined", "ERROR")
            return
        }
        if (this.state.start > this.state.end) {
            toaster.showToast("Exception Range must be valid", "ERROR")
            return
        }

        if (data.type=='workingTime') {
            data.exceptionList[this.state.index].color = 'blue'
            data.exceptionList[this.state.index].start = utils.UNIXConvertToDate(this.state.start, 'YYYY-MM-DD')
            data.exceptionList[this.state.index].end = utils.UNIXConvertToDate(this.state.end, 'YYYY-MM-DD')
            data.exceptionList[this.state.index].dayStartTime=data.dayStartTime
            data.exceptionList[this.state.index].dayEndTime=data.dayEndTime
            data.exceptionList[this.state.index].type=data.type
            this.setState({
                exceptionListModalIsOpen: false,
                exceptionList: data.exceptionList,
                start: undefined,
                end: undefined
            });
        }else{
            data.exceptionList[this.state.index].color = 'green'
            data.exceptionList[this.state.index].start = utils.UNIXConvertToDate(this.state.start, 'YYYY-MM-DD')
            data.exceptionList[this.state.index].end = utils.UNIXConvertToDate(this.state.end, 'YYYY-MM-DD')
            data.exceptionList[this.state.index].type=data.type
            this.setState({
                exceptionListModalIsOpen: false,
                exceptionList: data.exceptionList,
                start: undefined,
                end: undefined
            });
        }
    }

    onChildClick2(){
        this.setState({
            abc:false
        })
    }

    submit(data) {
        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
        let val=[]
        for (let i = 0; i < weekdays.length; i++) {
            if (data.weekStartDay==weekdays[i]) {
                val=[i]   
            }
        }
        let val2=[]
        for (let i = 0; i < weekdays.length; i++) {
            if (data.weekEndDay==weekdays[i]) {
                val2=[i] 
            }
        }
        let days=[]
        if (val<val2) {
            for (let i = val; i <= val2; i++) {
                days.push({
                    day: weekdays[i]
                });
            }
        }else{
            for (let i = val2; i <= val; i++) {
                days.push({
                    day: weekdays[i]
                });
            }
        }
        this.setState({
            daysList:days,
        })
    function tConvert (time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time= time.slice(0,3)  
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
            time[0] = +time[0] % 12 || 12; 
        }
        return time.join (''); 
    }

    function ApplyAllDrop(data) {
      let arr1=[]    
      let arr2=[]    
      let val = tConvert (data.Sundaya||data.Mondaya||data.Tuesdaya||data.Wednesdaya||data.Thursdaya||data.Fridaya||data.Saturdaya);
      let val2 = tConvert (data.Sundayb||data.Mondayb||data.Tuesdayb||data.Wednesdayb||data.Thursdayb||data.Fridayb||data.Saturdayb);
      arr1.push({label:val,value:data.Sundaya||data.Mondaya||data.Tuesdaya||data.Wednesdaya||data.Thursdaya||data.Fridaya||data.Saturdaya})
      arr2.push({label:val2,value:data.Sundayb||data.Mondayb||data.Tuesdayb||data.Wednesdayb||data.Thursdayb||data.Fridayb||data.Saturdayb})
      return {arr1,arr2}
    }
    let daysWithTime=[]
    if (data.Sundaya && data.Sundayb) {
        let time1= data.Sundaya.split(':')
        let time2= data.Sundayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Sunday",duration:data.Sundaya+' - '+data.Sundayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }
    if (data.Mondaya && data.Mondayb) {
        let time1= data.Mondaya.split(':')
        let time2= data.Mondayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Monday",duration:data.Mondaya+' - '+data.Mondayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }
    if (data.Tuesdaya && data.Tuesdayb) {
        let time1= data.Tuesdaya.split(':')
        let time2= data.Tuesdayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Tuesday",duration:data.Tuesdaya+' - '+data.Tuesdayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }
    if (data.Wednesdaya && data.Wednesdayb) {
        let time1= data.Wednesdaya.split(':')
        let time2= data.Wednesdayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Wednesday",duration:data.Wednesdaya+' - '+data.Wednesdayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }
    if (data.Thursdaya && data.Thursdayb) {
        let time1= data.Thursdaya.split(':')
        let time2= data.Thursdayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Thursday",duration:data.Thursdaya+' - '+data.Thursdayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }
    if (data.Fridaya && data.Fridayb) {
        let time1= data.Fridaya.split(':')
        let time2= data.Fridayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Friday",duration:data.Fridaya+' - '+data.Fridayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }
    if (data.Saturdaya && data.Saturdayb) {
        let time1= data.Saturdaya.split(':')
        let time2= data.Saturdayb.split(':')
        let finalTime = parseInt(time2[0])-parseInt(time1[0])
        daysWithTime.push({title:"Saturday",duration:data.Saturdaya+' - '+data.Saturdayb,hours:finalTime})
        let ApplyAllDropData= ApplyAllDrop(data)
        this.setState({
          ApplyAllDropData
        })
    }

    for (let i = 0; i < days.length; i++) {
        if (daysWithTime.length!=days && daysWithTime.length>0) {
        daysWithTime.push({title:days[i].day,duration:daysWithTime[0].duration,hours:daysWithTime[0].hours})
        }
    }

    let tempDaysWithTime = [... new Set(daysWithTime.map(obj => obj.title))].map(day => {
        return daysWithTime.find(obj => obj.title == day)
    })


    if (tempDaysWithTime.length <=0) {
      for (let i = 0; i < days.length; i++) {

        let t1 = data.dayStart.split(':')
        let t2 = data.dayEnd.split(':')
        let hours = parseInt(t2[0]) - parseInt(t1[0])
        tempDaysWithTime.push({title:days[i].day,hours:hours,duration:data.dayStart +' - '+ data.dayEnd})
      }
    }
        daysWithTime=tempDaysWithTime
        data.exceptionList = this.state.exceptionList;
        data.daysWithTime =daysWithTime

    if (this.state.abc==false) {
        this.state.abc==true
        return this.props.onSubmit(data);
    }
}
    componentWillReceiveProps(nextProps) {
        if (!this.state.selectedReconType) {
            this.setState({
                exceptionList: nextProps.initialValues.exceptionList

            });
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate(){
        if (document.getElementById('type')&&document.getElementById('type').value == 'workingTime'&& this.state.updateCheck==false){
        this.setState({
            workingTimeState:true,
            updateCheck:true
        })
        }else if(document.getElementById('type')&&document.getElementById('type').value !== 'workingTime'&& this.state.updateCheck==false){
            this.setState({
                workingTimeState:false,
                updateCheck:true
            })
        }
        
    }


    timeUpdate(data){
        this.setState({
            updateCheck:false
        })
    }

    submitModal=(data)=>{
        this.setState({
            exceptionListModalIsOpen:false
        })
    }

    renderCalendar(exceptionList) {
        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: utils.UNIXConvertToDate(Date.now(), 'YYYY-MM-DD'),
            navLinks: false, // can click day/week names to navigate views
            editable: false,
            eventLimit: false, // allow "more" link when too many events
            events: exceptionList
        });
    }

    makeEndDatesInclusive(exceptionListArg) {
        let exclusionLi = []
        exceptionListArg.forEach(item => {
            let end = item.end == undefined ? undefined : utils.UNIXConvertToDate(Date.parse(new Date(item.end).addDays(1)), 'YYYY-MM-DD');
            exclusionLi.push({
                ...item,
                end
            });
        })
        return exclusionLi
    }

     clickAlert(onChildClick){
        this.setState({
            abc:onChildClick
        })
    }


    render() {
        const { handleSubmit, pristine, reset, submitting, initialValues } = this.props;
        return (
            <div>
                <form>
                </form>
                <ModalBox isOpen={this.state.exceptionListModalIsOpen}>
                    <ExceptionListForm onChange={this.timeUpdate}  initialValues={this.state}
                        index={this.state.index} updateState={this.updateState} onSubmit={this.submitModal} onSubmit={this.submit} onSubmit={this.updateExceptionList} workingTimes={this.state.workingTimeState} />
                </ModalBox>
                <form role="form" onSubmit={handleSubmit(this.submit)}>
                    <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state} onChildClick={this.clickAlert}/>

                    <div className="row" style={{paddingBottom:'30px'}}>
                    <div className="col-md-12 col-sm-12">
                    <div className="col-md-3 col-sm-3">
                        </div>
                    <div className="col-md-3 col-sm-3" style={{color:'blue',fontWeight:'bold',display:'flex'}}>
                        <div style={{height:'10px',width:'10px', background:'blue'
                    ,margin:'5px 10px 0px 0px'}}></div>
                          <div>  WORKING TIME CHANGE</div>
                    </div>
                        <div className="col-md-3 col-sm-3"style={{color:'green',fontWeight:'bold',display:'flex'}}>
                        <div style={{height:'10px',width:'10px', background:'green',margin:'5px 10px 0px 0px'}}></div>
                      <div>  PUBLIC HOLIDAY</div>
                        </div>
                    </div>
                    </div>
                    <div id='calendar' style={{ paddingLeft: "200px", width: "1000px" }}></div>

                    {this.renderCalendar(this.state.exceptionList ? this.makeEndDatesInclusive(this.state.exceptionList) : [])}
                    <div className="pull-right">
                        <button onClick={this.onChildClick2} type="submit" className="btn green" disabled={submitting}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
export default reduxForm({
    form: 'WorkingCalSetupForm', // a unique identifier for this form
    enableReinitialize: true
})(WorkingCalSetupForm);