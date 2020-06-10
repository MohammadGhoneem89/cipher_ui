import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;

let sehedularUrl= backOffices.sehedularUrl;

module.exports = {
    getTransactionsForSettlement:`${baseUrl}/API/SMILES/getTransactionList`,
    getAllOrgMap:`${baseUrl}/API/SMILES/getAllOrgMap`,
    //getTask:'http://5cc165b90e53350014908d51.mockapi.io/api/v1/getAllTask',
    //getTask: sehedularUrl + '/get',  //'http://localhost:8080/get',
    getTask: baseUrl + '/API/Task/getTask',
    searchTaskDetails: baseUrl + '/API/Task/searchTaskDetails',
    search: baseUrl + '/API/Task/search', 
    searchTask: baseUrl + '/API/Task/searchTask',
    addTask: baseUrl + '/API/Task/addTask',
    createSettlementBatch: baseUrl + '/API/SMILES/createSettlementBatch',
    initiateSettlement: baseUrl + '/API/SMILES/initiateSettlement',
    getLMSData: baseUrl + '/API/SMILES/getLMSData',
    getInterim: baseUrl + '/API/SMILES/getInterim',
    getViewTransaction: baseUrl + '/API/SMILES/getPointConversionTransactionUIList',
    updateSettlement: baseUrl + '/API/SMILES/updateSettlementBatch',
    getPartnerByID: `${baseUrl}/API/SMILES/getPartnerByID`,
    updatePartnerStatus: `${baseUrl}/API/SMILES/updatePartnerStatus`,
    getPartnersList: `${baseUrl}/API/SMILES/getPartnersList`,
    addEditPartner: `${baseUrl}/API/SMILES/addEditPartner`,
    getTransactionList: `${baseUrl}/API/SMILES/getPointConversionTransactionUIList`,
    encrypt: `${baseUrl}/API/STRATA/encryptData`,
    decrypt: `${baseUrl}/API/STRATA/decryptData`,
    getOrgImage: `${baseUrl}/API/UI/orgList`,
    getMasterAgreementData: `${baseUrl}/API/P2P/getMasterAgreementData`,
    getItemCatalogue: `${baseUrl}/API/STRATA/getItemCatalogueList`,
    getMasterAgreement: `${baseUrl}/API/STRATA/getMasterAgreement`,
    ipfs: `${baseUrl}/API/core/upload?type=IPFS`,
    ipfsGet: `${baseUrl}/API/core/download?type=IPFS&path=`,
    getOrderList: `${baseUrl}/API/STRATA/getOrderList`,
    createOrder: `${baseUrl}/API/P2P/createOrder`,
    updateOrderStatus: `${baseUrl}/API/P2P/updateOrderStatus`,
    updateOrderStatusCustomer: `${baseUrl}/API/P2P/updateOrderStatusCustomer`,
    updateItemCatalogue: `${baseUrl}/API/P2P/updateItemCatalogue`,
    addItemCatalogue: `${baseUrl}/API/P2P/addItemCatalogue`,
    getOrderDetail: `${baseUrl}/API/P2P/getOrderDetail`,
    saveCustomerAssociation: `${baseUrl}/API/STRATA/saveCustomerAssociation`,
    getCustomerAssociation: `${baseUrl}/API/STRATA/getCustomerAssociationDetail`,
    addMasterContract: `${baseUrl}/API/P2P/addMasterContract`,
    updateMasterContract: `${baseUrl}/API/P2P/updateMasterContract`,
    approvedMasterContract: `${baseUrl}/API/P2P/approvedMasterContract`,
    getCustomerShipmentAndPaymentType: `${baseUrl}/API/STRATA/getCustomerShipmentAndPaymentType`,
    customerDashboard: `${baseUrl}/API/STRATA/customerDashboard`,
    supplierDashboardData: `${baseUrl}/API/STRATA/supplierDashboardData`,
    getSubOrderList: `${baseUrl}/API/STRATA/getSubOrderList`,
    getTransactionByID: `${baseUrl}/API/SMILES/getTransactionByID`,
    orgDetail:`${baseUrl}/API/UI/orgDetail`,
    getSettlementList:`${baseUrl}/API/SMILES/getSettlementList`,
    getSettlementBatch:`${baseUrl}/API/SMILES/getSettlementBatch`,
    entityTypedata:`${baseUrl}/API/UI/entityTypedata`,
    getDashboardDataList:`${baseUrl}/API/SMILES/getDashboardData`,

    getOrgCodeData: baseUrl + "/API/SMILES/getAllOrgMap",
    addEditMerchant: baseUrl + "/API/SMILES/addEditMerchant"
};