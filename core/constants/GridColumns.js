import GridColumnsIndex from '../../applications/constants/GridColumnsIndex'

module.exports = {
  ...GridColumnsIndex,
  exceptionList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "TransactionID", type: "hiddenID" },
    { alias: "EL_entity", key: "ServiceProvider", type: "image" },
    { alias: "EL_processor", key: "processorName", type: "string" },
    { alias: "EL_ePayRef", key: "DEGTransactionNo", type: 'hyperlink', url: '/viewTransactionDetail' },
    { alias: "TL_SPTransNo", key: "SPTransactionNo", type: "string" },
    { alias: "TL_PGTransNo", key: "PGTransactionNo", type: "string" },
    { alias: "TL_Service", key: "Service", type: "string" },
    { alias: "EL_date", key: "TransactionRequestedDate", type: "string" },
    { alias: "EL_exceptionType", key: "exceptionType", type: "string" },
    //{ alias: "EL_userID", key: "userID", type: "string" },
    { alias: "EL_PaymentStatus", key: "paymentStatus", type: "string" },
    { alias: "TL_Amount", key: "Amount", type: "amount" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  settlementBatch: [
    { alias: "SB_PaymentMode", key: "paymentMode", type: "string" },
    { alias: "SB_CardType", key: "cardType", type: "string" },
    { alias: "SB_SettledAmount", key: "settledAmount", type: "amount" },
    { alias: "SB_TotalNoTrans", key: "totalTran", type: "string" },
    { alias: "SB_InvoiceAmount", key: "invoiceAmount", type: "string" },
    { alias: "SB_InvoiceCharges", key: "invoiceCharges", type: "amount" },
    { alias: "SB_RefundedAmount", key: "refundedAmount", type: "amount" },
    { alias: "SB_RefundedTran", key: "refundedTransaction", type: "string" },
    { alias: "SB_RefundedCharges", key: "refundedCharges", type: "amount" },
    { alias: "SB_FinalInvoiceAmount", key: "finalInvoiceAmount", type: "amount" }
  ],
  transactionList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "TransactionID", type: "hiddenID" },
    { alias: "TL_entity", key: "ServiceProvider", type: "image" },
    { alias: "EL_processor", key: "processorName", type: "string" },
    { alias: "TL_DEGTransNo", key: "DEGTransactionNo", type: 'hyperlink', url: '/viewTransactionDetail' },
    { alias: "TL_SPTransNo", key: "SPTransactionNo", type: "string" },
    { alias: "TL_PGTransNo", key: "PGTransactionNo", type: "string" },
    { alias: "TL_Service", key: "Service", type: "string" },
    { alias: "TL_TransactionDate", key: "TransactionRequestedDate", type: "string" },
    { alias: "TL_PaymentStatus", key: "paymentStatus", type: "string" },
    { alias: "TL_Status", key: "TranStatus", type: "statusLabel" },
    { alias: "TL_Amount", key: "Amount", type: "amount" },
    { alias: "TL_actions", key: "actions", type: "action" }
  ],

  settlementListData: [
    { alias: "", key: "batchNo", type: "hiddenID" },
    { alias: "SL_entityName", key: "entityName", type: "image" },
    { alias: "SL_batchNo", key: "batchNo", type: "hyperlink", url: "/viewSettlementBatch" },
    { alias: "SL_dateInitiated", key: "dateInitiated", type: "string" },
    { alias: "SL_amount", key: "amount", type: "amount" },
    { alias: "SL_commission", key: "commission", type: "amount" },
    { alias: "SL_netTotalAmount", key: "netTotalAmount", type: "amount" },
    { alias: "SL_status", key: "status", type: "statusLabel" },
    { alias: "SL_action", key: "action", type: "action" }
  ],
  refundListData: [
    { alias: "RL_refNo", key: "refNo", type: "cb" },
    { alias: "", key: "refNo", type: "hiddenID" },
    { alias: "RL_entity", key: "ServiceProvider", type: "image" },
    { alias: "RL_acquirer", key: "acquirerName", type: "string" },
    { alias: "RL_refNo", key: "refNo", type: "string" },
    { alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail' },
    { alias: "RL_SPRefNo", key: "SPRefNo", type: "string" },
    { alias: "RL_PGRefNo", key: "PGRefNo", type: "string" },
    { alias: "RL_date", key: "date", type: "string" },
    { alias: "RL_amount", key: "Amount", type: "amount" },
    { alias: "RL_status", key: "status", type: "statusLabel" },
    { alias: "RL_action", key: "actions", type: "action" }
  ],

  refundBatchListData: [
    { alias: "", key: "batchNo", type: "hiddenID" },
    { alias: "RBL_BatchNo", key: "batchNo", type: 'hyperlink', url: '/viewRefundBatch' },
    { alias: "RBL_acquirer", key: "acquirerName", type: "string" },
    { alias: "RBL_date", key: "date", type: "string" },
    { alias: "RBL_TotalTran", key: "RefundCount", type: "string" },
    { alias: "RBL_TotalAmount", key: "RefundAmount", type: "amount" },
    { alias: "RBL_status", key: "status", type: "statusLabel" },
    { alias: "RBL_action", key: "actions", type: "action" }
  ],


  entityWorkBoard: [
    { alias: "", key: "spCode", type: "hiddenID" },
    { alias: "EWB_name", key: "name", type: "image", width: "20%" },
    { alias: "EWB_lastSettlementDate", key: "lastSettlementDate", type: "string" },
    { alias: "EWB_overDue", key: "overDue", type: "statusLabel" },

    { alias: "EWB_settlementPeriod", key: "settlementPeriod", type: "string" },
    //{ alias: "EWB_totalTransaction", key: "totalTransaction", type: "string" },
    { alias: "EWB_pendingExceptions", key: "pendingExceptions", type: "string" },
    { alias: "EWB_refundFiled", key: "refundFiled", type: "string" },
    { alias: "EWB_lastDateRecon", key: "lastDateRecon", type: "string" },
    { alias: "EWB_actions", key: "actions", type: "action" }
  ],


  acquirerWorkBoard: [
    { alias: "", key: "pgCode", type: "hiddenID" },
    { alias: "AWB_name", key: "name", type: "image" },
    { alias: "AWB_lastReconDate", key: "lastReconDate", type: "string" },
    { alias: "AWB_overDue", key: "overDue", type: "statusLabel" },
    { alias: "AWB_lastCommissionDisbusal", key: "lastCommissionDisbusal", type: "string" },
    //{ alias: "AWB_totalTransaction", key: "totalTransaction", type: "string" },
    { alias: "AWB_commissions", key: "commissions", type: "string" },
    { alias: "AWB_pendingExceptions", key: "pendingExceptions", type: "string" },
    { alias: "AWB_refundFiled", key: "refundFiled", type: "string" },
    { alias: "AWB_refunded", key: "refunded", type: "string" },
    { alias: "AWB_actions", key: "actions", type: "action" }
  ],

  attachments: [
    { alias: "GEN_File", key: "name", type: "string" },
    { alias: "GEN_Action", key: "action", type: "action" }
  ],

  comments: [
    { alias: "GEN_date", key: "date", type: "string" },
    { alias: "GEN_userID", key: "userId", type: "string" },
    { alias: "GEN_org", key: "org", type: "string" },
    { alias: "GEN_comments", key: "comment", type: "string" }

  ],
  acquirerCollections: [
    { alias: "AWB_acquirer", key: "acquirer", type: "string" },
    { alias: "AWB_position", key: "position", type: "string" }
  ],


  manualReconStats: [
    { alias: "MRS_type", key: "Type", type: "string" },
    { alias: "MRS_count", key: "Count", type: "string" }
  ],
  reconAuditTrailData: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "MRA_date", key: "createdAt", type: "string" },
    { alias: "MRA_reconAction", key: "reconType", type: "string" },
    { alias: "MRA_entityType", key: "reqType", type: "orgType" },
    { alias: "MRA_serviceCode", key: "serviceCode", type: "string" },
    { alias: "MRA_shortCode", key: "shortCode", type: "string" },
    { alias: "MRA_fileName", key: "fileName", type: "string" },
    { alias: "MRA_userID", key: "createdID", type: "string" },
    { alias: "MRA_status", key: "status", type: "string" },
    { alias: "MRA_action", key: "actions", type: "action" }
  ],
  commissionBathData: [
    { alias: "CB_summary", key: "summary", type: "string" },
    { alias: "CB_amount", key: "amount", type: "amount" },
    { alias: "CB_count", key: "count", type: "rightAlign" }

  ],

  commissionList: [
    { alias: "", key: "batchNo", type: "hiddenID" },
    { alias: "CL_Processor", key: "entityName", type: "image" },
    { alias: "CL_Date", key: "dateInitiated", type: "string" },
    { alias: "CL_AmountAED", key: "amount", type: "string" },
    { alias: "CL_status", key: "status", type: "statusLabel" },
    { alias: "CL_Commission", key: "commission", type: "string" },
    { alias: "CL_BatchNo", key: "batchNo", type: "string" },
    { alias: "CL_actions", key: "action", type: "action" }
  ],
  commissionDetailData: [
    { alias: "CD_summary", key: "summary", type: "string" },
    { alias: "CD_amount", key: "amount", type: "string" }

  ],

  settlementBatchTransactionData: [
    { alias: "", key: "degRefNo", type: "hiddenID" },
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "CBV_batchID", key: "batchID", type: "string" },
    { alias: "CBV_pgCode", key: "pgCode", type: "string" },
    { alias: "CBV_DGRefNo", key: "degRefNo", type: "hyperlink", url: '/viewTransactionDetail' },
    { alias: "CBV_SPRefNo", key: "spRefNo", type: "string" },
    { alias: "CBV_PFRefNo", key: "pegRefNo", type: "string" },
    { alias: "CBV_Service", key: "Service", type: "string" },
    { alias: "CBV_TranData", key: "tranDate", type: "string" },
    { alias: "CBV_Amount", key: "amount", type: "amount" },
    { alias: "CBV_Commission", key: "EntityCommissionAmt", type: "amount" },
    { alias: "CBV_Status", key: "tranStatus", type: "statusLabel" },
    { alias: "CBV_action", key: "actions", type: "action" }
  ],

  settlementBatchSummaryDataData: [
    { alias: "CD_Summary", key: "summary", type: "leftAlign" },
    { alias: "CD_Amount", key: "amount", type: "amount" },
    { alias: "CD_Count", key: "count", type: "rightAlign" },
  ],

  entityServices: [
    { alias: "ES_serviceName", key: "serviceName", type: "string" },
    { alias: "ES_serviceCode", key: "serviceCode", type: "string" },
    { alias: "ES_services_action", key: "actions", type: "action" }
  ],

  entityContacts: [
    { alias: "ES_contactName", key: "contactName", type: "string" },
    { alias: "ES_email", key: "email", type: "string" },
    { alias: "ES_mobile", key: "mobile", type: "string" },
    { alias: "ES_contacts_action", key: "actions", type: "action" }
  ],

  mappedCodes: [
    { alias: "mappingType", key: "mappingType", type: "string" },
    { alias: "mappingCode", key: "mappingCode", type: "string" },
    { alias: "action", key: "actions", type: "action" }
  ],


  additionalProperties: [
    { alias: "propertyName", key: "propertyName", type: "string" },
    { alias: "value", key: "value", type: "string" },
    { alias: "action", key: "actions", type: "action" }
  ],

  entitySearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "ESEARCH_entityName", key: "entityName", type: "image" },
    { alias: "ESEARCH_arabicName", key: "arabicName", type: "string" },
    { alias: "ESEARCH_spCode", key: "spCode", type: "string" },
    { alias: "ESEARCH_orgType", key: "orgType", type: "string" },
    { alias: "ESEARCH_isActive", key: "isActive", type: "cbDisabled" },
    { alias: "ESEARCH_action", key: "actions", type: "action" }
  ],

  acquirerSearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "acquirerName", key: "acquirerName", type: "image" },
    { alias: "acquirer_arabicName", key: "arabicName", type: "string" },
    { alias: "ASEARCH_shortCode", key: "shortCode", type: "string" },
    { alias: "ASEARCH_isActive", key: "isActive", type: "cbDisabled" },
    { alias: "ASEARCH_status", key: "status", type: "statusLabel" },
    { alias: "ASEARCH_action", key: "actions", type: "action" }
  ],

  acquirerCardsType: [
    { alias: "AS_cardName", key: "cardName", type: "string" },
    { alias: "AS_cardCode", key: "cardCode", type: "string" },
    { alias: "AS_card_action", key: "actions", type: "action" }
  ],

  acquirerContacts: [
    { alias: "AS_contactName", key: "contactName", type: "string" },
    { alias: "AS_email", key: "email", type: "string" },
    { alias: "AS_mobile", key: "mobile", type: "string" },
    { alias: "AS_contacts_action", key: "actions", type: "action" }
  ],

  roleSearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "RSEARCH_roleName", key: "name", type: "string" },
    { alias: "RSEARCH_roleDescription", key: "description", type: "string" },
    { alias: "RSEARCH_roleType", key: "type", type: "string" },
    { alias: "RSEARCH_roleAction", key: "actions", type: "action" }
  ],
  letterTable: [
    { alias: "", key: "templateId", type: "hiddenID" },
    { alias: "Template Name", key: "templateName", type: "string" },
    { alias: "Template Path", key: "templatePath", type: "string" },
    { alias: "ASEARCH_action", key: "actions", type: "modal" }
  ],

  userSearch: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "USEARCH_userID", key: "userID", type: "string" },
    { alias: "USEARCH_firstName", key: "firstName", type: "string" },
    { alias: "USEARCH_lastName", key: "lastName", type: "string" },
    { alias: "USEARCH_isActive", key: "isActive", type: "cbDisabled" },
    { alias: "USEARCH_org", key: "orgType", type: "string" },
    { alias: "Status", key: "status", type: "statusBox" },
    { alias: "USEARCH_userType", key: "userType", type: "string" },
    { alias: "USEARCH_userAction", key: "actions", type: "action" }
  ],
  roleList: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "RList_refNo", key: "refNo", type: "cb" },
    { alias: "RList_roleName", key: "groupName", type: "string" },
    { alias: "RList_description", key: "description", type: "string" },
  ],


  userRolesList: [

    { alias: "RList_roleName", key: "groupName", type: "string" },
    { alias: "RList_description", key: "description", type: "string" },
  ],
  workingCalendarSearchList: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "Working_Calendar_Name", key: "calendarName", type: "string" },
    { alias: "Working_Calendar_Year", key: "calendarYear", type: "string" },
    // { alias: "Working_Calendar_Month", key: "calendarMonth", type: "string" },
    { alias: "CL_actionOn", key: "createdAt", type: "epochDate" },
    { alias: "CL_actionBy", key: "createdBy", type: "object", property: "userID" },
    { alias: "EVNTL_ISACTIVE", key: "isActive", type: "cbDisabled" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  workingCaledarExceptionList: [
    { alias: "WCD_exception", key: "title", type: "string" },
    { alias: "WCD_start", key: "start", type: "string" },
    { alias: "WCD_end", key: "end", type: "string" },
    { alias: "Actions", key: "actions", type: "action" }
  ],

  workingCaledarExceptionListOnDays: [
    { alias: "WCD_exception", key: "title", type: "string" },
    { alias: "WCD_start", key: "start", type: "string" },
    { alias: "WCD_end", key: "end", type: "string" },
    { alias: "Day Start", key: "dayStart", type: "string" },
    { alias: "Day End", key: "dayEnd", type: "string" }
  ],


  FTEMP_fields: [
    { alias: "FTEMP_columnNo", key: "columnNo", type: "string" },
    { alias: "FTEMP_fieldNameTag", key: "fieldNameTag", type: "string" },
    { alias: "FTEMP_fieldName", key: "fieldName", type: "string" },
    { alias: "FTEMP_internalField", key: "internalField", type: "string" },
    { alias: "FTEMP_specialFunction", key: "specialFunction", type: "string" },
    { alias: "FTEMP_fields_action", key: "actions", type: "action" }
  ],

  fileTemplateSearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "FTEMP_templateName", key: "templateName", type: "string" },
    { alias: "FTEMP_fileType", key: "fileType", type: "string" },
    { alias: "FTEMP_template_action", key: "actions", type: "action" }
  ],

  CTEMP_templateDetail: [
    { alias: "CTEMP_categoryType", key: "categoryType", type: "string" },
    { alias: "CTEMP_feeType", key: "feeType", type: "string" },
    { alias: "CTEMP_startDate", key: "startDate", type: "dateTime" },
    { alias: "CTEMP_endDate", key: "endDate", type: "dateTime" },
    { alias: "CTEMP_minVal", key: "minVal", type: "string" },
    { alias: "CTEMP_maxVal", key: "maxVal", type: "string" },
    { alias: "CTEMP_percentageRate", key: "percentageRate", type: "string" },
    { alias: "CTEMP_flatRate", key: "flatRate", type: "string" },
    { alias: "CTEMP_template_action", key: "actions", type: "action" }
  ],
  CTEMP_templatePreview: [
    { alias: "CTEMP_categoryType", key: "categoryType", type: "string" },
    { alias: "CTEMP_feeType", key: "feeType", type: "string" },
    { alias: "CTEMP_startDate", key: "startDate", type: "dateTime" },
    { alias: "CTEMP_endDate", key: "endDate", type: "dateTime" },
    { alias: "CTEMP_minVal", key: "minVal", type: "string" },
    { alias: "CTEMP_maxVal", key: "maxVal", type: "string" },
    { alias: "CTEMP_percentageRate", key: "percentageRate", type: "string" },
    { alias: "CTEMP_flatRate", key: "flatRate", type: "string" }
  ],

  CTEMP_search: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "CTEMP_templateName", key: "templateName", type: "string" },
    { alias: "CTEMP_template_action", key: "actions", type: "action" }
  ],

  ETEMP_search: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "ETEMP_templateName", key: "templateName", type: "string" },
    { alias: "ETEMP_templateType", key: "templateType", type: "string" },
    { alias: "ETEMP_template_action", key: "actions", type: "action" }
  ],
  BillingRulesSetting: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "From", key: "from", type: "amount" },
    { alias: "To", key: "to", type: "amount" },
    { alias: "Billing Value", key: "billVal", type: "amount" },
    { alias: "CTEMP_template_action", key: "actions", type: "action" }
  ],
  auditTrailDetail: [
    { alias: "TL_DEGTransNo", key: "ePayNo", type: "string" },
    { alias: "TL_SPTransNo", key: "SPTRN", type: "string" },
    { alias: "TL_PGTransNo", key: "PGRefNo", type: "string" },
    { alias: "TL_TransactionDate", key: "transDate", type: "dateTime" },
    { alias: "TL_Amount", key: "amount", type: "string" },
    { alias: "TL_Status", key: "status", type: "string" },
    { alias: "TL_Description", key: "desc", type: "string" }
  ],

  auditLogListData: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "AL_event", key: "event", type: "string" },
    { alias: "AL_collectionName", key: "collectionName", type: "string" },
    { alias: "AL_ipAddress", key: "ipAddress", type: "string" },
    { alias: "AL_actionBy", key: "createdBy.userID", type: "string" },
    { alias: "AL_actionOn", key: "createdAt", type: "string" },
    { alias: "AL_action", key: "actions", type: "action" },
  ],
  commissionBatchSummaryDataData: [
    { alias: "CD_Summary", key: "summary", type: "string" },
    { alias: "CD_TranAmount", key: "tranAmount", type: "amount" },
    { alias: "CD_Amount", key: "commissionAmount", type: "amount" },
    { alias: "CD_Count", key: "count", type: "rightAlign" },

  ],
  consortiumSearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Cipher_consortiumName", key: "ConsortiumName", type: "string" },
    { alias: "Cipher_consortiumType", key: "type", type: "string" },
    { alias: "Cipher_consortiumAction", key: "actions", type: "action" }
  ],

  consortiumParticipants: [
    { alias: "Cipher_participantsType", key: "orgType", type: "string" },
    { alias: "Cipher_participantsCode", key: "orgCode", type: "string" },
    { alias: "Cipher_participantsStatus", key: "status", type: "statusLabel" }
  ],

  cipherChannels: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Cipher_channelName", key: "name", type: "string" },
    { alias: "Cipher_channelOrgs", key: "orgs", type: "array" },
    { alias: "Cipher_channelAction", key: "actions", type: "action" }
  ],
  cipherNodeSearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Cipher_NodeName", key: "name", type: "string" },
    { alias: "Cipher_NodeDNSName", key: "DNSName", type: "string" },
    { alias: "Cipher_NodeIP", key: "IP", type: "string" },
    { alias: "Cipher_NodePort", key: "port", type: "string" },
    { alias: "Cipher_NodeType", key: "nodeType", type: "string" },
    { alias: "Cipher_NodeIsStatus", key: "status", type: "string" }
    // { alias: "Cipher_action", key: "actions", type: "action" }
  ],
  smartContractTemplates: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Cipher_SmartContractName", key: "templateName", type: "string" },
    { alias: "Cipher_SmartContractDesc", key: "description", type: "string" },
    // { alias: "Cipher_SmartContractFileName", key: "files", type: "array" },
    { alias: "Cipher_SmartContractStatus", key: "status", type: "statusLabel" },
    { alias: "Cipher_action", key: "actions", type: "action" }

  ],
  smartContractLogs: [
    { alias: "Cipher_SmartContractEventName", key: "event", type: "string" },
    { alias: "BTL_blockNumber", key: "blockNumber", type: "hyperlink", url: '/cipher/blockchain/blockSearch' },
    { alias: "BTL_hash", key: "transactionHash", type: "string" },
    { alias: "Cipher_action", key: "actions", type: "action" }
  ],
  cipherDeployedSmartContract: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Cipher_SmartContractName", key: "templateName", type: "string" },
    { alias: "Cipher_SmartContractBindingId", key: "bindingId", type: "string" },
    { alias: "Cipher_deployedChannels", key: "channel", type: "string" },
    { alias: "Cipher_deployedBy", key: "deployedBy", type: "string" },
    { alias: "Cipher_deployedOn", key: "deployedOn", type: "string" },
    { alias: "Cipher_deployedStatus", key: "status", type: "statusLabel" },
    { alias: "Cipher_action", key: "actions", type: "action" }
  ],
  cipherBusinessApplication: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Cipher_BusinessAppName", key: "name", type: "string" },
    { alias: "Cipher_BusinessAppUsedBy", key: "usedBy", type: "array" },
    { alias: "Cipher_BusinessAppLoinURL", key: "RESTLoginURL", type: "string" },
    { alias: "Cipher_action", key: "actions", type: "action" }
  ],
  commissionBatchTransactionData: [

    { alias: "", key: "degRefNo", type: "hiddenID" },
    { alias: "CBV_batchID", key: "batchID", type: "string" },
    { alias: "CBV_spCode", key: "ServiceProvider", type: "string" },
    { alias: "CBV_DGRefNo", key: "degRefNo", type: "hyperlink", url: '/viewTransactionDetail' },
    { alias: "CBV_SPRefNo", key: "spRefNo", type: "string" },
    { alias: "CBV_PFRefNo", key: "pegRefNo", type: "string" },
    { alias: "CBV_TranData", key: "tranDate", type: "string" },
    { alias: "CBV_Amount", key: "amount", type: "amount" },
    { alias: "CBV_Commission", key: "AcquirerCommissionAmt", type: "amount" },
    { alias: "CBV_Status", key: "tranStatus", type: "statusLabel" },
    { alias: "CBV_action", key: "actions", type: "action" }
  ],

  serviceBeneficiaryDetails: [
    { alias: "SBD_accountID", key: "accountId", type: "string", width: "30%" },
    { alias: "SBD_txnAmount", key: "txnAmount", type: "string", width: "20%" },
    { alias: "SBD_fullName", key: "fullNameEn", type: "string" },
    { alias: "SBD_email", key: "email", type: "string" },
    { alias: "SBD_emiratesID", key: "emiratesId", type: "string" },
    { alias: "SBD_type", key: "type", type: "string" },
    { alias: "SBD_company", key: "companyInfo", type: "object", property: "companyNameEn" },
    { alias: "SBD_tradeLicenseNo", key: "companyInfo", type: "object", property: "tradeLicenseNumber" },
    { alias: "SBD_licenseIssuingAuth", key: "companyInfo", type: "object", property: "licenseIssuingAuthority" }

  ],

  APIPayloadListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "APL_UUID", key: "uuid", type: "string" },
    { alias: "APL_Channel", key: "channel", type: "string" },
    { alias: "APL_Action", key: "action", type: "string" },
    { alias: "user", key: "username", type: "string" },
    { alias: "code", key: "errcode", type: "string" },
    { alias: "org code", key: "orgcode", type: "string" },
    { alias: "APL_Date", key: "createdAt", type: "string" },
    { alias: "Actions", key: "actions", type: "action" },
  ],

  APIPayloadListTracking: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "APL_UUID", key: "uuid", type: "string" },
    { alias: "Event Name", key: "eventname", type: "string" },
    { alias: "created at", key: "createdat", type: "string" },
    { alias: "duration", key: "duration", type: "number" },
    { alias: "APL_Actions", key: "actions", type: "action" },
  ],
  viewRefundDownloadList: [
    { alias: "RV_fileName", key: "fileDetail", type: "downloadAttachement" },
    { alias: "RV_uploadedOn", key: "Time", type: "epochDate" },
    { alias: "RV_status", key: "Status", type: "string" },
    { alias: "RV_uploadedBy", key: "User", type: "string" },


  ],
  viewRefundComments: [
    { alias: "RV_Comments", key: "Text", type: "string" },
    { alias: "RV_User", key: "User", type: "string" },
    { alias: "RV_Reason", key: "Reason", type: "string" },
    { alias: "RV_Date", key: "Time", type: "epochDate" },
    { alias: "RV_Status", key: "Status", type: "string" }

  ],
  downloadFileList: [
    { alias: "FU_fileName", key: "fileDetail", type: "downloadAttachement" }

  ],
  downloadFileListIPFS: [
    { alias: "FU_fileName", key: "fileDetail", type: "downloadAttachement" }

  ],
  notifications: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "NOTI_Level", key: "type", type: "icon" },
    { alias: "NOTI_Message", key: "text", type: "longString" },
    { alias: "Date", key: "createdAt", type: "epochDate1" },
    { alias: "NOTI_Actions", key: "actions", type: "action" }
  ],
  SLAWorkboardData: [
    { alias: "SLA_img", key: "img", type: "imageBig" },
    { alias: "SLA_belowSLA", key: "belowSLA", type: "stringBig" },
    { alias: "SLA_MeetSLA", key: "MeetSLA", type: "stringBig" },
    { alias: "SLA_column", key: "SLA", type: "statusLabelBig" },
    { alias: "SLA_Cnt", key: "Cnt", type: "stringBig" }
  ],

  disputeListViewData: [
    { alias: "", key: "refNo", type: "hiddenID" },
    { alias: "RL_entity", key: "ServiceProvider", type: "image" },
    { alias: "RL_acquirer", key: "acquirerName", type: "string" },
    { alias: "DL_refNo", key: "refNo", type: "string", url: '/viewDispute' },
    { alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail' },
    { alias: "RL_SPRefNo", key: "SPRefNo", type: "string" },
    { alias: "RL_PGRefNo", key: "PGRefNo", type: "string" },
    { alias: "RL_date", key: "date", type: "string" },
    { alias: "RL_status", key: "status", type: "statusLabel" },
    { alias: "RL_action", key: "actions", type: "action" }

  ],
  viewDisputeComments: [
    { alias: "RV_Comments", key: "Text", type: "string" },
    { alias: "RV_User", key: "User", type: "string" },
    { alias: "RV_Reason", key: "Reason", type: "string" },
    { alias: "RV_Date", key: "Time", type: "epochDate" },
    { alias: "RV_Status", key: "Status", type: "string" }

  ],
  viewDisputeDownloadList: [
    { alias: "RV_fileName", key: "fileDetail", type: "downloadAttachement" },
    { alias: "RV_uploadedOn", key: "Time", type: "epochDate" },
    { alias: "RV_status", key: "Status", type: "string" },
    { alias: "RV_uploadedBy", key: "User", type: "string" },


  ],
  disputeListData: [
    { alias: "DL_refNo", key: "refNo", type: "cb" },
    { alias: "", key: "refNo", type: "hiddenID" },
    { alias: "RL_entity", key: "ServiceProvider", type: "image" },
    { alias: "RL_acquirer", key: "acquirerName", type: "string" },
    { alias: "DL_refNo", key: "refNo", type: "string" },
    { alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail' },
    { alias: "RL_SPRefNo", key: "SPRefNo", type: "string" },
    { alias: "RL_PGRefNo", key: "PGRefNo", type: "string" },
    { alias: "RL_date", key: "date", type: "string" },
    { alias: "RL_amount", key: "Amount", type: "amount" },
    { alias: "RL_status", key: "status", type: "statusLabel" },
    { alias: "RL_action", key: "actions", type: "action" }
  ],
  disputeBatchListData: [
    { alias: "", key: "batchNo", type: "hiddenID" },
    { alias: "RBL_BatchNo", key: "batchNo", type: 'hyperlink', url: '/viewDisputeBatch' },
    { alias: "DBL_Entity", key: "acquirerName", type: "string" },
    { alias: "RBL_date", key: "date", type: "string" },
    { alias: "RBL_TotalTran", key: "DisputeCount", type: "string" },
    { alias: "RBL_TotalAmount", key: "DisputeAmount", type: "amount" },
    { alias: "RBL_status", key: "status", type: "statusLabel" },
    { alias: "RBL_action", key: "actions", type: "action" }
  ],
  viewdisputeBatchListData: [
    { alias: "", key: "refNo", type: "hiddenID" },
    { alias: "RL_entity", key: "ServiceProvider", type: "image" },
    { alias: "RL_acquirer", key: "acquirerName", type: "string" },
    { alias: "DL_refNo", key: "refNo", type: 'hyperlink', url: '/viewDispute' },
    { alias: "RL_ePayRefNo", key: "ePayRefNo", type: 'hyperlink', url: '/viewTransactionDetail' },
    { alias: "RL_SPRefNo", key: "SPRefNo", type: "string" },
    { alias: "RL_PGRefNo", key: "PGRefNo", type: "string" },
    { alias: "RL_date", key: "date", type: "string" },
    { alias: "RL_amount", key: "Amount", type: "string" },
    { alias: "RL_status", key: "status", type: "statusLabel" },
    { alias: "RL_action", key: "actions", type: "action" }
  ],
  blockchainWorkBoard: [
    { alias: "", key: "number", type: "hiddenID" },
    { alias: "BTL_blockNumber", key: "blockNumber", type: "hyperlink", url: '/cipher/blockchain/blockSearch' },
    { alias: "BWB_Hash", key: "blockHash", type: "string" },
    { alias: "BWB_Size", key: "size", type: "string" },
    { alias: "BLTLP_GridTitle", key: "noOfTransactions", type: "string" },
  ],
  blockchainWorkBoardHyperledger: [
    { alias: "", key: "number", type: "hiddenID" },
    { alias: "BTL_blockNumber", key: "blockNumber", type: "hyperlink", url: '/hyperledger/blockSearch' },
    { alias: "BWB_Hash", key: "blockHash", type: "string" },
    { alias: "BWB_Time", key: "timestamp", type: "string" },
    { alias: "BLTLP_GridTitle", key: "noOfTransactions", type: "string" },
  ],
  blockTransactionsHyperledger: [
    { alias: "", key: "blockHash", type: "hiddenID" },
    { alias: "BTL_hash", key: "blockHash", type: "string" },
    { alias: "BTL_nonce", key: "nonce", type: "string" },
    { alias: "BTL_from", key: "from", type: 'string' },
    { alias: "BTL_value", key: "value", type: "string" },
    { alias: "BWB_Action", key: "actions", type: "action" }
  ],

  blockTransactionList: [
    { alias: "BTL_blockNumber", key: "blockNumber", type: "string" },
    { alias: "BTL_transactionIndex", key: "transactionIndex", type: "string" },
    { alias: "BTL_to", key: "to", type: "clpVal" },
    { alias: "BTL_from", key: "from", type: 'clpVal' },
    { alias: "BTL_gas", key: "gas", type: "string" },
    { alias: "BTL_gasPrice", key: "gasPrice", type: "string" },
    { alias: "BTL_hash", key: "hash", type: "clpVal" },
    { alias: "BTL_input", key: "input", type: "string" },
    { alias: "BTL_nonce", key: "nonce", type: "string" },
    { alias: "BTL_value", key: "value", type: "string" }
  ],

  blockTransactions: [
    { alias: "", key: "hash", type: "hiddenID" },
    { alias: "BTL_hash", key: "hash", type: "string" },
    { alias: "BTL_nonce", key: "nonce", type: "string" },
    { alias: "BTL_from", key: "transactionIndex", type: 'string' },
    { alias: "BTL_value", key: "value", type: "string" },
    { alias: "BWB_Action", key: "actions", type: "action" }
  ],
  transactionManualReconRemarks: [

    { alias: "TDA_Status", key: "transactionStatus", type: "string" },
    { alias: "TDA_Date", key: "createdOn", type: "string" },
    { alias: "TDA_CreatedBy", key: "createdBy", type: "string" },
    { alias: "TDA_Remarks", key: "remarks", type: "string" },
  ],
  exportDeclarationList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "declarationNumber", type: "hiddenID" },
    { alias: "EDL_DeclarationNo", key: "declarationNumber", type: 'hyperlink', url: '/viewDeclarationDetail' },
    { alias: "EDL_DeclarationType", key: "declarationType", type: "string" },
    { alias: "EDL_Exporter", key: "exporterName", type: "string" },
    { alias: "EDL_ExporterCountry", key: "exporterCountry", type: 'string' },
    { alias: "EDL_PortofDischarge", key: "portOfDischarge", type: "string" },
    { alias: "EDL_NextPortofDischarge", key: "nextPortOfDischarge", type: "string" },
    { alias: "EDL_InvoiceAmount", key: "invoiceValue", type: "amount" },
    { alias: "EDL_Status", key: "status", type: "string" },

  ],
  exportDeclarationItems: [
    { alias: "EDItem_hsCode", key: "hs_code", type: 'string' },
    { alias: "EDItem_description", key: "description", type: "string" },
    { alias: "EDItem_quantity", key: "qty", type: "string" },
    { alias: "EDItem_value", key: "value", type: 'string' },
    { alias: "EDItem_action", key: "actions", type: "action" }
  ],

  exportDeclarationContainers: [
    { alias: "EDItem_container", key: "container", type: 'string' },
    { alias: "EDItem_action", key: "actions", type: "action" }

  ],

  pickupList: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "ESEARCH_entityName", key: "typeName", type: "string" },
    { alias: "ESEARCH_action", key: "actions", type: "action" }
  ],

  DatasourceListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "dataSourceName", type: "hiddenID" },
    { alias: "DL_DataSource", key: "dataSourceName", type: "string" },
    { alias: "type", key: "type", type: "string" },
    { alias: "EVNTL_CREATEDBY", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  DispatchQueueData: [
    { alias: "", key: "internalid", type: "hiddenID" },
    { alias: "EVNTL_ID", key: "internalid", type: "string" },
    { alias: "EVNTL_EVENTNAME", key: "sourceevent", type: "string" },
    { alias: "EVNTL_DIPATCHER", key: "dispatcher", type: "string" },
    { alias: "EVNTL_Date", key: "createdon", type: "string" },
    { alias: "EVNTL_DispatchDate", key: "updatedon", type: "string" },
    { alias: "EVNTL_RetryCount", key: "retrycount", type: "string" },

    { alias: "EL_Error", key: "error", type: "string" },
    { alias: "EL_Status", key: "status", type: "statusLabel" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ], DispatchQueueDataSAF: [
    { alias: "", key: "internalid", type: "hiddenID" },
    { alias: "EVNTL_ID", key: "id", type: "string" },
    { alias: "Function Name", key: "functionname", type: "string" },
    { alias: "SAF Date", key: "createdon", type: "string" },
    { alias: "Message Date", key: "messagedate", type: "string" },
    { alias: "Network", key: "network", type: "string" },
    { alias: "smartcontract", key: "smartcontract", type: "string" },
    { alias: "EL_Status", key: "status", type: "statusLabel" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  peerListOrgWOA: [

    { alias: "peerName", key: "peerName", type: "string" },
    { alias: "loadBalancingLevel", key: "loadBalancingLevel", type: "string" }
  ],
  userListOrgWOA: [
    { alias: "CAUserName", key: "userName", type: "string" }
  ],
  peerListOrg: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "peerName", key: "peerName", type: "string" },
    { alias: "loadBalancingLevel", key: "loadBalancingLevel", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  endpointListOrg: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "orgCode", key: "orgCode", type: "string" },
    { alias: "requestURL", key: "requests", type: "string" },
    { alias: "nlbType", key: "nlbType", type: "string" },
    { alias: "type", key: "isServer", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  errorCodes: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "Code", key: "code", type: "string" },
    { alias: "Description", key: "description", type: "string" },
     { alias: "Description Ar", key: "descriptionAr", type: "string" },
    
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  reportCtr: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "Field Name", key: "fieldName", type: "string" },
    { alias: "Data Type", key: "dataType", type: "string" },
    { alias: "test value", key: "testVal", type: "string" },
    { alias: "ENUM", key: "span", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  userListOrg: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "CAUserName", key: "userName", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  EventListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "eventName", type: "hiddenID" },
    { alias: "EVNTL_EVENTNAME", key: "eventName", type: "string" },
    { alias: "EVNTL_DATASOURCE", key: "dataSource", type: "string" },
    { alias: "EVNTL_DIPATCHER", key: "dipatcher", type: "string" },
    { alias: "EVNTL_ISACTIVE", key: "isActive", type: "cbDisabled" },
    { alias: "EVNTL_CREATEDBY", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  EventRules: [

    { alias: "", key: "field", type: "hiddenID" },
    { alias: "EAU_EventTemplate", key: "sourceEvent", type: "string" },
    { alias: "EAU_TemplateFields", key: "field", type: "string" },
    { alias: "EAU_Operator", key: "operator", type: "string" },
    { alias: "EAU_Value", key: "value", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  SimuSetting: [
    { alias: "APIDefScreen_RuleName", key: "RuleName", type: "string" },
    { alias: "APIDefScreen_SimuField", key: "SimuField", type: "string" },
    { alias: "APIDefScreen_SimuValue", key: "SimuValue", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],

  RoutingRulesSetting: [
    { alias: "APIDefScreen_RuleName", key: "BlockRuleName", type: "string" },
    { alias: "APIDefScreen_SimuValue", key: "consortiumText", type: "string" },
    { alias: "APIDefScreen_SimuField", key: "channelText", type: "string" },
    { alias: "APIDefScreen_SimuField", key: "smartcontract", type: "string" },

    { alias: "APIDefScreen_SimuValue", key: "displayText", type: "string" },

    { alias: "EL_actions", key: "actions", type: "action" }
  ]

  ,

  MappingListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "mappingName", type: "hiddenID" },
    { alias: "MAU_useCase", key: "useCase", type: "string" },
    { alias: "MAU_RequestName", key: "mappingName", type: "string" },
    { alias: "MAU_RequestType", key: "mappingType", type: "string" },
    { alias: "EVNTL_CREATEDBY", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  ModuleListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "MAU_useCase", key: "useCase", type: "string" },
    { alias: "MDAU_label", key: "label", type: "string" },
    { alias: "MDAU_order", key: "order", type: "string" },
    { alias: "MDAU_iconName", key: "iconName", type: "string" },
    { alias: "MDAU_displayMenu", key: "displayMenu", type: "cbDisabled" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  NetworkListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "NAU_networkName", key: "networkName", type: "string" },
    { alias: "NAU_MSPID", key: "mspid", type: "string" },
    { alias: "type", key: "type", type: "string" },
    { alias: "NAU_orginizationAlias", key: "orginizationAlias", type: "string" },
    { alias: "NAU_createdBy", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],


  RelayNetworkListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "NAU_networkName", key: "networkName", type: "string" },
    { alias: "NAU_createdBy", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  ModuleDefination: [
    { alias: "MDAU_PageLabel", key: "label", type: "string" },
    { alias: "MDAU_Type", key: "type", type: "string" },
    { alias: "MDAU_value", key: "value", type: "string" },
    { alias: "MDAU_ParentValue", key: "parentVal", type: "string" },
    { alias: "MDAU_ParentName", key: "parent", type: "string" },
    { alias: "MDAU_displayMenu", key: "displayMenu", type: "cbDisabled" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  MDAU_APIList: [
    { alias: "MAU_ApiUri", key: "API", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  ApiListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "hiddenID", type: "hiddenID" },
    { alias: "AAU_UseCase", key: "useCase", type: "string" },
    { alias: "AAU_Route", key: "route", type: "string" },
    { alias: "AAU_Doc", key: "hiddenID", type: 'hyperlinkNewTab', url: '/Documentation' },
    { alias: "AAU_isActive", key: "isActive", type: "cbDisabled" },
    { alias: "AAU_isSimulated", key: "isSimulated", type: "cbDisabled" },
    { alias: "EVNTL_CREATEDBY", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  ADHReportList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "name", key: "name", type: "string" },
    { alias: "report Type", key: "reportType", type: "string" },
    { alias: "connection Type", key: "connectionType", type: "string" },
    { alias: "EVNTL_CREATEDBY", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  actionList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "id", type: "hiddenID" },
    { alias: "label", key: "label", type: "string" },
    { alias: "action", key: "URI", type: "string" },
    { alias: "actions", key: "actions", type: "action" },
  ],
  ADHRenderReportList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "name", key: "name", type: "string" },
    { alias: "report Type", key: "reportType", type: "string" },
    { alias: "EVNTL_CREATEDBY", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  consentListPolicy: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "orgCode", key: "orgCode", type: "string" },
    { alias: "orgType", key: "orgType", type: "string" },
    { alias: "Can Revoke", key: "isRevokable", type: "cbDisabled" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  mappingConfig: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "MAU_incField", key: "IN_FIELD", type: "string" },
    { alias: "MAU_incFieldType", key: "IN_FIELDTYPE", type: "string" },
    { alias: "MAU_IN_ISREQUIRED", key: "IN_ISREQUIRED", type: "string" },
    { alias: "MAU_incDataType", key: "IN_FIELDDT", type: "string" },
    { alias: "MAU_mapField", key: "MAP_FIELD", type: "string" },
    { alias: "MAU_mapDataType", key: "MAP_FIELDDT", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  DataSourceRules: [
    { alias: "", key: "field", type: "hiddenID" },
    { alias: "DSR_TemplateFields", key: "fieldName", type: "string" },
    { alias: "DSR_Type", key: "type", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  APIDoc: [
    { alias: "DOC_FIELD", key: "IN_FIELD", type: "string" },
    { alias: "DOC_Type", key: "IN_FIELDDT", type: "string" },
    { alias: "DOC_DESCRIPTION", key: "IN_FIELDDESCRIPTION", type: "string" },
    { alias: "DOC_REQUIRED", key: "IN_ISREQUIRED", type: "string" }
  ],
  dispatchListData: [
    { alias: "dispatcherName", key: "dispatcherName", type: "string" },
    { alias: "type", key: "type", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  APIDocRes: [
    { alias: "DOC_FIELD", key: "MAP_FIELD", type: "string" },
    { alias: "DOC_Type", key: "MAP_FIELDDT", type: "string" },
    { alias: "DOC_DESCRIPTION", key: "IN_FIELDDESCRIPTION", type: "string" },
  ],

  ChannelListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "NAU_channelName", key: "channelName", type: "string" },
    { alias: "type", key: "type", type: "string" },
    { alias: "NAU_networkName", key: "networkName", type: "string" },
    { alias: "NAU_createdBy", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  SmartContractListData: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "NAU_smartContract", key: "smartContract", type: 'hyperlinkNewTab', url: '/DocumentationCode' },
    // { alias: "NAU_smartContract", key: "smartContract", type: "string" },
    { alias: "type", key: "type", type: "string" },
    { alias: "NAU_channelName", key: "channelName", type: "string" },
    { alias: "NAU_createdBy", key: "createdBy", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  PeerList: [
    { alias: "Peer Name", key: "peerName", type: "string" },
    { alias: "Host Name", key: "server_hostname", type: "string" },
    { alias: "Remote", key: "requests", type: "string" },
    { alias: "NLB Rank", key: "loadBalancingLevel", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  ParticipantsList: [
    { alias: "ParticipantName", key: "organizationName", type: "string" },
    { alias: "ParticapantType", key: "particapantType", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],

  TransformationConfig: [
    { alias: "Target Field", key: "TRG_FIELD", type: "string" },
    { alias: "Transformed Field", key: "TRAN_FIELD", type: "string" },
    { alias: "Action Type", key: "TRAN_FIELDTYPE", type: "string" },
    { alias: "Custom Function", key: "TRAN_FIELDFUNCTION", type: "string" },
    { alias: "Actions", key: "actions", type: "action" }
  ],
  HeaderConfig: [
    { alias: "Key", key: "headerKey", type: "string" },
    { alias: "Header Type", key: "headerType", type: "string" },
    { alias: "Value Prefix", key: "headerPrefix", type: "string" },
    { alias: "Actions", key: "actions", type: "action" }
  ],
  typedataConfig: [
    { alias: "Label", key: "label", type: "string" },
    { alias: "Value", key: "value", type: "string" }
  ],
  EndPointList: [
    { alias: "Endpoint Name", key: "name", type: "string" },
    { alias: "Endpoint Address", key: "address", type: "string" },
    { alias: "Authorization Type", key: "authType", type: "string" },
    { alias: "Request Type", key: "requestType", type: "string" },
    { alias: "Status Active", key: "status", type: "cbDisabled" },
    { alias: "Certificate Attached", key: "attachCert", type: "cbDisabled" },
    { alias: "Actions", key: "actions", type: "action" }
  ],
  onBoardingProfile: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Name", key: "name", type: 'string' },
    { alias: "Status", key: "status", type: "string" },
    { alias: "useCase", key: "useCase", type: "string" },
    { alias: "Action", key: "action", type: "action" }
  ],

  AEDSlabList: [
    { alias: "From Points", key: "fromPoint", type: 'number' },
    { alias: "To Points", key: "toPoint", type: "string" },
    { alias: "AED Value", key: "AEDValue", type: "string" }
  ],
  /// Smiles
  // viewTranxList: [
  //   {alias: "", key: "_id", type: "hiddenID"},
  //   {alias: "S.No", key: "no", type: 'string'},
  //   {alias: "Transaction", key: "tranx", type: "string"},
  //   {alias: "Account#", key: "acc", type: "string"},
  //   {alias: "TRANS TYPE", key: "ttype", type: "string"},
  //   {alias: "Amount", key: "amount", type: "string"},
  //   {alias: "Points", key: "points", type: "string"},
  //   {alias: "TRANS Date", key: "date", type: "string"},
  //   {alias: "Status", key: "status", type: "string"},
  //   {alias: "Partner", key: "partner", type: "string"},
  //   {alias: "action", key: "actions", type: "action" }
  // ],
  ListOffers: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "Offer ID", key: "offerId", type: "string" },
    { alias: "Partner", key: "partner", type: "string" },
    { alias: "Merchant", key: "merchant", type: "string" },
    { alias: "Description", key: "description", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],

  MerchantList: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "LOGO", key: "logo", type: "image" },
    { alias: "Partner", key: "partner", type: "string" },
    { alias: "NAME", key: "name", type: "string" },
    { alias: "CODE", key: "code", type: "string" },
    { alias: "STATUS", key: "status", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],
  LoyaltyTokenList: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    {
      alias: "TOKEN PROGRAM", key: "img", type: "image1", width: "100%", height: "100px", url: ''
    },
    { alias: "ORG CODE", key: "orgCode", type: "string" },
    { alias: "OTPLenght", key: "linkingParams.OTPLength", type: "string" },
    { alias: "Auth Type", key: "linkingParams.authType", type: "string" },
    { alias: "Unit Type", key: "linkingParams.unitType", type: "string" },
    { alias: "AED RATE", key: "AEDValue", type: "string" },
    { alias: "AED Slabs", key: "actions", type: "action" },
  ],
  ListProducts: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "IMAGE", key: "image", type: "image" },
    { alias: "MERCHANT", key: "merchant", type: "string" },
    { alias: "PRODUCT TITLE", key: "productTitle", type: "string" },
    { alias: "CODE", key: "code", type: "string" },
    { alias: "PRICE ADE", key: "priceAde", type: "string" },
    { alias: "INVENTORY", key: "inventory", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],
  OrderManagement: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "Merchant", key: "merchantImage", type: "image" },
    { alias: "product", key: "product", type: "string" },
    { alias: "Qty", key: "qty", type: "string" },
    { alias: "Amount", key: "amount", type: "string" },
    { alias: "Oder Date", key: "oderDate", type: "epochDate" },
    { alias: "Order Status", key: "status", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],
  AddNewMerchant: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "SHOP CODE", key: "shopCode", type: "string" },
    { alias: "LOCATION X", key: "locationX", type: "string" },
    { alias: "LOCATION Y", key: "locationY", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],
  OfferManagementSharingBonus: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "CHANNEL", key: "channel", type: "string" },
    { alias: "POINTS", key: "points", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],
  OfferManagementCashVoucher: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "Type", key: "type", type: "string" },
    { alias: "Denomination", key: "denomination", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],

  OfferManagementCategories: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "CATEGORY", key: "category", type: "string" },
    { alias: "SUB CATEGORY", key: "subCategory", type: "string" },
    { alias: "Action", key: "actions", type: "action" },
  ],
  ApproveredemptionContractContact: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "NAME", key: "name", type: 'string' },
    { alias: "ADDRESS", key: "address", type: "string" },
    { alias: "MOBILE", key: "mobile", type: 'string' },
    { alias: "PHONE", key: "phone", type: 'string' },
    { alias: "EMAIL", key: "email", type: 'string' },
    { alias: "Action", key: "actions", type: "action" }
  ],
  ViewTask: [
    { alias: "", key: "id", type: "hiddenID" },
    { alias: "id", key: "id", type: 'string' },
    // {alias: "username", key: "username", type: 'string'},
    { alias: "schedule time", key: "schedule_time", type: "string" },
    // {alias: "json_payload", key: "json_payload", type: 'string'},
    { alias: "task type", key: "task_type", type: 'string' },
    { alias: "api url", key: "api_url", type: 'string' },
    //  {alias: "receivers list", key: "receivers_list", type: 'string'},
    // {alias: "email list", key: "email_list", type: 'string'},
    // {alias: "email subject", key: "email_subject", type: 'string'},
    { alias: "execution time", key: "execution_time", type: 'string' },
    { alias: "retry count", key: "retry_count", type: "string" },
    // {alias: "response", key: "response", type: "string"},
    { alias: "status", key: "status", type: "string" },
    { alias: "Action", key: "actions", type: "action" }
  ],
  ViewTaskDetails: [
    { alias: "", key: "id", type: "hiddenID" },
    // {alias: "id", key: "id", type: 'string'},
    { alias: "log id", key: "log_id", type: "string" },
    { alias: "task id", key: "task_id", type: 'string' },
    { alias: "log status", key: "log_status", type: 'string' },
    { alias: "log retry count", key: "log_retry_count", type: 'string' },
    { alias: "Action", key: "actions", type: "action" }
  ],
  // response: [
  //   {alias: "", key: "_id", type: "hiddenID"},
  //   {alias: "userId", key: "userId", type: "string"},
  //   {alias: "id", key: "id", type: 'string'},  
  //   {alias: "title", key: "title", type: 'string'},
  //   {alias: "completed", key: "completed", type: 'string'},
  // ],
  DashboadrEtisalat: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "BATCH#", key: "batch", type: 'string' },
    { alias: "INVOICE#", key: "invoice", type: "string" },
    { alias: "TO", key: "to", type: 'string' },
    { alias: "AMMOUNT", key: "ammount", type: 'string' },
    { alias: "COMISSION", key: "comission", type: 'string' },
    { alias: "SETTLEMENT PERIOD", key: "settlementperiod", type: 'string' },
    { alias: "STATUS", key: "status", type: 'string' },
    { alias: "View", key: "actions", type: "action" }
  ],
  CreateAmendRedemption: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "START DATE", key: "startDate", type: 'epochDate' },
    { alias: "END DATE", key: "endDate", type: "epochDate" },
    { alias: "PAYMENT METHOD", key: "paymentMethod", type: 'string' },
    { alias: "TYPE", key: "type", type: 'string' },
    { alias: "VALUE", key: "value", type: 'string' },
    { alias: "Action", key: "actions", type: "action" }
  ],
  CreateAmendRedemption: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "username", key: "username", type: 'string' },
    { alias: "schedule_time", key: "schedule_time", type: "epochDate" },
    { alias: "PAYMENT METHOD", key: "paymentMethod", type: 'string' },
    { alias: "TYPE", key: "type", type: 'string' },
    { alias: "VALUE", key: "value", type: 'string' },
    { alias: "Action", key: "actions", type: "action" }
  ],
  OderManagementDetails: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "Attribute", key: "attribute", type: 'string' },
    { alias: "Value", key: "value", type: "string" },
  ],
  OderManagementDetailsTracking: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "Date Time", key: "dateTime", type: 'epochDate' },
    { alias: "Status", key: "status", type: "string" },
  ],

  VoucherList: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "S.No", key: "serial_no", type: 'string' },
    { alias: "MERCHANT", key: "merchant", type: 'string' },
    { alias: "Offer ID", key: "offerId", type: "string" },
    { alias: "CODE", key: "code", type: 'string' },
    { alias: "CREATED ON", key: "createdon", type: 'epochDate' },
    { alias: "STATUS", key: "status", type: 'string' },
    { alias: "EXPIRES ON", key: "expireson", type: 'string' },
    { alias: "Action", key: "actions", type: "action" }
  ],


  FTEMP_MappRules: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "incomming", key: "incomming", type: 'string' },
    { alias: "mapped", key: "mapped", type: 'string' },
    { alias: "action", key: "actions", type: "action" }
  ],
  FTEMP_FilterRules: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "ruleName", key: "ruleName", type: 'string' },
    { alias: "field", key: "field", type: 'string' },
    { alias: "option", key: "option", type: "string" },
    { alias: "value", key: "value", type: "string" },
    { alias: "API", key: "API", type: "string" },
    { alias: "FTEMP_transformFuc", key: "transformFunction", type: "string" },
    { alias: "Action", key: "actions", type: "action" }
  ],
  FTEMP_FilterRulesHealth: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "ruleName", key: "ruleName", type: 'string' },
    { alias: "field", key: "field", type: 'string' },
    { alias: "option", key: "option", type: "string" },
    { alias: "value", key: "value", type: "string" },
    { alias: "group", key: "group", type: "string" },
    { alias: "Action", key: "actions", type: "action" }
  ],
  // HLTH CHK

  pgClientList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "host", key: "host", type: 'string' },
    { alias: "Time", key: "lastUpdateTime", type: "epochDate" },
    { alias: "status", key: "connected", type: "statusBox" }

  ],
  rmqStatus: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "cluster name", key: "cluster_name", type: 'string' },
    { alias: "publish", key: "publish", type: 'string' },
    { alias: "publish_details_rate", key: "publish_details_rate", type: "string" },
    { alias: "Time", key: "lastUpdateTime", type: "epochDate" },
    { alias: "message", key: "message", type: "string" },
    { alias: "status", key: "status", type: "statusBox" }
  ],
  peerListHealth: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "Peer Name", key: "peerName", type: 'string' },
    { alias: "Peer Address", key: "peerAddress", type: 'string' },
    { alias: "Time", key: "lastUpdateTime", type: "epochDate" },
    { alias: "status", key: "status", type: "statusBox" }
  ],

  ordererList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "Orderer Name", key: "ordererName", type: 'string' },
    { alias: "Orderer Address", key: "ordererAddress", type: 'string' },
    { alias: "Time", key: "lastUpdateTime", type: "epochDate" },
    { alias: "status", key: "status", type: "statusBox" }
  ],
  endpointListHealth: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "name", key: "name", type: 'string' },
    { alias: "host", key: "host", type: 'string' },
    { alias: "Time", key: "lastUpdateTime", type: "epochDate" },
    { alias: "status", key: "status", type: "statusBox" }
  ],
  APITemplateList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "S No.", key: "_id", type: "hiddenID" },
    { alias: "Template Name", key: "name", type: 'string' },
    { alias: "Template Type", key: "type", type: 'string' },
    { alias: "Action", key: "action", type: "action" }
  ],
  IPFSDocumentsList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "S No.", key: "_id", type: "hiddenID" },
    { alias: "IPFS Hash", key: "name", type: 'string' },
    { alias: "Encryption Key", key: "name", type: 'string' },
    { alias: "Action", key: "action", type: "action" }
  ],
  cipherSvc: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "svc", key: "svc", type: 'string' },
    { alias: "env", key: "env", type: 'string' },
    { alias: "pid", key: "pid", type: 'string' },
    { alias: "hostname", key: "hostname", type: 'string' },
    { alias: "ip", key: "ip", type: 'string' },
    { alias: "Time", key: "lastUpdateTime", type: "epochDate" },
    { alias: "status", key: "status", type: "statusBox" },
    { alias: "Action", key: "actions", type: "action" }
  ],
  PickUPEdit: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Label", key: "label", type: "string" },
    { alias: "labelAr", key: "labelAr", type: "string" },
    { alias: "Value", key: "value", type: "string" },
    { alias: "image", key: "path", type: "image" },
    { alias: "parent", key: "dependent", type: "string" },
    { alias: "parent value", key: "parentValue", type: "string" },
    { alias: "Actions", key: "actions", type: "action" }
  ],
  fileList: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "", key: "id", type: "hiddenID" },
    { alias: "Path", key: "path", type: "string" },
    { alias: "File Name", key: "name", type: "string" },
    { alias: "Date", key: "dateEpoch", type: "epochDate" },
    { alias: "Action", key: "action", type: "action" },
  ],
  fileData: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "", key: "id", type: "hiddenID" },
    { alias: "Rule Name", key: "rulename", type: "string" },
    { alias: "Column 1", key: "column1", type: "string" },
    { alias: "Column 2", key: "column2", type: "string" },
    { alias: "Column 3", key: "column3", type: "string" },
    { alias: "Status", key: "status", type: "statusBox" },
    { alias: "Action", key: "action", type: "action" },
  ],
  welcomeKit: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "Step ID", key: "id", type: "string" },
    { alias: "Description", key: "description", type: "leftAlign" },
    { alias: "Status", key: "status", type: "string" }
  ],
  // {"id":7,"startdate":"2020-05-31T20:00:00.000Z","enddate":"2020-06-29T20:00:00.000Z","amount":"0.320","currency":"USD","status":"Pending","billingcycle":"Monthly","orgcode":"ORG1"}
  billingGrid: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "route", key: "route", type: "string" },
    // { alias: "startdate", key: "startdate", type: "string" },
    // { alias: "enddate", key: "enddate", type: "string" },
    { alias: "amount", key: "amount", type: "string" },
    { alias: "hits", key: "hits", type: "string" },
    // { alias: "currency", key: "currency", type: "string" },
    // { alias: "billingcycle", key: "billingcycle", type: "string" }
  ],
  mongoDBChangesGrid: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "Model Name", key: "modelName", type: 'string' },
    { alias: "Type", key: "type", type: "statusBox" },
    { alias: "New Documents", key: "new_documents.count", type: "string" },
    { alias: "Updated documents", key: "updated_documents.count", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
    // { alias: "currency", key: "currency", type: "string" },
    // { alias: "billingcycle", key: "billingcycle", type: "string" }
  ],
  SqlDBChangesGrid: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "Table Name", key: "tableName", type: 'string' },
    { alias: "Change Type", key: "type", type: "statusBox" },
    { alias: "Column Details", key: "new", type: "array" },
    // { alias: "Action", key: "new_documents.count", type: "string" }
    // { alias: "Updated documents", key: "updated_documents.count", type: "string" },
    // { alias: "EL_actions", key: "actions", type: "action" }
    // { alias: "currency", key: "currency", type: "string" },
    // { alias: "billingcycle", key: "billingcycle", type: "string" }
  ],
  ConsentStatusList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "Time Stamp", key: "timestamp", type: "string" },
    { alias: "Status", key: "status", type: "string" },
    { alias: "Document Type", key: "documentType", type: "string" },
    { alias: "Consent Type", key: "consentType", type: "string" },
    { alias: "Document No", key: "documentNo", type: "string" },
    { alias: "Validity", key: "validity", type: "string" },
    { alias: "Providied To", key: "providedTo", type: "image" }
  ],
  
  DocumentTypeList: [
    { alias: "", key: "key", type: "hiddenID" },
    { alias: "Document Type", key: "documentType", type: "string" },
    { alias: "Owner Org Type", key: "ownerOrgCode", type: "string" },
    { alias: "Document Name", key: "name", type: "string" },
    { alias: "Description", key: "description", type: "string" },
    { alias: "EL_actions", key: "actions", type: "action" }
  ],
  
  ConsentProfileList: [
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "document Type", key: "documentType", type: "string" },
    { alias: "description", key: "description", type: "string" },
    { alias: "policy ID", key: "policyID", type: "string" },
    { alias: "Consent Type", key: "consentType", type: "string" },
    { alias: "created At", key: "createdAt", type: "string" },
    { alias: "Details", key: "actions", type: "action" }
  ]
};


