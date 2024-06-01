const express = require("express");
const mongoose = require("mongoose");
const { FileRouter } = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;

const app = express();

app.use(FileRouter);

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