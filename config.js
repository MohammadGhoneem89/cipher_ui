const config = {
    sessionTimeout: 50000000000000000   ,
    refundAllowedUploadFiles: "image/jpeg,image/png,image/gif,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/pdf",
    refundCommentsLength: 256,
    refundMaxFileUpload: 5,
    disputeAllowedUploadFiles: "image/jpeg,image/png,image/gif,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/pdf",
    disputeCommentsLength: 256,
    disputeMaxFileUpload: 5,
    manualReconFleUpload: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xml,.csv",
    manualReconMaxUpload: 1,
    smartContractAllowedFilesQuorum: ".sol,.go,.txt",
    smartContractAllowedFilesHyper: ".sol,.go",
    smartContractMaxUpload: 10,
    reportAlllowedDays:  60,
    commissionAllowedUploadFiles: "image/jpeg,image/png,image/gif,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/pdf",
    commissionMaxFileUpload: 5,
    transactionAllowedLimit: 365,
    entityGroupList : ["Entity", "API Group for Entities"],
    acquirerGroupList : ["Acquirer", "API Group for Acquirers"],
    allowedUploadFilesMessage : "txt, jpeg, png, gif, xlxs, xls, word, pdf and xml",
    retryCount : 0
};
export default config;