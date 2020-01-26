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
import Textarea from '../../../core/common/Textarea.jsx';
import DateControl from "../../../core/common/DateControl.jsx";
import Combobox from '../../../core/common/Select.jsx';

class CreateAmendRedemption extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            checked: false,
            valid: true,
            addShop:{},
            searchCriteria: {},
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
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
            ]));
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
                   




                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>Contact</b></div>
                                
                            <div className="row">
                       
                                 <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Name</label>
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
                                        <label className="control-label">Phone</label>
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
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Mobile</label>
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
                                            <label className="control-label">Address</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                                <Textarea
                                                        style={{ height: '120px', width:"400px" }}
                                                        fieldname='termsAndConditions'
                                                    // formname='contractParams'
                                                        columns='12'
                                                        placeholder=''
                                                        state={this.state}
                                                        actionHandler={this.generalHandler}
                                                        className="form-control"
                                                            />
                                           </div>
                                    </div>            
                                  </div>


                     </div>







                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>REDEMPTION TERMS</b></div>
                                                    
                                  <div className="row">
                                        
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
                                    </div>



                                    <div className="row">
                       
                                     <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Payment Method</label>
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
                                     <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Commision Type</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                                        <Combobox 
                                            fieldname='status' 
                                            formname='searchCriteria'
                                            state={this.state} //typeName="storeAs"
                                            typeName="listOfferStatus"
                                            dataSource={this.state.typeData} 
                                            multiple={false} 
                                            actionHandler={this.generalHandler} 
                                            style={{width:"430px",height:"35px"}}
                                            />
                                         </div>
                                      </div>
                               </div>


                             <div className="row">
                       
                                 <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Value</label>
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


                             <div className="row clearfix pull-right">
                                            <div className="col-md-2"></div>
                                           
                                            <div className="col-md-3" style={{paddingRight:"50px"}}>
                                                <button type="button" className="btn default" >Add</button>
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



                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>SETTLEMENTS</b></div>
                                
                            <div className="row">
                       
                                 <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Settle As</label>
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
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Frequency</label>
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
                                                        <label className="control-label">Start On</label>
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
                                                  <div className="col-md-2"></div>
                                                    <div className="col-md-2">
                                                        <Checkbox
                                                            fieldname='isActive'
                                                            formname='addShop'
                                                            value={this.state.checked}
                                                            columns='1'
                                                            style={{}}
                                                            actionHandler={this.onChangeCheckbox}
                                                            disabled={false}
                                                            />&nbsp;&nbsp;
                                                            Request Manual Approval
                                                            </div>
                                                    
                                                </div>


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


                            <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>ERP SETTINGS</b></div>
                                
                            <div className="row">
                       
                                 <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Vendor Code</label>
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
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">Vendor Site ID</label>
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
                                                        <label className="control-label">Gl Codes</label>
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


                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Billing Acc#</label>
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



                    <div className="row clearfix pull-right" style={{marginTop:"30px"}}>
                                <div className="col-md-4">
                                <button type="button" className="btn default" >
                                    Submit
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

CreateAmendRedemption.displayName = "Add Offer";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAmendRedemption);

