import backOffices from '../../backOffices';
let baseUrl = backOffices.baseUrl;


module.exports = {
  getSampleDashboardData: baseUrl + "/SIMU/sampleDashboardData",
  getSampleDashboardDataType2: baseUrl + "/SIMU/sampleDashboardDataType2",
  getSampleDropDownList: baseUrl + "/SIMU/sampleDropDownListData",
  getSampleListData: baseUrl + "/SIMU/getSampleListPageData",
  getSampleViewPageData: baseUrl + "/SIMU/getSampleViewPageData",
  getSampleRecordByID: baseUrl + "/SIMU/getSampleRecordByID",
  getBlockchainAccountList: baseUrl + "/API/SampleApp/getAccountList",
  updateBlockchainAccountList: baseUrl + "/API/SampleApp/updateAccountList",
  getListingScreen : baseUrl + "/SIMU/APIListingScreen",
  getApplicationScreen : baseUrl + "/SIMU/APIDefinitionScreen"
};