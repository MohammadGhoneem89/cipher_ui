/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/generalAction';
/*container specific imports*/
import Table from '../../../common/Datatable.jsx';
import * as utils from '../../../common/utils.js';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../common/request.js';
import DateControl from '../../../common/DateControl.jsx'
import cloneDeep from 'lodash/cloneDeep';
import JoinChannelForm from './JoinChannelForm.jsx';
const initialState = {
    JoinChannel: {
        "Channel Name": "",
        "Network": ""
    },

    typeData: {},
    dropDownItems: [],
    isLoading: true,
};
class Joinchannel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentPageNo: 1, isLoading: false };
        // this.pageChanged = this.pageChanged.bind(this);
        // this.fetchListData = this.fetchListData.bind(this);
        // this.formSubmit = this.formSubmit.bind(this);
    }


    formSubmit(e) {
        e.preventDefault();
        this.fetchListData();
    }



    render() {
        //if (this.props.sampleListData.gridData) {
        return (
          <JoinChannelForm/>  

        );
    }
    // else
    //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}


function mapStateToProps(state, ownProps) {
    return {


    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(Joinchannel);
