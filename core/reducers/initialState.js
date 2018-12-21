import ApplicationsInitialSate from '../../applications/constants/InitialSateIndex';
export default {
  userData: { action: "", data: {} },
  enumList: { action: "", data: {} },
  entityList: { action: "", data: { searchResult: [], typeData: { entityNames: [] } } },
  acquirerList: { action: "", data: { searchResult: [], typeData: { acquirerNames: [] } } },
  entityDetail: {
    action: "", data: {
      "entityName": "",
      "arabicName": "",
      "shortCode": "",
      "legacyCode": "",
      "services": [],
      "isActive": false,
      "entityLogo": "",
      "parentEntity": "",
      "accounting": {
        "GISAccountNo": "",
        "exemptedTillDate": "",
        "notifyBeforeMonth": ""
      },
      "commissionTemplate": "",
      "recon": {
        "integrationType": "",
        "fileFormatTemplate": "",
        "noOfDays": "",
        "isBlockchain": "",
        "isFile": "",
        "isSFTP": "",
        "isService": ""
      },
      "settlement": {
        "settlementCriteria": "",
        "settlementType": "",
        "autoPeriod": "",
        "escalationAfter": ""
      },
      "status": {
        "value": "Pending",
        "type": "Info"
      },
      "contacts": [],
      "documents": [],
      "actions": [],
    }
  },
  acquirerDetail: {
    action: "", data: {
      "acquirerName": "",
      "arabicName": "",
      "shortCode": "",
      "legacyCode": "",
      "isActive": false,
      "acquirerLogo": "",
      "accounting": {
        "GISAccountNo": ""
      },
      "commissionTemplate": "",
      "recon": {
        "integrationType": "",
        "fileFormatTemplate": "",
        "noOfDays": "",
        "serverDetails": {
          "sFTPServer": "",
          "fileFormatTemplate": "File",
          "port": "",
          "username": "",
          "password": "",
          "certificate": ""
        }
      },
      "settlement": {
        "settlementCriteria": "",
        "settlementType": "",
        "autoPeriod": "",
        "escalationAfter": "",
        "shadowAccount": "",
        "fundsTransferSLAPeriod": ""
      },
      "status": {
        "value": "Pending",
        "type": "Info"
      },
      "cardsType": [],
      "contacts": [],
      "documents": [],
      "actions": []
    }
  },
  fileTemplateList: { action: "", data: { searchResult: [], typeData: { fileTemplateNames: [] } } },
  fileTemplateDetail: {
    action: "fileTemplateDetail",
    data: {
      "templateName": "",
      "fileNameRegEx": "\\w+",
      "fileType": "",
      "separator": "",
      "XMLMainTag": "",
      "skipLines": "",
      "fields": []
    }
  },
  typeData: {
    action: "typeData",
    data: undefined
  },
  emailTemplateList: { action: "", data: { searchResult: [], typeData: { emailTemplateNames: [] } } },
  emailTemplateDetail: {
    action: "emailTemplateDetail",
    data: {}
  },
  commissionTemplateList: {
    action: "commissionTemplateList",
    data: { searchResult: [], typeData: { commissionTemplateNames: [] } }
  },
  commissionTemplateDetail: {
    action: "commissionTemplateDetail",
    data: {}
  },
  permissionData: { action: "", data: { menuPermissions: [] } },
  notificationList: {},
  notificationDetailList: { action: "", data: { "pageData": { "totalRecords": 0 } } },
  containerData: { action: "", data: {} },
  responseMessage: {
    action: "",
    data: { status: "ERROR", errorDescription: "I am the problem", routeTo: "success", displayToUser: false }
  },
  loginResponse: { action: "", data: {} },
  entityDashboardData: {
    action: "", data: {
      "dashboardTiles": [], "workboardData": { "pageData": {} }, "exceptionData": {
        "exceptionSummary": {}, "chartData": {

          "fromDate": "2/2/2012",
          "toDate": "1/1/2012",
          "reconciledData": [],
          "expData": []
        }
      }
    }
  },
  acquirerDashboardData: {
    "acquirerDashboardData": {
      "action": "acquirerDashboard",
      "data": {
        "dashboardTiles": [],
        "workboardData": {}

      },
      "collectionData": {
        "pageData": {},
        "rows": []
      },
      "exceptionData": {
        "exceptionSummary": {},
        "chartData": {
          "fromDate": "2/2/2012",
          "toDate": "1/1/2012",
          "reconciledData": [],
          "expData": []
        }
      }
    }
  },

  pickListData: { action: "", data: { List: {} } },
  processorListData: { action: "", data: { ProcessorList: [] } },
  processActionResponseData: { action: "", data: {} },
  settlementListData: { action: "", data: { settlementData: { "pageData": {} } } },
  consortiumDetail: {
    "action": "consortiumDetail",
    "data": undefined
  },
  commissionBatchData: {
    action: "", "data": {
      "batchID": "",
      "acquirer": { logo: {} },
      "lastCommissionDate": "",
      "toDate": "",
      "counterSLA": "",
      "commissionOverdue": "",
      "commissionTiles": [],
      "commissionSummaryData": { "rows": [] },
      "currentStatus": "",
      "statusList": [],
      "actions": []
    }
  },
  commissionBatchProcessedData: { action: "", data: { acquirer: { logo: {} }, currentStatus: "", statusList: [] } },
  commissionListData: { action: "", data: { commissionData: { "pageData": {}, "rows": [] } } },
  commissionDetailData: {
    action: "", "data": {
      "acquirer": {
        "name": "",
        "arabicName": "",
        "logoURL": ""
      },
      "currentStatus": "",
      "statusList": [],
      "batchID": "",
      "tranAmount": "",
      "totalTransactions": "",
      "totalReversedTransactions": "",
      "commissionAmount": "",
      "reversedAmount": "",
      "blockChainAddress": "",
      "commissionSummaryData": {
        "pageData": {
          "PageSize": -1,
          "currentPage": -1,
          "totalRecords": -1
        },
        "rows": []
      }
    }
  },


  groupDetail: {
    action: "",
    "data": {
      "searchResult": { "groupName": "", "description": "", "nodes": [], "expanded": [], "checked": [] },
      "actions": []
    }
  },
  groupList: { action: "", pageData: {}, data: { searchResult: [] } },
  userList: { action: "", pageData: { totalRecords: "" }, data: [] },
  userDetails: {
    action: "", data: {
      "searchResult": {
        "_id": -1,
        "firstName": "",
        "email": "",
        "orgType": "",
        "lastName": "",
        "userID": "",
        "userType": "",
        "isActive": true,
        "password": "",
        "profilePic": "",
        "firstScreen": "",
        "entityID": null,
        "acquirerID": null,
        "authType": "",
        "lang": "",
        "userGroups": []
      },
      "actions": []
    }
  },
  user: {
    "action": "user",
    "data": {
      "searchResult": {},
      "actions": []
    }
  },
  MappingConfigData: {
    "action": "MappingConfigData",
    "data": {}
  },
  ApiListData: {},
  getActiveAPIs : {"action": "", "data": []},
  APIDefinitionAddUpdate: {},
  AddUpdateModule: {},
  AddUpdateNetwork:{},
  AddUpdateChannel:{},
  ChannelListData:{},
  AddUpdateSmartContract:{},
  ChannelTypeData:{},
  SmartContractList:{},
  AddUpdateConsortium:{},
  ConsortiumList:{},
  SmartContractTypeData:{},
  NetworkTypeData:{},
  NetworkPeerList:{},
  HyperledgerConnect:{},
  ApiListCombo: {},
  EventDispatcherList: {},
  MappingOrgFieldData:{},
  EventDispatcherDetails: {},
  EventDispatcherTypeList: {},
  ConsortiumTypeData:{},
  RouteList: {},
  workingCalendarDetail: {
    action: "workingCalendarDetail",
    data: {
      "weekStartDate": "",
      "weekEndDate": "",
      "exceptionList": [],
      "actions": []
    }

  },

  auditLogList: { "action": "", "auditLogList": { "pageData": { "totalRecords": 0 } } },

  auditLogDetail: { "action": "", "data": "" },

  nodeDetail: {
    action: "nodeDetail",
    data: {}
  },
  smartContractDetail: {
    action: "smartContractDetail",
    data: {}
  },
  reportFilters: {
    "data": []
  },
  reconAuditList: { action: "", "reconAuditList": { "pageData": { "totalRecords": 0 } } },

  changeResponseData: { action: "", data: {} },

  APIPayLoadList: { "action": "", "APIPayloadList": { "pageData": { "totalRecords": 0 } } },
  APIPayLoadDetail: { "action": "", "data": "" },

  tranBlockChainId: {
    "tranBlockChainId": {
      "action": "tranBlockChainId",
      "data": {
        "UUID": "",
        "body": {
          "success": false
        }
      }
    }
  },
  SLAData: {
    "action": "getSLAData",
    "data": {
      "dashboardTiles": [],
      "workboardData": {
        "pageData": {
          "totalRecords": 0
        },
        "rows": []
      }
    }
  },

  ResultData: {},

  initiateDisputeData: {
    "action": "getDisputeDataById",
    "data": {
      "statusList": [],
      "selectedItem": "",
      "actionButtons": [],
      "disputeData": {
        "PGRefNo": "",
        "DEGRefNo": "",
        "RefundRefNo": "",
        "RefNo": "",
        "PGAmount": "",
        "DEGAmount": "",
        "TransactionDate": "",
        "IPAddress": "",
        "customerEmail": "",
        "cardType": "",
        "customerMobile": ""
      },
      "typeData": {
        "reasonData": []
      }
    }

  },


  disputeBatchData: {
    "action": "disputeBatchData",
    "data": {
      "statusList": [],
      "selectedStatus": "",
      "acquirer": {
        "name": "",
        "imageURL": ""
      },
      "disputeBatchNo": "",
      "disputeData": {
        "pageData": {
          "PageSize": 0,
          "currentPage": 0,
          "totalRecords": 0
        },
        "rows": []
      }
    }
  },
  blockchainWorkboardData: {
    action: "", data: {
      "dashboardTiles": [],
      "workboardData": { "pageData": {} }, "exceptionData": {
        "exceptionSummary": {}, "chartData": {
          "fromDate": "2/2/2012",
          "toDate": "1/1/2012",
          "reconciledData": [],
          "expData": []
        }
      }
    }
  },
  blockTransactionListData: {
    action: "", data: {
      SearchComponent: "", TransactionList: {
        "pageData": {
          "PageSize": -1,
          "currentPage": -1,
          "totalRecords": -1
        }
      }
    }
  },
  health: {},
  passwordReset: {},
  blockDetail: {},
  getTxByHash: {},
  contractStructure: {},
  contractGetter: {},
  contractSetter: {},
  contractLogs: {},
  smartContractFiles: {},
  settlementSummary: {
    "action": "settlementSummary",
    "data": {}
  },
  exportDeclarationListData: {
    data: {
      SearchComponent: "", exportDeclarationList: {
        "pageData": {
          "PageSize": -1,
          "currentPage": -1,
          "totalRecords": -1
        }
      }
    }
  },

  participantList: {
    data: {
      "rows": []
    }
  },

  declarationDetail: {
    "action": "declarationDetail",
    "data": {
      "owner": "",
      "status": "",
      "declarationNumber": "",
      "declarationType": "",
      "exporterName": "",
      "exporterCountry": "",
      "destinationCountry": "",
      "portOfDischarge": "",
      "nextPortOfDischarge": "",
      "weight": "",
      "etd": "",
      "invoiceValue": "",
      "deposit": "",
      "modeOfPayment": "",
      "address": "",
      "items": [],
      "containers": []
    }
  },
  fetchPasswordPolicy: {},
  EventList: { "action": "", "EventList": { "pageData": { "totalRecords": 0 } } },
  AddUpdateEventList: {
    "action": "",
    "data": {
      "dispatcherListAll": [],
      "datasourceListAll": [],
      "eventData": {
      }
    }
  },
  AddUpdateMapping: {
    "action": "",
    "data": {

    }
  }, FunctionData: {
    "action": "FunctionData",
    "data": {
    }
  },
  MappingList: { "action": "", "datasourceList": { "pageData": { "totalRecords": 0 } } },
  DatasourceList: { "action": "", "datasourceList": { "pageData": { "totalRecords": 0 } } },
  AddUpdateDatasource: {
    "action": "",
    "data": {
      "datasource": {
      }
    }
  },
  downloadChainCode :{},
  EventDispatcherStatus: { "action": "", "dispatchList": { "pageData": { "totalRecords": 0 } } },
  DispatchList: { "action": "", "dispatchList": { "pageData": { "totalRecords": 0 } } },
  AddUpdateDispatcher: {
    "action": "",
    "data": {
      "dispatcher": {
      }
    }
  },
  ...ApplicationsInitialSate
}

