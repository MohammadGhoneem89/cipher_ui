import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/generalAction';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../common/request.js';
import Portlet from '../../../common/Portlet.jsx';
import Table from '../../../common/Datatable.jsx';
import ConsortiumFilterForm from './ConsortiumFilterForm.jsx';
import * as utils from '../../../common/utils.js';

class ConsortiumSearchContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            filterCriteria: undefined,
            consortiumList: undefined,
            pageSize: 10,
            activePage: 1,
            typeData:undefined,
            isLoading: true,
            actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/CreateConsortium/NEW", "children": [] }]
        };
        this.pageChanged = this.pageChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.typeData.data && nextProps.typeData.data.BLCHN_TYPE) {
            this.setState({
                typeData: nextProps.typeData.data,
                isLoading: false
            });
        }
        this.setState({
            consortiumList: nextProps.consortiumList
        });
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['BLCHN_TYPE']));
        this.props.actions.generalProcess(constants.getConsortiumConfigList, requestCreator.createConsortiumListRequest({
            currentPageNo: 1,
            pageSize: this.state.pageSize

        }));
        this.setState({ isLoading: true });
    }

    //
    // loadURL(url) {
    //     browserHistory.push(url);
    // }

    submit(data) {
        this.props.actions.generalProcess(constants.getConsortiumList, requestCreator.createConsortiumListRequest({
            currentPageNo: 1,
            pageSize: this.state.pageSize
        },
            data));
        this.setState({ filterCriteria: data, activePage: 1 });
    }

    pageChanged(pageNo) {
        this.props.actions.generalProcess(constants.getConsortiumList, requestCreator.createConsortiumListRequest({
            currentPageNo: pageNo,
            pageSize: this.state.pageSize
        },
            this.state.filterCriteria));
        this.setState({ activePage: pageNo });
    }

    render() {
        if (!this.state.isLoading && this.state.consortiumList) {
            return (
                <div>
                    <Portlet title={"Consortium"} actions={this.state.consortiumList.data.actions} >
                        <ConsortiumFilterForm onSubmit={this.submit} initialValues={this.state.filterCriteria}
                            state={this.state} />
                    </Portlet>
                    <Portlet title={"Consortium List"} isPermissioned={true} actions={this.state.actions} >
                        <Table
                            pagination={true}
                            export={true}
                            search={false}
                            gridType={"consortium"}
                            gridColumns={utils.getGridColumnByName("consortiumSearch")}
                            gridData={this.state.consortiumList.data.searchResult}
                            totalRecords={this.state.consortiumList.pageData.totalRecords}
                            pageChanged={this.pageChanged}
                            activePage={this.state.activePage}
                            pageSize={this.state.pageSize}
                            searchCriteria={this.state.filterCriteria}
                        />
                    </Portlet>
                </div>
            );
        }
        else {
            return (<div className="loader">Loading...</div>)
        }
    }
}

function mapStateToProps(state, ownProps) {
    if (state.app.ConsortiumList) {
        console.log(state.app.ConsortiumList,"COOONSSSSSORTIUUUUUUMMMMMMMMMM")
        return {
            consortiumList: state.app.ConsortiumList,
            typeData: state.app.typeData
        }
    }
    else {
        return {
            consortiumList: [],
            isLoading: true
        }
    }


}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

ConsortiumSearchContainer.displayName = "ConsortiumSearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(ConsortiumSearchContainer)