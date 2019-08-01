import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import OneTimeOrder from "./components/OneTimeOrder/OneTimeOrder.jsx";
import ProductCatalogue from "./components/ProductCatalogue/ProductCatalogue.jsx";


let authRoutes = <div>
    <Route path="/starta/oneTimeOrder" component={OneTimeOrder} />
    <Route path="/starta/ProductCatalogue" component={ProductCatalogue} />
</div>;

let unAuthRoutes = <div>
  <Route path="/starta/Locked" component={Locked} />
  <Route path="/starta/login" component={Login} />
</div>;

export default { authRoutes, unAuthRoutes };