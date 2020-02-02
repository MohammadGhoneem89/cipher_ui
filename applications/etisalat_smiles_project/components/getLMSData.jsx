import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../../../core/actions/generalAction';

import _ from 'lodash';

import Portlet from './../../../core/common/Portlet.jsx'
// import Steps from './../../../core/common/Steps.jsx';


import * as utils from './../../../core/common/utils.js';
import Table from './../../../core/common/Datatable.jsx';

// import StatusBoxes from './StatusBoxes.jsx'
// import NewPassport from './NewPassport.jsx'

import * as gen from './../../../core/common/generalActionHandler';
import * as requestCreator from './../../../core/common/request.js';
import * as constants from './../../../core/constants/Communication.js';

class LMSData extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            // page: {
            //     pageSize: 10,
            //     currentPageNo: 1,
            //     totalRecords: 0
            // },
            gridData: []
        };

        this.generalHandler = gen.generalHandler.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let request = {
            "body": {
                // "page": {
                //     "currentPageNo": 1,
                //     "pageSize": _.get(this.state, 'page.pageSize', 10)
                // },
                "searchCriteria": {
                    
                }
            }
        }
        this.props.actions.generalProcess(constants.getLMSData, request);
    }


    // getType = (status) => {
    //     return status.toLowerCase() == 'approved' ? "INFO" : (status.toLowerCase() == 'pending' ? "WARNING" : "ERROR")
    // }

    componentWillReceiveProps(nextProps) {

        if (nextProps.getLMSData && nextProps.getLMSData.searchResult && nextProps.getLMSData.pageData) {
            this.setState({
                gridData:nextProps.getLMSData.searchResult,
                isLoading:false
            });
        }
    }

    // getRequest = () => {
       
    //     // let searchCriteria = {
    //     //     ..._.get(this.state, 'searchCriteria', {})
    //     // }
    //     // console.log(searchCriteria, ' search criteria');

    //     let request = {
    //         "body": {
    //             // "page": {
    //             //     "currentPageNo": pageNo,
    //             //     "pageSize": this.state.page.pageSize

    //             // },
    //             searchCriteria
    //         }
    //     };
    //     return request
    // }

    // pageChanged = pageNo => {
    //     console.log('page changed : ', pageNo)
    //     this.updateCurrentPage(pageNo);
    //     this.props.actions.generalProcess(constants.getLMSData, this.getRequest(pageNo));
    // };

    // updateCurrentPage = pageNo => {
    //     let page = { ...this.state.page };
    //     page.currentPageNo = pageNo;
    //     this.setState({ page });
    // };


    formSubmit = (e) => {
        e.preventDefault()
        //this.setState({isLoading:true})
        this.props.actions.generalProcess(constants.getLMSData, this.getRequest());
        console.log('form submitted')
    }



    render() {
        if (this.state.isLoading)
            return (<div className="loader">{"Loading"}</div>)
        else
            return (
                <div id="LMSData">
                    <Portlet title={"Points Redeemed By Loyalty Management System"}>
                        <Table
                            gridColumns={utils.getGridColumnByName('LMSData')}
                            gridData={this.state.gridData || []}
                            // totalRecords={this.state.page.totalRecords}
                            // pageChanged={this.pageChanged}
                            // pageSize={this.state.page.pageSize}
                            // pagination={true}
                            // activePage={this.state.page.currentPageNo}
                        />
                    </Portlet>

                </div>
            )
    }
}

LMSData.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {
        // Grid Data
        getLMSData: _.get(state.app, 'getLMSData', undefined)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

LMSData.displayName = "Points Redeemed By Loyalty Management System";
export default connect(mapStateToProps, mapDispatchToProps)(LMSData)