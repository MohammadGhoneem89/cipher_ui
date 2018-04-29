import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import {
  Button,
} from 'react-bootstrap';

class DateRangePickerInput extends React.Component {

  constructor(props) {
    super(props);

    this.handleApply = this.handleApply.bind(this);

    this.state = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
    };
  }

  handleApply(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    if(this.props.onChangeRange)
    {
      this.props.onChangeRange(picker.endDate.format('DD/MM/YYYY'),picker.startDate.format('DD/MM/YYYY'))
    }

  }

  render() {
    let start = this.state.startDate.format('YYYY-MM-DD');
    let end = this.state.endDate.format('YYYY-MM-DD');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }

    return (
     
          <DatetimeRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onApply={this.handleApply}
          >
           <input type="text" className="form-control input-medium" value={label} placeholder="Select date range" />
                     
          </DatetimeRangePicker>
      
    );
  }

}

export default DateRangePickerInput;