import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../core/actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../core/common/request.js';
import Portlet from '../../core/common/Portlet.jsx';
import Table from '../../core/standard/Datatable.jsx';
import EntityFilterForm from './OrgFilterForm.jsx';
import * as utils from '../../core/common/utils.js';

class OrgSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            entityList: undefined,
            pageSize: 10,
            activePage: 1,
            sortData: undefined,
            isLoading: false
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.sortList = this.sortList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            entityList: nextProps.entityList,
            sortData: nextProps.entityList.pageData.sortData,
            isLoading: nextProps.isLoading
        });
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
            currentPageNo: 1,
            pageSize: this.state.pageSize

        }));
        this.setState({isLoading: true});
    }

    //
    // loadURL(url) {
    //     browserHistory.push(url);
    // }

    submit(data) {
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
                currentPageNo: 1,
                pageSize: this.state.pageSize
            },
            data));
        this.setState({filterCriteria: data, activePage: 1});
    }

    pageChanged(pageNo) {
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
                currentPageNo: pageNo,
                pageSize: this.state.pageSize,
                sortData: this.state.sortData
            },
            this.state.filterCriteria));
        this.setState({activePage: pageNo});
    }

    sortList(sortData) {
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
                currentPageNo: this.state.activePage,
                pageSize: this.state.pageSize,
                sortData
            },
            this.state.filterCriteria));
    }

    render() {
        if (!this.state.isLoading && this.state.entityList){
            return (
                <div>
                    <Portlet title={utils.getLabelByID("Organization")}>
                        <EntityFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria}
                                          state={this.state}/>
                    </Portlet>
                    <Portlet title={utils.getLabelByID("List")} isPermissioned={true} actions={this.state.entityList.data.actions}>
                        <Table
                            pagination={true}
                            export={true}
                            search={false}
                            gridType={"entity"}
                            gridColumns={utils.getGridColumnByName("entitySearch")}
                            gridData={this.state.entityList.data.searchResult}
                            totalRecords={this.state.entityList.pageData.totalRecords}
                            pageChanged={this.pageChanged}
                            activePage={this.state.activePage}
                            pageSize={this.state.pageSize}
                            searchCriteria={this.state.filterCriteria}
                            headerClick={this.sortList}
                            sortData={this.state.sortData}
                        />
                    </Portlet>
                </div>
            );
        }
        else{
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
        }
    }
}

function mapStateToProps(state, ownProps) {
    if (state.app.entityList) {
        return {
            entityList: state.app.entityList,
            isLoading: false
        }
    }
    else {
        return {
            entityList: [],
            isLoading: true
        }
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

OrgSearchContainer.displayName = "ESearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(OrgSearchContainer)