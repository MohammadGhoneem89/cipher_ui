import routes from '../../../core/constants/routes';
let baseUrl = routes.baseUrl;


module.exports = {
  getSampleDashboardData: baseUrl + "/SIMU/sampleDashboardData",
  getSampleDashboardDataType2: baseUrl + "/SIMU/sampleDashboardDataType2",
  getSampleDropDownList: baseUrl + "/SIMU/sampleDropDownListData",
  getSampleListData: baseUrl + "/SIMU/getSampleListPageData",
  getSampleViewPageData: baseUrl + "/SIMU/getSampleViewPageData",
  getSampleRecordByID: baseUrl + "/SIMU/getSampleRecordByID"
};