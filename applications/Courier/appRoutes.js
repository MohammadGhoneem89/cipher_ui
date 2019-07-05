import React from 'react';
import {Route} from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

import OrderDetails from "./components/orderDetails/orderDetailsContainer.jsx";


let authRoutes = <div>
  <Route path="courier/orderDetails" component={OrderDetails}/>

</div>;

let unAuthRoutes = <div>
  <Route path="/wasl/Locked" component={Locked}/>
  <Route path="/wasl/login" component={Login}/>
</div>;

export default {authRoutes, unAuthRoutes};