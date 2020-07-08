import React from 'react';
import {reduxForm} from 'redux-form';
import {CheckboxInput, CheckboxList, TextInput} from '../../common/FormControls.jsx';
import {DropdownInput} from '../../common/FormControls.jsx';

import Label from '../../common/Lable.jsx';
import * as utils from "../../common/utils";

const UserFilterForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props;

  let userType = sessionStorage.orgType
  let orgType = [
    {value: "Settlement", label: "Settlement"},
    {value: "Entity", label: "Entity"},
    {value: "Acquirer", label: "Acquirer"},
    {value: "DSG", label: "SDG"}
  ];
  let callerType = [
    {value: "Human", label: "Human"},
    {value: "API", label: "API"}
  ];


  return (
    <form role="form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>User ID</label>
          </div>
          <div className="form-group  col-md-8">
            <TextInput
              name="userID"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>First Name</label>
          </div>
          <div className="form-group col-md-8">
            <TextInput
              name="firstName"
              type="text"
            />
          </div>

        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>User Type</label>
          </div>
          <div className="form-group col-md-8">
            <DropdownInput name="userType" options={callerType}
            />
          </div>

        </div>
      </div>
      <div className="form-actions right">
        <div className="form-group col-md-12">
          <div className="btn-toolbar pull-right">
            <button type="submit" className="btn green" disabled={submitting}>
              Search
            </button>
            <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset}>
              Clear
            </button>

          </div>
        </div>
      </div>
    </form>
  );
};


export default reduxForm({
  form: 'UserFilterForm', // a unique identifier for this form
})(UserFilterForm);