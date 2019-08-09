import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
    getItemCatalogue: `${baseUrl}/API/STRATA/getItemCatalogueList`,
    addItemCatalogue: `${baseUrl}/API/P2P/addItemCatalogue`,
};