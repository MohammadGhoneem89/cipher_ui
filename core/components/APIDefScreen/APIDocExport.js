/*standard imports*/
import React, { PropTypes } from 'react';
import Json from 'react-json'
import ReactJson from 'react-json-view';

import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import * as constants from '../../constants/Communication.js';



const APIDocExport = ({data, useCase, baseurl}) => {
    data.map((obj) => {

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
                                        > POST </a><b> Route:</b> /{obj.route}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p><b> Description:</b> {''}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p><b> Authentication:</b> {''}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p><b> URL:</b> {`${baseurl}/API/${useCase}/${obj.route}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">

                            <h3 className="pull-left bold">Sample Responses</h3>
                            {obj.simucases && obj.simucases.map((option, index) => {

                                return (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4 className="pull-left bold">{option.RuleName}</h4>
                                        </div>
                                        <div className="col-md-12">
                                            <pre> <code>{option.SimulatorResponse}</code> </pre>

                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                        <div className="col-md-12">
                            <h4 className="pull-left bold">Request Field Info</h4>
                        </div>
                        <div className="col-md-12">
                            <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDoc")} gridData={[]}
                                   pagination={false} />
                        </div>

                        <div className="col-md-12">
                            <h4 className="pull-left bold">Response Field Info</h4>
                        </div>
                        <div className="col-md-12">
                            <Table fontclass="" gridColumns={utils.getGridColumnByName("APIDocRes")} gridData={[]}
                                   pagination={false} />
                        </div>
                    </div>
                </div>
            </div>
        );
    })

}
export default APIDocExport;
