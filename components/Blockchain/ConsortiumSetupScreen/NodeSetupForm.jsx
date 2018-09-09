import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import {DropdownInput, TextInput} from '../../../core/common/FormControls.jsx';
import * as utils from '../../../core/common/utils.js';
import Portlet from '../../../core/common/Portlet.jsx';


const NodeSetupForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index, containerState}) => {
    let orgActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {nodeModalIsOpen: false})
        }
    ];
    return (
        <Portlet title={"Node Details"} noCollapse={true} actions={orgActions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <DropdownInput name="organizationName"
                                       options={containerState.consortiumDetail.participants.orgs || []}
                                       label={utils.getLabelByID("cipher_orgName")}/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"nodeName"}
                            label={utils.getLabelByID("cipher_nodeName")}
                            type="text"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"nodeRole"}
                            label={"Role"}
                            type="text"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"nodeIP"}
                            label={"IP"}
                            type="text"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"nodePort"}
                            label={"Port"}
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
    form: 'NodeSetupForm', // a unique identifier for this form
    validate,
    enableReinitialize: false
})(NodeSetupForm);