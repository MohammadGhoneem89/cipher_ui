import React from 'react';
import SampleAppRoutes from './SampleApp/appRoutes';
import PROJECT from './PROJECT/appRoutes';

let routesIndex =
  [
    SampleAppRoutes.authRoutes.props.children,
    PROJECT.authRoutes.props.children

  ];

let unAuthRouteIndex =
  [
    SampleAppRoutes.unAuthRoutes.props.children,
    PROJECT.unAuthRoutes.props.children

  ];

export default {routesIndex, unAuthRouteIndex}