/*standard imports*/
import React, {PropTypes} from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const BLAConfigDefinationForm = ({onInputChange, onInputChangeOrderer, addPeer, addUser, state, ActionHandlers, typeData, onSubmit, flag,entityList}) => {

  return (
    <Portlet title={utils.getLabelByID("NetworkConfiguration")}>
      <div className="row">
        <div className=" col-md-12">

          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("NetworkName")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="networkName" onChange={onInputChange}
                       value={state.networkName}/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("Orginization Type")}</label>
              <div className="form-group col-md-8">
                <select id="orginizationAlias" className="form-control" name="orginizationAlias"
                        onChange={onInputChange} value={state.orginizationAlias}>
                  <option key="" value="">--select--</option>
                  {
                    typeData.ORG_TYPES &&
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
        </div>
      </div>

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
              }}>{utils.getLabelByID("Relay Endpoint List")}</label>
            </div>
          </div>
          <div className="row" id="peerDefination">
            <div className="col-md-12">
              <div className="col-md-6">
                <div className="form-group">

                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("Org Name")}</label>
                  <div className="form-group col-md-8">

                    <select id="orgCode" className="form-control">
                      {
                        entityList.map((option, index) => {
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
                  }}>{utils.getLabelByID("ServerName")}</label>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" id="ServerName"/>

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
                  }}>{utils.getLabelByID("requestURL")}</label>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" id="requestURL"/>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("nlbType")}</label>
                  <div className="form-group col-md-8">
                    <select id="nlbType" className="form-control">
                      {
                        typeData.NLB_Type &&
                        typeData.NLB_Type.map((option, index) => {
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
            <div className="col-md-12">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("CA certificate")}</label>
                  <div className="form-group col-md-8">
                    <textarea type="text" className="form-control" id="cacertificate" rows="4"
                              style={{resize: "none", width: "100%"}}/>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("Chain Certificate")}</label>
                  <div className="form-group col-md-8">
                    <textarea type="text" className="form-control" id="chaincertificate" rows="4"
                              style={{resize: "none", width: "100%"}}/>
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
                  }}>{utils.getLabelByID("Private Key")}</label>
                  <div className="form-group col-md-8">
                    <textarea type="text" className="form-control" id="privatekey" rows="4"
                              style={{resize: "none", width: "100%"}}/>
                  </div>
                </div>

              </div>
              <div className="col-md-6">
                <div className="form-group col-md-4">
                  <label className="control-label">{utils.getLabelByID("type")}</label>
                </div>
                <div className="form-group col-md-8">
                  <select id="isServer" className="form-control">
                    <option value="SERVER">SERVER</option>
                    <option value="CLIENT">CLIENT</option>
                  </select>
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
                      <button type="submit" className="btn btn-default" onClick={addPeer}><i
                        className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Endpoint")} </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Table
                    gridColumns={utils.getGridColumnByName("endpointListOrg")}
                    gridData={state.orgList}
                    export={false}
                    componentFunction={ActionHandlers}
                    pagination={false}/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="btn-toolbar pull-right">
              <button type="submit" onClick={onSubmit}
                      className="btn green">{' '}{utils.getLabelByID("Update Relay Network")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portlet>
  );
}
export default BLAConfigDefinationForm;


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