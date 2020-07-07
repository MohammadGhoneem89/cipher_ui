import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DataList } from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';

const TemplateListForm = props => {
    const { handleSubmit, pristine, reset, submitting, state, newProps } = props;

    return (
        <form autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                        <div className="col-md-6 col-sm-6 padding-left-right">
                            <TextInput id="templateName" name="templateName" label={utils.getLabelByID('Letter Name')} type="text" />
                        </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{marginTop: '20px'}}>
                        <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button type="submit" className="btn green" disabled={submitting}>
                                    {utils.getLabelByID('Search')}
                                </button>
                                <button type="button" className="btn default" disabled={submitting} onClick={() => {newProps.history.push('purehealth/templateList/new')}}>
                                    {utils.getLabelByID('Add')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'TemplateListForm' // a unique identifier for this form
})(TemplateListForm);
