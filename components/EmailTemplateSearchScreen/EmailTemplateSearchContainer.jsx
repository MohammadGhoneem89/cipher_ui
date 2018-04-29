import React from 'react';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../standard/Datatable.jsx';
import EmailTemplateFilterForm from './EmailTemplateFilterForm.jsx';
import * as utils from '../../common/utils.js';

class EmailTemplateSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            emailTemplateList: undefined,
            isLoading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.emailTemplateList && nextProps.typeData.data.ETEMP_templateTypes) {
            this.setState({
                emailTemplateList: nextProps.emailTemplateList,
                templateTypes: nextProps.typeData.data.ETEMP_templateTypes,
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getEmailTemplateList, requestCreator.createEmailTemplateListRequest({
            "currentPageNo": 1,
            "pageSize": 10
        }));
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ETEMP_templateTypes']));
        this.setState({isLoading: true});
    }

    loadURL(url) {
        browserHistory.push(url);
    }

    submit(searchCriteria) {
        this.props.actions.generalProcess(constants.getEmailTemplateList, requestCreator.createEmailTemplateListRequest({
                "currentPageNo": 1,
                "pageSize": 10
            },
            searchCriteria));
    }

    render() {
        if (!this.state.isLoading && this.state.emailTemplateList)
            return (
                <Portlet title={"Email Template Search"}>
                    <EmailTemplateFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria}
                                             containerSate={this.state}/>
                    <Portlet title={"Email Template List"} isPermissioned={true} actions={this.state.emailTemplateList.data.actions}>
                        <Table
                            pagination={true}
                            export={false}
                            search={false}
                            gridColumns={utils.getGridColumnByName("ETEMP_search")}
                            gridData={this.state.emailTemplateList.data.searchResult}
                            totalRecords={this.state.emailTemplateList.pageData.totalRecords}
                        />
                    </Portlet>
                </Portlet>
            );
        else
            return (<div className="loader">Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        emailTemplateList: state.app.emailTemplateList || [],
        typeData: state.app.typeData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

EmailTemplateSearchContainer.displayName = "ETSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateSearchContainer)