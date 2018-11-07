import React from 'react';
import SampleAppRoutes from './SampleApp/appRoutes';
import SampleAppRoutes1 from './SampleApp.1/appRoutes';


let routesIndex =
    [
      SampleAppRoutes.authRoutes.props.children,
     //SampleAppRoutes1.authRoutes.props.children
    ];

let unAuthRouteIndex =
    [
      SampleAppRoutes.unAuthRoutes.props.children,
     // SampleAppRoutes1.unAuthRoutes.props.children
    ];

export default {routesIndex, unAuthRouteIndex}