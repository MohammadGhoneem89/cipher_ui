import React from 'react';
import { reduxForm } from 'redux-form';
import { TextInput, DateInput, DropdownInput, CheckboxInput } from '../../common/FormControls.jsx';
import Label from '../../common/Lable.jsx';
import * as utils from '../../common/utils.js';
import dates from "../../common/dates.js"
import Portlet from '../../common/Portlet.jsx';
import DateControl from '../../common/DateControl.jsx'
import _ from 'lodash'
const ExceptionListForm = ({ handleSubmit, updateState, pristine, reset, submitting, initialValues, index }) => {



    let startChange = value => {
        console.log(value)
        value == 'Invalid date' ? updateState.bind(this, { start: undefined })() : updateState.bind(this, {
            start: value
        })();
    };
    let endChange = value => {
        console.log(value)
        value == 'Invalid date' ? updateState.bind(this, { end: undefined })() : updateState.bind(this, {
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
              <br></br>
              <br></br>
              <div className="clearfix">
                  <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                      Submit
                  </button>
              </div>
          </form>
      </Portlet>
    );
};


export default reduxForm({
    form: 'ExceptionListForm', // a unique identifier for this form
    enableReinitialize: false
})(ExceptionListForm);