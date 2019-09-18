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
import Portlet from "../../common/Portlet.jsx";
import ModalBox from '../../../../core/common/ModalBox.jsx';
import Pagination from "react-js-pagination";

import Steps from '../../../../core/common/Steps.jsx';
import Table from '../../../../core/common/Datatable.jsx';
import * as gen from "../../common/generalActionHandler";


const statusList = [
    {
        "label": "Sub Order",
        "status": true
    },
    {
        "label": "Dispatched",
        "status": false
    },
    {
        "label": "Received",
        "status": false
    },
    {
        "label": "Invoiced",
        "status": false
    },
    {
        "label": "Paid",
        "status": false
    }
]
class SubOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            optionalStatusValue: "",
            receiptModalBox: false,
            optionalStatusModalBox: false,
            timelineViewModalBox: false,
            isLoading: true,
            orderDetail: {},
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getOrderDetail, {
            "body": {
                "orderID": "954ac140-d931-11e9-8841-71e8cf5034b8",
                "customerID": "ETIHAD"
            }
        });
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderDetail) {
            console.log(this.props.subOrderID, "this.props.subOrderID")
            this.setState({
                orderDetail: nextProps.orderDetail,
                suborderDetail: nextProps.orderDetail.subOrder.filter(obj => { return obj.subOrderID = this.props.subOrderID }),
                isLoading: false
            })
        }

        // this.getItemName(nextProps.getItemCatalogue);
    }

    errorHandler(event) {
        event.target.src = "http://localhost:9086/images/1f31e930-e0d5-11e7-88e2-f718f78167e9.png"
    }


    render() {
        const suborder = this.state.suborderDetail ? this.state.suborderDetail[0] : []
        console.log('suborder', suborder)

        if (!this.state.isLoading)
            return (
                <div>

                    <div className="col-md-12">
                        <Portlet title={utils.getLabelByID("Sub Order")}>

                            <div className="row">
                                <div className="col-md-12">

                                    <div className="form-wizard stratawizard">
                                        {<Steps statusList={statusList} />}
                                    </div>

                                    <br />

                                    <div className="shadowBox Courierbox">
                                        <div className="form-group">
                                            <Row>
                                                <Col col="6">
                                                    <Label columns="6" text="Supplier ID :"></Label>
                                                    <Col col="6" >
                                                        <span>{suborder.supplierID}</span>
                                                    </Col>
                                                </Col>
                                                <Col col="3">

                                                    <Col col="12">
                                                        <img src="/assets/Resources/images/etihadlogo.png"
                                                            onError={this.errorHandler} />
                                                    </Col>

                                                </Col>
                                                <Col col="3">
                                                    <Col col="12">
                                                        <img src="/assets/Resources/images/etihadlogo.png" onError={this.errorHandler} />

                                                    </Col>
                                                </Col>


                                            </Row> <Row>
                                                <Col col="12">
                                                    <Label columns="12" className="hashno" text="0x53467374HJDBCJN73Y8923YUE23"></Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col col="6">
                                                    <Label columns="6" text="Amount:"></Label>
                                                    <Col col="6">
                                                        <span>AED {utils.formatAmountField(suborder.orderAmount || 0)}</span>
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col col="6">
                                                    <Label columns="6" text="Received Date:"></Label>
                                                    <Col col="6">
                                                        <span> {suborder.orderDate}</span>
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
                                                pagination={false}
                                                export={false}
                                                search={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Portlet>
                    </div>
                </div>
            );
        else return <div className="loader">{utils.getLabelByID("Loading")}</div>;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        orderDetail: _.get(state.app, 'orderDetail.order', undefined),
        subOrderID: ownProps.params.id,
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
