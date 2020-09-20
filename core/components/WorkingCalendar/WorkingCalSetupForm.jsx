import React from 'react';
import { reduxForm } from 'redux-form';
import 'react-dropzone-component/styles/filepicker.css'
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import ExceptionListForm from './ExceptionListForm.jsx';
import * as utils from '../../common/utils.js';
import dates from "../../common/dates.js"
import * as toaster from './../../common/toaster.js'


import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';


const FormSection1 = ({ initialValues, updateState, state }) => {

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
                        <DropdownInput name="calendarMonth" options={Months}
                            label="Calendar Month" />
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
            exceptionList: []
        };

        this.updateState = this.updateState.bind(this);
        this.updateExceptionList = this.updateExceptionList.bind(this);
        this.submit = this.submit.bind(this);

    }

    updateState(data) {
        this.setState(data);
    }
    updateExceptionList(data) {
        console.log('data : ', JSON.stringify(data))

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

        console.log(data)
        console.log(data.exceptionList[this.state.index])
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

        // here add start date end date
        data.exceptionList[this.state.index].color = 'green'
        data.exceptionList[this.state.index].start = utils.UNIXConvertToDate(this.state.start, 'YYYY-MM-DD')
        data.exceptionList[this.state.index].end = utils.UNIXConvertToDate(this.state.end, 'YYYY-MM-DD')
        this.setState({
            exceptionListModalIsOpen: false,
            exceptionList: data.exceptionList,
            start: undefined,
            end: undefined
        });


    }
    submit(data) {
        data.exceptionList = this.state.exceptionList;
        return this.props.onSubmit(data);
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
        console.log('Alert !!!!!!!!!!', JSON.stringify(exceptionListArg))
        exceptionListArg.forEach(item => {
            let end = item.end == undefined ? undefined : utils.UNIXConvertToDate(Date.parse(new Date(item.end).addDays(1)), 'YYYY-MM-DD');
            exclusionLi.push({
                ...item,
                end
            });
        })
        return exclusionLi
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, initialValues } = this.props;
        return (
            <div>
                <form>
                </form>
                <ModalBox isOpen={this.state.exceptionListModalIsOpen}>
                    <ExceptionListForm onSubmit={this.updateExceptionList} initialValues={this.state}
                        index={this.state.index} updateState={this.updateState} />

                </ModalBox>
                <form role="form" onSubmit={handleSubmit(this.submit)}>
                    <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state} />


                    <div id='calendar' style={{ paddingLeft: "200px", width: "1000" }}></div>

                    {this.renderCalendar(this.state.exceptionList ? this.makeEndDatesInclusive(this.state.exceptionList) : [])}
                    <div className="pull-right">
                        <button type="submit" className="btn green" disabled={submitting}>
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