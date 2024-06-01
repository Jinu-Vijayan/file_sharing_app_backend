const bcrpty = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model");

const signUp = async (req,res) => {

    try{

        const SALT_ROUNDS = process.env.SALT_ROUNDS;
        const {userName, password,email} = req.body;

        const salt = await bcrpty.genSalt(Number(SALT_ROUNDS));
        const hashedPassword = await bcrpty.hash(password, salt);

        console.log(hashedPassword);
        const newUser = new UserModel({
            userName,
            password : hashedPassword,
            email
        });

        const userData = await newUser.save();

        res.status(201).json({
            message : "Signup complete",
            userId : userData._id
        });

    } catch(error){

        console.log(error);
        res.status(500).json({
            error: 'SOMETHING WENT WRONG, PLEASE TRY AGAIN AFTER SOME TIME'
        });

    }

};

const signIn = async (req,res) => {
    try{

        const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
        const {email,password} = req.body;

        const user = await UserModel.findOne({email:email});

        if(!user){
            res.status(401).json({
                message : "INVALID CREDENTIALS"
            });
        };

        const isPasswordMatching = await bcrpty.compare(password,user.password);

        if(!isPasswordMatching){
            res.status(401).json({
                message : "INVALID CREDENTIALS"
            });
        };

        const data = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            userId : user._id
        }

        const token = jwt.sign(data, PRIVATE_KEY);

        console.log(req.body);

        res.status(201).json({
            message : "SignIn successful",
            token : `BEARER ${token}`
        });

    } catch(error){

        console.log(error);

        res.json(500).json({
            error: 'SOMETHING WENT WRONG'
        })
    }
};

module.exports = {
    signUp,
    signIn
}