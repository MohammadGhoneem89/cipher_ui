
import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';
import FileUploader from '../../../common/FileUploader.jsx';
import Table from '../../../common/Datatable.jsx';




const PlaygroundForm = ({ updateState, initState, onInputChange, formSubmit, formSubmitQuery, onInputChannel, ActionHandlers, isReady }) => {

    return (
        <div className="form-body" >
            <div>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("SmartContractPlayGround")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>

                                </div>
                            </div>
                            <div className="portlet-body" id="Channel">
                                <div className="form-body ">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group col-md-2">
                                                <label className="control-label">{utils.getLabelByID("SmartContractInput")}</label>
                                            </div>
                                            <div className="form-group col-md-10">
                                                <select id="contractID" name="contractID" onChange={onInputChannel} value={initState.smartContractData.contractID} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.contractTypeList.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option.value}>{option.label}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group col-md-2">
                                                <label className="control-label">{utils.getLabelByID("smartContractMethodInput")}</label>
                                            </div>
                                            <div className="form-group col-md-10">
                                                <input className="form-control" name="smartContractMethod" value={initState.smartContractData.smartContractMethod} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label bold">{utils.getLabelByID("smartContractArgsInput")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <textarea type="text" className="form-control" name="smartContractArgs" value={initState.smartContractData.smartContractArgs} onChange={onInputChange} rows="4" style={{ resize: "none", width: "100%" }} />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("SmartContractCreate_Status")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <textarea disabled className="form-control" id="createstatus" value={initState.smartContractData.status} rows="13" cols="150" type="text">

                                                </textarea>
                                            </div>
                                        </div>
                                    </div></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right ">
                                                    <button type="submit" onClick={formSubmitQuery} disabled={!initState.isReady} className="btn btn-info" > Query </button>
                                                    <button type="submit" onClick={formSubmit} disabled={!initState.isReady} className="btn btn-info" > Invoke </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default PlaygroundForm