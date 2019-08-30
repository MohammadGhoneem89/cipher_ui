module.exports = {
  paymentSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "BankCode", key: "bankCode", type: 'string'},
    {alias: "Name", key: "name", type: 'string'},
    {alias: "Code", key: "code", type: "string"},
    {alias: "Action", key: "action", type: "action"}
  ],
  
  itemCatalogue: [
    {alias: "", key: "itemCode", type: "hiddenID"},
    {alias: "Item Code", key: "itemCode", type: 'string'},
    {alias: "Description", key: "description", type: "string"},
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
    {alias: "Strat Date", key: "startDate", type: "string"},
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
  ]

};