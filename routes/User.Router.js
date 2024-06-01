const express = require("express");
const { signUp, signIn } = require("../controller");

const UserRouter = express.Router();

UserRouter.post("/signUp",signUp)

UserRouter.get("/signIn",signIn)

module.exports = UserRouter;