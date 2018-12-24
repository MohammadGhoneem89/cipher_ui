import React from 'react';
import {Route} from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";
//Payment Screen Route

import PaymentSearch from '../../applications/WASL/components/payment/PaymentSearch.js';
import PaymentAdd from '../../applications/WASL/components/payment/PaymentAdd.js';

//

let authRoutes = <div>
  {/*<Route path="/sampleDashboard" component={sampleDashboard}/>*/}
  //Payment Screen Route

  <Route path="/paymentSearch" component={PaymentSearch}/>
  <Route path="/paymentAdd/:id" component={PaymentAdd}/>
  <Route path="/paymentAdd" component={PaymentAdd}/>

  //

</div>;

let unAuthRoutes = <div>
  <Route path="/wasl/Locked" component={Locked}/>
  <Route path="/wasl/login" component={Login}/>
</div>;

export default {authRoutes, unAuthRoutes};