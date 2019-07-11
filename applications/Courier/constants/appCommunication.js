import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
  getEndToEndTrackingData: baseUrl + "/API/courier/getEndToEndTrackingData",
  getDashboardData: baseUrl + "/API/customs-courier/getDashboardData",
  orderlist: baseUrl + "/API/customs_courier/orderlist",
  fileList: baseUrl + "/API/customs-courier/getFileList",
  fileData: baseUrl + "/API/customs-courier/getFileData"
};