import React from 'react';
import DatePicker from 'react-bootstrap-datetimepicker'
import { PropTypes } from 'react'
import moment from 'moment'


class DateControl extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.dateChange = this.dateChange.bind(this);
    }
    componentDidUpdate() {

    }
    componentWillMount() {

    }
    dateChange(value) {
        //alert(this.UNIXConvertToDate(value))
        if(this.props.dateChange)
            this.props.dateChange(value);
    }
   

    render() {
        const format = this.props.format || "DD/MM/YYYY";
        const mode = this.props.mode || "date";
        const showToday = this.props.showToday || false;
        const defaultText = this.props.defaultValue || "";
        const className = this.props.className || "form-group";
        const dateControlID = this.props.id || "datePicker"
        
        return (
            <div id={dateControlID}>
                <DatePicker inputFormat={format} dateTime={defaultText||moment.now()}
                    mode={mode} showToday={showToday} readOnly = {true} onChange={this.dateChange} />
            </div>
        );
    }
}
export default DateControl;