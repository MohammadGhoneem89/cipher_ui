import React from 'react';
import {reduxForm} from 'redux-form';
import {CheckboxInput, CheckboxList, TextInput} from '../../../common/FormControls.jsx';
import * as utils from '../../../common/utils.js';
import Portlet from '../../../common/Portlet.jsx';


const DeploySmartContractForm = ({handleSubmit, updateState, pristine, reset, submitting, initialValues, containerState, index}) => {
    let contactsActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {deployModelsOpen: false})
        }
    ];

    return (
        <Portlet title={"Deploy Smart Contract"} noCollapse={true} actions={contactsActions}>
            <form role="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label col-md-12" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>{utils.getLabelByID("Cipher_SmartContractName")}:</label>
                            <div className="col-md-12">
                                {containerState.consortiumDetail.smartContractTemplates[containerState.index].templateName}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <label className="control-label" style={{
                            textAlign: "left",
                            fontWeight: "bold"
                        }}>Channels List:</label>
                        <CheckboxList>
                            {containerState.consortiumDetail.channels.map((item, key) =>
                                <CheckboxInput
                                    key={key}
                                    type="checkbox"
                                    name={"channels[" + item.name + "]"}
                                    label={item.name}
                                    style={{float: "left", marginLeft: "8px"}}
                                />
                            )}
                        </CheckboxList>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <label className="control-label" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>Params:</label>
                        </div>
                        {containerState.consortiumDetail.smartContractTemplates[containerState.index].struct.constructor.inputs.map((item, key) =>
                            <div className="col-md-3">
                                <TextInput
                                    key={key}
                                    name={"params[" + key + "]"}
                                    label={item.name}
                                    type="text"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="btn-toolbar pull-right">
                        <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                                onClick={reset}>
                            Clear
                        </button>
                        <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                            Deploy
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'DeploySmartContractForm', // a unique identifier for this form
    enableReinitialize: false
})(DeploySmartContractForm);