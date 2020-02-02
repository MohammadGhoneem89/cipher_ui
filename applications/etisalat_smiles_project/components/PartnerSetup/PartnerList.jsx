import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../../../../core/actions/generalAction';

import _ from 'lodash';

import Input from './../../../../core/common/Input.jsx'
import Label from './../../../../core/common/Lable.jsx';
import Combobox from './../../../../core/common/Select.jsx';
import DateControl from './../../../../core/common/DateControl.jsx'
import Portlet from './../../../../core/common/Portlet.jsx'
// import Steps from './../../../core/common/Steps.jsx';


import * as utils from './../../../../core/common/utils.js';
import Table from './../../../../core/common/Datatable.jsx';

// import StatusBoxes from './StatusBoxes.jsx'
// import NewPassport from './NewPassport.jsx'

import * as gen from './../../../../core/common/generalActionHandler';
import * as requestCreator from './../../../../core/common/request.js';
import * as constants from './../../../../core/constants/Communication.js';


import { browserHistory } from 'react-router';
class PartnerList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            page: {
                pageSize: 10,
                currentPageNo: 1,
                totalRecords: 0
            },
            gridData: []
        };

        this.generalHandler = gen.generalHandler.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        let request = {
            "body": {
                "page": {
                    "currentPageNo": 1,
                    "pageSize": _.get(this.state, 'page.pageSize', 10)
                },
                "searchCriteria": {
                    "status": "APPROVED"
                }
            }
        }
        this.props.actions.generalProcess(constants.getPartnersList, request)
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['status']));
    }


    getType = (status) => {
        return status.toLowerCase() == 'approved' ? "INFO" : (status.toLowerCase() == 'pending' ? "WARNING" : "ERROR")
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.getPartnersList && nextProps.user) {

            let page = { ...nextProps.getPartnersList.pageData }

            // Grid Data Preperation
            let gridData = []


            nextProps.getPartnersList.searchResult.forEach((partner, index) => {

                let data = {
                    ...partner
                }


                data.fromPartner = data.partnerCode
                data.toPartner = Object.keys(JSON.parse(data.contractParams))[0]


                data.statusObj = {
                    type: this.getType(data.status), // ERROR // WARNING
                    value: data.status.toUpperCase()
                }

                if (data.status.toLowerCase() == 'pending' || data.status.toLowerCase() == 'rejected') {

                    if (_.get(nextProps.user, 'orgCode', '') == data.toPartner) {
                        data.actions = [
                            {
                                "label": "Approve",
                                "URI": ["/smiles/ApprovePartner"],
                                "params": "_id",
                                "iconName": "fa fa-check"
                            }
                        ]
                    }

                } else {
                    if (_.get(nextProps.user, 'orgCode', '') == data.fromPartner) {
                        data.actions = [
                            {
                                "label": "Edit",
                                "URI": ["/smiles/EditPartner"],
                                "params": "_id",
                                "iconName": "fa fa-Edit"
                            }
                        ]
                    }
                }

                gridData.push({
                    ...data
                })
            })
            console.log(gridData, ' Grid Data')
            this.setState({
                gridData,
                page,
                user: { ...nextProps.user }
            })
        }

        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false
            })
        }
        // if ((nextProps.genders || nextProps.countries_and_flags)) {
        //     this.setState({
        //         typeData: {
        //             genders: nextProps.genders || [],
        //             countries_and_flags
        //         },
        //         isLoading: false
        //     })
        // }
    }




    getRequest = (pageNo = 1) => {
        console.log('page changed 2 : ', pageNo)
        let searchCriteria = {
            ..._.get(this.state, 'searchCriteria', {})
        }
        console.log(searchCriteria, ' search criteria')

        let request = {
            "body": {
                "page": {
                    "currentPageNo": pageNo,
                    "pageSize": this.state.page.pageSize

                },
                searchCriteria
            }
        };
        return request
    }

    pageChanged = pageNo => {
        console.log('page changed : ', pageNo)
        this.updateCurrentPage(pageNo);
        this.props.actions.generalProcess(constants.getPartnersList, this.getRequest(pageNo));
    };

    updateCurrentPage = pageNo => {
        let page = { ...this.state.page };
        page.currentPageNo = pageNo;
        this.setState({ page });
    };


    formSubmit = (e) => {
        e.preventDefault()
        //this.setState({isLoading:true})
        this.props.actions.generalProcess(constants.getPartnersList, this.getRequest());
        console.log('form submitted')
    }

    addPartner = (e) => {
        e.preventDefault()
        browserHistory.push('/smiles/addPartner')
    }

    render() {
        if (this.state.isLoading)
            return (<div className="loader">{"Loading"}</div>)
        else
            return (
                <div id="PartnersList">
                    <Portlet title={"Search Filters"}>

                        <div className="form" style={{ marginBottom: '3%' }}>

                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Partner Code" columns='4' />
                                    <Input
                                        fieldname='partnerCode'
                                        formname='searchCriteria'
                                        columns='7'
                                        placeholder='Partner Code'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                    <div className="col-md-1"></div>
                                </div>
                                <div className="col-md-6">
                                    <Label text="Status" columns='4' />
                                    <Combobox
                                        fieldname='status'
                                        formname='searchCriteria'
                                        columns='7'
                                        placeholder='Select'
                                        style={{}}
                                        state={this.state}
                                        typeName="status"
                                        dataSource={_.get(this.state, 'typeData', {})}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                    <div className="col-md-1"></div>
                                </div>
                            </div>


                            <div className="row clearfix pull-right">
                                <button type="submit" className="btn green" style={{ marginRight: '13px' }} onClick={this.formSubmit}>
                                    Search
                                </button>
                                <button type="submit" className="btn green" style={{ marginRight: '85px', width: '83px' }} onClick={this.addPartner}>
                                    Add
                                </button>
                            </div>
                        </div>


                    </Portlet>

                    <Portlet title={"Partner List"}>
                        <Table
                            gridColumns={utils.getGridColumnByName('partnerlist')}
                            gridData={this.state.gridData || []}
                            totalRecords={this.state.page.totalRecords}
                            pageChanged={this.pageChanged}
                            pageSize={this.state.page.pageSize}
                            pagination={true}
                            activePage={this.state.page.currentPageNo}
                        />
                    </Portlet>



                </div>



            )
    }
}

PartnerList.propTypes = {
};

function mapStateToProps(state, ownProps) {
    console.log(state.app, ' state')
    return {
        user: _.get(state.app, 'user.data.searchResult', undefined),
        // Grid Data
        getPartnersList: _.get(state.app, 'getPartnersList', undefined),
        // Type Data
        typeData: state.app.typeData.data,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

PartnerList.displayName = "Search Partner";
export default connect(mapStateToProps, mapDispatchToProps)(PartnerList)