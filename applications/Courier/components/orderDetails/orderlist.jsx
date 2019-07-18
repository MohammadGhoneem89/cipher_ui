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
import * as gen from '../../common/generalActionHandler'
import Input from '../../common/Input.jsx';
import Lable from '../../common/Lable.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Combobox from '../../common/Select.jsx';
import * as coreConstants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: undefined,
            page: {
                pageSize: 10,
                currentPageNo: 1
            },
            isLoading: false,
            gridData: [],
            actions: [],
            typedata: undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
        this.generalActionHandler = gen.generalHandler.bind(this);
        this.clearFields = this.clearFields.bind(this);
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
        this.props.actions.generalProcess(constants.orderlist, this.getRequest());
        // console.log(this.state.searchCriteria, " -----searchCriteria")
        event.preventDefault();
    }
    getRequest = () => {

        let searchCriteria = {}
        if (this.state.orderNumber != "")
            searchCriteria.orderNumber = this.state.orderNumber

        this.setState({ searchCriteria: searchCriteria })
        console.log("searchcriteria", searchCriteria)
        let request = {
            "body": {
                searchCriteria
            },
            "page": {
                "pageSize": 10,
                "currentPageNo": 1
            }
        };
        return request;
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.orderlist, "---- get grid data")

        if (nextProps.orderlist && nextProps.typeData) {
            this.setState(
                {
                    gridData: nextProps.orderlist.data.searchResult.orderList,
                    typeData: nextProps.typeData,
                    isLoading: false,
                    page: nextProps.orderlist.pageData
                }
            )
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'dc-ecommerce',
                'dc-courier'
            ]));

        this.props.actions.generalProcess(constants.orderlist, this.getRequest());

        window.scrollTo(0, 0);
    }

    pageChanged(pageNo) {
        console.log("pageNo", pageNo)
        if (pageNo != undefined) {
            var request = "";
            if (this.state.searchCriteria == undefined) {
                request = {
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }
            else {
                var searchCriteria = _.clone(this.state.searchCriteria)
                request = {
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }
            this.setState({ currentPageNo: pageNo });
            this.props.actions.generalProcess(constants.orderlist, request);
        }
    }

    search = () => {
        let searchCriteria = _.clone(this.state.searchCriteria)
        this.props.actions.generalProcess(constants.orderlist, {
            searchCriteria,
            "page": {
                "pageSize": 10,
                "currentPageNo": 1
            }
        });
    }

    clearFields = () => {
        this.setState({searchCriteria : undefined})
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        console.log("state-->", this.state)
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
                                <Row>
                                    <Row>
                                        <Col col="6">
                                            <Lable text={utils.getLabelByID("Ecommerce")} columns="3"></Lable>
                                            <Combobox fieldname='ecommerce' formname='searchCriteria' columns='8' style={{}}
                                                state={this.state} typeName="dc-ecommerce" dataSource={this.state.typeData}
                                                multiple={false} actionHandler={this.generalActionHandler} selected={_.get(this.state.searchCriteria, "ecommerce", "")} />
                                        </Col>
                                        <Col col="6">
                                            <Lable text={utils.getLabelByID("Courier Company Name")} columns="3"></Lable>
                                            <Combobox fieldname='courier' formname='searchCriteria' columns='8' style={{}}
                                                state={this.state} typeName="dc-courier" dataSource={this.state.typeData}
                                                multiple={false} actionHandler={this.generalActionHandler} selected={_.get(this.state.searchCriteria, "courier", "")} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col col="6">
                                            <Lable text={utils.getLabelByID("Order #")} columns="3"></Lable>
                                            <Input fieldname='orderNumber' formname='searchCriteria' columns='8' style={{}}
                                                state={this.state} actionHandler={this.generalActionHandler} />
                                        </Col>
                                        <Col col="6">
                                            <Lable text={utils.getLabelByID("Declaration No")} columns="3"></Lable>
                                            <Input fieldname='declaration' formname='searchCriteria' columns='8' style={{}}
                                                state={this.state} actionHandler={this.generalActionHandler} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col col="6">
                                            <Lable text={utils.getLabelByID("HAWB #")} columns="3"></Lable>
                                            <Input fieldname='hawbNumber' formname='searchCriteria' columns='8' style={{}}
                                                state={this.state} actionHandler={this.generalActionHandler} />
                                        </Col>
                                        <Col col="6">
                                            <Lable text={utils.getLabelByID("MAWB #")} columns="3"></Lable>
                                            <Input fieldname='mawbNumber' formname='searchCriteria' columns='8' style={{}}
                                                state={this.state} actionHandler={this.generalActionHandler} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col col="6"></Col>
                                        <Col col="6">
                                            <div className="form-group col-md-11">
                                                <div className="btn-toolbar pull-right">
                                                    <button type="button" className="btn grey" onClick={this.clearFields}>{'Clear'}</button>
                                                    <button type="button" className="btn default" onClick={this.search}>{'Search'}</button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <Portlet title={"Order List"} actions={this.state.actions} isPermissioned={true}>
                        {
                            this.state.gridData.map((obj) => {

                                obj.actions = [

                                    {
                                        "label": "View",
                                        "URI": ["/courier/orderDetails"],
                                        "params": "_id",
                                        "iconName": "icon-docs"
                                    }
                                ]
                            })

                        }
                        
                        <Table
                            gridColumns={utils.getGridColumnByName("orderList")}
                            gridData={this.state.gridData}
                            fontclass=""
                            totalRecords={this.state.page.totalRecords}
                            pageSize={10}
                            pagination={true}
                            activePage={this.state.page.currentPageNo}
                            pageChanged={this.pageChanged}
                        />
                    </Portlet>
                </div>
            </form>
        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log(state.app.orderlist, "STATE.APP")
    return {
        typeData: _.get(state.app.typeData, 'data', undefined),
        orderlist: state.app.orderlist,
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
OrderList.displayName = "Order List";
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

