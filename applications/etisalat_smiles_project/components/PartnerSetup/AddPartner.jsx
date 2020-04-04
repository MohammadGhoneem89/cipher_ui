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
import ROW from '../../../../core/common/Row.jsx';
import COL from '../../../../core/common/Col.jsx';
import * as toaster from '../../../../core/common/toaster.js';

import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';

import Textarea from '../../../../core/common/Textarea.jsx';

import * as gen from '../../../../core/common/generalActionHandler';
import * as requestCreator from '../../../../core/common/request.js';
import * as constants from '../../../../core/constants/Communication.js';

import { browserHistory } from 'react-router';
class AddPartner extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            body: {},
            isLoading: true,
            subsidaryPartnerBool: true,
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

    getEntityDetails = (entityNames, orgCode) => {
        if (orgCode) {
            for (let i in entityNames) {
                if (_.get(entityNames[i], 'value', '').toUpperCase() === orgCode.toUpperCase()) {
                    return { ...entityNames[i] }
                }
            }
        }
        return {}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData && nextProps.entityNames && nextProps.user && nextProps.userEntity && nextProps.getAllOrgMap) {

            this.setState({
                allOrgMap: [..._.get(nextProps, 'getAllOrgMap', [])],
                user: { ...nextProps.user },
                userEntity: {
                    ...nextProps.userEntity
                },
                typeData: {
                    ...nextProps.typeData,
                    entityNames: nextProps.entityNames
                        .filter(item => {
                            if (item.orgType === 'PARTNER' && nextProps.user.orgCode.toUpperCase() != item.value.toUpperCase()) {
                                return true
                            } else {
                                return false
                            }
                        })
                },
                body: {
                    ..._.get(this.state, 'body', {}),
                    logo: _.get(nextProps.userEntity, 'entityLogo.sizeSmall', '')
                },

                isLoading: this.props.params.partnerCode ? this.state.isLoading : false
            })
        }

        if (nextProps.getPartnerDataByID && (nextProps.typeData && (nextProps.typeData.settleas && nextProps.typeData.frequency) && nextProps.entityNames) && nextProps.user && nextProps.userEntity) {
            let status = _.get(nextProps, 'getPartnerDataByID.status', '').toUpperCase()
            let erpSettingsFrom = { ..._.get(nextProps, 'getPartnerDataByID.erpSettingsFrom', {}) }
            let contactInformationArr = [..._.get(nextProps, 'getPartnerDataByID.contacts', [])]

            // if (status == "APPROVED") {
            //     for (let i in contactInformationArr) {
            //         contactInformationArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
            //         { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
            //     }
            // }

            let contractParamsObj = _.get(nextProps.getPartnerDataByID, 'contractParams', {})

            let contractParamsArr = []
            for (let [key, value] of Object.entries(contractParamsObj)) {

                contractParamsArr.push({
                    withPartnerCode: key,
                    action: (status == "PENDING" ? [{ label: "View", iconName: "fa fa-eye", actionType: "COMPONENT_FUNCTION" }] : [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" }, { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]),
                    ...value
                })
            }





            let contractParams = contractParamsArr[0];

            _.set(contractParams, 'settlement.creationAutoOrManual', this.keyToLabel2(nextProps.typeData.settleas, _.get(contractParams, 'settlement.creationAutoOrManual', '')))
            _.set(contractParams, 'settlement.frequency', this.keyToLabel2(nextProps.typeData.frequency, _.get(contractParams, 'settlement.frequency', '')))



            let redemptionTermsArr = [..._.get(contractParams, 'redemptionBillingRates', [])]
            for (let i in redemptionTermsArr) {
                redemptionTermsArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
            }
            let accrualTermsArr = [..._.get(contractParams, 'accrualBillingRates', [])]
            for (let i in accrualTermsArr) {
                accrualTermsArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
            }
            let ratesArr = [..._.get(contractParams, 'conversionBillingRates', [])]
            for (let i in ratesArr) {
                ratesArr[i].action = (status == "PENDING" ? [] : [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }])
            }

            // console.log("contractParams from subsidiaryPartnerActionHandler", contractParams)

            this.setState({
                body: {
                    ...nextProps.getPartnerDataByID,
                    logo: _.get(nextProps.userEntity, 'entityLogo.sizeSmall', '')
                },
                typeData: {
                    ...nextProps.typeData,
                    entityNames: nextProps.entityNames
                        .filter(item => {
                            if (item.orgType === 'PARTNER') {
                                return true
                            } else {
                                return false
                            }
                        })
                },
                user: nextProps.user,
                userEntity: {
                    ...nextProps.userEntity
                },
                contractParams,
                isAccrualPartner: contractParams.isAccrualPartner,
                isRedemptionPartner: contractParams.isRedemptionPartner,
                isPointConversionPartner: contractParams.isPointConversionPartner,
                redemptionTermsArr,
                accrualTermsArr,
                ratesArr,
                settlementStartOn: _.get(contractParams, 'settlement.startOn', ''),
                settlement: _.get(contractParams, 'settlement', {}),
                pointCreditRules: _.get(contractParams, 'pointCreditRules', {}),
                erpSettingsTo: _.get(contractParams, 'erpSettingsTo', {}),
                contractParamsArr,
                contactInformationArr,
                erpSettingsFrom,
                isLoading: false,
                status
            })
        }

    }

    componentWillUnmount() {
        this.props.actions.updateStore({
            getInterim: undefined,
            getPartnerDataByID: undefined
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.params.partnerCode) {
            this.props.actions.generalProcess(constants.getInterim, {
                body: {
                    Id: this.props.params.partnerCode,
                    partnerCode: this.props.params.partnerCode.split('_')[0],
                    withPartnerCode: this.props.params.partnerCode.split('_')[1]
                }
            });
        }

        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['category', 'rule', 'frequency', 'settleas', 'status', /*'contactMode',*/ 'rateType', 'paymentMethod', 'yesnobinary', 'authenticationTypes', 'unitType']));
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
            "currentPageNo": 1,
            "pageSize": 1
        }));

        this.props.actions.generalProcess(constants.getAllOrgMap, {});
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
                    src={_.get(this.state, `${formname}.logo`, undefined) ? _.get(this.state, `${formname}.logo`, undefined) : constants.baseUrl + "/images/image-user.png"}
                    onError={this.addDefaultSrc}
                    className="img-responsive img-thumbnail" alt="Profile Image" width='150px'
                    height='150px'
                    style={{ ...imgStyle }}
                    ref={input => this.logo = input}
                />
                <br />

                {/* {(this.props.params.partnerCode ? (this.state.status == "APPROVED" ? true : false) : true) && <button
                    className="btn green"
                    style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
                    onClick={() => {
                        this.profilePicUploader.click();
                    }}
                >
                    {"Upload Image"}
                </button>} */}

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

    keyToLabel2 = (typeArr, key) => {
        if (key == undefined) {
            return undefined
        }
        let tmp = typeArr.filter(element => element.value == key);
        if (tmp.length > 0) {
            return tmp[0].label;
        } else {
            return key;
        }
    }
    keyToLabel = (typeName, key) => {
        if (key == undefined) {
            return undefined
        }
        let tmp = this.state.typeData[`${typeName}`].filter(element => element.value == key);
        if (tmp.length > 0) {
            return tmp[0].label;
        } else {
            return key;
        }
    }

    LabelTokey = (typeName, label) => {
        if (label == undefined) {
            return undefined
        }
        let tmp = this.state.typeData[`${typeName}`].filter(element => element.label == label);
        if (tmp.length > 0) {
            return tmp[0].value;
        } else {
            return label;
        }
    }

    customSelectHandler = (typeName, formname, fieldname, type, e) => {
        if (type == "combobox") {
            let value = this.keyToLabel(typeName, e.target.value);
            let formdata = _.get(this.state, formname, {});
            _.set(formdata, e.target.name, value);
            this.setState({
                [formname]: formdata
            }, () => {
                // console.log('DATA-->', JSON.stringify(this.state[formname]));
            });
        }
    }


    addSubsidaryPartner = () => {

        let contractParams = { ...this.state.contractParams };
        let contractParamsArr = []//[...this.state.contractParamsArr];
        let settlement = { ...this.state.settlement };
        let accrualterms = this.state.accrualTermsArr;
        let erpSettingsTo = { ...this.state.erpSettingsTo }
        let erpSettingsFrom = { ...this.state.erpSettingsFrom }
        let pointRule = { ...this.state.pointCreditRules }

        contractParams.isAccrualPartner = this.state.isAccrualPartner;
        contractParams.isRedemptionPartner = this.state.isRedemptionPartner;
        contractParams.isPointConversionPartner = this.state.isPointConversionPartner;

        if (this.state.settlementStartOn) {
            settlement.startOn = parseInt(this.state.settlementStartOn);
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
        // if (!settlement.startOn || !settlement.settleAs || !settlement.frequency) {
        //     toaster.showToast("All fields are required for Settlement", "ERROR");
        //     return;
        // }

        // if (!erpSettingsTo.vendorCode || !erpSettingsTo.glCode || !erpSettingsTo.billingAccount || !erpSettingsTo.vendorSiteID) {
        //     toaster.showToast("Please provide an ERP To Settings", "ERROR");
        //     return;
        // }

        if (!contractParams) {
            toaster.showToast('Partner Details not added.', 'ERROR');
            return;
        }

        _.set(settlement, 'creationAutoOrManual', this.LabelTokey('settleas', settlement.creationAutoOrManual))
        _.set(settlement, 'frequency', this.LabelTokey('frequency', settlement.frequency))

        contractParams.settlement = settlement
        contractParams.erpSettingsTo = { ...erpSettingsTo }
        contractParams.accrualBillingRates = [...this.state.accrualTermsArr]

        for (let i in contractParams.accrualBillingRates) {
            let sellingrate = parseFloat(contractParams.accrualBillingRates[i].sellingRate)
            contractParams.accrualBillingRates[i].startDate = parseInt(contractParams.accrualBillingRates[i].startDate)
            contractParams.accrualBillingRates[i].endDate = parseInt(contractParams.accrualBillingRates[i].endDate)
            contractParams.accrualBillingRates[i].sellingRate = sellingrate
            contractParams.accrualBillingRates[i].serialNo = parseInt(i + 1)
        }

        if (typeof(this.getProgram().programCode) !== "string"){
            toaster.showToast("No relevant Progam Code Found", "ERROR");
            return;
        }
        contractParams.conversionPartnerProgramName = this.getProgram().programCode
        contractParams.conversionBillingRates = [...this.state.ratesArr]
        for (let i in contractParams.conversionBillingRates) {
            contractParams.conversionBillingRates[i].rate = parseFloat(contractParams.conversionBillingRates[i].rate)
            contractParams.conversionBillingRates[i].rate2 = parseFloat(contractParams.conversionBillingRates[i].rate2)
            console.log("Rates >> " + typeof (contractParams.conversionBillingRates[i].rate) + "\n\n")
        }


        contractParams.redemptionBillingRates = [..._.get(this.state, 'redemptionTermsArr', [])]


        //let pointRule = { ...this.state.pointCreditRules }
        pointRule.maxUnsettledAmount = parseInt(pointRule.maxUnsettledAmount || -1)
        contractParams.pointCreditRules = { ...pointRule }
        contractParams.OTPLength = parseInt(contractParams.OTPLength)


        contractParams.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
        contractParamsArr.push({ ...contractParams });


        console.log("contactParams >>>> ", contractParams.conversionBillingRates)
        // this.setState({
        //     contractParamsArr,
        //     contractParams: {},
        //     settlement: {},
        //     erpSettingsTo: {},
        //     accrualTermsArr: [],
        //     pointCreditRulesArr: [],
        //     pointCreditRules: {},
        //     ratesArr: [],
        //     pointConversionArr: [],
        //     settlementStartOn: undefined,
        //     isEdited: false,
        //     isAccrualPartner: false,
        //     isPointConversionPartner: false,
        //     isRedemptionPartner: false,
        //     redemptionTermsArr: []
        // })
        // this.stateChangeSubsidaryPartnerBool();
        return contractParamsArr
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

        if (!accrualTerms.startDate || !accrualTerms.endDate || !accrualTerms.sellingRate /*|| !accrualTerms.mode*/) {
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
            redemptionTerms.startDate = parseInt(this.state.redemptionStartDate)
            redemptionTerms.redemptionStartDate = parseInt(this.state.redemptionStartDate)
        }
        if (this.state.redemptionEndDate) {
            redemptionTerms.endDate = parseInt(this.state.redemptionEndDate)
            redemptionTerms.redemptionEndDate = parseInt(this.state.redemptionEndDate)
        }

        if (!redemptionTerms.startDate || !redemptionTerms.endDate || !redemptionTerms.rate /*|| !redemptionTerms.mode*/) {
            toaster.showToast("All fields are required for redemption terms", "ERROR");
            return;
        }
        if (Object.keys(redemptionTerms).length == 0) {
            toaster.showToast("Please add Redemption Term", "ERROR");
            return;
        }

        redemptionTerms.rate = parseFloat(redemptionTerms.rate)
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
            rates.startDate = parseInt(this.state.pointConversionStartDate)
        }
        if (this.state.pointConversionEndDate) {
            rates.endDate = parseInt(this.state.pointConversionEndDate)
        }
        rates.rate = parseFloat(rates.rate)
        rates.rate2 = parseFloat(rates.rate2)

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

    getSourceProgram(org) {
        let arr = this.state.allOrgMap.filter(item => {
            return item.orgCode == org
        })
        if (arr.length >= 1) {
            return arr[0]
        } else {
            return {}
        }
    }

    getProgram() {
        let arr = this.state.allOrgMap.filter(item => {
            return item.orgCode == _.get(this.state, 'contractParams.withPartnerCode', '')
        })
        if (arr.length >= 1) {
            return arr[0]
        } else {
            return {}
        }
    }


    subsidaryPartner() {
        return (


            <div className="row">
                <div className="col-md-12" >

                    <div className="col-md-12" >
                        <ROW>
                            <COL>
                                {
                                    this.state.isPointConversionPartner && (
                                        <div>


                                            {
                                                (this.props.params.partnerCode && this.state.status != "APPROVED") && this.renderTypePortlet(2)
                                            }
                                            <Portlet title={"Program"}>
                                                {
                                                    this.state.isPointConversionPartner && (
                                                        <div>
                                                            <div className="row">

                                                                <div className="col-md-6">
                                                                    {this.getProgram().img && <img style={{
                                                                        position: 'relative',
                                                                        left: '250px',
                                                                        top: '5px',
                                                                        zIndex: '2',
                                                                        bottom: '13px'
                                                                    }} id="UserProfilePic" src={this.getProgram().img} class="img-responsive img-thumbnail" alt="Profile Image" width="20px" height="20px" />}
                                                                    <div style={this.getProgram().img ? {
                                                                        position: 'relative',
                                                                        bottom: '22px'
                                                                    } : {
                                                                            position: 'relative'
                                                                        }}>


                                                                        <Label text="Program Name" columns='4' />
                                                                        <Input
                                                                            style={{ paddingLeft: "40px" }}
                                                                            fieldname='conversionPartnerProgramName'
                                                                            formname='contractParams'
                                                                            value={this.getProgram().programCode}
                                                                            // disabled= {this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                                            disabled={true}
                                                                            columns='8'
                                                                            placeholder=''
                                                                            state={this.state}
                                                                            actionHandler={this.generalHandler}
                                                                            className="form-control"
                                                                        />
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-md-8"></div>
                                                                        <div className="col-md-4" style={{
                                                                            textAlign: 'right',
                                                                            position: 'relative',
                                                                            bottom: '20px',
                                                                            right: '12px',
                                                                            fontStyle: 'italic',
                                                                            color: '#E17630'
                                                                        }}>
                                                                            <span style={{ fontSize: '29px' }}>
                                                                                {this.getProgram().AEDValue && `${this.getProgram().AEDValue} AED`}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">

                                                                    <Label required={true} text="Minimum Points" columns='4' />
                                                                    <Input
                                                                        fieldname='minPoints'
                                                                        formname='contractParams'
                                                                        disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                                        columns='8'
                                                                        placeholder=''
                                                                        state={this.state}
                                                                        actionHandler={this.generalHandler}
                                                                        className="form-control"
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="row">
                                                                {/* <div className="col-md-6">

                                                                    <Label text="AED Conversion" columns='4' />
                                                                    <Input
                                                                        fieldname='aedConversion'
                                                                        formname='contractParams'
                                                                        value={this.getProgram().AEDValue}
                                                                        disabled={true}
                                                                        // disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                                        columns='8'
                                                                        placeholder=''
                                                                        state={this.state}
                                                                        actionHandler={this.generalHandler}
                                                                        className="form-control"
                                                                    />

                                                                </div> */}
                                                                <div className="col-md-6">

                                                                    <Label required={true} text="Authentication Type" columns='4' />
                                                                    <Combobox
                                                                        fieldname='authType'
                                                                        formname='contractParams'
                                                                        columns='8'
                                                                        disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                                        placeholder='Select'
                                                                        style={{}}
                                                                        state={this.state}
                                                                        typeName="authenticationTypes"
                                                                        dataSource={_.get(this.state, 'typeData', {})}
                                                                        actionHandler={this.generalHandler}
                                                                        className="form-control"
                                                                    />
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <Label required={true} text="OTP Length" columns='4' />
                                                                    <Input
                                                                        fieldname='OTPLength'
                                                                        type='number'
                                                                        formname='contractParams'
                                                                        disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                                        columns='8'
                                                                        placeholder=''
                                                                        state={this.state}
                                                                        actionHandler={this.generalHandler}
                                                                        className="form-control"
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="row">

                                                                <div className="col-md-6">
                                                                    <Label required={true} text="Unit Type" columns='4' />
                                                                    <Combobox
                                                                        fieldname='unitType'
                                                                        formname='contractParams'
                                                                        columns='8'
                                                                        placeholder='Select'
                                                                        style={{}}
                                                                        state={this.state}
                                                                        typeName="unitType"
                                                                        dataSource={_.get(this.state, 'typeData', {})}
                                                                        actionHandler={this.generalHandler}
                                                                        className="form-control"
                                                                    />
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <Label text="Regular Expression" columns='4' />
                                                                    <Input
                                                                        fieldname='validationRegEx'
                                                                        formname='contractParams'
                                                                        placeholder='Enter'
                                                                        disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                                        columns='8'
                                                                        placeholder=''
                                                                        state={this.state}
                                                                        actionHandler={this.generalHandler}
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}
                                            </Portlet>

                                            <Portlet title={"RATES"}>
                                                {(!this.props.params.partnerCode ? true : (this.state.status == "APPROVED" ? ((this.props.params.partnerCode && !(this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false) : false)) && (<div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Label required={true} text="Start Date" columns='4' />
                                                            <div className="col-md-8">
                                                                <DateControl id="pointConversionStartDate" defaultValue={utils.UNIXConvertToDate(this.state.pointConversionStartDate)} dateChange={this.dateChange.bind(this, 'pointConversionStartDate')} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Label text="End Date" columns='4' />
                                                            <div className="col-md-8">
                                                                <DateControl id="pointConversionEndDate" defaultValue={utils.UNIXConvertToDate(this.state.pointConversionEndDate)} dateChange={this.dateChange.bind(this, 'pointConversionEndDate')} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <br></br>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Label required={true} text="Rate (From Partner -> To Partner)" columns='4' />
                                                            <Input
                                                                fieldname='rate'
                                                                formname='rates'
                                                                columns='8'
                                                                placeholder=''
                                                                state={this.state}
                                                                actionHandler={this.generalHandler}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            {this.getSourceProgram(!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', {}) : _.get(this.state, 'body.partnerCode', {})).img && <img style={{
                                                                position: 'relative',
                                                                left: '250px',
                                                                top: '5px',
                                                                zIndex: '2',
                                                                bottom: '13px'
                                                            }} id="UserProfilePic" src={this.getSourceProgram(!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', '') : _.get(this.state, 'body.partnerCode', '')).img} class="img-responsive img-thumbnail" alt="Profile Image" width="20px" height="20px"
                                                            />}
                                                            <div style={this.getSourceProgram(!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', '') : _.get(this.state, 'body.partnerCode', '')).img ? {
                                                                position: 'relative',
                                                                bottom: '22px'
                                                            } : {
                                                                    position: 'relative'
                                                                }}>
                                                                <Label text="Program Name" columns='4' />
                                                                <Input
                                                                    style={{ paddingLeft: '40px' }}
                                                                    fieldname='sourceToken'
                                                                    formname='rates'
                                                                    columns='8'
                                                                    disabled={true}
                                                                    value={this.getSourceProgram(!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', '') : _.get(this.state, 'body.partnerCode', '')).programCode}
                                                                    placeholder=''
                                                                    state={this.state}
                                                                    actionHandler={this.generalHandler}
                                                                    className="form-control"
                                                                />
                                                            </div>



                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Label text="Rate (To Partner -> From Partner)" columns='4' />
                                                            <Input
                                                                fieldname='rate2'
                                                                formname='rates'
                                                                columns='8'
                                                                placeholder=''
                                                                state={this.state}
                                                                actionHandler={this.generalHandler}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="col-md-4" style={{
                                                            textAlign: 'right',
                                                            position: 'relative',
                                                            bottom: '20px',
                                                            right: '12px',
                                                            fontStyle: 'italic',
                                                            color: '#E17630'
                                                        }}>
                                                            <span style={{ fontSize: '29px' }}>{`${this.getSourceProgram(!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', '') : _.get(this.state, 'body.partnerCode', '')).AEDValue} AED`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="btn-toolbar pull-right">
                                                                <button style={{ marginRight: "22%" }} onClick={this.addRates} type="submit" className="pull-right btn green">
                                                                    {utils.getLabelByID("Add")}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>)}

                                                <div style={{ padding: "0 15" }}>
                                                    <Table
                                                        gridColumns={utils.getGridColumnByName('rates')}
                                                        gridData={this.state.ratesArr || []}
                                                        componentFunction={this.ratesActionHandler}
                                                    />
                                                </div>


                                            </Portlet>
                                        </div>

                                    )
                                }

                                {
                                    this.state.isRedemptionPartner && (
                                        <div>
                                            {
                                                (this.props.params.partnerCode && this.state.status != "APPROVED") && this.renderTypePortlet(2)
                                            }

                                            <Portlet title={"REDEMPTION TERMS"}>
                                                {(!this.props.params.partnerCode ? true : (this.state.status == "APPROVED" ? ((this.props.params.partnerCode && !(this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false) : false)) && (<div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Label text="Start Date" columns='4' />
                                                            <div className="col-md-8">
                                                                <DateControl id="redemptionStartDate" defaultValue={utils.UNIXConvertToDate(this.state.redemptionStartDate)} dateChange={this.dateChange.bind(this, 'redemptionStartDate')} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Label text="End Date" columns='4' />
                                                            <div className="col-md-8">
                                                                <DateControl id="redemptionEndDate" defaultValue={utils.UNIXConvertToDate(this.state.redemptionEndDate)} dateChange={this.dateChange.bind(this, 'redemptionEndDate')} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Label text="Payment Method" columns='4' />
                                                            <Combobox
                                                                fieldname='paymentMethod'
                                                                formname='redemptionTerms'
                                                                columns='8'
                                                                placeholder='Select'
                                                                style={{}}
                                                                state={this.state}
                                                                typeName="paymentMethod"
                                                                dataSource={_.get(this.state, 'typeData', {})}
                                                                actionHandler={this.generalHandler}
                                                                className="form-control"
                                                            />
                                                        </div>

                                                        {/* <div className="col-md-6">
                                                            <Label text="Mode" columns='4' />
                                                            <Combobox
                                                                fieldname='mode'
                                                                formname='redemptionTerms'
                                                                columns='7'
                                                                placeholder='Select'
                                                                style={{}}
                                                                state={this.state}
                                                                typeName="contactMode"
                                                                dataSource={_.get(this.state, 'typeData', {})}
                                                                actionHandler={this.generalHandler}
                                                                className="form-control"
                                                            />
                                                        </div> */}
                                                        <div className="col-md-6">
                                                            <Label text="Rate" columns='4' />
                                                            <Input
                                                                fieldname='rate'
                                                                formname='redemptionTerms'
                                                                columns='8'
                                                                placeholder=''
                                                                state={this.state}
                                                                actionHandler={this.generalHandler}
                                                                className="form-control"
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <Label text="Rate Type" columns='4' />
                                                            <Combobox
                                                                fieldname='rateType'
                                                                formname='redemptionTerms'
                                                                columns='8'
                                                                placeholder='Select'
                                                                style={{}}
                                                                state={this.state}
                                                                typeName="rateType"
                                                                dataSource={_.get(this.state, 'typeData', {})}
                                                                actionHandler={this.generalHandler}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="btn-toolbar pull-right">
                                                                <button style={{ marginRight: "22%" }} onClick={this.addRedemptionTerm} type="submit" className="pull-right btn green">
                                                                    {utils.getLabelByID("Add")}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)}

                                                <div style={{ padding: "0 15" }}>
                                                    <Table
                                                        gridColumns={utils.getGridColumnByName('redemptionTerms')}
                                                        gridData={this.state.redemptionTermsArr || []}
                                                        componentFunction={this.redemptionTermsActionHandler}
                                                    />
                                                </div>

                                            </Portlet>

                                        </div>
                                    )
                                }

                                {
                                    this.state.isAccrualPartner && (
                                        <div>
                                            {
                                                (this.props.params.partnerCode && this.state.status != "APPROVED") && this.renderTypePortlet(2)
                                            }

                                            <Portlet title={"ACCURAL BILLING RATES"}>
                                                {(!this.props.params.partnerCode ? true : (this.state.status == "APPROVED" ? ((this.props.params.partnerCode && !(this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false) : false)) &&
                                                    (<div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <Label text="Start Date" columns='4' />
                                                                <div className="col-md-8">
                                                                    <DateControl id="accuralStartDate" defaultValue={utils.UNIXConvertToDate(this.state.accuralStartDate)} dateChange={this.dateChange.bind(this, 'accuralStartDate')} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <Label text="End Date" columns='4' />
                                                                <div className="col-md-8">
                                                                    <DateControl id="accuralEndDate" defaultValue={utils.UNIXConvertToDate(this.state.accuralEndDate)} dateChange={this.dateChange.bind(this, 'accuralEndDate')} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br></br>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <Label text="Selling Rate" columns='4' />
                                                                <Input
                                                                    fieldname='sellingRate'
                                                                    formname='accrualTerms'
                                                                    columns='8'
                                                                    placeholder=''
                                                                    state={this.state}
                                                                    actionHandler={this.generalHandler}
                                                                    className="form-control"
                                                                />
                                                            </div>

                                                            {/* <div className="col-md-6">
                                                                <Label text="Mode" columns='4' />
                                                                <Combobox
                                                                    fieldname='mode'
                                                                    formname='accrualTerms'
                                                                    columns='7'
                                                                    placeholder='Select'
                                                                    style={{}}
                                                                    state={this.state}
                                                                    typeName="contactMode"
                                                                    dataSource={_.get(this.state, 'typeData', {})}
                                                                    actionHandler={this.generalHandler}
                                                                    className="form-control"
                                                                />
                                                            </div> */}

                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="btn-toolbar pull-right">
                                                                    <button style={{ marginRight: "22%" }} onClick={this.addAccuralTerm} type="submit" className="pull-right btn green">
                                                                        {utils.getLabelByID("Add")}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>)}

                                                <div style={{ padding: "0 15" }}>
                                                    <Table
                                                        gridColumns={utils.getGridColumnByName('accrualTerms')}
                                                        gridData={this.state.accrualTermsArr || []}
                                                        componentFunction={this.accrualTermsActionHandler}
                                                    />
                                                </div>

                                            </Portlet>
                                            <Portlet title={"ACCURAL POINT CREDIT RULES"}>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Label text="Rule" columns='4' />
                                                        <Combobox
                                                            fieldname='ruleType'
                                                            formname='pointCreditRules'
                                                            columns='8'
                                                            placeholder='Select'
                                                            disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
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
                                                            fieldname='maxUnsettledAmount'
                                                            disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                            formname='pointCreditRules'
                                                            columns='8'
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

                                <Portlet title={"ERP SETTINGS"}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Label text="Vendor Code" columns='4' />
                                            <Input
                                                fieldname='vendorCode'
                                                formname='erpSettingsFrom'
                                                columns='8'
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
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
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                formname='erpSettingsFrom'
                                                columns='8'
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
                                                fieldname='glCode'
                                                formname='erpSettingsFrom'
                                                columns='8'
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
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
                                                formname='erpSettingsFrom'
                                                columns='8'
                                                placeholder=''
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                state={this.state}
                                                actionHandler={this.generalHandler}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                </Portlet>

                                <Portlet title={"CONTACT"}>
                                    {
                                        (!this.props.params.partnerCode ? true : (this.state.status == "APPROVED" ? ((this.props.params.partnerCode && !(this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false) : false)) && (
                                            <div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Label text="First Name" columns='4' />
                                                        <Input
                                                            fieldname='firstName'
                                                            formname='contactInformation'
                                                            columns='8'
                                                            placeholder=''
                                                            state={this.state}
                                                            actionHandler={this.generalHandler}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Label text="Last Name" columns='4' />
                                                        <Input
                                                            fieldname='lastName'
                                                            formname='contactInformation'
                                                            columns='8'
                                                            placeholder=''
                                                            state={this.state}
                                                            actionHandler={this.generalHandler}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Label text="Phone" columns='4' />
                                                        <Input
                                                            fieldname='phone'
                                                            formname='contactInformation'
                                                            columns='8'
                                                            placeholder=''
                                                            state={this.state}
                                                            actionHandler={this.generalHandler}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Label text="Mobile" columns='4' />
                                                        <Input
                                                            fieldname='mobile'
                                                            formname='contactInformation'
                                                            columns='8'
                                                            placeholder=''
                                                            state={this.state}
                                                            actionHandler={this.generalHandler}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Label text="Address" columns='4' />
                                                        <Textarea
                                                            style={{ height: '60px' }}
                                                            fieldname='address'
                                                            formname='contactInformation'
                                                            columns='8'
                                                            placeholder=''
                                                            state={this.state}
                                                            actionHandler={this.generalHandler}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Label text="Email" columns='4' />
                                                        <Input
                                                            fieldname='email'
                                                            formname='contactInformation'
                                                            columns='8'
                                                            placeholder=''
                                                            state={this.state}
                                                            actionHandler={this.generalHandler}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="btn-toolbar pull-right">
                                                            <button style={{ marginRight: '21%' }} onClick={this.addContactInformation} type="submit" className="pull-right btn green">
                                                                {utils.getLabelByID("Add")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div style={{ padding: '0 15px' }}>
                                        <Table
                                            gridColumns={utils.getGridColumnByName('contactInfo')}
                                            gridData={this.state.contactInformationArr || []}
                                            componentFunction={this.contactInfoActionHandler}
                                        />
                                    </div>
                                </Portlet>

                                <Portlet title={"SETTLEMENT"}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Label text="Creation" columns='4' />
                                            <Combobox
                                                fieldname='creationAutoOrManual'
                                                formname='settlement'
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                columns='8'
                                                placeholder='Select'
                                                style={{}}
                                                state={this.state}
                                                typeName="settleas"
                                                dataSource={_.get(this.state, 'typeData', {})}
                                                actionHandler={this.customSelectHandler.bind(this, 'settleas')}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Label text="Manual Approval" columns='4' />
                                            <Combobox
                                                fieldname='requireManualApproval'
                                                formname='settlement'
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                columns='8'
                                                placeholder='Select'
                                                style={{}}
                                                state={this.state}
                                                typeName="yesnobinary"
                                                dataSource={_.get(this.state, 'typeData', {})}
                                                actionHandler={this.generalHandler}
                                                className="form-control"
                                            />
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Label text="Currency" columns='4' />
                                            <Input
                                                fieldname='currency'
                                                disabled={true}
                                                value={"AED"}
                                                formname='settlement'
                                                columns='8'
                                                placeholder=''
                                                state={this.state}
                                                actionHandler={this.generalHandler}
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <Label text="Start On" columns='4' />
                                            <div className="col-md-8">
                                                <DateControl id="settlementStartOn" defaultValue={utils.UNIXConvertToDate(this.state.settlementStartOn)} dateChange={this.dateChange.bind(this, 'settlementStartOn')} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">

                                        {(this.state.settlement.creationAutoOrManual == "Auto" || this.state.settlement.creationAutoOrManual == "A") && <div className="col-md-6">
                                            <Label text="Frequency" columns='4' />
                                            <Combobox
                                                fieldname='frequency'
                                                formname='settlement'
                                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                                columns='8'
                                                placeholder='Select'
                                                style={{}}
                                                state={this.state}
                                                typeName="frequency"
                                                dataSource={_.get(this.state, 'typeData', {})}
                                                actionHandler={this.customSelectHandler.bind(this, 'frequency')}
                                                className="form-control"
                                            />
                                        </div>}


                                    </div>

                                    {/* <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button onClick={this.addSettlement} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        gridColumns={utils.getGridColumnByName('settlement')}
                        gridData={this.state.settlementArr || []}
                    /> */}
                                </Portlet>
                                <Portlet title={"TERMS & CONDITIONS EN"} style={{ height: '140px' }}>
                                    <Textarea
                                        style={{ height: '120px' }}
                                        fieldname='termsandConditionsEn'
                                        formname='contractParams'
                                        disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                        columns='12'
                                        placeholder='Terms and Conditions'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </Portlet>
                                <Portlet title={"TERMS & CONDITIONS AR"} style={{ height: '140px' }}>
                                    <Textarea
                                        style={{ height: '120px', textAlign: "right" }}
                                        fieldname='termsandConditionsAr'
                                        formname='contractParams'
                                        disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                        columns='12'
                                        placeholder='الأحكام والشروط'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </Portlet>
                            </COL>
                        </ROW>
                    </div >

                </div>
            </div >

        )
    }

    pointConversionActionHandler = ({ actionName, index }) => {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let pointConversion = this.state.pointConversionArr[index];
                    let tempState = [...this.state.pointConversionArr];
                    tempState.splice(index, 1);
                    this.setState({
                        pointConversion,
                        pointConversionArr: tempState
                    });
                }
                break;
            case "Delete":
                if (index > -1) {
                    let tempState = this.state.pointConversionArr;
                    tempState.splice(index, 1);
                    this.setState({ pointConversionArr: tempState });
                }
                break;

            default:
                break;
        }
    }

    contactInfoActionHandler = ({ actionName, index }) => {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let contactInfo = this.state.contactInformationArr[index];
                    let tempState = [...this.state.contactInformationArr];
                    tempState.splice(index, 1);
                    this.setState({
                        contactInformation: contactInfo,
                        contactInformationArr: tempState
                    });
                }
                break;
            case "Delete":
                if (index > -1) {
                    let contactInfo = this.state.contactInformationArr;
                    contactInfo.splice(index, 1);
                    this.setState({ contactInformationArr: contactInfo });
                }
                break;

            default:
                break;
        }
    }

    subsidiaryPartnerActionHandler = ({ actionName, index }) => {
        switch (actionName) {
            case "View":
                if (index > -1) {
                    this.setState({
                        isEdited: true
                    });
                    this.stateChangeSubsidaryPartnerBool();
                    let contractParams = this.state.contractParamsArr[index];
                    let redemptionTermsArr = [..._.get(contractParams, 'redemptionBillingRates', [])]
                    for (let i in redemptionTermsArr) {
                        redemptionTermsArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    }
                    let accrualTermsArr = [..._.get(contractParams, 'accrualBillingRates', [])]
                    for (let i in accrualTermsArr) {
                        accrualTermsArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    }
                    let ratesArr = [..._.get(contractParams, 'conversionBillingRates', [])]
                    for (let i in ratesArr) {
                        ratesArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    }


                    console.log("contractParams from subsidiaryPartnerActionHandler", contractParams)
                    this.setState({
                        contractParams,
                        isAccrualPartner: contractParams.isAccrualPartner,
                        isRedemptionPartner: contractParams.isRedemptionPartner,
                        isPointConversionPartner: contractParams.isPointConversionPartner,
                        redemptionTermsArr,
                        accrualTermsArr,
                        ratesArr,
                        settlementStartOn: _.get(contractParams, 'settlement.startOn', ''),
                        settlement: _.get(contractParams, 'settlement', {}),
                        pointCreditRules: _.get(contractParams, 'pointCreditRules', {}),
                        erpSettingsTo: _.get(contractParams, 'erpSettingsTo', {})

                    });
                }
                break;
            case "Edit":
                if (index > -1) {
                    this.setState({
                        isEdited: true
                    });
                    this.stateChangeSubsidaryPartnerBool();


                    let contractParams = this.state.contractParamsArr[index];
                    let redemptionTermsArr = [..._.get(contractParams, 'redemptionBillingRates', [])]
                    for (let i in redemptionTermsArr) {
                        redemptionTermsArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    }

                    let accrualTermsArr = [..._.get(contractParams, 'accrualBillingRates', [])]
                    for (let i in accrualTermsArr) {
                        accrualTermsArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    }
                    let ratesArr = [..._.get(contractParams, 'conversionBillingRates', [])]
                    for (let i in ratesArr) {
                        ratesArr[i].action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
                        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]
                    }


                    console.log("contractParams from subsidiaryPartnerActionHandler", contractParams)
                    this.setState({
                        contractParams,
                        isAccrualPartner: contractParams.isAccrualPartner,
                        isRedemptionPartner: contractParams.isRedemptionPartner,
                        isPointConversionPartner: contractParams.isPointConversionPartner,
                        redemptionTermsArr,
                        accrualTermsArr,
                        ratesArr,
                        settlementStartOn: _.get(contractParams, 'settlement.startOn', ''),
                        settlement: _.get(contractParams, 'settlement', {}),
                        pointCreditRules: _.get(contractParams, 'pointCreditRules', {}),
                        erpSettingsTo: _.get(contractParams, 'erpSettingsTo', {})
                    });
                    let tempState = [...this.state.contractParamsArr];
                    tempState.splice(index, 1);
                    this.setState({
                        contractParamsArr: tempState
                    });
                }
                break;
            case "Delete":
                if (index > -1) {
                    let contractParamsArray = this.state.contractParamsArr;
                    contractParamsArray.splice(index, 1);
                    this.setState({ contractParamsArr: contractParamsArray });
                }
                break;

            default:
                break;
        }
    }

    redemptionTermsActionHandler = ({ actionName, index }) => {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let redemptionTerms = this.state.redemptionTermsArr[index];
                    let tempState = [...this.state.redemptionTermsArr];
                    tempState.splice(index, 1);
                    this.setState({
                        redemptionTermsArr: tempState,
                        redemptionTerms: redemptionTerms,
                        redemptionStartDate: redemptionTerms.redemptionStartDate,
                        redemptionEndDate: redemptionTerms.redemptionEndDate
                    });
                }
                break;
            case "Delete":
                if (index > -1) {
                    let redemptionterms = this.state.redemptionTermsArr;
                    redemptionterms.splice(index, 1);
                    this.setState({ redemptionTermsArr: redemptionterms });
                }
                break;
            default:
                break;
        }
    }


    accrualTermsActionHandler = ({ actionName, index }) => {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let accrualTerms = this.state.accrualTermsArr[index];
                    let tempState = [...this.state.accrualTermsArr];
                    tempState.splice(index, 1);
                    this.setState({
                        accrualTermsArr: tempState,
                        accrualTerms: accrualTerms,
                        accuralStartDate: accrualTerms.accuralStartDate,
                        accuralEndDate: accrualTerms.accuralEndDate
                    });
                }
                break;
            case "Delete":
                if (index > -1) {
                    let accrualterms = this.state.accrualTermsArr;
                    accrualterms.splice(index, 1);
                    this.setState({ accrualTermsArr: accrualterms });
                }
                break;
            default:
                break;
        }
    }

    ratesActionHandler = ({ actionName, index }) => {
        switch (actionName) {
            case "Edit":
                if (index > -1) {
                    let rates = this.state.ratesArr[index];
                    let tempState = [...this.state.ratesArr];
                    tempState.splice(index, 1);
                    this.setState({
                        rates,
                        ratesArr: tempState,
                        pointConversionStartDate: rates.startDate,
                        pointConversionEndDate: rates.endDate
                    });
                }
                break;
            case "Delete":
                if (index > -1) {
                    let ratesArr = [...this.state.ratesArr];
                    ratesArr.splice(index, 1);
                    this.setState({ ratesArr });
                }
                break;
            default:
                break;
        }
    }

    addContactInformation = () => {
        let contactInformationArr = [...this.state.contactInformationArr]
        let contactInformation = { ...this.state.contactInformation }

        if (!contactInformation.email || !contactInformation.firstName || !contactInformation.lastName || !contactInformation.mobile || !contactInformation.phone || !contactInformation.address) {
            toaster.showToast("All fields are required for contact information", "ERROR");
            return;
        }
        contactInformation.action = [{ label: "Edit", iconName: "fa fa-edit", actionType: "COMPONENT_FUNCTION" },
        { label: "Delete", iconName: "fa fa-trash", actionType: "COMPONENT_FUNCTION" }]

        /* check if contact already added */
        if (contactInformationArr.some(e => e.mobile === contactInformation.mobile) || contactInformationArr.some(e => e.email === contactInformation.email)) {
            toaster.showToast('Contact information already added', "ERROR")
            return;
        }
        contactInformationArr.push({ ...contactInformation })
        console.log("this.state.contactInformationArr >>> ", contactInformationArr)
        this.setState({ contactInformationArr, contactInformation: undefined })
    }

    adderpSettingsFrom = () => {
        let erpSettingsFrom = { ...this.state.erpSettingsFrom }
        // let erpSettingsFromArr = [...this.state.erpSettingsFromArr]
        if (!erpSettingsFrom.vendorCode || !erpSettingsFrom.glCode || !erpSettingsFrom.billingAccount || !erpSettingsFrom.vendorSiteID) {
            toaster.showToast("Please provide  ERP From Settings", "ERROR");
            return;
        }
        // erpSettingsFromArr.push({ ...erpSettingsFrom })
        this.setState({ erpSettingsFrom })
    }

    adderpSettingsTo = () => {
        let erpSettingsTo = { ...this.state.erpSettingsTo }
        let erpSettingsToArr = [...this.state.erpSettingsToArr]
        if (Object.keys(erpSettingsTo).length == 0) {
            toaster.showToast("Please provide an ERP Setting.", "ERROR");
            return;
        }
        erpSettingsToArr.push({ ...erpSettingsTo })
        this.setState({ erpSettingsToArr, erpSettingsTo: undefined })
    }

    typeSelected = (e) => {
        //e.preventDefault();

        if (e.target.name == 'Redemption') {
            this.setState({
                isPointConversionPartner: false,
                isAccrualPartner: false,
                isRedemptionPartner: !this.state.isRedemptionPartner

            });
        } else if (e.target.name == 'Accrual') {
            this.setState({
                isPointConversionPartner: false,
                isAccrualPartner: !this.state.isAccrualPartner,
                isRedemptionPartner: false

            });
        } else if (e.target.name == 'pointConverstion') {
            this.setState({
                isPointConversionPartner: !this.state.isPointConversionPartner,
                isAccrualPartner: false,
                isRedemptionPartner: false
            });
        }

    }

    approvePartner = () => {
        let body = {
            "partnerCode": this.props.params.partnerCode,
            "status": "APPROVED"
        }

        this.setState({ isLoading: true })
        window.scrollTo(0, 0)

        this.props.actions.generalAjxProcess(constants.updatePartnerStatus, { body })
            .then(result => {
                console.log(result, "result")
                this.evaluateResult(result, 'Partner Approved successfully!');
            })
            .catch(err => {
                console.log(err);
                toaster.showToast(err, "ERROR");
                this.setState({ isLoading: false });
                return;
            });

    }


    setPartner = () => {

        let contractParams = this.addSubsidaryPartner()


        let body = { ...this.state.body }

        console.log("body :::: ", body)

        body.erpSettingsFrom = { ...this.state.erpSettingsFrom };

        if (Object.keys(body).length == 0) {
            toaster.showToast("Please fill the fields", "ERROR");
            return;
        }
        body.partnerNameEn = !_.get(this.state, 'body.partnerNameEn', undefined) ? _.get(this.state, 'userEntity.entityName.name', '') : _.get(this.state, 'body.partnerNameEn', '')
        body.partnerCode = !_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', '') : _.get(this.state, 'body.partnerCode', '')
        body.partnerNameAr = !_.get(this.state, 'body.partnerNameAr', undefined) ? _.get(this.state, 'userEntity.arabicName', '') : _.get(this.state, 'body.partnerNameAr', '')
        body.logo = this.getProgram().img ? this.getProgram().img : "N/A"
        if (!body.partnerCategory) {
            toaster.showToast("Partner category is required", "ERROR");
            return;
        } else {
            let partnerCategory = [];

            if (!Array.isArray(body.partnerCategory)) {
                partnerCategory.push(body.partnerCategory); // -- this should be multi select dropdown--already an array
                body.partnerCategory = partnerCategory;
            }


        }
        // if (!this.state.isAccrualPartner && !this.state.isPointConversionPartner && !this.state.isRedemptionPartner) {
        //     toaster.showToast("Partner type is required", "ERROR");
        //     return;
        // }

        if (!this.state.contactInformationArr.length) {
            toaster.showToast("Contact Information is required", "ERROR");
            return;
        } else {
            body.contacts = [...this.state.contactInformationArr]
        }

        if (!contractParams.length) {
            toaster.showToast("Contract Parameters are required", "ERROR");
            return;
        } else {


            body.contractParams = [...contractParams]
        }

        let request = {
            body: {
                ...body,
                isNewPartner: this.props.params.partnerCode ? false : true
            }
        }
        console.log(`\n\n\n${JSON.stringify({ ...body })}\n\n\n`)


        this.setState({ isLoading: true })
        window.scrollTo(0, 0)

        this.props.actions.generalAjxProcess(constants.addEditPartner, request)
            .then(result => {
                console.log(result, "result")
                this.evaluateResult(result, !this.props.params.partnerCode ? "Partner Creation Success!" : "Partner Edit Success!");
            })
            .catch(err => {
                console.log(err);
                toaster.showToast(err, "ERROR");
                this.setState({ isLoading: false });
                return;
            });
    }

    redirectToList = (msg = 'Processed OK!') => {
        browserHistory.push('/smiles/partnerList')
        toaster.showToast(msg);
    }

    evaluateResult = (result, msg = 'Processed OK!') => {
        if (result.message.status == 'ERROR') {
            this.setState({ isLoading: false });
            toaster.showToast(result.message.errorDescription, "ERROR");
            return;
        } else {
            this.redirectToList(msg);
        }
    }
    partnerFields() {
        return (

            <ROW>
                <COL>
                    <COL>



                        <Portlet title={"From Partner"} style={{ height: "100px" }}>
                            <div className="col-md-6" style={{ display: 'flex' }}>
                                {this.imgDiv('body', { width: "100px", height: "100px" }, { textAlign: undefined, width: 'fit-content' })}
                                <div>
                                    <div className="row" style={{ padding: '0px 0px 0px 7px' }}>
                                        <b>{!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', 'Loading...') : _.get(this.state, 'body.partnerCode', 'Loading...')}</b>
                                    </div>
                                    <div className="row" style={{ padding: '15px 0px 0px 7px' }}>
                                        {!_.get(this.state, 'body.partnerNameEn', undefined) ? _.get(this.state, 'userEntity.entityName.name', 'Loading...') : _.get(this.state, 'body.partnerNameEn', 'Loading...')}
                                    </div>
                                    <div className="row" style={{ padding: '15px 0px 0px 7px' }}>
                                        {!_.get(this.state, 'body.partnerNameAr', undefined) ? _.get(this.state, 'userEntity.arabicName', 'Loading...') : _.get(this.state, 'body.partnerNameAr', 'Loading...')}
                                    </div>
                                </div>



                            </div>
                        </Portlet>

                        <br></br>

                        {(!this.props.params.partnerCode ? true : (this.state.status == "APPROVED" ? true : false)) && this.renderTypePortlet()}
                    </COL>
                </COL>
            </ROW >
        )
    }


    handleOnBack = () => {
        // if (this.state.isEdited) {
        //     this.addSubsidaryPartner()
        // }
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

    renderTypePortlet = (place = 1) => {
        return (
            <div>
                <Portlet title={"TO PARTNER"}>
                    <div className="row">
                        <div className="col-md-6">
                            <Label required={true} text="Your Partner Code" columns='4' />
                            <Combobox
                                fieldname='withPartnerCode'
                                formname='contractParams'
                                columns='8'
                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                placeholder='Select'
                                style={{}}
                                state={this.state}
                                typeName="entityNames"
                                dataSource={_.get(this.state, 'typeData', {})}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-6">
                            <Label required={true} text="Partner Er Code" columns='4' />
                            <Input
                                fieldname='partnerErCode'
                                formname='body'
                                columns='8'
                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">

                            <Label required={true} text="Partner Description En" columns='4' />
                            <Textarea
                                style={{ height: '60px', width: "100%" }}
                                fieldname='partnerDescriptionEn'
                                formname='body'
                                columns='8'
                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                placeholder='Partner Description'
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />

                        </div>
                        <div className="col-md-6">

                            <Label required={true} text="Partner Description Ar" columns='4' />
                            <Textarea
                                style={{ height: '60px', textAlign: "right" }}
                                fieldname='partnerDescriptionAr'
                                formname='body'
                                columns='8'
                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                placeholder='وصف الشريك'
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />

                        </div>
                    </div>
                    <br></br>

                    <div className="row">
                        <div className="col-md-6">
                            <Label required={true} text="Partner Category" columns='4' />
                            <Combobox
                                fieldname='partnerCategory'
                                formname='body'
                                columns='8'
                                disabled={this.props.params.partnerCode ? (this.state.status == "PENDING" ? true : ((this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : false)) : false}
                                placeholder='Select'
                                style={{}}
                                state={this.state}
                                typeName="category"
                                dataSource={_.get(this.state, 'typeData', {})}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>

                    </div>



                    <Portlet title={"TYPE"}>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="" style={{ opacity: '1' }}>
                                    <div className="portlet-body flip-scroll">
                                        <div className="row">
                                            <div className="col-md-10 col-md-offset-1">

                                                {

                                                    (!this.props.params.partnerCode ? true : this.state.isRedemptionPartner) && (
                                                        <div className="col-md-4 text-center">
                                                            <div className="voucherBox">
                                                                <img src="/assets/Resources/Redemption.png" width="20%" />
                                                                <h5><strong>Redemption</strong></h5>
                                                                <div className="icheck-list">
                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                        <label></label>
                                                                        <input disabled={this.props.params.partnerCode ? true : false} onChange={this.typeSelected} type="checkbox" name="Redemption" value="" checked={this.state.isRedemptionPartner} className="form-control" />
                                                                        <span></span></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (!this.props.params.partnerCode ? true : this.state.isAccrualPartner) && (
                                                        <div className="col-md-4 text-center">
                                                            <div className="voucherBox">
                                                                <img src="/assets/Resources/Accrual.png" width="20%" />
                                                                <h5><strong>Accural</strong></h5>
                                                                <div className="icheck-list">
                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                        <label></label>
                                                                        <input disabled={this.props.params.partnerCode ? true : false} onChange={this.typeSelected} type="checkbox" name="Accrual" checked={this.state.isAccrualPartner} value="" className="form-control" />
                                                                        <span></span></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (!this.props.params.partnerCode ? true : this.state.isPointConversionPartner) && (
                                                        <div className="col-md-4 text-center">
                                                            <div className="voucherBox">
                                                                <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                                <h5><strong>Point Conversion</strong></h5>
                                                                <div className="icheck-list">
                                                                    <label className="mt-checkbox mt-checkbox-outline">
                                                                        <label></label>
                                                                        <input disabled={this.props.params.partnerCode ? true : false} onChange={this.typeSelected} type="checkbox" name="pointConverstion" checked={this.state.isPointConversionPartner} className="form-control" />
                                                                        <span></span></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </Portlet>
                </Portlet>

            </div>

        )
    }

    render() {

        this.state.subsidaryPartnerBool ? AddPartner.displayName = "Subsidary Partner" : AddPartner.displayName = "Partner Contract";
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        } else {
            return (
                <div className="row">
                    {this.partnerFields()}
                    {this.subsidaryPartner()}

                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button style={{ marginRight: '17%' }} disabled={(this.props.params.partnerCode && (this.state.status == "APPROVED" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[1])) ? true : ((this.props.params.partnerCode && (this.state.status == "PENDING" && this.state.user.orgCode == this.props.params.partnerCode.split("_")[0])) ? true : false)} onClick={(!this.props.params.partnerCode || this.state.status == "APPROVED") ? this.setPartner : this.approvePartner} type="submit" className="pull-right btn green">
                                    {(!this.props.params.partnerCode || this.state.status == "APPROVED") ? utils.getLabelByID("Submit") : utils.getLabelByID("Approve")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getAllOrgMap: _.get(state.app, 'getAllOrgMap.data.searchResult', undefined),
        user: _.get(state.app, 'user.data.searchResult', undefined),
        userEntity: _.get(state.app, 'entityList.data.searchResult[0]', undefined),
        typeData: state.app.typeData.data,
        entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
        getPartnerDataByID: _.get(state.app, 'getInterim', undefined)
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
AddPartner.displayName = "Partner Contract";
export default connect(mapStateToProps, mapDispatchToProps)(AddPartner);













