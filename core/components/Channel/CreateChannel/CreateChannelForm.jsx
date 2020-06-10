
import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';
import FileUploader from '../../../common/FileUploader.jsx';
import Table from '../../../common/Datatable.jsx';
import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../../common/FormControls.jsx';

const Document = ({ updateState, initState }) => {
    function getUploadResponse(data) {
        let document = [];
        for (let i = 0; i < data.contextData.length; i++) {
            document = {
                "fileDetail": data.contextData[i].fileDetail,
                "documentName": data.contextData[i].name,
                "fileType": data.contextData[i].ext,
                "retreivalPath": data.contextData[i].path,
                "documentHash": data.contextData[i].hash,
                "actions": data.contextData[i].actions
            };
        }
        //documents.push(...data.contextData);
        updateState({ documents: [document] })
    }
    function getRemoveResponse(file) {
        if (file.accepted === true) {
            let doc = initState.documents.pop();
            updateState({ documents: file });
        }
    }

    return (<div className="row">
        <div className="col-centered col-md-12">
            <div className="col-centered col-md-12">
                <div className="form-group">
                    <FileUploader type="Document" source="Channel"
                        initialValues={initState.documents}
                        allowedFileType=".tx"
                        acceptedFiles="channel configuration files to be uploaded with extention *.tx"
                        getUploadResponse={getUploadResponse}
                        getRemoveResponse={getRemoveResponse}
                        maxFiles="1"
                        showDropzone={!initState.readOnly}
                        showAttachementGrid={true} />
                </div>
            </div>
        </div>
    </div>);
};



const CreateChannelForm = ({ flag, updateState, initState, onInputChange, formSubmit, createChannel, onInputNetwork, ActionHandlers, onInputChangeCbl }) => {

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
                                                <label className="control-label">{utils.getLabelByID("Blockchain Type")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="type" disabled={flag} name="type" onChange={onInputChange} value={initState.channelData.type} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.typeData.BLCHN_TYPE.map((option, index) => {
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
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" disabled={flag} name="channelName" value={initState.channelData.channelName} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Network")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="network" name="network" disabled={flag} onChange={onInputNetwork} value={initState.channelData.network} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.networkTypeList.map((option, index) => {
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
                                            <Document initState={initState} updateState={updateState} />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("Network_Peers")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <Table gridColumns={utils.getGridColumnByName("PeerList")}
                                                    gridData={initState.networkPeerList}
                                                    fontclass=""
                                                    componentFunction={ActionHandlers}
                                                    pagination={false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("Create_Status")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <textarea disabled className="form-control" id="createstatus" value={initState.channelData.status} rows="8" cols="150" type="text">

                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("Participating Organizations")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    <div className="icheck-list">
                                                        {initState.orgTypeList.map((sd, index) => (
                                                            <label key={index} className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                                                <label>{sd.label}</label>
                                                                <input type="checkbox" className="form-control" onChange={onInputChangeCbl} name={"iscbList-" + index} id={"iscbList-" + index} checked={sd.isChecked && sd.isChecked === true ? true : false} />
                                                                <span></span>
                                                            </label>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right ">
                                                    <button type="submit" onClick={createChannel} className="btn btn-green" > Create Channel </button>
                                                    <button type="submit" onClick={formSubmit} className="btn btn-info" > Save </button>
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