import React from 'react';
import {reduxForm} from 'redux-form';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';
import {CheckboxInput, CheckboxList, DropdownInput, TextInput} from '../../common/FormControls.jsx';
import validate from './validate.js';

const RulesForm = props => {
  const {handleSubmit, pristine, reset, submitting, containerState, updateState, state, index, initialValues} = props;
  let mapFieldActions = [
    {
      type: "icon",
      className: "btn btn-default",
      label: utils.getLabelByID("Add"),
      icon: "close",
      actionHandler: updateState.bind(this, {ruleModalIsOpen: false})
    }
  ];
  let ruleType = "";
  return (
    <Portlet title={utils.getLabelByID("MAU_mapField")} actions={mapFieldActions} noCollapse={true}>
      <form autoComplete="off" role="form" onSubmit={handleSubmit}>
        <div className="col-md-4 col-sm-4">
          <DropdownInput name={"rules[" + index + "].type"} options={[{label:"Rule Based", value:"ruleBased"}, {label:"Custom Function", value:"customFunction"}]}
                         label={utils.getLabelByID("FTEMP_ruleType")} onChange={(e)=>{ruleType = updateState({ruleType: e.target.value});}}
          />
        </div>
        <div className="col-md-4 col-sm-4">
          <DropdownInput name={"rules[" + index + "].attributeName"} options={(() => {
            let options = [];
            initialValues.fields.map(item => {
              options.push({label: item.internalField, value: item.internalField});
            });
            return options;
          })()}
                         label={utils.getLabelByID("FTEMP_attributeName")}
          />
        </div>
        <div className="col-md-4 col-sm-4">
          <TextInput name={"rules[" + index + "].attributeValue"}
                     label={utils.getLabelByID("FTEMP_attributeValue")}
                     type="text"
          />
        </div>
        {state.ruleType==="customFunction" && <div className="row">
          <div className="col-md-4 col-sm-4"/>
          <div className="col-md-4 col-sm-4">
            <TextInput name={"rules[" + index + "].customFunction"}
                       label={utils.getLabelByID("FTEMP_customFunc")}
                       type="text"
            />
          </div>
        </div>}
        <div className="col-md-4 col-sm-4">

          <DropdownInput name={"rules[" + index + "].api"} options={containerState.apiList.map(item => {
            return {key: item, label: item}
          })}
                         label={utils.getLabelByID("FTEMP_apiMapping")}
          />
        </div>
        <div className="col-md-4 col-sm-4">
          <TextInput name={"rules[" + index + "].transformFunction"} options={containerState.apiList.map(item => {
            return {key: item, label: item}
          })}
                         label={utils.getLabelByID("FTEMP_transformFuc")}
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