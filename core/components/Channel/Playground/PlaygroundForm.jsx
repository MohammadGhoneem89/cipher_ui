import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';


const PlaygroundForm = () => {

    return (
<form>
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("Playground")}</span></div>
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
                                                    <select id="LIST" name="LIST" className="form-control">
                                                        <option key="LIST" value="LIST"> LIST FROM CHANNEL</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("SmartContract_Name")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="LIST" name="LIST" className="form-control" >
                                                        <option key="LIST" value="LIST"> LIST</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Function_Name")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <input className="form-control" id="CN" type="text"></input>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("RequestType")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="LIST" name="LIST" className="form-control">
                                                        <option key="LIST" value="LIST(Invoke/Query)"> LIST (Invoke/Query)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Parameters")}</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group col-md-12">
                                                    <textarea disabled className="form-control" id="" rows="4" cols="150" type="text">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Response")}</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <textarea disabled className="form-control" id="" rows="4" cols="150" type="text">
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right ">
                                                        <button type="submit" className="btn btn-info" > Execute Request </button>
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
            </form >)}
            export default PlaygroundForm;