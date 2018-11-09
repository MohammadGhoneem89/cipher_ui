import React from 'react';
import {Route} from 'react-router';
import sampleDashboard from './components/SampleDashboard.jsx';
import sampleDashboardType2 from './components/SampleDashboardType2.jsx';
import SampleListPage from './components/SampleListPage.jsx';
import SampleViewPage from './components/SampleViewPage.jsx';
import SampleCrudPage from './components/SampleCrudPage.jsx';
import APIDefScreen from './components/APIDefScreen/APIDefScreenContainer.jsx';
import APIDocListScreen from './components/APIDocListScreen.jsx';
import UpdateBlock from './components/sampleUpdateBlock/UpdateBlockContainer.jsx';
import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";
import master from "./components/master.jsx";
import UpdateBlockForm from './components/sampleUpdateBlock/UpdateBlockForm.jsx';

let authRoutes = <div>
  <Route component={master}>
    <Route path="/sampleDashboard" component={UpdateBlock}/>
    <Route path="/sampleDashboardType2" component={sampleDashboardType2}/>
    <Route path="/sampleListPage" component={SampleListPage}/>
    <Route path="/sampleDetailPage/:recordID" component={SampleViewPage}/>
    <Route path="/APIDefScreen" component={APIDefScreen}/>
    <Route path="/ListingScreen" component={APIDocListScreen}/>
    {/* <Route path="/sampleCrudPage/:recordID" component={SampleCrudPage}/> */}
    <Route path="/sampleApp/UpdateBlock" component={UpdateBlock}/>
  </Route>
</div>;

let unAuthRoutes = <div>
  <Route path="/sample/Locked" component={Locked}/>
  <Route path="/sample/login" component={Login}/>
</div>;

export default {authRoutes, unAuthRoutes};