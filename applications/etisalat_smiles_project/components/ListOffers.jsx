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

class ListOffers extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords:10,
            pageSize: 5,
            currentPageNo: 1,
            gridData:[]
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

           Musa
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

ListOffers.displayName = "List Offers";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOffers);