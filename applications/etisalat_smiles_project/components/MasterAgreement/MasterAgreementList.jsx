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

class MasterAgreementList extends React.Component {

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
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
    }
    reset = () => {
        document.getElementById('contractId').value = "";
        // document.getElementById('customer').value = "";
        document.getElementById('status').value = "";

        let request = {
            "body": {
                page: {
                    currentPageNo: 1,
                    pageSize: 10
                },
                searchCriteria: {}
            }
        }
        this.setState({ searchCriteria: {} });
        // this.props.actions.generalProcess(constants.getMasterAgreement, request);
    };

    redirectToAddPage = () => {
        //this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }

    getRequest = () => {

        let contractID = document.getElementById('contractId') == null ? "" : document.getElementById('contractId').value;
        // let customerID = document.getElementById('customer') == null ? "" : document.getElementById('customer').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        let searchCriteria = {}

        if (contractID != "")
            searchCriteria.contractID = contractID
        // if (customerID != "")
        //     searchCriteria.customerID = customerID
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
        return request;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getMasterAgreement && nextProps.typeData && nextProps.gridActions[0] && nextProps.gridActions[0].pageActions) {
            console.log(nextProps.gridActions[0].pageActions, "nextProps.gridActions[0].pageActions");
            let pageActions = nextProps.gridActions[0].pageActions;
            this.setState(
                {
                    gridData: nextProps.getMasterAgreement,
                    pageActions: nextProps.gridActions,
                    typeData: nextProps.typeData,
                    page: nextProps.getPage,
                    actions: pageActions,
                    isLoading: false
                }
            )
        }
    }



    componentDidMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['orderStatus']));
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());

        window.scrollTo(0, 0);
    }
    getStatusLabel = status => {
        if (this.state.typeData && this.state.typeData.orderStatus) {
            let orderStatus = this.state.typeData.orderStatus;
            for (let i in orderStatus) {
                if (orderStatus[i].value == status) {
                    return orderStatus[i].label;
                }
            }
        }
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div className="row">

                <Portlet title={utils.getLabelByID("Master Agreement")}>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Contract ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Status")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                {/* <input type="text" className="form-control" name="status" id="status" /> */}


                                <select id="status" name="status" className="form-control" >
                                    <option key="-1" value="">Select</option>

                                    <option key="0" value="INITIATED">INITIATED</option>
                                    <option key="1" value="APPROVED">APPROVED</option>

                                </select>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <div className="btn-toolbar pull-right">
                                        <button type="submit" className="btn green" onClick={this.formSubmit}>
                                            {utils.getLabelByID('Search')}
                                        </button>
                                        <button type="clear" className="btn green" onClick={this.reset}
                                        >
                                            {utils.getLabelByID("Clear")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portlet>
                <Portlet title={"Master Agreement"} actions={this.state.actions} isPermissioned={true}>


                    <Table
                        gridColumns={utils.getGridColumnByName("masterAgreement")}
                        gridData={this.state.gridData}
                        fontclass=""
                        totalRecords={this.props.getPage.totalRecords}
                        pageSize={10}
                        pageChanged={this.pageChanged}
                        pagination={true}
                        activePage={this.state.page.currentPageNo}
                    />


                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        gridActions: _.get(state.app, 'getMasterAgreement.actions', []),
        getMasterAgreement: _.get(state.app, "getMasterAgreement.searchResult", []),
        getPage: _.get(state.app, "getMasterAgreement.pageData", [])
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
MasterAgreementList.displayName = "MASTER AGREEMENT";
export default connect(mapStateToProps, mapDispatchToProps)(MasterAgreementList);





/*mapActionsOnGrid = (gridData) => {
        if (sessionStorage.orgType == "SUPPLIER") {
            gridData.map((obj) => {
                obj.action = [
                    {
                        "label": "View",
                        "URI": ["/strata/ViewMasterAgreement"],
                        "params": "_id",
                        "iconName": "fa fa-eye"
                    },
                    {
                        "label": "Edit",
                        "URI": ["/strata/AddMasterAgreement/"],
                        "params": "_id",
                        "iconName": "fa fa-edit"
                    }
                ]
            })
        } else {
            gridData.map((obj) => {
                obj.action = [
                    {
                        "label": "View",
                        "URI": ["/strata/ViewMasterAgreement"],
                        "params": "_id",
                        "iconName": "fa fa-eye"
                    }
                ]
            })
        }
        return gridData;
    }
    */


































