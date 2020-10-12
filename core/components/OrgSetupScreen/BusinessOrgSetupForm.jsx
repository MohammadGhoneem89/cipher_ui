import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './validate';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import EntityServicesForm from './OrgServicesForm.jsx';
import TileUnit from '../../common/tileUnit.jsx';
import EntityContactsForm from './OrgContactsForm.jsx';
import OrgAdditionalPropsForm from './OrgAdditionalPropsForm.jsx';
import OrgMappedCodesForm from './OrgMappedCodesForm.jsx';
import * as utils from '../../common/utils.js';
import ActionButton from '../../common/ActionButtonNew.jsx';
import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';
import Input from '../../common/Input.jsx';
import Combobox from '../../common/Select.jsx';
import * as gen from '../../common/generalActionHandler'
import Label from '../../common/Lable.jsx';;
import DateControl from '../../common/DateControl.jsx';

//https://github.com/erikras/redux-form/issues/369
const FormSection1 = ({ generalHandler, error, initialValues, updateState, state, containerProps, containerState, onInputChange, welcome, handleSubmit, fetchOCR, addBusinessType, addLogisticsInformation, addDeclarationInformation, addTradeLicenses, addFacilities, issueDate, expiryDate, renewalDate, rowSelect }) => {
    console.log(JSON.stringify(containerState))
    return (


        <div>


            <Portlet title={"Basic Information"}>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        {/* <DropdownInput name="orgType" options={containerState.typeData ? containerState.typeData.ORG_TYPES : []}
                            label={utils.getLabelByID("ESEARCH_orgType")}
                            disabled={state.readOnly}
                        /> */}
                        <Label text="Org Type"></Label>
                        <Combobox fieldname='orgType' formname='body' style={{}}
                            state={state} typeName="ORG_TYPES"
                            isDDL={true}
                            dataSource={state} actionHandler={generalHandler} />
                        <br />
                        <Input
                            divStyle={{ padding: '0px' }}
                            status={(state.errors && state.errors.spCode) ? "ERROR" : undefined}
                            fieldname='spCode'
                            formname='body'
                            placeholder={utils.getLabelByID('ES_spCode')}
                            state={state}
                            actionHandler={generalHandler}
                            className="form-control"
                            label={utils.getLabelByID("ESEARCH_orgType")}
                        />
                        <br />
                        {!state.readOnly && (
                            <Input
                                divStyle={{ padding: '0px' }}
                                status={(state.errors && state.errors.BCode) ? "ERROR" : undefined}
                                fieldname='BCode'
                                formname='body'
                                placeholder={utils.getLabelByID('Business Code')}
                                state={state}
                                actionHandler={generalHandler}
                                className="form-control"
                            />
                        )}
                        <br />
                        {!state.readOnly && (
                            <button type="submit" className="btn green pull-right" onClick={handleSubmit}>
                                {utils.getLabelByID("Get Business Profile")}
                            </button>
                        )}

                        {state.readOnly && (
                            <Table
                                selectRow={rowSelect}
                                index={state.index}
                                pagination={false}
                                export={false}
                                search={false}
                                gridColumns={utils.getGridColumnByName("LinkedBusinessCode")}
                                // componentFunction={contactActionHandlers}
                                gridData={state.list ? state.list : []}
                                totalRecords={state.LogisticsInformationList ? state.LogisticsInformationList.length : 0}
                            />
                        )}
                    </div>
                    <br />
                    {fetchOCR && (
                        <div className="col-md-6 col-sm-6 offset4">

                            <div className="row" style={{ display: "inline" }}>
                                <div className="col-md-6 col-sm-6" style={{ textAlign: "center" }} />
                                <div className="col-md-5 col-sm-5" style={{ textAlign: "center" }}>
                                    <img id="EntityLogo"
                                        src={initialValues.entityLogo ? constants.baseUrl + initialValues.entityLogo.sizeMedium : "https://www.thsp.co.uk/wp-content/uploads/2016/11/Icon-Placeholder.png"}
                                        className="img-responsive img-thumbnail" alt="Entity Logo" width="150px"
                                        height="150px" />
                                    {!state.readOnly &&
                                        <div className="col-md-12 col-sm-12" style={{ textAlign: "center" }}>
                                            <span id="ImgUploadBtn" className="label label-primary" style={{ cursor: "pointer" }}>
                                                {utils.getLabelByID("ChangeImage")}
                                            </span>
                                            <TextInput name="entityLogo" id='ImgUploader' type='file'
                                                style={{ display: "none" }} />
                                        </div>}
                                </div>
                                <div className="col-md-6 col-sm-6" style={{ textAlign: "center" }} />

                            </div>
                        </div>
                    )}
                </div>
                <br />
                {fetchOCR && (
                    <div>
                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-md-6">
                                <DropdownInput name="ParentOrganization" options={containerState.typeData.ORG_TYPES}
                                    label={utils.getLabelByID("Parent Organization")}
                                    disabled={state.readOnly}
                                />
                            </div>
                            {console.log('---containerState.typeData.ORG_TYPES---', containerState.typeData.ORG_TYPES)}
                            <div className="col-md-6">
                                <DropdownInput name="RegistrationCategory" options={containerState.typeData.ORG_TYPES}
                                    label={utils.getLabelByID("Registration Category")}
                                    disabled={state.readOnly}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <TextInput
                                    name="Phone"
                                    id="Phone"
                                    label={utils.getLabelByID("Phone")}
                                    type="text"
                                    disabled={state.readOnly}
                                />

                            </div>

                            <div className="col-md-6">
                                <TextInput
                                    name="Fax"
                                    id="Fax"
                                    label={utils.getLabelByID("Fax")}
                                    type="text"
                                    disabled={state.readOnly}
                                />
                            </div>
                        </div>

                        <br />

                        <div className="row">
                            <div className="col-md-6">
                                <TextInput
                                    name="Email"
                                    id="Email"
                                    label={utils.getLabelByID("Email")}
                                    type="text"
                                    disabled={state.readOnly}
                                />

                            </div>

                            <div className="col-md-6">
                                <TextInput
                                    name="OperationalEmail"
                                    id="OperationalEmail"
                                    label={utils.getLabelByID("Operational Email")}
                                    type="text"
                                    disabled={state.readOnly}
                                />
                            </div>
                        </div>

                        <br />

                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-md-6">
                                <TextInput
                                    name="OperationalEmail"
                                    id="OperationalEmail"
                                    label={utils.getLabelByID("Verified On Date")}
                                    type="text"
                                    disabled={state.readOnly}
                                />
                            </div>
                            <div className="col-md-6" style={{ marginTop: '40px' }}>
                                <CheckboxList>
                                    <CheckboxInput
                                        name="is Active"
                                        label={utils.getLabelByID("IS OTP Verified")}
                                        type="checkbox"
                                        disabled={state.readOnly}
                                    />
                                </CheckboxList>
                            </div>
                        </div>
                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-md-6">
                                <CheckboxList>
                                    <CheckboxInput
                                        name="is Active"
                                        label={utils.getLabelByID("Is Active")}
                                        type="checkbox"
                                        disabled={state.readOnly}
                                    />
                                </CheckboxList>
                            </div>
                        </div>
                        <br />

                        {/* <div className="row">
                            <div className="col-md-6">
                                <TextInput
                                    name="CustomsCode"
                                    id="CustomsCode"
                                    label={utils.getLabelByID("Customs Code")}
                                    type="text"
                                    disabled={state.readOnly}
                                />
                            </div>
                        </div> */}
                    </div>
                )}
                {/* <div className="row">


                    <div className="col-md-3">
                        <DropdownInput name="parentEntity" options={containerProps.entityNames}
                            label={utils.getLabelByID("parentEntity")}
                            disabled={state.readOnly}
                        />
                    </div>
                    <div className="col-md-3">
                        <TextInput
                            name="spCode"
                            label={utils.getLabelByID("ES_spCode")}
                            type="text"
                            disabled={state.readOnly}
                        />
                    </div>
                </div>
                <br /> */}
                {/* <div className="row">


                    <div className="col-md-3">
                        <DropdownInput name="cycle" options={containerState.typeData.cycle}
                            label={utils.getLabelByID("billing cycle")}
                            disabled={state.readOnly}
                        />
                    </div>
                    <div className="col-md-3">
                        <DropdownInput name="currency" options={containerState.typeData.currency}
                            label={utils.getLabelByID("billing currency")}
                            disabled={state.readOnly}
                        />
                    </div>

                    <div className="col-md-3">
                        <div style={{ padding: "17px" }}>
                            <CheckboxList>
                                <CheckboxInput
                                    name="isActive"
                                    label={utils.getLabelByID("isActive")}
                                    type="checkbox"
                                    disabled={state.readOnly}
                                />
                            </CheckboxList>
                        </div>
                    </div>
                </div> */}

            </Portlet>

            {fetchOCR && (
                <div>

                    <div className="tabbable-line boxless">
                        <ul className="nav nav-tabs">


                            <li className={state.BusinessType && "active"}>
                                <a href="#tab_1_0" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Business Type
                                </a>
                            </li>
                            <li className={state.ProcessorTab && "active"}>
                                <a href="#tab_1_1" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Processor
                                </a>
                            </li>
                            <li className={state.TradeLicenseTab && "active"}>
                                <a href="#tab_1_3" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Trade license
                                </a>
                            </li>
                            <li className={state.FacilityTab && "active"}>
                                <a href="#tab_1_4" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Facility</a>
                            </li>
                            {/* <li>
                                <a href="#tab_1_5" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Documents</a>
                            </li>
                            <li>
                                <a href="#tab_1_6" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Public Key</a>
                            </li>
                            <li>
                                <a href="#tab_1_7" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Mapped Codes</a>
                            </li>
                            {!state.readOnly &&
                                <li>
                                    <a href="#tab_1_8" data-toggle="tab"
                                        style={{ fontWeight: "Bold", fontSize: "17px" }}>Welcome Kit</a>
                                </li>
                            }
                            <li>
                                <a href="#tab_1_9" data-toggle="tab"
                                    style={{ fontWeight: "Bold", fontSize: "17px" }}>Billing</a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="tabbable-line">
                        <div className="tab-content">


                            <div className="tab-pane active" id="tab_1_0">

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormSection8 addBusinessType={addBusinessType} generalHandler={generalHandler} initialValues={initialValues} updateState={updateState} state={state} />
                                    </div>
                                    <a className="btn green pull-right" href="#tab_1_1" data-toggle="tab" onClick={() => updateState({ BusinessType: false, ProcessorTab: true, TradeLicenseTab: false, FacilityTab: false })}
                                        style={{ marginTop: "10px" }}> Next
</a>
                                </div>
                            </div>

                            <div className="tab-pane" id="tab_1_1">

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormSection5 addLogisticsInformation={addLogisticsInformation} initialValues={initialValues} generalHandler={generalHandler} updateState={updateState} state={state} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormSection7 initialValues={initialValues} generalHandler={generalHandler} updateState={updateState} state={state} addDeclarationInformation={addDeclarationInformation} />
                                    </div>
                                    <a className="btn green pull-right" href="#tab_1_3" data-toggle="tab" onClick={() => updateState({ BusinessType: false, ProcessorTab: false, TradeLicenseTab: true, FacilityTab: false })}
                                        style={{ marginTop: "10px" }}> Next
                                </a>
                                </div>
                            </div>

                            <div className="tab-pane" id="tab_1_3">
                                <div>
                                    <FormSection3 generalHandler={generalHandler} initialValues={initialValues} updateState={updateState} state={state} addTradeLicenses={addTradeLicenses} issueDate={issueDate} expiryDate={expiryDate} renewalDate={renewalDate} />
                                </div>
                                <a className="btn green pull-right" href="#tab_1_4" data-toggle="tab" onClick={() => updateState({ BusinessType: false, ProcessorTab: false, TradeLicenseTab: false, FacilityTab: true })}
                                    style={{ marginTop: "10px" }}> Next
                                </a>
                            </div>

                            <div className="tab-pane" id="tab_1_4">
                                <div>
                                    <FormSection2 addFacilities={addFacilities} generalHandler={generalHandler} initialValues={initialValues} updateState={updateState} state={state} />
                                </div>
                                <button disabled={state.readOnly} type="submit" className="btn green pull-right" onClick={handleSubmit}>
                                    {utils.getLabelByID("Finish")}

                                </button>
                            </div>

                            <div className="tab-pane" id="tab_1_5">
                                <Portlet title={utils.getLabelByID("Documents")}>
                                    <FormSection6 initialValues={initialValues} updateState={updateState} state={state} />
                                </Portlet>
                            </div>

                            <div className="tab-pane" id="tab_1_7">
                                <FormSection2 addFacilities={addFacilities} generalHandler={generalHandler} initialValues={initialValues} updateState={updateState} state={state} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
};

const FormSection5 = ({ generalHandler, initialValues, updateState, state, onInputChange, addLogisticsInformation }) => {
    let contactsActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "plus",
            actionHandler: updateState.bind(this, {
                contactsModalIsOpen: true,
                index: state.contacts.length
            })

        }
    ];


    function contactActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":

                break;
            case "Delete":
                if (index > -1) {
                    let a = state.contacts;
                    a.splice(index, 1);
                    updateState({ contacts: a });
                }
                break;
        }
    }


    return (
        <Portlet title={"Logistics Information Provider"}>
            <CheckboxList>
                <CheckboxInput
                    name="is Active"
                    label={utils.getLabelByID("SELF")}
                    type="checkbox"
                // disabled={state.readOnly}
                />
            </CheckboxList>
            <div className="row">
                <div className="col-md-12">
                    <Combobox fieldname='value' formname='LogisticsInformation' style={{}}
                        state={state} typeName="list"
                        isDDL={true}
                        // disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />
                </div>
            </div>
            <a className="btn green pull-right" onClick={addLogisticsInformation}
                style={{ marginTop: "10px" }}> Add
            </a>
            <Table
                pagination={false}
                export={false}
                search={false}
                gridColumns={utils.getGridColumnByName("LogisticsInformationProvider")}
                componentFunction={contactActionHandlers}
                gridData={state.LogisticsInformationList ? state.LogisticsInformationList : []}
                totalRecords={state.LogisticsInformationList ? state.LogisticsInformationList.length : 0}
            />
        </Portlet>

    )
};

const FormSection7 = ({ initialValues, updateState, state, onInputChange, addDeclarationInformation, generalHandler }) => {
    let contactsActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "plus",
            actionHandler: updateState.bind(this, {
                contactsModalIsOpen: true,
                index: state.contacts.length
            })

        }
    ];


    function contactActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                updateState({
                    contactsModalIsOpen: true,
                    index
                });
                break;
            case "Delete":
                if (index > -1) {
                    let a = state.contacts;
                    a.splice(index, 1);
                    updateState({ contacts: a });
                }
                break;
        }
    }


    return (
        <Portlet title={"Declaration Information Provider"}>
            <CheckboxList>
                <CheckboxInput
                    name="is Active"
                    label={utils.getLabelByID("SELF")}
                    type="checkbox"
                // disabled={state.readOnly}
                />
            </CheckboxList>
            <div className="row">
                <div className="col-md-12">
                    <Combobox fieldname='value' formname='DeclarationInformation' style={{}}
                        state={state} typeName="list"
                        isDDL={true}
                        // disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />
                </div>
            </div>
            <a className="btn green pull-right" onClick={addDeclarationInformation}
                style={{ marginTop: "10px" }}> Add
            </a>
            <Table
                pagination={false}
                export={false}
                search={false}
                gridColumns={utils.getGridColumnByName("LogisticsInformationProvider")}
                componentFunction={contactActionHandlers}
                gridData={state.DeclarationInformationList ? state.DeclarationInformationList : []}
                totalRecords={state.DeclarationInformationList ? state.DeclarationInformationList.length : 0}
            />
        </Portlet>

    )
};


const FormSection8 = ({ generalHandler, initialValues, updateState, state, onInputChange, addBusinessType }) => {
    let contactsActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "plus",
            actionHandler: updateState.bind(this, {
                contactsModalIsOpen: true,
                index: state.contacts.length
            })

        }
    ];


    function contactActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                updateState({ BusinessTypes: state.BusinessTypeList[index] });
                let array = state.BusinessTypeList
                array.splice(index, 1)
                updateState({ BusinessTypeList: array })
                break;
            case "Delete":
                if (index > -1) {
                    let a = state.contacts;
                    a.splice(index, 1);
                    updateState({ contacts: a });
                }
                break;
        }
    }


    return (
        <Portlet title={"Business Types"}>
            <div className="row">
                <div className="col-md-12">
                    <Combobox fieldname='value' formname='BusinessTypes' columns='6' style={{}}
                        state={state} typeName="list"
                        isDDL={true}
                        disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />
                </div>
            </div>
            <a disabled={state.readOnly} className="btn green pull-right" onClick={addBusinessType}
                style={{ marginTop: "10px" }}> Add
            </a>
            <Table
                pagination={false}
                export={false}
                search={false}
                gridColumns={utils.getGridColumnByName("BusinessTypes")}
                componentFunction={contactActionHandlers}
                gridData={state.BusinessTypeList ? state.BusinessTypeList : []}
                totalRecords={state.BusinessTypeList ? state.BusinessTypeList.length : 0}
            />
        </Portlet>

    )
};

const FormSection2 = ({ addFacilities, initialValues, updateState, state, onInputChange, generalHandler }) => {
    let mappedCodesActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "plus",
            actionHandler: updateState.bind(this, {
                mappedCodesModalIsOpen: true,
                index: state.mappedCodes.length
            })

        }
    ];


    function mappedCodesActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    console.log('FacilityList:  ', state.FacilitiesList[index]);
                    updateState({ Facilities: state.FacilitiesList[index] });
                    let array = state.FacilitiesList
                    array.splice(index, 1)
                    updateState({ FacilitiesList: array })
                }
                break;
            case "Delete":
                if (index > -1) {
                    let a = state.mappedCodes;
                    a.splice(index, 1);
                    updateState({ mappedCodes: a });
                }
                break;
        }
    }


    return (
        <Portlet title={"Facilities"}>

            <div className="row">
                <div className="col-md-6">
                    <Label text="Facility Type"></Label>
                    <Combobox fieldname='FacilityType' formname='Facilities'
                        state={state} typeName="list"
                        isDDL={true}
                        disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />

                </div>
                <div className="col-md-6">
                    <Label text="Facility Name"></Label>
                    <Input
                        divStyle={{ padding: '0px' }}
                        status={(state.errors && state.errors.BCode) ? "ERROR" : undefined}
                        fieldname='FacilityName'
                        formname='Facilities'
                        placeholder={utils.getLabelByID('Facility Name')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                        disabled={state.readOnly}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Label text="Status"></Label>
                    <Combobox fieldname='Status' formname='Facilities'
                        state={state} typeName="list"
                        isDDL={true}
                        disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />

                </div>
                <div className="col-md-6">
                    <Label text="Mode"></Label>
                    <Combobox fieldname='Mode' formname='Facilities'
                        state={state} typeName="list"
                        isDDL={true}
                        disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />

                </div>
            </div>
            <a disabled={state.readOnly} className="btn green pull-right" onClick={addFacilities}
                style={{ marginTop: "10px" }}> Add
            </a>
            <br />
            <Table
                pagination={false}
                export={false}
                search={false}
                gridColumns={utils.getGridColumnByName("Facilities")}
                componentFunction={mappedCodesActionHandlers}
                gridData={state.FacilitiesList ? state.FacilitiesList : []}
                totalRecords={state.FacilitiesList ? state.FacilitiesList.length : 0}
            />
            {/* <Table
        pagination={false}
        export={false}
        search={false}
        gridColumns={utils.getGridColumnByName("entityContacts")}
        componentFunction={contactActionHandlers}
        gridData={state.contacts ? state.contacts : []}
        totalRecords={state.contacts ? state.contacts.length : 0}
      /> */}
        </Portlet>

    )
};

const FormSection3 = ({ initialValues, updateState, state, onInputChange, generalHandler, addTradeLicenses, issueDate, expiryDate, renewalDate }) => {
    let additionalPropertiesActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: utils.getLabelByID("Add"),
            icon: "plus",
            actionHandler: updateState.bind(this, {
                additionalPropsModalIsOpen: true,
                index: state.additionalProps.length
            })

        }
    ];

    function additionalPropsActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                updateState({ TradeLicenses: state.TradeLicensesList[index] });
                let array = state.TradeLicensesList
                array.splice(index, 1)
                updateState({ TradeLicensesList: array })
                break;
            case "Delete":
                if (index > -1) {
                    let a = state.additionalProps;
                    a.splice(index, 1);
                    updateState({ additionalProps: a });
                }
                break;
        }
    }


    function contactActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Edit":
                updateState({
                    additionalPropsModalIsOpen: true,
                    index
                });
                break;
            case "Delete":
                if (index > -1) {
                    let a = state.additionalProps;
                    a.splice(index, 1);
                    updateState({ additionalProps: a });
                }
                break;
        }
    }


    return (
        <Portlet title={"Trade Licenses"}>

            <div className="row">
                <div className="col-md-6">
                    <Label text="Issuing Authority"></Label>
                    <Combobox fieldname='IssueAuth' formname='TradeLicenses' style={{ marginTop: -4 }}
                        state={state} typeName="list"
                        isDDL={true}
                        disabled={state.readOnly}
                        dataSource={state} actionHandler={generalHandler} />
                </div>
                <div className="col-md-6">
                    <Label text="Issue Date"></Label>
                    <DateControl disabled={state.readOnly} value={state.TradeLicenses.issueDate} dateChange={issueDate} />
                    {/* <Input
                        divStyle={{ padding: '0px' }}
                        status={(state.errors && state.errors.IssueDate) ? "ERROR" : undefined}
                        fieldname='IssueDate'
                        formname='TradeLicenses'
                        placeholder={utils.getLabelByID('Issue Date')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                        disabled={state.readOnly}
                    /> */}
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <Label text="Expiry Date"></Label>
                    <DateControl disabled={state.readOnly} value={state.TradeLicenses.expiryDate} dateChange={expiryDate} />
                    {/* <Input
                        divStyle={{ padding: '0px' }}
                        status={(state.errors && state.errors.ExpiryDate) ? "ERROR" : undefined}
                        fieldname='ExpiryDate'
                        formname='TradeLicenses'
                        placeholder={utils.getLabelByID('Expiry Date')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                        disabled={state.readOnly}
                    /> */}
                </div>
                <div className="col-md-6">
                    <Label text="Renewal Date"></Label>
                    <DateControl disabled={state.readOnly} value={state.TradeLicenses.renewalDate} dateChange={renewalDate} />
                    {/* <Input
                        divStyle={{ padding: '0px' }}
                        status={(state.errors && state.errors.OperationalEmail) ? "ERROR" : undefined}
                        fieldname='RenewalDate'
                        formname='TradeLicenses'
                        placeholder={utils.getLabelByID('Renewal Date')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                        disabled={state.readOnly}
                    /> */}
                </div>
            </div>
            <br />
            {!state.readOnly && (
                <a className="btn green pull-right" onClick={addTradeLicenses}
                    style={{ marginTop: "10px" }}> Add
                </a>
            )}
            <br />
            <Table
                pagination={false}
                export={false}
                search={false}
                gridColumns={utils.getGridColumnByName("tradeLicenses")}
                componentFunction={additionalPropsActionHandlers}
                gridData={state.TradeLicensesList ? state.TradeLicensesList : []}
                totalRecords={state.TradeLicensesList ? state.TradeLicensesList.length : 0}
            />
        </Portlet>

    )
};


function mappedCodesActionHandlers({ actionName, index }) {
    switch (actionName) {
        case "Edit":
            updateState({
                contactsModalIsOpen: true,
                index
            });
            break;
        case "Delete":
            if (index > -1) {
                let a = state.contacts;
                a.splice(index, 1);
                updateState({ contacts: a });
            }
            break;
    }
}

const FormSection6 = ({ initialValues, updateState, state }) => {
    function getUploadResponse(data) {
        let documents = [...state.documents];
        for (let i = 0; i < data.contextData.length; i++) {
            documents.push({
                "fileDetail": data.contextData[i].fileDetail,
                "documentName": data.contextData[i].name,
                "fileType": data.contextData[i].ext,
                "retreivalPath": data.contextData[i].path,
                "documentHash": data.contextData[i].hash,
                "actions": data.contextData[i].actions
            });
        }
        //documents.push(...data.contextData);
        updateState({ documents })
    }

    function getRemoveResponse(documents) {
        console.log(documents.length, "LENGTH");
        updateState(documents);
    }

    return (<div className="row">
        <div className="col-centered col-md-12">
            <div className="form-group">
                <FileUploader type="Document" source="AcquirerSetup"
                    initialValues={state.documents}
                    acceptedFiles="image/jpeg,image/png,image/gif,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    getUploadResponse={getUploadResponse}
                    getRemoveResponse={getRemoveResponse}
                    maxFiles="5"
                    showDropzone={!state.readOnly}
                    showAttachementGrid={true} />
            </div>
        </div>
    </div>);
};

class OrgSetupForm extends React.Component {

    constructor(props, context) {
        super(props, context);


        this.state = {
            index: undefined,
            readOnly: false,
            isModalOpen: false,
            entityLogo: undefined,
            commissionTemplateID: "NOT_SET",
            services: [],
            contacts: [],
            mappedCodes: [],
            additionalProps: [],
            documents: [],
            fetchOCR: false,
            list: [{ label: "DHL", value: "DHL", businessCode: 100123 }, { label: "TNT", value: "TNT", businessCode: 100100 }],
            // list: this.props.entityList,
            BusinessType: true,
            ProcessorTab: false,
            TradeLicenseTab: false,
            FacilityTab: false,
            BusinessTypeList: [],
            LogisticsInformationList: [],
            DeclarationInformationList: [],
            TradeLicensesList: [],
            FacilitiesList: [],
            containerProps: {},
            TradeLicenses: {}

        };

        this.updateState = this.updateState.bind(this);
        this.updateServices = this.updateServices.bind(this);
        this.updateContacts = this.updateContacts.bind(this);
        this.updateMappedCodes = this.updateMappedCodes.bind(this);
        this.updateAdditionalProps = this.updateAdditionalProps.bind(this);
        this.submit = this.submit.bind(this);
        this.ECRFetch = this.ECRFetch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputChangeOrderer = this.onInputChangeOrderer.bind(this);
        this.performAction = this.performAction.bind(this);
        this.generalHandler = gen.generalHandler.bind(this);

    }

    updateState(data) {
        this.setState(data);
    }

    onInputChangeOrderer = (e) => {

        let value;
        if (e.target.name.indexOf('is') === 0) {
            value = $("#" + e.target.name).is(":checked");
        } else {
            value = e.target.value;
        }
        let netConf = _.cloneDeep(this.state.networkConfig);
        netConf.orderer[e.target.name] = value;
        this.setState({
            networkConfig: netConf
        })
    }


    onInputChange = (e) => {

        let value;
        if (e.target.name.indexOf('is') === 0) {
            value = $("#" + e.target.name).is(":checked");
        } else {
            value = e.target.value;
        }
        this.state.networkConfig[e.target.name] = value;
        this.setState({
            [e.target.name]: value
        })
    }

    addBusinessType = () => {
        let type = this.state.BusinessTypes
        type.actions = [{
            label: "Edit",
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
        }]
        this.setState({ BusinessTypes: {}, BusinessTypeList: [...this.state.BusinessTypeList, type] })
    }

    addLogisticsInformation = () => {
        let array = this.state.LogisticsInformationList
        let obj = this.state.LogisticsInformation
        obj.code = 'Courier'
        array.push(obj)
        this.setState({ LogisticsInformation: {}, LogisticsInformationList: array })
    }

    addDeclarationInformation = () => {
        let array = this.state.DeclarationInformationList
        let obj = this.state.DeclarationInformation
        obj.code = 'Courier'
        array.push(obj)
        this.setState({ DeclarationInformation: {}, DeclarationInformationList: array })
    }

    addTradeLicenses = () => {
        let type = this.state.TradeLicenses
        type.actions = [{
            label: "Edit",
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
        }]
        this.setState({ TradeLicenses: {}, TradeLicensesList: [...this.state.TradeLicensesList, type] })
    }

    addFacilities = () => {
        let type = this.state.Facilities
        type.actions = [{
            label: "Edit",
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
        }]
        this.setState({ Facilities: {}, FacilitiesList: [...this.state.FacilitiesList, type] })
    }


    updateServices(data) {
        data.services[this.state.index].actions = [
            {
                label: "Edit",
                iconName: "fa fa-edit",
                actionType: "COMPONENT_FUNCTION"
            },
            {
                label: "Delete",
                iconName: "fa fa-trash",
                actionType: "COMPONENT_FUNCTION"
            }
        ];
        this.setState({
            servicesModalIsOpen: false,
            services: data.services
        });
    }

    updateContacts(data) {
        data.contacts[this.state.index].actions = [{
            label: "Edit",
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
        }];
        this.setState({
            contactsModalIsOpen: false,
            contacts: data.contacts
        });
    }

    updateMappedCodes(data) {
        data.mappedCodes[this.state.index].actions = [{
            label: "Edit",
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
        }];
        this.setState({
            mappedCodesModalIsOpen: false,
            mappedCodes: data.mappedCodes
        });
    }

    updateAdditionalProps(data) {
        data.additionalProps[this.state.index].actions = [{
            label: "Edit",
            iconName: "fa fa-edit",
            actionType: "COMPONENT_FUNCTION"
        }];
        this.setState({
            additionalPropsModalIsOpen: false,
            additionalProps: data.additionalProps
        });
    }


    componentWillReceiveProps(nextProps) {
        // let details = {
        //     "taxNO1": "",
        //     "taxNO2": "",
        //     "address": "",
        //     "publicKey": "",
        //     "entityName": "",
        //     "arabicName": "",
        //     "spCode": "",
        //     "shortCode": "",
        //     "orgType": "",
        //     "isActive": false,
        //     "entityLogo": {
        //         "sizeSmall": "",
        //         "sizeMedium": ""
        //     },
        //     "parentEntity": "",
        //     "commissionTemplate": "",
        //     "contacts": [],
        //     "mappedCodes": [],
        //     "additionalProps": [],
        //     "documents": [],
        //     "clientKey": "",
        //     "lastReconDate": "",
        //     "contactType": "",
        //     "services": [],
        //     "welcomeEmail": "",

        // }

        // console.log("------------------->>>>>>>>>>. Props", nextProps)

        // if (this.state.commissionTemplateID !== nextProps.initialValues.commissionTemplate && nextProps.welcome) {
        //     this.setState({
        //         //commissionTemplateID: nextProps.initialValues.commissionTemplate,
        //         services: nextProps.initialValues.services,
        //         contacts: nextProps.initialValues.contacts,
        //         documents: nextProps.initialValues.documents,
        //         readOnly: nextProps.containerState.readOnly,
        //         ...details,
        //         ...nextProps.initialValues
        //     });
        // } else {
        //     this.setState({
        //         ...details
        //     })
        // }

        // if (nextProps.welcome) {
        //     this.setState({
        //         welcome: nextProps.welcome
        //     })
        // }

        // if (nextProps.welcomeResp) {
        //     this.setState({ welcome: nextProps.welcomeResp });
        // }
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log('---props---', this.props.containerProps.params.orgID);
        let props = this.props.containerProps.params.orgID ? true : false
        this.setState({ id: this.props.containerProps.params.orgID, readOnly: props })
        this.setState({ ORG_TYPES: this.props.containerProps.typeData.ORG_TYPES }, () => console.log('---typeData---', this.state.ORG_TYPES))
        // console.log("------------------->>>>>>>>>>. Props DID ", this.props)
        // let _this = this;
        // this.disableFileds();
        // document.getElementById('ImgUploadBtn').addEventListener('click', openDialog);
        // document.getElementById('ImgUploader').onchange = function (e) {
        //     let reader = new FileReader();
        //     let files = e.target.files;

        //     if (files && files[0]) {
        //         reader.onload = function (fileReader) {
        //             $('#EntityLogo').attr('src', fileReader.target.result);

        //             _this.props.containerProps.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
        //                 byteData: fileReader.target.result,
        //                 context: {
        //                     name: files[0].name,
        //                     size: files[0].size,
        //                     type: files[0].type
        //                 }
        //             })).then(result => {
        //                 _this.setState({ entityLogo: result.entityLogo })
        //             });
        //         };

        //         reader.readAsDataURL(files[0]);
        //     }
        // };

        // function openDialog() {
        //     document.getElementById('ImgUploader').click();
        // }
    }

    disableFileds() {
        $('#netconfig').find('input:text').attr("disabled", this.state.readOnly);
        $('#netconfig').find('textarea').attr("disabled", this.state.readOnly);
    }

    performAction(actionObj) {
        if (actionObj.label === "Reset") {
            this.props.reset();
        }
    }

    issueDate = (date) => {
        let TradeLicenses = this.state.TradeLicenses
        TradeLicenses.issueDate = moment.unix(date / 1000).format('DD/MM/YYYY')
        this.setState({
            TradeLicenses
        })
    }
    expiryDate = (date) => {
        let TradeLicenses = this.state.TradeLicenses
        TradeLicenses.expiryDate = moment.unix(date / 1000).format('DD/MM/YYYY')
        this.setState({
            TradeLicenses
        })
    }

    renewalDate = (date) => {
        let TradeLicenses = this.state.TradeLicenses
        console.log('---date---', date);
        TradeLicenses.renewalDate = moment.unix(date / 1000).format('DD/MM/YYYY')
        this.setState({
            TradeLicenses
        })
    }

    submit(data) {

        let taxNO1 = document.getElementById('taxNO1') == null ? "" : document.getElementById('taxNO1').value;
        let taxNO2 = document.getElementById('taxNO2') == null ? "" : document.getElementById('taxNO2').value;
        let address = document.getElementById('address') == null ? "" : document.getElementById('address').value;
        let publicKey = document.getElementById('publicKey') == null ? "" : document.getElementById('publicKey').value;

        data.services = this.state.services;
        data.contacts = this.state.contacts;
        data.mappedCodes = this.state.mappedCodes;
        data.additionalProps = this.state.additionalProps;
        data.entityLogo = this.state.entityLogo ? this.state.entityLogo : data.entityLogo;
        data.documents = this.state.documents;


        data.taxNO1 = taxNO1;
        data.taxNO2 = taxNO2;
        data.address = address;
        data.publicKey = publicKey;
        console.log("-------------------------->>>>>>>>>>>>>>>>>>>>", data)
        return this.props.onSubmit(data);
    }

    rowSelect = (x) => {
        this.setState({ fetchOCR: true, index: x })
    }

    ECRFetch(data) {
        this.setState({ fetchOCR: true })
        // welcomeEmail apiGroup userGroup firstScreen
        // let welcomeEmail = document.getElementById('welcomeEmail') == null ? "" : document.getElementById('welcomeEmail').value;
        // let apiGroup = document.getElementById('apiGroup') == null ? "" : document.getElementById('apiGroup').value;
        // let userGroup = document.getElementById('userGroup') == null ? "" : document.getElementById('userGroup').value;
        // let firstScreen = document.getElementById('firstScreen') == null ? "" : document.getElementById('firstScreen').value;

        // console.log("-------------------------->>>>>>>>>>>>>>>>>>>>", JSON.stringify(this.state))
        // let wc = this.state.welcome;
        // console.log("||||||||>>", welcomeEmail, apiGroup, userGroup, firstScreen);
        // wc.forEach((elem) => {
        //     elem.status = 'PENDING';
        // })
        // this.setState({ welcome: wc })

        // this.props.containerProps.actions.generalAjxProcess(constants.createOnDemandWelCome, {
        //     "orgType": this.state.orgType,
        //     "spCode": this.state.spCode,
        //     "apiGroup": apiGroup,
        //     "userGroup": userGroup,
        //     "firstScreen": firstScreen,
        //     "email": welcomeEmail,
        //     "welcome": wc
        // });
        // return this.props.onSubmit(data);
    }


    render() {
        console.log("----------st----------ar--", this.state)
        const { error, handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps, welcome } = this.props;
        return (
            <div>
                <ModalBox isOpen={this.state.contactsModalIsOpen}>
                    <EntityContactsForm onSubmit={this.updateContacts} initialValues={this.state}
                        index={this.state.index} updateState={this.updateState}
                    />
                </ModalBox>
                <ModalBox isOpen={this.state.mappedCodesModalIsOpen}>
                    <OrgMappedCodesForm onSubmit={this.updateMappedCodes} initialValues={this.state}
                        index={this.state.index} updateState={this.updateState}
                    />
                </ModalBox>

                <ModalBox isOpen={this.state.additionalPropsModalIsOpen}>
                    <OrgAdditionalPropsForm onSubmit={this.updateAdditionalProps} initialValues={this.state}
                        index={this.state.index} updateState={this.updateState}
                    />
                </ModalBox>

                <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)} ref={this._form = this}>
                    <FormSection1 generalHandler={this.generalHandler} initialValues={initialValues} updateState={this.updateState} state={this.state}
                        containerProps={containerProps} containerState={containerState} welcome={this.state.welcome}
                        onInputChange={this.onInputChange} handleSubmit={this.ECRFetch} fetchOCR={this.state.fetchOCR} addBusinessType={this.addBusinessType} addLogisticsInformation={this.addLogisticsInformation} addDeclarationInformation={this.addDeclarationInformation} addTradeLicenses={this.addTradeLicenses} addFacilities={this.addFacilities}
                        issueDate={this.issueDate} expiryDate={this.expiryDate} renewalDate={this.renewalDate} rowSelect={this.rowSelect} />
                    {/* <FormSection5 initialValues={initialValues} updateState={this.updateState} state={this.state}/> */}
                    {/* <Portlet title={utils.getLabelByID("Documents")}>
            <FormSection6 initialValues={initialValues} updateState={this.updateState} state={this.state}/>
          </Portlet> */}


                    {!this.state.readOnly &&
                        <div className="clearfix">
                            <ActionButton actionList={containerState.entityDetail.actions}
                                performAction={this.performAction}
                                submitting={submitting} pristine={pristine} />
                        </div>
                    }
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'OrgSetupForm', // a unique identifier for this form
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(OrgSetupForm);