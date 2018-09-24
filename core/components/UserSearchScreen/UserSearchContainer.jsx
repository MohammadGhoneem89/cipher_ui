import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../standard/Datatable.jsx';
import UserFilterForm from './UserFilterForm.jsx';
import * as utils from '../../common/utils.js';
import ActionButton from '../ActionButtonNew.jsx';


class UserSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            userList: undefined,
            isLoading: false,
            pageNo: 1
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.performAction = this.performAction.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userList: nextProps.userList,
            isLoading: nextProps.isLoading
        });
    }

    componentDidMount() {

        let orgType = '';
        let orgCode = '';

        if (sessionStorage.orgType == 'Entity' || sessionStorage.orgType == 'Acquirer') {
            orgType = sessionStorage.orgType;
            orgCode = sessionStorage.orgCode

        }

        var request = {
            "action": "userList",
            "searchCriteria": {
                "orgType": orgType,
                "orgCode": orgCode
            },
            "page": {
                "currentPageNo": this.state.pageNo,
                "pageSize": 10
            }
        }

        this.props.actions.generalProcess(constants.getUserList, request);
        this.setState({ isLoading: true });
    }

    loadURL(url) {
        browserHistory.push(url);
    }
    performAction(actionID) {
        return "";
    }

    submit(data) {

        if (sessionStorage.orgType == 'Entity' || sessionStorage.orgType == 'Acquirer') {
            data.orgType = sessionStorage.orgType;
            data.orgCode = sessionStorage.orgCode
        }

        this.props.actions.generalProcess(constants.getUserList, requestCreator.createUserListRequest({
            "currentPageNo": 1,//this.state.pageNo,
            "pageSize": 10
        },
            data));

        this.setState({ filterCriteria: data, pageNo: 1 })
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";
            let orgType = '';
            let orgCode = '';

            if (sessionStorage.orgType == 'Entity' || sessionStorage.orgType == 'Acquirer') {
                orgType = sessionStorage.orgType;
                orgCode = sessionStorage.orgCode

            }

            if (this.state.filterCriteria == undefined) {

                request = {
                    "action": "userList",
                    "searchCriteria": {
                        "orgType": orgType,
                        "orgCode": orgCode
                    },
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            } else {
                var searchCriteria = this.state.filterCriteria
                request = {
                    "action": "userList",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ pageNo: pageNo })
            this.props.actions.generalProcess(constants.getUserList, request)

        }
    }

    render() {

        if (!this.state.isLoading && this.state.userList)
            return (

                <Portlet title={"User Seach Filter"}>
                    <UserFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} />
                    {/*<ActionButton actionList={this.props.userList.data.actions} performAction={this.performAction} />*/}
                    <Portlet title={"User List"} isPermissioned={true} actions={this.props.userList.data.actions}>
                        <Table
                            pagination={true}
                            export={true}
                            search={true}
                            gridColumns={utils.getGridColumnByName("userSearch")}
                            gridData={this.state.userList.data.searchResult}
                            totalRecords={this.state.userList.pageData.totalRecords}
                            pageChanged={this.pageChanged}
                            pageSize={10}
                            searchCriteria={this.state.filterCriteria}
                            activePage={this.state.pageNo} gridType={"userList"}
                        />
                    </Portlet>
                </Portlet>
            );
        else
            return (<div className="loader">Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    if (state.app.userList) {
        return {
            userList: state.app.userList,
            isLoading: false
        }
    }
    else {
        return {
            userList: [],
            isLoading: true
        }
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
UserSearchContainer.displayName = "USearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchContainer)