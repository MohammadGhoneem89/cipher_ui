/*standard imports*/
import React, {PropTypes} from 'react';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const ErrorCodeForm = ({onInputChange, addPeer, state, ActionHandlers, flag, isOwner}) => {

  return (
    <Portlet title={utils.getLabelByID("Error Code List")}>
      <div className="row" id={'form'}>
        <div className=" col-md-12">

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("Code")}</label>
              <div className="form-group col-md-8">
                <input type="text" disabled={!isOwner} className="form-control" id="code" onChange={onInputChange}
                       value={state.code}/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("description")}</label>
              <div className="form-group col-md-8">
                    <textarea type="text" disabled={!isOwner} className="form-control" id="description" rows="4"
                              style={{resize: "none", width: "100%"}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="form-actions right">
                  <div className="form-group col-md-12">
                    <div className="btn-toolbar pull-right">
                      <button type="submit" className="btn btn-default" disabled={!isOwner} onClick={addPeer}><i
                        className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Error Code")} </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Table
                    gridColumns={utils.getGridColumnByName("errorCodes")}
                    gridData={state.errorCodeList}
                    export={false}
                    componentFunction={ActionHandlers}
                    pagination={false}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      < /Portlet>
        );
        }
        export default ErrorCodeForm;
