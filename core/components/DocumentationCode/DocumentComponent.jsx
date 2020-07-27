/*standard imports*/
import React, {PropTypes} from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import ReactJson from 'react-json-view';
import Json from 'react-json'

import ModalBox from '../../common/ModalBox.jsx';

const DocumentComponent = ({initialValues, useCase, route, request, response, baseurl, PG, onEdit, onAdd, onDelete, onRunApi, onLoadSample, HmacPopUP, closePopUP, containerState, generateHmac}) => {
  ///alert(JSON.stringify(initialValues))

  return (
    <div>
      <ModalBox isOpen={containerState.isHmacOpen}>
        <Portlet title={utils.getLabelByID("HMAC Documentation")} isPermissioned={true}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group col-md-12">
                <label className="control-label">{utils.getLabelByID(`Code: Javascript`)}</label>
              </div>
              <div className="form-group col-md-12">
                <pre>
                  {`
                  const crypto = require('crypto');
                  const getSignatureByInput = (input, crt) => {
                         let privatePem = fs.readFileSync(crt);
                         let key = privatePem.toString('ascii');
                         let sign = crypto.createSign('RSA-SHA512'); 
                         sign.update(input)
                         let signature = sign.sign(key, 'hex')
                         return signature;
                   }\n
                   // Usage
                   let hamc=crypto.createHmac("sha512", 'shared-secrect-key').update({body:{}}).digest("hex");
                   let signatureSignedByPrivateKey = getSignatureByInput(hmac,'PVTKEY-PATH');
                   `}
                </pre>
              </div>

              <div className="form-group col-md-12">
                <label className={"bold"}>Private Key</label>
                <textarea className={"form-control"} rows={5} id="privatekey"></textarea>
              </div>
              <div className="form-group col-md-12">
                <label className={"bold"}>JSON Body</label>
                <textarea className={"form-control"} rows={5} id="body"></textarea>
              </div>
              <div className="form-group col-md-12">
                <label className={"bold"}>Shared Secret</label>
                <input className={"form-control"} type={"text"} id="sharedSec"></input>
              </div>
              <div className="form-group col-md-12">
                <label className={"bold"}>Computed HMAC</label>
                <textarea className={"form-control"} disabled rows={5} value={containerState.generateHMAC}></textarea>
              </div>
            </div>
            <div className="form-actions right">
              <div className="form-group col-md-12">
                <div className="btn-toolbar pull-right">
                  <button type="button" className="btn btn-default dark"
                          onClick={generateHmac}>{utils.getLabelByID("Generate HMAC")}</button>

                  <button type="button" className="btn btn-default"
                          onClick={HmacPopUP}>{utils.getLabelByID("Close")}</button>
                </div>
              </div>
            </div>
          </div>
        </Portlet>
      </ModalBox>
      <ModalBox isOpen={containerState.isOpen}>
        <Portlet title={utils.getLabelByID("Login Documentation")} isPermissioned={true}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group col-md-12">
                <label className="control-label">{utils.getLabelByID("Request " + `(URL: ${baseurl}/Login)`)}</label>
              </div>
              <div className="form-group col-md-12">
                <pre> <ReactJson src={{
                  "userId": "org1_api",
                  "password": "7ccb949390af537e03f70eee0c58e7b3c5899ff38209d4241a05bdfe619c100d791222903e105c861ed1dee93b69db8eb491682c532de6a5cde4ada08d524127"
                }}/></pre>
              </div>
              <div className="form-group col-md-12">
                <label className="control-label">{utils.getLabelByID("Reponse")}</label>
              </div>
              <div className="form-group col-md-12">
                <pre> <ReactJson src={{
                  "cipherMessageId": "17bac5a0-a8d8-11ea-9798-2d4070eeb91b",
                  "messageStatus": "OK",
                  "errorCode": 200,
                  "errorDescription": "logged in successfully !!!",
                  "token": "90087963babd23a0a8eec5f54b28493b72c4a66314407b395aff9216c1140f90282328d9199b208b4b07c24633bf2a7662f8dee0be6857b5fa88611ea5ece5852d9c3a4ef83d4a80a71597de2fcaabd60e83a13794097a37189bcbd0356f0d294751fb5665b953443d1ddff47c0778db7321388ecf7676722a612dc2480c43ae6903dfb9b0851bab991dc87620cc3f99bfb41b03c76dc414761e4f9cb285c5edc0afe9e98a71b955969def0f9eb2d9ebd7c282a9a26cc002c14f1567d860c39faa2bb569726b7ee9b3ab592e2cff43bbeaa2afd4cab5ce1b55626b6e5354217d449c17cd49012cd46cfe30d63a7b2c09592675438004ccdca0df324231c4f081f816d4048c00a4e84d7fd43f127f3ea9368c7c8a37e841da161cbdb455592af232e5992c6e9de1c218a465808764c3739b745d2f44bda443cd40724044051032e80df908e1a60d3852e315ef540e5687032b9d6008624bd6942d6ab52193877171d27279c80418db385737f368c792f7000af1bb315ae8156fb3da8be875beb32525f7aab22a5b3c3c41f93320a61cbce6649d2cffc509af87332ea03bad0aad01dfeda3680142497a35adbaed3d7b55bd5824da7ac01f0b4c29116c1db86d095702e098f2334a652c6d9d66161881139ed084d84512646d56e75c5a4e321701e447aef740b247cacfb086262a4abf347fb6626a7476dc64a47bfab3a3ad135f607e390fd8ff26d0b10f70598e6f3a185a97d918dc069027af318dbb0d1ff091f0fa19119bb0740a8443793d16214d6b7ab45723ce15881fac9a5dcb5cf380ef85fe18cff0661a298123da97dfbd0fb58691c30684ffc17eb1d251e1c3ce2263c2fde16e0ff435f59164b75d14ee7853235fa5e09b2a80bf0bcb3686324288096d1c607f0a6bae36521dc313c275b241636ca778421d2855350fe18db9233cd75d8ec3917d56a40632083382e193e4607dcd677105d0e85401d6a0639ff5f57038825e22390553e053323fc4b84effddf9f473d6f03cd3486a50716d6556357c7b6ca6fa7a1386eb6a4ba882003d36316b23a2864572d9c2d2aa41ced58fb2876603c226b5be93f37825a84d0354e42466fe533cede09a2382f88504e80286c1b7549c51222ad8f6bbca08e6c5032f3e7376fd8d44607e3253e6c0e183ec88f21df3d4dedc09d885f2770ffc659cd7e7605d9323f131e7ff23b6a2ceaf51a38c2c7027d768e429d9240ee9420fc17f93fa4bd536209e0f60beb7e4bfa2881f43cb8d93b048e84f9679fe22ca0056fa7bc564e305a107abfe1c53e93027bd56269e254a961f41c18feb42ea8d6a7ceadba9fe3118f2059303fe53520ed90f1b7becb690c1377e90a73eab14a607449d1fb96f66005b44cd604388f02d4decba98d2bb850013cb826062599b12a3ca06724e4391311339e0380ce00d025bf4e63a05901d6fbc85f387668319e45d6ed9845a3be6d7bf9f9c09f860931a504b8d7e0ba723f58ae3cdf230a070cf62218fa4fb918fb65fe9cea8076039a70b2c3902adb1bede676af7ed93bb84fbdd14a1a759c81dcb2caaa76ca3c2ffa745306cae93324f86a5e9122c0b3be988920dbb52c2f17e19bbd18cfcdaf86b733b11c06d6eb39983859e8b310f1af729032b23ef62a8abd4c4d6ce03c0988162c1280e578ecbe3ea1038609883ddfb1bb426f9d38dd431c578bc448d1aa14f76a60c427d498d9688834f5c99620586cca9042ba912aee53bf81457936828053889ed92281d78a087d2ad441040736fa6927b9bae92c65585130411ccf16b8c6ca3d418c6b1e5e1f26eea2b29329bc06ba287fd8db7b274f6b649c093576f9abe528256d5a017140efbf56a46de88715e1dd0e8a79795e2da40725bac66eb7e03fed95c60d49c15f710411654e8a89f64c98572d0554e5b6ddeba3b30b7ac7f136431b022c5505afc1abf9d73d6f7e7b08877a30b55510caa3f708b19261b80288ce3e8a071147d2febaeaf448327be7ec8d94df54902bbb66fffb9a2418433842228fbf1e9273bae35",
                  "timestamp": "08/06/2020 00:01:05.274"
                }}/></pre>
              </div>
            </div>
            <div className="form-actions right">
              <div className="form-group col-md-12">
                <div className="btn-toolbar pull-right">


                  <button type="button" className="btn btn-default"
                          onClick={closePopUP}>{utils.getLabelByID("Close")}</button>
                </div>
              </div>
            </div>
          </div>
        </Portlet>
      </ModalBox>
      <div className="row">

        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="note note-documentation">
                <div className="row">

                  <div className="col-md-9">
                    <div className="col-md-12">
                      <h3 className="block pull-left"><b>{useCase}</b></h3>
                    </div>
                    <div className="col-md-12">
                      <p><a className="btn btn-default dark" href="javascript:;"
                            style={{
                              padding: "1px 12px",
                              fontSize: "12px",
                              marginTop: "-3px"
                            }}
                      > POST </a><b> Route:</b> /{route}</p>
                    </div>
                    <div className="col-md-12">
                      <p><b> Description:</b> {initialValues.description || "N/A"}</p>
                    </div>
                    <div className="col-md-12">
                      <p>
                        <b> Authorization:</b> {initialValues.authorization}
                        {initialValues.isHMAC &&
                        <div>
                          <b>HMAC Enabled</b> &nbsp;
                          <a href={"javascript:;"} onClick={HmacPopUP}>view documentation</a>
                        </div>
                        }
                      </p>
                    </div>
                    <div className="col-md-12">
                      <p><b> URL:</b> {`${baseurl}/API/${useCase}/${route}`}</p>
                    </div>
                  </div>

                  <div className="col-md-3" style={{borderLeft: "3px dashed grey"}}>
                    <div className="col-md-12">
                      <h3 className="block pull-left"><b>Login API</b></h3>
                    </div>
                    <div className="col-md-12">
                      <p><a className="btn btn-default dark" href="javascript:;" onClick={closePopUP}
                            style={{
                              padding: "1px 12px",
                              fontSize: "12px",
                              marginTop: "-3px"
                            }}
                      > POST (view documentation)</a><b> Route:</b> /Login</p>
                    </div>
                    <div className="col-md-12">
                      <p><b> Description:</b> This api provides bearer token on successful login</p>
                    </div>
                    <div className="col-md-12">
                      <p><b> Authorization:</b> Basic / Username & Password (SHA512)</p>
                    </div>
                    <div className="col-md-12">
                      <p><b> URL:</b> {`${baseurl}/Login`}</p>
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
                      <h3 className="title caption-subject bold uppercase pull-left bold">Playground </h3>
                    </div>
                    {/*tabbed pane start */}

                    <div className="tabbable-line boxless tabbable-line2">
                      <ul className="nav nav-tabs">

                        {initialValues.simucases && initialValues.simucases.map((option, index) => {
                          return (
                            <li className={index == 0 ? "active" : ""}>
                              <a href={`#tab_1_${index + 1}`} data-toggle="tab"
                                 style={{fontWeight: "Bold", fontSize: "17px"}}>{option.RuleName}</a>
                            </li>
                          )
                        })
                        }

                      </ul>
                    </div>
                    <div className="tabbable-line">
                      <div className="tab-content tab-content2">
                        {/* Simulator Box */}

                        {initialValues.simucases && initialValues.simucases.map((option, index) => {
                          return (
                            <div className={index == 0 ? "tab-pane active" : "tab-pane"} id={`tab_1_${index + 1}`}>

                              <div className="col-md-12" style={{
                                // padding: "20px"
                              }}>
                                <div className="btn-toolbar pull-right">
                                  <a className="btn dark uppercase " onClick={onLoadSample} href="javascript:;"> Load
                                    Sample
                                    Request </a>
                                  <a className="btn dark uppercase"
                                     onClick={onRunApi.bind(this, `${baseurl}/API/${useCase}/${route}`, JSON.parse(option.SimulatorRequest))}
                                     href="javascript:;"> Execute API </a>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <h4 className="title caption-subject bold uppercase pull-left bold">Request</h4>
                              </div>
                              <div className="col-md-12">
                                <ReactJson indentWidth={2} name={false} theme="eighties" onEdit={onEdit} onAdd={onAdd}
                                           onDelete={onDelete} src={JSON.parse(option.SimulatorRequest)}/>
                              </div>
                              <hr/>
                              <div className="col-md-12" style={{}}>
                                <h4 className="title caption-subject bold uppercase pull-left bold">Response </h4>
                              </div>
                              <div className="col-md-12" id="responseData" style={{padding: "20px"}}>
                                <ReactJson indentWidth={2} name={false} theme="eighties" src={response}/>
                              </div>
                            </div>
                          )
                        })
                        }
                        {/*tabbed pane END*/}

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <h3 className="pull-left bold">Sample Responses</h3>
              {initialValues.simucases && initialValues.simucases.map((option, index) => {
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
              })}
            </div>
            <div className="col-md-12">
              <h4 className="pull-left bold">Request Field Info</h4>
            </div>
            <div className="col-md-12">
              <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDoc")}
                     gridData={initialValues.RequestMapping}
                     pagination={false}/>
            </div>
            <div className="col-md-12">
              <h4 className="pull-left bold">Response Field Info</h4>
            </div>
            <div className="col-md-12">
              <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDocRes")}
                     gridData={initialValues.ResponseMapping}
                     pagination={false}/>
            </div>
            <div className="col-md-12">
              <h4 className="pull-left bold">Structure Information</h4>

            </div>
            {initialValues.complexList.map((val, index) => {
              return (
                <div key={index}>
                  <ul>
                    <li><b>{val.typeName}</b></li>
                  </ul>
                  <div className="col-md-12">
                    <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDoc")} gridData={val.attributes}
                           pagination={false}/>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}
export default DocumentComponent;
