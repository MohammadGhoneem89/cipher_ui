import React from 'react';
import {bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import Portlet from '../../common/Portlet.jsx';
import EmailTemplateForm from './EmailTemplateForm.jsx';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';

class EmailTemplateContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            isLoading: true,
            emailTemplateID: undefined,
            emailTemplateDetail: {...initialState.emailTemplateDetail.data},
            templateTypes: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.emailTemplateDetail.actions && nextProps.typeData.ETEMP_placeHolders) {
            //Add permissions
            let emailTemplateDetail = this.props.emailTemplateID ? nextProps.emailTemplateDetail : {
                ...this.state.emailTemplateDetail,
                actions: nextProps.emailTemplateDetail.actions
            };
            this.setState({
                isLoading: false,
                emailTemplateID: nextProps.emailTemplateID,
                emailTemplateDetail: emailTemplateDetail,
                placeHolders: nextProps.typeData.ETEMP_placeHolders,
                templateTypes: nextProps.typeData.ETEMP_templateTypes
            });
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getEmailTemplateDetails, requestCreator.createEmailTemplateDetailsRequest(this.props.emailTemplateID));
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ETEMP_placeHolders', 'ETEMP_templateTypes']));
        this.setState({isLoading: true});
    }

    submit(data) {
        if (this.state.emailTemplateID)
            return this.props.actions.reduxFormProcess(constants.emailTemplateUpdate, requestCreator.createEmailTemplateUpdateRequest(data)).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
        else
            return this.props.actions.reduxFormProcess(constants.emailTemplateInsert, requestCreator.createEmailTemplateInsertRequest(data)).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
    }

    render() {
        if (!this.state.isLoading) {
            return (
                
                    <EmailTemplateForm onSubmit={this.submit} initialValues={this.state.emailTemplateDetail}
                                       containerState={this.state}
                                       containerProps={this.props}/>
               
            );
        }
        else {
            return (<div className="loader">Loading...</div>)
        }
    }
}

function mapStateToProps(state, ownProps) {
    let emailTemplateID = ownProps.params.emailTemplateID;
    return {
        emailTemplateID: emailTemplateID,
        emailTemplateDetail: state.app.emailTemplateDetail.data,
        typeData: state.app.typeData.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

EmailTemplateContainer.displayName = "ETSetup_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateContainer);