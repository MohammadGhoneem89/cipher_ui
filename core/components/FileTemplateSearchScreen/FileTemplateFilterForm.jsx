import React from 'react';
import { reduxForm } from 'redux-form';
import { DataList } from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';

const FileTemplateFilterForm = props => {
    const { handleSubmit, pristine, reset, submitting, state } = props;


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
                                options={state.fileTemplateList.data.typeData.fileTemplateNames}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="col-md-12">
                        <div className="pull-right  btn-toolbar pull-right">
                            <button type="submit" className="btn green" disabled={submitting}>
                                {utils.getLabelByID("Search")}
                            </button>
                            <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
                                {utils.getLabelByID("Clear")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'FileTemplateFilterForm', // a unique identifier for this form
})(FileTemplateFilterForm);