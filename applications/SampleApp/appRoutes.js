import React from 'react';
import {Route, Router} from 'react-router';
import sampleDashboard from './components/SampleDashboard.jsx';
import sampleDashboardType2 from './components/SampleDashboardType2.jsx';
import SampleListPage from './components/SampleListPage.jsx';
import SampleViewPage from './components/SampleViewPage.jsx';
import SampleCrudPage from './components/SampleCrudPage.jsx';
import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

let authRoutes = <Router>
  <Route path="/sampleDashboard" component={sampleDashboard}/>
  <Route path="/sampleDashboardType2" component={sampleDashboardType2}/>
  <Route path="/sampleListPage" component={SampleListPage}/>
  <Route path="/sampleDetailPage/:recordID" component={SampleViewPage}/>
  <Route path="/sampleCrudPage" component={SampleCrudPage}/>
  <Route path="/sampleCrudPage/:recordID" component={SampleCrudPage}/>
</Router>;

let unAuthRoutes = <Router>
  <Route path="/sample/Locked" component={Locked}/>
  <Route path="/sample/login" component={Login}/>
</Router>;

export default {authRoutes, unAuthRoutes};