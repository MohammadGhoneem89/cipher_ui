import React from 'react';
import {reduxForm} from 'redux-form';
import {TextInput, DataList} from '../../common/FormControls.jsx';
import * as utils from '../../common/utils.js';

const PickupListFilterForm = props => {
    const {handleSubmit, pristine, reset, submitting, state} = props;


    return (
        <form autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <DataList
                                name="typeName"
                                list={"typeName"}
                                label={utils.getLabelByID("PL_TypeName")}
                                options={state.pickupList.data.typeData.typeDataListNames}
                            />
                        </div>
                    </div>
                </div>
                <div className="pull-right">
                    <button type="submit" className="btn green" disabled={submitting}>
                        {utils.getLabelByID("Search")}
                    </button>
                    <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>
                        {utils.getLabelByID("Clear")}
                    </button>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'PickupListFilterForm', // a unique identifier for this form
})(PickupListFilterForm);