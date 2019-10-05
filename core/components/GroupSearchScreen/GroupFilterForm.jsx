import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DropdownInput } from '../../common/FormControls.jsx';

import Label from '../../../applications/starta/common/Lable.jsx';

const GroupFilterForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    let grpType = [
        { value: "UI", label: "UI" },
        { value: "API", label: "API" },
    ];
    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Label text="Group Name" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <TextInput
                            name="name"
                            type="text"
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <Label text="Description" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <TextInput
                            name="description"
                            type="text"
                        />
                    </div>

                </div>


            </div>
            <div className="row">

                <div className="col-md-6">
                    <Label text="Group Type" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <DropdownInput name="type" options={grpType}
                        />
                    </div>

                </div>


            </div>

            <div className="row clearfix pull-right">
                <div className="col-md-2"></div>
                <div className="col-md-4" style={{ paddingRight: '50px'}}>
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
    form: 'GroupFilterForm', // a unique identifier for this form
})(GroupFilterForm);