import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import * as constants from '../../../../core/constants/Communication.js';
import * as utils from '../utils.js';
import InnerGrid from './innerGrid.jsx';
import configTag from '../../../../config.js';

let tempGridData = {
    "message": "Successfully Uploaded",
    "status": "ok",
    "contextData": []
};

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: _.cloneDeep(tempGridData)
        };
        let ReactDOMServer = require('react-dom/server');
        let contextID = utils.CreateGuid();
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: this.props.allowedFileType|| ".txt",
            createImageThumbnails: true,
            thumbnailWidth: 200,
            params: {
                "context": contextID,
                "type": this.props.type,
                "source": this.props.source
            },
            headers: { "token": sessionStorage.token },
            thumbnailMethod: 'contain',
            dictDefaultMessage: utils.getLabelByID("FU_dropMessage"),
            dictRemoveFile: utils.getLabelByID("FU_removeFileMessage"),
            maxFiles: this.props.maxFiles
        };

        this.componentConfig = {
            iconFiletypes: ['.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: this.props.fileUploadURL || constants.uploadFile
        };

    }

    componentDidMount() {
        let gridData = { contextData: this.props.initialValues };
        this.setState({ gridData });
    }



    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        let gridData = { contextData: nextProps.initialValues };
        this.setState({ gridData });
    }

    successTransaction(file, responseJSON) {
        console.log("successTransaction");
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            $("#FILE_CONTENT").html(fileAsBinaryString);
            // do whatever you want with the file content
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);


        this.setState({
            gridData: responseJSON
        });
        this.props.getUploadResponse(responseJSON)
    }
    removedfile(file, let1) {
        let gridDataTemp = this.state.gridData;

        if (gridDataTemp.contextData) {
            for (let i = gridDataTemp.contextData.length; i--;) {
                if (gridDataTemp.contextData[i].name === file.name) {
                    gridDataTemp.contextData.splice(i, 1);
                }
            }
            this.setState(
                {
                    gridData: gridDataTemp
                }
            );
        }
        this.props.getRemoveResponse(file);
    }
    getAttachementGrid(showAttachementGrid) {
        if (showAttachementGrid) {
            
            console.log('this.state.gridData.contextData', this.state.gridData.contextData);
            return (
                    <InnerGrid TableClass="portlet light bordered sdg_portlet bg-default bg-font-default" 
                    fontclass="font-dark" title="Attachments"
                        gridColumns={utils.getGridColumnByName("downloadFileList")}
                        gridData={this.state.gridData.contextData}
                        showUpZone={this.props.showUpZone} />
                
            );
        }
    }
    render() {
        console.log("this.props.showDropzone-->", this.props.showDropzone)
        console.log("this.props.showUpZone-->", this.props.showUpZone)
        console.log("this.props.showAttachementGrid -- >> ",this.props.showAttachementGrid)
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        const eventHandlers = {
            success: this.successTransaction.bind(this),
            removedfile: this.removedfile.bind(this)
        };
        return (
            <div>
                {this.getAttachementGrid(this.props.showAttachementGrid)}
               
                {this.props.showDropzone &&
                    <div>
                        <div className="alert alert-info">
                            <strong> {"Allowed Files: "}</strong> {this.props.acceptedFiles || configTag.allowedUploadFilesMessage}
                        </div>
                        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} /> </div>}
            </div>
        );
    }
}

export default FileUploader;