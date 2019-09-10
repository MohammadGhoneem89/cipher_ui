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
    redirectToAddPage = () => {
        //this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }

    getRequest = () => {

        let contractID = document.getElementById('contractId') == null ? "" : document.getElementById('contractId').value;
        let customerID = document.getElementById('customer') == null ? "" : document.getElementById('customer').value;
        let searchCriteria = {}

        if (contractID != "")
            searchCriteria.contractID = contractID
        if (customerID != "")
            searchCriteria.customerID = customerID


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
        if (nextProps.getMasterAgreement && nextProps.typeData) {
            console.log(nextProps.getMasterAgreement, "getMasterAgreement")
            this.setState(
                {
                    gridData: this.formatContractData(nextProps.getMasterAgreement),
                    isLoading: false,
                    typeData: nextProps.typeData,
                    page: nextProps.getPage
                }
            )
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['orderStatus']));
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
        this.setState({
            actions:
                [{
                    "value": "1002", "type": "pageAction",
                    "label": "ADD", "labelName": "COM_AB_Add",
                    "actionType": "PORTLET_LINK", "iconName": "fa fa-plus",
                    "URI": "/strata/AddMasterAgreement", "children": []
                }]
        })
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
        this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div>

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
                                <label className="control-label">{utils.getLabelByID("Customer")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="customer" id="customer" />
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

                    <Portlet title={"Master Agreement"} actions={this.state.actions} isPermissioned={true}>
                        {
                            this.state.gridData.map((obj) => {

                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/strata/ViewMasterAgreement"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })

                        }

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
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app.getMasterAgreement, "state.app.getMasterAgreement")
    return {
        typeData: state.app.typeData.data,
        getMasterAgreement: _.get(state.app, "getMasterAgreement.searchResult", []),
        getPage: _.get(state.app, "getMasterAgreement.pageData", [])
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
MasterAgreementList.displayName = "MASTER AGREEMENT";
export default connect(mapStateToProps, mapDispatchToProps)(MasterAgreementList);


































