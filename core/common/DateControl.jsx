import React from 'react';
import DatePicker from 'react-bootstrap-datetimepicker'
import {PropTypes} from 'react'
import moment from 'moment'


class DateControl extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.dateChange = this.dateChange.bind(this);
    this.date = true;

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

  padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
  }

  UNIXConvertToDate(UNIXTS) {
    if (UNIXTS == 0)
      return "";
    let date = new Date(UNIXTS);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return this.padLeft(day, 2, "0") + "/" + this.padLeft(month, 2, "0") + "/" + year; //" " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }


  render() {
    if (this.props.fromDate == undefined || this.props.toDate == undefined) {
      this.date = false;
    }
    const format = this.props.format || "DD/MM/YYYY";
    const mode = this.props.mode || "date";
    const showToday = this.props.showToday || false;
    const defaultText = this.props.defaultValue=='Invalid date'? "Select Date": this.props.defaultValue;
    const className = this.props.className || "form-group";
    const dateControlID = this.props.id || "datePicker";
    let finalVal = this.props.isEpochVal ? this.UNIXConvertToDate(this.props.value) : this.props.value;
    return (
      <div id={dateControlID}>
        {
          this.props.value === undefined ? (
            <DatePicker inputFormat={format}
                        name={this.props.name}
                        defaultText={defaultText}
                        key={defaultText}
                        mode={mode}
                        showToday={showToday}
                        readOnly={true}
                        onChange={this.dateChange}/>) : (

            <DatePicker inputFormat={format}
                        name={this.props.name}
                        inputProps={{value: finalVal}}
                        defaultText={defaultText}
                        mode={mode}
                        key={defaultText}
                        showToday={showToday}
                        readOnly={true}
                        onChange={this.dateChange}/>)
        }

      </div>
    );
  }
}

export default DateControl;