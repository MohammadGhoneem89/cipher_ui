import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import MongoDBChangesForm from './mongoDBChangesForm.jsx';
import * as utils from '../../common/utils.js';

class MongoDBChangesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            groupList: undefined,
            isLoading: false,
            pageNo: 1,
            actions: [{
                "value": "1002",
                "type": "pageAction",
                "label": "ADD",
                "labelName": "COM_AB_Add",
                "actionType": "PORTLET_LINK",
                "iconName": "fa fa-plus",
                "URI": "/groupSetup",
                "children": []
            }]
        };
        this.pageChanged = this.pageChanged.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // var request = {
        //   "action": "groupList",
        //   "searchCriteria": {},
        //   "page": {
        //     "currentPageNo": this.state.pageNo,
        //     "pageSize": 10
        //   }
        // }
        // this.props.actions.generalProcess(constants.getGroupList, request);
        // this.setState({isLoading: true});
    }

    loadURL(url) {
        browserHistory.push(url);
    }

    submit(data) {
        // this.props.actions.generalProcess(constants.getMongoDbSchemaChange, requestCreator.createGroupListRequest({
        //     "currentPageNo": 1,//this.state.pageNo,
        //     "pageSize": 10
        //   },
        //   data));

        // this.setState({filterCriteria: data, pageNo: 1})
    }

    pageChanged(pageNo) {
        // if (pageNo != undefined) {

        //   var request = "";

        //   if (this.state.filterCriteria == undefined) {

        //     request = {
        //       "action": "groupList",
        //       "searchCriteria": {},
        //       "page": {
        //         "currentPageNo": pageNo,
        //         "pageSize": 10
        //       }
        //     }
        //   } else {
        //     var searchCriteria = this.state.filterCriteria
        //     request = {
        //       "action": "groupList",
        //       searchCriteria,
        //       "page": {
        //         "currentPageNo": pageNo,
        //         "pageSize": 10
        //       }
        //     }
        //   }

        //   this.setState({pageNo: pageNo})

        //   this.props.actions.generalProcess(constants.getGroupList, request);

        // }
    }

    render() {

        if (!this.state.isLoading)
            return (
                <Portlet title={"Mongo-DB Utility"}>
                    <MongoDBChangesForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} />
                    <Portlet title={"Identified Changes"} isPermissioned={true}>
                        {/* <Table
                            // pagination={false}
                            // export={true}
                            // search={false}
                            // gridType={"entity"}
                            // gridColumns={utils.getGridColumnByName("mongoDBChangesGrid")}
                            // gridData={this.state.employeesList.data}
                            //totalRecords={this.state.employeesList.pageData.totalRecords}
                            // pageChanged={this.pageChanged}
                            // activePage={this.state.activePage}
                            // pageSize={this.state.pageSize}
                        /> */}
                    </Portlet>
                </Portlet>
            );
        else
            return (<div className="loader">Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    if (state.app.groupList) {
        return {
            groupList: state.app.groupList,
            isLoading: false
        }
    } else {
        return {
            groupList: [],
            isLoading: true
        }
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

MongoDBChangesContainer.displayName = "MongoDBChangesContainer";

export default connect(mapStateToProps, mapDispatchToProps)(MongoDBChangesContainer)