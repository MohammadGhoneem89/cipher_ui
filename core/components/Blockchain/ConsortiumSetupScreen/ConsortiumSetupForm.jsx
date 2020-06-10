import React from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';
import * as utils from '../../../common/utils.js';

import {DropdownInput, TextInput} from '../../../common/FormControls.jsx';

//https://github.com/erikras/redux-form/issues/369


class ConsortiumSetupForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            readOnly: false
        };
        this.submit = this.submit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    performAction(actionObj) {

    }

    submit(data) {

    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps} = this.props;

        return (
            <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)} ref={this._form = this}>
                <div className="row">
                    <div className="col-md-6">
                        <TextInput
                            name="consortiumName"
                            label={utils.getLabelByID("Cipher_consortiumName")}
                            type="text"
                            disabled={true}
                        />
                    </div>
                    <div className="col-md-6">
                        <DropdownInput name="consortiumType" options={containerState.typeData.BLCHN_TYPE}
                                       label={utils.getLabelByID("Cipher_consortiumType")}
                                       disabled={true}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'ConsortiumSetupForm', // a unique identifier for this form
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(ConsortiumSetupForm);