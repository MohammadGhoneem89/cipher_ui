import React from 'react';
import {reduxForm} from 'redux-form';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';
import {CheckboxInput, CheckboxList, DropdownInput, TextInput} from '../../common/FormControls.jsx';
import validate from './validate.js';

const FieldMappingForm = props => {
    const {handleSubmit, pristine, reset, submitting, containerState, updateState, state, index} = props;
    let mapFieldActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "close",
            actionHandler: updateState.bind(this, {fieldsModalIsOpen: false})
        }
    ];
    return (
        <Portlet title={utils.getLabelByID("MapField")} actions={mapFieldActions} noCollapse={true}>
            <form autoComplete="off" role="form" onSubmit={handleSubmit}>
                <div className="col-md-4 col-sm-4">

                    <DropdownInput name={"fields[" + index + "].columnNo"} options={state.columnNos}
                                   label={utils.getLabelByID("FTEMP_columnNo")}
                    />
                </div>
                <div className="col-md-4 col-sm-4">

                    <TextInput name={"fields[" + index + "].fieldNameTag"}
                               label={utils.getLabelByID("FTEMP_fieldNameTag")}
                               type="text"
                    />
                </div>
                <div className="col-md-4 col-sm-4">
                    <TextInput name={"fields[" + index + "].fieldName"}
                               label={utils.getLabelByID("FTEMP_fieldName")}
                               type="text"
                    />
                </div>
                <div className="col-md-4 col-sm-4">
                    <DropdownInput name={"fields[" + index + "].internalField"} options={state.internalFields}
                                   label={utils.getLabelByID("FTEMP_internalField")}
                    />
                </div>
                <div className="col-md-4 col-sm-4">
                    <DropdownInput name={"fields[" + index + "].functionName"} options={containerState.special}
                                   label={utils.getLabelByID("FTEMP_specialFunction")}
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <TextInput name={"fields[" + index + "].param1"}
                               label={utils.getLabelByID("FTEMP_param1")}
                               type="text"
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <TextInput name={"fields[" + index + "].param2"}
                               label={utils.getLabelByID("FTEMP_param2")}
                               type="text"
                    />
                </div>
                <div className="col-md-4 col-sm-4">
                    <TextInput name={"fields[" + index + "].type.format"}
                               label={utils.getLabelByID("FTEMP_fieldFormat")}
                               type="text"
                    />
                </div>
                <div className="col-md-4 col-sm-4">
                    <TextInput
                        name={"fields[" + index + "].type.maxLength"}
                        label={utils.getLabelByID("FTEMP_maxLength")}
                        type="number"
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <DropdownInput name={"fields[" + index + "].type.dataType"} options={containerState.reconDataTypes}
                                   label={utils.getLabelByID("FTEMP_dataType")}
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <CheckboxList>
                        <CheckboxInput
                            name={"fields[" + index + "].type.required"}
                            label={utils.getLabelByID("FTEMP_required")}
                            type="checkbox"
                        />
                    </CheckboxList>
                </div>
                <div className="clearfix">
                    <div className="col-md-12 col-sm-12 btn-toolbar pull-right">
                        <button type="button" className="pull-right btn default"
                                disabled={pristine || submitting}
                                onClick={reset}>
                            {utils.getLabelByID("Clear")}
                        </button>
                        <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                            {utils.getLabelByID("Save")}
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'FieldMappingForm', // a unique identifier for this form
    validate
})(FieldMappingForm);