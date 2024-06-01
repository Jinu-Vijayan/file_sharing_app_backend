const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname,"../","uploads");

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,filePath);
    },
    filename : function (req,file,cb){
        const fileName = uuidv4() + path.extname(file.originalname);
        console.log(fileName);
        cb(null,fileName)
    }
});

const upload = multer({ storage: storage })

module.exports = upload;