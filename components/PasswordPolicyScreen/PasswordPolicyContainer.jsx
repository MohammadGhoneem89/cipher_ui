import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import * as actions from '../../core/actions/generalAction';
import * as constants from '../../constants/Communication.js';
import Portlet from '../../core/common/Portlet.jsx';
import ActionButton from '../../core/components/ActionButtonNew.jsx';
import PasswordPolicyForm from  './PasswordPolicyForm.jsx';

class PasswordPolicy extends React.Component {


  constructor() {
    super();
    this.state = {
      policyID: undefined,
      passwordPolicyDetail: undefined,
      isLoading: true
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.actions.generalProcess(constants.passwordPolicyDetail, {"action": "typeDataDetail"});
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.passwordPolicyDetail) {
      let policyID = nextProps.passwordPolicyDetail.passwordPolicy[0]._id;
      delete nextProps.passwordPolicyDetail.passwordPolicy[0]._id;
      delete nextProps.passwordPolicyDetail.passwordPolicy[0].actions;
      this.setState({
        policyID,
        passwordPolicyDetail: nextProps.passwordPolicyDetail,
        isLoading: false
      });
    }
  }

  submit(data) {
    let formData = {...data};
    formData.id = this.state.policyID;
    formData.minimumPasswordLength =  parseInt(formData.minimumPasswordLength);
    formData.maximumPasswordLength =  parseInt(formData.maximumPasswordLength);
    formData.minimumAlphabetCount =  parseInt(formData.minimumAlphabetCount);
    formData.maximumAlphabetCount =  parseInt(formData.maximumAlphabetCount);
    formData.minimumDigitCount =  parseInt(formData.minimumDigitCount);
    formData.maximumDigitCount =  parseInt(formData.maximumDigitCount);
    formData.allowIncorrectLoginAttempts =  parseInt(formData.allowIncorrectLoginAttempts);
    formData.minimumUpperCase =  parseInt(formData.minimumUpperCase);
    formData.minimumLowerCase =  parseInt(formData.minimumLowerCase);
    formData.lockTimeInMinutes =  parseInt(formData.lockTimeInMinutes);
    formData.unAcceptedKeywords =  formData.unAcceptedKeywords.toString().split(",");
    formData.changePeriodDays =  parseInt(formData.changePeriodDays);


    return this.props.actions.reduxFormProcess(constants.updatePasswordPolicy, formData).then((result) => {
    }).catch((error) => {
      window.scrollTo(0, 0);
      throw new SubmissionError(error);
    });
  }

  // performAction(actionObj) {
  //   if (actionObj.label === "Reset") {
  //     this.refs.PasswordPolicyForm.reset();
  //   }
  // }

  render() {
    if (!this.state.isLoading) {
      return (
        <Portlet title={"Details"}>
          <PasswordPolicyForm onSubmit={this.submit}  initialValues={this.state.passwordPolicyDetail.passwordPolicy[0]} containerState={this.state}/>
          {/*<form id="PasswordPolicyForm" ref="PasswordPolicyForm" onSubmit={this.submit}>*/}
            {/*{Object.keys(this.state.passwordPolicyDetail.passwordPolicy[0]).map((item, index) => {*/}
              {/*return (*/}
                {/*<div className="row" key={index}>*/}
                  {/*<div className="form-group col-md-4">*/}
                    {/*<label className="control-label">{item}</label>*/}
                  {/*</div>*/}
                  {/*<div className="form-group col-md-6">*/}
                    {/*<input name={item} type="text" className="form-control"*/}
                           {/*defaultValue={this.state.passwordPolicyDetail.passwordPolicy[0][item]}/>*/}
                  {/*</div>*/}
                {/*</div>);*/}
            {/*})}*/}
            {/*<div className="clearfix">*/}
              {/*{console.log(this.state.passwordPolicyDetail.actions)}*/}
              {/*<ActionButton actionList={this.state.passwordPolicyDetail.actions}*/}
                            {/*performAction={this.performAction}/>*/}
            {/*</div>*/}
          {/*</form>*/}
        </Portlet>
      );
    }
    else {
      return (<div className="loader">Loading...</div>);
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    passwordPolicyDetail: state.app.fetchPasswordPolicy.data
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

PasswordPolicy.displayName = "PasswordPolicyHeading";
export default connect(mapStateToProps, mapDispatchToProps)(PasswordPolicy);