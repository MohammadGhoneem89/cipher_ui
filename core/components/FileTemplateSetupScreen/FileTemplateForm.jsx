import React from 'react';
import {reduxForm} from 'redux-form';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import {CheckboxInput, CheckboxList, DropdownInput, TextInput} from '../../common/FormControls.jsx';
import ActionButton from '../../common/ActionButtonNew.jsx';
import Table from '../../common/Datatable.jsx';
import FieldMappingForm from './FieldMappingForm.jsx';
import validate from './validate.js';


const TemplateDetails = ({error, initialValues, containerState, updateState, state}) => {
    return (
        <Portlet title={utils.getLabelByID("TemplateDetails")} className={"portlet light"}>
            <div className="row">
                <div className="col-md-3 col-sm-3">
                    <TextInput name="templateName"
                               label={utils.getLabelByID("FTEMP_templateName")}
                               type="text"
                    />
                </div>
                <div className="col-md-3 col-sm-3">
                    <TextInput name="fileNameRegEx"
                               label={utils.getLabelByID("FTEMP_fileName")}
                               type="text"
                    />
                </div>
                <div className="col-md-3 col-sm-3">
                    <DropdownInput name="fileType" options={containerState.fileTypes}
                                   label={utils.getLabelByID("FTEMP_fileType")}
                    />
                </div>
                <div className="col-md-3 col-sm-3">
                    <TextInput name="separator"
                               label={utils.getLabelByID("FTEMP_separator")}
                               type="text"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3">
                    <TextInput name="XMLMainTag"
                               label={utils.getLabelByID("FTEMP_XMLMainTag")}
                               type="text"
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <TextInput
                        name="skipLines"
                        label={utils.getLabelByID("FTEMP_skipLines")}
                        type="number"
                    />
                </div>
            </div>
        </Portlet>
    );
};

class FileTemplateForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            fieldsModalIsOpen: false,
            fields: [],
            index: 0,
            internalFields: [],
            columnNos: []
        };
        this.submit = this.submit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.addFields = this.addFields.bind(this);
        this.detailsActionHandlers = this.detailsActionHandlers.bind(this);
        this.performAction = this.performAction.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialValues.fields && this.state.fields.length === 0) {
            this.setState({fields: nextProps.initialValues.fields});
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
        data.fields = this.state.fields;
        return this.props.onSubmit(data);
    }

    addFields(data) {
        data.fields[this.state.index].actions = [
            {
                label: utils.getLabelByID("Edit"),
                iconName: "fa fa-edit",
                actionType: "COMPONENT_FUNCTION"
            },
            {
                label: utils.getLabelByID("Delete"),
                iconName: "fa fa-trash",
                actionType: "COMPONENT_FUNCTION"
            }
        ];
        let field = data.fields[this.state.index];
        if(field.functionName){
            field.specialFunction = field.functionName + '(' + (field.param1 || null) + ',' + (field.param2 || null) + ')';
        }

        this.setState({
            fields: data.fields,
            fieldsModalIsOpen: false
        });
    }

    detailsActionHandlers({actionName, index}) {
        switch (actionName) {
            case "Edit":
                let usedInternalField = [];
                let usedColumnNo = [];
                this.state.fields.map((item, index) => {
                    usedInternalField.push(item.internalField);
                    usedColumnNo.push(item.columnNo);
                });
                let internalFields = this.props.containerState.internalFields.filter(item => {
                    return usedInternalField.indexOf(item.value) === -1 || this.state.fields[index].internalField === item.value;
                });
                let columnNos = this.props.containerState.columnNos.filter(item => {
                    return usedColumnNo.indexOf(item.value) === -1 || this.state.fields[index].columnNo === item.value;
                });


                this.setState({
                    internalFields,
                    columnNos,
                    index,
                    fieldsModalIsOpen: true
                });
                break;
            case "Delete":
                if (index > -1) {
                    let a = this.state.fields;
                    a.splice(index, 1);
                    this.setState({
                        fields: a
                    });
                }
                break;
        }
    }

    addBtnClicked() {
        let usedInternalField = [];
        let usedColumnNo = [];
        this.state.fields.map((item, index) => {
            usedInternalField.push(item.internalField);
            usedColumnNo.push(item.columnNo);
        });

        let internalFields = this.props.containerState.internalFields.filter(item => {
            return usedInternalField.indexOf(item.value) === -1;
        });
        let columnNos = this.props.containerState.columnNos.filter(item => {
            return usedColumnNo.indexOf(item.value) === -1;
        });

        this.setState({
            internalFields,
            columnNos,
            index: this.state.fields.length,
            fieldsModalIsOpen: true
        })
    }

    performAction(actionObj) {
        if (actionObj.label === "Reset") {
            this.props.reset();
        }
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps} = this.props;

        let mappedFieldsActions = [
            {
                type: "modal",
                className: "btn btn-default",
                label: utils.getLabelByID("Add"),
                icon: "plus",
                actionHandler: this.addBtnClicked.bind(this)
            }
        ];
        return (
            <div>
                <ModalBox isOpen={this.state.fieldsModalIsOpen}>
                    <FieldMappingForm onSubmit={this.addFields} index={this.state.index} initialValues={this.state}
                                      containerState={containerState} updateState={this.updateState}
                                      state={this.state}/></ModalBox>

                <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)}>
                    <TemplateDetails initialValues={initialValues} containerState={containerState}
                                     updateState={this.updateState}/>
                    <Portlet title={utils.getLabelByID("MappedFields")} actions={mappedFieldsActions}>
                        <Table
                            pagination={false}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("FTEMP_fields")}
                            componentFunction={this.detailsActionHandlers}
                            gridData={this.state.fields}
                            totalRecords={this.state.fields.length}
                        />
                    </Portlet>
                    <div className="clearfix">
                        <ActionButton actionList={containerState.fileTemplateDetail.actions}
                                      performAction={this.performAction}
                                      submitting={submitting} pristine={pristine}/>
                        {/*<button type="submit" className="pull-right btn green" disabled={submitting}>*/}
                        {/*Submit*/}
                        {/*</button>*/}
                        {/*<button type="button" className="pull-right btn default"*/}
                        {/*disabled={pristine || submitting}*/}
                        {/*onClick={reset}>*/}
                        {/*Clear Values*/}
                        {/*</button>*/}
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'FileTemplateForm', // a unique identifier for this form
    enableReinitialize: true,
    validate
})(FileTemplateForm);