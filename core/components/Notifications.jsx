
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
import DynamicViewCreator from "../common/dynViewCreator.jsx";
import Handler from './notificationHandlers/generalHandler.jsx';

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
            modalBoxNotificationData: null,
            modalBoxNotificationDataIndex: 0,
            handler: null,
            duplicateData: [],
            mappingFields: [],
            popupdata: {},
            mappingFieldsSections: [],
            viewBag: []

        };

        this.pageChange = this.pageChange.bind(this);
        this.notificationActionHandlers = this.notificationActionHandlers.bind(this);
        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
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
            onClick={this.viewNotification.bind(this, sd.action)}>
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

    viewNotification(type, index) {
        let data = this.state.notificationDetailData[index];
        if (data.handler) {
            this.setState({
                popupdata: data, modelBoxData: true
            })
        }
        // browserHistory.push(url);
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

        nextProps.notificationDetailData.data.forEach(element => {
            element.actions = [
                {
                    "label": "Archive",
                    "iconName": "fa fa-archive",
                    "actionType": "COMPONENT_FUNCTION"
                }, {
                    "label": "View",
                    "iconName": "fa fa-eye",
                    "actionType": "COMPONENT_FUNCTION"
                }]
        });
        if (nextProps.notificationDetailData) {
            this.setState({
                notificationDetailData: nextProps.notificationDetailData.data,
                totalRecords: nextProps.notificationDetailData.pageData.totalRecords,
                activePage: nextProps.notificationDetailData.pageData.currentPageNo,
                isLoading: false
            });
        }
        if (nextProps.getMappingFields) {
            this.mapMappingFieldData(nextProps.getMappingFields)
        }
    }


    mapMappingFieldData(mappingFields) {
        const { result: { fields, sections } } = mappingFields;

        let popUpSections = JSON.parse(JSON.stringify(sections))
        popUpSections = popUpSections.map(obj => {
            obj.displayImage = false
            return obj
        })

        this.setState({
            mappingFields: fields,
            mappingFieldsSections: popUpSections
        })
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
                let notificationRequest = {
                    "page": {
                        "currentPageNo": this.state.activePage,
                        "pageSize": this.state.itemsCountPerPage
                    },
                    "sortBy": {
                        "createdAt": -1
                    },
                    isRead: false
                };
                this.props.actions.generalProcess(constants.getNotificationData, notificationRequest);
                break;
            case "View":
                this.viewNotification(data.action, index);
                break;
            default:
                alert("Action type not found");
        }
    }

    updateState = (data) => {
        this.setState(data);
    }

    bindModalData = (value) => {
        let { handler, data = null } = value;
        if (data) {
            data = JSON.parse(data);
        }

        console.log(data)
        this.setState({
            modalBoxNotificationData: data,
            modalBoxNotificationDataIndex: 0,
            handler,
            duplicateData: data
        });
    }

    slideLeft() {
        let modalBoxNotificationDataIndex = this.state.modalBoxNotificationDataIndex;
        if (0 <= modalBoxNotificationDataIndex - 1) {
            modalBoxNotificationDataIndex = modalBoxNotificationDataIndex - 1
            this.setState({
                modalBoxNotificationDataIndex
            })
        }
    }

    slideRight() {
        let modalBoxNotificationDataIndex = this.state.modalBoxNotificationDataIndex;
        if (this.state.duplicateData.length > modalBoxNotificationDataIndex + 1) {
            modalBoxNotificationDataIndex = modalBoxNotificationDataIndex + 1
            this.setState({
                modalBoxNotificationDataIndex
            })
        }
    }


    render() {

        let modalAction = [
            {
                type: "modal",
                className: "btn btn-default",
                label: '',
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
                            <Handler handler={this.state.popupdata.handler} data={this.state.popupdata} />
                        </Portlet>
                    </ModalBox>
                    <div className="col-sm-12">
                        <Portlet title={""}>

                            <div className="note note-documentation">
                                <span className={"label label-sm label-danger"}>
                                    <i className="fa fa-bell-o" />
                                </span>
                                <strong >{" Error   "}</strong>
                                <span style={{ marginLeft: "10px" }} className={"label label-sm label-info"}>
                                    <i className="fa fa-bell-o" />
                                </span>
                                <strong>{" Info  "}</strong>

                                <span style={{ marginLeft: "10px" }} className={"label label-sm label-warning"}>
                                    <i className="fa fa-bell-o" />
                                </span>
                                <strong>{" Warning  "}</strong>

                                <span style={{ marginLeft: "10px" }} className={"label label-sm label-success"}>
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
                                    this.updateState({ modelBoxData: data });
                                }}
                            // bindModalData={(data) => {
                            //     this.bindModalData(data)
                            // }}
                            />
                        </Portlet>
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
