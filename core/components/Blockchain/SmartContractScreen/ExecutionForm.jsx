import React from 'react';
import {reduxForm} from 'redux-form';
import {TextInput} from '../../../common/FormControls.jsx';

const ExecutionForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, containerState, index}) => {
    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <label className="control-label col-md-2" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Params for:</label>
                    <div className="col-md-10">
                        {initialValues.label}
                    </div>
                </div>
            </div>
            <div className="row">
                {initialValues.inputs && initialValues.inputs.map((item, key) => {
                    return <div className="col-md-3 col-sm-3">
                        <TextInput
                            name={"args["+key+"]"}
                            label={item.name}
                            type="text"
                        />
                    </div>;
                })}
            </div>
            <div className="row">
                <div className="btn-toolbar pull-right">
                    <button type="submit" className="pull-right btn green" disabled={submitting}>
                        Execute
                    </button>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'ExecutionForm', // a unique identifier for this form
    enableReinitialize: true
})(ExecutionForm);