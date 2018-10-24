import backOffices from '../../applications/backOffices';
import CommunicationIndex from '../../applications/constants/CommunicationIndex';

let baseUrl = backOffices.baseUrl;
let blockChainURL = backOffices.blockChainURL;
let webSocketURL = backOffices.webSocketURL;
let repostActionURL = backOffices.repostActionURL;
let blockChainViewerURL = backOffices.blockChainViewerURL;

module.exports = {
  ...CommunicationIndex,
  baseUrl,
  getPermission: baseUrl + "/API/UI/permission",
  getUserData: baseUrl + "/API/UI/user",
  getNotificationData: baseUrl + "/API/UI/notificationList",
  getBatchById: baseUrl + "/SIMU/getBatchById",
  getError: baseUrl + "/SIMU/error",
  getLogin: baseUrl + "/login",
  getSocket: webSocketURL,
  performActionToBlockChain: blockChainURL,

  getFileTemplateList: baseUrl + '/API/UI/fileTemplateList',
  getFileTemplateDetail: baseUrl + '/API/UI/fileTemplateDetail',
  fileTemplateUpdate: baseUrl + '/API/UI/fileTemplateUpdate',
  fileTemplateInsert: baseUrl + '/API/UI/fileTemplateInsert',

  getCommissionTemplateList: baseUrl + '/API/UI/commissionTemplateList',
  getCommissionTemplateDetails: baseUrl + '/API/UI/commissionTemplateDetail',
  commissionTemplateUpdate: baseUrl + '/API/UI/commissionTemplateUpdate',
  commissionTemplateInsert: baseUrl + '/API/UI/commissionTemplateInsert',

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

  getEntityList: baseUrl + "/API/UI/orgList",
  entityInsert: baseUrl + "/API/UI/orgInsert",
  getEntityDetail: baseUrl + "/API/UI/orgDetail",
  entityUpdate: baseUrl + "/API/UI/orgUpdate",

  getworkingCalendarDetail: baseUrl + "/SIMU/workingCalendarDetail",
  workingCalendarUpdate: baseUrl + "/SIMU/workingCalendarUpdate",
  uploadImg: baseUrl + "/uploadImg",
  uploadFile: baseUrl + "/uploadFile/local",
  uploadFileFPS: baseUrl + "/uploadFile/fps",
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
  getHealthData: baseUrl + "/API/Cipher/health",

  getReportFilters: baseUrl + "/getFilter", //"/SIMU/reportFilters",

  passwordChange: baseUrl + "/API/UI/passwordChange",
  passwordReset: baseUrl + "/API/UI/passwordReset",

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

  getblockchainWorkboardData1: baseUrl + "/SIMU/1",
  getblockchainWorkboardData2: baseUrl + "/SIMU/2",
  getblockchainWorkboardData3: baseUrl + "/SIMU/3",
  getblockchainWorkboardData4: baseUrl + "/SIMU/4",
  getblockchainWorkboardData5: baseUrl + "/SIMU/5",
  getPickupList: baseUrl + "/API/UI/typeDataList",
  getPickupListDetail: baseUrl + "/API/UI/getTypeDataDetailByID",
  passwordPolicyDetail: baseUrl + "/API/UI/fetchAllPasswordPolicy",
  validateBatch: baseUrl + "/API/UI/valBatchCreation",
  updatePasswordPolicy: baseUrl + "/API/UI/updatePasswordPolicy",
  getEventListData:baseUrl + "/API/UI/getEventRegistry",
  getEventRegistryByID:baseUrl + "/API/UI/getEventRegistryByID",
  getDispatcherList:baseUrl + "/API/UI/getDispatcherList",
  upsertEventsList:baseUrl + "/API/UI/upsertEventRegistry",
  getDataSourceByID:baseUrl + "/APII/UI/getdataSourceByID",
  getDatasourceListData:baseUrl + "/API/UI/getdataSource",
  upsertDataSource:baseUrl + "/APII/UI/upsertDataSource",
  getEventDispatcherStatus:baseUrl + "APII/UI/getEventDispatcherStatus"
};
