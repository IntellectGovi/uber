const dotenv = require('dotenv')
dotenv.config();


const cors = require('cors');
const express = require('express');
const cookies = require("cookie-parser");
const {connectDb} = require('./db/db');


const captainRoute = require("./routes/captain.route");
const userRoute = require("./routes/user.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookies());

connectDb();



app.use("/user" , userRoute);
app.use("/captain" , captainRoute);

app.get("/home" , (req, res) => {
    res.send("Hello World");
})


module.exports = app;


