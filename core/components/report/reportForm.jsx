/*standard imports*/
import React, {PropTypes} from 'react';
import Portlet from '../../common/Portlet.jsx';

import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const ReportForm = ({onInputChange, addPeer, state, ActionHandlers, flag, isOwner, onSubmit, testQuery}) => {
  let options = {
    lineNumbers: true
  };
  return (
    <Portlet title={utils.getLabelByID("Report Add/Update")}>
      <div className="row" id={'form'}>
        <div className=" col-md-12">
          <div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Report Name")}</label>
                <div className="form-group col-md-8">
                  <input type="text" disabled={!isOwner} className="form-control" id="name" onChange={onInputChange}
                         value={state.reportContainer.name}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Description")}</label>
                <div className="form-group col-md-8">
                    <textarea type="text" disabled={!isOwner} className="form-control" id="description"
                              onChange={onInputChange} value={state.reportContainer.description} rows="4"
                              style={{resize: "none", width: "100%"}}/>
                </div>
              </div>
            </div>


          </div>


          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("Type")}</label>
              <div className="form-group col-md-8">
                <select id="reportType" className="form-control" value={state.reportContainer.reportType}
                        onChange={onInputChange}>
                  <option key="" value="">--select--</option>
                  {
                    state.typeData.adhoc_reptype &&
                    state.typeData.adhoc_reptype.map((option, index) => {
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
              }}>{utils.getLabelByID("Connection Type")}</label>
              <div className="form-group col-md-8">
                <select id="connectionType" className="form-control" value={state.reportContainer.connectionType}
                        onChange={onInputChange}>
                  <option key="" value="">--select--</option>
                  {
                    state.typeData.adhoc_conntype &&
                    state.typeData.adhoc_conntype.map((option, index) => {
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
              }}>{utils.getLabelByID("Connection String")}</label>
              <div className="form-group col-md-8">

                <select id="connectionString" name="connectionString" value={state.reportContainer.connectionString}
                        onChange={onInputChange} className="form-control">
                  <option value="">--select--</option>
                  {state.getEndpointListView.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>{option.text}</option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("Group")}</label>
              <div className="form-group col-md-8">
                <select id="group" className="form-control" multiple value={state.reportContainer.group}
                        onChange={onInputChange}>

                  {
                    state.groupList &&
                    state.groupList.map((option, index) => {
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
        <div className="col-md-12" id={'form'}>
          <div className="col-md-12">
            <div className=" col-md-12">
              <div className=" col-md-12"
                   style={{
                     padding: "20px",
                     border: "1px solid #EEE",
                     marginBottom: "20px"
                   }}
              >
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
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("Criteria Field")}</label>
                        <div className="form-group col-md-8">
                          <input type="text" className="form-control" id="fieldName"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("Test Value")}</label>
                        <div className="form-group col-md-8">
                          <input type="text" className="form-control" id="testVal"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("Enum")}</label>
                        <div className="form-group col-md-8">
                          <select id="span" className="form-control">
                            <option key="" value="">--select--</option>
                            {
                              state.enumList &&
                              state.enumList.map((option, index) => {
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
                      pagination={false}/>

                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-group control-label col-md-4" style={{
                          textAlign: "left",
                          fontWeight: "normal"
                        }}>{utils.getLabelByID("SQl Query")}</label>
                        <div className="form-group col-md-12">
                    <textarea type="text" disabled={!isOwner} className="form-control" id="queryStr" rows="4"
                              value={state.reportContainer.queryStr}
                              onChange={onInputChange}
                              style={{resize: "none", width: "100%"}}/>
                          <b><i>Note: above query will be executed on Test without filter criteria and will show only
                            varchar columns</i></b>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-md-12">
                    <div className="btn-toolbar pull-right">
                      <button type="submit" onClick={testQuery}
                              className="btn btn-default">{' '}
                        <i className="fa fa-flask" aria-hidden="true"></i>
                        {utils.getLabelByID("  Simulate Query")}
                      </button>
                      <button type="submit" onClick={onSubmit}
                              className="btn green">{' '}{utils.getLabelByID("Add / Update Report")}
                      </button>
                    </div>
                  </div>

                  <br/>

                  <div id={"loader-adhoc"} className="col-md-12" style={{marginTop: "10px" , display:state.gridLoading?'block':'none'}}>
                    <pre>{state.text}</pre>
                  </div>



                  {state.columnList.length > 0 &&
                  <div className="col-md-12" style={{overflow: "scroll"}}>
                    <h4>Result Set</h4>
                    <Table
                      gridColumns={state.columnList}
                      gridData={state.resultSet}
                      export={false}
                      componentFunction={ActionHandlers}
                      pagination={false}/>
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
    </Portlet>
  );
}
export default ReportForm;
