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
    { alias: "Stat Qty", key: "statQuantity", type: "string" },
    { alias: "Stat Unit", key: "statUOM", type: "string" },
    { alias: "Net Weight", key: "netWeight", type: "string" },
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
    { alias: "Net Weight", key: "netWeight", type: "string" }
  ],
  invoices: [
    { alias: "#", key: "", type: "serialNo" },
    { alias: "inco Terms Code", key: "incoTermsCode", type: 'string' },
    { alias: "Invoice Date", key: "invoiceDate", type: "string" },
    { alias: "invoice Number", key: "invoiceNumber", type: "string" },
    { alias: "invoice Type", key: "invoiceType", type: "string" },
    { alias: "invoice Value", key: "invoiceValue", type: "string" },
    { alias: "payment Instrument Type", key: "paymentInstrumentType", type: "string" },
    { alias: "total Number Of InvoicePages", key: "totalNumberOfInvoicePages", type: "string" }
  ],
  returnDelivery: [
    { alias: "Line No.", key: "", type: "serialNo" },
    { alias: "Description", key: "description", type: "string" },
    { alias: "Quantity", key: "quantity", type: 'string' },
    { alias: "Stats Qty", key: "statQuantity", type: "string" },
    { alias: "Stats UOM", key: "statUOM", type: "string" },
    { alias: "Returned Qty", key: "returnQty", type: "string" },
    { alias: "Returned Status Qty", key: "returnStatQuantity", type: "string" },
    { alias: "New AWB", key: "newAWB", type: "string" },
    { alias: "Import Declaration", key: "importDeclarationNo", type: "string" },
    { alias: "Return Proof", key: "actions", type: "action" }
  ],
  orderList: [
    { alias: "", key: "key", type: "hiddenID" },
    { alias: "Order #", key: "orderNumber", type: "string" },
    { alias: "HAWB #", key: "hawbNumber", type: "string" },
    { alias: "Order Date", key: "orderDate", type: "epochDate" },
    { alias: "Courier", key: "courierCompanyName", type: "string" },
    { alias: "Ecommerce", key: "ecommerceCompanyName", type: "string" },
    { alias: "Ship To", key: "shipTo", type: "string" },
    { alias: "Status", key: "orderStatus", type: "statusBox" },
    { alias: "Action", key: "actions", type: "action" }

  ],
  orderListMockup: [
    { alias: "", key: "key", type: "hiddenID" },
    { alias: "Order #", key: "orderNumber", type: "string" },
    { alias: "Inovices Count", key: "invoiceCount", type: "string" },
    { alias: "Order Date", key: "orderDate", type: "epochDate" },
    { alias: "Courier", key: "courierCompanyName", type: "string" },
    { alias: "Ecommerce", key: "ecommerceCompanyName", type: "string" },
    { alias: "Ship To", key: "shipTo", type: "string" },
    { alias: "Status", key: "orderStatus", type: "statusBox" },
    { alias: "Action", key: "actions", type: "action" }
  ],
  orderInvoice: [
    { alias: "", key: "key", type: "hiddenID" },
    { alias: "invoice #", key: "invoiceValue", type: "string" },
    { alias: "invoice Value", key: "invoiceValue", type: "string" },
    { alias: "currency", key: "currency", type: 'string' },
    { alias: "Exporter Code", key: "exporter", type: "string" },
    { alias: "FZ code", key: "fzCode", type: "string" },
    { alias: "warehouse", key: "warehouse", type: "string" },
    { alias: "item cnt", key: "itemCount", type: "string" },
    { alias: "Export Declaration", key: "exportDeclaration", type: "string" },
    { alias: "type", key: "type", type: "string" },
    { alias: "Status", key: "orderStatus", type: "statusBox" },
    { alias: "Action", key: "actions", type: "action" }
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
  WidgetList: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "", key: "id", type: "hiddenID" },
    { alias: "Widget Name", key: "widgetName", type: "string" },
    { alias: "Widget Caption", key: "widgetCaption", type: "string" },
    { alias: "Widget Type", key: "widgetType", type: "string" },
    { alias: "Status", key: "status", type: "statusBox" },
    { alias: "Action", key: "action", type: "action" },
  ],
  charges:[
    { alias: "#", key: "", type: "serialNo" },
    { alias: "Charge Type", key: "chargeType", type: "string" },
    { alias: "Charge Amount", key: "chargeAmount", type: "string" }
  ],
  BusinessTransaction: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "", key: "orderDetailsId", type: "hiddenID" },
    { alias: "submitted By", key: "imageData", type: "imageCustom", width: "15%"},
    { alias: "last Activity Date", key: "lastActivity", type: "criticalWarn", width: "20%" },
    { alias: "order / Invoice / Declaration", key: "orderInvoiceDecl", type: "stringCustom" },
    { alias: "Stage", key: "currentStage", type: "string" },
    { alias: "Document Type", key: "documentType", type: "string" },
    { alias: "Errors", key: "errorDescription", type: "actionCustom", width: "15%" },
    { alias: "Err Ct.", key: "errorCt", type: "string" },
    { alias: "Details", key: "actions", type: "action" }
  ],
  BusinessTransactionError: [
    { alias: "S.No", key: "", type: "serialNo" },
    { alias: "Code", key: "errorCode", type: "string" },
    { alias: "Message", key: "errorDescription", type: "string" }
  ]
};