import React from 'react';
import {Route} from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";


let authRoutes = <div>
  {/*<Route path="/sampleDashboard" component={sampleDashboard}/>*/}
</div>;

let unAuthRoutes = <div>
  <Route path="/sample/Locked" component={Locked}/>
  <Route path="/sample/login" component={Login}/>
</div>;

export default {authRoutes, unAuthRoutes};