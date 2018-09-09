import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initialState from '../../core/reducers/initialState.js';
import * as actions from '../../core/actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../core/common/request.js';
import Portlet from '../../core/common/Portlet.jsx';
import WorkingCalSetupForm from '../../components/WorkingCalendar/WorkingCalSetupForm.jsx'

class WorkingCaledarContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            workingCalendarDetail: initialState.workingCalendarDetail.data,
            isLoading: true
        };

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        
            this.props.actions.generalProcess(constants.getworkingCalendarDetail, requestCreator.createWorkingCalendarRequest());
        
    }
    componentWillUnmount() {

    }
    submit(data) {

        this.props.actions.generalProcess(constants.workingCalendarUpdate, requestCreator.createWorkingCalendarUpdateRequest(data));

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.workingCalendarDetail) {
            this.setState({
                workingCalendarDetail: nextProps.workingCalendarDetail,
                isLoading: false
            });
        }
        else {

            this.setState({
                workingCalendarDetail: initialState.workingCalendarDetail.data
            });
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <Portlet title={"Working Days Calendar"}>
                    <WorkingCalSetupForm onSubmit={this.submit} initialValues={this.state.workingCalendarDetail} />
                </Portlet>
            );
        }
        else
            return (<div className="loader">Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    
    return {
        
        workingCalendarDetail: state.app.workingCalendarDetail.data        
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingCaledarContainer)