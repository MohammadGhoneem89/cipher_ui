import Starta from './starta/appRoutes';

let routesIndex =
  [
    Starta.authRoutes.props.children
  ];

let unAuthRouteIndex =
  [
    Starta.unAuthRoutes.props.children
  ];

export default {routesIndex, unAuthRouteIndex}