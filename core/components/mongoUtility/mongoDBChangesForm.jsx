import React from 'react';
import { reduxForm } from 'redux-form';
import { CheckboxInput, CheckboxList, TextInput, DropdownInput, TextArea } from '../../common/FormControls.jsx';
import * as gen from '../../common/generalActionHandler'
import Combobox from '../../common/Select.jsx';
import Label from '../../common/Lable.jsx';

function comboboxHandler(formname, fieldname, type, e) {
    console.log(e)

}
const MongoDBChangesForm = props => {

    const { handleSubmit, schemaProfiles, updateState, connectionStrings } = props;
    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Label text="Source" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextInput
                            name={'source_url'}
                            type={'text'}
                            id={'source_url'}
                            placeholder={'mongodb://23.97.138.116:10050/master'}
                            value={'mongodb://23.97.138.116:10050/master'}
                            disabled={true}
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <Label text="Destination" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <DropdownInput
                            name="destination_url"
                            id="destination_url"
                            options={connectionStrings}
                            onChange={(e) => { updateState({ selectedProfile: e.target.value }) }}
                        />
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <Label text="Profile" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <DropdownInput
                            name="db_profiles"
                            id="db_profiles"
                            options={schemaProfiles}
                            onChange={(e) => { updateState({ selectedProfile: e.target.value }) }}
                        />
                    </div>
                </div>
            </div>
            <div className="row clearfix pull-right">
                <div className="col-md-6">
                    <div className="col-md-2"></div>
                    <div className="col-md-9">
                        <button type="submit" className="btn green" disabled={false}>
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
    fields: ['source_url', 'destination_url', 'db_profiles']
})(MongoDBChangesForm);