module.exports = {
  orderLine: [
    { alias: "Line No.", key: "", type: "serialNo" },
    { alias: "Quantity", key: "quantity", type: 'string' },
    { alias: "Description", key: "description", type: "string" },
    { alias: "HS Code", key: "hscode", type: "string" },
    { alias: "Unit Price", key: "unitPrice", type: "string" },
    { alias: "COO", key: "countryOfOrigin", type: "string" },
    { alias: "Discount", key: "discount", type: "string" },
    { alias: "Total", key: "total", type: "string" },
    { alias: "Status", key: "statUOM", type: "string" },
    { alias: "Status Qty", key: "statQuantity", type: "string" },
    { alias: "Net Weight", key: "netWeight", type: "string" },
    { alias: "Returned Cnt", key: "returnedQty", type: "string" },
    { alias: "Return Proof", key: "hscode", type: "string" },
    { alias: "Delivery Proof", key: "actions", type: "action" }
  ],
  delivery: [
    { alias: "Line No.", key: "", type: "serialNo" },
    { alias: "Quantity", key: "quantity", type: 'string' },
    { alias: "Description", key: "description", type: "string" },
    { alias: "HS Code", key: "hscode", type: "string" },
    { alias: "Unit Price", key: "unitPrice", type: "string" },
    { alias: "COO", key: "countryOfOrigin", type: "string" },
    { alias: "Discount", key: "discount", type: "string" },
    { alias: "Total", key: "total", type: "string" },
    { alias: "Stats", key: "statUOM", type: "string" },
    { alias: "Stats Qty", key: "statQuantity", type: "string" },
    { alias: "Net Weight", key: "netWeight", type: "string" },
    { alias: "Returned Cnt", key: "returnQty", type: "string" }
  ],
  returnDelivery: [
    { alias: "Line No.", key: "", type: "serialNo" },
    { alias: "Description", key: "description", type: "string" },
    { alias: "Quantity", key: "quantity", type: 'string' },
    { alias: "Stats Qty", key: "statQuantity", type: "string" },
    { alias: "Stats UOM", key: "statUOM", type: "string" },
    { alias: "Returned Qty", key: "returnQty", type: "string" },
    { alias: "Returned Status Qty", key: "returnStatQuantity", type: "string" },
    { alias: "Original HAWB", key: "oldHAWBNumber", type: "string" },
    { alias: "Export Declaration", key: "exportDeclarationNo", type: "string" },
    { alias: "New AWB", key: "newAWB", type: "string" },
    { alias: "Import Declaration", key: "importDeclarationNo", type: "string" },
    { alias: "Return Proof", key: "actions", type: "action" }
  ],
  orderList: [
    { alias: "", key: "orderNumber", type: "hiddenID" },
    { alias: "Order #", key: "orderNumber", type: "string" },
    { alias: "HAWB #", key: "hawbNumber", type: "string" },
    { alias: "Order Date", key: "orderDate", type: "string" },
    { alias: "Courier", key: "courierCompanyName", type: "string" },
    { alias: "Ecommerce", key: "ecommerceCompanyName", type: "string" },
    { alias: "ShipTo", key: "shipTo", type: "string" },
    { alias: "Status", key: "orderStatus", type: "string" },
    { alias: "Action", key: "actions", type: "action" },

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
};