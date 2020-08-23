import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DropdownInput, TextArea } from '../../common/FormControls.jsx';
import Label from '../../common/Lable.jsx';

const CryptographyForm = props => {
    const dropdownOptions = [
        { value: "Encrypt", label: "Encrypt" },
        { value: "Decrypt", label: "Decrypt" }
    ]
    const { handleSubmit, methodTypes } = props;
    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Label text="String Value" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextInput
                            name="stringValue"
                            type="text"
                            id="stringValue"
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <Label text="Method Type" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <DropdownInput
                            name="methodType"
                            id="methodType"
                            options={dropdownOptions}
                        />
                    </div>
                </div>
            </div>
            <div className="row clearfix pull-right">
                <div className="col-md-6">
                    <div className="col-md-2"></div>
                    <div className="col-md-9">
                        <button type="submit" className="btn green" disabled={false}>
                            Submit
                        </button>
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