import backOffices from '../../backOffices';
let baseUrl = backOffices.baseUrl;


module.exports = {
    //WASL ROUTE

    getPaymentList:baseUrl+ "/API/Wasl/getPaymentList",
    getPaymentDetail:baseUrl+ "/API/Wasl/getPaymentDetail",
    insertPayment:baseUrl+ "/API/Wasl/insertPayment",
    updatePayment:baseUrl+ "/API/Wasl/updatePayment",

    //
};