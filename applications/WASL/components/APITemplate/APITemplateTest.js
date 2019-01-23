import React from 'react';
import {reduxForm} from 'redux-form';
import {TextArea} from '../../../../core/common/FormControls.jsx';
import * as utils from '../../../../core/common/utils.js';
import Portlet from '../../../../core/common/Portlet.jsx';


const APITemplateTest = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
    let Actions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {modalIsOpen: false})
        }
    ];

    return (
        <Portlet title={"API Template Test"} noCollapse={true} actions={Actions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <TextArea
                            label={utils.getLabelByID("Input JSON")}
                            type="text"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextArea
                            label={utils.getLabelByID("Output JSON")}
                            type="text"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="btn-toolbar pull-right">
                        <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                            {utils.getLabelByID("Test")}
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'APITemplateTest', // a unique identifier for this form
    enableReinitialize: false,
})(APITemplateTest);