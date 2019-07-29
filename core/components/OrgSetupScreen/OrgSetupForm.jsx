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
import * as utils from '../../common/utils.js';
import ActionButton from '../../common/ActionButtonNew.jsx';
import axios from 'axios';
import DateControl from "react-bootstrap-datetimepicker";

import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';

//https://github.com/erikras/redux-form/issues/369
const FormSection1 = ({ error, initialValues, updateState, state, containerProps, containerState, onTimeChange }) => {
  return (
    <div>
      <Portlet title={"Details"}>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <TextInput
              name="entityName"
              label={utils.getLabelByID("entityName")}
              type="text"
              disabled={state.readOnly}
            />
            <TextInput
              name="arabicName"
              label={utils.getLabelByID("arabicName")}
              type="text"
              style={{ textAlign: "right" }}
              disabled={state.readOnly}
            />
            <DropdownInput name="orgType" options={containerState.typeData.ORG_TYPES}
              label={utils.getLabelByID("ESEARCH_orgType")}
              disabled={state.readOnly}
            />
          </div>
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
          <div className="col-md-12 col-sm-12">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <DropdownInput name="parentEntity" options={containerProps.entityNames}
                  label={utils.getLabelByID("parentEntity")}
                  disabled={state.readOnly}
                />
              </div>
              <div className="col-md-4 col-sm-4">
                <TextInput
                  name="spCode"
                  label={utils.getLabelByID("ES_spCode")}
                  type="text"
                  disabled={state.readOnly}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <CheckboxList>
                  <CheckboxInput
                    name="isActive"
                    label={utils.getLabelByID("isActive")}
                    type="checkbox"
                    disabled={state.readOnly}
                  />
                </CheckboxList>
              </div>
              <div className="col-md-2 col-sm-2" style={{ marginTop: '38px' }}>
                <input type="checkbox" className="mt-checkbox mt-checkbox-single mt-checkbox-outline"
                  name="isConsolidate" id="isConsolidate" disabled={state.readOnly} />
                <label htmlFor="isConsolidate">{'Is Consolidate'}</label><br />
              </div>
              <div className="col-md-2 col-sm-2" style={{ marginTop: '38px' }}>
                {/* <DateControl id="fromDate" showToday={true} mode={"time"} defaultText={"12:00 AM"} /> */}
                <DateControl
                  mode="time"
                  id="time"
                  value={state.cutOf}
                  onChange={onTimeChange}
                  showToday={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Portlet>
    </div>


  )
};

const FormSection5 = ({ initialValues, updateState, state }) => {
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
      documents: [],
      cutOf: undefined,
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
    this.submit = this.submit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeOrderer = this.onInputChangeOrderer.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);

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

  async submit(data) {
    data.services = this.state.services;
    data.contacts = this.state.contacts;
    data.entityLogo = this.state.entityLogo ? this.state.entityLogo : data.entityLogo;
    data.documents = this.state.documents;
    let morningTime = new Date().setHours(0, 0, 0);
    data.cutOf = this.state.cutOf - morningTime;
    let isConsolidate = document.getElementById('isConsolidate').checked;
    data.isConsolidate = isConsolidate || false;
    let isOk = false;
    try {
      let response = await axios.post(`${constants.baseUrl}/API/CUSTOMS/consolidationConfig`, {
        headers: {
          token: sessionStorage.token
        },
        body: {
          eComerce: sessionStorage.orgCode,
          isConsolidated: isConsolidate
        }
      });
      if (response && response.data && response.data.errorCode == 200) {
        isOk = true;
        console.log('response', response)
        return this.props.onSubmit(data);
      } else {
        alert(response.data.errorDescription || response.data.message)
      }
    } catch (error) {
      alert('Blockchain Error')
    }
  }
  onTimeChange(date) {
    console.log('time', date)
    this.setState({
      cutOf: 1564394714057
    });
  }
  render() {
    const { error, handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps } = this.props;
    let box = document.getElementById('isConsolidate');
    if (box) {
      if (initialValues && initialValues.isConsolidate) {
        box.checked = true;
      } else {
        box.checked = false;
      }
    }

    return (
      <div>
        <ModalBox isOpen={this.state.contactsModalIsOpen}>
          <EntityContactsForm onSubmit={this.updateContacts} initialValues={this.state}
            index={this.state.index} updateState={this.updateState}
          />
        </ModalBox>
        <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)} ref={this._form = this}>
          <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state}
            containerProps={containerProps} containerState={containerState} onTimeChange={this.onTimeChange} />
          <FormSection5 initialValues={initialValues} updateState={this.updateState} state={this.state} />
          <Portlet title={utils.getLabelByID("Documents")}>
            <FormSection6 initialValues={initialValues} updateState={this.updateState} state={this.state} />
          </Portlet>
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
