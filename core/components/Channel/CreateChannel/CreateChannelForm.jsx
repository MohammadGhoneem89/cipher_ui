
import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';

const CreateChannelForm = () => {

    return (
        <div className="form-body" >
            <div>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("Channel")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>

                                </div>
                            </div>
                            <div className="portlet-body" id="Channel">
                                <div className="form-body ">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" id="CN" type="text"></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <button className="btn btn-default" type="text">Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Create_Channel")}</label>
                                            </div>
                                            <div className="form-group col-md-3">
                                                <input className="form-check-input" style={{ width: '23px', height: '20px' }} type="checkbox"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Network")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="network" name="network" className="form-control">
                                                    <option key="network" value="network">Network LIST</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Create_Status")}</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <textarea disabled className="form-control" id="createstatus" rows="4" cols="150" type="text">

                                                </textarea>
                                            </div>
                                        </div>
                                    </div></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right ">
                                                    <button type="submit" className="btn btn-info" > Create & Save </button>
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
export default CreateChannelForm