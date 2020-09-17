import backOffices from '../../applications/backOffices';
import CommunicationIndex from '../../applications/constants/CommunicationIndex';

let baseUrl = backOffices.baseUrl;
let reportUrl = backOffices.reportUrl;
let blockChainURL = backOffices.blockChainURL;
let webSocketURL = backOffices.webSocketURL;
let repostActionURL = backOffices.repostActionURL;
let blockChainViewerURL = backOffices.blockChainViewerURL;

module.exports = {
  ...CommunicationIndex,
  baseUrl,
  reportUrl,
  // getTask: baseUrl + '/API/UI/getTask',
  getPermission: baseUrl + "/API/UI/permission",
  getUserData: `${baseUrl}/API/UI/user`,
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

  workingCalendarDetail: baseUrl + "/API/UI/workingCalendarDetail",
  workingCalendarInsert: baseUrl + "/API/UI/workingCalendarInsert",
  workingCalendarList: baseUrl + "/API/UI/workingCalendarList",
  workingCalendarUpdate: baseUrl + "/API/UI/workingCalendarUpdate",
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
  getSmartContractList: baseUrl + "/API/core/getSmartContractList",
  smartContractUpdate: baseUrl + "/SIMU/cipherSmartContractInsert",
  getConsortiumList: baseUrl + "/API/UI/consortiumSearch",
  // getConsortiumDetails: baseUrl +"/SIMU/getConsortiumById",
  getConsortiumDetails: baseUrl + "/API/core/getConsortiumConfigByDetailID",
  getTxByBlock: baseUrl + "/API/Quorum/getTxByBlock",
  getTxByHash: baseUrl + "/API/Quorum/getTxByHash",
  getHealthData: baseUrl + "/API/Cipher/health",

  // getReportFilters: baseUrl + "/API/UI/getFilter",

  passwordChange: baseUrl + "/API/UI/setPassword",
  passwordReset: baseUrl + "/API/UI/passwordReset",

  activateUser: baseUrl + "/API/UI/activateUser",

  getAPIPayLoadListData: baseUrl + "/API/UI/APIPayLoadList",
  getAPIPayloadDetail: baseUrl + "/API/UI/APIPayLoadDetail",

  repostAction: repostActionURL,
  repostActionInternal: baseUrl + '/API',
  tranBlockChainId: baseUrl + "/API/UI/tranBlockChainId",

  blockChainViewer: "/BlockchainViewer/",


  getTranByHash: blockChainViewerURL + "/CCI/ePay/getTranxByHash",
  fetchCollectionValueByKey: baseUrl + "/API/ePay/fetchCollectionValueByKey",
  updateCollectionValueByKey: baseUrl + "/API/ePay/upsert",
  notificationViewed: baseUrl + "/API/UI/notificationViewed",
  getSLAWorkboardData: baseUrl + "/API/UI/getSLAData",
  getblockchainWorkboardDataHF: baseUrl + "/API/Cipher/Query",
  getblockchainWorkboardData1: baseUrl + "/SIMU/1",
  getblockchainWorkboardData2: baseUrl + "/SIMU/2",
  getblockchainWorkboardData3: baseUrl + "/SIMU/3",
  getblockchainWorkboardData4: baseUrl + "/SIMU/4",
  getblockchainWorkboardData5: baseUrl + "/SIMU/5",
  passwordPolicyDetail: baseUrl + "/API/UI/fetchAllPasswordPolicy",
  validateBatch: baseUrl + "/API/UI/valBatchCreation",
  updatePasswordPolicy: baseUrl + "/API/UI/updatePasswordPolicy",
  getEventListData: baseUrl + "/API/UI/getEventRegistry",
  getEventRegistryByID: baseUrl + "/API/UI/getEventRegistryByID",
  getDispatcherList: baseUrl + "/API/UI/getDispatcherList",
  upsertEventsList: baseUrl + "/API/UI/upsertEventRegistry",
  getDataSourceByID: baseUrl + "/APII/UI/getdataSourceByID",
  getDatasourceListData: baseUrl + "/API/UI/getdataSource",
  upsertDataSource: baseUrl + "/API/UI/upsertDataSource",
  getEventDispatcherStatus: baseUrl + "/APII/UI/getEventDispatcherStatus",
  getFunctionData: baseUrl + '/API/core/getListFunction',
  upsertMappingConfig: baseUrl + '/API/core/upsertMappingConfig',
  getMappingConfigByID: baseUrl + '/API/core/getMappingConfigByID',
  getMappingListData: baseUrl + '/API/core/getMappingConfig',
  getAPIDefinitionAddUpdate: baseUrl + "/SIMU/APIDefinitionScreen",
  getMappingList: baseUrl + "/API/core/getMappingList",
  upsertAPIDefinition: baseUrl + "/API/core/upsertAPIDefinition",
  getAPIDefinitionID: baseUrl + "/API/core/getAPIDefinitionID",
  getApiListData: baseUrl + "/API/core/getAPIDefinition",
  APIDocs: baseUrl + "/API/core/getActiveAPIList",
  APIDocsContarct: baseUrl + "/API/core/apiDocsContarct",
  downloadChainCode: baseUrl + "/API/core/downloadChainCode",
  getTypeDataList: baseUrl + "/API/core/getTypeDataList",
  getModuleListData: baseUrl + "/API/core/getModuleList",
  getModuleConfigByID: baseUrl + "/API/core/getModuleConfigByID",
  getAllLetters: baseUrl + "/API/core/getAllLetters",
  addUpdateLetter: baseUrl + "/API/core/addUpdateLetter",
  testLetter: baseUrl + "/API/core/testLetter",
  addUpdateSampleTemplate: baseUrl + "/API/core/addUpdateSampleTemplate",
  getSampleLetters: baseUrl + "/API/core/getSampleLetters",
  getAPIList: baseUrl + "/API/core/getAPIList",
  updateModuleConfig: baseUrl + "/API/core/updateModuleConfig",
  getdispatchListData: baseUrl + "/API/UI/getEventDispatcher",
  getDispatcherMeta: baseUrl + "/API/UI/getDispatcherMeta",
  upsertEventDispatcher: baseUrl + "/API/UI/upsertEventDispatcher",
  getEventDispatcherByID: baseUrl + "/API/UI/getEventDispatcherByID",
  updateEventDispatcherStatus: baseUrl + "/API/UI/updateEventDispatcherStatus",
  updateNetworkConfig: baseUrl + "/API/core/updateNetworkConfig",
  getNetworkConfigByID: baseUrl + "/API/core/getNetworkConfigByID",
  getNetworkListData: baseUrl + "/API/core/getNetworkList",
  getNetworkTypeList: baseUrl + "/API/core/getNetworkTypeList",
  getPeerList: baseUrl + "/API/core/getPeerList",
  hyperledgerConnect: baseUrl + "/API/Cipher/hyperledgerConnect",
  quorumConnect: baseUrl + "/API/Cipher/quorumConnect",
  updateChannelConfig: baseUrl + "/API/core/updateChannelConfig",
  getChannelConfigByID: baseUrl + "/API/core/getChannelConfigByID",
  getChannelListData: baseUrl + "/API/core/getChannelList",
  getChannelTypeList: baseUrl + "/API/core/getChannelTypeList",

  getSmartContractConfigDetailedByID: baseUrl + "/API/core/getSmartContractConfigDetailedByID",

  getSmartContractTypeList: baseUrl + "/API/core/getSmartContractTypeList",
  getSmartContractConfigByID: baseUrl + "/API/core/getSmartContractConfigByID",
  updateSmartContractConfig: baseUrl + "/API/core/updateSmartContractConfig",
  updateConsortiumConfig: baseUrl + "/API/core/updateConsortiumConfig",
  getConsortiumConfigByID: baseUrl + "/API/core/getConsortiumConfigByID",
  getConsortiumConfigList: baseUrl + "/API/core/getConsortiumList",
  getMappingConfigOrgFieldData: baseUrl + "/API/core/getMappingConfigOrgFieldData",
  getConsortiumTypeList: baseUrl + "/API/core/getConsortiumTypeList",

  getActiveAPIs: baseUrl + "/API/core/getActiveAPIs",

  getCollectionList:baseUrl + "/API/HyperLedger/getCollectionsList",
  getDocumentRevesions:baseUrl + "/API/HyperLedger/getDocumentRevesions",

  getAdaptorsList: baseUrl + "/API/core/getAdaptorsList",
  getAvailableObjectsList: baseUrl + "/API/core/getAvailableObjectsList",
  getDBFields: baseUrl + "/API/core/getDBFields",
  generateMappingFile: baseUrl + "/API/core/generateMappingFile",

  findEndpointDefinationById: baseUrl + "/API/core/findEndpointDefinationById",
  upsertEndpointDefination: baseUrl + "/API/core/upsertEndpointDefination",
  findEndpointDefination: baseUrl + "/API/core/findEndpointDefination",
  getEndpointListView: baseUrl + "/API/core/getEndpointListView",
  CompareDBSql: baseUrl + "/API/utility/CompareDBSql",
  WriteScriptSQL: baseUrl + "/API/utility/WriteScriptSQL",
  ApplyScriptSQL: baseUrl + "/API/utility/ApplyScriptSQL",
  CompareDBPostgre: baseUrl + "/API/utility/CompareDBPostgre",
  WriteScriptPostgreSql: baseUrl + "/API/utility/WriteScriptPostgreSql",
  ApplyScriptPostgreSql: baseUrl + "/API/utility/ApplyScriptPostgreSql",
  getTemplatesListView: baseUrl + "/API/core/getTemplatesListView",
  findAPITemplate: baseUrl + "/API/core/findAPITemplate",
  findAPITemplateById: baseUrl + "/API/core/findAPITemplateById",
  upsertAPITemplate: baseUrl + "/API/core/upsertAPITemplate",
  testAPITemplate: baseUrl + "/API/core/testAPITemplate",
  ipfsInfo: baseUrl + "/API/IPFS/info",
  ipfsView: baseUrl + "/API/IPFS/view",

  getFieldsVault: baseUrl + "/API/core/getElementList",
  generateConfig: baseUrl + "/API/core/generateConfig",
  createDynamicStruct: baseUrl + "/API/core/createDynamicStruct",
  getBlkUserList: baseUrl + "/API/core/getUserList",
  getOnBoardingList: baseUrl + '/API/UI/getOnBoardingList',
  getOnBoardingProStructList: baseUrl + '/API/UI/getOnBoardingProStructList',
  insertOnBoarding: baseUrl + '/API/UI/insertOnBoarding',
  updateOnBoarding: baseUrl + '/API/UI/updateOnBoarding',
  getOnBoardingDetail: baseUrl + '/API/UI/getOnBoardingDetail',
  getComplexServiceList: baseUrl + '/API/core/getComplexServiceList',
  getParseFile: baseUrl + '/API/core/getImport',
  upsertAPIImport: baseUrl + '/API/core/upsertAPIImport',
  getRelayNetworkListData: baseUrl + '/API/core/getRelayNetworkConfig',
  updateRelayNetworkConfig: baseUrl + '/API/core/updateRelayNetworkConfig',
  getRelayNetworkConfigByID: baseUrl + '/API/core/getRelayNetworkConfigByID',
  getRelayNetworkConfigList: baseUrl + '/API/core/getRelayNetworkConfigList',
  getRelayNetworkConfigListTd: baseUrl + '/API/core/getRelayNetworkConfigListTd',
  logout: baseUrl + '/logout',
  getPickupList: baseUrl + "/API/UI/typeDataList",
  getPickupListByType: baseUrl + "/API/UI/typeDataListByType",
  getPickupListForType: baseUrl + "/API/UI/typeDataListForType",
  updateTypeData: baseUrl + "/API/UI/updateTypeData",
  getPickupListDetail: baseUrl + "/API/UI/getTypeDataDetailByID",
  fileList: baseUrl + "/API/core/getFileList",
  fileData: baseUrl + "/API/core/getFileData",
  getDBEndpointListView: baseUrl + "/API/core/getDBEndpointListView",
  getTableNames: baseUrl + "/API/core/getTableNames",
  getFieldsList: baseUrl + "/API/core/getFieldsList",
  getModuleConfigAll: baseUrl + "/API/core/getModuleConfigAll",
  updateErrorCodeList: baseUrl + "/API/core/updateErrorCodeList",
  getErrorCodeList: baseUrl + "/API/core/getErrorCodeList",
  groupTypeList: baseUrl + "/API/UI/groupTypeList",
  createOnDemandWelCome: baseUrl + "/API/UI/createOnDemandWelCome",
  generateHMAC: baseUrl + "/API/core/generateHMAC",
  getADHReportByID: baseUrl + "/API/core/getADHReportByID",
  getADHReportList: baseUrl + "/API/core/getADHReportList",
  getADHReportListProtected: baseUrl + "/API/core/getADHReportListProtected",
  updateADHReport: baseUrl + "/API/core/updateADHReport",
  testADHReport: baseUrl + "/API/core/testADHReport",
  getTask: baseUrl + '/API/Task/getTask',
  searchTask: baseUrl + '/API/Task/searchTask',
  addTask: baseUrl + '/API/Task/addTask',
  searchTaskDetails: baseUrl + '/API/Task/searchTaskDetails',
  getSafLogs: baseUrl + '/API/core/getSafLogs',
  updateSafLogs: baseUrl + '/API/core/updateSafLogs',
  getHealthRuleList: baseUrl + '/API/core/getHealthRuleList',
  updateHealthRuleList: baseUrl + '/API/core/updateHealthRuleList',
  getReportFilters: baseUrl + "/API/UI/getFilter",
  report: baseUrl + "/reports",
  getTypeSyncOut: baseUrl + "/API/meta/getTypeSyncOut",
  pushTypeData: baseUrl + "/API/general/pushTypeData",
  testPagination: baseUrl + "/API/core/testPagination",
  userApproveReject: baseUrl + "/API/UI/userApproveReject",
  mongodbSchemaProfiles: baseUrl + "/API/utility/getMongodbSchemaProfiles",
  getMongoDBChanges: baseUrl + "/API/utility/getMongoDBChanges",
  applyMongoDBChanges: baseUrl + "/API/utility/upsertMongodbChange",
  encryptString: baseUrl + "/API/utility/encrypt",
  decryptString: baseUrl + "/API/utility/decrypt",
}

