import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//App Routes
import ViewTransactions from "./components/Transaction/ViewTransactions.jsx";
import TransactionDetail from './components/Transaction/TransactionDetail.jsx';
// import Cipher from "./components/Cipher.jsx";
import ChangePassword from '../../core/components/AuthenticationScreens/changePassword.jsx';
import ViewSettlement from './components/Transaction/Settlements/ViewSettlement.jsx';
import SubmitSettlement from './components/Transaction/Settlements/SubmitSettlement.jsx';
import fileScreen from './components/Files/fileScreen.jsx';
import fileDetail from './components/Files/fileDetail.jsx';


// import TransactionDetail from './components/Transaction/TransactionDetail.jsx';
//import AddPartner from './components/PartnerSetup/AddPartner.jsx'
import AddShop from './components/AddShop.jsx'
import ListOffers from './components/ListOffers.jsx'
import VoucherList from './components/VoucherList.jsx'
import VoucherManagement from './components/VoucherManagement.jsx'
import AddPartner from './components/PartnerSetup/addPartner.jsx'
import dashboard from './components/Dashboard/dashboard.jsx';

import MerchantList from './components/MerchantList.jsx';
import ProductList from "./components/ListProducts.jsx";
import InventoryManagement from "./components/InventoryManagement.jsx"
import OrderManagement from "./components/OrderManagement.jsx"
import InitiateSettlementPartner from "./components/InitiateSettlementPartner.jsx"
import InitiateSettlementEtisalat from "./components/InitiateSettlementEtisalat.jsx"
import AddNewMerchant from "./components/AddNewMerchant.jsx";
import OfferManagement from "./components/OfferManagement.jsx";
//import Productmanagement from "./components/ProductManagement.jsx";
import ProductManagement from './components/ProductManagement.jsx';
import ApproveRedemtionContract from "./components/ApproveRedemptionContract.jsx"
import DashboardEtisalat from "./components/DashboardEtisalat.jsx";
import DashboardPartner from "./components/DashboardPartner.jsx";
import CreateAmendRedemption from "./components/CreateAmendRedemption.jsx"

let authRoutes = <div>
    <Route path="/smiles/View/Transaction" component={ViewTransactions} />
    <Route path="/smiles/Detail/Transaction" component={TransactionDetail} />
 
    <Route path="/smiles/View/Settlements" component={ViewSettlement} />
    <Route path="/smiles/Submit/Settlements" component={SubmitSettlement} />
    <Route path="/smiles/View/dashboard" component={dashboard} />
    <Route path="/smiles/View/FileScreen" component={fileScreen} />//rm
    <Route path="/smiles/View/FileDetails" component={fileDetail} />//rm
    <Route path="/smiles/partnerSetup/addPartner" component={AddPartner} />

    <Route path="/smiles/addShop" component={AddShop}/>
    <Route path="/smiles/listOffers" component={ListOffers}/>
    <Route path="/smiles/voucherList" component={VoucherList}/>
    <Route path="/smiles/voucherManagement" component={VoucherManagement}/>

    <Route path="/smiles/merchantList" component={MerchantList}/>
    <Route path="/smiles/productList" component={ProductList}/>
    <Route path="/smiles/inventoryManagement"  component={InventoryManagement}/>
    <Route path="/smiles/orderManagement" component={OrderManagement}/>

        <Route path="/smiles/initiateSettlementPartner" component={InitiateSettlementPartner}/>
        <Route path="/smiles/initiateSettlementEtisalat" component={InitiateSettlementEtisalat}/>
        <Route path="/smiles/addNewMerchant" component={AddNewMerchant}/>
        <Route path="/smiles/offerManagement" component={OfferManagement}/>
        <Route path="/smiles/productManagement"  component={ProductManagement}/>
        <Route path="/smiles/approveRedemptionContract" component={ApproveRedemtionContract}/>
        <Route path="/smiles/dashboardEtisalat" component={DashboardEtisalat}/>
        <Route path="/smiles/dashboardPartner" component={DashboardPartner}/>
        <Route path="/smiles/createAmendRedemption" component={CreateAmendRedemption}/>
    

</div>;

let unAuthRoutes =
    <div>``
       
        <Route path="/smiles/Locked" component={Locked} />
        <Route path="/smiles/changePassword/:orgType" component={ChangePassword} />
        <Route path="/smiles/login" component={Login} />
        {/* <Route path="/cipher" component={Cipher} /> */}
    </div>;

export default { authRoutes, unAuthRoutes };