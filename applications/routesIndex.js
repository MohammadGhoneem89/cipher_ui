import React from 'react';
import SampleAppRoutes from './SampleApp/appRoutes';
import Wasl from './WASL/appRoutes';

let routesIndex =
  [
    SampleAppRoutes.authRoutes.props.children,
    Wasl.authRoutes.props.children
  ];

let unAuthRouteIndex =
  [
    SampleAppRoutes.unAuthRoutes.props.children,
    Wasl.unAuthRoutes.props.children
  ];

export default {routesIndex, unAuthRouteIndex}