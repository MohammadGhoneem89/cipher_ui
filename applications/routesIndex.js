import React from 'react';
import Smiles from './etisalat_smiles_project/appRoutes';
import SampleAppRoutes from './SampleApp/appRoutes';
import Wasl from './WASL/appRoutes';

let routesIndex =
  [
    Smiles.authRoutes.props.children,
    SampleAppRoutes.authRoutes.props.children,
    Wasl.authRoutes.props.children
  ];

let unAuthRouteIndex =
  [
    Smiles.unAuthRoutes.props.children,
    SampleAppRoutes.unAuthRoutes.props.children,
    Wasl.unAuthRoutes.props.children
  ];

export default {routesIndex, unAuthRouteIndex}