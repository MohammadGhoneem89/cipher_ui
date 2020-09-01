import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../core/actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../../core/common/request.js';
import Portlet from '../../../core/common/Portlet.jsx';
import Table from '../../../core/common/Datatable.jsx';
// import LabApplicationForm from './lab-application-form.jsx';
import * as utils from '../../../core/common/utils.js';
import Input from './../../../core/common/Input.jsx';
import Textarea from './../../../core/common/Textarea.jsx';
import Combobox from './../../../core/common/Select.jsx';
import * as gen from './../../../core/common/generalActionHandler';
import moment from 'moment';
import { Base64 } from 'js-base64';
// import JSONPretty from 'react-json-pretty';
import ReactJson from 'react-json-view';


class TemplateDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        // this.processRequest = this.processRequest.bind(this);

        this.state = {
            filteredLetters: [],
            jsonViewer: false,
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
            body: {
                sampleJson: undefined
            },
            selectedType: '',
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.sortList = this.sortList.bind(this);
        this.generalHandler = gen.generalHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.searchData.length > 0 && this.props.params.id !== 'new') {
            let template = nextProps.searchData.filter(x => x.templateId == this.props.params.id);

            console.log(template, '==========');
            this.setState({
                isLoading: false,
                body: {
                    templateId: template[0].templateId,
                    templateName: template[0].templateName,
                    templatePath: template[0].templatePath,
                    templateMarkup: Base64.decode(template[0].templateMarkup),
                    sampleJson: template[0].sampleJson
                },
                selectedType: template[0].templateType
            })
        }
        if (nextProps.user) {
            this.setState({
                user: nextProps.user.searchResult
            })
        }
        if (nextProps.sampleLetters) {
            this.setState({
                sampleLetters: nextProps.sampleLetters
            })
        }
    }

    componentDidMount() {
        this.getSampletemplates();
        console.log('MOUNT');
        console.log(this.props.params);
        if (this.props.params.id) {
            this.getInitialData();
        }
    }

    getSampletemplates() {
        let obj = {
            body: {}
        }
        this.props.actions.generalProcess(constants.getSampleLetters, obj);
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

        if (!body.sampleJson) {
            _.set(errors, 'sampleJson', utils.getLabelByID('Field is required'))
        }

        if (this.state.selectedType == 'path' && !body.templatePath) {
            _.set(errors, 'templatePath', utils.getLabelByID('Field is required'))
        }

        if (this.state.selectedType == 'markup' && !body.templateMarkup) {
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
                "templateMarkup": Base64.encode(this.state.body.templateMarkup),
                "templatePath": this.state.body.templatePath,
                "templateType": this.state.selectedType,
                "sampleJson": this.state.body.sampleJson,
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

    checkRadio = (e, type) => {
        console.log(this.state.sampleLetters, '-==-=-=-=-=-=-=-');
        this.setState({
            selectedType: type
        })
        let sampleArray = [...this.state.sampleLetters];
        let filteredLetters = sampleArray.filter(x => {
            if (x.templateType == type) {
                return x;
            }
        })

        this.setState({
            filteredLetters
        })
    }

    showJsonViewer = () => {
        this.setState({
            jsonViewer: !this.state.jsonViewer
        })
    }

    selectSample(e, index) {
        this.state.filteredLetters[index]
        let obj = this.state.filteredLetters[index]
        console.log(obj);
        this.setState({
            body: {
                "templateName": obj.templateName,
                "templateMarkup": Base64.decode(obj.templateMarkup),
                "templatePath": obj.templatePath,
                // "templateType": this.state.selectedType,
                "sampleJson": obj.templatePayload,
            }
        })
    }

    render() {
        console.log(this.state);
        if (!this.state.isLoading) {
            return (
                <div>
                    <Portlet title={utils.getLabelByID('Add Letter')}>
                        {/* <LabApplicationForm onSubmit={this.submit} initialValues={this.state.filterCriteria} state={this.state} resetFilter={this.resetFilter}/> */}
                        <div className="addEditLab">
                            <div className="row">

                            </div>


                            <div className="row">


                                <div className="col-md-2">
                                    <label htmlFor="">Letter Name:</label>
                                </div>
                                <div className="col-md-4">
                                    <Input
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

                            </div>
                            <div className="row">

                                <div style={{ textAlign: 'center', marginLeft: '-30px' }} className="col-md-6">
                                    <input onChange={e => this.checkRadio(e, 'path')} type="radio" checked={this.state.selectedType == 'path'} />
                                    <label style={{ paddingLeft: '20px' }} htmlFor="">Path</label>
                                    {/* <input value={this.state.phone} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'phone')} /> */}
                                </div>

                                <div className="col-md-6">
                                    <input onChange={e => this.checkRadio(e, 'markup')} checked={this.state.selectedType == 'markup'} type="radio" />
                                    <label style={{ paddingLeft: '20px' }} htmlFor="">Markup</label>
                                    {/* <input value={this.state.phone} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'phone')} /> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">Samples:</div>
                                <div style={{marginBottom: "75px"}} className="col-md-10">
                                        <div className="scroll">
                                            <div className="scroll-div">
                                                {this.state.filteredLetters && this.state.filteredLetters.map((sample, index) => {
                                                    return (
                                                        <div className="box"> 
                                                <div className="template-title">
                                                   <span>Name:</span> <span>{sample.templateName}</span>
                                                </div>
                                                <div className="template-title" style={{marginRight: '85px'}}>
                                                   <span>Type:</span> <span>{sample.templateType}</span>
                                                </div>
                                                <div className="template-button">
                                                <button className="btn" style={{backgroundColor: '#da7878'}}  onClick={e => this.selectSample(e, index)}> Get Sample</button>
                                                </div>
                                                </div>
                                                    )
                                                })}
                                                
                                            
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <label htmlFor="">Sample JSON:</label>
                                </div>
                                <div className="col-md-10" style={{ marginTop: "-70px" }}>
                                    <div className="row text-right">
                                        {!this.state.jsonViewer &&
                                            <button disabled={this.state.body.sampleJson == undefined} className="btn-primary json-view-button" onClick={this.showJsonViewer}>Beautify</button>
                                        }
                                        {this.state.jsonViewer &&
                                            <button className="btn-primary json-view-button" onClick={this.showJsonViewer}>Edit</button>
                                        }
                                    </div>
                                    {this.state.jsonViewer &&
                                        <ReactJson src={JSON.parse(this.state.body.sampleJson)} onEdit={true} onAdd={true} />
                                    }
                                    {!this.state.jsonViewer &&
                                        <Textarea
                                            divStyle={{ padding: '0px', height: '500px' }}
                                            status={(this.state.errors && this.state.errors.sampleJson) ? "ERROR" : undefined}
                                            fieldname='sampleJson'
                                            formname='body'
                                            value={this.state.body.sampleJson}
                                            columns='12'
                                            placeholder={utils.getLabelByID('')}
                                            state={this.state}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                    }
                                    {/* <input value={this.state.email} type="text" className="form-control" onChange={e => this.selectField(e.target.value, 'email')} /> */}
                                </div>
                            </div>
                            {/* <JSONPretty id="json-pretty" theme={JSONPrettyMon} data={this.state}></JSONPretty> */}
                            {this.state.selectedType == 'path' &&
                                <div className="row">
                                    <div className="col-md-2">
                                        <label htmlFor="">Letter Path:</label>
                                    </div>
                                    <div className="col-md-4">
                                        <Input
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
                                </div>}
                            {this.state.selectedType == 'markup' &&
                                <div className="row">
                                    <div className="col-md-2">
                                        <label htmlFor="">Template Markup:</label>
                                    </div>
                                    <div className="col-md-10">
                                        <Textarea
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
                            }

                        </div>
                        <div className="row" style={{
                            display: 'flex', justifyContent: 'flex-end',
                            padding: '25px'
                        }}>
                            {/* {this.state.user && this.state.user.orgType == 'PUREHEALTH' && */}
                            <button onClick={() => this.submitTemplateDetails()} className="btn green" >
                                {utils.getLabelByID('Save')}
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
    if (state.app.getAllLetters || state.app.sampleLetters) {
        return {
            searchData: state.app.getAllLetters && state.app.getAllLetters.length > 0 ? state.app.getAllLetters : '',
            sampleLetters: state.app.sampleLetters,
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

TemplateDetails.displayName = 'ADD / EDIT Letter';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateDetails);
