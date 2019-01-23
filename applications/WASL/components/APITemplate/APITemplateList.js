/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import ModalBox from '../../../../core/common/ModalBox.jsx';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import APITemplateTest from './APITemplateTest'

class APITemplateList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
              },
            isLoading: true,
            gridData : []
        };
        this.name = '';
        this.code = '';
    }

    getRequest = (page) => {
        let Name = this.name.value;

        let searchCriteria = {};

        if(Name !== ""){
            searchCriteria.name = Name;
        }

        let request = {
            "action": "findAPITemplate",
            "searchCriteria": searchCriteria,
            "page": _.isEmpty(page) ? this.state.page : page
        };
        this.props.actions.generalProcess(constants.findAPITemplate, request);
    }

    add = () => {
        browserHistory.push('/apiTemplate/create')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gridData && nextProps.pageData) {
            this.setState({
                gridData: nextProps.gridData,
                isLoading: false,
                currentPageNo : nextProps.pageData.currentPageNo,
                totalRecords : nextProps.pageData.totalRecords
            });
        }
    }

    componentDidMount() {
        this.getRequest();
        window.scrollTo(0, 0);
    }

    updateState(data) {
        this.setState(data);
    }

    updateBeneficiaryInfo = (data) => {
        this.setState({
            modalIsOpen: false,
            beneficiaries: data.beneficiaries
        });
    }

    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({page: page});
        this.getRequest(page);
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }

        let _this = this;
        let addAction = [
            {
                type: "link",
                className: "btn btn-default",
                label: utils.getLabelByID("Add"),
                icon: "plus",
                actionHandler: _this.updateState.bind(_this, {
                    modalIsOpen: true,
                    index: 1
                })
            }];

        return (
            <div>
                <Portlet title={utils.getLabelByID("API Payload Template")}>

                    <div className="row">

                        <div className="form-group col-md-6">
                            <div className="col-md-8">
                                <label className="label-bold">{utils.getLabelByID("Template Name")}</label>
                                <input type="text" className="form-control ekycinp" name="name" ref={(value) => this.name = value} />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">

                                    <button type="submit" className="btn green" onClick={this.getRequest}>
                                        {utils.getLabelByID("Search")}
                                    </button>
                                    <button type="button" className="btn default" onClick={this.add} >
                                        {utils.getLabelByID("Add")}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Portlet title={""} isPermissioned={true} actions={addAction}>
                        {
                            this.state.gridData.map((obj)=>{
                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/apiTemplate/"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    },
                                    {
                                        "label": "Edit",
                                        "URI": ["/apiTemplate/"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    },
                                    {
                                        "label": "Test",
                                        "URI": ["/apiTemplate/test/"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })
                        }
                        <Table
                            gridColumns={utils.getGridColumnByName("APITemplateList")}
                            gridData={this.state.gridData}
                            fontclass=""
                            totalRecords={_.get(this.props, 'pageData.totalRecords', 0)}
                            pageSize={10}
                            pageChanged={this.pageChanged}
                            pagination={true}
                            activePage={this.state.page.currentPageNo}
                        />
                    </Portlet>
                </Portlet>
                <ModalBox isOpen={this.state.modalIsOpen}>
                    <APITemplateTest
                        onSubmit={this.updateBeneficiaryInfo}
                        initialValues={this.state}
                        index={this.state.index}
                        updateState={this.updateState}
                    />
                </ModalBox>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        gridData : _.get(state.app,'findAPITemplate.data',[]),
        pageData : _.get(state.app,'findAPITemplate.pageData',{})
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
APITemplateList.displayName = "API Payload Template";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateList);
