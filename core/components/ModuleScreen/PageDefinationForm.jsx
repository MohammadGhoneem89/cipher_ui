/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const PageDefinationForm = ({ onSubmit, initialValues, typeData, addRowApi, onInputChange, addRow, state, ActionHandlers }) => {

  return (
    <Portlet title={utils.getLabelByID("MDAU_PageDefinition")}>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("MDAU_Type")}</label>
              <div className="form-group col-md-8">
                <select id="pageType" className="form-control">
                  {
                    typeData.MDAU_TYPE.map((option, index) => {
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
              }}>{utils.getLabelByID("MDAU_PageValue")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" id="pageValue" />

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("MDAU_PageLabel")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" id="pageLabel" />

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
              }}>{utils.getLabelByID("MDAU_actionType")}</label>
              <div className="form-group col-md-8">
                <select id="pageActionType" className="form-control">
                <option  value="">--select--</option>
                  {
                    typeData.MDAU_ACTION.map((option, index) => {
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
              }}>{utils.getLabelByID("MDAU_iconName")}</label>
              <div className="form-group col-md-8">
                <select id="pageIconName" className="form-control">
                <option  value="">--select--</option>
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
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("MDAU_PageURI")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" id="pageURI" />

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("MDAU_ParentValue")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" id="parentVal" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className=" col-md-12">


        
        <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("MDAU_labelName")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" id="labelName" />
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
                    <input type="checkbox" className="form-control" id="pageDisplayMenu" />
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-md-12">
        <div className=" col-md-12">
          <div className=" col-md-12"
            style={{
              padding: "20px",
              border: "1px solid #EEE",
              marginBottom: "20px"
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "bold"
                }}>{utils.getLabelByID("MDAU_APIDefinition")}</label>
              </div>
            </div>
            <div className="row" id="apiDefination" >
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">

                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("MDAU_APIName")}</label>
                    <div className="form-group col-md-8">
                      <select id="listedApi" className="form-control">
                        <option value="C">Custom</option>
                        {
                          state.apiItems.map((option, index) => {
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
                    }}>{utils.getLabelByID("MDAU_CustomApi")}</label>
                    <div className="form-group col-md-8">
                      <input type="text" className="form-control" id="customApiUri" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">

                <div className="col-md-12">
                  <div className="form-actions right">
                    <div className="form-group col-md-12">
                      <div className="btn-toolbar pull-right">
                        <button type="submit" className="btn btn-default" onClick={addRowApi.bind(this)}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add API")} </button>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-12">


                    <Table
                      gridColumns={utils.getGridColumnByName("MDAU_APIList")}
                      gridData={state.apiList}
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
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" onClick={addRow} className="btn dark"><i
                /><i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Permission")}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </Portlet>
  );
}
export default PageDefinationForm;


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