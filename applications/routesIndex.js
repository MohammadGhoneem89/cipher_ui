import React from 'react';
import {Router} from 'react-router';
import SampleCrudPage from './SampleApp/appRoutes';


let routesIndex = <Router>
    {[...SampleCrudPage.authRoutes.props.children]}
  </Router>;

let unAuthRouteIndex = <Router>
    {[...SampleCrudPage.unAuthRoutes.props.children]}
  </Router>;

export default {routesIndex, unAuthRouteIndex}