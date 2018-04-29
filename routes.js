/*standard imports*/
import React from 'react';
import master from './master.jsx';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
/*container imports*/
import Login from './components/Login.jsx';


import notification from './containers/Notifications.jsx';
import auth from './auth/authenticator';
import EmailTemplateSearch from './components/EmailTemplateSearchScreen/EmailTemplateSearchContainer.jsx';
import EmailTemplateSetup from './components/EmailTemplateSetupScreen/EmailTemplateSetupContainer.jsx';
import GroupSearch from './components/GroupSearchScreen/GroupSearchContainer.jsx';
import GroupSetup from './components/GroupSetupScreen/GroupSetupContainer.jsx';
import UserSearch from './components/UserSearchScreen/UserSearchContainer.jsx';
import UserSetup from './components/UserSetupScreen/UserSetupContainer.jsx';
import WorkingCalendar from './components/WorkingCalendar/WorkingCalContainer.jsx';

import ChangePassword from './containers/changePassword.jsx';
import APIPayloadSearch from './containers/APIPayloadList.jsx';
import BlockchainViewerQR from './components/Blockchain/Viewer/BlockchainViewerQR.jsx';
import BlockSearchScreen from './components/Blockchain/BlockSearchScreen/BlockSearchScreenContainer.jsx';
import HashSearchScreen from './components/Blockchain/HashSearchScreen/HashSearchScreenContainer.jsx';
import BlockchainEditor from './components/Blockchain/Editor/BlockchainEditorContainer.jsx';
import ConsortiumSearch from './components/Blockchain/ConsortiumSearchScreen/ConsortiumSearchContainer.jsx';
import ConsortiumSetup from './components/Blockchain/ConsortiumSetupScreen/ConsortiumSetupContainer.jsx';
import SmartContract from './components/Blockchain/SmartContractScreen/SmartContract.jsx';
import SmartContractFileViewer from './components/Blockchain/SmartContractScreen/SmartContractFileViewer.jsx';

import Locked from './components/Locked.jsx';


import blockchainWorkboard from './components/Blockchain/blockchainWorkboard.jsx';
// import BlockTransactionList from './containers/BlockTransactionList.jsx'


export default (
  <Router history={browserHistory}>

    <Route path="/Locked" component={Locked} onEnter={isAuthorized}/>
    <Route path="/cipher/login" component={Login} onEnter={isAuthorized}/>
    <Route path="/blockChainViewer/:blockChainID" component={BlockchainViewerQR} onEnter={isAuthorized}/>

    <Route path="/entityWorkboard" component={master} onEnter={requireAuth}>
      <IndexRoute component={blockchainWorkboard}/>
      <Route path="/notification" component={notification}/>

      <Route path="/emailTemplateSearch" component={EmailTemplateSearch}/>
      <Route path="/emailTemplateSetup" component={EmailTemplateSetup}/>
      <Route path="/emailTemplateSetup/edit/:emailTemplateID" component={EmailTemplateSetup}/>


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

      <Route path="/changePassword" component={ChangePassword}/>
      <Route path="/APIPayloadSearch" component={APIPayloadSearch}/>
      <Route path="/APIPayloadSearch/:payLoadField/:payLoadFieldValue" component={APIPayloadSearch}/>


      {/*<Route path="/BlockTransactionList/:blockHeight" component={BlockTransactionList}/>*/}
      <Route path="/blockchain" component={blockchainWorkboard}/>

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