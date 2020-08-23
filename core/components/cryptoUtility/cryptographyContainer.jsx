import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';

import CryptographyForm from './cryptographyForm.jsx';

class cryptographyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false,

        };

        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.decryptResponse) {
            if (nextProps.decryptResponse.message.status == 'OK') {
                this.setState({
                    loadingResponse: false,
                    cryptedValue: nextProps.decryptResponse.message.decryptedValue
                });
            } else {
                // show toast as well
                this.setState({
                    loadingResponse: false
                });
            }


        } else if (nextProps.encryptResponse) {
            this.setState({
                loadingResponse: false,
                cryptedValue: nextProps.encryptResponse.message.encryptedValue
            });
        } else {
            this.setState({
                isLoading: nextProps.isLoading ? nextProps.isLoading : false
            });
        }
    }

    submit(formData) {
        this.setState({
            loadingResponse: true
        });
        console.log(formData)
        if (formData.methodType == "Encrypt") {
            let data = {
                unecrypted_value: formData.stringValue
            }
            this.props.actions.generalProcess(constants.encryptString, requestCreator.encryptData({
                data
            }))
        } else {
            let data = {
                encrypted_value: formData.stringValue
            }
            this.props.actions.generalProcess(constants.decryptString, requestCreator.decryptData({
                data
            }))
        }

    }

    render() {

        return (
            <div>
                <Portlet title={"FORM"}>
                    <CryptographyForm
                        onSubmit={this.submit}
                        mTypes={this.state.methodTypes} />
                    <Portlet title={"RESULT"} isPermissioned={true}>
                        {this.state.loadingResponse ? <div className="loader" > Loading...</div> : <textarea style={{ "width": "100%" }} name="" id="" cols="" rows="5">{this.state.cryptedValue}</textarea>}
                    </Portlet>
                </Portlet>
            </div >
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        encryptResponse: _.get(state.app, "encryptResponse.data", null),
        decryptResponse: _.get(state.app, "decryptResponse.data", null),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

cryptographyContainer.displayName = "Crypto Utility";

export default connect(mapStateToProps, mapDispatchToProps)(cryptographyContainer)