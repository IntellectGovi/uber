const dotenv = require('dotenv')
dotenv.config();


const cors = require('cors');
const express = require('express');
const {connectDb} = require('./db/db');


const userRoute = require("./routes/user.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

connectDb();



app.use("/user" , userRoute);

app.get("/home" , (req, res) => {
    res.send("Hello World");
})


module.exports = app;


