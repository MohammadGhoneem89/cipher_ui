/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as toaster from '../../../../core/common/toaster.js';


class APITemplateEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            modalIsOpen: false,
            gridData: [],
        };
        this.updateState = this.updateState.bind(this);
    }

    componentWillMount() {
        this.getDataById()
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps && (nextProps.paymentDetail._id === nextProps.id)) {
        //     this.setState({
        //         isLoading: false
        //     });
        // }
        // else {
            this.setState({
                isLoading: false
            });
        // }
    }

    updateState(data) {
        this.setState(data);
    }

    getDataById = () => {
        if (this.props.id !== 'create') {
            this.setState({isLoading: true});
            this.props.actions.generalProcess(constants.getPaymentDetail, {
                "action": "getPaymentDetail",
                "data": {
                    "id": this.props.id
                }
            });
        }
    };

    insertJson = () => {
        let name = $("#name").val() == null ? "" : $("#name").val();
        let apiPayload = $("#apiPayload").val() == null ? "" : $("#apiPayload").val();

        if(apiPayload != ''){
            try{
                apiPayload = JSON.parse(apiPayload)
            }
            catch (err){
                toaster.showToast("JSON is not correct", "ERROR");
            }
        }

        let json = {
            data: {
                name: name,
                apiPayload: apiPayload
            }
        };

        if (this.props.id) {
            json.data._id = this.props.id;
            this.props.actions.generalProcess(constants.updatePayment, json);
        }
        else {
            this.props.actions.generalProcess(constants.insertPayment, json);
        }
    };

    render() {
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

        return (
            <div>
                <Portlet title={''}>

                    <div className="row">
                        <div className="form-group col-md-12">
                            <div className="col-md-4">
                                <label className="label-bold">{utils.getLabelByID("Name")}</label>
                                <input type="text" className="form-control ekycinp" name="name" id="name"
                                       defaultValue={_.get(this.state, 'name', '')}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-4">
                                <label className="label-bold">{utils.getLabelByID("API Payload")}</label>
                                <textarea placeholder="JSON Goes here ..." type="text" className="form-control ekycinp" name="apiPayload" id="apiPayload"
                                          defaultValue={_.get(this.state, 'apiPayload', '')} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.insertJson}>
                                        {utils.getLabelByID("Save")}
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
        id: _.get(ownProps.params, 'id', ''),
        paymentDetail: _.get(state.app, 'getPaymentDetail.data', {}),
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}

}

APITemplateEdit.displayName = "API Template Edit";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateEdit);
