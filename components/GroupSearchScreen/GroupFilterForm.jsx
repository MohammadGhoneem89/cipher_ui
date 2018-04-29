import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DropdownInput } from '../../common/FormControls.jsx';

const GroupFilterForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    let grpType = [
        { value: "UI", label: "UI" },
        { value: "API", label: "API" },
    ];
    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <TextInput
                                name="name"
                                label="Group Name"
                                type="text"
                            />
                        </div>
                        <div className="col-md-4 col-sm-4">

                            <TextInput
                                name="description"
                                label="Description"
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-sm-4">

                            <DropdownInput name="type" options={grpType}
                                label="Group Type"
                            />

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="pull-right">
                            <button type="submit" className="btn green" disabled={submitting}>
                                Search
                        </button>
                            <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset}>
                                Clear
                        </button>        </div>
                    </div>
                </div>

            </div>
        </form>
    );
};


export default reduxForm({
    form: 'GroupFilterForm', // a unique identifier for this form
})(GroupFilterForm);