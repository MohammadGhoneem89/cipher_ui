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


class APITemplateTest extends React.Component {

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
        if (this.props.id !== '') {
            this.setState({isLoading: true});
            this.props.actions.generalProcess(constants.getPaymentDetail, {});
        }
    };

    submitJSON = () => {
        let inputJson = $("#inputJSON").val() == null ? "" : $("#inputJSON").val();
        let outputJson = $("#outputJSON").val() == null ? "" : $("#outputJSON").val();

        if(inputjson != ''){

        }
        if(outputjson != ''){

        }

        let json = {
            data: {
                inputJSON: inputJson,
                outputJSON: outputJson
            }
        };

        this.props.actions.generalProcess(constants.insertPayment, json);

    };

    render() {
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

        return (
            <div>
                <Portlet title={''}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("Input JSON")}</label>
                                <textarea placeholder="JSON Goes here ..." type="text" className="form-control ekycinp" name="apiPayload" id="inputJSON"
                                          defaultValue={_.get(this.state, 'apiPayload', '')} />
                            </div>
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("Output JSON")}</label>
                                <textarea placeholder="JSON Goes here ..." type="text" className="form-control ekycinp" name="apiPayload" id="outputJSON"
                                          defaultValue={_.get(this.state, 'apiPayload', '')} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.submitJSON}>
                                        {utils.getLabelByID("Test")}
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

APITemplateTest.displayName = "API Template Test";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateTest);
