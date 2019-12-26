/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import * as requestCreator from '../../../../core/common/request.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Combobox from '../../common/Select.jsx';
import Label from '../../common/Lable.jsx';
import * as gen from '../../common/generalActionHandler';

import _ from 'lodash';

class CustomerAssociation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            customerAssociation: undefined,
            typeData: undefined
        };
        this.newProps = false;

        this.formSubmitted = false;
        this.generalHandler = gen.generalHandler.bind(this);
    }

    formSubmit = () => {
        let { userId, customerType, paymentType, shipmentType } = this.state.customerAssociation;
        if (!this.state.customerAssociation || !userId || !customerType || !paymentType || !shipmentType) {
            alert('All fields are required!');
            return;
        }

        this.props.actions.generalProcess(constants.saveCustomerAssociation, {
            data:
                this.state.customerAssociation
        });

        this.formSubmitted = true;
        this.newProps = false;
        this.setState({ customerAssociation: undefined })
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            typeData: nextProps.typeData
        });

        if (nextProps.userList.length && this.state.typeData && !_.has(this.state.typeData, 'userList')) {
            let typeData = this.state.typeData;
            typeData.userList = nextProps.userList.map(user => {
                return { label: user.userID, value: user._id };
            });
            this.setState({
                typeData, isLoading: false
            });
        }

        if (this.formSubmitted) {
            if (nextProps.saveCustomerAssociation && nextProps.saveCustomerAssociation.message.status == 'SUCCESS') {
                this.setState({ customerAssociation: {} })
            }
            this.formSubmitted = false;
        } else {
            if (this.newProps && nextProps.customerAssociation) {
                let customerAssociation = _.pick(nextProps.customerAssociation, ['userId', '_id', 'customerType', 'paymentType', 'shipmentType', 'purchaseOrderType']);
                this.setState({ customerAssociation });
            } else if (this.state.customerAssociation && this.state.customerAssociation._id) {
                let customerAssociation = _.omit(this.state.customerAssociation, ['_id', 'customerType', 'paymentType', 'shipmentType', 'purchaseOrderType']);
                this.setState({ customerAssociation });
            }
        }

    }
    componentWillMount() {

    }
    componentDidMount() {

        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['customerType', 'paymentType', 'shipmentType', 'purchaseOrderType']));
        this.props.actions.generalProcess(
            constants.getUserList,
            requestCreator.createUserListRequest(
                {
                    currentPageNo: 1,
                    pageSize: 100
                },
                {}
            )
        );
    }
    componentWillUnmount() {

    }

    userSelectHandler = (formname, fieldname, type, e) => {

        let value = e.target.value;
        let formdata = _.get(this.state, formname, {});
        _.set(formdata, e.target.name, value);
        this.setState({
            [formname]: formdata
        });

        if (value) {
            this.props.actions.generalProcess(constants.getCustomerAssociation, { data: { userId: value } });
        }
        this.newProps = true;
    };

    render() {
        if (this.state.isLoading) {
            return <div className="loader"> {utils.getLabelByID('loading')}</div>;
        } else if (!this.state.isLoading) return (
            <div>
                <Portlet title={utils.getLabelByID('Customer Association Detail(s)')}>
                    <Row>
                        <Col col="6">
                            <Label text={utils.getLabelByID('User')} columns="4" />
                            <Combobox fieldname="userId" formname="customerAssociation" columns="8" state={this.state} typeName="userList" dataSource={this.state.typeData} actionHandler={this.userSelectHandler} className="form-control" />
                        </Col>
                        <Col col="6">
                            <Label text={utils.getLabelByID('Customer Type')} columns="4" />

                            <Combobox fieldname="customerType" formname="customerAssociation" columns="8" state={this.state} typeName="customerType" dataSource={this.state.typeData} actionHandler={this.generalHandler} className="form-control" disabled={this.newProps ? false : true} />
                        </Col>
                    </Row>
                    <Row>
                        <Col col="6">
                            <Label text={utils.getLabelByID('Payment Type')} columns="4" />
                            <Combobox fieldname="paymentType" formname="customerAssociation" columns="8" state={this.state} typeName="paymentType" dataSource={this.state.typeData} actionHandler={this.generalHandler} className="form-control" disabled={this.newProps ? false : true}/>
                        </Col>
                        <Col col="6">
                            <Label text={utils.getLabelByID('Shipment Type')} columns="4" />
                            <Combobox fieldname="shipmentType" formname="customerAssociation" columns="8" state={this.state} typeName="shipmentType" dataSource={this.state.typeData} actionHandler={this.generalHandler} className="form-control" disabled={this.newProps ? false : true}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col col="6">
                            <Label text={utils.getLabelByID('Purchase Order Type')} columns="4" />
                            <Combobox fieldname="purchaseOrderType" formname="customerAssociation" columns="8" state={this.state} typeName="purchaseOrderType" dataSource={this.state.typeData} actionHandler={this.generalHandler} className="form-control" disabled={this.newProps ? false : true}/>
                        </Col>
                    </Row>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.formSubmit}>
                                        {utils.getLabelByID('Save')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portlet>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        userList: _.get(state.app, 'userList.data.searchResult', []),
        typeData: state.app.typeData.data,
        customerAssociation: state.app.getCustomerAssociationDetail && state.app.getCustomerAssociationDetail.data,
        saveCustomerAssociation: state.app.saveCustomerAssociation && state.app.saveCustomerAssociation.data
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
CustomerAssociation.displayName = 'Customer Association';
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerAssociation);
