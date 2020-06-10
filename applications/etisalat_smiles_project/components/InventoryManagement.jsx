/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../../../core/actions/generalAction";
//import Portlet from '../../../core/common/Portlet.jsx';
import Portlet from '../common/Portlet.jsx';
import _ from 'lodash';
import * as requestCreator from '../../../core/common/request.js';
import FileUploader from '../../../core/common/FileUploader.jsx';
class InventoryManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
       
         }

    
    componentWillReceiveProps(nextProps) {
        
    }



    componentDidMount() {
      
    }
    
    render() {
        
        return (
            <div className="row">

                <Portlet title="Inventory Management">
                    <div className="row">
                        <div className="col-md-5 uploader-div">
                            <div className="utc-uploader">
                             <div className="utc-file-upload">
                             <h3>UPLOAD PRODUCT CATALOGUE</h3>
                             <img src="/assets/imgs/upload-icon.png" />
                         {/** 
                          *  <p>Drag files here to upload</p>
                          <p>Allowed Files: PDF, TIFF, JPEG</p>
                          <button type="submit" className="btn default wd75">BROWSE FILES</button>
                         */}
                             <FileUploader
                              type="Document" source="" title={"Upload Invoice"}
                              allowedFileType="image/jpeg,image/png,image/gif,pdf,csv,xls"
                              maxFiles="10"
                              showDropzone={true}
                              initialValues={[]}
                              getUploadResponse={this.getCSVresponse}
                              getRemoveResponse={this.getCSVRemoveResponse}
                              showAttachementGrid={false} />
                          
                              </div>
                             </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 uploader-div">
                            <div className="utc-uploader">
                                 <div className="utc-file-upload">
                                    <h3>UPLOAD PRODUCT INVENTORY</h3>
                                    <img src="/assets/imgs/upload-icon.png" />
                                    <FileUploader
                                    type="Document" source="" title={"Upload Invoice"}
                                    allowedFileType="image/jpeg,image/png,image/gif,pdf,csv,xls"
                                    maxFiles="10"
                                    showDropzone={true}
                                    initialValues={[]}
                                    getUploadResponse={this.getCSVresponse}
                                    getRemoveResponse={this.getCSVRemoveResponse}
                                    showAttachementGrid={false} />
                            
                                 </div>
                             </div>
                        </div>       
                 </div>
                 <div className="row clearfix pull-right">
                                <div className="col-md-2"></div>
                                <div className="col-md-4">
                                <button type="button" className="btn default" style={{ paddingRight: '50px',marginTop:"40px"}} >
                                    Next
                                </button>
                                </div>
                            </div>

                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
InventoryManagement.displayName = "Upload Product";
export default connect(mapStateToProps, mapDispatchToProps)(InventoryManagement);













