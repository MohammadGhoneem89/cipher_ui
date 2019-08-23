/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import _ from 'lodash';

class ItemMasterList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actions: [],
            searchCriteria: {},
            // searchFilters: ""
            page: {
                pageSize: 10,
                currentPageNo: 1,
                totalRecords: 0
            },

            isLoading: false,
            gridData: [],

        };
        this.item = '';
        this.formSubmit = this.formSubmit.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
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


    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps.getItemCatalogue)
        if (nextProps.getItemCatalogue) {

            this.setState({
                gridData: nextProps.getItemCatalogue,
                page: nextProps.getPage,
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() =>
            this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest())
            , 1000);
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
                        "URI": "/strata/ProductCatalogue",
                        "children": []
                    }]
            }
        )
        
    }
    componentWillUnmount() {
       clearInterval(this.timerID);
    }

    searchCallBack = (keyWord) => {

    }
    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getItemCatalogue, this.getRequest());
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }

        // this.state.gridData.sort(this.sort_by('supplierItemID', true, parseInt))

        return (
            <div>
                <Portlet title={utils.getLabelByID("ITEM MASTER")}>

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
                                <label className="control-label">{utils.getLabelByID("Item Description")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="ItemDescription" id="itemDescription" />
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
                <Portlet title={"Item Catalogue"} actions={this.state.actions}

                    isPermissioned={true}>
                    {
                        this.state.gridData.map((obj) => {

                            obj.action = [
                                {
                                    "label": "Edit",
                                    "URI": ["/strata/ProductCatalogue"],
                                    "params": "_id",
                                    "iconName": "icon-docs"
                                },
                                // {
                                //     "label": "Item Dashboard",
                                //     "URI": ["/itemSummaryDetail"],
                                //     "params": "_id",
                                //     "iconName": "icon-eye"
                                // }
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
                        activePage={this.state.page.currentPageNo}
                    />
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    // console.log(state.app.getItemCatalogue,"<----")
    return {
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        getPage: _.get(state.app, 'getItemCatalogue.pageData', {})
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
ItemMasterList.displayName = "ITEM CATALOGUE";
export default connect(mapStateToProps, mapDispatchToProps)(ItemMasterList);


/*
 getSearchItem = () => {
        // let _this = this;
        // let getGridData = this.props.getItemMasterList;
        // let item = document.getElementById('item') == null ? "" : document.getElementById('item').value;
        // if (item !== "") {
        //     console.log(item, "$$$$$$$$$$4");
        //     getGridData.forEach(function (element) {
        //         if (item == element.itemID) {
        //             getGridData = element;
        //             console.log(getGridData, "--------------updategetGridData");
        //             _this.setState({ gridData: getGridData })
        //         }
        //     });

        // } else
        //     alert("ItemID required!")
        let searchCriteria = {};
        let item = document.getElementById('item') == null ? "" : document.getElementById('item').value;
        let itemDescription = document.getElementById('itemDescription') == null ? "" : document.getElementById('itemDescription').value;
        if (item !== "" || itemDescription !== "") {
            searchCriteria.item = item;
            searchCriteria.itemDescription = itemDescription;
        }


        let request = {
            "body": {
                "itemID": "001",
                searchCriteria: searchCriteria

            }
        };
        console.log(request, "~~~~~~~~~~~~~~~~~~~~~~")
        // this.props.actions.generalProcess(constants.getItemMasterList, this.getRequest());
        return request;

    }
    formSubmit() {

        this.props.actions.generalProcess(constants.getItemMasterList, this.getSearchItem());
    }*/