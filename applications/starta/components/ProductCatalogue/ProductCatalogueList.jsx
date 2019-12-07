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
        this.mode='';
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
        this.updateURL=this.updateURL.bind(this)
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

    updateURL(){
        console.log(this.upload , this.download)
        if (this.download && !this.upload) {
            // this.mode = "EDITONLY"
            this.mode = "DOWNLOAD"
        }
         if (this.upload && !this.download) {
            // this.mode = "EDIT"
            this.mode = "UPLOAD"
        }
        if (this.upload && this.download) {
            this.mode = "UPSERT"
        }
        if(!this.upload && !this.download){
            this.mode = "DISABLE"
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.getItemCatalogue && nextProps.gridActions[0] && nextProps.gridActions[0].pageActions) {
            console.log("nextProps.gridActions", nextProps.gridActions[0])
            let pageActions = nextProps.gridActions[0].pageActions;
            pageActions.forEach(element => {
                if (nextProps.gridActions[0].upload == element.value) {
                    this.upload = true
                }
                if (nextProps.gridActions[0].download == element.value) {
                    this.download=true
                }
            });
            this.setState({
                gridData: nextProps.getItemCatalogue,
                page: nextProps.getPage,
                isLoading: false
            });
            this.updateURL();
        }

    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
        window.scrollTo(0, 0);

        this.setState(
            {
                actions: [
                    {
                        "value": "1002",
                        "type": "pageAction",
                        "label": "ADD",
                        "labelName": "COM_AB_Add",
                        "actionType": "PORTLET_LINK",
                        "iconName": "fa fa-plus",
                        "URI": "/strata/ProductCatalogue/ADD/UPSERT",
                        "children": []
                    }]
            }
        )

    }
    componentWillUnmount() {
        //clearInterval(this.timerID);
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
                                </div>
                            </div>
                        </div>
                    </div>


                </Portlet>
                <Portlet title={"Item catalogue"} actions={this.state.actions}

                    isPermissioned={true}>
                    {
                        this.state.gridData.map((obj) => {

                            obj.action = [
                                {
                                    "label": "Edit",
                                    "URI": [`/strata/ProductCatalogue/EDIT/${this.mode}`],
                                    "params": "_id",
                                    "iconName": "icon-docs"
                                }
                            ]

                        })


                    }
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
