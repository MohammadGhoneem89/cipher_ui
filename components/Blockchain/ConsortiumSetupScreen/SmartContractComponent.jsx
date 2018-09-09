import React from 'react';
import Portlet from '../../../core/common/Portlet.jsx';
import Table from '../../../core/standard/Datatable.jsx';
import SmartContractForm from './SmartContractForm.jsx';
import FileUploader from '../../../core/components/FileUploader.jsx';
import config from '../../../config';
import * as utils from '../../../core/common/utils.js';

const SmartContractComponent = ({updateState, containerState, onCompile}) => {
    let smartContractTemplates = containerState.consortiumDetail.smartContractTemplates;
    let files;
    let details;

    function templateChanges(data) {
        details = data;
    }
    new window.FileReader();
    return (
        <div className="row">
            <div className="col-md-12">
                <Portlet title={"Templates"} isPermissioned={true} actions={[]}>
                    <Table
                        pagination={false}
                        export={false}
                        search={false}
                        gridType={"smartContractTemplates"}
                        componentFunction={item => {
                            switch (item.actionName) {
                                case 'Deploy':
                                    updateState({index: item.index, deployModelsOpen: true});
                                    break;
                            }
                        }}
                        gridColumns={utils.getGridColumnByName("smartContractTemplates")}
                        gridData={smartContractTemplates}
                    />
                </Portlet>
                <Portlet title={"Define Smart Contract Template"}>
                    <SmartContractForm onChange={templateChanges} containerState={containerState}/>
                  {console.log(containerState.consortiumDetail.consortiumType)}
                    <FileUploader type="Document" source="smartContractUpload"
                                  acceptedFiles={containerState.consortiumDetail.consortiumType === "HyperLedger Fabric"? ".go":".sol"}
                                  getUploadResponse={msg => {
                                      if (msg && msg.contextData) {
                                          files = msg.contextData;
                                      }
                                  }}
                                  getRemoveResponse={() => {
                                  }}
                                  maxFiles={config.smartContractMaxUpload} showAttachementGrid={false}
                                  showDropzone={true}/>
                </Portlet>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button id="SmartContractCompileBtn" className="btn green" onClick={() => {
                                    updateState({isLoading: true});
                                    onCompile({files, details})
                                }}>
                                    Compile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartContractComponent;





