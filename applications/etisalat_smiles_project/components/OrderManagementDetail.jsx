/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
//import * as constants from "../../../core/constants/Communication";

import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import * as gen from '../common/generalActionHandler'

//import * as utils from '../common/utils.js';
import * as utils from '../../../core/common/utils.js';

import Portlet from '../../../core/common/Portlet.jsx';
//import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import Input from '../../../core/common/Input.jsx';
import Checkbox from '../../../core/common/CheckBox.jsx';
import Table from '../../../core/common/Datatable.jsx';
import Textarea from '../../../core/common/Textarea.jsx';
import Steps from "../../../core/common/Steps.jsx";
import Row from '../../../core/common/Row.jsx';
import Map from "./Charts/Map.jsx";
import Col from '../../../core/common/Col.jsx';
import Tabs from '../common/Tabs.jsx';

class OrderManagementDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords: 10,
            pageSize: 5,
            currentPageNo: 1,
            checked: false,
            valid: true,
            addShop: {},
            gridData: [
                { "serial_no": "1", "attribute": "12212222", "value": "555222" },
                { "serial_no": "1", "attribute": "12212222", "value": "555222" },
                { "serial_no": "1", "attribute": "12212222", "value": "555222" },
                { "serial_no": "1", "attribute": "12212222", "value": "555222" },
            ],
            tracking: [
                { "serial_no": "1", "dateTime": "12212222", "status": "555222" },
                { "serial_no": "1", "dateTime": "12212222", "status": "555222" },
                { "serial_no": "1", "dateTime": "12212222", "status": "555222" },
                { "serial_no": "1", "dateTime": "12212222", "status": "555222" },
                { "serial_no": "1", "dateTime": "12212222", "status": "555222" },
            ]
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }



    componentWillMount() {
    }

    componentDidMount() {


    }



    componentWillReceiveProps(nextProps) {

    }
    onChangeCheckbox() {
        this.setState({
            checked: !this.state.checked
        })
    }
    updateState = (data) => {
        this.setState(data);
    }


    render() {
        return (
            <div className="row">
                 <Tabs />
                <Portlet >
                    <div>
                        <Row>
                            <Col >
                                {/* <div className="form-wizard stratawizard"> */}
                                {
                                    <Steps
                                        hideNumber={false}
                                        statusList={['Submitted','Accepted','SubStatus','Delivered']}
                                    />
                                }
                                {/* </div> */}
                            </Col>
                        </Row>

                        <br />
                        <br />
                        <div className="row">


                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft: "20px" }}><b>Order datils</b></div>

                            <div className="row">

                                <div className="col-md-8" >

                                    <div className="row" >
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Title</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label className="control-label">Extra Large shoes</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Description</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label className="control-label">Large size</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Quantity</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label className="control-label">7</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" >
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Total Amount</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label className="control-label">300 ADE</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-4">
                                    <img src="/assets/imgs/palceholder.jpg" />
                                </div>


                            </div>


                            <Table
                                gridColumns={utils.getGridColumnByName("OderManagementDetails")}
                                //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                gridData={this.state.gridData}
                                //totalRecords={this.state.totalRecords}
                                pageSize={10}
                                //pageChanged={this.pageChanged}
                                pagination={true}
                                activePage={this.state.currentPageNo}
                            />

                        </div>









                        {/** <div className="addShopBoxText" style={{ color: "#089729"  }}><b>OPENING HOURS</b></div> */}





                        <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft: "20px" }}><b>Tracking</b></div>

                            <Table
                                gridColumns={utils.getGridColumnByName("OderManagementDetailsTracking")}
                                //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                gridData={this.state.tracking}
                                //totalRecords={this.state.totalRecords}
                                pageSize={10}
                                //pageChanged={this.pageChanged}
                                pagination={true}
                                activePage={this.state.currentPageNo}
                            />
                        </div>


                        <div className="row clearfix addShopBox">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft: "20px" }}><b>DILIVERY TERMS</b></div>

                            {/*Map */}



                            <div className="row">
                                <div className="col-md-8">
                                    <Map
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJn2Pqx6Pe_faA0DLLWUkHo1iXEOBXBvs"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        center={{ lat: parseFloat(-34.397), lng: parseFloat(150.64) }}
                                        zoom={3}
                                        disabled={true}
                                        prelocation={[{
                                            id: 0,
                                            lat: parseFloat(-34.397),
                                            lng: parseFloat(150.644)
                                        },
                                        {
                                            id: 1,
                                            lat: parseFloat(-40.397),
                                            lng: parseFloat(160.644)

                                        },
                                        {
                                            id: 2,
                                            lat: parseFloat(-50.397),
                                            lng: parseFloat(177.644)

                                        }
                                        ]}


                                        updateState={this.updateState}
                                    />
                                </div>
                                <div className="col-md-4 MapAxis">
                                    <div className="row">
                                        <div className="col-md-4" style={{ width: "300px", marginBottom: "10px" }}>
                                            <label className="control-label">{utils.getLabelByID("burg tower Near metro station")}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4" style={{ width: "300px", marginBottom: "10px" }}>
                                            <label className="control-label">{utils.getLabelByID("Phone Number# 00")}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4" style={{ width: "300px", marginBottom: "10px" }}>
                                            <label className="control-label">{utils.getLabelByID("Email: mohammadMusach@gmail.com")}</label>
                                        </div>
                                    </div>

                                </div>
                            </div>



                            {/*Map */}
                            <div className="row clearfix pull-right" style={{ marginTop: "30px" }}>
                                <div className="col-md-4" style={{ paddingRight: '50px' }}>
                                    <button type="button" className="btn default" >
                                        Approve
                                        </button>
                                </div>
                            </div>



                        </div>




                    </div>

                </Portlet>

            </div>

        );
    }
}

function mapStateToProps(state, ownProps) {
    //console.log(state.app)
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

OrderManagementDetail.displayName = "Order Management";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderManagementDetail);

