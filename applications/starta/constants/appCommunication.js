import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
  getOrgImage: `${baseUrl}/API/UI/orgList`,  
  getMasterAgreementData: `${baseUrl}/API/P2P/getMasterAgreementData`,
  getItemCatalogue: `${baseUrl}/API/STRATA/getItemCatalogueList`,
  getMasterAgreement: `${baseUrl}/API/STRATA/getMasterAgreement`,
  ipfs: `${baseUrl}/API/core/upload?type=IPFS`,
  ipfsGet: `http://13.80.7.122:9081/API/core/download?type=IPFS&path=`,
  getOrderList: `${baseUrl}/API/STRATA/getOrderList`,
  createOrder: `${baseUrl}/API/P2P/createOrder`,
  updateItemCatalogue: `${baseUrl}/API/P2P/updateItemCatalogue`,
  addItemCatalogue: `${baseUrl}/API/P2P/addItemCatalogue`,
  getOrderDetail: `${baseUrl}/API/P2P/getOrderDetail`,
  saveCustomerAssociation: `${baseUrl}/API/STRATA/saveCustomerAssociation`,
  getCustomerAssociation: `${baseUrl}/API/STRATA/getCustomerAssociationDetail`,
  addMasterContract: `${baseUrl}/API/P2P/addMasterContract`,
  updateMasterContract: `${baseUrl}/API/P2P/updateMasterContract`,

  getCustomerShipmentAndPaymentType:`${baseUrl}/API/STRATA/getCustomerShipmentAndPaymentType`,
  customerDashboard: `${baseUrl}/API/STRATA/customerDashboard`,
  supplierDashboardData: `${baseUrl}/API/STRATA/supplierDashboardData`
};
