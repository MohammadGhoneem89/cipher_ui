import SampleCrudPage from './SampleApp/appRoutes';

let routesIndex = {
  ...SampleCrudPage.authRoutes
};
let unAuthRouteIndex ={
  ...SampleCrudPage.unAuthRoutes
};
export default {routesIndex, unAuthRouteIndex}