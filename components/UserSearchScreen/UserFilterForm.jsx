import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput } from '../../core/common/FormControls.jsx';
import { DropdownInput } from '../../core/common/FormControls.jsx';

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
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <TextInput
                                name="userID"
                                label="User ID"
                                type="text"
                            />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <TextInput
                                name="firstName"
                                label="Firt Name"
                                type="text"
                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <TextInput
                                name="lastName"
                                label="Last Name"
                                type="text"
                            />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            {userType != 'Entity' && userType != 'Acquirer' &&
                                <DropdownInput name="orgType" options={orgType}
                                    label="Organization Type"
                                    />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                    

                    <DropdownInput name="userType" options={callerType}
                        label="User Type"
                         />
                    </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="pull-right">
                            <button type="submit" className="btn green" disabled={submitting}>
                                Search
                            </button>
                            {"  "}
                            <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset}>
                                Clear
                            </button>
                            {"  "}
                        </div>
                    </div>
                </div>

            </div>
        </form>
    );
};


export default reduxForm({
    form: 'UserFilterForm', // a unique identifier for this form
})(UserFilterForm);