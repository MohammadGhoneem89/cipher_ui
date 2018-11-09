module.exports = {

  sampleGridColumns: [
    // {alias: "", key: "_id", type: "hiddenID"},
    { alias: "app1_docList_useCase", key: "useCase", type: "string" },
    { alias: "app1_docList_route", key: "route", type: "string" },
    { alias: "app1_docList_documentPath", key: "documentPath", type: "hyperlink" },
    { alias: "app1_docList_createdAt", key: "createdAt", type: "string" },
    { alias: "app1_docList_createdBy", key: "createdBy", type: "string" },
    { alias: "app1_docList_isActive", key: "isActive", type: "cbDisabled" },
    { alias: "app1_docList_isSimulated", key: "isSimulated", type: "cbDisabled" },
    { alias: "app1_docList_actions", key: "actions", type: "action" }
  ],
  sampleDashboardGrid: [
    {alias: "", key: "objectID", type: "hiddenID"},
    {alias: "sampleGrid_column1", key: "columnValue1", type: "image", width: "20%", url: ''},
    {alias: "sampleGrid_column2", key: "columnValue2", type: "string"},
    {alias: "sampleGrid_column3", key: "columnValue3", type: "string"},
    {alias: "sampleGrid_column4", key: "columnValue4", type: "string"},
    {alias: "sampleGrid_column5", key: "columnValue5", type: "string"},
    {alias: "sampleGrid_column6", key: "columnValue6s", type: "string"}
  ],


  sampleViewPageGridColumns: [
    {alias: "", key: "recordID", type: "hiddenID"},
    {alias: "sampleGrid_column1", key: "columnValue1", type: "image", width: "20%", url: ''},
    {alias: "sampleGrid_column2", key: "columnValue2", type: "string"},
    {alias: "sampleGrid_column3", key: "columnValue3", type: "string"},
    {alias: "sampleGrid_column4", key: "columnValue4", type: "string"},
    {alias: "sampleGrid_column5", key: "columnValue5", type: "string"},
    {alias: "sampleGrid_column6", key: "columnValue6", type: "string"}
  ],
  SampleCrud_PopupGridItems: [
    {alias: "SampleCrud_Grid_Code", key: "code", type: 'string'},
    {alias: "SampleCrud_Grid_Description", key: "description", type: "string"},
    {alias: "SampleCrud_Grid_Quantity", key: "qty", type: "string"},
    {alias: "SampleCrud_Grid_Value", key: "value", type: 'string'},
    {alias: "SampleCrud_Grid_Action", key: "actions", type: "action"}
  ],

  SampleCrud_InputGrid: [
    {alias: "SampleCrud_Grid_Container", key: "container", type: 'string'},
    {alias: "SampleCrud_Grid_Action", key: "actions", type: "action"}

  ],
  SampleBlockchain_AccountList: [
    {alias: "SampleBlockchain_AccountName", key: "accountName", type: 'string'},
    {alias: "SampleBlockchain_AccountBalance", key: "accountBalance", type: "string"}
  ],
};