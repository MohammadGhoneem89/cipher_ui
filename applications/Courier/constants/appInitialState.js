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
        "returnQty":"2",
        "isReturned": false,
        "isDelivered": true,
        "importDeclarationReferences": [
          {
            "statQuantity": "",
            "statWeight": "",
            "statUOM": "",
            "newAWB": "",
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
        "returnQty":"2",
        "isReturned": true,
        "isDelivered": true,
        "importDeclarationReferences": [
          {
            "statQuantity": "",
            "statWeight": "",
            "statUOM": "",
            "newAWB": "",
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
        "error":"There is an Error",
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
    ]
  },
  "getDashboardData": {
    "action": "getDashboardData",
    "data" : {}
  },
  "orderlist": {
    "data" : {}
  }
}