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

        this.state = {
            schemaProfiles: [],
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
        this.submit = this.submit.bind(this);
        this.pageChanged = this.pageChanged.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        console.log("Component will mount")
        console.log(nextProps.profiles)
        let profiles = nextProps.profiles.map((profile)=>{
            let prof = {}
            prof.label = profile.name;
            prof.value = profile._id;
            return prof;
        })
        console.log(profiles)
        this.setState({
            schemaProfiles: profiles,
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
        console.log("Component did mount")
        this.props.actions.generalProcess(constants.mongodbSchemaProfiles);
        //this.setState({ isLoading: true });
    }

    loadURL(url) {
        browserHistory.push(url);
    }

    submit(data) {
        console.log(data)
        this.props.actions.generalProcess(constants.getMongoDBChanges, requestCreator.createGetMongodbSchemaChanges({
            data
        }));
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
        console.log("Render")
        console.log(this.state.schemaProfiles)
        if (!this.state.isLoading)
            return (
                <Portlet title={"Mongo-DB Utility"}>

                    <MongoDBChangesForm onSubmit={this.submit} schemaProfiles={this.state.schemaProfiles} />

                    {/* <Portlet title={"Identified Changes"} isPermissioned={true}>
                        <Table
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
                        />
                    </Portlet> */}
                </Portlet>
            );
        else
            return (<div className="loader" > Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {

    if (state.app.hasOwnProperty('getMongodbSchemaProfiles')) {
        return {
            profiles: state.app.getMongodbSchemaProfiles.data,
            isLoading: false
        }
    } else {
        return {
            profiles: [],
            isLoading: false
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