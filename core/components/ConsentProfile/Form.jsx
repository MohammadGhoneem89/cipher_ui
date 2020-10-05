/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';

import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import SelectChain from '../../common/SelectChain.jsx';
import Combobox from '../../common/Select.jsx';
import Textarea from '../../common/Textarea.jsx';

import Input from '../../common/Input.jsx';

const ReportForm = ({ onInputChange, onConsentModeChange, onProofRequirementChange, addPeer, state, ActionHandlers, flag, isOwner, onSubmit, generalHandler, testQuery }) => {
  let options = {
    lineNumbers: true
  };
  return (
    <div>
          {console.log("form = ",state)}
      <Portlet title={utils.getLabelByID("Consent Profile Add/Update")}>
        <div className="row">
          <div className=" col-md-12">
            <div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("Consent Profile Id")}</label>
                  <div className="col-md-8">
                    <Input
                        divStyle={{ padding: '0px', top: '10px',
                        position: 'absolute' }}
                        errorIconStyle={{
                          display:'none'
                        }}
                        status={(state.errors && state.errors.consentProfileId) ? "ERROR" : undefined}
                        fieldname='consentProfileId'
                        formname='Container'
                        disabled={state.profileIdEditable}
                        placeholder={utils.getLabelByID('')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("Description")}</label>
                  <div className="form-group col-md-8">
                    <Textarea
                        divStyle={{ padding: '0px' }}
                        disabled={false}
                        status={(state.errors && state.errors.description) ? "ERROR" : undefined}
                        fieldname='description'
                        formname='Container'
                        columns='12'
                        placeholder={utils.getLabelByID('')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("Document")}</label>
                  <div className="col-md-8">
                    <Combobox
                        status={(state.errors && state.errors.documentType) ? "ERROR" : undefined}
                        errorIconStyle={{
                          display:'none'
                        }}
                        fieldname='documentType'
                        formname='Container'
                        allowValue={false}
                        isDDL={true}
                        selected={_.get(_.get(state, 'documentList', []).filter(item =>
                            item.key == _.get(state.Container, 'documentType', '')
                        ), `[${0}].value`, undefined)}
                        placeholder={utils.getLabelByID('Document Type')}
                        state={state}
                        typeName="documentList"
                        dataSource={state}
                        actionHandler={generalHandler}
                        className="form-control"
                      />
                  </div> 
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Consent Mode")}</label>
                    <div className="form-group col-md-8">

                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>Global
                          <label />
                          <input type="checkbox" className="form-control" onChange={onConsentModeChange}
                            value={'GLOBAL'} name="consentMode_global" id="consentMode"
                            checked={state.Container.consentMode == 'GLOBAL' || state.Container.consentMode == 'BOTH' ? true : false}
                            id="consentMode" />
                          <span />
                        </label>
                      </div>


                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>Transactional
                          <label />
                          <input type="checkbox" className="form-control" onChange={onConsentModeChange}
                            value={'TRANSACTIONAL'} name="consentMode_tansactional" id="consentMode"
                            checked={state.Container.consentMode == 'TRANSACTIONAL' || state.Container.consentMode == 'BOTH'? true : false}
                            id="consentMode" />
                          <span />
                        </label>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Support Expiry")}</label>
                    <div className="form-group col-md-8">
                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>
                          <label />
                          <input type="checkbox" className="form-control" onChange={onInputChange}
                            checked={state.Container.isSupportExpiry} name="isSupportExpiry" id="isSupportExpiry" />
                          <span />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Expiry Duration Days")}</label>
                    <div className="col-md-8">
                    <Input
                        type="number"
                        divStyle={{ padding: '0px' }}
                        errorIconStyle={{
                          display:'none'
                        }}
                        status={(state.errors && state.errors.expiryDuration) ? "ERROR" : undefined}
                        fieldname='expiryDuration'
                        formname='Container'
                        disabled={false}
                        placeholder={utils.getLabelByID('')}
                        state={state}
                        actionHandler={generalHandler}
                        className="form-control"
                    />
                      {/* <input type="number" className="form-control" min="1" max="5" onChange={onInputChange} placeholder={'5 Days.'}
                        value={state.Container.expiryDuration} name="expiryDuration" id="expiryDuration" /> */}


                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Proof Requirement")}</label>
                    <div className="form-group col-md-8">


                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>Document
                          <label />
                          <input type="checkbox" className="form-control" onChange={onProofRequirementChange}
                            value={'DOCUMENT'} name="proofRequirement_doc"
                            checked={state.Container.proofRequirement == 'DOCUMENT' || state.Container.proofRequirement == 'BOTH' ? true : false}
                            id="proofRequirement" />
                          <span />
                        </label>
                      </div>

                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>Data
                          <label />
                          <input type="checkbox" className="form-control" onChange={onProofRequirementChange}
                            value={'DATA'} name="proofRequirement_data"
                            checked={state.Container.proofRequirement == 'DATA' || state.Container.proofRequirement == 'BOTH'  ? true : false}
                            id="proofRequirement" />
                          <span />
                        </label>
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Dynamic Expiry")}</label>
                    <div className="form-group col-md-8">
                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>
                          <label />
                          <input type="checkbox" className="form-control" onChange={onInputChange}
                            checked={state.Container.isDynamicExpiry} name="isDynamicExpiry" id="isDynamicExpiry" />
                          <span />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Original Required")}</label>
                    <div className="form-group col-md-8">

                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>
                          <label />
                          <input type="checkbox" className="form-control" onChange={onInputChange}
                            checked={state.Container.isOriginalRequired} name="isOriginalRequired"
                            id="isOriginalRequired" />
                          <span />
                        </label>

                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("Is Active")}</label>
                    <div className="form-group col-md-8">

                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                          style={{ marginBottom: "0px", marginTop: "10px" }}>
                          <label />
                          <input type="checkbox" className="form-control" onChange={onInputChange}
                            checked={state.Container.isActive} name="isActive" id="isActive" />
                          <span />
                        </label>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-12">
                <b style={{ color: 'grey', fontSize: '10px' }}><i>Note: if checked then document upload of original
                document is required or original data is
                  required with hash</i></b>
              </div>
            </div>

          </div>

        </div>
      </Portlet>
      <Portlet title={utils.getLabelByID("Consent Setting")}>
        <div className={'row'} id={'form'}>
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Org Types")}</label>
                <div className="form-group col-md-8">
                {console.log("orgCode = ",state.Container)}
                  <select id="orgType" name="orgType" value={state.Container.orgType}
                    onChange={onInputChange} className="form-control">
                    <option value="">--select--</option>
                    {state.orgTypes.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>{option.label}</option>
                      );
                    })}
                  </select>

                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Org Code")}</label>
                <div className="form-group col-md-8">
                {console.log("orgtype = ",state.Container)}
                {console.log("orgtype entityMap= ",state.entityMap)}

                  <select id="orgCode" name="orgCode" value={state.Container.orgCode}
                    onChange={onInputChange} className="form-control">
                    <option value="">--select--</option>
                    {
                      _.get(state.entityMap, state.Container.orgType, []).map((option, index) => {
                        console.log(state.entityMap)
                        return (
                          <option key={index} value={option.value}>{option.label}</option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <SelectChain
                columns={3}
                fieldname={"test"}
                formname={"testform"}
                typeName={"td_master"}

              />
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Can Revoke")}</label>
                <div className="form-group col-md-8">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline"
                      style={{ marginBottom: "0px", marginTop: "10px" }}>
                      <label />
                      <input type="checkbox" className="form-control"
                        name="isRevokable"
                        id="isRevokable" />
                      <span />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" onClick={addPeer}
                  className="btn btn-default"><i className="fa fa-plus-circle"
                    aria-hidden="true"></i>{' '}{utils.getLabelByID("Grant")}
                </button>
              </div>
            </div>
            <div className="col-md-12">
              {console.log('state----: ',state.List)}
              <div className="col-md-12">
                <Table fontclass=""
                  gridColumns={utils.getGridColumnByName("consentListPolicy")}
                  gridData={state.List}
                  pagination={false}
                  componentFunction={ActionHandlers}
                  export={false}
                  search={true} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" onClick={onSubmit}
                  className="btn green">{' '}{utils.getLabelByID("Add / Update Consent Profile")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Portlet>
    </div>
  );
}
export default ReportForm;
