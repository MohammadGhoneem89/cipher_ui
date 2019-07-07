module.exports = {
  orderLine: [
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
    { alias: "Returned Cnt", key: "returnQty", type: "string" },
    { alias: "Delivery Proof", key: "importDeclarationReferences", type: "array" },
    { alias: "Return Proof", key: "hscode", type: "string" }
  ],
  delivery: [
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
    { alias: "Returned Cnt", key: "returnQty", type: "string" }
  ],
  returnDelivery: [
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
    { alias: "Returned Cnt", key: "returnQty", type: "string" }
  ]
};