const express = require("express");
const { uploadFile, generateDownloadLink, downloadFile } = require("../controller");
const { Auth } = require("../middleware");

const FileRouter = express.Router();

FileRouter.post("/uploadFile",Auth,uploadFile);

FileRouter.get("/:uuid",generateDownloadLink);

FileRouter.get("/download/:uuid",downloadFile)

module.exports = {
    FileRouter
};