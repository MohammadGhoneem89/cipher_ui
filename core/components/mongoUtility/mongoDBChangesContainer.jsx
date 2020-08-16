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
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';

class MongoDBChangesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            schemaProfiles: [],
            mongodbSchemaChanges: {
                data: []
            },
            loadingSchemaChanges: false,
            schemaChangesList: [],
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
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.submit = this.submit.bind(this);
        this.pageChanged = this.pageChanged.bind(this);

    }

    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "viewData":
                this.setState({ isOpen: true })
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.profiles) {
            console.log(nextProps.profiles)

            let profiles = nextProps.profiles.map((profile) => {
                let prof = {}
                prof.label = profile.name;
                prof.value = profile._id;
                return prof;
            })

            this.setState({
                schemaProfiles: profiles,
                isLoading: nextProps.isLoading
            });

        }
        if (nextProps.mongodbSchemaChanges) {
            nextProps.mongodbSchemaChanges.data.forEach((elem, index) => {
                elem.actions = [
                    { "label": "viewData", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
                ]

            })
            this.setState({
                mongodbSchemaChanges: nextProps.mongodbSchemaChanges.data,
                isLoading: nextProps.isLoading,
                loadingSchemaChanges: false
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.mongodbSchemaProfiles);
    }

    loadURL(url) {
        browserHistory.push(url);
    }

    submit(data) {
        this.setState({
            loadingSchemaChanges: true
        });
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
        if (!this.state.isLoading)
            return (
                <div>
                    <Portlet title={"Mongo-DB Utility"}>

                        <MongoDBChangesForm onSubmit={this.submit} schemaProfiles={this.state.schemaProfiles} />
                        <Portlet title={"Identified Changes"} isPermissioned={true}>
                            {this.state.loadingSchemaChanges ? <div className="loader" > Loading...</div> : <Table
                                pagination={false}
                                export={true}
                                search={false}
                                gridColumns={utils.getGridColumnByName("mongoDBChangesGrid")}
                                gridData={this.state.mongodbSchemaChanges}
                                componentFunction={this.ActionHandlers}
                            />}

                        </Portlet>
                    </Portlet>

                    <ModalBox isOpen={this.state.isOpen}>
                        <Portlet title={utils.getLabelByID("Event Details")} isPermissioned={true}>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <label className="control-label">{utils.getLabelByID("Event Data")}</label>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBox>
                </div>
            );
        else
            return (<div className="loader" > Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        profiles: _.get(state.app, "getMongodbSchemaProfiles.data", null),
        mongodbSchemaChanges: _.get(state.app, "mongodbSchemaChanges", null),
        isLoading: false
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

MongoDBChangesContainer.displayName = "MongoDBChangesContainer";

export default connect(mapStateToProps, mapDispatchToProps)(MongoDBChangesContainer)