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

import Label from '../../common/Lable.jsx';

const FormSection1 = ({ error, initialValues, updateState, state, useCases }) => {
    let grpType = [
        { value: "UI", label: "UI" },
        { value: "API", label: "API" },
    ];
    

    function updateGroupType(e) {
       
        let updateNodes = []
        if (e.target.value == 'API')
            updateNodes = [...initialValues.APINodes];
        else if (e.target.value == 'UI')
            updateNodes = [...initialValues.UINodes];
        else
            updateNodes = [];

        updateState({
            initialValues : {
                ...initialValues,
                nodes: [...updateNodes]
            },
            type: e.target.value
        });

    }
    function updateUseCases(e) {
        updateState({ usecase: e.target.value });
    }
    return (
        <div className="row">
            <div className="col-md-6">

                <div className="row">
                    <Label text="Group Name" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <TextInput
                            name="name"
                            type="text"
                        />
                    </div>
                </div>

                <div className="row">
                    <Label text="Description" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <TextInput
                            name="description"
                            type="text"
                        />
                    </div>
                </div>

            </div>

            <div className="col-md-6">

                <div className="row">
                    <Label text="Group Type" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <DropdownInput name="type" options={grpType} onChange={updateGroupType} excludeSelectOption={true}
                        />
                    </div>
                </div>

                <div className="row">
                    <Label text="Use Case" columns='6' divStyle={{ width: '20%', paddingTop: '20px' }} />
                    <div className="col-md-6">
                        <DropdownInput name="usecase" options={useCases} onChange={updateUseCases} excludeSelectOption={true}
                        />
                    </div>
                </div>
                
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
            initialValues: {...props.initialValues}
        }
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        let nodes = [...nextProps.initialValues.nodes]
        if (this.state.initialValues.nodes.length==0 && nextProps.initialValues.type && nextProps.initialValues){
            this.setState({
                initialValues: {
                    ...this.state.initialValues,
                    nodes
                },
                checked: nextProps.initialValues.checked
            })
        }

        if (this.state.initialValues.nodes.length==0 && nextProps.initialValues){
            this.setState({
                checked: nextProps.initialValues.checked
            })
        }

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
        const { error, handleSubmit, pristine, reset, submitting, initialValues, pageActions, checked, expanded, useCases } = this.props;
        return (
            <div>
                <form>
                </form>
                <form role="form" onSubmit={handleSubmit(this.submit)}>
                    <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state} useCases={useCases} />
                    <hr></hr>
                    <GroupTree updateState={this.updateState} state={this.state} initialValues={this.state.initialValues} />
                    <div className="clearfix">
                        <ActionButton actionList={pageActions}
                            performAction={this.performAction}
                            submitting={submitting} pristine={pristine} />
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