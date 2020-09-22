import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import WorkingCalSetupForm from './WorkingCalSetupForm.jsx'
import * as utils from '../../common/utils.js';
import * as toaster from '../../common/toaster.js';

class WorkingCaledarContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            workingCalendarDetail: initialState.workingCalendarDetail.data,
            isLoading: this.props.params.ID ? true : false
        };

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate() + days);
            return dat;
        }
        if (this.props.params.ID) {
            this.props.actions.generalProcess(constants.workingCalendarDetail, requestCreator.createWorkingCalendarRequest(this.props.params.ID));
        }

    }
    componentWillUnmount() {

    }

    getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }



    submit(data) {

        // Validation
        data.calendarName = _.get(data, 'calendarName', '').replace(/[^a-zA-Z-_.,:?! 0-9]+/g, '')
        if (data.calendarName == "") {
            toaster.showToast('Calendar name not filled', 'ERROR')
            return
        }
        if (data.calendarYear == "") {
            toaster.showToast('Calendar Year not filled', 'ERROR')
            return
        }
        if (data.dayEnd == "") {
            toaster.showToast('Day End not selected', 'ERROR')
            return
        }
        if (data.dayStart == "") {
            toaster.showToast('Day Start not selected', 'ERROR')
            return
        }
        if (data.weekStartDay == "") {
            toaster.showToast('Week Start not selected', 'ERROR')
            return
        }
        if (data.weekEndDay == "") {
            toaster.showToast('Week End not selected', 'ERROR')
            return
        }
        // Validation Ends


        let mapper = { 'Sunday': '0', 'Monday': '1', 'Tuesday': '2', 'Wednesday': '3', 'Thursday': '4', 'Friday': '5', 'Saturday': '6' }

        if (parseInt(mapper[data.weekStartDay]) > parseInt(mapper[data.weekEndDay])) {
            toaster.showToast('Invalid Week Days selected', 'ERROR')
            return
        }

        data.workHours = [data.dayStart, data.dayEnd];

        data.workinghours = {}
        for (let [key, value] of Object.entries(mapper)) {

            if (parseInt(value) >= parseInt(mapper[data.weekStartDay]) && parseInt(value) <= parseInt(mapper[data.weekEndDay])) {
                data.workinghours[value] = [...data.workHours];
            } else {
                data.workinghours[value] = null;
            }
        }


        data.holidays = []

        for (let i = 0; i < data.exceptionList.length; i++) {
            data.exceptionList[i] = {
                ...data.exceptionList[i],
                title: _.get(data.exceptionList[i], 'title', '').replace(/[^a-zA-Z-_.,:?! 0-9]+/g, '')
            }
            if (data.exceptionList[i].end == undefined) {
                data.holidays.push(data.exceptionList[i].start)
            } else {
                let dateArray = this.getDates(new Date(data.exceptionList[i].start), (new Date(data.exceptionList[i].end))).map(validDate => {
                    return utils.UNIXConvertToDate(Date.parse(validDate), 'YYYY-MM-DD')
                });
                data.holidays = [...data.holidays.concat(dateArray)];
            }

        }
        data.holidays = new Array(...new Set(data.holidays))

        if (this.props.params.ID) {
            this.setState({ isLoading: true })
            this.props.actions.generalAjxProcess(constants.workingCalendarUpdate, requestCreator.createWorkingCalendarUpdateRequest(data))
                .then(res => {
                    this.setState({ isLoading: false })
                })
                .catch(err => {
                    console.log(JSON.stringify(err));
                })
        } else {
            this.props.actions.generalProcess(constants.workingCalendarInsert, requestCreator.createWorkingCalendarInsertRequest(data));
        }

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.workingCalendarDetail) {
            this.setState({
                workingCalendarDetail: nextProps.workingCalendarDetail,
                isLoading: false
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
WorkingCaledarContainer.displayName = "Working Calendar";
export default connect(mapStateToProps, mapDispatchToProps)(WorkingCaledarContainer)