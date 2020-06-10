/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';


class onBoardingProfileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {},
            currentPageNo : "",
            totalRecords : "",
            isLoading: true,
            addAction : [
                {
                    "type": "pageAction",
                    "label": "ADD",
                    "labelName": "COM_AB_Add",
                    "actionType": "PORTLET_LINK",
                    "iconName": "fa fa-plus",
                    "URI":
                        "/onBoardingProfile/setup"
                }
            ],
            gridData : []
        };
        this.name = '';
        this.status = '';
    }

    getRequest = () => {
        let Name = this.name.value;
        let Status = this.status.value;

        let searchCriteria = {};

        if(Name !== ""){
            searchCriteria.name = Name;
        }
        if(Status !== ""){
            searchCriteria.status = Status;
        }

        let request = {
            "action": "getOnBoardingProfileList",
            "searchCriteria": searchCriteria,
            "page": {
                "pageSize": 10,
                "currentPageNo": this.state.currentPageNo || 1,
                "totalRecords": this.state.totalRecords || 0
            }
        };
        this.props.actions.generalProcess(constants.getOnBoardingList, request);
    }

    componentWillMount() {
        this.getRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list && nextProps.pageData) {
            this.setState({
                gridData: nextProps.list,
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
                <Portlet title={utils.getLabelByID("OnBoarding Search")}>

                    <div className="row">

                        <div className="form-group col-md-6">
                            <div className="col-md-8">
                                <label className="label-bold">{utils.getLabelByID("Name")}</label>
                                <input type="text" className="form-control ekycinp" name="name" ref={(value) => this.name = value} />
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <div className="col-md-8">
                                <label className="label-bold">{utils.getLabelByID("Status")}</label>
                                <input type="text" className="form-control ekycinp" name="status"  ref={(value) => this.status = value} />
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
                                    <button type="button" className="btn default" >
                                        {utils.getLabelByID("Clear")}
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
                                        "label": "Edit",
                                        "URI": [
                                            "/onBoardingProfile/setup/"
                                        ],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })
                        }
                        <Table
                            gridColumns={utils.getGridColumnByName("onBoardingProfile")}
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
        list : state.app.getOnBoardingList.data.searchResult,
        pageData : state.app.getOnBoardingList.pageData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
onBoardingProfileList.displayName = "OnBoarding Profile List";
export default connect(mapStateToProps, mapDispatchToProps)(onBoardingProfileList);
