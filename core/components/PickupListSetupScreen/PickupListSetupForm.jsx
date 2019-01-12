import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import {TextInput} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';
import _ from 'lodash';


const PickupListSetupForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues}) => {

  return (
    <form role="form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4 col-sm-4">
          <TextInput
            name={"typeName"}
            label={utils.getLabelByID("PLIST_Name")}
            type="text"
          />
        </div>
      </div>
      {_.get(initialValues,`data[${_.get(initialValues,'typeName','')}]`,[]).map((item, index) => {
        return <div className="row" key={index}>
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"data[" + initialValues.typeName + "][" + index + "].label"}
              label={utils.getLabelByID("PLIST_Key")}
              type="text"
            />
          </div>
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"data[" + initialValues.typeName + "][" + index + "].value"}
              label={utils.getLabelByID("PLIST_Value")}
              type="text"
            />
          </div>
        </div>;
      })}
      <div className="row">
        <div className="btn-toolbar pull-right">
          <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
            {utils.getLabelByID("Submit")}
          </button>
          <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                  onClick={reset}>
            {utils.getLabelByID("Clear")}
          </button>
        </div>
      </div>
    </form>
  );
};


export default reduxForm({
  form: 'PickupListSetupForm', // a unique identifier for this form
  enableReinitialize: false,
  validate
})(PickupListSetupForm);