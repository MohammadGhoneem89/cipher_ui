import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
  getEndToEndTrackingData: baseUrl + "/API/courier/getEndToEndTrackingData",
  getDashboardData: baseUrl + "/API/customs-courier/getDashboardData",
  orderlist: baseUrl + "/API/customs-courier/orderlist"
};