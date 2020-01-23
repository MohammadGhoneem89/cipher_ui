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
import TileUnit from '../../../core/common/tileUnit.jsx';

class VoucherList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            gridData:[],
            tiles:[
                {id: 1, title: "INITIATED", value: 2, actionURI: "", overDue: "", fontClass: "green-steel"},
                {id: 2, title: "REDEEMED", value: 7, actionURI: "", overDue: "", fontClass: "green-turquoise"},
                {id: 3, title: "EXPIRED", value: 1, actionURI: "", overDue: "", fontClass: "green-meadow"},
                {id: 4, title: "TOTAL", value: 10, actionURI: "", overDue: ""}
            ]
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
                <div className="row">

                <TileUnit data={this.state.tiles} />
             </div>

            <Portlet title={"Voucher List"}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Merchant</label>
                        </div>
                        <div className="form-group col-md-8">
                            
                            <select id="status" name="status" className="form-control" >
                                    <option key="-1" value=""></option>

                                    <option key="0" value="Merchant">Merchant 1</option>
                                    <option key="1" value="merchant2">merchant 2</option>

                                </select>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Order ID</label>
                        </div>
                        <div className="form-group col-md-8">
                           
                          <input type="text" className="form-control" name="contractId" id="contractId" />
                        
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Code</label>
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
                        <select id="status" name="status" className="form-control" >
                                    <option key="-1" value=""></option>

                                    <option key="0" value="success">Success</option>
                                    <option key="1" value="pending">Pending</option>

                                </select>
                        
                        </div>
                     </div>

                     <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">Date</label>
                        </div>
                        <div className="form-group col-md-8">
                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">To</label>
                        </div>
                        <div className="form-group col-md-8">
                        <DateControl id="fromDate" dateChange={this.dateChangeFrom} />
                        </div>
                    </div>

               <div className="row clearfix pull-right">
                     <div className="col-md-2"></div>
                     <div className="col-md-3" style={{ paddingRight: '50px'}}>
                          <button type="submit" className="btn green">Export</button>
                       </div>
                       <div className="col-md-3" style={{ paddingRight: '50px'}}>
                          <button type="submit" className="btn green">Add</button>
                       </div>
                
                       <div className="col-md-3">
                          <button type="button" className="btn default" >Search</button>
                       </div>

               </div>
                    
                             <Table
                        gridColumns={utils.getGridColumnByName("VoucherList")}
                        gridData={[{"serial_no": "1","merchant": "12212222","offerId": "555222","code": "2n44c","createdon": "22/1/2020","status": "True","expireson": "6000"}]}
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

VoucherList.displayName = "Voucher List";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VoucherList);