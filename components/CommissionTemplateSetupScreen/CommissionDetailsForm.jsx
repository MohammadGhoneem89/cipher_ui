import React from 'react';
import {reduxForm} from 'redux-form';
import * as utils from '../../core/common/utils.js';
import Portlet from '../../core/common/Portlet.jsx';
import {DateInput, DropdownInput, TextInput} from '../../core/common/FormControls.jsx';
import validate from './validate.js';

const CommissionDetailsForm = props => {
    const {handleSubmit, pristine, reset, submitting, containerState, formState, updateState, initialValues,index} = props;
    let mapFieldActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "close",
            actionHandler: updateState.bind(this, {detailModalIsOpen: false})
        }
    ];

    return (

        <Portlet title={utils.getLabelByID("CommissionDetails")} actions={mapFieldActions} noCollapse={true}>
            <h2 className="text-center">{formState.error}</h2>
            <form autoComplete="off" role="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput name={"commissionDetails[" + index + "].categoryType"}
                                       options={containerState.categoryTypes}
                                       label={utils.getLabelByID("CTEMP_categoryType")}
                        />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput name={"commissionDetails[" + index + "].feeType"}
                                       options={containerState.feeTypes}
                                       onChange={(e)=>{ updateState({selectedFeeType : e.target.value})}}
                                       label={utils.getLabelByID("CTEMP_feeType")}
                        />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <DateInput
                            name={"commissionDetails[" + index + "].startDate"}
                            label={utils.getLabelByID("CTEMP_startDate")}
                            type="date"
                        />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <DateInput
                            name={"commissionDetails[" + index + "].endDate"}
                            label={utils.getLabelByID("CTEMP_endDate")}
                            type="date"
                        />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <TextInput name={"commissionDetails[" + index + "].minVal"}
                                   label={utils.getLabelByID("CTEMP_minVal")}
                                   type="number"
                        />
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <TextInput name={"commissionDetails[" + index + "].maxVal"}
                                   label={utils.getLabelByID("CTEMP_maxVal")}
                                   type="number"
                        />
                    </div>
                  {formState.selectedFeeType==="Percentage" && <div className="col-md-3 col-sm-3">
                        <TextInput name={"commissionDetails[" + index + "].percentageRate"}
                                   label={utils.getLabelByID("CTEMP_percentageRate")}
                                   type="number"
                        />
                    </div>}
                  {formState.selectedFeeType==="Flat" && <div className="col-md-3 col-sm-3">
                        <TextInput name={"commissionDetails[" + index + "].flatRate"}
                                   label={utils.getLabelByID("CTEMP_flatRate")}
                                   type="number"
                        />
                    </div>}
                </div>
                <div className="row">
                    <div className="btn-toolbar pull-right">
                        <button type="submit" className="pull-right btn green" disabled={pristine || submitting}>
                          {utils.getLabelByID("Save")}
                        </button>
                        <button type="button" className="pull-right btn default" disabled={pristine || submitting}
                                onClick={reset}>
                          {utils.getLabelByID("Clear")}
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>
    );
};


export default reduxForm({
    form: 'CommissionDetailsForm', // a unique identifier for this form
    enableReinitialize: false,
    validate
})(CommissionDetailsForm);