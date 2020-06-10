/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const BLAConfigDefinationFormQuorum = ({ onInputChange, onInputChangeOrderer, addPeer, addUser, state, ActionHandlers, typeData, onSubmit, flag }) => {

  return (
    <Portlet title={utils.getLabelByID("NetworkConfiguration")}>
      <div className="row">
        <div className=" col-md-12">


          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <div className="form-group col-md-4">
                  <label className="control-label">{utils.getLabelByID("Blockchain Type")}</label>
                </div>
                <div className="form-group col-md-8">
                  <select id="type" name="type" disabled={flag} onChange={onInputChange} value={state.type} className="form-control">
                    <option key="" value="">--select--</option>
                    {
                      typeData.BLCHN_TYPE.map((option, index) => {
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


          <div className="row">
            <div className="col-md-12">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("orgDefinition")}</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("NetworkName")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="networkName" onChange={onInputChange} value={state.networkName} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("Orginization Alias")}</label>
              <div className="form-group col-md-8">
                <select id="orginizationAlias" className="form-control" name="orginizationAlias" onChange={onInputChange}>
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



          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("ConstellationId")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="mspid" onChange={onInputChange} value={state.mspid} />
              </div>
            </div>
          </div>
          {/*<div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("channel")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="channelName" onChange={onInputChange} value={state.channelName} />
              </div>
            </div>
          </div>*/}
        </div>
      </div>

      <div className=" col-md-12" >
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
              }}>{utils.getLabelByID("peerDefinition")}</label>
            </div>
          </div>
          <div className="row" id="peerDefination" >
            <div className="col-md-12">
              <div className="col-md-6">
                <div className="form-group">

                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("peerName")}</label>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" id="peerName" />

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
                    <input type="text" className="form-control" id="ServerName" />

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
                    <input type="text" className="form-control" id="requestURL" />

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">

                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("eventURL")}</label>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" id="eventURL" />

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
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="form-actions right">
                  <div className="form-group col-md-12">
                    <div className="btn-toolbar pull-right">
                      <button type="submit" className="btn btn-default" onClick={addPeer} > <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Peer")} </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Table
                    gridColumns={utils.getGridColumnByName("peerListOrg")}
                    gridData={state.peerList}
                    export={false}
                    componentFunction={ActionHandlers}
                    pagination={false} />


                </div>
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
              }}>{utils.getLabelByID("UserDefination")}</label>
            </div>
          </div>




          <div className="row" id="userDefination" >
            <div className="col-md-12">
              <div className="col-md-6">
                <div className="form-group">

                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("username")}</label>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" id="username" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">

                  <label className="form-group control-label col-md-4" style={{
                    textAlign: "left",
                    fontWeight: "normal"
                  }}>{utils.getLabelByID("Secret")}</label>
                  <div className="form-group col-md-8">
                    <input type="text" className="form-control" id="userkey" rows="4" style={{ resize: "none", width: "100%" }} />

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
                      <button type="submit" onClick={addUser} className="btn btn-default" > <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add User")} </button>
                    </div>

                  </div>
                </div>
                <div className="col-md-12">


                  <Table
                    gridColumns={utils.getGridColumnByName("userListOrg")}
                    gridData={state.peerUser}
                    export={false}
                    componentFunction={ActionHandlers}
                    pagination={false} />


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
              <button type="submit" onClick={onSubmit} className="btn green">{' '}{utils.getLabelByID("Update Module")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portlet>
  );
}
export default BLAConfigDefinationFormQuorum;


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