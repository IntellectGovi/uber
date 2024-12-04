const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();


app.get("/home" , (req, res) => {
    res.send("Hello World");
})


module.exports = app;


