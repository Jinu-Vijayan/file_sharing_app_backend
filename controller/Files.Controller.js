const fileUploadService = require("../services");
const {FileModel} = require("../model/index");
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({ 

  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 

});

const uploadFile = async (req,res) => {

    const upload = fileUploadService.single("file");

    upload(req,res, async function(err){
        if(err){
            res.status(500).json({
                error : "SOMETHING WENT WRONG"
            })
        }

        try{

            // const response = await cloudinary.uploader.upload(req.file.path, 
            // function(error, result) {console.log(result); });

            const newData = new FileModel({
                originalFileName : req.file.originalname,
                newFileName : req.file.filename,
                filePath : req.file.path
            });
    
            const newlyInsertedFile = await newData.save();
    
            return res.status(200).json({
                message : "File uploaded sucessful",
                fileId : newlyInsertedFile._id
            });

        }catch(error) {

            console.log(error);
            return res.status(500).json({
                error : "SOMETHING WENT WRONG"
            });

        }

    });
};

const generateDownloadLink = async (req,res) => {

    const fileId = req.params.uuid;
    
    try{

        const data = await FileModel.findById(fileId);

        const downloadableLink = `http://${req.headers.host}/files/download/${fileId}`;

        return res.status(200).json({
            message : "Downloadable link generated",
            link : downloadableLink
        });

    }catch(error){

        console.log(error);
        return res.status(500).json({
            error : "SOMETHING WENT WRONG"
        });

    }

};

const downloadFile = async (req,res) =>{

    try{

        const fileId = req.params.uuid;

        const data = await FileModel.findById(fileId);
        // console.log(data)

        return res.download(data.filePath , data.originalFileName);

    }catch(error){

        console.log(error);
        return res.status(500).json({
            error : "SOMETHING WENT WRONG"
        });

    }

}

module.exports = {
    uploadFile,
    generateDownloadLink,
    downloadFile
}