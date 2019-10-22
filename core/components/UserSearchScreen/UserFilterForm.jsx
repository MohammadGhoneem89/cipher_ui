import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput } from '../../common/FormControls.jsx';
import { DropdownInput } from '../../common/FormControls.jsx';

import Label from '../../../applications/starta/common/Lable.jsx';

const UserFilterForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    let userType = sessionStorage.orgType
    let orgType = [
        { value: "Settlement", label: "Settlement" },
        { value: "Entity", label: "Entity" },
        { value: "Acquirer", label: "Acquirer" },
        { value: "DSG", label: "SDG" }
    ];
    let callerType = [
        { value: "Human", label: "Human" },
        { value: "API", label: "API" }
    ];


    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Label text="User ID" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <TextInput
                            name="userID"
                            type="text"
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <Label text="First Name" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <TextInput
                            name="firstName"
                            type="text"
                        />
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Label text="User Type" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <DropdownInput name="userType" options={callerType}
                        />
                    </div>

                </div>
            </div>

            <div className="row clearfix pull-right">
                <div className="col-md-2"></div>
                <div className="col-md-4" style={{ paddingRight: '50px' }}>
                    <button type="submit" className="btn green" disabled={submitting}>
                        Search
                    </button>
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset}>
                        Clear
                    </button>
                </div>
            </div>


        </form>
    );
};


export default reduxForm({
    form: 'UserFilterForm', // a unique identifier for this form
})(UserFilterForm);