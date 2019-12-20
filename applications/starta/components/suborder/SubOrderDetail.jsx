/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../core/actions/generalAction";

import * as utils from "../../../../core/common/utils.js";
import * as constants from "../../../../core/constants/Communication";
import * as requestCreator from '../../../../core/common/request.js';
import * as coreConstants from '../../../../core/constants/Communication.js'

//Custom Components
import Select from "../../common/Select.jsx";
import Div from "../../common/Div.jsx";
import Row from "../../common/Row.jsx";
import Col from "../../common/Col.jsx";
import Label from "../../common/Lable.jsx";

import ModalBox from '../../../../core/common/ModalBox.jsx';
import Pagination from "react-js-pagination";

import Steps from '../../../../core/common/Steps.jsx';
import Table from '../../../../core/common/Datatable.jsx';
import * as gen from "../../common/generalActionHandler";

import QRCodeJquery from '../../common/QRCodeJquery.jsx'
import { baseUrl } from '../../../../core/constants/Communication.js';

class SubOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            suborderDetail: undefined,
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            statusList: [
                {
                    "label": "Sub Order",
                    "status": false,
                    "value": "001"
                },
                {
                    "label": "Dispatched",
                    "status": false,
                    "value": "002"
                },
                {
                    "label": "Received",
                    "status": false,
                    "value": "003"
                },
                {
                    "label": "Payment Order",
                    "status": false,
                    "value": "004"
                },
                {
                    "label": "Paid",
                    "status": false,
                    "value": "005"
                }
            ]
        };
        this.pageChanged = this.pageChanged.bind(this);
    }

    componentWillMount() {

    }
    updateStatus = (statusValue) => {
        let statuslist = this.state.statusList;
        for (let i in statuslist) {
            statuslist[i].status = true;
            if (statuslist[i].value == statusValue) {
                break;
            }
        }
        this.setState({
            statusList: statuslist
        })

    }

    getRequest = () => {
        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize
                },
                searchCriteria: { subOrderID: this.props.subOrderID }
            }

        };
        return request
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest())
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getSubOrderList && nextProps.getSubOrderList.length > 0) {
            this.setState({
                suborderDetail: nextProps.getSubOrderList[0],
                isLoading: false
            })
            this.updateStatus(nextProps.getSubOrderList[0].status);
        }

    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getSubOrderList, this.getRequest());
    }
    errorHandler(event) {
        event.target.src = "http://localhost:9086/images/1f31e930-e0d5-11e7-88e2-f718f78167e9.png"
    }

    generateQRCode = (BlockChainAddress) => {
        let qrString = '/hyperledger/hashSearch/' + BlockChainAddress;
        return (<div><QRCodeJquery size="135" errorCorrectionLevel="H" qrString={qrString} />
            <span><a href={qrString} target="_app">View</a></span><span style={{ fontSize: 5, width: "116px" }} /></div>)
    }

    render() {
        const suborder = this.state.suborderDetail ? this.state.suborderDetail : {}
        console.log('suborder', suborder)

        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        if (!this.state.isLoading && this.state.suborderDetail)
            return (
                <div  className="row">

                    <div className="col-md-12">
                        <div className="portlet light" style={{ minHeight: "854px" }}>

                            <div className="caption">
                                <span className="caption-subject">Sub Order</span>
                            </div>

                            <div className="row">
                                <div className="col-md-12">

                                    <div className="form-wizard stratawizard">
                                        {<Steps hideNumber={true} statusList={this.state.statusList} />}
                                    </div>

                                    <br />

                                    <div className="shadowBox Courierbox">
                                        <div className="form-group">
                                            <Row>

                                                <div className="col-md-12">
                                                    <div className="col-md-4">
                                                        <Label columns="12" style={{ fontSize: 22, paddingTop: '10px' }} 
                                                        text= {_.get(suborder, "entityName", "Etihad")}>
                                                        
                                                        </Label>
                                                    </div>
                                                    <div className="col-md-8" className='pull-right' style={{marginRight:'2%'}}>
                                                        <div className="col-md-4" style={{marginRight: '150px'}}>
                                                            <img className='img-thumbnail img-rounded' src={baseUrl + suborder.entityLogo}
                                                                style={{ width: '120px' }} onError={this.errorHandler} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            {suborder.trxid && this.generateQRCode(suborder.trxid)}
                                                        </div>
                                                    </div>
                                                </div>


                                            </Row>
                                            <Row>
                                                <div className="col-md-12">
                                                    {
                                                        suborder.trxid && (<Label columns="12" className="hashno" text={suborder.trxid} style={{marginTop: "-6%", marginLeft: "16px"}}></Label>)
                                                    }
                                                    {
                                                        suborder.trxid === "" && (<Label columns="12" className="hashno" text={suborder.orderID} style={{marginTop: "-5%", marginLeft: "16px"}}></Label>)
                                                    }

                                                </div>
                                            </Row>
                                            
                                            <Row>
                                                <Col col="6">
                                                    <Label columns="3" style={{marginLeft: "19px"}} text="Supplier ID :"></Label>
                                                    <Col col="9">
                                                        <span> {_.get(suborder, "entityName", "Etihad")} </span>
                                                    </Col>
                                                </Col>
                                            </Row>


                                            <Row>
                                                <Col col="6">
                                                    <Label columns="3" style={{marginLeft: "19px"}} text="Amount :"></Label>
                                                    <Col col="9">
                                                        <span>AED {utils.formatAmountField(suborder.orderAmount || 0)}</span>
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col col="6">
                                                    <Label columns="3" style={{marginLeft: "19px"}} text="Received Date :"></Label>
                                                    <Col col="9">
                                                        <span> {suborder.orderDate && suborder.orderDate.split(' ')[0]}</span>
                                                    </Col>
                                                </Col>
                                            </Row>



                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="portlet light bordered sdg_portlet ProCardssection">
                                <div className="portlet-title">
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title="true" title="" />
                                    </div>
                                    <div className="caption"><span className="caption-subject">Line Items</span></div>
                                    <div className="actions" />
                                </div>
                                <div className="portlet-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Table
                                                gridColumns={utils.getGridColumnByName('SubOrderItems')}
                                                gridData={suborder.items || []}
                                                totalRecords={this.props.getPage.totalRecords}
                                                pageSize={10}
                                                pageChanged={this.pageChanged}
                                                pagination={true}
                                                activePage={this.state.page.currentPageNo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getSubOrderList: _.get(state.app, "getSubOrderList.searchResult", []),
        subOrderID: ownProps.params.id,
        getPage: _.get(state.app, "getSubOrderList.pageData", [])
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

SubOrder.displayName = "__HIDE";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubOrder);
