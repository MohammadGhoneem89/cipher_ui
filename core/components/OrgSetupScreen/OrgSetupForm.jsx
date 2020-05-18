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
import EntityContactsForm from './OrgContactsForm.jsx';
import OrgAdditionalPropsForm from './OrgAdditionalPropsForm.jsx';
import OrgMappedCodesForm from './OrgMappedCodesForm.jsx';
import * as utils from '../../common/utils.js';
import ActionButton from '../../common/ActionButtonNew.jsx';
import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';

//https://github.com/erikras/redux-form/issues/369
const FormSection1 = ({ error, initialValues, updateState, state, containerProps, containerState, onInputChange }) => {
  return (


    <div>

      <Portlet title={"Setup"}>


        <div className="tabbable-line boxless">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#tab_1_1" data-toggle="tab"
                style={{ fontWeight: "Bold", fontSize: "17px" }}>Organization</a>
            </li>
            <li>
              <a href="#tab_1_2" data-toggle="tab"
                style={{ fontWeight: "Bold", fontSize: "17px" }}>Contacts</a>
            </li>
            <li>
              <a href="#tab_1_3" data-toggle="tab"
                style={{ fontWeight: "Bold", fontSize: "17px" }}>Tax Codes</a>
            </li>
            <li>
              <a href="#tab_1_4" data-toggle="tab"
                style={{ fontWeight: "Bold", fontSize: "17px" }}>Additional Properties</a>
            </li>
            <li>
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
          </ul>
        </div>
        <div className="tabbable-line">
          <div className="tab-content">

            <div className="tab-pane active" id="tab_1_1">
              <Portlet title={"Details"}>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <TextInput
                      name="entityName"
                      label={utils.getLabelByID("entityName")}
                      type="text"
                      disabled={state.readOnly}
                    />
                    <br />
                    <TextInput
                      name="arabicName"
                      label={utils.getLabelByID("arabicName")}
                      type="text"
                      style={{ textAlign: "right" }}
                      disabled={state.readOnly}
                    />
                    <br />
                    <TextInput
                      name="clientKey"
                      label={utils.getLabelByID("Client Key")}
                      type="text"
                      disabled={state.readOnly}
                    />
                    <br />
                    <DropdownInput name="orgType" options={containerState.typeData.ORG_TYPES}
                      label={utils.getLabelByID("ESEARCH_orgType")}
                      disabled={state.readOnly}
                    />
                  </div>
                  <br />
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
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="col-md-6 col-sm-6">
                        <br />
                        <DropdownInput name="parentEntity" options={containerProps.entityNames}
                          label={utils.getLabelByID("parentEntity")}
                          disabled={state.readOnly}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <br />
                          <TextInput
                            name="spCode"
                            label={utils.getLabelByID("ES_spCode")}
                            type="text"
                            disabled={state.readOnly}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="col-md-6 col-sm-6">
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
                  </div>
                </div>
              </Portlet>

            </div>

            <div className="tab-pane" id="tab_1_2">
              <FormSection5 initialValues={initialValues} updateState={updateState} state={state} />
            </div>

            <div className="tab-pane" id="tab_1_3">
              <Portlet title={"Tax Codes"}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="control-label">{utils.getLabelByID("Tax NO 1")}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-8">
                        <input type="text" className="form-control" name="taxNO1" id="Tax NO 1" onChange={onInputChange}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="control-label">{utils.getLabelByID("Tax NO 2")}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-8">
                        <input type="text" className="form-control" name="taxNO2" id="taxNO2" onChange={onInputChange}/>
                      </div>
                    </div>
                  </div>

                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label className="control-label">{utils.getLabelByID("Address")}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-8">
                        <input type="text" className="form-control" name="address" id="address" onChange={onInputChange}/>
                      </div>
                    </div>
                  </div>

                </div>
              </Portlet>
            </div>

            <div className="tab-pane" id="tab_1_4">
            <FormSection3 initialValues={initialValues} updateState={updateState} state={state} />
            </div>

            <div className="tab-pane" id="tab_1_5">
              <Portlet title={utils.getLabelByID("Documents")}>
                <FormSection6 initialValues={initialValues} updateState={updateState} state={state} />
              </Portlet>
            </div>

            <div className="tab-pane" id="tab_1_6">
              <Portlet title={"Public Key"}>
                <div className="row">

                  <div className="col-md-12">
                    <div className="col-md-12">
                      <textarea type="text" className="form-control" name="publicKey"  onChange={onInputChange} rows="4" style={{ resize: "none", width: "100%" }} />
                    </div>
                  </div>
                </div>
              </Portlet>
            </div>

            <div className="tab-pane" id="tab_1_7">
            <FormSection2 initialValues={initialValues} updateState={updateState} state={state} />
            </div>

          </div>
        </div>













      </Portlet>
    </div>


  )
};

const FormSection5 = ({ initialValues, updateState, state, onInputChange }) => {
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
    <Portlet title={"Contacts"} actions={state.readOnly ? false : contactsActions}>
      <Table
        pagination={false}
        export={false}
        search={false}
        gridColumns={utils.getGridColumnByName("entityContacts")}
        componentFunction={contactActionHandlers}
        gridData={state.contacts ? state.contacts : []}
        totalRecords={state.contacts ? state.contacts.length : 0}
      />
    </Portlet>

  )
};



const FormSection2 = ({ initialValues, updateState, state, onInputChange }) => {
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
        updateState({
          mappedCodesModalIsOpen: true,
          index
        });
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
    <Portlet title={"Mapped Codes"} actions={state.readOnly ? false : mappedCodesActions}>
      <Table
          pagination={false}
          export={false}
          search={false}
          gridColumns={utils.getGridColumnByName("mappedCodes")}
          componentFunction={mappedCodesActionHandlers}
          gridData={state.mappedCodes ? state.mappedCodes : []}
          totalRecords={state.mappedCodes ? state.mappedCodes.length : 0}
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

const FormSection3 = ({ initialValues, updateState, state, onInputChange }) => {
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
    <Portlet title={"Additional Properties"} actions={state.readOnly ? false : additionalPropertiesActions}>
      <Table
          pagination={false}
          export={false}
          search={false}
          gridColumns={utils.getGridColumnByName("additionalProperties")}
          componentFunction={additionalPropsActionHandlers}
          gridData={state.additionalProps ? state.additionalProps : []}
          totalRecords={state.additionalProps ? state.additionalProps.length : 0}
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

function additionalPropsActionHandlers({ actionName, index }) {
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
      networkConfig: {
        "ca": "https://dal-zbc01a.5.secure.blockchain.ibm.com:20327",
        "username": "admin",
        "secret": "4010f0d6b593e87872acf4ddfaf05c69",
        "name": "peerdubaipay",
        "mspid": "PeerOrg1",
        "channelName": "btn-channels",
        "orderer": {
          "url": "grpcs://dal-zbc01b.5.secure.blockchain.ibm.com:20325",
          "server_hostname": "dal-zbc01e.5.secure.blockchain.ibm.com",
          "tls_cacerts": "-----BEGIN CERTIFICATE-----\r\nMIIElDCCA3ygAwIBAgIQAf2j627KdciIQ4tyS8+8kTANBgkqhkiG9w0BAQsFADBh\r\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\r\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\r\nQTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaME0xCzAJBgNVBAYTAlVT\r\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxJzAlBgNVBAMTHkRpZ2lDZXJ0IFNIQTIg\r\nU2VjdXJlIFNlcnZlciBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\r\nANyuWJBNwcQwFZA1W248ghX1LFy949v/cUP6ZCWA1O4Yok3wZtAKc24RmDYXZK83\r\nnf36QYSvx6+M/hpzTc8zl5CilodTgyu5pnVILR1WN3vaMTIa16yrBvSqXUu3R0bd\r\nKpPDkC55gIDvEwRqFDu1m5K+wgdlTvza/P96rtxcflUxDOg5B6TXvi/TC2rSsd9f\r\n/ld0Uzs1gN2ujkSYs58O09rg1/RrKatEp0tYhG2SS4HD2nOLEpdIkARFdRrdNzGX\r\nkujNVA075ME/OV4uuPNcfhCOhkEAjUVmR7ChZc6gqikJTvOX6+guqw9ypzAO+sf0\r\n/RR3w6RbKFfCs/mC/bdFWJsCAwEAAaOCAVowggFWMBIGA1UdEwEB/wQIMAYBAf8C\r\nAQAwDgYDVR0PAQH/BAQDAgGGMDQGCCsGAQUFBwEBBCgwJjAkBggrBgEFBQcwAYYY\r\naHR0cDovL29jc3AuZGlnaWNlcnQuY29tMHsGA1UdHwR0MHIwN6A1oDOGMWh0dHA6\r\nLy9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEdsb2JhbFJvb3RDQS5jcmwwN6A1\r\noDOGMWh0dHA6Ly9jcmw0LmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEdsb2JhbFJvb3RD\r\nQS5jcmwwPQYDVR0gBDYwNDAyBgRVHSAAMCowKAYIKwYBBQUHAgEWHGh0dHBzOi8v\r\nd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwHQYDVR0OBBYEFA+AYRyCMWHVLyjnjUY4tCzh\r\nxtniMB8GA1UdIwQYMBaAFAPeUDVW0Uy7ZvCj4hsbw5eyPdFVMA0GCSqGSIb3DQEB\r\nCwUAA4IBAQAjPt9L0jFCpbZ+QlwaRMxp0Wi0XUvgBCFsS+JtzLHgl4+mUwnNqipl\r\n5TlPHoOlblyYoiQm5vuh7ZPHLgLGTUq/sELfeNqzqPlt/yGFUzZgTHbO7Djc1lGA\r\n8MXW5dRNJ2Srm8c+cftIl7gzbckTB+6WohsYFfZcTEDts8Ls/3HB40f/1LkAtDdC\r\n2iDJ6m6K7hQGrn2iWZiIqBtvLfTyyRRfJs8sjX7tN8Cp1Tm5gr8ZDOo0rwAhaPit\r\nc+LJMto4JQtV05od8GiG7S5BNO98pVAdvzr508EIDObtHopYJeS4d60tbvVS3bR0\r\nj6tJLp07kzQoH3jOlOrHvdPJbRzeXDLz\r\n-----END CERTIFICATE-----\r\n-----BEGIN CERTIFICATE-----\r\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\r\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\r\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\r\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\r\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\r\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\r\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\r\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\r\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\r\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\r\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\r\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\r\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\r\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\r\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\r\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\r\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\r\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\r\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\r\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\r\n-----END CERTIFICATE-----\r\n"
        },
        "peerList": [
          {
            "peerName": "Peer1",
            "requests": "grpcs://dal-zbc01c.5.secure.blockchain.ibm.com:20330",
            "events": "grpcs://dal-zbc01c.5.secure.blockchain.ibm.com:20329",
            "server_hostname": "dal-zbc01c.5.secure.blockchain.ibm.com",
            "tls_cacerts": "-----BEGIN CERTIFICATE-----\r\nMIIElDCCA3ygAwIBAgIQAf2j627KdciIQ4tyS8+8kTANBgkqhkiG9w0BAQsFADBh\r\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\r\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\r\nQTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaME0xCzAJBgNVBAYTAlVT\r\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxJzAlBgNVBAMTHkRpZ2lDZXJ0IFNIQTIg\r\nU2VjdXJlIFNlcnZlciBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\r\nANyuWJBNwcQwFZA1W248ghX1LFy949v/cUP6ZCWA1O4Yok3wZtAKc24RmDYXZK83\r\nnf36QYSvx6+M/hpzTc8zl5CilodTgyu5pnVILR1WN3vaMTIa16yrBvSqXUu3R0bd\r\nKpPDkC55gIDvEwRqFDu1m5K+wgdlTvza/P96rtxcflUxDOg5B6TXvi/TC2rSsd9f\r\n/ld0Uzs1gN2ujkSYs58O09rg1/RrKatEp0tYhG2SS4HD2nOLEpdIkARFdRrdNzGX\r\nkujNVA075ME/OV4uuPNcfhCOhkEAjUVmR7ChZc6gqikJTvOX6+guqw9ypzAO+sf0\r\n/RR3w6RbKFfCs/mC/bdFWJsCAwEAAaOCAVowggFWMBIGA1UdEwEB/wQIMAYBAf8C\r\nAQAwDgYDVR0PAQH/BAQDAgGGMDQGCCsGAQUFBwEBBCgwJjAkBggrBgEFBQcwAYYY\r\naHR0cDovL29jc3AuZGlnaWNlcnQuY29tMHsGA1UdHwR0MHIwN6A1oDOGMWh0dHA6\r\nLy9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEdsb2JhbFJvb3RDQS5jcmwwN6A1\r\noDOGMWh0dHA6Ly9jcmw0LmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEdsb2JhbFJvb3RD\r\nQS5jcmwwPQYDVR0gBDYwNDAyBgRVHSAAMCowKAYIKwYBBQUHAgEWHGh0dHBzOi8v\r\nd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwHQYDVR0OBBYEFA+AYRyCMWHVLyjnjUY4tCzh\r\nxtniMB8GA1UdIwQYMBaAFAPeUDVW0Uy7ZvCj4hsbw5eyPdFVMA0GCSqGSIb3DQEB\r\nCwUAA4IBAQAjPt9L0jFCpbZ+QlwaRMxp0Wi0XUvgBCFsS+JtzLHgl4+mUwnNqipl\r\n5TlPHoOlblyYoiQm5vuh7ZPHLgLGTUq/sELfeNqzqPlt/yGFUzZgTHbO7Djc1lGA\r\n8MXW5dRNJ2Srm8c+cftIl7gzbckTB+6WohsYFfZcTEDts8Ls/3HB40f/1LkAtDdC\r\n2iDJ6m6K7hQGrn2iWZiIqBtvLfTyyRRfJs8sjX7tN8Cp1Tm5gr8ZDOo0rwAhaPit\r\nc+LJMto4JQtV05od8GiG7S5BNO98pVAdvzr508EIDObtHopYJeS4d60tbvVS3bR0\r\nj6tJLp07kzQoH3jOlOrHvdPJbRzeXDLz\r\n-----END CERTIFICATE-----\r\n-----BEGIN CERTIFICATE-----\r\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\r\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\r\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\r\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\r\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\r\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\r\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\r\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\r\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\r\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\r\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\r\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\r\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\r\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\r\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\r\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\r\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\r\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\r\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\r\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\r\n-----END CERTIFICATE-----\r\n",
            "actions": [
              { "label": "Delete Peer", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
              { "label": "Edit Peer", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
            ]
          }
        ],
        "peerUser": [
          {
            "userName": "admin",
            "isFile": true,
            "key": "../keystore",
            "cert": "../signcerts",
            "actions": [
              { "label": "Delete User", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
              { "label": "Edit User", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
            ]
          }
        ]
      }
    };

    this.updateState = this.updateState.bind(this);
    this.updateServices = this.updateServices.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
    this.updateMappedCodes = this.updateMappedCodes.bind(this);
    this.updateAdditionalProps = this.updateAdditionalProps.bind(this);
    this.submit = this.submit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeOrderer = this.onInputChangeOrderer.bind(this);

    this.performAction = this.performAction.bind(this);
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


  addPeer = (e) => {
    let peerName = document.getElementById('peerName') == null ? "" : document.getElementById('peerName').value;
    let ServerName = document.getElementById('ServerName') == null ? "" : document.getElementById('ServerName').value;
    let requestURL = document.getElementById('pageType') == null ? "" : document.getElementById('pageType').value;
    let eventURL = document.getElementById('eventURL') == null ? "" : document.getElementById('eventURL').value;
    let peercertificate = document.getElementById('peercertificate') == null ? "" : document.getElementById('peercertificate').value;
    let netConf = _.cloneDeep(this.state.networkConfig);
    let tupple = {
      "peerName": peerName,
      "requests": requestURL,
      "events": eventURL,
      "server_hostname": ServerName,
      "tls_cacerts": peercertificate,
      "actions": [
        { "label": "Delete Peer", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit Peer", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    netConf.peerList.push(tupple);

    this.setState({
      networkConfig: netConf
    })
  }


  addUser = (e) => {
    let username = document.getElementById('username') == null ? "" : document.getElementById('username').value;
    let usercertificate = document.getElementById('usercertificate') == null ? "" : document.getElementById('usercertificate').value;
    let userkey = document.getElementById('userkey') == null ? "" : document.getElementById('userkey').value;

    let netConf = _.cloneDeep(this.state.networkConfig);

    let tupple = {
      "userName": "admin",
      "key": userkey,
      "cert": usercertificate,
      "actions": [
        { "label": "Delete Peer", "iconName": "fa fa-trash", "actionType": "COMPONENT_FUNCTION" },
        { "label": "Edit Peer", "iconName": "fa fa-edit", "actionType": "COMPONENT_FUNCTION" }
      ]
    }

    netConf.peerUser.push(tupple);

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
    if (this.state.commissionTemplateID !== nextProps.initialValues.commissionTemplate) {
      this.setState({
        //commissionTemplateID: nextProps.initialValues.commissionTemplate,
        services: nextProps.initialValues.services,
        contacts: nextProps.initialValues.contacts,
        documents: nextProps.initialValues.documents,
        readOnly: nextProps.containerState.readOnly
      });
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    let _this = this;
    this.disableFileds();
    document.getElementById('ImgUploadBtn').addEventListener('click', openDialog);
    document.getElementById('ImgUploader').onchange = function (e) {
      let reader = new FileReader();
      let files = e.target.files;

      if (files && files[0]) {
        reader.onload = function (fileReader) {
          $('#EntityLogo').attr('src', fileReader.target.result);

          _this.props.containerProps.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
            byteData: fileReader.target.result,
            context: {
              name: files[0].name,
              size: files[0].size,
              type: files[0].type
            }
          })).then(result => {
            _this.setState({ entityLogo: result.entityLogo })
          });
        };

        reader.readAsDataURL(files[0]);
      }
    };

    function openDialog() {
      document.getElementById('ImgUploader').click();
    }
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

  submit(data) {
    data.services = this.state.services;
    data.contacts = this.state.contacts;
    data.mappedCodes = this.state.mappedCodes;
    data.additionalProps = this.state.additionalProps;
    data.entityLogo = this.state.entityLogo ? this.state.entityLogo : data.entityLogo;
    data.documents = this.state.documents;
    data.taxNO1 = this.state.taxNO1;
    data.taxNO2 = this.state.taxNO2;
    data.address = this.state.address;
    data.publicKey = this.state.publicKey;
    console.log("-------------------------->>>>>>>>>>>>>>>>>>>>", data)
    return this.props.onSubmit(data);
  }

  render() {
    console.log("----------------------", this.state)
    const { error, handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps } = this.props;

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
          <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state}
            containerProps={containerProps} containerState={containerState} onInputChange={this.onInputChange} />
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