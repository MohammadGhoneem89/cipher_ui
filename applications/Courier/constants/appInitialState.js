export default {
  orderDetails: {
    "StatusList": [
      {
        "label": "Finalized",
        "status": false,
        "type": "SUCCESS",
        "legend": "Finalized"
      },
      {
        "label": "HAWB Created",
        "status": true,
        "type": "SUCCESS",
        "legend": "HAWB Created"
      },
      {
        "label": "Cleared",
        "status": false,
        "type": "SUCCESS",
        "legend": "Cleared"
      },
      {
        "label": "Delivered",
        "status": true,
        "type": "SUCCESS",
        "legend": "Delivered"
      }
    ],
    "orderID": "1234",
    "eCommerceCompanyName": "Ali Baba",
    "eCommerceCompanyLogo": "data:image/png;base64,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",
    "courierCompanyName": "DHL",
    "courierCompanyLogo": "http://www.eurocham-cambodia.org/images/members/logos/782ec-dhl_rgb.png",
    "blockchainTranID": "",
    "orderDate": "",
    "soldTo": "Arham Ali Qureshi",
    "soldAddress": "House# A-25, Gulshan",
    "billTo": "Arham's Bill",
    "billToAddress": "505 Imperial",
    "shipTo": "",
    "shipAddress": "Dubai Port, Dubai, UAE",
    "totalValue": "50000",
    "noOfItems": "60",
    "currency": "AED",
    "incoTerms": "",
    "returnPolicy": "NO Return",
    "orderStatus": "",
    "lineItems": [
      {
        "lineNo": "",
        "quantity": "5",
        "HAWBNumber": "123456789798456132",
        "description": "Perfume",
        "hscode": "HS CODE",
        "unitPrice": "$25",
        "countryOfOrigin": "PK",
        "discount": "$2",
        "total": "$23",
        "returnReason": "",
        "statQuantity": "",
        "netWeight": "25KG",
        "statUOM": "",
        "proofOfDeliveryHash": "",
        "deliveryImagePath": "",
        "deliveryToPersonName": "",
        "returnQty": "2",
        "isReturned": false,
        "isDelivered": true,
        "importDeclarationReferences": [
          {
            "statQuantity": "2",
            "statWeight": "2KG",
            "statUOM": "Box",
            "newAWB": "565161516615651",
            "proofOfDeliveryHash": "",
            "deliveryImagePath": "",
            "deliveryToPersonName": ""
          }
        ]
      },
      {
        "lineNo": "",
        "quantity": "5",
        "description": "Mobile",
        "hscode": "HS CODE",
        "unitPrice": "$25",
        "countryOfOrigin": "PK",
        "discount": "$2",
        "total": "$23",
        "returnReason": "",
        "statQuantity": "",
        "netWeight": "25KG",
        "statUOM": "",
        "proofOfDeliveryHash": "",
        "deliveryImagePath": "",
        "deliveryToPersonName": "",
        "returnQty": "2",
        "isReturned": true,
        "isDelivered": true,
        "importDeclarationReferences": [
          {
            "statQuantity": "2",
            "statWeight": "2KG",
            "statUOM": "Box",
            "newAWB": "565161516615651",
            "proofOfDeliveryHash": "",
            "deliveryImagePath": "",
            "deliveryToPersonName": ""
          }
        ]
      }
    ],
    "HAWB": [
      {
        "noOfBoxes": "3",
        "HAWBNumber": "123456789798456132",
        "HAWBHashImage": "",
        "HAWBImagePath": "http://gamecock-apparel-and-supplies.com/wp-content/uploads/2014/07/DHL-Shipping-Receipt-622x467.jpg",
        "physicalWeight": "20KG",
        "volumetricWeight": "",
        "isDelivered": true,
        "proofOfDeliveryHash": "",
        "deliveryImagePath": "",
        "deliveryDate": "",
        "deliveryToPersonName": "",
        "oldHAWBNo": "",
        "returnReason": "",
        "isReturnHAWB": "",
        "shippingDetails": {
          "MAWBNumber": "123456789",
          "flightNo": "EK606",
          "portOfLoad": "DXB",
          "exitPort": "Karachi Port",
          "cargoHandlerCode": "DH522",
          "cargoHandlerName": "DHL",
          "brokerCode": "KI25",
          "brokerName": "TCS",
          "agentCode": "AC552",
          "agentName": "Abdullah",
          "flightDate": "10/10/2019"
        }
      }
    ],
    "ExportDeclaration": [
      {
        "declarationNo": "123456",
        "declarationID": "7954651311",
        "version": "4616165",
        "flightNo": "EK606",
        "error": "There is an Error",
        "exporterMirsal2Code": "16494",
        "regimeType": "Export",
        "declType": "Courier Export",
        "noOfPages": "55",
        "transportMode": "Ship",
        "invoiceNo": "252495",
        "status": "Delivered",
        "batchReqNo": "55582",
        "clearanceStatus": "Cleared",
        "exceptionCode": "DHL",
        "exceptionDetails": "466464",
        "originalPayloadHash": "413614846416897496489"
      }
    ],
    "importDeclaration": [
      {
        "declarationNo": "",
        "declarationID": "",
        "version": "",
        "importerMirsal2Code": "",
        "regimeType": "",
        "declType": "",
        "noOfPages": "",
        "transportMode": "",
        "invoiceNo": "",
        "status": "",
        "batchReqNo": "",
        "batchStatus": "",
        "exceptionCode": "",
        "exceptionDetails": "",
        "originalPayloadHash": ""
      }
    ],
    "returnItems": [{
      "description": "Perfume",
      "quantity": "5",
      "statQuantity": "1000ml",
      "statUOM": "Box",
      "returnQty": "2",
      "returnStatQuantity": "250ml",
      "oldHAWBNumber": "1546468494",
      "exportDeclarationNo": "4654949",
      "newAWB": "9992",
      "importDeclarationNo": "59876516",
      "proofOfDeliveryHash": "",
      "deliveryImagePath": "data:image/png;base64,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",
      "deliveryToPersonName": "Arham",
      "date": "10/10/2019"
    }]
  },
  "getDashboardData": {
    "action": "getDashboardData",
    "data": {}
  },
  "orderlist": {},
  "getFileList": {
    "action": "getFileList",
    "data": {}
  },
  "getOrderDetails": {
    "action": "getOrderDetails",
    "data": {}
  },
  "orgDetailByCode": undefined,
  "entityList": {
    action: "entityList"
  }
}