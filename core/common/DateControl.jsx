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
        // if (this.props.dat) {
            if (this.props.dateChange) {
                this.props.dateChange(value);
            }
        // } else return value = ""
    }
    UNIXConvertToDate(UNIXTS) {
        if (UNIXTS == 0)
            return "";
        let date = new Date(UNIXTS * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return day + "/" + month + "/" + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }


    render() {

        console.log("this.props.dat,",this.props.dat)
        const format = this.props.format || "DD/MM/YYYY";
        const mode = this.props.mode || "date";
        const showToday = this.props.showToday || false;
        const defaultText = this.props.defaultValue || "";
        const className = this.props.className || "form-group";
        const dateControlID = this.props.id || "datePicker";
        return (
            <div id={dateControlID}>
                {
                    this.props.value === undefined ? (
                        <DatePicker inputFormat={format}
                            name={this.props.name}
                            defaultText={defaultText}
                            mode={mode}
                            showToday={showToday}
                            readOnly={true}
                            onChange={this.dateChange} />) : (

                            <DatePicker inputFormat={format}
                                name={this.props.name}
                                inputProps={ {value: this.props.value }}
                                defaultText={defaultText}
                                mode={mode}
                                showToday={showToday}
                                readOnly={true}
                                onChange={this.dateChange} />)
                }

            </div>
        );
    }
}
export default DateControl;