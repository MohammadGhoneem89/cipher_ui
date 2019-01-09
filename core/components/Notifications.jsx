/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';
import Portlet from '../common/Portlet.jsx';
import Table from '../common/Datatable.jsx';
/*container specific imports*/
import * as constants from '../constants/Communication.js';
import * as requestCreator from '../common/request.js';
import * as utils from '../common/utils';
import ModalBox from '../../core/common/ModalBox.jsx';

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationDetailData: undefined,
            activePage: 1,
            itemsCountPerPage: 8,
            totalRecords: undefined,
            pageRangeDisplayed: 5,
            isLoading: true,
            modelBoxData: false,
        };

        this.pageChange = this.pageChange.bind(this);
        this.notificationActionHandlers = this.notificationActionHandlers.bind(this);
    }

    getLabelClassByType(type) {


        switch (type) {
            case "Error":
                return "label label-sm label-danger";
            case "Info":
                return "label label-sm label-info";
            case "Warning":
                return "label label-sm label-warning";
            default:
                return "label label-sm label-success";

        }

    }

    getNotificationHTML(sd, index) {
        return <a key={index.toString()} href="javascript:"
            onClick={this.navigateNotification.bind(this, sd.action)}>
            <li>
                <div className="col1">
                    <div className="cont">
                        <div className="cont-col1">
                            <div
                                className={this.getLabelClassByType(sd.type)}>
                                <i className="fa fa-bell-o" />
                            </div>
                        </div>
                        <div className="cont-col2">
                            <div className="desc"> {sd.text}</div>
                        </div>
                    </div>
                </div>
                <div className="col2">
                    <div
                        className="date"> {this.calculateNotificationTime(sd.createdAt)} </div>
                </div>
            </li>
        </a>
    }

    navigateNotification(url) {
        browserHistory.push(url);
    }

    componentWillMount() {
        let notificationRequest = {
            "page": {
                "currentPageNo": this.state.activePage,
                "pageSize": this.state.itemsCountPerPage
            },
            "sortBy": {
                "createdAt": -1
            }
        };
        this.props.actions.generalProcess(constants.getNotificationData, notificationRequest);
    }

    pageChange(activePage) {
        let notificationRequest = {
            "page": {
                "currentPageNo": activePage,
                "pageSize": this.state.itemsCountPerPage
            },
            "sortBy": {
                "createdAt": -1
            }
        };
        this.props.actions.generalProcess(constants.getNotificationData, notificationRequest);
        this.setState({ isLoading: true, currentPageNo: activePage });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notificationDetailData) {
            this.setState({
                notificationDetailData: nextProps.notificationDetailData.data,
                totalRecords: nextProps.notificationDetailData.pageData.totalRecords,
                activePage: nextProps.notificationDetailData.pageData.currentPageNo,
                isLoading: false
            });
        }
    }

    calculateNotificationTime(startdate) {


        let YEAR = 1000 * 60 * 60 * 24 * 365;
        let enddate = new Date();
        //alert(enddate)
        startdate = new Date(startdate)
        let ldifference = enddate.getTime() - startdate    //.getTime();

        let arr = [1, 12, 30, 24, 60, 60, 1000]
        let arr2 = ['year', 'month', 'day', 'hr', 'min', 'sec', 'ms']
        let sCumulative = 1;

        for (let i = 0; i <= arr.length; i++) {
            sCumulative = sCumulative * arr[i];
            let delta = 0;
            delta = ldifference / YEAR * sCumulative;
            let difference = Math.floor(delta);

            if (difference >= 1) {
                let placeholder = arr2[i];

                if (difference > 1) {
                    placeholder = placeholder + 's';
                }
                //alert(difference + ' ' + placeholder)
                return difference + ' ' + placeholder;


            }
        }
    }

    componentDidMount() {

    }

    notificationActionHandlers({ actionName, index }) {
        let data = this.state.notificationDetailData[index];
        switch (actionName) {
            case "Archive":
                this.props.actions.generalProcess(constants.notificationViewed, requestCreator.createNotificationViewedRequest({
                    _id: data._id
                }));
                break;
            case "View":
                this.navigateNotification(data.action);
                break;
            default:
                alert("Action type not found");
        }
    }

    updateState = (data) => {
        this.setState(data);
    }

    render() {

        let modalAction = [
            {
                type: "modal",
                className: "btn btn-default",
                label: utils.getLabelByID("Close"),
                icon: "close",
                actionHandler: this.updateState.bind(this, {
                    modelBoxData: false
                })
            }
        ]
        if (this.state.notificationDetailData) {
            return (
                <div>
                    <ModalBox isOpen={this.state.modelBoxData ? true : false}>
                        <Portlet title={utils.getLabelByID("Details")} actions={modalAction}>
                            {(()=>{
                                if(this.state.modelBoxData){
                                    return this.state.modelBoxData.replace(/(.{60})/g, "$1\n");
                                }
                            })()}
                        </Portlet>
                    </ModalBox>
                    <div className="row">

                        <div className="col-sm-12">
                            <Portlet title={""}>

                                <div className="alert alert-info">
                                    <span className={"label label-sm label-danger"}>
                                        <i className="fa fa-bell-o" />
                                    </span>
                                    <strong>{" Error   "}</strong>
                                    <span className={"label label-sm label-info"}>
                                        <i className="fa fa-bell-o" />
                                    </span>
                                    <strong>{" Info  "}</strong>

                                    <span className={"label label-sm label-warning"}>
                                        <i className="fa fa-bell-o" />
                                    </span>
                                    <strong>{" Warning  "}</strong>

                                    <span className={"label label-sm label-success"}>
                                        <i className="fa fa-bell-o" />
                                    </span>
                                    <strong>{" Success"}</strong>
                                </div>





                                <Table
                                    pagination={true}
                                    export={false}
                                    search={false}
                                    gridType={"notifications"}
                                    componentFunction={this.notificationActionHandlers}
                                    gridColumns={utils.getGridColumnByName("notifications")}
                                    gridData={this.state.notificationDetailData}
                                    totalRecords={this.state.totalRecords}
                                    pageChanged={this.pageChange}
                                    activePage={this.state.activePage}
                                    pageSize={this.state.itemsCountPerPage}
                                    searchCriteria={this.state.filterCriteria}
                                    headerClick={this.sortList}
                                    renderPopupBody={(data) => {
                                        this.updateState({modelBoxData: data});
                                    }}
                                />
                            </Portlet>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}


Notifications.propTypes = {
    notificationDetailData: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        notificationDetailData: state.app.notificationList
    };

}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}

Notifications.displayName = "Notifications_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
