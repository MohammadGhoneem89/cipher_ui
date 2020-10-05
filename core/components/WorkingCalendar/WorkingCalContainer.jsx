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
import ModalBox from '../../common/ModalBox.jsx';
const moment = require('moment');

class WorkingCaledarContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            workingCalendarDetail: initialState.workingCalendarDetail.data,
            isLoading: this.props.params.ID ? true : false,
            show:false,
            toInsert:[]
        };

        this.submit = this.submit.bind(this);
        this.submit2 = this.submit2.bind(this);
        this.closePopup = this.closePopup.bind(this);
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
            if (data.exceptionList[i].end == undefined&& data.exceptionList[i].type=='publicHoliday') {
                data.holidays.push(data.exceptionList[i].start)
            } else if (data.exceptionList[i].type=='publicHoliday') {
                let dateArray = this.getDates(new Date(data.exceptionList[i].start), (new Date(data.exceptionList[i].end))).map(validDate => {
                    return utils.UNIXConvertToDate(Date.parse(validDate), 'YYYY-MM-DD')
                });
            data.holidays = [...data.holidays.concat(dateArray)];
            }

            }
            data.holidays = new Array(...new Set(data.holidays))

            data.shortWorkingTime = []
        for (let i = 0; i < data.exceptionList.length; i++) {
            data.exceptionList[i] = {
                ...data.exceptionList[i],
                title: _.get(data.exceptionList[i], 'title', '').replace(/[^a-zA-Z-_.,:?! 0-9]+/g, '')
            }
            if (data.exceptionList[i].end == undefined&& data.exceptionList[i].type=='workingTime') {
                data.shortWorkingTime.push(data.exceptionList[i].start)
            } else if (data.exceptionList[i].type=='workingTime') {
                let dateArray = this.getDates(new Date(data.exceptionList[i].start), (new Date(data.exceptionList[i].end))).map(validDate => {
                    return utils.UNIXConvertToDate(Date.parse(validDate), 'YYYY-MM-DD')
                });
            data.shortWorkingTime = [...data.shortWorkingTime.concat(dateArray)];
            }

        }
        data.shortWorkingTime = new Array(...new Set(data.shortWorkingTime))

        data.shortWorkingTimes = []
        for (let i = 0; i < data.shortWorkingTime.length; i++) {
            const date = moment(data.shortWorkingTime[i]); // Thursday Feb 2015
            data.shortWorkingTimes.push({day:moment(date,'YYYY-MM-DD').format('dddd'),date:data.shortWorkingTime[i]})
        }
        data.shortWorkingTimes = new Array(...new Set(data.shortWorkingTimes))
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
            // this.props.actions.generalProcess(constants.workingCalendarInsert, requestCreator.createWorkingCalendarInsertRequest(data));
            this.setState({ isLoading: true })
            this.props.actions.generalAjxProcess(constants.workingCalendarInsert, requestCreator.createWorkingCalendarInsertRequest(data))
                .then(res => {
                if (res.responseMessage.data.isAlreadyExists==true) {
                    this.setState({
                        show:true,
                        toInsert:data
                    })
                }
                    this.setState({ isLoading: false })
                })
                .catch(err => {
                    console.log(JSON.stringify(err));
                })

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


    closePopup() {
        this.setState({
            show: false
        })
      }
    submit2() {
        
        this.setState({ isLoading: true })
        this.props.actions.generalAjxProcess(constants.workingCalendarInsert, requestCreator.createWorkingCalendarInsertWithRemove(this.state.toInsert))
            .then(res => {
                console.log("response");
                this.setState({ isLoading: false,show:false })
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            })
    }




    render() {
        if (!this.state.isLoading) {
            return (
                <div>
                    <Portlet title={"Working Days Calendar"}>
                        <WorkingCalSetupForm onSubmit={this.submit} initialValues={this.state.workingCalendarDetail} />
                    </Portlet>
                    <ModalBox isOpen={this.state.show}>
                        <Portlet title={"Warning"}>
                                <textarea type="text"  className="form-control" id="description"
                                value={"The Calendar with this name already exists, do you want to update it?"} rows="4"
                                style={{resize: "none", width: "100%"}}/>
                                <div className="btn-toolbar"style={{marginTop:'20px'}}>
                                    <button type="submit" onClick={this.closePopup} className="pull-right btn green">
                                        {utils.getLabelByID("No")}
                                    </button>
                                    <button type="submit" onClick={this.submit2} className="pull-right btn green">
                                        {utils.getLabelByID("Yes")}
                                    </button>
                                </div>

                            </Portlet>
                    </ModalBox>
                </div>
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