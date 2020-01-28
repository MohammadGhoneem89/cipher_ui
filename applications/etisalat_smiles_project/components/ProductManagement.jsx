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
import DateControl from "../../../core/common/DateControl.jsx";
import Map from "./Charts/Map.jsx";
import FileUploader from '../../../core/common/FileUploader.jsx';

class ProductManagement extends React.Component {

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
                    {/**
                     *  <img
                    id="UserProfilePic"
                    src="/assets/imgs/palceholder.jpg"
                   // onError={this.addDefaultSrc}
                    className="img-responsive img-thumbnail" alt="Profile Image" width='150px'
                    height='150px'
                    style={{ ...imgStyle }}
                    //ref={input => this.logo = input}
                />
                 
                <br />

                <button
                    className="btn green"
                    style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
                    onClick={() => {
                        this.profilePicUploader.click();
                    }}
                >
                    {"Upload Image"}
                </button>
                     */}
                   

                    <div className="row">
                    
                        <div className="row">

                            <div className="col-md-8" >

                                    
                                   <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Partner Code</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                        YGAG
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Merchant Name</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            Baskin Robins
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Product Code</label>
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
                        

                    <div className="row" style={{marginTop:"50px"}}>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Title En</label>
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
                                <label className="control-label">Description</label>
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
                                <label className="control-label">Brand Description</label>
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
                                <label className="control-label">Terms and Condition</label>
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
                                <label className="control-label">Ar</label>
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


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Additional T & C</label>
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
                                <label className="control-label">Ar</label>
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



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Tag Name</label>
                            </div>
                            <div className="form-group col-md-6">
                                <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />               
                            </div>
                              <div className="col-md-2">
                                        <button type="button" className="btn default" >
                                            Add
                                        </button>
                                    </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Ar</label>
                            </div>
                            <div className="form-group col-md-6">
                                <Input 
                                    isValid={this.state.valid}
                                //validationChecker={this.validationHandler} 
                                    required={true} 
                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                    //errorMessage={'This field is required'}
                                    actionHandler={this.generalHandler } className="form-control"  />                  
                            </div>
                            <div className="col-md-2">
                                        <button type="button" className="btn default" >
                                            Add
                                        </button>
                                    </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                               
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
                                <label className="control-label">Ar</label>
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




                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">What you get</label>
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
                                <label className="control-label">Ar</label>
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


                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Start Date</label>
                        </div>
                        <div className="form-group col-md-8">
                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">End Date</label>
                        </div>
                        <div className="form-group col-md-8">
                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                        </div>
                    </div>



                   

                   
                    
                   
                  
                   <div className="row OfferManagementSpecDiv" style={{marginTop:"50px"}}>
                       <div className="row smilesImageText" ><b>SPECS</b></div>
                           <div className="row" style={{marginLeft:"50px"  }}>
                                <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Type</label>
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
                           <div className="row" style={{marginLeft:"50px"  }}>
                                <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Name En</label>
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
                                            <label className="control-label">Ar</label>
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
                           <div className="row" style={{marginLeft:"50px"  }}>
                                 <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Variation En</label>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input 
                                                isValid={this.state.valid}
                                            //validationChecker={this.validationHandler} 
                                                required={true} 
                                                fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                                //errorMessage={'This field is required'}
                                                actionHandler={this.generalHandler } className="form-control"  />               
                                        </div>
                                        <div className="col-md-2">
                                                    <button type="button" className="btn default" >
                                                        Add
                                                    </button>
                                                </div>
                                    </div>
                                 <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Ar</label>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <Input 
                                                isValid={this.state.valid}
                                            //validationChecker={this.validationHandler} 
                                                required={true} 
                                                fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                                //errorMessage={'This field is required'}
                                                actionHandler={this.generalHandler } className="form-control"  />                  
                                        </div>
                                        <div className="col-md-2">
                                                    <button type="button" className="btn default" >
                                                        Add
                                                    </button>
                                        </div>
                                    </div>
                                 </div>

                                 <div className="row" style={{marginLeft:"50px"  }}>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-4"></div>
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
                                            <label className="control-label">Ar</label>
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


                               <Table
                                    gridColumns={utils.getGridColumnByName("ListOffers")}
                                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                    gridData={this.state.gridData}
                                    //totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                //pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.currentPageNo}
                                    />





                   </div>





                   <div className="row OfferManagementShowSectionDiv" style={{marginTop:"50px"}}>
                       <div className="row smilesImageText" ><b>SHOW IN SECTION</b></div>
                           <div className="row" style={{marginLeft:"50px"  }}>
                                  <div className="col-md-3">
                                                <div className="row" style={{marginBottom:"20px"  }}>
                                                    New order
                                                </div>
                                                <div className="row">
                                                <Checkbox
                                                    fieldname='isActive'
                                                    formname='addShop'
                                                    value={this.state.checked}
                                                    columns='1'
                                                    style={{}}
                                                    actionHandler={this.onChangeCheckbox}
                                                    disabled={false}
                                                    />
                                                </div>
                                    </div>
                                    <div className="col-md-3">
                                                <div className="row" style={{marginBottom:"20px"  }}>
                                                    Dod order
                                                </div>
                                                <div className="row">
                                                <Checkbox
                                                    fieldname='isActive'
                                                    formname='addShop'
                                                    value={this.state.checked}
                                                    columns='1'
                                                    style={{}}
                                                    actionHandler={this.onChangeCheckbox}
                                                    disabled={false}
                                                    />
                                                </div>
                                    </div>
                                    <div className="col-md-3">
                                                <div className="row" style={{marginBottom:"20px"  }}>
                                                    Gift order
                                                </div>
                                                <div className="row">
                                                <Checkbox
                                                    fieldname='isActive'
                                                    formname='addShop'
                                                    value={this.state.checked}
                                                    columns='1'
                                                    style={{}}
                                                    actionHandler={this.onChangeCheckbox}
                                                    disabled={false}
                                                    />
                                                </div>
                                    </div>
                                    <div className="col-md-3">
                                                <div className="row" style={{marginBottom:"20px"  }}>
                                                    Featured order
                                                </div>
                                                <div className="row">
                                                <Checkbox
                                                    fieldname='isActive'
                                                    formname='addShop'
                                                    value={this.state.checked}
                                                    columns='1'
                                                    style={{}}
                                                    actionHandler={this.onChangeCheckbox}
                                                    disabled={false}
                                                    />
                                                </div>
                                    </div>
                           </div>      
                           
                   </div>
                   

                   <div className="row imageDiv" style={{marginTop:"30px"}}>
                                <div className="row smilesImageText" ><b>PRICE</b></div>
                                    <div className="row" style={{marginLeft:"50px"  }}>
                                        <div className="col-md-6">           
                                            <div className="row" style={{marginLeft:"100px", marginBottom:"20px" }}> <img src="/assets/imgs/smiles.jpg" className="smilesImage"/></div>
                                            <div className="row" style={{marginLeft:"100px", width:"200px" }}>
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
                                            <div className="row" style={{marginLeft:"100px", marginBottom:"20px" }}> <img src="/assets/imgs/gift.jpg" className="smilesImage"/></div>
                                            <div className="row" style={{marginLeft:"100px" , width:"200px"}}>
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




                    </div>




                            <div className="row clearfix addShopBox">
                                <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>SHARING BONUS</b></div>
                                    
                                <div className="row" style={{marginTop:"50px"}}>
                                    <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Social Channel</label>
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
                                        <label className="control-label">Points</label>
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

                                
                                    <div className="pull-right">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-6"><button type="submit" className="btn green">Add </button></div>
                                    </div>
                                
                                <Table
                                    gridColumns={utils.getGridColumnByName("ListOffers")}
                                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                    gridData={this.state.gridData}
                                    //totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                //pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.currentPageNo}
                                    />
                            </div>





                            <div className="row clearfix addShopBox">
                           <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>SHOPS</b></div>
                             
                           <div className="row" style={{marginTop:"50px"}}>
                                <div className="col-md-12">
                                            <div className="form-group col-md-2">
                                                <label className="control-label">Shop</label>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <Input 
                                                    isValid={this.state.valid}
                                                //validationChecker={this.validationHandler} 
                                                    required={true} 
                                                    fieldname="fromOpeningHours" formname="addShop" state={this.state}
                                                    //errorMessage={'This field is required'}
                                                    actionHandler={this.generalHandler } className="form-control"  />                  
                                            </div>
                                            <div className="col-md-2"><button type="submit" className="btn green">Add </button></div>
                                            <div className="col-md-4">
                                                    <Checkbox
                                                        fieldname='isActive'
                                                        formname='addShop'
                                                        value={this.state.checked}
                                                        columns='1'
                                                        style={{}}
                                                        actionHandler={this.onChangeCheckbox}
                                                        disabled={false}
                                                        />
                                                        <label className="control-label">Apply on all shops</label>
                                            </div>
                                </div>
                             </div>


                              {/*Map */}
                  

                     
                   <div className="row">
                       <div className="col-md-8">
                       <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJn2Pqx6Pe_faA0DLLWUkHo1iXEOBXBvs"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        center={{ lat: parseFloat(-34.397), lng: parseFloat(150.64) }}
                        zoom={3}
                        disabled={true}
                         prelocation={[{
                            id: 0,
                            lat: parseFloat(-34.397),
                            lng: parseFloat(150.644)
                        },
                        {
                            id: 1,
                            lat: parseFloat(-40.397),
                            lng: parseFloat(160.644)

                        },
                        {
                            id: 2,
                            lat: parseFloat(-50.397),
                            lng: parseFloat(177.644)

                        }
                        ]}

                            
                         updateState={this.updateState}
                                    />
                       </div>
                       <div className="col-md-4 MapAxis">
                           <div className="row">
                                          <div className="col-md-4" style={{ border: "1px solid grey", width:"300px",marginBottom:"10px" }}>
                                             <label className="control-label">{utils.getLabelByID("Shop 1 Karama")}</label>
                                           </div>
                                           
                           </div>
                           <div className="row">
                                           <div className="col-md-4" style={{ border: "1px solid grey", width:"300px",marginBottom:"10px" }}>
                                              <label className="control-label">{utils.getLabelByID("Shop 2 Deira")}</label>
                                         </div>
                           </div>
                           <div className="row">
                                          <div className="col-md-4" style={{ border: "1px solid grey", width:"300px",marginBottom:"10px" }}>
                                             <label className="control-label">{utils.getLabelByID("Shop 3 Emirates hill")}</label>
                                           </div>                  
                           </div>
                           <div className="row">
                                          <div className="col-md-4" style={{ border: "1px solid grey", width:"300px",marginBottom:"10px" }}>
                                             <label className="control-label">{}</label>
                                           </div>                  
                           </div>


                       </div>
                   </div>



                  {/*Map */}


                
                     
                    </div>












                            
                    <div className="row clearfix addShopBox">
                           <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>CATEGORIES</b></div>
                             
                           <div className="row" style={{marginTop:"50px"}}>
                            <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Category</label>
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
                                <label className="control-label">Sub Category</label>
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

                           
                            <div className="pull-right">
                                <div className="col-md-2"></div>
                                <div className="col-md-6"><button type="submit" className="btn green">Add </button></div>
                            </div>
                        
                        <Table
                               gridColumns={utils.getGridColumnByName("ListOffers")}
                            //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                            gridData={this.state.gridData}
                            //totalRecords={this.state.totalRecords}
                            pageSize={10}
                           //pageChanged={this.pageChanged}
                            pagination={true}
                             activePage={this.state.currentPageNo}
                               />
                    </div>




                 



                    <div className="row clearfix addShopBox">
                           <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>APPLIED TO</b></div>
                           <div className="row">
                           <div className="col-md-2"></div>
                               <div className="col-md-4">
                                    <div className="row" style={{ color:"#089729", width:"300px" }}>
                                        <label className="control-label">{utils.getLabelByID("CUSTOMER TYPES")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey", width:"300px",paddingLeft:"20px" }}>
                                        <label className="control-label">{utils.getLabelByID("A")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey", width:"300px",paddingLeft:"20px"}}>
                                        <label className="control-label">{utils.getLabelByID("B")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey" , width:"300px",paddingLeft:"20px"}}>
                                        <label className="control-label">{utils.getLabelByID("C")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey" , width:"300px",paddingLeft:"20px"}}>
                                        <label className="control-label">{utils.getLabelByID("D")}</label>
                                    </div>
                               </div>

                               <div className="col-md-4">
                                    <div className="row" style={{ color:"#089729", width:"300px" }}>
                                        <label className="control-label">{utils.getLabelByID("EXCLSION TYPES")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey", width:"300px",paddingLeft:"20px" }}>
                                        <label className="control-label">{utils.getLabelByID("A")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey" , width:"300px",paddingLeft:"20px"}}>
                                        <label className="control-label">{utils.getLabelByID("B")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey", width:"300px",paddingLeft:"20px" }}>
                                        <label className="control-label">{utils.getLabelByID("C")}</label>
                                    </div>
                                    <div className="row" style={{ border: "1px solid grey", width:"300px",paddingLeft:"20px" }}>
                                        <label className="control-label">{utils.getLabelByID("D")}</label>
                                    </div>
                               </div>
                               <div className="col-md-2"></div>
                           </div>
                          
                    </div>

                 
                   {/**File upload */}
                    <div className="row addShopBox " >
                        <div className="row" style={{marginBottom:"30px"}}>
                            <div className="row smilesImageText" ><b>FILES [OFFER IMAGES]</b></div>
                               <div className="row clearfix pull-right">
                                <div className="col-md-2"></div>
                                <div className="col-md-4" style={{ paddingRight: '50px'}}>
                                <button type="submit" className="btn green">
                                    Download
                                </button>
                                </div>
                            
                                <div className="col-md-4">
                                <button type="button" className="btn default" >
                                    Update All
                                </button>
                                </div>
                            </div>
                             
                            </div>


                          






                    
                    <div className="row AddMerchantUpload " >
                                <div className="row smilesImageText" ><b>WEB SIZE</b></div>
                                    <div className="row">
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload" style={{height:"50px"}}>
                                                    
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
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload">
                                                    
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
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload">
                                                    
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
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload">
                                                    
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
                     </div>





                     <div className="row AddMerchantUpload " >
                                <div className="row smilesImageText" ><b>APP SIZE</b></div>
                                    <div className="row">
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload" style={{height:"50px"}}>
                                                    
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
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload">
                                                    
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
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload">
                                                    
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
                                        <div className="col-md-3">           
                                           <div className="utc-uploader">
                                                <div className="utc-file-upload">
                                                    
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
                     </div>
                


                </div>

                  {/**File upload */}


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

ProductManagement.displayName = "Add Product";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductManagement);

