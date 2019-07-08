/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../common/utils.js';
import Table from '../../common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../constants/appCommunication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import _ from 'lodash';

class OrderList extends React.Component {

    constructor(props) {
        // console.log("constructor")
        super(props);
        this.state = {
            searchCriteria: {},
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: false,
            gridData: [],
            // actions: [
            //     {
            //         "type": "pageAction",
            //         "label": "ADD",
            //         "labelName": "COM_AB_Add",
            //         "actionType": "PORTLET_LINK",
            //         "iconName": "fa fa-plus",
            //         "URI": "/etisalat/attributes",
            //         "children": []
            //     }
            // ],
            ecommerce: '',
            courierCompany: '',
            orderNumber: '',
            hawbNumber: '',
            mawbNumber: '',
            decNumber: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.data = [];
        // this.pageChanged = this.pageChanged.bind(this);
    }
    handleChange(event) {
        this.setState({
            ecommerce: event.target.value,
            courierCompany: event.target.value,
            orderNumber: event.target.value,
            hawbNumber: event.target.value,
            mawbNumber: event.target.value,
            decNumber: event.target.value
        });
    }
    handleSubmit(event) {
        this.props.actions.generalProcess(constants.getOrderList, this.getRequest());
        // console.log(this.state.searchCriteria, " -----searchCriteria")
         event.preventDefault();
    }
    getRequest = () => {

        let searchCriteria = {}
        if (this.state.orderNumber != "")
            searchCriteria.orderNumber = this.state.orderNumber

        // this.setState({ searchCriteria: searchCriteria })
        console.log("searchcriteria", searchCriteria)
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
        console.log(nextProps.getOrderList, "---- get grid data")

        if (nextProps.getOrderList) {
            this.setState(
                {
                    gridData: nextProps.getOrderList.searchResult,
                    isLoading: false,
                    page: nextProps.getPage
                }
            )
        }
    }

    componentDidMount() {

        // this.props.actions.generalProcess(constants.getOrderList, this.getRequest());
        this.setState({
            actions: [
                {
                    "type": "pageAction",
                    "label": "ADD",
                    "labelName": "COM_AB_Add",
                    "actionType": "PORTLET_LINK",
                    "iconName": "fa fa-plus",
                    "URI": "/etisalat/attributes",
                    "children": []
                }
            ]
        })
        window.scrollTo(0, 0);
    }

    pageChanged = (pageNo) => {
        let page = this.props.getPage;
        page.currentPageNo = pageNo;
        this.setState({ page: page });
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("Order")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Ecommerce")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="ecommerce"
                                                    value={this.state.value} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Courier Company Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="courierCompany"
                                                    value={this.state.value} onChange={this.handleChange} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Order #")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="orderNumber"
                                                    value={this.state.value} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("HAWB #")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="hawbNumber"
                                                    value={this.state.value} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("MAWB #")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="mawbNumber"
                                                    value={this.state.value} onChange={this.handleChange} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Declaration No")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input type="text" className="form-control" name="declaration"
                                                    value={this.state.value} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-actions right">
                                        <div className="form-group col-md-12">
                                            <div className="btn-toolbar pull-right"> <button type="text" className="btn green">{utils.getLabelByID("Search")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Portlet title={"Order List"} /*actions={this.state.actions}*/ isPermissioned={true}>
                        <Table
                            gridColumns={utils.getGridColumnByName("orderList")}
                            gridData={this.props.getOrderList.searchResult}
                            fontclass=""
                            totalRecords={this.props.getPage.totalRecords}
                            pageSize={10}
                            pagination={true}
                            activePage={this.props.getPage.currentPageNo}
                        />
                    </Portlet>
                </div>
            </form>
        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state.app.orderList, "STATE.APP")
    return {
        getOrderList: state.app.orderList,
        getPage: state.app.orderList.pageData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
OrderList.displayName = "Order List";
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

