/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from '../../../../core/common/utils.js';
const APIDefScreenForm = ({ onSubmit, initialValues, typeData, dropdownItems }) => {

  return (

    <Portlet title={utils.getLabelByID("APIDefinitionScreen_Heading")}>
      <div className="row">
        <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
          <form className="form-horizontal" encType='application/json' role="form" onSubmit={onSubmit}>
            <div className="form-body" style={{ paddingLeft: "18px" }}>
              <div className="row">

                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{textAlign:"left"}}>{utils.getLabelByID("APIDefScreen_route")}</label>
                    <div className="col-md-7">
                      {/* {console.log(initialValues)} */}
                      <input type="text" className="form-control" name="route" defaultValue={initialValues.route} />


                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_Authorization")}</label>
                    <div className="col-md-7">

                      <select name="Authorization" className="form-control">
                        <option defaultValue={""}>Authorization
                          {/* {initialValues.Authorization} */}
                        </option>
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

                <div className="col-md-5">
                  <div className="form-group">
    
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_isActive")}</label>
                    <div className="col-md-7">
                      <input type="checkbox" className="form-control" name="isActive" defaultChecked={initialValues.isActive}>
                      </input>

                    </div>
                  </div>
                </div>
              </div>

              <div className="row">

                {/* <div className="col-md-1">
                      </div> */}
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-7" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{utils.getLabelByID("APIDefScreen_Label1")}</label>

                    </div>
                  </div>

                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_RouteOveride")}</label>
                    <div className="col-md-7">

                      <input type="checkbox" className="form-control" name="isRouteOveride" defaultChecked={initialValues.isRouteOveride} />

                    </div>
                  </div>
                </div>
                <div className="col-md-1">
                </div>
                <div className="row">

                  <div className="col-md-7">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_fieldName")}</label>
                      <div className="col-md-7">

                        <input type="text" className="form-control" name="fieldName" defaultValue={initialValues.fieldName} />

                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-7" style={{
                      textAlign: "left",
                      fontWeight: "bold"
                    }}>{utils.getLabelByID("APIDefScreen_Label2")}</label>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_CustomMapping")}</label>
                      <div className="col-md-7">

                        <input type="checkbox" name="customMapping" className="form-control" defaultChecked={initialValues.customMapping} />

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_MFunctionName")}</label>
                    <div className="col-md-7">

                      <input type="text" className="form-control" name="MappingfunctionName" defaultValue={initialValues.MappingfunctionName} />

                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_CFileName")}</label>
                    <div className="col-md-7">

                      <input type="text" className="form-control" name="CustomMappingFile" defaultValue={initialValues.CustomMappingFile} />

                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="form-group">
                    <label className="control-label col-md-7" style={{
                      textAlign: "left",
                      fontWeight: "bold"
                    }}>{utils.getLabelByID("APIDefScreen_Label3")}</label>

                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label col-md-5" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("APIDefScreen_async")}</label>
                       <div className="col-md-7">

<input type="checkbox" name="isAsync" className="form-control" defaultChecked={initialValues.isAsync} />

</div>
                    </div>
                  </div>


                  <div className="col-md-5">
                    <div className="form-group">

                      <div className="col-md-5">

                        <select name="simulatorResponse.any" className="form-control">
                          <option defaultValue={""}>REST/QUEUE</option>
                          {
                            dropdownItems.map((option, index) => {
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
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_RSQueue")}</label>
                    <div className="col-md-7">

                      <input type="text" className="form-control" name="requestServiceQueue" defaultValue={initialValues.requestServiceQueue} />

                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_ServiceIP")}</label>
                    <div className="col-md-7">

                      <input type="text" className="form-control" name="responseQueue" defaultValue={initialValues.responseQueue} />

                    </div>
                  </div>
                </div>

              </div>


              <div className="row">
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_ResponseQueue")}</label>
                    <div className="col-md-7">

                      <input type="text" className="form-control" name="ServiceIP" defaultValue={initialValues.ServiceIP} />

                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_ServicePort")}</label>
                    <div className="col-md-7">

                      <input type="text" className="form-control" name="ServicePort" defaultValue={initialValues.ServicePort} />

                    </div>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-md-9">
                  <div className="form-group">
                    <label className="control-label col-md-7" style={{
                      textAlign: "left",
                      fontWeight: "bold"
                    }}>{utils.getLabelByID("APIDefScreen_Label4")}</label>

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea className="form-control" rows="4" style={{ resize: "none", width: "80%" }} />
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="form-group">
                    <label className="control-label col-md-7" style={{
                      textAlign: "left",
                      fontWeight: "bold"
                    }}>{utils.getLabelByID("APIDefScreen_Label5")}</label>

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea className="form-control" rows="4" style={{ resize: "none", width: "80%" }} />
                  </div>
                </div>
              </div>
              <div className="row" >
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_RequestMapping")}</label>
                    <div className="col-md-7">
                      <select name="RequestMapping" className="form-control">
                        <option defaultValue=""> RequestMapping</option>
                        {console.log(typeData)}
                        {
                          dropdownItems.map((option, index) => {
                            return (
                              <option key={index} value={option.value}>{option.label}</option>
                            );
                          })
                        }
                      </select>

                    </div>
                  </div>
                </div>



                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_ResponseMapping")}</label>
                    <div className="col-md-7">

                      <select name="ResponseMapping" className="form-control">
                        <option defaultValue={""}>ResponseMapping
                        {/* {initialValues.ResponseMapping.mappingName} */}
                        </option>
                        {
                          dropdownItems.map((option, index) => {
                            return (
                              <option key={index} value={option.value}>{option.label}</option>
                            );
                          })
                        }
                      </select>

                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label col-md-5" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("APIDefScreen_isSimulated")}</label>
                    <div className="col-md-7">

                      <input type="checkbox" className="form-control" name="isSimulated" defaultChecked={initialValues.isSimulated} />

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="btn-toolbar pull-right">
                      <button type="submit" className="btn green"><i
                        className="fa fa-paper-plane" />{' '}{utils.getLabelByID("Submit")}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </Portlet>
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