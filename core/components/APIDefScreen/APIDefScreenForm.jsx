/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
const APIDefScreenForm = ({ onSubmit, initialValues, typeData, dropdownItems, onInputChange, addRow, simucases,ActionHandlers }) => {

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
                      <input type="text" className="form-control" name="useCase" onChange={onInputChange} value={initialValues.useCase} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("APIDefScreen_route")}</label>
                    <div className="form-group col-md-8">
                      {/* {console.log(initialValues)} */}
                      <input type="text" className="form-control" name="route" onChange={onInputChange} value={initialValues.route} />
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
                          <label></label>
                          <input type="checkbox" className="form-control" onChange={onInputChange} checked={initialValues.isActive} name="isActive" id="isActive" />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

              <label className="form-group control-label col-md-7" style={{
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
                          <label></label>
                          <input type="checkbox" className="form-control" onChange={onInputChange} name="isRouteOveride" id="isRouteOveride" checked={initialValues.isRouteOveride} />
                          <span></span>
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

              <div className="row">
                <div className="col-md-12">
                  <label className="form-group control-label col-md-7" style={{
                    textAlign: "left",
                    fontWeight: "bold"
                  }}>{utils.getLabelByID("APIDefScreen_Label2")}</label>


                  <div className="row">

                    <div className="col-md-12">

                      <div className="col-md-6">


                        <label className="form-group control-label col-md-4" style={{

                        }}>{utils.getLabelByID("APIDefScreen_CustomMapping")}</label>

                        <div className="form-group col-md-8">
                          <div className="icheck-list">
                            <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                              <label></label>
                              <input type="checkbox" className="form-control" onChange={onInputChange} disabled={initialValues.isRouteOveride} name="isCustomMapping" id="isCustomMapping" checked={initialValues.isCustomMapping} />
                              <span></span>
                            </label>
                          </div>
                        </div>


                      </div>
                    </div>


                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4" style={{

                          }}>{utils.getLabelByID("APIDefScreen_MFunctionName")}</label>
                          <div className="form-group col-md-8">

                            <input type="text" className="form-control" onChange={onInputChange} disabled={!initialValues.isCustomMapping || initialValues.isRouteOveride} name="MappingfunctionName" value={initialValues.MappingfunctionName} />

                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-group control-label col-md-4" style={{

                          }}>{utils.getLabelByID("APIDefScreen_CFileName")}</label>
                          <div className="form-group col-md-8">

                            <input type="text" className="form-control" onChange={onInputChange} disabled={!initialValues.isCustomMapping || initialValues.isRouteOveride} name="CustomMappingFile" value={initialValues.CustomMappingFile} />

                          </div>
                        </div>
                      </div>
                    </div>



                  </div>
                </div>

              </div>




              <label className="form-group control-label col-md-7" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("APIDefScreen_Label3")}</label>



              <div className="row">
                <div className="col-md-12">
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
                          }}>{utils.getLabelByID("APIDefScreen_ServiceIP")}</label>
                          <div className="form-group col-md-8">

                            <input type="text" className="form-control" name="ServiceIP" onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping || initialValues.communicationMode == "QUEUE"} value={initialValues.ServiceIP} />

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
                          }}>{utils.getLabelByID("APIDefScreen_ServicePort")}</label>
                          <div className="form-group col-md-8">

                            <input type="text" className="form-control" name="ServicePort" onChange={onInputChange} disabled={initialValues.isRouteOveride || initialValues.isCustomMapping || initialValues.communicationMode == "QUEUE"} value={initialValues.ServicePort} />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-group control-label col-md-7" style={{
                      textAlign: "left",
                      fontWeight: "bold"
                    }}>{utils.getLabelByID("APIDefScreen_Label4")}</label>

                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea onChange={onInputChange} name="description" value={initialValues.description} className="form-control" rows="4" style={{ resize: "none", width: "100%" }} />
                      </div>
                    </div>

                    <label className="form-group control-label col-md-7" style={{
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
                          fontWeight: "normal"
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



                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_RequestMapping")}</label>
                      <div className="form-group col-md-8">
                        <select name="RequestMapping" value={initialValues.RequestMapping} disabled={initialValues.isValBypass} onChange={onInputChange} className="form-control">
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

                        <select name="ResponseMapping" value={initialValues.ResponseMapping} disabled={initialValues.isValBypass || initialValues.isSimulated} onChange={onInputChange} className="form-control">
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
                      }}>{utils.getLabelByID("Bypass Mapping")}</label>
                      <div className="form-group col-md-8">
                        <div className="icheck-list">
                          <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                            <label></label>
                            <input type="checkbox" className="form-control" onChange={onInputChange} name="isValBypass" id="isValBypass" checked={initialValues.isValBypass} />
                            <span></span>
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
                            <label></label>
                            <input type="checkbox" className="form-control" onChange={onInputChange} name="isSimulated" checked={initialValues.isSimulated} id="isSimulated" />
                            <span></span>
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
}
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