import routes from './routes';

let baseUrl = routes.baseUrl;
let blockChainURL = routes.blockChainURL;
let webSocketURL = routes.webSocketURL;
let repostActionURL = routes.repostActionURL;
let blockChainViewerURL = routes.blockChainViewerURL;
let loyaltyBaseURL = routes.loyaltyBaseURL;
let qrCode = routes.qrCode;


module.exports = {
  baseUrl,
  getPermission: baseUrl + "/API/UI/permission",
  getUserData: baseUrl + "/API/UI/user",
  getNotificationData: baseUrl + "/API/UI/notificationList",
  getBatchById: baseUrl + "/SIMU/getBatchById",
  getError: baseUrl + "/SIMU/error",
  getLogin: baseUrl + "/login",
  getSocket: webSocketURL,
  performActionToBlockChain: blockChainURL,
  getEmailTemplateList: baseUrl + '/API/UI/emailTemplateList',
  getEmailTemplateDetails: baseUrl + '/API/UI/emailTemplateDetail',
  emailTemplateUpdate: baseUrl + '/API/UI/emailTemplateUpdate',
  emailTemplateInsert: baseUrl + '/API/UI/emailTemplateInsert',
  userInsert: baseUrl + "/API/UI/userCreate",
  getUserDetail: baseUrl + "/API/UI/userDetails",
  userUpdate: baseUrl + "/API/UI/userUpdate",
  getUserList: baseUrl + "/API/UI/userList",
  groupInsert: baseUrl + "/API/UI/groupInsert",
  getGroupDetail: baseUrl + "/API/UI/groupDetail",
  groupUpdate: baseUrl + "/API/UI/groupUpdate",
  getGroupList: baseUrl + "/API/UI/groupList",
  getworkingCalendarDetail: baseUrl + "/SIMU/workingCalendarDetail",
  workingCalendarUpdate: baseUrl + "/SIMU/workingCalendarUpdate",
  uploadImg: baseUrl + "/uploadImg",
  uploadFile: baseUrl + "/uploadFile",
  getUploadedFile: baseUrl + "/getUploadedFile",
  getAuditLogListData: baseUrl + "/API/UI/auditLogList",
  getAuditLogDetail: baseUrl + "/API/UI/auditLogDetail",

  getTypeData: baseUrl + '/API/UI/typeData',
  getCipherTypeData: baseUrl + '/API/UI/cipher/typeData',
  getNodeList: baseUrl + "/SIMU/cipherNodeList",
  getblockchainWorkboardData: baseUrl + '/API/Quorum/info',//
  //"/SIMU/getblockchain",
  nodeInsert: baseUrl + "/SIMU/cipherNodeInsert",
  nodeUpdate: baseUrl + "/SIMU/cipherNodeUpdate",
  getNodeDetail: baseUrl + "/SIMU/cipherNodeDetail",
  smartContractCompile: baseUrl + "/API/UI/smartContractCompile",
  smartContractDeploy: baseUrl + "/API/UI/smartContractDeploy",
  getSmartContractFiles: baseUrl + "/API/UI/smartContractFiles",
  getSmartContractDetails: baseUrl + "/API/UI/getSmartContractDetail",
  executeSmartContractGetter: baseUrl + "/API/Quorum/contractGetter",
  executeSmartContractSetter: baseUrl + "/API/Quorum/contractSetter",
  getSmartContractLogs: baseUrl + "/API/Quorum/getLogs",
  getSmartContractList: baseUrl + "/SIMU/cipherSmartContractList",
  smartContractUpdate: baseUrl + "/SIMU/cipherSmartContractInsert",
  getConsortiumList: baseUrl + "/API/UI/consortiumSearch",
  // getConsortiumDetails: baseUrl +"/SIMU/getConsortiumById",
  getConsortiumDetails: baseUrl + "/API/UI/consortiumDetail",
  getTxByBlock: baseUrl + "/API/Quorum/getTxByBlock",
  getTxByHash: baseUrl + "/API/Quorum/getTxByHash",

  getReportFilters: baseUrl + "/getFilter", //"/SIMU/reportFilters",

  getRefundBatchList: baseUrl + "/API/UI/refundBatchList",
  getViewRefundBatch: baseUrl + "/API/UI/viewRefundBatchDetail",

  getRefundList: baseUrl + "/API/UI/refundList",
  getRefundListView: baseUrl + "/API/UI/refundList",


  passwordChange: baseUrl + "/API/UI/passwordChange",
  passwordReset: baseUrl + "/API/UI/passwordReset",
  report: baseUrl + "/reports",

  getAPIPayLoadListData: baseUrl + "/API/UI/APIPayLoadList",
  getAPIPayloadDetail: baseUrl + "/API/UI/APIPayLoadDetail",

  repostAction: repostActionURL,
  repostActionInternal: baseUrl + '/API',
  tranBlockChainId: baseUrl + "/API/UI/tranBlockChainId",

  blockChainViewer: "http://localhost:3000" + "/BlockchainViewer/",


  getTranByHash: blockChainViewerURL + "/CCI/ePay/getTranxByHash",
  fetchCollectionValueByKey: baseUrl + "/API/ePay/fetchCollectionValueByKey",
  updateCollectionValueByKey: baseUrl + "/API/ePay/upsert",
  notificationViewed: baseUrl + "/API/UI/notificationViewed",
  getSLAWorkboardData: baseUrl + "/API/UI/getSLAData",
  getOrganizationTypes: baseUrl + "/API/UI/organizationType",

  userPoints: loyaltyBaseURL + "/users/details/points",
  userOrderList: loyaltyBaseURL + "/merchant/order",
  userPlaceOrder: loyaltyBaseURL + "/users/order",

  merchantPoints: loyaltyBaseURL + "/merchant/details/points",
  getMerchantCatalogue: loyaltyBaseURL + "/merchant/Catalogue",
  getOrderList: loyaltyBaseURL + "/merchant/order",
  getRewardCoinList: loyaltyBaseURL + "/merchant/pointDetails",
  getRequestSettlement: loyaltyBaseURL + "/merchant/requestBurning",
  merchantMarkComplete: loyaltyBaseURL + "/merchant/order/finalize",

  pgStats: loyaltyBaseURL + "/admin/stats",
  pgSettlement: loyaltyBaseURL + "/admin/settle",
  pgSettlementList: loyaltyBaseURL + "/admin/settlementList",
  pgPointSummary: loyaltyBaseURL + "/admin/getMerchantsPoints",

  getblockchainWorkboardData1: baseUrl + "/SIMU/1",
  getblockchainWorkboardData2: baseUrl + "/SIMU/2",
  getblockchainWorkboardData3: baseUrl + "/SIMU/3",
  getblockchainWorkboardData4: baseUrl + "/SIMU/4",
  getblockchainWorkboardData5: baseUrl + "/SIMU/5",
};
