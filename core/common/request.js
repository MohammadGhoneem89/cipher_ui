export function createUserRequest(userId, password, lang) {
    var request = {
        "userId": userId,
        "password": password,
        "langauge": lang
    };


    return request;
}

export function changeTheme(lang) {
    window.changeLang(lang);
}


export function createSettlementBatchRequest(entityID, batchID) {
    let request = {
        "entityID": entityID,
        "batchID": batchID

    };

}

export function createSettlementBatchProcessedRequest(entityID, batchID) {
    let request = {
        "entityID": entityID,
        "batchID": batchID

    }

}


export function createManualReconRequest(type, id) {
    let request = {
        "type": type,
        "id": id

    }

}

export function createManualReconStatsRequest(type, id) {
    let request = {
        "recomId": "123131"

    }

}


export function createManualReconProgressRequest(type, id) {
    let request = {
        "recomId": "123131"

    }

}

export function createCommissionBatchProcessedRequest(acquirerID, batchID) {
    let request = {
        "acquirerID": acquirerID,
        "batchID": batchID

    }

}

export function createCommissionBatchRequest(acquirerID, batchID) {
    let request = {
        "acquirerID": acquirerID,
        "batchID": batchID

    }

}

export function createCommissionListRequest(acquirerID, batchID) {
    let request = {
        "acquirerID": acquirerID,
        "batchID": batchID

    }

}


export function getRefundRequest(transactionId) {
    let request = {
        "TranID": transactionId

    };
    return request;

}

export function initiateRefundRequest(RC, CMT) {
    let request = {
        "reasonCode": RC,
        "Comment": CMT
    };
    return request;

}

export function createCommissionDetailRequest(acquirerID, batchID) {
    let request = {
        "acquirerID": acquirerID,
        "batchID": batchID
    }
}

export function createViewSettlementBatchRequest(entityID, batchID) {
    let request = {
        "entityID": entityID,
        "batchID": batchID
    }
}

export function createConsortiumListRequest(page, searchCriteria) {
    return {
        "action": "consortiumList",
        searchCriteria: searchCriteria || {},
        page: page || {}
    }
}
export function createConsortiumDetailRequest(consortiumID) {
    return {
        "action": "ConsortiumDetail",
        consortiumID
    }
}

export function createSmartContractDetailRequest(data) {
    return {
        "action": "ConsortiumDetail",
        data
    }
}

export function createCompileSmartContractRequest(data) {
    return {
        "action": "compileSmartContract",
        data
    }
}

export function createDeploySmartContractRequest(data) {
    return {
        "action": "deploySmartContract",
        data
    }
}

export function createEntityListRequest(page, searchCriteria) {
    return {
        "action": "entityList",
        searchCriteria,
        page
    }
}

export function createEntityDetailRequest(entityID) {
    return {
        "action": "entityDetail",
        entityID
    }
}

export function createEntityUpdateRequest(data) {
    return {
        "action": "entityUpdate",
        data
    }
}

export function createEntityInsertRequest(data) {
    return {
        "action": "entityInsert",
        data
    }
}

export function createAcquirerListRequest(page, searchCriteria) {
    return {
        "action": "acquirerList",
        searchCriteria,
        page
    }
}


export function createAcquirerDetailRequest(acquirerID) {
    return {
        "action": "acquirerDetail",
        acquirerID
    }
}

export function createAcquirerUpdateRequest(data) {
    return {
        "action": "acquirerUpdate",
        data
    }
}

export function createAcquirerInsertRequest(data) {
    return {
        "action": "acquirerInsert",
        data
    }
}


export function createTypeDataRequest(typeData, action) {
    return {
        "action": action || "typeData",
        "actionType": action || "typeData",
        typeData
    }
}

export function createFileTemplateListRequest(page, searchCriteria) {
    return {
        "action": "entityList",

        searchCriteria,
        page
    }
}

export function createFileTemplateDetailRequest(fileTemplateID) {
    return {
        "action": "fileTemplateDetail",
        fileTemplateID
    }
}

export function createFileTemplateUpdateRequest(data) {
    return {
        "action": "fileTemplateUpdate",
        data
    }
}

export function createFileTemplateInsertRequest(data) {
    return {
        "action": "fileTemplateInsert",
        data
    }
}


export function createCommissionTemplateListRequest(page, searchCriteria) {
    return {
        "action": "commissionTemplateList",
        searchCriteria,
        page
    }
}


export function createGroupDetailRequest(data) {
    return {
        "action": "groupInsert",
        data
    }
}

export function createGroupUpdateRequest(data) {
    return {
        "action": "groupUpdate",
        data
    }
}

export function createGroupInserRequest(data) {
    return {
        "action": "groupUpdate",
        "data": data
    }
}

export function createGroupListRequest(page, searchCriteria) {
    return {
        "action": "groupList",
        searchCriteria,
        page
    }
}

export function createUserListRequest(page, searchCriteria) {
    return {
        "action": "userList",
        searchCriteria,
        page
    }
}


export function createCommissionTemplateDetailRequest(templateID) {
    return {
        "action": "commissionTemplateDetail",
        templateID
    }
}

export function createEmailTemplateListRequest(page, searchCriteria) {
    return {
        "action": "emailTemplateList",
        searchCriteria,
        page
    }
}

export function createEmailTemplateDetailsRequest(templateID) {
    return {
        "action": "emailTemplateDetails",
        templateID
    }
}

export function createEmailTemplateUpdateRequest(data) {
    return {
        "action": "emailTemplateUpdate",
        data
    }
}

export function createEmailTemplateInsertRequest(data) {
    return {
        "action": "emailTemplateInsert",
        data
    }
}

export function createUserDetailRequest(userID) {
    return {
        "action": "userDetail",
        userID
    }
}

export function createUserUpdateRequest(data) {
    return {
        "action": "userUpdate",
        data
    }
}

export function createUserInsertRequest(data) {
    return {
        "action": "userInsert",
        data
    }
}
export function createWorkingCalendarRequest(calendarID) {
    return {
        "action": "workingCalendar",
        calendarID
    }
}

export function createWorkingCalendarUpdateRequest(data) {
    return {
        "action": "workingCalendarUpdate",
        data
    }
}
export function createWorkingCalendarInsertRequest(data) {
    return {
        "action": "workingCalendarInsert",
        data
    }
}
export function createImgUploadRequest(data) {
    return {
        "action": "imgUpload",
        data
    }
}

export function createTransactionDetailRequest(data) {
    return {
        "action": "transactionDetail",
        "transactionID": data
    }
}

export function createTransactionListRequest(data) {
    return {
        "action": "transactionList",
        data

    }
}

export function createExceptionListRequest(data) {
    return {
        "currentPageNo": 1,
        "pageSize": 10,
        "action": "exceptionList",
        "data": { data }
    }
}

export function createCommissionTemplateInsertRequest(data) {
    return {
        "action": "commissionTemplateInsert",
        data
    };
}

export function createCommissionTemplateUpdateRequest(data) {
    return {
        "action": "commissionTemplateUpdate",
        data
    };
}

export function createAuditTrailDetailRequest(id, page, searchCriteria, ) {
    return {

        "action": "auditTrailDetails",
        searchCriteria,
        page
    }
}

export function createNodeListRequest(page, searchCriteria) {
    return {
        "action": "nodeList",
        searchCriteria,
        page
    }
}

export function createSmartContractListRequest(page, searchCriteria) {
    return {
        "action": "smartContactList",
        searchCriteria,
        page
    }
}

export function createFetchCollectionByKeyRequest(searchCriteria) {
    return {
        "body": {
            "key": searchCriteria.key
        }
    };
}

export function createUpdateCollectionByKeyRequest(data) {
    return {
        "key": data.key,
        "data": data.document
    };
}

export function createEntityMarkReconciledRequest(data) {
    return {
        "action": "reconcileEntity",
        data
    };
}

export function createAcquirerMarkAuthorizedRequest(data) {
    return {
        "action": "reconcileAcquirer",
        data
    };
}

export function createNotificationViewedRequest(data) {
    return {
        "action": "notificationViewed",
        data
    };
}

export function createPickupListRequest(page, searchCriteria) {
    return {
        "action": "typeDataList",
        searchCriteria,
        page
    }
}

export function createPickupListDetailRequest(typeDataId) {
    return {
        "action": "typeDataDetail",
        typeDataId
    }
} export function createPickupListRequestForType(page, searchCriteria) {
    return {
        "action": "typeDataListByType",
        searchCriteria,
        page
    }
}

