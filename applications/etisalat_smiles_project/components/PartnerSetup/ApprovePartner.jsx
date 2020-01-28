import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';


import Input from '../../../../core/common/Input.jsx'
import Label from '../../../../core/common/Lable.jsx';
import Combobox from '../../../../core/common/Select.jsx';
import DateControl from '../../../../core/common/DateControl.jsx'
import Portlet from '../../../../core/common/Portlet.jsx'
import Steps from '../../../../core/common/Steps.jsx';
import * as toaster from '../../../../core/common/toaster.js';

import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';

import Textarea from '../../../../core/common/Textarea.jsx';

import * as gen from '../../../../core/common/generalActionHandler';
import * as requestCreator from '../../../../core/common/request.js';
import * as constants from '../../../../core/constants/Communication.js';

import { browserHistory } from 'react-router';
class ApprovePartner extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            body: {},
            isLoading: true,
            subsidaryPartnerBool: false,
            subsidaryPartners: [],
            contactInformationArr: [],
            contactInformation: {},
            erpSettingsFromArr: [],
            erpSettingsToArr: [],
            erpSettingsFrom: {},
            erpSettingsTo: {},
            contractParams: {},
            contractParamsArr: [],
            accrualTermsArr: [],
            accrualTerms: {},
            redemptionTermsArr: [],
            redemptionTerms: {},
            pointCreditRulesArr: [],
            pointCreditRules: {},
            settlementArr: [],
            settlement: {},
            pointConversionArr: [],
            pointConversion: {},
            isPointConversionPartner: false,
            isAccrualPartner: false,
            isRedemptionPartner: false,
            ratesArr: [],
            rates: {},
            isEdited: false

        };
        this.generalHandler = gen.generalHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getPartnerDataByID) {
            let body = {
                ...nextProps.getPartnerDataByID
            }
            this.setState({
                body,
                isLoading: false
            })
        }
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['category', 'rule', 'frequency', 'settleas', 'status', 'contactMode', 'rateType', 'paymentMethod']));

        if (this.props.params.partnerCode) {
            this.props.actions.generalProcess(constants.getPartnerByID, {
                "body": {
                    "partnerCode": this.props.params.partnerCode
                }
            })
        }
    }

    dateChange = (fieldName, value) => {
        console.log(value)
        if (value == 'Invalid date') {
            this.setState({ [fieldName]: undefined })
        } else {
            this.setState({ [fieldName]: value })
        }
    }

    addDefaultSrc = e => e.target.src = constants.baseUrl + "/images/image-user.png";

    imgDiv(formname, imgStyle = {}, divStyle = {}) {
        return (
            <div className="col-md-12" style={{ textAlign: "center", ...divStyle }}>
                <img
                    id="UserProfilePic"
                    src={_.get(this.state, `${formname}.logo`, undefined) ? constants.baseUrl + _.get(this.state, `${formname}.logo`, undefined) : constants.baseUrl + "/images/image-user.png"}
                    onError={this.addDefaultSrc}
                    className="img-responsive img-thumbnail" alt="Profile Image" width='150px'
                    height='150px'
                    style={{ ...imgStyle }}
                    ref={input => this.logo = input}
                />
                <br />

                <button
                    className="btn green"
                    style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
                    onClick={() => {
                        this.profilePicUploader.click();
                    }}
                >
                    {"Upload Image"}
                </button>

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
                                _this.logo.setAttribute('src', fileReader.target.result);

                                _this.props.actions.generalAjxProcess(constants.uploadImg, requestCreator.createImgUploadRequest({
                                    byteData: fileReader.target.result,
                                    context: {
                                        name: files[0].name,
                                        size: files[0].size,
                                        type: files[0].type
                                    }
                                })).then(result => {


                                    _this.setState({
                                        [formname]: {
                                            ..._.get(_this.state, `${formname}.logo`, {}),
                                            logo: result.entityLogo.sizeSmall,
                                            ..._.get(_this.state, `${formname}`, {}),
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

    addSubsidaryPartner = () => {

        let contractParams = { ...this.state.contractParams };
        let contractParamsArr = [...this.state.subsidaryPartners];
        let settlement = { ...this.state.settlement };
        let accrualterms = this.state.accrualTermsArr;
        let erpSettingsTo = { ...this.state.erpSettingsTo }
        let erpSettingsFrom = { ...this.state.erpSettingsFrom }
        let pointRule = { ...this.state.pointCreditRules }

        contractParams.isAccrualPartner = this.state.isAccrualPartner;
        contractParams.isRedemptionPartner = this.state.isRedemptionPartner;
        contractParams.isPointConversionPartner = this.state.isPointConversionPartner;

        if (this.state.settlementStartOn) {
            settlement.startsOn = this.state.settlementStartOn;
        }
        settlement.currency = "AED";

        if (!contractParams.withPartnerCode) {
            toaster.showToast('Subsidary Partner code is required', 'ERROR');
            return;
        }
        // if (accrualterms.length == 0) {
        //     toaster.showToast("Accrual Terms are required", "ERROR");
        //     return;
        // }

        // if (Object.keys(erpSettingsFrom).length == 0) {
        //     toaster.showToast("Please provide an ERP from Setting.", "ERROR");
        //     return;
        // }

        // console.log("settlement >>> ", settlement)
        // if (!settlement.startsOn || !settlement.settleAs || !settlement.frequency) {
        //     toaster.showToast("All fields are required for Settlement", "ERROR");
        //     return;
        // }

        // if (!erpSettingsTo.vendorCode || !erpSettingsTo.glcode || !erpSettingsTo.billingAccount || !erpSettingsTo.vendorSiteID) {
        //     toaster.showToast("Please provide an ERP To Settings", "ERROR");
        //     return;
        // }

        if (!contractParams) {
            toaster.showToast('Subsidary Partner Details not added.', 'ERROR');
            return;
        }


        contractParams.settlements = settlement
        contractParams.erpSettingsTo = { ...erpSettingsTo }
        contractParams.accrualBillingRates = [...this.state.accrualTermsArr]

        for (let i in contractParams.accrualBillingRates) {
            let sellingrate = parseFloat(contractParams.accrualBillingRates[i].sellingRate)
            contractParams.accrualBillingRates[i].startDate = parseInt(contractParams.accrualBillingRates[i].startDate)
            contractParams.accrualBillingRates[i].endDate = parseInt(contractParams.accrualBillingRates[i].endDate)
            contractParams.accrualBillingRates[i].sellingRate = sellingrate
            contractParams.accrualBillingRates[i].serialNo = parseInt(i + 1)
        }
        contractParams.conversionBillingRates = [...this.state.ratesArr]

        //let pointRule = { ...this.state.pointCreditRules }
        pointRule.maxUnSettledAmount = parseInt(pointRule.maxUnSettledAmount || -1)
        contractParams.pointCreditRules = { ...pointRule }

        contractParams.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
        contractParamsArr.push({ ...contractParams });


        console.log("contactParams >>>> ", contractParams)
        this.setState({
            contractParamsArr,
            contractParams: {},
            settlement: {},
            erpSettingsTo: {},
            accrualTermsArr: [],
            pointCreditRulesArr: [],
            pointCreditRules: {},
            settlementStartOn: undefined,
            isEdited: false
        })
        this.stateChangeSubsidaryPartnerBool();
    }

    addAccuralTerm = () => {
        let accrualTermsArr = [...this.state.accrualTermsArr]
        let accrualTerms = { ...this.state.accrualTerms }
        if (this.state.accuralStartDate) {
            accrualTerms.startDate = this.state.accuralStartDate
            accrualTerms.accuralStartDate = this.state.accuralStartDate
        }
        if (this.state.accuralEndDate) {
            accrualTerms.endDate = this.state.accuralEndDate
            accrualTerms.accuralEndDate = this.state.accuralEndDate
        }

        if (!accrualTerms.startDate || !accrualTerms.endDate || !accrualTerms.sellingRate || !accrualTerms.mode) {
            toaster.showToast("All fields are required for accrual terms", "ERROR");
            return;
        }


        if (Object.keys(accrualTerms).length == 0) {
            toaster.showToast("Please add Accural Term", "ERROR");
            return;
        }
        accrualTerms.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
        accrualTerms.serialNo = accrualTermsArr.length + 1
        accrualTermsArr.push({ ...accrualTerms })
        this.setState({ accrualTermsArr, accrualTerms: undefined, accuralStartDate: undefined, accuralEndDate: undefined })
    }



    addRedemptionTerm = () => {
        let redemptionTermsArr = [...this.state.redemptionTermsArr]
        let redemptionTerms = { ...this.state.redemptionTerms }
        if (this.state.redemptionStartDate) {
            redemptionTerms.startDate = this.state.redemptionStartDate
            redemptionTerms.redemptionStartDate = this.state.redemptionStartDate
        }
        if (this.state.redemptionEndDate) {
            redemptionTerms.endDate = this.state.redemptionEndDate
            redemptionTerms.redemptionEndDate = this.state.redemptionEndDate
        }

        if (!redemptionTerms.startDate || !redemptionTerms.endDate || !redemptionTerms.rate || !redemptionTerms.mode) {
            toaster.showToast("All fields are required for redemption terms", "ERROR");
            return;
        }
        if (Object.keys(redemptionTerms).length == 0) {
            toaster.showToast("Please add Redemption Term", "ERROR");
            return;
        }
        redemptionTerms.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
        redemptionTerms.serialNo = redemptionTermsArr.length + 1
        redemptionTermsArr.push({ ...redemptionTerms })
        this.setState({ redemptionTermsArr, redemptionTerms: undefined, redemptionStartDate: undefined, redemptionEndDate: undefined })
    }



    addPointCreditRules = () => {
        let pointCreditRules = { ...this.state.pointCreditRules }
        let pointCreditRulesArr = [...this.state.pointCreditRulesArr]
        if (Object.keys(pointCreditRules).length == 0) {
            toaster.showToast('Point Credit Rules not defined', "ERROR")
            return
        }
        pointCreditRulesArr.push({ ...pointCreditRules })
        this.setState({ pointCreditRulesArr, pointCreditRules: undefined })
    }

    addSettlement = () => {
        let settlement = { ...this.state.settlement }
        if (this.state.settlementStartOn) {
            settlement.startOn = this.state.settlementStartOn
        }
        let settlementArr = [...this.state.settlementArr]
        if (Object.keys(settlement).length == 0) {
            toaster.showToast("Settlement not defined", "ERROR");
            return;
        }
        settlementArr.push({ ...settlement })
        this.setState({ settlementArr, settlement: undefined })
    }

    addPointConversion = () => {
        let pointConversion = { ...this.state.pointConversion }
        let pointConversionArr = [...this.state.pointConversionArr]
        if (Object.keys(pointConversion).length == 0) {
            toaster.showToast("Point Conversion not defined", "ERROR");
            return;
        }


        pointConversion.image = {
            name: pointConversion.conversionPartnerProgramName,
            imageURL: pointConversion.logo
        }

        pointConversion.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
        pointConversion.serialNo = pointConversionArr.length + 1

        pointConversionArr.push({ ...pointConversion })
        this.setState({ pointConversionArr, pointConversion: undefined })
    }

    addRates = () => {
        let rates = { ...this.state.rates }
        let ratesArr = [...this.state.ratesArr]

        if (this.state.pointConversionStartDate) {
            rates.startDate = this.state.pointConversionStartDate
        }
        if (this.state.pointConversionEndDate) {
            rates.endDate = this.state.pointConversionEndDate
        }

        if (Object.keys(rates).length == 0) {
            toaster.showToast("Rate not defined", "ERROR");
            return;
        }
        rates.sourceToken = "SMILES"
        rates.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]

        ratesArr.push({ ...rates })
        this.setState({ ratesArr, rates: undefined, pointConversionStartDate: undefined, pointConversionEndDate: undefined })
    }

    redirectToList = () => {
        browserHistory.push('/smiles/partnerList')
        toaster.showToast("Partner Approved successfully!");
    }

    evaluateResult = (result) => {
        if (result.message.status == 'ERROR') {
            this.setState({ isLoading: false });
            toaster.showToast(result.message.errorDescription, "ERROR");
            return;
        } else {
            this.redirectToList();
        }

    }
    ApprovePartnerCall = () => {

        let body = {
            "code": this.props.params.partnerCode,
            "status": "APPROVED"
        }
        this.setState({ isLoading: true })
        window.scrollTo(0, 0)

        this.props.actions.generalAjxProcess(constants.updatePartnerStatus, request)
            .then(result => {
                console.log(result, "result")
                this.evaluateResult(result);
            })
            .catch(err => {
                console.log(err);
                toaster.showToast(err, "ERROR");
                this.setState({ isLoading: false });
                return;
            });
    }


    subsidaryPartner() {
        return (

            <Portlet title={"SUBSIDARY PARTNER"}>
                {
                    this.state.isPointConversionPartner && (
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Code" columns='4' style={{ padding: "0 0 0 30" }} />
                                    <Input
                                        fieldname='withPartnerCode'
                                        formname='contractParams'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                            </div>
                            <Portlet title={"POINT CONVERSION"}>


                                <Table
                                    gridColumns={utils.getGridColumnByName('pointConversion')}
                                    gridData={this.state.pointConversionArr || []}
                                    componentFunction={this.pointConversionActionHandler}
                                />

                            </Portlet>
                            <Portlet title={"RATES"}>

                                <Table
                                    gridColumns={utils.getGridColumnByName('rates')}
                                    gridData={this.state.ratesArr || []}
                                    componentFunction={this.ratesActionHandler}
                                />
                            </Portlet>
                        </div>

                    )
                }

                {
                    this.state.isRedemptionPartner && (
                        <div>
                            {/* {
                                    "serialNo": 1,
                                    "startDate": 1455236,
                                    "endDate": 986547,
                                    "rateType": "",
                                    "rate": 1.11,
                                    "paymentMethod": "SMILES",
                                    "mode": "A"
                                } 
                            */}
                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Code" columns='4' style={{ padding: "0 0 0 30" }} />
                                    <Input
                                        fieldname='withPartnerCode'
                                        formname='contractParams'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                            </div>
                            <Portlet title={"REDEMPTION TERMS"}>

                                <Table
                                    gridColumns={utils.getGridColumnByName('redemptionTerms')}
                                    gridData={this.state.redemptionTermsArr || []}
                                    componentFunction={this.redemptionTermsActionHandler}
                                />
                            </Portlet>

                        </div>
                    )
                }

                {
                    this.state.isAccrualPartner && (
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Code" columns='4' style={{ padding: "0 0 0 30" }} />
                                    <Input
                                        fieldname='withPartnerCode'
                                        formname='contractParams'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                            </div>
                            <Portlet title={"ACCURAL BILLING RATES"}>


                                <Table
                                    gridColumns={utils.getGridColumnByName('accrualTerms')}
                                    gridData={this.state.accrualTermsArr || []}
                                    componentFunction={this.accrualTermsActionHandler}
                                />
                            </Portlet>
                            <Portlet title={"ACCURAL POINT CREDIT RULES"}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Label text="Rule" columns='4' />
                                        <Combobox
                                            fieldname='ruleType'
                                            formname='pointCreditRules'
                                            columns='7'
                                            placeholder='Select'
                                            style={{}}
                                            state={this.state}
                                            typeName="rule"
                                            dataSource={_.get(this.state, 'typeData', {})}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label text="Max Unsettled(AED)" columns='4' />
                                        <Input
                                            fieldname='maxUnSettledAmount'
                                            formname='pointCreditRules'
                                            columns='7'
                                            placeholder=''
                                            state={this.state}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </Portlet>
                        </div>
                    )
                }


                {/* 
                <Portlet title={"SETTLEMENT"}>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="Settle As" columns='4' />
                            <Combobox
                                fieldname='settleAs'
                                formname='settlement'
                                columns='7'
                                placeholder='Select'
                                style={{}}
                                state={this.state}
                                typeName="settleas"
                                dataSource={_.get(this.state, 'typeData', {})}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label text="Frequency" columns='4' />
                            <Combobox
                                fieldname='frequency'
                                formname='settlement'
                                columns='7'
                                placeholder='Select'
                                style={{}}
                                state={this.state}
                                typeName="frequency"
                                dataSource={_.get(this.state, 'typeData', {})}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>

                    </div>
                    <div className="row">


                        <div className="col-md-6">
                            <Label text="Start On" columns='4' />
                            <div className="col-md-7">
                                <DateControl id="settlementStartOn" dateChange={this.dateChange.bind(this, 'settlementStartOn')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="" columns='4' />

                        </div>
                    </div>

                    
            </Portlet> 
            */}
                < Portlet title={"TERMS & CONDITIONS EN"} style={{ height: '140px' }
                }>
                    <Textarea
                        style={{ height: '120px' }}
                        fieldname='termsandConditionsEn'
                        formname='contractParams'
                        columns='12'
                        placeholder='Terms and Conditions'
                        state={this.state}
                        actionHandler={this.generalHandler}
                        className="form-control"
                    />
                </Portlet >
                <Portlet title={"TERMS & CONDITIONS AR"} style={{ height: '140px' }}>
                    <Textarea
                        style={{ height: '120px', textAlign: "right" }}
                        fieldname='termsandConditionsAr'
                        formname='contractParams'
                        columns='12'
                        placeholder='الأحكام والشروط'
                        state={this.state}
                        actionHandler={this.generalHandler}
                        className="form-control"
                    />
                </Portlet>
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-toolbar pull-right">
                            <button onClick={this.ApprovePartnerCall} type="submit" className="pull-right btn green">
                                {utils.getLabelByID("Approve")}
                            </button>
                        </div>
                    </div>
                </div>
                {/* <Portlet title={"ERP SETTINGS TO"}>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="Vendor Code" columns='4' />
                            <Input
                                fieldname='vendorCode'
                                formname='erpSettingsTo'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label text="Vendor Site ID" columns='4' />
                            <Input
                                fieldname='vendorSiteID'
                                formname='erpSettingsTo'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="GL Codes" columns='4' />
                            <Input
                                fieldname='glcode'
                                formname='erpSettingsTo'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label text="Billing Acc#" columns='4' />
                            <Input
                                fieldname='billingAccount'
                                formname='erpSettingsTo'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                    </div>

                   
                </Portlet> */}


            </Portlet >
        )
    }

    redirectToList = () => {
        browserHistory.push('/smiles/partnerList')
        toaster.showToast("Partner created successfully!");
    }

    evaluateResult = (result) => {
        if (result.message.status == 'ERROR') {
            this.setState({ isLoading: false });
            toaster.showToast(result.message.errorDescription, "ERROR");
            return;
        } else {
            this.setState({ isLoading: false });
            this.redirectToList();
        }

    }
    partnerFields() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6" style={{ padding: "20 0 0 0" }}>
                        <div className="row">
                            <Label text="Partner Name En" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Input
                                fieldname='partnerNameEn'
                                formname='body'
                                columns='7'
                                placeholder='Name'
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <Label text="Partner Name Ar" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Input
                                fieldname='partnerNameAr'
                                formname='body'
                                columns='7'
                                placeholder=' شَريك اسم '
                                style={{ textAlign: "right" }}
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <Label text="Partner Code" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Input
                                fieldname='partnerCode'
                                formname='body'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <Label text="Partner Category" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Combobox
                                fieldname='partnerCategory'
                                formname='body'
                                columns='7'
                                placeholder='Select'
                                style={{}}
                                state={this.state}
                                typeName="category"
                                dataSource={_.get(this.state, 'typeData', {})}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <Label text="Partner Er Code" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Input
                                fieldname='partnerErCode'
                                formname='body'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>


                    </div>

                    <div className="col-md-6">
                        {this.imgDiv('body', { width: "200px", height: "200px" }, { paddingLeft: "195px" })}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">

                        <Label text="Partner Description En" columns='4' />
                        <Textarea
                            divStyle={{ padding: "0 0 0 5" }}
                            style={{ height: '60px', width: "102%" }}
                            fieldname='partnerDescriptionEn'
                            formname='body'
                            columns='7'
                            placeholder='Partner Description'
                            state={this.state}
                            actionHandler={this.generalHandler}
                            className="form-control"
                        />

                    </div>
                    <div className="col-md-6">

                        <Label text="Partner Description Ar" columns='4' style={{ padding: "0 0 0 30" }} />
                        <Textarea
                            style={{ height: '60px', textAlign: "right" }}
                            fieldname='partnerDescriptionAr'
                            formname='body'
                            columns='7'
                            placeholder='وصف الشريك'
                            state={this.state}
                            actionHandler={this.generalHandler}
                            className="form-control"
                        />

                    </div>
                </div>
                <br></br>

                <Portlet title={"TYPE"}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="" style={{ opacity: '1' }}>
                                <div className="portlet-body flip-scroll">
                                    <div className="row">
                                        <div className="col-md-10 col-md-offset-1">

                                            {this.state.isRedemptionPartner &&
                                                <div className="col-md-4 text-center">
                                                    <div className="voucherBox">
                                                        <img src="/assets/Resources/Redemption.png" width="20%" />
                                                        <h5><strong>Redemption</strong></h5>
                                                        <div className="icheck-list">
                                                            <label className="mt-checkbox mt-checkbox-outline">
                                                                <label></label>
                                                                <input onChange={this.typeSelected} type="checkbox" name="Redemption" value="" checked={this.state.isRedemptionPartner} className="form-control" />
                                                                <span></span></label>
                                                        </div>
                                                    </div>
                                                </div>}

                                            {this.state.isAccrualPartner && <div className="col-md-4 text-center">
                                                <div className="voucherBox">
                                                    <img src="/assets/Resources/Accrual.png" width="20%" />
                                                    <h5><strong>Accural</strong></h5>
                                                    <div className="icheck-list">
                                                        <label className="mt-checkbox mt-checkbox-outline">
                                                            <label></label>
                                                            <input onChange={this.typeSelected} type="checkbox" name="Accrual" checked={this.state.isAccrualPartner} value="" className="form-control" />
                                                            <span></span></label>
                                                    </div>
                                                </div>
                                            </div>}

                                            {this.state.isPointConversionPartner && <div className="col-md-4 text-center">
                                                <div className="voucherBox">
                                                    <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                    <h5><strong>Point Conversion</strong></h5>
                                                    <div className="icheck-list">
                                                        <label className="mt-checkbox mt-checkbox-outline">
                                                            <label></label>
                                                            <input onChange={this.typeSelected} type="checkbox" name="pointConverstion" checked={this.state.isPointConversionPartner} className="form-control" />
                                                            <span></span></label>
                                                    </div>
                                                </div>
                                            </div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Portlet>
                <Portlet title={"CONTACT"}>

                    <Table

                        gridColumns={utils.getGridColumnByName('contactInfo')}
                        gridData={this.state.contactInformationArr || []}
                        componentFunction={this.contactInfoActionHandler}
                    />
                </Portlet>
            </div>
        )
    }


    handleOnBack = () => {
        if (this.state.isEdited) {
            this.addSubsidaryPartner()
        }
        this.setState({
            isEdited: false
        });
        this.stateChangeSubsidaryPartnerBool();

    }
    stateChangeSubsidaryPartnerBool = () => {
        window.scroll(0, 0)
        this.setState({
            subsidaryPartnerBool: !this.state.subsidaryPartnerBool
        })
    }
    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        } else {
            return (
                <div className="row">
                    {!this.state.subsidaryPartnerBool && this.partnerFields()}
                    {this.subsidaryPartner()}
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,
        getPartnerDataByID: _.get(state.app, 'getPartnerDataByID', undefined)

    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
ApprovePartner.displayName = "Partner View Contract";
export default connect(mapStateToProps, mapDispatchToProps)(ApprovePartner);













