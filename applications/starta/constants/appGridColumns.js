module.exports = {
  paymentSearch: [
    { alias: "", key: "_id", type: "hiddenID" },
    { alias: "BankCode", key: "bankCode", type: 'string' },
    { alias: "Name", key: "name", type: 'string' },
    { alias: "Code", key: "code", type: "string" },
    { alias: "Action", key: "action", type: "action" }
  ],
  itemMaster: [
    { alias: "", key: "itemCode", type: "hiddenID" },
    { alias: "Item ID", key: "itemCode", type: 'string' },
    { alias: " ITEM name", key: "name", type: "string" },
    { alias: "Unit Price", key: "price", type: "amount" },
    { alias: "Expected quantity", key: "quantity", type: "amount" },
    { alias: "Action", key: "action", type: "action" }
  ],
  itemCatalogue: [
    { alias: "", key: "itemCode", type: "hiddenID" },
    { alias: "Name", key: "itemImage", type: "image", width: "20%", url: '' },
    { alias: "Item ID", key: "itemCode", type: 'string' },
    { alias: " ITEM Description", key: "description", type: "string" },
    { alias: "Unit Price", key: "price", type: "amount" },
    { alias: "Action", key: "action", type: "action" }
  ],
  orderList: [
    {alias: "", key: "orderID", type: "hiddenID"},
    {alias: "Order ID", key: "orderID", type: 'string'},
    {alias: "Contract ID", key: "contractID", type: 'string'},
    {alias: "Customer ID", key: "customerID", type: "string"},
    {alias: "Order Amount", key: "orderAmount", type: "amount"},
    {alias: "Order Date", key: "orderDate", type: "epochDate"},
    {alias: "Stage", key: "orderStatus", type: "string"},
    {alias: "Action", key: "action", type: "action"}
  ],
  masterAgreement: [
    {alias: "", key: "uniqueId", type: "hiddenID"},
    {alias: "Contract ID", key: "contractID", type: 'string'},
    {alias: "start Date", key: "startDate", type: "string"},
    {alias: "End Date", key: "endDate", type: "string"},
    {alias: "Customer", key: "customerID", type: 'string'},
    {alias: "Status", key: "status", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],
  supplierMasterList: [
    { alias: "", key: "supplierID", type: "hiddenID" },
    { alias: "Supplier Code", key: "supplierID", type: 'string' },
   { alias: "Name", key: "supplierName", type: "publicImage" },
    { alias: "Country", key: "supplierCountry", type: "string" },
    { alias: "Action", key: "action", type: "action" }
  ],
  completeQuotes: [
    { alias: "", key: "orderID", type: "hiddenID" },
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "ORDER ID", key: "orderID", type: "string" },
    { alias: "CUSTOMER ID", key: "customerID", type: "string" },
    { alias: "Amount", key: "amount", type: "amount" },
    { alias: "PO Date", key: "dateCreated", type: "epochDate" },
    { alias: "order Type", key: "orderType", type: "string" },
    { alias: "Status", key: "status", type: "status" },
    { alias: "COMPLETED ORDER", key: "actions", type: "action" }
  ],
  settlements:[
    { alias: "", key: "orderID", type: "hiddenID" },
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "ORDER ID", key: "orderID", type: "string" },
    { alias: "CUSTOMER ID", key: "customerID", type: "string" },
    { alias: "Status", key: "status", type: "string" },
    { alias: "PO Date", key: "dateCreated", type: "epochDate" },
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
    { alias: "Total Paid", key: "paidAmount", type: "amount" },
    { alias: "To Pay", key: "toPay", type: "amount" }
  ],
  pendingQuotes: [
    { alias: "", key: "orderID", type: "hiddenID" },
    { alias: "COM_SerialNo", key: "", type: "serialNo" },
    { alias: "ORDER ID", key: "orderID", type: "string" },
    { alias: "CUSTOMER ID", key: "customerID", type: "string" },
    { alias: "Amount", key: "amount", type: "amount" },
    { alias: "PO Date", key: "dateCreated", type: "epochDate" },
    { alias: "ORDER TYPE", key: "orderType", type: "string" },
    { alias: "Status", key: "status", type: "string" },
    { alias: "PENDING ORDER", key: "actions", type: "action" }
  ],
  viewMasterAgreementItem1:[
    { alias: "", key: "uniqueId", type: "hiddenID" },
    { alias: "Contract ID", key: "contractID", type: 'string' },
    { alias: "Strat Date", key: "startDate", type: "string" },
    { alias: "End Date", key: "endDate", type: "string" },
    { alias: "Customer", key: "customerID", type: 'string' },
    { alias: "Status", key: "status", type: 'string' },
    { alias: "Action", key: "action", type: "action" }
  ],
  viewMasterAgreementItem: [
    { alias: "", key: "itemCode", type: "hiddenID" },
    { alias: "ITEM ID", key: "itemCode", type: 'string' },
    { alias: "ITEM DESCRIPTION", key: "itemImage", type: "image"},
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
    { alias: "PENALTY VALUE", key: "penaltyValue", type: 'string' }
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
    { alias: "FU_fileName", key: "fileDetail", type: "downloadAttachement" }],


  rebate:[
    {alias: "greater Than", key: "greaterThan", type: 'string'},
    {alias: "less Than", key: "lessThan", type: "string"},
    {alias: "REBATE type", key: "discountType", type: "string"},
    {alias: "REBATE", key: "rebate", type: "string"},
    {alias: "Action", key: "action", type: 'action'}
  ],
  SLA:[
    {alias: "FROM stage", key: "fromStageLabel", type: 'string'},
    {alias: "TO stage ", key: "toStageLabel", type: "string"},
    {alias: "duration (DAYS)", key: "duration", type: "string"}
  ],
  Penalties:[
    {alias: "FROM stage", key: "fromStagePenaltyLabel", type: 'string'},
    {alias: "TILL stage ", key: "tillStageLabel", type: "string"},
    {alias: "greater than", key: "greaterThan", type: "string"},
    {alias: "penalty type", key: "penaltyType", type: "string"},
    {alias: "penalty value", key: "penaltyValue", type: "string"}


  ],
  LineItems: [
    { alias: "Items Name", key: "name", type: 'string' },
    { alias: "Item Code ", key: "itemCode", type: "string" },
    { alias: "Qty", key: "quantity", type: "number" },
    { alias: "Received Qty", key: "receivedQuantity", type: "number" },
    { alias: "Amount", key: "unitPrice", type: "number" },
    { alias: "Total", key: "totalAmount", type: "number" }

  ]

};