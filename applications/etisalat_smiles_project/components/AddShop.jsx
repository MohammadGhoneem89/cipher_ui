/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
//import * as constants from "../../../core/constants/Communication";

import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'


import * as utils from '../common/utils.js';

import Portlet from '../../../core/common/Portlet.jsx';
import Label from '../common/Lable.jsx';
//import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';

class AddShop extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            
        }
        
    }
   

    
    componentWillMount() {
    }

    componentDidMount() {
    
    }



    componentWillReceiveProps(nextProps) {
           
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

                    <div className="row addShopBox" >
                     <div style={{ color: "#089729"  }}><b>OPENING HOURS</b></div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">From</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">To</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
                        </div>
                    </div>
                        </div>



                        <div className="row addShopBox">
                     <div >Contact</div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Contact</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Email</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Address</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
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