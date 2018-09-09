import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import {TextInput} from '../../../core/common/FormControls.jsx';
import * as utils from '../../../core/common/utils.js';
import Portlet from '../../../core/common/Portlet.jsx';


const BlockchainOrganizationForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
    let orgActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {organizationModalIsOpen: false})
        }
    ];
    return (
        <Portlet title={"Organization Details"} noCollapse={true} actions={orgActions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row" key={index}>
                    <div className="col-md-6 col-sm-6">
                        <TextInput
                            name={"name"}
                            label={utils.getLabelByID("cipher_orgName")}
                            type="text"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="btn-toolbar pull-right">
                        <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                                onClick={reset}>
                            Rest Values
                        </button>
                        <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'BlockchainOrganizationForm', // a unique identifier for this form
    validate,
    enableReinitialize: false
})(BlockchainOrganizationForm);