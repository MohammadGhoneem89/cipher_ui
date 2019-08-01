module.exports = {
  paymentSearch: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "BankCode", key: "bankCode", type: 'string'},
    {alias: "Name", key: "name", type: 'string'},
    {alias: "Code", key: "code", type: "string"},
    {alias: "Action", key: "action", type: "action"}
  ],
  paymentAdd: [
    {alias: "Column No", key: "", type: "serialNo"},
    {alias: "Key", key: "key", type: "string"},
    {alias: "Value", key: "value", type: "string"},
    {alias: "Action", key: "action", type: "action"}
  ],
  requestParametersGrid: [
    {alias: "DB Field", key: "name", type: "string"},
    {alias: "DB Field Type", key: "type", type: "string"},
    {alias: "Request Mapping Field", key: "value", type: "string"},
    {alias: "Operator", key: "operator", type: "string"}
  ],
  responseParametersGrid: [
    {alias: "DB Field", key: "name", type: "string"},
    {alias: "Response Mapping Field", key: "as", type: "string"}
  ],
  APITemplateList: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "S No.", key: "_id", type: "hiddenID"},
    {alias: "Template Name", key: "name", type: 'string'},
    {alias: "Template Type", key: "type", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],
  IPFSDocumentsList: [
    {alias: "COM_SerialNo", key: "", type: "serialNo"},
    {alias: "S No.", key: "_id", type: "hiddenID"},
    {alias: "IPFS Hash", key: "name", type: 'string'},
    {alias: "Encryption Key", key: "name", type: 'string'},
    {alias: "Action", key: "action", type: "action"}
  ],
  onBoardingProfile: [
    {alias: "", key: "_id", type: "hiddenID"},
    {alias: "Name", key: "name", type: 'string'},
    {alias: "Status", key: "status", type: "string"},
    {alias: "useCase", key: "useCase", type: "string"},
    {alias: "Action", key: "action", type: "action"}
  ]
};