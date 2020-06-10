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

import Portlet from '../common/Portlet.jsx';

import _ from 'lodash';
import DateControl from "../../../core/common/DateControl.jsx"
//import TileUnit from '../../../core/common/tileUnit.jsx';
import TileUnit from '../common/tileUnit.jsx';
import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import Input from '../../../core/common/Input.jsx';

class InitiateSettlementPartner extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchCriteria: {},
            valid: true,
                   }
            this.generalHandler = gen.generalHandler.bind(this);
        
    }
   
    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'InitiateSettlementPartner',
            ]));
           
       
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            typeData: nextProps.typeData
        })
        
        console.log("DDDDDDDDDDD",nextProps.typeData)
        
    }

    render() {
      
        //console.log("MMM",this.state.searchCriteria.merchant)
        return (
           
            <div className="row">

            <Portlet title={"Initiate Settlement Partner"}>
                <div className="row">

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("Partner")}</label>
                        </div>
                        <div className="form-group col-md-8">
                           
                           <Combobox 
                         fieldname='listOfferStatus' 
                         formname='searchCriteria'
                         state={this.state} //typeName="storeAs"
                         typeName="InitiateSettlementPartner"
                         dataSource={this.state.typeData} 
                         multiple={false} 
                         actionHandler={this.generalHandler} 
                         style={{width:"450px",height:"35px"}}/>
                        </div>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-1">
                          <img src="/assets/imgs/smiles.jpg" style={{height:"100px"}}/>  
                    </div>
                    <div className="col-md-2" style={{fontSize:"20px"}} >ETISALAT</div>
                    </div>
                     
                    <br />
                    < br/>

                    
                </div>

                
                <div className="row">
                    <div className="col-md-2">
                        <label className="control-label">{utils.getLabelByID("Last Settlemenet Date")}</label>
                    </div>
                    <div className="col-md-4" style={{ backgroundColor: "grey" }}>
                        <label className="control-label">{utils.getLabelByID("01/01/2019")}</label>
                    </div>
                    <div className="col-md-2">
                        <label className="control-label">{utils.getLabelByID("End Date")}</label>
                    </div>
                    <div className="col-md-4" style={{ border: "1px solid grey" }}>
                        <label className="control-label">{utils.getLabelByID("01/01/2019")}</label>
                    </div>
                </div>
                <br/><br/>

                     <div className="row">
                     <div className="row clearfix pull-right">
                        <div className="col-md-2"></div>
                        <div className="col-md-3" style={{ paddingRight: '50px'}}>
                        <button type="submit" className="btn green">INITIATE</button>
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

InitiateSettlementPartner.displayName = "Initiate Settlements Partner";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitiateSettlementPartner);