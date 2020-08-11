import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DropdownInput, TextArea } from '../../common/FormControls.jsx';

import Label from '../../common/Lable.jsx';

const MongoDBChangesForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    let grpType = [
        { value: "UI", label: "UI" },
        { value: "API", label: "API" },
    ];
    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Label text="Source" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextInput
                            name="name"
                            type="text"
                            placeholder={'mongodb://23.97.138.116:10050/master'}
                            disabled={true}
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <Label text="Destination" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextInput
                            name="description"
                            type="text"
                        />
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Label text="Profile" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextArea
                            disabled={false}
                            divStyle={{ padding: '0px' }}
                            status={undefined}
                            fieldname='templateMarkup'
                            formname='body'
                            value={''}
                            columns='12'
                            placeholder={''}
                            state={undefined}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
            <div className="row clearfix pull-right">
                <div className="col-md-6">
                    <div className="col-md-2"></div>
                    <div className="col-md-9">
                        <button type="submit" className="btn green" disabled={submitting}>
                            Identify Changes
                    </button>
                    </div>
                </div>
            </div>

        </form>
    );
};


export default reduxForm({
    form: 'MongoDBChangesForm', // a unique identifier for this form
})(MongoDBChangesForm);