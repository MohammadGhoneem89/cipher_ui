import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import ViewTransactions from "./components/Transaction/ViewTransactions.jsx";
import TransactionDetail from './components/Transaction/TransactionDetail.jsx';
// import Cipher from "./components/Cipher.jsx";
import ChangePassword from '../../core/components/AuthenticationScreens/changePassword.jsx';
import ViewSettlement from './components/Transaction/Settlements/ViewSettlement.jsx';
import SubmitSettlement from './components/Transaction/Settlements/SubmitSettlement.jsx';
import fileScreen from './components/Files/fileScreen.jsx';
import fileDetail from './components/Files/fileDetail.jsx';


// import TransactionDetail from './components/Transaction/TransactionDetail.jsx';
import AddPartner from './components/PartnerSetup/AddPartner.jsx'
let authRoutes = <div>
    <Route path="/smiles/View/Transaction" component={ViewTransactions} />
    <Route path="/smiles/Detail/Transaction" component={TransactionDetail} />
    <Route path="/smiles/partnerSetup/addPartner" component={AddPartner} />
    <Route path="/smiles/View/Settlements" component={ViewSettlement} />
    <Route path="/smiles/Submit/Settlements" component={SubmitSettlement} />
    <Route path="/smiles/View/FileScreen" component={fileScreen} />//rm
    <Route path="/smiles/View/FileDetails" component={fileDetail} />//rm
</div>;

let unAuthRoutes =
    <div>
        <Route path="/smiles/Locked" component={Locked} />
        <Route path="/smiles/changePassword/:orgType" component={ChangePassword} />
        <Route path="/smiles/login" component={Login} />
        {/* <Route path="/cipher" component={Cipher} /> */}
    </div>;

export default { authRoutes, unAuthRoutes };