import FileUploader from './FileUploader.jsx';
import React, { PropTypes } from 'react';

const Document = ({ updateState, initState, getParentState, allowedFileType, acceptedFiles }) => {
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
        let state = _.clone(initState)
        state.documents.push(document)
        console.log("state--->", state)
        updateState(state)
    }
    function getRemoveResponse(file) {
        console.log("file--->", file)
        console.log("initStateremove-->", getParentState())
        if (file.accepted === true) {
            let docs = getParentState().documents
            console.log("docsBefore-->", docs)
            for (let i = 0; i < docs.length; i++) {
                if (file.name == docs[i].fileDetail.name) {
                    console.log("++", file.name)
                    console.log("--", docs[i])
                    docs.splice(i, 1)
                }
            }
            //console.log("docsAfter-->", docs)
            //let doc = initState.documents.pop();
            updateState({ documents: docs });
        }
    }

    return (<div className="row">
        <div className="col-centered col-md-12">
            <div className="col-centered col-md-12">
                <div className="form-group">
                    <FileUploader type="Document" source="Channel"
                        initialValues={initState.documents}
                        allowedFileType={allowedFileType}
                        acceptedFiles={acceptedFiles}
                        getUploadResponse={getUploadResponse}
                        getRemoveResponse={getRemoveResponse}
                        maxFiles={null}
                        showDropzone={!initState.readOnly}
                        showAttachementGrid={true} />
                </div>
            </div>
        </div>
    </div>);
};

export default Document;
