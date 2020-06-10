/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";

// import * as utils from "../../../core/common/utils.js";
import * as constants from "../constants/appCommunication.js";

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
import TextArea from '../../../core/common/Textarea.jsx';
import Checkbox from '../../../core/common/CheckBox.jsx';
import Table from '../../../core/common/Datatable.jsx';

class AddNewMerchant extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords: 10,
            pageSize: 5,
            currentPageNo: 1,
            userDetail: {},
            checked: false,
            valid: true,
            addShop: {},
            gridData: [
                { "serial_no": "1", "shopCode": "12212222", "locationX": "555222", "locationY": "7899" },
                { "serial_no": "1", "shopCode": "12212222", "locationX": "555222", "locationY": "7899" },
                { "serial_no": "1", "shopCode": "12212222", "locationX": "555222", "locationY": "7899" },
                { "serial_no": "1", "shopCode": "12212222", "locationX": "555222", "locationY": "7899" },
                { "serial_no": "1", "shopCode": "12212222", "locationX": "555222", "locationY": "7899" },
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
    imgDiv() {
        return (
            <div className="col-md-12" style={{ textAlign: "center" }}>
                <img
                    id="UserProfilePic"
                    src={this.state.userDetail.profilePic ? constants.baseUrl + this.state.userDetail.profilePic : "/assets/Resources/images/default.png"}
                    onError={this.addDefaultSrc}
                    className="img-responsive img-thumbnail" alt="Profile Image" width='190px'
                    height='190px'
                    ref={input => this.profilePic = input}
                />
                <br />
                <span
                    className="label label-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        console.log('Upload Image Clicked.')
                        this.profilePicUploader.click();
                    }}
                >
                    {"Upload Image"}
                </span>

                <input
                    name="profilePicUploader"
                    id='profilePicUploader'
                    type='file'
                    style={{ display: 'none' }}
                    ref={input => this.profilePicUploader = input}
                    onChange={(e) => {
                        console.log('Profile pic on change')
                        let reader = new FileReader();
                        let files = e.target.files;
                        let _this = this;

                        if (files && files[0]) {

                            reader.onload = function (fileReader) {
                                _this.profilePic.setAttribute('src', fileReader.target.result);

                                _this.props.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
                                    byteData: fileReader.target.result,
                                    context: {
                                        name: files[0].name,
                                        size: files[0].size,
                                        type: files[0].type
                                    }
                                })).then(result => {
                                    _this.setState({
                                        userDetail: {
                                            ..._this.state.userDetail,
                                            profilePic: result.entityLogo.sizeSmall
                                        }
                                    })
                                });
                            };
                            reader.readAsDataURL(files[0]);
                        }
                    }} />
            </div>
        )
    }
    addNewMerchant() {
        const { merchantCode, merchantNameEn, merchantNameAr, partnerCode, whatYouGetEn, whatYouGetAr, merchantDescEn, merchantDescAr,
            barCodeType, termsandConditionsAr, termsandConditionsEn, category, contacts, billingRates } = this.state;
        let obj = {
            "body": {
                "merchantCode": "BKN",
                "merchantNameEn": "BASKIN ROBINS",
                "merchantNameAr": "",
                "partnerCode": "YGAG",
                "whatYouGetEn": "",
                "whatYouGetAr": "",
                "merchantDescEn": "",
                "merchantDescAr": "",
                "barCodeType": "",
                "termsandConditionsEn": "",
                "termsandConditionsAr": "",
                "category": [
                    "Banking"
                ],
                "contacts": [
                    {
                        "firstName": "contact 1",
                        "lastName": "contact 1",
                        "email": "a@b.com",
                        "phone": "0502398493",
                        "mobile": "050234883",
                        "address": "La Mer",
                        "mode": "A"
                    }
                ],
                "billingRates": [
                    {
                        "serialNo": 1,
                        "startDate": 1452,
                        "endDate": 745,
                        "rateType": "",
                        "rate": 1.11,
                        "paymentMethod": "SMILES",
                        "mode": "A"
                    }
                ]
            }
        }
        this.props.actions.generalProcess(constants.addEditMerchant, obj);
    }


    render() {
        return (
            <div className="row">

                <Portlet >
                    <div>

                        <div className="row">

                            <div className="row" style={{marginBottom: '20px'}}>

                                <div className="col-md-8" >

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Partner Code</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                YGAG
                                        </div>
                                        </div>
                                    </div>

                                    <div className="row" >
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Merchant Code</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="contractId" id="contractId" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" >
                                        <div className="col-md-8">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Merchant Rank</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="contractId" id="contractId" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    {this.imgDiv()}

                                </div>


                            </div>



                        </div>


                        <div className="row">

                            <div className="col-md-12 ">
                                <div className="portlet light bordered sdg_portlet">
                                    <div className="portlet-title">
                                        <div className="tools">
                                            <a href="javascript:;" className="collapse" data-original-title title> </a>
                                        </div>
                                    </div>
                                    <div className="portlet-body">
                                        <div className="form-body" id="APIPayloadList">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Name (En)</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input fieldname="nameEng" formname="searchCriteria" state={this.state}
                                                            actionHandler={this.generalHandler} className="form-control" />


                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Name (Ar)</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input valueOnly={false} fieldname='nameAra' formname='searchCriteria' style={{}}
                                                            state={this.state} className="form-control" typeName="nameAra"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Contact Name</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input fieldname='name' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="name" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Phone no</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input fieldname='phoneNumber' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="phoneNumber" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Mobile No</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input fieldname="mobileNo" formname="searchCriteria" state={this.state}
                                                            actionHandler={this.generalHandler} className="form-control" />


                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Email</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input valueOnly={false} fieldname='stage' formname='searchCriteria' style={{}}
                                                            state={this.state} className="form-control" typeName="invoiceStage"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label">Partner Type</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <Input fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                            </div>
                                            <div>
                                                <Checkbox
                                                    fieldname='isActive'
                                                    formname='addShop'
                                                    value={this.state.checked}
                                                    columns='1'
                                                    style={{}}
                                                    actionHandler={this.onChangeCheckbox}
                                                    disabled={false}
                                                />
                                                {/** <label htmlFor="checkbox">is Active</label>*/}
                                                <label style={{ marginLeft: "-52px" }}>is Active</label>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="form-group col-md-3">
                                                        <label className="control-label">Partner Type</label>
                                                    </div>
                                                    <div className="form-group col-md-1">
                                                        <label className="control-label">EN</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <TextArea style={{ maxWidth: '430px' }} fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group col-md-2">
                                                        <label className="control-label">AR</label>
                                                    </div>
                                                    <div className="form-group col-md-10">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="form-group col-md-3">
                                                        <label className="control-label">Terms and Conditions</label>
                                                    </div>
                                                    <div className="form-group col-md-1">
                                                        <label className="control-label">EN</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group col-md-2">
                                                        <label className="control-label">AR</label>
                                                    </div>
                                                    <div className="form-group col-md-10">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="form-group col-md-3">
                                                        <label className="control-label">What You Get</label>
                                                    </div>
                                                    <div className="form-group col-md-1">
                                                        <label className="control-label">EN</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group col-md-2">
                                                        <label className="control-label">AR</label>
                                                    </div>
                                                    <div className="form-group col-md-10">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="form-group col-md-3">
                                                        <label className="control-label">What you get reduced</label>
                                                    </div>
                                                    <div className="form-group col-md-1">
                                                        <label className="control-label">EN</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group col-md-2">
                                                        <label className="control-label">AR</label>
                                                    </div>
                                                    <div className="form-group col-md-10">
                                                        <TextArea fieldname='utcStatus' formname='searchCriteria' style={{}}
                                                            state={this.state} typeName="utcStatus" className="form-control"
                                                            dataSource={[]} multiple={false} actionHandler={this.generalHandler} />

                                                    </div>

                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/** <div className="addShopBoxText" style={{ color: "#089729"  }}><b>OPENING HOURS</b></div> */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet light bordered sdg_portlet">
                                    <div className="portlet-title">
                                        OFFERS
                                    </div>
                                    <div className="portlet-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="portlet light bordered sdg_portlet">
                                                    <div className="portlet-title">
                                                        VOUCHER CODE GENERATION
                                                    </div>
                                                    <div className="portlet-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="" style={{ opacity: '1' }}>
                                                                    <div className="portlet-body flip-scroll">
                                                                        <div className="row">
                                                                            <div className="col-md-10 col-md-offset-1">

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        <img src="/assets/Resources/Redemption.png" width="20%" />
                                                                                        <h5><strong>Partner Pre-Generated</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="Redemption" value="" className="form-control" />
                                                                                                <span></span></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        <img src="/assets/Resources/Accrual.png" width="20%" />
                                                                                        <h5><strong>Etisalat</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="Accrual" value="" className="form-control" />
                                                                                                <span></span></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                                                        <h5><strong>Partner Dynamic</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="pointConverstion" className="form-control" />
                                                                                                <span></span></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                                                        <h5><strong>Blockchain</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="pointConverstion" className="form-control" />
                                                                                                <span></span></label>
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
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="portlet light bordered sdg_portlet">
                                                    <div className="portlet-title">
                                                        BAR CODE TYPE
                                                    </div>
                                                    <div className="portlet-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="" style={{ opacity: '1' }}>
                                                                    <div className="portlet-body flip-scroll">
                                                                        <div className="row">
                                                                            <div className="col-md-10 col-md-offset-1">

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        {/*<img src="/assets/Resources/Redemption.png" width="20%" />*/}
                                                                                        <img src="/assets/imgs/barcode.jpg" className="smilesImage" />
                                                                                        <h5><strong>A66889257779A</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="Redemption" value="" className="form-control" />
                                                                                                <span></span></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        {/*<img src="/assets/Resources/Accrual.png" width="20%" />*/}
                                                                                        <img src="/assets/imgs/barcode.jpg" className="smilesImage" />
                                                                                        <h5><strong>A66889257779A</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="Accrual" value="" className="form-control" />
                                                                                                <span></span></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        {/*<img src="/assets/Resources/pointConverstion.png" width="20%" />*/}
                                                                                        <img src="/assets/imgs/barcode.jpg" className="smilesImage" />
                                                                                        <h5><strong>A66889257779A</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="pointConverstion" className="form-control" />
                                                                                                <span></span></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-3 text-center">
                                                                                    <div className="voucherBox">
                                                                                        {/**<img src="/assets/Resources/pointConverstion.png" width="20%" /> */}
                                                                                        <img src="/assets/imgs/barcode.jpg" className="smilesImage" />
                                                                                        <h5><strong>A66889257779A</strong></h5>
                                                                                        <div className="icheck-list">
                                                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                                                <label></label>
                                                                                                <input type="checkbox" name="pointConverstion" className="form-control" />
                                                                                                <span></span></label>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/**Barcode end  */}

                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet light bordered sdg_portlet">
                                    <div className="portlet-title">
                                        PRODUCTS
                                                    </div>
                                    <div className="portlet-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="portlet light bordered sdg_portlet">
                                                    <div className="portlet-title">

                                                    </div>
                                                    <div className="portlet-body">
                                                        <div className="row">
                                                            <div className="row" style={{ marginLeft: "50px", color: "#E0E0E0", marginBottom: "20px" }}><b>Allow Catalog upload</b></div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <Checkbox
                                                                        fieldname='isActive'
                                                                        formname='addShop'
                                                                        value={this.state.checked}
                                                                        columns='1'
                                                                        style={{}}
                                                                        actionHandler={this.onChangeCheckbox}
                                                                        disabled={false}
                                                                    />
                                                                    {/** <label htmlFor="checkbox">is Active</label>*/}
                                                                    <label htmlFor="checkbox">User Interface</label>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <Checkbox
                                                                        fieldname='isActive'
                                                                        formname='addShop'
                                                                        value={this.state.checked}
                                                                        columns='1'
                                                                        style={{}}
                                                                        actionHandler={this.onChangeCheckbox}
                                                                        disabled={false}
                                                                    />
                                                                    {/** <label htmlFor="checkbox">is Active</label>*/}
                                                                    <label htmlFor="checkbox">Listner</label>
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
                        </div>





                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet light bordered sdg_portlet">
                                    <Checkbox
                                        fieldname='isActive'
                                        formname='addShop'
                                        value={this.state.checked}
                                        columns='1'
                                        style={{}}
                                        actionHandler={this.onChangeCheckbox}
                                        disabled={false}
                                    />
                                    {/** <label htmlFor="checkbox">is Active</label>*/}
                                    <label htmlFor="checkbox">Escrow Purchase</label>
                                </div>
                            </div>
                        </div>

                        <div className="portlet light bordered sdg_portlet">
                            <div className="addShopBoxText" style={{ color: "#089729", marginLeft: "20px" }}><b>SHOP</b></div>
                            <div className="pull-right">
                                <div className="col-md-2"></div>
                                <div className="col-md-6"><button type="submit" className="btn green">Add </button></div>
                            </div>

                            <Table
                                gridColumns={utils.getGridColumnByName("AddNewMerchant")}
                                //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                                gridData={this.state.gridData}
                                //totalRecords={this.state.totalRecords}
                                pageSize={10}
                                //pageChanged={this.pageChanged}
                                pagination={true}
                                activePage={this.state.currentPageNo}
                            />
                        </div>

                        <div className="row clearfix pull-right" style={{ marginTop: "30px" }}>
                            <div className="col-md-4">
                                <button type="button" className="btn default" onClick={() => this.addNewMerchant()} >
                                    Save
                                </button>
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

AddNewMerchant.displayName = "View / Edit Merchants";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewMerchant);





/**
 * <div className="row">
                              <div className="addShopBoxText" style={{ color: "#089729", marginLeft:"20px"  }}><b>OFFERS</b></div>
                        </div>
                            <div className="row imageDiv">
                                    <div className="row smilesImageText" ><b>VOUCHER CODE GENERATION</b></div>
                                    <div className="row" style={{marginLeft:"50px"  }}>
                                        <div className="col-md-3"><img src="/assets/imgs/partnerdynamic.jpg" className="smilesImage"/></div>
                                        <div className="col-md-3"><img src="/assets/imgs/etisalat.jpg" className="smilesImage"/></div>
                                        <div className="col-md-3"><img src="/assets/imgs/partnerdynamic.jpg" className="smilesImage"/></div>
                                        <div className="col-md-3"><img src="/assets/imgs/clockchain.jpg" className="smilesImage"/></div>

                                    </div>
                            </div>
 */



/**
 *  BarCode Start*
 <div className="row imageDiv">
 <div className="row smilesImageText" ><b>BARCODE TYPE</b></div>
    <div className="row" style={{marginLeft:"50px"  }}>
        <div className="col-md-3">
            <div className="row" style={{marginLeft:"50px", color:"#E0E0E0" }}><b>CODE 123</b></div>
            <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
        </div>
        <div className="col-md-3">
            <div className="row" style={{marginLeft:"50px", color:"#E0E0E0"}}><b>CODE 123</b></div>
            <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
        </div>
        <div className="col-md-3">
            <div className="row" style={{marginLeft:"50px", color:"#E0E0E0" }}><b>CODE 123</b></div>
            <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
        </div>
        <div className="col-md-3">
            <div className="row" style={{marginLeft:"50px", color:"#E0E0E0" }}><b>CODE 123</b></div>
            <div className="row"> <img src="/assets/imgs/barcode.jpg" className="smilesImage"/></div>
        </div>
    </div>
</div>
</div>


 */