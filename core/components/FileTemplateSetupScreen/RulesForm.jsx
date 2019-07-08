import React from 'react';
import {reduxForm} from 'redux-form';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';
import {CheckboxInput, CheckboxList, DropdownInput, TextInput} from '../../common/FormControls.jsx';
import validate from './validate.js';

const RulesForm = props => {
  const {handleSubmit, pristine, reset, submitting, containerState, updateState, state, index} = props;
  let mapFieldActions = [
    {
      type: "icon",
      className: "btn btn-default",
      label: utils.getLabelByID("Add"),
      icon: "close",
      actionHandler: updateState.bind(this, {ruleModalIsOpen: false})
    }
  ];
  return (
    <Portlet title={utils.getLabelByID("MapField")} actions={mapFieldActions} noCollapse={true}>
      <form autoComplete="off" role="form" onSubmit={handleSubmit}>
        <div className="col-md-4 col-sm-4">

          <DropdownInput name={"rules[" + index + "].type"} options={state.columnNos}
                         label={utils.getLabelByID("FTEMP_ruleType")}
          />
        </div>
        <div className="col-md-4 col-sm-4">

          <TextInput name={"rules[" + index + "].customFunction"}
                     label={utils.getLabelByID("FTEMP_customFunc")}
                     type="text"
          />
        </div>
        <div className="col-md-4 col-sm-4">
          <TextInput name={"rules[" + index + "].attributeName"}
                     label={utils.getLabelByID("FTEMP_attributeName")}
                     type="text"
          />
        </div>
        <div className="col-md-4 col-sm-4">
          <TextInput name={"rules[" + index + "].attributeValue"}
                     label={utils.getLabelByID("FTEMP_attributeValue")}
                     type="text"
          />
        </div>
        <div className="clearfix">
          <div className="col-md-12 col-sm-12 btn-toolbar pull-right">
            <button type="button" className="pull-right btn default"
                    disabled={pristine || submitting}
                    onClick={reset}>
              {utils.getLabelByID("Clear")}
            </button>
            <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
              {utils.getLabelByID("Save")}
            </button>
          </div>
        </div>
      </form>
    </Portlet>
  );
};


export default reduxForm({
  form: 'RulesForm', // a unique identifier for this form
  validate
})(RulesForm);