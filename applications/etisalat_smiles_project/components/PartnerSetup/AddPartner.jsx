import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';


import Input from '../../../../core/common/Input.jsx'
import Label from '../../../../core/common/Lable.jsx';
import Combobox from '../../../../core/common/Select.jsx';
import DateControl from '../../../../core/common/DateControl.jsx'
import Portlet from '../../../../core/common/Portlet.jsx'
import Steps from '../../../../core/common/Steps.jsx';
import * as toaster from '../../../../core/common/toaster.js';

import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';

import Textarea from '../../../../core/common/Textarea.jsx';

import * as gen from '../../../../core/common/generalActionHandler';
import * as requestCreator from '../../../../core/common/request.js';
import * as constants from '../../../../core/constants/Communication.js';


class AddPartner extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true
        };
        this.generalHandler = gen.generalHandler.bind(this)
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.typeData) {
            this.setState({
                typeData: {
                    category: nextProps.typeData.category || []
                },
                isLoading: false
            })
        }
    }



    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['category']));

    }


    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        } else {
            return (
                <div className="row">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <Label text="Name" columns='4' />
                                <Input
                                    fieldname='name'
                                    formname='body'
                                    columns='7'
                                    placeholder='Name'
                                    state={this.state}
                                    actionHandler={this.generalHandler}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <Label text="Code" columns='4' />
                                <Input
                                    fieldname='code'
                                    formname='body'
                                    columns='7'
                                    placeholder=''
                                    state={this.state}
                                    actionHandler={this.generalHandler}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <Label text="Category" columns='4' />
                                <Combobox
                                    fieldname='category'
                                    formname='body'
                                    columns='7'
                                    placeholder='Select'
                                    style={{}}
                                    state={this.state}
                                    typeName="category"
                                    dataSource={_.get(this.state, 'typeData', {})}
                                    actionHandler={this.generalHandler}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                        </div>
                    </div>

                    <Portlet title={""} noCollapse={true}>
                        <Portlet title={"TYPE"}>



                        </Portlet>
                        <Portlet title={"CONTACT"}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Name" columns='4' />
                                    <Input
                                        fieldname='code'
                                        formname='body'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Label text="Email" columns='4' />
                                    <Input
                                        fieldname='code'
                                        formname='body'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Phone" columns='4' />
                                    <Input
                                        fieldname='code'
                                        formname='body'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Label text="Mobile" columns='4' />
                                    <Input
                                        fieldname='code'
                                        formname='body'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Label text="Address" columns='4' />
                                    <Textarea
                                        style={{ height: '60px' }}
                                        fieldname='result'
                                        formname='body'
                                        columns='7'
                                        placeholder=''
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>

                            </div>
                        </Portlet>
                    </Portlet>
                    <Portlet title={"ACCURAL TERMS"}>

                    </Portlet>
                    <Portlet title={"POINT CREDIT RULES"}>

                    </Portlet>
                    <Portlet title={"SETTLEMENTS"}>

                    </Portlet>
                    <Portlet title={"TERMS & CONDITIONS"}>

                    </Portlet>
                    <Portlet title={"ERP SETTINGS"}>

                    </Portlet>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button type="submit" className="pull-right btn green">
                                    {utils.getLabelByID("Submit")}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: state.app.typeData.data,


    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
AddPartner.displayName = "Add Partner";
export default connect(mapStateToProps, mapDispatchToProps)(AddPartner);













