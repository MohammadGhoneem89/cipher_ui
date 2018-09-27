/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils';
import * as constants from '../../constants/Communication.js';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }

    componentDidMount() {

    }

    formSubmit() {
       
       let currentPassword = (document.getElementById('currentPassword') == null || document.getElementById('currentPassword') == undefined) ? "" : document.getElementById('currentPassword').value;
       let newPassword = (document.getElementById('newPassword') == null || document.getElementById('newPassword') == undefined) ? "" : document.getElementById('newPassword').value;
       let confirmPassword = (document.getElementById('confirmPassword') == null || document.getElementById('confirmPassword') == undefined) ? "" : document.getElementById('confirmPassword').value;
       

        if(newPassword == confirmPassword)
        {

            let request  = {
                
                    "data": {
                        "oldPassword": currentPassword ,
                        "newPassword": newPassword
                    }
               }
               
            this.props.actions.generalProcess(constants.passwordChange, request);   
        }
        else
            alert('New password does not match confirm password')

            document.getElementById('currentPassword').value = ''
            document.getElementById('newPassword').value = ''
            document.getElementById('confirmPassword').value = ''



            
    }
    render() {
        return (

            <div>
                <div className="form-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("ChangePassword_CurrentPassword")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="password" className="form-control" name="currentPassword" id="currentPassword" placeholder="Password" />
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("ChangePassword_NewPassword")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="password" className="form-control" name="newPassword" id="newPassword" placeholder="New Password" />
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("ChangePassword_ConfirmNewPassword")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group col-md-4">
                            </div>
                            <div className="form-group col-md-8">
                                <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("ChangePassword_ChangePassword")} </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div >
        );
    }
}

ChangePassword.propTypes = {
    changeResponseData: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        changeResponseData: state.app.changeResponseData.data
    };

}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ChangePassword.displayName = "ChangePassword_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
