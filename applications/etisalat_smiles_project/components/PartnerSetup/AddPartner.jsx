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


class AddPartner extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            userDetail: {},
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
            pointCreditRulesArr: [],
            pointCreditRules: {},
            settlementArr: [],
            settlement: {},
            checkbox_pointConversion: false,
            checkbox_accural: false,
            checkbox_redemption: false

        };
        this.generalHandler = gen.generalHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['category', 'rule', 'frequency', 'settleas']));

    }

    accuralTermStartDateChange = value => {
        console.log(value)
        if (value == 'Invalid date') {
            this.setState({ accuralStartDate: undefined })
        } else {
            this.setState({ accuralStartDate: value })
        }
    }

    settlementStartOnDateChange = value => {
        console.log(value)
        if (value == 'Invalid date') {
            this.setState({ settlementStartOn: undefined })
        } else {
            this.setState({ settlementStartOn: value })
        }
    }

    accuralTermEndDateChange = value => {
        console.log(value)
        if (value == 'Invalid date') {
            this.setState({ accuralEndDate: undefined })
        } else {
            this.setState({ accuralEndDate: value })
        }
    }

    onStartDateChange = value => {
        console.log(value)
        value == 'Invalid date' ? this.setState({ startDate: undefined }) : this.setState({ startDate: value });
    };

    onEndDateChange = value => {
        console.log(value)
        value == 'Invalid date' ? this.setState({ endDate: undefined }) : this.setState({ endDate: value });
    };

    addDefaultSrc = e => e.target.src = constants.baseUrl + "/images/image-user.png";

    imgDiv() {
        return (
            <div className="col-md-12" style={{ textAlign: "center" }}>
                <img
                    id="UserProfilePic"
                    src={this.state.userDetail.profilePic ? constants.baseUrl + this.state.userDetail.profilePic : constants.baseUrl + "/images/image-user.png"}
                    onError={this.addDefaultSrc}
                    className="img-responsive img-thumbnail" alt="Profile Image" width='160px'
                    height='160px'
                    ref={input => this.profilePic = input}
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

    addSubsidaryPartner = () => {

        let contractParams = { ...this.state.contractParams };
        let contractParamsArr = [...this.state.subsidaryPartners];

        if (contractParams == undefined) {
            toaster.showToast('Subsidary Partner Details not added.', 'ERROR');
            return;
        }
        if (contractParams.partnerCode == undefined) {
            toaster.showToast('Subsidary Partner code not present.', 'ERROR');
            return;
        }
        // contractParams accrualTerms pointCreditRules settlement

        contractParams.settlement = [...this.state.settlementArr]
        contractParams.erpSettingsTo = [...this.state.erpSettingsToArr]
        contractParams.erpSettingsFrom = [...this.state.erpSettingsFromArr]

        contractParams.accrualTerms = [...this.state.accrualTermsArr]
        contractParams.pointCreditRules = [...this.state.pointCreditRulesArr]

        contractParamsArr.push({ ...contractParams });

        this.setState({
            contractParamsArr,
            contractParams: {},
            erpSettingsToArr: [],
            settlementArr: [],
            accrualTermsArr: [],
            pointCreditRulesArr: []

        })
        this.stateChangeSubsidaryPartnerBool();
    }

    addAccuralTerm = () => {
        let accrualTerms = { ...this.state.accrualTerms }
        if (this.state.accuralStartDate) {
            accrualTerms.startDate = this.state.accuralStartDate
        }
        if (this.state.accuralEndDate) {
            accrualTerms.endDate = this.state.accuralEndDate
        }
        let accrualTermsArr = [...this.state.accrualTermsArr]

        if (Object.keys(accrualTerms).length == 0) {
            toaster.showToast("Please add Accural Term", "ERROR");
            return;
        }
        accrualTermsArr.push({ ...accrualTerms })
        this.setState({ accrualTermsArr, accrualTerms: undefined, accuralStartDate: undefined })
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

    subsidaryPartner() {
        return (

            <Portlet title={"SUBSIDARY PARTNER"}>
                <div className="row">
                    <div className="col-md-6">
                        <Label text="Code" columns='4' style={{ padding: "0 0 0 30" }} />
                        <Input
                            fieldname='partnerCode'
                            formname='contractParams'
                            columns='7'
                            placeholder=''
                            state={this.state}
                            actionHandler={this.generalHandler}
                            className="form-control"
                        />
                    </div>

                </div>

                <Portlet title={"ACCURAL TERMS"}>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="Start Date" columns='4' />
                            <div className="col-md-7">
                                <DateControl id="accuralStartDate" dateChange={this.accuralTermStartDateChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Label text="End Date" columns='4' />
                            <div className="col-md-7">
                                <DateControl id="accuralEndDate" dateChange={this.accuralTermEndDateChange} />
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
                                columns='7'
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
                                <button onClick={this.addAccuralTerm} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        gridColumns={utils.getGridColumnByName('accrualTerms')}
                        gridData={this.state.accrualTermsArr || []}
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
                                fieldname='maxUnsettled'
                                formname='pointCreditRules'
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
                            <Label text="Allow" columns='4' />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button onClick={this.addPointCreditRules} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        gridColumns={utils.getGridColumnByName('pointCreditRules')}
                        gridData={this.state.pointCreditRulesArr || []}
                    />
                </Portlet>


                <Portlet title={"SETTLEMENTS"}>
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
                                <DateControl id="settlementStartOn" dateChange={this.settlementStartOnDateChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="" columns='4' />

                        </div>
                    </div>

                    <div className="row">
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
                    />
                </Portlet>
                <Portlet title={"TERMS & CONDITIONS"} style={{ height: '140px' }}>
                    <Textarea
                        style={{ height: '120px' }}
                        fieldname='termsAndConditions'
                        formname='contractParams'
                        columns='12'
                        placeholder=''
                        state={this.state}
                        actionHandler={this.generalHandler}
                        className="form-control"
                    />
                </Portlet>
                <Portlet title={"ERP SETTINGS"}>
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

                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button onClick={this.adderpSettingsTo} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        gridColumns={utils.getGridColumnByName('ERPsettings')}
                        gridData={this.state.erpSettingsToArr || []}
                    />
                </Portlet>


                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-toolbar pull-right">
                            <button onClick={this.addSubsidaryPartner} type="submit" className="pull-right btn green">
                                {utils.getLabelByID("Add")}
                            </button>
                            <button onClick={this.stateChangeSubsidaryPartnerBool} type="submit" className="pull-right btn blue">
                                {utils.getLabelByID("Back")}
                            </button>
                        </div>
                    </div>
                </div>
            </Portlet >
        )
    }

    addContactInformation = () => {
        let contactInformationArr = [...this.state.contactInformationArr]
        let contactInformation = { ...this.state.contactInformation }
        if (contactInformation.name == undefined || contactInformation.name == "") {
            toaster.showToast("Please provide name for the Contact.", "ERROR");
            return;
        }
        if ((contactInformation.email == undefined || contactInformation.email == "") &
            (contactInformation.mobile == undefined || contactInformation.mobile == "") &
            (contactInformation.phone == undefined || contactInformation.phone == "") &
            (contactInformation.address == undefined || contactInformation.address == "")) {
            toaster.showToast("Please provide atleast one of the Contact Information.", "ERROR");
            return;
        }

        contactInformationArr.push({ ...contactInformation })
        this.setState({ contactInformationArr, contactInformation: undefined })
    }

    adderpSettingsFrom = () => {
        let erpSettingsFrom = { ...this.state.erpSettingsFrom }
        let erpSettingsFromArr = [...this.state.erpSettingsFromArr]
        if (Object.keys(erpSettingsFrom).length == 0) {
            toaster.showToast("Please provide an ERP Setting.", "ERROR");
            return;
        }
        erpSettingsFromArr.push({ ...erpSettingsFrom })
        this.setState({ erpSettingsFromArr, erpSettingsFrom: undefined })
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
                checkbox_pointConversion: false,
                checkbox_accural: false,
                checkbox_redemption: !this.state.checkbox_redemption,
                contractType: "Redemption"

            });
        } else if (e.target.name == 'Accrual') {
            this.setState({
                checkbox_pointConversion: false,
                checkbox_accural: !this.state.checkbox_accural,
                checkbox_redemption: false,
                contractType: "Accrual"

            });
        } else if (e.target.name == 'pointConverstion') {
            this.setState({
                checkbox_pointConversion: !this.state.checkbox_pointConversion,
                checkbox_accural: false,
                checkbox_redemption: false,
                contractType: "pointConverstion"
            });
        }

    }

    setPartner = () => {
        let body = { ...this.state.body }
        if (this.state.contactInformationArr.length) { body.contactInformation = [...this.state.contactInformationArr] }
        if (this.state.contractParamsArr.length) { body.contractParams = [...this.state.contractParamsArr] }
        if (this.state.contractType) { body.contractType = this.state.contractType }
        if (Object.keys(body).length == 0) {
            toaster.showToast("No Fields Defined", "ERROR");
            return
        }

        console.log(`\n\n\n${JSON.stringify({ ...body })}\n\n\n`)

        //DUMMY
        this.setState({ isLoading: true })
        window.scrollTo(0, 0)
        setTimeout(() => {
            this.setState({ isLoading: false })
            toaster.showToast("Processed OK!");
        }, 5000)


    }

    partnerFields() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6" style={{ padding: "20 0 0 0" }}>
                        <div className="row">
                            <Label text="Name" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Input
                                fieldname='name'
                                formname='body'
                                columns='7'
                                placeholder='Name'
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <Label text="Code" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Input
                                fieldname='code'
                                formname='body'
                                columns='7'
                                placeholder=''
                                state={this.state}
                                actionHandler={this.generalHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="row">
                            <Label text="Category" columns='4' style={{ padding: "0 0 0 30" }} />
                            <Combobox
                                fieldname='category'
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
                    </div>

                    <div className="col-md-6">
                        {this.imgDiv()}
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

                                            <div className="col-md-4 text-center">
                                                <div className="voucherBox">
                                                    <img src="/assets/Resources/Redemption.png" width="20%" />
                                                    <h5><strong>Redemption</strong></h5>
                                                    <div className="icheck-list">
                                                        <label className="mt-checkbox mt-checkbox-outline">
                                                            <label></label>
                                                            <input onChange={this.typeSelected} type="checkbox" name="Redemption" value="" checked={this.state.checkbox_redemption} className="form-control" />
                                                            <span></span></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4 text-center">
                                                <div className="voucherBox">
                                                    <img src="/assets/Resources/Accrual.png" width="20%" />
                                                    <h5><strong>Accural</strong></h5>
                                                    <div className="icheck-list">
                                                        <label className="mt-checkbox mt-checkbox-outline">
                                                            <label></label>
                                                            <input onChange={this.typeSelected} type="checkbox" name="Accrual" checked={this.state.checkbox_accural} value="" className="form-control" />
                                                            <span></span></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4 text-center">
                                                <div className="voucherBox">
                                                    <img src="/assets/Resources/pointConverstion.png" width="20%" />
                                                    <h5><strong>Point Conversion</strong></h5>
                                                    <div className="icheck-list">
                                                        <label className="mt-checkbox mt-checkbox-outline">
                                                            <label></label>
                                                            <input onChange={this.typeSelected} type="checkbox" name="pointConverstion" checked={this.state.checkbox_pointConversion} className="form-control" />
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

                </Portlet>
                <Portlet title={"CONTACT"}>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="Name" columns='4' />
                            <Input
                                fieldname='name'
                                formname='contactInformation'
                                columns='7'
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
                            <Label text="Phone" columns='4' />
                            <Input
                                fieldname='phone'
                                formname='contactInformation'
                                columns='7'
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
                            <Label text="Address" columns='4' />
                            <Textarea
                                style={{ height: '60px' }}
                                fieldname='address'
                                formname='contactInformation'
                                columns='7'
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
                                <button onClick={this.addContactInformation} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        gridColumns={utils.getGridColumnByName('contactInfo')}
                        gridData={this.state.contactInformationArr || []}
                    />
                </Portlet>

                <Portlet title={"ERP SETTINGS"}>
                    <div className="row">
                        <div className="col-md-6">
                            <Label text="Vendor Code" columns='4' />
                            <Input
                                fieldname='vendorCode'
                                formname='erpSettingsFrom'
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
                                formname='erpSettingsFrom'
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
                                formname='erpSettingsFrom'
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
                                formname='erpSettingsFrom'
                                columns='7'
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
                                <button onClick={this.adderpSettingsFrom} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        gridColumns={utils.getGridColumnByName('ERPsettings')}
                        gridData={this.state.erpSettingsFromArr || []}
                    />

                </Portlet>



                <Portlet title={"Subsidary Partners"}>
                    <Table
                        gridColumns={utils.getGridColumnByName('subsidaryPartner')}
                        gridData={this.state.contractParamsArr || []}
                    />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button onClick={this.stateChangeSubsidaryPartnerBool} type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Add Subsidary Partner")}
                                </button>
                            </div>
                        </div>
                    </div>
                </Portlet>

                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-toolbar pull-right">
                            <button onClick={this.setPartner} type="submit" className="pull-right btn green">
                                {utils.getLabelByID("Submit")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
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





                    {this.state.subsidaryPartnerBool && this.subsidaryPartner()}
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,


    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
AddPartner.displayName = "Add Partner";
export default connect(mapStateToProps, mapDispatchToProps)(AddPartner);













