/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import ReactJson from 'react-json-view';
import Json from 'react-json'

import ModalBox from '../../common/ModalBox.jsx';

const DocumentComponent = ({ containerState }) => {
  ///alert(JSON.stringify(initialValues))

  return (
    <div>
      <div className="tabbable-line boxless tabbable-line2">
        <ul className="nav nav-tabs">
          {containerState.list.map((option, index) => {
            return (
              <li className={index == 0 ? "active" : ""}>
                <a href={`#tab_1_${index + 1}`} data-toggle="tab"
                  style={{ fontWeight: "Bold", fontSize: "17px" }}>{option.ruleName}/{option.function}</a>
              </li>
            )
          })
          }
        </ul>
      </div>
      <div className="tabbable-line" style={{ marginTop: "10px" }}>
        <div className="tab-content tab-content2">

          {containerState.list.map((elem, key) => {
            return (
              <div className={key == 0 ? "tab-pane active" : "tab-pane"} id={`tab_1_${key + 1}`}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="note note-documentation">
                          <div className="row">
                            <div className="col-md-9">
                              <div className="col-md-12">
                                <h3 className="block pull-left"><b>{elem.ruleName}/{elem.function}</b></h3>
                              </div>
                              <div className="col-md-12">
                                <p><a className="btn btn-default dark" href="javascript:;"
                                  style={{
                                    padding: "1px 12px",
                                    fontSize: "12px",
                                    marginTop: "-3px"
                                  }}
                                > {elem.type == "0001" ? "Query" : "Invoke"} </a><b> Description:</b>  {elem.type == "0001" ? "this function queries the smart contract and returns response in the form of shim struct interface" : "this function invocke the smart contract transaction and returns response in the form of shim struct interface"}</p>
                              </div>
                              <div className="col-md-12">
                                <p><b> Channel:</b> {elem.channel || "N/A"}</p>
                              </div>
                              <div className="col-md-12">
                                <p>
                                  <b> Smart Contract Name:</b> {elem.smartcontract}
                                </p>
                              </div>
                              <div className="col-md-12">
                                <p>
                                  <b> Consortium:</b> {elem.consortium}
                                </p>
                              </div>
                              <div className="col-md-12">
                                <p>
                                  <b> Function Name:</b> {elem.function}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12">
                            <div style={{
                              background: "linen",
                              padding: "10px",
                              overflow: "hidden"
                            }}>
                              <div className="col-md-2">
                                <h3 className="title caption-subject bold uppercase pull-left bold">Request Code </h3>
                              </div>
                              {/*tabbed pane start */}
                              <pre>
                                {`
          Note: two inputs are required 1) TransientArgs 2) NonTransientArgs

          let transientArgs=${elem.args}
          let nonTransientArgs=[<empty string or caller userid>, <orginiztion type>, <orginiztion code>, UUID]
          let tx_id = client.newTransactionID();
          tx_id_string = tx_id.getTransactionID();
          const transient_data = {
            'PrivateArgs': Buffer.from(transientArgs.join("|")) // string <-> byte[]
          };
          let targets=[]
          let data=<PEMcertificate provided by vendor>
          client.newPeer(<peer url>, {
            pem: Buffer.from(data).toString(),
            'ssl-target-name-override': null, // null if the AA domain entry with valid certificate is available otherwise put domain defined my vendor
            "grpc.keepalive_time_ms": 120000,
            "grpc.http2.min_time_between_pings_ms": 120000,
            "grpc.keepalive_timeout_ms": 20000,
            "grpc.http2.max_pings_without_data": 0,
            "grpc.keepalive_permit_without_calls": 1
          }));
          let request = {
              targets: targets,
              chaincodeId: chaincodeName,
              fcn: fcn,
              args: nonTransientArgs,
              chainId: channelName,
              transientMap: transient_data,
              txId: tx_id
          };
          let results = await channel.sendTransactionProposal(request, 120000);

    `}
                              </pre>
                            </div>
                            <div style={{
                              background: "linen",
                              padding: "10px",
                              overflow: "hidden"
                            }}>
                              <div className="col-md-2">
                                <h3 className="title caption-subject bold uppercase pull-left bold">Response Struct </h3>
                              </div>
                              {/*tabbed pane start */}
                              <pre>
                                {`
          A Response object is returned from a chaincode invocation
          Properties:
          Name	Type	Description
          status	number	A status code that follows the HTTP status codes
          message	string	A message associated with the response code
          payload	Array.<byte>	A payload that can be used to include metadata with this response

          {
            status: 200,
            message: "Processed OK!",
            payload: [12 89 08 88 76 22]
          }


    `}
                              </pre>
                            </div>
                            <div style={{
                              background: "linen",
                              padding: "10px",
                              overflow: "hidden"
                            }}>
                              <div className="col-md-2">
                                <h3 className="title caption-subject bold uppercase pull-left bold">Event code and sample</h3>
                              </div>
                              {/*tabbed pane start */}
                              <pre>
                                {`
          Note: Event struct returned is as follows 
          type generalEventStruct struct {
            EventName      string            //json:"eventName"
            EventList      []eventDataFormat //json:"events"
            AdditionalData interface{}       //json:"additionalData"
          }

          Code:
          let org=<your org>;
          let username=<peer client enrolled and registered user>;
          let channelName=<channel name perovided by>;
          let ccid=<smartcontract id>
          let eventname=<event name provided by vendor or chainCodeEvent> 
          let client = await helper.getClientForOrg(org, username, channelName);

          let user = await helper.getOrgAdmin(org, client);
          if (!user) {
            let message = util.format('admin error');
            logger.error(message);
            throw new Error(message);
          }
          var channel = client.getChannel(channelName);
          let eventhubs = channel.getChannelEventHubsForOrg();
          let eh = eventhubs[0];
          eh.registerChaincodeEvent(ccid, eventname,(event, blockNum, txID, status) => {
            if (status && status === 'VALID'){
              let evt = JSON.parse(event.payload.toString('utf8'));
              if (evt.events) {
                // TODO: hande your event
              } else {
                console.log("Ignoring CC event");
              }

            }
          },
          (err) => {
            console.log('Oh snap!' + err);
          }, { startBlock: currentBlockValue });
          eh.connect(true);
  `}
                              </pre>
                            </div>
                          </div>
                        </div>

                        {/* {initialValues.simucases && initialValues.simucases.map((option, index) => {
                    return (
                      <div className="row">
                        <div className="col-md-12">
                          <h4 className="pull-left bold">{option.RuleName}</h4>
                        </div>
                        <div className="col-md-12">
                          <pre> <ReactJson src={JSON.parse(option.SimulatorResponse)}/></pre>
                        </div>
                      </div>
                    )
                  })} */}
                      </div>
                      <div className="col-md-12">
                        <h3 className="pull-left bold">Sample TransientArgs</h3>
                        <div className="row">
                          <div className="col-md-12">
                            <pre>  {elem.sampleArgs || elem.args || "N/A"}</pre>
                          </div>
                        </div>
                        <h3 className="pull-left bold">Sample NonTransientArgs</h3>
                        <div className="row">
                          <div className="col-md-12">
                            <pre>  {JSON.stringify(["callerid", "PRIVATE", "ABCCORP", "1eaf8df2-7886-4d1b-a148-2df0d71d66d0"])}</pre>
                          </div>
                        </div>
                        <h3 className="pull-left bold">Sample Response</h3>
                        <div className="row">
                          <div className="col-md-12">
                            <pre>  {elem.sampleResponse || "Standard Response Stuct"}</pre>
                          </div>
                        </div>
                        <h3 className="pull-left bold">Sample Events</h3>
                        <div className="row">
                          <div className="col-md-12">
                            <pre>   {elem.sampleEvents || "N/A"}</pre>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>)
          })}
        </div>
      </div>
    </div>
  );
}
export default DocumentComponent;
