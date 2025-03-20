const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const {protect}= require("./authMiddleware")
const cors = require("cors");

//server
const app=express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false,limit: '50mb'}));
app.listen(process.env.PORT,()=>{console.log('server is running');})
app.use(cors({
    origin: 'http://localhost:3000'
}));

//mongodb
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
connectDB();

//routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/ing", require("./routes/ingroutes"));
app.use("/api/order", require("./routes/orderroutes"));


app.all(`/media/*`, (req,res, next)=> {
    console.log(req.body)
    res.status(403).send({
        message: 'Access Forbidden'
    });
});

app.use('/media', express.static(__dirname + '/media'));
app.use('/imgs', express.static(__dirname + '/imgs'));