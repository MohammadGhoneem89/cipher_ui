/*standard imports*/
import React, { PropTypes } from 'react';
import PageDefinationForm from './PageDefinationForm.jsx';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const ModuleDefinationForm = ({ onSubmit, initialValues, typeData, addRowApi, onInputChange, addRow, state, ActionHandlers }) => {

  return (
    <div >
      <Portlet title={utils.getLabelByID("ModuleDefinationForm_Heading")}>
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
                        <select name="useCase" value={initialValues.useCase} onChange={onInputChange} className="form-control">
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
                      <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("MDAU_label")}</label>
                      <div className="form-group col-md-8">
                        {/* {console.log(initialValues)} */}
                        <input type="text" className="form-control" name="label" onChange={onInputChange} value={initialValues.label} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("MDAU_iconName")}</label>
                      <div className="form-group col-md-8">

                        <select name="iconName" value={initialValues.iconName} onChange={onInputChange} className="form-control">

                          {
                            typeData.MDAU_ICON.map((option, index) => {
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
                      }}>{utils.getLabelByID("MDAU_order")}</label>
                      <div className="form-group col-md-8">

                        <input type="text" className="form-control" name="order" onChange={onInputChange} value={initialValues.order} />

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
                      }}>{utils.getLabelByID("MDAU_value")}</label>
                      <div className="form-group col-md-8">
                        <input type="text" className="form-control" disabled={true} name="value" onChange={onInputChange} value={initialValues.value} />

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">

                      <label className="form-group control-label col-md-4" style={{
                        textAlign: "left",
                        fontWeight: "normal"
                      }}>{utils.getLabelByID("MDAU_displayMenu")}</label>
                      <div className="form-group col-md-8">
                        <div className="icheck-list">
                          <label className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                            <label></label>
                            <input type="checkbox" checked={initialValues.displayMenu} className="form-control" onChange={onInputChange}  name="displayMenu" id="displayMenu" />
                            <span></span>
                          </label>
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
      <div className="row" id="moduleDefination">
        <div className="col-md-12">
          <div className="portlet-body">
            <div className="form-body" >

              <div className="row">
                <div className="col-md-12">
                  <PageDefinationForm onSubmit={onSubmit} initialValues={initialValues} typeData={typeData} addRowApi={addRowApi} onInputChange={onInputChange} addRow={addRow} state={state} ActionHandlers={ActionHandlers} />
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="portlet-body">
            <div className="form-body" >

              <div className="row">
                <div className="col-md-12">
                  <Portlet title={utils.getLabelByID("PermissionList")}>
                    <div className="row">
                      <div className="col-md-12">
                        <Table
                          gridColumns={utils.getGridColumnByName("ModuleDefination")}
                          gridData={state.elementList}
                          export={false}
                          componentFunction={ActionHandlers}
                          pagination={false} />
                      </div>
                    </div>
                  </Portlet >
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row">
                    <div className="col-md-12">
                      <div className="btn-toolbar pull-right">
                        <button type="submit" onClick={onSubmit} className="btn green">{' '}{utils.getLabelByID("Update Module")}
                        </button>
                      </div>
                    </div>
                  </div>
    </div>
  );
}
export default ModuleDefinationForm;


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