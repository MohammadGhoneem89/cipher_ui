import React from 'react';
import {reduxForm} from 'redux-form';
import {CheckboxInput, CheckboxList, TextInput, DataList} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';

const OrgFilterForm = props => {
    const {handleSubmit, pristine, reset, submitting, state} = props;


    return (
        <form  autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <DataList
                                name="entityName"
                                list={"EntityNames"}
                                label={utils.getLabelByID("entityName")}
                                options={state.entityList.data.typeData.entityNames}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <TextInput
                                name="arabicName"
                                label={utils.getLabelByID("arabicName")}
                                type="text"
                                style={{textAlign: "right"}}
                            />
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="col-md-6 col-sm-6">
                                <TextInput
                                    name="spCode"
                                    label={utils.getLabelByID("ESEARCH_spCode")}
                                    type="text"
                                />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <CheckboxList>
                                    <CheckboxInput
                                        name="isActive"
                                        label={utils.getLabelByID("isActive")}
                                        type="checkbox"
                                    />
                                </CheckboxList>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                    
                    <button type="submit" className="btn green" disabled={submitting}>
                        {utils.getLabelByID("Search")}
                    </button>
                    <button type="button" className="btn default" disabled={submitting} onClick={reset}>
                        {utils.getLabelByID("Clear")}
                    </button>
                </div>
                </div>
                </div>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'OrgFilterForm', // a unique identifier for this form
})(OrgFilterForm);