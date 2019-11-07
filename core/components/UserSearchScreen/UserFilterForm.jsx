import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput } from '../../common/FormControls.jsx';
import { DropdownInput } from '../../common/FormControls.jsx';

import Label from '../../common/Lable.jsx';

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
                    <Label text="User ID" columns='3' style={{ paddingTop: '25px' }} />
                        <TextInput
                            name="userID"
                            type="text"
                        />
                </div>
                
                <div className="col-md-6 ">
                    <Label text="First Name" columns='3' style={{ paddingTop: '25px' }} />
                        <TextInput
                            name="firstName"
                            type="text"
                        />
                </div>
               
            </div>

            
            <div className="row">
                <div className="col-md-6">
                    <Label text="User Type" columns='3' style={{ paddingTop: '25px' }} />
                        <DropdownInput name="userType" options={callerType}
                        />
                    </div>

                </div>
            
            <div className="row">
            <div className="clearfix pull-right" >
                    <button type="submit" className="btn green" disabled={submitting} style={{marginRight:"10px"}}>
                        Search
                    </button>
                    <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset} style={{marginRight:"25px"}}>
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