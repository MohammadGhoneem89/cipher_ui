import React from 'react';
import {reduxForm} from 'redux-form';
import {Input} from '../../core/common/FormControls.jsx';
import * as utils from '../../core/common/utils.js';
import ActionButton from '../../core/components/ActionButtonNew.jsx';

const PasswordPolicyForm = props => {
  const {handleSubmit, updateState, pristine, reset, submitting, initialValues, index, containerState} = props;

  function performAction(actionObj) {
    if (actionObj.label === "Reset") {
      props.reset();
    }
  }

  return (
    <form autoComplete="off" role="form" onSubmit={handleSubmit}>
      {Object.keys(initialValues).map((item, index) => {
        return (
          <div className="row" key={index}>
            <div className="form-group col-md-4">
              <label className="control-label">{utils.getLabelByID(item)}</label>
            </div>
            <div className="form-group col-md-6">
              <Input name={item} type="text"/>
            </div>
          </div>);
      })}

      <div className="clearfix">
        <ActionButton actionList={containerState.passwordPolicyDetail.actions} performAction={performAction}
                      submitting={submitting} pristine={pristine}/>
      </div>

    </form>
  );
};


export default reduxForm({
  form: 'PasswordPolicyForm', // a unique identifier for this form
})(PasswordPolicyForm);