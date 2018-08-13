export default {
  userData: {action: "", data: {}},
  entityList: {action: "", data: {searchResult: [], typeData: {entityNames: []}}},
  acquirerList: {action: "", data: {searchResult: [], typeData: {acquirerNames: []}}},
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
  fileTemplateList: {action: "", data: {searchResult: [], typeData: {fileTemplateNames: []}}},
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
  emailTemplateList: {action: "", data: {searchResult: [], typeData: {emailTemplateNames: []}}},
  emailTemplateDetail: {
    action: "emailTemplateDetail",
    data: {}
  },
  commissionTemplateList: {
    action: "commissionTemplateList",
    data: {searchResult: [], typeData: {commissionTemplateNames: []}}
  },
  commissionTemplateDetail: {
    action: "commissionTemplateDetail",
    data: {}
  },
  permissionData: {action: "", data: {menuPermissions: []}},
  notificationList: {},
  notificationDetailList: {action: "", data: {"pageData": {"totalRecords": 0}}},
  containerData: {action: "", data: {}},
  responseMessage: {
    action: "",
    data: {status: "ERROR", errorDescription: "I am the problem", routeTo: "success", displayToUser: false}
  },
  loginResponse: {action: "", data: {}},
  entityDashboardData: {
    action: "", data: {
      "dashboardTiles": [], "workboardData": {"pageData": {}}, "exceptionData": {
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

  settlementBatchData: {
    action: "",
    data: {
      BatchID: {},
      Entity: {EntityLogo: {Logo: {SizeSmall: "", SizeMedium: ""}}},
      SettlementSchedule: {},
      SettlementSummary: {
        PreviousResolvedExceptions: {Amount: 0},
        CurrentPeriodTrans: {Amount: 0},
        ProcessedPastRefund: {Amount: 0},
        TotalPayable: {Amount: 0}
      },
      CommissionBreakUp: {},
      CommissionBreakUpDetail: [],
      CurrentStatus: "",
      StatusList: [],
      actions: []
    }
  },
  settlementBatchProcessedData: {action: "", data: {StatusList: [], CurrentStatus: ""}},
  exceptionListData: {
    action: "", data: {
      SearchComponent: "", ExceptionList: {
        "pageData": {
          "PageSize": -1,
          "currentPage": -1,
          "totalRecords": -1
        }
      }
    }
  },
  pickListData: {action: "", data: {List: {}}},
  processorListData: {action: "", data: {ProcessorList: []}},
  transactionDetailData: {
    action: "",
    data: {Entity: {EntityLogo: {SizeSmall: "", sizeMedium: ""}}, StatusList: [], ActionList: [], CurrentStatus: ""}
  },
  transactionListData: {
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
  processActionResponseData: {action: "", data: {}},
  settlementListData: {action: "", data: {settlementData: {"pageData": {}}}},
  manualReconData: {
    "action": "manualRecon",
    "manualReconData": {
      "data": {}
    }
  },
  manualReconStatsData: {
    "action": "manualReconStatsData",
    "manualReconStatsData": {
      "data": {}
    }
  },
  manualReconProgressData: {},
  reconAuditTrail: {
    "action": "",
    "pageData": {
      "pageSize": 0,
      "currentPageNo": 0,
      "totalRecords": 0
    },
    "data": undefined
  },
  consortiumDetail: {
    "action": "consortiumDetail",
    "data": undefined
  },
  commissionBatchData: {
    action: "", "data": {
      "batchID": "",
      "acquirer": {logo: {}},
      "lastCommissionDate": "",
      "toDate": "",
      "counterSLA": "",
      "commissionOverdue": "",
      "commissionTiles": [],
      "commissionSummaryData": {"rows": []},
      "currentStatus": "",
      "statusList": [],
      "actions": []
    }
  },
  commissionBatchProcessedData: {action: "", data: {acquirer: {logo: {}}, currentStatus: "", statusList: []}},
  commissionListData: {action: "", data: {commissionData: {"pageData": {}, "rows": []}}},
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


  initiateDisputeData: {
    "action": "getRefundDataById",
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
  initiateRefundData: {
    "action": "getRefundDataById",
    "data": {
      "statusList": [],
      "selectedItem": "",
      "actionButtons": [],
      "refundData": {
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
  refundListData: {
    "action": "",
    "data": {
      "allowUpload": false,
      "allowComment": false,
      "actionButtons": [],
      "typeData": {
        "reasonData": []
      },
      "refundData": {
        "pageData": {},
        "rows": []
      }
    }
  },


  refundListViewData: {
    "action": "",
    "data": {
      "allowUpload": false,
      "allowComment": false,
      "actionButtons": [],
      "typeData": {
        "reasonData": []
      },
      "refundData": {
        "pageData": {},
        "rows": []
      }
    }
  },


  viewRefundData: {
    "action": "viewRefundData",
    "data": {
      "statusList": [],
      "RRN": "",
      "selectedStatus": "",
      "allowUpload": true,
      "allowComment": true,
      "refundData": {},
      "documents": [],
      "comments": [],
      "counter": {},
      "SLA": {},
      "typeData": {
        "reasonData": []
      },
      "actionButtons": []
    }
  },

  viewSettlementBatch: {
    "action": "", "data": {"settlementSummaryData": {"rows": []}},
  },
  groupDetail: {
    action: "",
    "data": {
      "searchResult": {"groupName": "", "description": "", "nodes": [], "expanded": [], "checked": []},
      "actions": []
    }
  },
  groupList: {action: "", pageData: {}, data: {searchResult: []}},
  userList: {action: "", pageData: {totalRecords: ""}, data: []},
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
  workingCalendarDetail: {
    action: "workingCalendarDetail",
    data: {
      "weekStartDate": "",
      "weekEndDate": "",
      "exceptionList": [],
      "actions": []
    }

  },

  auditLogList: {"action": "", "auditLogList": {"pageData": {"totalRecords": 0}}},

  viewCommissionBatch: {
    "action": "", "data": {"commissionSummaryData": {"rows": []}},
  },
  auditLogDetail: {"action": "", "data": ""},

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
  reconAuditList: {action: "", "reconAuditList": {"pageData": {"totalRecords": 0}}},

  refundBatchListData: {
    "action": "refundBatchListData",
    "data": {
      "refundData": {
        "pageData": {
          "PageSize": -1,
          "currentPage": -1,
          "totalRecords": -1
        },
        "rows": []
      }
    }
  },
  refundBatchData: {
    "action": "refundBatchData",
    "data": {
      "statusList": [],
      "selectedStatus": "",
      "acquirer": {
        "name": "",
        "imageURL": ""
      },
      "refundBatchNo": "",
      "refundData": {
        "pageData": {
          "PageSize": 0,
          "currentPage": 0,
          "totalRecords": 0
        },
        "rows": []
      }
    }
  },
  refundListViewData: {
    "action": "",
    "data": {
      "allowUpload": false,
      "allowComment": false,
      "actionButtons": [],
      "typeData": {
        "reasonData": []
      },
      "refundData": {
        "pageData": {
          "PageSize": 10,
          "currentPage": 1,
          "totalRecords": 20
        },
        "rows": []
      }
    }
  },
  changeResponseData: {action: "", data: {}},

  APIPayLoadList: {"action": "", "APIPayloadList": {"pageData": {"totalRecords": 0}}},
  APIPayLoadDetail: {"action": "", "data": ""},

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

  disputeListViewData: {
    "action": "",
    "data": {
      "allowUpload": false,
      "allowComment": false,
      "actionButtons": [],
      "typeData": {
        "reasonData": []
      },
      "disputeData": {
        "pageData": {},
        "rows": []
      }
    }
  },
  disputeListData: {
    "action": "",
    "data": {
      "allowUpload": false,
      "allowComment": false,
      "actionButtons": [],
      "typeData": {
        "reasonData": []
      },
      "disputeData": {
        "pageData": {},
        "rows": []
      }
    }
  },
  viewDisputeData: {
    "action": "viewDisputeData",
    "data": {
      "statusList": [],
      "RRN": "",
      "selectedStatus": "",
      "allowUpload": true,
      "allowComment": true,
      "actionButtons": [],
      "refundData": {},
      "documents": [],
      "comments": [],
      "counter": {},
      "SLA": {},
      "typeData": {
        "reasonData": []
      },
      "actionButtons": []
    }
  },
  disputeBatchListData: {
    "action": "disputeBatchListData",
    "data": {
      "disputeData": {
        "pageData": {
          "PageSize": -1,
          "currentPage": -1,
          "totalRecords": -1
        },
        "rows": []
      }
    }
  },
  getTransactions: {
    "action": "getTransactions",
    "data": {
      "monthList": [],
      "amountList": [],
      "countList": []
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
      "workboardData": {"pageData": {}}, "exceptionData": {
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
  organizationType: {
    "action": "organizationType",
    "organizationType": [],
    "organizations": []
  },
  userPoints: {},
  fetchPasswordPolicy: {},
  order: {},
  catlogue:{},
  merchantPoints: {},
  adminStats: {},
  Settlements: {},
  rewardList:{},
  pointSummary:{}
}

