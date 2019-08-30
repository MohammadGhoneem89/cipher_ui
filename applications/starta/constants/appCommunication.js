import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
  getItemCatalogue: `${baseUrl}/API/STRATA/getItemCatalogueList`,
  getMasterAgreement: `${baseUrl}/API/STRATA/getMasterAgreement`,
  ipfs: `http://13.80.7.122:9081/API/core/upload?type=IPFS`,
  ipfsGet: `http://13.80.7.122:9081/API/core/download?type=IPFS&path=`,
  getOrderList: `${baseUrl}/API/STRATA/getOrderList`,
  createOrder: `${baseUrl}/API/P2P/createOrder`,
  updateItemCatalogue: `${baseUrl}/API/P2P/addItemCatalogue`
};
