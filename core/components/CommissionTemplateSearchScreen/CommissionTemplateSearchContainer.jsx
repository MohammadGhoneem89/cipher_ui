import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import CommissionTemplateFilterForm from './CommissionTemplateFilterForm.jsx';
import * as utils from '../../common/utils.js';

class CommissionTemplateSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            commissionTemplateList: undefined,
            isLoading: false
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            commissionTemplateList: nextProps.commissionTemplateList,
            isLoading: nextProps.isLoading
        });
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getCommissionTemplateList, requestCreator.createCommissionTemplateListRequest({
            "currentPageNo": 1,
            "pageSize": 10
        }));
        this.setState({isLoading: true});
    }

    performAction(actionObj) {
        if(actionObj.label === "Reset"){
            this.props.reset();
        }
    }

    submit(searchCriteria){
        this.props.actions.generalProcess(constants.getCommissionTemplateList, requestCreator.createCommissionTemplateListRequest({
            "currentPageNo": 1,
            "pageSize": 10
        },
            searchCriteria));
    }

    render() {
        // let actions =[
        //     { className:"btn btn-default", type:"link", label: "ADD", icon: "plus", actionHandler: this.loadURL.bind(this, '/commissionTemplateSetup')}
        // ];
        if(!this.state.isLoading && this.state.commissionTemplateList)
        return (
            <Portlet title={utils.getLabelByID("CommissionTemplateSearch")}>
                <CommissionTemplateFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state}/>
                <Portlet title={utils.getLabelByID("TemplateList")} isPermissioned={true} actions={this.state.commissionTemplateList.data.actions}>
                    <Table
                        pagination = {true}
                        export = {false}
                        search = {false}
                        gridColumns={utils.getGridColumnByName("CTEMP_search")}
                        gridData={this.state.commissionTemplateList.data.searchResult}
                        totalRecords={this.state.commissionTemplateList.pageData.totalRecords}
                    />
                </Portlet>
            </Portlet>
        );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    if(state.app.commissionTemplateList){
        return {
            commissionTemplateList: state.app.commissionTemplateList,
            isLoading: false
        }
    }
    else {
        return {
            commissionTemplateList: [],
            isLoading: true
        }
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

CommissionTemplateSearchContainer.displayName = "CSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(CommissionTemplateSearchContainer)