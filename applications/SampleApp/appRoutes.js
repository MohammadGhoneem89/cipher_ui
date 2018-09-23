import React from 'react';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import sampleDashboard from './containers/SampleDashboard.jsx';
import sampleDashboardType2 from './containers/SampleDashboardType2.jsx';
// import SampleListPage from './containers/SampleListPage.jsx';
// import SampleViewPage from './containers/SampleViewPage.jsx';
// import SampleCrudPage from './containers/SampleCrudPage.jsx';


export default (
  <Router>
    <Route path="/sampleDashboard" component={sampleDashboard}/>
    <Route path="/sampleDashboardType2" component={sampleDashboardType2}/>
    {/*<Route path="/sampleListPage" component={SampleListPage}/>*/}
    {/*<Route path="/sampleDetailPage/:recordID" component={SampleViewPage}/>*/}
    {/*<Route path="/sampleCrudPage" component={SampleCrudPage}/>*/}
    {/*<Route path="/sampleCrudPage/:recordID" component={SampleCrudPage}/>*/}
  </Router>
)