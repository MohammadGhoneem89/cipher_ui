import React from 'react';
import { reduxForm } from 'redux-form';
import Table from '../../common/Datatable.jsx';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';
import GroupTree from './GroupTree.jsx'
import validate from './validate';
import ActionButton from '../../common/ActionButtonNew.jsx';


const FormSection1 = ({ error, initialValues, updateState, state }) => {
    let grpType = [
        { value: "UI", label: "UI" },
        { value: "API", label: "API" },
    ];
    function updateGroupType(e) {
        updateState({ type: e.target.value });

        let updateNodes = []
        if (e.target.value == 'API')
            initialValues.nodes = initialValues.APINodes;
        else if (e.target.value == 'UI')
            initialValues.nodes = initialValues.UINodes;
        else
            initialValues.nodes = [];
    }
    return (
        <div className="row">
            <div className="col-md-4">
                <TextInput
                    name="name"
                    label="Group Name"
                    type="text"
                />
            </div>
            <div className="col-md-4">
                <TextInput
                    name="description"
                    label="Description"
                    type="text"
                />
            </div>
            <div className="col-md-4">
                <DropdownInput name="type" options={grpType} onChange={updateGroupType} excludeSelectOption={true}
                    label="Group Type"
                />
            </div>
        </div>
    )
};

class GroupSetupForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: [],
            checked: [],
            type: undefined,
        }
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ checked: nextProps.initialValues.checked })

    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    updateState(data) {
        this.setState(data);
    }

    submit(data) {
        data.checked = this.state.checked;
        data.expanded = this.state.expanded;
        data.nodes = [];
        return this.props.onSubmit(data);

    }

    render() {
        const { error, handleSubmit, pristine, reset, submitting, initialValues, pageActions, checked, expanded } = this.props;
        return (
            <div>
                <form role="form" onSubmit={handleSubmit(this.submit)}>
                    <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state} />
                    <div className="col-md-12">
                        <GroupTree updateState={this.updateState} state={this.state} initialValues={initialValues} />
                    </div>
                    <div className="col-md-12">
                        <div className="clearfix">
                            <ActionButton actionList={pageActions}
                                performAction={this.performAction}
                                submitting={submitting} pristine={pristine} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'GroupSetupForm', // a unique identifier for this form
    validate,
    enableReinitialize: true
})(GroupSetupForm);