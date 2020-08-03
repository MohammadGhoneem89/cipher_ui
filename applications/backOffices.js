
const serveraddress = 'localhost:20001'
const secure = false;
let backOffices;
if (!secure) {
    backOffices = {
        baseUrl: `http://${serveraddress}`,
        blockChainURL: `http://${serveraddress}`,
        webSocketURL: `ws://${serveraddress}/Socket`,
        repostActionURL: `http://${serveraddress}/API`,
        blockChainViewerURL: `http://${serveraddress}`,
        reportUrl: "http://localhost:20001",
        //reportUrl: "http://localhost:10052",
        //URLReportService: 'http://localhost:10052'
        // IPFS: "//avanza-training.westeurope.cloudapp.azure.com/API/core/download?type=IPFS&path="
    };
} else {
    backOffices = {
        baseUrl: `https://${serveraddress}`,
        blockChainURL: `https://${serveraddress}`,
        webSocketURL: `wss://${serveraddress}/Socket`,
        repostActionURL: `https://${serveraddress}/API`,
        blockChainViewerURL: `https://${serveraddress}`,
        reportUrl: "https://localhost:20001",
        //reportUrl: "http://localhost:10052",
        //URLReportService: 'http://localhost:10052'
        // IPFS: "//avanza-training.westeurope.cloudapp.azure.com/API/core/download?type=IPFS&path="
    };
}

export default backOffices;