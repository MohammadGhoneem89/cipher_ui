module.exports = {
  exceptionList: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "", key: "TransactionID", type: "hiddenID"},
    {alias: "EL_entity", key: "ServiceProvider", type: "image"},
    {alias: "EL_processor", key: "processorName", type: "string"},
    {alias: "EL_ePayRef", key: "DEGTransactionNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "TL_SPTransNo", key: "SPTransactionNo", type: "string"},
    {alias: "TL_PGTransNo", key: "PGTransactionNo", type: "string"},
    {alias: "TL_Service", key: "Service", type: "string"},
    {alias: "EL_date", key: "TransactionRequestedDate", type: "string"},
    {alias: "EL_exceptionType", key: "exceptionType", type: "string"},
    //{ alias: "EL_userID", key: "userID", type: "string" },
    {alias: "EL_PaymentStatus", key: "paymentStatus", type: "string"},
    {alias: "TL_Amount", key: "Amount", type: "amount"},
    {alias: "EL_actions", key: "actions", type: "action"}
  ],
  settlementBatch: [
    {alias: "SB_PaymentMode", key: "paymentMode", type: "string"},
    {alias: "SB_CardType", key: "cardType", type: "string"},
    {alias: "SB_SettledAmount", key: "settledAmount", type: "amount"},
    {alias: "SB_TotalNoTrans", key: "totalTran", type: "string"},
    {alias: "SB_InvoiceAmount", key: "invoiceAmount", type: "string"},
    {alias: "SB_InvoiceCharges", key: "invoiceCharges", type: "amount"},
    {alias: "SB_RefundedAmount", key: "refundedAmount", type: "amount"},
    {alias: "SB_RefundedTran", key: "refundedTransaction", type: "string"},
    {alias: "SB_RefundedCharges", key: "refundedCharges", type: "amount"},
    {alias: "SB_FinalInvoiceAmount", key: "finalInvoiceAmount", type: "amount"}
  ],
  transactionList: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "", key: "TransactionID", type: "hiddenID"},
    {alias: "TL_entity", key: "ServiceProvider", type: "image"},
    {alias: "EL_processor", key: "processorName", type: "string"},
    {alias: "TL_DEGTransNo", key: "DEGTransactionNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "TL_SPTransNo", key: "SPTransactionNo", type: "string"},
    {alias: "TL_PGTransNo", key: "PGTransactionNo", type: "string"},
    {alias: "TL_Service", key: "Service", type: "string"},
    {alias: "TL_TransactionDate", key: "TransactionRequestedDate", type: "string"},
    {alias: "TL_PaymentStatus", key: "paymentStatus", type: "string"},
    {alias: "TL_Status", key: "TranStatus", type: "statusLabel"},
    {alias: "TL_Amount", key: "Amount", type: "amount"},
    {alias: "TL_actions", key: "actions", type: "action"}
  ],

  settlementListData: [
    {alias: "", key: "batchNo", type: "hiddenID"},
    {alias: "SL_entityName", key: "entityName", type: "image"},
    {alias: "SL_batchNo", key: "batchNo", type: "hyperlink", url: "/viewSettlementBatch"},
    {alias: "SL_dateInitiated", key: "dateInitiated", type: "string"},
    {alias: "SL_amount", key: "amount", type: "amount"},
    {alias: "SL_commission", key: "commission", type: "amount"},
    {alias: "SL_netTotalAmount", key: "netTotalAmount", type: "amount"},
    {alias: "SL_status", key: "status", type: "statusLabel"},
    {alias: "SL_action", key: "action", type: "action"}
  ],
  refundListData: [
    {alias: "RL_refNo", key: "refNo", type: "cb"},
    {alias: "", key: "refNo", type: "hiddenID"},
    {alias: "RL_entity", key: "ServiceProvider", type: "image"},
    {alias: "RL_acquirer", key: "acquirerName", type: "string"},
    {alias: "RL_refNo", key: "refNo", type: "string"},
    {alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "RL_SPRefNo", key: "SPRefNo", type: "string"},
    {alias: "RL_PGRefNo", key: "PGRefNo", type: "string"},
    {alias: "RL_date", key: "date", type: "string"},
    {alias: "RL_amount", key: "Amount", type: "amount"},
    {alias: "RL_status", key: "status", type: "statusLabel"},
    {alias: "RL_action", key: "actions", type: "action"}
  ],

  refundBatchListData: [
    {alias: "", key: "batchNo", type: "hiddenID"},
    {alias: "RBL_BatchNo", key: "batchNo", type: 'hyperlink', url: '/viewRefundBatch'},
    {alias: "RBL_acquirer", key: "acquirerName", type: "string"},
    {alias: "RBL_date", key: "date", type: "string"},
    {alias: "RBL_TotalTran", key: "RefundCount", type: "string"},
    {alias: "RBL_TotalAmount", key: "RefundAmount", type: "amount"},
    {alias: "RBL_status", key: "status", type: "statusLabel"},
    {alias: "RBL_action", key: "actions", type: "action"}
  ],


  entityWorkBoard: [
    {alias: "", key: "spCode", type: "hiddenID"},
    {alias: "EWB_name", key: "name", type: "image", width: "20%"},
    {alias: "EWB_lastSettlementDate", key: "lastSettlementDate", type: "string"},
    {alias: "EWB_overDue", key: "overDue", type: "statusLabel"},

    {alias: "EWB_settlementPeriod", key: "settlementPeriod", type: "string"},
    //{ alias: "EWB_totalTransaction", key: "totalTransaction", type: "string" },
    {alias: "EWB_pendingExceptions", key: "pendingExceptions", type: "string"},
    {alias: "EWB_refundFiled", key: "refundFiled", type: "string"},
    {alias: "EWB_lastDateRecon", key: "lastDateRecon", type: "string"},
    {alias: "EWB_actions", key: "actions", type: "action"}
  ],


  acquirerWorkBoard: [
    {alias: "", key: "pgCode", type: "hiddenID"},
    {alias: "AWB_name", key: "name", type: "image"},
    {alias: "AWB_lastReconDate", key: "lastReconDate", type: "string"},
    {alias: "AWB_overDue", key: "overDue", type: "statusLabel"},
    {alias: "AWB_lastCommissionDisbusal", key: "lastCommissionDisbusal", type: "string"},
    //{ alias: "AWB_totalTransaction", key: "totalTransaction", type: "string" },
    {alias: "AWB_commissions", key: "commissions", type: "string"},
    {alias: "AWB_pendingExceptions", key: "pendingExceptions", type: "string"},
    {alias: "AWB_refundFiled", key: "refundFiled", type: "string"},
    {alias: "AWB_refunded", key: "refunded", type: "string"},
    {alias: "AWB_actions", key: "actions", type: "action"}
  ],

  attachments: [
    {alias: "GEN_File", key: "name", type: "string"},
    {alias: "GEN_Action", key: "action", type: "action"}
  ],

  comments: [
    {alias: "GEN_date", key: "date", type: "string"},
    {alias: "GEN_userID", key: "userId", type: "string"},
    {alias: "GEN_org", key: "org", type: "string"},
    {alias: "GEN_comments", key: "comment", type: "string"}

  ],
  acquirerCollections: [
    {alias: "AWB_acquirer", key: "acquirer", type: "string"},
    {alias: "AWB_position", key: "position", type: "string"}
  ],


  manualReconStats: [
    {alias: "MRS_type", key: "Type", type: "string"},
    {alias: "MRS_count", key: "Count", type: "string"}
  ],
  reconAuditTrailData: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "MRA_date", key: "createdAt", type: "string"},
    {alias: "MRA_reconAction", key: "reconType", type: "string"},
    {alias: "MRA_entityType", key: "reqType", type: "orgType"},
    {alias: "MRA_serviceCode", key: "serviceCode", type: "string"},
    {alias: "MRA_shortCode", key: "shortCode", type: "string"},
    {alias: "MRA_fileName", key: "fileName", type: "string"},
    {alias: "MRA_userID", key: "createdID", type: "string"},
    {alias: "MRA_status", key: "status", type: "string"},
    {alias: "MRA_action", key: "actions", type: "action"}
  ],
  commissionBathData: [
    {alias: "CB_summary", key: "summary", type: "string"},
    {alias: "CB_amount", key: "amount", type: "amount"},
    {alias: "CB_count", key: "count", type: "rightAlign"}

  ],

  commissionList: [
    {alias: "", key: "batchNo", type: "hiddenID"},
    {alias: "CL_Processor", key: "entityName", type: "image"},
    {alias: "CL_Date", key: "dateInitiated", type: "string"},
    {alias: "CL_AmountAED", key: "amount", type: "string"},
    {alias: "CL_status", key: "status", type: "statusLabel"},
    {alias: "CL_Commission", key: "commission", type: "string"},
    {alias: "CL_BatchNo", key: "batchNo", type: "string"},
    {alias: "CL_actions", key: "action", type: "action"}
  ],
  commissionDetailData: [
    {alias: "CD_summary", key: "summary", type: "string"},
    {alias: "CD_amount", key: "amount", type: "string"}

  ],

  settlementBatchTransactionData: [
    {alias: "", key: "degRefNo", type: "hiddenID"},
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "CBV_batchID", key: "batchID", type: "string"},
    {alias: "CBV_pgCode", key: "pgCode", type: "string"},
    {alias: "CBV_DGRefNo", key: "degRefNo", type: "hyperlink", url: '/viewTransactionDetail'},
    {alias: "CBV_SPRefNo", key: "spRefNo", type: "string"},
    {alias: "CBV_PFRefNo", key: "pegRefNo", type: "string"},
    {alias: "CBV_Service", key: "Service", type: "string"},
    {alias: "CBV_TranData", key: "tranDate", type: "string"},
    {alias: "CBV_Amount", key: "amount", type: "amount"},
    {alias: "CBV_Commission", key: "EntityCommissionAmt", type: "amount"},
    {alias: "CBV_Status", key: "tranStatus", type: "statusLabel"},
    {alias: "CBV_action", key: "actions", type: "action"}
  ],

  settlementBatchSummaryDataData: [
    {alias: "CD_Summary", key: "summary", type: "leftAlign"},
    {alias: "CD_Amount", key: "amount", type: "amount"},
    {alias: "CD_Count", key: "count", type: "rightAlign"},
  ],

  entityServices: [
    {alias: "ES_serviceName", key: "serviceName", type: "string"},
    {alias: "ES_serviceCode", key: "serviceCode", type: "string"},
    {alias: "ES_services_action", key: "actions", type: "action"}
  ],

  entityContacts: [
    {alias: "ES_contactName", key: "contactName", type: "string"},
    {alias: "ES_email", key: "email", type: "string"},
    {alias: "ES_mobile", key: "mobile", type: "string"},
    {alias: "ES_contacts_action", key: "actions", type: "action"}
  ],

  entitySearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "ESEARCH_entityName", key: "entityName", type: "image"},
    {alias: "ESEARCH_arabicName", key: "arabicName", type: "string"},
    {alias: "ESEARCH_spCode", key: "spCode", type: "string"},
    {alias: "ESEARCH_orgType", key: "orgType", type: "string"},
    {alias: "ESEARCH_isActive", key: "isActive", type: "cbDisabled"},
    {alias: "ESEARCH_status", key: "status", type: "statusLabel"},
    {alias: "ESEARCH_action", key: "actions", type: "action"}
  ],

  acquirerSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "acquirerName", key: "acquirerName", type: "image"},
    {alias: "acquirer_arabicName", key: "arabicName", type: "string"},
    {alias: "ASEARCH_shortCode", key: "shortCode", type: "string"},
    {alias: "ASEARCH_isActive", key: "isActive", type: "cbDisabled"},
    {alias: "ASEARCH_status", key: "status", type: "statusLabel"},
    {alias: "ASEARCH_action", key: "actions", type: "action"}
  ],

  acquirerCardsType: [
    {alias: "AS_cardName", key: "cardName", type: "string"},
    {alias: "AS_cardCode", key: "cardCode", type: "string"},
    {alias: "AS_card_action", key: "actions", type: "action"}
  ],

  acquirerContacts: [
    {alias: "AS_contactName", key: "contactName", type: "string"},
    {alias: "AS_email", key: "email", type: "string"},
    {alias: "AS_mobile", key: "mobile", type: "string"},
    {alias: "AS_contacts_action", key: "actions", type: "action"}
  ],

  roleSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "RSEARCH_roleName", key: "name", type: "string"},
    {alias: "RSEARCH_roleDescription", key: "description", type: "string"},
    {alias: "RSEARCH_roleType", key: "type", type: "string"},
    {alias: "RSEARCH_roleAction", key: "actions", type: "action"}
  ],

  userSearch: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "USEARCH_userID", key: "userID", type: "string"},
    {alias: "USEARCH_firstName", key: "firstName", type: "string"},
    {alias: "USEARCH_lastName", key: "lastName", type: "string"},
    {alias: "USEARCH_isActive", key: "isActive", type: "cbDisabled"},
    {alias: "USEARCH_org", key: "orgType", type: "string"},
    {alias: "USEARCH_userType", key: "userType", type: "string"},
    {alias: "USEARCH_userAction", key: "actions", type: "action"}
  ],
  roleList: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "RList_refNo", key: "refNo", type: "cb"},
    {alias: "RList_roleName", key: "groupName", type: "string"},
    {alias: "RList_description", key: "description", type: "string"},
  ],


  userRolesList: [

    {alias: "RList_roleName", key: "groupName", type: "string"},
    {alias: "RList_description", key: "description", type: "string"},
  ],

  workingCaledarExceptionList: [
    {alias: "WCD_exception", key: "title", type: "string"},
    {alias: "WCD_start", key: "start", type: "string"},
    {alias: "WCD_end", key: "end", type: "string"},
  ],


  FTEMP_fields: [
    {alias: "FTEMP_columnNo", key: "columnNo", type: "string"},
    {alias: "FTEMP_fieldNameTag", key: "fieldNameTag", type: "string"},
    {alias: "FTEMP_fieldName", key: "fieldName", type: "string"},
    {alias: "FTEMP_internalField", key: "internalField", type: "string"},
    {alias: "FTEMP_specialFunction", key: "specialFunction", type: "string"},
    {alias: "FTEMP_fields_action", key: "actions", type: "action"}
  ],

  fileTemplateSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "FTEMP_templateName", key: "templateName", type: "string"},
    {alias: "FTEMP_fileType", key: "fileType", type: "string"},
    {alias: "FTEMP_template_action", key: "actions", type: "action"}
  ],

  CTEMP_templateDetail: [
    {alias: "CTEMP_categoryType", key: "categoryType", type: "string"},
    {alias: "CTEMP_feeType", key: "feeType", type: "string"},
    {alias: "CTEMP_startDate", key: "startDate", type: "dateTime"},
    {alias: "CTEMP_endDate", key: "endDate", type: "dateTime"},
    {alias: "CTEMP_minVal", key: "minVal", type: "string"},
    {alias: "CTEMP_maxVal", key: "maxVal", type: "string"},
    {alias: "CTEMP_percentageRate", key: "percentageRate", type: "string"},
    {alias: "CTEMP_flatRate", key: "flatRate", type: "string"},
    {alias: "CTEMP_template_action", key: "actions", type: "action"}
  ],
  CTEMP_templatePreview: [
    {alias: "CTEMP_categoryType", key: "categoryType", type: "string"},
    {alias: "CTEMP_feeType", key: "feeType", type: "string"},
    {alias: "CTEMP_startDate", key: "startDate", type: "dateTime"},
    {alias: "CTEMP_endDate", key: "endDate", type: "dateTime"},
    {alias: "CTEMP_minVal", key: "minVal", type: "string"},
    {alias: "CTEMP_maxVal", key: "maxVal", type: "string"},
    {alias: "CTEMP_percentageRate", key: "percentageRate", type: "string"},
    {alias: "CTEMP_flatRate", key: "flatRate", type: "string"}
  ],

  CTEMP_search: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "CTEMP_templateName", key: "templateName", type: "string"},
    {alias: "CTEMP_template_action", key: "actions", type: "action"}
  ],

  ETEMP_search: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "ETEMP_templateName", key: "templateName", type: "string"},
    {alias: "ETEMP_templateType", key: "templateType", type: "string"},
    {alias: "ETEMP_template_action", key: "actions", type: "action"}
  ],

  auditTrailDetail: [
    {alias: "TL_DEGTransNo", key: "ePayNo", type: "string"},
    {alias: "TL_SPTransNo", key: "SPTRN", type: "string"},
    {alias: "TL_PGTransNo", key: "PGRefNo", type: "string"},
    {alias: "TL_TransactionDate", key: "transDate", type: "dateTime"},
    {alias: "TL_Amount", key: "amount", type: "string"},
    {alias: "TL_Status", key: "status", type: "string"},
    {alias: "TL_Description", key: "desc", type: "string"}
  ],

  auditLogListData: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "AL_event", key: "event", type: "string"},
    {alias: "AL_collectionName", key: "collectionName", type: "string"},
    {alias: "AL_ipAddress", key: "ipAddress", type: "string"},
    {alias: "AL_actionBy", key: "createdBy", type: "object", property: "userID"},
    {alias: "AL_actionOn", key: "createdAt", type: "string"},
    {alias: "AL_action", key: "actions", type: "action"},


  ],
  commissionBatchSummaryDataData: [
    {alias: "CD_Summary", key: "summary", type: "string"},
    {alias: "CD_TranAmount", key: "tranAmount", type: "amount"},
    {alias: "CD_Amount", key: "commissionAmount", type: "amount"},
    {alias: "CD_Count", key: "count", type: "rightAlign"},

  ],
  consortiumSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Cipher_consortiumName", key: "consortiumName", type: "string"},
    {alias: "Cipher_consortiumType", key: "consortiumType", type: "string"},
    {alias: "Cipher_consortiumAction", key: "actions", type: "action"}
  ],

  consortiumParticipants: [
    {alias: "Cipher_participantsType", key: "orgType", type: "string"},
    {alias: "Cipher_participantsCode", key: "orgCode", type: "string"},
    {alias: "Cipher_participantsStatus", key: "status", type: "statusLabel"},
    {alias: "Cipher_participantsAccount", key: "account", type: "string"}
  ],

  cipherChannels: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Cipher_channelName", key: "name", type: "string"},
    {alias: "Cipher_channelOrgs", key: "orgs", type: "array"},
    {alias: "Cipher_channelAction", key: "actions", type: "action"}
  ],
  cipherNodeSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Cipher_NodeName", key: "name", type: "string"},
    {alias: "Cipher_NodeDNSName", key: "DNSName", type: "string"},
    {alias: "Cipher_NodeIP", key: "IP", type: "string"},
    {alias: "Cipher_NodePort", key: "port", type: "string"},
    {alias: "Cipher_NodeType", key: "nodeType", type: "string"},
    {alias: "Cipher_NodeIsStatus", key: "status", type: "string"}
    // { alias: "Cipher_action", key: "actions", type: "action" }
  ],
  smartContractTemplates: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Cipher_SmartContractName", key: "templateName", type: "string"},
    {alias: "Cipher_SmartContractDesc", key: "description", type: "string"},
    // { alias: "Cipher_SmartContractFileName", key: "files", type: "array" },
    {alias: "Cipher_SmartContractStatus", key: "status", type: "statusLabel"},
    {alias: "Cipher_action", key: "actions", type: "action"}

  ],
  smartContractLogs: [
    {alias: "Cipher_SmartContractEventName", key: "event", type: "string"},
    {alias: "BTL_blockNumber", key: "blockNumber", type: "hyperlink", url: '/cipher/blockchain/blockSearch'},
    {alias: "BTL_hash", key: "transactionHash", type: "string"},
    {alias: "Cipher_action", key: "actions", type: "action"}
  ],
  cipherDeployedSmartContract: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Cipher_SmartContractName", key: "templateName", type: "string"},
    {alias: "Cipher_SmartContractBindingId", key: "bindingId", type: "string"},
    {alias: "Cipher_deployedChannels", key: "channel", type: "string"},
    {alias: "Cipher_deployedBy", key: "deployedBy", type: "string"},
    {alias: "Cipher_deployedOn", key: "deployedOn", type: "string"},
    {alias: "Cipher_deployedStatus", key: "status", type: "statusLabel"},
    {alias: "Cipher_action", key: "actions", type: "action"}
  ],
  cipherBusinessApplication: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Cipher_BusinessAppName", key: "name", type: "string"},
    {alias: "Cipher_BusinessAppUsedBy", key: "usedBy", type: "array"},
    {alias: "Cipher_BusinessAppLoinURL", key: "RESTLoginURL", type: "string"},
    {alias: "Cipher_action", key: "actions", type: "action"}
  ],
  commissionBatchTransactionData: [

    {alias: "", key: "degRefNo", type: "hiddenID"},
    {alias: "CBV_batchID", key: "batchID", type: "string"},
    {alias: "CBV_spCode", key: "ServiceProvider", type: "string"},
    {alias: "CBV_DGRefNo", key: "degRefNo", type: "hyperlink", url: '/viewTransactionDetail'},
    {alias: "CBV_SPRefNo", key: "spRefNo", type: "string"},
    {alias: "CBV_PFRefNo", key: "pegRefNo", type: "string"},
    {alias: "CBV_TranData", key: "tranDate", type: "string"},
    {alias: "CBV_Amount", key: "amount", type: "amount"},
    {alias: "CBV_Commission", key: "AcquirerCommissionAmt", type: "amount"},
    {alias: "CBV_Status", key: "tranStatus", type: "statusLabel"},
    {alias: "CBV_action", key: "actions", type: "action"}
  ],
  refundListViewData: [
    {alias: "", key: "refNo", type: "hiddenID"},
    {alias: "RL_entity", key: "ServiceProvider", type: "image"},
    {alias: "RL_acquirer", key: "acquirerName", type: "string"},
    {alias: "RL_refNo", key: "refNo", type: "string", type: 'hyperlink', url: '/viewRefund'},
    {alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "RL_SPRefNo", key: "SPRefNo", type: "string"},
    {alias: "RL_PGRefNo", key: "PGRefNo", type: "string"},
    {alias: "RL_date", key: "date", type: "string"},
    {alias: "RL_status", key: "status", type: "statusLabel"},
    {alias: "RL_action", key: "actions", type: "action"}

  ],

  viewrefundBatchListData: [
    {alias: "", key: "refNo", type: "hiddenID"},
    {alias: "RL_entity", key: "ServiceProvider", type: "image"},
    {alias: "RL_acquirer", key: "acquirerName", type: "string"},
    {alias: "RL_refNo", key: "refNo", type: 'hyperlink', url: '/viewRefund'},
    {alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "RL_SPRefNo", key: "SPRefNo", type: "string"},
    {alias: "RL_PGRefNo", key: "PGRefNo", type: "string"},
    {alias: "RL_date", key: "date", type: "string"},
    {alias: "RL_amount", key: "Amount", type: "amount"},
    {alias: "RL_status", key: "status", type: "statusLabel"},
    {alias: "RL_action", key: "actions", type: "action"}
  ],
  serviceBeneficiaryDetails: [
    {alias: "SBD_accountID", key: "accountId", type: "string", width: "30%"},
    {alias: "SBD_txnAmount", key: "txnAmount", type: "string", width: "20%"},
    {alias: "SBD_fullName", key: "fullNameEn", type: "string"},
    {alias: "SBD_email", key: "email", type: "string"},
    {alias: "SBD_emiratesID", key: "emiratesId", type: "string"},
    {alias: "SBD_type", key: "type", type: "string"},
    {alias: "SBD_company", key: "companyInfo", type: "object", property: "companyNameEn"},
    {alias: "SBD_tradeLicenseNo", key: "companyInfo", type: "object", property: "tradeLicenseNumber"},
    {alias: "SBD_licenseIssuingAuth", key: "companyInfo", type: "object", property: "licenseIssuingAuthority"}

  ],

  APIPayloadListData: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "APL_UUID", key: "uuid", type: "string"},
    {alias: "APL_Channel", key: "channel", type: "string"},
    {alias: "APL_Action", key: "action", type: "string"},
    {alias: "APL_Date", key: "createdAt", type: "string"},
    {alias: "APL_Actions", key: "actions", type: "action"},


  ],
  viewRefundDownloadList: [
    {alias: "RV_fileName", key: "fileDetail", type: "downloadAttachement"},
    {alias: "RV_uploadedOn", key: "Time", type: "epochDate"},
    {alias: "RV_status", key: "Status", type: "string"},
    {alias: "RV_uploadedBy", key: "User", type: "string"},


  ],
  viewRefundComments: [
    {alias: "RV_Comments", key: "Text", type: "string"},
    {alias: "RV_User", key: "User", type: "string"},
    {alias: "RV_Reason", key: "Reason", type: "string"},
    {alias: "RV_Date", key: "Time", type: "epochDate"},
    {alias: "RV_Status", key: "Status", type: "string"}

  ],
  downloadFileList: [
    {alias: "FU_fileName", key: "fileDetail", type: "downloadAttachement"}

  ],
  notifications: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "NOTI_Level", key: "type", type: "icon"},
    {alias: "NOTI_Message", key: "text", type: "string"},
    {alias: "NOTI_Message", key: "createdAt", type: "epochDate1"},
    {alias: "NOTI_Actions", key: "actions", type: "action"}
  ],
  SLAWorkboardData: [
    {alias: "SLA_img", key: "img", type: "imageBig"},
    {alias: "SLA_belowSLA", key: "belowSLA", type: "stringBig"},
    {alias: "SLA_MeetSLA", key: "MeetSLA", type: "stringBig"},
    {alias: "SLA_column", key: "SLA", type: "statusLabelBig"},
    {alias: "SLA_Cnt", key: "Cnt", type: "stringBig"}
  ],

  disputeListViewData: [
    {alias: "", key: "refNo", type: "hiddenID"},
    {alias: "RL_entity", key: "ServiceProvider", type: "image"},
    {alias: "RL_acquirer", key: "acquirerName", type: "string"},
    {alias: "DL_refNo", key: "refNo", type: "string", type: 'hyperlink', url: '/viewDispute'},
    {alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "RL_SPRefNo", key: "SPRefNo", type: "string"},
    {alias: "RL_PGRefNo", key: "PGRefNo", type: "string"},
    {alias: "RL_date", key: "date", type: "string"},
    {alias: "RL_status", key: "status", type: "statusLabel"},
    {alias: "RL_action", key: "actions", type: "action"}

  ],
  viewDisputeComments: [
    {alias: "RV_Comments", key: "Text", type: "string"},
    {alias: "RV_User", key: "User", type: "string"},
    {alias: "RV_Reason", key: "Reason", type: "string"},
    {alias: "RV_Date", key: "Time", type: "epochDate"},
    {alias: "RV_Status", key: "Status", type: "string"}

  ],
  viewDisputeDownloadList: [
    {alias: "RV_fileName", key: "fileDetail", type: "downloadAttachement"},
    {alias: "RV_uploadedOn", key: "Time", type: "epochDate"},
    {alias: "RV_status", key: "Status", type: "string"},
    {alias: "RV_uploadedBy", key: "User", type: "string"},


  ],
  disputeListData: [
    {alias: "DL_refNo", key: "refNo", type: "cb"},
    {alias: "", key: "refNo", type: "hiddenID"},
    {alias: "RL_entity", key: "ServiceProvider", type: "image"},
    {alias: "RL_acquirer", key: "acquirerName", type: "string"},
    {alias: "DL_refNo", key: "refNo", type: "string"},
    {alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "RL_SPRefNo", key: "SPRefNo", type: "string"},
    {alias: "RL_PGRefNo", key: "PGRefNo", type: "string"},
    {alias: "RL_date", key: "date", type: "string"},
    {alias: "RL_amount", key: "Amount", type: "amount"},
    {alias: "RL_status", key: "status", type: "statusLabel"},
    {alias: "RL_action", key: "actions", type: "action"}
  ],
  disputeBatchListData: [
    {alias: "", key: "batchNo", type: "hiddenID"},
    {alias: "RBL_BatchNo", key: "batchNo", type: 'hyperlink', url: '/viewDisputeBatch'},
    {alias: "DBL_Entity", key: "acquirerName", type: "string"},
    {alias: "RBL_date", key: "date", type: "string"},
    {alias: "RBL_TotalTran", key: "DisputeCount", type: "string"},
    {alias: "RBL_TotalAmount", key: "DisputeAmount", type: "amount"},
    {alias: "RBL_status", key: "status", type: "statusLabel"},
    {alias: "RBL_action", key: "actions", type: "action"}
  ],
  viewdisputeBatchListData: [
    {alias: "", key: "refNo", type: "hiddenID"},
    {alias: "RL_entity", key: "ServiceProvider", type: "image"},
    {alias: "RL_acquirer", key: "acquirerName", type: "string"},
    {alias: "DL_refNo", key: "refNo", type: 'hyperlink', url: '/viewDispute'},
    {alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail'},
    {alias: "RL_SPRefNo", key: "SPRefNo", type: "string"},
    {alias: "RL_PGRefNo", key: "PGRefNo", type: "string"},
    {alias: "RL_date", key: "date", type: "string"},
    {alias: "RL_amount", key: "Amount", type: "string"},
    {alias: "RL_status", key: "status", type: "statusLabel"},
    {alias: "RL_action", key: "actions", type: "action"}
  ],
  blockchainWorkBoard: [
    {alias: "", key: "number", type: "hiddenID"},
    {alias: "BTL_blockNumber", key: "blockNumber", type: "hyperlink", url: '/cipher/blockchain/blockSearch'},
    {alias: "BWB_Hash", key: "blockHash", type: "string"},
    {alias: "BWB_Size", key: "size", type: "string"},
    {alias: "BLTLP_GridTitle", key: "noOfTransactions", type: "string"},
  ],

  blockTransactionList: [
    {alias: "BTL_blockNumber", key: "blockNumber", type: "string"},
    {alias: "BTL_transactionIndex", key: "transactionIndex", type: "string"},
    {alias: "BTL_to", key: "to", type: "clpVal"},
    {alias: "BTL_from", key: "from", type: 'clpVal'},
    {alias: "BTL_gas", key: "gas", type: "string"},
    {alias: "BTL_gasPrice", key: "gasPrice", type: "string"},
    {alias: "BTL_hash", key: "hash", type: "clpVal"},
    {alias: "BTL_input", key: "input", type: "string"},
    {alias: "BTL_nonce", key: "nonce", type: "string"},
    {alias: "BTL_value", key: "value", type: "string"}
  ],

  blockTransactions: [
    {alias: "", key: "hash", type: "hiddenID"},
    {alias: "BTL_hash", key: "hash", type: "string"},
    {alias: "BTL_nonce", key: "nonce", type: "string"},
    {alias: "BTL_from", key: "transactionIndex", type: 'string'},
    {alias: "BTL_value", key: "value", type: "string"},
    {alias: "BWB_Action", key: "actions", type: "action"}
  ],
  transactionManualReconRemarks: [

    {alias: "TDA_Status", key: "transactionStatus", type: "string"},
    {alias: "TDA_Date", key: "createdOn", type: "string"},
    {alias: "TDA_CreatedBy", key: "createdBy", type: "string"},
    {alias: "TDA_Remarks", key: "remarks", type: "string"},
  ],
  exportDeclarationList: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "", key: "declarationNumber", type: "hiddenID"},
    {alias: "EDL_DeclarationNo", key: "declarationNumber", type: 'hyperlink', url: '/viewDeclarationDetail'},
    {alias: "EDL_DeclarationType", key: "declarationType", type: "string"},
    {alias: "EDL_Exporter", key: "exporterName", type: "string"},
    {alias: "EDL_ExporterCountry", key: "exporterCountry", type: 'string'},
    {alias: "EDL_PortofDischarge", key: "portOfDischarge", type: "string"},
    {alias: "EDL_NextPortofDischarge", key: "nextPortOfDischarge", type: "string"},
    {alias: "EDL_InvoiceAmount", key: "invoiceValue", type: "amount"},
    {alias: "EDL_Status", key: "status", type: "string"},

  ],
  exportDeclarationItems: [
    {alias: "EDItem_hsCode", key: "hs_code", type: 'string'},
    {alias: "EDItem_description", key: "description", type: "string"},
    {alias: "EDItem_quantity", key: "qty", type: "string"},
    {alias: "EDItem_value", key: "value", type: 'string'},
    {alias: "EDItem_action", key: "actions", type: "action"}
  ],

  exportDeclarationContainers: [
    {alias: "EDItem_container", key: "container", type: 'string'},
    {alias: "EDItem_action", key: "actions", type: "action"}

  ],

  pickupList: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "ESEARCH_entityName", key: "typeName", type: "string"},
    {alias: "ESEARCH_action", key: "actions", type: "action"}
  ],

  sampleDashboardGrid: [
    {alias: "", key: "objectID", type: "hiddenID"},
    {alias: "sampleGrid_column1", key: "columnValue1", type: "image", width: "20%", url: ''},
    {alias: "sampleGrid_column2", key: "columnValue2", type: "string"},
    {alias: "sampleGrid_column3", key: "columnValue3", type: "string"},
    {alias: "sampleGrid_column4", key: "columnValue4", type: "string"},
    {alias: "sampleGrid_column5", key: "columnValue5", type: "string"},
    {alias: "sampleGrid_column6", key: "columnValue6s", type: "string"}
  ],

  sampleGridColumns: [
    {alias: "", key: "recordID", type: "hiddenID"},
    {alias: "sampleGrid_column1", key: "columnValue1", type: "image", width: "20%", url: ''},
    {alias: "sampleGrid_column2", key: "columnValue2", type: "string"},
    {alias: "sampleGrid_column3", key: "columnValue3", type: "string"},
    {alias: "sampleGrid_column4", key: "columnValue4", type: "string"},
    {alias: "sampleGrid_column5", key: "columnValue5", type: "string"},
    {alias: "sampleGrid_column6", key: "columnValue6", type: "epochDate"},
    {alias: "sampleGrid_status", key: "status", type: "statusLabel"},
    {alias: "sampleGrid_action", key: "actions", type: "action"}
  ],

  sampleViewPageGridColumns: [
    {alias: "", key: "recordID", type: "hiddenID"},
    {alias: "sampleGrid_column1", key: "columnValue1", type: "image", width: "20%", url: ''},
    {alias: "sampleGrid_column2", key: "columnValue2", type: "string"},
    {alias: "sampleGrid_column3", key: "columnValue3", type: "string"},
    {alias: "sampleGrid_column4", key: "columnValue4", type: "string"},
    {alias: "sampleGrid_column5", key: "columnValue5", type: "string"},
    {alias: "sampleGrid_column6", key: "columnValue6", type: "string"}
  ],
  SampleCrud_PopupGridItems: [
    {alias: "SampleCrud_Grid_Code", key: "code", type: 'string'},
    {alias: "SampleCrud_Grid_Description", key: "description", type: "string"},
    {alias: "SampleCrud_Grid_Quantity", key: "qty", type: "string"},
    {alias: "SampleCrud_Grid_Value", key: "value", type: 'string'},
    {alias: "SampleCrud_Grid_Action", key: "actions", type: "action"}
  ],

  SampleCrud_InputGrid: [
    {alias: "SampleCrud_Grid_Container", key: "container", type: 'string'},
    {alias: "SampleCrud_Grid_Action", key: "actions", type: "action"}

  ],
  
  buyerOrders: [
    {alias: "", key: "id", type: 'hiddenID'},
    {alias: "Order Id", key: "id", type: 'string'},
    {alias: "Item Id", key: "items", type: "string"},
    {alias: "Quantity", key: "quantities", type: "string"},
    {alias: "Amount", key: "billedAmount", type: 'amount'},
    {alias: "Location", key: "location", type: 'string'},
    {alias: "Date", key: "timestamp", type: "epochDate"},
    {alias: "Status", key: "delivered", type: 'statusLabel'}
  ],

  merchantOrders: [
    {alias: "", key: "id", type: 'hiddenID'},
    {alias: "Order Id", key: "id", type: 'string'},
    {alias: "Item Id", key: "items", type: "string"},
    {alias: "Quantity", key: "quantities", type: "string"},
    {alias: "Amount", key: "billedAmount", type: 'amount'},
    {alias: "Location", key: "location", type: 'string'},
    {alias: "Date", key: "timestamp", type: "epochDate"},
    {alias: "Status", key: "delivered", type: 'statusLabel'},
    {alias: "EDItem_action", key: "actions", type: "action"}
  ],

  catalogue: [
    {alias: "", key: "id", type: 'hiddenID'},
    {alias: "Name", key: "label", type: 'string'},
    {alias: "Category", key: "category", type: "string"},
    {alias: "Price", key: "unitPrice", type: 'amount'},
    {alias: "Quantity", key: "quantity", type: "string"}
  ],

  rewardList: [
    {alias: "Name", key: "name", type: 'string'},
    {alias: "Used", key: "used", type: "string"},
    {alias: "Available", key: "avaialable", type: 'string'},
    {alias: "EDItem_action", key: "actions", type: "action"}
  ],

  settlementsList: [
    {alias: "Name", key: "merchantName", type: 'string'},
    {alias: "Status", key: "status", type: "statusLabel"},
    {alias: "Amount", key: "amount", type: 'amount'},
    {alias: "EDItem_action", key: "actions", type: "action"}
  ],

  pointSummary: [
    {alias: "Name", key: "name", type: "image"},
    {alias: "Available", key: "circulation", type: "string"},
    {alias: "Settled", key: "burnt", type: "string"}
  ]
};

