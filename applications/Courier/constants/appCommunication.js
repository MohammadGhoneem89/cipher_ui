import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
  getEndToEndTrackingData: baseUrl + "/API/courier/getEndToEndTrackingData",
  getDashboardData: baseUrl + "/API/customs-courier/getDashboardData",
  getWidgetList: baseUrl + "/API/customs-courier/getWidgetList",
  addWidgets: baseUrl + "/API/customs-courier/addWidgets",
  sendChartEmail: baseUrl + "/API/customs-courier/sendChartEmail",
  getGraphDashboardData: baseUrl + "/API/ECOMMERCE/getWidgetsData",
  orderlist: baseUrl + "/API/customs-courier/getOrderList",
  fileList: baseUrl + "/API/customs-courier/getFileList",
  fileData: baseUrl + "/API/customs-courier/getFileData",
  orderDetails: baseUrl + "/API/customs-courier/getEndToEndTrackingData",
  orgDetailByCode: baseUrl + "/API/UI/orgDetailByCode",
  orgList: baseUrl + "/API/UI/orgList",
  monitoringScreenData : baseUrl + "/API/ECOMMERCE/getB2GMonitoringScreenData",
  getEndToEndTrackingInformation: baseUrl + "/API/ECOMMERCE/getEndToEndTrackingInformation"
};