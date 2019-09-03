import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import OneTimeOrder from "./components/OneTimeOrder/OneTimeOrder.jsx";
import ProductCatalogue from "./components/ProductCatalogue/ProductCatalogue.jsx";
import ItemCatalogueList from "./components/ProductCatalogue/itemMasterList.jsx";
import MasterAgreementList from "./components/MasterAgreement/MasterAgreementList.jsx";
import AddMasterAgreement from "./components/MasterAgreement/AddMasterAgreements.jsx";
import OrderList from "./components/OrderList/orderList.jsx";
import CustomerAssociation from "./components/CustomerAssociation/customerAssociation.jsx";


let authRoutes = <div>
    <Route path="/strata/oneTimeOrder" component={OneTimeOrder} />
    <Route path="strata/ProductCatalogue" component={ProductCatalogue} />
    <Route path="/strata/ProductCatalogue/:id" component={ProductCatalogue} />
    <Route path="/strata/itemCatalogueList" component={ItemCatalogueList} />
    <Route path="/strata/MasterAgreementList" component={MasterAgreementList} />
  <Route path="/strata/AddMasterAgreement" component={AddMasterAgreement} />
    <Route path="/strata/orderList" component={OrderList} />
    <Route path="/strata/viewOrder/:id" component={OrderList} />
    <Route path="/strata/customerAssociation" component={CustomerAssociation} />
</div>;

let unAuthRoutes = <div>
  <Route path="/strata/Locked" component={Locked} />
  <Route path="/strata/login" component={Login} />
</div>;

export default { authRoutes, unAuthRoutes };
