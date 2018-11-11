import React from 'react';
import SampleAppRoutes from './SampleApp/appRoutes';

let routesIndex =
    [
    SampleAppRoutes.authRoutes.props.children,
    
    ];

let unAuthRouteIndex =
    [
      SampleAppRoutes.unAuthRoutes.props.children,
      
    ];

export default {routesIndex, unAuthRouteIndex}