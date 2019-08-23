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
    {alias: "Name", key: "name", type: 'string'},
    {alias: "Description", key: "description", type: "string"},
    {alias: "Unit Price", key: "price", type: "amount"},
    {alias: "Action", key: "action", type: "action"}
  ]
};