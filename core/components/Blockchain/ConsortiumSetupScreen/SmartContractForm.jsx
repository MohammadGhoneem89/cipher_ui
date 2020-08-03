import React from 'react';
import {reduxForm} from 'redux-form';
import {TextInput, TextArea, DropdownInput} from '../../../common/FormControls.jsx';
import * as utils from '../../../common/utils.js';


const SmartContractForm = ({reset, containerState}) => {
    return (
        <form role="form">
            <div className="row">
                <div className="col-md-4 col-sm-4">
                    <TextInput
                        name="templateName"
                        label={utils.getLabelByID("Cipher_SmartContractName")}
                        type="text"
                    />
                </div>
                <div className="col-md-4 col-sm-4">
                    <DropdownInput
                        name="status"
                        label={utils.getLabelByID("Cipher_SmartContractStatus")}
                        options={containerState.typeData.Cipher_smartContactStatus}
                        disabled={containerState.readOnly}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-sm-8">
                    <TextArea
                        name="description"
                        label={utils.getLabelByID("Cipher_SmartContractDesc")}
                        style={{width: "100%", height: "150px"}}/>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'SmartContractForm', // a unique identifier for this form
    enableReinitialize: true
})(SmartContractForm);