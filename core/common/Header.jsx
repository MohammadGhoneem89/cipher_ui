import React from 'react';
import ReactDOM from 'react-dom';
import Confirmationmodal from './Confirmationmodal.jsx';
import * as Loaders from './loaders.jsx';
import { Link, browserHistory } from 'react-router';
import auth from '../auth/authenticator';

import * as utils from './utils';

import { baseUrl } from '../constants/Communication.js';

class Header extends React.Component {

    constructor(props, context) {
        super(props);
        this.getNotificationCount = this.getNotificationCount.bind(this);
    }

    navigate(index) {
        browserHistory.push(index);
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

    changePassword() {
        browserHistory.push('/changePasswordInternal');
    }
    lock() {
        auth.lockedUser();
        browserHistory.push('/Locked');
    }
    logout() {
        auth.logOut();

        //browserHistory.push('/');
    }

    getCurrentDateTime() {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let d = new Date();
        let day = days[d.getDay()];
        let hr = d.getHours();
        let min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        let ampm = "am";
        if (hr > 12) {
            hr -= 12;
            ampm = "pm";
        }
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let x = document.getElementById("time");
        return (<span> {day + " " + date + " " + month + " " + year + " " + hr + ":" + min + ampm} </span>);
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

    getNotificationCount() {
        try {
            return this.props.notifications.pageData.totalRecords

        }
        catch (ex) {
            return 0
        }

    }


    render() {
        if (this.props.notifications.data) {
            return (
                <div className="page-header-inner ">
                    <div className="page-logo">
                        
                    </div>
                    <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>

                    <div className="page-top">
                        <div className="top-menu">
                            <ul className="nav navbar-nav pull-right">
                                <li style={{ paddingTop: "25px", paddingRight: "16px", paddingBottom: "19px", paddingLeft: "16px" }}>
                                    <span id="lblLoginInfo" className="m-r-sm text-muted welcome-message" >Last Login: {this.getCurrentDateTime()}</span>
                                </li>

                                <li className="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                                    {/* <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                        <i className="icon-bell" />
                                        <span className="badge badge-default"> {this.getNotificationCount()}  </span>
                                    </a> */}
                                    <ul className="dropdown-menu">
                                        <li className="external">
                                            <h3>
                                                <span className="bold">{this.getNotificationCount()} {utils.getLabelByID("header_pending")}</span> {utils.getLabelByID("Notifications_Heading")}</h3>
                                            <a href="javascript:;" onClick={this.navigate.bind(this, "/notification")}>{utils.getLabelByID("header_view_all")}</a>
                                        </li>
                                        <li>
                                            <ul className="dropdown-menu-list scroller" style={{ overflowY: "scroll", "height": "250px" }} data-handle-color="#637283">

                                                {
                                                    this.props.notifications.data.map((sd, index) => (

                                                        <li key={index.toString()}>
                                                            <a href="javascript:;" style={{ textDecorations: "none" }} onClick={this.navigate.bind(this, sd.action)}>
                                                                <span className="time">{this.calculateNotificationTime(sd.createdAt)}</span>
                                                                <span className="details">
                                                                    <span className={this.getLabelClassByType(sd.type)}>
                                                                        <i className="fa fa-bell" />
                                                                    </span><b>{'\u00A0'}</b> {sd.text}</span>
                                                            </a>
                                                        </li>
                                                    ))
                                                }

                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                <li className="dropdown dropdown-user">
                                    <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                        <img alt="" className="img-circle" src={baseUrl + this.props.userData.profilePic} />
                                        <span className="username username-hide-on-mobile">{this.context.lang} {this.props.userData.firstName} {this.props.userData.lastName}  </span>
                                        <i className="fa fa-angle-down" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-default">

                                        <li>
                                            <a href="javascript:;" onClick={this.logout.bind(this)} >
                                                <i className="icon-key" /> {utils.getLabelByID("header_logout")} </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" onClick={this.lock.bind(this)} >
                                                <i className="icon-lock" /> {utils.getLabelByID("header_lock")} </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" onClick={this.changePassword.bind(this)} >
                                                <i className="icon-user" /> {utils.getLabelByID("header_changePassword")} </a>
                                        </li>
                                    </ul>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>)
            // return Loaders.dotted()
        }
    }
}

export default Header;