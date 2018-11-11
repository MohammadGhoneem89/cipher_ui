import React from 'react';
import { Route } from 'react-router';
import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";
import APIDocListScreen from "./components/APIDocListScreen.jsx";
import APIDefScreen from "./components/APIDefScreen/APIDefScreenContainer.jsx";
import master from "./components/master.jsx";

let authRoutes = <div>
  <Route component={master}>
    <Route path="/APIDefScreen" component={APIDefScreen} />
    <Route path="/APIDocListScreen" component={APIDocListScreen} />

  </Route>
</div>;

let unAuthRoutes = <div>
  <Route path="/sample/Locked" component={Locked} />
  <Route path="/sample/login" component={Login} />
</div>;

export default { authRoutes, unAuthRoutes };