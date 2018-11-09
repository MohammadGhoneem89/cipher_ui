import React from 'react';
import SampleAppRoutes from './SampleApp/appRoutes';
import IqraApp from './IqraApp/appRoutes';


let routesIndex =
    [
    //SampleAppRoutes.authRoutes.props.children,
    IqraApp.authRoutes.props.children
    ];

let unAuthRouteIndex =
    [
      //SampleAppRoutes.unAuthRoutes.props.children,
      IqraApp.unAuthRoutes.props.children
    ];

export default {routesIndex, unAuthRouteIndex}