/*standard imports*/
import React, {PropTypes} from 'react';
import Portlet from '../../common/Portlet.jsx';

import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';

const ReportForm = ({onInputChange, addPeer, state, ActionHandlers, flag, isOwner, onSubmit, testQuery,formLoading}) => {
  let options = {
    lineNumbers: true
  };
  return (
    <Portlet title={utils.getLabelByID("Document Type Add/Update")}>
      <div className="row" id={'form'}>
        <div className=" col-md-12">
          <div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-group control-label col-md-4" style={{
                  textAlign: "left",
                  fontWeight: "normal"
                }}>{utils.getLabelByID("Document Name")}</label>
                <div className="form-group col-md-8">
                  <input type="text" disabled={!isOwner} className="form-control" name="documentName" id="name" onChange={onInputChange}
                         value={state.Container.name}/>
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
                    <textarea type="text" disabled={!isOwner} className="form-control" name="description" id="description"
                              onChange={onInputChange} value={state.Container.description} rows="4"
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
                <input type="text" disabled={!isOwner} className="form-control" name="documentType" id="documentType" onChange={onInputChange}
                       value={state.Container.documentType}/>
              </div>
            </div>
          </div>


          <div className="col-md-6">
            <div className="form-group">
              <label className="form-group control-label col-md-4" style={{
                textAlign: "left",
                fontWeight: "normal"
              }}>{utils.getLabelByID("Owner Org Type")}</label>
              <div className="form-group col-md-8">
                <select id="ownerOrgType" className="form-control" name="ownerOrgType" value={state.Container.ownerOrgType}
                        onChange={onInputChange}>
                  <option key="" value="">--select--</option>
                  {
                    state.typeData.ORG_TYPES &&
                    state.typeData.ORG_TYPES.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>{option.label}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" disabled={formLoading} onClick={onSubmit}
                        className="btn green">{' '}{utils.getLabelByID("Add / Update Doc Type")}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Portlet>
  );
}
export default ReportForm;
