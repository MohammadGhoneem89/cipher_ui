import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import {TextInput} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';

const OrgServicesForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, index}) => {
    let servicesActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {servicesModalIsOpen: false})
        }
    ];
    return (
        <Portlet title={utils.getLabelByID("Services")} noCollapse={true} actions={servicesActions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row" key={index}>
                    <div className="col-md-6 col-sm-6">
                        <TextInput
                            name={"services[" + index + "].serviceName"}
                            label={utils.getLabelByID("ES_serviceName")}
                            type="text"
                        />
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <TextInput
                            name={"services[" + index + "].serviceCode"}
                            label={utils.getLabelByID("ES_serviceCode")}
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
    form: 'OrgServicesForm', // a unique identifier for this form
    validate,
    enableReinitialize: false
})(OrgServicesForm);