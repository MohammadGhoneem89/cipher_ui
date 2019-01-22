/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import _ from 'lodash';
import { browserHistory } from 'react-router';

class APITemplateList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {},
            currentPageNo : "",
            totalRecords : "",
            isLoading: true,
            gridData : []
        };
        this.name = '';
        this.code = '';
    }

    getRequest = () => {
        let Name = this.name.value;

        let searchCriteria = {};

        if(Name !== ""){
            searchCriteria.name = Name;
        }

        let request = {
            "action": "getPaymentList",
            "searchCriteria": searchCriteria,
            "page": {
                "pageSize": 10,
                "currentPageNo": this.state.currentPageNo || 1,
                "totalRecords": this.state.totalRecords || 0
            }
        };
        this.props.actions.generalProcess(constants.getPaymentList, request);
    }

    add = () => {
        browserHistory.push('/add')
    }

    componentWillMount() {
        this.getRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gridData && nextProps.pageData) {
            this.setState({
                gridData: nextProps.gridData,
                isLoading: false,
                currentPageNo : nextProps.pageData.currentPageNo,
                totalRecords : nextProps.pageData.totalRecords
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    pageChanged = (pageNo) => {
        if (pageNo) {
            let pageData = this.state.pageData;
            pageData.currentPageNo = pageNo;
            this.setState({ pageData });
            this.getRequest({ pageNo });
        }
    }


    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }

        return (
            <div>
                <Portlet title={utils.getLabelByID("API Template")}>

                    <div className="row">

                        <div className="form-group col-md-6">
                            <div className="col-md-8">
                                <label className="label-bold">{utils.getLabelByID("Template Name")}</label>
                                <input type="text" className="form-control ekycinp" name="name" ref={(value) => this.name = value} />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">

                                    <button type="submit" className="btn green" onClick={this.getRequest}>
                                        {utils.getLabelByID("Search")}
                                    </button>
                                    <button type="button" className="btn default" onClick={this.add} >
                                        {utils.getLabelByID("Add")}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Portlet title={""} isPermissioned={true} actions={this.state.addAction}>
                        {
                            this.state.gridData.map((obj)=>{
                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/view"],
                                        "params": "",
                                        "iconName": "icon-docs"
                                    },
                                    {
                                        "label": "Edit",
                                        "URI": ["/edit/:id"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    },
                                    {
                                        "label": "Test",
                                        "URI": ["/test"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })
                        }
                        <Table
                            gridColumns={utils.getGridColumnByName("APITemplateList")}
                            gridData={this.state.gridData}
                            fontclass=""
                            totalRecords={this.state.totalRecords}
                            pageSize={10}
                            pageChanged={this.pageChanged}
                            pagination={true}
                            activePage={this.state.currentPageNo}
                        />
                    </Portlet>
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        gridData : _.get(state.app,'paymentList.data.searchResult',[]),
        pageData : _.get(state.app,'paymentList.pageData',{})
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
APITemplateList.displayName = "API Template List";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateList);
