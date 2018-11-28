/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const BLAConfigDefinationForm = ({ onInputChange, onInputChangeOrderer, addPeer, addUser, state, ActionHandlers }) => {

  return (
    <Portlet title={utils.getLabelByID("NetworkConfiguration")}>
          <div className="row">
        <div className=" col-md-12">

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
              }}>{utils.getLabelByID("MSPID")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="mspid" onChange={onInputChange} value={state.mspid} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("channel")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="channelName" onChange={onInputChange} value={state.channelName} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("CertificateAuth")}</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("CAURL")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="ca" onChange={onInputChange} value={state.ca} />
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
              }}>{utils.getLabelByID("CAUserName")}</label>
              <div className="form-group col-md-8">

                <input type="text" className="form-control" onChange={onInputChange} name="username" value={state.username} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("CASecret")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="secret" onChange={onInputChange} value={state.secret} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "bold"
              }}>{utils.getLabelByID("ordererDefinition")}</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">

              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("OrdererURL")}</label>
              <div className="form-group col-md-8">
                <input type="text" className="form-control" name="url" onChange={onInputChangeOrderer} value={state.orderer.url} />
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
                <input type="text" className="form-control" name="server_hostname" onChange={onInputChangeOrderer} value={state.orderer.server_hostname} />
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
              }}>{utils.getLabelByID("cacertificate")}</label>
              <div className="form-group col-md-8">
                <textarea type="text" className="form-control" name="tls_cacerts" onChange={onInputChangeOrderer} value={state.orderer.tls_cacerts} rows="5" style={{ fontSize:"12px", resize: "none", width: "100%" }}/>
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
                    }}>{utils.getLabelByID("certificate")}</label>
                    <div className="form-group col-md-8">
                      <textarea type="text" className="form-control" id="peercertificate" rows="4" style={{ resize: "none", width: "100%" }} />

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
              </div>
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="form-group">

                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("certificate")}</label>
                    <div className="form-group col-md-8">
                      <textarea type="text" className="form-control" id="usercertificate" rows="4" style={{ resize: "none", width: "100%" }}/>

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">

                    <label className="form-group control-label col-md-4" style={{
                      textAlign: "left",
                      fontWeight: "normal"
                    }}>{utils.getLabelByID("key")}</label>
                    <div className="form-group col-md-8">
                      <textarea type="text" className="form-control" id="userkey" />

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
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="col-md-12">

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