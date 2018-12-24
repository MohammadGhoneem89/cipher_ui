module.exports = {
    paymentSearch: [
        {alias: "", key: "_id", type: "hiddenID"},
        {alias: "Name", key: "name", type: 'string'},
        {alias: "Code", key: "code", type: "string"},
        {alias: "Action", key: "action", type: "action"}
    ],
    paymentAdd: [
        {alias: "Column No", key: "", type: "serialNo"},
        {alias: "Key", key: "key", type: "string"},
        {alias: "Value", key: "value", type: "string"},
        {alias: "Action", key: "action", type: "action"}
    ]
};