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

    const { handleSubmit, schemaProfiles } = props;
    let generalHandler = gen.generalHandler.bind(this);


    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Label text="Source" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextInput
                            name="source_url"
                            type="text"
                            id="source_url"
                            placeholder={'mongodb://23.97.138.116:10050/master'}
                            value={'mongodb://23.97.138.116:10050/master'}
                            disabled={true}
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <Label text="Destination" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        <TextInput
                            name="destination_url"
                            type="text"
                            id="destination_url"
                        />
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <Label text="Profile" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-9">
                        {/* <select name="dropdown" id="dropdown" className="form-control">
                            <option value={""}>SELECT</option>
                            {schemaProfiles.schemaProfiles.map((option, index) => {
                                return (
                                    <option key={index} value={option.value}>{option.label}</option>
                                );
                            })}
                        </select> */}
                        <DropdownInput
                            name="db_profiles"
                            id="db_profiles"
                            options={schemaProfiles}
                        />
                        {/* <Combobox
                            status={undefined}
                            errorIconStyle={{
                                left: '365px',
                                top: '10px',
                                position: 'absolute',
                                color: 'darkgrey'
                            }}
                            fieldname='dbProfile'
                            formname='schemaProfile'
                            columns='12'
                            placeholder='Select'
                            style={{}}
                            state={containerState}
                            typeName="schemaProfiles"
                            dataSource={schemaProfiles}
                            multiple={false}
                            actionHandler={generalHandler}
                            className="form-control"
                            disabled={false}
                            isDDL={true}
                        /> */}
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