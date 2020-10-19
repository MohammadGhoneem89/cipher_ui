import React from 'react';
import { Route } from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

import OrderDetails from "./components/orderDetails/orderDetailsContainer.jsx";
import orderlist from "./components/orderDetails/orderlist.jsx";
import Dashboard from "./components/orderDetails/dashboard.jsx";
import DynamicDashboardCreator from "./components/dashboards/dynamicDashboardCreator.jsx";
import FileList from "./components/Files/FileList.jsx";
import FileData from "./components/Files/FileData.jsx";
import EcommerceDashboard from './components/dashboards/ecommerceDashboard.jsx';
import createWidget from './components/addWidget/createWidget.jsx';
import BusinessTransactionList from './components/businessTransaction/businessTransactionList.jsx';
import orderlistMock from "./components/order_Mockup/orderlist.jsx";
import orderInvoiceList from "./components/order_Mockup/orderInvoiceList.jsx";
import invoiceDetails from "./components/order_Mockup/invoiceDetails.jsx";
import ItemDetails from "./components/order_Mockup/itemDetails.jsx";

import widgetList from './components/addWidget/widgetList.jsx';


let authRoutes = <div>
  <Route path="courier/orderDetails" component={OrderDetails} />
  <Route path="courier/orderDetails/:id" component={OrderDetails} />
  <Route path="courier/dashboard" component={Dashboard} />
  <Route path="courier/createDashboard" component={DynamicDashboardCreator} />
  <Route path="courier/orderlist" component={orderlist} />
  <Route path="courier/fileList" component={FileList} />
  <Route path="courier/fileData/:id" component={FileData} />
  <Route path="courier/eCommerceDashboard" component={EcommerceDashboard} />
  <Route path="courier/createWidget" component={createWidget} />
  <Route path="courier/businessTransactionMonitoring" component={BusinessTransactionList} />
  <Route path="courier/orderlistmock" component={orderlistMock} />
  <Route path="courier/orderInvoiceList/:id" component={orderInvoiceList} />
  <Route path="courier/invoiceDetails/:id" component={invoiceDetails} />
  <Route path="courier/itemDetails/:id" component={ItemDetails} />

  <Route path="courier/widgetList" component={widgetList} />
</div>;

let unAuthRoutes = <div>
  <Route path="/wasl/Locked" component={Locked} />
  <Route path="/wasl/login" component={Login} />
</div>;

export default { authRoutes, unAuthRoutes };