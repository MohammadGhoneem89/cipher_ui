import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import OneTimeOrder from "./components/order/OneTimeOrder/OneTimeOrder.jsx";
import ProductCatalogue from "./components/ProductCatalogue/ProductCatalogue.jsx";
import ItemCatalogueList from "./components/ProductCatalogue/ProductCatalogueList.jsx";
import MasterAgreementList from "./components/MasterAgreement/MasterAgreementList.jsx";
import AddMasterAgreement from "./components/MasterAgreement/AddMasterAgreements.jsx";
import ViewMasterAgreement from "./components/MasterAgreement/viewMasterAgreement.jsx";
import OrderList from "./components/order/OrderList/orderList.jsx";
import CustomerAssociation from "./components/CustomerAssociation/customerAssociation.jsx";

import OrderDetails from "./components/order/OrderDetails/OrderDetailContainer.jsx";
import OrderViaContract from "./components/order/OrderViaContract/OrderViaContract.jsx";
import SupplierDashboard from "./components/supplierDashboard.jsx";
import CustomerDashboard from "./components/customerDashboard.jsx";
import Cipher from "./components/Cipher.jsx";
import Suborder from "./components/suborder/SubOrderDetail.jsx";
import SuborderList from "./components/suborder/SubOrderList.jsx";
import ChangePassword from '../../core/components/AuthenticationScreens/changePassword.jsx';
let authRoutes = < div >
    <
        Route path="/strata/oneTimeOrder"
        component={OneTimeOrder}
    /> <
        Route path="/customer"
        component={CustomerDashboard}
    /> <
        Route path="/supplier"
        component={SupplierDashboard}
    /> <
        Route path="strata/ProductCatalogue/ADD/:mode"
        component={ProductCatalogue}
    /> <
        Route path="/strata/ProductCatalogue/VIEW/:mode/:id"
        component={ProductCatalogue}
    /> <
        Route path="/strata/ProductCatalogue/EDIT/:mode/:id"
        component={ProductCatalogue}
    /> <
        Route path="/strata/itemCatalogueList"
        component={ItemCatalogueList}
    /> <
        Route path="/strata/MasterAgreementList"
        component={MasterAgreementList}
    /> <
        Route path="/strata/AddMasterAgreement"
        component={AddMasterAgreement}
    /> <
        Route path="/strata/AddMasterAgreement/:contractID/:customerID"
        component={AddMasterAgreement}
    /> <
        Route path="/strata/ViewMasterAgreement/:contractID/:customerID"
        component={ViewMasterAgreement}
    /> <
        Route path="/strata/customerAssociation"
        component={CustomerAssociation}
    /> <
        Route path="/strata/orderList"
        component={OrderList}
    /> <
        Route path="/strata/OrderViaContract"
        component={OrderViaContract}
    /> <
        Route path="/strata/viewOrder/:id/:customerId"
        component={OrderDetails}
    /> <
        Route path="/strata/subOrder/:id"
        component={Suborder}
    /> <
        Route path="/strata/subOrderList"
        component={SuborderList}
    /> < /
div > ;
    
let unAuthRoutes = < div >
        <
            Route path="/strata/Locked"
            component={Locked}
        />   <
        Route path="/strata/changePassword/:orgType"
        component={ChangePassword}
    /><
            Route path="/strata/login"
            component={Login}
        /> <
            Route path="/cipher"
            component={Cipher}
        /> < /
div > ;
        
export default {authRoutes, unAuthRoutes};