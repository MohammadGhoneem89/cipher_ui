import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import {TextInput, DropdownInput} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';


const OrgAdditionalPropsForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
  let contactsActions = [
    {
      type: "icon",
      className: "btn btn-default",
      label: "ADD",
      icon: "close",
      actionHandler: updateState.bind(this, {additionalPropsModalIsOpen: false})
    }
  ];
  
  
  return (
    <Portlet title={"Additional Properties"} noCollapse={true} actions={contactsActions}>
      <form role="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"additionalProps[" + index + "].propertyName"}
              label={utils.getLabelByID("Property Name")}
              type="text"
            />
          </div>
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"additionalProps[" + index + "].value"}
              label={utils.getLabelByID("Value")}
              type="text"
            />
          </div>
        </div>
        
        <div className="row">
          <div className="btn-toolbar pull-right">
            <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
              {utils.getLabelByID("submit")}
            </button>
            <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                    onClick={reset}>
              {utils.getLabelByID("Clear")}
            </button>
          </div>
        </div>
      </form>
    </Portlet>
  );
};


export default reduxForm({
  form: 'OrgAdditionalPropsForm', // a unique identifier for this form
  enableReinitialize: false,
  validate,
})(OrgAdditionalPropsForm);