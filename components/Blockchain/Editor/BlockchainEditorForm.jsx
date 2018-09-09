import React from 'react';
import {reduxForm} from 'redux-form';
import {TextArea} from '../../../core/common/FormControls.jsx';


const BlockchainEditorFrom = props => {
    const {handleSubmit, pristine, reset, submitting, state, initialValues} = props;
    if (initialValues) {
        return (
            <form autoComplete="off" role="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <TextArea name="document" style={{width: "100%", height: "200px"}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="pull-right">
                        <button type="submit" className="btn green" disabled={submitting}>
                            Save
                        </button>
                        <button type="button" className="btn btn-default" disabled={pristine || submitting}
                                onClick={reset}>
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        );
    }
    else {
        return (<div className="loader">Loading...</div>)
    }
};

export default reduxForm({
    form: 'BlockchainEditorFrom', // a unique identifier for this form
    enableReinitialize: true
})(BlockchainEditorFrom);