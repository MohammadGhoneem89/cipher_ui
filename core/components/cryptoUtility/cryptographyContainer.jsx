import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import ReactJson from 'react-json-view';
import * as toaster from '../../common/toaster.js';
import { TextArea } from '../../common/FormControls.jsx';

import CryptographyForm from './cryptographyForm.jsx';

class cryptographyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false,
            methodTypes: [
                { value: "Encrypt", label: "Encrypt" },
                { value: "Decrypt", label: "Decrypt" }
            ]
        };

        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {



        console.log(nextProps)
        if (nextProps.responseMessage) {
            if (nextProps.responseMessage.data.message.status == 'OK') {
                this.setState({
                    loadingResponse: false,
                    cryptedValue: nextProps.responseMessage.data.encryptedValue
                });
            } else {
                // show toast as well
                this.setState({
                    loadingResponse: false
                });
            }


        } else {
            this.setState({
                isLoading: nextProps.isLoading ? nextProps.isLoading : false,
                methodTypes: nextProps.methodTypes
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

            this.props.actions.generalAjxProcess(constants.encryptString, requestCreator.encryptData({
                data
            })).then(res => {
                console.log(res)
                this.setState({
                    loadingResponse: false,
                    cryptedValue: res.encryptResponse.data.encryptedValue
                });
            });
        } else {
            let data = {
                encrypted_value: formData.stringValue
            }

            this.props.actions.generalAjxProcess(constants.decryptString, requestCreator.decryptData({
                data
            })).then(res => {
                console.log(res)
                this.setState({
                    loadingResponse: false,
                    cryptedValue: nextProps.decryptResponse.data.encryptedValue
                });
            });
        }

    }

    render() {

        if (!this.state.isLoading)
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
        else
            return (<div className="loader" > Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        isLoading: false,
        methodTypes: [
            "Encrypt",
            "Decrypt"
        ]
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

cryptographyContainer.displayName = "Crypto Utility";

export default connect(mapStateToProps, mapDispatchToProps)(cryptographyContainer)