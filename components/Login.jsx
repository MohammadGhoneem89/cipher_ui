import React, { PropTypes } from 'react';
import brandConfig from '../assets/skins/default/brandConfig.json';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';


import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import * as toaster from '../common/toaster.js';


class Login extends React.Component {


    constructor() {

        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        sessionStorage.lang = "EN";



    }

    check(form) {
        sessionStorage.setItem('lastRequestTime',  new Date());
        var Userid = $('#username').val();
        var password = $('#password').val();
        console.log(sessionStorage.lang)

        var lang = sessionStorage.lang;

        if (Userid === "" && password === "") {
            toaster.showToast("Username, Password fields must not be empty please enter username or password.", "INFO");
            //alert("Username, Password are required.");
        } else {
            this.props.actions.generalProcess(constants.getLogin, requestCreator.createUserRequest(Userid, password, lang));

        }
    }


    changLangButton(langaugeTag) {


        switch (langaugeTag) {
            case "AR":
                var eng = $('#engAnchor').removeClass('actv');
                var arb = $('#arbAnchor').addClass('actv');
                sessionStorage.lang = "AR";
                break;
            case "EN":
                var eng = $('#arbAnchor').removeClass('actv');
                var arb = $('#engAnchor').addClass('actv');
                sessionStorage.lang = "EN";
                break;

        }



    }

    componentDidMount(){
        document.getElementById("username").addEventListener("keyup", this.handleKeyPress);
        document.getElementById("password").addEventListener("keyup", this.handleKeyPress);
    }

    componentDidUpdate() {
        if (this.props.LoginResult) {



            //alert(sessionStorage.loginTime)

            var firstPage = this.props.LoginResult.firstScreen;
            
            sessionStorage.setItem('firstScreen', firstPage)
            if (firstPage != undefined) {
                firstPage = firstPage.replace("/", "");
            }

            if (this.props.LoginResult.success === true) {
                if (firstPage != undefined && this.props.LoginResult.firstScreen != "")
                    browserHistory.push(this.props.LoginResult.firstScreen);
                else
                    browserHistory.push("/home")
                sessionStorage.setItem('token', this.props.LoginResult.token);
                console.log("TEST" + this.props.LoginResult.token)

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

        let imgSDG = "../assets/pages/img/organization/DP.png";
        let imgURLOtherOrg = "../assets/pages/img/organization/" + this.props.orgType + ".png"

        if (this.props.orgType && this.props.orgType.toString().toUpperCase() == 'DP') {
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
        return (<div className="logo"/>);
    }

    render() {
        sessionStorage.loginOrgType = this.props.orgType;

        return (

            <div>
                <div className="login">
                {/*<div id="particles-js"></div>*/}
                    <div className="content" style={{ marginTop: "0px" }}>

                        {this.getLogosbyUserType()}

                        <div className="login-form" >
                            {this.getLogosForSDGUser()}
                            <h3 className="form-title">{brandConfig.projectName}</h3>
                            <div className="alert alert-danger display-hide">
                                <button className="close" data-close="alert"/>
                                <span> Enter any username and password. </span>
                            </div>
                            <div className="form-group">
                                <label className="control-label visible-ie8 visible-ie9">Username</label>
                                <div className="input-icon">
                                    <i className="fa fa-user"></i>
                                    <input className="form-control placeholder-no-fix" type="text" id="username" autoComplete="off" placeholder="Username" name="username" /> </div>
                            </div>
                            <div className="form-group">
            <label className="control-label visible-ie8 visible-ie9">Password</label>
            <div className="input-icon"><i className="fa fa-lock"></i>
            
            <i className="fa fa-eye" aria-hidden="true"></i>
              <input type="password" className="form-control placeholder-no-fix" id="password" autoComplete="off" placeholder="Password" name="password"/>
            </div>
          </div>
         
                           
                            <div className="form-actions"><a href="javascript:;"  onClick={this.check.bind(this)} className="btn green btn-block uppercase"> Login </a></div>
                         
                            <div className="forget-password">
                                <ul className="lng"><li id="engAnchor" className="actv"><a href="javascript:;" onClick={this.changLangButton.bind(this, "EN")} >En</a></li><li id="arbAnchor" ><a href="javascript:;" onClick={this.changLangButton.bind(this, "AR")}>عربى</a></li></ul>
                                <h4><a href="#">Forgot your password ?</a></h4>
                            </div>
                        </div>

                        <div className="forget-form" >
                            <h3>Forget Password ?</h3>
                            <p> Enter your e-mail address below to reset your password. </p>
                            <div className="form-group">
                                <div className="input-icon">
                                    <i className="fa fa-envelope"></i>
                                    <input className="form-control placeholder-no-fix" type="text" autoComplete="off" placeholder="Email" name="email" /> </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" id="back-btn" className="btn grey-salsa btn-outline"> Back </button>
                                <button type="submit" className="btn green pull-right"> Submit </button>
                            </div>
                        </div>


                    </div>

                    <div className="copyright">{brandConfig.footer}</div>
                </div>
            </div>


        );
    }

}

Login.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//export default Login;