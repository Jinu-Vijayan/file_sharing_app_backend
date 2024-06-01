const jwt = require("jsonwebtoken");
const { UserModel } = require("../model");

const Auth = async (req,res,next) => {

    const {authorization} = req.headers

    if(!authorization){
        res.status(401).json({
            message : "Auth token missing"
        })
    };

    const token = authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
    const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

    try{
        const decode = jwt.verify(token,PRIVATE_KEY);
        const user = await UserModel.findById(decode.userId);
        
        if(!user){
            return res.status(401).json({
                message : "Invalid token"
            })
        }

        req.user = user;
        
    }catch(error){
        console.log("error",error);
        return res.status(401).json({
            message : "Invalid token"
        })
    }

    next()
}

module.exports = {
    Auth
}