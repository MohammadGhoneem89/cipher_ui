import React from 'react';
import SampleAppRoutes from './SampleApp/appRoutes';
import SampleAppRoutes2 from './SampleApp.2/appRoutes';


let routesIndex =
    [
    //SampleAppRoutes.authRoutes.props.children,
    SampleAppRoutes2.authRoutes.props.children
    ];

let unAuthRouteIndex =
    [
      //SampleAppRoutes.unAuthRoutes.props.children,
      SampleAppRoutes2.unAuthRoutes.props.children
    ];

export default {routesIndex, unAuthRouteIndex}