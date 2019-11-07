import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DropdownInput } from '../../common/FormControls.jsx';

import Label from '../../common/Lable.jsx';

const GroupFilterForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    let grpType = [
        { value: "UI", label: "UI" },
        { value: "API", label: "API" },
    ];
    return (
        <form role="form" onSubmit={handleSubmit} >
            <div className="row">
                <div className="col-md-6">
                    <Label text="Group Name" columns="3"  style={{paddingTop:"25px"}}/>
                        <TextInput
                            name="name"
                            type="text"             
                        />
                </div>

                <div className="col-md-6">
                    <Label text="Description" columns="3" style={{paddingTop:"25px"}} />
                        <TextInput
                            name="description"
                            type="text"
                        />
                </div>

            </div>


            <div className="row">
                   <div className="col-md-6">
                    <Label   text="Group Type"   columns="3" style={{paddingTop:"25px"}} />
                    <DropdownInput name="type" options={grpType}/>
                    </div>
            </div>

            <div className="row">
            <div className=" clearfix pull-right" >
                    
                    <button type="submit" className="btn green" disabled={submitting} style={{marginRight:"10px"}}>
                        Search
                    </button>
                    <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset} 
                    style={{marginRight:"25px"}}>
                        Clear
                    </button> 
                     </div>
                     </div>
                     

        </form>
    );
};


export default reduxForm({
    form: 'GroupFilterForm', // a unique identifier for this form
})(GroupFilterForm);