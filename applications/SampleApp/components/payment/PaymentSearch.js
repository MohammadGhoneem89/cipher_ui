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


class PaymentSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {},
            KYCGroupList: undefined,
            currentPageNo : "",
            totalRecords : "",
            isLoading: true,
            addAction : [
                {
                    "type": "pageAction",
                    "label": "ADD",
                    "labelName": "COM_AB_Add",
                    "actionType": "PORTLET_LINK",
                    "iconName": "fa fa-plus",
                    "URI":
                        "/paymentAdd"
                }
            ],
            gridData : []
        };
    }

    getRequest = () => {
        let name = $("#name").val() == null ? "" : $("#name").val();
        let code = $("#code").val() == null ? "" : $("#code").val();

        let searchCriteria = {};

        if(name != ""){
            searchCriteria.name = name;
        }
        if(code != ""){
            searchCriteria.code = code;
        }

        let request = {
            "action": "getPaymentList",
            "searchCriteria": searchCriteria,
            "page": {
                "pageSize": 10,
                "currentPageNo": this.state.currentPageNo || 1,
                "totalRecords": this.state.totalRecords || 0
            }
        };
        this.props.actions.generalProcess(constants.getPaymentList, request);
    }

    componentWillMount() {
        this.getRequest();
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
        window.scrollTo(0, 0);
    }

    pageChanged = (pageNo) => {
        if (pageNo) {
            let pageData = this.state.pageData;
            pageData.currentPageNo = pageNo;
            this.setState({ pageData });
            this.getRequest({ pageNo });
        }
    }


    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }

            return (
                <div>
                    <Portlet title={utils.getLabelByID("Payment Type Search")}>

                        <div className="row">

                            <div className="form-group col-md-6">
                                <div className="col-md-8">
                                    <label className="label-bold">{utils.getLabelByID("Name")}</label>
                                    <input type="text" className="form-control ekycinp" name="name" id="name" />
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <div className="col-md-8">
                                    <label className="label-bold">{utils.getLabelByID("Code")}</label>
                                    <input type="text" className="form-control ekycinp" name="code" id="code" />
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
                                        <button type="button" className="btn default" >
                                            {utils.getLabelByID("Clear")}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                         <Portlet title={""} isPermissioned={true} actions={this.state.addAction}>
                             {
                                 this.state.gridData.map((obj)=>{
                                     obj.action = [
                                         {
                                             "label": "Edit",
                                             "URI": [
                                                 "/paymentAdd/"
                                             ],
                                             "params": "_id",
                                             "iconName": "icon-docs"
                                         }
                                     ]
                                 })
                             }
                             <Table
                                 gridColumns={utils.getGridColumnByName("paymentSearch")}
                                 gridData={this.state.gridData}
                                 fontclass=""
                                 totalRecords={this.state.totalRecords}
                                 pageSize={10}
                                 pageChanged={this.pageChanged}
                                 pagination={true}
                                 activePage={this.state.currentPageNo}
                             />
                         </Portlet>
                    </Portlet>
                </div>
            );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        gridData : state.app.paymentList.data.searchResult,
        pageData : state.app.paymentList.pageData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
PaymentSearch.displayName = "Payment Search";
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSearch);
