/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import ReactJson from 'react-json-view';
import Json from 'react-json'
const DocumentComponent = ({ initialValues, useCase, route, request, response, baseurl, PG, onEdit, onAdd, onDelete, onRunApi, onLoadSample }) => {
  ///alert(JSON.stringify(initialValues))

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <div className="note note-success">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="block pull-left"><b>{useCase}</b></h5>
                </div>
                <div className="col-md-12">
                  <p> <a className="btn green uppercase" href="javascript:;"
                    style={{
                      padding: "1px 12px",
                      fontSize: "12px"
                    }}
                  > POST </a><b> Route:</b> /{route}</p>
                </div>
                <div className="col-md-12">
                  <p><b> Description:</b> {initialValues.description}</p>
                </div>
                <div className="col-md-12">
                  <p><b> Authentication:</b> {initialValues.authorization}</p>
                </div>
                <div className="col-md-12">
                  <p><b> URL:</b> {`${baseurl}/API/${useCase}/${route}`}</p>
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
                }}><div className="col-md-6">
                    <h3 className="title caption-subject bold uppercase pull-left bold">Playground </h3>
                  </div>
                  <div className="col-md-6"
                    style={{
                      padding: "20px"
                    }}
                  >
                    <div className="btn-toolbar pull-right">
                      <a className="btn dark uppercase " onClick={onLoadSample} href="javascript:;"> Load Sample Request </a>
                      <a className="btn dark uppercase" onClick={onRunApi.bind(this, `${baseurl}/API/${useCase}/${route}`, request)} href="javascript:;"> Execute API </a>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h4 className="title caption-subject bold uppercase pull-left bold">Request</h4>
                  </div>
                  <div className="col-md-12">
                    <ReactJson indentWidth={2} name={false} theme="eighties" onEdit={onEdit} onAdd={onAdd} onDelete={onDelete} src={request} />
                  </div>
                  <hr />
                  <div className="col-md-12" style={{}}>
                    <h4 className="title caption-subject bold uppercase pull-left bold">Response </h4>
                  </div>
                  <div className="col-md-12" id="responseData" style={{ padding: "20px" }}>
                    <ReactJson indentWidth={2} name={false} theme="eighties" src={response} />
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
                    <pre> <ReactJson src={JSON.parse(option.SimulatorResponse)} /></pre>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col-md-12">
            <h4 className="pull-left bold">Request Field Info</h4>
          </div>
          <div className="col-md-12">
            <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDoc")} gridData={initialValues.RequestMapping}
              pagination={false} />
          </div>
          <div className="col-md-12">
            <h4 className="pull-left bold">Response Field Info</h4>
          </div>
          <div className="col-md-12">
            <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDocRes")} gridData={initialValues.ResponseMapping}
              pagination={false} />
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
                    pagination={false} />
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}
export default DocumentComponent;
