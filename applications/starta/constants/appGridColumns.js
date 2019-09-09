module.exports = {
  paymentSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "BankCode", key: "bankCode", type: 'string'},
    {alias: "Name", key: "name", type: 'string'},
    {alias: "Code", key: "code", type: "string"},
    {alias: "Action", key: "action", type: "action"}
  ],
  itemMaster: [
    {alias: "", key: "itemCode", type: "hiddenID"},
    {alias: "Item ID", key: "itemCode", type: 'string'},
    {alias: " ITEM name", key: "name", type: "string"},
    {alias: "Unit Price", key: "price", type: "amount"},
    {alias: "Expected quantity", key: "quantity", type: "amount"},
    {alias: "Action", key: "action", type: "action"}
  ],
  itemCatalogue: [
    {alias: "", key: "itemCode", type: "hiddenID"},
    {alias: "Item ID", key: "itemCode", type: 'string'},
    {alias: " ITEM name", key: "name", type: "string"},
    {alias: " ITEM Description", key: "description", type: "longString"},
    {alias: "Unit Price", key: "price", type: "amount"},
    {alias: "Action", key: "action", type: "action"}
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
    {alias: "", key: "contractID", type: "hiddenID"},
    {alias: "Contract ID", key: "contractID", type: 'string'},
    {alias: "Strat Date", key: "startDate", type: "string"},
    {alias: "End Date", key: "endDate", type: "string"},
    {alias: "Customer", key: "customerID", type: 'string'},
    {alias: "Status", key: "status", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],
  viewMasterAgreementItem:[
    {alias: "", key: "contractID", type: "hiddenID"},
    {alias: "Contract ID", key: "contractID", type: 'string'},
    {alias: "Strat Date", key: "startDate", type: "string"},
    {alias: "End Date", key: "endDate", type: "string"},
    {alias: "Customer", key: "customerID", type: 'string'},
    {alias: "Status", key: "status", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],
  viewMasterAgreementPenalties:[
    {alias: "", key: "contractID", type: "hiddenID"},
    {alias: "Contract ID", key: "contractID", type: 'string'},
    {alias: "Start Date", key: "startDate", type: "string"},
    {alias: "End Date", key: "endDate", type: "string"},
    {alias: "Customer", key: "customerID", type: 'string'},
    {alias: "Status", key: "status", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],
  viewMasterAgreementSLA:[
    {alias: "", key: "contractID", type: "hiddenID"},
    {alias: "Contract ID", key: "contractID", type: 'string'},
    {alias: "Strat Date", key: "startDate", type: "string"},
    {alias: "End Date", key: "endDate", type: "string"},
    {alias: "Customer", key: "customerID", type: 'string'},
    {alias: "Status", key: "status", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],

  downloadFileList: [
    { alias: "FU_fileName", key: "fileDetail", type: "downloadAttachement" }],


  rebate:[
    {alias: "greater Than", key: "greaterThan", type: 'string'},
    {alias: "less Than", key: "lessThan", type: "string"},
    {alias: "REBATE", key: "rebate", type: "string"},
    {alias: "Action", key: "action", type: 'action'}
  ],
  SLA:[
    {alias: "FROM stage", key: "fromStage", type: 'string'},
    {alias: "TO stage ", key: "toStage", type: "string"},
    {alias: "duration", key: "duration", type: "string"}
  ],
  Penalties:[
    {alias: "FROM stage", key: "fromStage", type: 'string'},
    {alias: "TILL stage ", key: "tillStage", type: "string"},
    {alias: "greater than", key: "greaterThan", type: "string"},
    {alias: "penalty value", key: "penaltyValue", type: "string"}

  ],
  LineItems:[
    {alias: "Items Name", key: "name", type: 'string'},
    {alias: "Item Code ", key: "itemCode", type: "string"},
    {alias: "Qty", key: "quantity", type: "number"},
    {alias: "Received Qty", key: "receivedQuantity", type: "number"},
    {alias: "Amount", key: "unitPrice", type: "number"},
    {alias: "Total", key: "totalAmount", type: "number"}

  ]

};