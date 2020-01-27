module.exports = {
    rates: [
        { alias: "Start Date", key: "startDate", type: "epochDate" },
        { alias: "End Date", key: "endDate", type: "epochDate" },
        { alias: "Rate", key: "rate", type: "string" },
        { alias: "Conversion Factor", key: "conversionFactor", type: "string" },
        { alias: "Status", key: "status", type: "string" }
    ],
    pointConversion: [
        { alias: "Program Code", key: "programCode", type: "string" },
        { alias: "Program Name", key: "conversionPartnerProgramName", type: "string" },
        { alias: "Logo", key: "logo", type: "string" }
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
        { alias: "Start On", key: "startOn", type: "epochDate" }
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
        { alias: "Mode", key: "mode", type: "string" },
        { alias: "Action", key: "action", type: "action" }
    ],
    accrualTerms: [
        { alias: "S.NO", key: "", type: "serialNo" },
        { alias: "Start Date", key: "startDate", type: "epochDate" },
        { alias: "End Date", key: "endDate", type: "epochDate" },
        { alias: "Selling Rate", key: "sellingRate", type: "string" },
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
    // viewTranxList: [
    //     {alias: "", key: "_id", type: "hiddenID"},
    //     {alias: "S.No", key: "serial_no", type: 'string'},
    //     {alias: "Transaction", key: "trans", type: "string"},
    //     {alias: "Account#", key: "acc", type: "string"},
    //     {alias: "TRANS TYPE", key: "transc_type", type: "string"},
    //     {alias: "Amount", key: "amount", type: "string"},
    //     {alias: "Points", key: "points", type: "string"},
    //     {alias: "TRANS Date", key: "date", type: "string"},
    //     {alias: "Status", key: "status", type: "string"},
    //     {alias: "Partner", key: "partner", type: "string"}
    //   ]
    viewTranxList: [
        { alias: "", key: "_id", type: "hiddenID" },
        { alias: "S.No", key: "no", type: 'string' },
        { alias: "Transaction", key: "sourceTransactionId", type: "string" },
        { alias: "Account#", key: "tranxData.accountNo", type: "string" },
        { alias: "TRANS TYPE", key: "tranxData.transType", type: "string" },
        { alias: "Amount", key: "tranxData.amount", type: "string" },
        { alias: "Points", key: "tranx.points", type: "string" },
        { alias: "TRANS Date", key: "tranxData.transactionDateTime", type: "string" },
        { alias: "Status", key: "tranxData.status", type: "string" },
        { alias: "Partner", key: "tranxData.partnerCode", type: "string" },
        { alias: "action", key: "actions", type: "action" }
    ],
};