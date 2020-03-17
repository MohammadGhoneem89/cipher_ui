/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import Label from '../../../../core/common/Lable.jsx';
import Input from '../../../../core/common/Input.jsx'
import _ from 'lodash';
import * as requestCreator from '../../../../core/common/request.js';
import DateControl from '../../../../core/common/DateControl.jsx';
import Combobox from '../../../../core/common/Select.jsx';
import * as gen from '../../../../core/common/generalActionHandler';
import Row from '../../../../core/common/Row.jsx';
import Col from '../../../../core/common/Col.jsx';
import ModalBox from '../../../../core/common/ModalBox.jsx';
import * as toaster from '../../../../core/common/toaster.js';
class SettlementList extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            Transaction: {},
            actions: [],
            totalRecords: 2,
            ModalBoxGrid: false,
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this)
        this.searchResult = this.searchResult.bind(this)
        this.generalHandler = gen.generalHandler.bind(this)
    }


    onStartDateChange = value => {
        value == 'Invalid date' ? this.setState({ Start: undefined }) : this.setState({ Start: value });
    };

    onEndDateChange = value => {
        value == 'Invalid date' ? this.setState({ End: undefined }) : this.setState({ End: value });
    };

    searchResult = () => {
        this.props.actions.generalProcess(constants.getViewTransaction, this.getRequest());
    }


    redirectToAddPage = () => {

    }

    showHideManualSettlement = () => {

    }
    showHideManualSettlement = () => {
        this.setState({
            ModalBoxGrid: !this.state.ModalBoxGrid
        });
    }

    getRequest = () => {
        let searchCriteria = {
            ..._.get(this.state, 'searchCriteria', {}),
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        console.log(searchCriteria, ' search criteria')
        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize,
                },
                searchCriteria
            }
        };
        return request;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.transData)
            this.setState({ gridData: nextProps.transData })
        if (nextProps.records)
            this.setState({ totalRecords: nextProps.records })

        if (nextProps.entityNames && nextProps.user && nextProps.userEntity) {
            this.setState(
                {
                    user: { ...nextProps.user },
                    userEntity: {
                        ...nextProps.userEntity
                    },
                    typeData: {
                        ...(nextProps.typeData || {}),
                        entityNames: nextProps.entityNames
                            .filter(item => {
                                if (item.orgType === 'PARTNER') {
                                    return true
                                } else {
                                    return false
                                }
                            })
                    },
                    isLoading: false
                }
            )
        }

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getSettlementList, this.getRequest())
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
            "currentPageNo": 1,
            "pageSize": 1
        }));
        window.scrollTo(0, 0);
    }

    createSettlementBatch = () => {
        this.setState({ isLoading: true })
        window.scrollTo(0, 0);
        this.props.actions.generalAjxProcess(constants.createSettlementBatch, {
            body: {
                ..._.get(this.state, 'body', {}),
                "Start": this.state.Start,
                "End": this.state.End
            }
        })
            .then(result => {
                console.log(result)
                result.message.status == 'ERROR' ? toaster.showToast(result.message.errorDescription, "ERROR") : toaster.showToast("Settlement Batch initiated");
                this.setState({ isLoading: false, ModalBoxGrid: false })
            }).catch(result => {
                window.scrollTo(0, 0);
                this.setState({ isLoading: false, ModalBoxGrid: false })
                toaster.showToast(utils.getLabelByID("Settlment Batch not initiated"), "ERROR");
            })
    }

    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        // this.props.actions.generalProcess(constants.getMasterAgreement, this.getRequest());
        this.props.actions.generalProcess(constants.getSettlementList, this.getRequest())
    }

    renderModalGrid = () => {
        return (<Portlet style={{ height: '325px' }} title={utils.getLabelByID("Manual Settlement")} isPermissioned={true}>
            <form style={{ padding: "21 28px 14 14" }}>

                <div className="row">
                    <div className="col-md-6">
                        <Label text="From Partner Code" columns='4' />
                        <Input
                            fieldname='fromPartenerCode'
                            formname='body'
                            value={!_.get(this.state, 'body.partnerCode', undefined) ? _.get(this.state, 'user.orgCode', 'Loading...') : _.get(this.state, 'body.partnerCode', 'Loading...')}
                            columns='8'
                            disabled={true}
                            placeholder=''
                            state={this.state}
                            actionHandler={this.generalHandler}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <Label text="To Partner Code" columns='4' />
                        <Combobox
                            fieldname='withPartenerCode'
                            formname='body'
                            columns='8'
                            placeholder='Select'
                            style={{}}
                            state={this.state}
                            typeName="entityNames"
                            dataSource={_.get(this.state, 'typeData', {})}
                            actionHandler={this.generalHandler}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("Last Settlment Date")}</label>
                        </div>
                        <div className="form-group col-md-8">
                            <DateControl
                                id='endDate'
                                dateChange={this.onStartDateChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group col-md-4">
                            <label className="control-label">{utils.getLabelByID("End Date")}</label>
                        </div>
                        <div className="form-group col-md-8">
                            <DateControl
                                id='endDate'
                                dateChange={this.onEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{ marginTop: '130px' }} className="row clearfix pull-right">
                        <button type="submit" className="btn green" style={{ marginRight: '5px' }} onClick={this.createSettlementBatch}>
                            Initiate
                        </button>
                        <button type="submit" className="btn green" style={{ marginRight: '44px', width: '83px' }} onClick={this.showHideManualSettlement}>
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </Portlet>)
    }


    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <Row>
                <Col>
                    <ModalBox isOpen={this.state.ModalBoxGrid}>
                        {this.renderModalGrid()}
                    </ModalBox>
                    <Portlet title={utils.getLabelByID("Settlements")}>
                        <div className="row">
                            <Row>
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Start Date" />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <DateControl
                                            id='startDate'
                                            dateChange={this.onStartDateChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="End Date" />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <DateControl
                                            id='endDate'
                                            dateChange={this.onEndDateChange}
                                        />
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Status" />
                                    </div>
                                    {/* <input type="text" className="form-control" name="status" id="status" /> */}
                                    <Combobox
                                        fieldname='Status'
                                        formname='searchCriteria'
                                        placeholder='Select'
                                        style={{}}
                                        columns={8}
                                        state={this.state}
                                        typeData="rule"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Direction" />
                                    </div>
                                    <Combobox
                                        fieldname='direction'
                                        formname='searchCriteria'
                                        placeholder='Select'
                                        style={{}}
                                        columns={8}
                                        state={this.state}
                                        typeData="rule"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </Row>

                            <Row>
                                <div className="col-md-6">
                                    <div className="form-group col-md-4">
                                        <Label text="Partner" />
                                    </div>
                                    <div className="form-group col-md-8">
                                        {/* <input type="text" className="form-control" name="status" id="status" /> */}
                                        <Combobox
                                            fieldname='partner'
                                            formname='searchCriteria'
                                            placeholder='Select'
                                            style={{}}
                                            state={this.state}
                                            typeData="rule"
                                            dataSource={_.get(this.state, 'typeData', {})}
                                            actionHandler={this.generalHandler}
                                            className="form-control"
                                        />
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button style={{
                                                marginRight: '30px',
                                                background: '#7AA62D',
                                                backgroundImage: 'linear-gradient(to right, rgba(255, 0, 0, 0), rgba(218, 237, 12, 0.86))',
                                                border: '0px',
                                                fontStyle: 'oblique',
                                                height: '38px'
                                            }} type="submit" className="btn green" onClick={this.showHideManualSettlement}>
                                                {utils.getLabelByID('Manual Settlement')}
                                            </button>
                                            <button type="submit" className="btn green" onClick={this.searchResult}>
                                                {utils.getLabelByID('Search')}
                                            </button>
                                            <button type="clear" className="btn green" onClick={this.reset}>
                                                {utils.getLabelByID("Clear")}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </Row>
                        </div>

                        <Row>
                            <Col>

                                <Table
                                    gridColumns={utils.getGridColumnByName("viewSettlementList")}
                                    gridData={this.state.gridData}
                                    fontclass=""
                                    totalRecords={this.state.totalRecords}
                                    pageSize={10}
                                    pageChanged={this.pageChanged}
                                    pagination={true}
                                    search={true}
                                    activePage={this.state.page.currentPageNo}
                                />

                            </Col>
                        </Row>
                    </Portlet>
                </Col>
            </Row >
        );
    }
}



function mapStateToProps(state, ownProps) {
    return {
        transData: _.get(state.app, 'getSettlementList.data.searchResult.rows', []),
        records: _.get(state.app, 'getSettlementList.data.searchResult.count', ''),

        user: _.get(state.app, 'user.data.searchResult', undefined),
        userEntity: _.get(state.app, 'entityList.data.searchResult[0]', undefined),
        entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', undefined),
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

SettlementList.displayName = "Settlement List";
export default connect(mapStateToProps, mapDispatchToProps)(SettlementList);












