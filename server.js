const express = require("express");
const mongoose = require("mongoose");
const { FileRouter, UserRouter } = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 10000;
const MONGOURI = process.env.MONGOURI;

const app = express();

// Middleware
app.use(express.json());

app.use("/files",FileRouter);
app.use("/user",UserRouter);

app.use("/*",(req,res)=>{
    res.status(404).json({
        error : "PATH NOT FOUND"
    })
});

mongoose.connect(MONGOURI)
.then(()=>{
    console.log("Connected to mongoDb");
})
.catch((error)=>{
    console.log(error);
});

app.listen(PORT,()=>{
    console.log("Server up and running at port", PORT);
});