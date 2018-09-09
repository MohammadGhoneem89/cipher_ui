/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import * as actions from './core/actions/generalAction';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import IdleTimer from 'react-idle-timer';





/*container specific imports*/
import Bradecums from './core/standard/Bradecums.jsx';
import Header from './core/standard/Header.jsx';
import Sidebar from './core/standard/Sidebar.jsx';
import Footer from './core/standard/Footer.jsx';
import $ from 'jquery';
import EMD from './core/components/errorMessage.jsx';
/*global constants import*/
import * as constants from './constants/Communication.js';
import * as utils from './core/common/utils.js';

import * as requestCreator from './core/common/request.js';
import { Motion, spring } from 'react-motion';
import config from './config';
import auth from './core/auth/authenticator';

class master extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: true
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
		setTimeout(() => this.setState({ loading: false }), 500);

	}

	getHeader(Title) {
		if (Title !== "EntityWorkboard_Heading" && Title !== "AquirerWorkboard_Heading" && Title !== "SLAWorkboard_Heading" && Title !== "blockchainWorkboard_Heading" && Title !== "KPIEntityWorkBoard_Heading") {
			return (
				<div className="portlet-title">
					<div className="caption"> <span className="caption-subject font-black bold uppercase"> {utils.getLabelByID(Title)} </span>
						<Bradecums componentName={utils.getLabelByID(Title)} />
					</div></div>
			);
		}
	}
	onIdle(){
		auth.lockedUser();
		browserHistory.push('/Locked');
	}

	componentWillMount() {

		
		this.props.actions.openSocket(constants.getSocket);
		this.props.actions.generalProcess(constants.getPermission, { BT: "adasafad" });
		this.props.actions.generalProcess(constants.getUserData, { BT: "adasafad" });
		let notificationRequest = {
			"page": {
				"currentPageNo": 1,
				"pageSize": 5
			},
			"sortBy": {
				"createdAt": -1
			}
		}
		this.props.actions.generalProcess(constants.getNotificationData, notificationRequest);
		console.log(sessionStorage.token);
		console.log("Master" + sessionStorage.lang);

		try {

			requestCreator.changeTheme(sessionStorage.lang);
		} catch (err) {
			console.log("changeTheme event Recieved with Failure");
		}


	}

	render() {

		const { loading } = this.state;
		if (loading) {
			return (<div className="loader">Loading...</div>) // render null when app is not ready
		}

		utils.setLang(sessionStorage.lang);
		var TitleName = this.props.children.type.displayName;
		TitleName = TitleName.replace('Connect', '');
		TitleName = TitleName.replace('(', '');
		TitleName = TitleName.replace(')', '');

		sessionStorage.pageName = TitleName;

		sessionStorage.orgType = this.props.userData.orgType;
		sessionStorage.orgCode = this.props.userData.orgCode
		sessionStorage.userID = this.props.userData.userID;
		sessionStorage.profilePic = this.props.userData.profilePic;
		sessionStorage.firstName = this.props.userData.firstName;

		//this.props.actions.sendWSData();

   return (

		<IdleTimer
      	  ref="idleTimer"
          element={document}
          idleAction={this.onIdle}
          timeout={900000}
          format="MM-DD-YYYY HH:MM:ss.SSS">
			<div>


				<div className="page-header navbar navbar-fixed-top" >
					<Header userData={this.props.userData} notifications={this.props.notificationData} />
				</div>
				<div className="clearfix"> </div>
				<div className="page-container" >
					<Sidebar data={this.props.permissionData} />
					<div className="page-content-wrapper">
						<div className="page-content">
							<EMD errorData={this.props.errorData} />
							<div className="clearfix"> </div>
							<div className="row">
								<div className="col-md-12">
									<div className="portlet light" style={{minHeight: "854px"}}>
										{this.getHeader(TitleName)}
										{this.props.children}
									</div>
								</div>
							</div>
						</div>
						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>

		</IdleTimer>
		);
	}
}



master.propTypes = {
	userData: PropTypes.object,
	permissionData: PropTypes.object,
	notificationData: PropTypes.object,
	errorData: PropTypes.object,
	children: PropTypes.object
};

function mapStateToProps(state, ownProps) {

	return {

		permissionData: state.app.permissionData.data,
		userData: state.app.user.data.searchResult,
		notificationData: state.app.notificationList,
		errorData: state.app.responseMessage.data
	};

}
function mapDispatchToProps(dispatch) {

	return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(master);
