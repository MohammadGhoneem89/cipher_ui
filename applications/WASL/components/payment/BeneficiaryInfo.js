import React from 'react';
import {reduxForm} from 'redux-form';
import {TextInput, DropdownInput} from '../../../../core/common/FormControls.jsx';
import * as utils from '../../../../core/common/utils.js';
import Portlet from '../../../../core/common/Portlet.jsx';


const BeneficiaryInfo = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
    let contactsActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {modalIsOpen: false})
        }
    ];

    return (
        <Portlet title={"Contacts"} noCollapse={true} actions={contactsActions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"beneficiaries[" + index + "].key"}
                            label={utils.getLabelByID("Key")}
                            type="text"
                        />
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <TextInput
                            name={"beneficiaries[" + index + "].value"}
                            label={utils.getLabelByID("Value")}
                            type="text"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="btn-toolbar pull-right">
                        <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                            {utils.getLabelByID("submit")}
                        </button>
                        <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                                onClick={reset}>
                            {utils.getLabelByID("RestValues")}
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'BeneficiaryInfo', // a unique identifier for this form
    enableReinitialize: false,
})(BeneficiaryInfo);