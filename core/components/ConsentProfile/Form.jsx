/*standard imports*/
import React, {PropTypes} from 'react';
import Portlet from '../../common/Portlet.jsx';

import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const ReportForm = ({onInputChange, addPeer, state, ActionHandlers, flag, isOwner, onSubmit, testQuery}) => {
  let options = {
    lineNumbers: true
  };
  return (
    <div>
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
                  <div className="form-group col-md-8">
                    <input type="text" disabled={!isOwner} className="form-control" id="consentProfileId"
                           onChange={onInputChange}
                           value={state.Container.name}/>
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
                    <textarea type="text" disabled={!isOwner} className="form-control" id="description"
                              onChange={onInputChange} value={state.Container.description} rows="4"
                              style={{resize: "none", width: "100%"}}/>
                  </div>
                </div>
              </div>


            </div>


            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Document Type")}</label>
                <div className="form-group col-md-8">
                  <input type="text" disabled={!isOwner} className="form-control" id="documentType"
                         onChange={onInputChange}
                         value={state.Container.documentType}/>
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
                               style={{marginBottom: "0px", marginTop: "10px"}}>Global
                          <label/>
                          <input type="radio" className="form-control" onChange={onInputChange}
                                 value={'global'} name="consentMode"
                                 checked={state.Container.consentMode == 'global' ? true : false}
                                 id="consentMode"/>
                          <span/>
                        </label>
                      </div>


                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                               style={{marginBottom: "0px", marginTop: "10px"}}>Transactional
                          <label/>
                          <input type="radio" className="form-control" onChange={onInputChange}
                                 value={'transactional'} name="consentMode"
                                 checked={state.Container.consentMode == 'transactional' ? true : false}
                                 id="consentMode"/>
                          <span/>
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
                               style={{marginBottom: "0px", marginTop: "10px"}}>
                          <label/>
                          <input type="checkbox" className="form-control" onChange={onInputChange}
                                 checked={state.Container.isSupportExpiry} name="isSupportExpiry" id="isSupportExpiry"/>
                          <span/>
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
                    }}>{utils.getLabelByID("Expiry Duration")}</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" onChange={onInputChange} placeholder={'5 Days.'}
                             checked={state.Container.expiryDuration} name="expiryDuration" id="expiryDuration"/>


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
                               style={{marginBottom: "0px", marginTop: "10px"}}>Document
                          <label/>
                          <input type="radio" className="form-control" onChange={onInputChange}
                                 value={'Document'} name="proofRequirement"
                                 checked={state.Container.proofRequirement == 'Document' ? true : false}
                                 id="proofRequirement"/>
                          <span/>
                        </label>
                      </div>

                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline"
                               style={{marginBottom: "0px", marginTop: "10px"}}>Data
                          <label/>
                          <input type="radio" className="form-control" onChange={onInputChange}
                                 value={'Data'} name="proofRequirement"
                                 checked={state.Container.proofRequirement == 'Data' ? true : false}
                                 id="proofRequirement"/>
                          <span/>
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
                               style={{marginBottom: "0px", marginTop: "10px"}}>
                          <label/>
                          <input type="checkbox" className="form-control" onChange={onInputChange}
                                 checked={state.Container.isOriginalRequired} name="isOriginalRequired"
                                 id="isOriginalRequired"/>
                          <span/>
                        </label>

                      </div>
                    </div>

                  </div>
                </div>


              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-12">
                <b style={{color: 'grey', fontSize: '10px'}}><i>Note: if checked then document upload of original
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
                  <select id="orgCode" name="orgCode"
                          className="form-control">
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
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Can Revoke")}</label>
                <div className="form-group col-md-8">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline"
                           style={{marginBottom: "0px", marginTop: "10px"}}>
                      <label/>
                      <input type="checkbox" className="form-control"
                             name="isRevokable"
                             id="isRevokable"/>
                      <span/>
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
              <div className="col-md-12">
                <Table fontclass=""
                       gridColumns={utils.getGridColumnByName("consentListPolicy")}
                       gridData={state.List}
                       pagination={false}
                       componentFunction={ActionHandlers}
                       export={false}
                       search={true}/>
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
