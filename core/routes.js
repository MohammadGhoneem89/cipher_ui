/*standard imports*/
import React from 'react';
import master from './master.jsx';
import Cookies from 'js-cookie';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Login from './components/AuthenticationScreens/Login.jsx';
import notification from './components/Notifications.jsx';
import auth from './auth/authenticator';
import EmailTemplateSearch from './components/EmailTemplateSearchScreen/EmailTemplateSearchContainer.jsx';
import EmailTemplateSetup from './components/EmailTemplateSetupScreen/EmailTemplateSetupContainer.jsx';
import OrgSearch from './components/OrgSearchScreen/OrgSearchContainer.jsx';
import OrgSetup from './components/OrgSetupScreen/OrgSetupContainer.jsx';
import GroupSearch from './components/GroupSearchScreen/GroupSearchContainer.jsx';
import ErrorCodeList from './components/errorCode/errorCodeList.jsx';
import GroupSetup from './components/GroupSetupScreen/GroupSetupContainer.jsx';
import UserSearch from './components/UserSearchScreen/UserSearchContainer.jsx';
import UserSetup from './components/UserSetupScreen/UserSetupContainer.jsx';
import WorkingCalendar from './components/WorkingCalendar/WorkingCalContainer.jsx';
import ChangePassword from './components/AuthenticationScreens/changePassword.jsx';
import permissionAdd from './components/AuthenticationScreens/permissionAdd.jsx';
import PasswordPolicy from './components/PasswordPolicyScreen/PasswordPolicyContainer.jsx';
import PickupListSearch from './components/PickupListSearchScreen/PickupListSearchContainer.jsx';
import PickupListSetup from './components/PickupListSetupScreen/PickupListSetupContainer.jsx';
import APIPayloadSearch from './components/APIPayloadScreen/APIPayloadList.jsx';
import BlockchainViewerQR from './components/Blockchain/Viewer/BlockchainViewerQR.jsx';
import BlockSearchScreen from './components/Blockchain/BlockSearchScreen/BlockSearchScreenContainer.jsx';
import HashSearchScreen from './components/Blockchain/HashSearchScreen/HashSearchScreenContainer.jsx';
import BlockchainEditor from './components/Blockchain/Editor/BlockchainEditorContainer.jsx';
import ConsortiumSearch from './components/Blockchain/ConsortiumSearchScreen/ConsortiumSearchContainer.jsx';
import ConsortiumSetup from './components/Blockchain/ConsortiumSetupScreen/ConsortiumSetupContainer.jsx';
import SmartContract from './components/Blockchain/SmartContractScreen/SmartContract.jsx';
import SmartContractFileViewer from './components/Blockchain/SmartContractScreen/SmartContractFileViewer.jsx';
import blockchainWorkboard from './components/Blockchain/blockchainWorkboard.jsx';
import HealthMonitor from './components/HealthMonitor.jsx';
import ApplicationsRoute from '../applications/routesIndex';
import Locked from './components/AuthenticationScreens/Locked.jsx';
import FileTemplateSearch from './components/FileTemplateSearchScreen/FileTemplateSearchContainer.jsx';
import FileTemplateSetup from './components/FileTemplateSetupScreen/FileTemplateSetupContainer.jsx';
import CommissionTemplateSearch
  from './components/CommissionTemplateSearchScreen/CommissionTemplateSearchContainer.jsx';
import CommissionTemplateSetup from './components/CommissionTemplateSetupScreen/CommissionTemplateSetupContainer.jsx';
import AuditLogList from './components/AuditLogScreen/auditLogList.jsx';

import ChangeTrackingLog from "./components/ChangeTrackingLog/changeTrackingList.jsx";

import NotFound from "./components/NotFound.jsx";

import eventList from './components/eventService/eventList.jsx';
import AddUpdateEventList from './components/eventService/addUpdateEvent.jsx';
import DataSourceList from './components/dataSource/datasourceList.jsx';
import AddUpdateDataSource from './components/dataSource/addUpdateDatasource.jsx';
import DispatchQueue from './components/dispatchSource/dispatchQueue.jsx'

import HyperledgerBlockSearchScreen from './components/hyperledger/BlockSearchScreen/BlockSearchScreenContainer.jsx';
import HyperledgerHashSearchScreen from './components/hyperledger/HashSearchScreen/HashSearchScreenContainer.jsx';
import HyperledgerWorkboard from './components/hyperledger/blockchainWorkboard.jsx';

import AddUpdateMapping from './components/mappingConfig/addUpdateMapping.jsx';
import MappingList from './components/mappingConfig/mappingList.jsx';

import APIDefScreen from "./components/APIDefScreen/APIDefScreenContainer.jsx";
import ApiList from "./components/APIDefScreen/apiList.jsx";
import ModuleList from "./components/ModuleScreen/moduleList.jsx";
import GeneratePDF from "./components/generatePDF/generatePDF";
import ModuleDefinitionScreen from "./components/ModuleScreen/ModuleDefinitionScreen.jsx";
import dispatchList from "./components/dispatchSource/dispatchList.jsx";
import AddUpdateDispatcher from "./components/dispatchSource/dispatchContainer.jsx";
import NetworkDefination from "./components/BLAConfiguration/NetworkDefinitionScreen.jsx";
import RelayNetworkDefination from "./components/RelayConfig/RelayNetworkDefinitionScreen.jsx";


import NetworkList from "./components/BLAConfiguration/networkList.jsx";
import RelayNetworkList from "./components/RelayConfig/relayNetworkList.jsx";

import CreateChannel from './components/Channel/CreateChannel/CreateChannelContainer.jsx';
import ChannelList from './components/Channel/CreateChannel/channelList.jsx';
import SmartContractList from './components/Channel/CreateSmartContract/smartcontractList.jsx';
import CreateConsortium from './components/Channel/CreateConsortium/CreateConsortiumContainer.jsx';
import APIDocumentation from './components/APIDefScreen/APIDocumentation.js';
import SmartPlayGround from './components/Channel/SmartPlayGround/SmartContractPlayground.jsx';
import CreateSmartContract from './components/Channel/CreateSmartContract/CreateSmartContractContainer.jsx';
import vault from './components/vaultGenerator/generator.jsx';
import vaultYaml from './components/vaultGenerator/generatorYAML.jsx';
import EndPointList from './components/endPoint/list';
import EndPointDefination from './components/endPoint/defination';
import ApiImport from './components/apiImport/apiImport.jsx';


import UserDetail from "./components/reports/UserDetails.js";
import UserRole from "./components/reports/UserRole.js";
import RoleUser from "./components/reports/RoleUser.js";
import ActivityLog from "./components/reports/ActivityLog.js";

// Moved screens from etisalat ----------
import FileList from "./components/Files/FileList.jsx";
import FileData from "./components/Files/FileData.jsx";

//onBoarding Routes
import onBoardingProfileSetup from './components/onBoarding/onBoardingProfileSetup';
import onBoardingProfileList from './components/onBoarding/onBoardingProfileList';
import WorkingCalendarSearch from './components/WorkingCalendar/WorkingCalendarSearch.jsx';
import Task from "./components/Task.jsx"
import ReportRender from "./components/report/reportRender.jsx"
import ReportContainer from "./components/report/reportContainer.jsx"
import ReportList from "./components/report/reportList.jsx"
import reportRenderList from "./components/report/reportRenderList.jsx"
import TaskDetails from "./components/TaskDetails.jsx"
import documentList from "./components/Consent/List.jsx"
import addDocType from "./components/Consent/Container.jsx"
import ConsentProfile from "./components/ConsentProfile/Container.jsx"
import ConsentProfileList from "./components/ConsentProfile/List.jsx"
import ConsentStatus from "./components/ConsentStatusNew/List.jsx"
import ConsentHistory from "./components/ConsentHistoryNew/List.jsx"

import safLogs from "./components/saf/dispatchQueue.jsx"
import APITemplateList from '../core/components/APITemplate/APITemplateList';
import APITemplateEdit from '../core/components/APITemplate/APITemplateEdit';
import APITemplateTest from '../core/components/APITemplate/APITemplateTest';

// letter Routes
import TemplateList from '../core/components/templateEngine/templateList.jsx';
// import SampleTemplate from '../core/components/templateEngine/addSampleTemplate.jsx';
import DocumentationContainer from "./components/DocumentationCode/DocumentationContainer.jsx";

import MongoDBChangesContainer from './components/mongoUtility/mongoDBChangesContainer.jsx';
import RelationalDBChangesContainer from './components/RelationalDBChangesUtility/RelationalDBChangesContainer.jsx';
import CryptographyContainer from './components/cryptoUtility/cryptographyContainer.jsx'
import templateDetails from './components/templateEngine/template-details.jsx';
import testTemplateDetails from './components/templateEngine/test-template-details.jsx';
export default (<Router history={browserHistory}>

  <Route path="/Documentation/:useCase/:route" component={GeneratePDF} />
  <Route path="/Locked" component={Locked} onEnter={isAuthorized} />
  <Route path="/changePassword" component={ChangePassword} onEnter={isAuthorized} />
  <Route path="/cipher/login" component={Login} onEnter={isAuthorized} />
  <Route path="/blockChainViewer/:blockChainID" component={BlockchainViewerQR}
    onEnter={isAuthorized} /> {ApplicationsRoute.unAuthRouteIndex}
  <Route component={master} onEnter={requireAuth}> { /*


        <IndexRoute component={blockchainWorkboard}/>*/}
    <Route path="/DocumentationCode/:smartcontract" component={DocumentationContainer} />
    <Route path="/task" component={Task} />
    <Route path="/taskDetails/:id" component={TaskDetails} />
    <Route path="/blockchain" component={blockchainWorkboard} />
    <Route path="/groupList" component={GroupSearch} />
    <Route path="/groupSetup" component={GroupSetup} />
    <Route path="/groupSetup/:groupID" component={GroupSetup} />
    <Route path="/userList" component={UserSearch} />
    <Route path="/userSetup" component={UserSetup} />
    <Route path="/errorCodeList" component={ErrorCodeList} />
    <Route path="/workingCalendarList" component={WorkingCalendarSearch} />
    <Route path="/workingCalendarDetail/:ID" component={WorkingCalendar} />
    <Route path="/workingCalendarDetail" component={WorkingCalendar} />
    <Route path="/changePasswordInternal" component={ChangePassword} />
    <Route path="/permissionAdd/:link" component={permissionAdd} />
    <Route path="/userSetup/:userID" component={UserSetup} />
    <Route path="/userChecker/:checkerID" component={UserSetup} />
    <Route path="/workingCalendarDetail" component={WorkingCalendar} />
    <Route path="/cipher/blockchain/edit" component={BlockchainEditor} />
    <Route path="/cipher/blockchain/blockSearch" component={BlockSearchScreen} />
    <Route path="/cipher/blockchain/blockSearch/:blockNumber" component={BlockSearchScreen} />
    <Route path="/cipher/blockchain/hashSearch" component={HashSearchScreen} />
    <Route path="/cipher/blockchain/hashSearch/:hash" component={HashSearchScreen} />
    <Route path="/cipher/consortiumSearch" component={ConsortiumSearch} />
    <Route path="/cipher/consortiumSetup" component={ConsortiumSetup} />
    <Route path="/cipher/consortiumSetup/:mode/:consortiumID" component={ConsortiumSetup} />
    <Route path="/cipher/consortiums/:consortiumID/smartContracts/:smartContactID" component={SmartContract} />
    <Route path="/cipher/:consortiumID/smartContractFiles/:smartContractIndex" component={SmartContractFileViewer} />

    <Route path="/hyperledger/blockSearch" component={HyperledgerBlockSearchScreen} />
    <Route path="/hyperledger/blockSearch/:blockNumber" component={HyperledgerBlockSearchScreen} />
    <Route path="/hyperledger/hashSearch" component={HyperledgerHashSearchScreen} />
    <Route path="/hyperledger/hashSearch/:hash" component={HyperledgerHashSearchScreen} />

    <Route path="/hyperledger/workboard" component={HyperledgerWorkboard} />
    <Route path="/pickupListSearch" component={PickupListSearch} />
    <Route path="/pickupListSetup" component={PickupListSetup} />
    <Route path="/pickupListSetup/edit/:pickupListID" component={PickupListSetup} />
    <Route path="/apiTemplate" component={APITemplateList} />
    <Route path="/apiTemplate/:id" component={APITemplateEdit} />
    <Route path="/apiTemplate/test/:id" component={APITemplateTest} />
    <Route path="/passwordPolicy" component={PasswordPolicy} />
    <Route path="/APIPayloadSearch" component={APIPayloadSearch} />
    <Route path="/APIPayloadSearch/:payLoadField/:payLoadFieldValue" component={APIPayloadSearch} />
    <Route path="/auditLogList" component={AuditLogList} />
    <Route path="/ChangeTrackingLog" component={ChangeTrackingLog} />
    <Route path="/healthMonitor" component={HealthMonitor} />
    <Route path="/fileTemplateSearch" component={FileTemplateSearch} />
    <Route path="/fileTemplateSetup" component={FileTemplateSetup} />
    <Route path="/fileTemplateSetup/edit/:fileTemplateID" component={FileTemplateSetup} />
    <Route path="/commissionTemplateSearch" component={CommissionTemplateSearch} />
    <Route path="/commissionTemplateSetup" component={CommissionTemplateSetup} />
    <Route path="/commissionTemplateSetup/edit/:commissionTemplateID" component={CommissionTemplateSetup} />
    <Route path="/notification" component={notification} />
    <Route path="/emailTemplateSearch" component={EmailTemplateSearch} />
    <Route path="/emailTemplateSetup" component={EmailTemplateSetup} />
    <Route path="/emailTemplateSetup/edit/:emailTemplateID" component={EmailTemplateSetup} />
    <Route path="/orgSearch" component={OrgSearch} />
    <Route path="/orgSetup" component={OrgSetup} />
    <Route path="/orgSetup/:mode/:orgID" component={OrgSetup} />
    <Route path="/eventList" component={eventList} />
    <Route path="/editEventRegistry/:eventName" component={AddUpdateEventList} />
    <Route path="/dispatchQueue" component={DispatchQueue} />
    <Route path="/datasourceList" component={DataSourceList} />
    <Route path="/editDatasource/:datasource" component={AddUpdateDataSource} />
    <Route path="/editMapping/:mappingName" component={AddUpdateMapping} />
    <Route path="/mappingList" component={MappingList} />
    <Route path="/APIDefScreen/:useCase/:route" component={APIDefScreen} />
    <Route path="/ApiList" component={ApiList} />
    <Route path="/NetworkList" component={NetworkList} />
    <Route path="/RelayNetworkList" component={RelayNetworkList} />
    <Route path="/safLogs" component={safLogs} />
    <Route path="/ModuleList" component={ModuleList} />
    <Route path="/ReportRender/(:id)" component={ReportRender} />
    <Route path="/ReportAddUpdate/(:id)" component={ReportContainer} />
    <Route path="/ReportList" component={ReportList} />
    <Route path="/ReportRenderList" component={reportRenderList} />
    <Route path="/editModule(/:id)" component={ModuleDefinitionScreen} />
    <Route path="/DispatchList" component={dispatchList} />
    <Route path="/editDispatcher/:dispatcherName" component={AddUpdateDispatcher} />
    <Route path="/documentList" component={documentList} />
    <Route path="/addDocType/(:id)" component={addDocType} />
    <Route path="/ConsentProfileList" component={ConsentProfileList} />
    <Route path="/ConsentProfile/(:id)" component={ConsentProfile} />
    <Route path="/ConsentStatus" component={ConsentStatus} />

    <Route path="/ConsentHistory" component={ConsentHistory} />

    <Route path="/general/userDetail/:id" component={UserDetail} />
    <Route path="/general/userRole/:id" component={UserRole} />
    <Route path="/general/roleUser/:id" component={RoleUser} />
    <Route path="/general/activityLog/:id" component={ActivityLog} />

    <Route path="/editRelayNetwork(/:id)" component={RelayNetworkDefination} />
    <Route path="/editNetwork(/:id)" component={NetworkDefination} />
    <Route path="/CreateChannel/:id" component={CreateChannel} />
    <Route path="/ChannelList" component={ChannelList} />
    <Route path="/CreateSmartContract/:id" component={CreateSmartContract} />
    <Route path="/SmartContractList" component={SmartContractList} />
    <Route path="/SmartPlayGround(/:id)" component={SmartPlayGround} />
    <Route path="/CreateConsortium/:id" component={CreateConsortium} />
    <Route path="/configJs" component={vault} />
    <Route path="/configYaml" component={vaultYaml} />
    <Route path="/CreateChannel" component={CreateChannel} />
    <Route path="/apiDocumentation" component={APIDocumentation} />
    <Route path="/apiImport" component={ApiImport} />
    <Route path="/onBoardingProfile/setup" component={onBoardingProfileSetup} />
    <Route path="/onBoardingProfile/setup/:id" component={onBoardingProfileSetup} />
    <Route path="/onBoardingProfile" component={onBoardingProfileList} />
    <Route path="/endpoint" component={EndPointList} />
    <Route path="/endpoint/:id" component={EndPointDefination} />
    <Route path="/fileList" component={FileList} />
    <Route path="/fileList/:type" component={FileList} />
    <Route path="/fileData/:id" component={FileData} />
    <Route path="/mongoUtility" component={MongoDBChangesContainer} />
    <Route path="/RelationalDBChangesUtility" component={RelationalDBChangesContainer} />
    <Route path="/cryptoUtility" component={CryptographyContainer} />

    <Route path="/templateList" component={TemplateList} />
    <Route path="/templateList/:id" component={templateDetails} />
    <Route path="/templateList/test/:id" component={testTemplateDetails} />
    {ApplicationsRoute.routesIndex}
  </Route>
  <Route path="*" components={NotFound} />
</Router>
);


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    Cookies.remove("login");
    Cookies.remove("token");
    sessionStorage.removeItem('token');
    replace({
      pathname: '/cipher/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function isAuthorized(nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: sessionStorage.firstScreen,
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
