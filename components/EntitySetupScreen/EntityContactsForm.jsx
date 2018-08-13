import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import {TextInput, DropdownInput} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';


const EntityContactsForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
  let contactsActions = [
    {
      type: "icon",
      className: "btn btn-default",
      label: "ADD",
      icon: "close",
      actionHandler: updateState.bind(this, {contactsModalIsOpen: false})
    }
  ];

  let contactTypes = [
    {value: "Business", label: utils.getLabelByID("ES_Business")},
    {value: "Technical", label: utils.getLabelByID("ES_Technical")}
  ];

  return (
    <Portlet title={"Contacts"} noCollapse={true} actions={contactsActions}>
      <form role="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"contacts[" + index + "].contactName"}
              label={utils.getLabelByID("ES_contactName")}
              type="text"
            />
          </div>
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"contacts[" + index + "].email"}
              label={utils.getLabelByID("ES_email")}
              type="text"
            />
          </div>
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"contacts[" + index + "].mobile"}
              label={utils.getLabelByID("ES_mobile")}
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <TextInput
              name={"contacts[" + index + "].POBox"}
              label={utils.getLabelByID("ES_POBox")}
              type="text"
            />
          </div>
          <div className="col-md-4 col-sm-4">
            <DropdownInput name={"contacts[" + index + "].contactType"} options={contactTypes}
                           label={utils.getLabelByID("ES_ContactType")}
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
              {utils.getLabelByID("RestValues")}
            </button>
          </div>
        </div>
      </form>
    </Portlet>
  );
};


export default reduxForm({
  form: 'EntityContactsForm', // a unique identifier for this form
  enableReinitialize: false,
  validate,
})(EntityContactsForm);