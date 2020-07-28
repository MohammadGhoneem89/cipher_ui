import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import GroupFilterForm from './GroupFilterForm.jsx';
import * as utils from '../../common/utils.js';

class GroupSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            groupList: undefined,
            isLoading: false,
            pageNo: 1
        };
        this.pageChanged = this.pageChanged.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            groupList: nextProps.groupList,
            isLoading: nextProps.isLoading
        });
    }

    componentDidMount() {
        var request = {
            "action": "groupList",
            "searchCriteria": {
            },
            "page": {
                "currentPageNo": this.state.pageNo,
                "pageSize": 10
            }
        }
        this.props.actions.generalProcess(constants.getGroupList, request);
        this.setState({ isLoading: true });
    }

    loadURL(url) {
        browserHistory.push(url);
    }

    submit(data) {
        this.props.actions.generalProcess(constants.getGroupList, requestCreator.createGroupListRequest({
            "currentPageNo": 1,//this.state.pageNo,
            "pageSize": 10
        },
            data));

        this.setState({ filterCriteria: data, pageNo: 1 })
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.filterCriteria == undefined) {

                request = {
                    "action": "groupList",
                    "searchCriteria": {
                    },
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            } else {
                var searchCriteria = this.state.filterCriteria
                request = {
                    "action": "groupList",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ pageNo: pageNo})
            
            this.props.actions.generalProcess(constants.getGroupList, request);

        }
    }

    render() {

        if (!this.state.isLoading && this.state.groupList)
            return (
                <div>
                <Portlet title={"Group Seach Filter"}>
                    <GroupFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} />
                    
                </Portlet>
                <Portlet title={"Group List"} isPermissioned={true} actions={this.props.groupList.data.actions}>
                        <Table
                            export = {false}
                            pagination={true}
                            search={true}
                            gridColumns={utils.getGridColumnByName("roleSearch")}
                            gridData={this.state.groupList.data.searchResult}
                            totalRecords={this.state.groupList.pageData.totalRecords}
                            pageChanged={this.pageChanged}
                            pageSize={10}
                            activePage ={this.state.pageNo}
                            searchCriteria={this.state.filterCriteria}
                            gridType={"groupList"}
                        />
                    </Portlet>
                </div>
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
    }
    else {
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
GroupSearchContainer.displayName = "GSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearchContainer)