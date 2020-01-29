import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
    getInterim: baseUrl +'/API/SMILES/getInterim',
    getViewTransaction: baseUrl + '/API/SMILES/getPointConversionTransactionLists' ,
    getPartnerByID: `${baseUrl}/API/SMILES/getPartnerByID`,
    updatePartnerStatus: `${baseUrl}/API/SMILES/updatePartnerStatus`,
    getPartnersList: `${baseUrl}/API/SMILES/getPartnersList`,
    addEditPartner: `${baseUrl}/API/SMILES/addEditPartner`,
    getTransactionList: `${baseUrl}/API/SMILES/getPointConversionTransactionLists`,
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
    getSubOrderList: `${baseUrl}/API/STRATA/getSubOrderList`
};