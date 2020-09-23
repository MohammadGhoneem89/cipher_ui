import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
  getEndToEndTrackingData: baseUrl + "/API/courier/getEndToEndTrackingData",
  getDashboardData: baseUrl + "/API/customs-courier/getDashboardData",
  getGraphDashboardData: baseUrl + "/API/ECOMMERCE/getWidgetsData",
  orderlist: baseUrl + "/API/customs-courier/getOrderList",
  fileList: baseUrl + "/API/customs-courier/getFileList",
  fileData: baseUrl + "/API/customs-courier/getFileData",
  orderDetails: baseUrl + "/API/customs-courier/getEndToEndTrackingData",
  orgDetailByCode: baseUrl + "/API/UI/orgDetailByCode",
  orgList: baseUrl + "/API/UI/orgList"};