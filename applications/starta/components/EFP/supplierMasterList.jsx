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

class supplierMasterList extends React.Component {

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
            currentPageNo: 1
        };
        this.supplier = '';
        this.formSubmit = this.formSubmit.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
    }

    formSubmit() {
        this.props.actions.generalProcess(constants.getSupplierMasterList, this.getRequest());
    }

    transformResponse = (getSupplierMasterList) => {
        
        let transformSupplierMasterList = [];
        if (getSupplierMasterList) {
            console.log(getSupplierMasterList, "LISTSSSSSSSS")
            getSupplierMasterList.map((item) => {
                transformSupplierMasterList.push({
                    "supplierName": {
                        "name": item.supplierName,
                        "imageURL": item.logo
                    },
                    "supplierCountry": item.supplierCountry,
                    "supplierEndDate": item.supplierEndDate,
                    "supplierID": item.supplierID,
                    "supplierSiteName": item.supplierSiteName

                });

            });
        }

        console.log("--------------------------------",
            transformSupplierMasterList, "UPDATES!!!!!!1111")
        return transformSupplierMasterList;
    }

    getRequest = () => {

        let searchCriteria = {}
        let supplierID = document.getElementById('supplierID') == null ? "" : document.getElementById('supplierID').value;
        let supplierName = document.getElementById('supplierName') == null ? "" : document.getElementById('supplierName').value;

        if (supplierID != "")
            searchCriteria.supplierID = supplierID

        if (supplierName != "")
            searchCriteria.supplierName = supplierName

        this.setState({ searchCriteria: searchCriteria })

        let request = {

            "bypassSimu": true,
            "body": {
                "page": {
                    "currentPageNo": this.state.page.currentPageNo,
                    "pageSize": this.state.page.pageSize
                },
                searchCriteria
            }

        };
        return request;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.getSupplierMasterList)
        if (nextProps.getSupplierMasterList) {
            this.setState({

                gridData: this.transformResponse(nextProps.getSupplierMasterList),
                page: nextProps.getPage,
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getSupplierMasterList, this.getRequest());
        window.scrollTo(0, 0);
    }

    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getSupplierMasterList, this.getRequest());
    }

    render() {

        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }

        return (
            <div>
                <Portlet title={utils.getLabelByID("SUPPLIER MASTER")}>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Supplier Code")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="supplierID" id="supplierID" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="supplierName" id="supplierName" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">

                                    <button type="submit" className="btn green" onClick={this.formSubmit}>
                                        {utils.getLabelByID("Search")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Portlet title={"Supplier Master List"}>
                        {
                            this.state.gridData.map((obj) => {

                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/viewSupplier"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })

                        }
                        <Table
                            gridColumns={utils.getGridColumnByName("supplierMasterList")}
                            gridData={this.state.gridData}
                            fontclass=""
                            totalRecords={this.props.getPage.totalRecords}
                            pageSize={10}
                            pageChanged={this.pageChanged}
                            pagination={true}
                            activePage={this.state.page.currentPageNo}
                        />
                    </Portlet>
                </Portlet>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app.supplierMasterList, "data")
    return {
        getSupplierMasterList: state.app.supplierMasterList.searchResult,
        getPage: state.app.supplierMasterList.pageData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
supplierMasterList.displayName = "SUPPLIER MASTER";
export default connect(mapStateToProps, mapDispatchToProps)(supplierMasterList);


// getSearchItem = () => {

//     let searchCriteria = {};
//     let supplierCode = document.getElementById('supplierCode') == null ? "" : document.getElementById('supplierCode').value;
//     let supplierName = document.getElementById('supplierName') == null ? "" : document.getElementById('supplierName').value;

//     if (supplierCode !== "" || supplierName !== "") {
//         console.log(supplierCode, "!!!!!!!!! supplierCode")
//         searchCriteria.supplierCode = supplierCode;
//         searchCriteria.supplierName = supplierName
//     }


//     let request = {
//         "body": {
//             "supplierCode": "001",
//             searchCriteria: searchCriteria

//         }
//     };
//     console.log(request, "~~~~~~~~~~~~~~~~~~~~~~")
//     // this.props.actions.generalProcess(constants.getItemMasterList, this.getRequest());
//     return request;

// }
// formSubmit = () => {

//     this.props.actions.generalProcess(constants.getSupplierMasterList, this.getSearchItem());
// }