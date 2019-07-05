import React from 'react';
import {Route} from 'react-router';

import Locked from "../../core/components/AuthenticationScreens/Locked.jsx";
import Login from "../../core/components/AuthenticationScreens/Login.jsx";

//Payment Screen Route
import PaymentSearch from '../../applications/WASL/components/payment/PaymentSearch.js';
import PaymentAdd from '../../applications/WASL/components/payment/PaymentAdd.js';

//Report Routes
import ContractDetailReport from '../../applications/WASL/components/reports/contractDetailReport';
import PaymentInstrumentReport from '../../applications/WASL/components/reports/paymentInstrumentReport';
import EjariReport from '../../applications/WASL/components/reports/ejariReport';
import APIDefReport from '../../applications/WASL/components/reports/APIDefFullReport';

//API Template Routes
import APITemplateList from '../../core/components/APITemplate/APITemplateList';
import APITemplateEdit from '../../core/components/APITemplate/APITemplateEdit';
import APITemplateTest from '../../core/components/APITemplate/APITemplateTest';

//Document Routes
import ViewDocument from '../../applications/WASL/components/documents/view';

//onBoarding Routes
import onBoardingProfileSetup from '../../applications/WASL/components/onBoarding/onBoardingProfileSetup';
import onBoardingProfileList from '../../applications/WASL/components/onBoarding/onBoardingProfileList';


let authRoutes = <div>
  {/*<Route path="/sampleDashboard" component={sampleDashboard}/>*/}

  <Route path="/paymentSearch" component={PaymentSearch}/>
  <Route path="/paymentAdd/:id" component={PaymentAdd}/>
  <Route path="/paymentAdd" component={PaymentAdd}/>
  <Route path="/paymentAdd" component={PaymentAdd}/>

  <Route path="/contractDetailReport" component={ContractDetailReport}/>
  <Route path="/paymentInstrumentReport" component={PaymentInstrumentReport}/>
  <Route path="/ejariReport" component={EjariReport}/>
  <Route path="/APIDefReport" component={APIDefReport}/>

  <Route path="/apiTemplate" component={APITemplateList}/>
  <Route path="/apiTemplate/:id" component={APITemplateEdit}/>
  <Route path="/apiTemplate/test/:id" component={APITemplateTest}/>
  <Route path="/document/view" component={ViewDocument}/>

  <Route path="/onBoardingProfile/setup" component={onBoardingProfileSetup}/>
  <Route path="/onBoardingProfile/setup/:id" component={onBoardingProfileSetup}/>
  <Route path="/onBoardingProfile" component={onBoardingProfileList}/>

</div>;

let unAuthRoutes = <div>
  <Route path="/wasl/Locked" component={Locked}/>
  <Route path="/wasl/login" component={Login}/>
</div>;

export default {authRoutes, unAuthRoutes};