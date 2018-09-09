import React from 'react';
import {reduxForm} from 'redux-form';
import {TextInput} from '../../core/common/FormControls.jsx';
import * as utils from '../../core/common/utils.js';
import Portlet from '../../core/common/Portlet.jsx';


const ExceptionListForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
    let exceptionsActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {exceptionListModalIsOpen: false})
        }
    ];
    return (
        <Portlet title={"Exception List"} actions={exceptionsActions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row" key={index}>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"exceptionList[" + index + "].title"}
                            label="Exception"
                            type="text"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"exceptionList[" + index + "].start"}
                            label="Start"
                            type="text"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"exceptionList[" + index + "].end"}
                            label="End"
                            type="text"
                        />
                    </div>
					
                </div>
                <div className="clearfix">
                    <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                        Submit
                    </button>
                    <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                            onClick={reset}>
                        Rest Values
                    </button>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'ExceptionListForm', // a unique identifier for this form
    enableReinitialize: false
})(ExceptionListForm);