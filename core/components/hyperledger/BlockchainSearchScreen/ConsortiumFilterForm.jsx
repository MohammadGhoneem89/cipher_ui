import React from 'react';
import {reduxForm} from 'redux-form';
import {CheckboxInput, CheckboxList, DropdownInput, DataList} from '../../../common/FormControls.jsx';
import * as utils from '../../../common/utils.js';

const ConsortiumFilterForm = props => {
    const {handleSubmit, pristine, reset, submitting, state} = props;


    return (
        <form  autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <DataList
                                name="consortiumName"
                                list={"ConsortiumNames"}
                                label={utils.getLabelByID("Cipher_consortiumName")}
                                options={state.consortiumList.data.typeData.consortiumNames}
                            />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <DropdownInput name="blockchainType" options={state.consortiumList.data.typeData.Cipher_blockchainType}
                                           label={utils.getLabelByID("Cipher_consortiumType")}
                            />
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
                    <button type="button" className="btn default" disabled={pristine || submitting} onClick={reset}>
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
    form: 'ConsortiumFilterForm', // a unique identifier for this form
})(ConsortiumFilterForm);