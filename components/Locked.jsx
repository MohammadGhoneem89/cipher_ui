import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';


import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import * as toaster from '../common/toaster.js';

import auth from '../auth/authenticator';
import {baseUrl} from '../constants/Communication.js';


class Locked extends React.Component {


    constructor() {

        super();
        sessionStorage.lang = "EN";
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (event) => {
        if(event.key == 'Enter'){
            this.check(event);
        }
    }

    check(form) {
        sessionStorage.setItem('lastRequestTime',  new Date());
        
        var Userid = sessionStorage.userID;
        var password = $('#password').val();
        
        if (Userid === "" || password === "") {
            toaster.showToast("Password fields must not be empty please enter password.", "ERROR");
            //alert("Username, Password are required.");
        } else {
            this.props.actions.generalProcess(constants.getLogin, requestCreator.createUserRequest(Userid, password, sessionStorage.lang));

        }
    }
    
    componentDidUpdate() {
        
        if (this.props.LoginResult) {

        //alert(sessionStorage.loginTime)

            var firstPage = this.props.LoginResult.firstScreen;
            if (firstPage) {
                firstPage = "/home";
            }
            firstPage = firstPage.replace("/", "");
            if (this.props.LoginResult.success === true) {
                sessionStorage.token=this.props.LoginResult.token;
                browserHistory.push(sessionStorage.firstScreen);
               // document.location.href ='/login/dof'
            } else {
                //alert("wrong Username or Password");
            }

        }

    }

    handleKeyPress(e) {
        if (e.which === 13) {
            this.check();
        }
    }
    getLogosbyUserType() {

        let imgSDG = "../assets/pages/img/organization/SDG.png";
        let imgURLOtherOrg = "../assets/pages/img/organization/" + this.props.orgType + ".png"

        if (this.props.orgType.toString().toUpperCase() == 'SDG') {
            return (<div></div>)
        }
        else if (this.imageExists(imgURLOtherOrg)) {
            return (<div> <div style={{ marginTop: "60px", paddingTop: "80px" }}>
                <div className="row" style={{ marginLeft: "-20" }}>
                    <div className="col-md-6 pull-left">
                        <img src={imgSDG} alt="" />
                    </div>
                    <div className="col-md-6 pull-right">
                        <img src={imgURLOtherOrg} alt="" style={{ width: "152px" }} />
                    </div>
                </div>

            </div>
                <br />
                <br />
            </div>
            )
        }
        else {
            return (<div></div>)
        }

    }
    imageExists(image_url) {

        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;

    }
    getLogosForSDGUser() {
        let imgURLOtherOrg = "../assets/pages/img/organization/" + this.props.orgType + ".png"
        if (this.props.orgType.toString().toUpperCase() == 'SDG' || !this.imageExists(imgURLOtherOrg))
            return (<div className="logo"><img src="../assets/pages/img/organization/logo-big.png" alt="" /></div>)
    }
    redirectToLoginPage()
    {
        sessionStorage.removeItem('lastRequestTime');
        document.location.href ='/login/' + sessionStorage.orgType
    }
    componentWillMount() {
        sessionStorage.removeItem('lastRequestTime');
    }


    render() {
        sessionStorage.loginOrgType = this.props.orgType
        return (

            <div className="page-header-fixed page-sidebar-closed-hide-logo page-container-bg-solid locked">
                <div className=" login">
                    <div id="particles-js"></div>
                    <div className="content" style={{ marginTop: "0px" }}>
                        <div></div>
                        <div className="login-form">
                            <div className="logo">
                                <img src="https://admin.qa.dubaipay.gov.ae/assets/layouts/layout2/img/logo-default.png" alt="" />
                            </div>
                            <h3 className="form-title">Demystifying Blockchain</h3>



                            <h4>
                                {"Your session timeout, please enter password to login!"}
                            </h4>

                            <div className="lock-body">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                                <div className="pull-left lock-avatar-block">
                                    <img src={baseUrl + sessionStorage.profilePic} className="lock-avatar" /> {sessionStorage.firstName }
                                    <br />
                                    <a href="javascript:;"  onClick={this.redirectToLoginPage.bind(this)} >{"Not " + sessionStorage.firstName +"?"}</a>

                                </div>
                                <div className="lock-form pull-left">

                                    <div className="form-group">
                                        <label className="control-label visible-ie8 visible-ie9">{"Password"}</label>
                                        <div className="input-icon">

                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                            <input type="password" onKeyPress={this.handleChange} className="form-control placeholder-no-fix input-medium" id="password" autocomplete="off" placeholder="Password"
                                                name="password" />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <a href="javascript:;" onClick={this.check.bind(this)} className="btn green btn-block uppercase input-medium"> Login </a>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">{"Copyright © 2000-2017 Smart Dubai Government Establishment. All Rights Reserved."}</div>
                </div>
            </div>  
            

        );
    }

}

Locked.propTypes = {
    LoginResult: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        LoginResult: state.app.loginResponse.data,
        orgType: ownProps.params.orgType
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(Locked);

//export default Login;