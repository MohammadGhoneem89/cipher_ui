
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../../core/common/utils.js';
import Table from '../../../../../core/common/Datatable.jsx';
import * as actions from '../../../../../core/actions/generalAction';
import * as constants from '../../../../../core/constants/Communication.js';
import Portlet from '../../../../../core/common/Portlet.jsx';
import Col from '../../../../../core/common/Col.jsx';
import Row from '../../../../../core/common/Row.jsx';
import TileUnit from '../../../../../core/common/tileUnit.jsx';
import _ from 'lodash';
import * as requestCreator from '../../../../../core/common/request.js';
import Label from '../../../../../core/common/Lable.jsx';

class ViewSettlement extends React.Component {
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
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        let searchCriteria = {}

        if (contractID != "")
            searchCriteria.contractID = contractID

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

        this.setState(
            {
                isLoading: false
            }
        )
    }

    componentDidMount() {
        // this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['orderStatus']));
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

        return (
            <Row>
                <Col>
                    <div className="form" style={{ marginBottom: '3%' }}>
                        <div className="row">
                            <div className="col-md-offset-4 col-md-12">
                                <div className="col-md-2">
                                    <img src="/assets/imgs/gift.jpg" style={{ height: "150px" }} />
                                </div>

                                <div className="col-md-3 text-center" >
                                    <div style={{ fontSize: "30px", marginTop: "30px" }}><b>CBD-76545677</b></div>
                                    <div className="row" style={{ marginTop: "30px" }}>Commercial Bank of Dubai (10/10/2019-20/10/2019)</div>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-md-offset-2">
                                <div className="col-3">
                                    <TileUnit data={[{
                                        title: "AMOUNT",
                                        value: "445.00",
                                        percentageTag: true
                                    }]} />
                                </div>
                                <div className="col-3">
                                    <TileUnit data={[{
                                        title: "Commission",
                                        value: "566.00",
                                        percentageTag: true
                                    }]} />
                                </div>
                                <div className="col-3">
                                    <TileUnit data={[{
                                        title: "POINTS",
                                        value: "6777",
                                        percentageTag: true
                                    }]} />
                                </div>
                            </div>
                        </div>
                        <br />

                        <Portlet title={utils.getLabelByID("TRANSACTIONS")}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">{utils.getLabelByID("Start Date")}</label>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <input type="text" className="form-control" name="contractId" id="contractId" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <label className="control-label">{utils.getLabelByID("End Date")}</label>
                                    </div>
                                    <div className="form-group col-md-8">
                                        <input type="text" className="form-control" name="contractId" id="contractId" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="submit" className="btn green" onClick={this.formSubmit}>
                                                {utils.getLabelByID('Search')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                <Col>
                                    <Table
                                        gridColumns={utils.getGridColumnByName("viewTranxListNew")}
                                        gridData={[{ "no": "1", "tranx": "12212222", "acc": "555222", "ttype": "ACCURAL", "amount": "100045", "points": "12220211", "date": "01/12/2020", "status": "APPROVED", "partner": "ETIHAD" }]}
                                        fontclass=""
                                        totalRecords={this.props.getPage.totalRecords}
                                        pageSize={10}
                                        pageChanged={this.pageChanged}
                                        pagination={true}
                                        activePage={this.state.page.currentPageNo}
                                    />
                                </Col>
                            </Row>
                        </Portlet>
                    </div >
                </Col>
            </Row>
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
ViewSettlement.displayName = "View Settlement";
export default connect(mapStateToProps, mapDispatchToProps)(ViewSettlement);













