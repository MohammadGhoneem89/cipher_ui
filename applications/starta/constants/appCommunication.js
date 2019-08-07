import backOffices from '../../backOffices';

let baseUrl = backOffices.baseUrl;


module.exports = {
    getItemCatalogue: `${baseUrl}/API/P2P/getItemCatalogue`,
    addItemCatalogue: `${baseUrl}/API/P2P/addItemCatalogue`,
};