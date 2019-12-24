/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import brandConfig from '../../../assets/skins/default/brandConfig.json';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils';
import * as constants from '../../constants/Communication.js';
import * as toaster from '../../../core/common/toaster.js';
class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
        sessionStorage.lang = "EN";

        this.state = {
            isLocked: false
        }
    }
    componentWillMount() {

    }

    componentDidMount() {

    }
    imageExists(image_url) {

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    
      }
      handleKeyPress(e) {
        if (e.which === 13) {
          this.check();
        }
      }
    
      handleKeyPressForgot(e){
        if (e.which === 13) {
            this.checkForgot();
        }
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

    // formSubmit() {
        
    //     let newPassword = (document.getElementById('newPassword') == null || document.getElementById('newPassword') == undefined) ? "" : document.getElementById('newPassword').value;
    //     let confirmPassword = (document.getElementById('confirmPassword') == null || document.getElementById('confirmPassword') == undefined) ? "" : document.getElementById('confirmPassword').value;
        
    //     console.log(this.props);
    //     console.log(newPassword);
    //     console.log(confirmPassword);

    //     if(newPassword == confirmPassword)
    //     {

    //         let request  = {
                
                
    //                 "data": {
    //                     "passwordToken": this.props.passwordToken,
    //                     "newPassword": newPassword
    //                 }
    //            }
               
    //         this.props.actions.generalProcess(constants.passwordChange, request);   
    //     }
    //     else
    //         alert('New password does not match confirm password')

    //         document.getElementById('currentPassword').value = ''
    //         document.getElementById('newPassword').value = ''
    //         document.getElementById('confirmPassword').value = ''



            
    // }

    check(form) {
        console.log(this.props);
        let newPassword = (document.getElementById('newPassword') === null || document.getElementById('newPassword') === undefined) ? "" : document.getElementById('newPassword').value;
        let confirmPassword = (document.getElementById('confirmPassword') === null || document.getElementById('confirmPassword') === undefined) ? "" : document.getElementById('confirmPassword').value;


        if (newPassword === confirmPassword) {

            let request = {
                "passwordToken": this.props.passwordToken,
                "newPassword": newPassword
            };

            this.props.actions.generalProcess(constants.passwordChange, request);
        }
        else
            toaster.showToast("New password does not match confirm password", "ERROR");
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }

    getLogosForSDGUser() {
        return (<div className="logo" />);
      }
    render() {

        return (

            <div>

                <div className="login">
                    <div className="content" style={{marginTop: "0px"}}>

                        {this.getLogosbyUserType()}

                        <div className="login-form">
                            {this.getLogosForSDGUser()}
                            <h3 className="form-title">{brandConfig.projectName}</h3>
                            <div className="alert alert-danger display-hide">
                                <button className="close" data-close="alert"/>
                                <span> Enter any username and password. </span>
                            </div>

                            <div className="form-group">
                                <label className="control-label visible-ie8 visible-ie9">Password</label>
                                <div className="input-icon">
                                    <i className="fa fa-lock"/>
                                    <i className="fa fa-eye" aria-hidden="true"/>
                                    <input type="password" className="form-control" name="newPassword"
                                           id="newPassword" placeholder="New Password"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label visible-ie8 visible-ie9">Password</label>
                                <div className="input-icon"><i className="fa fa-lock"/>

                                    <i className="fa fa-eye" aria-hidden="true"/>
                                    <input type="password" className="form-control" name="confirmPassword"
                                           id="confirmPassword" placeholder="Confirm Password"/>
                                </div>
                            </div>
                            <div className="form-actions"><a href="javascript:" onClick={this.check.bind(this)}
                                                             className="btn green btn-block uppercase"> Submit </a>
                            </div>
                            <div className="login-password">
                                <ul className="lng">
                                    <li id="engAnchor" className="actv"><a href="javascript:"
                                                                           onClick={this.changLangButton.bind(this, "EN")}>En</a>
                                    </li>
                                    <li id="arbAnchor"><a href="javascript:"
                                                          onClick={this.changLangButton.bind(this, "AR")}>عربى</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="copyright">Copyright &copy; 2000-2018 Smart Dubai. All Rights Reserved.</div>
                </div>
            </div>


        );
        // return (

        //     <div>
        //         <div className="form-body">
        //             <div className="row">
        //                 <div className="col-md-6">
        //                     <div className="form-group col-md-4">
        //                         <label className="control-label">{utils.getLabelByID("ChangePassword_CurrentPassword")}</label>
        //                     </div>
        //                     <div className="form-group col-md-8">
        //                         <input type="password" className="form-control" name="currentPassword" id="currentPassword" placeholder="Password" />
        //                     </div>
        //                 </div>

        //             </div>
        //             <div className="row">
        //                 <div className="col-md-6">
        //                     <div className="form-group col-md-4">
        //                         <label className="control-label">{utils.getLabelByID("ChangePassword_NewPassword")}</label>
        //                     </div>
        //                     <div className="form-group col-md-8">
        //                         <input type="password" className="form-control" name="newPassword" id="newPassword" placeholder="New Password" />
        //                     </div>
        //                 </div>

        //             </div>
        //             <div className="row">
        //                 <div className="col-md-6">
        //                     <div className="form-group col-md-4">
        //                         <label className="control-label">{utils.getLabelByID("ChangePassword_ConfirmNewPassword")}</label>
        //                     </div>
        //                     <div className="form-group col-md-8">
        //                         <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
        //                     </div>
        //                 </div>

        //             </div>

        //             <div className="row">
        //                 <div className="col-md-6">

        //                     <div className="form-group col-md-4">
        //                     </div>
        //                     <div className="form-group col-md-8">
        //                         <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("ChangePassword_ChangePassword")} </button>
        //                     </div>
        //                 </div>
        //             </div>


        //         </div>
        //     </div >
        // );
    }
}

ChangePassword.propTypes = {
    changeResponseData: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        passwordToken: ownProps.location.query.t,
        changeResponseData: state.app.changeResponseData.data
    };

}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ChangePassword.displayName = "ChangePassword_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
