/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
//import * as constants from "../../../core/constants/Communication";
import Combobox from '../../../core/common/Select.jsx';
import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import * as gen from '../common/generalActionHandler'


//import * as utils from '../common/utils.js';
import * as utils from '../../../core/common/utils.js';

import Portlet from '../../../core/common/Portlet.jsx';
//import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import Input from '../../../core/common/Input.jsx';
import Checkbox from '../../../core/common/CheckBox.jsx';
import Table from '../../../core/common/Datatable.jsx';
import Textarea from '../../../core/common/Textarea.jsx';

class ApproveRedemptionContract extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            checked: false,
            valid: true,
            addShop:{},
            searchCriteria:{},
            gridData:[],
            contact:[
                {"serial_no": "1","name": "12212222","address": "555222","mobile": "7899","phone":"8087788","email":"mohammdamusa@gmail.com"},
                {"serial_no": "1","name": "12212222","address": "555222","mobile": "7899","phone":"8087788","email":"mohammdamusa@gmail.com"},
                {"serial_no": "1","name": "12212222","address": "555222","mobile": "7899","phone":"8087788","email":"mohammdamusa@gmail.com"},
                {"serial_no": "1","name": "12212222","address": "555222","mobile": "7899","phone":"8087788","email":"mohammdamusa@gmail.com"},
                {"serial_no": "1","name": "12212222","address": "555222","mobile": "7899","phone":"8087788","email":"mohammdamusa@gmail.com"},                
            ],
            redemptionTerm:[
                {"serial_no": "1","startDate": "12212222","endDate": "555222","paymentMethod": "7899","type":"8087788","value":"133","status":"Success"},
                {"serial_no": "1","startDate": "12212222","endDate": "555222","paymentMethod": "7899","type":"8087788","value":"133","status":"Success"},
                {"serial_no": "1","startDate": "12212222","endDate": "555222","paymentMethod": "7899","type":"8087788","value":"133","status":"Success"},
                {"serial_no": "1","startDate": "12212222","endDate": "555222","paymentMethod": "7899","type":"8087788","value":"133","status":"Success"},
                {"serial_no": "1","startDate": "12212222","endDate": "555222","paymentMethod": "7899","type":"8087788","value":"133","status":"Success"},
            ]
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }
   

    
    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
            ]));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            typeData: nextProps.typeData
        })
           
    }
    onChangeCheckbox() {
        this.setState({
          checked: !this.state.checked
        })
      }
    updateState = (data) => {
        this.setState(data);
    }


    render() {       
        return (
            <div className="row">
             
                <Portlet >
                    <div>

                    <div className="row">
                    
                        <div className="row">

                            <div className="col-md-8" >

                                    <div className="row" >
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Name</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                        <input type="text" className="form-control" name="contractId" id="contractId" />
                                        </div>
                                    </div>
                                   </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Code</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                        <input type="text" className="form-control" name="contractId" id="contractId" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Category</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            {/**<input type="text" className="form-control" name="contractId" id="contractId" />
                                           */}
                                            <Combobox 
                                            fieldname='listOfferStatus' 
                                            formname='searchCriteria'
                                            state={this.state} //typeName="storeAs"
                                            typeName="listOfferStatus"
                                            dataSource={this.state.typeData} 
                                            multiple={false} 
                                            actionHandler={this.generalHandler} 
                                            style={{width:"400px",height:"35px"}}/>

                                        </div>
                                    </div>
                                </div>
                           </div>

                           <div className="col-md-4">
                            <img src="/assets/imgs/palceholder.jpg" />
                            </div>


                        </div>

                        

                    </div>

                     <br/>


                     {/**Type */}
                     <div className="row addShopBox">
                         <div className="row smilesImageText" ><b>TYPE</b></div>
                         <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="" style={{ opacity: '1' }}>
                                                            <div className="portlet-body flip-scroll">
                                                                <div className="row">
                                                                    <div className="col-md-10 col-md-offset-1">

                                                                        <div className="col-md-3 text-center">
                                                                            <div className="voucherBox">
                                                                                <img src="/assets/Resources/Redemption.png" width="20%" />
                                                                                
                                                                                <h5><strong>DISCOUNT</strong></h5>
                                                                                <div className="icheck-list">
                                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                                        <label></label>
                                                                                        <input  type="checkbox" name="Redemption" value=""  className="form-control" />
                                                                                        <span></span></label>
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
                    
                     {/**Type */}

                   



       {/** <div className="addShopBoxText" style={{ color: "#089729"  }}><b>OPENING HOURS</b></div> */}
                   




                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>Contact</b></div>
                                
                                <Table
                                    gridColumns={utils.getGridColumnByName("ApproveredemptionContractContact")}
                                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                    gridData={this.state.contact}
                                    //totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                //pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.currentPageNo}
                                    />
                            </div>


                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>REDEMPTION TERMS</b></div>
                                
                                <Table
                                    gridColumns={utils.getGridColumnByName("ApproveredemptionContractRedemptionTerm")}
                                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                    gridData={this.state.redemptionTerm}
                                    //totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                //pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.currentPageNo}
                                    />
                            </div>


                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>TERMS AND CONDITION</b></div>  
                                
                                    <Textarea
                                style={{ height: '120px' }}
                                fieldname='termsAndConditions'
                               // formname='contractParams'
                                columns='12'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                                    />
                            </div>


     

                    <div className="row clearfix pull-right" style={{marginTop:"30px"}}>
                                <div className="col-md-4">
                                <button type="button" className="btn default" >
                                    Approve
                                </button>
                                </div>
                            </div>
                             


                  </div>
                  
                </Portlet>
                   
            </div>
           
        );
    }
}

function mapStateToProps(state, ownProps) {
    //console.log(state.app)
    return {
        typeData: _.get(state.app, 'typeData.data', null),
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

ApproveRedemptionContract.displayName = "Add Offer";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveRedemptionContract);




/**
 *  <Portlet title={"TYPE"}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="" style={{ opacity: '1' }}>
                                <div className="portlet-body flip-scroll">
                                    <div className="row">
                                        <div className="col-md-10 col-md-offset-1">

                                            <div className="col-md-4 text-center">
                                                <div className="voucherBox">
                                                    <img src="/assets/Resources/Redemption.png" width="20%" />
                                                    <h5><strong>Redemption</strong></h5>
                                                    <div className="icheck-list">
                                                        <label className="mt-checkbox mt-checkbox-outline">
                                                            <label></label>
                                                            <input  type="checkbox" name="Redemption" value=""  className="form-control" />
                                                            <span></span></label>
                                                    </div>
                                                </div>
                                            </div>

                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

</Portlet>

 */