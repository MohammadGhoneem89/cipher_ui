/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import Portlet from '../../common/Portlet.jsx';

class onBoardingProfileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: [],
            searchCriteria: {},
            currentPageNo: "",
            totalRecords: "",
            isLoading: true,
            addAction: [
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
            gridData: []
        };
        this.name = '';
        this.status = '';
    }

    getRequest = () => {
        let Name = this.name.value;
        let Status = this.status.value;

        let searchCriteria = {};

        if (Name !== "") {
            searchCriteria.name = Name;
        }
        if (Status !== "") {
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
        if (nextProps.list && nextProps.pageData && nextProps.typeData) {

            console.log("*******", nextProps.list, "*********")
            this.setState({
                status: nextProps.typeData.onBoardingStatus,
                gridData: nextProps.list,
                isLoading: false,
                currentPageNo: nextProps.pageData.currentPageNo,
                totalRecords: nextProps.pageData.totalRecords
            });
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['onBoardingStatus']));
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
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("ApiListDataFilters")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="ApiListData">
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("Name")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="name" id="name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("Status")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select name="Status" id="Status" className="form-control">
                                                                <option key="-1" value=''>{utils.getLabelByID("RA_Select")} </option>
                                                                {this.state.status.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="form-actions right">
                                                    <div className="form-group col-md-12">
                                                        <div className="btn-toolbar pull-right">

                                                            <button type="submit" className="btn green" >{utils.getLabelByID("Search")} </button>
                                                            {"  "}
                                                            <button type="button" className="btn default" >{utils.getLabelByID("Clear")}</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Portlet title={""} isPermissioned={true} actions={this.state.addAction}>
                        {
                            this.state.gridData.map((obj) => {
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
    console.log("$$$$$", state.app.getOnBoardingList.data.searchResult, "$$$$$")
    return {
        list: state.app.getOnBoardingList.data.searchResult,
        pageData: state.app.getOnBoardingList.pageData,
        typeData: state.app.typeData.data,
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
onBoardingProfileList.displayName = "OnBoarding Profile List";
export default connect(mapStateToProps, mapDispatchToProps)(onBoardingProfileList);
