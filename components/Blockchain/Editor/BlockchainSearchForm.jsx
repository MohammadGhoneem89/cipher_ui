import React from 'react';
import {reduxForm} from 'redux-form';
import {DropdownInput, TextInput} from '../../../core/common/FormControls.jsx';
import * as utils from '../../../core/common/utils.js';

const BlockchainSearchForm = props => {
    const {handleSubmit, pristine, reset, submitting, state} = props;

    return (
        <form autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <DropdownInput name={"collectionName"} options={state.collectionNames}
                                           label={utils.getLabelByID("BlockChainEditor_collectionNames")}
                            />
                            <TextInput name={"key"}  
                                       label={utils.getLabelByID("BlockChainEditor_key")}
                                       type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className="pull-right">
                    <button type="submit" className="btn green" disabled={submitting}>
                        Search
                    </button>
                    <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'BlockchainSearchForm' // a unique identifier for this form
})(BlockchainSearchForm);