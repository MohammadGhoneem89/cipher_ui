import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../core/actions/generalAction.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../../core/common/request.js';
import Portlet from '../../../core/common/Portlet.jsx';
// import LabApplicationForm from './lab-application-form.jsx';
import * as utils from '../../../core/common/utils.js';
import Input from './../../../core/common/Input.jsx';
import Textarea from './../../../core/common/Textarea.jsx';
import Combobox from './../../../core/common/Select.jsx';
import * as gen from './../../../core/common/generalActionHandler';
import DateControl from '../../../core/common/DateControl.jsx';
import Label from '../../../core/common/Lable.jsx';
import moment from 'moment';
import axios from 'axios';

class TestTemplateDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        // this.processRequest = this.processRequest.bind(this);

        this.state = {
            startDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            endDate: moment().add(6, 'days').format('YYYY-MM-DD'),
            isActive: 1,
            isBookingRequired: 1,
            isMinistryPostingRequired: 1,
            getAllDoneBookings: [],
            filterCriteria: undefined,
            acquirerList: undefined,
            pageSize: 10,
            currentPageNo: 1,
            sortData: undefined,
            isLoading: false,
            searchData: [],
            labSlots: [],
            body: {}
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.sortList = this.sortList.bind(this);
        this.generalHandler = gen.generalHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.searchData.length > 0) {
            let template = nextProps.searchData.filter(x => x.templateId == this.props.params.id);

            console.log(template, '==========');
            this.setState({
                isLoading: false,
                body: {
                    templateId: template[0].templateId,
                    templateName: template[0].templateName,
                    templatePath: template[0].templatePath,
                    templateMarkup: Base64.decode(template[0].templateMarkup)
                }
            })
        }
        if (nextProps.user) {
            this.setState({
                user: nextProps.user.searchResult
            })
        }
    }

    componentDidMount() {
        console.log('MOUNT');
        console.log(this.props.params);
        if (this.props.params.id) {
            this.getInitialData();
        }
    }


    getInitialData() {
        if (this.props.params.id != 'new') {
            let obj = {
                body: {
                    name: '',
                    applicationNo: '',
                    pageNo: this.state.currentPageNo,
                    pageSize: 10,
                    "page": {
                        "pageSize": 10,
                        sortData: this.state.sortData
                    },
                }
            }
            this.props.actions.generalProcess(constants.getAllLetters, obj);
            this.setState({ isLoading: true });
        }
    }

    submit(data) {
        console.log(data);
        let obj = {
            body: { ...data }
        }
        console.log(obj);
        obj.body.pageNo = 1;
        obj.body.pageSize = 10;
        this.props.actions.generalProcess(
            constants.getApplicationBySearchCriteria,
            obj
        );
        this.setState({ filterCriteria: data, activePage: 1 });
    }

    pageChanged(pageNo) {
        this.setState({
            currentPageNo: pageNo
        }, () => this.getInitialData())
    }


    sortList(sortData) {
        this.setState({ sortData: sortData });
        this.props.actions.generalProcess(
            constants.getAcquirerList,
            requestCreator.createAcquirerListRequest(
                {
                    currentPageNo: this.state.activePage,
                    pageSize: this.state.pageSize,
                    sortData
                },
                this.state.filterCriteria
            )
        );
    }

    resetFilter = () => {
        this.setState({
            filterCriteria: undefined,
            activePage: 1
        }, () => {
            this.getInitialData();
        })
    }
    selectField(value, name) {
        console.log(value, name);
        this.setState({
            body: {
                [name]: value
            }
        })
    }
    selectFieldWithoutBody(value, name) {
        console.log(value, name);
        this.setState({
            [name]: value
        })
    }
    submitTemplateDetails() {
        let body = _.get(this.state, 'body', {})
        let errors = {};

        if (!body.templateName) {
            _.set(errors, 'templateName', utils.getLabelByID('Field is required'))
        }
        // else if (ValidationChecker(body.name)) {
        //     _.set(errors, 'surname', utils.getLabelByID('noSpCharacters'))
        // }
        if (!body.templateMarkup) {
            _.set(errors, 'templateMarkup', utils.getLabelByID('Field is required'))
        }
        // else if (!(tmp2 > 86400)) {
        //     _.set(errors, 'DOB', utils.getLabelByID('validDateOfBirth'))
        // }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors
            })
            return
        }

        let obj = {
            "body": {
                "templateId": this.state.body.templateId,
                "templateName": this.state.body.templateName,
                "templateMarkup": this.state.body.templateMarkup,
                "templatePath": this.state.body.templatePath
            }
        }
        console.log(obj);
        this.props.actions.generalProcess(constants.addUpdateLetter, obj);
    }

    selectIsDefault() {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    selectIsBookingReq() {
        this.setState({
            isBookingRequired: !this.state.isBookingRequired
        })
    }
    selectIsMinistryPosting() {
        this.setState({
            isMinistryPostingRequired: !this.state.isMinistryPostingRequired
        })
    }


    startDateChange = value => {
        console.log(value)
        let convertedDate = moment(value * 1000).unix();
        console.log(convertedDate);
        value == 'Invalid date' ? this.setState({ startDate: undefined }) : this.setState({ startDate: moment(convertedDate).format('YYYY-MM-DD') });
    };
    endDateChange = value => {
        console.log(value)
        let convertedDate = moment(value * 1000).unix();
        console.log(convertedDate);
        value == 'Invalid date' ? this.setState({ endDate: undefined })
            :
            this.setState({ endDate: moment(convertedDate).format('YYYY-MM-DD') });
    };

    testLetterPayload() {
        console.log(this.state.body);
        let { templatePayload } = this.state.body;
        // console.log(templatePayload, 'TTTTTTTTTTTT');
        // templatePayload.templateId = this.state.body.templateId
        //     let body = {
        //         templatePayload: JSON.parse(templatePayload) 
        // }
        //     this.props.actions.generalAsyncProcess(constants.testLetter, body).then(res => {
        //         console.log(res);
        //     });

        const headers = {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        };
        let body = {
            templatePayload: JSON.parse(templatePayload)
        }
        body.templatePayload.template.templateId = this.props.params.id
        axios.post(constants.testLetter, body, {
            responseType: 'arraybuffer',
            headers: headers
        })
            .then(res => {
                // this.setState({
                //     documentLoader: false
                // })
                const url = window.URL.createObjectURL(new Blob([res.data]
                    , { type: "application/pdf" }))
                var link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', this.state.body.templateName + '.pdf');
                document.body.appendChild(link);
                link.click();
            })

    }
    render() {
        console.log(this.state);
        if (!this.state.isLoading) {
            return (
                <div>
                    <Portlet title={utils.getLabelByID('Letter Details')}>
                        {/* <LabApplicationForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} resetFilter={this.resetFilter}/> */}
                        <div className="addEditLab">
                            <div className="row">

                            </div>


                            <div className="row">
                                <div className="col-md-12">

                                    <div className="col-md-2">
                                        <label htmlFor="">Letter Name:</label>
                                    </div>
                                    <div className="col-md-4">
                                        <Input
                                            disabled={true}
                                            divStyle={{ padding: '0px' }}
                                            status={(this.state.errors && this.state.errors.templateName) ? "ERROR" : undefined}
                                            fieldname='templateName'
                                            formname='body'
                                            value={this.state.templateName}
                                            columns='12'
                                            placeholder={utils.getLabelByID('')}
                                            state={this.state}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                        {/* <input value={this.state.phone} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'phone')} /> */}
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="">Letter Path:</label>
                                    </div>
                                    <div className="col-md-4">
                                        <Input
                                            disabled={true}
                                            divStyle={{ padding: '0px' }}
                                            status={(this.state.errors && this.state.errors.templatePath) ? "ERROR" : undefined}
                                            fieldname='templatePath'
                                            formname='body'
                                            value={this.state.body.templatePath}
                                            columns='12'
                                            placeholder={utils.getLabelByID('')}
                                            state={this.state}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                        {/* <input value={this.state.phone} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'phone')} /> */}
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-2">
                                        <label htmlFor="">Letter Markup:</label>
                                    </div>
                                    <div className="col-md-10">
                                        <Textarea
                                            disabled={true}
                                            divStyle={{ padding: '0px' }}
                                            status={(this.state.errors && this.state.errors.templateMarkup) ? "ERROR" : undefined}
                                            fieldname='templateMarkup'
                                            formname='body'
                                            value={this.state.body.templateMarkup}
                                            columns='12'
                                            placeholder={utils.getLabelByID('')}
                                            state={this.state}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                        {/* <input value={this.state.email} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'email')} /> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row" style={{
                            display: 'flex', justifyContent: 'flex-end',
                            padding: '25px'
                        }}>
                            {/* {this.state.user && this.state.user.orgType == 'PUREHEALTH' && */}
                            {/* <button onClick={() => this.submitTemplateDetails()} className="btn green" >
                            {utils.getLabelByID('Save')}
                        </button> */}
                            {/* } */}
                        </div>
                    </Portlet>

                    <Portlet title={utils.getLabelByID('Test Letter')}>
                        {/* <LabApplicationForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} resetFilter={this.resetFilter}/> */}
                        <div className="addEditLab">
                            <div className="row">

                            </div>


                            <div className="row">
                                <div className="col-md-12">

                                    <div className="col-md-2">
                                        <label htmlFor="">Letter Payload:</label>
                                    </div>
                                    <div className="col-md-10">
                                        <Textarea
                                            divStyle={{ padding: '0px' }}
                                            status={(this.state.errors && this.state.errors.templatePayload) ? "ERROR" : undefined}
                                            fieldname='templatePayload'
                                            formname='body'
                                            value={this.state.body.templatePayload}
                                            columns='12'
                                            placeholder={utils.getLabelByID('')}
                                            state={this.state}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                        {/* <input value={this.state.email} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'email')} /> */}
                                    </div>



                                </div>
                            </div>


                        </div>
                        <div className="row" style={{
                            display: 'flex', justifyContent: 'flex-end',
                            padding: '25px'
                        }}>
                            {/* {this.state.user && this.state.user.orgType == 'PUREHEALTH' && */}
                            <button onClick={() => this.testLetterPayload()} className="btn green" >
                                {utils.getLabelByID('Test')}
                            </button>
                            {/* } */}
                        </div>
                    </Portlet>
                </div>
            );
        }
        else {
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
        }
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app);
    if (state.app.getAllLetters) {
        return {
            searchData: state.app.getAllLetters,
            isLoading: false
        };
    }
    else {
        return {
            searchData: {},
            // isLoading: true
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

TestTemplateDetails.displayName = 'Test Letter';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestTemplateDetails);
