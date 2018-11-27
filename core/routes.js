/*standard imports*/
import React from 'react';
import master from './master.jsx';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import Login from './components/AuthenticationScreens/Login.jsx';
import notification from './components/Notifications.jsx';
import auth from './auth/authenticator';
import EmailTemplateSearch from './components/EmailTemplateSearchScreen/EmailTemplateSearchContainer.jsx';
import EmailTemplateSetup from './components/EmailTemplateSetupScreen/EmailTemplateSetupContainer.jsx';
import OrgSearch from './components/OrgSearchScreen/OrgSearchContainer.jsx';
import OrgSetup from './components/OrgSetupScreen/OrgSetupContainer.jsx';
import GroupSearch from './components/GroupSearchScreen/GroupSearchContainer.jsx';
import GroupSetup from './components/GroupSetupScreen/GroupSetupContainer.jsx';
import UserSearch from './components/UserSearchScreen/UserSearchContainer.jsx';
import UserSetup from './components/UserSetupScreen/UserSetupContainer.jsx';
import WorkingCalendar from './components/WorkingCalendar/WorkingCalContainer.jsx';
import ChangePassword from './components/AuthenticationScreens/changePassword.jsx';
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
import CommissionTemplateSearch from './components/CommissionTemplateSearchScreen/CommissionTemplateSearchContainer.jsx';
import CommissionTemplateSetup from './components/CommissionTemplateSetupScreen/CommissionTemplateSetupContainer.jsx';
import AuditLogList from './components/AuditLogScreen/auditLogList.jsx';

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
import Documentation from "./components/Documentation/DocumentationContainer.jsx";
import ModuleDefinitionScreen from "./components/ModuleScreen/ModuleDefinitionScreen.jsx";
import dispatchList from "./components/dispatchSource/dispatchList.jsx";
import AddUpdateDispatcher from "./components/dispatchSource/dispatchContainer.jsx";
import CreateChannel from './components/Channel/CreateChannel.jsx';
import JoinChannel from './components/Channel/JoinChannel.jsx';
import PlayGround from './components/Channel/Playground.jsx'

export default (
  <Router history={browserHistory}>
    <Route path="/Documentation/:useCase/:route" component={Documentation} />
    <Route path="/Locked" component={Locked} onEnter={isAuthorized}/>
    <Route path="/cipher/login" component={Login} onEnter={isAuthorized}/>
    <Route path="/blockChainViewer/:blockChainID" component={BlockchainViewerQR} onEnter={isAuthorized}/>
    {ApplicationsRoute.unAuthRouteIndex}
    <Route component={master} onEnter={requireAuth}>
      {/*<IndexRoute component={blockchainWorkboard}/>*/}
      <Route path="/blockchain" component={blockchainWorkboard}/>
      <Route path="/groupList" component={GroupSearch}/>
      <Route path="/groupSetup" component={GroupSetup}/>
      <Route path="/groupSetup/:groupID" component={GroupSetup}/>
      <Route path="/userList" component={UserSearch}/>
      <Route path="/userSetup" component={UserSetup}/>
      <Route path="/userSetup/:userID" component={UserSetup}/>
      <Route path="/workingCalendarDetail" component={WorkingCalendar}/>

      <Route path="/cipher/blockchain/edit" component={BlockchainEditor}/>
      <Route path="/cipher/blockchain/blockSearch" component={BlockSearchScreen}/>
      <Route path="/cipher/blockchain/blockSearch/:blockNumber" component={BlockSearchScreen}/>
      <Route path="/cipher/blockchain/hashSearch" component={HashSearchScreen}/>
      <Route path="/cipher/blockchain/hashSearch/:hash" component={HashSearchScreen}/>
      <Route path="/cipher/consortiumSearch" component={ConsortiumSearch}/>
      <Route path="/cipher/consortiumSetup" component={ConsortiumSetup}/>
      <Route path="/cipher/consortiumSetup/:mode/:consortiumID" component={ConsortiumSetup}/>
      <Route path="/cipher/consortiums/:consortiumID/smartContracts/:smartContactID" component={SmartContract}/>
      <Route path="/cipher/:consortiumID/smartContractFiles/:smartContractIndex" component={SmartContractFileViewer}/>




			<Route path="/hyperledger/blockSearch" component={HyperledgerBlockSearchScreen}/>
			<Route path="/hyperledger/blockSearch/:blockNumber" component={HyperledgerBlockSearchScreen}/>
			<Route path="/hyperledger/hashSearch" component={HyperledgerHashSearchScreen}/>
			<Route path="/hyperledger/hashSearch/:hash" component={HyperledgerHashSearchScreen}/>
      <Route path="/hyperledger/workboard" component={HyperledgerWorkboard}/>


      <Route path="/pickupListSearch" component={PickupListSearch}/>
      <Route path="/pickupListSetup" component={PickupListSetup}/>
      <Route path="/pickupListSetup/edit/:pickupListID" component={PickupListSetup}/>

      <Route path="/changePassword" component={ChangePassword}/>
      <Route path="/passwordPolicy" component={PasswordPolicy}/>
      <Route path="/APIPayloadSearch" component={APIPayloadSearch}/>
      <Route path="/APIPayloadSearch/:payLoadField/:payLoadFieldValue" component={APIPayloadSearch}/>

      <Route path="/auditLogList" component={AuditLogList}/>
      <Route path="/healthMonitor" component={HealthMonitor}/>

      <Route path="/fileTemplateSearch" component={FileTemplateSearch}/>
      <Route path="/fileTemplateSetup" component={FileTemplateSetup}/>
      <Route path="/fileTemplateSetup/edit/:fileTemplateID" component={FileTemplateSetup}/>

      <Route path="/commissionTemplateSearch" component={CommissionTemplateSearch}/>
      <Route path="/commissionTemplateSetup" component={CommissionTemplateSetup}/>
      <Route path="/commissionTemplateSetup/edit/:commissionTemplateID" component={CommissionTemplateSetup}/>

      <Route path="/notification" component={notification}/>
      <Route path="/emailTemplateSearch" component={EmailTemplateSearch}/>
      <Route path="/emailTemplateSetup" component={EmailTemplateSetup}/>
      <Route path="/emailTemplateSetup/edit/:emailTemplateID" component={EmailTemplateSetup}/>

      <Route path="/orgSearch" component={OrgSearch}/>
      <Route path="/orgSetup" component={OrgSetup}/>
      <Route path="/orgSetup/:mode/:orgID" component={OrgSetup}/>




      <Route path="/eventList" component={eventList}/>
      <Route path="/editEventRegistry/:eventName" component={AddUpdateEventList}/>
      <Route path="/dispatchQueue" component={DispatchQueue}/>
      <Route path="/datasourceList" component={DataSourceList}/>
      <Route path="/editDatasource/:datasource" component={AddUpdateDataSource}/>

      <Route path="/editMapping/:mappingName" component={AddUpdateMapping}/>
      <Route path="/mappingList" component={MappingList}/>


      <Route path="/APIDefScreen/:useCase/:route" component={APIDefScreen}/>
      <Route path="/ApiList" component={ApiList}/>
      <Route path="/ModuleList" component={ModuleList}/>
      <Route path="/editModule(/:id)" component={ModuleDefinitionScreen}/>
      <Route path="/DispatchList" component={dispatchList}/>
      <Route path="/editDispatcher/:dispatcherName" component={AddUpdateDispatcher}/>

      <Route path="/CreateChannel" component={CreateChannel}/>
      <Route path="/JoinChannel" component={JoinChannel}/>
      <Route path="/Playground" component={PlayGround}/>
      
      {ApplicationsRoute.routesIndex}
    </Route>
    <Route path="*" components={NotFound}/>
  </Router>
);


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {

    replace({
      pathname: '/cipher/login',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}

function isAuthorized(nextState, replace) {
  if (auth.loggedIn()) {

    replace({
      pathname: '/blockchain',
      state: {nextPathname: nextState.location.pathname}
    })
  }


}