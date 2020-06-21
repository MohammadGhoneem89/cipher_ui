import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction.js';
import * as constants from '../../constants/Communication.js';
import * as toaster from '../../common/toaster.js';
import Portlet from '../../common/Portlet.jsx';
import * as utils from "../../common/utils";
import Cookies from "js-cookie";
import * as requestCreator from "../../common/request";
import auth from "../../auth/authenticator";
import {browserHistory} from "react-router";

class ChangePassword extends React.Component {


  constructor() {
    super();
    this.state = {
      newPassword: false,
      confirmPassword: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyPressForgot = this.handleKeyPressForgot.bind(this);
    sessionStorage.lang = "EN";


  }

  redirectToLoginPage() {
    sessionStorage.removeItem('lastRequestTime');

  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.status && nextProps.status != 'ERROR') {
      this.logout();

    }
  }

  logout() {
    this.props.actions.generalProcess(constants.logout, requestCreator.createEmailTemplateListRequest({}));
    auth.logOut();
    browserHistory.push('/cipher/login');
  }

  check(form) {
    let oldPassword = (document.getElementById('oldPassword') === null || document.getElementById('oldPassword') === undefined) ? "" : document.getElementById('oldPassword').value;
    let newPassword = (document.getElementById('newPassword') === null || document.getElementById('newPassword') === undefined) ? "" : document.getElementById('newPassword').value;
    let confirmPassword = (document.getElementById('confirmPassword') === null || document.getElementById('confirmPassword') === undefined) ? "" : document.getElementById('confirmPassword').value;


    if (newPassword === confirmPassword) {

      let request = {
        "passwordToken": this.props.passwordToken,
        "newPassword": newPassword,
        "oldPassword": oldPassword,
        "isAuth": !!Cookies.get('login'),
        "firstScreen": '/changePasswordInternal'
      };
      this.props.actions.generalProcess(constants.passwordChange, request);




    } else
      toaster.showToast("New password does not match confirm password", "ERROR");
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
  }


  changLangButton(languageTag) {
    let eng = $('#engAnchor');
    let arb = $('#arbAnchor');
    switch (languageTag) {
      case "AR":
        eng.removeClass('actv');
        arb.addClass('actv');
        sessionStorage.lang = "AR";
        break;
      case "EN":
        arb.removeClass('actv');
        eng.addClass('actv');
        sessionStorage.lang = "EN";
        break;

    }


  }

  componentWillMount() {

  }

  componentDidMount() {
    document.getElementById("username").addEventListener("keyup", this.handleKeyPress);
    document.getElementById("password").addEventListener("keyup", this.handleKeyPress);
    document.getElementById("usernameForgot").addEventListener("keyup", this.handleKeyPressForgot);
    document.getElementById("emailForgot").addEventListener("keyup", this.handleKeyPressForgot);
    document.getElementById('menu').click();
    $("body").addClass('page-sidebar-closed');
    $("#SideMenuIcons").addClass('page-sidebar-menu-closed');

  }

  handleKeyPress(e) {
    if (e.which === 13) {
      this.check();
    }
  }

  handleKeyPressForgot(e) {
    if (e.which === 13) {
      this.check();
    }
  }

  getLogosbyUserType() {

    return (<div>

      </div>
    )
  }

  imageExists(image_url) {

    let http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

  }

  // getLogosForSDGUser() {
  //     let imgURLOtherOrg = "../assets/pages/img/organization/" + this.props.orgType + ".png";
  //     if (this.props.orgType.toString().toUpperCase() === 'SDG' || !this.imageExists(imgURLOtherOrg))
  //         return (<div className="logo"><img src="../assets/pages/img/organization/logo-big.png" alt="" /></div>)
  // }

  getLogosForSDGUser() {
    return (<div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      {/* <div className="logo"> </div> */}
      <div className="logo2"></div>
    </div>);
  }

  changeView(fieldType) {
    if (fieldType === 'newPassword') {
      if (!this.state.newPassword) {
        this.setState({
          newPassword: true,
        })
      } else {
        this.setState({
          newPassword: false,
        })
      }
    } else if (fieldType === 'confirmPassword') {
      if (!this.state.confirmPassword) {
        this.setState({
          confirmPassword: true,
        })
      } else {
        this.setState({
          confirmPassword: false,
        })
      }
    }
  }

  render() {

    sessionStorage.loginOrgType = this.props.orgType;
    if (!Cookies.get('login')) {
      return (

        <div>

          <div className=" login">
            <div id="particles-js"/>
            <div className="content" style={{marginTop: "0px"}}>


              <div className="login-form">
                <div className="logo"></div>
                {this.getLogosForSDGUser()}
                <h3 className="form-title">{Cipher}</h3>
                <div className="alert alert-danger display-hide">
                  <button className="close" data-close="alert"/>
                  <span> Enter any username and password. </span>
                </div>
                {!!sessionStorage.token &&
                <div className="form-group">
                  <label className="control-label visible-ie8 visible-ie9">OLD Password</label>
                  <div className="input-icon">
                    <i className="fa fa-lock"/>
                    <i className="fa fa-eye" onClick={() => this.changeView('oldPassword')}
                       aria-hidden="true"/>
                    <input type={'password'}
                           className="form-control placeholder-no-fix" name="oldPassword"
                           autoComplete="off" id="oldPassword" placeholder="Old Password"/>
                  </div>
                </div>
                }
                <div className="form-group">
                  <label className="control-label visible-ie8 visible-ie9">New Password</label>
                  <div className="input-icon">
                    <i className="fa fa-lock"/>
                    <i className="fa fa-eye" onClick={() => this.changeView('newPassword')} aria-hidden="true"/>
                    <input type={'password'}
                           className="form-control placeholder-no-fix"
                           name="password"
                           autoComplete="off" id="newPassword" placeholder="New Password"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label visible-ie8 visible-ie9">Confirm Password</label>
                  <div className="input-icon"><i className="fa fa-lock"/>

                    <i className="fa fa-eye" onClick={() => this.changeView('confirmPassword')} aria-hidden="true"/>
                    <input type={'password'}
                           className="form-control placeholder-no-fix" name="confirmPassword"
                           autoComplete="off" id="confirmPassword" placeholder="Confirm Password"/>
                  </div>
                </div>
                <div className="form-actions"><a href="javascript:" onClick={this.check.bind(this)}
                                                 className="btn green btn-block uppercase"> Change Password </a>
                </div>
                <a href="javascript:;"
                   onClick={this.redirectToLoginPage.bind(this)}>{"Back to login?"}</a>
              </div>

            </div>

            {/*<div className="copyright">Copyright &copy; 2018-2020 Avanza Innovations. All Rights Reserved.</div>*/}
          </div>
        </div>


      );
    } else {


      return (

        <Portlet title={utils.getLabelByID("")}>
          <div className="row" style={{height: '100%'}}>
            <h3 className="text-center">Change Password</h3>
            <br/>
            <div className="col-sm-offset-3 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Old Password")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type={this.state.oldPassword ? 'text' : 'password'}
                             className="form-control placeholder-no-fix" name="oldPassword"
                             autoComplete="off" id="oldPassword" placeholder="Old Password"/>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("New Password")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type={this.state.newPassword ? 'text' : 'password'}
                             className="form-control placeholder-no-fix"
                             name="password"
                             autoComplete="off" id="newPassword" placeholder="New Password"/>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Confirm Password")}</label>
                    </div>
                    <div className="form-group col-md-8">
                      <input type={this.state.confirmPassword ? 'text' : 'password'}
                             className="form-control placeholder-no-fix" name="confirmPassword"
                             autoComplete="off" id="confirmPassword" placeholder="Confirm Password"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="col-md-12">
                          <div className="btn-toolbar pull-right">
                            <button type="submit" onClick={this.check.bind(this)}
                                    className="btn green">{' '}{utils.getLabelByID("Update Password")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </Portlet>


      );
    }
  }

}


function mapStateToProps(state, ownProps) {
  return {
    status: _.get(state.app, 'responseMessage.data.message.status', undefined),
    passwordToken: ownProps.location.query.t,
    orgType: ownProps.params.orgType
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

ChangePassword.displayName = "__HIDEALL";

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);