import React from 'react';
import SampleAppRputes from './SampleApp/appRoutes';


let routesIndex =
    [
      SampleAppRputes.authRoutes.props.children
    ];

let unAuthRouteIndex =
    [
      SampleAppRputes.unAuthRoutes.props.children
    ];

export default {routesIndex, unAuthRouteIndex}