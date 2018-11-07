import React from 'react';
import {Route} from 'react-router';
import sampleDashboard from './components/SampleDashboard.jsx';
import sampleDashboardType2 from './components/SampleDashboardType2.jsx';
import APIDocListScreen from './components/APIDocListScreen.jsx';
import SampleViewPage from './components/SampleViewPage.jsx';
import SampleCrudPage from './components/SampleCrudPage.jsx';
import UpdateBlock from './components/sampleUpdateBlock/UpdateBlockContainer.jsx';
import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";
import master from "./components/master.jsx";
import Form from "./components/form-test.jsx"
let authRoutes = <div>
  <Route component={master}>
    <Route path="/sampleDashboard" component={sampleDashboard}/>
    <Route path="/sampleDashboardType2" component={sampleDashboardType2}/>
    <Route path="/ListingScreen" component={APIDocListScreen}/>
    <Route path="/sampleDetailPage/:recordID" component={SampleViewPage}/>
    <Route path="/sampleCrudPage" component={SampleCrudPage}/>
    <Route path="/sampleCrudPage/:recordID" component={SampleCrudPage}/>
    <Route path="/sampleApp/UpdateBlock" component={UpdateBlock}/>
  </Route>
</div>;

let unAuthRoutes = <div>
  <Route path="/sample/Locked" component={Locked}/>
  <Route path="/sample/login" component={Login}/>
</div>;

export default {authRoutes, unAuthRoutes};