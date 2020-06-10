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
class VoucherManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.getCSVresponse = this.getCSVresponse.bind(this);
        // this.getCSVRemoveResponse = this.getCSVRemoveResponse.bind(this);
         }

    
    componentWillReceiveProps(nextProps) {
        
    }



    componentDidMount() {
      
    }
    // getCSVresponse(res) {
    //     console.log(res);
    //     this.setState({
    //       uploadedCSV: true
    //     })
    //   }
    //   getCSVRemoveResponse() {
    //     this.setState({
    //       uploadedCSV: false
    //     })
    //   }
    
    render() {
        
        return (
            <div className="row">

                <Portlet>
                    <div className="row">
                        <div className="col-md-5 uploader-div">
                            <div className="utc-uploader">
                             <div className="utc-file-upload">
                             <h3>Upload New Vouchers</h3>
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
                             <h3>Update Voucher Status</h3>
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
                                <button type="button" className="btn default" style={{ marginTop:"40px"}} >
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
VoucherManagement.displayName = "Upload Vouchers";
export default connect(mapStateToProps, mapDispatchToProps)(VoucherManagement);













