module.exports = {
    rates: [
        { alias: "Start Date", key: "startDate", type: "epochDate" },
        { alias: "End Date", key: "endDate", type: "epochDate" },
        { alias: "Rate", key: "rate", type: "string" },
        { alias: "Rate2", key: "Rate2", type: "string" },
        { alias: "Source Token", key: "sourceToken", type: "string" },
        // { alias: "Mode", key: "mode", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    Slab: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "From Points", key: "fromPoint", type: "string" },
        { alias: "To Point", key: "toPoint", type: "string" },
        { alias: "AED Value", key: "AEDValue", type: "string" },
        { alias: "Action", key: "actions", type: "action" }
        // { alias: "Mode", key: "mode", type: "string" },
        
    ],
    partnerlist: [
        { alias: "", key: "Id", type: "hiddenID" },
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "From Partner Code", key: "fromPartner", type: "string" },
        { alias: "To Partner Code", key: "toPartner", type: "string" },
        { alias: "Partner Er Code", key: "partnerErCode", type: "string" },
        { alias: "Approved By", key: "approvedBy", type: "string" },
        // { alias: "Rejected By", key: "rejectedBy", type: "string" },
        { alias: "Status", key: "statusObj", type: "statusLabel" },
        { alias: "Action", key: "actions", type: "action" }
    ],
    pointConversion: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Program Code", key: "programCode", type: "string" },
        { alias: "Program Name", key: "image", type: "image" },
        { alias: "Logo", key: "logo", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    LMSData: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Loyalty Program Name", key: "program_name", type: "string" },
        { alias: "Membership # ", key: "membershipno", type: "string" },
        { alias: "Current Points", key: "currentpoints", type: "string" }
    ],
    ERPsettings: [
        { alias: "Vendor Code", key: "vendorCode", type: "string" },
        { alias: "Vendor Site ID", key: "vendorSiteID", type: "string" },
        { alias: "Billing Account", key: "billingAccount", type: "string" },
        { alias: "GL Code", key: "glcode", type: "string" }

    ],
    subsidaryPartner: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Partner Code", key: "withPartnerCode", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    settlement: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Settle As", key: "settleAs", type: "string" },
        { alias: "Frequency", key: "frequency", type: "string" },
        { alias: "Start On", key: "startOn", type: "epochDate" },
        { alias: "Action", key: "action", type: "action" }
    ],
    pointCreditRules: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Rule", key: "ruleType", type: "string" },
        { alias: "Max Unsettled (AED)", key: "maxUnSettledAmount", type: "string" }
    ],
    paymentSearch: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "BankCode", key: "bankCode", type: 'string' },
        { alias: "Name", key: "name", type: 'string' },
        { alias: "Code", key: "code", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    contactInfo: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "First Name", key: "firstName", type: "string" },
        { alias: "Last Name", key: "lastName", type: "string" },
        { alias: "Email", key: "email", type: "string" },
        { alias: "Phone", key: "phone", type: "string" },
        { alias: "Mobile", key: "mobile", type: "string" },
        { alias: "Address", key: "address", type: "string" },
        // { alias: "Mode", key: "mode", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    accrualTerms: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Start Date", key: "startDate", type: "epochDate" },
        { alias: "End Date", key: "endDate", type: "epochDate" },
        { alias: "Selling Rate", key: "sellingRate", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    redemptionTerms: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Start Date", key: "startDate", type: "epochDate" },
        { alias: "End Date", key: "endDate", type: "epochDate" },
        { alias: "Rate Type", key: "rateType", type: "string" },
        { alias: "Rate", key: "rate", type: "string" },
        { alias: "Payment Method", key: "paymentMethod", type: "string" },
        // { alias: "Mode", key: "mode", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    itemMaster: [
        { alias: "", key: "itemCode", type: "hiddenID" },
        { alias: "Item ID", key: "itemCode", type: 'string' },
        { alias: " ITEM name", key: "name", type: "string" },
        { alias: "Unit Price", key: "price", type: "amount" },
        { alias: "Expected quantity", key: "quantity", type: "rightAlign" },
        { alias: "Action", key: "action", type: "action" }
    ],
    itemCatalogue: [
        { alias: "", key: "itemCode", type: "hiddenID" },
        { alias: "Name", key: "itemImage", type: "image", width: "20%", url: '' },
        { alias: "Item ID", key: "itemCode", type: 'string' },
        { alias: " ITEM Description", key: "description", type: "longString" },
        { alias: "Unit Price", key: "price", type: "amount" },
        { alias: "Action", key: "actions", type: "action" }
    ],
    orderList: [
        { alias: "", key: "gridKey", type: "hiddenID" },
        { alias: "main Order ID", key: "orderID", type: 'string' },
        { alias: "Contract ID", key: "contractID", type: 'string' },
        { alias: "Customer ID", key: "customerID", type: "string" },
        { alias: "Order Amount", key: "orderAmount", type: "amount" },
        { alias: "Order Date", key: "orderDate", type: "epochDateStrata" },
        { alias: "Stage", key: "status", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    masterAgreement: [
        { alias: "", key: "uniqueId", type: "hiddenID" },
        { alias: "Contract ID", key: "contractID", type: 'string' },
        { alias: "start Date", key: "startDate", type: "string" },
        { alias: "End Date", key: "endDate", type: "string" },
        { alias: "Customer", key: "customerID", type: 'string' },
        { alias: "Status", key: "status", type: 'string' },
        { alias: "Action", key: "actions", type: "action" }
    ],
    supplierMasterList: [
        { alias: "", key: "supplierID", type: "hiddenID" },
        { alias: "Supplier Code", key: "supplierID", type: 'string' },
        { alias: "Name", key: "supplierName", type: "publicImage" },
        { alias: "Country", key: "supplierCountry", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    completeQuotes: [
        { alias: "", key: "gridKey", type: "hiddenID" },
        { alias: "COM_SerialNo", key: "", type: "serialNo" },
        { alias: "ORDER ID", key: "orderID", type: "string" },
        { alias: "CUSTOMER ID", key: "customerID", type: "string" },
        { alias: "Amount", key: "amount", type: "amount" },
        { alias: "PO Date", key: "dateCreated", type: "epochDateStrata" },
        { alias: "order Type", key: "orderType", type: "string" },
        { alias: "Status", key: "status", type: "status" },
        { alias: "COMPLETED ORDER", key: "actions", type: "action" }
    ],
    settlements: [
        { alias: "", key: "gridKey", type: "hiddenID" },
        { alias: "COM_SerialNo", key: "", type: "serialNo" },
        { alias: "ORDER ID", key: "orderID", type: "string" },
        { alias: "CUSTOMER ID", key: "customerID", type: "string" },
        { alias: "Status", key: "status", type: "string" },
        { alias: "PO Date", key: "dateCreated", type: "epochDateStrata" },
        { alias: "Amount", key: "amount", type: "amount" },
        { alias: "SETTLE", key: "actions", type: "action" }
    ],

    dashboardSupplierSettlement: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "COM_SerialNo", key: "", type: "serialNo" },
        { alias: "Supplier Name", key: "name", type: "string" },
        { alias: "Total Received", key: "totalReceived", type: "string" },
        { alias: "To Receive", key: "receivable", type: "string" }
    ],
    customerWiseSettlement: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "COM_SerialNo", key: "", type: "serialNo" },
        { alias: "customer id", key: "customerID", type: "string" },
        { alias: "Receivable", key: "toPay", type: "amount" },
        { alias: "Amount Received", key: "paidAmount", type: "amount" },
        { alias: "Credit Note Amount", key: "creditNoteAmount", type: "amount" }

    ],
    customerSettlement: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "COM_SerialNo", key: "", type: "serialNo" },
        { alias: "customer id", key: "customerID", type: "string" },
        { alias: "Payable", key: "toPay", type: "amount" },
        { alias: "Amount Paid", key: "paidAmount", type: "amount" },
        { alias: "Credit Note Amount", key: "creditNoteAmount", type: "amount" }
    ],
    pendingQuotes: [
        { alias: "", key: "gridKey", type: "hiddenID" },
        { alias: "COM_SerialNo", key: "", type: "serialNo" },
        { alias: "ORDER ID", key: "orderID", type: "string" },
        { alias: "CUSTOMER ID", key: "customerID", type: "string" },
        { alias: "Amount", key: "amount", type: "amount" },
        { alias: "PO Date", key: "dateCreated", type: "epochDateStrata" },
        { alias: "ORDER TYPE", key: "orderType", type: "string" },
        { alias: "Status", key: "status", type: "string" },
        { alias: "PENDING ORDER", key: "actions", type: "action" }
    ],
    viewMasterAgreementItem1: [
        { alias: "", key: "uniqueId", type: "hiddenID" },
        { alias: "Contract ID", key: "contractID", type: 'string' },
        { alias: "Strat Date", key: "startDate", type: "string" },
        { alias: "End Date", key: "endDate", type: "string" },
        { alias: "Customer", key: "customerID", type: 'string' },
        { alias: "Action", key: "action", type: "action" }
    ],
    viewMasterAgreementItem: [
        { alias: "", key: "itemCode", type: "hiddenID" },
        { alias: "ITEM ID", key: "itemCode", type: 'string' },
        { alias: "ITEM DESCRIPTION", key: "itemImage", type: "image" },
        { alias: "UNIT PRICE", key: "unitPrice", type: "string" },
        { alias: "EXPECTED QUANTITY", key: "expectedQuantity", type: 'string' },
        { alias: "RECEIVED QUANTITY", key: "receivedQuantity", type: 'string' },
        { alias: "REBATE", key: "rebate", type: "string" },
        { alias: "ACTION", key: "action", type: "action" }

    ],
    viewMasterAgreementPenalties: [
        { alias: "FROM STAGE", key: "fromStage", type: 'string' },
        { alias: "TILL STAGE", key: "tillStage", type: "string" },
        { alias: "TIME TAKEN (Days)", key: "greaterThan", type: "string" },
        { alias: "PENALTY TYPE", key: "penaltyType", type: 'string' },
        { alias: "PENALTY VALUE", key: "penaltyValue", type: 'string' },

    ],


    viewMasterAgreementSLA: [
        { alias: "FROM", key: "fromStage", type: 'string' },
        { alias: "TO", key: "toStage", type: "string" },
        { alias: "DURATION (DAYS)", key: "duration", type: "string" }
    ],

    viewMasterAgreementDISCOUNT: [
        { alias: "", key: "", type: "hiddenID" },
        { alias: ">", key: "greaterThan", type: 'numeric' },
        { alias: "<", key: "lessThan", type: "numeric" },
        { alias: "FLAT VALUE PER ITEM", key: "discount", type: "numeric" },

    ],

    downloadFileList: [
        { alias: "FU_fileName", key: "fileDetail", type: "downloadAttachement" }
    ],


    rebate: [
        { alias: "greater Than", key: "greaterThan", type: 'string' },
        { alias: "less Than", key: "lessThan", type: "string" },
        { alias: "REBATE type", key: "discountType", type: "string" },
        { alias: "REBATE", key: "rebate", type: "string" },
        { alias: "Action", key: "action", type: 'action' }
    ],
    rebateBox: [
        { alias: "greater Than", key: "greaterThan", type: 'string' },
        { alias: "less Than", key: "lessThan", type: "string" },
        { alias: "REBATE type", key: "discountType", type: "string" },
        { alias: "REBATE", key: "discount", type: "string" }

    ],
    SLA: [
        { alias: "FROM", key: "fromStageLabel", type: 'string' },
        { alias: "TO", key: "toStageLabel", type: "string" },
        { alias: "DURATION (DAYS)", key: "duration", type: "string" },
        { alias: "ACTION", key: "action", type: "action" }
    ],
    Penalties: [
        { alias: "FROM STAGE", key: "fromStagePenaltyLabel", type: 'string' },
        { alias: "TILL STAGE", key: "tillStageLabel", type: "string" },
        { alias: "TIME TAKEN (Days)", key: "greaterThan", type: "string" },
        { alias: "PENALTY TYPE", key: "penaltyType", type: 'string' },
        { alias: "PENALTY VALUE", key: "penaltyValue", type: 'string' },
        { alias: "ACTION", key: "action", type: "action" }
    ],
    LineItems: [
        { alias: "Item Name", key: "name", type: 'string' },
        { alias: "Item Code ", key: "itemCode", type: "string" },
        { alias: "Material ", key: "material", type: "string" },
        { alias: "Color ", key: "color", type: "string" },
        { alias: "Qty", key: "quantity", type: "rightAlign" },
        { alias: "Received Qty", key: "receivedQuantity", type: "rightAlign" },
        { alias: "Amount", key: "unitPrice", type: "amount" },
        { alias: "Total", key: "totalAmount", type: "amount" }
    ],
    SubOrderItems: [
        { alias: "Item Name", key: "name", type: 'string' },
        { alias: "Item Code ", key: "itemCode", type: "string" },
        { alias: "Quantity", key: "quantity", type: "rightAlign" },
        { alias: "Price", key: "price", type: "amount" }
    ],
    suborder: [
        { alias: "", key: "subOrderID", type: "hiddenID" },
        { alias: "sub order id", key: "subOrderID", type: 'string' },
        { alias: "supplier id ", key: "supplierID", type: "string" },
        { alias: "MAIN order id", key: "orderID", type: "string" },
        { alias: "SUB order date", key: "orderDate", type: "string" },
        { alias: "order amount", key: "orderAmount", type: "amount" },
        { alias: "status ", key: "status", type: "string" },
        { alias: "Action", key: "action", type: 'action' }
    ],
    ReceiptLineItems: [
        { alias: "Item Code ", key: "itemCode", type: "string" },
        { alias: "Color ", key: "color", type: "string" },
        { alias: "Qty", key: "quantity", type: "rightAlign" }
    ],
    orderReciepts: [
        { alias: "item ", key: "item", type: "string" },
        { alias: "item Code", key: "itemCode", type: "string" },
        { alias: "Receipt No", key: "receiptNo", type: "string" },
        { alias: "Receipt Date", key: "receiptDate", type: "epochDateStrata" },
        { alias: "Receipt Quantity", key: "receiptQuantity", type: "string" },
    ],
    /// Smiles 
    viewTranxListSettlemntOld: [
        { alias: "", key: "tranxData._id", type: "hiddenID" },
        { alias: "S.No", key: "", type: 'serialNo' },
        { alias: "Transaction", key: "tranxData._id", type: "string" },
        { alias: "Account#", key: "membershipNo", type: "string" },
        { alias: "TRANS TYPE", key: "transactionType", type: "string" },
        { alias: "Amount", key: "accrualParams.amountSpent", type: "string" },
        { alias: "Points", key: "pointsAwarded", type: "string" },
        { alias: "TRANS Date", key: "lastUpdateTimestamp", type: "epochDateTimeMs" },
        { alias: "Status", key: "internalStatus", type: "statusBox" },
        { alias: "Partner", key: "partnerCode", type: "string" }
    ],
    viewTranxListSettlemnt: [
        { alias: "", key: "tranxData._id", type: "hiddenID" },
        { alias: "S.No", key: "", type: 'serialNo' },
        { alias: "Organization", key: "tranxData.partnerCode", type: "string" },
        { alias: "Partner", key: "tranxData.withPartnerCode", type: "string" },
        { alias: "Transaction", key: "tranxData._id", type: "string" },
        { alias: "TRANS TYPE", key: "tranxData.transactionType", type: "string" },
        { alias: "Amount", key: "tranxData.amount", type: "string" },
        { alias: "Commission", key: "tranxData.commissionAmount", type: "string" },
        { alias: "Points", key: "tranxData.pointsAwarded", type: "string" },
        { alias: "TRANS Date", key: "tranxData.createdOn", type: "epochDate4" },
        { alias: "Status", key: "tranxData.internalStatus", type: "statusBox" }
    ],




    viewTranxListSettlemntDetail: [
        { alias: "", key: "transactionId", type: "hiddenID" },
        { alias: "S.No", key: "", type: 'serialNo' },
        { alias: "Organization", key: "partnerCode", type: "string" },
        { alias: "Partner", key: "withPartnerCode", type: "string" },
        { alias: "Transaction", key: "key", type: "string" },
        { alias: "TRANS TYPE", key: "transactionType", type: "string" },
        { alias: "Amount", key: "amount", type: "string" },
        { alias: "Commission", key: "commissionAmount", type: "string" },
        { alias: "Points", key: "pointsAwarded", type: "string" },
        { alias: "TRANS Date", key: "createdOn", type: "epochDate4" },
        { alias: "Status", key: "internalStatus", type: "statusBox" },
        { alias: "action", key: "actions", type: "action" }
    ],
    viewTranxList: [
        { alias: "", key: "transactionId", type: "hiddenID" },
        { alias: "S.No", key: "", type: 'serialNo' },
        { alias: "Transaction", key: "tranxData.key", type: "string" },
        { alias: "Account#", key: "tranxData.membershipNo", type: "string" },
        { alias: "TRANS TYPE", key: "tranxData.transactionType", type: "string" },
        { alias: "Amount", key: "tranxData.amount", type: "string" },
        { alias: "Points", key: "tranxData.pointsAwarded", type: "string" },
        { alias: "TRANS Date", key: "tranxData.createdOn", type: "epochDate4" },
        { alias: "Status", key: "tranxData.internalStatus", type: "statusBox" },
        { alias: "Partner", key: "tranxData.withPartnerCode", type: "string" },
        { alias: "action", key: "actions", type: "action" }
    ],
    // viewTranxListSettlemntDetail: [
    //     { alias: "", key: "tranxData._id", type: "hiddenID" },
    //     { alias: "S.No", key: "", type: 'serialNo' },
    //     { alias: "Organization", key: "partnerCode", type: "string" },
    //     { alias: "Partner", key: "withPartnerCode", type: "string" },
    //     { alias: "Transaction", key: "key", type: "string" },
    //     { alias: "TRANS TYPE", key: "transactionType", type: "string" },
    //     { alias: "Amount", key: "amount", type: "string" },
    //     { alias: "Commission", key: "commissionAmount", type: "string" },
    //     { alias: "Points", key: "pointsAwarded", type: "string" },
    //     { alias: "TRANS Date", key: "createdOn", type: "epochDate4" },
    //     { alias: "Status", key: "internalStatus", type: "statusBox" }
    // ],
    viewTranxListSettlemntDetail: [
        { alias: "", key: "sourceTransactionId", type: "hiddenID" },
        { alias: "S.No", key: "", type: 'serialNo' },
        { alias: "Transaction", key: "key", type: "string" },
        { alias: "Account#", key: "membershipNo", type: "string" },
        { alias: "TRANS TYPE", key: "transactionType", type: "string" },
        { alias: "Amount", key: "amount", type: "string" },
        { alias: "Points", key: "pointsAwarded", type: "string" },
        { alias: "TRANS Date", key: "createdOn", type: "epochDate4" },
        { alias: "Status", key: "internalStatus", type: "statusBox" },
        { alias: "Partner", key: "withPartnerCode", type: "string" },
        { alias: "action", key: "actions", type: "action" }
    ],
    viewSettlementList: [
        { alias: "", key: "transactionId", type: "hiddenID" },
        { alias: "S.No", key: "", type: 'serialNo' },
        { alias: "Batch ID", key: "tranxData.key", type: "string" },
        { alias: "Start Date", key: "tranxData.startDate", type: "epochDate4" },
        { alias: "End Date", key: "tranxData.endDate", type: "epochDate4" },
        { alias: "Type", key: "tranxData.type", type: "string" },
        { alias: "Partner Code", key: "tranxData.partenerCode", type: "string" },
        { alias: "Settlement Partner Code", key: "tranxData.withPartenerCode", type: "string" },
        { alias: "Status", key: "tranxData.Status", type: "statusBox" },
        { alias: "Amount", key: "tranxData.amount", type: "amount" },
        { alias: "action", key: "actions", type: "action" }
    ],
    viewTranxListNew: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Transaction #", key: "_id", type: "string" },
        { alias: "Account#", key: "membershipNo", type: "string" },
        { alias: "TRANS TYPE", key: "transactionType", type: "string" },
      
        { alias: "Points", key: "points", type: "string" },
        { alias: "Amount", key: "amount", type: "string" },
        { alias: "Commission Amount", key: "commissionAmount", type: "string" },
        
        { alias: "TRANS Date", key: "createdOn", type: "epochDateShort" },
        { alias: "Status", key: "internalStatus", type: "string" },
        { alias: "Partner", key: "partnerCode", type: "string" },
        { alias: "action", key: "actions", type: "action" }
    ],
    viewTranxListEvents: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "System", key: "from", type: "string" },
      
        { alias: "Processing Type", key: "processingType", type: "string" },
      
        { alias: "Status", key: "internalStatus", type: "statusBox" },
     
       { alias: "Created On", key: "createdOn", type: "epochDate4" },
        { alias: "Confirmation Time", key: "lastUpdateTimestamp", type: "epochDate4" },
      
        { alias: "error Reason", key: "errorReason", type: "string" },
        
    ],

    viewTranxListEventsSettlement: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "System", key: "from", type: "string" },
        //{ alias: "To", key: "to", type: "string" },
        { alias: "Status", key: "processingType", type: "string" },
      
      //  { alias: "Status", key: "internalStatus", type: "statusBox" },
       // { alias: "paymentref", key: "paymentref", type: "string" },
     //  { alias: "error Reason", key: "errorReason", type: "string" },
       { alias: "On Date", key: "createdOn", type: "epochDate4" },
       { alias: "Organization", key: "organization",  type: "string" },
       { alias: "Performed By", key: "performedBy", type: "string" },
      //  { alias: "Confirmation Time", key: "lastUpdateTimestamp", type: "epochDate4" },
      
       // { alias: "error Reason", key: "errorReason", type: "string" },
        // { alias: "Dependency", key: "Dependency", type: "string" }
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
      ]
};