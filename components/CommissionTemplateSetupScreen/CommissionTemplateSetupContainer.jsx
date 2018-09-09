import React from 'react';
import {bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import initialState from '../../core/reducers/initialState.js';
import * as actions from '../../core/actions/generalAction';
import Portlet from '../../core/common/Portlet.jsx';
import CommissionTemplateForm from './CommissionTemplateForm.jsx';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../core/common/request.js';
import * as utils from '../../core/common/utils.js';

class CommissionTemplateContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);

        this.state = {
            isLoading: false,
            commissionTemplateID: undefined,
            commissionTemplateDetail: {
                ...initialState.commissionTemplateDetail.data
            },
            categoryTypes: [],
            feeTypes: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.commissionTemplateDetail && nextProps.typeData && nextProps.commissionTemplateDetail.actions && nextProps.typeData.CTEMP_categoryTypes) {
            //Add permissions
            let commissionTemplateDetail = this.props.commissionTemplateID ? nextProps.commissionTemplateDetail : {
                ...this.state.commissionTemplateDetail,
                actions: nextProps.commissionTemplateDetail.actions
            };

            this.setState({
                isLoading: false,
                commissionTemplateID: nextProps.commissionTemplateID,
                commissionTemplateDetail: commissionTemplateDetail,
                categoryTypes: nextProps.typeData.CTEMP_categoryTypes,
                feeTypes: nextProps.typeData.CTEMP_feeTypes
            });
        }
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getCommissionTemplateDetails, requestCreator.createCommissionTemplateDetailRequest(this.props.commissionTemplateID));
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['CTEMP_feeTypes', 'CTEMP_categoryTypes']));
        this.setState({isLoading: true});
    }

    submit(data) {
        if (this.state.commissionTemplateID)
            return this.props.actions.reduxFormProcess(constants.commissionTemplateUpdate, requestCreator.createCommissionTemplateUpdateRequest(data)).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
        else
            return this.props.actions.reduxFormProcess(constants.commissionTemplateInsert, requestCreator.createCommissionTemplateInsertRequest(data)).catch((error) => {
                window.scrollTo(0, 0);
                throw new SubmissionError(error);
            });
    }

    render() {
        if (!this.state.isLoading && this.props.commissionTemplateID === this.state.commissionTemplateDetail._id)
            return (
                <Portlet title={utils.getLabelByID("CommissionTemplateSetup")}>
                    <CommissionTemplateForm onSubmit={this.submit} initialValues={this.state.commissionTemplateDetail}
                                            containerState={this.state}
                                            containerProps={this.props}/>
                </Portlet>
            );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    let commissionTemplateID = ownProps.params.commissionTemplateID;
    return {
        commissionTemplateID: commissionTemplateID,
        commissionTemplateDetail: state.app.commissionTemplateDetail.data,
        typeData: state.app.typeData.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

CommissionTemplateContainer.displayName = "CSetup_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(CommissionTemplateContainer)