import React from 'react';
import Starta from './starta/appRoutes';
import SampleAppRoutes from './SampleApp/appRoutes';
import Wasl from './WASL/appRoutes';

let routesIndex =
  [
    Starta.authRoutes.props.children,
    SampleAppRoutes.authRoutes.props.children,
    Wasl.authRoutes.props.children
  ];

let unAuthRouteIndex =
  [
    Starta.unAuthRoutes.props.children,
    SampleAppRoutes.unAuthRoutes.props.children,
    Wasl.unAuthRoutes.props.children
  ];

export default {routesIndex, unAuthRouteIndex}