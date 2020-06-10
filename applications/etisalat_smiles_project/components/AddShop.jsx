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

import * as utils from '../common/utils.js';

import Portlet from '../../../core/common/Portlet.jsx';
//import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import Map from "./Charts/Map.jsx";
import Input from '../../../core/common/Input.jsx';

class AddShop extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: true,
            addShop:{},
            FromHoursError:"",
            ToHoursErrors:"",
            contactErrors:"",
            emailErrors:"",
            addressErrors:""
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.addShop=this.addShop.bind(this);
    }
   
    
    addShop(){
        console.log("From :::::",this.state.addShop.fromOpeningHours)
        if(this.state.addShop.fromOpeningHours==="" || this.state.addShop.fromOpeningHours===undefined){
            this.setState({FromHoursError:"Field Required"})
        }
        else{
            this.setState({FromHoursError:""})
        }
        if(this.state.addShop.toOpeningHours==="" || this.state.addShop.toOpeningHours===undefined){
            this.setState({ToHoursErrors:"Field Required"})
        }
        else{
            this.setState({ToHoursErrors:""})
        }
        if(this.state.addShop.contact==="" || this.state.addShop.contact===undefined){
            this.setState({contactErrors:"Field Required"})
        }
        else{
            this.setState({contactErrors:""})
        }
        if(this.state.addShop.email==="" || this.state.addShop.email===undefined){
            this.setState({emailErrors:"Field Required"})
        }
        else{
            this.setState({emailErrors:""})
        }
        if(this.state.addShop.address==="" || this.state.addShop.address===undefined){
            this.setState({addressErrors:"Field Required"})
        }
        else{
            this.setState({addressErrors:""})
        }

    }
    componentWillMount() {
    }

    componentDidMount() {
    
    }



    componentWillReceiveProps(nextProps) {
           
    }
    updateState = (data) => {
        this.setState(data);
    }


    render() {       
        return (
            <div className="row">
             
                <Portlet >
                    <div >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Shop Code</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
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
                       <div className="col-md-2 MapAxis">
                           <div className="row">
                                <div className="form-group col-md-2">
                                   <label className="control-label">X</label>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" name="contractId" id="contractId" />
                                </div>
                           </div>
                           <div className="row">
                                <div className="form-group col-md-2">
                                   <label className="control-label">Y</label>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" name="contractId" id="contractId" />
                                </div>
                           </div>


                       </div>
                   </div>



                  {/*Map */}


                    <div className="row addShopBox" >
                     <div className="addShopBoxText" style={{ color: "#089729"  }}><b>OPENING HOURS</b></div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">From</label>
                            </div>
                            <div className="form-group col-md-8">
                                {/*
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                                */}
                                <Input 
                          isValid={this.state.valid}
                       //validationChecker={this.validationHandler} 
                         required={true} 
                          fieldname="fromOpeningHours" formname="addShop" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler } className="form-control"  />
                         <p className="text-danger">{this.state.FromHoursError}</p>
                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">To</label>
                            </div>
                            <div className="form-group col-md-8">
                                
                                <Input 
                          isValid={this.state.valid}
                       //validationChecker={this.validationHandler} 
                         required={true} 
                          fieldname="toOpeningHours" formname="addShop" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler } className="form-control"  />
                          <p className="text-danger">{this.state.ToHoursErrors}</p>
                            </div>
                        </div>
                    </div>
                        </div>



                    <div className="row addShopBox">
                       <div className="addShopBoxText" style={{ color: "#089729"  }}><b>Contact</b></div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">Contact</label>
                                </div>
                                <div className="form-group col-md-8">
                                    
                                    <Input 
                          isValid={this.state.valid}
                       //validationChecker={this.validationHandler} 
                         required={true} 
                          fieldname="contact" formname="addShop" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler } className="form-control"  />
                          <p className="text-danger">{this.state.contactErrors}</p>
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
                          fieldname="email" formname="addShop" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler } className="form-control"  />
                          <p className="text-danger">{this.state.emailErrors}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                           <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">Address</label>
                                </div>
                                <div className="form-group col-md-8">
                                <Input 
                          isValid={this.state.valid}
                       //validationChecker={this.validationHandler} 
                         required={true} 
                          fieldname="address" formname="addShop" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler } className="form-control"  />
                         <p className="text-danger">{this.state.addressErrors}</p>
                                </div>
                            </div>
                        </div>
                     
                        </div>
                    <div className="row">
                       <div className="clearfix pull-right">
                              <div className="col-md-2"></div>
                            <div className="col-md-3" style={{ paddingRight: '50px', marginTop:"30px"}}>
                             <button type="submit" className="btn green" onClick={this.addShop}>Save</button>
                            </div>
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

AddShop.displayName = "Add Shop";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddShop);


/**
 * <Portlet >
                       
                   <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Shop Code</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId1" id="contractId1" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div> OPENING HOURS</div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">From</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId2" id="contractId2" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">To</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId3" id="contractId3" />
                            </div>
                        </div>
                           
                           

                    </div>
                        
                   </Portlet>
 */