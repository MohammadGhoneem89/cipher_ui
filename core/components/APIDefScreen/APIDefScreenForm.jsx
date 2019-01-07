/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import DateControl from '../../common/DateControl.jsx';
import get from 'lodash/get';

const APIDefScreenForm = ({ addParams, onRequestTypeChange, addRowRule, onInputRuleEngine, onSubmit, initialValues = {}, typeData, dropdownItems, onInputChange, addRow, simucases, ActionHandlers, parentState, onInputChangeRequest, onDateChange }) => {

  return (
    <Portlet title={utils.getLabelByID("APIDefinitionScreen_Heading")}>
      <div className="row">
        <div className="portlet-body">
          <div className="form-body" >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("useCase")}</label>
                    <div className="form-group col-md-8">
                      {/* {console.log(initialValues)} */}
                      <select name="useCase" value={initialValues.useCase} disabled={parentState.isEdit} onChange={onInputChange} className="form-control">
                        {
                          typeData.ORG_TYPES.map((option, index) => {
                            return (
                              <option key={index} value={option.value}>{option.label}</option>
                            );
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("APIDefScreen_route")}</label>
                    <div className="form-group col-md-8">
                      {/* {console.log(initialValues)} */}
                      <input type="text" className="form-control" name="route" onChange={onInputChange} disabled={parentState.isEdit} value={initialValues.route} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: ""
                    }}>{utils.getLabelByID("APIDefScreen_Label4")}</label>
                    <div className="col-md-8">
                      <div className="form-group">
                        <textarea onChange={onInputChange} name="description" value={initialValues.description} className="form-control" rows="4" style={{ resize: "none", width: "100%" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_Authorization")}</label>
                    <div className="form-group col-md-8">
                      <select name="authorization" value={initialValues.authorization} onChange={onInputChange} className="form-control">
                        {
                          typeData.API_Authtypes.map((option, index) => {
                            return (
                              <option key={index} value={option.value}>{option.label}</option>
                            );
                          })
                        }
                      </select>
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
                    }}>{utils.getLabelByID("APIDefScreen_isActive")}</label>
                    <div className="form-group col-md-8">
                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                          <input type="checkbox" className="form-control" onChange={onInputChange} checked={initialValues.isActive} name="isActive" id="isActive" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" >
            <div className="col-md-12">
              <label className="form-group control-label col-md-7 uppercase" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("APIMetering")}</label>
              <div className="col-md-6">
                <div className="form-group col-md-4">
                  <label className="control-label">{utils.getLabelByID("EnableBilling")}</label>
                </div>
                <div className="form-group col-md-8">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                      <input type="checkbox" className="form-control" onChange={onInputChange} name="isBilled" checked={initialValues.isBilled} id="isBilled" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group col-md-4">
                  <label className="control-label">{utils.getLabelByID("BillingDate")}</label>
                </div>
                <div className="form-group col-md-8">
                  <DateControl id="billingDate" dateChange={onDateChange} defaultValue={initialValues.billingDate} />
                </div>
              </div>
            </div>
          </div>
          <div className="row" >
            <div className="col-md-12">
              <label className="form-group control-label col-md-12 uppercase" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("Request Type")}</label>
              <div className="col-md-3">
                <div className="form-group col-md-3">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                      <label/>
                      <input type="checkbox" className="form-control" onChange={onRequestTypeChange} checked={parentState.isBlockchainProcess} name="isBlockchainProcess" />
                      <span/>
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-9">
                  <label className="control-label">{utils.getLabelByID("Blockchain - Process")}</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group col-md-3">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                      <label/>
                      <input type="checkbox" className="form-control" onChange={onRequestTypeChange} checked={parentState.isBlockchainGet} name="isBlockchainGet" />
                      <span/>
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-9">
                  <label className="control-label">{utils.getLabelByID("Blockchain - Get")}</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group col-md-3">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                      <label/>
                      <input type="checkbox" className="form-control" onChange={onRequestTypeChange} checked={parentState.isOffchainGet} name="isOffchainGet" />
                      <span/>
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-9">
                  <label className="control-label">{utils.getLabelByID("Offchain - Get")}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col-md-12">
              <span style={{ display: parentState.isOffchainGet ? 'none' : 'block'}}>
              <label className="form-group control-label col-md-7 uppercase" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("APIDefScreen_Label1")}</label>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("APIDefScreen_RouteOveride")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <div className="icheck-list">
                        <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                          <label/>
                          <input type="checkbox" className="form-control" onChange={onInputChange} name="isRouteOveride" id="isRouteOveride" checked={initialValues.isRouteOveride} />
                          <span/>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_fieldName")}</label>
                      <div className="form-group col-md-8">
                        <input type="text" className="form-control" onChange={onInputChange} disabled={!initialValues.isRouteOveride} name="fieldName" value={initialValues.fieldName} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </span>
              <div className="row" style={{ display: parentState.isOffchainGet ? 'none' : 'block'}}>
                <div className="col-md-12">
                  <label className="form-group control-label col-md-7 uppercase" style={{
                    textAlign: "left",
                    fontWeight: "bold"
                  }}>{utils.getLabelByID("APIDefScreen_Label2")}</label>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <label className="form-group control-label col-md-4">
                          {utils.getLabelByID("APIDefScreen_CustomMapping")}
                          </label>
                        <div className="form-group col-md-8">
                          <div className="icheck-list">
                            <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                              <label/>
                              <input type="checkbox" className="form-control" onChange={onInputChange} disabled={initialValues.isRouteOveride} name="isCustomMapping" id="isCustomMapping" checked={initialValues.isCustomMapping} />
                              <span/>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4">
                            {utils.getLabelByID("APIDefScreen_MFunctionName")}
                            </label>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" onChange={onInputChange} disabled={!initialValues.isCustomMapping || initialValues.isRouteOveride} name="MappingfunctionName" value={initialValues.MappingfunctionName} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4">
                            {utils.getLabelByID("APIDefScreen_CFileName")}
                            </label>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" onChange={onInputChange} disabled={!initialValues.isCustomMapping || initialValues.isRouteOveride} name="CustomMappingFile" value={initialValues.CustomMappingFile} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <label className="form-group control-label col-md-7 uppercase" style={{
                textAlign: "left",
                fontWeight: "bold",
                display: parentState.isOffchainGet ? 'none' : 'block'
              }}>{utils.getLabelByID("APIDefScreen_Label3")}</label>
              <div className="row">
                <div className="col-md-12">
                  <span style={{ display: parentState.isOffchainGet ? 'none' : 'block'}}>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("Communication Mode")}</label>
                      <div className="form-group col-md-8">
                        <select name="communicationMode" value={initialValues.communicationMode} onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping} className="form-control">
                          {
                            typeData.API_ComMode.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })
                          }
                        </select>
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
                          }}>{utils.getLabelByID("APIDefScreen_RSQueue")}</label>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping || initialValues.communicationMode == "REST"} name="requestServiceQueue" value={initialValues.requestServiceQueue} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4" style={{
                            textAlign: "left",
                            fontWeight: "normal"
                          }}>{utils.getLabelByID("APIDefScreen_ServiceURL")}</label>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="ServiceURL" onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping || initialValues.communicationMode == "QUEUE"} value={initialValues.ServiceURL} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4" style={{
                            textAlign: "left",
                            fontWeight: "normal"
                          }}>{utils.getLabelByID("APIDefScreen_ResponseQueue")}</label>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="responseQueue" onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping || initialValues.communicationMode == "REST"} value={initialValues.responseQueue} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4" style={{
                            textAlign: "left",
                            fontWeight: "normal"
                          }}>{utils.getLabelByID("APIDefScreen_ServiceHeader")}</label>
                          <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="ServiceHeader" onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping || initialValues.communicationMode == "QUEUE"} value={initialValues.ServiceHeader} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </span>
                  <div className="col-md-12 offchain-get" style={{ display: parentState.isOffchainGet ? "block" : "none", marginBottom: "20px" }}>
                    <div className="col-md-12">
                      <div className="col-md-12" style={{ border: "1px solid rgba(128, 128, 128, 0.15)", padding: "5px" }}>
                        <label className="form-group control-label col-md-7 uppercase" style={{
                          textAlign: "left",
                          fontWeight: "bold"
                        }}>{utils.getLabelByID("Database Mapping")}</label>
                        <div className="col-md-12" id="offchainDefination">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Database Type")}</label>
                                <div className="form-group col-md-8">
                                  <select id="databaseType" name="databaseType" className="form-control" value={initialValues.databaseType} onChange={onInputChange}>
                                    {
                                      typeData.database_types.map((option, index) => {
                                        return (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Adaptors")}</label>
                                <div className="form-group col-md-8">
                                  <select id="adaptor" name="adaptor" className="form-control" value={initialValues.adaptor} onChange={onInputChange}>
                                    {
                                      get(parentState, `getAdaptorsList[${initialValues.databaseType || 'mongo'}]`, []).map((option, index) => {
                                        return (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Object Type")}</label>
                                <div className="form-group col-md-8">
                                  <select id="objectType" name="objectType" className="form-control" value={initialValues.objectType} onChange={onInputChange}>
                                    {
                                      typeData.database_object_types.map((option, index) => {
                                        return (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Available Objects")}</label>
                                <div className="form-group col-md-8">
                                  <select id="availableObjects" name="availableObjects" className="form-control" value={initialValues.availableObjects} onChange={onInputChange}>
                                    {
                                      get(parentState, `getAvailableObjectsList`, []).map((option, index) => {
                                        return (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-group control-label col-md-4">
                                {utils.getLabelByID("Enable Paging")}
                              </label>
                              <div className="form-group col-md-8">
                                <div className="icheck-list">
                                  <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                    <label/>
                                    <input type="checkbox" className="form-control" onChange={onInputChange} name="isEnablePagination" id="isEnablePagination" checked={initialValues.isEnablePagination} />
                                    <span/>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-group control-label col-md-4">
                                {utils.getLabelByID("Enable Component Action")}
                              </label>
                              <div className="form-group col-md-8">
                                <div className="icheck-list">
                                  <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                    <label/>
                                    <input type="checkbox" className="form-control" onChange={onInputChange} name="isEnablComponentAction" id="isEnablComponentAction" checked={initialValues.isEnablComponentAction} />
                                    <span/>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 request-parameters" style={{ marginBottom: "20px" }}>
                              <div className="col-md-12">
                                <div className="col-md-12" style={{ border: "1px solid rgba(128, 128, 128, 0.15)", padding: "5px" }}>
                                  <label className="form-group control-label col-md-7 uppercase" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                  }}>{utils.getLabelByID("Request Parameters")}</label>
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="form-group control-label col-md-4" style={{
                                            textAlign: "left",
                                            fontWeight: "normal"
                                          }}>{utils.getLabelByID("DB Field")}</label>
                                          <div className="form-group col-md-8">
                                            <select id="requestDBField" name="requestDBField" className="form-control" value={initialValues.requestDBField} onChange={onInputChange}>
                                              {
                                                get(parentState, 'getDBFields', []).map((option, index) => {
                                                  return (
                                                    <option key={index} value={option.value}>{option.label}</option>
                                                  );
                                                })
                                              }
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="form-group control-label col-md-4" style={{
                                            textAlign: "left",
                                            fontWeight: "normal"
                                          }}>{utils.getLabelByID("Request Mapping Field")}</label>
                                          <div className="form-group col-md-8">
                                            <select id="requestMappingField" name="requestMappingField" className="form-control" value={initialValues.requestMappingField} onChange={onInputChange}>
                                              {
                                                get(dropdownItems, 'REQUEST', []).map((option, index) => {
                                                  return (
                                                    <option key={index} value={option.label}>{option.label}</option>
                                                  );
                                                })
                                              }
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="form-actions right">
                                          <div className="form-group col-md-12">
                                            <div className="btn-toolbar pull-right">
                                              <button type="submit" className="btn btn-default" onClick={()=> addParams('request')}> <i className="fa fa-plus"/> {"  "}{utils.getLabelByID("Add Param")} </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="col-md-12">
                                              <Table
                                                gridColumns={utils.getGridColumnByName("requestParametersGrid")}
                                                gridData={parentState.requestParams}
                                                export={false}
                                                componentFunction={ActionHandlers}
                                                pagination={false} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 response-parameters" style={{ marginBottom: "20px" }}>
                              <div className="col-md-12">
                                <div className="col-md-12" style={{ border: "1px solid rgba(128, 128, 128, 0.15)", padding: "5px" }}>
                                  <label className="form-group control-label col-md-7 uppercase" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                  }}>{utils.getLabelByID("Response Parameters")}</label>
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="form-group control-label col-md-4" style={{
                                            textAlign: "left",
                                            fontWeight: "normal"
                                          }}>{utils.getLabelByID("DB Field")}</label>
                                          <div className="form-group col-md-8">
                                            <select id="responseBDField" name="responseBDField" className="form-control" value={initialValues.responseBDField} onChange={onInputChange}>
                                              {
                                                get(parentState, 'getDBFields', []).map((option, index) => {
                                                  return (
                                                    <option key={index} value={option.value}>{option.label}</option>
                                                  );
                                                })
                                              }
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="form-group control-label col-md-4" style={{
                                            textAlign: "left",
                                            fontWeight: "normal"
                                          }}>{utils.getLabelByID("Response Mapping Field")}</label>
                                          <div className="form-group col-md-8">
                                            <select id="responseMappingField" name="responseMappingField" className="form-control" value={initialValues.responseMappingField} onChange={onInputChange}>
                                              {
                                                get(dropdownItems, 'RESPONSE', []).map((option, index) => {
                                                  return (
                                                    <option key={index} value={option.label}>{option.label}</option>
                                                  );
                                                })
                                              }
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="form-actions right">
                                          <div className="form-group col-md-12">
                                            <div className="btn-toolbar pull-right">
                                              <button type="submit" className="btn btn-default" onClick={()=> addParams('response')}> <i className="fa fa-plus"/> {"  "}{utils.getLabelByID("Add Param")} </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="col-md-12">
                                              <Table
                                                gridColumns={utils.getGridColumnByName("responseParametersGrid")}
                                                gridData={parentState.responseParams}
                                                export={false}
                                                componentFunction={ActionHandlers}
                                                pagination={false} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12" style={{ display: parentState.isBlockchainGet ? "block" : "none", marginBottom: "20px" }}>
                    <div className="col-md-12">
                      <div className="col-md-12" style={{ border: "1px solid rgba(128, 128, 128, 0.15)", padding: "5px" }}>
                        <label className="form-group control-label col-md-7 uppercase" style={{
                          textAlign: "left",
                          fontWeight: "bold"
                        }}>{utils.getLabelByID("blockchainRouting")}</label>
                        <div className="col-md-12" id="blockchainRoutingDefination">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-group control-label col-md-4" style={{
                                    textAlign: "left",
                                    fontWeight: "normal"
                                  }}>{utils.getLabelByID("APIDefScreen_RuleName")}</label>
                                  <div className="form-group col-md-8">
                                    <input type="text" className="form-control" name="BlockRuleName" id="BlockRuleName" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-group control-label col-md-4" style={{
                                    textAlign: "left",
                                    fontWeight: "normal"
                                  }}>{utils.getLabelByID("type")}</label>
                                  <div className="form-group col-md-8">
                                    <select id="type" name="type" className="form-control">
                                      {
                                        typeData.bchain_rule_Type.map((option, index) => {
                                          return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                          );
                                        })
                                      }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {parentState.MappingOrgFieldData.map((elem, index) => {
                            return (
                              <div key={index}>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-group control-label col-md-4" style={{
                                      textAlign: "left",
                                      fontWeight: "normal"
                                    }}>{utils.getLabelByID("APIDefScreen_OrgField") + index}</label>
                                    <div className="form-group col-md-8">
                                      <input type="text" className="form-control" disabled id={`fieldName-${index}`} value={elem.IN_FIELD} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label className="form-group control-label col-md-4" style={{
                                      textAlign: "left",
                                      fontWeight: "normal"
                                    }}>{utils.getLabelByID("APIDefScreen_FieldValue") + index}</label>
                                    <div className="form-group col-md-8">
                                      <input type="text" className="form-control" id={`fieldValue-${index}`} onChange={onInputRuleEngine} value={elem.value} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                          }
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Consortium Name")}</label>
                              <div className="form-group col-md-8">
                                <select id="consortium" name="consortium" onChange={onInputRuleEngine} value={parentState.selectedConsortium} className="form-control">
                                  {
                                    parentState.consortium.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Channel Name")}</label>
                              <div className="form-group col-md-8">
                                <select name="channel" id="channel" onChange={onInputRuleEngine} value={parentState.selectedChannel} className="form-control">
                                  {
                                    parentState.channel.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Smartcontract Name")}</label>
                              <div className="form-group col-md-8">
                                <select name="smartcontract" id="smartcontract" onChange={onInputRuleEngine} value={parentState.selectedSmartcontract} className="form-control">
                                  {
                                    parentState.smartcontract.map((option, index) => {
                                      return (
                                        <option key={index} value={option.value}>{option.label}</option>
                                      );
                                    })
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group control-label col-md-4" style={{
                                textAlign: "left",
                                fontWeight: "normal"
                              }}>{utils.getLabelByID("Smartcontract Function")}</label>
                              <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="smartcontractFunc" id="smartcontractFunc" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-actions right">
                              <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                  <button type="submit" className="btn btn-default" onClick={addRowRule.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Rule")} </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="col-md-12">
                                  <Table
                                    gridColumns={utils.getGridColumnByName("RoutingRulesSetting")}
                                    gridData={parentState.rules}
                                    export={false}
                                    componentFunction={ActionHandlers}
                                    pagination={false} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="col-md-12" style={{ marginBottom: "10px" }}>
                      <div className="col-md-12" style={{ border: "1px solid rgba(128, 128, 128, 0.15)", padding: "5px" }}>
                        <div>
                          <label className="form-group control-label col-md-7 uppercase" style={{
                            textAlign: "left",
                            fontWeight: "bold"
                          }}>{utils.getLabelByID("APIDefScreen_Label6")}</label>
                          <div className="col-md-12" id="simuDefination">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("APIDefScreen_RuleName")}</label>
                                <div className="form-group col-md-8">
                                  <input type="text" className="form-control" name="RuleName" id="RuleName" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("APIDefScreen_SimuField")}</label>
                                <div className="form-group col-md-8">
                                  <input type="text" className="form-control" id="SimuField" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("APIDefScreen_SimuValue")}</label>
                                <div className="form-group col-md-8">
                                  <input type="text" className="form-control" id="SimuValue" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <label className="form-group control-label col-md-7" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                              }}>{utils.getLabelByID("APIDefScreen_Label5")}</label>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <textarea className="form-control" id="SimulatorResponse" rows="4" style={{ resize: "none", width: "100%" }} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-actions right">
                                <div className="form-group col-md-12">
                                  <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn btn-default" onClick={addRow.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Setting")} </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="col-md-12">
                                    <Table
                                      gridColumns={utils.getGridColumnByName("SimuSetting")}
                                      gridData={simucases}
                                      export={false}
                                      componentFunction={ActionHandlers}
                                      pagination={false} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_RequestMapping")}</label>
                      <div className="form-group col-md-8">
                        <select name="RequestMapping" value={initialValues.RequestMapping} disabled={initialValues.isValBypass} onChange={onInputChangeRequest} className="form-control">
                          {dropdownItems.REQUEST &&
                            dropdownItems.REQUEST.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_ResponseMapping")}</label>
                      <div className="form-group col-md-8">
                        <select name="ResponseMapping" value={initialValues.ResponseMapping} disabled={initialValues.isResValBypass || initialValues.isSimulated} onChange={onInputChange} className="form-control">
                          {dropdownItems.RESPONSE &&
                            dropdownItems.RESPONSE.map((option, index) => {
                              return (
                                <option key={index} value={option.value}>{option.label}</option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("Ignore Request Validation")}</label>
                      <div className="form-group col-md-8">
                        <div className="icheck-list">
                          <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                            <input type="checkbox" className="form-control" onChange={onInputChange} name="isValBypass" id="isValBypass" checked={initialValues.isValBypass} />
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
                      }}>{utils.getLabelByID("Ignore Response validation")}</label>
                      <div className="form-group col-md-8">
                        <div className="icheck-list">
                          <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                            <label/>
                            <input type="checkbox" className="form-control" onChange={onInputChange} name="isResValBypass" id="isResValBypass" checked={initialValues.isResValBypass} />
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
                      }}>{utils.getLabelByID("APIDefScreen_isSimulated")}</label>
                      <div className="form-group col-md-8">
                        <div className="icheck-list">
                          <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                            <label/>
                            <input type="checkbox" className="form-control" onChange={onInputChange} name="isSimulated" checked={initialValues.isSimulated} id="isSimulated" />
                            <span/>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="btn-toolbar pull-right">
                        <button type="submit" onClick={onSubmit} className="btn green"><i
                          className="fa fa-paper-plane" />{' '}{utils.getLabelByID("Save / Update")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portlet >
  );
};

export default APIDefScreenForm;


// "APIDef_RequestMapping" : [
  //             {
  //                 "label" : "mappingName",
  //                 "value" : "WASL Request"
  //             }
  //         ],
  //         "APIDef_ResponseMapping" : [ 
  //             {
  //                 "label" : "mappingName",
  //                 "value" : "WASL Response"
  //             }
  //         ],
  //         "APIDef_simulatorResponse" : [ 
  //             {
  //                 "label" : "any",
  //                 "value" : "object"
  //             }
  //         ]