
import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';
import FileUploader from '../../../common/FileUploader.jsx';
import Table from '../../../common/Datatable.jsx';

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
                        allowedFileType=".zip"
                        acceptedFiles="smartContract package to be uploaded with extention *.zip"
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



const CreateSmartContractForm = ({ updateState, initState, onInputChange, formSubmit, createChannel, onInputChannel, ActionHandlers,flag }) => {

    return (
        <div className="form-body" >
            <div>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("SmartContract")}</span></div>
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
                                                <select id="type" name="type" disabled={flag} onChange={onInputChange} value={initState.smartContractData.type} className="form-control">
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
                                                <label className="control-label">{utils.getLabelByID("Channel Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="channelID" name="channelID"  disabled={flag} onChange={onInputChannel} value={initState.smartContractData.channelID} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.channelTypeList.map((option, index) => {
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
                                                <label className="control-label">{utils.getLabelByID("smartContract_Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" name="smartContract"  disabled={flag} value={initState.smartContractData.smartContract} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("smartContract_Version")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" name="smartContractVersion" value={initState.smartContractData.smartContractVersion} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("smartContractMethod")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" name="smartContractMethod" value={initState.smartContractData.smartContractMethod} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("sequence")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" name="sequence" value={initState.smartContractData.sequence} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("packageIdentifier")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" name="packageIdentifier" value={initState.smartContractData.packageIdentifier} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label bold">{utils.getLabelByID("smartContractArgs")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <textarea type="text" className="form-control" name="smartContractArgs"value={initState.smartContractData.smartContractArgs}  onChange={onInputChange} rows="4" style={{ resize: "none", width: "100%" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row"  style={{ marginTop: "20px"}}>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label bold">{utils.getLabelByID("endorsementPolicy")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <textarea type="text" className="form-control" name="endorsementPolicy" value={initState.smartContractData.endorsementPolicy} onChange={onInputChange} rows="4" style={{ resize: "none", width: "100%" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: "20px"}}>
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
                                                <label className="control-label bold">{utils.getLabelByID("SmartContractCreate_Status")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <textarea disabled className="form-control" id="createstatus" value={initState.smartContractData.status} rows="8" cols="150" type="text">

                                                </textarea>
                                            </div>
                                        </div>
                                    </div></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right ">
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
export default CreateSmartContractForm