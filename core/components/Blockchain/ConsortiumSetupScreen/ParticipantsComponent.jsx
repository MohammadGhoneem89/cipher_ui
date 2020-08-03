import React from 'react';
import Portlet from '../../../common/Portlet.jsx';
import Table from '../../../common/Datatable.jsx';
import * as utils from '../../../common/utils.js';

const ParticipantsComponent = ({ updateState, containerState ,editconsortium}) => {
    let participants = containerState.consortiumDetail.consortiumData.participants;
    let directParticipants = [];
    let indirectParticipants = [];
    console.log(JSON.stringify(containerState.consortiumDetail.consortiumData.participants))
    participants.forEach(element => {

        let tupple = {
            "orgType": "Orginization",
            "orgCode": element.organizationName,
            "status": {
                value: "ACTIVE",
                type: "INFO"
            }
        }
        if (element.particapantType == "DIRECT") {
            directParticipants.push(tupple);
        } else if (element.particapantType == "INDIRECT") {
            indirectParticipants.push(tupple);
        }
    });


    return (
        <div>
            <div className="row">
                <div className="col-md-12">
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

            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="note note-warning" style={{ textAlign: "center" }}>
                        Edit consortium to associate more <strong>Participants</strong>. <a href="javascript:" onClick={editconsortium}> (Edit)</a> </div>
                </div>
            </div>
        </div >
    );
};

export default ParticipantsComponent;





