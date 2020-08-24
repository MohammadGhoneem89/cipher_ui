import React from 'react';
import { reduxForm } from 'redux-form';
import { TextInput, DropdownInput } from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';

const CryptographyForm = props => {
    const dropdownOptions = [
        { value: "Encrypt", label: "Encrypt" },
        { value: "Decrypt", label: "Decrypt" }
    ]
    const { handleSubmit, clearFields } = props;
    return (
        <form autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">

                    <div className="col-md-6">
                        <TextInput
                            name="stringValue"
                            type="text"
                            label={utils.getLabelByID("Crypto_Utility_text_input")}
                            id="stringValue"
                        />
                    </div>
                    <div className="col-md-6">
                        <DropdownInput
                            name="methodType"
                            id="methodType"
                            label={utils.getLabelByID("Crypto_Utility_encryption_type")}
                            options={dropdownOptions}
                        />
                    </div>

                </div>

                <div className="col-md-12" style={{ marginTop: "10px" }}>
                    <div className="form-actions right">
                        <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button type="submit" className="btn green" >Submit</button>
                                <button type="button" className="btn default" disabled={true} onClick={clearFields}> Clear </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    );

};


export default reduxForm({
    form: 'CryptographyForm', // a unique identifier for this form
    fields: ['methodType', 'stringValue']
})(CryptographyForm);