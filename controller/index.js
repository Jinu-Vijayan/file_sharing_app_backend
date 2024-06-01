const {uploadFile, generateDownloadLink, downloadFile} = require("./Files.Controller");
const { signIn, signUp } = require("./User.Controller");

module.exports = {
    uploadFile,
    generateDownloadLink,
    downloadFile,
    signIn,
    signUp
};