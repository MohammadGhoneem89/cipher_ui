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

import Combobox from '../common/Select.jsx';
import * as gen from '../common/generalActionHandler'
import Label from '../common/Lable.jsx';
import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import DateControl from "../../../core/common/DateControl.jsx"

class ListOffers extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            gridData:[]
        }
        this.generalHandler = gen.generalHandler.bind(this);
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

            <Portlet title={"LIST OFFER"}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Merchant</label>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="contractId" id="contractId" />
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Status</label>
                        </div>
                        <div className="form-group col-md-8">
                            {/* 
                             <Combobox fieldname='source' formname='addAttribute'  style={{}}
                                state={this.state} 
                            //typeName=""
                     dataSource={this.state.typeData} multiple={false} actionHandler={this.generalHandler} />
                            */}
                           
                          
                          <select id="status" name="status" className="form-control" >
                                    <option key="-1" value=""></option>

                                    <option key="0" value="success">Success</option>
                                    <option key="1" value="pending">Pending</option>

                                </select>
                        
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
                              <br/><br/>
                              <div className="row">
                    
                             <Table
                               gridColumns={utils.getGridColumnByName("ListOffers")}
                            gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                            //totalRecords={this.state.totalRecords}
                            pageSize={10}
                           //pageChanged={this.pageChanged}
                            pagination={true}
                             activePage={this.state.currentPageNo}
                               />
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

ListOffers.displayName = "List Offers";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOffers);