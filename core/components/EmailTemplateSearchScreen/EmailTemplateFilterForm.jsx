import React from 'react';
import {reduxForm} from 'redux-form';
import {TextInput, DataList, DropdownInput} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';

const EmailTemplateFilterForm = props => {
  const {handleSubmit, pristine, reset, submitting, containerSate} = props;


  return (
    <form autoComplete="off" role="form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <DataList
                name="templateName"
                list={"templateNames"}
                label={utils.getLabelByID("FTEMP_templateName")}
                options={containerSate.emailTemplateList.data.typeData.emailTemplateNames}
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <DropdownInput name="templateType" options={containerSate.templateTypes}
                             label={utils.getLabelByID("ETEMP_templateType")}
              />
            </div>
          </div>
        </div>

        <div className="col-md-12 form-group" style={{marginTop: "15px"}}>
          <div className="btn-toolbar pull-right">
            <button type="submit" className="btn green" disabled={submitting}>
              Search
            </button>
            <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </div>
      </div>

    </form>
  );
};


export default reduxForm({
  form: 'EmailTemplateFilterForm', // a unique identifier for this form
})(EmailTemplateFilterForm);