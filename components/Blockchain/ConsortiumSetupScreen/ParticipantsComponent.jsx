import React from 'react';
import Portlet from '../../../core/common/Portlet.jsx';
import Table from '../../../core/standard/Datatable.jsx';
import * as utils from '../../../core/common/utils.js';

const ParticipantsComponent = ({updateState, containerState}) => {
    let ownerDetails = containerState.consortiumDetail.owner;
    let directParticipants = containerState.consortiumDetail.directParticipants;
    let indirectParticipants = containerState.consortiumDetail.indirectParticipants;

    return (
        <div className="row">
            <div className="col-md-12">
                <Portlet title={"Owner Details"} isPermissioned={true} actions={[]}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("Cipher_ConsortiumOwnerType")}</label>
                                <div className="col-md-7">
                                    <p className="form-control-static"> {ownerDetails.orgType} </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label col-md-5" style={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}>{utils.getLabelByID("Cipher_ConsortiumOwnerCode")}</label>
                                <div className="col-md-7">
                                    <p className="form-control-static"> {ownerDetails.orgCode} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portlet>
                <Portlet title={"Direct Participants"} isPermissioned={true} actions={[]}>
                    <Table
                        pagination={false}
                        export={false}
                        search={false}
                        gridType={"directParticipants"}
                        gridColumns={utils.getGridColumnByName("consortiumParticipants")}
                        gridData={directParticipants}
                    />
                </Portlet>
                <Portlet title={"Indirect Participants"} isPermissioned={true} actions={[]}>
                    <Table
                        pagination={false}
                        export={false}
                        search={false}
                        gridType={"indirectParticipants"}
                        gridColumns={utils.getGridColumnByName("consortiumParticipants")}
                        gridData={indirectParticipants}
                    />
                </Portlet>
            </div>
            {Object.keys(directParticipants).length<=0  &&
            <div className="alert alert-info" style={{textAlign: "center"}}>
                <strong>Info!</strong> No direct participants has been added to this blockchain yet. </div>}
        </div>
    );
};

export default ParticipantsComponent;





