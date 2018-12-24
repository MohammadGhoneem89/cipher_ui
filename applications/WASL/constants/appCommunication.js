import backOffices from '../../backOffices';
let baseUrl = backOffices.baseUrl;


module.exports = {
    //WASL ROUTE

    getPaymentList:baseUrl+ "/API/UI/getPaymentList",
    getPaymentDetail:baseUrl+ "/API/UI/getPaymentDetail",
    insertPayment:baseUrl+ "/API/UI/insertPayment",
    updatePayment:baseUrl+ "/API/UI/updatePayment",

    //
};