/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";


//import Table from "../common/Datatable.jsx"
import Table from '../../../core/common/Datatable.jsx';
import * as utils from '../../../core/common/utils.js';
//import * as utils from '../common/utils.js';
//import { DropdownInput } from '../common/FormControls.jsx';

//import Combobox from '../common/Select.jsx';
import Combobox from '../../../core/common/Select.jsx';
import * as gen from '../common/generalActionHandler'
import Label from '../common/Lable.jsx';
import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import DateControl from "../../../core/common/DateControl.jsx"
import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import Input from '../../../core/common/Input.jsx';

class MerchantList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            searchCriteria: {},
            valid: true,
            gridData:[
                {"serial_no": "1","logo": "12212222","partner": "555222","name": "ACCURAL","code": "100045","status":"success"},
                {"serial_no": "1","logo": "12212222","partner": "555222","name": "ACCURAL","code": "100045","status":"success"},
                {"serial_no": "1","logo": "12212222","partner": "555222","name": "ACCURAL","code": "100045","status":"success"},
                {"serial_no": "1","logo": "12212222","partner": "555222","name": "ACCURAL","code": "100045","status":"success"},
                {"serial_no": "1","logo": "12212222","partner": "555222","name": "ACCURAL","code": "100045","status":"success"},
            ]
        }
        this.generalHandler = gen.generalHandler.bind(this);
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
        // if(nextProps.typeData){
           
        // }
        this.setState({
            typeData: nextProps.typeData
        })
        
        console.log("DDDDDDDDDDD",nextProps.typeData)
    }

    render() {
        

        
        return (
           
            <div className="row">

            <Portlet title={"MERCHANT LIST"}>
                <div className="row">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Partner</label>
                        </div>
                        <div className="form-group col-md-8">
                           
                           <Combobox 
                         fieldname='listOfferStatus' 
                         formname='searchCriteria'
                         state={this.state} //typeName="storeAs"
                         typeName="listOfferStatus"
                         dataSource={this.state.typeData} 
                         multiple={false} 
                         actionHandler={this.generalHandler} 
                         style={{width:"450px",height:"35px"}}/>
                        </div>
                    </div>
                    </div>
                    
                    
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Code</label>
                        </div>
                        <div className="form-group col-md-8">
                        <Input 
                       isValid={this.state.valid}
                       //validationChecker={this.validationHandler} 
                         required={true} 
                          fieldname="orderId" formname="searchCriteria" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler }className="form-control"  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Name</label>
                        </div>
                        <div className="form-group col-md-8">
                        <Input 
                       isValid={this.state.valid}
                       //validationChecker={this.validationHandler} 
                         required={true} 
                          fieldname="orderId" formname="searchCriteria" state={this.state}
                         //errorMessage={'This field is required'}
                         actionHandler={this.generalHandler }className="form-control"  />
                        </div>
                    </div>
                    </div>
                    
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Status</label>
                        </div>
                        <div className="form-group col-md-8">
                           
                           <Combobox 
                         fieldname='listOfferStatus' 
                         formname='searchCriteria'
                         state={this.state} //typeName="storeAs"
                         typeName="listOfferStatus"
                         dataSource={this.state.typeData} 
                         multiple={false} 
                         actionHandler={this.generalHandler} 
                         style={{width:"450px",height:"35px"}}/>
                        </div>
                    </div>
                    </div>



                    <div className="row clearfix pull-right">
                                <div className="col-md-2"></div>
                                <div className="col-md-4" style={{ paddingRight: '50px'}}>
                                <button type="submit" className="btn green">
                                    Add
                                </button>
                                </div>
                            
                                <div className="col-md-4">
                                <button type="button" className="btn default" >
                                    Search
                                </button>
                                </div>
                            </div>
                             
                             
                    
                             <Table
                               gridColumns={utils.getGridColumnByName("MerchantList")}
                            //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                            gridData={this.state.gridData}
                            //totalRecords={this.state.totalRecords}
                            pageSize={10}
                           //pageChanged={this.pageChanged}
                            pagination={true}
                             activePage={this.state.currentPageNo}
                               />
                             

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

MerchantList.displayName = "Merchant List";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MerchantList);