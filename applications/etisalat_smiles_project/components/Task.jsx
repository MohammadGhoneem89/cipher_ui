/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
//import * as constants from "../../../core/constants/Communication.js";

//import * as constants from "../constants/appCommunication.js";
import * as constants from '../../../core/constants/Communication.js';

import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import * as gen from '../common/generalActionHandler'

//import * as constants from '../../../core/constants/Communication.js';

//import * as utils from '../common/utils.js';
import * as utils from '../../../core/common/utils.js';

import Portlet from '../../../core/common/Portlet.jsx';
//import Portlet from '../common/Portlet.jsx';
//import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import Input from '../../../core/common/Input.jsx';
//import Checkbox from '../../../core/common/CheckBox.jsx';
import Table from '../../../core/common/Datatable.jsx';
//import Textarea from '../../../core/common/Textarea.jsx';
// import DateControl from "../../../core/common/DateControl.jsx";
// import Combobox from '../../../core/common/Select.jsx';

class Task extends React.Component {

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
            gridData:[]
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
            this.props.actions.generalProcess(constants.getTask, {});
          //  this.props.actions.generalProcess(constants.getAllOrgMap, {});
            
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
            {/**<div className="form-group col-md-8">
                    <Input 
                    isValid={this.state.valid}
                    required={true} 
                    fieldname="toOpeningHours" formname="addShop" state={this.state}
                    actionHandler={this.generalHandler } className="form-control"  />
                    </div> */}
                    <div className="row"> 
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">Username</label>
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
                                   <label className="control-label">Password</label>
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
                                <label className="control-label">Schedule_time</label>
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
                                   <label className="control-label">Json_payload</label>
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
                        
                        <button>Add</button>
                    
                    </div>

                    <Table
                                    gridColumns={utils.getGridColumnByName("ViewTask")}
                                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                    gridData={this.state.gridData}
                                    //totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                //pageChanged={this.pageChanged}
                                    pagination={true}
                                    activePage={this.state.currentPageNo}
                                    />
             
                <Portlet >
                
                  
                </Portlet>
                   
            </div>
           
        );
    }
}

function mapStateToProps(state, ownProps) {
    //console.log(state.app)
    return {
        typeData: _.get(state.app, 'typeData.data', null),
        getTask:_.get(state.app,'tasks',null)
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

Task.displayName = "Task";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task);

