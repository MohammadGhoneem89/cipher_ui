
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import Col from '../../../../core/common/Col.jsx';
import Row from '../../../../core/common/Row.jsx';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import _ from 'lodash';
import * as requestCreator from '../../../../core/common/request.js';
import Label from '../../../../core/common/Lable.jsx';

class fileScreen extends React.Component {
    constructor(props) {
        console.log("View Settlements")
        super(props);
        this.state = {
            viewCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            actions: [],

            dashboardTiles: [{
                title: "Amount",
                value: "445",
                percentageTag: false
            }]

        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);

    }

    formSubmit = () => {
        // this.props.actions.generalProcess(constants.getViewTransactions, this.getRequest());
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
        // if (nextProps.getViewTransactions && nextProps.typeData && nextProps.gridActions[0] && nextProps.gridActions[0].pageActions) {
        // console.log(nextProps.gridActions[0].pageActions, "nextProps.gridActions[0].pageActions");
        // let pageActions = nextProps.gridActions[0].pageActions;
        this.setState(
            {
                isLoading: false
            }
        )
        // }
    }



    componentDidMount() {
        // this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['orderStatus']));
        // this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());

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
            <div className="form" style={{ marginBottom: '3%' }}>
                <div className="row">
                    <div className="col-md-5">
                        <label style={{ 'fontSize': '20px' }}> COMMERCIAL BANK OF DUBAI</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("From Date:")}</label>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="contractId" id="contractId" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("To Date:")}</label>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="contractId" id="contractId" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("File Name:")}</label>
                        </div>

                        <div className="form-group col-md-8">
                            <input type="text" className="form-control" name="contractId" id="contractId" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button type="submit" className="btn green" onClick={this.formSubmit}>
                                    {utils.getLabelByID('Search')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                < br />
        
                <Table
                    gridColumns={utils.getGridColumnByName("viewTranxList")}
                    gridData={[{ "no": "1", "tranx": "12212222", "acc": "555222", "ttype": "ACCURAL", "amount": "100045", "points": "12220211", "date": "01/12/2020", "status": "APPROVED", "partner": "ETIHAD" }]}
                    fontclass=""
                    totalRecords={this.props.getPage.totalRecords}
                    pageSize={10}
                    pageChanged={this.pageChanged}
                    pagination={true}
                    activePage={this.state.page.currentPageNo}
                />
                
                <Portlet title={utils.getLabelByID("UPLOAD FILES")}>

                    {/* <div className="row" style={{ border: "1px solid grey" }}>

                    </div> */}
                    <div className="row">
                        <div className="col-md-12" style={{ border: "1px solid grey", borderColor: "green" }}>
                            <label className="control-label">Allowed Files: files to be added with extension *.xml *.xls or *.csv</label>
                        </div>
                    </div>


                </Portlet>
            </div >
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
fileScreen.displayName = "FILES";
export default connect(mapStateToProps, mapDispatchToProps)(fileScreen);













