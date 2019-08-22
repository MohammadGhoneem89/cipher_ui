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

class masterAgreementList extends React.Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: true,
            gridData: [],
            actions: []
        };
        this.data = [];
        this.pageChanged = this.pageChanged.bind(this);
    }

    formSubmit = () => {
        this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }
    redirectToAddPage = () => {
        this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }

    getRequest = () => {

        let contractId = document.getElementById('contractId') == null ? "" : document.getElementById('contractId').value;
        let supplierName = document.getElementById('supplierName') == null ? "" : document.getElementById('supplierName').value;
        let searchCriteria = {}

        if (contractId != "")
            searchCriteria.contractId = contractId

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
        return request
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.getMasterAgreementList)
        if (nextProps.getMasterAgreementList) {


            this.setState(
                {
                    
                    gridData: nextProps.getMasterAgreementList,
                    isLoading: false,
                    page: nextProps.getPage
                }
            )
        //    console.log(this.updateSLA(nextProps.getMasterAgreementList),"DATAAAAAAAAAAAAAA")
            
        }
    }
    

        
        

  componentDidMount() {
        this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/addMasterAgreement", "children": [] }] })
        window.scrollTo(0, 0);
    }

    pageChanged = (pageNo) => {
        let page = this.state.page;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
        this.props.actions.generalProcess(constants.getMasterAgreementList, this.getRequest());
    }

    render() {
        
        console.log(this.state.gridData)
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div>

                <Portlet title={utils.getLabelByID("Master Agreement")}>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Contract ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="contractId" id="contractId" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Supplier Name")}</label>
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

                    <Portlet title={"Master Agreement"} actions={this.state.actions} isPermissioned={true}>
                        {
                            this.state.gridData.map((obj) => {
                                
                                obj.action = [
                                    {
                                        "label": "View",
                                        "URI": ["/viewMasterAgreement"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })

                        }
                        <Table
                            gridColumns={utils.getGridColumnByName("masterAgreement")}
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
    return {
        getMasterAgreementList: state.app.getMasterAgreementList.searchResult,
        getPage: state.app.getMasterAgreementList.pageData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
masterAgreementList.displayName = "MASTER AGREEMENT";
export default connect(mapStateToProps, mapDispatchToProps)(masterAgreementList);


































// getSearchItem = () => {

//     let contractID = document.getElementById('contractID') == null ? "" : document.getElementById('contractID').value;
//     let supplierName = document.getElementById('supplierName') == null ? "" : document.getElementById('supplierName').value;
//     let searchCriteria = {};
//     if (contractID !== "") {
//         searchCriteria.contractID = contractID;
//         searchCriteria.supplierName = supplierName;
//     }

//     let request = {
//         "body": {
//             "contractID": "001",
//             searchCriteria: searchCriteria
//         }
//     };

//     console.log(request, "~~~~~~~~~~~~~~~~~~~~~~")
//     // this.props.actions.generalProcess(constants.getItemMasterList, this.getRequest());
//     return request;

// }
// formSubmit = () => {

//     this.props.actions.generalProcess(constants.getMasterAgreementList, this.getSearchItem());
// }



//dateIssue


            // let grid = nextProps.getMasterAgreementList;
            // for (let i = 0; i < grid.length; i++) {
            //     grid[i].startDate = new Date(grid[i].startDate).toLocaleDateString('en-GB', {
            //         day: 'numeric',
            //         month: 'numeric',
            //         year: 'numeric'
            //     });
            //     grid[i].endDate = new Date(grid[i].endDate).toLocaleDateString('en-GB', {
            //         day: 'numeric',
            //         month: 'numeric',
            //         year: 'numeric'
            //     });
            // }

            // console.log("grid ", grid);