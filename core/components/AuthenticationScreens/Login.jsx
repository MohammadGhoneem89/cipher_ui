import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { sha512 } from 'js-sha512';

import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import EN from '../../constants/resources_EN';
import AR from '../../constants/resources_AR';
import * as utils from '../../common/utils.js';
import Cookies from 'js-cookie';

import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import * as toaster from '../../common/toaster.js';


class Login extends React.Component {


  constructor() {

    super();

    this.state = {
      isLoading: false,
      emailError: false,
      isLocked: false
      // loginAgain: false
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    sessionStorage.lang = "EN";
    // this.state = { accountIsLocked: false }
  }

  check() {
    sessionStorage.setItem('lastRequestTime', new Date());
    let userId = $('#username').val();
    let password = $('#password').val();
    let lang = sessionStorage.lang;
    if (userId === "" && password === "") {
      toaster.showToast("Username, Password fields must not be empty please enter username or password.", "INFO");
    } else {
      if (!this.state.isLocked) {
        //alert("Username, Password are required.");
        // this.setState({ isLocked: true });
        this.state.isLocked = true
        console.log("LOGIN REQ")
        this.props.actions.generalProcess(constants.getLogin, requestCreator.createUserRequest(userId, sha512(password),
          lang));
      }
    }

  }

  // changLangButton(langaugeTag) {
  //   console.log(langaugeTag);
  //   console.log(sessionStorage);
  //   switch (langaugeTag) {
  //     case "AR":
  //       var eng = $('#engAnchor').removeClass('actv');
  //       var arb = $('#arbAnchor').addClass('actv');
  //       sessionStorage.lang = "AR";
  //       break;
  //     case "EN":
  //       var eng = $('#arbAnchor').removeClass('actv');
  //       var arb = $('#engAnchor').addClass('actv');
  //       sessionStorage.lang = "EN";
  //       break;

  //   }


  // }
  checkForgot(from) {
    let userId = $('#usernameForgot').val();
    let email = $('#emailForgot').val();

    if (!this.validateEmail(email)) {
      this.setState({
        emailError: true,
      })
      return;
    } else {
      this.setState({
        emailError: false,
      })
    }

    let obj = {
      userID: userId,
      email
    }
    let lang = sessionStorage.lang;

    if (userId === "" && email === "") {
      toaster.showToast("Username and email fields must not be empty.", "INFO");
    } else {
      this.props.actions.generalProcess(constants.passwordReset, obj);
      this.setState({
        isLoading: true,
      })

    }
  }

  //Unlock user account
  // unlockUser = () => {
  //   console.log("Unlock user account :: ");
  //   isLocked = false;
  //   let userId = $('#unlockUserid').val();
  //   let resetPwdRetry = true;
  //   var password = $('#password').val();
  //   var lang = sessionStorage.lang;
  //   if (userId === "") {
  //     toaster.showToast("Username field must not be empty.", "INFO");
  //   } else {
  //     this.props.actions.generalProcess(constants.getLogin, requestCreator.createUserRequest(userId,
  //       password, lang, resetPwdRetry));
  //     this.setState({
  //       loginAgain: true,
  //       accountIsLocked: false
  //     });
  //   }
  // }

  componentDidMount() {
    document.getElementById("username").addEventListener("keyup", this.handleKeyPress);
    document.getElementById("password").addEventListener("keyup", this.handleKeyPress);

    Cookies.remove("login");
    Cookies.remove("token");
    sessionStorage.removeItem('token');
    this.props.actions.updateStore({ LoginResult: {} })
  }

  changLangButton(langaugeTag) {
    console.log(langaugeTag);
    console.log(sessionStorage);
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

  componentDidUpdate() {
    this.setState({ isLocked: false })
    if (this.props.passwordReset !== '' && this.state.isLoading === true) {
      this.setState({
        isLoading: false,
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isLocked: false })
    if (nextProps.LoginResult && nextProps.LoginResult.firstScreen) {
      console.log("LoginResult from props ::: ", nextProps.LoginResult);
      var firstPage = nextProps.LoginResult.firstScreen;
      sessionStorage.setItem('firstScreen', firstPage)
      if (firstPage != undefined) {
        firstPage = firstPage.replace("/", "");
      }
      if (nextProps.LoginResult.success === true) {
        if (firstPage != undefined && nextProps.LoginResult.firstScreen != "") {
          sessionStorage.removeItem('token');
          sessionStorage.setItem('token', nextProps.LoginResult.token);
          browserHistory.push(nextProps.LoginResult.firstScreen);
        } else {
          console.log(nextProps.LoginResult.token);
        }
      }
    }
  }


  handleKeyPress(e) {
    console.log(e.which)
    if (e.which === 13) {
      this.check();
    }
  }

  handleKeyPressForgot(e) {
    if (e.which === 13) {
      this.checkForgot();
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  getLogosbyUserType() {

    let imgSDG = "../assets/pages/img/organization/DP.png";
    let imgURLOtherOrg = "../assets/pages/img/organization/" + this.props.orgType + ".png"

    if (this.props.orgType && this.props.orgType.toString().toUpperCase() == 'DP') {
      return (<div></div>)
    }
    else if (this.imageExists(imgURLOtherOrg)) {
      return (<div>
        <div style={{ marginTop: "60px", paddingTop: "80px" }}>
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

    // var http = new XMLHttpRequest();

    // // http.open('HEAD', image_url, false);
    // // http.send();

    // return http.status != 404;

  }

  getLogosForSDGUser() {
    return (<div className="logo" />);
  }
  loginAgainFalse = () => {
    this.setState({
      accountIsLocked: false
    })
  }
  render() {


    if (!this.state.isLoading) {
      sessionStorage.loginOrgType = this.props.orgType;

      return (
        <div>
          <div className="login">
            <div style={{}}>
              {/*<div id="particles-js"></div>*/}
              <div className="content" style={{ height: 'auto', marginTop: '10px' }}>
                <br /><br />
                {this.getLogosbyUserType()}
                <div className="login-form">
                  {this.getLogosForSDGUser()}
                  <h3 className="form-title">Cipher</h3>
                  <div className="alert alert-danger display-hide">
                    <button className="close" data-close="alert" />
                    <span> Enter any username and password. </span>
                  </div>
                  <br />
                  <div id="loginCarousel" className="carousel slide" data-ride="carousel" data-interval="false">
                    <div className="carousel-inner">
                      <div className="item active">
                        <div className="form-group">
                          <label className="control-label visible-ie8 visible-ie9">Username</label>
                          <div className="input-icon">
                            <i className="fa fa-user" />
                            <input className="form-control placeholder-no-fix" type="text" id="username"
                              autoComplete="off" placeholder="Username" name="username" /></div>
                        </div>
                        <div className="form-group">
                          <label className="control-label visible-ie8 visible-ie9">Password</label>
                          <div className="input-icon"><i className="fa fa-lock" />

                            <i className="fa fa-eye" aria-hidden="true" />
                            <input type="password" className="form-control placeholder-no-fix" id="password"
                              autoComplete="off" placeholder="Password" name="password" />
                          </div>
                        </div>

                        <div className="form-actions">
                          <div>
                            <button type="submit" className="btn green btn-block uppercase" disabled={this.state.isLocked}
                              onClick={this.check.bind(this)}>
                              LOGIN
                        </button>
                          </div>
                        </div>

                        <div className="forget-password">

                          <ul className="lng">
                            <li id="engAnchor" className="actv"><a href="javascript:;"
                              onClick={this.changLangButton.bind(this, "EN")}>En</a></li>
                            <li id="arbAnchor"><a href="javascript:;" onClick={this.changLangButton.bind(this, "AR")}>عربى</a>
                            </li>
                          </ul>
                          <h4 data-target="#loginCarousel" data-slide-to="1" >
                            <a href="javascript:" >Forgot your password ?</a></h4>

                        </div>
                        <br />
                        {/* {this.state.accountIsLocked &&
                          <div className="forget-password">
                            <ul className="lng">
                            </ul> <ul className="lng">
                              <li data-target="#loginCarousel" data-slide-to="2">
                                <a href="javascript:" style={{ textDecoration: 'underline' }}>Unlock your account </a></li>
                            </ul>
                          </div>} */}
                      </div>


                      <div className="item">
                        <div className="form-group">
                          <label className="control-label visible-ie8 visible-ie9">Username:</label>
                          <div className="input-icon">
                            <i className="fa fa-user" />
                            <input className="form-control placeholder-no-fix" type="text" id="usernameForgot"
                              autoComplete="off" placeholder="Username" name="username" /></div>
                        </div>
                        <div className="form-group">
                          <label className="control-label visible-ie8 visible-ie9">Email</label>
                          <div className="input-icon"><i className="fa fa-envelope" />
                            <input type="email" className="form-control placeholder-no-fix" id="emailForgot"
                              autoComplete="off" placeholder="Email" name="password" />
                          </div>
                          {this.state.emailError ? <span style={{ color: 'red', position: 'relative', top: '2px' }}>
                            Not a Valid Email</span> : ''}
                        </div>
                        <div className="form-actions"><a onClick={this.checkForgot.bind(this)}
                          className="btn green btn-block uppercase"> Submit </a></div>

                        <div className="login-password">
                          <ul className="lng">
                            <li data-target="#loginCarousel" data-slide-to="0" >
                              <a href="javascript:">Remember your password ?</a></li>
                          </ul>
                        </div>
                      </div>


                      {/* Unlock your account form
                      <div className="item">
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="fa fa-user" />
                            <input className="form-control placeholder-no-fix" type="text" id="unlockUserid"
                              autoComplete="off" placeholder="UserID" name="username" />

                          </div>
                        </div>

                        <div className="form-actions"><a href="javascript:" onClick={this.unlockUser.bind(this)}
                          className="btn green btn-block uppercase"> UNLOCK ACCOUNT </a></div>

                        {
                          this.state.loginAgain && <div className="login-password">
                            <ul className="lng">
                              <li data-target="#loginCarousel" data-slide-to="0" >
                                <a href="javascript:" onClick={this.loginAgainFalse}>Login</a></li>
                            </ul>
                          </div>
                        }
                      </div> */}
                    </div>

                  </div>
                </div>

              </div>
              {/*<div className="copyright">{brandConfig.footer}</div>*/}
            </div>
          </div>
        </div>
      );
    } else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
  }

}

Login.propTypes = {

};

function mapStateToProps(state, ownProps) {
  return {
    LoginResult: state.app.loginResponse.data,
    passwordReset: state.app.responseMessage.data,
    orgType: ownProps.params.orgType
  };
}

function mapDispatchToProps(dispatch) {

  return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);