import * as utils from "../../../core/common/utils";
import Portlet from '../../../core/common/Portlet.jsx';
import React from 'react'
import {DropdownInput} from '../../../core/common/FormControls.jsx';
import {reduxForm} from 'redux-form';

const OptionalStatus = (props) => {

    let portletActions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "Close",
            icon: "close",
            actionHandler: props.closePortlet
        } 
    ];
    const onChange = (e) => {
        props.onUpdate(e.target.value)
    }
    return (
        <Portlet noCollapse={true} actions={portletActions} title="Manufacturing Sub-Status">
            <Portlet title={"Optional Status"}>

            <form autoComplete="off" role="form" onSubmit={props.handleSubmit}>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <DropdownInput
                            value={props.optionalStatusValue}
                            name={"optionalStatus"}
                            options={[...props.options]}
                            label={utils.getLabelByID("Optional Status")}
                            onChange={onChange}
                        />
                    </div>
                </div>


                <div className="row">
                    <div className="btn-toolbar pull-right">
                        <button type="submit" className="pull-right btn green">
                          {utils.getLabelByID("Update")}
                        </button>
                    </div>
                </div>
            </form>
            </Portlet>
        </Portlet>
        )
   
}

export default reduxForm({
    form: 'OptionalStatus', // a unique identifier for this form
    enableReinitialize: false
})(OptionalStatus);