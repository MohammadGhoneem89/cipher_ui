import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import OneTimeOrder from "./components/OneTimeOrder/OneTimeOrder.jsx";
import ProductCatalogue from "./components/ProductCatalogue/ProductCatalogue.jsx";
import ItemCatalogueList from "./components/EFP/itemMasterList.jsx";
import ViewItemCatalogue from "./components/EFP/viewItemMaster.jsx";

let authRoutes = <div>
    <Route path="/strata/oneTimeOrder" component={OneTimeOrder} />
    <Route path="/strata/ProductCatalogue(/:id)" component={ProductCatalogue} />
    <Route path="/strata/itemCatalogueList" component={ItemCatalogueList} />
    {/* <Route path="/strata/viewItemCatalogue" component={ViewItemCatalogue} /> */}
</div>;

let unAuthRoutes = <div>
  <Route path="/strata/Locked" component={Locked} />
  <Route path="/strata/login" component={Login} />
</div>;

export default { authRoutes, unAuthRoutes };