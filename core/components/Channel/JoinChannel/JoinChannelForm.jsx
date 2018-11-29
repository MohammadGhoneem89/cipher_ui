import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';
import Table from '../../../common/Datatable.jsx';

const JoinChannelForm = () => {

    return (
        <form >
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("JoinChannel")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>

                                    </div>
                                </div>
                                <div className="portlet-body" id="Channel">
                                    <div className="form-body ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Network")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="LIST-DDL" name="LIST-DDL" className="form-control">
                                                        <option key="LIST-DDL" value="LIST-DDL">LIST-DDL</option>

                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="LIST" name="LIST" className="form-control">
                                                        <option key="LIST" value="LIST">LIST</option>

                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("PeerList")}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Table gridColumns={utils.getGridColumnByName("PeerList")}
                                                    gridData={[{ peername: "peer()", Network: "RECON 1", action: "Join Channel" }]}
                                                    title={utils.getLabelByID("PeerList")}
                                                    fontclass=""
                                                    TableClass="portlet light bordered sdg_portlet"
                                                    totalRecords={10}
                                                    // searchCallBack={this.searchCallBack} 
                                                    // pageSize={5}
                                                    // pageChanged={this.pageChanged}
                                                    pagination={false}
                                                // activePage={this.state.pageNumner}
                                                />


                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Join_Status")}</label>
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </form >)}
            export default JoinChannelForm;