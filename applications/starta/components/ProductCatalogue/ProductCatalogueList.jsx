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
import { Alert } from 'antd';

class ProductCatalogueList extends React.Component {

    constructor(props) {
        super(props);
        this.mode = '';
        this.state = {
            actions: [],
            upload: false,
            download: false,
            editURL: "",
            searchCriteria: {},
            disabledPagging: true,
            page: {
                pageSize: 10,
                currentPageNo: 1,
                totalRecords: 0
            },

            isLoading: true,
            gridData: [],

        };
        this.item = '';
        this.formSubmit = this.formSubmit.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
        this.updateMode = this.updateMode.bind(this);
        this.upload = false;
        this.download = false;
    }

    getRequest = () => {

        let itemID = document.getElementById('itemID') == null ? "" : document.getElementById('itemID').value;
        let itemDescription = document.getElementById('itemDescription') == null ? "" : document.getElementById('itemDescription').value;
        let name = document.getElementById('name') == null ? "" : document.getElementById('name').value;
        let searchCriteria = {}
        if (itemID != "")
            searchCriteria.itemCode = itemID

        if (itemDescription != "")
            searchCriteria.description = itemDescription

        if (name != "")
            searchCriteria.name = name

        this.setState({ searchCriteria: searchCriteria })
        let request = {
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize

                },
                searchCriteria
            }
        };
        return request
    }
    formSubmit = () => {
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
    }
    reset = () => {
        document.getElementById('itemID').value = "";
        document.getElementById('itemDescription').value = "";
        document.getElementById('name').value = "";
        let request = {
            "body": {
                page: {
                    currentPageNo: 1,
                    pageSize: 10
                },
                searchCriteria: {}
            }
        }
        this.setState({ searchCriteria: {} });
        this.props.actions.generalProcess(constants.getItemCatalogue, request);
    };

    updateMode() {
        console.log("this.upload , this.download >> ", this.upload, this.download);
        if (this.download && !this.upload) {
            // this.mode = "EDITONLY"
            this.mode = "DOWNLOAD";
        }
        if (this.upload && !this.download) {
            // this.mode = "EDIT"
            this.mode = "UPLOAD";
        }
        if (this.upload && this.download) {
            this.mode = "UPSERT";
        }
        if (!this.upload && !this.download) {
            this.mode = "DISABLE";
        }
    }

    updateActionURI = (products) => {
        for (let i in products) {
            for (let j in products[i].actions) {
                if (products[i].actions[j].label === 'Edit') {
                    products[i].actions[j].URI[0] = products[i].actions[j].URI[0] + "/" + this.mode;
                }
            }
        }
        console.log("products", products);
        return products;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getItemCatalogue && nextProps.gridActions[0] && nextProps.gridActions[0].pageActions) {

            let pageActions = nextProps.gridActions[0].pageActions;
            console.log("pageActions", pageActions);
            for (let i = 0; i < pageActions.length; i++) {
                if (nextProps.gridActions[0].upload == pageActions[i].value) {
                    this.upload = true;
                    pageActions.splice(i, 1);
                }
                if (nextProps.gridActions[0].download == pageActions[i].value) {
                    this.download = true;
                    pageActions.splice(i, 1);
                }
            }
            this.updateMode();
            this.setState({
                gridData: this.updateActionURI(nextProps.getItemCatalogue),
                page: nextProps.getPage,
                isLoading: false,
                actions: pageActions
            });

        }

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
    }

    searchCallBack = (keyWord) => {
    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
    }
    updateState = (data) => {
        this.setState(data);
    }

    render() {
        console.log("DOWNLOAD >> ", this.download ? this.download : false)
        console.log("upload >> ", this.upload ? this.upload : false)
        let modalAction = [
            {
                type: "modal",
                className: "btn btn-default",
                label: utils.getLabelByID("Close"),
                icon: "close",
                actionHandler: this.updateState.bind(this, {
                    modelBoxData: false
                })
            }
        ]
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div>
                <ModalBox isOpen={this.state.modelBoxData ? true : false}>
                    <Portlet title={utils.getLabelByID("Details")} actions={modalAction}>
                        {(() => {
                            if (this.state.modelBoxData) {
                                return this.state.modelBoxData.replace(/(.{60})/g, "$1\n");
                            }
                        })()}
                    </Portlet>
                </ModalBox>

                <Portlet title={utils.getLabelByID("ITEM catalogue")}>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Item ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="itemID" id="itemID" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Item Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="name" id="name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Item Description")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="ItemDescription" id="itemDescription" />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">

                                    <button type="submit" className="btn green" onClick={this.formSubmit}
                                    >
                                        {utils.getLabelByID("Search")}
                                    </button>
                                    <button type="clear" className="btn green" onClick={this.reset}
                                    >
                                        {utils.getLabelByID("Clear")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </Portlet>
                <Portlet title={"Item catalogue"} actions={this.state.actions}

                    isPermissioned={true}>
                    {/* {
                        sessionStorage.orgType == 'CUSTOMER' && this.state.gridData.map((obj) => {

                            obj.action = [
                                {
                                    "label": "View",
                                    "URI": [`/strata/ProductCatalogue/VIEW/${this.mode}`],
                                    "params": "_id",
                                    iconName: "fa fa-eye"
                                }
                            ]

                        })
                    }{
                        sessionStorage.orgType != 'CUSTOMER' && this.state.gridData.map((obj) => {

                            obj.action = [
                                {
                                    "label": "Edit",
                                    "URI": [`/strata/ProductCatalogue/EDIT/${this.mode}`],
                                    "params": "_id",
                                    iconName: "fa fa-eye"
                                }
                            ]

                        })


                    } */}
                    <Table
                        gridColumns={utils.getGridColumnByName("itemCatalogue")}
                        gridData={this.state.gridData}
                        totalRecords={this.props.getPage.totalRecords}
                        pageChanged={this.pageChanged}
                        pageSize={10}
                        pagination={true}
                        searchCallBack={this.searchCallBack}
                        export={false}
                        search={true}
                        renderPopupBody={(data) => {
                            this.updateState({ modelBoxData: data });
                        }}
                        activePage={this.state.page.currentPageNo}
                    />
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        gridActions: _.get(state.app, 'getItemCatalogue.actions', []),
        getPage: _.get(state.app, 'getItemCatalogue.pageData', {}),

    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
ProductCatalogueList.displayName = "ITEM CATALOGUE";
export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogueList);
