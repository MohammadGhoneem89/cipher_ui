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
import * as requestCreator from '../../../../core/common/request.js';

class SubOrderList extends React.Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            actions: []
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
    }

    formSubmit = () => {
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }
    redirectToAddPage = () => {
        //this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }

    getRequest = () => {

        let suborderID = document.getElementById('suborderID') == null ? "" : document.getElementById('suborderID').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        let searchCriteria = {}

        if (suborderID != "")
            searchCriteria.suborderID = suborderID
        if (status != "")
            searchCriteria.status = status


        this.setState({ searchCriteria: searchCriteria })
        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize
                },
                searchCriteria
            }

        };
        return request
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getSubOrderList && nextProps.typeData) {
            console.log(nextProps.getSubOrderList, "getSubOrderList")
            this.setState(
                {
                    gridData: this.formatContractData(nextProps.getSubOrderList),
                    isLoading: false,
                    typeData: nextProps.typeData,
                    page: nextProps.getPage
                }
            )
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['SubOrder_Status']));
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
        this.setState({
            actions:
                [{
                    "value": "1002", "type": "pageAction",
                    "label": "ADD", "labelName": "COM_AB_Add",
                    "actionType": "PORTLET_LINK", "iconName": "fa fa-plus",
                    "URI": "/strata/subOrder", "children": []
                }]
        })
        window.scrollTo(0, 0);
    }
    getStatusLabel = status => {
        if (this.state.typeData && this.state.typeData.SubOrder_Status) {
            let SubOrder_Status = this.state.typeData.SubOrder_Status;
            for (let i in SubOrder_Status) {
                if (SubOrder_Status[i].value == status) {
                    return SubOrder_Status[i].label;
                }
            }
        }
    }

    formatContractData = (gridData) => {
        for (let i in gridData) {
            let status = gridData[i].status;
            if (status) {
                gridData[i].status = this.getStatusLabel(status);
            }
            
        }
        return gridData;
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div>

                <Portlet title={utils.getLabelByID("Sub Order List")}>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Sub Order ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="subOrderID" id="subOrderID" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Status")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="status" id="status" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">


                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.formSubmit}>
                                        {utils.getLabelByID("Search")}
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>

                    <Portlet title={"sub order"} actions={this.state.actions} isPermissioned={true}>
                        {
                            this.state.gridData.map((obj) => {

                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/strata/subOrder"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })

                        }

                        <Table
                            gridColumns={utils.getGridColumnByName("suborder")}
                            gridData={this.state.gridData}
                            fontclass=""
                            totalRecords={this.props.getPage.totalRecords}
                            pageSize={10}
                            pageChanged={this.pageChanged}
                            pagination={true}
                            activePage={this.state.page.currentPageNo}
                        />
                    </Portlet>
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app.getSubOrderList, "state.app.getSubOrderList")
    return {
        typeData: state.app.typeData.data,
        getSubOrderList: _.get(state.app, "getSubOrderList.searchResult", []),
        getPage: _.get(state.app, "getSubOrderList.pageData", [])
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
SubOrderList.displayName = "SUBORDER";
export default connect(mapStateToProps, mapDispatchToProps)(SubOrderList);