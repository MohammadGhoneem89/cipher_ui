/*standard imports*/
import React, { PropTypes } from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import DateControl from "../../common/DateControl.jsx";

const ReportForm = ({ onInputChange, addPeer, state, ActionHandlers, flag, isOwner, onSubmit, testQuery, startDateChange, addvalue, removevalue }) => {
    let options = {
        lineNumbers: true
    };
    return (
        <div>
            <div className="row" id={'form'}>
                <div className=" col-md-12" style={{ marginTop: "-25px" }}>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label className="form-group control-label col-md-12" style={{
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>{utils.getLabelByID("Connection String")}</label>
                            <div className="form-group col-md-12">
                                <select id="connectionString" name="connectionString" value={state.reportContainer.connectionString}
                                    onChange={onInputChange} className="form-control">
                                    <option value="">--select--</option>
                                    {state.getEndpointListView.map((option, index) => {
                                        if (option.requestType == 'dbConnection' && (option.dbType == 'postgres~orm' || option.dbType == 'mssql~orm'))
                                            return (
                                                <option key={index} value={option.value}>{option.text}</option>
                                            );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12" id={'form'}>
                    <div className="col-md-12">
                        <div className=" col-md-12">
                            <div className=" col-md-12"
                                style={{
                                    padding: "20px",
                                    border: "1px solid #EEE",
                                    marginBottom: "20px"
                                }}>
                                <div className="row" id="peerDefination">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-group control-label col-md-4" style={{
                                                textAlign: "left",
                                                fontWeight: "bold"
                                            }}>{utils.getLabelByID("Filter(s) Criteria and Query")}</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-group control-label col-md-4" style={{
                                                    textAlign: "left",
                                                    fontWeight: "normal"
                                                }}>{utils.getLabelByID("Criteria Field")}</label>
                                                <div className="form-group col-md-8">
                                                    <input type="text" className="form-control" id="fieldName" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-group control-label col-md-4" style={{
                                                    textAlign: "left",
                                                    fontWeight: "normal"
                                                }}>{utils.getLabelByID("Test Value")}</label>
                                                <div className="form-group col-md-8">
                                                    <input type="text" className="form-control" id="testVal" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-group control-label col-md-4" style={{
                                                    textAlign: "left",
                                                    fontWeight: "normal"
                                                }}>{utils.getLabelByID("Type")}</label>
                                                <div className="form-group col-md-8">
                                                    <select id="dataType" className="form-control">
                                                        <option key="" value="">--select--</option>
                                                        {
                                                            state.typeData.adhoc_datatype &&
                                                            state.typeData.adhoc_datatype.map((option, index) => {
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
                                <div className="col-md-12">
                                    <div className="form-actions right">
                                        <div className="form-group col-md-12">
                                            <div className="btn-toolbar pull-right">
                                                <button type="submit" className="btn btn-default" onClick={addPeer}><i
                                                    className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Criteria")} </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <Table
                                            gridColumns={utils.getGridColumnByName("reportCtr")}
                                            gridData={state.List}
                                            export={false}
                                            componentFunction={ActionHandlers}
                                            pagination={false} />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <div className="form-group col-md-12">
                                                    <div>
                                                        <label className="form-group control-label" style={{
                                                            textAlign: "left",
                                                            fontWeight: "normal"
                                                        }}>{utils.getLabelByID("SQl Query for Count")}</label>
                                                        <textarea type="text" disabled={!isOwner} className="form-control" id="queryStrCnt" rows="4"
                                                            value={state.reportContainer.queryStr}
                                                            onChange={onInputChange}
                                                            style={{ resize: "none", width: "100%" }} />
                                                    </div>
                                                    <div>
                                                        <label className="form-group control-label" style={{
                                                            textAlign: "left",
                                                            fontWeight: "normal"
                                                        }}>{utils.getLabelByID("SQl Query for filters")}</label>
                                                        <textarea type="text" disabled={!isOwner} className="form-control" id="queryStr" rows="4"
                                                            value={state.reportContainer.queryStr}
                                                            onChange={onInputChange}
                                                            style={{ resize: "none", width: "100%" }} />
                                                    </div>
                                                    
                                                    <b><i>Note: Limit and offset will be added automatically</i></b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="submit" onClick={testQuery}
                                                className="btn btn-default">{' '}
                                                <i className="fa fa-flask" aria-hidden="true"></i>
                                                {utils.getLabelByID("Simulate Query")}
                                            </button>
                                        </div>
                                    </div>

                                    <br />

                                    <div id={"loader-adhoc"} className="col-md-12"
                                        style={{ marginTop: "10px", display: state.gridLoading ? 'block' : 'none' }}>
                                        <pre>{state.text}</pre>
                                    </div>

                                    {state.columnList.length > 0 &&
                                        <div className="col-md-12" style={{ overflow: "scroll" }}>
                                            <h4>Result Set</h4>
                                            <Table
                                                gridColumns={state.columnList}
                                                gridData={state.resultSet}
                                                export={false}
                                                componentFunction={ActionHandlers}
                                                pagination={false} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                </div>
            </div>
        </div>
    );
}
export default ReportForm;
