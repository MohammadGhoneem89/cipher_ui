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

class OrderManagement extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            searchCriteria: {},
            valid: true,
            gridData:[
                {"serial_no": "1","merchantImage": "12212222","product": "555222","qty": "8888","amount": "100045 ade","oderDate":"12/1/2020","status":"status"},
                {"serial_no": "1","merchantImage": "12212222","product": "555222","qty": "8888","amount": "100045 ade","oderDate":"12/1/2020","status":"status"},
                {"serial_no": "1","merchantImage": "12212222","product": "555222","qty": "8888","amount": "100045 ade","oderDate":"12/1/2020","status":"status"},
                {"serial_no": "1","merchantImage": "12212222","product": "555222","qty": "8888","amount": "100045 ade","oderDate":"12/1/2020","status":"status"},
                {"serial_no": "1","merchantImage": "12212222","product": "555222","qty": "8888","amount": "100045 ade","oderDate":"12/1/2020","status":"status"},
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

            <Portlet title={"LIST ORDERS"}>
                <div className="row">
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
                                <div className="col-md-4">
                                <button type="button" className="btn default" >
                                    Search
                                </button>
                                </div>
                            </div>
                             
                             
                    
                             <Table
                               gridColumns={utils.getGridColumnByName("OrderManagement")}
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

OrderManagement.displayName = "Order Management";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderManagement);