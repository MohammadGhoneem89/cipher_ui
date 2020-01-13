import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import ViewTransactions from "./components/Transaction/ViewTransactions.jsx";
import TransactionDetail from './components/Transaction/TransactionDetail.jsx';
// import Cipher from "./components/Cipher.jsx";
import ChangePassword from '../../core/components/AuthenticationScreens/changePassword.jsx';
// import TransactionDetail from './components/Transaction/TransactionDetail.jsx';
import AddPartner from './components/PartnerSetup/addPartner.jsx'
let authRoutes = <div>
    <Route path="/smiles/View/Transaction" component={ViewTransactions} />
    <Route path="/smiles/Detail/Transaction" component={TransactionDetail} />
    <Route path="/smiles/partnerSetup/addPartner" component={AddPartner} />
</div>;

let unAuthRoutes =
    <div>
        <Route path="/smiles/Locked" component={Locked} />
        <Route path="/smiles/changePassword/:orgType" component={ChangePassword} />
        <Route path="/smiles/login" component={Login} />
        {/* <Route path="/cipher" component={Cipher} /> */}
    </div>;

export default { authRoutes, unAuthRoutes };