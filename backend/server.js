const express = require('express');
const app = require("./index")
const http = require('http');
const cors = require("cors");
app.use(cors());
const server = http.createServer();

const PORT = process.env.PORT || 5000;

server.listen(PORT , () =>{
    console.log(`Port is listening on ${PORT}`);
})
