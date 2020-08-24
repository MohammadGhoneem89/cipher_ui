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

      {containerState.list.map((elem, key) => {
        return (<div className="row">
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
          let args=${elem.args}
          let tx_id = client.newTransactionID();
          tx_id_string = tx_id.getTransactionID();
          const transient_data = {
            'PrivateArgs': Buffer.from(args.join("|")) // string <-> byte[]
          };
          let request = {
              targets: await helper.newPeers(peerNames, net_name, username, channelName),
              chaincodeId: chaincodeName,
              fcn: fcn,
              args: [userIDJWT, orgType, orgCode, UUID],
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
                        <h3 className="title caption-subject bold uppercase pull-left bold">Response Stuct </h3>
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
                <h3 className="pull-left bold">Sample request</h3>
                <div className="row">
                  <div className="col-md-12">
                    <pre>  {elem.sampleArgs || elem.args || "N/A"}</pre>
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
        </div>)
      })}
    </div>
  );
}
export default DocumentComponent;
