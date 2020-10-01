import React,{useState } from 'react';
import { reduxForm,submit } from 'redux-form';
import { TextInput, DateInput, DropdownInput, CheckboxInput } from '../../common/FormControls.jsx';
import Label from '../../common/Lable.jsx';
import * as utils from '../../common/utils.js';
import dates from "../../common/dates.js"
import Portlet from '../../common/Portlet.jsx';
import DateControl from '../../common/DateControl.jsx'
import _ from 'lodash'

const ExceptionListForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index,workingTimes}) => {

    let dayTimes = [
        { value: "00:00:00", label: "12:00 AM" },
        { value: "00:30:00", label: "12:30 AM" },
        { value: "01:00:00", label: "1:00 AM" },
        { value: "01:30:00", label: "1:30 AM" },
        { value: "02:00:00", label: "2:00 AM" },
        { value: "02:30:00", label: "2:30 AM" },
        { value: "03:00:00", label: "3:00 AM" },
        { value: "03:30:00", label: "3:30 AM" },
        { value: "04:00:00", label: "4:00 AM" },
        { value: "04:30:00", label: "4:30 AM" },
        { value: "05:00:00", label: "5:00 AM" },
        { value: "05:30:00", label: "5:30 AM" },
        { value: "06:00:00", label: "6:00 AM" },
        { value: "06:30:00", label: "6:30 AM" },
        { value: "07:00:00", label: "7:00 AM" },
        { value: "07:30:00", label: "7:30 AM" },
        { value: "08:00:00", label: "8:00 AM" },
        { value: "08:30:00", label: "8:30 AM" },
        { value: "09:00:00", label: "9:00 AM" },
        { value: "09:30:00", label: "9:30 AM" },
        { value: "10:00:00", label: "10:00 AM" },
        { value: "10:30:00", label: "10:30 AM" },
        { value: "11:00:00", label: "11:00 AM" },
        { value: "11:30:00", label: "11:30 AM" },
        { value: "12:00:00", label: "12:00 PM" },
        { value: "12:30:00", label: "12:30 PM" },
        { value: "13:00:00", label: "1:00 PM" },
        { value: "13:30:00", label: "1:30 PM" },
        { value: "14:00:00", label: "2:00 PM" },
        { value: "14:30:00", label: "2:30 PM" },
        { value: "15:00:00", label: "3:00 PM" },
        { value: "15:30:00", label: "3:30 PM" },
        { value: "16:00:00", label: "4:00 PM" },
        { value: "16:30:00", label: "4:30 PM" },
        { value: "17:00:00", label: "5:00 PM" },
        { value: "17:30:00", label: "5:30 PM" },
        { value: "18:00:00", label: "6:00 PM" },
        { value: "18:30:00", label: "6:30 PM" },
        { value: "19:00:00", label: "7:00 PM" },
        { value: "19:30:00", label: "7:30 PM" },
        { value: "20:00:00", label: "8:00 PM" },
        { value: "20:30:00", label: "8:30 PM" },
        { value: "21:00:00", label: "9:00 PM" },
        { value: "21:30:00", label: "9:30 PM" },
        { value: "22:00:00", label: "10:00 PM" },
        { value: "22:30:00", label: "10:30 PM" },
        { value: "23:00:00", label: "11:00 PM" },
        { value: "23:30:00", label: "11:30 PM" },
        { value: "24:00:00", label: "12:00 PM" },
    ];

    let startChange = value => {
        value == 'Select' ? updateState.bind(this, { start: undefined })() : updateState.bind(this, {
            start: value
        })();
    };
    let endChange = value => {
        value == 'Select' ? updateState.bind(this, { end: undefined })() : updateState.bind(this, {
            end: value
        })();
    };

    startChange = startChange.bind(this);
    endChange = endChange.bind(this);

    let exceptionsActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, { exceptionListModalIsOpen: false })
        }
    ];

    return (
        <div>
        <Portlet title={"Exception List"} actions={exceptionsActions} style={{ height: '290px' }}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row" key={index}>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"exceptionList[" + index + "].title"}
                            label="Exception"
                            type="text"
                            value=""
                            placeholder="Event Title"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <Label divStyle={{ padding: "0" }} text={'Start Date'} style={{ fontWeight: 'normal' }}>
                        </Label>
                        <DateControl id="start" defaultValue={ utils.UNIXConvertToDate(dates.toEpoch(_.get(initialValues, `exceptionList[${index}].start`), undefined), 'DD/MM/YYYY')} dateChange={startChange.bind(this)} />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <Label divStyle={{ padding: "0" }} text={'End Date'} style={{ fontWeight: 'normal' }}>
                        </Label>
                        <DateControl id="end" defaultValue={utils.UNIXConvertToDate(dates.toEpoch(_.get(initialValues, `exceptionList[${index}].end`, undefined)),'DD/MM/YYYY')} dateChange={endChange.bind(this)} />
                    </div>

                </div>
                <div className="row">
                <div className="col-md-4 col-sm-4" style={{paddingTop:'10px'}}>
                        <DropdownInput 
                            id='type' name="type" options={[{label:'Public Holiday',value:'publicHoliday'},{label:'Working Time',value:'workingTime'}]}
                            label="Type" />
                    </div>
                </div>
                {workingTimes?
                <div className="row" style={{paddingTop:'10px'}}>
                <div className="col-md-4 col-sm-4">
                        <DropdownInput name="dayStartTime" options={dayTimes}
                            label="Start Time" />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <DropdownInput name="dayEndTime" options={dayTimes}
                            label="End Time" />
                    </div>
                    </div>
                :''}
                    <br></br>
                    <br></br>
                <div className="clearfix">
                    <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                        Submit
                    </button>
                </div>
            </form>
        </Portlet>
        </div>
    );
};


export default reduxForm({
    form: 'ExceptionListForm', // a unique identifier for this form
    enableReinitialize: false
})(ExceptionListForm);