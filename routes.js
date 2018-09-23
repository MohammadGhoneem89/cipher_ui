/*standard imports*/
import React from 'react';
import master from './master.jsx';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
/*container imports*/
import Login from './core/components/Login.jsx';


import notification from './containers/Notifications.jsx';
import auth from './core/auth/authenticator';
import EmailTemplateSearch from './core/components/EmailTemplateSearchScreen/EmailTemplateSearchContainer.jsx';
import EmailTemplateSetup from './core/components/EmailTemplateSetupScreen/EmailTemplateSetupContainer.jsx';
import OrgSearch from './core/components/OrgSearchScreen/OrgSearchContainer.jsx';
import OrgSetup from './core/components/OrgSetupScreen/OrgSetupContainer.jsx';
import GroupSearch from './core/components/GroupSearchScreen/GroupSearchContainer.jsx';
import GroupSetup from './core/components/GroupSetupScreen/GroupSetupContainer.jsx';
import UserSearch from './core/components/UserSearchScreen/UserSearchContainer.jsx';
import UserSetup from './core/components/UserSetupScreen/UserSetupContainer.jsx';
import WorkingCalendar from './core/components/WorkingCalendar/WorkingCalContainer.jsx';

import ChangePassword from './containers/changePassword.jsx';
import PasswordPolicy from './core/components/PasswordPolicyScreen/PasswordPolicyContainer.jsx';
import PickupListSearch from './core/components/PickupListSearchScreen/PickupListSearchContainer.jsx';
import PickupListSetup from './core/components/PickupListSetupScreen/PickupListSetupContainer.jsx';
import APIPayloadSearch from './containers/APIPayloadList.jsx';
import BlockchainViewerQR from './core/components/Blockchain/Viewer/BlockchainViewerQR.jsx';
import BlockSearchScreen from './core/components/Blockchain/BlockSearchScreen/BlockSearchScreenContainer.jsx';
import HashSearchScreen from './core/components/Blockchain/HashSearchScreen/HashSearchScreenContainer.jsx';
import BlockchainEditor from './core/components/Blockchain/Editor/BlockchainEditorContainer.jsx';
import ConsortiumSearch from './core/components/Blockchain/ConsortiumSearchScreen/ConsortiumSearchContainer.jsx';
import ConsortiumSetup from './core/components/Blockchain/ConsortiumSetupScreen/ConsortiumSetupContainer.jsx';
import SmartContract from './core/components/Blockchain/SmartContractScreen/SmartContract.jsx';
import SmartContractFileViewer from './core/components/Blockchain/SmartContractScreen/SmartContractFileViewer.jsx';
import blockchainWorkboard from './core/components/Blockchain/blockchainWorkboard.jsx';
import buyerDashboard from './containers/userDashboard.jsx';
import merchantDashboard from './containers/merchantDashboard.jsx';
import rewardsProviderDashboard from './containers/RewardsProviderDashboard.jsx';
import HealthMonitor from './core/components/HealthMonitor.jsx';

import sampleDashboard from './applications/SampleApp/containers/SampleDashboard.jsx';
import sampleDashboardType2 from './applications/SampleApp/containers/SampleDashboardType2.jsx';
import SampleListPage from './containers/Samples/SampleListPage.jsx';
import SampleViewPage from './containers/Samples/SampleViewPage.jsx';
import SampleCrudPage from './containers/Samples/SampleCrudPage.jsx';
import ApplicationsRoute from './applications/routesIndex';
// import BlockTransactionList from './containers/BlockTransactionList.jsx'


import Locked from './core/components/Locked.jsx';

import FileTemplateSearch from './core/components/FileTemplateSearchScreen/FileTemplateSearchContainer.jsx';
import FileTemplateSetup from './core/components/FileTemplateSetupScreen/FileTemplateSetupContainer.jsx';
import CommissionTemplateSearch
  from './core/components/CommissionTemplateSearchScreen/CommissionTemplateSearchContainer.jsx';
import CommissionTemplateSetup from './core/components/CommissionTemplateSetupScreen/CommissionTemplateSetupContainer.jsx';
import AuditLogList from './containers/auditLogList.jsx';


function getDashboard() {
  if (window.sessionStorage.orgType === "buyer") {
    return buyerDashboard
  }
  else if (window.sessionStorage.orgType === "merchant") {
    return merchantDashboard
  }
  else if (window.sessionStorage.orgType === "provider") {
    return rewardsProviderDashboard;
  }
  else {
    return blockchainWorkboard;
  }

}

console.log(ApplicationsRoute);

export default (
  <Router history={browserHistory}>

    <Route path="/Locked" component={Locked} onEnter={isAuthorized}/>
    <Route path="/cipher/login" component={Login} onEnter={isAuthorized}/>
    <Route path="/blockChainViewer/:blockChainID" component={BlockchainViewerQR} onEnter={isAuthorized}/>

    <Route path="/entityWorkboard" component={master} onEnter={requireAuth}>
      <IndexRoute component={getDashboard()}/>
      <Route path="/blockchain" component={blockchainWorkboard}/>
      <Route path="/buyerDashboard" component={buyerDashboard}/>
      <Route path="/merchantDashboard" component={merchantDashboard}/>
      <Route path="/rewardsProviderDashboard" component={rewardsProviderDashboard}/>

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

      {ApplicationsRoute}
      {/*<Route path="/sampleDashboard" component={sampleDashboard}/>*/}
      {/*<Route path="/sampleDashboardType2" component={sampleDashboardType2}/>*/}
      {/*<Route path="/sampleListPage" component={SampleListPage}/>*/}
      {/*<Route path="/sampleDetailPage/:recordID" component={SampleViewPage}/>*/}
      {/*<Route path="/sampleCrudPage" component={SampleCrudPage}/>*/}
      {/*<Route path="/sampleCrudPage/:recordID" component={SampleCrudPage}/>*/}

      {/*<Route path="/BlockTransactionList/:blockHeight" component={BlockTransactionList}/>*/}
    </Route>
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