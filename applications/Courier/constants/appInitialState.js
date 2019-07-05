export default {
  getEndToEndTrackingData: {
    "order": {
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
      "orderID": "",
      "eCommerceCompanyName": "",
      "eCommerceCompanyLogo": "",
      "courierCompanyName": "",
      "courierCompanyLogo": "",
      "blockchainTranID": "",
      "orderDate": "",
      "soldTo": "",
      "soldAddress": "",
      "billTo": "",
      "billToAddress": "",
      "shipTo": "",
      "shipAddress": "",
      "totalValue": "",
      "noOfItems": "",
      "currency": "",
      "incoTerms": "",
      "returnPolicy": "",
      "orderStatus": "",
      "lineItems": [
        {
          "lineNo": "",
          "quantity": "",
          "description": "",
          "hscode": "",
          "unitPrice": "",
          "countryOfOrigin": "",
          "discount": "",
          "total": "",
          "returnReason": "",
          "statQuantity": "",
          "netWeight": "",
          "statUOM": "",
          "proofOfDeliveryHash": "",
          "deliveryImagePath": "",
          "deliveryToPersonName": "",
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
        }
      ],
      "HAWB": [
        {
          "noOfBoxes": "",
          "HAWBNumber": "",
          "HAWBHashImage": "",
          "HAWBImagePath": "",
          "physicalWeight": "",
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
            "MAWBNumber": "",
            "flightNo": "",
            "portOfLoad": "",
            "exitPort": "",
            "cargoHandlerCode": "",
            "brokerCode": "",
            "brokerName": "",
            "agentCode": "",
            "agentName": "",
            "flightDate": ""
          }
        }
      ],
      "ExportDeclaration": [
        {
          "declarationNo": "",
          "declarationID": "",
          "version": "",
          "exporterMirsal2Code": "",
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
    }
  }
}