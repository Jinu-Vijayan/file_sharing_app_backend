const express = require("express");
const { uploadFile, generateDownloadLink, downloadFile } = require("../controller");

const FileRouter = express.Router();

FileRouter.post("/uploadFile",uploadFile);

FileRouter.get("/files/:uuid",generateDownloadLink);

FileRouter.get("/files/download/:uuid",downloadFile)

module.exports = {
    FileRouter
};