/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
//import * as constants from "../../../core/constants/Communication";

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

class AddNewMerchant extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            checked: false,
            valid: true,
            addShop:{},
            gridData:[
                {"serial_no": "1","shopCode": "12212222","locationX": "555222","locationY": "7899"},
                {"serial_no": "1","shopCode": "12212222","locationX": "555222","locationY": "7899"},
                {"serial_no": "1","shopCode": "12212222","locationX": "555222","locationY": "7899"},
                {"serial_no": "1","shopCode": "12212222","locationX": "555222","locationY": "7899"},
                {"serial_no": "1","shopCode": "12212222","locationX": "555222","locationY": "7899"},
            ]
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }
   

    
    componentWillMount() {
    }

    componentDidMount() {
    
    }



    componentWillReceiveProps(nextProps) {
           
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

                                    <div className="row" style={{marginBottom:"20px",marginLeft:"10px"}}>
                                        <div className="col-md-2 ">Partner Code</div>
                                        <div className="col-md-2">YGAG</div>
                                   </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Merchant Code</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" name="contractId" id="contractId" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Merchant Rank</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" name="contractId" id="contractId" />
                                        </div>
                                    </div>
                                </div>
                           </div>

                           <div className="col-md-4">
                            <img src="/assets/imgs/palceholder.jpg" />
                            </div>


                        </div>

                        

                    </div>

       {/** <div className="addShopBoxText" style={{ color: "#089729"  }}><b>OPENING HOURS</b></div> */}
                    <div className="row addShopBox" >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Name (En)</label>
                            </div>
                            <div className="form-group col-md-8">
                                <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />                  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Name (Ar)</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Contact Name</label>
                            </div>
                            <div className="form-group col-md-8">
                                <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />                  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Phone No</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Moblie No</label>
                            </div>
                            <div className="form-group col-md-8">
                                <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />                  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Email</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Partner Type</label>
                            </div>
                            <div className="form-group col-md-8">
                                <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />                  
                            </div>
                        </div>
                    </div>


                        <div>
                            <Checkbox
                            fieldname='isActive'
                            formname='addShop'
                            value={this.state.checked}
                            columns='1'
                            style={{}}
                            actionHandler={this.onChangeCheckbox}
                            disabled={false}
                            />
                            {/** <label htmlFor="checkbox">is Active</label>*/}
                            <label style={{marginLeft:"-70px"}}>is Active</label>
                        </div>


                        <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Partner Description</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="row">
                                      <div className="col-md-1">Er</div>
                                      <div className="col-md-8">
                                        <Input 
                                            isValid={this.state.valid}
                                        //validationChecker={this.validationHandler} 
                                            required={true} 
                                            fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                            //errorMessage={'This field is required'}
                                            actionHandler={this.generalHandler } className="form-control"  />
                                        </div>  
                                </div>                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Ar</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Terms And Conditions</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="row">
                                      <div className="col-md-1">Er</div>
                                      <div className="col-md-8">
                                        <Input 
                                            isValid={this.state.valid}
                                        //validationChecker={this.validationHandler} 
                                            required={true} 
                                            fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                            //errorMessage={'This field is required'}
                                            actionHandler={this.generalHandler } className="form-control"  />
                                        </div>  
                                </div>                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Ar</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">What you get</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="row">
                                      <div className="col-md-1">Er</div>
                                      <div className="col-md-8">
                                        <Input 
                                            isValid={this.state.valid}
                                        //validationChecker={this.validationHandler} 
                                            required={true} 
                                            fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                            //errorMessage={'This field is required'}
                                            actionHandler={this.generalHandler } className="form-control"  />
                                        </div>  
                                </div>                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Ar</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>





                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">What you get Reduced</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="row">
                                      <div className="col-md-1">Er</div>
                                      <div className="col-md-8">
                                        <Input 
                                            isValid={this.state.valid}
                                        //validationChecker={this.validationHandler} 
                                            required={true} 
                                            fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                            //errorMessage={'This field is required'}
                                            actionHandler={this.generalHandler } className="form-control"  />
                                        </div>  
                                </div>                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Ar</label>
                            </div>
                            <div className="form-group col-md-8">
                                    <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />
                            </div>
                        </div>
                    </div>







                    </div>















                    <div className="row addShopBox">
                    <div className="row">
                              <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>OFFERS</b></div>
                        </div>
                   
                    <Portlet title={"TYPE"}>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="" style={{ opacity: '1' }}>
                                                            <div className="portlet-body flip-scroll">
                                                                <div className="row">
                                                                    <div className="col-md-10 col-md-offset-1">

                                                                        <div className="col-md-3 text-center">
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

                                                                        <div className="col-md-3 text-center">
                                                                            <div className="voucherBox">
                                                                                <img src="/assets/Resources/Accrual.png" width="20%" />
                                                                                <h5><strong>Accural</strong></h5>
                                                                                <div className="icheck-list">
                                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                                        <label></label>
                                                                                        <input  type="checkbox" name="Accrual"  value="" className="form-control" />
                                                                                        <span></span></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-3 text-center">
                                                                            <div className="voucherBox">
                                                                                <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                                                <h5><strong>Point Conversion</strong></h5>
                                                                                <div className="icheck-list">
                                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                                        <label></label>
                                                                                        <input  type="checkbox" name="pointConverstion"  className="form-control" />
                                                                                        <span></span></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-3 text-center">
                                                                            <div className="voucherBox">
                                                                                <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                                                <h5><strong>Point Conversion</strong></h5>
                                                                                <div className="icheck-list">
                                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                                        <label></label>
                                                                                        <input  type="checkbox" name="pointConverstion"  className="form-control" />
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



                        <div className="row imageDiv">
                         <div className="row smilesImageText" ><b>BARCODE TYPE</b></div>
                            <div className="row" style={{marginLeft:"50px"  }}>
                                <div className="col-md-3">
                                    <div className="row" style={{marginLeft:"50px", color:"#E0E0E0" }}><b>CODE 123</b></div> 
                                    <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row" style={{marginLeft:"50px", color:"#E0E0E0"}}><b>CODE 123</b></div> 
                                    <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row" style={{marginLeft:"50px", color:"#E0E0E0" }}><b>CODE 123</b></div> 
                                    <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row" style={{marginLeft:"50px", color:"#E0E0E0" }}><b>CODE 123</b></div> 
                                    <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row addShopBox">
                        <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>PRODUCTS</b></div>
                        <div className="row newMerchantDiv">
                        <div className="row" style={{marginLeft:"50px", color:"#E0E0E0", marginBottom:"20px" }}><b>Allow Catalog upload</b></div>
                               <div className="row">
                                    <div className="col-md-6">
                                        <Checkbox
                                        fieldname='isActive'
                                        formname='addShop'
                                        value={this.state.checked}
                                        columns='1'
                                        style={{}}
                                        actionHandler={this.onChangeCheckbox}
                                        disabled={false}
                                        />
                                        {/** <label htmlFor="checkbox">is Active</label>*/}
                                        <label htmlFor="checkbox">User Interface</label>
                                    </div>
                                    <div className="col-md-6">
                                        <Checkbox
                                        fieldname='isActive'
                                        formname='addShop'
                                        value={this.state.checked}
                                        columns='1'
                                        style={{}}
                                        actionHandler={this.onChangeCheckbox}
                                        disabled={false}
                                        />
                                        {/** <label htmlFor="checkbox">is Active</label>*/}
                                        <label htmlFor="checkbox">Listner</label>
                                    </div>
                                </div>
                        </div>
                    </div>





                        <div className="row addShopBox">
                                    <div className="row">
                                            <div className="col-md-6">
                                                <Checkbox
                                                fieldname='isActive'
                                                formname='addShop'
                                                value={this.state.checked}
                                                columns='1'
                                                style={{}}
                                                actionHandler={this.onChangeCheckbox}
                                                disabled={false}
                                                />
                                                {/** <label htmlFor="checkbox">is Active</label>*/}
                                                <label htmlFor="checkbox">Escrow Purchase</label>
                                            </div>
                                        </div>                       
                        </div>

                    <div className="row clearfix addShopBox">
                           <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>SHOP</b></div>
                            <div className="pull-right">
                                <div className="col-md-2"></div>
                                <div className="col-md-6"><button type="submit" className="btn green">Add </button></div>
                        </div>
                        
                        <Table
                               gridColumns={utils.getGridColumnByName("AddNewMerchant")}
                            //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                            gridData={this.state.gridData}
                            //totalRecords={this.state.totalRecords}
                            pageSize={10}
                           //pageChanged={this.pageChanged}
                            pagination={true}
                             activePage={this.state.currentPageNo}
                               />
                    </div>

                    <div className="row clearfix pull-right" style={{marginTop:"30px"}}>
                                <div className="col-md-4">
                                <button type="button" className="btn default" >
                                    Save
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
        
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

AddNewMerchant.displayName = "View / Edit Merchnats";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewMerchant);





/**
 * <div className="row">
                              <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>OFFERS</b></div>
                        </div>
                            <div className="row imageDiv">
                                    <div className="row smilesImageText" ><b>VOUCHER CODE GENERATION</b></div>
                                    <div className="row" style={{marginLeft:"50px"  }}>
                                        <div className="col-md-3"><img src="/assets/imgs/partnerdynamic.jpg" className="smilesImage"/></div>
                                        <div className="col-md-3"><img src="/assets/imgs/etisalat.jpg" className="smilesImage"/></div>
                                        <div className="col-md-3"><img src="/assets/imgs/partnerdynamic.jpg" className="smilesImage"/></div>
                                        <div className="col-md-3"><img src="/assets/imgs/clockchain.jpg" className="smilesImage"/></div>
                                        
                                    </div>
                            </div>
 */