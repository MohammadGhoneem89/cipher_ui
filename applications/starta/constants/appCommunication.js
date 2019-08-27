import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
    getItemCatalogue: `${baseUrl}/API/STRATA/getItemCatalogueList`,
    getMasterAgreement:`${baseUrl}/API/STRATA/getMasterAgreement`,
    ipfs:`${baseUrl}/API/core/upload?type=IPFS`
};
