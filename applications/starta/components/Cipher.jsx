import React, { Component } from 'react'
import Portlet from '../../../core/common/Portlet.jsx'
import * as utils from "../../../core/common/utils";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/actions/generalAction';
import * as constants from '../../../core/constants/Communication.js';

class Cipher extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            result: "",
            data: "",
            action: "",
            actions: [
                {
                    label: "encrypt",
                    value: "encrypt"
                },
                {
                    label: "decrypt",
                    value: "decrypt"
                }
            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'WILL rcv Props')
        console.log(this.state.action, 'what')
        if (this.state.action === 'encrypt' && nextProps.encrypt) {
            console.log('success1')
            this.setState({
                result: nextProps.encrypt
            })
        } else if (this.state.action === 'decrypt' && nextProps.decrypt) {
            console.log('success2')
            this.setState({
                result: nextProps.decrypt
            })
        }
    }

    onChange = (e) => {
        console.log('onchange')
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
        console.log('Form Submit')

        e.preventDefault();

        let endPoint = ''
        if (this.state.action === 'encrypt') {
            endPoint = constants.encrypt
        } else {
            endPoint = constants.decrypt
        }

        this.props.actions.generalProcess(endPoint, {
            data: this.state.data
        });
    }
    render() {
        let portletActions = [
            {
                type: "icon",
                className: "btn btn-default",
                label: "Close",
                icon: "close",
                actionHandler: this.state.closePortlet
            }
        ];

        return (
            <Portlet noCollapse={true} actions={portletActions} title="Encrypt/ Decrypt">
                <div className="row">

                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Action")}</label>
                            <div className="form-group col-md-8" >
                                <select id="action" name="action" className="form-control" value={this.state.action} onChange={this.onChange} >
                                    <option key="-1">Select</option>
                                    <option key={'0'} value={'encrypt'}>{'encrypt'}</option>
                                    <option key={'1'} value={'decrypt'}>{'decrypt'}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Data")}</label>
                            <div className="form-group col-md-8">

                                <input
                                    name="data"
                                    type="text"
                                    className="form-control"
                                    id="data"
                                    value={this.state.data}
                                    onChange={this.onChange}
                                />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-actions right">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <br />
                                    <button type="submit" onClick={this.onSubmit} className="btn green">
                                        {"Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-group control-label col-md-4" style={{ textAlign: "left" }}>{utils.getLabelByID("Result")}</label>
                            <div className="form-group col-md-8">

                                <input
                                    name="result"
                                    type="text"
                                    className="form-control"
                                    id="result"
                                    value={this.state.result}
                                    disabled={false}
                                />

                            </div>
                        </div>
                    </div>

                </div>

            </Portlet>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        decrypt: _.get(state.app, 'decrypt', ''),
        encrypt: _.get(state.app, 'encrypt', '')
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
Cipher.displayName = "Cipher";
export default connect(mapStateToProps, mapDispatchToProps)(Cipher);