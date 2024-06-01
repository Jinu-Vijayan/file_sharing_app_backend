const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    originalFileName : {
        type : String
    },
    newFileName : {
        type : String
    },
    filePath : {
        type : String
    }
});

const FileModel = mongoose.model("files",fileSchema);

module.exports = FileModel;